#!/usr/bin/env node
/**
 * Review queue: which guides are ready for a named reviewer to sign off.
 *
 *   node scripts/review-queue.mjs                 writes docs/review-queue.md
 *   node scripts/review-queue.mjs sign-off team/hiring earn/pricing --as william-lee
 *                                                 marks those pages published, reviewed today
 *
 * The bar a page must clear before it can be offered for sign-off (docs/publishing.md):
 *   - at least 500 words of guide text
 *   - at least 3 outbound sources
 *   - no TODO markers and no "Outline" notice
 * Hub pages (section overviews and About) only need 150+ words and no TODOs:
 * they point to sources rather than make claims.
 * Sign-off refuses pages below the bar unless you pass --force.
 * The build itself refuses `status: published` without reviewers and lastReviewed.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DOCS = join(ROOT, 'src/content/docs');
const MIN_WORDS = 500;
const MIN_SOURCES = 3;
const MIN_HUB_WORDS = 150;

const walk = (dir) =>
	readdirSync(dir).flatMap((f) => {
		const p = join(dir, f);
		return statSync(p).isDirectory() ? walk(p) : /\.mdx?$/.test(f) ? [p] : [];
	});

function parse(file) {
	const raw = readFileSync(file, 'utf8');
	const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
	const fm = m ? m[1] : '';
	const body = m ? m[2] : raw;
	const field = (k) => (fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm')) || [])[1]?.trim().replace(/^["']|["']$/g, '');
	const list = (k) =>
		(field(k) || '')
			.replace(/[[\]]/g, '')
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
	const text = body
		.replace(/^import .*$/gm, '')
		.replace(/<style>[\s\S]*?<\/style>/g, '')
		.replace(/<svg[\s\S]*?<\/svg>/g, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\]\([^)]*\)/g, ']')
		.replace(/https?:\/\/\S+/g, '');
	const words = (text.match(/[A-Za-z0-9’'$%-]+/g) || []).length;
	const sources = new Set([...body.matchAll(/https?:\/\/[^\s)"'>\]]+/g)].map((x) => x[0].replace(/[.,;]+$/, ''))).size;
	const id = relative(DOCS, file).replace(/\.mdx?$/, '').replace(/\/index$/, '');
	const hub = !id.includes('/') || id.startsWith('about/');
	const blockers = [];
	if (/\bTODO\b|\bTK\b/.test(body)) blockers.push('has TODO');
	if (/:::note\[Outline\]/.test(body)) blockers.push('outline notice');
	if (words < (hub ? MIN_HUB_WORDS : MIN_WORDS)) blockers.push(`${words} words`);
	if (!hub && sources < MIN_SOURCES) blockers.push(`${sources} sources`);
	return {
		file,
		raw,
		id,
		title: field('title') || id,
		status: field('status') || 'outline',
		reviewers: list('reviewers'),
		words,
		sources,
		blockers,
	};
}

const pages = walk(DOCS)
	.map(parse)
	.filter((p) => p.id !== 'index' && p.id !== 'guides')
	.sort((a, b) => a.id.localeCompare(b.id));

function signOff(ids, who, force) {
	const today = new Date().toISOString().slice(0, 10);
	let failed = 0;
	for (const id of ids) {
		const p = pages.find((x) => x.id === id.replace(/^\/|\/$/g, ''));
		if (!p) {
			console.error(`✗ ${id}: no such page`);
			failed++;
			continue;
		}
		if (p.blockers.length && !force) {
			console.error(`✗ ${id}: below the bar (${p.blockers.join(', ')}). Fix it, or pass --force.`);
			failed++;
			continue;
		}
		const [, fm, body] = p.raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
		let lines = fm.split('\n');
		const set = (key, value) => {
			const i = lines.findIndex((l) => l.startsWith(`${key}:`));
			if (i >= 0) lines[i] = `${key}: ${value}`;
			else {
				// keep top-level keys before nested blocks like sidebar:
				const at = lines.findIndex((l) => /^(sidebar|cover|hero|head):/.test(l));
				lines.splice(at >= 0 ? at : lines.length, 0, `${key}: ${value}`);
			}
		};
		const reviewers = [...new Set([...p.reviewers, who])];
		set('status', 'published');
		set('reviewers', `[${reviewers.join(', ')}]`);
		set('lastReviewed', today);
		writeFileSync(p.file, `---\n${lines.join('\n')}\n---\n${body}`);
		console.log(`✓ ${id}: published, reviewed by ${reviewers.join(', ')} on ${today}`);
	}
	process.exit(failed ? 1 : 0);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'sign-off') {
	const asAt = rest.indexOf('--as');
	const who = asAt >= 0 ? rest[asAt + 1] : undefined;
	if (!who) {
		console.error('Usage: node scripts/review-queue.mjs sign-off <page-id...> --as <person-id> [--force]');
		process.exit(2);
	}
	const ids = rest.filter((a, i) => !a.startsWith('--') && i !== asAt + 1);
	signOff(ids, who, rest.includes('--force'));
} else {
	const ready = pages.filter((p) => p.status !== 'published' && !p.blockers.length);
	const notYet = pages.filter((p) => p.status !== 'published' && p.blockers.length);
	const done = pages.filter((p) => p.status === 'published');
	const row = (p) => `| [${p.title}](/${p.id}/) | \`${p.id}\` | ${p.status} | ${p.words} | ${p.sources} |`;
	const head = '| Page | Id | Status | Words | Sources |\n| --- | --- | --- | --- | --- |';
	const out = `# Review queue

Generated by \`node scripts/review-queue.mjs\`. Re-run it after merging content; don't edit by hand.
How sign-off works: [publishing.md](./publishing.md).

**${ready.length}** ready for sign-off · **${notYet.length}** below the bar · **${done.length}** published

## Ready for sign-off

These clear the automatic bar (${MIN_WORDS}+ words and ${MIN_SOURCES}+ sources, or ${MIN_HUB_WORDS}+ words for overviews and About pages; no TODOs). A person still has to read each one.

${ready.length ? `${head}\n${ready.map(row).join('\n')}` : '_None yet._'}

## Below the bar

| Page | Id | Status | Why |
| --- | --- | --- | --- |
${notYet.map((p) => `| ${p.title} | \`${p.id}\` | ${p.status} | ${p.blockers.join(', ')} |`).join('\n')}

## Published

${done.length ? `${head}\n${done.map(row).join('\n')}` : '_None yet._'}
`;
	writeFileSync(join(ROOT, 'docs/review-queue.md'), out);
	console.log(`docs/review-queue.md: ${ready.length} ready, ${notYet.length} below the bar, ${done.length} published`);
}
