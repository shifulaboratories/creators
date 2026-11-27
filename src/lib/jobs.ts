/**
 * Open roles for /jobs/, read from src/data/jobs.json, which
 * scripts/fetch-jobs.mjs refreshes every day from public job-board feeds.
 */
import data from '../data/jobs.json';
import { ROLES } from '../../scripts/jobs/classify.mjs';

export type Job = {
	id: string;
	company: string;
	kind: Kind;
	title: string;
	role: string;
	location: string;
	remote: boolean;
	url: string;
	source: string;
	posted?: string;
	firstSeen: string;
};
export type Kind = 'platform' | 'tools' | 'agency' | 'studio' | 'commerce';
export type JobSource = { company: string; kind: Kind; source: string; feed: string; board: string; count: number; checked: string };

export const jobs = data.jobs as Job[];
export const jobSources = data.sources as JobSource[];
export const jobsUpdated = data.updated as string;

/** Listings first seen on or after this date count as new: the last 7 days, but never the first run, when everything was "new". */
const day = (iso: string, plus: number) => new Date(Date.parse(iso) + plus * 864e5).toISOString().slice(0, 10);
const since = ((data as { since?: string }).since ?? jobsUpdated) || '';
export const newSince = jobsUpdated ? [day(jobsUpdated, -7), since && day(since, 1)].sort().at(-1)! : '9999';
export const roles = ROLES as { id: string; label: string }[];

export const kinds: { id: Kind; label: string; tint: string }[] = [
	{ id: 'platform', label: 'Platforms', tint: 'var(--sc-ion)' },
	{ id: 'tools', label: 'Creator tools', tint: 'var(--sc-cyan)' },
	{ id: 'agency', label: 'Agencies & marketing', tint: 'var(--sc-amethyst)' },
	{ id: 'studio', label: 'Creator-led companies', tint: 'var(--sc-champagne)' },
	{ id: 'commerce', label: 'Creator commerce', tint: 'var(--sc-jade)' },
];

/** "Nov 27" (or "Nov 27, 2025" outside the current year). */
export function shortDate(iso: string, now = jobsUpdated || iso) {
	const d = new Date(iso + 'T12:00:00Z');
	const sameYear = iso.slice(0, 4) === now.slice(0, 4);
	return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', ...(sameYear ? {} : { year: 'numeric' }), timeZone: 'UTC' });
}
