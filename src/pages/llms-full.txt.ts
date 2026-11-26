import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toMarkdown, isPublic } from '../lib/markdown';
import { SITE_NAME } from '../site.mjs';

// Every guide as one Markdown file, for pasting into or pointing an AI assistant at.
export const GET: APIRoute = async () => {
	const docs = (await getCollection('docs')).filter(isPublic).sort((a, b) => a.id.localeCompare(b.id));
	const out = `# ${SITE_NAME}: full library\n\n` + docs.map(toMarkdown).join('\n---\n\n');
	return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
