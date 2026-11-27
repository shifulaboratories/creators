/**
 * Adds link-preview and search metadata to every Starlight page: a per-page
 * Open Graph image (built by src/pages/og/), and JSON-LD structured data.
 * Starlight already adds canonical, og:title/description/url and the sitemap link.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { SITE_NAME } from './site.mjs';
import { SITE_ORIGIN, SECTION_LABELS, ogPath, ogVideoPath, ogVideoTags } from './lib/share';
import { HAS_VIDEO } from './lib/og-video';
import { personName, CONTRIBUTORS_PATH } from './data/people';
import { getTerm, sortedTerms, termPath } from './lib/glossary';
import { SEO } from './data/seo';
import { NEWS_PLATFORM_INFO } from './lib/news';

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const { entry, head } = route;
	const id = entry.id;
	if (id === '404') return;

	// The sidebar shows only the section you're in. The top nav covers the rest.
	type SB = (typeof route.sidebar)[number];
	const hasCurrent = (e: SB): boolean => (e.type === 'group' ? e.entries.some(hasCurrent) : e.isCurrent);
	const current = route.sidebar.filter((e) => e.type === 'group' && hasCurrent(e));
	if (current.length) {
		route.sidebar = current.map((g) => (g.type === 'group' ? { ...g, collapsed: false } : g));
	}
	const image = `${SITE_ORIGIN}${ogPath(id)}`;
	const url = new URL(context.url.pathname, SITE_ORIGIN).href;
	const title = entry.data.title;

	head.push(
		{ tag: 'meta', attrs: { property: 'og:image', content: image } },
		{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
		{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
		{ tag: 'meta', attrs: { property: 'og:image:alt', content: `${title} · ${SITE_NAME}` } },
		{ tag: 'meta', attrs: { name: 'twitter:image', content: image } },
	);
	if (HAS_VIDEO) {
		const ogType = head.find((t) => t.tag === 'meta' && t.attrs?.property === 'og:type');
		if (ogType?.attrs) ogType.attrs.content = 'video.other';
		for (const attrs of ogVideoTags(`${SITE_ORIGIN}${ogVideoPath(id)}`)) head.push({ tag: 'meta', attrs });
	}

	// Search titles: apply overrides (src/data/seo.ts), and drop the site name
	// when it would push the title past what Google shows (~60 characters).
	const seo = SEO[id];
	const set = (match: (h: (typeof head)[number]) => boolean, value: string, attr = 'content') => {
		for (const h of head) if (match(h)) (attr === 'text' ? (h.content = value) : ((h.attrs ??= {})[attr] = value));
	};
	const titleTag = head.find((h) => h.tag === 'title');
	if (seo?.title && titleTag) titleTag.content = `${seo.title} | ${SITE_NAME}`;
	if (titleTag?.content && titleTag.content.length > 65 && titleTag.content.endsWith(` | ${SITE_NAME}`)) {
		titleTag.content = titleTag.content.slice(0, -` | ${SITE_NAME}`.length);
	}
	if (seo?.title) set((h) => h.attrs?.property === 'og:title', seo.title);
	if (seo?.description) {
		set((h) => h.attrs?.name === 'description', seo.description);
		set((h) => h.attrs?.property === 'og:description', seo.description);
	}

	const section = id.split('/')[0];
	const crumbs = [{ name: SITE_NAME, url: `${SITE_ORIGIN}/` }];
	const data = entry.data as typeof entry.data & {
		authors?: string[];
		lastReviewed?: Date;
		status?: string;
		news?: { platform: string; announced: Date; published: Date; updated?: Date };
	};
	const news = data.news;
	if (id.includes('/') && SECTION_LABELS[section]) crumbs.push({ name: SECTION_LABELS[section], url: `${SITE_ORIGIN}/${section}/` });
	if (news) crumbs.push({ name: NEWS_PLATFORM_INFO[news.platform]?.name ?? news.platform, url: `${SITE_ORIGIN}/news/${news.platform}/` });
	crumbs.push({ name: title, url });

	// News pages offer the RSS feed to readers and feed readers.
	if (section === 'news') {
		head.push({ tag: 'link', attrs: { rel: 'alternate', type: 'application/rss+xml', title: `Platform news · ${SITE_NAME}`, href: `${SITE_ORIGIN}/news/feed.xml` } });
	}

	// Outline pages are placeholders: keep them out of search results until written.
	head.push({
		tag: 'meta',
		attrs: { name: 'robots', content: data.status === 'outline' && id !== 'guides' ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1' },
	});

	// Section front pages and the Guides index are collections, not articles.
	// Per-platform news pages (news/instagram) are collections too.
	const isCollection = id === 'guides' || (!id.includes('/') && id !== 'index') || (section === 'news' && id.split('/').length === 2 && !news);
	const modified = news ? (news.updated ?? news.published) : (route.lastUpdated ?? data.lastReviewed);
	// Glossary: each term page is about one DefinedTerm in the site's DefinedTermSet.
	const termSet = { '@type': 'DefinedTermSet', '@id': `${SITE_ORIGIN}/glossary/#set`, name: `${SITE_NAME} creator glossary`, url: `${SITE_ORIGIN}/glossary/` };
	const term = id.startsWith('glossary/') ? getTerm(id.slice(9)) : undefined;
	const glossaryNodes = term
		? [
				{
					'@type': 'DefinedTerm',
					'@id': `${url}#term`,
					name: term.term,
					...(term.full ? { alternateName: [term.full, ...(term.aka ?? [])] } : term.aka?.length ? { alternateName: term.aka } : {}),
					description: term.short,
					url,
					termCode: term.slug,
					inDefinedTermSet: termSet,
				},
			]
		: id === 'glossary'
			? [
					{
						...termSet,
						description: entry.data.description,
						hasDefinedTerm: sortedTerms.map((t) => ({ '@type': 'DefinedTerm', name: t.term, description: t.short, url: `${SITE_ORIGIN}${termPath(t.slug)}` })),
					},
				]
			: [];

	const graph = [
		...glossaryNodes,
		{
			'@type': term ? 'WebPage' : news ? 'NewsArticle' : isCollection ? 'CollectionPage' : 'Article',
			...(term ? { about: { '@id': `${url}#term` }, mainEntity: { '@id': `${url}#term` } } : {}),
			...(news ? { datePublished: news.published.toISOString(), articleSection: NEWS_PLATFORM_INFO[news.platform]?.name, about: { '@type': 'Organization', name: NEWS_PLATFORM_INFO[news.platform]?.name } } : {}),
			headline: title,
			description: seo?.description ?? entry.data.description,
			image,
			url,
			mainEntityOfPage: url,
			inLanguage: 'en',
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
