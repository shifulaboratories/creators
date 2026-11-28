/**
 * Platform pay programs and their published entry bars, for /tools/monetization-checker/.
 * Same figures and sources as the platform guides (src/content/docs/platforms/*.mdx).
 * When a platform changes a bar, change it here and in that guide, and update `checked`.
 */
export type Metric = { key: string; label: string; help?: string; kind: 'count' | 'yes' };
export type Rule = { metric: string; need: number; label: string };
/** A program is met when every `all` rule is met and, if `any` is set, at least one `any` rule. */
export type Program = {
	key: string;
	platform: string;
	name: string;
	unlocks: string;
	all: Rule[];
	any?: Rule[];
	note?: string;
	source: { title: string; publisher: string; url: string; date: string };
};

export const METRICS: Record<string, Metric[]> = {
	youtube: [
		{ key: 'subs', label: 'Subscribers', kind: 'count' },
		{ key: 'hours', label: 'Public watch hours, last 12 months', kind: 'count', help: 'Long videos only. Shorts views don’t count here.' },
		{ key: 'shorts', label: 'Shorts views, last 90 days', kind: 'count' },
		{ key: 'uploads', label: 'Public uploads, last 90 days', kind: 'count' },
	],
	tiktok: [
		{ key: 'followers', label: 'Followers', kind: 'count' },
		{ key: 'views30', label: 'Video views, last 30 days', kind: 'count' },
		{ key: 'adult', label: 'I’m 18 or older', kind: 'yes' },
	],
	x: [
		{ key: 'impr', label: 'Home timeline impressions from verified users, last 90 days', kind: 'count', help: 'Replies don’t count.' },
		{ key: 'vfollowers', label: 'Verified followers', kind: 'count' },
		{ key: 'premium', label: 'I pay for X Premium (any tier)', kind: 'yes' },
	],
	facebook: [{ key: 'elsewhere', label: 'Followers on your biggest Instagram, TikTok or YouTube account', kind: 'count' }],
};

export const PLATFORM_NAMES: Record<string, string> = { youtube: 'YouTube', tiktok: 'TikTok', x: 'X', facebook: 'Facebook' };

const ypp = { title: 'YouTube Partner Program overview and eligibility', publisher: 'YouTube Help', url: 'https://support.google.com/youtube/answer/72851', date: 'checked Nov 26, 2026' };

export const PROGRAMS: Program[] = [
	{
		key: 'ypp-fan',
		platform: 'youtube',
		name: 'YouTube Partner Program: fan funding',
		unlocks: 'Channel memberships, Super Chat, Super Thanks and Shopping, in listed countries.',
		all: [
			{ metric: 'subs', need: 500, label: '500 subscribers' },
			{ metric: 'uploads', need: 3, label: '3 public uploads in 90 days' },
		],
		any: [
			{ metric: 'hours', need: 3000, label: '3,000 watch hours in 12 months' },
			{ metric: 'shorts', need: 3e6, label: '3M Shorts views in 90 days' },
		],
		source: { title: 'Overview of the expanded YouTube Partner Program', publisher: 'YouTube Help', url: 'https://support.google.com/youtube/answer/13429240', date: 'checked Nov 26, 2026' },
	},
	{
		key: 'ypp-ads',
		platform: 'youtube',
		name: 'YouTube Partner Program: ad revenue',
		unlocks: 'A 55% share of ad revenue on long videos, Shorts pool revenue and YouTube Premium revenue.',
		all: [{ metric: 'subs', need: 1000, label: '1,000 subscribers' }],
		any: [
			{ metric: 'hours', need: 4000, label: '4,000 watch hours in 12 months' },
			{ metric: 'shorts', need: 10e6, label: '10M Shorts views in 90 days' },
		],
		note: 'YouTube announced that from Feb 1, 2027 new channels qualify for ad and Premium revenue with 8,000 watch hours in the last 365 days or 20 million Shorts views in 90 days, and Shorts revenue sharing needs 10 million qualified Shorts views in the last 90 days. Channels already in the program aren’t affected.',
		source: ypp,
	},
	{
		key: 'tt-rewards',
		platform: 'tiktok',
		name: 'TikTok Creator Rewards Program',
		unlocks: 'Pay for original videos of one minute or longer, where the program is available.',
		all: [
			{ metric: 'followers', need: 10000, label: '10,000 followers' },
			{ metric: 'views30', need: 100000, label: '100,000 views in 30 days' },
			{ metric: 'adult', need: 1, label: '18 or older' },
		],
		note: 'Only original videos of 1 minute or longer earn, and the account has to be in good standing.',
		source: { title: 'Introducing the new Creator Rewards Program', publisher: 'TikTok Newsroom', url: 'https://newsroom.tiktok.com/introducing-the-new-creator-rewards-program', date: 'Mar 18, 2024' },
	},
	{
		key: 'x-rewards',
		platform: 'x',
		name: 'X Original Content Rewards',
		unlocks: 'Pay for original posts seen by Premium subscribers on the Home timeline, from a $30 minimum payout.',
		all: [
			{ metric: 'impr', need: 500000, label: '500K verified impressions in 90 days' },
			{ metric: 'vfollowers', need: 500, label: '500 verified followers' },
			{ metric: 'premium', need: 1, label: 'An active Premium subscription' },
		],
		note: 'You must also be 18+, in an eligible country and in good standing.',
		source: { title: 'Original Content Rewards Program', publisher: 'X Help Center', url: 'https://help.x.com/en/using-x/original-content-rewards', date: 'checked Nov 26, 2026' },
	},
	{
		key: 'fb-fast',
		platform: 'facebook',
		name: 'Facebook Creator Fast Track',
		unlocks: 'Three months of guaranteed pay for posting eligible Reels, extra reach on them, and immediate access to Content Monetization.',
		all: [{ metric: 'elsewhere', need: 100000, label: '100K followers on Instagram, TikTok or YouTube' }],
		note: 'Below that, Facebook’s Content Monetization program is invite-only with no published follower minimum. Join the interest list in your Professional Dashboard.',
		source: { title: 'Creator Fast Track: a new way to quickly grow your audience and earn money on Facebook', publisher: 'Meta', url: 'https://about.fb.com/news/2026/03/creator-fast-track-grow-your-audience-earn-money-on-facebook/', date: 'Mar 18, 2026, updated Nov 13, 2026' },
	},
];

/** Every program source, deduplicated, for the page's source list. */
export const PROGRAM_SOURCES = [...new Map(PROGRAMS.map((p) => [p.source.url, p.source])).values()];
