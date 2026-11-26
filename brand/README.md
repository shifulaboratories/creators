# Select Creators brand system

The feeling: exclusive, premium, tech-forward. A private members' club that happens to be open to everyone. Black, warm grey and brushed metal set the stage; jewel-toned light and motion make it alive. It should feel cool to look at, never like reading a wiki, and it should teach visually: diagrams and infographics before paragraphs.

Working name: **Select Creators** · domain **creators.select** · Instagram **@selectcreators**.

## The mark: the Select Seal

A verification badge, the way social platforms mark a verified account: a scalloped rosette seal with a check inside. Ours is matte black with a titanium edge and a smooth platinum check, so it reads as "verified" instantly but belongs to us.

What makes it ours and not a copy of any platform's badge:

- **Twelve soft scallops.** Instagram, Meta and X badges use eight broad lobes in brand blue. Twelve finer scallops read as a minted seal or a coin edge.
- **Black and metal, never blue.** The seal is obsidian with a brushed edge; the check is platinum.
- **A smooth check.** One continuous stroke with rounded ends and a rounded corner, in brushed platinum.
- **Grid**: 64 × 64. Geometry lives in [`logo/generate.py`](logo/generate.py); edit it there and regenerate, never redraw by hand.

### Files

| File | Use |
| --- | --- |
| `logo/mark-animated.svg` | The mark's animated intro, for heroes and loading states. |
| `logo/mark.svg` | Primary. Black seal, titanium edge, platinum check. Dark backgrounds, favicon, avatars. |
| `logo/mark-black.svg` | One color, check knocked out. Light backgrounds, print, embossing, stamps. |
| `logo/mark-white.svg` | One color reversed. Dark backgrounds where gradients can't render (email, video overlays). |
| `logo/wordmark-light.svg` / `wordmark-dark.svg` | The Syne wordmark alone, for dark / light backgrounds. |
| `logo/lockup-horizontal-on-dark.svg` / `-on-light.svg` | Default lockup: headers, decks, OG images. |
| `logo/lockup-stacked-on-dark.svg` / `-on-light.svg` | Square spaces: profile cards, merch, splash screens. |
| `logo/png/icon-512.png` | App icon, social avatar (Instagram crops to a circle; the seal survives it). |
| `logo/png/apple-touch-icon-180.png` | iOS home screen (also at `public/apple-touch-icon.png`). |
| `logo/png/og-1200x630.png` | Link previews (also at `public/og.png`). |

### Rules

- **Clear space**: the height of the check's short stroke (about 1/4 of the mark) on every side.
- **Minimum size**: mark 16px; horizontal lockup 120px wide; wordmark alone 96px wide.
- **Never**: color the seal blue (that's the platforms' badge), recolor the check, add a glow or drop shadow, put it on a busy photo, change the number of scallops, or make the check sharp-cornered.
- On light backgrounds use `mark-black`. Don't put the metal version on white; its edge disappears.

## Wordmark

`Select Creators` in **Syne Bold**, title case, tracked −0.02em, converted to outlines. Syne is wide and confident with a slight fashion edge, which keeps the brand premium without reading like a generic tech site. The font file ships in `logo/fonts/Syne-Bold.woff2` (SIL Open Font License) so the logos can be regenerated anywhere. The site header uses the outlined horizontal lockup, so it never depends on the font loading.

Pair it with Geist for everything else: Syne is for the wordmark and, at most, very large display moments.

## Color

Black is never pure blue-black. The scale is warm-neutral so it feels like anodized metal, not a code editor.

| Token | Hex | Role |
| --- | --- | --- |
| `--sc-obsidian` | `#050505` | Canvas |
| `--sc-onyx` | `#0b0b0b` | Raised surface |
| `--sc-carbon` | `#121212` | Panel |
| `--sc-graphite` | `#1c1c1c` | Hover panel, seal highlight |
| `--sc-gunmetal` | `#262626` | Strong divider, inputs |
| `--sc-slate` | `#4e4e4d` | Disabled, resting icons |
| `--sc-steel` | `#8a8a89` | Labels, tertiary text |
| `--sc-silver` | `#bdbdbc` | Secondary text |
| `--sc-platinum` | `#e4e4e3` | Body text |
| `--sc-ivory` | `#f5f5f4` | Headings, primary button |

**Metal** (`--sc-titanium`, `--sc-plate`, `--sc-card-metal`) is for type highlights and the mark only. Never a large background.

**Accent palette (jewel tones).** Color brings the brand to life, but it's light, not paint: accents glow on black, appear in data, highlights and motion, and never fill chrome like headers or buttons.

| Token | Hex | Meaning and chart order |
| --- | --- | --- |
| `--sc-ion` | `#8b9cff` | Primary accent: focus, active step, series 1 |
| `--sc-jade` | `#4fd1a5` | Growth, money in, series 2 |
| `--sc-champagne` | `#e0b56a` | Premium, sponsored, series 3 |
| `--sc-rose` | `#f08aa8` | Audience, people, series 4 |
| `--sc-cyan` | `#5cc8e6` | Platforms, reach, series 5 |
| `--sc-amethyst` | `#b18cf5` | Deals, contracts, series 6 |

Each has a 12% `-tint` for fills. `--sc-aurora` (ion to amethyst to rose) is the one gradient highlight, used at most once per screen, for example on two words of a headline.

**Signal colors** are muted and mean one thing each: `--sc-brass #c9a25a` disclosures and affiliate labels, `--sc-sage #8fb59a` success and verified facts, `--sc-ember #d0705f` danger and scams, `--sc-mist #9fb3c8` info and sources. The brand color is still black: accents are there to explain and to delight, not to decorate.

