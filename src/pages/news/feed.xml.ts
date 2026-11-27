import type { APIRoute } from 'astro';
import { getNews, newsPath, NEWS_PLATFORM_INFO } from '../../lib/news';
import { SITE } from '../../lib/markdown';
import { SITE_NAME } from '../../site.mjs';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// RSS 2.0 feed of platform updates, newest first.
export const GET: APIRoute = async () => {
	const items = (await getNews()).slice(0, 50);
	const built = items.reduce((m, n) => Math.max(m, (n.data.updated ?? n.data.published).getTime()), 0);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(`Platform news · ${SITE_NAME}`)}</title>
<link>${SITE}/news/</link>
<atom:link href="${SITE}/news/feed.xml" rel="self" type="application/rss+xml"/>
<description>Algorithm, payout and policy changes on Instagram, TikTok, YouTube, Facebook, LinkedIn and X, with what each one means for creators.</description>
<language>en</language>
${built ? `<lastBuildDate>${new Date(built).toUTCString()}</lastBuildDate>` : ''}
${items
	.map((n) => {
		const url = `${SITE}${newsPath(n)}`;
		return `<item>
<title>${esc(n.data.title)}</title>
<link>${url}</link>
<guid isPermaLink="true">${url}</guid>
<pubDate>${n.data.published.toUTCString()}</pubDate>
<category>${esc(NEWS_PLATFORM_INFO[n.data.platform].name)}</category>
<description>${esc(`${n.data.summary} What it means for you: ${n.data.forYou[0]}`)}</description>
</item>`;
	})
	.join('\n')}
</channel>
</rss>
`;
	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
