/**
 * Data behind the Earn and Deals widgets. Every number here comes from a source in
 * `sources` below, quoted as published, with the date we checked it.
 * To update a figure: change it here, change `checked`, and say what changed in the PR.
 */

export type Source = { id: string; name: string; publisher: string; date: string; url: string; method: string };

export const sources: Record<string, Source> = {
	imh: {
		id: 'imh',
		name: 'Influencer Rates: How Much Do Influencers Really Cost in 2026?',
		publisher: 'Influencer Marketing Hub',
		date: 'Updated Oct 6, 2026',
		url: 'https://influencermarketinghub.com/influencer-rates/',
		method: 'Typical rate per deliverable by platform and tier. Method not published.',
	},
	later26: {
		id: 'later26',
		name: 'Influencer pricing benchmarks: The complete 2026 guide',
		publisher: 'Later',
		date: 'Jul 7, 2026',
		url: 'https://later.com/blog/influencer-pricing-benchmarks-the-complete-2026-guide/',
		method: 'Typical rate per post by tier and format, all platforms. Method not published.',
	},
	later25: {
		id: 'later25',
		name: 'Creator Rates: How Much Do Instagram Influencers Cost?',
		publisher: 'Later',
		date: 'Jan 23, 2025',
		url: 'https://later.com/blog/instagram-influencers-costs/',
		method: 'Survey of 500+ creators plus analysis of ~29K Instagram posts. Baseline fee for one Reel.',
	},
	collabstr: {
		id: 'collabstr',
		name: 'What Influencers Cost: Asking Prices vs What Brands Pay',
		publisher: 'Collabstr',
		date: '2026 report, deals done in 2025',
		url: 'https://collabstr.com/blog/influencer-costs-2025',
		method: '15,000+ deals on its own marketplace. Average final price paid, all tiers mixed.',
	},
	patreon: {
		id: 'patreon',
		name: 'A standard platform fee for new creators',
		publisher: 'Patreon Help Center',
		date: 'Effective after Aug 4, 2025',
		url: 'https://support.patreon.com/hc/en-us/articles/36426991446797',
		method: 'Official fee schedule.',
	},
	youtube: {
		id: 'youtube',
		name: 'YouTube partner earnings overview',
		publisher: 'YouTube Help',
		date: 'Checked Nov 26, 2026',
		url: 'https://support.google.com/youtube/answer/72902',
		method: 'Official revenue shares.',
	},
	ypp2027: {
		id: 'ypp2027',
		name: 'YouTube Partner Program updates: new opportunities to earn',
		publisher: 'YouTube Official Blog',
		date: 'Aug 10, 2026',
		url: 'https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/',
		method: 'Official announcement. Terms take effect Feb 1, 2027.',
	},
	substack: {
		id: 'substack',
		name: 'How much does Substack cost?',
		publisher: 'beehiiv (citing Substack’s help center)',
		date: 'Updated Oct 2026',
		url: 'https://www.beehiiv.com/blog/how-much-does-substack-cost',
		method: 'Competitor’s summary of Substack’s published fees. Check Substack’s own help center too.',
	},
	ghost: {
		id: 'ghost',
		name: 'Ghost vs Gumroad',
		publisher: 'Ghost',
		date: 'Checked Nov 26, 2026',
		url: 'https://ghost.org/vs/gumroad',
		method: 'Ghost’s own page. Its Gumroad numbers are Ghost’s characterization.',
	},
	ftc: {
		id: 'ftc',
		name: 'Disclosures 101 for Social Media Influencers',
		publisher: 'US Federal Trade Commission',
		date: 'Nov 2019, page modified Dec 3, 2024',
		url: 'https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers',
		method: 'Official guidance.',
	},
	nyc: {
		id: 'nyc',
		name: 'Freelance Isn’t Free Act: freelancer workers',
		publisher: 'NYC Department of Consumer and Worker Protection',
		date: 'Checked Nov 26, 2026',
		url: 'https://www.nyc.gov/site/dca/workers/workersrights/freelancer-workers.page',
		method: 'Official guidance.',
	},
	nys: {
		id: 'nys',
		name: 'New York Enacts Statewide Freelance Isn’t Free Legislation',
		publisher: 'Bond, Schoeneck & King (law firm)',
		date: 'Aug 28, 2024',
		url: 'https://www.bsk.com/news-events-videos/new-york-enacts-statewide-ldquo-freelance-isn-rsquo-t-free-rdquo-legislation',
		method: 'Law-firm summary of NY General Business Law Article 44-A.',
	},
	sag: {
		id: 'sag',
		name: 'Top 10 Things to Always Include in Your Influencer Talent Agreement',
		publisher: 'SAG-AFTRA',
		date: '2025',
		url: 'https://sagaftra.org/sites/default/files/2025-04/Top%2010%20Things%20to%20Include%20in%20Your%20Influencer%20Agreement_0.pdf',
		method: 'Union guidance for creators.',
	},
	sag101: {
		id: 'sag101',
		name: 'Influencer Agreement 101',
		publisher: 'SAG-AFTRA',
		date: 'Available since Feb 8, 2021',
		url: 'https://www.sagaftra.org/contracts-industry-resources/influencer-resources/influencer-agreement-101',
		method: 'Union guidance for creators.',
	},
	revision: {
		id: 'revision',
		name: 'Influencer contracts: red flags every creator should know',
		publisher: 'Revision Legal (attorney John Di Giacomo)',
		date: 'Apr 2026',
		url: 'https://revisionlegal.com/internet-law/influencer-contracts-red-flags-every-creator/',
		method: 'Attorney’s article, US law.',
	},
	ypp: {
		id: 'ypp',
		name: 'YouTube Partner Program overview and eligibility',
		publisher: 'YouTube Help',
		date: 'Checked Nov 26, 2026',
		url: 'https://support.google.com/youtube/answer/72851',
		method: 'Official eligibility rules.',
	},
};

