# Publishing: from "In progress" to "Fact-checked"

Every guide starts as `outline` ("Coming soon") or `draft` ("In progress"). A guide becomes `published` ("Fact-checked") only when a named person has read it and put their name on it. Nothing is published automatically.

## The bar

`node scripts/review-queue.mjs` checks every page and writes [review-queue.md](./review-queue.md). A page is offered for sign-off when it has:

- 500+ words of guide text and 3+ outbound sources (overviews and About pages: 150+ words, sources optional, since they point to other pages rather than make claims)
- no `TODO` markers and no "Outline" notice

That's a floor, not the review. The reviewer still reads the whole page and checks that:

1. Every number and claim has a source, and the source says what we say it says.
2. Nothing is inflated, rounded up or guessed.
3. Anything about a company or person we have a relationship with is disclosed.
4. It reads like a friend who knows, not a guru.

## Signing off

Once you've read a page and it holds up:

```sh
node scripts/review-queue.mjs sign-off team/hiring earn/pricing --as william-lee
```

That sets `status: published`, adds you to `reviewers`, and sets `lastReviewed` to today. The page then shows **Fact-checked** and **Reviewed by William Lee**, linked to [/about/contributors/](https://creators.select/about/contributors/). Pages below the bar are refused unless you add `--force`.

You can also do it by hand in the page's frontmatter:

```yaml
status: published
reviewers: [william-lee]
lastReviewed: 2026-11-26
```

## Guard rails in the build

- `status: published` without `reviewers` and `lastReviewed` fails the build.
- Every id in `authors` and `reviewers` must exist in `src/data/people.ts`, so a byline can never point at someone who isn't on the Contributors page.

## Adding a contributor

Add them to `src/data/people.ts` with only facts they've approved, in their words, then add a `<ContributorCard id="..." />` to `src/content/docs/about/contributors.mdx`.

## When a page changes

If a published page gets a substantial edit (new claims, new numbers), set it back to `draft` until it's reviewed again. Typo and link fixes don't need a new review.
