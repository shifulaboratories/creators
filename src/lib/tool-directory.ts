/**
 * The creator tool directory (/stack/directory/). Every tool is one YAML file in
 * src/data/tools/ (the `tools` collection); this file holds the categories, logos
 * and the price wording, so the hub, category pages and tool pages agree.
 */
import type { CollectionEntry } from 'astro:content';
import {
	siAudacity,
	siBuffer,
	siClaude,
	siDavinciresolve,
	siDiscord,
	siElevenlabs,
	siFiverr,
	siGumroad,
	siHootsuite,
	siKit,
	siKofi,
	siLinktree,
	siObsstudio,
	siPatreon,
	siSocialblade,
	siSpring_creators,
	siStreamlabs,
	siSubstack,
	siUpwork,
	type SimpleIcon,
} from 'simple-icons';

export const DIRECTORY_PATH = '/stack/directory/';

export type Category = { key: string; label: string; blurb: string; intro: string };

/** Order here is the order on the hub. Keys match the `slot` enum in content.config.ts. */
export const CATEGORIES: Category[] = [
	{ key: 'editing', label: 'Video editing', blurb: 'Cut, caption and color your videos', intro: 'Video editors for short-form and long-form, from free phone apps to the desktop software studios use.' },
	{ key: 'clipping', label: 'Clipping and repurposing', blurb: 'Turn long videos into short clips', intro: 'Tools and marketplaces that turn long videos, podcasts and streams into short clips, by AI or by paid clippers.' },
	{ key: 'design', label: 'Design and thumbnails', blurb: 'Thumbnails, graphics and carousels', intro: 'Design tools for thumbnails, carousels, covers and brand assets.' },
	{ key: 'podcast', label: 'Audio and podcasts', blurb: 'Record and clean up voice', intro: 'Recording and audio tools for podcasts, voiceovers and remote interviews.' },
	{ key: 'streaming', label: 'Live streaming', blurb: 'Go live on one platform or many', intro: 'Streaming software and multistreaming services for Twitch, YouTube, Kick and more.' },
	{ key: 'scheduling', label: 'Scheduling', blurb: 'Plan and auto-post across platforms', intro: 'Schedulers that plan and publish your posts across Instagram, TikTok, YouTube, LinkedIn and more.' },
	{ key: 'growth', label: 'YouTube growth and analytics', blurb: 'Keywords, ideas and channel stats', intro: 'Research and analytics tools for finding ideas, keywords and benchmarks, mostly for YouTube.' },
	{ key: 'storefront', label: 'Link in bio and stores', blurb: 'Sell products and links from one page', intro: 'Link-in-bio pages and storefronts for selling digital products, courses and calls. Several have full reviews with real fees.' },
	{ key: 'email', label: 'Newsletters and email', blurb: 'Own your audience with email', intro: 'Newsletter and email tools, so you can reach your audience without an algorithm in the way.' },
	{ key: 'community', label: 'Memberships and community', blurb: 'Paid communities and fan support', intro: 'Memberships, paid communities and fan support, with the cut each one takes.' },
	{ key: 'courses', label: 'Courses', blurb: 'Sell courses and coaching', intro: 'Course platforms for selling lessons, cohorts and coaching.' },
	{ key: 'merch', label: 'Merch', blurb: 'Print-on-demand merch, no inventory', intro: 'Merch platforms that print and ship on demand, so you never hold inventory.' },
	{ key: 'brand-deals', label: 'Brand deals', blurb: 'Marketplaces and booking pages for sponsors', intro: 'Marketplaces and booking pages for sponsorships. Each links to our full review with its fees.' },
	{ key: 'hiring', label: 'Hiring', blurb: 'Find editors, designers and managers', intro: 'Where creators hire editors, thumbnail designers, writers and other help.' },
	{ key: 'banking', label: 'Banking and money', blurb: 'Business banking, cards and taxes', intro: 'Business banking and cards built for creators and the self-employed. Read our Money basics before you pick one.' },
	{ key: 'ai', label: 'AI tools', blurb: 'Writing, research and voice', intro: 'AI assistants and voice tools creators use for scripts, research and voiceovers.' },
	{ key: 'audio', label: 'Audio editing', blurb: 'Free audio cleanup', intro: 'Audio editors for cleaning up voiceovers and podcast audio.' },
	{ key: 'music', label: 'Music for videos', blurb: 'Licensed music and sound effects', intro: 'Music and sound-effect libraries licensed for creator videos, so your uploads don’t get claimed.' },
];
export const categoryOf = (key: string) => CATEGORIES.find((c) => c.key === key);

