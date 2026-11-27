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
	find: 'Find a guide',
	trustTitle: 'Free, and honest about it.',
	trust: [
		['Affiliate links are labeled', 'Right where they appear, never hidden in a footer.'],
		['A free option, every time', 'Every tool pick names a free or non-affiliate alternative.'],
		['Who is behind it', 'The team behind this site is building a talent agency. We say so up front.'],
	],
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
	find: 'Encuentra una guía',
	trustTitle: 'Gratis, y con total transparencia.',
	trust: [
		['Los enlaces de afiliado van señalados', 'Justo donde aparecen, nunca escondidos en el pie de página.'],
		['Siempre una opción gratis', 'Cada herramienta recomendada incluye una alternativa gratis o sin afiliado.'],
		['Quién está detrás', 'El equipo detrás de este sitio está creando una agencia de talento. Lo decimos desde el principio.'],
	],
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
	find: 'Encontre um guia',
	trustTitle: 'Grátis, e transparente sobre isso.',
	trust: [
		['Links de afiliado são sinalizados', 'Bem onde aparecem, nunca escondidos no rodapé.'],
		['Sempre uma opção grátis', 'Toda ferramenta indicada vem com uma alternativa grátis ou sem afiliado.'],
		['Quem está por trás', 'A equipe por trás deste site está criando uma agência de talentos. Dizemos isso logo de cara.'],
	],
	money: 'Como ganhamos dinheiro',
	contribute: 'Contribua no GitHub',
	footer: { label: 'Rodapé', about: 'Sobre', standards: 'Padrões editoriais', corrections: 'Correções', disclaimer: 'Informação educativa, não é aconselhamento jurídico nem financeiro.' },
};

export const home: Record<'en' | 'es' | 'pt-br', HomeCopy> = { en, es, 'pt-br': pt };
