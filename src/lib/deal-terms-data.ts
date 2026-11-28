/**
 * Data for the deeper Brand Deals guides: tracked-changes redlines, the usage
 * builder, the exclusivity floor, payment-terms timelines and commission terms.
 * Every figure here is either sourced (ids from src/lib/money-data.ts `sources`)
 * or flagged `tested: true` (creator-tested practice, no published benchmark).
 */
import { addOns } from './money-data';

/* ───────────── Redlines: real tracked-changes markup ─────────────
 * `text` uses {-deleted-} and {+inserted+} markers, like a Word/Docs redline. */

export type DiffTopic = 'usage' | 'ads' | 'exclusivity' | 'payment' | 'commission' | 'likeness';

export const diffTopics: Record<DiffTopic, string> = {
	usage: 'Usage rights',
	ads: 'Paid ads and whitelisting',
	exclusivity: 'Exclusivity',
	payment: 'Payment terms',
	commission: 'Manager commission',
	likeness: 'Likeness and AI',
};

export type Diff = {
	key: string;
	topic: DiffTopic;
	title: string;
	/** Where you'd see it. */
	where: string;
	text: string;
	/** Margin comment to leave on the change. */
	say: string;
	why: string;
	srcs: string[];
	tested?: boolean;
};

export const diffs: Diff[] = [
	{
		key: 'usage-term',
		topic: 'usage',
		title: 'Usage that never ends',
		where: 'Brand agreement · Usage',
		text: 'Brand may use the Content {-in any and all media now known or hereafter devised, throughout the universe, in perpetuity-}{+on Brand’s owned organic social channels, website and email for ninety (90) days from the date the Content goes live+}.',
		say: 'Usage is priced by channel and length. Happy to extend: see the add-on rates in my quote.',
		why: 'SAG-AFTRA tells creators to set how long the brand can use the content and to avoid “in perpetuity.” Naming the channels and a start date makes the end date checkable.',
		srcs: ['sag', 'revision'],
	},
	{
		key: 'usage-license',
		topic: 'usage',
		title: 'Ownership handed over',
		where: 'Brand agreement · Ownership',
		text: 'Creator hereby {-assigns to Brand all right, title and interest in and to the Content, which shall be deemed a work made for hire-}{+grants Brand a non-exclusive, non-transferable license to use the Content as set out in the Usage section. Creator keeps ownership of the Content+}.',
		say: 'I license usage rather than transfer ownership. The license covers everything the campaign needs.',
		why: 'An assignment is permanent and covers uses nobody has thought of yet. A license does the campaign’s job and ends. SAG-AFTRA recommends the creator keep ownership.',
		srcs: ['sag', 'revision'],
	},
	{
		key: 'ads-scope',
		topic: 'ads',
		title: 'Paid ads hidden in “promote”',
		where: 'Brand agreement · Usage',
		text: 'Brand may {-boost, promote, whitelist or otherwise use the Content in paid media-}{+run the Content as paid ads from Creator’s handle (Meta partnership ads, TikTok Spark Ads or YouTube partnership ads) for thirty (30) days, for a paid-usage fee of $____, using ad copy Creator approves in advance+}.',
		say: 'Paid usage is a separate line in my quote. Here are the 30-day and 90-day prices.',
		why: 'Revision Legal: whitelisting, dark posts and other paid usage beyond the original scope need a separate, paid license. Later’s 2026 benchmarks add 30–50% for it.',
		srcs: ['revision', 'later26'],
	},
	{
		key: 'ads-access',
		topic: 'ads',
		title: 'Account access with no end date',
		where: 'Brand agreement · Paid media',
		text: 'Creator will provide Brand {-with login credentials and administrative access to Creator’s social media accounts-}{+ad permissions through each platform’s partner tools, with no passwords shared. Permissions end on the last day of the paid-usage term, and Creator may revoke them after that date+}.',
		say: 'I’ll approve you in the platform’s partner tools so you never need my login.',
		why: 'Every platform has a permission flow: Meta partnership ad permissions (which you can revoke any time), TikTok post codes, YouTube Studio partner links. None need your password.',
		srcs: ['metaPerm', 'metaRevoke', 'tiktokSpark', 'ytPartners'],
	},
	{
		key: 'excl-scope',
		topic: 'exclusivity',
		title: 'A whole industry, for a year after',
		where: 'Brand agreement · Exclusivity',
		text: 'Creator shall not {-promote any product or service competitive with Brand-}{+create sponsored content for the competitors listed in Exhibit B, in the protein-powder category only,+} during the Term {-and for twelve (12) months thereafter-}{+and for thirty (30) days after the final Content goes live+}.',
		say: 'Happy to be exclusive against your direct competitors. Wider or longer is priced in my quote.',
		why: 'Revision Legal: exclusivity should cover only brands that directly compete with the specific product, for a set time, and flags 6–12 months after posting as overreach. It suggests 30 to 90 days.',
		srcs: ['revision', 'sag'],
	},
	{
		key: 'excl-fee',
		topic: 'exclusivity',
		title: 'Exclusivity thrown in for free',
		where: 'Brand agreement · Fees',
		text: 'The Fee includes {-all usage, exclusivity and other obligations under this Agreement-}{+the deliverables in Exhibit A only. Exclusivity and usage beyond the Usage term are paid separately, as listed in Exhibit C+}.',
		say: 'Exclusivity means turning down other work, so it’s its own line.',
		why: 'No one publishes an exclusivity benchmark, so it’s easy to give away. Price it as the deals you’d have to turn down, and make it visible in the contract.',
		srcs: ['later26'],
		tested: true,
	},
	{
		key: 'pay-pwp',
		topic: 'payment',
		title: 'Paid when their client pays',
		where: 'Agency agreement · Payment',
		text: 'Agency shall pay Creator within {-ninety (90) days following Agency’s receipt of payment from its client-}{+thirty (30) days of the Content going live, whether or not Agency’s client has paid Agency+}.',
		say: 'I contract with you, so the payment date should be yours, not your client’s.',
		why: '“Pay-when-paid” puts your money behind someone else’s invoice with no date at all. Revision Legal flags Net 60 and Net 90 too.',
		srcs: ['revision'],
	},
	{
		key: 'pay-deposit',
		topic: 'payment',
		title: 'Everything paid at the very end',
		where: 'Brand agreement · Payment',
		text: 'Brand shall pay {-the Fee upon completion of the Campaign-}{+50% of the Fee on signature and the balance within thirty (30) days of the Content going live. Overdue amounts accrue interest at 1.5% per month, and Creator may pause work while any amount is overdue+}.',
		say: 'Standard for me with a new brand: half on signing, the rest Net 30 from posting.',
		why: 'Revision Legal suggests 50% up front before any content is delivered, the rest within 14 to 30 days, interest on late balances and the right to pause work.',
		srcs: ['revision'],
	},
	{
		key: 'pay-trigger',
		topic: 'payment',
		title: 'A clock that starts whenever they like',
		where: 'Brand agreement · Payment',
		text: 'Payment is due within thirty (30) days {-following Brand’s approval of the final campaign report-}{+of the Content going live. Creator will invoice on the go-live date+}.',
		say: 'Can we start the clock on the go-live date? Then we both know exactly when it’s due.',
		why: '“Net 30” means nothing if the clock starts on an approval only they control. Tie it to a date anyone can check.',
		srcs: ['revision'],
		tested: true,
	},
	{
		key: 'comm-scope',
		topic: 'commission',
		title: 'Commission on everything you earn',
		where: 'Management agreement · Commission',
		text: 'Manager shall receive twenty percent (20%) of {-all Gross Revenue earned by Artist from any source-}{+Gross Revenue from brand deals Manager negotiates during the Term. Excluded: platform payouts (such as AdSense and creator funds), Artist’s own products, and deals signed before the Term+}.',
		say: 'Commission on the deals you bring and work. My platform payouts and existing deals stay mine.',
		why: 'Pfeiffer Law says managers usually take commission on gross revenue, and its sample clause covers “any and all” sponsorships negotiated during the Term. Naming what’s in and out is where you have room.',
		srcs: ['pfeiffer'],
	},
	{
		key: 'comm-sunset',
		topic: 'commission',
		title: 'A cut that never stops',
		where: 'Management agreement · After the term',
		text: 'Manager shall continue to receive commission on {-all agreements negotiated during the Term or any subsequent Terms, including renewals and extensions thereof, in perpetuity-}{+deals Manager closed during the Term: 10% for six (6) months after the Term ends, 5% for the next six (6) months, and nothing after that+}.',
		say: 'Fair to pay you on deals you closed. Let’s step it down and give it an end date.',
		why: 'A post-term (“sunset”) clause is normal: the manager did the work. A permanent one isn’t. Short, shrinking and limited to deals they actually closed is the version to ask for.',
		srcs: ['pfeiffer'],
		tested: true,
	},
	{
		key: 'comm-collect',
		topic: 'commission',
		title: 'They hold your money',
		where: 'Management agreement · Collections',
		text: '{-Manager shall collect all revenue on Artist’s behalf and remit Artist’s share at Manager’s convenience-}{+Brands pay Artist directly and Artist pays Manager’s commission within ten (10) days. Where Manager collects, Manager pays Artist’s share within five (5) business days, with a copy of the brand contract and the payment receipt+}.',
		say: 'I’d like brands to pay me and I’ll pay your commission, or a payout deadline and paperwork if you collect.',
		why: 'If the money passes through your manager, you can’t see the brand’s full number or when it landed. Seeing the brand contract and receipt closes that gap.',
		srcs: [],
		tested: true,
	},
	{
		key: 'likeness-ai',
		topic: 'likeness',
		title: 'Your face and voice, for anything',
		where: 'Brand agreement · Name and likeness',
		text: 'Brand may use Creator’s {-name, image, likeness, voice and biography, including digital replicas, for any purpose-}{+name and likeness only alongside the Content and only during the Usage term. Brand will not create an AI-generated or digital replica of Creator without separate, explicit written consent and payment+}.',
		say: 'Likeness goes with the content and ends with it. Any AI use is a separate conversation.',
		why: 'SAG-AFTRA’s checklist asks for explicit, informed consent and extra pay before any digital replica of you is made.',
		srcs: ['sag'],
	},
];

