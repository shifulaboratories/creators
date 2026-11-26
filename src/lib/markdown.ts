/**
 * Plain-Markdown copies of every guide, for AI assistants and "Copy as Markdown".
 * MDX components are replaced with a short note; raw HTML diagrams become text.
 */
import type { CollectionEntry } from 'astro:content';
import { sets, myths, rows, platforms } from './widget-data';
import { growWidgetText } from './grow-data';

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
	...growWidgetText,
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
