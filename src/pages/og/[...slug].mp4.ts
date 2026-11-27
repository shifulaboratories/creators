import type { APIRoute, GetStaticPaths } from 'astro';
import { ogPages } from '../../lib/og-pages';
import { HAS_VIDEO, renderOgVideo } from '../../lib/og-video';

// One 4-second animated preview per page (see src/lib/og-video.ts). Skipped when
// the build has no ffmpeg, or with OG_VIDEO=0 for fast local builds.
export const getStaticPaths = (async () => (HAS_VIDEO ? ogPages() : [])) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await renderOgVideo(props as Parameters<typeof renderOgVideo>[0])), {
		headers: { 'Content-Type': 'video/mp4' },
	});
