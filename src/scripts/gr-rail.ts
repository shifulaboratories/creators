/** Wires up every [data-gr-rail] block: progress dots, arrow buttons, arrow keys. */
export function initRails() {
	document.querySelectorAll<HTMLElement>('[data-gr-rail]').forEach((root) => {
		if (root.dataset.ready) return;
		root.dataset.ready = '1';
		const track = root.querySelector<HTMLElement>('.gr-rail')!;
		const items = [...track.children] as HTMLElement[];
		const dots = [...root.querySelectorAll<HTMLElement>('.gr-dots span')];
		let current = 0;
		const set = (i: number) => {
			current = i;
			dots.forEach((d, j) => d.classList.toggle('on', j === i));
		};
		const go = (i: number) => {
			const n = Math.max(0, Math.min(items.length - 1, i));
			const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
			track.scrollTo({ left: items[n].offsetLeft - items[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
		};
		const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && set(items.indexOf(e.target as HTMLElement))), { root: track, threshold: 0.6 });
		items.forEach((c) => io.observe(c));
		root.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach((b) => b.addEventListener('click', () => go(current + Number(b.dataset.dir))));
		track.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') (e.preventDefault(), go(current + 1));
			if (e.key === 'ArrowLeft') (e.preventDefault(), go(current - 1));
		});
		set(0);
	});
}
