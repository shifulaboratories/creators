/**
 * Helpers for the creator glossary (/glossary/). Data lives in
 * src/data/glossary/terms.ts. The build fails here if a term links to a guide
 * or term that doesn't exist, or if its one-line answer is too short or long.
 */
import { terms, CATEGORIES, type Term, type Category } from '../data/glossary/terms';

export { terms, CATEGORIES };
export type { Term, Category };

export const GLOSSARY_PATH = '/glossary/';
export const termPath = (slug: string) => `/glossary/${slug}/`;

const bySlug = new Map(terms.map((t) => [t.slug, t]));
export const getTerm = (slug: string) => bySlug.get(slug);

/** Terms sorted A to Z, ignoring case and leading digits’ odd sorting. */
export const sortedTerms = [...terms].sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base', numeric: true }));

/** First letter for the A to Z index ("#" for numbers). */
export const letterOf = (t: Term) => {
	const c = t.term[0].toUpperCase();
	return /[A-Z]/.test(c) ? c : '#';
};

/** Countable terms read better with an article: "What is a retainer?" */
const ARTICLE: Record<string, string> = Object.fromEntries(
	['retainer', 'hook', 'niche', 'chatter', 'talent-manager', 'media-kit', 'creative-brief', 'sunset-clause', 'kill-fee', 'morality-clause', 'flat-fee', 'promo-code', 'qualified-view', 'platform-fee', 'thumbnail-test', 'subscription', 'keep-live', 'redline', 'dmca-takedown', 'community-guidelines-strike', 'performance-guarantee', 'write-off', 'recommendation-system', 'revenue-share']
		.map((s) => [s, 'a'])
		.concat([['affiliate-link', 'an'], ['llc', 'an'], ['mcn', 'an']]),
);

/** <title> text, written the way people search ("What is RPM on YouTube?"). */
export const seoTitle = (t: Term) => {
	if (t.seoTitle) return t.seoTitle;
	const name = /[A-Z]/.test(t.term.slice(1)) ? t.term : t.term[0].toLowerCase() + t.term.slice(1);
	const plural = /[^s]s$/.test(t.term) && !ARTICLE[t.slug];
	const lead = `What ${plural ? 'are' : 'is'} ${ARTICLE[t.slug] ? ARTICLE[t.slug] + ' ' : ''}${name}`;
	const full = t.full && /[a-z]/.test(t.full) && !t.full.includes(t.term) ? ` (${t.full.split(/ \(|, or /)[0].replace(/^(.)(.)/, (_m, a, b) => (/[A-Z]/.test(b) ? a : a.toLowerCase()) + b)})` : '';
	// Longest version that still fits in a Google result.
	return [`${lead}${full}? Meaning for creators`, `${lead}? Meaning for creators`, `${lead}${full}?`, `${lead}?`].find((c) => c.length <= 60) ?? `${lead}?`;
};

/** Minimal inline Markdown: [text](/path/) links and **bold**. Escapes everything else. */
export function inline(md: string): string {
	const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	return esc(md)
		.replace(/\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g, (_m, text, href) => `<a href="${href}">${text}</a>`)
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
export const plain = (md: string) => md.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');

/** Terms whose `guides` list includes a docs id: for "Words in this guide". */
export const termsForGuide = (id: string) => sortedTerms.filter((t) => t.guides.includes(id));

/** Validate once, at import time during the build. */
export function validateGlossary(docIds: Set<string>) {
	const problems: string[] = [];
	const seen = new Set<string>();
	for (const t of terms) {
		if (seen.has(t.slug)) problems.push(`duplicate slug "${t.slug}"`);
		seen.add(t.slug);
		if (!/^[a-z0-9-]+$/.test(t.slug)) problems.push(`${t.slug}: slug must be lowercase letters, digits and dashes`);
		const len = t.short.length;
		if (len < 70 || len > 160) problems.push(`${t.slug}: short is ${len} chars (needs 70 to 160)`);
		if (!CATEGORIES[t.category]) problems.push(`${t.slug}: unknown category ${t.category}`);
		for (const r of t.related) if (!bySlug.has(r)) problems.push(`${t.slug}: related term "${r}" doesn't exist`);
		for (const g of t.guides) if (!docIds.has(g)) problems.push(`${t.slug}: guide "${g}" doesn't exist`);
		if (t.sources.length === 0) problems.push(`${t.slug}: needs at least one source`);
		for (const p of t.body) {
			for (const m of p.matchAll(/\]\((\/[^)]*)\)/g)) {
				const path = m[1].replace(/^\/|\/$/g, '');
				if (path.startsWith('glossary/')) {
					if (!bySlug.has(path.slice(9))) problems.push(`${t.slug}: body links to missing term ${m[1]}`);
				} else if (!docIds.has(path) && !docIds.has(`${path}/index`)) problems.push(`${t.slug}: body links to missing page ${m[1]}`);
			}
		}
	}
	if (problems.length) throw new Error(`Glossary problems:\n- ${problems.join('\n- ')}`);
}

/** Plain-Markdown version of a term, for Ask AI, .md copies and llms-full.txt. */
export function termMarkdown(t: Term, site: string, titleFor: (id: string) => string = (id) => id): string {
	const lines = [`# ${t.term}${t.full ? ` (${t.full})` : ''}`, '', `Source: ${site}${termPath(t.slug)}`, '', `**In one line:** ${t.short}`, ''];
	for (const p of t.body) lines.push(plain(p), '');
	if (t.formula) lines.push(`**Formula:** ${t.formula}`, '');
	if (t.example) {
		lines.push('## Example', '', t.example.setup, '');
		for (const [k, v] of t.example.rows) lines.push(`- ${k}: ${v}`);
		lines.push('', t.example.takeaway, '');
	}
	if (t.tips?.length) {
		lines.push('## What to do', '');
		for (const tip of t.tips) lines.push(`- ${plain(tip)}`);
		lines.push('');
	}
	if (t.aka?.length) lines.push(`Also called: ${t.aka.join(', ')}`, '');
	if (t.guides.length) {
		lines.push('## Related guides', '');
		for (const g of t.guides) lines.push(`- [${titleFor(g)}](${site}/${g}/)`);
		lines.push('');
	}
	if (t.related.length) lines.push(`Related terms: ${t.related.map((r) => `[${getTerm(r)!.term}](${site}${termPath(r)})`).join(', ')}`, '');
	lines.push('## Sources', '');
	for (const s of t.sources) lines.push(`- ${s.publisher}, [${s.name}](${s.url})`);
	return lines.join('\n').trim() + '\n';
}
