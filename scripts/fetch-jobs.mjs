/**
 * Refreshes src/data/jobs.json from the public job-board feeds listed in
 * scripts/jobs/sources.mjs. Runs every day in .github/workflows/jobs.yml.
 *
 *   node scripts/fetch-jobs.mjs           refresh src/data/jobs.json
 *   node scripts/fetch-jobs.mjs --probe   try every feed for unpinned sources and print what answers
 *   node scripts/fetch-jobs.mjs --check   fetch and report, but don't write anything
 *
 * Feeds used (all public, no key, published by the job-board vendors for
 * showing a company's openings elsewhere):
 *   Greenhouse  https://boards-api.greenhouse.io/v1/boards/{slug}/jobs
 *   Lever       https://api.lever.co/v0/postings/{slug}?mode=json
 *   Ashby       https://api.ashbyhq.com/posting-api/job-board/{slug}
 *
 * A listing keeps the date we first saw it across runs (`since` is the first
 * run ever, so launch-day listings aren't all marked new). A feed that fails on
 * a given day keeps its previous listings for up to a week, so one bad
 * request doesn't empty a company.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { sources } from './jobs/sources.mjs';
import { classify, isCreatorFacing } from './jobs/classify.mjs';

const OUT = new URL('../src/data/jobs.json', import.meta.url);
const args = new Set(process.argv.slice(2));
const PROBE = args.has('--probe');
const CHECK = args.has('--check') || PROBE;
const today = new Date().toISOString().slice(0, 10);
const UA = 'creators.select job listings (+https://creators.select/jobs/)';
const STALE_DAYS = 7;

const ATS = {
	greenhouse: {
		name: 'Greenhouse',
		api: (s) => `https://boards-api.greenhouse.io/v1/boards/${s}/jobs`,
		board: (s) => `https://job-boards.greenhouse.io/${s}`,
		parse: (d) =>
			(d?.jobs ?? []).map((j) => ({
				id: String(j.id),
				title: j.title,
				location: j.location?.name ?? '',
				url: j.absolute_url,
				posted: j.first_published ?? j.updated_at,
			})),
	},
	lever: {
		name: 'Lever',
		api: (s) => `https://api.lever.co/v0/postings/${s}?mode=json`,
		board: (s) => `https://jobs.lever.co/${s}`,
		parse: (d) =>
			(Array.isArray(d) ? d : []).map((j) => ({
				id: j.id,
				title: j.text,
				location: j.categories?.location ?? (j.categories?.allLocations ?? []).join(', '),
				remote: j.workplaceType === 'remote',
				url: j.hostedUrl,
				posted: j.createdAt ? new Date(j.createdAt).toISOString() : undefined,
			})),
	},
	ashby: {
		name: 'Ashby',
		api: (s) => `https://api.ashbyhq.com/posting-api/job-board/${s}`,
		board: (s) => `https://jobs.ashbyhq.com/${s}`,
		parse: (d) =>
			(d?.jobs ?? [])
				.filter((j) => j.isListed !== false)
				.map((j) => ({
					id: j.id,
					title: j.title,
					location: j.location ?? '',
					remote: j.isRemote === true || j.workplaceType === 'Remote',
					url: j.jobUrl,
					posted: j.publishedAt,
				})),
	},
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

async function get(url) {
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), 20_000);
	try {
		const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' }, signal: ctrl.signal });
		if (!res.ok) return { status: res.status };
		return { status: res.status, data: await res.json() };
	} catch (e) {
		return { status: 0, error: String(e?.message ?? e) };
	} finally {
		clearTimeout(timer);
	}
}

/** Try one feed. Returns null when the board doesn't exist. */
async function tryFeed(ats, slug) {
	const r = await get(ATS[ats].api(slug));
	if (!r.data) return r.status === 404 || r.status === 400 ? null : { error: r.error ?? `HTTP ${r.status}` };
	if (ats === 'lever' && !Array.isArray(r.data)) return null;
	const jobs = ATS[ats].parse(r.data);
	let name;
	if (ats === 'greenhouse') name = (await get(`https://boards-api.greenhouse.io/v1/boards/${slug}`)).data?.name;
	return { ats, slug, jobs, name };
}

