# Deploys: how we know the live site updated

Cloudflare Workers Builds builds and deploys `main` on every merge. Sometimes a build fails before it starts and says nothing, so the site quietly stays on the old version (it happened with #87). Two pieces catch that:

1. **Build stamp.** Every build writes the commit it came from to [`/version.json`](https://creators.select/version.json) (`src/pages/version.json.ts`, never cached).
2. **Verify deploy** (`.github/workflows/verify-deploy.yml`). After each push to `main` it polls `/version.json` for up to 45 minutes until the live commit is the pushed one or newer. If Cloudflare reports the build as failed, or time runs out, it rebuilds `main` once through the Deploy Hook and waits again. If the site is still stale, the run fails and opens a **"Live site is stale"** issue assigned to the owner (labelled `internal`, so it stays off the public roadmap). The next good check closes it. It also runs every six hours to catch drift.

The retry needs the repository secret `CLOUDFLARE_DEPLOY_HOOK` (Cloudflare > Workers & Pages > creators > Settings > Builds > Deploy Hooks, branch `main`). It's the same secret the roadmap refresh uses. Without it, the check still alerts but can't retry.

**Why 45 minutes:** Cloudflare Workers Builds runs one build at a time for the account, and every PR branch gets a preview build too. On 2026-11-27, with many threads open, production builds sat in that queue for 30+ minutes. To shorten the queue, turn off preview builds for non-production branches (Cloudflare > Workers & Pages > creators > Settings > Builds > Branch control); GitHub CI already builds every PR.

Check by hand:

```sh
EXPECTED=$(git rev-parse origin/main) WAIT_MINUTES=0 scripts/verify-deploy.sh
```

To fix a stale site: open the failed build in Cloudflare (Workers & Pages > creators > Deployments), read the log, and select **Retry build**, or run the workflow from the Actions tab.

Cost: GitHub Actions minutes on a public repo are free, and `/version.json` is a static file.
