/**
 * Data behind the Strategy section (clipping, fan pages, multiple impressions).
 * Every figure comes from a source in `sources`, as published, with the date we checked it.
 * To update a figure: change it here, change CHECKED, and say what changed in the PR.
 * Text versions of the widgets for AI and Markdown copies are at the bottom (strategyWidgetText).
 */

export const CHECKED = 'Nov 28, 2026';

export type Source = { id: string; name: string; publisher: string; date: string; url: string; method: string };

export const sources: Record<string, Source> = {
	krugman: {
		id: 'krugman',
		name: 'Why three exposures may be enough',
		publisher: 'Herbert E. Krugman, Journal of Advertising Research (republished by WARC)',
		date: '1972',
		url: 'https://www.warc.com/en/article/why-three-exposures-may-be-enough-4d5003c85b704c5cbf6a301ee4a2b6d6',
		method: 'Theory paper by GE’s head of research: three psychological levels of exposure (curiosity, recognition, decision); later exposures repeat the third.',
	},
	naples: {
		id: 'naples',
		name: 'Effective Frequency: The Relationship Between Frequency and Advertising Effectiveness',
		publisher: 'Michael J. Naples, Association of National Advertisers',
		date: '1979',
		url: 'https://worldradiohistory.com/Bookshelf/Business/Effective-Frequency-ANA-Naples-1979.pdf',
		method: 'Review of published frequency studies. Conclusions: one exposure has little or no effect in most cases; two to three exposures within a purchase cycle is the effective level.',
	},
	freqWiki: {
		id: 'freqWiki',
		name: 'Frequency (marketing)',
		publisher: 'Wikipedia',
		date: 'Checked Nov 28, 2026',
		url: 'https://en.wikipedia.org/wiki/Frequency_(marketing)',
		method: 'Summary with citations: Krugman’s three levels, Thomas Smith’s 1885 “Successful Advertising” 20-step list, John Philip Jones (JAR, 1997) on what “effective frequency” means.',
	},
	b2b955: {
		id: 'b2b955',
		name: 'The 95:5 rule is the new 60:40 rule',
		publisher: 'Marketing Week (Peter Weinberg and Jon Lombardo, LinkedIn B2B Institute)',
		date: 'Checked Nov 28, 2026',
		url: 'https://www.marketingweek.com/peter-weinberg-jon-lombardo-95-5-rule/',
		method: 'Research with Prof. John Dawes (Ehrenberg-Bass Institute): about 5% of buyers are in the market at any time. Uses purchase-cycle math (e.g. firms switch banks about every five years).',
	},
	b2bLinkedIn: {
		id: 'b2bLinkedIn',
		name: 'The 95-5 rule',
		publisher: 'LinkedIn B2B Institute (Ty Heath)',
		date: 'Checked Nov 28, 2026',
		url: 'https://business.linkedin.com/it/it/advertise/resources/b2b-institute/b2b-research/trends/95-5-rule',
		method: 'Explainer: “95% of your potential buyers aren’t ready to buy today”; “the brand that is most easily remembered is the brand that gets bought.”',
	},
	bloombergClippers: {
		id: 'bloombergClippers',
		name: 'Paid Armies of ‘Clippers’ Boost Internet Stars Like MrBeast',
		publisher: 'Bloomberg',
		date: 'Oct 28, 2025',
		url: 'https://www.bloomberg.com/news/articles/2025-10-28/paid-armies-of-clippers-boost-internet-stars-like-mrbeast',
		method: 'Reporting on the agency Clipping (founder Anthony Fujiwara): rates, client spend, MrBeast’s per-view rate. Paywalled; figures cross-checked in Digital Music News and Digiday.',
	},
	dmnClippers: {
		id: 'dmnClippers',
		name: 'The Rise of Contract Clippers in the Attention Economy',
		publisher: 'Digital Music News (Ashley King)',
		date: 'Oct 29, 2025',
		url: 'https://www.digitalmusicnews.com/2025/10/29/what-are-contract-clippers/',
		method: 'Summary of Bloomberg’s reporting: $300 to $1,500 per million views; MrBeast paid $50 per 100,000 views; Adin Ross campaign 430M views from 11,000 videos by 520 clippers; labels spending over $10,000 a month.',
	},
	digiday: {
		id: 'digiday',
		name: 'The case for and against clipping',
		publisher: 'Digiday (Alyssa Mercante)',
		date: 'May 18, 2026',
		url: 'https://digiday.com/media/the-case-for-and-against-clipping/',
		method: 'Interviews with brand consultants, a lawyer and gaming execs; Instagram’s April 2026 originality change; disclosure and publicity-rights risks; Spencer Pratt’s disclosed Whop campaign.',
	},
	clipWiki: {
		id: 'clipWiki',
		name: 'Clipping (media)',
		publisher: 'Wikipedia',
		date: 'Checked Nov 28, 2026',
		url: 'https://en.wikipedia.org/wiki/Clipping_(media)',
		method: 'Summary with citations: broad campaign sites typically pay $1 to $5 per 1,000 views, some as little as $0.20; botting claims; X looking into clipping; Stake’s paid aggregator network.',
	},
	whopDocs: {
		id: 'whopDocs',
		name: 'Content Rewards',
		publisher: 'Whop Docs',
		date: 'Checked Nov 28, 2026',
		url: 'https://docs.whop.com/memberships-and-access/third-party-apps/content-rewards',
		method: 'Official setup guide: you set the budget and the rate per 1,000 views, a minimum and maximum payout per video, optional flat fee; you approve each post before it pays.',
	},
	whopBlog: {
		id: 'whopBlog',
		name: 'Content Rewards: Grow your brand without wasting money or time',
		publisher: 'Whop blog (Liv Carr)',
		date: 'Mar 3, 2025, updated Oct 2026',
		url: 'https://whop.com/blog/content-rewards/',
		method: 'Whop’s own marketing claims: clippers average about $1 per 1,000 views versus about $25 per 1,000 for Facebook or Instagram ads. Not independently verified.',
	},
	ftc101: {
		id: 'ftc101',
		name: 'Disclosures 101 for Social Media Influencers',
		publisher: 'U.S. Federal Trade Commission',
		date: 'Nov 2019',
		url: 'https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers',
		method: 'Official guidance: disclose any financial relationship, in the post or video itself, with clear words like “ad” or “sponsored.”',
	},
	tiktokIntegrity: {
		id: 'tiktokIntegrity',
		name: 'Community Guidelines: Integrity and authenticity',
		publisher: 'TikTok',
		date: 'Checked Nov 28, 2026',
		url: 'https://www.tiktok.com/community-guidelines/en/integrity-authenticity/',
		method: 'Official rules on multiple accounts, fan accounts, networks of similar accounts, fake engagement and unoriginal content.',
	},
	tiktokDeceptive: {
		id: 'tiktokDeceptive',
		name: 'How TikTok counters deceptive behaviour',
		publisher: 'TikTok Newsroom (Brie Pegum)',
		date: 'Dec 9, 2024',
		url: 'https://newsroom.tiktok.com/en-eu/how-tiktok-counters-deceptive-behaviour',
		method: 'How TikTok spots coordinated accounts: run by the same entity, same devices, spreading the same narrative.',
	},
	ytReused: {
		id: 'ytReused',
		name: 'YouTube channel monetization policies',
		publisher: 'YouTube Help',
		date: 'Updated Jul 15, 2025',
		url: 'https://support.google.com/youtube/answer/1311392',
		method: 'Official policy on reused and “inauthentic” (mass-produced, repetitive) content. Applies to the whole channel, even with the original creator’s permission.',
	},
	igOriginal: {
		id: 'igOriginal',
		name: 'Helping creators find new audiences',
		publisher: 'Instagram',
		date: 'Apr 30, 2024',
		url: 'https://creators.instagram.com/recommendations-and-originality',
		method: 'Official: when two identical posts exist, only the original is recommended; aggregators that repost 10+ times in 30 days lose recommendations.',
	},
	igAggregators: {
		id: 'igAggregators',
		name: 'Instagram cracks down on content aggregators',
		publisher: 'TechCrunch',
		date: 'Apr 30, 2026',
		url: 'https://techcrunch.com/2026/04/30/instagram-restricts-reach-of-content-aggregators-in-new-crackdown/',
		method: 'Reporting on Instagram’s 2026 extension to photos and carousels; watermarks or speed changes don’t count as edits.',
	},
	igAccounts: {
		id: 'igAccounts',
		name: 'Add and switch between multiple accounts',
		publisher: 'Instagram Help Center',
		date: 'Checked Nov 28, 2026',
		url: 'https://help.instagram.com/1682672155283228',
		method: 'Official help page: add and switch between up to 5 Instagram accounts.',
	},
	metaInauthentic: {
		id: 'metaInauthentic',
		name: 'Inauthentic Behavior',
		publisher: 'Meta Transparency Center',
		date: 'Checked Nov 28, 2026',
		url: 'https://transparency.meta.com/policies/community-standards/inauthentic-behavior',
		method: 'Official Community Standards policy for Facebook and Instagram. The page renders with JavaScript; read it in a browser for the current wording.',
	},
	dazed: {
		id: 'dazed',
		name: 'The insidious rise of fake TikTok fan accounts',
		publisher: 'Dazed (Lucy Harbron)',
		date: 'Oct 7, 2026',
		url: 'https://www.dazeddigital.com/music/article/71007/1/the-rise-of-fake-tiktok-fan-accounts-psy-op-social-media-marketing-music',
		method: 'Interviews with music marketers who run theme and fan accounts for labels, and a fandom researcher.',
	},
	billboardBurner: {
		id: 'billboardBurner',
		name: 'Burner Pages and Volume Posting: Inside Music’s Hottest New TikTok Marketing Strategy',
		publisher: 'Billboard (Kristin Robinson)',
		date: 'Aug 20, 2025',
		url: 'https://www.billboard.com/pro/music-hottest-tiktok-marketing-strategy-burner-pages-volume/',
		method: 'Trade reporting on labels and agencies posting songs across many burner and fan accounts.',
	},
	geese: {
		id: 'geese',
		name: 'Geese psy-op allegations',
		publisher: 'Wikipedia',
		date: 'Checked Nov 28, 2026',
		url: 'https://en.wikipedia.org/wiki/Geese_psy-op_allegations',
		method: 'Summary with citations (Wired Apr 14, 2026; Billboard; Rolling Stone; Guardian): the agency Chaotic Good Projects posted clients’ songs across hundreds to thousands of accounts; backlash when it came out.',
	},
};

