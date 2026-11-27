import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOg } from '../../lib/og';
import { SECTION_LABELS, accentFor } from '../../lib/share';
import { getNews, newsId, NEWS_PLATFORM_INFO } from '../../lib/news';

// One preview image per guide, plus the home page and the gallery, built once at deploy.
export const getStaticPaths = (async () => {
	const docs = await getCollection('docs');
	const news = (await getNews()).map((n) => ({
		params: { slug: newsId(n) },
		props: { title: n.data.title, description: n.data.summary, kicker: `News · ${NEWS_PLATFORM_INFO[n.data.platform].name}`, accent: accentFor(`news/${n.data.platform}`) },
	}));
	return [
		{
			params: { slug: 'home' },
			props: { title: 'The creator playbook, minus the gurus.', description: 'How the algorithm picks what gets seen, what deals should pay, and the setups real creators use. Every claim sourced.', kicker: undefined, accent: '#ff86b8' },
		},
		{
			params: { slug: 'guides' },
			props: { title: 'Every guide, searchable', description: 'Algorithms, deals, pricing, teams and tools. Free, sourced and open source.', kicker: 'All guides', accent: accentFor('guides') },
		},
		...docs
			.filter((d) => d.id !== 'guides')
			.map((d) => {
				const data = d.data as typeof d.data & { cover?: { tint?: string } };
				return {
					params: { slug: d.id },
					props: {
						title: d.data.title,
						description: d.data.description,
						kicker: SECTION_LABELS[d.id.split('/')[0]],
						accent: accentFor(d.id, data.cover?.tint),
					},
				};
			}),
		...news,
	];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await renderOg(props as Parameters<typeof renderOg>[0])), {
		headers: { 'Content-Type': 'image/png' },
	});
