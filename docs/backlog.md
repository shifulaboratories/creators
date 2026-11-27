# Product backlog

The standing audit of creators.select. Each round re-checks `main` plus open PRs, re-ranks this list, and moves finished items to the log at the bottom. Anyone can pick up an item; link the PR next to it.

**Work is tracked in GitHub Issues** (public board at /roadmap/, rules in [board.md](board.md)). This file keeps the audit's scoring and reasoning; when a row becomes work, open an issue and link it here.

**Scoring.** Impact and effort are S / M / L. Priority: **P0** blocks launch or hurts trust, **P1** next workstreams, **P2** worth doing, **P3** someday.

**Vision check.** The ultimate free A-to-Z creator economy resource: algorithms, strategy, case studies, monetization, paywalls, brand management, deals, contracts, managers, agencies, hiring, tech stack. Credible (sourced, no guru talk), premium but warm, mobile feels like a social app, and a credibility funnel for the talent agency.

---

## Round 1 snapshot (2026-11-26)

Audited `main` (6353efe) merged with open PRs #6 to #12 into one local build.

| Measure | Result |
| --- | --- |
| Pages built | 74, build in ~12 s |
| Mobile load (local, iPhone 14 emulation) | 600 to 900 ms, LCP under 1.3 s, no horizontal overflow |
| CSS per page | ~99 KB uncompressed on every guide (one shared bundle) |
| Accessibility (axe-core, 16 key pages) | 1 critical, 3 serious, a handful of moderate/minor (details in P1-A11y) |
| Status of guides | 62 `draft`, 9 `outline`, **0 `published`**. Every page shows an "In progress" pill |
| Bylines | **0** pages have `authors` or `reviewers` set |
| Thinnest pages (words) | Grow index 126, Grow strategy 84, Grow formats 75, Stack gear/software/merch ~75 each, News ~120, Ban/unban services 129 |
| Best-sourced pages | Protect (10 to 26 outbound sources each), Team, Deals clause library, Earn monetization paths |

**Merge note for the coordinator:** PRs #6, #11 and #12 all edit `src/lib/markdown.ts` (the widget text map for the `.md`/AI copies). The conflict is trivial, keep both sides: the imports from `protect-playbooks` and `money-markdown`, and both the algorithm widget entries and `...moneyWidgetText`. Everything else merges cleanly in any order.

---

## P0: trust and launch blockers

