import type { APIRoute } from 'astro';
import { execSync } from 'node:child_process';

// Which commit this build came from. .github/workflows/verify-deploy.yml polls
// https://creators.select/version.json after every merge to main and raises an
// alert if the live site is still serving an older commit.
function commit(): string {
	const fromEnv = process.env.WORKERS_CI_COMMIT_SHA || process.env.GITHUB_SHA;
	if (fromEnv) return fromEnv;
	try {
		return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
	} catch {
		return 'unknown';
	}
}

export const GET: APIRoute = () =>
	new Response(
		JSON.stringify({
			commit: commit(),
			branch: process.env.WORKERS_CI_BRANCH ?? null,
			build: process.env.WORKERS_CI_BUILD_UUID ?? null,
			builtAt: new Date().toISOString(),
		}) + '\n',
		{ headers: { 'Content-Type': 'application/json' } },
	);
