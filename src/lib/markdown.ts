/**
 * Plain-Markdown copies of every guide, for AI assistants and "Copy as Markdown".
 * MDX components are replaced with a short note; raw HTML diagrams become text.
 */
import { reachText } from './reach-data';
import type { CollectionEntry } from 'astro:content';
import { sets, myths, rows, platforms } from './widget-data';
import { viralSteps, packagingVariants, emotions } from './viral-data';
import { protectWidgetMarkdown } from './protect-playbooks';
import { moneyWidgetText } from './money-markdown';
import { strategyWidgetText } from './strategy-data';
import { growWidgetText } from './grow-data';

export const SITE = 'https://creators.select';

export function toMarkdown(e: CollectionEntry<'docs'>): string {
	const d = e.data as typeof e.data & { lastReviewed?: Date; confidence?: string; status?: string };
	let body = e.body ?? '';
	body = body
		.replace(/^import .*$/gm, '')
		.replace(/<style>[\s\S]*?<\/style>/g, '')
		.replace(/<svg[\s\S]*?<\/svg>/g, '')
		// folded "details" sections keep their content
		.replace(/<DeepDive[^>]*>/g, '\n')
		.replace(/<\/DeepDive>/g, '\n')
		// guide-format components: keep every string they show
		.replace(/<(BeforeAfter|QuickCheck|CopyBlock|RatioCheck)\b([\s\S]*?)\/>/g, (_m, name, props) => '\n' + guideText(name, props) + '\n')
		// self-closing MDX components like <FeedSimulator />
		.replace(/<([A-Z][A-Za-z]+)[^>]*\/>/g, (m, name) => '\n' + (widgetText[name] ?? protectWidgetMarkdown(name, m) ?? `> Interactive element on the web page: ${name}. See ${SITE}/${e.id}/`) + '\n')
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
	const moves = (d as { moves?: { do: string; why: string; source?: string }[] }).moves ?? [];
	const doThis = moves.length
		? '## Do this today\n\n' + moves.map((m, i) => `${i + 1}. **${m.do}** ${m.why}${m.source ? ` (Source: ${m.source})` : ''}`).join('\n') + '\n\n'
		: '';
	return `# ${e.data.title}\n\n> ${e.data.description ?? ''}\n\n${meta}\n\n${doThis}${body}\n`;
}