/* ───────────── Rate benchmarks ───────────── */

export type Platform = 'instagram' | 'tiktok' | 'youtube';
export type Format = 'reel' | 'feed' | 'story' | 'video' | 'integration';
/** One published range. `hi: null` means the source says "and up". */
export type Band = { src: string; label: string; min: number; max: number | null; lo: number; hi: number | null };

export const formats: Record<Platform, { key: Format; label: string }[]> = {
	instagram: [
		{ key: 'reel', label: 'Reel' },
		{ key: 'feed', label: 'Feed post' },
		{ key: 'story', label: 'Story' },
	],
	tiktok: [{ key: 'video', label: 'Video' }],
	youtube: [{ key: 'integration', label: 'Sponsored video' }],
};

const M = 1_000_000;
/**
 * Rate bands. min/max are follower bounds as each source defines its tiers.
 * We only include a band where the source gives a dollar figure for that platform and format.
 */
export const bands: Record<Platform, Partial<Record<Format, Band[]>>> = {
	instagram: {
		reel: [
			{ src: 'later25', label: 'Nano · Reel', min: 0, max: 10e3, lo: 100, hi: 200 },
			{ src: 'later25', label: 'Micro · Reel', min: 10e3, max: 100e3, lo: 200, hi: 1000 },
			{ src: 'later25', label: 'Mid · Reel', min: 100e3, max: 500e3, lo: 1500, hi: 5000 },
			{ src: 'later25', label: 'Macro · Reel', min: 500e3, max: null, lo: 5000, hi: 7000 },
			{ src: 'later26', label: 'Nano · Reels/TikTok', min: 1e3, max: 10e3, lo: 200, hi: 500 },
			{ src: 'later26', label: 'Micro · Reels/TikTok', min: 10e3, max: 100e3, lo: 800, hi: 2500 },
			{ src: 'later26', label: 'Macro · any format', min: 100e3, max: M, lo: 2500, hi: 10000 },
			{ src: 'later26', label: 'Mega · any format', min: M, max: null, lo: 10000, hi: 50000 },
			{ src: 'imh', label: 'Nano · Reel', min: 0, max: 10e3, lo: 20, hi: 100 },
			{ src: 'imh', label: 'Micro · post', min: 10e3, max: 100e3, lo: 100, hi: 500 },
			{ src: 'imh', label: 'Macro · post', min: 100e3, max: M, lo: 5000, hi: 10000 },
			{ src: 'imh', label: 'Mega · post', min: M, max: null, lo: 10000, hi: null },
		],
		feed: [
			{ src: 'later26', label: 'Nano · feed post', min: 1e3, max: 10e3, lo: 100, hi: 300 },
			{ src: 'later26', label: 'Micro · feed post', min: 10e3, max: 100e3, lo: 500, hi: 1500 },
			{ src: 'later26', label: 'Macro · any format', min: 100e3, max: M, lo: 2500, hi: 10000 },
			{ src: 'later26', label: 'Mega · any format', min: M, max: null, lo: 10000, hi: 50000 },
			{ src: 'imh', label: 'Nano · feed post', min: 0, max: 10e3, lo: 10, hi: 50 },
			{ src: 'imh', label: 'Micro · feed post', min: 10e3, max: 100e3, lo: 100, hi: 500 },
			{ src: 'imh', label: 'Macro · feed post', min: 100e3, max: M, lo: 5000, hi: 10000 },
			{ src: 'imh', label: 'Mega · post', min: M, max: null, lo: 10000, hi: null },
		],
		story: [{ src: 'later26', label: 'Nano · Stories only', min: 1e3, max: 10e3, lo: 50, hi: 150 }],
	},
	tiktok: {
		video: [
			{ src: 'later26', label: 'Nano · Reels/TikTok', min: 1e3, max: 10e3, lo: 200, hi: 500 },
			{ src: 'later26', label: 'Micro · Reels/TikTok', min: 10e3, max: 100e3, lo: 800, hi: 2500 },
			{ src: 'later26', label: 'Macro · any format', min: 100e3, max: M, lo: 2500, hi: 10000 },
			{ src: 'later26', label: 'Mega · any format', min: M, max: null, lo: 10000, hi: 50000 },
			{ src: 'imh', label: 'Nano · video', min: 0, max: 10e3, lo: 50, hi: 200 },
			{ src: 'imh', label: 'Micro · video', min: 10e3, max: 100e3, lo: 200, hi: 800 },
			{ src: 'imh', label: 'Macro · video', min: 100e3, max: M, lo: 800, hi: 5000 },
			{ src: 'imh', label: 'Mega · video', min: M, max: null, lo: 5000, hi: 50000 },
		],
	},
	youtube: {
		integration: [
			{ src: 'later26', label: 'Nano · any format', min: 1e3, max: 10e3, lo: 100, hi: 500 },
			{ src: 'later26', label: 'Micro · any format', min: 10e3, max: 100e3, lo: 500, hi: 2500 },
			{ src: 'later26', label: 'Macro · incl. YouTube integrations', min: 100e3, max: M, lo: 2500, hi: 10000 },
			{ src: 'later26', label: 'Mega · any format', min: M, max: null, lo: 10000, hi: 50000 },
			{ src: 'imh', label: 'Nano · sponsored video', min: 0, max: 10e3, lo: 20, hi: 200 },
			{ src: 'imh', label: 'Micro · sponsored video', min: 10e3, max: 100e3, lo: 200, hi: 1000 },
			{ src: 'imh', label: 'Macro · sponsored video', min: 100e3, max: M, lo: 10000, hi: 20000 },
			{ src: 'imh', label: 'Mega · sponsored video', min: M, max: null, lo: 20000, hi: 50000 },
		],
	},
};

