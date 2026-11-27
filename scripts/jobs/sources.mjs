/**
 * Companies whose openings show on /jobs/. Each one publishes a public job-board
 * feed (Greenhouse, Lever or Ashby) meant for exactly this: showing its jobs on
 * other sites. We never scrape careers pages, LinkedIn or Indeed.
 *
 * - kind: what the company does, used for the "company type" filter.
 * - ats + slug: the feed. Only companies with one are listed. Leave them out
 *   and `node scripts/fetch-jobs.mjs --probe` (also run on every PR that
 *   touches this file) tries every feed and prints what it finds; pin the result here once you've checked the
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
	{ company: 'Patreon', kind: 'platform', ats: 'ashby', slug: 'patreon' },
	{ company: 'Substack', kind: 'platform', ats: 'ashby', slug: 'substack' },
	{ company: 'Discord', kind: 'platform', ats: 'greenhouse', slug: 'discord', focus: 'creator' },
	{ company: 'Reddit', kind: 'platform', ats: 'greenhouse', slug: 'reddit', focus: 'creator' },
	{ company: 'Pinterest', kind: 'platform', ats: 'greenhouse', slug: 'pinterest', focus: 'creator' },
	{ company: 'Spotify', kind: 'platform', ats: 'lever', slug: 'spotify', focus: 'creator' },
	{ company: 'Twitch', kind: 'platform', ats: 'greenhouse', slug: 'twitch' },
	{ company: 'Vimeo', kind: 'platform', focus: 'creator' },
	{ company: 'Medium', kind: 'platform', ats: 'greenhouse', slug: 'medium' },
	{ company: 'Whatnot', kind: 'platform', focus: 'creator' },
	{ company: 'Kajabi', kind: 'platform' },
	{ company: 'Teachable', kind: 'platform' },
	{ company: 'Thinkific', kind: 'platform', ats: 'ashby', slug: 'thinkific' },
	{ company: 'Podia', kind: 'platform' },
	{ company: 'Gumroad', kind: 'platform' },
	{ company: 'Linktree', kind: 'platform' },
	{ company: 'Beacons', kind: 'platform', ats: 'ashby', slug: 'beacons' },
	{ company: 'Stan', kind: 'platform', slugs: ['stan', 'stanstore', 'stan-store'] },
	{ company: 'Fourthwall', kind: 'platform' },
	{ company: 'Cameo', kind: 'platform', ats: 'greenhouse', slug: 'cameo' },
	{ company: 'Fanfix', kind: 'platform' },
	{ company: 'Skool', kind: 'platform' },
	{ company: 'Uscreen', kind: 'platform' },
	{ company: 'Nebula', kind: 'platform', slugs: ['nebula', 'standard'] },
	{ company: 'Rumble', kind: 'platform', ats: 'greenhouse', slug: 'rumble', focus: 'creator' },
	{ company: 'Snap', kind: 'platform', focus: 'creator', slugs: ['snap', 'snapchat'] },
	{ company: 'Kick', kind: 'platform', focus: 'creator' },
	{ company: 'Ko-fi', kind: 'platform', slugs: ['kofi', 'ko-fi'] },

	// Tools creators use to make, edit and grow
	{ company: 'Captions', kind: 'tools', slugs: ['captions', 'captionsapp'] },
	{ company: 'Descript', kind: 'tools', ats: 'greenhouse', slug: 'descript' },
	{ company: 'OpusClip', kind: 'tools', ats: 'ashby', slug: 'opusclip' },
	{ company: 'Riverside', kind: 'tools', slugs: ['riverside', 'riversidefm'] },
	{ company: 'Later', kind: 'tools', ats: 'greenhouse', slug: 'later' },
	{ company: 'Metricool', kind: 'tools' },
	{ company: 'Epidemic Sound', kind: 'tools', ats: 'ashby', slug: 'epidemic-sound' },
	{ company: 'Artlist', kind: 'tools' },
	{ company: 'Lightricks', kind: 'tools', ats: 'greenhouse', slug: 'lightricks' },
	{ company: 'vidIQ', kind: 'tools', slugs: ['vidiq'] },
	{ company: 'Spotter', kind: 'tools', ats: 'greenhouse', slug: 'spotter' },
	{ company: 'Jellysmack', kind: 'tools' },
	{ company: 'Agentio', kind: 'tools', ats: 'ashby', slug: 'agentio' },
	{ company: 'Passionfroot', kind: 'tools', ats: 'ashby', slug: 'passionfroot' },
	{ company: 'Kapwing', kind: 'tools', ats: 'lever', slug: 'kapwing' },
	{ company: 'Veed', kind: 'tools', slugs: ['veed', 'veedio'] },
	{ company: 'ElevenLabs', kind: 'tools', ats: 'ashby', slug: 'elevenlabs', focus: 'creator' },
	{ company: 'Restream', kind: 'tools', ats: 'ashby', slug: 'restream' },
	{ company: 'StreamYard', kind: 'tools' },
	{ company: 'Streamlabs', kind: 'tools' },

	// Influencer marketing platforms, talent agencies and management
	{ company: 'CreatorIQ', kind: 'agency', ats: 'ashby', slug: 'creatoriq' },
	{ company: 'GRIN', kind: 'agency', ats: 'greenhouse', slug: 'grin' },
	{ company: 'Aspire', kind: 'agency', slugs: ['aspire', 'aspireiq'] },
	{ company: 'Captiv8', kind: 'agency' },
	{ company: 'Whalar', kind: 'agency', ats: 'greenhouse', slug: 'whalar' },
	{ company: 'Billion Dollar Boy', kind: 'agency', slugs: ['billiondollarboy'] },
	{ company: 'Viral Nation', kind: 'agency', ats: 'greenhouse', slug: 'viralnation' },
	{ company: 'Night', kind: 'agency', slugs: ['night', 'nightmedia'] },
	{ company: 'Select Management Group', kind: 'agency', ats: 'greenhouse', slug: 'selectmanagementgroup' },
	{ company: 'Underscore Talent', kind: 'agency', slugs: ['underscoretalent'] },
	{ company: 'Influential', kind: 'agency' },
	{ company: 'Linqia', kind: 'agency', ats: 'greenhouse', slug: 'linqia' },
	{ company: 'Traackr', kind: 'agency', ats: 'lever', slug: 'traackr' },
	{ company: 'Upfluence', kind: 'agency' },
	{ company: 'impact.com', kind: 'agency', ats: 'greenhouse', slug: 'impact', focus: 'creator' },
	{ company: 'Collabstr', kind: 'agency' },
	{ company: 'Popular Pays', kind: 'agency', slugs: ['popularpays'] },
	{ company: 'Dash Hudson', kind: 'agency', slugs: ['dashhudson'] },
	{ company: 'Ubiquitous', kind: 'agency', slugs: ['ubiquitous', 'ubiquitousagency'] },
	{ company: 'Open Influence', kind: 'agency', slugs: ['openinfluence'] },
	{ company: 'Creator Authority', kind: 'agency', slugs: ['creatorauthority'] },
	{ company: 'Palette', kind: 'agency', slugs: ['palette', 'palettemgmt'] },
	{ company: 'Dulcedo', kind: 'agency', ats: 'lever', slug: 'dulcedo' },

	// Creator-led companies and studios
	{ company: 'Feastables (Beast Industries)', kind: 'studio', ats: 'greenhouse', slug: 'feastables' },
	{ company: 'Dhar Mann Studios', kind: 'studio', slugs: ['dharmannstudios', 'dharmann'] },
	{ company: 'Jubilee', kind: 'studio', slugs: ['jubilee', 'jubileemedia'] },
	{ company: 'Smosh', kind: 'studio' },
	{ company: 'Dude Perfect', kind: 'studio', ats: 'greenhouse', slug: 'dudeperfect' },
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
	{ company: 'LTK', kind: 'commerce', ats: 'greenhouse', slug: 'shopltk' },
	{ company: 'ShopMy', kind: 'commerce', ats: 'greenhouse', slug: 'shopmy' },
	{ company: 'Mavely', kind: 'commerce' },
	{ company: 'Spring', kind: 'commerce', slugs: ['spring', 'teespring'] },
	{ company: 'Superfiliate', kind: 'commerce' },
	{ company: 'Pearpop', kind: 'commerce', ats: 'ashby', slug: 'pearpop' },
	{ company: 'Whop', kind: 'commerce', ats: 'ashby', slug: 'whop' },
	{ company: 'Flagship', kind: 'commerce', slugs: ['flagship', 'flagshipshop'] },
	{ company: 'Pietra', kind: 'commerce' },
];
