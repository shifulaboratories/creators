#!/usr/bin/env node
/**
 * Translation status: which pages are translated, which translations are out of
 * date with their English original, and which still need a native review.
 *
 *   npm run i18n:status            report
 *   npm run i18n:status -- --check exit 1 if any translation is stale (for CI)
 *
 * A translation records the English file's commit in its frontmatter:
 *   translation: { source: "abc1234", review: machine | native }
 * It is stale when the English file has commits after that one.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { PREFIXES } from '../src/i18n/locales.mjs';

const DOCS = 'src/content/docs';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const files = git('ls-files', DOCS).split('\n').filter((f) => /\.mdx?$/.test(f));
const english = files.filter((f) => !PREFIXES.some((p) => f.startsWith(`${DOCS}/${p}/`)));
const check = process.argv.includes('--check');

const front = (file) => {
	const m = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
	const fm = m?.[1] ?? '';
	const source = fm.match(/^\s+source:\s*["']?([0-9a-f]{7,40})["']?/m)?.[1];
	const review = fm.match(/^\s+review:\s*(\w+)/m)?.[1] ?? 'machine';
	return { source, review };
};

let stale = 0;
for (const p of PREFIXES) {
	const rows = [];
	let done = 0;
	for (const en of english) {
		const rel = relative(DOCS, en);
		const tr = join(DOCS, p, rel);
		if (!existsSync(tr)) continue;
		done++;
		const { source, review } = front(tr);
		let state = 'ok';
		if (!source) state = 'no source commit';
		else {
			try {
				const newer = git('rev-list', '--count', `${source}..HEAD`, '--', en);
				if (Number(newer) > 0) {
					state = `STALE: English changed in ${newer} commit(s) since ${source}`;
					stale++;
				}
			} catch {
				state = `unknown commit ${source}`;
			}
		}
		rows.push(`  ${state === 'ok' ? '✓' : '!'} ${rel}  [${review}]${state === 'ok' ? '' : `  ${state}`}`);
	}
	console.log(`\n${p}: ${done} of ${english.length} pages translated`);
	console.log(rows.join('\n') || '  (none)');
	const machine = rows.filter((r) => r.includes('[machine]')).length;
	if (machine) console.log(`  ${machine} still need a native speaker's review (set review: native and reviewer: <id>)`);
}
console.log('\nUntranslated pages show the English text under /es/ and /pt-br/ and are kept out of search engines.');
if (check && stale) {
	console.error(`\n${stale} stale translation(s). Update them or bump translation.source after checking.`);
	process.exit(1);
}
