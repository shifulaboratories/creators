# Newsletter: The Select Weekly

Self-hosted so we own the list and the cost stays flat as it grows.

- **[Listmonk](https://listmonk.app)** (open source, AGPL) holds subscribers, sends campaigns, handles double opt-in, unsubscribes and bounces, and hosts a public archive.
- **Amazon SES** delivers the mail. It charges $0.10 per 1,000 emails ([pricing](https://aws.amazon.com/ses/pricing/)), so 10,000 subscribers on a weekly send is about 40,000 emails, roughly $4 a month.
- **A small server** runs Listmonk and its Postgres database. 1 vCPU and 2 GB RAM is plenty; budget about $5 a month.

The site's signup form (`src/components/NewsletterSignup.astro`) posts straight to Listmonk's public form endpoint. No script ships to readers and the static site needs no backend.

## 1. Server

1. Create a small Linux server (Ubuntu LTS) with Docker installed.
2. Install Listmonk with its official Docker Compose file ([install docs](https://listmonk.app/docs/installation/)). It runs the app and Postgres.
3. In Cloudflare DNS for `creators.select`, add `news` pointing at the server (proxied), or use a Cloudflare Tunnel so the server needs no open ports.
4. In Listmonk **Settings > General**, set Root URL to `https://news.creators.select`.
5. Put `/admin` behind Cloudflare Access so only the team can reach it.
6. Back up Postgres nightly (`pg_dump` to R2 or another bucket).

## 2. Amazon SES

1. In SES, verify the domain `creators.select` with Easy DKIM, and add the three DKIM CNAME records in Cloudflare (DNS only, not proxied).
2. Set a custom MAIL FROM domain such as `mail.creators.select` (MX and SPF records SES gives you).
3. Add a DMARC record: `_dmarc.creators.select` TXT `v=DMARC1; p=none; rua=mailto:<a team inbox>`. Tighten to `quarantine` once reports look clean.
4. Request production access (new SES accounts start in a sandbox that can only send to verified addresses).
5. Create SMTP credentials and add them in Listmonk **Settings > SMTP**: host `email-smtp.<region>.amazonaws.com`, port 587, STARTTLS.
6. Bounces and complaints: create an SNS topic for SES bounce and complaint notifications, subscribe it to `https://news.creators.select/webhooks/service/ses`, and turn on SES in Listmonk **Settings > Bounces**. Listmonk then blocklists bad addresses automatically, which keeps the SES account in good standing.

## 3. The list

1. In Listmonk **Lists**, create `The Select Weekly`: type **Public**, opt-in **Double**.
2. In **Settings > Privacy**, keep public subscription on. Turn on the built-in captcha if spam signups show up.
3. Edit the opt-in and welcome templates to match the brand (seal, Syne headings, plain language).
4. Turn on the public archive so past issues are readable and searchable on the web.

## 4. Connect the site

In `src/site.mjs` set:

```js
export const NEWSLETTER = {
	name: 'The Select Weekly',
	action: 'https://news.creators.select/subscription/form',
	listUuid: '<the list UUID from Listmonk>',
};
```

Deploy. The News pages switch from the "launching soon" card to the live form. Subscribers get a confirmation email (double opt-in), and Listmonk shows its own thank-you page.

## Sending rules

- Every issue cites its sources, like the site.
- Sponsored slots are labeled as sponsored, and affiliate links are labeled as affiliate (FTC).
- Never import a list we did not collect ourselves.
