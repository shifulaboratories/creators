# Guide format: action first

Guides used to read like encyclopedia entries: what the platform says, then
what to optimize, then formats, then pay, with a source tag on every bullet.
Accurate, but nobody finished them. The new format leads with what to do and
folds the reference material away. Same sources, same standards.

## The shape

1. **Payoff** (`payoff:` in frontmatter, max 140 chars). One sentence: what the
   reader walks away able to do. Shown as the lead. Keep `description:` for SEO.
2. **Do this today** (`moves:`, up to 3). Each move is an action you can take in
   under an hour (`do`), one line on why it works (`why`), and where that comes
   from (`source`: a short label like "Instagram, 2023" or "Creator-tested").
   It replaces the three-point short version on that page.
3. **Three or four short sections**, each titled with a verb or an outcome
   ("Make Reels people send to a friend", not "What Instagram says it uses").
   Two or three sentences, then something to look at or use:
   - `BeforeAfter`: the usual way vs the better way. Mark made-up examples `illustration`.
   - `QuickCheck`: a tick-off checklist (before you post, before you sign).
   - `CopyBlock`: a message to copy (reply to a brand, ask for a raise, DM a manager).
   - `RatioCheck`: two numbers from your analytics in, one rate out.
   - Existing diagrams (`sc-compare`, `sc-steps`, tables) and calculators.
4. **`DeepDive`** sections at the end hold the reference material (exact platform
   wording, quotes by date, background) and the sources. Folded by default, still
   in the HTML for search engines, and in the `.md` copy for AI assistants.

## Rules

- Lead with the action, then the reason. Cut throat-clearing ("It's important to...").
- Every claim in a move or a section must be sourced in that page's sources.
  Creator-tested advice is labelled as such.
- No per-bullet source tags in the main read. Sources live in the move's
  `source` label and the folded Sources list.
- Main read under ~4 minutes (the header shows read time, counted up to the
  first `DeepDive`).
- Calm: one interactive element per section at most, no animation.

Components live in `src/components/guide/`. Examples: `platforms/instagram.mdx`,
`deals/brand-deals.mdx`.
