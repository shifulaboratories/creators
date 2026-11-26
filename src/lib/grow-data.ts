/**
 * Data behind the Grow widgets (src/components/grow/). Every platform fact carries
 * its source so the page, the Markdown copy and llms.txt say the same thing.
 * Example hooks and niches are written by us to illustrate a pattern; they are not quotes.
 */

export const CHECKED = '2026-11-26';

/* ---------------- Hooks ---------------- */

export interface HookCard {
	name: string;
	big: string;
	line: string;
	niche: string;
	why: string;
	watch: string;
	tint: string;
}

export const hooks: HookCard[] = [
	{
		name: 'Show the after',
		big: 'After → how',
		line: '“This is a $9 drugstore foundation. Here’s how I make it look like $60.”',
		niche: 'Beauty',
		why: 'The payoff is on screen before anyone decides to swipe. The rest of the video is the “how,” which is the part people stay for.',
		watch: 'The after has to be real. If the result in second one isn’t what they get by the end, they leave and the feed learns from it.',
		tint: 'rose',
	},
	{
		name: 'Name their problem',
		big: '“Why does…”',
		line: '“Why does your sourdough come out dense? It’s almost always one step.”',
		niche: 'Food',
		why: 'A specific question picks the right viewer out of the scroll. People who have that problem feel spoken to; everyone else swipes, which is fine.',
		watch: 'Answer it. A question you never resolve is a broken promise, and the retention curve shows it.',
		tint: 'champagne',
	},
	{
		name: 'Flip a belief',
		big: 'Stop ___',
		line: '“Stop rinsing raw chicken. The USDA found it spreads bacteria around your sink.”',
		niche: 'Food safety',
		why: 'Contradicting something people do every day creates an itch to hear why. Pair it with a real source and you also earn trust.',
		watch: 'Only flip beliefs you can back up. Contrarian for its own sake is how creators end up in the myth-busting videos of others.',
		tint: 'jade',
	},
	{
		name: 'Set the stakes',
		big: '$100 / 7 days',
		line: '“I have $100 to feed a family of four for a week. Day one.”',
		niche: 'Budget living',
		why: 'A clear goal with a limit makes people want to see if you make it. It also turns one video into a series viewers come back for.',
		watch: 'Keep the stakes honest and the rules visible. Moving the goalposts mid-series feels like a trick.',
		tint: 'cyan',
	},
	{
		name: 'Drop into the story',
		big: 'Mid-scene',
		line: '“So my landlord just texted me this.” (screen shows the text)',
		niche: 'Storytime',
		why: 'Starting in the middle skips the warm-up that makes people swipe. Curiosity about what happened next carries the first seconds.',
		watch: 'Skip “Hey guys, welcome back.” Greet people after you’ve given them a reason to stay, if at all.',
		tint: 'amethyst',
	},
	{
		name: 'Promise a short list',
		big: '3 things',
		line: '“Three things that make an apartment look cheap. The second one costs nothing to fix.”',
		niche: 'Home',
		why: 'A number tells people how long the payoff takes. Teasing one item gives a reason to stay past the first.',
		watch: 'Put your strongest item first or second, not last. A list that saves the good one for the end loses people on the way.',
		tint: 'ion',
	},
	{
		name: 'Make it move',
		big: 'Frame one',
		line: 'Open on the transformation itself: the cut, the pour, the outfit change, the before-to-after wipe.',
		niche: 'Fitness, fashion, DIY',
		why: 'Not every hook is words. Motion and change in the first frame stop a thumb faster than a talking head saying hello.',
		watch: 'Add a caption on screen too. Plenty of people scroll with sound off.',
		tint: 'rose',
	},
	{
		name: 'Say who it’s for',
		big: 'If you…',
		line: '“If you just got your first period-tracking app and you’re confused by the graph, this is for you.”',
		niche: 'Health',
		why: 'Calling out a specific person filters the audience on purpose. The people who stay are the ones who’ll finish, save and follow.',
		watch: 'Narrow is the point. “If you’re a human who likes things” filters no one.',
		tint: 'champagne',
	},
];

