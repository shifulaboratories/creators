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
		isNew: true,
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
		slug: 'invoice-generator',
		name: 'Invoice generator',
		blurb: 'A brand-ready invoice with deliverables, usage and payment terms. Save as PDF.',
		group: 'paid',
		tint: 'earn',
		glyph: '#',
		guide: { label: 'Getting paid', href: '/deals/getting-paid/' },
		isNew: true,
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
		isNew: true,
	},
	{
		slug: 'youtube-money-calculator',
		name: 'YouTube money calculator',
		blurb: 'Turn your views and RPM into monthly ad income, long videos and Shorts apart.',
		group: 'grow',
		tint: 'youtube',
		glyph: '▶',
		guide: { label: 'YouTube guide', href: '/platforms/youtube/' },
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
		isNew: true,
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

export const toolBySlug = (slug: string) => FREE_TOOLS.find((t) => t.slug === slug);
