/**
 * The site's main navigation: one source for the top nav, its dropdowns and
 * the phone menu. Five items, in this order (William, 2026-11-27):
 * Resources, Jobs, Directories (Creators, Companies, Tools), News, Contributors.
 * Every guide section lives under Resources; anything else is one search away.
 * Don't add top-level items.
 */
export type NavLink = { label: string; href: string; text?: string; icon?: string };
/** A top-level item. With `links` it opens a dropdown; without, it's a plain link. */
export type NavGroup = { id: string; label: string; href: string; chips?: NavLink[]; links?: NavLink[] };

export const NAV: NavGroup[] = [
	{
		id: 'resources',
		label: 'Resources',
		href: '/guides/',
		chips: [
			{ label: 'General', href: '/algorithms/', icon: 'general' },
			{ label: 'Instagram', href: '/platforms/instagram/', icon: 'instagram' },
			{ label: 'TikTok', href: '/platforms/tiktok/', icon: 'tiktok' },
			{ label: 'YouTube', href: '/platforms/youtube/', icon: 'youtube' },
			{ label: 'Facebook', href: '/platforms/facebook/', icon: 'facebook' },
			{ label: 'LinkedIn', href: '/platforms/linkedin/', icon: 'linkedin' },
			{ label: 'X', href: '/platforms/x/', icon: 'x' },
			{ label: 'All platforms', href: '/platforms/' },
		],
		links: [
			{ label: 'Make content that travels', href: '/algorithms/', text: 'How posts go viral, in five lessons' },
			{ label: 'Grow your audience', href: '/grow/', text: 'Hooks, formats, algorithms, case studies' },
			{ label: 'Strategy', href: '/strategy/', text: 'Clipping, fan pages, turning views into sales' },
			{ label: 'Brand deals', href: '/deals/', text: 'Pitch, price, negotiate, contracts' },
			{ label: 'Paywall', href: '/paywall/', text: 'Fanfix, OnlyFans, Patreon, Fanvue' },
			{ label: 'Money basics', href: '/money/', text: 'Taxes, set-asides, LLC vs S corp' },
			{ label: 'Free tools', href: '/tools/', text: 'Media kit, invoice and rate calculators' },
			{ label: 'Every resource', href: '/guides/', text: 'Search and browse all guides' },
		],
	},
	{ id: 'jobs', label: 'Jobs', href: '/jobs/' },
	{
		id: 'directories',
		label: 'Directories',
		href: '/creators/',
		links: [
			{ label: 'Creators', href: '/creators/', text: 'What top creators use and recommend' },
			{ label: 'Companies', href: '/team/agency-directory/', text: 'Agencies, managers and who they rep' },
			{ label: 'Tools', href: '/stack/directory/', text: 'Every creator tool, with real prices' },
		],
	},
	{ id: 'news', label: 'News', href: '/news/' },
	{ id: 'contributors', label: 'Contributors', href: '/about/contributors/' },
];

