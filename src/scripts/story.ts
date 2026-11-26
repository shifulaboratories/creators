/**
 * Instagram Story share cards (1080x1920), drawn in the browser on a canvas so
 * any stat, including numbers a widget computes live, can become a card.
 * Loaded only when someone taps a share-to-Story button, so it costs nothing up front.
 *
 * Keep content inside Instagram's safe zone: roughly 250px clear at the top
 * and 340px at the bottom, where the app draws its own buttons.
 */

export interface StoryInput {
	/** Big number or short phrase, like "4.5x" or "1 in 3". Leave out for a plain page card. */
	value?: string;
	/** What the number means, one sentence. */
	label?: string;
	/** Where the number comes from. Shown small. */
	source?: string;
	/** Page or guide title. */
	title: string;
	/** Section name for the pill, like "The algorithm". */
	kicker?: string;
	/** Hex color for the section glow. */
	accent?: string;
	/** Link printed on the card (defaults to this page). */
	url?: string;
}

const W = 1080;
const H = 1920;
const X = 96; // side margin
const INNER = W - X * 2;
const SANS = '"Geist Variable", Geist, system-ui, sans-serif';
const DISPLAY = '"Syne Variable", Syne, "Geist Variable", system-ui, sans-serif';

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number, maxLines = 99): string[] {
	const words = text.split(/\s+/).filter(Boolean);
	const lines: string[] = [];
	let line = '';
	for (const w of words) {
		const next = line ? `${line} ${w}` : w;
		if (ctx.measureText(next).width > max && line) {
			lines.push(line);
			line = w;
		} else line = next;
	}
	if (line) lines.push(line);
	if (lines.length > maxLines) {
		const cut = lines.slice(0, maxLines);
		cut[maxLines - 1] = cut[maxLines - 1].replace(/\s*\S*$/, '') + '…';
		return cut;
	}
	return lines;
}

function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
	const g = ctx.createRadialGradient(x, y, 0, x, y, r);
	g.addColorStop(0, hexA(color, alpha));
	g.addColorStop(1, hexA(color, 0));
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, W, H);
}

function hexA(hex: string, a: number) {
	const m = hex.trim().match(/^#?([0-9a-f]{6})$/i);
	if (!m) return `rgba(255,134,184,${a})`;
	const n = parseInt(m[1], 16);
	return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, fg: string, bg: string, dot = true) {
	ctx.font = `600 34px ${SANS}`;
	const tw = ctx.measureText(text).width;
	const padL = dot ? 62 : 30;
	const w = tw + padL + 30;
	const h = 68;
	ctx.fillStyle = bg;
	ctx.beginPath();
	ctx.roundRect(x, y, w, h, h / 2);
	ctx.fill();
	if (dot) {
		ctx.fillStyle = fg;
		ctx.beginPath();
		ctx.arc(x + 36, y + h / 2, 8, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.fillStyle = fg;
	ctx.textBaseline = 'middle';
	ctx.fillText(text, x + padL, y + h / 2 + 1);
	ctx.textBaseline = 'alphabetic';
	return w;
}

const loadImage = (src: string) =>
	new Promise<HTMLImageElement>((res, rej) => {
		const i = new Image();
		i.onload = () => res(i);
		i.onerror = rej;
		i.src = src;
	});

export async function drawStory(input: StoryInput): Promise<Blob> {
	const accent = input.accent || '#ff86b8';
	const url = new URL(input.url || location.pathname, location.origin);
	await Promise.all([
		document.fonts.load(`800 120px "Syne Variable"`),
		document.fonts.load(`700 48px "Syne Variable"`),
		document.fonts.load(`500 40px "Geist Variable"`),
	]).catch(() => {});

	const c = document.createElement('canvas');
	c.width = W;
	c.height = H;
	const ctx = c.getContext('2d')!;

	// Canvas and sunset glows
	ctx.fillStyle = '#08070a';
	ctx.fillRect(0, 0, W, H);
	glow(ctx, W * 0.95, 260, 900, accent, 0.42);
	glow(ctx, 120, H - 120, 1000, '#ff86b8', 0.3);
	glow(ctx, W + 60, H * 0.68, 760, '#ffb47e', 0.28);
	glow(ctx, W * 0.4, H + 200, 900, '#c3a6ff', 0.26);

	// Brand row (y 250 to 340)
	try {
		const seal = await loadImage('/favicon.svg');
		ctx.drawImage(seal, X, 250, 88, 88);
	} catch {}
	ctx.fillStyle = '#f5f5f4';
	ctx.font = `700 46px ${DISPLAY}`;
	ctx.fillText('Select Creators', X + 112, 310);

	let y = 450;
	if (input.kicker) {
		pill(ctx, X, y, input.kicker, accent, hexA(accent, 0.16));
		y += 140;
	} else y += 60;

	if (input.value) {
		// Fit the big value to the width, up to 340px tall.
		let size = 340;
		ctx.font = `800 ${size}px ${DISPLAY}`;
		while (ctx.measureText(input.value).width > INNER && size > 120) {
			size -= 10;
			ctx.font = `800 ${size}px ${DISPLAY}`;
		}
		const grad = ctx.createLinearGradient(X, 0, X + Math.min(INNER, ctx.measureText(input.value).width), 0);
		grad.addColorStop(0, '#ffb47e');
		grad.addColorStop(0.5, '#ff86b8');
		grad.addColorStop(1, '#c3a6ff');
		ctx.fillStyle = grad;
		y += size * 0.8;
		ctx.fillText(input.value, X - size * 0.03, y);
		y += size * 0.3 + 70;
		if (input.label) {
			ctx.fillStyle = '#f5f5f4';
			ctx.font = `600 58px ${SANS}`;
			for (const l of wrap(ctx, input.label, INNER, 5)) {
				ctx.fillText(l, X, y);
				y += 72;
			}
			y += 40;
		}
		ctx.fillStyle = '#bdbdbc';
		ctx.font = `500 40px ${SANS}`;
		for (const l of wrap(ctx, `From “${input.title}”`, INNER, 2)) {
			ctx.fillText(l, X, y);
			y += 54;
		}
	} else {
		ctx.fillStyle = '#f5f5f4';
		let size = 128;
		ctx.font = `800 ${size}px ${DISPLAY}`;
		let lines = wrap(ctx, input.title, INNER);
		while (lines.length > 4 && size > 84) {
			size -= 8;
			ctx.font = `800 ${size}px ${DISPLAY}`;
			lines = wrap(ctx, input.title, INNER);
		}
		for (const l of lines.slice(0, 5)) {
			y += size * 0.98;
			ctx.fillText(l, X - 4, y);
		}
		y += 110;
		if (input.label) {
			ctx.fillStyle = '#bdbdbc';
			ctx.font = `500 50px ${SANS}`;
			for (const l of wrap(ctx, input.label, INNER, 5)) {
				ctx.fillText(l, X, y);
				y += 66;
			}
		}
	}

	if (input.source) {
		y += 30;
		ctx.fillStyle = '#8a8a89';
		ctx.font = `500 32px ${SANS}`;
		for (const l of wrap(ctx, `Source: ${input.source}`, INNER, 3)) {
			ctx.fillText(l, X, y);
			y += 44;
		}
	}

	// Link card, kept above Instagram's bottom bar (ends at y 1560).
	const cardY = 1330;
	ctx.fillStyle = 'rgba(255,255,255,0.06)';
	ctx.strokeStyle = 'rgba(255,255,255,0.18)';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.roundRect(X, cardY, INNER, 230, 44);
	ctx.fill();
	ctx.stroke();
	pill(ctx, X + 40, cardY + 40, 'Free guide', '#08070a', '#dcff6b', false);
	ctx.fillStyle = '#f5f5f4';
	ctx.font = `700 50px ${DISPLAY}`;
	const shown = (url.host + url.pathname).replace(/\/$/, '');
	let linkText = shown;
	while (ctx.measureText(linkText).width > INNER - 80 && linkText.length > 12) linkText = linkText.slice(0, -2);
	if (linkText !== shown) linkText = linkText.slice(0, -1) + '…';
	ctx.fillText(linkText, X + 40, cardY + 180);
	const bar = ctx.createLinearGradient(X, 0, X + INNER, 0);
	bar.addColorStop(0, '#ffb47e');
	bar.addColorStop(0.5, '#ff86b8');
	bar.addColorStop(1, '#c3a6ff');
	ctx.fillStyle = bar;
	ctx.beginPath();
	ctx.roundRect(X + INNER - 260, cardY + 68, 220, 10, 5);
	ctx.fill();

	return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('toBlob failed'))), 'image/png'));
}