/** Pool of n concurrent workers over items. */
async function pool(items, n, fn) {
	const out = new Array(items.length);
	let i = 0;
	await Promise.all(
		Array.from({ length: n }, async () => {
			while (i < items.length) {
				const k = i++;
				out[k] = await fn(items[k], k);
			}
		}),
	);
	return out;
}

const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const safeUrl = (u) => {
	try {
		const url = new URL(u);
		return url.protocol === 'https:' ? url.href : null;
	} catch {
		return null;
	}
};
const isRemote = (loc) => /\bremote\b|anywhere|distributed/i.test(loc);

async function resolve(src) {
	if (src.ats && src.slug) return [await tryFeed(src.ats, src.slug)];
	const slugs = [...new Set([...(src.slugs ?? []), slugify(src.company)])];
	const tries = slugs.flatMap((s) => Object.keys(ATS).map((a) => [a, s]));
	return Promise.all(tries.map(([a, s]) => tryFeed(a, s)));
}

const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { jobs: [], sources: [] };
const firstSeen = new Map(prev.jobs.map((j) => [j.id, j.firstSeen]));
const prevBySource = new Map();
for (const j of prev.jobs) prevBySource.set(j.company, [...(prevBySource.get(j.company) ?? []), j]);
const prevSource = new Map(prev.sources.map((s) => [s.company, s]));

const todo = sources.filter((s) => (PROBE ? !s.ats : s.ats));
const results = await pool(todo, 6, async (src) => {
	const found = (await resolve(src)).filter(Boolean);
	return { src, found };
});

if (PROBE) {
	for (const { src, found } of results) {
		const hits = found.filter((f) => f.jobs);
		if (!hits.length) {
			console.log(`- ${src.company}: no public feed found`);
			continue;
		}
		for (const h of hits) {
			const sample = h.jobs.slice(0, 3).map((j) => j.title).join(' | ');
			console.log(`+ ${src.company}: ${h.ats}/${h.slug}${h.name ? ` (board name "${h.name}")` : ''}, ${h.jobs.length} jobs. e.g. ${sample}`);
		}
	}
	process.exit(0);
}

const jobs = [];
const sourceRows = [];
for (const { src, found } of results) {
	const hit = found.find((f) => f?.jobs);
	const old = prevSource.get(src.company);
	if (!hit) {
		const err = found.find((f) => f?.error)?.error ?? 'board not found';
		const lastOk = old?.checked;
		const fresh = lastOk && (Date.parse(today) - Date.parse(lastOk)) / 864e5 <= STALE_DAYS;
		console.warn(`! ${src.company}: ${err}${fresh ? `, keeping listings from ${lastOk}` : ''}`);
		if (fresh) {
			jobs.push(...(prevBySource.get(src.company) ?? []));
			sourceRows.push(old);
		}
		continue;
	}
	const ats = ATS[hit.ats];
	let kept = 0;
	for (const j of hit.jobs) {
		const title = clean(j.title);
		const url = safeUrl(j.url);
		if (!title || !url) continue;
		if (src.focus === 'creator' && !isCreatorFacing(title)) continue;
		const id = `${hit.ats}:${hit.slug}:${j.id}`;
		const location = clean(j.location);
		jobs.push({
			id,
			company: src.company,
			kind: src.kind,
			title,
			role: classify(title),
			location,
			remote: Boolean(j.remote) || isRemote(location),
			url,
			source: ats.name,
			posted: j.posted ? String(j.posted).slice(0, 10) : undefined,
			firstSeen: firstSeen.get(id) ?? today,
		});
		kept++;
	}
	sourceRows.push({ company: src.company, kind: src.kind, source: ats.name, feed: ats.api(hit.slug), board: ats.board(hit.slug), count: kept, checked: today });
	console.log(`  ${src.company}: ${kept}/${hit.jobs.length} via ${ats.name}`);
}

jobs.sort((a, b) => b.firstSeen.localeCompare(a.firstSeen) || (b.posted ?? '').localeCompare(a.posted ?? '') || a.company.localeCompare(b.company));
sourceRows.sort((a, b) => a.company.localeCompare(b.company));
console.log(`${jobs.length} listings from ${sourceRows.length} companies.`);

if (!CHECK) {
	writeFileSync(OUT, JSON.stringify({ updated: today, since: prev.since ?? today, sources: sourceRows, jobs }, null, '\t') + '\n');
	console.log(`Wrote ${OUT.pathname}`);
}
