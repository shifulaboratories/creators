/**
 * Shared bits for link previews and share cards: section names and accent colors
 * (mirrors src/styles/sections.css, which uses the sunset palette in tokens.css).
 */
export const SITE_ORIGIN = 'https://creators.select';

export const SECTION_LABELS: Record<string, string> = {
	grow: 'Grow',
	earn: 'Earn',
	deals: 'Brand deals',
	team: 'Team',
	stack: 'Stack',
	protect: 'Protect',
	underground: 'Underground',
	news: 'News',
	algorithms: 'The algorithm',
	'case-studies': 'Case studies',
	platforms: 'Platforms',
	shortlist: 'The Shortlist',
	money: 'Money basics',
	paywall: 'Paywall',
	tools: 'Free tools',
	rates: 'Creator rates',
	reviews: 'Tool reviews',
	about: 'About',
	guides: 'All guides',
	glossary: 'Glossary',
};

const C = {
	ion: '#c3a6ff',
	jade: '#5fe3b0',
	champagne: '#ffb47e',
	rose: '#ff86b8',
	cyan: '#7cc8ff',
	amethyst: '#a58bff',
	brass: '#c9a25a',
	ember: '#d0705f',
	silver: '#bdbdbc',
};

export const ACCENTS: Record<string, string> = {
	grow: C.jade,
	earn: C.champagne,
	deals: C.amethyst,
	team: C.ion,
	stack: C.cyan,
	protect: C.rose,
	underground: C.ember,
	news: C.rose,
	algorithms: C.ion,
	'case-studies': C.champagne,
	platforms: C.cyan,
	shortlist: C.brass,
	money: C.jade,
	paywall: C.rose,
	tools: C.champagne,
	rates: C.amethyst,
	reviews: C.cyan,
	about: C.champagne,
	guides: C.rose,
	glossary: C.ion,
	youtube: C.ember,
	tiktok: C.cyan,
	instagram: C.rose,
	x: C.silver,
	facebook: '#7ea6ff',
	linkedin: '#6fb6e8',
};

/** Accent for a docs entry id like "platforms/youtube" or "grow". */
export function accentFor(id: string, tint?: string): string {
	if (tint && ACCENTS[tint]) return ACCENTS[tint];
	const [section, page] = id.split('/');
	if ((section === 'platforms' || section === 'news') && page && ACCENTS[page]) return ACCENTS[page];
	return ACCENTS[section] ?? C.rose;
}

/** Path of the build-time preview image for a docs entry id ("" for the home page). */
export const ogPath = (id: string) => `/og/${id || 'home'}.png`;
