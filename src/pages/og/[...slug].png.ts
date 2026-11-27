import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOg } from '../../lib/og';
import { SECTION_LABELS, accentFor } from '../../lib/share';
import { terms, seoTitle } from '../../lib/glossary';
import { splitId, sectionLabel } from '../../i18n';
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
		// Home page previews in Spanish and Portuguese.
		{
			params: { slug: 'es/home' },
			props: { title: 'El manual del creador, sin gurús.', description: 'Cómo elige el algoritmo lo que se ve, cuánto deberían pagar las marcas y cómo manejar el negocio. Todo con fuentes.', kicker: undefined, accent: '#ff86b8' },
		},
		{
			params: { slug: 'pt-br/home' },
			props: { title: 'O manual do criador, sem gurus.', description: 'Como o algoritmo escolhe o que aparece, quanto as publis deveriam pagar e como cuidar do negócio. Tudo com fonte.', kicker: undefined, accent: '#ff86b8' },
		},
		{
			params: { slug: 'guides' },
			props: { title: 'Every guide, searchable', description: 'Algorithms, deals, pricing, teams and tools. Free, sourced and open source.', kicker: 'All guides', accent: accentFor('guides') },
		},
		{
			params: { slug: 'glossary' },
			props: { title: 'The creator glossary', description: 'CPM, RPM, usage rights, exclusivity and more, in plain English with real numbers.', kicker: 'Glossary', accent: accentFor('glossary') },
		},
		...terms.map((t) => ({
			params: { slug: `glossary/${t.slug}` },
			props: { title: seoTitle(t).includes('?') ? seoTitle(t).split('?')[0] + '?' : t.term, description: t.short, kicker: 'Glossary', accent: accentFor('glossary') },
		})),
		...docs
			.filter((d) => d.id !== 'guides')
			.map((d) => {
				const data = d.data as typeof d.data & { cover?: { tint?: string } };
				const { locale, base } = splitId(d.id);
				return {
					params: { slug: d.id },
					props: {
						title: d.data.title,
						description: d.data.description,
						kicker: sectionLabel(base.split('/')[0], locale),
						accent: accentFor(base, data.cover?.tint),
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
