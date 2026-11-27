// Checks every link and image in the built site (dist/) that points at this site:
// the page or file must exist, and a #section must exist on that page.
// Run after `npm run build`:  node scripts/check-links.mjs
// External links are checked separately in CI (.github/workflows/links.yml).
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const idCache = new Map();
const idsOf = (f) => {
	if (!idCache.has(f)) idCache.set(f, new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
	return idCache.get(f);
};
const fileFor = (p) => [join(DIST, p), join(DIST, p, 'index.html'), join(DIST, p + '.html')].find((x) => existsSync(x) && statSync(x).isFile());

const problems = new Map();
const report = (what, page) => {
	if (!problems.has(what)) problems.set(what, new Set());
	problems.get(what).add(page);
};

for (const f of pages) {
	const page = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\.html$/, '/');
	if (page === '/404/' || page.endsWith('/404/')) continue;
	const html = readFileSync(f, 'utf8');
	if (html.includes('http-equiv="refresh"')) continue; // redirect pages
	// Skip inline scripts: they build links from variables at run time.
	const markup = html.replace(/<script\b[\s\S]*?<\/script>/g, '');
	for (const m of markup.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
		let u = m[1].replace(/&amp;/g, '&').replace(/^https:\/\/creators\.select(?=\/|$)/, '');
		if (u === '') u = '/';
		if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(u) || u === '#') continue;
		const url = new URL(u, 'https://x' + page);
		if (/^\/(api|icons)\//.test(url.pathname)) continue; // served by the Worker (worker/index.ts)
		const target = fileFor(decodeURIComponent(url.pathname));
		if (!target) report(url.pathname, page);
		else if (url.hash && target.endsWith('.html') && !idsOf(target).has(decodeURIComponent(url.hash.slice(1)))) report(url.pathname + url.hash, page);
	}
}

if (problems.size) {
	console.error(`${problems.size} broken link(s) in ${pages.length} pages:`);
	for (const [what, from] of problems) console.error(`  ${what}  ← ${[...from].slice(0, 3).join(', ')}${from.size > 3 ? ` and ${from.size - 3} more` : ''}`);
	process.exit(1);
}
console.log(`No broken links in ${pages.length} pages.`);
