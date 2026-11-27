/**
 * Rate pages (/rates/<platform>-<tier>/): one page per platform and follower tier,
 * built from the published bands in money-data.ts so the numbers live in one place.
 */
import { bands, formats, sources, type Band, type Platform } from './money-data';

export const RATE_PLATFORMS: { key: Platform; name: string }[] = [
	{ key: 'instagram', name: 'Instagram' },
	{ key: 'tiktok', name: 'TikTok' },
	{ key: 'youtube', name: 'YouTube' },
];

export type Tier = { key: string; name: string; min: number; max: number | null; range: string; sample: number };
export const TIERS: Tier[] = [
	{ key: 'nano', name: 'Nano', min: 1e3, max: 10e3, range: '1K–10K', sample: 5000 },
	{ key: 'micro', name: 'Micro', min: 10e3, max: 100e3, range: '10K–100K', sample: 40000 },
	{ key: 'macro', name: 'Macro', min: 100e3, max: 1e6, range: '100K–1M', sample: 300000 },
	{ key: 'mega', name: 'Mega', min: 1e6, max: null, range: '1M+', sample: 2000000 },
];

export const mainFormat = (p: Platform) => formats[p][0].label;
export const rateSlug = (p: Platform, t: string) => `${p}-${t}`;

const SRC_SHORT: Record<string, string> = { imh: 'Influencer Marketing Hub (2026)', later26: 'Later (2026)', later25: 'Later creator survey (2025)', collabstr: 'Collabstr (2025 deals)' };

export type RateRow = { format: string; primary: boolean; source: string; url: string; label: string; lo: number; hi: number | null };

/** Every published band for this platform that overlaps the tier, by format. */
export function ratesFor(platform: Platform, tier: Tier): RateRow[] {
	const rows: RateRow[] = [];
	for (const [i, f] of formats[platform].entries()) {
		for (const b of (bands[platform][f.key] ?? []) as Band[]) {
			const overlaps = (tier.max === null || b.min < tier.max) && (b.max === null || b.max > tier.min);
			if (!overlaps) continue;
			rows.push({ format: f.label, primary: i === 0, source: SRC_SHORT[b.src] ?? b.src, url: sources[b.src]?.url ?? '', label: b.label, lo: b.lo, hi: b.hi });
		}
	}
	return rows;
}

const median = (xs: number[]) => {
	const s = [...xs].sort((a, b) => a - b);
	const m = s.length >> 1;
	return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

/**
 * Middle of the published ranges for the platform's main format (Reels on Instagram):
 * median low to median high, as the rate calculator shows it.
 */
export function middle(all: RateRow[]): [number, number | null] | null {
	const rows = all.filter((r) => r.primary);
	if (!rows.length) return null;
	const lo = median(rows.map((r) => r.lo));
	const his = rows.map((r) => r.hi).filter((h): h is number => h !== null);
	return [lo, his.length ? Math.max(lo, median(his)) : null];
}

export const usd = (n: number) => '$' + (n >= 10000 ? Math.round(n / 100) * 100 : Math.round(n)).toLocaleString('en-US');
export const rangeText = (lo: number, hi: number | null) => (hi === null ? `${usd(lo)}+` : `${usd(lo)}–${usd(hi)}`);