/** Collabstr: average final price brands paid per deal, all creator sizes mixed (deals in 2025). */
export const marketAverage: Record<Platform, number> = { youtube: 255, instagram: 193, tiktok: 186 };

/** Add-ons with a published percentage. Exclusivity and rush have none, so they are listed without a number. */
export const addOns = [
	{ key: 'usage', label: 'Usage rights', help: 'The brand reposts or reuses your content on its own channels.', lo: 0.3, hi: 0.5, src: 'later26' },
	{ key: 'ads', label: 'Paid ads from your handle', help: 'Whitelisting, Spark Ads or partnership ads.', lo: 0.3, hi: 0.5, src: 'later26' },
	{ key: 'season', label: 'Peak shopping season', help: 'Q4, Black Friday, back to school.', lo: 0.2, hi: 0.3, src: 'collabstr' },
	{ key: 'excl', label: 'Exclusivity', help: 'No published benchmark. Price it as the deals you’ll turn down.', lo: null, hi: null, src: '' },
] as const;

/* ───────────── Keep calculator: what you take home from a $X membership ───────────── */

export type Fee = {
	key: string;
	name: string;
	pct: number; // platform cut, 0–1
	procPct: number; // payment processing, 0–1
	procFixed: number; // per payment, USD
	monthly?: string; // flat plan cost, shown as text, not included in the math
	src: string;
	note: string;
};

export const fees: Fee[] = [
	{ key: 'ytm', name: 'YouTube memberships', pct: 0.3, procPct: 0, procFixed: 0, src: 'youtube', note: 'You get 70% of net revenue. YouTube handles payments.' },
	{ key: 'patreon', name: 'Patreon (new creators)', pct: 0.1, procPct: 0.029, procFixed: 0.3, src: 'patreon', note: '10% platform fee for pages published after Aug 4, 2025, plus 2.9% + $0.30 card processing.' },
	{ key: 'substack', name: 'Substack', pct: 0.1, procPct: 0.036, procFixed: 0.3, src: 'substack', note: '10% of each payment, plus Stripe’s 2.9% + $0.30 and a 0.7% billing fee.' },
	{ key: 'ghost', name: 'Ghost', pct: 0, procPct: 0.029, procFixed: 0.3, monthly: 'plus a monthly plan', src: 'ghost', note: '0% revenue cut. You connect your own Stripe (about 2.9% + $0.30) and pay a flat plan.' },
	{ key: 'beehiiv', name: 'beehiiv', pct: 0, procPct: 0.029, procFixed: 0.3, monthly: 'plus a monthly plan', src: 'substack', note: '0% revenue cut on paid subscriptions; flat monthly plan, your own payment processor.' },
];

/* ───────────── Income paths ───────────── */

