# Lawyer review checklist: Underground section and launch policies

Prepared 2026-11-26 for a media/internet lawyer reviewing Select Creators (creators.select) before launch. This file is not published on the site.

**Context for the reviewer.** Select Creators is a free, open-source handbook for creators. The Underground section covers gray-market practices (paid verification, ban and unban services, username trading, fake engagement) as journalism so creators can protect themselves. House rules: every claim about a person or company cites published reporting or a court record, no links or handles that help anyone reach a seller, no step-by-step instructions, no affiliate links, ads or sponsors. The team behind the site is building a talent agency, which is disclosed on the site.

Pages to review (all of this text is on the main branch and live on creators.select):

| Page | Path | Status |
| --- | --- | --- |
| Underground overview | `src/content/docs/underground/index.md` | Draft |
| Paid verification and badge fraud | `src/content/docs/underground/paid-verification.md` | Draft, sourced to ProPublica (2022) |
| Username trading and account swapping | `src/content/docs/underground/username-trading.md` | Draft, sourced to Motherboard/VICE, Krebs on Security, The Daily Beast |
| Fake engagement | `src/content/docs/underground/fake-engagement.md` | Draft, sourced to Virus Bulletin paper, Meta newsroom, The Register, FTC |
| Ban and unban services | `src/content/docs/underground/ban-and-unban-services.md` | Outline only, hidden from search engines. Needs its own review once written |
| Policies | `src/content/docs/about/*.md` | Draft. Privacy page updated 2026-11-27 for Rate Check, saved guides, free tools and app icons |

## Status on 2026-11-27 (launch prep)

