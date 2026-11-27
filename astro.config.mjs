// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { SITE_NAME, SITE_DESCRIPTION, REPO_URL } from './src/site.mjs';

const section = (label, directory) => ({ label, items: [{ autogenerate: { directory } }] });

export default defineConfig({
	site: 'https://creators.select',
	// Start loading a page as soon as a finger touches its link, and the next
	// guide as soon as its link scrolls into view (src/components/Pagination.astro).
	prefetch: { prefetchAll: true, defaultStrategy: 'tap' },
	redirects: {
		'/grow/algorithms': '/algorithms/how-recommenders-work/',
		'/grow/case-studies': '/case-studies/',
		'/goldmines': '/shortlist/',
		'/goldmines/mrbeast-production-handbook': '/shortlist/mrbeast-production-handbook/',
		'/grow/strategy': '/grow/niche/',
	},
	integrations: [
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
			},
			social: [
				{ icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/selectcreators/' },
				{ icon: 'github', label: 'GitHub', href: REPO_URL },
			],
			editLink: { baseUrl: `${REPO_URL}/edit/main/` },
			lastUpdated: true,
			customCss: ['./src/styles/custom.css', './src/styles/docs.css'],
			sidebar: [
				{ label: 'Start here', link: '/' },
				{ label: 'All guides: search and browse', link: '/guides/' },
				section('How algorithms work', 'algorithms'),
				section('Platforms', 'platforms'),
				section('Case studies', 'case-studies'),
				section('The Shortlist', 'shortlist'),
				section('Grow', 'grow'),
				section('Earn', 'earn'),
				section('Deals and contracts', 'deals'),
				section('Money basics', 'money'),
				section('Team', 'team'),
				section('Stack', 'stack'),
				section('Protect', 'protect'),
				section('Underground', 'underground'),
				section('News', 'news'),
				section('About', 'about'),
			],
		}),
	],
});