/* ---------------- Retention curve ---------------- */

export interface CurveShape {
	key: string;
	label: string;
	/** points: [x 0..100, y 0..100] where y is % still watching */
	points: [number, number][];
	means: string;
	quote: string;
	fix: string;
}

export const curves: CurveShape[] = [
	{
		key: 'cliff',
		label: 'Cliff at the start',
		points: [[0, 100], [4, 62], [10, 48], [30, 40], [60, 33], [100, 24]],
		means: 'A big drop in the first seconds. The title, thumbnail or first frame promised something the opening didn’t deliver fast enough.',
		quote: 'YouTube’s “Intro” number is the share of viewers still watching after the first 30 seconds.',
		fix: 'Cut the warm-up. Open on the payoff or the problem. Make sure the first frame matches the thumbnail.',
	},
	{
		key: 'leak',
		label: 'Slow leak',
		points: [[0, 100], [5, 88], [25, 70], [50, 52], [75, 38], [100, 26]],
		means: 'People drift away steadily. Nothing is wrong at any one moment; the video just doesn’t give reasons to keep going.',
		quote: 'YouTube: “Gradual declines mean that viewers are losing interest over time.”',
		fix: 'Tighten. Add a new question or reveal every so often. Ask if it should be shorter.',
	},
	{
		key: 'flat',
		label: 'Flat line',
		points: [[0, 100], [5, 90], [20, 84], [50, 81], [80, 79], [100, 76]],
		means: 'The people who started are watching start to finish. This is the shape to study and repeat.',
		quote: 'YouTube: when the line is flat, “viewers are watching that part of your video from start to finish.”',
		fix: 'Note what this video did in the opening and copy the structure, not the topic.',
	},
	{
		key: 'dip',
		label: 'A dip',
		points: [[0, 100], [5, 86], [30, 70], [40, 69], [46, 52], [52, 50], [75, 45], [100, 38]],
		means: 'One section loses people: a sponsor read, a slow tangent, a setup that runs long.',
		quote: 'YouTube: dips are moments that were “either skipped” or where viewers left.',
		fix: 'Find the timestamp. Shorten, move or cut that part next time.',
	},
	{
		key: 'spike',
		label: 'A spike',
		points: [[0, 100], [5, 85], [30, 66], [44, 63], [50, 78], [56, 64], [80, 52], [100, 42]],
		means: 'People rewound to see a moment again, or jumped to it. That’s the part they cared about most.',
		quote: 'YouTube: “Spikes are moments in your video that were rewatched or shared.”',
		fix: 'That moment is your next video’s topic, hook or thumbnail.',
	},
];

/* ---------------- Formats and specs ---------------- */

export interface SpecRow {
	label: string;
	value: string;
	src: string;
	href: string;
}
export interface PlatformSpecs {
	key: string;
	name: string;
	tint: string;
	rows: SpecRow[];
}

