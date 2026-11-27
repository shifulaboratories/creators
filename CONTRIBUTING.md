# Contributing to Select Creators

Thanks for helping. This handbook is only as good as the people who check it.

## Ways to help

1. **Report something.** [Open an issue](https://github.com/shifulaboratories/creators/issues/new/choose) and pick a template: correction, guide idea, tool suggestion or site bug. No GitHub skills needed.
2. **Fix something.** Every page has an "Edit page" link. Make the change and open a pull request.
3. **Add or correct a tool.** Add a YAML file in `src/data/tools/`, copying an existing one. The `alternative` field is required: name a free or non-affiliate option.
4. **Write a guide.** Open a guide idea issue first so the section editor can help shape it.

## Rules every pull request follows

- **Cite your claims.** Link a source, a platform statement, or say it's first-hand.
- **Set a confidence label** in the page's frontmatter: `verified`, `practitioner-view` or `speculative`.
- **Declare conflicts.** If you're paid by, invest in, or work for a product you're adding or praising, say so in the pull request. Agency staff too.
- **No undisclosed affiliate links.** Affiliate links only go in tool files with `affiliate: true` and an `affiliateUrl`; the site labels them automatically.
- **Case studies need consent.** Only with the creator's written consent or from public information.
- **Not legal advice.** Contract and deal pages are educational. Don't give individual legal advice.

## Underground section: extra rules

These pages explain gray-market practices so creators can avoid them. They must never help anyone use them.

- No links, handles, Telegram or Discord names, or prices that would help someone reach a seller.
- Name a marketplace only when published reporting already names it, and link to the reporting.
- No affiliate links, ads or sponsors.
- No step-by-step instructions.
- Every claim about a person or company cites published reporting or a court record. New allegations need a lawyer's review before merging.
- Every page ends with an "If this happened to you" section.

## Page frontmatter

```yaml
---
title: How to redline a contract
description: A step-by-step way to review and mark up a creator contract.
status: draft            # outline | draft | published
authors: [your-github-handle]
reviewers: []
lastReviewed: 2026-11-26
confidence: practitioner-view
tldr:                    # optional: "The short version", three points max
  - First thing to know, in one sentence.
  - Second thing.
  - Third thing.
---
```

`tldr` shows as a numbered card under the title, so phone readers get the gist before they scroll. Every point must be something the page itself says and sources. Pages that already open with a bold **The short version:** paragraph can skip `tldr:` here and use `src/data/tldr.ts` instead; when a page has a short-version card, that opening paragraph is hidden on the web page (the Markdown copy for AI keeps it).

On phones, readers can swipe sideways to the next or previous guide. Widgets that scroll sideways are left alone automatically; if a widget handles its own drags some other way, put `data-no-swipe` on it.

## Shareable stats and link previews

Every page gets a link-preview image automatically (built from its `title`, `description` and section; see `src/pages/og/`). Keep descriptions under about 120 characters so they fit.

To let readers post a number to their Instagram or TikTok Story, use `ShareStat` in an `.mdx` page. Only share numbers the page cites, and name the source: it prints on the card.

```mdx
import ShareStat from '../../../components/ShareStat.astro';

<div class="sc-stats">
  <ShareStat value="4.5x" label="What the number means, in one sentence." source="Who published it, year" />
</div>
```

Widgets can opt in too: any element with `data-story-value` (plus optional `data-story-label`, `data-story-source`) opens the Story card when tapped. Update those attributes as the widget's numbers change.

## Sign-off

By opening a pull request you confirm you wrote the contribution or have the right to submit it, and you agree it can be published under this project's licenses. Add `Signed-off-by: Your Name <email>` to your commits (`git commit -s`).

## Code of conduct

Be kind, be specific, and assume good faith. Harassment, doxxing or naming private individuals is not allowed and gets you removed. The full version is in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
