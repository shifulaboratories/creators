/**
 * Helpers for the translated site. English is the source of truth; Spanish and
 * Portuguese copies live in src/content/docs/es/ and src/content/docs/pt-br/.
 * Pages without a translation still get a localized URL (Starlight shows the
 * English text with a notice), but they are kept out of search engines.
 */
import { PREFIXES } from './locales.mjs';
import { ui, type UI } from './ui';

export type Locale = 'en' | 'es' | 'pt-br';
export const LOCALES: Locale[] = ['en', ...(PREFIXES as Locale[])];
export const HTML_LANG: Record<Locale, string> = { en: 'en', es: 'es', 'pt-br': 'pt-BR' };
/** Open Graph locale codes. */
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', es: 'es_419', 'pt-br': 'pt_BR' };

const isPrefix = (s: string): s is Exclude<Locale, 'en'> => (PREFIXES as string[]).includes(s);

/** "es/paywall/fanfix" → { locale: 'es', base: 'paywall/fanfix' }. */
export function splitId(id: string): { locale: Locale; base: string } {
	const [first, ...rest] = id.split('/');
	if (isPrefix(first)) return { locale: first, base: rest.join('/') };
	return { locale: 'en', base: id };
}

/** Locale of a URL path like "/pt-br/guides/". */
export function localeOfPath(pathname: string): Locale {
	const first = pathname.split('/')[1] ?? '';
	return isPrefix(first) ? first : 'en';
}

/** Path without its locale prefix: "/es/guides/" → "/guides/". */
export function basePath(pathname: string): string {
	const l = localeOfPath(pathname);
	return l === 'en' ? pathname : pathname.slice(l.length + 1) || '/';
}

/** Localize an internal path: ("es", "/guides/") → "/es/guides/". External links pass through. */
export function localize(locale: Locale, path: string): string {
	if (locale === 'en' || !path.startsWith('/') || path.startsWith('//')) return path;
	if (/^\/(og|pagefind|_astro|llms|favicon|apple-touch)/.test(path) || /\.(md|txt|png|svg|xml)$/.test(path)) return path;
	return `/${locale}${path}`;
}

/** Strings for custom components (Starlight's own UI is translated by Starlight). */
export function t(locale: Locale): UI {
	return ui[locale] ?? ui.en;
}

/** Section name ("deals") in a locale. */
export function sectionLabel(section: string, locale: Locale): string | undefined {
	return t(locale).sections[section] ?? ui.en.sections[section];
}

/** Docs entries in one locale, keyed by base id. */
export function inLocale<T extends { id: string }>(entries: T[], locale: Locale): T[] {
	return entries.filter((e) => splitId(e.id).locale === locale);
}

/**
 * For a locale, the entry to show for each base id: the translation if there is
 * one, otherwise the English original. Each item says whether it is translated.
 */
export function withFallback<T extends { id: string }>(entries: T[], locale: Locale): { entry: T; base: string; translated: boolean }[] {
	const english = inLocale(entries, 'en');
	if (locale === 'en') return english.map((entry) => ({ entry, base: entry.id, translated: true }));
	const local = new Map(inLocale(entries, locale).map((e) => [splitId(e.id).base, e]));
	return english.map((e) => {
		const tr = local.get(e.id);
		return { entry: tr ?? e, base: e.id, translated: !!tr };
	});
}

/** Current locale of a page, from its URL (works in Starlight and custom pages). */
export function currentLocale(astro: { url: URL }): Locale {
	return localeOfPath(astro.url.pathname);
}
