// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SITE_NAME, SITE_DESCRIPTION, REPO_URL } from './src/site.mjs';
import { STARLIGHT_LOCALES, PREFIXES, translatedIds } from './src/i18n/locales.mjs';
import { ui } from './src/i18n/ui-sidebar.mjs';

// Pages we tell search engines not to index (src/route-data.ts) stay out of the
// sitemap too: unwritten outlines (status: outline, the default) and 404.
const DOCS = 'src/content/docs';
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const noindex = new Set(
	walk(DOCS)
		.filter((f) => /\.mdx?$/.test(f))
		.filter((f) => {
			const fm = readFileSync(f, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
			const status = fm.match(/^status:\s*["']?(\w+)/m)?.[1] ?? 'outline';
			return status === 'outline';
		})
		.map((f) => '/' + relative(DOCS, f).replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '') + '/')
		.map((p) => p.replace(/\/+/g, '/'))
		.filter((p) => p !== '/guides/'),
);
noindex.add('/404/');
// Rate Check stays unlisted until it has enough rates to show (see worker/index.ts).
noindex.add('/rate-check/');

// Sidebar groups, labeled in every language (src/i18n/ui-sidebar.mjs).
const section = (key, directory = key) => ({
	label: ui.en[key],
	translations: Object.fromEntries(PREFIXES.map((p) => [STARLIGHT_LOCALES[p].lang, ui[p][key]])),
	items: [{ autogenerate: { directory } }],
});

// Untranslated pages still exist under /es/ and /pt-br/ (English text with a
// notice), but only real translations go in the sitemap and hreflang links.
const translated = translatedIds();
const CUSTOM_PAGES = new Set(['', 'guides']); // src/pages/ routes that are translated in code
const inSitemap = (url) => {
	const path = new URL(url).pathname.replace(/^\/|\/$/g, '');
	const prefix = PREFIXES.find((p) => path === p || path.startsWith(p + '/'));
	if (!prefix) return true;
	const base = path.slice(prefix.length + 1);
	return CUSTOM_PAGES.has(base) || translated[prefix].has(base);
};

export default defineConfig({
	site: 'https://creators.select',
	// Render pages in parallel; the animated previews (src/lib/og-video.ts) dominate build time.
	build: { concurrency: 4 },
	vite: {
		build: {
			// Small stylesheets go inline in the page instead of costing a separate
			// render-blocking request on a phone connection. The big shared
			// Starlight sheet stays a cached file. Other assets keep Vite's default.
			assetsInlineLimit: (file, content) => (file.endsWith('.css') ? content.length < 20_000 : undefined),
		},
	},
	// Start loading a page as soon as a finger touches its link, and the next
	// guide as soon as its link scrolls into view (src/components/Pagination.astro).
	prefetch: { prefetchAll: true, defaultStrategy: 'tap' },
	redirects: {
		'/grow/algorithms': '/algorithms/how-recommenders-work/',
		'/grow/case-studies': '/case-studies/',
		'/goldmines': '/shortlist/',
		'/goldmines/mrbeast-production-handbook': '/shortlist/mrbeast-production-handbook/',
		'/grow/strategy': '/grow/niche/',
		'/earn/brand-deals': '/deals/brand-deals/',
		'/earn/pricing': '/deals/pricing/',
		'/news/weekly': '/news/',
		// Short addresses for the five top-nav items (src/data/nav.ts).
		'/resources': '/guides/',
		'/directories': '/creators/',
		'/companies': '/team/agency-directory/',
		'/contributors': '/about/contributors/',
		'/careers': '/jobs/',
	},
	integrations: [
		sitemap({
			filter: (url) => inSitemap(url) && !noindex.has(new URL(url).pathname.replace(/^\/(es|pt-br)\//, '/')),
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', ...Object.fromEntries(PREFIXES.map((p) => [p, STARLIGHT_LOCALES[p].lang])) },
			},
		}),
		starlight({
			title: SITE_NAME,
			description: SITE_DESCRIPTION,
			logo: { src: './src/assets/logo-lockup.svg', alt: SITE_NAME, replacesTitle: true },
			favicon: '/favicon.svg',
			// English at the root, Spanish at /es/, Brazilian Portuguese at /pt-br/ (docs/translating.md).
			defaultLocale: 'root',
			locales: STARLIGHT_LOCALES,
			// Per-page link previews and structured data (src/route-data.ts).
			routeMiddleware: './src/route-data.ts',
			head: [
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#050505' } },
				{
					// Page transitions slide in the direction you swiped or tapped (src/styles/docs.css).
					tag: 'script',
					content: `addEventListener('pagereveal',function(e){try{var d=sessionStorage.getItem('sc-nav');sessionStorage.removeItem('sc-nav');if(d&&e.viewTransition)e.viewTransition.types.add(d)}catch(_){}})`,
				},
			],
			components: {
				ThemeSelect: './src/components/ThemeSelect.astro',
				PageTitle: './src/components/PageTitle.astro',
				SkipLink: './src/components/SkipLink.astro',
				Pagination: './src/components/Pagination.astro',
				Header: './src/components/Header.astro',
				MobileMenuToggle: './src/components/MobileMenuToggle.astro',
			},
			social: [
				{ icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/selectcreators/' },
				{ icon: 'github', label: 'GitHub', href: REPO_URL },
			],
			editLink: { baseUrl: `${REPO_URL}/edit/main/` },
			lastUpdated: true,
			customCss: ['./src/styles/custom.css', './src/styles/docs.css', './src/styles/library.css'],
			sidebar: [
				{ label: ui.en.start, translations: { es: ui.es.start, 'pt-BR': ui['pt-br'].start }, link: '/' },
				{ label: ui.en.all, translations: { es: ui.es.all, 'pt-BR': ui['pt-br'].all }, link: '/guides/' },
				section('algorithms'),
				section('platforms'),
				section('case-studies'),
				section('shortlist'),
				section('grow'),
				section('earn'),
				section('paywall'),
				section('deals'),
				section('money'),
				section('tools'),
				section('rates'),
				section('reviews'),
				section('team'),
				section('stack'),
				section('protect'),
				section('underground'),
				section('news'),
				section('jobs'),
				section('about'),
			],
		}),
	],
});
