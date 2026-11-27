/**
 * Data behind the Paywall section (fan subscription platforms and chatting agencies).
 * Every number comes from a source in `sources`, as published, with the date we checked it.
 * To update a figure: change it here, change CHECKED, and say what changed in the PR.
 * Kept separate from money-data.ts so the Earn/Deals widgets and this section can change independently.
 */

export const CHECKED = 'Nov 27, 2026';

export type Source = { id: string; name: string; publisher: string; date: string; url: string; method: string };

export const sources: Record<string, Source> = {
	fanfixTerms: {
		id: 'fanfixTerms',
		name: 'Creator Terms of Use',
		publisher: 'Fanfix',
		date: 'Last updated Aug 1, 2026',
		url: 'https://app.fanfix.io/creator-terms-of-use',
		method: 'Official terms. Sections 1.1 (age 18+), 1.3 (agents), 2.5 (competing platforms), 2.7 (AI content), 3.1–3.2 (80% share, payout timing).',
	},
	fanfixTc: {
		id: 'fanfixTc',
		name: 'Thousands of Gen Z creators are using Fanfix to monetize content and interact with fans',
		publisher: 'TechCrunch (Lauren Forristal)',
		date: 'Apr 3, 2023',
		url: 'https://techcrunch.com/2023/04/03/thousands-of-gen-z-creators-are-using-fanfix-to-monetize-content-and-interact-with-fans',
		method: 'Reporting with company-supplied figures (no nudity, human moderation, 10K-follower bar, $5–$50 price range).',
	},
	fanfixWiki: {
		id: 'fanfixWiki',
		name: 'Fanfix',
		publisher: 'Wikipedia',
		date: 'Checked Nov 27, 2026',
		url: 'https://en.wikipedia.org/wiki/Fanfix',
		method: 'Summary with citations: SuperOrdinary acquisition (2022), Sunroom acquisition (Aug 2025), 63M+ users (Jun 2026), $300M+ paid out (Jun 2026).',
	},
	ofEuronews: {
		id: 'ofEuronews',
		name: 'OnlyFans takes $7.2bn from subscribers in 2024 as adult site booms',
		publisher: 'Euronews',
		date: 'Aug 25, 2025',
		url: 'https://www.euronews.com/2025/08/25/onlyfans-takes-72bn-from-subscribers-in-2024-as-adult-site-booms',
		method: 'Reporting on Fenix International’s UK Companies House accounts for 2024.',
	},
	ofRte: {
		id: 'ofRte',
		name: 'OnlyFans owner paid £522m in dividends as user numbers soar',
		publisher: 'RTÉ (PA Media)',
		date: 'Aug 22, 2025',
		url: 'https://www.rte.ie/news/business/2025/0822/1529677-onlyfans-results/',
		method: 'Reporting on the same 2024 accounts: $5.8bn paid to creators, 4.6M creator accounts, 377.5M fan accounts.',
	},
	fanvueTerms: {
		id: 'fanvueTerms',
		name: 'Creator Terms & Conditions',
		publisher: 'Fanvue (Shift Holdings Ltd)',
		date: 'Updated Sep 19, 2026',
		url: 'https://legal.fanvue.com/creator-terms',
		method: 'Official terms: 80% earning rate, 7-day settlement, ~10 business days to process, no off-platform payments, likeness consent.',
	},
	fanvueRate: {
		id: 'fanvueRate',
		name: 'Earning Rate Changes for Creators on Fanvue',
		publisher: 'Fanvue Help Centre',
		date: 'Sep 22, 2026',
		url: 'https://help.fanvue.com/en/articles/7860515-earning-rate-changes-for-creators-on-fanvue',
		method: 'Official notice: the 85% launch rate for 2022 sign-ups ended; standard rate is 80%.',
	},
	patreon: {
		id: 'patreon',
		name: 'A standard platform fee for new creators',
		publisher: 'Patreon Help Center',
		date: 'Effective after Aug 4, 2025',
		url: 'https://support.patreon.com/hc/en-us/articles/36426991446797',
		method: 'Official fee schedule: 10% for pages launched after Aug 4, 2025, plus payment processing.',
	},
	kofi: {
		id: 'kofi',
		name: 'Does Ko-fi take a fee?',
		publisher: 'Ko-fi Help',
		date: 'Checked Nov 27, 2026',
		url: 'https://help.ko-fi.com/hc/en-us/articles/360002506494',
		method: 'Official: 0% on one-off tips (Free mode), 5% on memberships and shop, plus PayPal/Stripe ~3% + $0.30.',
	},
	reuters: {
		id: 'reuters',
		name: 'Sex workers, “chatters” and the dark art of deception on OnlyFans',
		publisher: 'Reuters (Andrew R.C. Marshall, Jason Szep, Linda So)',
		date: 'Jul 30–31, 2024',
		url: 'https://www.reuters.com/investigates/special-report/onlyfans-sex-chatters/',
		method: 'Investigation: interviews with 15 chatters, agency staff, creators and legal experts; court filings.',
	},
	reutersAi: {
		id: 'reutersAi',
		name: 'AI bots talk dirty so OnlyFans stars don’t have to',
		publisher: 'Reuters, via Fast Company',
		date: 'Jul 30, 2024',
		url: 'https://www.fastcompany.com/91164902/onlyfans-stars-leave-sexting-ai',
		method: 'Companion Reuters story on AI chat tools sold to agencies, and OnlyFans’ ban on AI-written DMs.',
	},
	vice: {
		id: 'vice',
		name: 'Think You’re Messaging an OnlyFans Star? You’re Talking to These Guys',
		publisher: 'VICE (Eloise Hendy)',
		date: 'Oct 24, 2023',
		url: 'https://www.vice.com/en/article/onlyfans-management-agency-chatters/',
		method: 'Interviews with chatters and agency staff. Small sample; agencies named are not necessarily typical.',
	},
	bbc: {
		id: 'bbc',
		name: 'OnlyFans agents control and threaten creators while taking half their earnings',
		publisher: 'BBC News (BBC Three, “OnlyFans: Inside the Machine”)',
		date: 'Jun 15, 2026',
		url: 'https://www.bbc.com/news/articles/c932gpk2l1do',
		method: 'Investigation: 60 UK creators, contracts, and an embedded look at a 24,000-member agency Telegram group.',
	},
	media404: {
		id: 'media404',
		name: 'OnlyFans Sued After Two Guys Realized They Might Not Actually Be Talking to Models',
		publisher: '404 Media (Samantha Cole)',
		date: 'Apr 1, 2025',
		url: 'https://www.404media.co/onlyfans-sued-after-two-guys-realized-they-might-not-actually-be-talking-to-models/',
		method: 'Reporting on a federal class action filed in Illinois, with the complaint linked.',
	},
};

