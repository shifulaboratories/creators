/**
 * Platform news helpers: labels, URLs, sorting and dates shared by the news
 * hub, the per-platform pages, item pages, the RSS feed and link previews.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type NewsItem = CollectionEntry<'news'>;

export const NEWS_PLATFORM_INFO: Record<string, { name: string; guide: string; blurb: string }> = {
	instagram: { name: 'Instagram', guide: '/platforms/instagram/', blurb: 'Reels, Feed, Explore and creator programs.' },
	tiktok: { name: 'TikTok', guide: '/platforms/tiktok/', blurb: 'For You, Creator Rewards, Shop and the US venture.' },
	youtube: { name: 'YouTube', guide: '/platforms/youtube/', blurb: 'Partner Program, Shorts and recommendations.' },
	facebook: { name: 'Facebook', guide: '/platforms/facebook/', blurb: 'Feed, Reels, Content Monetization and Fast Track.' },
	linkedin: { name: 'LinkedIn', guide: '/platforms/linkedin/', blurb: 'Feed ranking, video and creator tools.' },
	x: { name: 'X', guide: '/platforms/x/', blurb: 'For You ranking code and Original Content Rewards.' },
};

export const KIND_LABEL: Record<string, string> = {
	algorithm: 'Algorithm',
	monetization: 'Getting paid',
	policy: 'Rules',
	tools: 'Tools',
	business: 'Business',
};

/** Item slug: the file name without extension. */
export const newsSlug = (n: NewsItem) => n.id.split('/').pop()!.replace(/\.md$/, '');
export const newsPath = (n: NewsItem) => `/news/${n.data.platform}/${newsSlug(n)}/`;
/** Docs-style id used for preview images and Markdown copies. */
export const newsId = (n: NewsItem) => `news/${n.data.platform}/${newsSlug(n)}`;

/** Newest first: by announcement date, then by when we published it. */
export async function getNews(platform?: string): Promise<NewsItem[]> {
	const all = await getCollection('news');
	return all
		.filter((n) => !platform || n.data.platform === platform)
		.sort(
			(a, b) =>
				b.data.announced.getTime() - a.data.announced.getTime() || b.data.published.getTime() - a.data.published.getTime(),
		);
}

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const fmtMonth = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
export const fmtDate = (d: Date) => fmt.format(d);
export const fmtMonthYear = (d: Date) => fmtMonth.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Plain-Markdown copy of an update, for AI assistants and the Ask AI sheet. */
export function newsMarkdown(n: NewsItem, site: string): string {
	const d = n.data;
	const p = NEWS_PLATFORM_INFO[d.platform].name;
	return [
		`# ${d.title}`,
		`> ${d.summary}`,
		`Source: ${site}${newsPath(n)} · ${p} · Announced ${isoDate(d.announced)}${d.effective ? ` · Takes effect ${d.effective}` : ''} · ${d.confirmed === 'official' ? 'Confirmed by the platform' : 'Reported, not confirmed by the platform'}`,
		`Who it affects: ${d.whoItAffects}`,
		`## What changed\n\n${(n.body ?? '').trim()}`,
		`## What it means for you\n\n${d.forYou.map((x) => `- ${x}`).join('\n')}`,
		d.doThis.length ? `## What to do\n\n${d.doThis.map((x) => `- ${x}`).join('\n')}` : '',
		`## Sources\n\n${d.sources.map((s) => `- ${s.publisher}, [${s.title}](${s.url})${s.date ? `, ${isoDate(s.date)}` : ''}${s.official ? ' (official)' : ''}`).join('\n')}`,
	]
		.filter(Boolean)
		.join('\n\n') + '\n';
}