export const specs: PlatformSpecs[] = [
	{
		key: 'youtube',
		name: 'YouTube',
		tint: 'youtube',
		rows: [
			{ label: 'Shorts length', value: 'Up to 3 minutes (since Oct 15, 2024)', src: 'YouTube Blog, Oct 2024', href: 'https://blog.youtube/news-and-events/tall-updates-coming-to-shorts/' },
			{ label: 'What counts as a Short', value: 'Square or vertical, up to 3 minutes. Want it treated as long-form? Use a wider ratio like 16:9.', src: 'YouTube Help', href: 'https://support.google.com/youtube/answer/15424877' },
			{ label: 'Music in Shorts', value: 'Most songs usable for up to 90 seconds in a 3-minute Short', src: 'YouTube Help', href: 'https://support.google.com/youtube/answer/15424877' },
			{ label: 'Watch out', value: 'A Short over 1 minute with an active copyright claim is blocked worldwide', src: 'YouTube Help', href: 'https://support.google.com/youtube/answer/15424877' },
			{ label: 'A/B testing', value: 'Up to 3 titles and thumbnails on long videos (not Shorts), winner picked by watch time', src: 'YouTube Help', href: 'https://support.google.com/youtube/answer/16391400' },
		],
	},
	{
		key: 'instagram',
		name: 'Instagram',
		tint: 'instagram',
		rows: [
			{ label: 'Reels length', value: 'Up to 3 minutes (was 90 seconds, changed Jan 2025)', src: 'Engadget, Jan 2025', href: 'https://www.engadget.com/social-media/instagram-swoops-in-with-3-minute-reels-and-rectangular-profile-grids-as-the-tiktok-ban-gets-real-201316339.html' },
			{ label: 'Profile grid', value: 'Rectangular, not square (Jan 2025). Check your cover crop.', src: 'Engadget, Jan 2025', href: 'https://www.engadget.com/social-media/instagram-swoops-in-with-3-minute-reels-and-rectangular-profile-grids-as-the-tiktok-ban-gets-real-201316339.html' },
			{ label: 'Carousels', value: 'Up to 20 photos or videos (Aug 2024)', src: 'MacRumors, Aug 2024', href: 'https://www.macrumors.com/2024/08/08/instagram-20-photos-carousel-posts/' },
			{ label: 'Recommendable', value: 'Original, no visible watermarks, within the recommendation guidelines', src: 'Instagram, Apr 2024', href: 'https://creators.instagram.com/recommendations-and-originality' },
			{ label: 'Testing', value: 'Trial Reels go to non-followers first; stats after about 24 hours', src: 'Instagram, Dec 2024', href: 'https://creators.instagram.com/blog/instagram-trial-reels' },
		],
	},
	{
		key: 'tiktok',
		name: 'TikTok',
		tint: 'tiktok',
		rows: [
			{ label: 'For You eligibility', value: 'Unoriginal or reproduced content with no new or creative changes is not eligible', src: 'TikTok Community Guidelines', href: 'https://www.tiktok.com/community-guidelines/en/integrity-authenticity/' },
			{ label: 'Watermarks', value: 'Someone else’s visible watermark or logo makes a video ineligible for For You', src: 'TikTok Community Guidelines', href: 'https://www.tiktok.com/community-guidelines/en/integrity-authenticity/' },
			{ label: 'Too thin', value: '“Extremely short clips” and GIF-only videos count as low quality', src: 'TikTok Community Guidelines', href: 'https://www.tiktok.com/community-guidelines/en/integrity-authenticity/' },
			{ label: 'Followers', value: 'Follower count and past hits aren’t direct factors in For You', src: 'TikTok Newsroom, 2020', href: 'https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/' },
		],
	},
];

/* ---------------- Analytics doctor ---------------- */

export interface Symptom {
	key: string;
	label: string;
	check: string;
	means: string;
	try: string;
	src: string;
	href: string;
	link?: { label: string; href: string };
}

