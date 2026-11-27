import type { APIRoute } from 'astro';
import { jobs, jobsUpdated } from '../../lib/jobs';

// Every open role as compact rows, loaded by the filters on /jobs/ so the page
// itself only ships the first few. Row order matches JobListings.astro.
export const GET: APIRoute = () =>
	new Response(
		JSON.stringify({
			updated: jobsUpdated,
			rows: jobs.map((j) => [j.title, j.company, j.kind, j.role, j.location, j.remote ? 1 : 0, j.url, j.source, j.firstSeen]),
		}),
		{ headers: { 'Content-Type': 'application/json; charset=utf-8' } },
	);
