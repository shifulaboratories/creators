/**
 * Adds link-preview and search metadata to every Starlight page: a per-page
 * Open Graph image (built by src/pages/og/), and JSON-LD structured data.
 * Starlight already adds canonical, og:title/description/url and the sitemap link.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { SITE_NAME } from './site.mjs';
import { SITE_ORIGIN, SECTION_LABELS, ogPath } from './lib/share';
import { personName, CONTRIBUTORS_PATH } from './data/people';
import { getCollection } from 'astro:content';
import { splitId, localize, sectionLabel, HTML_LANG, OG_LOCALE, LOCALES, type Locale } from './i18n';

// Which base ids have a real translation, per locale (for hreflang).
let translations: Promise<Map<string, Set<Locale>>> | undefined;
const loadTranslations = () =>
	(translations ??= getCollection('docs').then((docs) => {
		const m = new Map<string, Set<Locale>>();
		for (const d of docs) {
			const { locale, base } = splitId(d.id);
			if (!m.has(base)) m.set(base, new Set());
			m.get(base)!.add(locale);
		}
		return m;
	}));

export const onRequest = defineRouteMiddleware(async (context) => {
	const route = context.locals.starlightRoute;
	const { entry } = route;
	const { base, locale: entryLocale } = splitId(entry.id);
	const locale = (route.locale ?? 'en') as Locale;
	if (base === '404') return;
	const id = entry.id;
	const image = `${SITE_ORIGIN}${ogPath(base === 'guides' ? base : id)}`;
	const url = new URL(context.url.pathname, SITE_ORIGIN).href;
	const title = entry.data.title;

	// hreflang: Starlight links every locale; keep only languages this page is really in.
	// The Guides gallery (src/pages/) is translated in code, so it exists in every language.
	const langs = base === 'guides' ? new Set<Locale>(LOCALES) : ((await loadTranslations()).get(base) ?? new Set<Locale>(['en']));
	const keepLang = new Set([...langs].map((l) => HTML_LANG[l]).concat('x-default'));
	route.head = route.head.filter((h) => !(h.tag === 'link' && h.attrs?.rel === 'alternate' && h.attrs.hreflang && !keepLang.has(String(h.attrs.hreflang))));
	if (langs.size <= 1) route.head = route.head.filter((h) => !(h.tag === 'link' && h.attrs?.rel === 'alternate' && h.attrs.hreflang));
	const head = route.head;

	// An untranslated page under /es/ or /pt-br/ shows the English text: point
	// search engines at the English original and keep the copy out of the index.
	const isFallback = locale !== 'en' && entryLocale === 'en';
	if (isFallback) {
		const english = new URL(context.url.pathname.replace(`/${locale}/`, '/'), SITE_ORIGIN).href;
		for (const h of head) if (h.tag === 'link' && h.attrs?.rel === 'canonical') h.attrs.href = english;
	}
	// Starlight sets og:locale to the bare language; use the full Open Graph code.
	route.head = head.filter((h) => !(h.tag === 'meta' && h.attrs?.property === 'og:locale'));
	route.head.push({ tag: 'meta', attrs: { property: 'og:locale', content: OG_LOCALE[isFallback ? 'en' : locale] } });
	if (!isFallback) for (const l of langs) if (l !== locale) route.head.push({ tag: 'meta', attrs: { property: 'og:locale:alternate', content: OG_LOCALE[l] } });
	const headOut = route.head;

	headOut.push(
		{ tag: 'meta', attrs: { property: 'og:image', content: image } },
		{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
		{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
		{ tag: 'meta', attrs: { property: 'og:image:alt', content: `${title} · ${SITE_NAME}` } },
		{ tag: 'meta', attrs: { name: 'twitter:image', content: image } },
	);

	const section = base.split('/')[0];
	const crumbs = [{ name: SITE_NAME, url: `${SITE_ORIGIN}${localize(locale, '/')}` }];
	if (base.includes('/') && SECTION_LABELS[section]) crumbs.push({ name: sectionLabel(section, locale)!, url: `${SITE_ORIGIN}${localize(locale, `/${section}/`)}` });
	crumbs.push({ name: title, url });

	const data = entry.data as typeof entry.data & { authors?: string[]; lastReviewed?: Date; status?: string };

	// Outline pages are placeholders: keep them out of search results until written.
	headOut.push({
		tag: 'meta',
		attrs: {
			name: 'robots',
			content: isFallback || (data.status === 'outline' && base !== 'guides') ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
		},
	});

	// Section front pages and the Guides index are collections, not articles.
	const isCollection = base === 'guides' || (!base.includes('/') && base !== 'index');
	const modified = route.lastUpdated ?? data.lastReviewed;
	const graph = [
		{
			'@type': isCollection ? 'CollectionPage' : 'Article',
			headline: title,
			description: entry.data.description,
			image,
			url,
			mainEntityOfPage: url,
			inLanguage: HTML_LANG[entryLocale],
			...(entryLocale !== 'en'
				? { translationOfWork: { '@id': new URL(`/${base}/`, SITE_ORIGIN).href }, isBasedOn: new URL(`/${base}/`, SITE_ORIGIN).href }
				: {}),
			...(modified ? { dateModified: modified.toISOString() } : {}),
			author: data.authors?.length
				? data.authors.map((a) => ({ '@type': 'Person', name: personName(a), url: `${SITE_ORIGIN}${CONTRIBUTORS_PATH}#${a}` }))
				: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
			publisher: { '@id': `${SITE_ORIGIN}/#org` },
			isAccessibleForFree: true,
		},
		{
			'@type': 'BreadcrumbList',
			itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
		},
		{
			'@type': 'Organization',
			'@id': `${SITE_ORIGIN}/#org`,
			name: SITE_NAME,
			url: `${SITE_ORIGIN}/`,
			logo: `${SITE_ORIGIN}/apple-touch-icon.png`,
			sameAs: ['https://www.instagram.com/selectcreators/', 'https://github.com/shifulaboratories/creators'],
		},
	];
	headOut.push({
		tag: 'script',
		attrs: { type: 'application/ld+json' },
		content: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'),
	});
});