/** Split a diff string into typed runs. */
export function diffRuns(text: string): { t: 'same' | 'del' | 'ins'; s: string }[] {
	const out: { t: 'same' | 'del' | 'ins'; s: string }[] = [];
	const re = /\{-([\s\S]*?)-\}|\{\+([\s\S]*?)\+\}/g;
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = re.exec(text))) {
		if (m.index > last) out.push({ t: 'same', s: text.slice(last, m.index) });
		if (m[1] !== undefined) out.push({ t: 'del', s: m[1] });
		else out.push({ t: 'ins', s: m[2] });
		last = re.lastIndex;
	}
	if (last < text.length) out.push({ t: 'same', s: text.slice(last) });
	return out;
}

/** Plain "before" and "after" text of a diff, for Markdown and llms.txt. */
export const diffBefore = (text: string) => text.replace(/\{\+[\s\S]*?\+\}/g, '').replace(/\{-([\s\S]*?)-\}/g, '$1');
export const diffAfter = (text: string) => text.replace(/\{-[\s\S]*?-\}/g, '').replace(/\{\+([\s\S]*?)\+\}/g, '$1');

/* ───────────── Usage builder ───────────── */

const band = (k: 'usage' | 'ads') => addOns.find((a) => a.key === k)!;
export const usageBand = { lo: band('usage').lo as number, hi: band('usage').hi as number, src: 'later26' };
export const adsBand = { lo: band('ads').lo as number, hi: band('ads').hi as number, src: 'later26' };