/** Which item a path belongs to, for highlighting the top nav. */
export const groupFor = (path: string): string | undefined => {
	const p = path.replace(/\/?$/, '/');
	if (/^\/(creators|team\/agency-directory|team\/rosters|stack\/directory)\//.test(p)) return 'directories';
	if (/^\/jobs\//.test(p)) return 'jobs';
	if (/^\/news\//.test(p)) return 'news';
	if (/^\/about\/contributors\//.test(p)) return 'contributors';
	if (/^\/(guides|platforms|grow|strategy|algorithms|case-studies|shortlist|deals|paywall|earn|rates|tools|money|team|stack|reviews|protect|underground|glossary)\//.test(p)) return 'resources';
	return undefined;
};

/**
 * The same menus in Spanish and Portuguese, keyed by link href (items by id).
 * Brand and platform names stay as they are. Machine-assisted: see docs/translating.md.
 */
type Words = { label: string; text?: string };
const ENGLISH_ONLY = ['/strategy/', '/glossary/', '/creators/', '/tools/', '/rates/', '/jobs/', '/stack/directory/'];

const NAV_WORDS: Record<'es' | 'pt-br', { groups: Record<string, string>; links: Record<string, Words> }> = {
	es: {
		groups: { resources: 'Recursos', jobs: 'Empleos', directories: 'Directorios', news: 'Noticias', contributors: 'Colaboradores' },
		links: {
			'/algorithms/': { label: 'General', text: 'Cómo funciona cada feed' },
			'/platforms/': { label: 'Todas las plataformas', text: 'Threads, Pinterest, Twitch y más' },
			'/grow/': { label: 'Haz crecer tu audiencia', text: 'Hooks, formatos, algoritmos, casos' },
			'/deals/': { label: 'Colaboraciones con marcas', text: 'Proponer, cotizar, negociar, contratos' },
			'/paywall/': { label: 'Paywall', text: 'Fanfix, OnlyFans, Patreon, Fanvue' },
			'/money/': { label: 'Finanzas básicas', text: 'Impuestos, apartados, LLC vs S corp (EE. UU.)' },
			'/tools/': { label: 'Herramientas gratis', text: 'Media kit, factura y calculadoras (en inglés)' },
			'/guides/': { label: 'Todos los recursos', text: 'Busca y explora todas las guías' },
			'/creators/': { label: 'Creadores', text: 'Qué usan y recomiendan (en inglés)' },
			'/team/agency-directory/': { label: 'Empresas', text: 'Agencias, managers y a quién representan' },
			'/stack/directory/': { label: 'Herramientas', text: 'Cada herramienta, con precios reales (en inglés)' },
		},
	},
	'pt-br': {
		groups: { resources: 'Recursos', jobs: 'Vagas', directories: 'Diretórios', news: 'Notícias', contributors: 'Colaboradores' },
		links: {
			'/algorithms/': { label: 'Geral', text: 'Como cada feed funciona' },
			'/platforms/': { label: 'Todas as plataformas', text: 'Threads, Pinterest, Twitch e mais' },
			'/grow/': { label: 'Cresça seu público', text: 'Hooks, formatos, algoritmos, casos' },
			'/deals/': { label: 'Publis com marcas', text: 'Propor, precificar, negociar, contratos' },
			'/paywall/': { label: 'Paywall', text: 'Fanfix, OnlyFans, Patreon, Fanvue' },
			'/money/': { label: 'Finanças básicas', text: 'Impostos, reservas, LLC vs S corp (EUA)' },
			'/tools/': { label: 'Ferramentas grátis', text: 'Mídia kit, fatura e calculadoras (em inglês)' },
			'/guides/': { label: 'Todos os recursos', text: 'Busque e explore todos os guias' },
			'/creators/': { label: 'Criadores', text: 'O que usam e recomendam (em inglês)' },
			'/team/agency-directory/': { label: 'Empresas', text: 'Agências, empresários e quem representam' },
			'/stack/directory/': { label: 'Ferramentas', text: 'Cada ferramenta, com preços reais (em inglês)' },
		},
	},
};

/** NAV in a language, with links pointing at that language's pages. */
export function navFor(locale: 'en' | 'es' | 'pt-br'): NavGroup[] {
	if (locale === 'en') return NAV;
	const w = NAV_WORDS[locale];
	// English-only pages keep their English address.
	const loc = (href: string) => (ENGLISH_ONLY.some((p) => href.startsWith(p)) ? href : `/${locale}${href}`);
	const tr = (l: NavLink): NavLink => {
		const words = w.links[l.href];
		return { ...l, label: words?.label ?? l.label, text: words?.text ?? l.text, href: loc(l.href) };
	};
	return NAV.map((g) => ({
		...g,
		label: w.groups[g.id] ?? g.label,
		href: loc(g.href),
		chips: g.chips?.map(tr),
		links: g.links?.map(tr),
	}));
}
