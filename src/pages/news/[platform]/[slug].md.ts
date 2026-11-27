import type { APIRoute, GetStaticPaths } from 'astro';
import { getNews, newsSlug, newsMarkdown } from '../../../lib/news';
import { SITE } from '../../../lib/markdown';

// Markdown copy of each update, at the same path with .md (used by Ask AI).
export const getStaticPaths: GetStaticPaths = async () =>
	(await getNews()).map((entry) => ({ params: { platform: entry.data.platform, slug: newsSlug(entry) }, props: { entry } }));

export const GET: APIRoute = ({ props }) =>
	new Response(newsMarkdown(props.entry, SITE), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
