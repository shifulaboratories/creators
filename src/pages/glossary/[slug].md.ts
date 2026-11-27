import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { terms, termMarkdown, type Term } from '../../lib/glossary';
import { SITE } from '../../lib/markdown';

// Plain-Markdown copy of each glossary term, for Ask AI and assistants.
export const getStaticPaths = (() => terms.map((t) => ({ params: { slug: t.slug }, props: { t } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const docs = await getCollection('docs');
	const titles = new Map(docs.map((d) => [d.id, d.data.title]));
	return new Response(termMarkdown((props as { t: Term }).t, SITE, (id) => titles.get(id) ?? id), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
};