/** Brand logos from simple-icons, by tool file name. Others get a letter tile. */
const ICONS: Record<string, SimpleIcon> = {
	audacity: siAudacity,
	buffer: siBuffer,
	claude: siClaude,
	'davinci-resolve': siDavinciresolve,
	discord: siDiscord,
	elevenlabs: siElevenlabs,
	fiverr: siFiverr,
	gumroad: siGumroad,
	hootsuite: siHootsuite,
	kit: siKit,
	'ko-fi': siKofi,
	linktree: siLinktree,
	'obs-studio': siObsstudio,
	patreon: siPatreon,
	'social-blade': siSocialblade,
	spring: siSpring_creators,
	streamlabs: siStreamlabs,
	substack: siSubstack,
	upwork: siUpwork,
};
export const iconFor = (slug: string) => ICONS[slug];

export type Tool = CollectionEntry<'tools'>['data'] & { slug: string };
type Pricing = Tool['pricing'];

/** "Free", "Free plan · from $6/mo", "$295 one-time", "10% of sales"… */
export function priceText(p: Pricing) {
	const parts: string[] = [];
	const paid = p.fromUsdPerMonth || p.oneTimeUsd;
	if (p.free) parts.push(paid ? 'Free plan' : 'Free');
	if (p.fromUsdPerMonth) parts.push(`from $${p.fromUsdPerMonth % 1 ? p.fromUsdPerMonth.toFixed(2) : p.fromUsdPerMonth}/mo`);
	if (p.oneTimeUsd) parts.push(`$${p.oneTimeUsd} one-time`);
	if (p.feePct) parts.push(`${+(p.feePct * 100).toFixed(1)}% of sales`);
	return parts.join(' · ') || 'See site';
}

/** Budget filter buckets. */
export function budgetOf(p: Pricing): 'free' | 'low' | 'pro' {
	if (p.free) return 'free';
	const m = p.fromUsdPerMonth ?? (p.oneTimeUsd ? p.oneTimeUsd / 12 : 0);
	return m < 25 ? 'low' : 'pro';
}
export const BUDGETS = [
	{ key: 'free', label: 'Has a free plan' },
	{ key: 'low', label: 'Under $25/mo' },
	{ key: 'pro', label: '$25/mo and up' },
];

export const toolPath = (slug: string) => `${DIRECTORY_PATH}${slug}/`;

/** Entries that belong in the directory: they have a `what` line and a sourced price. */
export function directoryTools(entries: CollectionEntry<'tools'>[]): Tool[] {
	const out = entries.filter((e) => e.data.what).map((e) => ({ ...e.data, slug: e.id }));
	const cats = new Set(CATEGORIES.map((c) => c.key));
	for (const t of out) {
		if (!cats.has(t.slot)) throw new Error(`Tool ${t.slug}: slot "${t.slot}" has no directory category in src/lib/tool-directory.ts`);
		if (cats.has(t.slug)) throw new Error(`Tool ${t.slug}: its file name clashes with a category page`);
	}
	return out.sort((a, b) => a.name.localeCompare(b.name));
}

const norm = (s: string) =>
	s
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[^a-z0-9 ]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

/**
 * The directory tool a creator's tool name refers to, if any: "Canva Pro" is Canva,
 * "Adobe Premiere Pro" is Adobe Premiere. Matches whole words from the start only,
 * so "Kit" never matches "Kitchen".
 */
export function findDirectoryTool<T extends { name: string; slug: string }>(name: string, tools: T[]): T | undefined {
	const n = norm(name);
	let best: T | undefined;
	for (const t of tools) {
		const tn = norm(t.name);
		const slug = t.slug.replace(/-/g, ' ');
		const hit = [tn, slug].some((k) => k && (n === k || n.startsWith(k + ' ')));
		if (hit && (!best || norm(best.name).length < tn.length)) best = t;
	}
	return best;
}