export type Path = {
	key: string;
	name: string;
	tint: string;
	who: string;
	keep: string;
	srcs: string[];
	starts: string;
	steady: 1 | 2 | 3; // 1 = lumpy, 3 = steady
	ownership: 1 | 2 | 3; // 1 = platform owns the customer, 3 = you do
	effort: 1 | 2 | 3; // ongoing work per dollar
	ceiling: 1 | 2 | 3;
	bestFor: string;
	watch: string;
	href: string;
};

export const paths: Path[] = [
	{
		key: 'ads',
		name: 'Platform payouts',
		tint: 'platforms',
		who: 'The platform, from ad and subscription revenue.',
		keep: 'YouTube long-form ads: 55% of net ad revenue. Shorts: 45% of your share of the creator pool.',
		srcs: ['youtube', 'ypp', 'ypp2027'],
		starts: 'After you qualify. YouTube today: 1,000 subscribers plus 4,000 watch hours in 12 months or 10M Shorts views in 90 days. From Feb 1, 2027, new channels need 8,000 watch hours in 365 days or 20M Shorts views in 90 days for ad revenue.',
		steady: 2,
		ownership: 1,
		effort: 1,
		ceiling: 2,
		bestFor: 'Long-form creators with lots of watch time.',
		watch: 'Rates swing with ad seasons and the platform can change terms. YouTube’s terms change on Feb 1, 2027.',
		href: '/earn/monetization-paths/#platform-payouts',
	},
	{
		key: 'brand',
		name: 'Brand deals',
		tint: 'earn',
		who: 'Brands, for posts, usage rights and exclusivity.',
		keep: 'You set the price. Most deals on Collabstr’s marketplace closed under $300; bigger creators earn five figures.',
		srcs: ['collabstr'],
		starts: 'Small creators get gifted deals and small paid deals from a few thousand engaged followers. Niche matters more than size.',
		steady: 1,
		ownership: 2,
		effort: 2,
		ceiling: 3,
		bestFor: 'Anyone with a clear niche that brands sell to.',
		watch: 'Lumpy income, long payment terms, and contracts that grab rights. Read the clause library first.',
		href: '/earn/brand-deals/',
	},
	{
		key: 'subs',
		name: 'Memberships and paywalls',
		tint: 'earn',
		who: 'Your biggest fans, every month.',
		keep: 'Ghost or beehiiv: 0% cut plus processing. Patreon: 10% plus processing. YouTube memberships: 70%.',
		srcs: ['ghost', 'patreon', 'youtube'],
		starts: 'When a small slice of your audience wants more of you. A thousand true fans beats a million casual ones.',
		steady: 3,
		ownership: 3,
		effort: 3,
		ceiling: 2,
		bestFor: 'Educators, writers, podcasters, community-led creators.',
		watch: 'You owe members new value every month. Churn is the number to watch.',
		href: '/earn/paywalls-and-memberships/',
	},
	{
		key: 'products',
		name: 'Digital products',
		tint: 'stack',
		who: 'Buyers, once per product: courses, presets, templates, guides.',
		keep: 'Most of it. Storefronts charge from 0% (your own Stripe) to around 10% plus processing.',
		srcs: ['ghost'],
		starts: 'Once you know what your audience keeps asking you about.',
		steady: 2,
		ownership: 3,
		effort: 2,
		ceiling: 3,
		bestFor: 'Creators who teach a skill or have a signature look or system.',
		watch: 'Launches are spiky. Refund rates rise when the promise is bigger than the product.',
		href: '/stack/merch-and-products/',
	},
	{
		key: 'affiliate',
		name: 'Affiliate links',
		tint: 'shortlist',
		who: 'Retailers and apps, a commission when someone buys through your link.',
		keep: 'A commission set by each program. Check the program’s own rate card, not a blog post.',
		srcs: ['ftc'],
		starts: 'Day one, if you already recommend things. It grows with search and evergreen content.',
		steady: 2,
		ownership: 1,
		effort: 1,
		ceiling: 2,
		bestFor: 'Reviews, tutorials, “what’s in my bag” and gear content.',
		watch: 'Cookie windows are short and programs cut rates without warning. Always disclose.',
		href: '/earn/affiliate-links/',
	},
];

/* ───────────── Clause library ───────────── */

export type Clause = {
	key: string;
	name: string;
	cat: 'money' | 'rights' | 'exclusivity' | 'control' | 'exit' | 'risk';
	risk: 'high' | 'medium' | 'low';
	plain: string;
	normal: string;
	flag: string;
	bad: string;
	fix: string;
	ask: string;
	srcs: string[];
};

export const cats: Record<Clause['cat'], string> = {
	money: 'Money',
	rights: 'Rights',
	exclusivity: 'Exclusivity',
	control: 'Control',
	exit: 'Getting out',
	risk: 'Risk',
};

