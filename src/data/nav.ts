/**
 * The site's main navigation: one source for the top nav, its dropdowns, the
 * phone menu and the bottom tab bar. Keep it short. Four groups, each a handful
 * of links, in the order creators look for them.
 */
export type NavLink = { label: string; href: string; text?: string; icon?: string };
export type NavGroup = { id: string; label: string; href: string; links: NavLink[] };

export const NAV: NavGroup[] = [
	{
		id: 'platforms',
		label: 'Platforms',
		href: '/platforms/',
		links: [
			{ label: 'General', href: '/algorithms/', text: 'How every feed works', icon: 'general' },
			{ label: 'Instagram', href: '/platforms/instagram/', icon: 'instagram' },
			{ label: 'TikTok', href: '/platforms/tiktok/', icon: 'tiktok' },
			{ label: 'YouTube', href: '/platforms/youtube/', icon: 'youtube' },
			{ label: 'Facebook', href: '/platforms/facebook/', icon: 'facebook' },
			{ label: 'LinkedIn', href: '/platforms/linkedin/', icon: 'linkedin' },
			{ label: 'X', href: '/platforms/x/', icon: 'x' },
			{ label: 'All platforms', href: '/platforms/', text: 'Threads, Pinterest, Twitch and more' },
		],
	},
	{
		id: 'grow',
		label: 'Grow',
		href: '/grow/',
		links: [
			{ label: 'Grow your audience', href: '/grow/', text: 'Niche, hooks, formats, cadence' },
			{ label: 'How algorithms work', href: '/algorithms/', text: 'What feeds actually reward' },
			{ label: 'The research behind feeds', href: '/algorithms/the-research/', text: 'Straight from platform engineers' },
			{ label: 'Case studies', href: '/case-studies/', text: 'How top creators grew' },
			{ label: 'The Shortlist', href: '/shortlist/', text: 'The few resources worth it' },
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
			{ label: 'Price your rates', href: '/deals/pricing/', text: 'Check a quote against benchmarks' },
			{ label: 'Rates by platform and size', href: '/rates/', text: 'What Instagram, TikTok and YouTube creators charge' },
			{ label: 'Free media kit builder', href: '/tools/media-kit-builder/', text: 'One page, PDF or link, no signup' },
		],
	},
	{
		id: 'business',
		label: 'Business',
		href: '/money/',
		links: [
			{ label: 'Money basics', href: '/money/', text: 'Taxes, set-asides, LLC vs S corp' },
			{ label: 'Team', href: '/team/', text: 'Managers, agents, first hires' },
			{ label: 'Stack', href: '/stack/', text: 'Gear and software by budget' },
			{ label: 'Tool reviews', href: '/reviews/', text: 'Stan, Beacons, Linktree: real fees' },
			{ label: 'Protect', href: '/protect/', text: 'Hacked, banned, impersonated' },
			{ label: 'Underground', href: '/underground/', text: 'Gray markets, reported' },
			{ label: 'Glossary', href: '/glossary/', text: 'CPM, usage rights and every term' },
		],
	},
];

/** Which group a path belongs to, for highlighting the top nav. */
export const groupFor = (path: string): string | undefined => {
	const p = path.replace(/\/?$/, '/');
	if (p.startsWith('/platforms/')) return 'platforms';
	if (/^\/(grow|algorithms|case-studies|shortlist)\//.test(p)) return 'grow';
	if (/^\/(deals|paywall|earn|rates)\//.test(p)) return 'paid';
	if (/^\/(money|team|stack|reviews|protect|underground)\//.test(p)) return 'business';
	return undefined;
};

/**
 * The same menus in Spanish and Portuguese, keyed by link href (group labels by id).
 * Brand and platform names stay as they are. Machine-assisted: see docs/translating.md.
 */
type Words = { label: string; text?: string };
const ENGLISH_ONLY = ['/glossary/'];

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
			'/stack/': { label: 'Herramientas', text: 'Equipo y software según tu presupuesto' },
			'/reviews/': { label: 'Reseñas de herramientas', text: 'Stan, Beacons, Linktree: comisiones reales' },
			'/protect/': { label: 'Protégete', text: 'Hackeos, baneos, suplantación' },
			'/underground/': { label: 'Underground', text: 'Mercados grises, contados como periodismo' },
			'/glossary/': { label: 'Glosario', text: 'CPM, derechos de uso y cada término (en inglés)' },
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
			'/stack/': { label: 'Ferramentas', text: 'Equipamento e software por orçamento' },
			'/reviews/': { label: 'Análises de ferramentas', text: 'Stan, Beacons, Linktree: taxas reais' },
			'/protect/': { label: 'Proteção', text: 'Conta hackeada, banida, perfil falso' },
			'/underground/': { label: 'Underground', text: 'Mercados cinzentos, como jornalismo' },
			'/glossary/': { label: 'Glossário', text: 'CPM, direitos de uso e cada termo (em inglês)' },
		},
	},
};

/** NAV in a language, with links pointing at that language's pages. */
export function navFor(locale: 'en' | 'es' | 'pt-br'): NavGroup[] {
	if (locale === 'en') return NAV;
	const w = NAV_WORDS[locale];
	return NAV.map((g) => ({
		...g,
		label: w.groups[g.id] ?? g.label,
		href: `/${locale}${g.href}`,
		links: g.links.map((l) => {
			// "How algorithms work" shares /algorithms/ with "General", so it has its own key.
			const key = g.id === 'grow' && l.href === '/algorithms/' ? '/algorithms/#grow' : l.href;
			const tr = w.links[key];
			// The glossary is English only for now, so it keeps its English address.
			const href = ENGLISH_ONLY.some((p) => l.href.startsWith(p)) ? l.href : `/${locale}${l.href}`;
			return { ...l, label: tr?.label ?? l.label, text: tr?.text ?? l.text, href };
		}),
	}));
}
