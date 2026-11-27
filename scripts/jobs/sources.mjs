/**
 * Companies whose openings show on /jobs/. Each one publishes a public job-board
 * feed (Greenhouse, Lever or Ashby) meant for exactly this: showing its jobs on
 * other sites. We never scrape careers pages, LinkedIn or Indeed.
 *
 * - kind: what the company does, used for the "company type" filter.
 * - ats + slug: the feed. Leave them out and `npm run jobs:probe` tries every
 *   feed and prints what it finds; pin the result here once you've checked the
 *   jobs really belong to this company.
 * - focus: 'creator' keeps only creator-facing roles (partnerships, content,
 *   community...). Use it for big platforms where most jobs have nothing to do
 *   with creators.
 *
 * Adding a company: it must make money with or for creators, and nobody pays
 * to be listed. Open a PR, or an issue if you're not sure.
 */

/** @typedef {'platform' | 'tools' | 'agency' | 'studio' | 'commerce'} Kind */
/** @typedef {{ company: string, kind: Kind, ats?: 'greenhouse' | 'lever' | 'ashby', slug?: string, slugs?: string[], focus?: 'creator', site?: string }} Source */

/** @type {Source[]} */
export const sources = [
	// Platforms creators publish on and get paid through
	{ company: 'Patreon', kind: 'platform' },
	{ company: 'Substack', kind: 'platform' },
	{ company: 'Discord', kind: 'platform', focus: 'creator' },
	{ company: 'Reddit', kind: 'platform', focus: 'creator' },
	{ company: 'Pinterest', kind: 'platform', focus: 'creator' },
	{ company: 'Spotify', kind: 'platform', focus: 'creator' },
	{ company: 'Twitch', kind: 'platform', focus: 'creator' },
	{ company: 'Vimeo', kind: 'platform', focus: 'creator' },
	{ company: 'Medium', kind: 'platform' },
	{ company: 'Whatnot', kind: 'platform', focus: 'creator' },
	{ company: 'Kajabi', kind: 'platform' },
	{ company: 'Teachable', kind: 'platform' },
	{ company: 'Thinkific', kind: 'platform' },
	{ company: 'Podia', kind: 'platform' },
	{ company: 'Gumroad', kind: 'platform' },
	{ company: 'Linktree', kind: 'platform' },
	{ company: 'Beacons', kind: 'platform', slugs: ['beacons', 'beaconsai'] },
	{ company: 'Stan', kind: 'platform', slugs: ['stan', 'stanstore', 'stan-store'] },
	{ company: 'Fourthwall', kind: 'platform' },
	{ company: 'Cameo', kind: 'platform' },
	{ company: 'Fanfix', kind: 'platform' },
	{ company: 'Circle', kind: 'platform', slugs: ['circle', 'circleso', 'circle-so'] },
	{ company: 'Skool', kind: 'platform' },
	{ company: 'Uscreen', kind: 'platform' },
	{ company: 'Nebula', kind: 'platform', slugs: ['nebula', 'standard'] },
	{ company: 'Rumble', kind: 'platform', focus: 'creator' },
	{ company: 'Snap', kind: 'platform', focus: 'creator', slugs: ['snap', 'snapchat'] },
	{ company: 'Kick', kind: 'platform', focus: 'creator' },
	{ company: 'Ko-fi', kind: 'platform', slugs: ['kofi', 'ko-fi'] },

	// Tools creators use to make, edit and grow
	{ company: 'Captions', kind: 'tools', slugs: ['captions', 'captionsapp'] },
	{ company: 'Descript', kind: 'tools' },
	{ company: 'OpusClip', kind: 'tools', slugs: ['opusclip', 'opus', 'opus-clip'] },
	{ company: 'Riverside', kind: 'tools', slugs: ['riverside', 'riversidefm'] },
	{ company: 'Later', kind: 'tools', slugs: ['later', 'latercom'] },
	{ company: 'Metricool', kind: 'tools' },
	{ company: 'Epidemic Sound', kind: 'tools', slugs: ['epidemicsound', 'epidemic-sound'] },
	{ company: 'Artlist', kind: 'tools' },
	{ company: 'Lightricks', kind: 'tools' },
	{ company: 'vidIQ', kind: 'tools', slugs: ['vidiq'] },
	{ company: 'Spotter', kind: 'tools', slugs: ['spotter', 'spotterinc'] },
	{ company: 'Jellysmack', kind: 'tools' },
	{ company: 'Agentio', kind: 'tools' },
	{ company: 'Passionfroot', kind: 'tools' },
	{ company: 'Kapwing', kind: 'tools' },
	{ company: 'Veed', kind: 'tools', slugs: ['veed', 'veedio'] },
	{ company: 'ElevenLabs', kind: 'tools', focus: 'creator', slugs: ['elevenlabs'] },
	{ company: 'Restream', kind: 'tools' },
	{ company: 'StreamYard', kind: 'tools' },
	{ company: 'Streamlabs', kind: 'tools' },

	// Influencer marketing platforms, talent agencies and management
	{ company: 'CreatorIQ', kind: 'agency' },
	{ company: 'GRIN', kind: 'agency', slugs: ['grin', 'grinhq'] },
	{ company: 'Aspire', kind: 'agency', slugs: ['aspire', 'aspireiq'] },
	{ company: 'Captiv8', kind: 'agency' },
	{ company: 'Whalar', kind: 'agency' },
	{ company: 'Billion Dollar Boy', kind: 'agency', slugs: ['billiondollarboy'] },
	{ company: 'Viral Nation', kind: 'agency', slugs: ['viralnation'] },
	{ company: 'Night', kind: 'agency', slugs: ['night', 'nightmedia'] },
	{ company: 'Select Management Group', kind: 'agency', slugs: ['selectmanagement', 'selectmanagementgroup'] },
	{ company: 'Underscore Talent', kind: 'agency', slugs: ['underscoretalent'] },
	{ company: 'Influential', kind: 'agency' },
	{ company: 'Linqia', kind: 'agency' },
	{ company: 'Traackr', kind: 'agency' },
	{ company: 'Upfluence', kind: 'agency' },
	{ company: 'impact.com', kind: 'agency', focus: 'creator', slugs: ['impact', 'impactcom'] },
	{ company: 'Collabstr', kind: 'agency' },
	{ company: 'Popular Pays', kind: 'agency', slugs: ['popularpays'] },
	{ company: 'Dash Hudson', kind: 'agency', slugs: ['dashhudson'] },
	{ company: 'Ubiquitous', kind: 'agency', slugs: ['ubiquitous', 'ubiquitousagency'] },
	{ company: 'Open Influence', kind: 'agency', slugs: ['openinfluence'] },
	{ company: 'Creator Authority', kind: 'agency', slugs: ['creatorauthority'] },
	{ company: 'Palette', kind: 'agency', slugs: ['palette', 'palettemgmt'] },
	{ company: 'Dulcedo', kind: 'agency' },

	// Creator-led companies and studios
	{ company: 'Beast Industries', kind: 'studio', slugs: ['beastindustries', 'mrbeast', 'beast', 'feastables'] },
	{ company: 'Dhar Mann Studios', kind: 'studio', slugs: ['dharmannstudios', 'dharmann'] },
	{ company: 'Jubilee', kind: 'studio', slugs: ['jubilee', 'jubileemedia'] },
	{ company: 'Smosh', kind: 'studio' },
	{ company: 'Dude Perfect', kind: 'studio', slugs: ['dudeperfect'] },
	{ company: 'Mythical', kind: 'studio', slugs: ['mythical', 'mythicalentertainment'] },
	{ company: 'Dropout', kind: 'studio' },
	{ company: 'Good Good', kind: 'studio', slugs: ['goodgood', 'goodgoodgolf'] },
	{ company: 'Sidemen', kind: 'studio' },
	{ company: 'Pocket.watch', kind: 'studio', slugs: ['pocketwatch'] },
	{ company: 'Moonbug', kind: 'studio', slugs: ['moonbug', 'moonbugentertainment'] },
	{ company: 'Prime Hydration', kind: 'studio', slugs: ['primehydration', 'drinkprime'] },
	{ company: 'Chamberlain Coffee', kind: 'studio', slugs: ['chamberlaincoffee'] },
	{ company: 'Publish Press', kind: 'studio', slugs: ['publishpress'] },
	{ company: 'Wondery', kind: 'studio' },
	{ company: 'Kinda Funny', kind: 'studio', slugs: ['kindafunny'] },
	{ company: 'Doing Things', kind: 'studio', slugs: ['doingthings'] },
	{ company: 'Lunchly', kind: 'studio' },

	// Creator commerce: affiliate, storefronts, merch, creator finance
	{ company: 'LTK', kind: 'commerce', slugs: ['ltk', 'rewardstyle', 'shopltk'] },
	{ company: 'ShopMy', kind: 'commerce' },
	{ company: 'Mavely', kind: 'commerce' },
	{ company: 'Karat', kind: 'commerce', slugs: ['karat', 'trykarat', 'karatfinancial'] },
	{ company: 'Spring', kind: 'commerce', slugs: ['spring', 'teespring'] },
	{ company: 'Superfiliate', kind: 'commerce' },
	{ company: 'Archive', kind: 'commerce', slugs: ['archive', 'archiveco'] },
	{ company: 'Pearpop', kind: 'commerce' },
	{ company: 'Whop', kind: 'commerce' },
	{ company: 'Flagship', kind: 'commerce', slugs: ['flagship', 'flagshipshop'] },
	{ company: 'Pietra', kind: 'commerce' },
];
