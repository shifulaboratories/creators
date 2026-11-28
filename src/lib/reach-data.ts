/**
 * Who sees a post first, surface by surface, for the six focus platforms.
 * `lean`: 0 = mostly people who follow you, 50 = a mix, 100 = mostly people who don't.
 * Placements are our reading of each platform's own words (quoted in `proof`), not measured shares,
 * except X, whose 2023 code put about half of For You candidates from each side.
 * Checked Nov 28, 2026.
 */
export type Surface = { name: string; lean: number };
export type ReachPlatform = { key: string; name: string; tint: string; surfaces: Surface[]; proof: string; src: 'platform' | 'code'; cite: string; href: string };

export const reach: ReachPlatform[] = [
	{
		key: 'instagram',
		name: 'Instagram',
		tint: 'instagram',
		surfaces: [
			{ name: 'Feed and Stories', lean: 15 },
			{ name: 'Reels', lean: 82 },
			{ name: 'Explore', lean: 90 },
		],
		proof: 'Instagram says Feed and Stories are mostly people you follow, while Reels and Explore are mostly accounts you don’t follow yet.',
		src: 'platform',
		cite: 'Adam Mosseri, Instagram Ranking Explained, May 2023',
		href: 'https://about.instagram.com/blog/announcements/instagram-ranking-explained',
	},
	{
		key: 'tiktok',
		name: 'TikTok',
		tint: 'tiktok',
		surfaces: [
			{ name: 'Following', lean: 8 },
			{ name: 'For You', lean: 85 },
		],
		proof: 'For You is built from each viewer’s own interactions. TikTok says “neither follower count nor whether the account has had previous high-performing videos are direct factors.”',
		src: 'platform',
		cite: 'TikTok Newsroom, How TikTok recommends videos #ForYou, June 2020',
		href: 'https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/',
	},
	{
		key: 'youtube',
		name: 'YouTube',
		tint: 'youtube',
		surfaces: [
			{ name: 'Subscriptions', lean: 8 },
			{ name: 'Home', lean: 65 },
			{ name: 'Up next', lean: 72 },
		],
		proof: 'Home and Up next are personalized from each viewer’s watch history, so they reach people who never subscribed. The Subscriptions feed shows only channels you follow.',
		src: 'platform',
		cite: 'YouTube, Algorithm-based recommendations, How YouTube Works',
		href: 'https://www.youtube.com/howyoutubeworks/recommendations/',
	},
	{
		key: 'facebook',
		name: 'Facebook',
		tint: 'facebook',
		surfaces: [{ name: 'Feed', lean: 45 }],
		proof: 'Feed ranks friends, groups and Pages you follow alongside “unconnected” posts from people and accounts you don’t follow, each covered by its own AI system.',
		src: 'platform',
		cite: 'Nick Clegg, How AI Influences What You See on Facebook and Instagram, Meta, June 2023',
		href: 'https://about.fb.com/news/2023/06/how-ai-ranks-content-on-facebook-and-instagram/',
	},
	{
		key: 'x',
		name: 'X',
		tint: 'x',
		surfaces: [
			{ name: 'Following', lean: 5 },
			{ name: 'For You', lean: 50 },
		],
		proof: 'In the 2023 code, about half of For You candidates came from accounts the viewer follows and half from accounts they don’t. Out-of-network posts get a discount in scoring.',
		src: 'code',
		cite: 'X Engineering, Twitter’s Recommendation Algorithm, 2023, and xai-org/x-algorithm',
		href: 'https://blog.x.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm',
	},
	{
		key: 'linkedin',
		name: 'LinkedIn',
		tint: 'linkedin',
		surfaces: [{ name: 'Feed', lean: 40 }],
		proof: 'LinkedIn says the feed shows posts that match your interests “whether they come from your network or professionals you haven’t met yet,” and that it should be “relevant to your interests, not a popularity contest.”',
		src: 'platform',
		cite: 'LinkedIn, How LinkedIn is improving the feed, Mar 12, 2026',
		href: 'https://news.linkedin.com/2026/ImprovingTheFeed',
	},
];

export const reachText =
	'Who sees a post first (our placement from each platform’s own words; 0 = mostly followers, 100 = mostly people who don’t follow you):\n\n' +
	reach.map((p) => `- **${p.name}:** ${p.surfaces.map((s) => `${s.name} ${s.lean}`).join(', ')}. ${p.proof} Source: [${p.cite}](${p.href})`).join('\n');
