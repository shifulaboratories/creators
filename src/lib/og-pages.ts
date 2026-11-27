import { getCollection } from 'astro:content';
import { SECTION_LABELS, accentFor } from './share';
import { getNews, newsId, NEWS_PLATFORM_INFO } from './news';
import { terms, seoTitle } from './glossary';

// Every page that gets a preview image (and animated preview): guides, news, home, gallery.
export async function ogPages() {
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
}
