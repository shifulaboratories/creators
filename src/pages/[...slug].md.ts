import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { toMarkdown, isPublic } from '../lib/markdown';

export const getStaticPaths: GetStaticPaths = async () =>
	(await getCollection('docs')).filter(isPublic).map((entry) => ({ params: { slug: entry.id }, props: { entry } }));

export const GET: APIRoute = ({ props }) =>
	new Response(toMarkdown(props.entry), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
