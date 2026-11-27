/**
 * Plain-Markdown copies of every guide, for AI assistants and "Copy as Markdown".
 * MDX components are replaced with a short note; raw HTML diagrams become text.
 */
import type { CollectionEntry } from 'astro:content';
import { sets, myths, rows, platforms } from './widget-data';

export const SITE = 'https://creators.select';

export function toMarkdown(e: CollectionEntry<'docs'>): string {
	const d = e.data as typeof e.data & { lastReviewed?: Date; confidence?: string; status?: string };
	let body = e.body ?? '';
	body = body
		.replace(/^import .*$/gm, '')
		.replace(/<style>[\s\S]*?<\/style>/g, '')
		.replace(/<svg[\s\S]*?<\/svg>/g, '')
		// self-closing MDX components like <FeedSimulator />
		.replace(/<([A-Z][A-Za-z]+)[^>]*\/>/g, (_m, name) => '\n' + (widgetText[name] ?? `> Interactive element on the web page: ${name}. See ${SITE}/${e.id}/`) + '\n')
		// list items in diagrams keep their text
		.replace(/<li[^>]*>/g, '\n- ')
		.replace(/<(h4|strong)[^>]*>/g, '**')
		.replace(/<\/(h4|strong)>/g, '** ')
		.replace(/<figcaption>/g, '\n_')
		.replace(/<\/figcaption>/g, '_\n')
		.replace(/<small>/g, ' (')
		.replace(/<\/small>/g, ')')
		.replace(/<span class="sc-tag[^"]*">([^<]*)<\/span>/g, '[$1]')
		.replace(/<\/?[a-z][^>]*>/g, ' ')
		.replace(/[ \t]+\n/g, '\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
	const meta = [
		`Source: ${SITE}/${e.id}/`,
		d.lastReviewed ? `Last reviewed: ${d.lastReviewed.toISOString().slice(0, 10)}` : '',
		d.confidence ? `Confidence: ${d.confidence}` : '',
		d.status ? `Status: ${d.status}` : '',
	]
		.filter(Boolean)
		.join(' · ');
	return `# ${e.data.title}\n\n> ${e.data.description ?? ''}\n\n${meta}\n\n${body}\n`;
}

const widgetText: Record<string, string> = {
	MoneyLoop:
		'The business loop behind ad-funded feeds (Meta figures):\n\n1. You post: the feed needs a steady supply of watchable content.\n2. The feed matches it: AI recommendations drove a 24%+ increase in time spent on Instagram since Reels launched (Zuckerberg, Q1 2023 call).\n3. People stay and come back: video time spent on Instagram up more than 30% year over year (Zuckerberg, Q3 2025 call).\n4. More ads get seen: ad impressions up 14%, "driven by engagement and user growth, particularly on video surfaces" (Susan Li, Q3 2025 call).\n5. Money funds better matching: Meta 2024 revenue $164.5B, up 22%; ad impressions up 11% in 2024 (Q4 2024 results).',
	SnowballFlow:
		'How a post snowballs (illustrative model, not platform data): a new post is shown to a small test group; if their reactions (watching through, sending, following, not swiping away) beat what the feed expects, it is shown to lookalike viewers, then adjacent interests, then broadly. Documented example: Instagram Trial Reels are shown to non-followers first, with views, likes, comments and shares visible after about 24 hours.',
	SignalBoard:
		'| Signal | Instagram | TikTok | YouTube | X |\n| --- | --- | --- | --- | --- |\n| Watching it through | Top | Top | Top | Counts |\n| Sending or sharing | Top | Counts | Counts | Top |\n| Talking (comments, replies) | Counts | Counts | Not stated | Top |\n| Following after | Not stated | Counts | Not stated | Counts |\n| Liking | Top | Counts | Counts | Counts (0.708) |\n| Saying no (not interested, report) | Not stated | Not stated | Penalty | Penalty |\n\nInstagram: Mosseri, Jan 2025, "The top three signals that matter most for ranking are watch time, likes and sends." TikTok: finishing a longer video is a strong signal (Newsroom, 2020). YouTube: clicks, watch time, surveys, shares, likes, dislikes. X: copy-link share 20, reply/quote/DM share 5, follow 4, like 0.708, report -234 (2026 code).',
	XWeights:
		'X ranking weights (multiply predicted probabilities, not counts):\n\n| Action | 2026 weight |\n| --- | --- |\n' +
		sets['2026'].map(([a, w]) => `| ${a} | ${w} |`).join('\n') +
		'\n\n| Action | 2023 weight |\n| --- | --- |\n' +
		sets['2023'].map(([a, w]) => `| ${a} | ${w} |`).join('\n') +
		'\n\nSources: xai-org/x-algorithm home-mixer/params/param.rs (2026); twitter/the-algorithm-ml projects/home/recap/README.md (April 5, 2023).',
	MythBuster: myths.map((m) => `- **${m.claim}** Verdict: ${m.verdict}. ${m.truth} Source: [${m.src}](${m.href})`).join('\n'),
	PlatformCompare:
		'| | ' + platforms.map((p) => p.name).join(' | ') + ' |\n|' + ' --- |'.repeat(platforms.length + 1) + '\n' +
		rows.map((r) => `| ${r.label} | ` + platforms.map((p) => `${p.rows[r.key].t} [${p.rows[r.key].s}]`).join(' | ') + ' |').join('\n'),
};

export const isPublic = (e: CollectionEntry<'docs'>) => !e.data.draft;
