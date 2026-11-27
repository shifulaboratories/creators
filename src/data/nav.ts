/**
 * The site's main navigation: one source for the top nav, its dropdowns and
 * the phone menu. Keep it short: three menus, five or so links each. Anything
 * else is one search away. William finds busy menus confusing (2026-11-27).
 */
export type NavLink = { label: string; href: string; text?: string; icon?: string };
export type NavGroup = { id: string; label: string; href: string; chips?: NavLink[]; links: NavLink[] };

export const NAV: NavGroup[] = [
	{
		id: 'grow',
		label: 'Grow',
		href: '/grow/',
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
			{ label: 'Grow your audience', href: '/grow/', text: 'Niche, hooks, formats, cadence' },
			{ label: 'How algorithms work', href: '/algorithms/', text: 'What feeds actually reward' },
			{ label: 'Case studies', href: '/case-studies/', text: 'How top creators grew' },
		],
	},
	{
		id: 'paid',
		label: 'Get paid',
		href: '/deals/',
		links: [
			{ label: 'Brand deals', href: '/deals/', text: 'Pitch, price, negotiate, contracts' },
			{ label: 'Paywall', href: '/paywall/', text: 'Fanfix, OnlyFans, Patreon, Fanvue' },
			{ label: 'Every income stream', href: '/earn/', text: 'Affiliate, payouts, products' },
			{ label: 'Rates', href: '/rates/', text: 'What creators charge, by platform and size' },
			{ label: 'Free tools', href: '/tools/', text: 'Media kit, invoice and rate calculators' },
		],
	},
	{
		id: 'business',
		label: 'Business',
		href: '/money/',
		links: [
			{ label: 'Money basics', href: '/money/', text: 'Taxes, set-asides, LLC vs S corp' },
			{ label: 'Team', href: '/team/', text: 'Managers, agents, first hires' },
			{ label: 'Protect', href: '/protect/', text: 'Hacked, banned, impersonated' },
			{ label: 'Stack', href: '/stack/', text: 'Gear, software and tool reviews' },
			{ label: 'Tool directory', href: '/stack/directory/', text: 'Every creator tool, with real prices' },
			{ label: 'Underground', href: '/underground/', text: 'Gray markets, reported' },
		],
	},
];

