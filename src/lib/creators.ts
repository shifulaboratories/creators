/**
 * The creator directory: one profile per file in src/data/creators/, joined
 * with the setups (src/data/setups/<id>-<year>.yaml), resources that name the
 * creator, and their case study. Everything shown is sourced and dated.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Creator = CollectionEntry<'creators'>['data'] & { id: string };
export type Setup = CollectionEntry<'setups'>['data'] & { id: string };

export const NICHES: Record<string, string> = {
	beauty: 'Beauty',
	business: 'Business',
	education: 'Education',
	entertainment: 'Entertainment',
	film: 'Film and photo',
	gaming: 'Gaming',
	lifestyle: 'Lifestyle',
	music: 'Music',
	podcast: 'Podcast',
	'short-form': 'Short-form',
	strategy: 'Strategy',
	tech: 'Tech',
};

export const PLATFORMS: Record<string, string> = {
	youtube: 'YouTube',
	tiktok: 'TikTok',
	instagram: 'Instagram',
	podcast: 'Podcast',
	newsletter: 'Newsletter',
	twitch: 'Twitch',
	linkedin: 'LinkedIn',
	x: 'X',
};

/** Section color for each niche, from src/styles/sections.css. */
export const NICHE_TINT: Record<string, string> = {
	beauty: 'instagram',
	business: 'earn',
	education: 'grow',
	entertainment: 'youtube',
	film: 'case-studies',
	gaming: 'x',
	lifestyle: 'stack',
	music: 'tiktok',
	podcast: 'deals',
	'short-form': 'tiktok',
	strategy: 'shortlist',
	tech: 'algorithms',
};

export const initials = (name: string) =>
	name
		.replace(/\(.*?\)/g, '')
		.split(/\s+|-/)
		.filter((w) => /^[A-Za-z]/.test(w) && w.toLowerCase() !== 'and')
		.slice(0, 2)
		.map((w) => w[0].toUpperCase())
		.join('');

export const creatorPath = (id: string) => `/creators/${id}/`;

export async function loadDirectory() {
	const [creators, setups, resources, docs] = await Promise.all([getCollection('creators'), getCollection('setups'), getCollection('resources'), getCollection('docs')]);
	const docIds = new Set(docs.map((d) => d.id));
	const docTitle = new Map(docs.map((d) => [d.id, d.data.title]));
	const ids = new Set(creators.map((c) => c.id));

	// Fail the build on broken links between files, so the directory never 404s.
	for (const c of creators) if (c.data.caseStudy && !docIds.has(c.data.caseStudy)) throw new Error(`creators/${c.id}: caseStudy "${c.data.caseStudy}" is not a page`);
	for (const r of resources) for (const id of r.data.creators) if (!ids.has(id)) throw new Error(`resources/${r.id}: creator "${id}" has no file in src/data/creators/`);

	const list = creators.map((c) => {
		const mySetups = setups
			.filter((s) => s.id.startsWith(c.id + '-') && /^\d{4}$/.test(s.id.slice(c.id.length + 1)))
			.map((s) => ({ ...s.data, id: s.id }))
			.sort((a, b) => b.id.localeCompare(a.id));
		const gearCount = mySetups.reduce((n, s) => n + Object.values(s.gear).flat().length, 0);
		return {
			...c.data,
			id: c.id,
			setups: mySetups,
			gearCount,
			resources: resources.filter((r) => r.data.creators.includes(c.id)).map((r) => r.data),
			caseStudyTitle: c.data.caseStudy ? docTitle.get(c.data.caseStudy) : undefined,
		};
	});
	// Richest profiles first, then A to Z.
	const weight = (c: (typeof list)[number]) => c.advice.length + c.tools.length + (c.setups.length ? 3 : 0) + (c.caseStudy ? 3 : 0);
	return list.sort((a, b) => weight(b) - weight(a) || a.name.localeCompare(b.name));
}

export type DirectoryEntry = Awaited<ReturnType<typeof loadDirectory>>[number];
