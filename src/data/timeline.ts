/**
 * Platform changelog: one dated line per change that mattered to creators.
 *
 * This is the long memory behind /news/timeline/. Full News updates
 * (src/data/news/*.md) are merged in automatically, so don't repeat them here.
 * Rules (also in docs/news.md):
 * - `date` is the day the platform announced it (YYYY-MM-DD). Use YYYY-MM only
 *   when no source gives the day.
 * - At least one source. `official: true` only for the platform's own blog,
 *   newsroom, help center, code or an exec's post. Entries without an official
 *   source show as "Reported".
 * - `what` is one or two plain sentences: what changed, no predictions.
 * - `id` becomes the anchor (/news/timeline/#id). Never rename it.
 * The build fails if an entry breaks these rules (see src/lib/timeline.ts).
 */
export type TimelinePlatform = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'linkedin' | 'x';
export type TimelineKind = 'algorithm' | 'monetization' | 'policy' | 'tools' | 'business';

export interface TimelineSource {
	publisher: string;
	url: string;
	official?: boolean;
}

export interface TimelineEntry {
	id: string;
	date: string;
	platform: TimelinePlatform;
	kind: TimelineKind;
	title: string;
	what: string;
	/** Changes how a platform ranks or pays most creators. */
	big?: boolean;
	/** When it took effect, in words, if not the announcement day. */
	effective?: string;
	sources: TimelineSource[];
	/** Our guide that covers it, if one goes deeper. */
	guide?: string;
}