/**
 * Where a term length sits inside Later's 30–50% band. Placement is our
 * creator-tested rule of thumb; only the band itself is published.
 * `periods` > 1 means "price it as that many periods" (beyond the band).
 */
export const usageTerms = [
	{ days: 30, label: '30 days', pos: 0, periods: 1 },
	{ days: 90, label: '90 days', pos: 0.5, periods: 1 },
	{ days: 180, label: '6 months', pos: 1, periods: 1 },
	{ days: 365, label: '12 months', pos: 1, periods: 2 },
	{ days: 0, label: 'Forever', pos: 1, periods: 0 },
] as const;

export const usageChannels = [
	{ key: 'social', label: 'Their social accounts', help: 'Reposts on the brand’s own Instagram, TikTok and so on.' },
	{ key: 'web', label: 'Website and email', help: 'Product pages, newsletters, their app.' },
	{ key: 'brandAds', label: 'Ads from their account', help: 'The brand runs your video as its own ad.' },
	{ key: 'handleAds', label: 'Ads from your account', help: 'Whitelisting: partnership ads, Spark Ads, YouTube partnership ads.' },
] as const;

/* ───────────── Which ad tool is which (official sources) ───────────── */

export const adTools = [
	{
		key: 'meta',
		platform: 'Instagram and Facebook',
		name: 'Partnership ads',
		how: 'The brand asks for permission to run ads from your handle, for one post or your account, and you approve it in the app.',
		control: 'You can revoke an advertiser’s permission at any time.',
		watch: 'Account-level permission covers future posts too. Prefer per-post where you can.',
		srcs: ['metaPerm', 'metaRevoke'],
		tint: 'var(--sc-rose)',
	},
	{
		key: 'tiktok',
		platform: 'TikTok',
		name: 'Spark Ads',
		how: 'You generate a code for one post from its ad settings and send it to the brand, with an authorization period you choose.',
		control: 'A code can only be deleted once every ad using that video is deleted.',
		watch: 'You can’t edit the caption once a post is authorized, and a private video becomes public when it’s used in a campaign.',
		srcs: ['tiktokSpark'],
		tint: 'var(--sc-cyan)',
	},
	{
		key: 'youtube',
		platform: 'YouTube',
		name: 'Partnership ads',
		how: 'You add the brand as a partner in YouTube Studio and link the video. The ads run from your channel.',
		control: 'Google tells brands they’re responsible for getting the rights to use your video as an ad, which may need a separate agreement with you.',
		watch: 'That separate agreement is your paid-usage fee. Don’t link a video until it’s signed.',
		srcs: ['ytBoost', 'ytPartners'],
		tint: 'var(--sc-champagne)',
	},
];

