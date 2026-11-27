/**
 * Search-result overrides, applied in src/route-data.ts. Use when a page's
 * on-page title or summary is right for readers but weak in Google: a one-word
 * section name, or a summary over 160 characters that gets cut off.
 * Keys are docs ids. Titles under ~60 characters; descriptions 70 to 160.
 * Leave the page's own frontmatter alone so content PRs don't conflict.
 */
export const SEO: Record<string, { title?: string; description?: string }> = {
	// One-word section and platform pages
	grow: {
		title: 'How to grow as a creator: niche, hooks, formats, analytics',
		description: 'How audiences actually grow: a clear niche, strong first seconds, formats that fit each feed, a pace you can keep, and the numbers worth reading.',
	},
	earn: { title: 'How creators make money: every income stream compared' },
	team: { title: 'Building a creator team: managers, agents and first hires' },
	stack: { title: 'Creator tools and gear: the stack at every budget' },
	guides: { title: 'All creator guides: search algorithms, deals, taxes and more' },
	'platforms/tiktok': { title: 'TikTok for creators: how the For You feed works and pays' },
	'platforms/x': { title: 'X (Twitter) for creators: the algorithm and payouts' },
	'platforms/twitch': { title: 'Twitch for creators: discovery, subs and payouts' },
	'paywall/fanvue': { title: 'Fanvue review for creators: fees, payouts and rules' },
	'paywall/fanfix': { title: 'Fanfix review for creators: fees, payouts and rules' },

	// Platform news hubs: match "<platform> algorithm update" searches
	'news/instagram': { title: 'Instagram algorithm updates and creator news' },
	'news/tiktok': { title: 'TikTok algorithm updates and creator news' },
	'news/youtube': { title: 'YouTube algorithm and Partner Program updates' },
	'news/facebook': { title: 'Facebook algorithm updates and creator news' },
	'news/linkedin': { title: 'LinkedIn algorithm updates and creator news' },
	'news/x': { title: 'X (Twitter) algorithm updates and creator news' },

	// Summaries that Google would cut off
	'money/llc-vs-s-corp': {
		description: 'What a sole proprietorship, an LLC and an S corp each change for a creator, and a calculator to see if an S corp would save you anything.',
	},
	'underground/username-trading': {
		description: 'Why short “OG” handles sell for thousands, how they get stolen through SIM swaps and extortion, and what happened when the platforms cracked down.',
	},
	'grow/hooks': {
		description: 'Most viewers decide in the first seconds. Eight hook patterns to try, how to read your retention curve, and why a hook that lies costs you reach.',
	},
	'grow/repurposing': {
		description: 'Turn one idea into Shorts, Reels, TikToks, carousels and X posts without being down-ranked for unoriginal content or watermarks.',
	},
	'grow/formats': {
		description: 'Turn one-off posts into series people come back for, pick the right format for each feed, and check current length and originality rules.',
	},
	'grow/experiments': {
		description: 'Test instead of guessing: YouTube Test & Compare, Instagram Trial Reels, a simple TikTok method, and a planner that turns a hunch into a fair test.',
	},
	'grow/cadence': {
		description: 'What data on millions of posts says about how often to post, why steady beats bursts, and why posting time matters less than you think.',
	},
	'grow/analytics': {
		description: 'The numbers that actually matter on YouTube, Instagram and TikTok, the ones to ignore, and what to check when a post underperforms.',
	},
	platforms: {
		description: 'Seven focus platforms plus five more, side by side: what each rewards, which formats work, and how creators get paid. Sourced from the platforms.',
	},
	'platforms/facebook': {
		description: 'How Facebook picks what to recommend, why original Reels win, how viewers steer their feed, and how Content Monetization and Fast Track pay.',
	},
	'about/disclaimers': {
		description: 'What this site is and isn’t: educational information, not legal, tax or financial advice, and what to know before you act on anything here.',
	},
	'algorithms/why-feeds-exist': {
		description: 'Feeds are built to keep people coming back, because that sells ads. See the loop and it’s clear why sends and watch time beat likes.',
	},
};