Nothing on this list has been signed off by a lawyer yet. Tracked as [issue #55](https://github.com/shifulaboratories/creators/issues/55) on the public board, marked "Waiting".

What changed on our side since this checklist was written:

- **Done without a lawyer:** the Underground draft text and the policy pages are merged and live. The privacy page now covers everything the site actually does (see section 6). App icons no longer load from a third-party icon service in visitors' browsers, which the privacy page used to contradict. The Fanfix guide discloses that William Lee advises Fanfix, and pages that mention the agency say so.
- **Still open, no change:** no legal entity is named as publisher, there is no Terms of Use page, no DMCA designated agent is registered, the content license is still undecided (README says all rights reserved for written content until then), and there is no postal address for notices.
- **Still the founders' call:** whether Underground launches with 1.0, launches with changes, or waits. Its pages are drafts today and visible on the site; "Ban and unban services" is an unwritten outline and hidden from search engines.

## 1. Defamation and false light

- [ ] Read each named person or company against its cited source. Confirm every statement is no stronger than the source supports.
- [ ] Confirm unproven conduct is written as alleged or reported ("according to ProPublica", "Meta said"), not as fact.
- [ ] Confirm that summarizing and linking published reporting is adequate. Republishing someone else's defamatory statement isn't automatically protected in the US. Advise whether any statement needs independent verification or should be cut.
- [ ] Court-record claims: confirm whether fair report privilege applies to how we describe Meta's lawsuits and the November 2022 default judgment (fake-engagement page), and whether a default judgment should be described differently from a contested one.
- [ ] Named private or semi-public individuals. Currently: Paul Rosenzweig, a victim named in Krebs on Security (username-trading page). Confirm naming a victim from published reporting is acceptable, or advise removing the name.
- [ ] Named marketplace: OGUsers (username-trading page), named because Motherboard named it and linked to the reporting only. Confirm this is acceptable.
- [ ] Brands named in negative context: T-Mobile (employee SIM swap, per Krebs), Spotify and Apple Music (removed fake artists, per ProPublica). Confirm wording.
- [ ] Advise on a pre-publication rule for new allegations: when do we need to contact the subject for comment, and how long to wait.

## 2. Facilitation and instructional content

- [ ] Confirm the level of mechanical detail is news-story level and doesn't read as instructions. Specific items to check:
  - Paid verification: describes the fake-musician pipeline in four steps, including "about $1,500" cost per submission and "$25,000" typical client price.
  - Username trading: describes SIM swapping, phishing, escrow middlemen and a "5% cut".
  - Fake engagement: describes the storefront to reseller panel to botnet chain, with a median price of about $1 per 1,000 followers at reseller panels and an estimated $13 at storefronts.
- [ ] House rule says no prices that would help someone reach a seller. Confirm the prices above (historical, from published research) are acceptable or should be removed.
- [ ] Confirm the "If this happened to you" guidance (report to FTC, IC3, police, platform recovery pages) is accurate and doesn't over-promise.

## 3. Regulatory statements

- [ ] Fake engagement page states the FTC's 2024 rule (16 CFR Part 465, Trade Regulation Rule on the Use of Consumer Reviews and Testimonials) bans buying or selling fake indicators of social media influence for commercial purposes. Confirm the summary is accurate, including the knowledge requirement and the commercial-purpose limit.
- [ ] Paid verification page quotes Meta's position that paying for verification violates its terms, and points readers to Meta Verified as the legitimate paid route. Confirm wording.

## 4. Copyright and trademarks

- [ ] Quotes from ProPublica, Krebs, Motherboard, The Register and others: confirm length and use are fair use.
- [ ] Platform names (YouTube, TikTok, Instagram, Meta, X, Spotify): nominative use only, no logos. Confirm the non-affiliation statement in `about/disclaimers.md` is adequate.
- [ ] Adjacent risk outside Underground: the Shortlist section (formerly called Goldmines) summarizes the leaked MrBeast production handbook from published coverage and doesn't host or link the leaked PDF. Confirm that's acceptable.
- [ ] DMCA: the corrections page invites copyright complaints but the site hasn't registered a DMCA designated agent with the US Copyright Office. Advise whether to register (needed for safe harbor on user-contributed content) and what the notice process should say.

## 5. User contributions

- [ ] Contributors submit pull requests that editors review and merge. Advise whether Section 230 protects anything here, given editors review and edit before publishing.
- [ ] Contributor sign-off (DCO-style "Signed-off-by") and the statement in `CONTRIBUTING.md`: confirm adequate, or whether a CLA is needed.
- [ ] Content license is undecided (CC BY 4.0 vs CC BY-NC-SA 4.0; all rights reserved until then). Advise, especially on how a license interacts with contributors' rights.

## 6. Policy pages

- [ ] `about/disclaimers.md`: not legal, tax or financial advice; no client relationship; no guaranteed results; non-affiliation with platforms; Underground is journalism. Confirm adequate for a site run by people building a talent agency.
- [ ] `about/privacy.md`: states no analytics, no ads, no cookies set by us; Cloudflare hosting (request logs, possible bot-protection cookie); YouTube thumbnails from i.ytimg.com and click-to-play from youtube-nocookie.com; Ask AI buttons open third-party sites (Claude, ChatGPT, Perplexity); saved guides and tool drafts stay in the browser's localStorage; app icons are fetched by our server, not the visitor's browser; Rate Check stores anonymous rates in Cloudflare D1 behind Cloudflare Turnstile (see section 9). Confirm whether GDPR, UK GDPR or CCPA/CPRA notices need anything more (controller identity, legal basis, contact address), and whether YouTube thumbnails need consent in the EU.
- [ ] `about/how-we-make-money.md`: affiliate and sponsorship rules. Confirm they meet the FTC Endorsement Guides (16 CFR Part 255, revised 2023) and say whether disclosures need any change.
- [ ] `about/corrections.md`: promises a reply within five business days and removal of private details first. Confirm we can stand behind those commitments, and advise on a takedown policy for people named.
- [ ] `about/editorial-standards.md`: discloses AI-assisted research and drafting. Confirm the wording.

## 7. Business setup

- [ ] Who is the publisher of record? Currently no legal entity is named on the site. Advise whether to publish through an LLC, and whether the site needs Terms of Use (no Terms page exists yet).
- [ ] Media liability or errors-and-omissions insurance: advise whether it's warranted before launching the Underground section.
- [ ] Anti-SLAPP coverage: advise based on where the publisher is based.
- [ ] Contact: the site offers support@creators.select, Instagram DMs and GitHub for contact. Advise whether a postal address is also required for privacy, DMCA or legal notices.

## 8. Decision for launch

- [ ] Launch the Underground section as-is, launch with changes, or hold it back until after launch. The rest of the site doesn't depend on it.

## 9. Added since the first checklist

These sections went live after the checklist was written. Each names real people or companies, or handles data visitors submit, so they belong in the same review.

- [ ] **Rate Check** (`src/pages/rate-check.astro`, `worker/index.ts`, `about/privacy.md`): visitors submit what a brand paid them, anonymously. Stored: platform, format, follower count, rate, usage rights, optional niche and region, and the month. Not stored: name, handle, email, brand or IP. Shown only as rounded quartiles once a group has 5 or more rates. Confirm the privacy wording, whether this is "personal data" under GDPR/CCPA given no identifiers are kept, and whether publishing pay ranges raises any antitrust or confidentiality concern (for example, creators sharing rates a contract says are confidential). Currently hidden from search engines until it has enough data.
- [ ] **Paywall section** (`src/content/docs/paywall/`): guides to Fanfix, OnlyFans, Fanvue, Patreon and Ko-fi, plus "Chatting agencies, explained" and "Agency red flags", written as journalism from published reporting. Confirm the treatment of adult platforms, the chatting-agency reporting (named companies, if any), and that the Fanfix advisor disclosure is adequate.
- [ ] **Brand deal contract guides** (`src/content/docs/deals/clause-library.mdx`, `redline-a-contract.mdx`, `negotiation.mdx`, `agencies-and-commissions.mdx`): explain common clauses and suggest redlines. Confirm these read as education, not legal advice, and that the disclaimers on those pages are enough.
- [ ] **Who reps who and the agency directory** (`src/content/docs/team/rosters.mdx`, `agency-directory.mdx`): which creators were reported signing with which agencies and management firms, each linked to dated reporting. Same defamation and accuracy questions as section 1, plus how to handle a takedown request from an agency or creator. The site is run by people building a talent agency, which is disclosed; confirm whether listing competitors needs more than that.
- [ ] **Creator directory** (`src/pages/creators/`): named creators' gear, software and advice, sourced to their own videos and posts. Confirm this use of names and likeness (no photos are hosted) is fine without permission.
- [ ] **Tool reviews** (`src/content/docs/reviews/`): neutral reviews and head-to-head comparisons of named companies (Stan, Beacons, Linktree, Gumroad, Passionfroot, Collabstr) with their fees. Confirm the comparisons are safe from trade libel or false advertising claims, given the reviews state facts from each company's own pricing pages.
- [ ] **News** (`src/content/docs/news/`): dated platform updates sourced to platform announcements and press. Low risk; confirm quoting practice matches section 4.
- [ ] **Jobs page and work-with-us page** (`src/content/docs/jobs/`, `about/work-with-us.md`): confirm nothing there reads as a job offer or as soliciting clients in a way that needs extra disclosure.
