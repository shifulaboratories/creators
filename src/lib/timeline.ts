/**
 * Platform changelog: the dated entries in src/data/timeline.ts plus every
 * full News update, as one list, newest first. Validates entries so a missing
 * source or a bad date fails the build instead of shipping.
 */
import { TIMELINE, type TimelineEntry, type TimelineKind, type TimelinePlatform, type TimelineSource } from '../data/timeline';
import { getNews, newsPath, newsSlug, isoDate, NEWS_PLATFORM_INFO, KIND_LABEL } from './news';

export { NEWS_PLATFORM_INFO, KIND_LABEL };

export interface ChangelogItem {
	id: string;
	/** Sort key, YYYY-MM-DD (month-only dates sort as the 1st). */
	sortDate: string;
	/** As written: YYYY-MM-DD or YYYY-MM. */
	date: string;
	year: string;
	label: string;
	platform: TimelinePlatform;
	kind: TimelineKind;
	title: string;
	what: string;
	big: boolean;
	official: boolean;
	effective?: string;
	sources: TimelineSource[];
	/** Our full News update, when there is one. */
	newsHref?: string;
	guide?: string;
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const MONTH = /^\d{4}-\d{2}$/;
const fmtDay = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const fmtMon = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function dateLabel(date: string): string {
	if (DAY.test(date)) return fmtDay.format(new Date(`${date}T00:00:00Z`));
	return fmtMon.format(new Date(`${date}-01T00:00:00Z`));
}

/** Throws with every problem at once, so one build run shows them all. */
export function validateTimeline(entries: TimelineEntry[]): void {
	const problems: string[] = [];
	const ids = new Set<string>();
	for (const e of entries) {
		const at = `timeline entry "${e.id}"`;
		if (!/^[a-z0-9-]+$/.test(e.id)) problems.push(`${at}: id must be lowercase letters, numbers and dashes`);
		if (ids.has(e.id)) problems.push(`${at}: duplicate id`);
		ids.add(e.id);
		if (!DAY.test(e.date) && !MONTH.test(e.date)) problems.push(`${at}: date must be YYYY-MM-DD or YYYY-MM`);
		else if (Number.isNaN(new Date(DAY.test(e.date) ? e.date : `${e.date}-01`).getTime())) problems.push(`${at}: not a real date`);
		if (!NEWS_PLATFORM_INFO[e.platform]) problems.push(`${at}: unknown platform`);
		if (!KIND_LABEL[e.kind]) problems.push(`${at}: unknown kind`);
		if (!e.title || e.title.length > 80) problems.push(`${at}: title must be 1-80 characters`);
		if (!e.what || e.what.length > 320) problems.push(`${at}: what must be 1-320 characters`);
		if (!e.sources?.length) problems.push(`${at}: needs at least one source`);
		for (const s of e.sources ?? []) {
			if (!/^https:\/\/[^\s]+$/.test(s.url)) problems.push(`${at}: source URL must be https: ${s.url}`);
			if (!s.publisher) problems.push(`${at}: source needs a publisher`);
		}
	}
	if (problems.length) throw new Error(`Platform changelog has problems:\n- ${problems.join('\n- ')}`);
}

export async function getChangelog(): Promise<ChangelogItem[]> {
	validateTimeline(TIMELINE);
	const fromData: ChangelogItem[] = TIMELINE.map((e) => ({
		id: e.id,
		sortDate: DAY.test(e.date) ? e.date : `${e.date}-01`,
		date: e.date,
		year: e.date.slice(0, 4),
		label: dateLabel(e.date),
		platform: e.platform,
		kind: e.kind,
		title: e.title,
		what: e.what,
		big: !!e.big,
		official: e.sources.some((s) => s.official),
		effective: e.effective,
		sources: e.sources,
		guide: e.guide,
	}));
	const fromNews: ChangelogItem[] = (await getNews()).map((n) => {
		const d = isoDate(n.data.announced);
		return {
			id: `news-${newsSlug(n)}`,
			sortDate: d,
			date: d,
			year: d.slice(0, 4),
			label: dateLabel(d),
			platform: n.data.platform,
			kind: n.data.kind,
			title: n.data.title,
			what: n.data.summary,
			big: n.data.impact === 'high',
			official: n.data.confirmed === 'official',
			effective: n.data.effective,
			sources: n.data.sources.map((s) => ({ publisher: s.publisher, url: s.url, official: s.official })),
			newsHref: newsPath(n),
			guide: n.data.guide,
		};
	});
	return [...fromData, ...fromNews].sort((a, b) => b.sortDate.localeCompare(a.sortDate) || a.title.localeCompare(b.title));
}