export const clauses: Clause[] = [
	{
		key: 'payment',
		name: 'Payment terms',
		cat: 'money',
		risk: 'high',
		plain: 'How much you get paid, when, and what has to happen first.',
		normal: 'A fixed fee, a clear due date (Net 30 is common), and part up front for new brands. Many creators ask for 50% on signing.',
		flag: 'Net 60 or Net 90, “payment upon receipt of payment from our client,” or payment tied to results you don’t control.',
		bad: 'Brand shall pay Creator within ninety (90) days following Brand’s receipt of payment from its client.',
		fix: 'Brand shall pay 50% of the Fee on signature and the balance within thirty (30) days of the Content going live. Late amounts accrue interest at 1.5% per month.',
		ask: 'When exactly does the clock start, and what happens if you pay late?',
		srcs: ['revision', 'sag', 'nyc'],
	},
	{
		key: 'kill',
		name: 'Kill fee and cancellation',
		cat: 'money',
		risk: 'medium',
		plain: 'What you get paid if the brand cancels after you’ve started.',
		normal: 'A kill fee that scales with how far you got: something on signing, more once you’ve shot, the full fee once you’ve delivered.',
		flag: 'The brand can cancel “at any time for any reason” with no payment, even after you’ve filmed.',
		bad: 'Brand may terminate this Agreement at any time, for any reason, without liability to Creator.',
		fix: 'If Brand cancels after signature, Brand pays 50% of the Fee; after Creator delivers a draft, 100% of the Fee.',
		ask: 'What do I get paid if you pull the campaign after I’ve shot it?',
		srcs: ['revision'],
	},
	{
		key: 'usage',
		name: 'Usage rights',
		cat: 'rights',
		risk: 'high',
		plain: 'Where the brand can use your content, and for how long.',
		normal: 'A named list of channels (their Instagram and TikTok, their site) for a set time, priced separately. Published benchmarks put usage rights at 30–50% on top of the base rate.',
		flag: '“In perpetuity,” “all media now known or hereafter devised,” “throughout the universe,” or “including but not limited to.”',
		bad: 'Creator grants Brand the right to use the Content in perpetuity, throughout the universe, in any and all media now known or hereafter devised.',
		fix: 'Creator grants Brand a non-exclusive license to repost the Content on Brand’s owned social channels and website for ninety (90) days from first posting. Any other use requires a separate written agreement and fee.',
		ask: 'Which channels, for how many days, and is that included in the fee or priced separately?',
		srcs: ['sag', 'revision', 'later26'],
	},
	{
		key: 'ads',
		name: 'Paid ads and whitelisting',
		cat: 'rights',
		risk: 'high',
		plain: 'The brand runs your post as an ad, often from your own handle (whitelisting, Spark Ads, partnership ads).',
		normal: 'A separate line item with a time limit, run through the platform’s own partnership tools. Never your password.',
		flag: 'Ad rights bundled in for free, no end date, or a request for your login.',
		bad: 'Brand may use the Content and Creator’s name and handle in paid advertising without additional compensation.',
		fix: 'Paid usage is excluded unless agreed in writing. If agreed: thirty (30) days of paid social through platform partnership tools, for an additional fee of $___. Brand will not request account credentials.',
		ask: 'Will you run this as an ad? For how long, on which platforms, and from whose handle?',
		srcs: ['revision', 'later26'],
	},
	{
		key: 'ownership',
		name: 'Ownership (work for hire)',
		cat: 'rights',
		risk: 'high',
		plain: 'Who owns the video you made.',
		normal: 'You own your content and give the brand a license to use it. SAG-AFTRA recommends creators keep ownership.',
		flag: '“Work made for hire,” “assigns all right, title and interest.” An assignment means you lose all rights, even to post it yourself.',
		bad: 'All Content shall be deemed a work made for hire, and Creator hereby assigns to Brand all right, title and interest therein.',
		fix: 'Creator retains all ownership of the Content and grants Brand the license described in Usage Rights.',
		ask: 'Can we make this a license instead of an assignment?',
		srcs: ['sag', 'revision'],
	},
	{
		key: 'likeness',
		name: 'Likeness and AI',
		cat: 'rights',
		risk: 'high',
		plain: 'Whether the brand can use your face, voice or name beyond the post, including to make AI versions of you.',
		normal: 'Your name and likeness only as part of the licensed content. Any digital replica or AI training needs separate, explicit consent and pay.',
		flag: '“Modify, edit, adapt or create derivative works,” or your “likeness, voice and persona” with no limits.',
		bad: 'Brand may use Creator’s name, likeness, voice and persona, and create derivative works thereof, in any manner.',
		fix: 'Brand may use Creator’s name and likeness only as they appear in the Content. Brand will not create digital replicas of Creator or use the Content to train AI models without Creator’s separate written consent and compensation.',
		ask: 'Will you edit my content into new ads, or use it with AI?',
		srcs: ['sag'],
	},
	{
		key: 'exclusivity',
		name: 'Exclusivity',
		cat: 'exclusivity',
		risk: 'high',
		plain: 'Which other brands you can’t work with, and for how long.',
		normal: 'Named competitors, a narrow category, and a short window, often 30 to 90 days after the campaign. It costs extra because it blocks other income.',
		flag: 'A whole industry (“any beauty or personal care brand”), a year or more, or exclusivity at no extra fee.',
		bad: 'During the Term and for twelve (12) months thereafter, Creator shall not promote any product in the beauty, wellness or personal care category.',
		fix: 'For thirty (30) days after the Content goes live, Creator will not post sponsored content for [named competitors]. Exclusivity fee: $___.',
		ask: 'Which brands exactly, and for how many days? What’s the fee for that window?',
		srcs: ['revision', 'sag'],
	},
	{
		key: 'approvals',
		name: 'Approvals and revisions',
		cat: 'control',
		risk: 'medium',
		plain: 'How many rounds of changes the brand gets, and how fast they reply.',
		normal: 'One or two rounds of revisions included, a deadline for brand feedback, and a fee for reshoots the brief didn’t ask for.',
		flag: '“Revisions until Brand is satisfied in its sole discretion,” or reshoots at your cost.',
		bad: 'Creator shall make all revisions requested by Brand until the Content is approved in Brand’s sole discretion.',
		fix: 'Fee includes two (2) rounds of revisions requested within three (3) business days of each draft. Additional rounds or reshoots outside the brief are billed at $___.',
		ask: 'How many rounds are included, and how long do you have to give feedback?',
		srcs: ['sag', 'revision'],
	},
	{
		key: 'live',
		name: 'Posting and keep-live',
		cat: 'control',
		risk: 'low',
		plain: 'When you post, and how long the post must stay up.',
		normal: 'A posting window, and the post stays live for a set time (often 30 to 90 days) or simply isn’t deleted early.',
		flag: 'The post must stay up forever, can’t be archived, or exact posting times you’ll be penalized for missing.',
		bad: 'Creator shall not remove, archive or edit the Content at any time.',
		fix: 'Creator will keep the Content live for at least ninety (90) days after posting.',
		ask: 'How long does it need to stay up?',
		srcs: [],
	},
	{
		key: 'performance',
		name: 'Performance guarantees',
		cat: 'money',
		risk: 'medium',
		plain: 'A promise that your post hits a number, with money back if it doesn’t.',
		normal: 'No guarantees, or a bonus on top of the fee if the post beats a target. You control the content, not the feed.',
		flag: 'A refund or “make-good” post if views or clicks come in under target.',
		bad: 'If the Content receives fewer than 100,000 views within 7 days, Creator shall refund 50% of the Fee.',
		fix: 'The Fee is not contingent on performance. If the Content exceeds 100,000 views within 7 days, Brand pays a bonus of $___.',
		ask: 'Can we turn this into a bonus instead of a penalty?',
		srcs: [],
	},
	{
		key: 'morality',
		name: 'Morality clause',
		cat: 'exit',
		risk: 'medium',
		plain: 'The brand can end the deal if you do something that embarrasses it.',
		normal: 'Defined conduct (a crime, hate speech), a chance to respond, and it works both ways if the brand has a scandal.',
		flag: '“Any conduct Brand deems, in its sole discretion, to be detrimental,” plus paying back fees you already earned.',
		bad: 'If Creator engages in any conduct that Brand, in its sole discretion, deems detrimental to its reputation, Brand may terminate and Creator shall refund all Fees paid.',
		fix: 'Either party may terminate if the other is charged with a crime or publicly engages in hate speech. Fees for Content already delivered are not refundable.',
		ask: 'Can we define the conduct, make it mutual, and keep fees for work already delivered?',
		srcs: ['revision'],
	},
	{
		key: 'indemnity',
		name: 'Indemnification',
		cat: 'risk',
		risk: 'high',
		plain: 'Who pays legal costs if someone sues over the content.',
		normal: 'Mutual: you cover what you control (your own music, your own claims), the brand covers its product, its claims and the materials it gave you.',
		flag: 'Only you indemnify the brand, for anything, including claims about the brand’s own product.',
		bad: 'Creator shall indemnify and hold harmless Brand from any and all claims arising out of or relating to the Content.',
		fix: 'Each party shall indemnify the other for claims arising from its own breach. Brand shall indemnify Creator for claims arising from Brand’s products, product claims and materials provided by Brand.',
		ask: 'Can we make this mutual, with you covering claims about your product?',
		srcs: ['revision'],
	},
	{
		key: 'ftc',
		name: 'Disclosure and claims',
		cat: 'risk',
		risk: 'medium',
		plain: 'How you label the post as an ad, and what you’re allowed to say about the product.',
		normal: 'You disclose clearly (#ad, “Paid partnership with…”), and the brand only asks for claims it can back up.',
		flag: 'Asking you to hide or bury the disclosure, or to make health, money or results claims the brand can’t prove.',
		bad: 'Creator shall not use the words “ad” or “sponsored” in the Content.',
		fix: 'Creator will disclose the partnership clearly in the Content in line with FTC guidance. Brand is responsible for substantiating all product claims it provides.',
		ask: 'Which claims are you asking me to make, and can you back them up?',
		srcs: ['ftc', 'sag'],
	},
	{
		key: 'confidentiality',
		name: 'Confidentiality',
		cat: 'control',
		risk: 'low',
		plain: 'What you can’t tell anyone about the deal.',
		normal: 'Keep the fee and unreleased product details private. Your lawyer, accountant and manager are allowed to see it.',
		flag: 'So broad you can’t disclose the partnership, or talk to your own advisors.',
		bad: 'Creator shall not disclose the existence or terms of this Agreement to any third party.',
		fix: 'Creator may disclose this Agreement to its legal, financial and management advisors, and as required by law or FTC guidance.',
		ask: 'Can I share this with my lawyer and accountant?',
		srcs: [],
	},
	{
		key: 'law',
		name: 'Governing law and disputes',
		cat: 'risk',
		risk: 'low',
		plain: 'Which state’s law applies, and where a fight would happen.',
		normal: 'A neutral place, or where you live. Small deals are often settled by email, not court.',
		flag: 'Mandatory arbitration in the brand’s home city, at your cost, with a cap on what you can recover.',
		bad: 'Any dispute shall be resolved by binding arbitration in Brand’s home county, with each party bearing its own costs.',
		fix: 'Disputes may be brought in the courts of Creator’s state of residence. The prevailing party recovers reasonable attorneys’ fees.',
		ask: 'Can disputes be handled where I live?',
		srcs: [],
	},
];