/** One fan platform, as shown in the comparison and calculator. */
export type Platform = {
	key: string;
	name: string;
	/** Platform cut, 0–1, of what the fan pays. */
	pct: number;
	/** Card processing on top of the cut, when the creator pays it. */
	procPct: number;
	procFixed: number;
	keepLabel: string;
	content: 'sfw' | 'adult' | 'mixed';
	contentLabel: string;
	payout: string;
	bestFor: string;
	watch: string;
	href: string;
	src: string[];
	disclosure?: string;
};

export const platforms: Platform[] = [
	{
		key: 'fanfix',
		name: 'Fanfix',
		pct: 0.2,
		procPct: 0,
		procFixed: 0,
		keepLabel: 'You keep 80%',
		content: 'sfw',
		contentLabel: 'Safe for work only. No nudity, and moderators review DMs',
		payout: 'About 30 days after each month ends',
		bestFor: 'Lifestyle, beauty, fitness and Gen Z creators who want a paid fan club without adult content',
		watch: 'Its terms ban using your Fanfix account to promote competing platforms',
		href: '/paywall/fanfix/',
		src: ['fanfixTerms', 'fanfixTc', 'fanfixWiki'],
		disclosure: 'Our founder advises Fanfix',
	},
	{
		key: 'onlyfans',
		name: 'OnlyFans',
		pct: 0.2,
		procPct: 0,
		procFixed: 0,
		keepLabel: 'You keep 80%',
		content: 'mixed',
		contentLabel: 'Allows adult content. Also used by fitness, music and cooking creators',
		payout: 'Check its help center: payout timing isn’t covered by our sources',
		bestFor: 'Creators who are comfortable with the brand’s adult reputation and want the biggest paying audience',
		watch: 'Brand partners and some payment providers treat the name as adult, whatever you post',
		href: '/paywall/onlyfans/',
		src: ['ofEuronews', 'ofRte'],
	},
	{
		key: 'fanvue',
		name: 'Fanvue',
		pct: 0.2,
		procPct: 0,
		procFixed: 0,
		keepLabel: 'You keep 80%',
		content: 'mixed',
		contentLabel: 'Allows adult content if you declare it. AI personas allowed with rules',
		payout: '7-day settlement, then about 10 business days to process',
		bestFor: 'Creators who want OnlyFans-style tools from a smaller platform, including AI-assisted creators',
		watch: 'The old 85% launch rate is gone. Taking payment off the platform can freeze your payouts',
		href: '/paywall/fanvue/',
		src: ['fanvueTerms', 'fanvueRate'],
	},
	{
		key: 'patreon',
		name: 'Patreon',
		pct: 0.1,
		procPct: 0.029,
		procFixed: 0.3,
		keepLabel: '10% + card fees',
		content: 'sfw',
		contentLabel: 'Built for memberships: podcasts, video, art, writing, education',
		payout: 'Set up in your Patreon payout settings',
		bestFor: 'Podcasters, YouTubers, artists and educators selling bonus content and community',
		watch: 'iPhone in-app sign-ups cost up to 30%. Pages launched before Aug 2025 may be on older plans',
		href: '/paywall/patreon/',
		src: ['patreon'],
	},
	{
		key: 'kofi',
		name: 'Ko-fi',
		pct: 0.05,
		procPct: 0.03,
		procFixed: 0.3,
		keepLabel: '5% + card fees',
		content: 'sfw',
		contentLabel: 'Tips, memberships, a shop and commissions',
		payout: 'Straight to your PayPal or Stripe account',
		bestFor: 'Artists and smaller creators who want tips and a simple shop with the lowest cut',
		watch: 'Fewer fan-club tools (paid DMs, locked posts) than the platforms above',
		href: '/paywall/patreon/',
		src: ['kofi'],
	},
];

/** OnlyFans 2024 accounts, as reported. Used for the "average vs typical" stat. */
export const onlyfans2024 = {
	fanPaymentsBn: 7.2,
	paidToCreatorsBn: 5.8,
	creatorAccountsM: 4.6,
	fanAccountsM: 377.5,
};
