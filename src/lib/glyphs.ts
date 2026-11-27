/**
 * Picks the symbol shown on a guide's 3D cover tile: a platform's own logo
 * (Simple Icons, used to name the platform) when the guide is about one
 * platform, otherwise a line icon matched to the topic.
 */
import {
	siFacebook,
	siInstagram,
	siKofi,
	siOnlyfans,
	siPatreon,
	siPinterest,
	siSnapchat,
	siSubstack,
	siThreads,
	siTiktok,
	siTwitch,
	siX,
	siYoutube,
} from 'simple-icons';
import { topicIcons } from '../data/topic-icons';

export type Glyph = { kind: 'brand' | 'line' | 'text'; d: string };

const brands: [RegExp, string][] = [
	[/\binstagram\b/, siInstagram.path],
	[/\btiktok\b/, siTiktok.path],
	[/\byoutube\b/, siYoutube.path],
	[/\bfacebook\b/, siFacebook.path],
	[/\bthreads\b/, siThreads.path],
	[/\bpinterest\b/, siPinterest.path],
	[/\bsnapchat\b/, siSnapchat.path],
	[/\btwitch\b/, siTwitch.path],
	[/\bonlyfans\b/, siOnlyfans.path],
	[/\bpatreon\b/, siPatreon.path],
	[/\bko-?fi\b/, siKofi.path],
	[/\bsubstack\b/, siSubstack.path],
	[/\bx \(twitter\)|\bx's\b|^x\b/, siX.path],
];

/** Extra line icons for common topics (24px grid, stroked). */
export const lineIcons: Record<string, string> = {
	...topicIcons,
	megaphone: 'M3 10v4h3l6 4V6L6 10zM16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12',
	chat: 'M4 5h16v11H8l-4 4zM8 9h8M8 12h5',
	doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5',
	pen: 'M4 20l4-1 11-11-3-3L5 16zM14 6l3 3',
	card: 'M3 6h18v12H3zM3 10h18M7 15h4',
	tag: 'M3 12V4h8l10 10-8 8zM7.5 8.5h.01',
	mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
	mic: 'M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
	hook: 'M14 4v9a5 5 0 0 1-10 0v-1M14 4l3 3M14 4l-3 3',
	clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 3',
	flask: 'M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L14 9V3M7.5 15h9',
	repeat: 'M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4',
	target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
	bank: 'M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18',
	globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18',
	key: 'M8 14a4 4 0 1 1 3.5-6H21v3h-2v3h-3v-3h-4.5A4 4 0 0 1 8 14z',
	ban: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.6 5.6l12.8 12.8',
	user: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
	alert: 'M12 3l10 18H2zM12 10v4M12 17.5h.01',
	box: 'M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10',
	play: 'M5 3l15 9-15 9z',
	camera: 'M3 7h4l2-3h6l2 3h4v13H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
	link: 'M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1',
};

const topics: [RegExp, string][] = [
	[/pitch/, 'megaphone'],
	[/negotiat|script/, 'chat'],
	[/redline|contract|clause|terms/, 'pen'],
	[/rate|pric|calculator|commission/, 'earn'],
	[/getting paid|invoice|payout/, 'card'],
	[/disclos|sponsor/, 'tag'],
	[/newsletter|email/, 'mail'],
	[/podcast/, 'mic'],
	[/hook/, 'hook'],
	[/cadence|schedul|time/, 'clock'],
	[/experiment|test/, 'flask'],
	[/repurpos/, 'repeat'],
	[/niche/, 'target'],
	[/analytic|research|algorithm|recommend|feed|signal/, 'algorithms'],
	[/tax|set aside|write-off|deduct/, 'money'],
	[/bank|bookkeep/, 'bank'],
	[/international|abroad|cross-border/, 'globe'],
	[/llc|s corp|entity/, 'box'],
	[/hack|locked|security|password/, 'key'],
	[/ban|strike|copyright/, 'ban'],
	[/imperson|fake/, 'user'],
	[/scam|red flag/, 'alert'],
	[/manager|agent|agenc|hire|team|lawyer/, 'team'],
	[/case stud|how .* grew/, 'case-studies'],
	[/media kit|link in bio/, 'link'],
	[/gear|camera|setup/, 'camera'],
	[/video|watch/, 'play'],
];

/** The cover symbol for a guide or resource. */
export function glyphFor(texts: string | (string | undefined)[], section: string): Glyph {
	const parts = (Array.isArray(texts) ? texts : [texts]).filter((x): x is string => !!x).map((x) => x.toLowerCase().trim());
	if (parts.some((x) => x === 'x')) return { kind: 'brand', d: siX.path };
	const t = parts.join(' · ');
	for (const [re, d] of brands) if (re.test(t)) return { kind: 'brand', d };
	if (/\blinkedin\b/.test(t)) return { kind: 'text', d: 'in' };
	for (const [re, key] of topics) if (re.test(t)) return { kind: 'line', d: lineIcons[key] };
	return { kind: 'line', d: lineIcons[section] ?? lineIcons.shortlist };
}