const slug = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 50) || 'story';

/** Draws the card and opens a sheet to share it, save it, or copy the link. */
export async function openStory(input: StoryInput) {
	const blob = await drawStory(input);
	const file = new File([blob], `select-creators-${slug(input.value ? `${input.value} ${input.title}` : input.title)}.png`, {
		type: 'image/png',
	});
	const href = URL.createObjectURL(blob);
	const link = new URL(input.url || location.pathname, location.origin).href;

	const dlg = document.createElement('dialog');
	dlg.className = 'sc-story';
	dlg.setAttribute('aria-label', 'Share to your Story');
	dlg.innerHTML = `
		<form method="dialog" class="sc-story__close"><button aria-label="Close">×</button></form>
		<img src="${href}" width="270" height="480" alt="Story card preview" />
		<div class="sc-story__side">
			<p class="sc-story__title">Share to your Story</p>
			<ol>
				<li>Save or share the image.</li>
				<li>Post it to your Instagram or TikTok Story.</li>
				<li>Add a Link sticker and paste the link.</li>
			</ol>
			<div class="sc-story__btns">
				<button type="button" data-act="share" hidden>Share image</button>
				<a download="${file.name}" href="${href}" data-act="save">Save image</a>
				<button type="button" data-act="copy">Copy link</button>
			</div>
		</div>`;
	document.body.append(dlg);
	const shareBtn = dlg.querySelector<HTMLButtonElement>('[data-act="share"]')!;
	if (navigator.canShare?.({ files: [file] })) {
		shareBtn.hidden = false;
		shareBtn.addEventListener('click', () => navigator.share({ files: [file] }).catch(() => {}));
	}
	const copy = dlg.querySelector<HTMLButtonElement>('[data-act="copy"]')!;
	copy.addEventListener('click', async () => {
		try {
			await navigator.clipboard.writeText(link);
			copy.textContent = 'Link copied ✓';
		} catch {
			copy.textContent = link;
		}
	});
	dlg.addEventListener('click', (e) => e.target === dlg && dlg.close());
	dlg.addEventListener('close', () => {
		URL.revokeObjectURL(href);
		dlg.remove();
	});
	dlg.showModal();
}
