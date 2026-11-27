/**
 * The site's main navigation: one source for the top nav, its dropdowns, the
 * phone menu and the bottom tab bar. Keep it short. Four groups, each a handful
 * of links, in the order creators look for them.
 */
export type NavLink = { label: string; href: string; text?: string; icon?: string };
export type NavGroup = { id: string; label: string; href: string; links: NavLink[] };

export const NAV: NavGroup[] = [
	{
		id: 'platforms',
		label: 'Platforms',
		href: '/platforms/',
		links: [
			{ label: 'General', href: '/algorithms/', text: 'How every feed works', icon: 'general' },
			{ label: 'Instagram', href: '/platforms/instagram/', icon: 'instagram' },
			{ label: 'TikTok', href: '/platforms/tiktok/', icon: 'tiktok' },
			{ label: 'YouTube', href: '/platforms/youtube/', icon: 'youtube' },
			{ label: 'Facebook', href: '/platforms/facebook/', icon: 'facebook' },
			{ label: 'LinkedIn', href: '/platforms/linkedin/', icon: 'linkedin' },
			{ label: 'X', href: '/platforms/x/', icon: 'x' },
			{ label: 'All platforms', href: '/platforms/', text: 'Threads, Pinterest, Twitch and more' },
		],
	},
	{
		id: 'grow',
		label: 'Grow',
		href: '/grow/',
		links: [
			{ label: 'Grow your audience', href: '/grow/', text: 'Niche, hooks, formats, cadence' },
			{ label: 'How algorithms work', href: '/algorithms/', text: 'What feeds actually reward' },
			{ label: 'The research behind feeds', href: '/algorithms/the-research/', text: 'Straight from platform engineers' },
			{ label: 'Case studies', href: '/case-studies/', text: 'How top creators grew' },
			{ label: 'The Shortlist', href: '/shortlist/', text: 'The few resources worth it' },
		],
	},
	{
		id: 'paid',
		label: 'Get paid',
		href: '/deals/',
		links: [
			{ label: 'Brand deals', href: '/deals/', text: 'Pitch, price, negotiate, contracts' },
			{ label: 'Paywall', href: '/paywall/', text: 'Fanfix, OnlyFans, Patreon, Fanvue' },
			{ label: 'Every income stream', href: '/earn/', text: 'Affiliate, payouts, products' },
			{ label: 'Price your rates', href: '/deals/pricing/', text: 'Check a quote against benchmarks' },
		],
	},
	{
		id: 'business',
		label: 'Business',
		href: '/money/',
		links: [
			{ label: 'Money basics', href: '/money/', text: 'Taxes, set-asides, LLC vs S corp' },
			{ label: 'Team', href: '/team/', text: 'Managers, agents, first hires' },
			{ label: 'Stack', href: '/stack/', text: 'Gear and software by budget' },
			{ label: 'Protect', href: '/protect/', text: 'Hacked, banned, impersonated' },
			{ label: 'Underground', href: '/underground/', text: 'Gray markets, reported' },
			{ label: 'Glossary', href: '/glossary/', text: 'CPM, usage rights and every term' },
		],
	},
];

/** Which group a path belongs to, for highlighting the top nav. */
export const groupFor = (path: string): string | undefined => {
	const p = path.replace(/\/?$/, '/');
	if (p.startsWith('/platforms/')) return 'platforms';
	if (/^\/(grow|algorithms|case-studies|shortlist)\//.test(p)) return 'grow';
	if (/^\/(deals|paywall|earn)\//.test(p)) return 'paid';
	if (/^\/(money|team|stack|protect|underground)\//.test(p)) return 'business';
	return undefined;
};
