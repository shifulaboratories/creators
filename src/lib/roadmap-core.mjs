// @ts-check
/**
 * The public roadmap, built from GitHub Issues. Board rules: docs/board.md.
 *
 * Shared by the /roadmap/ page (src/lib/roadmap.ts) and the snapshot script
 * (scripts/roadmap-snapshot.mjs). Plain JS so Node can run it without a build.
 *
 *   open, label "status: in progress" or "status: blocked"  → Now
 *   open, label "status: next"                               → Next
 *   open, no status label                                    → Later (backlog)
 *   closed as completed                                      → Shipped
 *   closed as not planned, or labeled "internal"             → hidden
 *
 * A card's summary is the first paragraph of the issue body, so write that
 * paragraph for readers. Everything after it is for the team.
 */

export const REPO = 'shifulaboratories/creators';

/** @typedef {'now' | 'next' | 'later' | 'shipped'} Column */
/**
 * @typedef {{
 *   number: number; title: string; summary: string; url: string;
 *   column: Column; blocked: boolean; area: string | null; type: string | null;
 *   priority: string | null; updated: string; closed: string | null;
 * }} RoadmapItem
 */

/** Area label slug → reader-facing name. Keep in sync with .github/labels.yml. */
export const AREAS = {
	platforms: 'Platforms',
	grow: 'Grow',
	deals: 'Brand deals',
	paywall: 'Paywall',
	earn: 'Earn',
	money: 'Money',
	team: 'Team',
	stack: 'Stack',
	protect: 'Protect',
	underground: 'Underground',
	tools: 'Free tools',
	rates: 'Rates',
	translations: 'Translations',
	site: 'Site',
};

/** Type label slug → reader-facing name. */
export const TYPES = { feature: 'Feature', content: 'Guide', fix: 'Fix', review: 'Expert review' };

/** Strip Markdown to plain text for a one-paragraph summary. */
export function plain(md = '') {
	return md
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/```[\s\S]*?```/g, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[*_`>#]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/** First paragraph of an issue body, cut to about 220 characters. */
export function summaryOf(body = '') {
	const first = (body ?? '').replace(/\r/g, '').replace(/<!--[\s\S]*?-->/g, '').trim().split(/\n\s*\n|\n---/)[0] ?? '';
	const s = plain(first);
	return s.length > 220 ? s.slice(0, 217).replace(/\s+\S*$/, '') + '…' : s;
}

/**
 * One GitHub REST issue → a roadmap card, or null when it shouldn't show.
 * @param {any} i
 * @returns {RoadmapItem | null}
 */
export function toItem(i) {
	if (i.pull_request) return null;
	const labels = (i.labels ?? []).map((/** @type {any} */ l) => (typeof l === 'string' ? l : l.name).toLowerCase());
	if (labels.includes('internal')) return null;
	if (i.state === 'closed' && i.state_reason !== 'completed') return null;
	const pick = (/** @type {string} */ prefix) => labels.find((/** @type {string} */ l) => l.startsWith(prefix))?.slice(prefix.length).trim() ?? null;
	const status = pick('status:');
	/** @type {Column} */
	let column = 'later';
	if (i.state === 'closed') column = 'shipped';
	else if (status === 'in progress' || status === 'blocked') column = 'now';
	else if (status === 'next') column = 'next';
	return {
		number: i.number,
		title: i.title.trim(),
		summary: summaryOf(i.body),
		url: i.html_url,
		column,
		blocked: i.state === 'open' && status === 'blocked',
		area: pick('area:'),
		type: pick('type:'),
		priority: labels.find((/** @type {string} */ l) => /^p[0-3]$/.test(l))?.toUpperCase() ?? null,
		updated: i.updated_at,
		closed: i.closed_at ?? null,
	};
}

/**
 * Every issue in the repo, newest first. Uses GITHUB_TOKEN when set (5,000
 * requests an hour); without it GitHub allows 60, plenty for one build.
 * @param {{ token?: string, timeoutMs?: number }} [opts]
 * @returns {Promise<RoadmapItem[]>}
 */
export async function fetchRoadmap({ token, timeoutMs = 10000 } = {}) {
	/** @type {Record<string, string>} */
	const headers = { accept: 'application/vnd.github+json', 'user-agent': 'creators-select-roadmap', 'x-github-api-version': '2022-11-28' };
	if (token) headers.authorization = `Bearer ${token}`;
	/** @type {any[]} */
	const all = [];
	for (let page = 1; page <= 10; page++) {
		const url = `https://api.github.com/repos/${REPO}/issues?state=all&per_page=100&page=${page}`;
		let res = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
		// A token for another service (or an expired one) gets a 401; the repo is public, so retry without it.
		if (res.status === 401 && headers.authorization) {
			delete headers.authorization;
			res = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
		}
		if (!res.ok) throw new Error(`GitHub issues: HTTP ${res.status}`);
		const batch = await res.json();
		all.push(...batch);
		if (batch.length < 100) break;
	}
	return all.map(toItem).filter((x) => x !== null);
}