export const TIMELINE: TimelineEntry[] = [
	// ── YouTube ──────────────────────────────────────────────
	{
		id: 'youtube-shorts-revenue-sharing',
		date: '2023-01-09',
		platform: 'youtube',
		kind: 'monetization',
		title: 'Shorts start earning a share of ad revenue',
		what: 'YouTube pools ads shown between Shorts and pays Partner Program creators 45% of their allocated share, based on their share of Shorts views. Music licensing costs come out first.',
		effective: 'Feb 1, 2023',
		big: true,
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2023/01/09/youtube-new-partner-program-terms-shorts-revenue-sharing-february-1/' },
			{ publisher: '9to5Google', url: 'https://9to5google.com/2023/01/09/youtube-shorts-revenue-date/' },
		],
		guide: '/platforms/youtube/',
	},
	{
		id: 'youtube-ypp-500-subscribers',
		date: '2023-06-13',
		platform: 'youtube',
		kind: 'monetization',
		title: 'Partner Program opens at 500 subscribers',
		what: 'A lower tier unlocks fan funding (memberships, Super Chat, Super Thanks) and Shopping at 500 subscribers plus watch hours or Shorts views. Ad revenue still starts at the 1,000-subscriber tier.',
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2023/06/13/youtube-is-lowering-the-barrier-to-be-eligible-for-its-monetization-program/' },
			{ publisher: 'Tubefilter', url: 'https://www.tubefilter.com/2023/06/13/youtube-partner-program-new-standards-live-shopping-super-chat/' },
		],
	},
	{
		id: 'youtube-test-and-compare',
		date: '2024-06-12',
		platform: 'youtube',
		kind: 'tools',
		title: 'Thumbnail A/B testing rolls out',
		what: 'Test & Compare lets creators upload up to three thumbnails for one video. YouTube picks the winner by share of watch time, not clicks.',
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2024/06/12/youtube-creators-can-test-multiple-video-thumbnails/' },
			{ publisher: '9to5Google', url: 'https://9to5google.com/2024/06/12/youtube-video-thumbnail-testing-tool' },
		],
	},
	{
		id: 'youtube-hype',
		date: '2024-09-18',
		platform: 'youtube',
		kind: 'algorithm',
		title: 'Hype lets fans push smaller channels up a leaderboard',
		what: 'Viewers can "hype" videos from channels under 500,000 subscribers, ranking them on a weekly leaderboard. It started in a few countries and went global in August 2025.',
		sources: [
			{ publisher: 'YouTube Official Blog', url: 'https://blog.youtube/news-and-events/youtube-hype/', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2024/09/18/youtube-unveils-hype-a-new-way-for-fans-to-help-smaller-creators-grow-their-reach' },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/08/26/youtubes-hype-feature-that-boosts-smaller-creators-launches-globally' },
		],
	},
	{
		id: 'youtube-shorts-three-minutes',
		date: '2024-10-03',
		platform: 'youtube',
		kind: 'tools',
		title: 'Shorts can run up to three minutes',
		what: 'Square or vertical uploads up to three minutes count as Shorts. Longer Shorts with an active Content ID claim get blocked, so licensed clips are riskier past one minute.',
		effective: 'Oct 15, 2024',
		sources: [
			{ publisher: 'YouTube Official Blog', url: 'https://blog.youtube/news-and-events/tall-updates-coming-to-shorts/', official: true },
			{ publisher: 'YouTube Help', url: 'https://support.google.com/youtube/answer/15424877?hl=en', official: true },
			{ publisher: 'Tubefilter', url: 'https://www.tubefilter.com/2024/10/03/youtube-shorts-three-minutes-max-length-redesign-trends-templates/' },
		],
	},
	{
		id: 'youtube-shorts-view-count',
		date: '2025-03-26',
		platform: 'youtube',
		kind: 'algorithm',
		title: 'Shorts views count every start and replay',
		what: 'A Shorts view now counts each time it starts or replays, like TikTok and Instagram. The old number lives on as "engaged views" and is still what payouts and Partner Program eligibility use.',
		effective: 'Mar 31, 2025',
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/03/26/youtube-is-changing-how-youtube-shorts-views-are-counted' },
			{ publisher: 'Tubefilter', url: 'https://www.tubefilter.com/2025/03/26/youtube-shorts-views-counting-stats/' },
		],
	},
	{
		id: 'youtube-inauthentic-content',
		date: '2025-07-15',
		platform: 'youtube',
		kind: 'policy',
		title: '"Repetitious content" becomes "inauthentic content"',
		what: 'The Partner Program policy was renamed and clarified to cover mass-produced and repetitive videos. YouTube said reaction and commentary channels that add something are not the target.',
		sources: [
			{ publisher: 'YouTube Help', url: 'https://support.google.com/youtube/answer/1311392?hl=en', official: true },
			{ publisher: 'Social Media Today', url: 'https://www.socialmediatoday.com/news/youtube-clarifies-monetization-update-inauthentic-repeated-content/752892/' },
		],
	},
	{
		id: 'youtube-second-chances',
		date: '2025-10-09',
		platform: 'youtube',
		kind: 'policy',
		title: 'Banned creators can ask for a new channel',
		what: 'A pilot lets some creators whose channels were terminated request a fresh channel after a waiting period. Terminations for copyright and some severe violations are excluded.',
		sources: [
			{ publisher: 'YouTube Official Blog', url: 'https://blog.youtube/inside-youtube/second-chances-on-youtube/', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/10/09/youtubers-who-were-kicked-off-the-platform-for-rule-violations-can-now-request-a-second-chance/' },
		],
	},
	{
		id: 'youtube-likeness-detection',
		date: '2025-10-21',
		platform: 'youtube',
		kind: 'tools',
		title: 'Likeness detection finds AI videos of your face',
		what: 'Partner Program creators can verify their face, see videos where AI appears to copy it and request removal. It rolled out in waves.',
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/10/21/youtubes-likeness-detection-technology-has-officially-launched/' },
			{ publisher: 'MacRumors', url: 'https://www.macrumors.com/2025/10/21/youtube-ai-likeness-detection-tool/' },
		],
	},

	// ── Instagram ────────────────────────────────────────────
	{
		id: 'instagram-ranking-explained',
		date: '2023-05',
		platform: 'instagram',
		kind: 'algorithm',
		title: 'Instagram publishes how each feed ranks',
		what: 'Adam Mosseri explained that Feed, Stories, Explore and Reels each use their own ranking, and which signals matter most in each, like watch time, likes and shares.',
		sources: [
			{ publisher: 'Instagram', url: 'https://about.instagram.com/blog/announcements/instagram-ranking-explained', official: true },
			{ publisher: 'Social Media Today', url: 'https://www.socialmediatoday.com/news/instagram-shares-new-explainer-on-how-its-feed-reels-and-stories-algorithm/651705/' },
		],
		guide: '/platforms/instagram/',
	},
	{
		id: 'instagram-originality-2024',
		date: '2024-04-30',
		platform: 'instagram',
		kind: 'algorithm',
		title: 'Recommendations favor originals over reposts',
		what: 'When Instagram finds a repost, it recommends the original instead. Accounts that mostly repost others can be dropped from recommendations, and smaller creators get more chances to be shown to new people.',
		big: true,
		sources: [
			{ publisher: 'Instagram for Creators', url: 'https://creators.instagram.com/recommendations-and-originality', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2024/04/30/instagram-is-updating-its-ranking-systems-to-surface-more-content-from-smaller-original-creators' },
		],
	},
	{
		id: 'instagram-recommendations-reset',
		date: '2024-11-19',
		platform: 'instagram',
		kind: 'algorithm',
		title: 'Anyone can reset their recommendations',
		what: 'People can wipe what Instagram has learned about them across Explore, Reels and Feed and start fresh, so a viewer\'s interest in you can reset too.',
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2024/11/introducing-recommendations-reset-instagram/', official: true },
			{ publisher: 'NBC News', url: 'https://www.nbcnews.com/tech/tech-news/instagram-will-let-users-reset-recommendation-system-powers-feeds-rcna180764' },
		],
	},
	{
		id: 'instagram-trial-reels',
		date: '2024-12-10',
		platform: 'instagram',
		kind: 'tools',
		title: 'Trial reels test with non-followers first',
		what: 'Creators can post a reel that is shown only to people who don\'t follow them, check how it does, then share it to followers or not.',
		sources: [
			{ publisher: 'Instagram for Creators', url: 'https://creators.instagram.com/blog/instagram-trial-reels', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2024/12/10/instagram-rolls-out-trial-reels-that-arent-shown-to-a-creators-followers' },
		],
	},
	{
		id: 'instagram-three-minute-reels',
		date: '2025-01',
		platform: 'instagram',
		kind: 'tools',
		title: 'Reels go to three minutes and the grid turns tall',
		what: 'Reels can run up to three minutes, up from 90 seconds, and profile grids switched from squares to taller rectangles, which changes how covers crop.',
		sources: [
			{ publisher: 'Engadget', url: 'https://www.engadget.com/social-media/instagram-swoops-in-with-3-minute-reels-and-rectangular-profile-grids-as-the-tiktok-ban-gets-real-201316339.html' },
			{ publisher: 'Business Today', url: 'https://www.businesstoday.in/technology/news/story/instagram-head-announces-big-changes-3-minute-reels-and-new-look-for-profile-grid-461527-2025-01-21' },
		],
	},
	{
		id: 'instagram-edits',
		date: '2025-04-22',
		platform: 'instagram',
		kind: 'tools',
		title: 'Edits, Instagram\'s free video editor, launches',
		what: 'A standalone editing app from Instagram for iPhone and Android, with exports that carry no watermark.',
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2025/04/introducing-edits/', official: true },
			{ publisher: '9to5Mac', url: 'https://9to5mac.com/2025/04/22/instagram-edits-launch-app-store/' },
		],
	},
	{
		id: 'instagram-reposts-map',
		date: '2025-08-06',
		platform: 'instagram',
		kind: 'tools',
		title: 'Reposts, a friends map and a Friends tab in Reels',
		what: 'People can repost public reels and posts to their followers, and a Friends tab shows reels your friends liked or made. Reposts give your work a new way to spread.',
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2025/08/new-instagram-features-help-you-connect/', official: true },
			{ publisher: 'MacRumors', url: 'https://www.macrumors.com/2025/08/06/instagram-gets-reposts-and-location-map/' },
		],
	},
	{
		id: 'instagram-teen-pg13',
		date: '2025-10-14',
		platform: 'instagram',
		kind: 'policy',
		title: 'Teen accounts default to PG-13 content',
		what: 'Teen accounts are limited to content roughly like a PG-13 movie by default. Posts with strong language, risky stunts or mature themes are kept out of teens\' recommendations.',
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2025/10/instagram-teen-accounts-pg-13-ratings/', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/10/14/instagram-defaults-to-pg-13-content-for-teens-adds-more-parental-controls' },
		],
	},
	{
		id: 'instagram-your-algorithm-reels',
		date: '2025-12-10',
		platform: 'instagram',
		kind: 'algorithm',
		title: '"Your Algorithm" shows people their Reels topics',
		what: 'Viewers can see the topics Instagram thinks they like in Reels and add or remove them. Clear topics help the right viewers keep finding you.',
		sources: [
			{ publisher: 'Instagram', url: 'https://about.instagram.com/blog/announcements/reels-algorithm-control', official: true },
			{ publisher: 'Dataconomy', url: 'https://dataconomy.com/2025/12/11/instagram-launches-your-algorithm-for-reels/' },
		],
	},
	{
		id: 'instagram-originality-2026',
		date: '2026-04-30',
		platform: 'instagram',
		kind: 'algorithm',
		title: 'Originality rules expand to photos and carousels',
		what: 'Unoriginal photo and carousel posts now lose recommendations too, and accounts that mainly aggregate others\' work can stop being recommended at all.',
		big: true,
		sources: [
			{ publisher: 'Instagram for Creators', url: 'https://creators.instagram.com/blog/rewarding-original-creators-on-instagram', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2026/04/30/instagram-restricts-reach-of-content-aggregators-in-new-crackdown/' },
		],
	},
	{
		id: 'instagram-your-algorithm-feed',
		date: '2026-06',
		platform: 'instagram',
		kind: 'algorithm',
		title: '"Your Algorithm" controls reach the main feed',
		what: 'The topic controls that started in Reels now shape the main feed as well.',
		sources: [
			{ publisher: 'Social Media Today', url: 'https://www.socialmediatoday.com/news/instagram-extends-your-algorithm-tool-to-the-main-feed/822576/' },
			{ publisher: 'The Next Web', url: 'https://thenextweb.com/news/instagram-your-algorithm-central-experience-mosseri' },
		],
	},

	// ── TikTok ───────────────────────────────────────────────
	{
		id: 'tiktok-shop-us',
		date: '2023-09-12',
		platform: 'tiktok',
		kind: 'monetization',
		title: 'TikTok Shop launches in the US',
		what: 'Shopping inside videos, LIVE and a Shop tab, with affiliate commissions for creators who sell products.',
		sources: [
			{ publisher: 'TikTok Newsroom', url: 'https://newsroom.tiktok.com/introducing-tiktok-shop', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2023/09/12/tiktok-shop-officially-launches-in-the-u-s' },
		],
	},
	{
		id: 'tiktok-creator-fund-ends',
		date: '2023-11-07',
		platform: 'tiktok',
		kind: 'monetization',
		title: 'The Creator Fund shuts down',
		what: 'TikTok closed its Creator Fund in the US, UK, Germany, France, Italy and Spain and moved creators to the Creativity Program, which pays only for videos over one minute.',
		effective: 'Dec 16, 2023',
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2023/11/07/tiktok-is-shutting-down-its-creator-fund-in-favor-of-its-newer-creativity-program/' },
			{ publisher: 'NBC News', url: 'https://www.nbcnews.com/tech/tiktok-ending-2-billion-creator-fund-rcna123921' },
		],
	},
	{
		id: 'tiktok-creator-rewards',
		date: '2024-03',
		platform: 'tiktok',
		kind: 'monetization',
		title: 'Creator Rewards Program replaces the Creativity Program',
		what: 'Pay for videos over one minute now weighs originality, play duration, search value and audience engagement, not just views.',
		big: true,
		sources: [
			{ publisher: 'TikTok Newsroom', url: 'https://newsroom.tiktok.com/introducing-the-new-creator-rewards-program', official: true },
			{ publisher: 'Social Media Today', url: 'https://www.socialmediatoday.com/news/tiktok-announces-revamped-creator-rewards-program-to-incentivize-longer-u/710639/' },
		],
		guide: '/platforms/tiktok/',
	},
	{
		id: 'tiktok-divest-or-ban-law',
		date: '2024-04-24',
		platform: 'tiktok',
		kind: 'business',
		title: 'US law says sell TikTok or face a ban',
		what: 'President Biden signed a law requiring ByteDance to sell TikTok\'s US business or have it removed from US app stores and hosting.',
		big: true,
		sources: [
			{ publisher: 'NPR', url: 'https://npr.org/2024/04/24/1246663779/biden-ban-tiktok-us' },
			{ publisher: 'Axios', url: 'https://www.axios.com/2024/04/24/joe-biden-tik-tok-ban-bill' },
		],
	},
	{
		id: 'tiktok-goes-dark',
		date: '2025-01-19',
		platform: 'tiktok',
		kind: 'business',
		title: 'TikTok goes dark in the US, then comes back',
		what: 'The app stopped working for US users as the ban took effect and was restored within a day after President Trump said he would delay enforcement.',
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/01/19/tiktok-goes-dark-in-the-u-s' },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/01/19/tiktok-says-is-restoring-service-in-the-us' },
		],
	},
	{
		id: 'tiktok-footnotes',
		date: '2025-07-30',
		platform: 'tiktok',
		kind: 'policy',
		title: 'Footnotes add community context to videos in the US',
		what: 'Approved contributors can attach notes with more context to videos, rated by other users, alongside TikTok\'s existing fact-checking.',
		sources: [
			{ publisher: 'TikTok Newsroom', url: 'https://newsroom.tiktok.com/rolling-out-tiktok-footnotes-in-the-us', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/07/30/tiktoks-crowdsourced-fact-checks-called-footnotes-launch-in-the-u-s' },
		],
	},
	{
		id: 'tiktok-subscription-90',
		date: '2025-10-28',
		platform: 'tiktok',
		kind: 'monetization',
		title: 'Some creators keep up to 90% of Subscription revenue',
		what: 'At its US Creator Summit TikTok raised the Subscription share some eligible creators keep to as much as 90%.',
		sources: [
			{ publisher: 'TikTok Newsroom', url: 'https://newsroom.tiktok.com/new-ai-powered-tools-to-make-it-easier-to-create-and-share-on-tiktok', official: true },
			{ publisher: 'Tubefilter', url: 'https://www.tubefilter.com/2025/10/29/tiktok-us-creator-summit-announcements-subscription-revenue-ai/' },
		],
	},

	// ── Facebook ─────────────────────────────────────────────
	{
		id: 'facebook-content-monetization',
		date: '2024-10-02',
		platform: 'facebook',
		kind: 'monetization',
		title: 'One Content Monetization program replaces three',
		what: 'In-stream ads, ads on Reels and the Performance bonus merged into a single program that pays for Reels, longer videos, photos and text posts, starting as an invite-only beta.',
		big: true,
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2024/10/monetize-content-facebooks-new-streamlined-program/', official: true },
		],
		guide: '/platforms/facebook/',
	},
	{
		id: 'meta-ends-fact-checking',
		date: '2025-01-07',
		platform: 'facebook',
		kind: 'policy',
		title: 'Meta drops US fact-checkers for Community Notes',
		what: 'Meta ended third-party fact-checking in the US on Facebook, Instagram and Threads, moved to Community Notes, loosened some speech rules and said it would show more political content to people who want it.',
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2025/01/meta-more-speech-fewer-mistakes/', official: true },
			{ publisher: 'NPR', url: 'https://www.npr.org/2025/01/07/nx-s1-5251151/meta-fact-checking-mark-zuckerberg-trump' },
		],
	},
	{
		id: 'facebook-spammy-content',
		date: '2025-04-24',
		platform: 'facebook',
		kind: 'policy',
		title: 'Spammy posts lose reach and monetization',
		what: 'Long captions unrelated to the post, coordinated fake engagement and impersonation now cost accounts reach and the ability to earn.',
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2025/04/cracking-down-spammy-content-facebook/', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/04/24/facebook-cracks-down-on-spammy-content-by-cutting-reach-and-monetization' },
		],
	},
	{
		id: 'facebook-videos-become-reels',
		date: '2025-06-17',
		platform: 'facebook',
		kind: 'tools',
		title: 'Every Facebook video becomes a Reel',
		what: 'New video uploads of any length are shared as Reels, with one simpler upload flow, and the Video tab became the Reels tab.',
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2025/06/making-it-easier-create-videos-facebook/', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/06/17/facebook-announces-that-all-videos-on-its-platform-will-soon-be-shared-as-reels' },
		],
	},
	{
		id: 'facebook-unoriginal-content',
		date: '2025-07-14',
		platform: 'facebook',
		kind: 'algorithm',
		title: 'Reposters of others\' work lose reach and pay',
		what: 'Accounts that repeatedly reuse other people\'s videos, photos or text lose monetization for a time and get less distribution. Duplicate videos are shown less so the original gets the views.',
		big: true,
		sources: [
			{ publisher: 'Facebook for Creators', url: 'https://creators.facebook.com/blog/combating-unoriginal-content', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2025/07/14/following-youtube-meta-announces-crackdown-on-unoriginal-facebook-content' },
		],
	},
	{
		id: 'facebook-creator-fast-track',
		date: '2026-03-18',
		platform: 'facebook',
		kind: 'monetization',
		title: 'Creator Fast Track pays creators who bring an audience',
		what: 'Creators with established followings on other platforms can get guaranteed monthly payments, up to $3,000, for posting Reels on Facebook.',
		sources: [
			{ publisher: 'Meta Newsroom', url: 'https://about.fb.com/news/2026/03/creator-fast-track-grow-your-audience-earn-money-on-facebook/', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2026/03/18/facebook-launches-a-new-monetization-program-to-attract-popular-creators-from-tiktok-youtube/' },
		],
	},

	// ── LinkedIn ─────────────────────────────────────────────
	{
		id: 'linkedin-creator-mode-retired',
		date: '2024-02',
		platform: 'linkedin',
		kind: 'tools',
		title: 'Creator mode retires, its tools go to everyone',
		what: 'LinkedIn removed the creator mode switch. Tools that needed it, like newsletters and LinkedIn Live, are open to all members.',
		sources: [
			{ publisher: 'Social Media Today', url: 'https://www.socialmediatoday.com/news/linkedins-removing-creator-mode-option/706585/' },
		],
	},
	{
		id: 'linkedin-video-feed',
		date: '2024-03-28',
		platform: 'linkedin',
		kind: 'tools',
		title: 'LinkedIn tests a vertical video feed',
		what: 'A swipeable, TikTok-style feed of short videos started testing, the first step in LinkedIn\'s push into video.',
		sources: [
			{ publisher: 'Tubefilter', url: 'https://www.tubefilter.com/2024/03/28/linkedin-tiktok-style-feed-for-you-page-vertical-videos/' },
			{ publisher: 'Social Media Today', url: 'https://www.socialmediatoday.com/news/linkedin-tests-new-dedicated-video-feed/711566/' },
		],
	},
	{
		id: 'linkedin-brandlink',
		date: '2025-05-01',
		platform: 'linkedin',
		kind: 'monetization',
		title: 'BrandLink shares ad revenue with video creators',
		what: 'Brands can run ads before videos from selected creators and publishers, and LinkedIn shares that ad revenue with them.',
		sources: [
			{ publisher: 'Bloomberg', url: 'https://www.bloomberg.com/news/articles/2025-05-01/linkedin-shares-advertising-revenue-with-creators-in-video-push' },
			{ publisher: 'Tubefilter', url: 'https://www.tubefilter.com/2025/05/01/linkedin-brand-link-creator-economy-revenue-sharing-program/' },
		],
	},
	{
		id: 'linkedin-ai-training-data',
		date: '2025-09-18',
		platform: 'linkedin',
		kind: 'policy',
		title: 'LinkedIn trains AI on member data by default in more regions',
		what: 'Profile data and public posts from members in the EU, UK and other regions are used to train LinkedIn\'s AI unless they opt out in settings.',
		effective: 'Nov 3, 2025',
		sources: [
			{ publisher: 'Help Net Security', url: 'https://www.helpnetsecurity.com/2025/09/18/linkedin-ai-data-privacy-policy/' },
			{ publisher: 'Social Media Today', url: 'https://www.socialmediatoday.com/news/linkedin-updates-terms-of-service-ai-ad-targeting-microsoft/760557/' },
		],
	},
	{
		id: 'linkedin-llm-feed',
		date: '2026-03',
		platform: 'linkedin',
		kind: 'algorithm',
		title: 'The feed is rebuilt around AI models',
		what: 'LinkedIn replaced several older systems that pick feed posts with large language models that read what a post is about, aiming to show relevant posts from beyond your network.',
		big: true,
		sources: [
			{ publisher: 'LinkedIn', url: 'https://news.linkedin.com/2026/ImprovingTheFeed', official: true },
			{ publisher: 'Search Engine Land', url: 'https://searchengineland.com/linkedin-updates-feed-algorithm-llm-ranking-retrieval-471708' },
		],
		guide: '/platforms/linkedin/',
	},

	// ── X ────────────────────────────────────────────────────
	{
		id: 'x-open-source-2023',
		date: '2023-03-31',
		platform: 'x',
		kind: 'algorithm',
		title: 'Twitter publishes its recommendation code',
		what: 'Twitter put much of the code behind the For You timeline on GitHub, the first time a major platform opened up its ranking this way.',
		sources: [
			{ publisher: 'Twitter on GitHub', url: 'https://github.com/twitter/the-algorithm', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2023/03/31/twitter-reveals-some-of-its-source-code-including-its-recommendation-algorithm/' },
		],
	},
	{
		id: 'x-ads-revenue-sharing',
		date: '2023-07-13',
		platform: 'x',
		kind: 'monetization',
		title: 'Ad revenue sharing starts for verified creators',
		what: 'Twitter began paying subscribers a share of ads shown in replies to their posts, if they met follower and impression thresholds.',
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2023/07/13/twitter-starts-sharing-ad-revenue-with-verified-creators/' },
			{ publisher: 'Engadget', url: 'https://www.engadget.com/twitter-finally-begins-paying-some-of-its-creators-204830947.html' },
		],
	},
	{
		id: 'x-private-likes',
		date: '2024-06-12',
		platform: 'x',
		kind: 'tools',
		title: 'Likes become private',
		what: 'Other people can no longer see which posts you liked. You still see who liked your own posts.',
		sources: [
			{ publisher: 'TIME', url: 'https://time.com/6988049/x-makes-likes-private/' },
			{ publisher: 'Engadget', url: 'https://www.engadget.com/x-is-officially-making-likes-mostly-private-for-everyone-035837613.html' },
		],
	},
	{
		id: 'x-engagement-payouts',
		date: '2024-10-09',
		platform: 'x',
		kind: 'monetization',
		title: 'Creator pay follows Premium engagement, not ads',
		what: 'X stopped basing payouts on ads in replies and started paying by engagement from Premium subscribers with your posts.',
		big: true,
		sources: [
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2024/10/09/x-changes-creator-payouts-to-depend-on-engagement-not-ads/' },
			{ publisher: 'Social Media Today', url: 'https://www.socialmediatoday.com/news/x-removes-ad-revenue-share-from-creator-payments-program/729408/' },
		],
	},
	{
		id: 'x-grok-algorithm-open-source',
		date: '2026-01-20',
		platform: 'x',
		kind: 'algorithm',
		title: 'X open-sources its Grok-based For You ranking',
		what: 'X published the new recommendation system behind For You, built on a Grok-based model, under an open license on GitHub.',
		big: true,
		sources: [
			{ publisher: 'xAI on GitHub', url: 'https://github.com/xai-org/x-algorithm', official: true },
			{ publisher: 'TechCrunch', url: 'https://techcrunch.com/2026/01/20/x-open-sources-its-algorithm-while-facing-a-transparency-fine-and-grok-controversies/' },
		],
		guide: '/platforms/x/',
	},
];
