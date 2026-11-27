import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { splitId } from '../i18n';
import { SITE, isPublic } from '../lib/markdown';
import { SITE_NAME, SITE_DESCRIPTION } from '../site.mjs';
import { getNews, newsPath, isoDate } from '../lib/news';

// https://llmstxt.org: a map of the site for AI assistants.
export const GET: APIRoute = async () => {
	const docs = (await getCollection('docs')).filter((e) => isPublic(e) && splitId(e.id).locale === 'en').sort((a, b) => a.id.localeCompare(b.id));
	const groups = new Map<string, typeof docs>();
	for (const d of docs) {
		const k = d.id.split('/')[0];
		groups.set(k, [...(groups.get(k) ?? []), d]);
	}
	let out = `# ${SITE_NAME}\n\n> ${SITE_DESCRIPTION}\n\nFree, open-source creator economy handbook. Claims are sourced and tagged: From the code (published source code), From the platform (the platform's own explainers), Creator-tested (named people on the record). Every page has a Markdown copy at the same path with .md. The whole library in one file: ${SITE}/llms-full.txt\n`;
	for (const [k, list] of groups) {
		out += `\n## ${k.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())}\n\n`;
		for (const d of list) out += `- [${d.data.title}](${SITE}/${d.id}.md): ${d.data.description ?? ''}\n`;
	}
	out += `\n## Platform news updates\n\n`;
	for (const n of await getNews()) out += `- [${n.data.title}](${SITE}${newsPath(n).slice(0, -1)}.md): ${isoDate(n.data.announced)}, ${n.data.summary}\n`;
	const translated = (await getCollection('docs')).filter((e) => isPublic(e) && splitId(e.id).locale !== 'en');
	if (translated.length) {
		out += `\n## Translations (Spanish, Brazilian Portuguese)\n\n`;
		for (const d of translated) out += `- [${d.data.title}](${SITE}/${d.id}.md) (${splitId(d.id).locale}): ${d.data.description ?? ''}\n`;
	}
	return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
