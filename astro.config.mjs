// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SITE_NAME, SITE_DESCRIPTION, REPO_URL } from './src/site.mjs';

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

const section = (label, directory) => ({ label, items: [{ autogenerate: { directory } }] });

export default defineConfig({
	site: 'https://creators.select',
	// Render pages in parallel; the animated previews (src/lib/og-video.ts) dominate build time.
	build: { concurrency: 4 },
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
	},
	integrations: [
		sitemap({ filter: (page) => !noindex.has(new URL(page).pathname) }),
		starlight({
			title: SITE_NAME,
			description: SITE_DESCRIPTION,
			logo: { src: './src/assets/logo-lockup.svg', alt: SITE_NAME, replacesTitle: true },
			favicon: '/favicon.svg',
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
				section('How algorithms work', 'algorithms'),
				section('Platforms', 'platforms'),
				section('Case studies', 'case-studies'),
				section('The Shortlist', 'shortlist'),
				section('Grow', 'grow'),
				section('Earn', 'earn'),
				section('Paywall platforms', 'paywall'),
				section('Brand deals', 'deals'),
				section('Money basics', 'money'),
				section('Team', 'team'),
				section('Stack', 'stack'),
				section('Protect', 'protect'),
				section('Underground', 'underground'),
				section('Platform news', 'news'),
				section('About', 'about'),
			],
		}),
	],
});
