# Translating the site

Select Creators is published in English, Spanish (`/es/`) and Brazilian Portuguese (`/pt-br/`). English is the source of truth. A translation is a copy of an English page, so it must never say more than the English page says or cite anything the English page doesn't.

## How it works

- **Pages:** a translated guide lives at the same path under `src/content/docs/es/` or `src/content/docs/pt-br/`. `src/content/docs/paywall/fanfix.mdx` becomes `src/content/docs/es/paywall/fanfix.mdx` and is served at `/es/paywall/fanfix/`.
- **Untranslated pages** still exist at `/es/...` and `/pt-br/...` so readers keep the Spanish or Portuguese menus. Starlight shows the English text with a notice (wording in `src/content/i18n/`). These copies carry `noindex`, point their canonical link at the English page, and are left out of the sitemap and hreflang links, so search engines only see real translations.
- **Interface strings** for our own components are in `src/i18n/ui.ts` (guide header, share and Ask AI sheets, gallery, tab bar, briefing cards, paywall widgets). Home page copy is in `src/i18n/home.ts`. Sidebar group names are in `src/i18n/ui-sidebar.mjs`. Paywall platform card text is in `src/i18n/paywall.ts`. Starlight translates its own UI (search, "On this page", pagination labels).
- **Languages** are configured in `src/i18n/locales.mjs`.
- **SEO:** each translated page gets `hreflang` links to the languages it exists in, `og:locale`, `inLanguage` and `isBasedOn` in its JSON-LD, and a sitemap entry with alternates. Build-time link previews are generated in the page's language.

## Translating a page

1. Pick the next page from the priority list below and check it isn't being rewritten (ask in the project chat, or check open pull requests touching it).
2. Copy the English file to the same path under `es/` or `pt-br/`.
3. Translate the frontmatter `title`, `description`, `payoff`, each of the `moves` (`do`, `why` and `source`), `tldr`, `cover.label` and `sidebar.label`, then the body, including component props like `title`, `hint`, `items` and `text` on `<DeepDive>`, `<QuickCheck>`, `<CopyBlock>` and `<BeforeAfter>` (format spec: [guide-format.md](guide-format.md)). Wrap a hand-written English source list in `<div lang="en">`; the `<Sources>` components do this themselves. Keep `status`, `confidence`, `authors`, `reviewers`, `lastReviewed` and `sidebar.order` as they are.
4. Add the translation block, with the English file's latest commit:

   ```yaml
   translation:
     source: "abc1234"   # git log -1 --format=%h -- src/content/docs/paywall/fanfix.mdx (keep the quotes)
     review: machine     # machine until a native speaker has read it, then native
     reviewer: someone   # optional, an id from src/data/people.ts
   ```

5. Fix the import paths: translated files are one folder deeper, so `'../../../components/...'` becomes `'../../../../components/...'`.
6. Point internal links at the same language: `/paywall/fanfix/` becomes `/es/paywall/fanfix/`. If the target isn't translated yet, keep the localized link and add "(en inglés)" or "(em inglês)" after it.
7. Run `npm run build` and `npm run i18n:status`.

Pages with `review: machine` show a line under the title saying the page was translated with AI help and hasn't had a native review yet, with a link to the English original. Changing it to `native` switches the line to "reviewed by a native speaker".

## Style

- **Spanish:** neutral Latin American Spanish, with "tú". Prefer words used across Mexico, Colombia and Argentina. Numbers use a decimal point and no thousands separator under 10,000 (`US$1260`, `4.6 millones`), the convention in Mexico and the US.
- **Portuguese:** Brazilian Portuguese, with "você". Brazilian number format (`US$ 5,8 bi`, `US$ 1.260`). "Publi" for a brand deal post is fine; it is what creators say.
- **Keep in English:** brand and platform names, product features as the apps label them in that language (TikTok's "Para ti" in Spanish, "Para Você" in Portuguese), and source titles in citation lists.
- **Money and law are local.** Tax, business-entity and disclosure pages are written for the US. When a translated page mentions them, say so and suggest a local accountant or the local ad-disclosure rules (Conar in Brazil, for example) rather than translating US advice as if it applied everywhere.
- Same voice as the English site: plain, warm, no guru talk. Read [audience notes in CONTRIBUTING.md](../CONTRIBUTING.md).

## Keeping translations current

`npm run i18n:status` lists every translation and flags it as stale when its English original has commits after `translation.source`. To update one, read the English diff (`git diff <source>..HEAD -- <english file>`), apply the same change to the translation, and bump `source` to the new commit. `npm run i18n:status -- --check` exits with an error when anything is stale, for use in CI.

Interface strings aren't tracked this way: when you add English text to a component, add it to all three languages in `src/i18n/ui.ts` (TypeScript will refuse to build if a language is missing a key).

## Priority list

Translated so far: home, Guides gallery, Paywall overview, Fanfix, OnlyFans, Brand deals 101, Instagram, How we make money.

Next, in order:

1. Platforms: TikTok, YouTube, then Facebook, LinkedIn and X
2. Brand deals: pricing (its rate calculator needs its labels moved to `src/i18n/ui.ts` first), negotiation, pitching brands, getting paid
3. Paywall: Fanvue, Patreon and Ko-fi, compare, chatting agencies, signing with an agency
4. About: about, editorial standards, corrections, privacy, disclaimers
5. Algorithms: how recommenders work, what to optimize, myths
6. Protect: hacked, banned, impersonation, scams
7. Team, Grow, Earn, Case studies
8. Money basics last: it is US-specific and needs local versions rather than translation.
