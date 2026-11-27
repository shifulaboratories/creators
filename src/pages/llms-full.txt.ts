import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { splitId } from '../i18n';
import { toMarkdown, isPublic } from '../lib/markdown';
import { SITE_NAME } from '../site.mjs';
import { sortedTerms, termMarkdown } from '../lib/glossary';
import { SITE } from '../lib/markdown';

// Every guide as one Markdown file, for pasting into or pointing an AI assistant at.
export const GET: APIRoute = async () => {
	const docs = (await getCollection('docs')).filter((e) => isPublic(e) && splitId(e.id).locale === 'en').sort((a, b) => a.id.localeCompare(b.id));
	const out = `# ${SITE_NAME}: full library\n\n` + docs.map(toMarkdown).join('\n---\n\n');
	const titles = new Map(docs.map((d) => [d.id, d.data.title]));
	const glossary = `\n---\n\n# Glossary\n\n` + sortedTerms.map((t) => termMarkdown(t, SITE, (id) => titles.get(id) ?? id).replace(/^# /, '## ')).join('\n');
	return new Response(out + glossary, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