export const symptoms: Symptom[] = [
	{
		key: 'unseen',
		label: 'Hardly anyone sees it',
		check: 'Reach or impressions, and where views come from (followers vs. non-followers, browse vs. search).',
		means: 'The feed isn’t testing it widely. Usually the topic is too narrow for the platform, or early viewers didn’t act on it.',
		try: 'Pick topics people already watch. On Instagram, try a Trial Reel to test with non-followers before your followers see it.',
		src: 'Instagram, Dec 2024',
		href: 'https://creators.instagram.com/blog/instagram-trial-reels',
		link: { label: 'Growth experiments', href: '/grow/experiments/' },
	},
	{
		key: 'noclick',
		label: 'Shown, but nobody taps',
		check: 'YouTube impressions click-through rate (CTR), compared with your own recent videos.',
		means: 'The title and thumbnail aren’t pulling. But don’t panic over one number: YouTube says half of channels sit between 2% and 10%, and CTR naturally falls when a video is shown more widely, like on Home.',
		try: 'Run Test & Compare with up to 3 titles or thumbnails. YouTube picks the winner by watch time, not clicks.',
		src: 'YouTube Help',
		href: 'https://support.google.com/youtube/answer/7628154',
		link: { label: 'Growth experiments', href: '/grow/experiments/' },
	},
	{
		key: 'leave',
		label: 'They start, then leave',
		check: 'The retention curve, especially YouTube’s Intro number (still watching after 30 seconds). On short video, look at swipe-away or average watch time.',
		means: 'The opening isn’t paying off what got them in, or it’s slow.',
		try: 'Open on the payoff or the problem. Cut the greeting. Make the first frame match the thumbnail.',
		src: 'YouTube Help',
		href: 'https://support.google.com/youtube/answer/9314415',
		link: { label: 'Hooks and the first seconds', href: '/grow/hooks/' },
	},
	{
		key: 'nosend',
		label: 'They watch, but don’t share',
		check: 'Shares or sends per reach (Instagram), shares (TikTok, YouTube).',
		means: 'It’s good to watch but not useful or funny enough to pass on. Mosseri calls sends per reach “one of the most important signals” on Instagram.',
		try: 'Ask “who would someone send this to?” before you post. Make it about a shared situation, not just you.',
		src: 'Search Engine Journal, Jul 2024',
		href: 'https://www.searchenginejournal.com/instagram-algorithm-shift-why-sends-matter-more-than-ever/521389/',
	},
	{
		key: 'nofollow',
		label: 'Views, but no follows',
		check: 'Follows or subscribers per video, and returning viewers.',
		means: 'People like the post but don’t see why they’d want the next one. One-off topics do this.',
		try: 'Turn hits into a series with a name and a number. Say what’s coming next.',
		src: 'Editorial',
		href: '/grow/formats/',
		link: { label: 'Formats that travel', href: '/grow/formats/' },
	},
	{
		key: 'spiky',
		label: 'One hit, then flops',
		check: 'Your median views over the last 10 posts, not the best one.',
		means: 'Normal. In Buffer’s data from 11.4M TikTok posts, typical (median) views stayed about flat no matter how often accounts posted; posting more raised the chance of an outlier.',
		try: 'Judge ideas by your median. Study the outlier’s first 3 seconds and topic, then test that again on purpose.',
		src: 'Buffer, Oct 2025',
		href: 'https://buffer.com/resources/how-often-should-you-post-on-tiktok/',
	},
];

/* ---------------- Experiments ---------------- */

export interface ExperimentVar {
	key: string;
	label: string;
	change: string;
	metric: string;
	tool: string;
}

export const experimentVars: ExperimentVar[] = [
	{ key: 'hook', label: 'The hook', change: 'the first line and first frame', metric: 'retention at 3 seconds (short) or 30 seconds (long)', tool: 'Post two versions a few days apart, or a Trial Reel on Instagram.' },
	{ key: 'thumb', label: 'Thumbnail', change: 'the thumbnail', metric: 'watch time share in Test & Compare', tool: 'YouTube Test & Compare (long videos, desktop Studio, up to 2 weeks).' },
	{ key: 'title', label: 'Title', change: 'the title', metric: 'watch time share in Test & Compare', tool: 'YouTube Test & Compare (up to 3 titles).' },
	{ key: 'length', label: 'Length', change: 'the length (cut a tighter version)', metric: 'average % watched and shares', tool: 'Two posts of the same idea, one tighter.' },
	{ key: 'format', label: 'Format', change: 'the format (talking head vs. voiceover vs. carousel)', metric: 'sends or shares per view', tool: 'Same topic, two formats, same week.' },
	{ key: 'topic', label: 'Topic angle', change: 'the angle on the same topic', metric: 'views from non-followers', tool: 'Trial Reels on Instagram, or alternate angles across a series.' },
];

/* ---------------- Repurposing ---------------- */

export interface RepurposeTarget {
	key: string;
	name: string;
	tint: string;
	shape: string;
	change: string[];
	avoid: string;
	src: string;
	href: string;
}

