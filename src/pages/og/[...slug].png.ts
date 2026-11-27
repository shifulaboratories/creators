import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOg } from '../../lib/og';
import { accentFor } from '../../lib/share';
import { splitId, sectionLabel } from '../../i18n';

// One preview image per guide, plus the home page and the gallery, built once at deploy.
export const getStaticPaths = (async () => {
	const docs = await getCollection('docs');
	return [
		{
			params: { slug: 'home' },
			props: { title: 'The creator playbook, minus the gurus.', description: 'How the algorithm picks what gets seen, what deals should pay, and the setups real creators use. Every claim sourced.', kicker: undefined, accent: '#ff86b8' },
		},
		// Home page previews in Spanish and Portuguese.
		{
			params: { slug: 'es/home' },
			props: { title: 'El manual del creador, sin gurús.', description: 'Cómo elige el algoritmo lo que se ve, cuánto deberían pagar las marcas y con qué graban los creadores reales. Todo con fuentes.', kicker: undefined, accent: '#ff86b8' },
		},
		{
			params: { slug: 'pt-br/home' },
			props: { title: 'O manual do criador, sem gurus.', description: 'Como o algoritmo escolhe o que aparece, quanto as publis deveriam pagar e com que equipamento os criadores gravam. Tudo com fonte.', kicker: undefined, accent: '#ff86b8' },
		},
		{
			params: { slug: 'guides' },
			props: { title: 'Every guide, searchable', description: 'Algorithms, deals, pricing, teams and tools. Free, sourced and open source.', kicker: 'All guides', accent: accentFor('guides') },
		},
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
	];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await renderOg(props as Parameters<typeof renderOg>[0])), {
		headers: { 'Content-Type': 'image/png' },
	});
