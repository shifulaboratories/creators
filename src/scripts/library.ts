/**
 * "My guides": saved guides and done checkmarks, kept only in this browser
 * (localStorage). No account, nothing is sent anywhere. See about/privacy.md.
 *
 * Guides are keyed by their content id, e.g. "money/taxes". Every change
 * fires a `sc-library` event on window, and other tabs stay in sync through
 * the `storage` event.
 */
export type Entry = { title: string; section: string; at: number };
export type Library = {
	saved: Record<string, Entry>;
	done: Record<string, Entry>;
	last?: { id: string } & Entry;
};

const KEY = 'sc-library-v1';
const EVENT = 'sc-library';

const empty = (): Library => ({ saved: {}, done: {} });

export function read(): Library {
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
		if (raw && typeof raw === 'object') return { ...empty(), ...raw };
	} catch {}
	return empty();
}

function write(lib: Library) {
	try {
		localStorage.setItem(KEY, JSON.stringify(lib));
	} catch {}
	dispatchEvent(new CustomEvent(EVENT));
}

export function toggle(list: 'saved' | 'done', id: string, meta: Omit<Entry, 'at'>, on?: boolean): boolean {
	const lib = read();
	const next = on ?? !lib[list][id];
	if (next) lib[list][id] = { ...meta, at: Date.now() };
	else delete lib[list][id];
	write(lib);
	return next;
}

export function opened(id: string, meta: Omit<Entry, 'at'>) {
	const lib = read();
	lib.last = { id, ...meta, at: Date.now() };
	try {
		localStorage.setItem(KEY, JSON.stringify(lib));
	} catch {}
}

export function clear() {
	try {
		localStorage.removeItem(KEY);
	} catch {}
	dispatchEvent(new CustomEvent(EVENT));
}

export function onChange(fn: () => void) {
	addEventListener(EVENT, fn);
	addEventListener('storage', (e) => {
		if (e.key === KEY || e.key === null) fn();
	});
}

/** "/money/taxes/" or "https://…/money/taxes/#x" → "money/taxes" */
export const idFromHref = (href: string) => {
	try {
		return new URL(href, location.href).pathname.replace(/^\/|\/$/g, '');
	} catch {
		return '';
	}
};

/**
 * Puts a check on every link to a guide you've finished: the sidebar, the
 * Guides page, and the Up next card. Styling lives in src/styles/library.css.
 */
export function markLinks(scope: ParentNode = document) {
	const { done, saved } = read();
	scope.querySelectorAll<HTMLAnchorElement>('nav.sidebar a[href^="/"], [data-lib-mark] a[href^="/"]').forEach((a) => {
		const id = idFromHref(a.getAttribute('href')!);
		a.toggleAttribute('data-done', !!done[id]);
		a.toggleAttribute('data-saved', !!saved[id]);
	});
}