| # | Item | Impact | Effort | Owner / notes |
| --- | --- | --- | --- | --- |
| P0-1 | **Privacy page contradicts the code.** About/privacy (PR #7) says images are served from our own site apart from YouTube, but `ToolList`, `CreatorSetups` and `Seal3D` hotlink favicons from `twenty-icons.com` (home, Stack, setups). Fix by downloading the icons once into `public/icons/` (script in `scripts/`), or list the service on the privacy page. Self-hosting is better: faster and one less third party. | L | S | Small fix. Needs a machine that can reach the icon host. |
| P0-2 | **Every guide says "In progress".** 0 of 71 guides are `published`, so the site reads unfinished. Decide a bar for `published` (sourced, reviewed, over ~500 words, no TODOs) and flip the pages that meet it. Hide the pill for `draft` on mobile; keep "Coming soon" only for outlines. | L | S | Each section thread flips its own pages once merged. |
| P0-3 | **No bylines or reviewers anywhere.** The schema has `authors`, `reviewers`, `lastReviewed`, but none are filled. Named, credentialed reviewers are the single strongest credibility signal and the bridge to the agency. Add an author/reviewer card (photo, one line, link), an `/about/team` page, and fill every page. | L | M | Needs William: who is named, and photos. |
| P0-4 | **Grow is empty.** Strategy and formats are ~80-word stubs, yet Grow is step 02 on the homepage path and the core of what creators come for. See workstream W1. | L | L | New thread. |
| P0-5 | **Lawyer review of Underground** before launch (checklist already in `legal/underground-lawyer-review.md`, PR #7). | L | S | William. |

## P1: next workstreams (ranked)

These are sized for one thread each.

### W1. Grow: the strategy core (L impact, L effort)
The missing heart of the site. Pages: picking a niche you can sustain; hooks and the first 3 seconds (with retention-curve diagrams); formats that travel across platforms; posting cadence and what the evidence says; repurposing one idea to 5 platforms; reading your analytics (what each platform's metric actually means, which ones to ignore); collaborations; growing from 0 to 1k. Interactive: a "hook lab" swipe deck of real examples, a retention-curve explainer, a cadence planner. Sources: platform creator academies, YouTube Creator Insider, published retention data, named practitioners on record.

### W2. Mobile reading feel (L impact, M effort)
On a phone, the first screen of every guide is all chrome: section pill, title, description, two status pills, an "Ask AI" card with 4 buttons, then 6 share buttons, plus the "On this page" bar. The content starts below the fold. Proposal:
- Collapse Ask AI and Share into one compact row: `Ask AI` and `Share` buttons that open a bottom sheet (Story card, copy link, socials; Claude, ChatGPT, Perplexity, copy for AI).
- Put a 3-bullet "TL;DR" card right under the title (also great for SEO snippets and Story cards).
- Make the tab bar more opaque; body text shows through it while scrolling.
- Next/previous guide as a swipe at the end of each guide, with a progress bar per section ("3 of 7 in The algorithm").
Touches `PageTitle`, `ShareBar` (PR #10) and `AskAI`, so start after #10 merges.

### W3. Platforms: go wide and deep (L, L)
TikTok, YouTube and X pages are 380 to 440 words with 1 to 3 sources each, thin next to Protect or Team. Deepen the four, then add the platforms creators actually earn on: **LinkedIn, Pinterest, Threads, Snapchat (Spotlight and creator payouts), Twitch, Facebook, Substack/newsletters, podcasts (Spotify, Apple, YouTube)**. Each one: what the feed rewards (sourced), what pays, a "who wins here" profile, and a row in the compare-platforms table.

### W4. Credibility and agency funnel (L, M)
Right now "Work with us" is 227 words and there is no path from reader to client. Build: author/reviewer profiles (P0-3); a "Creator readiness check" (follower range, income streams, inbound deals, time spent on admin) that ends with an honest recommendation, including "you don't need a manager yet"; a soft "Talk to us" form that clearly discloses the agency link (consistent with how-we-make-money); case-study style "teardowns" by the team. Keep it non-salesy: the honesty is the pitch.

### W5. Money, part two: business basics (L, M)
Earn and Deals (PR #12) cover pricing, deals, clauses and paywalls well. Missing: taxes for creators (US first: 1099s, quarterly estimates, deductions, when an LLC or S-corp election helps), getting paid internationally, invoicing and chasing late payments (partly in getting-paid), creator funds and platform payouts compared, UGC (user-generated content) work as a business, licensing and selling your footage. Needs the "not tax advice" framing already in disclaimers, plus named CPA review.

### W6. Stack: fill the tool directory (M, M)
Only 4 tools exist in `src/data/tools/` (Audacity, CapCut, DaVinci Resolve, OBS), and the three Stack subpages (gear by budget, software by job, merch and products) are ~75-word stubs. Target ~60 tools across every slot in the schema (link-in-bio, storefront, paywall, email, analytics, scheduling, payments, content protection), each with the required free alternative. Gear by budget as a swipeable "$0 / $300 / $1,500 / $5k kit" view. Also the place to add AI tools for creators (editing, captions, thumbnails, dubbing) with an honest take on each.

### W7. Brand management and the creator as a business (M, M)
`protect/brand-management` is 519 words with zero sources. Expand into: media kit (with a template), pitching brands, building a personal brand that outlives one platform, crisis comms, community management, saying no, and mental health and burnout (sourced: published creator surveys, platform wellbeing resources).

## P1-A11y and quality fixes (small, any thread)

| # | Item | Where | Effort |
| --- | --- | --- | --- |
| Q1 | `aria-pressed` on `<a>` links is invalid (axe critical) | Protect triage, PR #11 `ProtectTriage.astro` | S |
| Q2 | `<pre>` blocks can scroll but are not keyboard-focusable; add `tabindex="0"` | Deals negotiation scripts, PR #12 `ScriptCards.astro` | S |
| Q3 | Heading levels skip (h1 to h3, h4, h5) inside widgets | About, Deals, Team, Algorithms widgets | S |
| Q4 | Logo `alt` duplicates the visible site title (axe minor, every page) | Starlight header, `astro.config.mjs` logo | S |
| Q5 | Case-study `<title>`s are 57 to 73 characters; Google truncates near 60 | `case-studies/*.mdx` (PR #9); add a short `head` title | S |
| Q6 | Some meta descriptions are over 160 characters (disclaimers, why-feeds-exist, username-trading) or under 60 (news/weekly, grow/formats) | frontmatter | S |
| Q7 | One ~99 KB CSS bundle loads on every guide; check what is unused and split per-widget CSS | `src/styles/` | M |
| Q8 | Guide gallery: sort and filter state lives in the URL, good. Add a "for you" filter by stage (just starting / growing / earning / scaling) that matches the homepage path | `GuideGallery.astro` | M |

Fixed in this round's PR: SwipeDeck slide labels hid the card text from screen readers (axe serious); gallery card headings skipped a level; gallery count chip contrast was 4.05:1.

## P2: worth doing

- **Glossary** (CPM, RPM, usage rights, whitelisting, exclusivity, retention, CTR, etc.) with hover definitions inside guides. Great for SEO and for beginners. M/M.
- **Case studies: more breadth.** 6 today (MrBeast, Alex Cooper, Ali Abdaal, Alix Earle, Khaby Lame, Ryan Trahan). Add creators outside the US and outside YouTube/TikTok: a LinkedIn creator, a Pinterest creator, a Twitch streamer, a newsletter business, a UGC creator, a creator who failed and what they learned. Each with the "what you can copy" box. M/M.
- **Comparison tools.** "Which paywall?" (Patreon vs Substack vs YouTube memberships vs Passes vs Fanfix, fees and payout timing), "which link-in-bio", "which scheduling tool". Built from the Stack YAML. M/M.
- **AI hand-off, round 2.** Today each guide has Claude/ChatGPT/Perplexity buttons plus `.md` copies and `llms.txt` (good). Next: prompt starters per section ("Price this deal: 3 Reels, 90-day usage, 40k followers"), and a public MCP server or "custom GPT" so assistants can search the library. M/M.
- **News**: hide from nav until there is a publishing rhythm; an empty news page reads abandoned. S/S. (Newsletter is deferred.)
- **Localisation of money pages** beyond the US (UK, EU, Canada, Australia). L/L.
- **Search analytics** without tracking: log Pagefind zero-result queries server-side (Cloudflare Worker, no cookies) to see what people want that is missing. Requires a privacy-page update first. M/S.

## P3: someday

- Community submissions of real rate cards (anonymised) to power the rate calculator with real data.
- Creator "setups" submissions via a GitHub issue form.
- A printable "deal checklist" PDF and contract templates.
- Native-feeling PWA (install prompt, offline reading of saved guides).

---

## Log

| Date | Round | What changed |
| --- | --- | --- |
| 2026-11-26 | 1 | First audit. Backlog created. Fixed SwipeDeck accessible names, gallery heading order and chip contrast. |
