// @ts-check
/**
 * Reads CHANGELOG.md and the pending notes in changes/. How to write them:
 * docs/releasing.md. Used by /changelog/ and scripts/release.mjs.
 *
 * A release in CHANGELOG.md looks like:
 *
 *   ## 0.7.0 · 2026-11-27 · Roadmap and changelog
 *
 *   One or two sentences for readers.
 *
 *   ### Added
 *   - **Roadmap.** What it is, in plain words. (#48)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/** Section order and reader-facing names. Fragment `type:` must be one of these keys. */
export const GROUPS = { added: 'New', changed: 'Improved', fixed: 'Fixed', removed: 'Removed' };
/** @typedef {keyof typeof GROUPS} Group */
/** @typedef {'major' | 'minor' | 'patch'} Bump */
/** @typedef {{ version: string, date: string, title: string, summary: string, groups: { key: Group, items: string[] }[] }} Release */
/** @typedef {{ file: string, type: Group, bump: Bump, text: string }} Fragment */

const HEAD = /^## (\d+\.\d+\.\d+) · (\d{4}-\d{2}-\d{2})(?: · (.+))?$/;
const keyFor = (/** @type {string} */ name) => /** @type {Group | undefined} */ (Object.entries(GROUPS).find(([k, v]) => k === name.toLowerCase() || v.toLowerCase() === name.toLowerCase())?.[0]);

/** @param {string} md @returns {Release[]} */
export function parseChangelog(md) {
	/** @type {Release[]} */
	const out = [];
	/** @type {Release | undefined} */
	let cur;
	/** @type {{ key: Group, items: string[] } | undefined} */
	let group;
	for (const raw of md.replace(/\r/g, '').split('\n')) {
		const line = raw.trimEnd();
		const h = line.match(HEAD);
		if (h) {
			cur = { version: h[1], date: h[2], title: h[3] ?? '', summary: '', groups: [] };
			group = undefined;
			out.push(cur);
			continue;
		}
		if (!cur) continue;
		const g = line.match(/^### (.+)$/);
		if (g) {
			const key = keyFor(g[1]);
			if (!key) throw new Error(`CHANGELOG ${cur.version}: unknown section "${g[1]}" (use ${Object.keys(GROUPS).join(', ')})`);
			group = { key, items: [] };
			cur.groups.push(group);
		} else if (/^- /.test(line) && group) group.items.push(line.slice(2));
		else if (/^\s{2,}\S/.test(line) && group?.items.length) group.items[group.items.length - 1] += ' ' + line.trim();
		else if (line && !group) cur.summary = (cur.summary ? cur.summary + ' ' : '') + line.trim();
	}
	return out;
}

/** @param {string} root repo root @returns {Release[]} */
export function readChangelog(root) {
	return parseChangelog(readFileSync(join(root, 'CHANGELOG.md'), 'utf8'));
}

/** Pending notes in changes/*.md (README.md is skipped). @param {string} root @returns {Fragment[]} */
export function readFragments(root) {
	const dir = join(root, 'changes');
	if (!existsSync(dir)) return [];
	return readdirSync(dir)
		.filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
		.sort()
		.map((file) => {
			const src = readFileSync(join(dir, file), 'utf8').replace(/\r/g, '');
			const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
			if (!m) throw new Error(`changes/${file}: needs frontmatter with type and bump (see changes/README.md)`);
			const fm = Object.fromEntries(m[1].split('\n').map((l) => l.split(':').map((s) => s.trim())).filter((p) => p.length >= 2));
			const type = keyFor(fm.type ?? '');
			const bump = fm.bump ?? 'patch';
			if (!type) throw new Error(`changes/${file}: type must be one of ${Object.keys(GROUPS).join(', ')}`);
			if (!['major', 'minor', 'patch'].includes(bump)) throw new Error(`changes/${file}: bump must be major, minor or patch`);
			const text = m[2].trim().replace(/^- /, '').replace(/\n+/g, ' ');
			if (!text) throw new Error(`changes/${file}: write one line for readers under the frontmatter`);
			return { file, type, bump: /** @type {Bump} */ (bump), text };
		});
}

/** @param {string} v @param {Bump} bump */
export function bumpVersion(v, bump) {
	const [a, b, c] = v.split('.').map(Number);
	if (bump === 'major') return `${a + 1}.0.0`;
	if (bump === 'minor') return `${a}.${b + 1}.0`;
	return `${a}.${b}.${c + 1}`;
}

/** The biggest bump asked for by any fragment. @param {Fragment[]} fs @returns {Bump} */
export function biggestBump(fs) {
	return fs.some((f) => f.bump === 'major') ? 'major' : fs.some((f) => f.bump === 'minor') ? 'minor' : 'patch';
}

const esc = (/** @type {string} */ s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The little Markdown a changelog line uses → HTML: **bold**, `code`, [links](url), #123. @param {string} s @param {string} repoUrl */
export function inlineHtml(s, repoUrl) {
	return esc(s)
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t, u) => `<a href="${u}">${t}</a>`)
		.replace(/(^|[\s(,])#(\d+)\b/g, (_m, pre, n) => `${pre}<a href="${repoUrl}/pull/${n}">#${n}</a>`);
}
