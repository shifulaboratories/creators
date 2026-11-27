// Languages the site is published in. English lives at the root (/guides/),
// translations under a prefix (/es/guides/, /pt-br/guides/).
// Adding a language: add it here, add its strings to src/i18n/ui.ts,
// then follow docs/translating.md.
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

/** Starlight `locales` config. Keys are URL prefixes; `root` is English. */
export const STARLIGHT_LOCALES = {
	root: { label: 'English', lang: 'en' },
	es: { label: 'Español', lang: 'es' },
	'pt-br': { label: 'Português', lang: 'pt-BR' },
};

/** URL prefixes of the translated locales. */
export const PREFIXES = Object.keys(STARLIGHT_LOCALES).filter((k) => k !== 'root');

/**
 * Pages that exist in each translated locale, as base ids ("paywall/fanfix").
 * Read from disk so astro.config.mjs can keep untranslated (fallback) pages
 * out of the sitemap before the content layer runs.
 */
export function translatedIds(root = new URL('../content/docs/', import.meta.url).pathname) {
	const out = {};
	for (const p of PREFIXES) {
		const dir = join(root, p);
		const ids = new Set();
		const walk = (d) => {
			let names = [];
			try {
				names = readdirSync(d);
			} catch {
				return;
			}
			for (const n of names) {
				const f = join(d, n);
				if (statSync(f).isDirectory()) walk(f);
				else if (/\.mdx?$/.test(n)) ids.add(relative(dir, f).replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '').toLowerCase());
			}
		};
		walk(dir);
		out[p] = ids;
	}
	return out;
}