/* ───────────── Redline walkthrough: a made-up contract with real-world problems ───────────── */

export type Redline = {
	pass: string;
	title: string;
	before: string; // text with [[...]] marking the problem phrase
	cut: string;
	add: string;
	why: string;
	clause: string; // links to the clause library entry
};

export const redlineBrand = 'Lumen & Co.';
export const redlines: Redline[] = [
	{
		pass: 'Money',
		title: '3. Fee and payment',
		before: 'Brand will pay Creator a fee of $2,000 [[within ninety (90) days of Brand’s receipt of payment from its client]].',
		cut: 'within ninety (90) days of Brand’s receipt of payment from its client',
		add: '50% on signature and the balance within thirty (30) days of the Content going live',
		why: 'Ninety days is a long time to float a brand, and “when our client pays us” means you might never get paid. Ask for half up front and a clear clock.',
		clause: 'payment',
	},
	{
		pass: 'Money',
		title: '9. Termination',
		before: 'Brand may terminate this Agreement [[at any time, for any reason, without liability to Creator]].',
		cut: 'at any time, for any reason, without liability to Creator',
		add: 'on written notice. If Brand terminates after signature, it pays 50% of the Fee; after Creator delivers a draft, 100% of the Fee',
		why: 'Without a kill fee, the brand can cancel after you’ve shot and owe you nothing.',
		clause: 'kill',
	},
	{
		pass: 'Rights',
		title: '5. Usage',
		before: 'Creator grants Brand the right to use the Content [[in perpetuity, in any and all media now known or hereafter devised]].',
		cut: 'in perpetuity, in any and all media now known or hereafter devised',
		add: 'on Brand’s owned social channels and website for ninety (90) days from first posting',
		why: 'Forever, everywhere is what a TV ad buys. Your fee was for a post. Name the channels and a time limit.',
		clause: 'usage',
	},
	{
		pass: 'Rights',
		title: '5.2 Paid media',
		before: 'Brand may use the Content and Creator’s handle in paid advertising [[without additional compensation]].',
		cut: 'without additional compensation',
		add: 'for thirty (30) days via platform partnership tools, for an additional fee of $____',
		why: 'Ads from your handle are worth more than the post itself. Published benchmarks put paid usage at 30–50% on top of the base rate.',
		clause: 'ads',
	},
	{
		pass: 'Rights',
		title: '6. Ownership',
		before: 'All Content [[shall be a work made for hire and owned exclusively by Brand]].',
		cut: 'shall be a work made for hire and owned exclusively by Brand',
		add: 'remains owned by Creator, licensed to Brand as set out in Section 5',
		why: 'An assignment means you can’t even repost your own video later. A license gives the brand what it needs.',
		clause: 'ownership',
	},
	{
		pass: 'Exclusivity',
		title: '7. Exclusivity',
		before: 'Creator shall not promote [[any beauty or personal care brand for twelve (12) months]].',
		cut: 'any beauty or personal care brand for twelve (12) months',
		add: 'the competitors listed in Exhibit A for thirty (30) days after the Content goes live',
		why: 'A whole category for a year could block your biggest deals. Narrow it to named competitors and a short window, or price the year.',
		clause: 'exclusivity',
	},
	{
		pass: 'Control',
		title: '4. Approvals',
		before: 'Creator shall make all revisions requested [[until Brand is satisfied in its sole discretion]].',
		cut: 'until Brand is satisfied in its sole discretion',
		add: 'up to two (2) rounds, given within three (3) business days of each draft. Further rounds are billed at $____',
		why: 'Unlimited revisions turn a two-day job into a two-month one.',
		clause: 'approvals',
	},
	{
		pass: 'Getting out',
		title: '10. Conduct',
		before: 'Brand may terminate if Creator engages in conduct [[Brand deems detrimental, and Creator shall refund all Fees paid]].',
		cut: 'Brand deems detrimental, and Creator shall refund all Fees paid',
		add: 'that is criminal or hateful, as reasonably determined. This right is mutual. Fees for delivered Content are not refundable',
		why: '“Deems” lets them walk for anything. Define the conduct, make it two-way, and keep what you’ve earned.',
		clause: 'morality',
	},
	{
		pass: 'Risk',
		title: '11. Indemnity',
		before: 'Creator shall indemnify Brand [[against any and all claims relating to the Content]].',
		cut: 'against any and all claims relating to the Content',
		add: 'against claims arising from Creator’s breach. Brand shall indemnify Creator against claims arising from Brand’s products, claims and materials',
		why: 'If the product hurts someone, you shouldn’t be paying the brand’s legal bill.',
		clause: 'indemnity',
	},
];

