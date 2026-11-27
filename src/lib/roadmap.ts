/**
 * Roadmap data for /roadmap/, read once per build. Live from GitHub Issues;
 * if GitHub can't be reached (offline build, rate limit) it falls back to the
 * committed snapshot, refreshed with `npm run roadmap:snapshot`.
 * Set ROADMAP_OFFLINE=1 to always use the snapshot.
 */
import { fetchRoadmap, AREAS, TYPES, REPO, type RoadmapItem, type Column } from './roadmap-core.mjs';
import snapshot from '../data/roadmap-snapshot.json';

export { AREAS, TYPES, REPO };
export type { RoadmapItem, Column };

let cached: Promise<{ items: RoadmapItem[]; live: boolean }> | undefined;

export function loadRoadmap() {
	return (cached ??= (async () => {
		if (process.env.ROADMAP_OFFLINE !== '1') {
			try {
				return { items: await fetchRoadmap({ token: process.env.GITHUB_TOKEN }), live: true };
			} catch (e) {
				console.warn(`[roadmap] GitHub unreachable, using the snapshot: ${(e as Error).message}`);
			}
		}
		return { items: snapshot.items as RoadmapItem[], live: false };
	})());
}

export const COLUMNS: { key: Column; label: string; text: string }[] = [
	{ key: 'now', label: 'Now', text: 'Being built this week' },
	{ key: 'next', label: 'Next', text: 'Up after that' },
	{ key: 'later', label: 'Later', text: 'On the list, not scheduled' },
	{ key: 'shipped', label: 'Shipped', text: 'Live on the site' },
];

const PRIORITY = { P0: 0, P1: 1, P2: 2, P3: 3 } as Record<string, number>;

/** Cards for one column: shipped newest first, the rest by priority then recency. */
export function column(items: RoadmapItem[], key: Column, limit = key === 'shipped' ? 12 : 40) {
	const xs = items.filter((i) => i.column === key);
	xs.sort((a, b) =>
		key === 'shipped'
			? (b.closed ?? '').localeCompare(a.closed ?? '')
			: (PRIORITY[a.priority ?? ''] ?? 9) - (PRIORITY[b.priority ?? ''] ?? 9) || b.updated.localeCompare(a.updated),
	);
	return xs.slice(0, limit);
}
