# Platform news: how updates get added

Pages: `/news/` (all platforms), `/news/<platform>/` (Instagram, TikTok, YouTube, Facebook, LinkedIn, X) and one page per change at `/news/<platform>/<slug>/`. Each change also gets a preview image, a Markdown copy (`.md`), a `NewsArticle` JSON-LD block and an entry in the RSS feed at `/news/feed.xml`. Platform guides show the latest change under their header.

## Add an update

Create `src/data/news/<short-slug>.md`. The slug becomes the URL, so keep it short and never rename it after publishing. Copy an existing file for the shape; the schema in `src/content.config.ts` fails the build if something is missing.

- `title`: under 90 characters, says what changed in plain words.
- `summary`: 70 to 160 characters. It's the lead and the search snippet.
- `announced`: the day the platform announced it. `published`: the day we post it. `updated`: when we change it later.
- `effective`: only when it takes effect on a different date ("Feb 1, 2027").
- `confirmed: official` needs at least one source with `official: true` that we actually read: the platform's blog, newsroom, help center, engineering blog or an exec's post. Otherwise use `reported` and cite credible outlets (TechCrunch, The Verge, Reuters, Social Media Today, Net Influencer and similar).
- `impact: high` only for changes to how a platform ranks or pays most creators. It shows a "Big one" tag.
- `forYou`: 1 to 4 plain-language points, written to a creator, not a marketer. No new claims beyond the sources.
- `doThis`: up to 3 concrete actions.
- Body: "What changed", in 1 to 4 short paragraphs, quoting the platform's exact words for numbers and dates.

## What counts as news

A change the platform announced or that credible reporting confirmed, to ranking, payouts, eligibility, content rules, or creator tools that affect reach or pay. Not: guru theories, "reach dropped" threads, ad-only products, minor UI tests seen in one screenshot.

## Daily check

A scheduled task checks official sources every day and opens a pull request with any new update (see the trigger "Creators: daily platform news check"). Sources it checks first:

- Instagram: creators.instagram.com/blog, about.instagram.com/blog, Adam Mosseri's posts as reported
- TikTok: newsroom.tiktok.com, support.tiktok.com, TikTok Creator Academy
- YouTube: blog.youtube (Creators and YPP), YouTube Help Community announcements, Creator Insider
- Facebook: about.fb.com/news, creators.facebook.com/blog
- LinkedIn: linkedin.com/blog/engineering, news.linkedin.com (LinkedIn blocks automated readers, so most LinkedIn items will be `reported`)
- X: help.x.com, github.com/xai-org/x-algorithm, @XEng and @XCreators posts as reported
- Roundups for leads only (never cited as the only source of an official claim): Social Media Today, Net Influencer, TechCrunch, The Verge

When a change also makes a platform guide wrong, fix the guide in the same pull request.

## Platform changelog

`/news/timeline/` is the long record: one dated line per change since 2023, filterable by platform and topic. It merges two sources:

- Every full update in `src/data/news/` (automatic, links to the update).
- Shorter entries in `src/data/timeline.ts`, for older or smaller changes that don't need a full write-up. Each needs an `id` (the `#anchor`, never rename it), `date` (`YYYY-MM-DD`, or `YYYY-MM` when no source gives the day), `platform`, `kind`, a `title` under 80 characters, one or two plain sentences in `what`, and at least one source. Mark a source `official: true` only if it's the platform's own page or code. Don't add an entry that already has a full update.

The build checks every entry (`src/lib/timeline.ts`) and fails on a missing source, a bad date or a duplicate id. The daily check adds full updates; when it finds a smaller change, it can add a timeline entry instead.
