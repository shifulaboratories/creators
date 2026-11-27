/**
 * Neutral tool reviews (/reviews/). Every number here comes from the tool's own
 * pricing page or help center, linked in `sources`, and was checked on `checked`.
 * No affiliate links, nobody paid for placement. When a tool changes its prices,
 * update the plan here and the date; every review and comparison page reads this file.
 */
export type Plan = {
	name: string;
	/** USD per month when billed monthly. null = not published. */
	monthly: number | null;
	/** USD per year when billed annually, if offered. */
	annual?: number;
	/** The tool's own cut of each sale, 0–1. */
	feePct: number;
	/** Fixed fee per sale the tool charges, USD (Gumroad's $0.50). */
	feeFixed?: number;
	note?: string;
};
export type Source = { title: string; publisher: string; url: string; date?: string };
export type Review = {
	slug: string;
	name: string;
	kind: 'storefront' | 'brand-deals';
	url: string;
	/** One honest sentence: who should use it. */
	verdict: string;
	what: string;
	good: string[];
	watch: string[];
	plans: Plan[];
	/** Card processing on top, as the tool states it. */
	processing: { pct: number; fixed: number; text: string };
	trial?: string;
	sources: Source[];
	checked: string;
};

const STRIPE = { pct: 0.029, fixed: 0.3 };

