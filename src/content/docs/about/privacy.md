---
title: "Privacy"
description: "What happens to your data when you visit. The short answer: very little, and we never sell it."
status: draft
lastReviewed: 2026-11-27
sidebar:
  order: 7
---

**The short version:** no accounts, no ads, no tracking pixels, no analytics scripts, and we don't sell or share data about you. The only things that touch your data are the company that hosts the site, YouTube when a page shows videos, the anonymous rate you share on Rate Check if you choose to, and services you choose to click through to. Here's the full list.

<figure class="sc-figure">
<div class="sc-compare">
<div class="sc-compare__side is-jade">
<h4>What we don't do</h4>
<ul>
<li>No sign-up, accounts or email list</li>
<li>No ads or ad trackers</li>
<li>No analytics scripts, no tracking pixels</li>
<li>No selling or sharing your data</li>
<li>No cookies set by us</li>
</ul>
</div>
<div class="sc-compare__side is-champagne">
<h4>What does happen</h4>
<ul>
<li>Our host processes basic request data to serve the site</li>
<li>Video thumbnails load from YouTube</li>
<li>Videos play from YouTube when you tap them</li>
<li>Rate Check stores a rate only if you choose to share one, with no name, handle or IP</li>
<li>Ask AI buttons open the AI site you pick</li>
<li>Saved guides and checkmarks stay in your own browser</li>
</ul>
</div>
</div>
</figure>

## Hosting: Cloudflare

The site runs on [Cloudflare](https://www.cloudflare.com/privacypolicy/). Like any web host, Cloudflare receives the technical details your browser sends with every request: your IP address, the page you asked for, your browser and device type, and the time. Cloudflare uses this to deliver the site and protect it from attacks and abuse. We can see request logs for troubleshooting, which Cloudflare keeps for a short, limited period. We don't use them to identify or profile visitors.

To block bots and attacks, Cloudflare may set a small security cookie. It's used only for that purpose, not for advertising or tracking you across sites.

## Videos: YouTube

Some pages include videos from YouTube.

- **Before you tap play:** the preview image loads from YouTube's image server (`i.ytimg.com`), which means YouTube receives your IP address and browser details, as with any image request.
- **When you tap play:** the video loads from `youtube-nocookie.com`, YouTube's privacy-enhanced mode. From then on, [Google's privacy policy](https://policies.google.com/privacy) applies to that video.

## App icons

The small app and website icons in tool lists and creator setups are served from creators.select. When an icon isn't cached yet, our server fetches it once from an icon service and keeps a copy. Your browser never contacts that service, so it doesn't see your visit.

## Search

The site's search runs entirely in your browser. What you type isn't sent to us or anyone else, unless you tap a button to ask an AI, below.

## Saved guides and progress

When you tap **Save** on a guide or **Mark as done** at the end of one, the site remembers it in your browser's own storage (`localStorage`) on that device. A few interactive tools keep small settings the same way, like the platform you picked or the items you've ticked on a checklist. This isn't a cookie: it's never sent to us or anyone else, we can't see it, and it doesn't follow you to other devices or browsers. To delete it, tap **Clear my guides** on the [Guides page](/guides/#mine), or clear this site's data in your browser settings.

## Free tools: media kit, invoice and calculators

The [free tools](/tools/) run entirely in your browser. What you type into them, including an invoice's payment details or a photo you add to a media kit, is never uploaded. The media kit builder and invoice generator keep your latest draft in your browser's storage on that device so you don't lose it; **Start over** or **Clear** deletes it, as does clearing this site's data. **Save as PDF** uses your browser's own print dialog.

A media kit **share link** carries the kit itself, compressed, after the `#` in the address. Browsers don't send that part of a link to any server, so we never receive it, but anyone you give the link to can read the kit. Your photo is never included in a link.

## Rate Check: sharing a rate

[Rate Check](/rate-check/) lets you share what a brand paid you, anonymously, so other creators can see real ranges. It's the one place on this site where something you type is sent to us, and only when you tap **Share my rate**.

- **What we store:** the platform, format, your follower count, the rate, whether usage rights were included, and, if you pick them, your niche and region. We also record the month you shared it, not the exact date or time.
- **What we don't store:** your name, handle, email, brand name or IP address. There's no account and no cookie of ours.
- **Bot check:** the form uses [Cloudflare Turnstile](https://www.cloudflare.com/privacypolicy/), which checks your browser for signs of automation and doesn't use cookies to track you. To stop spam, Cloudflare also counts recent submissions from your connection for about a minute; that count isn't saved.
- **What others see:** only the 25th percentile, median and 75th percentile for a group, rounded, and only once that group has at least 5 rates, so no single deal can be picked out.
- **Deleting a rate:** because we don't know who shared what, we can't find your rate later. Email [support@creators.select](mailto:support@creators.select) with the details and the month, and we'll remove matching rows.

The data is stored in Cloudflare D1, Cloudflare's database, under our account.

## Ask AI buttons

Pages have buttons to open Claude, ChatGPT or Perplexity. When you tap one, your browser opens that site with a prompt that includes the page's address and title, or the question you typed into our search box. What happens next is covered by that company's privacy policy. Nothing is sent until you tap.

The **Copy for AI** button copies the page's text to your clipboard from our own site. It doesn't send anything anywhere.

## Fonts and images

Fonts and images (apart from YouTube previews) are served from our own site, so loading a page doesn't contact font services or image hosts.

## Contacting us and contributing

- **GitHub:** issues, edits and pull requests are public, and your GitHub username is attached to them. [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) applies. Don't post personal information in an issue.
- **Email:** if you write to [support@creators.select](mailto:support@creators.select), we see your email address and what you send. We use it only to reply and to handle your request, and we delete it when it's no longer needed for that.
- **Instagram messages:** if you message us on Instagram, we see what you send and your profile, and Instagram's own policies apply to the platform.

## Links to other sites

When you click a link to another site, including affiliate links, that site's privacy policy applies. Affiliate links may let the other company know you came from us, so they can credit the referral. They're always labeled where they appear.

## Children

This site is meant for a general audience and isn't directed at children under 13. We don't knowingly collect information from anyone, including children.

## Your rights

Because we don't run accounts, analytics or mailing lists, we don't hold a profile about you. If you've contacted us and want what you sent deleted, or you have a question about your data, email [support@creators.select](mailto:support@creators.select). Requests about data Cloudflare, YouTube or GitHub hold are best sent to them directly, through the links above.

## If this changes

If we ever add analytics, a newsletter or anything else that collects data, we'll update this page before it goes live, and the change will be visible in the page's public history on GitHub. We'd choose privacy-friendly tools that don't use tracking cookies.
