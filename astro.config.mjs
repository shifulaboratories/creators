// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
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

// Old and short addresses. Astro writes a small HTML page for each; the
// _redirects file written after the build (below) makes Cloudflare answer with
// a real 301 first, which search engines and link previews follow.
const REDIRECTS = {
	'/grow/algorithms': '/algorithms/how-recommenders-work/',
	'/grow/case-studies': '/case-studies/',
	'/goldmines': '/shortlist/',
	'/goldmines/mrbeast-production-handbook': '/shortlist/mrbeast-production-handbook/',
	'/grow/strategy': '/grow/niche/',
	'/earn/brand-deals': '/deals/brand-deals/',
	'/earn/pricing': '/deals/pricing/',
	'/news/weekly': '/news/',
	// Stack outlines replaced by the tool directory and the setups on /stack/.
	'/stack/software-by-job': '/stack/directory/',
	'/stack/merch-and-products': '/stack/directory/merch/',
	'/stack/gear-by-budget': '/stack/',
	// Short addresses for the five top-nav items (src/data/nav.ts).
	'/resources': '/guides/',
	'/directories': '/creators/',
	'/companies': '/team/agency-directory/',
	'/contributors': '/about/contributors/',
	'/careers': '/jobs/',
};
// Guide pages also existed under /es/ and /pt-br/; their old addresses move too.
const TRANSLATED_REDIRECTS = ['/grow/algorithms', '/grow/case-studies', '/goldmines', '/goldmines/mrbeast-production-handbook', '/grow/strategy', '/earn/brand-deals', '/earn/pricing', '/news/weekly', '/stack/software-by-job', '/stack/merch-and-products', '/stack/gear-by-budget'];
const writeRedirects = {
	name: 'cloudflare-redirects',
	hooks: {
		'astro:build:done': ({ dir }) => {
			const lines = Object.entries(REDIRECTS).flatMap(([from, to]) => [
				`${from} ${to} 301`,
				`${from}/ ${to} 301`,
				...(TRANSLATED_REDIRECTS.includes(from) ? PREFIXES.flatMap((p) => [`/${p}${from} /${p}${to} 301`, `/${p}${from}/ /${p}${to} 301`]) : []),
			]);
			writeFileSync(new URL('_redirects', dir), lines.join('\n') + '\n');
		},
	},
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
	redirects: REDIRECTS,
	integrations: [
		writeRedirects,
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
					// Card-to-page morph (issue #113): the tapped card's [data-morph] part (a creator's
					// avatar, a tool's logo) glides into the [data-morph-target] on the page it opens,
					// and back again. Names are set only for the one navigation, so a list of 100
					// cards never captures 100 snapshots.
					tag: 'script',
					content: `(function(){var N='sc-morph';function m(p){var l=document.querySelectorAll('a[href] [data-morph]');for(var i=0;i<l.length;i++){var a=l[i].closest('a');if(a&&a.pathname===p)return l[i]}}function n(el,vt){if(!el)return;el.style.viewTransitionName=N;vt.finished.finally(function(){el.style.viewTransitionName=''})}
addEventListener('pagereveal',function(e){try{var d=sessionStorage.getItem('sc-nav');sessionStorage.removeItem('sc-nav');if(!e.viewTransition)return;if(d)e.viewTransition.types.add(d);var f=navigation.activation&&navigation.activation.from;if(!f)return;n(document.querySelector('[data-morph-target]')||m(new URL(f.url).pathname),e.viewTransition)}catch(_){}});
addEventListener('pageswap',function(e){try{if(!e.viewTransition||!e.activation||!e.activation.entry)return;var t=new URL(e.activation.entry.url).pathname;n(m(t)||document.querySelector('[data-morph-target]'),e.viewTransition)}catch(_){}})})()`,
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
			customCss: ['./src/styles/custom.css', './src/styles/docs.css', './src/styles/library.css', './src/styles/feed.css'],
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
