import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '../../lib/og';
import { ogPages } from '../../lib/og-pages';

// One preview image per page, built once at deploy.
export const getStaticPaths = (() => ogPages()) satisfies GetStaticPaths;


export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await renderOg(props as Parameters<typeof renderOg>[0])), {
		headers: { 'Content-Type': 'image/png' },
	});
