/**
 * Free tools: one landing page each under /tools/<slug>/ (src/content/docs/tools/).
 * Every tool runs in the reader's browser. Nothing is sent to a server, so a
 * million visitors cost the same as ten. Add a tool here and as an .mdx page;
 * the gallery (/tools/), the "More free tools" row and the structured data read this list.
 */
export type ToolGroup = 'paid' | 'grow' | 'business';
export type FreeTool = {
	slug: string;
	name: string;
	/** One line for cards: what you get. */
	blurb: string;
	group: ToolGroup;
	/** Section accent (src/styles/sections.css) and a one-glyph badge. */
	tint: string;
	glyph: string;
	/** The guide that explains the thinking behind it. */
	guide?: { label: string; href: string };
	isNew?: boolean;
	/** A per-platform version of another tool: own page, but not a separate card in the gallery. */
	variantOf?: string;
};

export const TOOL_GROUPS: { id: ToolGroup; label: string; text: string }[] = [
	{ id: 'paid', label: 'Get paid', text: 'Price, pitch and invoice like a pro' },
	{ id: 'grow', label: 'Grow', text: 'Check your numbers and plan your posts' },
	{ id: 'business', label: 'Business', text: 'Taxes and setup, in plain numbers' },
];

export const FREE_TOOLS: FreeTool[] = [
	{
		slug: 'media-kit-builder',
		name: 'Media kit builder',
		blurb: 'Make a clean one-page media kit, save it as a PDF or send it as a link.',
		group: 'paid',
		tint: 'deals',
		glyph: '✦',
		guide: { label: 'Pitching brands', href: '/deals/pitching-brands/' },
	},
	{
		slug: 'brand-deal-rate-calculator',
		name: 'Brand deal rate calculator',
		blurb: 'See every published rate range for your platform and size, then copy a quote.',
		group: 'paid',
		tint: 'deals',
		glyph: '$',
		guide: { label: 'Pricing your rates', href: '/deals/pricing/' },
	},
	{
		slug: 'sponsorship-rate-calculator',
		name: 'Sponsorship price estimator',
		blurb: 'Price a sponsored post from your average views, then check it against published rates.',
		group: 'paid',
		tint: 'deals',
		glyph: '◈',
		guide: { label: 'Pricing your rates', href: '/deals/pricing/' },
		isNew: true,
	},
	{
		slug: 'cpm-rpm-calculator',
		name: 'CPM and RPM calculator',
		blurb: 'Cost per 1,000 views for a deal, a price from a CPM, or earnings from your RPM.',
		group: 'paid',
		tint: 'earn',
		glyph: '‰',
		guide: { label: 'Ways creators make money', href: '/earn/monetization-paths/' },
		isNew: true,
	},
	{
		slug: 'invoice-generator',
		name: 'Invoice generator',
		blurb: 'A brand-ready invoice with deliverables, usage and payment terms. Save as PDF.',
		group: 'paid',
		tint: 'earn',
		glyph: '#',
		guide: { label: 'Getting paid', href: '/deals/getting-paid/' },
	},
	{
		slug: 'agency-commission-calculator',
		name: 'Agency commission calculator',
		blurb: 'Follow a brand’s dollar through agencies, managers and agents to your pocket.',
		group: 'paid',
		tint: 'deals',
		glyph: '%',
		guide: { label: 'Agencies and commissions', href: '/deals/agencies-and-commissions/' },
	},
	{
		slug: 'membership-fee-calculator',
		name: 'Membership fee calculator',
		blurb: 'What you keep from each paying member on Patreon, YouTube, Instagram and more.',
		group: 'paid',
		tint: 'earn',
		glyph: '♥',
		guide: { label: 'Paywalls and memberships', href: '/earn/paywalls-and-memberships/' },
	},
	{
		slug: 'fan-subscription-calculator',
		name: 'Fan subscription earnings calculator',
		blurb: 'OnlyFans, Fanfix, Fanvue: what fans pay, what the platform and agency take, what’s left.',
		group: 'paid',
		tint: 'paywall',
		glyph: '◎',
		guide: { label: 'Compare paywall platforms', href: '/paywall/compare/' },
	},
	{
		slug: 'engagement-rate-calculator',
		name: 'Engagement rate calculator',
		blurb: 'Your engagement rate by followers or by views, the way brands work it out.',
		group: 'grow',
		tint: 'grow',
		glyph: '↗',
		guide: { label: 'Read your analytics', href: '/grow/analytics/' },
	},
	...(['Instagram', 'TikTok', 'YouTube'] as const).map(
		(p): FreeTool => ({
			slug: `${p.toLowerCase()}-engagement-rate-calculator`,
			name: `${p} engagement rate calculator`,
			blurb: `Your ${p} engagement rate by followers and by views.`,
			group: 'grow',
			tint: p.toLowerCase(),
			glyph: '↗',
			guide: { label: `${p} guide`, href: `/platforms/${p.toLowerCase()}/` },
			variantOf: 'engagement-rate-calculator',
		}),
	),
	{
		slug: 'youtube-money-calculator',
		name: 'YouTube money calculator',
		blurb: 'Turn your views and RPM into monthly ad income, long videos and Shorts apart.',
		group: 'grow',
		tint: 'youtube',
		glyph: '▶',
		guide: { label: 'YouTube guide', href: '/platforms/youtube/' },
	},
	{
		slug: 'monetization-checker',
		name: 'Monetization checker',
		blurb: 'See which platform pay programs you qualify for now, and how far off the rest are.',
		group: 'grow',
		tint: 'earn',
		glyph: '✓',
		guide: { label: 'Ways creators make money', href: '/earn/monetization-paths/' },
		isNew: true,
	},
	...([
		['youtube', 'YouTube monetization checker', 'YouTube guide'],
		['tiktok', 'TikTok Creator Rewards checker', 'TikTok guide'],
		['x', 'X creator payouts checker', 'X guide'],
	] as const).map(
		([p, name, label]): FreeTool => ({
			slug: p === 'tiktok' ? 'tiktok-creator-rewards-checker' : `${p}-monetization-checker`,
			name,
			blurb: `Check the published bar for ${name.replace(' checker', '')} against your numbers.`,
			group: 'grow',
			tint: p,
			glyph: '✓',
			guide: { label, href: `/platforms/${p}/` },
			variantOf: 'monetization-checker',
		}),
	),
	{
		slug: 'best-time-to-post',
		name: 'Best time to post planner',
		blurb: 'Your audience in other time zones, turned into the hours that reach most of them.',
		group: 'grow',
		tint: 'grow',
		glyph: '◷',
		guide: { label: 'Cadence', href: '/grow/cadence/' },
		isNew: true,
	},
	{
		slug: 'follower-growth-calculator',
		name: 'Follower goal calculator',
		blurb: 'When you’ll hit 10K, 100K or 1M at your pace, and the pace a deadline needs.',
		group: 'grow',
		tint: 'grow',
		glyph: '↑',
		guide: { label: 'Read your analytics', href: '/grow/analytics/' },
		isNew: true,
	},
	{
		slug: 'caption-character-counter',
		name: 'Caption character counter',
		blurb: 'Check one caption against every platform’s limit before you post.',
		group: 'grow',
		tint: 'platforms',
		glyph: 'Aa',
		guide: { label: 'Hooks that hold', href: '/grow/hooks/' },
	},
	{
		slug: 'posting-schedule-planner',
		name: 'Posting schedule planner',
		blurb: 'Hours you have each week in, a posting pace you can actually keep out.',
		group: 'grow',
		tint: 'grow',
		glyph: '▦',
		guide: { label: 'Cadence', href: '/grow/cadence/' },
	},
	{
		slug: 'niche-finder',
		name: 'Niche finder',
		blurb: 'Who it’s for, what you make, your angle, then six honest checks.',
		group: 'grow',
		tint: 'grow',
		glyph: '◇',
		guide: { label: 'Pick your niche', href: '/grow/niche/' },
	},
	{
		slug: 'creator-tax-calculator',
		name: 'Creator tax calculator',
		blurb: 'How much of every payment to put aside for taxes, and your quarterly payment.',
		group: 'business',
		tint: 'money',
		glyph: '¢',
		guide: { label: 'Set aside and pay quarterly', href: '/money/set-aside/' },
	},
	{
		slug: 's-corp-calculator',
		name: 'S corp savings calculator',
		blurb: 'Would an S corp actually save you money after payroll and filing costs?',
		group: 'business',
		tint: 'money',
		glyph: '§',
		guide: { label: 'LLC or S corp?', href: '/money/llc-vs-s-corp/' },
	},
];

/** Tools that get their own card (per-platform variants are linked from their main tool). */
export const GALLERY_TOOLS = FREE_TOOLS.filter((t) => !t.variantOf);

export const toolBySlug = (slug: string) => FREE_TOOLS.find((t) => t.slug === slug);
