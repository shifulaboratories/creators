import type { APIRoute } from 'astro';
import { sortedTerms, termPath } from '../lib/glossary';
import { SITE } from '../lib/markdown';

// The whole glossary as one Markdown list, for Ask AI on /glossary/.
export const GET: APIRoute = () => {
	let out = `# Creator glossary\n\nSource: ${SITE}/glossary/\n\nPlain-English definitions of creator economy terms. Each links to a page with a worked example and sources.\n\n`;
	for (const t of sortedTerms) out += `- [${t.term}${t.full ? ` (${t.full})` : ''}](${SITE}${termPath(t.slug)}.md): ${t.short}\n`.replace('/.md', '.md');
	return new Response(out, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
