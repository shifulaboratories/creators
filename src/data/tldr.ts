/**
 * "The short version": three points shown at the top of a guide, so someone on a
 * phone gets the gist before they scroll. Keyed by the page id (its path without
 * slashes at either end). A `tldr:` list in a page's own frontmatter wins over
 * this file. Every point must be something the page itself says and sources;
 * no new claims here.
 */
export const TLDR: Record<string, string[]> = {
	'platforms/youtube': [
		'YouTube recommends videos people click, keep watching, and later say they were glad they watched.',
		'Recommendations drive more viewing than subscriptions or search, and they don’t depend on who already follows you.',
		'A misleading thumbnail wins the click and loses the recommendation. Read your retention graph.',
	],
	'platforms/tiktok': [
		'TikTok ranks each video for each viewer, mostly on how people interact with it.',
		'Follower count and past hits aren’t direct factors, so every video gets a fresh chance.',
		'Finishing a longer video is a strong signal: cut anything that doesn’t earn the next second.',
	],
	'platforms/instagram': [
		'There’s no single algorithm: Feed, Explore, Reels, Stories and Search each rank differently.',
		'Reels and Explore mostly show accounts people don’t follow yet. That’s where new reach comes from.',
		'For Reels, Instagram names reshares and watching to the end first. Post clean, original files.',
	],
	'platforms/x': [
		'X gathers candidate posts from people you follow and people you don’t, then ranks them by predicted engagement.',
		'Roughly half of the 2023 feed came from accounts people didn’t follow, so a strong post can travel.',
		'Replies are a named signal, and spammy or muted content gets filtered out before anyone sees it.',
	],
	'algorithms/how-recommenders-work': [
		'A feed is a prediction machine: it guesses how likely each viewer is to take each action on each post.',
		'It adds those guesses up with weights the platform picks, then shows the highest scores.',
		'You don’t beat “the algorithm.” You cause the actions it weights, in the people you want to reach.',
	],
	'algorithms/compare-platforms': [
		'Every platform runs the same kind of machine, but each one weights different actions.',
		'YouTube leans on watch time and satisfaction, TikTok on completion, Reels on reshares, X on replies and shares.',
		'A post that won on one platform needs rebuilding for the next, not just re-uploading.',
	],
	'algorithms/x-open-source': [
		'X is the only major platform that publishes the code behind its main feed: it scores dozens of predicted actions per post.',
		'In the current code, a predicted reply, quote or DM share counts about 7 times a like, and a copied-link share about 28 times.',
		'“Not interested,” mute, block and report carry heavy penalties. The weights apply to predictions, not counts.',
	],
	'algorithms/myths': [
		'Most algorithm advice online is recycled guesswork.',
		'Before you change how you work, check whether a claim traces to the platform’s own code or explainers.',
		'Real platform statements come with a link and a date. A screenshot isn’t a source.',
	],
	'case-studies/mrbeast': [
		'MrBeast starts with the thumbnail and builds the video to deliver on it.',
		'He watches retention more closely than anything else and won’t pad a video for length.',
		'He got good by making a lot of videos and improving one thing at a time.',
	],
	'goldmines/mrbeast-production-handbook': [
		'Start with the title and thumbnail, and make the first minute deliver what they promised.',
		'Treat the “critical components” of a video like a baby: never leave one to a coin flip.',
		'It’s one channel’s playbook, built for its format and scale. It’s not a universal formula.',
	],
};

export function tldrFor(id: string, fromFrontmatter?: string[]): string[] {
	const points = fromFrontmatter?.length ? fromFrontmatter : TLDR[id.replace(/^\/|\/$/g, '')];
	return (points ?? []).slice(0, 3);
}
