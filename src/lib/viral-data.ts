/**
 * Data for the "make content that travels" course in /algorithms/.
 * Research figures are quoted from the papers; every made-up example is marked
 * illustrative where it renders.
 */

export const viralSteps = [
	{
		key: 'stop',
		name: 'Stop',
		tint: 'rose',
		measures: 'taps, views started, not swiping past',
		question: 'Would a stranger stop for the first frame, cover or title?',
		lesson: 'Get the tap',
		href: '/algorithms/get-the-tap/',
	},
	{
		key: 'stay',
		name: 'Stay',
		tint: 'champagne',
		measures: 'watch time, finishing, time spent',
		question: 'Would they still be there at the end?',
		lesson: 'Keep them watching',
		href: '/algorithms/keep-them-watching/',
	},
	{
		key: 'send',
		name: 'Send',
		tint: 'jade',
		measures: 'sends, shares, copied links',
		question: 'Can you name who they would send it to?',
		lesson: 'Make it worth sending',
		href: '/algorithms/make-it-worth-sending/',
	},
	{
		key: 'return',
		name: 'Come back',
		tint: 'amethyst',
		measures: 'follows, return visits, "glad I watched"',
		question: 'Is it obvious what they get if they follow?',
		lesson: 'Turn a hit into an audience',
		href: '/algorithms/turn-a-hit-into-an-audience/',
	},
] as const;

/** Packaging test: one made-up video, three title + thumbnail ideas. Numbers are illustrative. */
export const packagingVariants = [
	{
		key: 'a',
		title: 'My morning routine',
		thumb: 'You, smiling, in a kitchen',
		ctr: 3.1,
		watch: 27,
		read: 'Honest, but nothing to stop for. Few people tap, so even good watch time adds up to little.',
	},
	{
		key: 'b',
		title: 'This CHANGED MY LIFE forever 😱',
		thumb: 'Shocked face, red arrow, no clue what the video is',
		ctr: 7.4,
		watch: 22,
		read: 'Wins the click, then people leave when the video isn’t what it promised. Most taps, but the least watching in total.',
	},
	{
		key: 'c',
		title: '30 days of waking up at 5am: what actually changed',
		thumb: 'Day 1 vs day 30 side by side',
		ctr: 5.2,
		watch: 51,
		read: 'Specific, a little curious, and the video delivers it. Fewer taps than the shock version, but people stay, so it wins on watch time.',
	},
];

/**
 * Berger & Milkman, "What Makes Online Content Viral?", Journal of Marketing
 * Research, 2012: 6,956 New York Times articles (Aug 30 to Nov 30, 2008),
 * outcome = made the most-emailed list. x = how positive (0 to 100),
 * y = how activating / high-arousal (0 to 100); positions are our sketch.
 */
export const emotions = [
	{
		key: 'awe',
		label: 'Awe',
		x: 82,
		y: 82,
		effect: 'up',
		finding: 'Articles that inspired more awe were more likely to be widely shared: one standard deviation more awe raised the odds of making the most-emailed list by 30%.',
		make: 'Show something bigger than everyday life: a skill at its peak, a place, a transformation, a scale people can’t picture.',
		watch: 'Awe needs a payoff you actually show. Promising it in the hook and never delivering is clickbait.',
	},
	{
		key: 'useful',
		label: 'Useful',
		x: 62,
		y: 52,
		effect: 'up',
		finding: 'Practically useful articles were shared more, even after accounting for emotion.',
		make: 'The one fix, the template, the list people screenshot. Useful posts get sent with “you need this.”',
		watch: 'Useful is easy to copy. Make yours the clearest or the most specific.',
	},
	{
		key: 'surprise',
		label: 'Surprise',
		x: 58,
		y: 72,
		effect: 'up',
		finding: 'More surprising and more interesting articles were more likely to make the most-emailed list.',
		make: 'Lead with the thing people assume, then show why it’s wrong. A real twist, not a fake one.',
		watch: 'If the twist is invented for the hook, viewers notice and leave.',
	},
	{
		key: 'anger',
		label: 'Anger',
		x: 14,
		y: 88,
		effect: 'up',
		finding: 'Anger raised sharing too: one standard deviation more anger raised the odds of making the most-emailed list by 34%.',
		make: 'Righteous anger on someone’s behalf (a scam exposed, an unfair rule) travels. Anger at your own audience doesn’t.',
		watch: 'Anger also earns mutes, blocks and reports, which feeds count against you. On X a report weighs −234 against a like’s 0.708.',
	},
	{
		key: 'anxiety',
		label: 'Anxiety',
		x: 24,
		y: 74,
		effect: 'up',
		finding: 'Anxiety-inducing articles were also more viral. It is high-arousal, like awe and anger.',
		make: 'A real risk your audience faces, plus what to do about it. “Check this setting before your next brand deal.”',
		watch: 'Fear without a fix feels like bait. Always give the way out.',
	},
	{
		key: 'sad',
		label: 'Sadness',
		x: 22,
		y: 18,
		effect: 'down',
		finding: 'Sadder articles were less likely to be shared. Sadness is a low-arousal emotion: it quiets people down rather than moving them to act.',
		make: 'Sad stories can still work when they turn: grief into gratitude, loss into a lesson, a fundraiser people can join.',
		watch: 'Pure sadness gets watched and felt, then not sent.',
	},
	{
		key: 'calm',
		label: 'Calm',
		x: 78,
		y: 22,
		effect: 'flat',
		finding: 'The paper found positive content was shared more overall, but arousal mattered on top of that: the activating emotions beat the quiet ones.',
		make: 'Cozy and calm content can build loyal viewers who come back. Just don’t expect it to be sent as often.',
		watch: 'If you make calm content, lean on the other steps: finishing and coming back.',
	},
];
