/**
 * The Select seal as a real 3D object (three.js), with platform icons on
 * extruded glass tiles orbiting it. Loaded lazily by Seal3D.astro so the page
 * paints first. Renders only while on screen and the tab is visible.
 *
 * Phone budget: setup is split into small steps that hand the main thread back
 * between them, shaders compile in the background (compileAsync), and a frame
 * governor lowers the resolution, then the frame rate, if the device can't keep
 * up, so scrolling never stutters because of the hero.
 */
import {
	ACESFilmicToneMapping,
	CanvasTexture,
	Color,
	CurvePath,
	DirectionalLight,
	ExtrudeGeometry,
	Group,
	LineCurve3,
	Mesh,
	MeshBasicMaterial,
	MeshPhysicalMaterial,
	PerspectiveCamera,
	PlaneGeometry,
	PMREMGenerator,
	PointLight,
	Scene,
	Shape,
	SphereGeometry,
	SRGBColorSpace,
	TubeGeometry,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { siInstagram, siPatreon, siSpotify, siSubstack, siTiktok, siTwitch, siX, siYoutube } from 'simple-icons';

type Icon = { path: string; hex: string };
const ICONS: Icon[] = [siYoutube, siTiktok, siInstagram, siX, siTwitch, siSubstack, siPatreon, siSpotify];

const SEAL_DEPTH = 6;
const BEVEL = 1.3;
const RING_R = 58;
const RING_LIFT = 0.26; // how far the back of the ring rises above the seal

function outlineShape(d: string) {
	const nums = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
	const pts: Vector2[] = [];
	for (let i = 0; i < nums.length; i += 2) pts.push(new Vector2(nums[i] - 32, 32 - nums[i + 1]));
	return new Shape(pts);
}

function iconTexture(icon: Icon) {
	const s = 256;
	const c = document.createElement('canvas');
	c.width = c.height = s;
	const g = c.getContext('2d')!;
	const dark = parseInt(icon.hex, 16) < 0x333333;
	g.fillStyle = dark ? '#f4f2f7' : `#${icon.hex}`;
	g.translate(s * 0.18, s * 0.18);
	g.scale((s * 0.64) / 24, (s * 0.64) / 24);
	g.fill(new Path2D(icon.path));
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 4;
	return t;
}

// Give the main thread back so taps and scrolls are handled between setup steps.
const yieldToMain = () =>
	new Promise<void>((r) => {
		const s = (globalThis as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
		if (s?.yield) s.yield().then(r);
		else setTimeout(r, 0);
	});

export async function mountSeal(host: HTMLElement, outlinePath: string) {
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	// Phones have dense screens, so multisampling buys little and costs a lot of GPU time.
	const phone = host.clientWidth < 500 || matchMedia('(pointer: coarse)').matches;
	const renderer = new WebGLRenderer({ antialias: !phone, alpha: true, powerPreference: phone ? 'default' : 'high-performance' });
	renderer.toneMapping = ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.05;
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.setClearColor(0x000000, 0);
	const canvas = renderer.domElement;
	canvas.className = 's3d-canvas';
	canvas.setAttribute('aria-hidden', 'true');
	host.appendChild(canvas);

	const scene = new Scene();
	await yieldToMain();
	const pmrem = new PMREMGenerator(renderer);
	scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	pmrem.dispose();
	await yieldToMain();

	// Brand-colored rim lights so the metal picks up pink and lilac.
	const rose = new PointLight(new Color('#ff86b8'), 9000, 0, 2);
	rose.position.set(-90, 40, 60);
	const lilac = new PointLight(new Color('#c3a6ff'), 9000, 0, 2);
	lilac.position.set(90, -30, 50);
	const key = new DirectionalLight(0xffffff, 1.4);
	key.position.set(30, 80, 120);
	scene.add(rose, lilac, key);

	const camera = new PerspectiveCamera(30, 1, 1, 1000);

	// ---- The seal ----
	const seal = new Group();
	const body = new ExtrudeGeometry(outlineShape(outlinePath), {
		depth: SEAL_DEPTH,
		bevelEnabled: true,
		bevelThickness: BEVEL,
		bevelSize: 1.1,
		bevelSegments: 5,
		curveSegments: 1,
	});
	body.translate(0, 0, -SEAL_DEPTH / 2);
	const face = new MeshPhysicalMaterial({ color: 0x0c0b0e, metalness: 0.55, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.12 });
	const edge = new MeshPhysicalMaterial({ color: 0xd8d6dc, metalness: 1, roughness: 0.22 });
	seal.add(new Mesh(body, [face, edge]));

	// The check: a chrome tube raised off the face, with rounded ends.
	const front = SEAL_DEPTH / 2 + BEVEL;
	const raise = front + 2.2;
	const pts = [
		[20.4, 32.9],
		[28.1, 40.5],
		[43.8, 24.8],
	].map(([x, y]) => new Vector3(x - 32, 32 - y, raise));
	const path = new CurvePath<Vector3>();
	path.add(new LineCurve3(pts[0], pts[1]));
	path.add(new LineCurve3(pts[1], pts[2]));
	const chrome = new MeshPhysicalMaterial({ color: 0xf6f4f8, metalness: 1, roughness: 0.12, clearcoat: 1 });
	const r = 2.7;
	seal.add(new Mesh(new TubeGeometry(path, 64, r, 24, false), chrome));
	const cap = new SphereGeometry(r, 24, 16);
	for (const p of pts) {
		const m = new Mesh(cap, chrome);
		m.position.copy(p);
		seal.add(m);
	}
	scene.add(seal);
	await yieldToMain();

	// ---- Orbiting platform tiles ----
	const tileGeo = new RoundedBoxGeometry(15, 15, 4.5, 4, 3);
	const tileMat = new MeshPhysicalMaterial({ color: 0x16141a, metalness: 0.3, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.2 });
	const glyphGeo = new PlaneGeometry(13, 13);
	const tiles = ICONS.map((icon) => {
		const t = new Group();
		t.add(new Mesh(tileGeo, tileMat));
		const glyph = new Mesh(glyphGeo, new MeshBasicMaterial({ map: iconTexture(icon), transparent: true, toneMapped: false }));
		glyph.position.z = 2.3;
		t.add(glyph);
		scene.add(t);
		return t;
	});

	// Resolution cap; the frame governor below can lower it.
	let maxDpr = phone ? 1.5 : 2;

	// ---- Sizing: fit the whole orbit inside the box, whatever its shape ----
	const fit = () => {
		const w = host.clientWidth;
		const h = host.clientHeight;
		if (!w || !h) return;
		renderer.setPixelRatio(Math.min(devicePixelRatio, maxDpr));
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		const needW = RING_R * 2 + 26;
		const needH = 88;
		const tan = Math.tan((camera.fov * Math.PI) / 360);
		const dist = Math.max(needH / 2 / tan, needW / 2 / (tan * camera.aspect));
		camera.position.set(0, 0, dist + 20);
		camera.lookAt(0, 0, 0);
		camera.updateProjectionMatrix();
		draw();
	};

	// ---- Interaction: drag to spin (horizontal only, so the page still scrolls) ----
	let spin = 0;
	let vel = 0;
	let tiltX = 0;
	let tiltY = 0;
	let dragging = false;
	let lastX = 0;
	canvas.addEventListener('pointerdown', (e) => {
		dragging = true;
		lastX = e.clientX;
		vel = 0;
	});
	addEventListener('pointerup', () => (dragging = false), { passive: true });
	addEventListener('pointercancel', () => (dragging = false), { passive: true });
	canvas.addEventListener(
		'pointermove',
		(e) => {
			if (dragging) {
				const dx = e.clientX - lastX;
				lastX = e.clientX;
				vel = dx * 0.012;
				spin += vel;
				wake();
			}
		},
		{ passive: true },
	);
	if (matchMedia('(hover: hover)').matches && !reduce) {
		addEventListener(
			'pointermove',
			(e) => {
				tiltY = (e.clientX / innerWidth - 0.5) * 0.5;
				tiltX = (e.clientY / innerHeight - 0.5) * 0.3;
			},
			{ passive: true },
		);
	}

	// ---- Loop: runs only while visible ----
	let t = 0;
	let last = 0;
	let raf = 0;
	let onScreen = true;
	let curX = 0;
	let curY = 0;
	const tmp = new Vector3();

	function draw() {
		const sway = reduce ? -0.35 : Math.sin(t * 0.55) * 0.42;
		curX += (tiltX + (reduce ? 0.08 : Math.sin(t * 0.4) * 0.1) - curX) * 0.06;
		curY += (tiltY - curY) * 0.06;
		seal.rotation.set(curX, sway + spin + curY, 0);
		seal.position.y = reduce ? 0 : Math.sin(t * 1.05) * 1.6;

		const base = reduce ? 0.4 : t * 0.22;
		tiles.forEach((tile, i) => {
			const a = base + (i / tiles.length) * Math.PI * 2;
			tmp.set(Math.cos(a) * RING_R, Math.sin(a) * RING_R * RING_LIFT, Math.sin(a) * RING_R * 0.9);
			tile.position.copy(tmp);
			// Turn as they travel so you see their edges, and dip with the ring.
			tile.rotation.set(-0.18, -Math.cos(a) * 0.75, 0);
			const s = 0.82 + (Math.sin(a) + 1) * 0.12;
			tile.scale.setScalar(s);
		});
		renderer.render(scene, camera);
	}

	// Frame governor: if frames take too long, first drop the resolution, then
	// run at half rate. Judged on the median of a sample so one hiccup doesn't count.
	let sample: number[] = [];
	let level = 0;
	let skip = false;
	function govern(ms: number) {
		if (level >= 2 || !ms) return;
		sample.push(ms);
		if (sample.length < 40) return;
		sample.sort((a, b) => a - b);
		const median = sample[20];
		sample = [];
		if (median < 22) return;
		level++;
		if (level === 1 && maxDpr > 1) {
			maxDpr = 1;
			fit();
		} else level = 2;
	}

	function frame(now: number) {
		raf = 0;
		const gap = last ? now - last : 0;
		if (level === 2 && (skip = !skip)) {
			raf = requestAnimationFrame(frame);
			return;
		}
		const dt = Math.min(0.05, gap / 1000);
		last = now;
		if (level < 2) govern(gap);
		if (!dragging) {
			spin += vel;
			vel *= 0.94;
			// Ease the spin back toward a front-facing angle when let go.
			if (Math.abs(vel) < 0.002) spin += (Math.round(spin / (Math.PI * 2)) * Math.PI * 2 - spin) * 0.04;
		}
		t += dt;
		draw();
		if (onScreen && !document.hidden && (!reduce || dragging || Math.abs(vel) > 0.001)) raf = requestAnimationFrame(frame);
	}
	function wake() {
		if (!raf) {
			last = 0;
			raf = requestAnimationFrame(frame);
		}
	}

	// Compile every shader off the main thread where the browser allows it,
	// so the first frame doesn't freeze the page.
	await renderer.compileAsync(scene, camera);
	new ResizeObserver(fit).observe(host);
	new IntersectionObserver(([e]) => {
		onScreen = e.isIntersecting;
		if (onScreen && !reduce) wake();
	}).observe(host);
	document.addEventListener('visibilitychange', () => !document.hidden && onScreen && !reduce && wake());

	fit();
	if (!reduce) wake();
	host.classList.add('is-3d');
}
