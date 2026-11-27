# Glossary

One page per term at `/glossary/<slug>/`, built from `src/data/glossary/terms.ts`.
Sources live in `src/data/glossary/sources.ts` (money, tax and paywall sources are
shared with those sections).

## Adding a term

1. Add an entry to `terms` in `src/data/glossary/terms.ts`.
2. `short` is the answer Google shows: one plain sentence, 70 to 160 characters.
   Start with the term ("CPM is ...").
3. `example` is worked math with round numbers. Any market figure (a rate, a fee,
   a threshold) must be in `sources`.
4. `guides` are docs ids and `related` are glossary slugs. The build fails on a
   broken one, a duplicate slug or a `short` outside 70 to 160 characters.
5. Optional `seoTitle` if the default "What is X? Meaning for creators" reads
   badly. Keep it under 60 characters.

Each term automatically gets: its page, a `.md` copy for AI assistants, a link
preview image, `DefinedTerm` structured data, a line in `llms.txt`, a spot in the
Guides search, and a "Words in this guide" chip at the end of every guide it lists.

## Search titles for guides

`src/data/seo.ts` overrides the Google title or description for a guide without
touching its frontmatter. Use it for one-word section titles and summaries over
160 characters. Pages that are `noindex` (status: outline) are left out of the
sitemap automatically (`astro.config.mjs`).