export const repurpose: RepurposeTarget[] = [
	{
		key: 'shorts',
		name: 'YouTube Shorts',
		tint: 'youtube',
		shape: 'Vertical or square, up to 3 min',
		change: ['Cut the single best moment, not a trailer', 'Re-hook in the first second', 'Link the full video'],
		avoid: 'Over 1 minute with an active copyright claim: the Short gets blocked.',
		src: 'YouTube Help',
		href: 'https://support.google.com/youtube/answer/15424877',
	},
	{
		key: 'reels',
		name: 'Instagram Reels',
		tint: 'instagram',
		shape: 'Vertical, up to 3 min',
		change: ['Export the clean file from your editor', 'Native captions and text', 'Give people a reason to send it'],
		avoid: 'Visible watermarks: Instagram only recommends content without them.',
		src: 'Instagram, Apr 2024',
		href: 'https://creators.instagram.com/recommendations-and-originality',
	},
	{
		key: 'tiktok',
		name: 'TikTok',
		tint: 'tiktok',
		shape: 'Vertical',
		change: ['Rework the opening for TikTok’s pace', 'Use TikTok-native sound or text', 'Reply to comments with video'],
		avoid: 'Someone else’s watermark or logo makes it ineligible for For You.',
		src: 'TikTok Community Guidelines',
		href: 'https://www.tiktok.com/community-guidelines/en/integrity-authenticity/',
	},
	{
		key: 'carousel',
		name: 'Carousel',
		tint: 'instagram',
		shape: 'Up to 20 slides',
		change: ['Turn the steps into slides', 'Slide 1 is the hook, the last slide is the save', 'Big text, one idea per slide'],
		avoid: 'A screenshot dump of the video. Rewrite it for reading.',
		src: 'MacRumors, Aug 2024',
		href: 'https://www.macrumors.com/2024/08/08/instagram-20-photos-carousel-posts/',
	},
	{
		key: 'x',
		name: 'X or Threads',
		tint: 'x',
		shape: 'Text first',
		change: ['The one surprising line, as a post', 'A short thread of the key points', 'Reply to people who reply'],
		avoid: 'Just a link. On X, replies are weighted far above likes.',
		src: 'X source code, 2026',
		href: '/algorithms/x-open-source/',
	},
];

/* ---------------- Niche ---------------- */

export const nicheParts = {
	who: ['new moms', 'nurses on night shift', 'first-time renters', 'curvy petites', 'college athletes', 'small-business owners', 'people learning Korean'],
	what: ['budget meal prep', 'skincare that works on dark skin', 'styling thrifted clothes', 'strength training at home', 'money basics', 'tiny-apartment decor', 'travel on PTO'],
	how: ['from a registered dietitian', 'in 60 seconds', 'with $50 or less', 'as a weekly challenge', 'with receipts and sources', 'from someone two steps ahead', 'in a cozy, no-pressure way'],
};

export const nicheChecks = [
	{ q: 'Could you list 30 video ideas for it right now?', why: 'MrBeast’s advice is to make 100 videos and improve each one. You need a niche with that many ideas in it.' },
	{ q: 'Would you still make it after 6 months of slow growth?', why: 'Buffer found engagement per post kept climbing for creators who posted for 20+ of 26 weeks. Staying power beats a hot start.' },
	{ q: 'Can you describe the one person it’s for in a sentence?', why: 'Feeds match posts to people. A clear person makes hooks, titles and topics easier.' },
	{ q: 'Do people already watch or search for this?', why: 'Some demand is good news. You want a crowd you can serve, not a topic no one is looking for.' },
	{ q: 'Do you bring something others in it don’t?', why: 'Your job, your face, your access, your taste or your story. That’s the part copycats can’t take.' },
	{ q: 'Is there a way it could pay that you’d be proud of?', why: 'Li Jin’s math: 100 true fans paying $1,000 a year is $100k. Small and loyal can be a business.' },
];

/* ---------------- Cadence ---------------- */

