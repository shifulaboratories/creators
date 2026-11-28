/**
 * Home page copy per language (src/components/Home.astro). Spanish uses "tú",
 * Portuguese is Brazilian with "você". Machine-assisted: native review welcome.
 */
const en = {
	title: 'the creator playbook, minus the gurus',
	description: 'The free, open-source handbook for the creator economy, written by people who do the work.',
	eyebrow: 'Free, by creators, for creators',
	h1a: 'The creator playbook,',
	h1b: 'minus the gurus.',
	lead: 'How the algorithm really picks what gets seen, what a brand deal should pay, and how to run the business side. Every claim sourced, every affiliate link labeled, free forever.',
	langNote: '',
	facts: { label: 'At a glance', guides: 'guides', platforms: 'platforms', sourced: 'Every claim sourced' },
	find: 'Find a guide',
	popular: 'Popular guides',
	trustTitle: 'Free, and honest about it.',
	trust: [
		['Affiliate links are labeled', 'Right where they appear, never hidden in a footer.'],
		['A free option, every time', 'Every tool pick names a free or non-affiliate alternative.'],
		['Who is behind it', 'The team behind this site is building a talent agency. We say so up front.'],
	],
	cta: { find: 'Find a guide', kit: 'Make a media kit' },
	show: {
		pill: 'Fresh this week',
		title: 'Tools that do the work for you.',
		lead: 'Play with them right here. Everything is free, needs no sign-up, and links to the full version.',
		kit: { tag: 'Media kit builder', title: 'A media kit brands actually open.', text: 'Three looks, page, Story and Post sizes, and a PDF with working links in one tap.', looks: 'Media kit look', sample: 'Sample creator. Yours fills in from your numbers.', cta: 'Build yours free' },
		taste: { tag: 'Taste map', title: 'Watch a feed learn someone.', text: 'Tap what you like. See your spot move and your shortlist change, like the real feeds do.', mapLabel: 'A map of posts grouped by topic, with your spot on it', chipsLabel: 'React to a topic', topics: ['Skincare', 'Travel', 'Cooking', 'Comedy', 'Money', 'Fitness'], start: 'Tap a topic to react.', moved: 'The glowing posts are your new shortlist.', cta: 'Play the full version' },
		time: { tag: 'Platform timeline', title: 'Every change that mattered, dated and sourced.', cta: 'See the full timeline' },
		jobs: { tag: 'Jobs', open: 'open roles at {n} creator companies, updated daily', top: 'Hiring the most', cta: 'Browse jobs' },
		cases: { tag: 'Case studies', title: 'The one move that made them.', cta: 'Read the case studies' },
	},
	money: 'How we make money',
	contribute: 'Contribute on GitHub',
	footer: { label: 'Footer', about: 'About', standards: 'Editorial standards', corrections: 'Corrections', disclaimer: 'Educational information, not legal or financial advice.' },
};

export type HomeCopy = typeof en;

const es: HomeCopy = {
	title: 'el manual del creador, sin gurús',
	description: 'El manual gratuito y de código abierto de la economía de creadores, escrito por gente que hace el trabajo.',
	eyebrow: 'Gratis, hecho por creadores, para creadores',
	h1a: 'El manual del creador,',
	h1b: 'sin gurús.',
	lead: 'Cómo elige de verdad el algoritmo lo que se ve, cuánto debería pagar una colaboración con una marca y cómo manejar el lado del negocio. Cada dato con su fuente, cada enlace de afiliado señalado, gratis para siempre.',
	langNote: 'Estamos traduciendo el sitio. Las guías que aún no están en español se muestran en inglés, marcadas con EN.',
	facts: { label: 'De un vistazo', guides: 'guías', platforms: 'plataformas', sourced: 'Cada dato con su fuente' },
	find: 'Encuentra una guía',
	popular: 'Guías populares',
	trustTitle: 'Gratis, y con total transparencia.',
	trust: [
		['Los enlaces de afiliado van señalados', 'Justo donde aparecen, nunca escondidos en el pie de página.'],
		['Siempre una opción gratis', 'Cada herramienta recomendada incluye una alternativa gratis o sin afiliado.'],
		['Quién está detrás', 'El equipo detrás de este sitio está creando una agencia de talento. Lo decimos desde el principio.'],
	],
	cta: { find: 'Encuentra una guía', kit: 'Crea tu media kit' },
	show: {
		pill: 'Nuevo esta semana',
		title: 'Herramientas que hacen el trabajo por ti.',
		lead: 'Pruébalas aquí mismo. Todo es gratis, sin registro, y lleva a la versión completa.',
		kit: { tag: 'Media kit', title: 'Un media kit que las marcas sí abren.', text: 'Tres estilos, tamaños de página, Story y Post, y un PDF con enlaces que funcionan en un toque.', looks: 'Estilo del media kit', sample: 'Creadora de ejemplo. El tuyo se llena con tus números.', cta: 'Crea el tuyo gratis' },
		taste: { tag: 'Mapa de gustos', title: 'Mira cómo un feed aprende de alguien.', text: 'Toca lo que te gusta. Mira cómo se mueve tu punto y cambia tu lista, como en los feeds reales.', mapLabel: 'Un mapa de publicaciones agrupadas por tema, con tu punto', chipsLabel: 'Reacciona a un tema', topics: ['Skincare', 'Viajes', 'Cocina', 'Comedia', 'Dinero', 'Fitness'], start: 'Toca un tema para reaccionar.', moved: 'Las publicaciones que brillan son tu nueva lista.', cta: 'Prueba la versión completa' },
		time: { tag: 'Cronología', title: 'Cada cambio que importó, con fecha y fuente.', cta: 'Ver la cronología' },
		jobs: { tag: 'Empleos', open: 'puestos abiertos en {n} empresas de creadores, actualizados a diario', top: 'Quién contrata más', cta: 'Ver empleos' },
		cases: { tag: 'Casos', title: 'La jugada que los hizo despegar.', cta: 'Leer los casos' },
	},
	money: 'Cómo ganamos dinero',
	contribute: 'Colabora en GitHub',
	footer: { label: 'Pie de página', about: 'Acerca de', standards: 'Estándares editoriales', corrections: 'Correcciones', disclaimer: 'Información educativa, no es asesoría legal ni financiera.' },
};

