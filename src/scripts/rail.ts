/**
 * Swipe rails: on phones, card grids become horizontal, snapping rows.
 * This adds the page dots under each rail and keeps them in sync.
 */
const mq = matchMedia('(max-width: 39.99rem)');

function setup(rail: HTMLElement) {
	if (rail.dataset.railReady) return;
	const cards = [...rail.children] as HTMLElement[];
	if (cards.length < 2) return;
	rail.dataset.railReady = '1';
	const dots = document.createElement('div');
	dots.className = 'sc-rail-dots not-content';
	dots.setAttribute('aria-hidden', 'true');
	cards.forEach(() => dots.appendChild(document.createElement('span')));
	rail.after(dots);
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				const i = cards.indexOf(e.target as HTMLElement);
				[...dots.children].forEach((d, j) => d.classList.toggle('on', j === i));
			}
		},
		{ root: rail, threshold: 0.6 },
	);
	cards.forEach((c) => io.observe(c));
}

function init() {
	document.querySelectorAll<HTMLElement>('[data-rail]').forEach(setup);
}
if (mq.matches) init();
mq.addEventListener('change', (e) => e.matches && init());
