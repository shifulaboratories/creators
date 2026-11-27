/**
 * Animated link previews: a 4-second looping MP4 per page, built at deploy.
 * iMessage autoplays a downloadable og:video inline; Discord shows it as an
 * inline player with the static PNG as its first frame. Everyone else keeps the PNG.
 *
 * Satori renders three still layers once (sunset glows, a light sweep, and the
 * text/logo), and ffmpeg moves them: the text rises in, the glows orbit, and a
 * soft light sweeps across. Discord and iMessage show the static PNG until it plays.
 *
 * ffmpeg comes from the ffmpeg-static package (or the system PATH). If neither
 * exists the build still passes: pages simply skip the video tags.
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { GLOW_H, GLOW_W, renderGlowLayer, renderOg, type OgInput } from './og';

const run = promisify(execFile);

function findFfmpeg(): string | undefined {
	const bundled = join(process.cwd(), 'node_modules/ffmpeg-static/ffmpeg');
	if (existsSync(bundled)) return bundled;
	for (const dir of (process.env.PATH ?? '').split(':')) {
		const p = join(dir, 'ffmpeg');
		if (dir && existsSync(p)) return p;
	}
}

export const FFMPEG = findFfmpeg();
/** True when this build can make videos; route middleware only adds og:video then. */
export const HAS_VIDEO = Boolean(FFMPEG) && process.env.OG_VIDEO !== '0';

const SECONDS = 4;
const FPS = 24;

let sweep: Promise<Buffer> | undefined;
const sweepLayer = () =>
	(sweep ??= satori(
		{
			type: 'div',
			props: {
				style: {
					display: 'flex',
					width: 520,
					height: 630,
					backgroundImage:
						'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,236,230,0.16) 50%, rgba(255,255,255,0) 100%)',
				},
			},
		} as never,
		{ width: 520, height: 630, fonts: [] },
	).then((svg) => new Resvg(svg).render().asPng()));

// Bump when the animation changes, so cached videos are rebuilt.
const VERSION = 2;
const CACHE = join(process.cwd(), 'node_modules/.cache/og-video');

/** Cached by content: unchanged pages reuse last build's video when the cache survives. */
export async function renderOgVideo(input: OgInput): Promise<Buffer> {
	const key = createHash('sha1').update(JSON.stringify([VERSION, input])).digest('hex');
	const cached = join(CACHE, `${key}.mp4`);
	if (existsSync(cached)) return readFile(cached);
	const mp4 = await encode(input);
	await mkdir(CACHE, { recursive: true });
	await writeFile(cached, mp4);
	return mp4;
}

async function encode(input: OgInput): Promise<Buffer> {
	if (!FFMPEG) throw new Error('ffmpeg not found');
	const dir = await mkdtemp(join(tmpdir(), 'og-'));
	try {
		const [glow, fg, light] = await Promise.all([renderGlowLayer(input.accent), renderOg(input, 'fg'), sweepLayer()]);
		await Promise.all([
			writeFile(join(dir, 'glow.png'), glow),
			writeFile(join(dir, 'fg.png'), fg),
			writeFile(join(dir, 'sweep.png'), light),
		]);
		const still = (f: string) => ['-loop', '1', '-framerate', String(FPS), '-t', String(SECONDS), '-i', join(dir, f)];
		// Glows orbit within the oversized layer so no edge ever shows; one full orbit per loop.
		const dx = (GLOW_W - 1200) / 2;
		const dy = (GLOW_H - 630) / 2;
		const glowX = `-${dx}+${dx - 20}*sin(2*PI*t/${SECONDS})`;
		const glowY = `-${dy}+${dy - 15}*cos(2*PI*t/${SECONDS})`;
		const sweepX = `if(between(t,1.6,3.0),-520+(t-1.6)/1.4*1720,-2000)`;
		// Text rises 40px and fades in over the first 0.7s (ease-out), then holds.
		const fgY = `40*pow(max(0,1-t/0.7),3)`;
		const out = join(dir, 'out.mp4');
		await run(
			FFMPEG,
			[
				'-y',
				'-loglevel',
				'error',
				'-f',
				'lavfi',
				'-i',
				`color=c=0x08070a:s=1200x630:r=${FPS}:d=${SECONDS}`,
				...still('glow.png'),
				...still('sweep.png'),
				...still('fg.png'),
				'-filter_complex',
				`[0][1]overlay=x='${glowX}':y='${glowY}':eval=frame[a];` +
					`[a][2]overlay=x='${sweepX}':y=0:eval=frame[b];` +
					`[3]format=rgba,fade=t=in:st=0:d=0.6:alpha=1[t];` +
					`[b][t]overlay=x=0:y='${fgY}':eval=frame,noise=alls=2:allf=t,format=yuv420p`,
				'-t',
				String(SECONDS),
				'-c:v',
				'libx264',
				'-profile:v',
				'high',
				'-crf',
				'27',
				'-preset',
				'faster',
				'-movflags',
				'+faststart',
				'-an',
				out,
			],
			{ maxBuffer: 1 << 20 },
		);
		return await readFile(out);
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
}
