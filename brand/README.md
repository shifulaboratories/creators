# Select Creators brand system

The feeling: a matte black metal card in a quiet room. Expensive by restraint, not by decoration. Everything is black, warm grey and brushed metal; color appears only when it carries meaning.

Working name: **Select Creators** · domain **creators.select** · Instagram **@selectcreators**.

## The mark: the Select Seal

A matte black plate with chamfered corners carrying a platinum check. The check is split: the short stroke stops just short of the long one, leaving a hairline gap. That gap is the signature. It reads as "verified", but as an engraved, machined part, not a platform badge.

- **Plate**: a square with 19.5% chamfered corners, softened with small radii. Faceted like a cut metal plate or a card chip. Deliberately not a circle, not a scalloped rosette and not a star, so it never reads as Instagram's, X's or Meta's verified badge.
- **Check**: two straight strokes at 45°, flat cut ends, no rounded caps.
- **Grid**: 64 × 64. Geometry lives in [`logo/generate.py`](logo/generate.py); edit it there and regenerate, never by hand.

### Files

| File | Use |
| --- | --- |
| `logo/mark.svg` | Primary. Metal plate, titanium edge, platinum check. Dark backgrounds, favicon, avatars. |
| `logo/mark-black.svg` | One color, check knocked out. Light backgrounds, print, embossing, stamps. |
| `logo/mark-white.svg` | One color reversed. Dark backgrounds where gradients can't render (email, video overlays). |
| `logo/wordmark-light.svg` / `wordmark-dark.svg` | SELECT CREATORS alone, for dark / light backgrounds. |
| `logo/lockup-horizontal-on-dark.svg` / `-on-light.svg` | Default lockup: headers, decks, OG images. |
| `logo/lockup-stacked-on-dark.svg` / `-on-light.svg` | Square spaces: profile cards, merch, splash screens. |
| `logo/png/icon-512.png` | App icon, social avatar (Instagram crops to a circle; the plate survives it). |
| `logo/png/apple-touch-icon-180.png` | iOS home screen (also at `public/apple-touch-icon.png`). |
| `logo/png/og-1200x630.png` | Link previews (also at `public/og.png`). |

### Rules

- **Clear space**: the height of the check's short stroke (about 1/4 of the mark) on every side.
- **Minimum size**: mark 16px; horizontal lockup 120px wide; wordmark alone 96px wide.
- **Never**: recolor the check, add a glow or drop shadow to the mark, rotate it, put it on a busy photo without a black plate behind it, round the plate into a circle, or close the gap in the check.
- On light backgrounds use `mark-black`. Don't put the metal version on white; its edge disappears.

## Wordmark

`SELECT CREATORS` in Geist Medium, all caps, tracked +0.22em, converted to outlines. Caps and wide tracking echo embossed card lettering. In live UI (the site header), set it as real text with `--sc-tracking-wordmark` so it stays accessible and crisp.

## Color

Black is never pure blue-black. The scale is warm-neutral so it feels like anodized metal, not a code editor.

| Token | Hex | Role |
| --- | --- | --- |
| `--sc-obsidian` | `#050505` | Canvas |
| `--sc-onyx` | `#0b0b0b` | Raised surface |
| `--sc-carbon` | `#121212` | Panel |
| `--sc-graphite` | `#1c1c1c` | Hover panel, plate top |
| `--sc-gunmetal` | `#262626` | Strong divider, inputs |
| `--sc-slate` | `#4e4e4d` | Disabled, resting icons |
| `--sc-steel` | `#8a8a89` | Labels, tertiary text |
| `--sc-silver` | `#bdbdbc` | Secondary text |
| `--sc-platinum` | `#e4e4e3` | Body text |
| `--sc-ivory` | `#f5f5f4` | Headings, primary button |

**Metal** (`--sc-titanium`, `--sc-plate`, `--sc-card-metal`) is for type highlights, the mark and the member card only. Never a large background.

**Signal colors** are muted and mean one thing each: `--sc-brass #c9a25a` disclosures and affiliate labels, `--sc-sage #8fb59a` success and verified facts, `--sc-ember #d0705f` danger and scams, `--sc-mist #9fb3c8` info and sources. No brand accent color exists on purpose; the brand color is black.

Hairlines are white at low alpha: `--sc-line` (8%), `--sc-line-strong` (18%), `--sc-line-bright` (35%).

## Type

- **Geist** for everything readable. Headings 600 with negative tracking (`--sc-tracking-display` −0.045em for the hero, `--sc-tracking-heading` −0.025em elsewhere).
- **Geist Mono** for eyebrows, labels, table heads, numbers and metadata, uppercase with `--sc-tracking-caps` (+0.14em).
- Scale: 10.4 · 12 · 14 · 16 · 18 · 22 · 28 · 38 · display clamp(38–68px). Body leading 1.65.

## Space, radii, elevation

- 4px base: `--sc-space-1` (4px) through `--sc-space-10` (128px). Be generous; empty black space is the luxury.
- Radii: 6 tags · 10 inputs · 14 asides · 20 cards · 22 member card · pill for buttons and chips. `--sc-plate-clip` reuses the mark's chamfer as a clip-path for avatars and feature tiles.
- Elevation is light, not shadow: a 1px hairline, a faint inset top highlight, and a deep soft drop only on lift (`--sc-shadow-lift`, `--sc-shadow-card`).

## Motion

One curve, `--sc-ease-settle` (fast out, long quiet landing). Durations: 120ms hover, 200ms lifts, 360ms panels and tilt, 700ms reveals and sheen sweeps. Things glide and settle; nothing bounces. All durations drop to 0 under `prefers-reduced-motion`.

## Components

- **Buttons**: pill. Primary is ivory on black with a soft white glow; secondary is a hairline ghost.
- **Cards**: near-black gradient panel, hairline border, lift 2px on hover with a brighter border.
- **Eyebrow chip**: mono caps in a pill, with a small sage status dot.
- **Member card**: the homepage hero. ISO card ratio 1.586, brushed-metal stripes, a sheen that follows the pointer. Use it for membership, newsletter and agency moments, never as decoration elsewhere.
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
