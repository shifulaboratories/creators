/**
 * Adds link-preview and search metadata to every Starlight page: a per-page
 * Open Graph image (built by src/pages/og/), and JSON-LD structured data.
 * Starlight already adds canonical, og:title/description/url and the sitemap link.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { SITE_NAME } from './site.mjs';
import { SITE_ORIGIN, SECTION_LABELS, ogPath } from './lib/share';
import { personName, CONTRIBUTORS_PATH } from './data/people';

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const { entry, head } = route;
	const id = entry.id;
	if (id === '404') return;
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

	const section = id.split('/')[0];
	const crumbs = [{ name: SITE_NAME, url: `${SITE_ORIGIN}/` }];
	if (id.includes('/') && SECTION_LABELS[section]) crumbs.push({ name: SECTION_LABELS[section], url: `${SITE_ORIGIN}/${section}/` });
	crumbs.push({ name: title, url });

	const data = entry.data as typeof entry.data & { authors?: string[]; lastReviewed?: Date; status?: string };

	// Outline pages are placeholders: keep them out of search results until written.
	head.push({
		tag: 'meta',
		attrs: { name: 'robots', content: data.status === 'outline' && id !== 'guides' ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1' },
	});

	// Section front pages and the Guides index are collections, not articles.
	const isCollection = id === 'guides' || (!id.includes('/') && id !== 'index');
	const modified = route.lastUpdated ?? data.lastReviewed;
	const graph = [
		{
			'@type': isCollection ? 'CollectionPage' : 'Article',
			headline: title,
			description: entry.data.description,
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
