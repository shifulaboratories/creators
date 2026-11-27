/**
 * Adds link-preview and search metadata to every Starlight page: a per-page
 * Open Graph image (built by src/pages/og/), and JSON-LD structured data.
 * Starlight already adds canonical, og:title/description/url and the sitemap link.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { SITE_NAME } from './site.mjs';
import { SITE_ORIGIN, SECTION_LABELS, ogPath } from './lib/share';
import { personName, CONTRIBUTORS_PATH } from './data/people';
import { NEWS_PLATFORM_INFO } from './lib/news';
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
	const id = entry.id;
	if (base === '404') return;

	// hreflang: Starlight links every locale; keep only languages this page is really in.
	// The Guides gallery (src/pages/) is translated in code, so it exists in every language.
	const langs = base === 'guides' ? new Set<Locale>(LOCALES) : ((await loadTranslations()).get(base) ?? new Set<Locale>(['en']));
	const keepLang = new Set([...langs].map((l) => HTML_LANG[l]).concat('x-default'));
	const isAlt = (h: (typeof route.head)[number]) => h.tag === 'link' && h.attrs?.rel === 'alternate' && !!h.attrs.hreflang;
	route.head = route.head.filter((h) => !isAlt(h) || (langs.size > 1 && keepLang.has(String(h.attrs!.hreflang))));

	// An untranslated page under /es/ or /pt-br/ shows the English text: point
	// search engines at the English original and keep the copy out of the index.
	const isFallback = locale !== 'en' && entryLocale === 'en';
	if (isFallback) {
		const english = new URL(context.url.pathname.replace(`/${locale}/`, '/'), SITE_ORIGIN).href;
		for (const h of route.head) if (h.tag === 'link' && h.attrs?.rel === 'canonical') h.attrs.href = english;
	}
	// Starlight sets og:locale to the bare language; use the full Open Graph code.
	route.head = route.head.filter((h) => !(h.tag === 'meta' && h.attrs?.property === 'og:locale'));
	route.head.push({ tag: 'meta', attrs: { property: 'og:locale', content: OG_LOCALE[isFallback ? 'en' : locale] } });
	if (!isFallback) for (const l of langs) if (l !== locale) route.head.push({ tag: 'meta', attrs: { property: 'og:locale:alternate', content: OG_LOCALE[l] } });
	const head = route.head;

	// The sidebar shows only the section you're in. The top nav covers the rest.
	type SB = (typeof route.sidebar)[number];
	const hasCurrent = (e: SB): boolean => (e.type === 'group' ? e.entries.some(hasCurrent) : e.isCurrent);
	const current = route.sidebar.filter((e) => e.type === 'group' && hasCurrent(e));
	if (current.length) {
		route.sidebar = current.map((g) => (g.type === 'group' ? { ...g, collapsed: false } : g));
	}
	const image = `${SITE_ORIGIN}${ogPath(base === 'guides' ? base : id)}`;
	const url = new URL(context.url.pathname, SITE_ORIGIN).href;
	const title = entry.data.title;

	head.push(
		{ tag: 'meta', attrs: { property: 'og:image', content: image } },
		{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
		{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
		{ tag: 'meta', attrs: { property: 'og:image:alt', content: `${title} · ${SITE_NAME}` } },
		{ tag: 'meta', attrs: { name: 'twitter:image', content: image } },
	);

	const section = base.split('/')[0];
	const crumbs = [{ name: SITE_NAME, url: `${SITE_ORIGIN}${localize(locale, '/')}` }];
	const data = entry.data as typeof entry.data & {
		authors?: string[];
		lastReviewed?: Date;
		status?: string;
		news?: { platform: string; announced: Date; published: Date; updated?: Date };
	};
	const news = data.news;
	if (base.includes('/') && SECTION_LABELS[section]) crumbs.push({ name: sectionLabel(section, locale)!, url: `${SITE_ORIGIN}${localize(locale, `/${section}/`)}` });
	if (news) crumbs.push({ name: NEWS_PLATFORM_INFO[news.platform]?.name ?? news.platform, url: `${SITE_ORIGIN}/news/${news.platform}/` });
	crumbs.push({ name: title, url });

	// News pages offer the RSS feed to readers and feed readers.
	if (section === 'news') {
		head.push({ tag: 'link', attrs: { rel: 'alternate', type: 'application/rss+xml', title: `Platform news · ${SITE_NAME}`, href: `${SITE_ORIGIN}/news/feed.xml` } });
	}

	// Outline pages are placeholders: keep them out of search results until written.
	head.push({
		tag: 'meta',
		attrs: {
			name: 'robots',
			content: isFallback || (data.status === 'outline' && base !== 'guides') ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
		},
	});

	// Section front pages and the Guides index are collections, not articles.
	// Per-platform news pages (news/instagram) are collections too.
	const isCollection = base === 'guides' || (!base.includes('/') && base !== 'index') || (section === 'news' && base.split('/').length === 2 && !news);
	const modified = news ? (news.updated ?? news.published) : (route.lastUpdated ?? data.lastReviewed);
	const graph = [
		{
			'@type': news ? 'NewsArticle' : isCollection ? 'CollectionPage' : 'Article',
			...(news ? { datePublished: news.published.toISOString(), articleSection: NEWS_PLATFORM_INFO[news.platform]?.name, about: { '@type': 'Organization', name: NEWS_PLATFORM_INFO[news.platform]?.name } } : {}),
			headline: title,
			description: entry.data.description,
			image,
			url,
			mainEntityOfPage: url,
			inLanguage: HTML_LANG[entryLocale],
			...(entryLocale !== 'en' ? { isBasedOn: new URL(`/${base}/`, SITE_ORIGIN).href } : {}),
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
	head.push({
		tag: 'script',
		attrs: { type: 'application/ld+json' },
		content: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'),
	});
});