Hairlines are white at low alpha: `--sc-line` (8%), `--sc-line-strong` (18%), `--sc-line-bright` (35%).

## Type

- **Geist** for everything readable. Headings 600 with negative tracking (`--sc-tracking-display` −0.045em for the hero, `--sc-tracking-heading` −0.025em elsewhere).
- **Geist Mono** for eyebrows, labels, table heads, numbers and metadata, uppercase with `--sc-tracking-caps` (+0.14em).
- Scale: 10.4 · 12 · 14 · 16 · 18 · 22 · 28 · 38 · display clamp(38–68px). Body leading 1.65.

## Space, radii, elevation

- 4px base: `--sc-space-1` (4px) through `--sc-space-10` (128px). Be generous; empty black space is the luxury.
- Radii: 6 tags · 10 inputs · 14 asides · 20 cards · pill for buttons and chips. `--sc-seal-clip` reuses the mark's rosette as a clip-path for avatars, step markers and tiles.
- Elevation is light, not shadow: a 1px hairline, a faint inset top highlight, and a deep soft drop only on lift (`--sc-shadow-lift`).

## Motion

Things should feel alive and expensive: light that moves, metal that catches it, content that settles in. One curve, `--sc-ease-settle` (fast out, long quiet landing). Durations: 120ms hover, 200ms lifts, 360ms panels, 700ms reveals. Nothing bounces, and everything stops under `prefers-reduced-motion`.

`src/styles/motion.css` provides the primitives, all CSS, no library:

| Class | What it does |
| --- | --- |
| `.sc-reveal` (with `style="--i: n"`) | Fades up from a soft blur, staggered 90ms per index. Headlines, cards, sections. |
| `.sc-shimmer` | A highlight that sweeps across titanium type every 6s. |
| `.sc-spotlight` | Soft light that follows the pointer; set `--mx`/`--my` from a pointermove handler. |
| `.sc-grid` | A drifting hairline grid that fades at the edges. Put it inside a positioned hero. |
| `.sc-aurora` | Slow, blurred platinum and champagne light behind a hero. |
| `.sc-beam` | A point of light that runs around a card border on hover (`.is-live` keeps it on). |
| `.sc-grain` | Film grain over the page so black never looks flat. Put it on `body`. |
| `.sc-float`, `.sc-orbit`, `.sc-pulse` | Ambient loops for the hero mark and status dots. |

`logo/mark-animated.svg` is the mark's intro: the seal turns into place, its edge rotates slowly, the check draws itself in one stroke, and a sheen crosses the seal every few seconds. Use it in the hero and loading states, never in the header.

## Diagrams and infographics

People learn by looking, so every guide should lead with a visual. `src/styles/diagrams.css` has pure-CSS components (no chart library, so pages stay fast), written mobile-first: each one is designed at 360px and widens at 48rem. Color any of them with `.is-ion`, `.is-jade`, `.is-champagne`, `.is-rose`, `.is-cyan` or `.is-amethyst`. A working example of every component is in [`examples/diagrams.html`](examples/diagrams.html).

| Component | Use it for |
| --- | --- |
| `.sc-figure` + `figcaption` | The frame every diagram sits in. The caption names the source. |
| `.sc-stats` / `.sc-stat` | Two to four big numbers. Two columns on phones. |
| `.sc-steps` | A process (pitch, negotiate, invoice). Vertical on phones, horizontal on desktop. Mark the current one `.is-active`. |
| `.sc-bars` / `.sc-bar` (`--v` 0–100) | Comparing amounts: income mix, rates by platform. Labels sit above bars so they never squeeze. Bars grow in on load. |
| `.sc-donut` (`--v`) | One share of a whole. |
| `.sc-compare` | Two options side by side: manager vs agent, flat fee vs rev share. Stacks on phones. |
| `.sc-flow` | Who pays whom: nodes joined by a marching dashed line. Vertical on phones. |
| `.sc-legend` | Chart keys with seal-shaped swatches. |

Rules: one idea per figure, label values directly instead of making people read a legend, every number has a source in the caption, and use accents in chart order (ion, jade, champagne, rose, cyan, amethyst) so colors mean the same thing across the site.

## Performance

Mobile-first and fast is part of the brand. No chart, animation or icon libraries; everything here is CSS and inline SVG. Fonts are two variable files (Geist, Geist Mono). Animations use only `transform`, `opacity` and background position so they stay on the GPU. Logos are SVG under 10 KB.

## Components

- **Buttons**: pill. Primary is ivory on black with a soft white glow; secondary is a hairline ghost.
- **Cards**: near-black gradient panel, hairline border, lift 2px on hover with a brighter border and a `.sc-beam` of light around the edge.
- **Eyebrow chip**: mono caps in a pill, with a small sage status dot.
- **Seal**: the mark's rosette as a clip-path (`--sc-seal-clip`) for step numbers, legend swatches, avatars and feature tiles.
- **Asides**: neutral glass, signal color only on the left rule.
- **Affiliate label**: brass mono pill next to every affiliate link.

## Voice

Calm, exact, a little dry. The confidence of someone who doesn't need to sell.

- Say the number. "$2,400 for one Reel and 30 days of usage", not "great rates".
- Disclose first. Money relationships are stated before the recommendation, not in a footer.
- Short declaratives. No hype words ("insane", "game-changing", "unlock"), no emoji in headings, no exclamation marks.
- Write like a private banker explaining a term sheet: plain, respectful, unhurried.

## Using the tokens

The site imports `src/styles/tokens.css` from `src/styles/custom.css`, which maps them onto Starlight's `--sl-` variables. Anything outside the site (decks, social templates, a future agency site) can use `brand/tokens.json`.