/* ───────────── Negotiation scripts ───────────── */

export type Script = { key: string; when: string; title: string; body: string };

export const scripts: Script[] = [
	{
		key: 'rate',
		when: 'They ask for your rates',
		title: 'Send a range, not a menu',
		body: `Hi [Name],

Thanks for reaching out, I love what [Brand] is doing with [product].

For a campaign like this my rates start at $[anchor] for one [Reel / TikTok / integration], which includes [1 round of revisions] and organic posting on my channel. Usage rights, paid ads and exclusivity are priced separately depending on what you need.

Could you share the brief, timeline and budget? I’ll put together a package that fits.

[Your name]`,
	},
	{
		key: 'lowball',
		when: 'The offer is too low',
		title: 'Trade, don’t discount',
		body: `Hi [Name],

Thanks for the offer. At $[their number] I can do [one Story set / one post with no usage rights].

For the [Reel + 90 days of usage] in the brief, my rate is $[your number]. If budget is fixed, here are two options:

1. [Smaller deliverable] at $[their number]
2. The full package at $[your number], paid 50% up front

Happy to go with whichever works best.

[Your name]`,
	},
	{
		key: 'usage',
		when: 'They want usage or ads “included”',
		title: 'Price rights as their own line',
		body: `Hi [Name],

Happy to give you usage. My quote covers the post on my channel. Rights are priced by how long and where:

• Organic reposting on your channels, 90 days: +$[x]
• Paid ads from my handle (Spark Ads / partnership ads), 30 days: +$[y]

Let me know which you need and I’ll update the agreement.

[Your name]`,
	},
	{
		key: 'exclusive',
		when: 'They want exclusivity',
		title: 'Shrink it, then price it',
		body: `Hi [Name],

I can agree to exclusivity with your direct competitors. To keep it workable, could we list the specific brands and set it to 30 days after the post goes live?

Exclusivity means turning down other paid work, so it’s priced at $[x] for that window. A longer window is possible at a higher rate.

[Your name]`,
	},
	{
		key: 'redline',
		when: 'Sending back contract changes',
		title: 'Send your redlines kindly',
		body: `Hi [Name],

Thanks for sending the agreement, I’m excited to get started. I’ve marked up a few points so it matches what we discussed:

1. Payment: 50% on signature, balance Net 30 from posting
2. Usage: your owned channels for 90 days (paid ads as a separate line)
3. Exclusivity: named competitors for 30 days
4. Revisions: two rounds included

Everything else looks great. Let me know if any of these need a quick call.

[Your name]`,
	},
	{
		key: 'late',
		when: 'Payment is late',
		title: 'The polite nudge, then the firm one',
		body: `Hi [Name],

Following up on invoice #[number] for $[amount], which was due on [date] under our agreement. Could you confirm when it will be paid?

I’ve attached the invoice again. If it’s with a different team, please point me to the right person.

Thanks,
[Your name]`,
	},
];
