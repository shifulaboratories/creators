/**
 * The site is static. This Worker only runs for /api/* (see run_worker_first in
 * wrangler.jsonc); everything else is served straight from the built assets.
 *
 * /api/rate-check  GET  ?platform=&format=  → per-tier quartiles, only for tiers with RC_MIN_BUCKET+ rates
 *                  POST {platform, format, followers, rate, usage, niche, region, token} → stores one anonymous rate
 *
 * Privacy: no IP, name, handle, email or exact date is stored, only the month.
 * Submissions count once Cloudflare Turnstile verifies them; without a Turnstile
 * secret they're kept as 'pending' for review and don't show in results.
 */
import { RC_MIN_BUCKET, RC_TIERS, pct, tierFor, validate } from '../src/lib/rate-check';

// Just the parts of the D1 API this file uses (no @cloudflare/workers-types dependency).
interface D1Stmt {
	bind(...v: unknown[]): D1Stmt;
	all<T>(): Promise<{ results?: T[] }>;
	run(): Promise<unknown>;
}
interface D1Database {
	prepare(sql: string): D1Stmt;
}

interface Env {
	ASSETS: { fetch: (r: Request) => Promise<Response> };
	DB?: D1Database;
	SUBMIT_LIMIT?: { limit: (o: { key: string }) => Promise<{ success: boolean }> };
	TURNSTILE_SECRET?: string;
	TURNSTILE_SITE_KEY?: string;
}

const json = (body: unknown, status = 200, cache = 'no-store') =>
	new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache } });

async function summary(url: URL, env: Env) {
	const platform = url.searchParams.get('platform') ?? '';
	const format = url.searchParams.get('format') ?? '';
	const res = await env.DB!.prepare("SELECT tier, rate_usd FROM rates WHERE platform = ?1 AND format = ?2 AND status = 'ok' ORDER BY rate_usd").bind(platform, format).all<{ tier: string; rate_usd: number }>();
	const rows = res.results ?? [];
	const round = (n: number) => (n >= 1000 ? Math.round(n / 50) * 50 : Math.round(n / 10) * 10);
	const tiers = RC_TIERS.map((t) => {
		const xs = rows.filter((r) => r.tier === t.key).map((r) => r.rate_usd);
		if (xs.length < RC_MIN_BUCKET) return { tier: t.key, n: xs.length, shown: false };
		return { tier: t.key, n: xs.length, shown: true, p25: round(pct(xs, 0.25)), median: round(pct(xs, 0.5)), p75: round(pct(xs, 0.75)) };
	});
	return json({ platform, format, total: rows.length, min: RC_MIN_BUCKET, tiers, siteKey: env.TURNSTILE_SITE_KEY ?? null }, 200, 'public, max-age=300');
}

async function submit(req: Request, env: Env) {
	if (env.SUBMIT_LIMIT) {
		// The limiter keys on the connecting IP in memory only; it is never written anywhere.
		const { success } = await env.SUBMIT_LIMIT.limit({ key: req.headers.get('cf-connecting-ip') ?? 'anon' });
		if (!success) return json({ error: 'Too many in a row. Try again in a minute.' }, 429);
	}
	let body: Record<string, unknown>;
	try {
		body = await req.json();
	} catch {
		return json({ error: 'Something went wrong. Try again.' }, 400);
	}
	if (body.website) return json({ ok: true }); // honeypot field: bots fill it, people don't see it
	const s = validate(body);
	if (typeof s === 'string') return json({ error: s }, 400);
	let status = 'pending';
	if (env.TURNSTILE_SECRET) {
		const form = new FormData();
		form.append('secret', env.TURNSTILE_SECRET);
		form.append('response', String(body.token ?? ''));
		const v = (await (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })).json()) as { success: boolean };
		if (!v.success) return json({ error: 'We couldn’t confirm you’re a person. Reload and try again.' }, 400);
		status = 'ok';
	}
	const month = new Date().toISOString().slice(0, 7);
	await env.DB!.prepare('INSERT INTO rates (platform, format, tier, followers, rate_usd, usage_rights, niche, region, month, source, status) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)')
		.bind(s.platform, s.format, tierFor(s.followers), s.followers, s.rate, s.usage ? 1 : 0, s.niche, s.region, month, 'community', status)
		.run();
	return json({ ok: true, counted: status === 'ok' });
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const url = new URL(req.url);
		if (url.pathname === '/api/rate-check' || url.pathname === '/api/rate-check/') {
			if (!env.DB) return json({ error: 'Rate Check isn’t connected here.' }, 503);
			if (req.method === 'GET') return summary(url, env);
			if (req.method === 'POST') return submit(req, env);
			return json({ error: 'Method not allowed' }, 405);
		}
		if (url.pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
		return env.ASSETS.fetch(req);
	},
};
