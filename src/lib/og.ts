/**
 * Renders branded 1200x630 link-preview images at build time with Satori (JSX-like
 * tree to SVG) and resvg (SVG to PNG). Nothing here ships to the browser.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import seal from '../assets/logo.svg?raw';

const font = (pkg: string, file: string) => readFile(join(process.cwd(), 'node_modules/@fontsource', pkg, 'files', file));

let fonts: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
const loadFonts = () =>
	(fonts ??= Promise.all([
		font('syne', 'syne-latin-700-normal.woff'),
		font('syne', 'syne-latin-800-normal.woff'),
		font('geist-sans', 'geist-sans-latin-400-normal.woff'),
		font('geist-sans', 'geist-sans-latin-600-normal.woff'),
	]).then(([s7, s8, g4, g6]) => [
		{ name: 'Syne', data: s7, weight: 700, style: 'normal' },
		{ name: 'Syne', data: s8, weight: 800, style: 'normal' },
		{ name: 'Geist', data: g4, weight: 400, style: 'normal' },
		{ name: 'Geist', data: g6, weight: 600, style: 'normal' },
	]));

const sealSrc = `data:image/svg+xml;base64,${Buffer.from(seal).toString('base64')}`;

// Tiny hyperscript so this file needs no JSX setup.
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): Node => ({
	type,
	props: { style: { display: 'flex', ...style }, children: children.length === 1 ? children[0] : children },
});

const clamp = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

export interface OgInput {
	title: string;
	description?: string;
	kicker?: string;
	accent: string;
}

const glows = (accent: string) =>
	[
		`radial-gradient(circle at 96% 4%, ${accent}66 0%, ${accent}00 40%)`,
		'radial-gradient(circle at 86% 118%, #ff86b870 0%, #ff86b800 42%)',
		'radial-gradient(circle at 108% 70%, #ffb47e5c 0%, #ffb47e00 34%)',
		'radial-gradient(circle at 60% 130%, #c3a6ff3d 0%, #c3a6ff00 38%)',
	].join(', ');

const toPng = async (tree: Node, width: number, height: number) => {
	const svg = await satori(tree as never, { width, height, fonts: await loadFonts() });
	return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
};

/** The sunset glows alone, on a transparent canvas larger than the card so they can drift. */
export const GLOW_W = 1600;
export const GLOW_H = 900;
export function renderGlowLayer(accent: string): Promise<Buffer> {
	return toPng(h('div', { width: GLOW_W, height: GLOW_H, backgroundImage: glows(accent) }), GLOW_W, GLOW_H);
}

/**
 * The full card (`layer: 'full'`), or just its text and logo on a transparent
 * canvas (`layer: 'fg'`) for the animated preview to move the glows behind.
 */
export async function renderOg(
	{ title, description, kicker, accent }: OgInput,
	layer: 'full' | 'fg' = 'full',
): Promise<Buffer> {
	const t = clamp(title, 80);
	const titleSize = t.length > 44 ? 58 : t.length > 22 ? 70 : t.length > 12 ? 88 : 104;
	const tree = h(
		'div',
		{
			// Satori sizes boxes content-box: 1200x630 minus padding.
			width: 1056,
			height: 506,
			flexDirection: 'column',
			justifyContent: 'space-between',
			paddingTop: 64,
			paddingBottom: 60,
			paddingLeft: 72,
			paddingRight: 72,
			...(layer === 'full' ? { backgroundColor: '#08070a', backgroundImage: glows(accent) } : {}),
			color: '#f5f5f4',
			fontFamily: 'Geist',
		},
		// Top: seal + wordmark, section pill
		h(
			'div',
			{ width: 1056, alignItems: 'center', justifyContent: 'space-between' },
			h(
				'div',
				{ alignItems: 'center', gap: 18 },
				{ type: 'img', props: { src: sealSrc, width: 60, height: 60 } },
				h('div', { fontFamily: 'Syne', fontWeight: 700, fontSize: 34, letterSpacing: '-0.01em' }, 'Select Creators'),
			),
			kicker
				? h(
						'div',
						{
							alignItems: 'center',
							gap: 12,
							padding: '10px 22px 10px 18px',
							borderRadius: 999,
							backgroundColor: `${accent}26`,
							color: accent,
							fontSize: 26,
							fontWeight: 600,
						},
						h('div', { width: 12, height: 12, borderRadius: 999, backgroundColor: accent }),
						kicker,
					)
				: h('div', {}),
		),
		// Middle: title + description
		h(
			'div',
			{ flexDirection: 'column', gap: 22, width: 1056 },
			h(
				'div',
				{ fontFamily: 'Syne', fontWeight: 800, fontSize: titleSize, lineHeight: 1.02, letterSpacing: '-0.03em' },
				t,
			),
			description
				? h('div', { fontSize: 30, lineHeight: 1.4, color: '#bdbdbc', maxWidth: 940 }, clamp(description, 130))
				: h('div', {}),
		),
		// Bottom: URL + sunset bar
		h(
			'div',
			{ width: 1056, alignItems: 'center', justifyContent: 'space-between' },
			h('div', { fontSize: 24, color: '#8a8a89', letterSpacing: '0.02em' }, 'Free and open source · creators.select'),
			h('div', {
				width: 220,
				height: 8,
				borderRadius: 999,
				backgroundImage: 'linear-gradient(90deg, #ffb47e, #ff86b8, #c3a6ff)',
			}),
		),
	);
	return toPng(tree, 1200, 630);
}