const widgetText: Record<string, string> = {
	ViralPath:
		'Where does your post leak? (self-check) Rate your next post on four steps; each step only gets the people the step before kept, so the weakest caps your reach:\n\n' +
		viralSteps.map((s, i) => `${i + 1}. **${s.name}**: ${s.question} Feeds measure: ${s.measures}. Lesson: ${s.lesson} (${SITE}${s.href})`).join('\n'),
	PackagingTest:
		'Guess the winner (made-up video and numbers): three title and thumbnail ideas for a video about 30 days of waking up at 5am.\n\n| Title | Thumbnail | Click-through | Share of watch time |\n| --- | --- | --- | --- |\n' +
		packagingVariants.map((v) => `| ${v.title} | ${v.thumb} | ${v.ctr}% | ${v.watch}% |`).join('\n') +
		'\n\nYouTube\'s A/B test picks the winner by watch time, not click-through rate ("we optimize tests for overall watch time over other metrics, like click-through-rate", YouTube Help), so the specific, honest option wins.',
	EmotionMap:
		'What makes people share (Berger & Milkman, Journal of Marketing Research, 2012; 6,956 NYT articles, outcome = most-emailed list):\n\n' +
		emotions.map((e) => `- **${e.label}** (${e.effect === 'up' ? 'shared more' : e.effect === 'down' ? 'shared less' : 'no extra boost'}): ${e.finding} Make it: ${e.make} Watch out: ${e.watch}`).join('\n'),
	BroadcastChain:
		'Broadcast vs chain (Goel, Anderson, Hofman, Watts, Management Science, 2016; ~1 billion sharing events on Twitter, 2011-2012): big spreads look like one big broadcast, not long chains of friends sharing. About 1 in 4,000 posts reached even 100 reshares; about 99% of all sharing was the original post or one step from it; even videos and pictures with 10,000+ reposts had median structural virality under 3. Popularity is "largely driven by the size of the largest broadcast."',
	MoneyLoop:
		'The business loop behind ad-funded feeds (Meta figures):\n\n1. You post: the feed needs a steady supply of watchable content.\n2. The feed matches it: AI recommendations drove a 24%+ increase in time spent on Instagram since Reels launched (Zuckerberg, Q1 2023 call).\n3. People stay and come back: video time spent on Instagram up more than 30% year over year (Zuckerberg, Q3 2025 call).\n4. More ads get seen: ad impressions up 14%, "driven by engagement and user growth, particularly on video surfaces" (Susan Li, Q3 2025 call).\n5. Money funds better matching: Meta 2024 revenue $164.5B, up 22%; ad impressions up 11% in 2024 (Q4 2024 results).',
	SnowballFlow:
		'How a post snowballs (illustrative model, not platform data): a new post is shown to a small test group; if their reactions (watching through, sending, following, not swiping away) beat what the feed expects, it is shown to lookalike viewers, then adjacent interests, then broadly. Documented example: Instagram Trial Reels are shown to non-followers first, with views, likes, comments and shares visible after about 24 hours.',
	SignalBoard:
		'| Signal | Instagram | TikTok | YouTube | Facebook | X | LinkedIn |\n| --- | --- | --- | --- | --- | --- | --- |\n| Watching it through | Top | Top | Top | Counts | Counts | Top |\n| Sending or sharing | Top | Counts | Counts | Counts | Top | Counts |\n| Talking (comments, replies) | Counts | Counts | Not stated | Counts | Top | Counts |\n| Following after | Not stated | Counts | Not stated | Not stated | Counts | Not stated |\n| Liking | Top | Counts | Counts | Counts | Counts (0.708) | Counts |\n| Saying no (not interested, report) | Not stated | Not stated | Penalty | Penalty | Penalty | Not stated |\n\nInstagram: Mosseri, Jan 2025, "The top three signals that matter most for ranking are watch time, likes and sends." TikTok: finishing a longer video is a strong signal (Newsroom, 2020). YouTube: clicks, watch time, surveys, shares, likes, dislikes. Facebook: predicted likes, comments, shares and watching, weighted by what people say in surveys is worth their time (Engineering at Meta, 2021). X: copy-link share 20, reply/quote/DM share 5, follow 4, like 0.708, report -234 (2026 code). LinkedIn: time spent plus likes, comments and reshares; posts predicted to be skipped are scored down (LinkedIn Engineering 2020, CIKM 2026).',
	TasteMap:
		'Interactive taste map (illustrative): 30 made-up posts in six topics sit on a map, and you are a dot in the middle. The feed shortlists the posts nearest you and shows the closest; watching to the end or sending moves you toward that post, swiping or "not interested" moves you away, and every fourth card explores a topic outside your shortlist. The mechanism follows YouTube (2016), Instagram Explore (2023), ByteDance Monolith (2022) and TikTok (2020).',
	ReachSources: reachText,
	...moneyWidgetText,
	...growWidgetText,
	...strategyWidgetText,
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

/** Pull the visible strings out of a guide-format component's props. */
function guideText(name: string, props: string): string {
	const strings = [...props.matchAll(/(?:"((?:[^"\\]|\\.)*)"|`([^`]*)`)/g)]
		.map((m) => (m[1] ?? m[2] ?? '').replace(/\\"/g, '"').trim())
		.filter((t) => t && !['text', 'hint', 'label', 'title', 'lines', 'note'].includes(t) && !/^(is-|[a-z]+-[a-z-]+$)/.test(t));
	if (name === 'CopyBlock') return strings.map((t, i) => (i === 1 ? '```\n' + t + '\n```' : `**${t}**`)).join('\n\n');
	return strings.map((t) => `- ${t}`).join('\n');
}

export const isPublic = (e: CollectionEntry<'docs'>) => !e.data.draft;
