/**
 * Sorts a job into one role type from its title alone, so filters work the
 * same for every company whatever their own department names are. First
 * match wins, so order matters: "Creator Partnerships Engineer" is
 * engineering, "Creator Partnerships Manager" is talent.
 * Shared with the page (src/lib/jobs.ts) for labels.
 */

export const ROLES = [
	{ id: 'talent', label: 'Creator & talent' },
	{ id: 'content', label: 'Content & creative' },
	{ id: 'marketing', label: 'Marketing & community' },
	{ id: 'sales', label: 'Sales & partnerships' },
	{ id: 'product', label: 'Product & engineering' },
	{ id: 'ops', label: 'Ops, finance & people' },
];

const RULES = [
	['ops', /\b(recruit(er|ing)?|talent acquisition|people (partner|ops|operations)|hr\b|human resources|payroll|accountant|accounting|finance|legal|counsel|paralegal|office manager|executive assistant)\b/i],
	['product', /\b(engineer(ing)?|developer|software|data (scien\w*|analy\w*|engineer\w*)|machine learning|\bml\b|\bai\b researcher|ios|android|front.?end|back.?end|full.?stack|devops|sre|security|infrastructure|product (manager|designer|design|lead|owner)|\bqa\b|scientist|architect|technical program|ux|ui designer|product management)\b/i],
	['talent', /\b(talent|creators?|influencers?|youtubers?|streamers?|artist relations|artist partnerships?|creator (partnerships?|success|relations)|(talent|artist) management)\b/i],
	['content', /\b(editor|editing|video|producer|production|writer|writing|content|designer|creative|motion|animat\w*|thumbnail|photograph|cinematograph|camera|shooter|graphic|copywriter|story|showrunner|director of photography|post.?production|social media|podcast|host)\b/i],
	['sales', /\b(sales|account (executive|manager|director)|partnerships?|business development|\bbd\b|client|customer success|revenue|brand deals?|advertis\w*|monetization)\b/i],
	['marketing', /\b(marketing|brand|growth|community|social|communications|\bpr\b|public relations|seo|lifecycle|events?|ambassador)\b/i],
];

export function classify(title) {
	for (const [id, re] of RULES) if (re.test(title)) return id;
	return 'ops';
}

/** For big platforms: keep only roles that work with or for creators. */
const CREATOR_FACING = /\b(creators?|talent|influencers?|partner(ship)?s?|content|community|social|video|youtube|music|artists?|podcasts?|streamers?|esports|gaming partnerships|monetization|editorial|programming)\b/i;
export const isCreatorFacing = (title) => CREATOR_FACING.test(title);