/* ------------------------------------------------------------------ */
/* Clipping: what the reporting says campaigns pay                     */
/* ------------------------------------------------------------------ */

/** Reported clipper pay, per 1,000 views. Each row is one source's figure, not a market rate. */
export const clipRates = [
	{ label: 'Low end on broad campaign sites', perK: 0.2, src: 'clipWiki' },
	{ label: 'MrBeast via the agency Clipping ($50 per 100,000 views)', perK: 0.5, src: 'dmnClippers' },
	{ label: 'Whop’s stated average', perK: 1, src: 'whopBlog' },
	{ label: 'Agency Clipping, top of its range ($1,500 per million)', perK: 1.5, src: 'dmnClippers' },
	{ label: 'High end on broad campaign sites', perK: 5, src: 'clipWiki' },
];

/** Whop's own comparison figure for paid social, labeled as Whop's claim on the page. */
export const WHOP_AD_CPM = 25;

/* ------------------------------------------------------------------ */
/* Fan pages: is this allowed? Each verdict rests on a quoted rule.    */
/* ------------------------------------------------------------------ */

export type Verdict = 'ok' | 'risky' | 'no';
export type Scenario = { id: string; text: string; verdict: Verdict; why: string; src: string[] };

export const scenarios: Scenario[] = [
	{
		id: 'second-account',
		text: 'You open a second account for a different side of you: cooking, behind the scenes, a podcast.',
		verdict: 'ok',
		why: 'TikTok: “You can set up multiple accounts on TikTok to create different channels for authentic creative expression.” Instagram lets you switch between up to 5 accounts.',
		src: ['tiktokIntegrity', 'igAccounts'],
	},
	{
		id: 'team-fan-page',
		text: 'Your team runs a clips page called “[Your name] Clips” that says in the bio it’s run by your team.',
		verdict: 'ok',
		why: 'Fan-style accounts are fine when they’re honest about it. TikTok allows fan accounts “as long as they are disclosed in the account name.” Remake each clip with a new opening so it isn’t a straight re-upload.',
		src: ['tiktokIntegrity', 'igOriginal'],
	},
	{
		id: 'fake-fan',
		text: 'Your label runs a page that poses as a random fan, posting your song over TV edits.',
		verdict: 'risky',
		why: 'TikTok allows several accounts “but not for deceptive purposes,” and the FTC expects a paid relationship to be disclosed. Reporting on the Geese campaign shows the other cost: fans feel tricked when it comes out.',
		src: ['tiktokIntegrity', 'ftc101', 'geese'],
	},
	{
		id: 'paid-clips-no-ad',
		text: 'You pay clippers per view to post your clips on their own pages, with no #ad.',
		verdict: 'no',
		why: 'A per-view payment is a financial relationship. The FTC says to disclose it in the post itself with words like “ad” or “sponsored.” Digiday notes undisclosed paid clips break platform terms too.',
		src: ['ftc101', 'digiday'],
	},
	{
		id: 'network',
		text: 'One person runs 30 near-identical accounts that all post the same clip.',
		verdict: 'no',
		why: 'TikTok bans “operating networks of accounts that represent similar entities or post similar content.” YouTube’s policy rules out mass-produced, repetitive uploads across a channel.',
		src: ['tiktokIntegrity', 'ytReused'],
	},
	{
		id: 'reupload',
		text: 'A clipper re-uploads your video unchanged, with another app’s watermark.',
		verdict: 'risky',
		why: 'Not banned, but it goes nowhere: TikTok keeps unoriginal re-uploads and other watermarks out of For You, and Instagram only recommends the original. YouTube won’t monetize it, even with your permission.',
		src: ['tiktokIntegrity', 'igOriginal', 'ytReused'],
	},
	{
		id: 'after-ban',
		text: 'An account gets banned, so you post the same content from a fan page instead.',
		verdict: 'no',
		why: 'TikTok bans using multiple accounts “to intentionally bypass our rules or their enforcement.” YouTube says this can lead to termination of all your channels.',
		src: ['tiktokIntegrity', 'ytReused'],
	},
];

