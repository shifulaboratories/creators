// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { SITE_NAME, SITE_DESCRIPTION, REPO_URL } from './src/site.mjs';

const section = (label, directory) => ({ label, items: [{ autogenerate: { directory } }] });

export default defineConfig({
	site: 'https://creators.select',
	redirects: {
		'/grow/algorithms': '/algorithms/how-recommenders-work/',
		'/grow/case-studies': '/case-studies/',
	},
	integrations: [
		starlight({
			title: SITE_NAME,
			description: SITE_DESCRIPTION,
			logo: { src: './src/assets/logo-lockup.svg', alt: SITE_NAME, replacesTitle: true },
			favicon: '/favicon.svg',
			head: [
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#050505' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://creators.select/og.png' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
			],
			components: {
				ThemeSelect: './src/components/ThemeSelect.astro',
				PageTitle: './src/components/PageTitle.astro',
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
				section('How algorithms work', 'algorithms'),
				section('Platforms', 'platforms'),
				section('Case studies', 'case-studies'),
				section('Goldmines', 'goldmines'),
				section('Grow', 'grow'),
				section('Earn', 'earn'),
				section('Deals and contracts', 'deals'),
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