/* ───────────── Exclusivity scope rings ───────────── */

export const exclusivityScopes = [
	{
		key: 'named',
		label: 'Named competitors',
		example: 'Three to five brands listed by name in the contract',
		verdict: 'The fair default',
	},
	{
		key: 'product',
		label: 'Their product category',
		example: 'Every protein-powder brand',
		verdict: 'Fine for the right price',
	},
	{
		key: 'industry',
		label: 'The whole industry',
		example: 'All food, drink and supplements',
		verdict: 'Push back or price it high',
	},
] as const;

/* ───────────── Payment terms timeline ───────────── */

export type PayPlan = {
	key: string;
	label: string;
	/** Payments: share of fee, and when (days after signing, or after go-live). */
	pays: { share: number; from: 'sign' | 'live'; days: number }[];
	unknown?: boolean;
	verdict: 'good' | 'ok' | 'bad';
	note: string;
};

export const payPlans: PayPlan[] = [
	{ key: 'deposit', label: '50% on signing + Net 30', pays: [{ share: 0.5, from: 'sign', days: 7 }, { share: 0.5, from: 'live', days: 30 }], verdict: 'good', note: 'What Revision Legal suggests: half before you deliver anything, the rest within 30 days.' },
	{ key: 'net30', label: 'Net 30 from posting', pays: [{ share: 1, from: 'live', days: 30 }], verdict: 'ok', note: 'Common and fine with a brand you know. Make sure the clock starts on the go-live date.' },
	{ key: 'net60', label: 'Net 60', pays: [{ share: 1, from: 'live', days: 60 }], verdict: 'bad', note: 'You’re lending the brand your fee for two months. Ask for Net 30 or a deposit.' },
	{ key: 'net90', label: 'Net 90', pays: [{ share: 1, from: 'live', days: 90 }], verdict: 'bad', note: 'A quarter of a year. Revision Legal flags Net 60 and Net 90 as red flags.' },
	{ key: 'pwp', label: 'Pay-when-paid', pays: [{ share: 1, from: 'live', days: 120 }], unknown: true, verdict: 'bad', note: 'No date at all: you’re paid after the agency’s client pays the agency. Strike it.' },
];

/* ───────────── Commission terms ───────────── */

/** Sunset step-downs to compare, written for a 20% commission (the widget scales them to the rate you enter). Creator-tested. */
export const sunsets = [
	{ key: 'forever', label: 'As they wrote it', steps: [{ months: 36, pct: 0.2 }], open: true },
	{ key: 'fair', label: 'Your redline', steps: [{ months: 6, pct: 0.1 }, { months: 6, pct: 0.05 }, { months: 24, pct: 0 }], open: false },
];