/* ------------------------------------------------------------------ */
/* Text versions for AI and Markdown copies (src/lib/markdown.ts)      */
/* ------------------------------------------------------------------ */

const verdictWord: Record<Verdict, string> = { ok: 'Fine', risky: 'Risky', no: 'Against the rules' };

export const strategyWidgetText: Record<string, string> = {
	AttentionLadder:
		'The attention ladder (our framework): 1. Seen: your posts, clips and fan pages put you in front of new people. 2. Remembered: they see you again, several times, until they recognize you (effective frequency: one exposure rarely does much; two to three within a buying cycle is the classic finding). 3. Trusted: long videos, lives, podcasts and replies show them who you are. 4. Owned: they follow, subscribe or join your email list, so you can reach them without the algorithm. 5. Bought: when they are ready (most aren’t at any given moment), they buy from the creator they remember.',
	ImpressionStacker:
		'Interactive model (illustrative, not platform data): choose how many places people can see you (your account, clip pages, fan pages), how many posts each makes per week, what share of your potential audience one post reaches, and how many weeks. The page shows the share of that audience who have seen you at least once, at least three times and at least seven times, assuming each post reaches people at random. More surfaces and more weeks move people from "saw you once" to "saw you enough to remember."',
	ClipMath:
		'Clipping campaign calculator: budget divided by your rate per 1,000 views gives the views your budget buys at most. Reported clipper pay per 1,000 views: ' +
		clipRates.map((r) => `${r.label}: $${r.perK.toFixed(2)}`).join('; ') +
		`. Whop claims Facebook or Instagram ads cost about $${WHOP_AD_CPM} per 1,000 views (Whop’s figure). Views from clips are not fans: track follows, email sign-ups and sales from each campaign.`,
	RuleCheck:
		'Is this allowed? Fan pages, clip pages and extra accounts:\n\n' +
		scenarios.map((s) => `- **${s.text}** ${verdictWord[s.verdict]}. ${s.why}`).join('\n'),
};
