# Contributing to Select Creators

Thanks for helping. This handbook is only as good as the people who check it.

## Ways to help

1. **Fix something.** Every page has an "Edit page" link. Make the change and open a pull request.
2. **Add or correct a tool.** Add a YAML file in `src/data/tools/`, copying an existing one. The `alternative` field is required: name a free or non-affiliate option.
3. **Write a guide.** Open an issue first so the section editor can help shape it.

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
---
```

## Sign-off

By opening a pull request you confirm you wrote the contribution or have the right to submit it, and you agree it can be published under this project's licenses. Add `Signed-off-by: Your Name <email>` to your commits (`git commit -s`).

## Code of conduct

Be kind, be specific, and assume good faith. Harassment, doxxing or naming private individuals is not allowed and gets you removed.