export const REVIEWS: Review[] = [
	{
		slug: 'stan-store',
		name: 'Stan',
		kind: 'storefront',
		url: 'https://stan.store/',
		verdict: 'Worth it once you sell enough that a flat monthly price beats a percentage. Not for testing an idea for free.',
		what: 'A link-in-bio storefront for selling digital products, courses, coaching calls and memberships from one page.',
		good: [
			'0% Stan fee on every plan. You only pay card processing.',
			'Simple checkout built for phones, which is where your audience is.',
			'Monthly and annual billing, with the annual plan cheaper.',
		],
		watch: [
			'No free plan, only a 14-day trial, so you pay $29 a month from the start.',
			'Stripe’s payout fee (0.25% + $0.25 per payout, minimum $1) and refunds that don’t return processing fees, per Stan’s help center.',
			'International cards add 1.5% on Stripe.',
		],
		plans: [
			{ name: 'Creator', monthly: 29, annual: 300, feePct: 0 },
			{ name: 'Creator Pro', monthly: 99, annual: 948, feePct: 0 },
		],
		processing: { ...STRIPE, text: 'Stripe 2.9% + $0.30 per sale (US), or PayPal 3.49% + a fixed fee' },
		trial: '14-day free trial, no free plan',
		sources: [
			{ title: 'Stan, Stripe, and PayPal transaction fees', publisher: 'Stan Help Center', url: 'https://help.stan.store/article/83-stan-stripes-transaction-fees', date: 'Updated Sep 23, 2026' },
			{ title: 'Stan Store pricing', publisher: 'Stan', url: 'https://stan.store/blog/stan-store-pricing/', date: 'Updated Jul 22, 2026' },
		],
		checked: '2026-11-27',
	},
	{
		slug: 'beacons',
		name: 'Beacons',
		kind: 'storefront',
		url: 'https://beacons.ai/',
		verdict: 'The best free starting point: a link in bio, media kit and store at $0. Move to Creator Plus once the 9% fee costs you more than $30 a month.',
		what: 'A link-in-bio page with a store, media kit, email list and brand outreach tools in one app.',
		good: [
			'A real free plan that includes a store and a media kit.',
			'0% Beacons fee on Creator Plus and Creator Max.',
			'Invoices carry no seller fee, even on the Creator plan.',
		],
		watch: [
			'9% fee on every sale on the Free and $10 Creator plans. On $500 a month of sales, that’s $45.',
			'Free plan limits: 50 email sends a month and 5 link-in-bio pages.',
			'Lots of features. If you only need a link page and a store, you may pay for things you don’t use.',
		],
		plans: [
			{ name: 'Free', monthly: 0, feePct: 0.09 },
			{ name: 'Creator', monthly: 10, annual: 100, feePct: 0.09 },
			{ name: 'Creator Plus', monthly: 30, annual: 300, feePct: 0 },
			{ name: 'Creator Max', monthly: 100, annual: 1000, feePct: 0 },
		],
		processing: { ...STRIPE, text: 'Stripe 2.9% + $0.30 per sale, or PayPal 3.49% + a fixed fee' },
		trial: 'Free plan available',
		sources: [
			{ title: 'Beacons pricing plans', publisher: 'Beacons Help Center', url: 'https://help.beacons.ai/en/articles/4695681', date: 'Edited Nov 17, 2026' },
			{ title: 'Beacons products transaction fees', publisher: 'Beacons Help Center', url: 'https://help.beacons.ai/en/articles/4700289', date: 'Edited Oct 22, 2026' },
		],
		checked: '2026-11-27',
	},
	{
		slug: 'gumroad',
		name: 'Gumroad',
		kind: 'storefront',
		url: 'https://gumroad.com/',
		verdict: 'Fine for a first product or occasional sales: no monthly bill. Expensive once you sell regularly, and very expensive through its marketplace.',
		what: 'A checkout and storefront for digital products, with no monthly fee and a marketplace (Discover) where buyers can find you.',
		good: [
			'No monthly fee and nothing to pay until you sell.',
			'The fee drops to 5% + $0.50 once you pass $20,000 in sales in a calendar month.',
			'Gumroad returns its own fee on refunds.',
		],
		watch: [
			'10% + $0.50 per sale, and card processing (2.9% + $0.30) is on top.',
			'Sales through Gumroad’s Discover marketplace cost a flat 30%.',
			'On a $10 product, Gumroad and processing take about $2.09, or roughly a fifth.',
		],
		plans: [{ name: 'Direct sales', monthly: 0, feePct: 0.1, feeFixed: 0.5, note: '5% + $0.50 after $20K in a month; Discover sales 30%' }],
		processing: { ...STRIPE, text: 'Card processing 2.9% + $0.30 per sale, on top of Gumroad’s fee' },
		trial: 'No monthly fee',
		sources: [{ title: 'Gumroad’s fees', publisher: 'Gumroad Help Center', url: 'https://gumroad.com/help/article/66-gumroads-fees.html' }],
		checked: '2026-11-27',
	},
	{
		slug: 'linktree',
		name: 'Linktree',
		kind: 'storefront',
		url: 'https://linktr.ee/',
		verdict: 'Still the default link page, and Pro sells with 0% Linktree fees. Check the live price before you compare: Linktree doesn’t list plan prices in its help center.',
		what: 'The original link-in-bio page, with paid plans that add selling, design and analytics.',
		good: [
			'A free plan with unlimited basic links.',
			'Pro advertises “Sell and earn with 0% fees” and removes Linktree branding.',
			'7-day free trial on Pro and Premium.',
		],
		watch: [
			'On other plans, Linktree takes a percentage of each sale that “depends on your plan”, and its help center doesn’t say how much.',
			'Stripe 2.9% + $0.30 per purchase on every plan, plus $0.25 per payout on partner earnings.',
			'Selling tools are lighter than store-first apps like Stan or Beacons.',
		],
		plans: [
			{ name: 'Free', monthly: 0, feePct: NaN, note: 'Fee not published' },
			{ name: 'Starter', monthly: null, feePct: NaN, note: 'Fee not published' },
			{ name: 'Pro', monthly: null, feePct: 0 },
			{ name: 'Premium', monthly: null, feePct: 0, note: 'Includes everything in Pro' },
		],
		processing: { ...STRIPE, text: 'Stripe 2.9% + $0.30 per purchase on every plan' },
		trial: '7-day trial on Pro and Premium',
		sources: [
			{ title: 'Linktree plans and pricing', publisher: 'Linktree', url: 'https://linktr.ee/s/pricing' },
			{ title: 'About transaction and processing fees', publisher: 'Linktree Help Center', url: 'https://linktr.ee/help/articles/11410206-about-transaction-processing-fees', date: 'Updated Oct 12, 2026' },
		],
		checked: '2026-11-27',
	},
	{
		slug: 'passionfroot',
		name: 'Passionfroot',
		kind: 'brand-deals',
		url: 'https://www.passionfroot.me/',
		verdict: 'A good free way to let brands book you directly. You keep 100% of deals you bring in; deals Passionfroot finds for you cost 15%.',
		what: 'A storefront where brands book and pay for your sponsorship packages, plus a network that matches you with brands. Strongest for B2B, newsletters and podcasts.',
		good: [
			'Free for creators. No subscription.',
			'On deals from your own storefront, the 5% fee is charged to the brand, so you keep 100%.',
			'Stripe processing is included in the fee, not added on top.',
		],
		watch: [
			'Deals that come through Passionfroot’s partner network cost 15% of the deal, taken from your payout, including repeat bookings from that brand.',
			'Its public pricing page and help center disagree on the brand-side fee (2% vs 5%). The help center, updated July 2026, says 5%.',
			'Bank transfers are USD only. Card payouts usually take 2 to 7 business days.',
		],
		plans: [
			{ name: 'Your own deals', monthly: 0, feePct: 0, note: 'Brand pays a 5% fee' },
			{ name: 'Network deals', monthly: 0, feePct: 0.15, note: 'Includes Stripe fees' },
		],
		processing: { pct: 0, fixed: 0, text: 'Included in Passionfroot’s fee' },
		trial: 'Free for creators',
		sources: [
			{ title: 'Pricing', publisher: 'Passionfroot Help Center', url: 'https://help.passionfroot.me/en/articles/11552638-pricing', date: 'Jul 17, 2026' },
			{ title: 'Fees and deductions', publisher: 'Passionfroot Help Center', url: 'https://help.passionfroot.me/en/articles/15970415-fees-deductions-internal', date: 'Reviewed Jul 17, 2026' },
			{ title: 'Creator pricing', publisher: 'Passionfroot', url: 'https://passionfroot.me/creator-pricing' },
		],
		checked: '2026-11-27',
	},
	{
		slug: 'collabstr',
		name: 'Collabstr',
		kind: 'brand-deals',
		url: 'https://collabstr.com/',
		verdict: 'Useful for landing your first paid deals and UGC work, especially under 100K followers. Expect small budgets and a 15% fee on every sale.',
		what: 'A marketplace where brands search creators, buy listed packages, and pay through escrow.',
		good: [
			'Free to list, with no upfront cost.',
			'Escrow: the brand’s money is collected before you start and released when the work is approved.',
			'Payouts to PayPal, Cash App, Venmo and more.',
		],
		watch: [
			'15% of every sale goes to Collabstr.',
			'Most deals are small: Collabstr’s own data shows nearly 80% of 2025 deals were under $300.',
			'You have 72 hours to accept an order before it expires, and brands get 72 hours to request revisions.',
		],
		plans: [{ name: 'Creator', monthly: 0, feePct: 0.15 }],
		processing: { pct: 0, fixed: 0, text: 'Paid out through Dots' },
		trial: 'Free to list',
		sources: [
			{ title: 'Frequently asked questions', publisher: 'Collabstr', url: 'https://collabstr.com/faq' },
			{ title: 'Pricing', publisher: 'Collabstr', url: 'https://collabstr.com/pricing' },
			{ title: 'What influencers cost', publisher: 'Collabstr', url: 'https://collabstr.com/blog/influencer-costs-2025' },
		],
		checked: '2026-11-27',
	},
];

export const reviewBySlug = (s: string) => REVIEWS.find((r) => r.slug === s)!;

/** Head-to-head pages: /reviews/<a>-vs-<b>/. */
export const VERSUS: [string, string][] = [
	['beacons', 'stan-store'],
	['linktree', 'beacons'],
	['linktree', 'stan-store'],
	['stan-store', 'gumroad'],
	['beacons', 'gumroad'],
	['passionfroot', 'collabstr'],
];
export const versusSlug = (a: string, b: string) => `${a.replace('-store', '')}-vs-${b.replace('-store', '')}`;

/** What one plan costs you in a month: subscription + the tool's cut + card processing. */
export function monthCost(r: Review, p: Plan, sales: number, orders: number) {
	if (p.monthly === null || Number.isNaN(p.feePct)) return null;
	return p.monthly + sales * p.feePct + orders * (p.feeFixed ?? 0) + sales * r.processing.pct + orders * r.processing.fixed;
}
