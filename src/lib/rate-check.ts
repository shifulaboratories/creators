/**
 * Rate Check: anonymous, crowd-sourced brand-deal rates. Shared by the page
 * (src/pages/rate-check.astro) and the API (worker/index.ts), so both agree on
 * what a valid submission is. No names, handles, emails or IPs are stored.
 */
export const RC_PLATFORMS = [
	{ key: 'instagram', name: 'Instagram', formats: [['reel', 'Reel'], ['feed', 'Feed post or carousel'], ['story', 'Story']] },
	{ key: 'tiktok', name: 'TikTok', formats: [['video', 'Video']] },
	{ key: 'youtube', name: 'YouTube', formats: [['integration', 'Sponsored segment'], ['dedicated', 'Dedicated video'], ['short', 'Short']] },
] as const;

export const RC_TIERS = [
	{ key: 'nano', name: 'Nano', range: '1K–10K', min: 1e3, max: 1e4 },
	{ key: 'micro', name: 'Micro', range: '10K–100K', min: 1e4, max: 1e5 },
	{ key: 'macro', name: 'Macro', range: '100K–1M', min: 1e5, max: 1e6 },
	{ key: 'mega', name: 'Mega', range: '1M+', min: 1e6, max: Infinity },
] as const;

export const RC_NICHES = ['Beauty', 'Fashion', 'Fitness', 'Food', 'Gaming', 'Tech', 'Finance', 'Travel', 'Parenting', 'Lifestyle', 'Comedy', 'Education', 'Music', 'B2B', 'Other'];
export const RC_REGIONS = ['US', 'Canada', 'UK', 'Europe', 'Latin America', 'Asia-Pacific', 'Other'];

/** A bucket stays hidden until this many rates are in it, so no single deal can be picked out. */
export const RC_MIN_BUCKET = 5;

export const tierFor = (followers: number) => RC_TIERS.find((t) => followers >= t.min && followers < t.max)?.key ?? null;

export type Submission = { platform: string; format: string; followers: number; rate: number; usage: boolean; niche: string | null; region: string | null };

/** Returns a clean submission, or an error message for the reader. */
export function validate(x: Record<string, unknown>): Submission | string {
	const p = RC_PLATFORMS.find((p) => p.key === x.platform);
	if (!p) return 'Pick a platform.';
	if (!p.formats.some(([k]) => k === x.format)) return 'Pick a format.';
	const followers = Math.round(Number(x.followers));
	if (!Number.isFinite(followers) || followers < 1000 || followers > 1e9) return 'Followers must be at least 1,000.';
	const rate = Math.round(Number(x.rate));
	if (!Number.isFinite(rate) || rate < 10 || rate > 2_000_000) return 'Enter the rate in US dollars, between $10 and $2,000,000.';
	const niche = typeof x.niche === 'string' && RC_NICHES.includes(x.niche) ? x.niche : null;
	const region = typeof x.region === 'string' && RC_REGIONS.includes(x.region) ? x.region : null;
	return { platform: p.key, format: String(x.format), followers, rate, usage: x.usage === true, niche, region };
}

/** Percentile of a sorted list, linear between neighbours. */
export function pct(sorted: number[], q: number) {
	const i = (sorted.length - 1) * q;
	const lo = Math.floor(i);
	return sorted[lo] + (sorted[Math.ceil(i)] - sorted[lo]) * (i - lo);
}