export const cadenceFormats = [
	{ key: 'short', label: 'Short video', hours: 2 },
	{ key: 'carousel', label: 'Carousel', hours: 1.5 },
	{ key: 'photo', label: 'Photo post', hours: 0.5 },
	{ key: 'long', label: 'Long video', hours: 12 },
	{ key: 'newsletter', label: 'Newsletter', hours: 3 },
];

/** Buffer, Instagram, Aug 2025: reach per post vs. posting 1-2 times a week. */
export const instagramBands = [
	{ band: '1–2 a week', lift: 'baseline' },
	{ band: '3–5 a week', lift: 'about +12% reach per post' },
	{ band: '6–9 a week', lift: 'about +18%' },
	{ band: '10+ a week', lift: 'about +24%' },
];

/** Buffer, TikTok, Oct 2025: views per post vs. 1 post a week. */
export const tiktokBands = [
	{ band: '1 a week', median: 489, p90: 3722 },
	{ band: '2–5 a week', median: 506, p90: 6983 },
	{ band: '6–10 a week', median: 487, p90: 10092 },
	{ band: '11+ a week', median: 459, p90: 14401 },
];

/* ---------------- Plain-text copies for Markdown / llms.txt ---------------- */

export const growWidgetText: Record<string, string> = {
	HookLab:
		'Eight hook patterns (examples written by us):\n\n' +
		hooks.map((h) => `- **${h.name}** (${h.niche}): ${h.line} Why it works: ${h.why} Watch out: ${h.watch}`).join('\n'),
	RetentionCurve:
		'Five retention-curve shapes (definitions from YouTube Help, "Measure key moments for audience retention"):\n\n' +
		curves.map((c) => `- **${c.label}:** ${c.means} ${c.quote} Try: ${c.fix}`).join('\n'),
	FormatSpecs: specs
		.map((p) => `**${p.name}**\n\n| | |\n| --- | --- |\n` + p.rows.map((r) => `| ${r.label} | ${r.value} ([${r.src}](${r.href})) |`).join('\n'))
		.join('\n\n'),
	MetricDoctor:
		'Analytics doctor: pick the symptom, check the metric.\n\n' +
		symptoms.map((s) => `- **${s.label}.** Check: ${s.check} What it means: ${s.means} Try: ${s.try} (Source: [${s.src}](${s.href}))`).join('\n'),
	ExperimentBuilder:
		'Experiment card: change one thing, decide the metric first, log the result.\n\n| Change | Judge by | How to run it |\n| --- | --- | --- |\n' +
		experimentVars.map((v) => `| ${v.change} | ${v.metric} | ${v.tool} |`).join('\n'),
	RepurposeFlow:
		'One idea, five places:\n\n' +
		repurpose.map((r) => `- **${r.name}** (${r.shape}): ${r.change.join('; ')}. Avoid: ${r.avoid} ([${r.src}](${r.href}))`).join('\n'),
	NicheBuilder:
		'Niche sentence: [who] + [what] + [how you are different]. Example: budget meal prep for new moms, from a registered dietitian.\n\nSix checks:\n\n' +
		nicheChecks.map((c) => `- ${c.q} ${c.why}`).join('\n'),
	CadencePlanner:
		'Cadence planner: hours you can give each week divided by hours per piece = what you can post without burning out. Pick the number you could keep for 21+ weeks.\n\nBuffer, Instagram (2.1M posts, Aug 2025), reach per post vs. 1–2 posts a week:\n' +
		instagramBands.map((b) => `- ${b.band}: ${b.lift}`).join('\n') +
		'\n\nBuffer, TikTok (11.4M posts, Oct 2025), views per post:\n\n| Posts a week | Median | 90th percentile |\n| --- | --- | --- |\n' +
		tiktokBands.map((b) => `| ${b.band} | ${b.median} | ${b.p90.toLocaleString('en-US')} |`).join('\n'),
	GrowLoop:
		'The growth loop: 1. Pick an idea a specific person wants. 2. Hook them in the first seconds. 3. Deliver so they watch through. 4. Give them a reason to send or follow. 5. Read the numbers. 6. Change one thing and post again.',
};