const pt: HomeCopy = {
	title: 'o manual do criador, sem gurus',
	description: 'O manual gratuito e de código aberto da economia dos criadores, escrito por quem faz o trabalho.',
	eyebrow: 'Grátis, feito por criadores, para criadores',
	h1a: 'O manual do criador,',
	h1b: 'sem gurus.',
	lead: 'Como o algoritmo escolhe de verdade o que aparece, quanto uma publi deveria pagar e como cuidar do lado do negócio. Toda afirmação com fonte, todo link de afiliado sinalizado, grátis para sempre.',
	langNote: 'Estamos traduzindo o site. Os guias que ainda não estão em português aparecem em inglês, marcados com EN.',
	facts: { label: 'Em resumo', guides: 'guias', platforms: 'plataformas', sourced: 'Toda afirmação com fonte' },
	find: 'Encontre um guia',
	popular: 'Guias populares',
	trustTitle: 'Grátis, e transparente sobre isso.',
	trust: [
		['Links de afiliado são sinalizados', 'Bem onde aparecem, nunca escondidos no rodapé.'],
		['Sempre uma opção grátis', 'Toda ferramenta indicada vem com uma alternativa grátis ou sem afiliado.'],
		['Quem está por trás', 'A equipe por trás deste site está criando uma agência de talentos. Dizemos isso logo de cara.'],
	],
	cta: { find: 'Encontre um guia', kit: 'Monte seu mídia kit' },
	show: {
		pill: 'Novidade da semana',
		title: 'Ferramentas que fazem o trabalho por você.',
		lead: 'Teste aqui mesmo. Tudo é grátis, sem cadastro, e leva para a versão completa.',
		kit: { tag: 'Mídia kit', title: 'Um mídia kit que as marcas abrem de verdade.', text: 'Três estilos, tamanhos de página, Story e Post, e um PDF com links que funcionam em um toque.', looks: 'Estilo do mídia kit', sample: 'Criadora de exemplo. O seu é preenchido com seus números.', cta: 'Monte o seu grátis' },
		taste: { tag: 'Mapa de gostos', title: 'Veja um feed aprender alguém.', text: 'Toque no que você curte. Veja seu ponto se mover e sua lista mudar, como nos feeds de verdade.', mapLabel: 'Um mapa de posts agrupados por tema, com o seu ponto', chipsLabel: 'Reaja a um tema', topics: ['Skincare', 'Viagem', 'Culinária', 'Humor', 'Dinheiro', 'Fitness'], start: 'Toque em um tema para reagir.', moved: 'Os posts que brilham são sua nova lista.', cta: 'Teste a versão completa' },
		time: { tag: 'Linha do tempo', title: 'Toda mudança que importou, com data e fonte.', cta: 'Ver a linha do tempo' },
		jobs: { tag: 'Vagas', open: 'vagas abertas em {n} empresas de criadores, atualizadas todo dia', top: 'Quem mais contrata', cta: 'Ver vagas' },
		cases: { tag: 'Estudos de caso', title: 'A jogada que fez eles decolarem.', cta: 'Ler os estudos de caso' },
	},
	money: 'Como ganhamos dinheiro',
	contribute: 'Contribua no GitHub',
	footer: { label: 'Rodapé', about: 'Sobre', standards: 'Padrões editoriais', corrections: 'Correções', disclaimer: 'Informação educativa, não é aconselhamento jurídico nem financeiro.' },
};

export const home: Record<'en' | 'es' | 'pt-br', HomeCopy> = { en, es, 'pt-br': pt };
