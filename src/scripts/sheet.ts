/**
 * Bottom sheets: a <dialog class="sc-sheet"> that slides up on phones and sits
 * centered on larger screens. Open with any element carrying
 * data-sheet-open="<dialog id>"; close with Escape, a tap on the backdrop, a
 * [data-sheet-close] button, or by dragging the sheet down.
 */
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function closeSheet(d: HTMLDialogElement): Promise<void> {
	if (!d.open) return Promise.resolve();
	if (reduced()) {
		d.close();
		return Promise.resolve();
	}
	d.classList.add('is-closing');
	return new Promise((done) => {
		const finish = () => {
			d.classList.remove('is-closing');
			d.style.removeProperty('--drag');
			d.close();
			done();
		};
		d.addEventListener('animationend', finish, { once: true });
		setTimeout(finish, 400); // in case the animation never runs
	});
}

export function openSheet(d: HTMLDialogElement) {
	if (d.open) return;
	d.style.removeProperty('--drag');
	d.showModal();
}

function wireDrag(d: HTMLDialogElement) {
	let startY = 0;
	let startT = 0;
	let dy = 0;
	let dragging = false;
	d.addEventListener(
		'touchstart',
		(e) => {
			// Only drag from the top of the sheet, or anywhere when it isn't scrolled.
			const t = e.target as HTMLElement;
			if (t.closest('a, button, input') && !t.closest('[data-sheet-grab]')) return;
			if (d.scrollTop > 0) return;
			startY = e.touches[0].clientY;
			startT = performance.now();
			dy = 0;
			dragging = true;
			d.classList.add('is-dragging');
		},
		{ passive: true },
	);
	d.addEventListener(
		'touchmove',
		(e) => {
			if (!dragging) return;
			dy = Math.max(0, e.touches[0].clientY - startY);
			d.style.setProperty('--drag', `${dy}px`);
		},
		{ passive: true },
	);
	const end = () => {
		if (!dragging) return;
		dragging = false;
		d.classList.remove('is-dragging');
		const v = dy / Math.max(1, performance.now() - startT);
		if (dy > 90 || (dy > 24 && v > 0.5)) closeSheet(d);
		else d.style.removeProperty('--drag');
	};
	d.addEventListener('touchend', end);
	d.addEventListener('touchcancel', end);
}

let wired = false;
export function initSheets() {
	if (wired) return;
	wired = true;
	document.addEventListener('click', (e) => {
		const t = e.target as HTMLElement;
		const opener = t.closest<HTMLElement>('[data-sheet-open]');
		if (opener) {
			const d = document.getElementById(opener.dataset.sheetOpen!) as HTMLDialogElement | null;
			if (d) {
				e.preventDefault();
				openSheet(d);
			}
			return;
		}
		const d = t.closest<HTMLDialogElement>('dialog.sc-sheet');
		if (!d) return;
		// A click on the dialog itself (not its contents) is a click on the backdrop.
		if (t === d || t.closest('[data-sheet-close]')) closeSheet(d);
	});
	for (const d of document.querySelectorAll<HTMLDialogElement>('dialog.sc-sheet')) {
		d.addEventListener('cancel', (e) => {
			e.preventDefault();
			closeSheet(d);
		});
		wireDrag(d);
	}
}
