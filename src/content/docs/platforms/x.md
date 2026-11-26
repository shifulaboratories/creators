---
title: "X"
description: "How the For You feed finds, ranks and filters posts, from X's own open-source releases."
status: draft
confidence: verified
lastReviewed: 2026-11-26
cover:
  label: X
  tint: x
sidebar:
  order: 4
---

**The short version:** X picks a pool of candidate posts from people you follow and people you don't, ranks them by how likely you are to engage, then filters for variety and safety. X has published its code twice, in 2023 and in January 2026.

<figure class="sc-figure">
<ol class="sc-steps">
<li><strong>Find candidates</strong><span>Posts from accounts you follow and from accounts you don't.</span></li>
<li class="is-active"><strong>Rank</strong><span>A model predicts how likely you are to like, reply or repost.</span></li>
<li><strong>Filter</strong><span>Remove blocked and muted content and spam, and balance the mix.</span></li>
</ol>
<figcaption>The three stages of the For You feed</figcaption>
</figure>

## What X says it uses

From the platform, 2023:

- **Candidate sourcing:** about 1,500 candidate posts per request, on average half from accounts you follow and half from accounts you don't.
- **Ranking:** a neural network of about 48 million parameters predicts the probability of several kinds of engagement. Likes, reposts and replies are named as positive engagement.
- **Filtering:** heuristics and filters build "a balanced and diverse feed."

January 2026 update, as reported by TechCrunch:

- X released new code for the feed. It relies on a **Grok-based transformer** that learns relevance from sequences of what users engage with, with no hand-built features for content relevance.
- Filters remove blocked accounts, muted keywords, and content judged too violent or spam-like. Ranking weighs the likelihood of a like, reply, repost or other engagement, plus diversity.

## What to optimize for

- **Write posts people reply to.** Replies are one of the named engagement types, and conversation keeps a post in circulation. *(From the platform, applied.)*
- **Earn reach beyond your followers.** Roughly half of the 2023 feed came from accounts people didn't follow, so a strong post can travel. *(From the platform.)*
- **Avoid what gets filtered.** Spam-like behavior and content people mute or block are removed before you're seen. *(From the platform.)*
- **Treat specific weightings as temporary.** The 2026 system learns from behavior rather than fixed rules, so old "hacks" may not carry over. *(Practitioner view.)*

## Sources

- X Engineering, [Twitter's Recommendation Algorithm](https://blog.x.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm), 2023, and the code at [twitter/the-algorithm](https://github.com/twitter/the-algorithm).
- TechCrunch, [X open sources its algorithm while facing a transparency fine and Grok controversies](https://techcrunch.com/2026/01/20/x-open-sources-its-algorithm-while-facing-a-transparency-fine-and-grok-controversies/), Jan 20, 2026.