/** Which group a path belongs to, for highlighting the top nav. */
export const groupFor = (path: string): string | undefined => {
	const p = path.replace(/\/?$/, '/');
	if (/^\/(platforms|grow|algorithms|case-studies|shortlist)\//.test(p)) return 'grow';
	if (/^\/(deals|paywall|earn|rates|tools)\//.test(p)) return 'paid';
	if (/^\/(money|team|stack|creators|reviews|protect|underground)\//.test(p)) return 'business';
	return undefined;
};

/**
 * The same menus in Spanish and Portuguese, keyed by link href (group labels by id).
 * Brand and platform names stay as they are. Machine-assisted: see docs/translating.md.
 */
type Words = { label: string; text?: string };
const ENGLISH_ONLY = ['/glossary/', '/creators/', '/tools/', '/rates/'];

const NAV_WORDS: Record<'es' | 'pt-br', { groups: Record<string, string>; links: Record<string, Words> }> = {
	es: {
		groups: { platforms: 'Plataformas', grow: 'Crecer', paid: 'Cobrar', business: 'Negocio' },
		links: {
			'/algorithms/': { label: 'General', text: 'Cómo funciona cada feed' },
			'/platforms/': { label: 'Todas las plataformas', text: 'Threads, Pinterest, Twitch y más' },
			'/grow/': { label: 'Haz crecer tu audiencia', text: 'Nicho, hooks, formatos, frecuencia' },
			'/algorithms/#grow': { label: 'Cómo funcionan los algoritmos', text: 'Qué premian de verdad los feeds' },
			'/algorithms/the-research/': { label: 'La investigación detrás de los feeds', text: 'Directo de los ingenieros de las plataformas' },
			'/case-studies/': { label: 'Casos de estudio', text: 'Cómo crecieron los grandes creadores' },
			'/shortlist/': { label: 'La Selección', text: 'Los pocos recursos que valen la pena' },
			'/deals/': { label: 'Colaboraciones con marcas', text: 'Proponer, cotizar, negociar, contratos' },
			'/paywall/': { label: 'Paywall', text: 'Fanfix, OnlyFans, Patreon, Fanvue' },
			'/earn/': { label: 'Todas las fuentes de ingreso', text: 'Afiliados, pagos de plataformas, productos' },
			'/deals/pricing/': { label: 'Pon precio a tus tarifas', text: 'Compara una cotización con referencias' },
			'/money/': { label: 'Finanzas básicas', text: 'Impuestos, apartados, LLC vs S corp (EE. UU.)' },
			'/team/': { label: 'Equipo', text: 'Managers, agentes, primeras contrataciones' },
			'/stack/': { label: 'Herramientas', text: 'Equipo, software y reseñas' },
			'/stack/directory/': { label: 'Directorio de herramientas', text: 'Cada herramienta para creadores, con precios reales' },
			'/reviews/': { label: 'Reseñas de herramientas', text: 'Stan, Beacons, Linktree: comisiones reales' },
			'/protect/': { label: 'Protégete', text: 'Hackeos, baneos, suplantación' },
			'/underground/': { label: 'Underground', text: 'Mercados grises, contados como periodismo' },
			'/glossary/': { label: 'Glosario', text: 'CPM, derechos de uso y cada término (en inglés)' },
			'/creators/': { label: 'Directorio de creadores', text: 'Qué usan y recomiendan (en inglés)' },
			'/rates/': { label: 'Tarifas', text: 'Lo que cobran los creadores (en inglés)' },
			'/tools/': { label: 'Herramientas gratis', text: 'Media kit, factura y calculadoras (en inglés)' },
		},
	},
	'pt-br': {
		groups: { platforms: 'Plataformas', grow: 'Crescer', paid: 'Ganhar', business: 'Negócio' },
		links: {
			'/algorithms/': { label: 'Geral', text: 'Como cada feed funciona' },
			'/platforms/': { label: 'Todas as plataformas', text: 'Threads, Pinterest, Twitch e mais' },
			'/grow/': { label: 'Cresça seu público', text: 'Nicho, hooks, formatos, frequência' },
			'/algorithms/#grow': { label: 'Como os algoritmos funcionam', text: 'O que os feeds premiam de verdade' },
			'/algorithms/the-research/': { label: 'A pesquisa por trás dos feeds', text: 'Direto dos engenheiros das plataformas' },
			'/case-studies/': { label: 'Estudos de caso', text: 'Como grandes criadores cresceram' },
			'/shortlist/': { label: 'A Seleção', text: 'Os poucos recursos que valem a pena' },
			'/deals/': { label: 'Publis com marcas', text: 'Propor, precificar, negociar, contratos' },
			'/paywall/': { label: 'Paywall', text: 'Fanfix, OnlyFans, Patreon, Fanvue' },
			'/earn/': { label: 'Todas as fontes de renda', text: 'Afiliados, repasses, produtos' },
			'/deals/pricing/': { label: 'Precifique seus valores', text: 'Compare uma proposta com referências' },
			'/money/': { label: 'Finanças básicas', text: 'Impostos, reservas, LLC vs S corp (EUA)' },
			'/team/': { label: 'Equipe', text: 'Empresários, agentes, primeiras contratações' },
			'/stack/': { label: 'Ferramentas', text: 'Equipamento, software e análises' },
			'/stack/directory/': { label: 'Diretório de ferramentas', text: 'Cada ferramenta para criadores, com preços reais' },
			'/reviews/': { label: 'Análises de ferramentas', text: 'Stan, Beacons, Linktree: taxas reais' },
			'/protect/': { label: 'Proteção', text: 'Conta hackeada, banida, perfil falso' },
			'/underground/': { label: 'Underground', text: 'Mercados cinzentos, como jornalismo' },
			'/glossary/': { label: 'Glossário', text: 'CPM, direitos de uso e cada termo (em inglês)' },
			'/creators/': { label: 'Diretório de criadores', text: 'O que usam e recomendam (em inglês)' },
			'/rates/': { label: 'Valores', text: 'Quanto os criadores cobram (em inglês)' },
			'/tools/': { label: 'Ferramentas grátis', text: 'Mídia kit, fatura e calculadoras (em inglês)' },
		},
	},
};

/** NAV in a language, with links pointing at that language's pages. */
export function navFor(locale: 'en' | 'es' | 'pt-br'): NavGroup[] {
	if (locale === 'en') return NAV;
	const w = NAV_WORDS[locale];
	const tr = (l: NavLink, key = l.href): NavLink => {
		const words = w.links[key];
		// English-only pages keep their English address.
		const href = ENGLISH_ONLY.some((p) => l.href.startsWith(p)) ? l.href : `/${locale}${l.href}`;
		return { ...l, label: words?.label ?? l.label, text: words?.text ?? l.text, href };
	};
	return NAV.map((g) => ({
		...g,
		label: w.groups[g.id] ?? g.label,
		href: `/${locale}${g.href}`,
		chips: g.chips?.map((l) => tr(l)),
		// "How algorithms work" shares /algorithms/ with the "General" chip, so it has its own key.
		links: g.links.map((l) => tr(l, g.id === 'grow' && l.href === '/algorithms/' ? '/algorithms/#grow' : l.href)),
	}));
}
