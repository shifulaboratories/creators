---
title: "X"
description: "How the For You feed finds, ranks and filters posts, from X's own open-source code, and how the new Original Content Rewards program pays."
status: draft
confidence: verified
lastReviewed: 2026-11-26
cover:
  label: X
  tint: x
sidebar:
  order: 4
---

**The short version:** X picks a pool of candidate posts from people you follow and people you don't, ranks them by how likely you are to engage, then filters for variety and safety. X has published its code twice, in 2023 and in January 2026. Since September 2026, X pays creators for original posts seen by Premium subscribers.

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

- **Write posts people reply to and send.** In the 2026 code, sharing via copy link carries the biggest weight, and replies, quotes and DM shares all outweigh a like several times over. *(From the code.)*
- **Earn reach beyond your followers.** Roughly half of the 2023 feed came from accounts people didn't follow, so a strong post can travel. *(From the platform.)*
- **Avoid what gets filtered.** Spam-like behavior and content people mute or block are removed before you're seen. *(From the platform.)*
- **Treat specific weightings as temporary.** The 2026 system learns from behavior rather than fixed rules, so old "hacks" may not carry over. *(Creator-tested.)*

## Formats that work

- **Original takes, not reposts.** Copied, lightly edited and aggregated posts don't count as original for payouts, and reposting other people's content from other platforms doesn't either. *(From the platform.)*
- **Threads and Articles** for depth; a single sharp post for reach. *(Creator-tested.)*
- **Video and images** count for payouts the same way text does. *(From the platform.)*
- **Commentary and reactions** count as original if you add a genuine point of view. *(From the platform.)*

## How you get paid

X closed its old Creator Revenue Sharing program to new members on August 7, 2026, and replaced it with **Original Content Rewards**, open for applications since September 8, 2026.

<figure class="sc-figure">
<div class="sc-stats">
<div class="sc-stat is-ion"><span class="sc-stat__value">500K</span><span class="sc-stat__label">Home timeline impressions from verified users in 90 days (replies don't count)</span></div>
<div class="sc-stat is-jade"><span class="sc-stat__value">500</span><span class="sc-stat__label">verified followers</span></div>
<div class="sc-stat is-champagne"><span class="sc-stat__value">Premium</span><span class="sc-stat__label">an active Premium, Premium+ or Premium Business subscription</span></div>
<div class="sc-stat is-rose"><span class="sc-stat__value">$30</span><span class="sc-stat__label">minimum payout, paid every two weeks</span></div>
</div>
<figcaption>Original Content Rewards eligibility, per X's help center, checked Nov 26, 2026. You must also be 18+, in an eligible country, and in good standing.</figcaption>
</figure>

- **What pays:** "qualified impressions," meaning unique views from Premium subscribers on the Home timeline where at least half the post is on screen. Repeat views, promoted views and fake views don't count. X doesn't publish a rate. *(From the platform.)*
- **What gets you removed:** bots, automation, and asking for engagement ("like, reply, repost") over and over. *(From the platform.)*
- **The math, in plain terms:** you're paid for being seen by paying users, so a post that only travels among free accounts earns little even if it goes wide. *(Creator-tested.)*

## Go deeper

See the real weights from both releases, with an interactive calculator, in [Inside X's open-source algorithm](/algorithms/x-open-source/).

## Sources

- X Engineering, [Twitter's Recommendation Algorithm](https://blog.x.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm), 2023, and the code at [twitter/the-algorithm](https://github.com/twitter/the-algorithm).
- xAI, [xai-org/x-algorithm](https://github.com/xai-org/x-algorithm), January 2026.
- TechCrunch, [X open sources its algorithm while facing a transparency fine and Grok controversies](https://techcrunch.com/2026/01/20/x-open-sources-its-algorithm-while-facing-a-transparency-fine-and-grok-controversies/), Jan 20, 2026.
- X Help Center, [Original Content Rewards Program](https://help.x.com/en/using-x/original-content-rewards) (checked Nov 26, 2026).
