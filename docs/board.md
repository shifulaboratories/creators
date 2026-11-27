# The board: how we plan and track work

Everything we're building lives in **[GitHub Issues](https://github.com/shifulaboratories/creators/issues)**. The public board at **[creators.select/roadmap](https://creators.select/roadmap/)** is built from those issues, so there's one list, and everyone (William, every Claude thread, contributors) uses it.

`docs/backlog.md` stays as the audit's long-form notes and scoring. When an audit round finds something worth doing, it becomes an issue; the backlog row links to it.

## Columns

| Column on /roadmap/ | How an issue gets there |
| --- | --- |
| **Now** | Open, labeled `status: in progress`. Someone is building it. |
| **Now, marked Waiting** | Open, labeled `status: blocked`. Paused on something outside the team: a key William has to add, an expert review. Say what in a comment. |
| **Next** | Open, labeled `status: next`. Up after what's in progress. |
| **Later** | Open, no status label. The backlog. |
| **Shipped** | Closed as **completed**. Usually closed for you by a merged PR that says `Closes #N`. |
| hidden | Closed as **not planned**, or labeled `internal`. |

One status label at a time. Moving a card is changing its label.

## Labels

Defined once in [`.github/labels.yml`](../.github/labels.yml) and synced to GitHub when that file changes on `main`. Every issue gets:

- **one `area:`**: platforms, grow, deals, paywall, earn, money, team, stack, protect, underground, tools, rates, translations, site
- **one `type:`**: `feature` (something new to use), `content` (a guide), `fix`, `review` (a CPA or lawyer has to check it)
- **a priority** when it's known: `P0` blocks launch or hurts trust, `P1` next workstreams, `P2` worth doing, `P3` someday. Cards sort by it.

Add a new area in `labels.yml` **and** in `AREAS` in `src/lib/roadmap-core.mjs` (its name on the site) **and** a dot color in `src/pages/roadmap.astro`.

## Writing an issue

The roadmap is public, so the top of each issue is written for creators:

```md
One or two plain sentences: what a creator gets when this ships.

---

**For the team**
- Anything else: files, PRs, decisions, what it's blocked on.
```

- **Title:** what the reader gets, in their words. "Search agency rosters", not "Add AgencyRoster.astro".
- **First paragraph:** shows on the card (cut at about 220 characters). No internal names, no promises of dates.
- **After the `---`:** for us. It's still public on GitHub, so nothing private (no contact details, money, deal terms). Anything truly private stays out of the repo; use `internal` for cards that shouldn't show on the site.

## How every thread uses the board

Claude threads use the GitHub tools (`issue_write`, `list_issues`); people use the GitHub website.

1. **Starting work:** find the issue (`list_issues`, or search). If there isn't one, create it. Set `status: in progress` and remove `status: next`.
2. **Opening a PR:** put `Closes #N` in the PR description so merging ships the card. Add a release note in `changes/` (see [releasing.md](releasing.md)).
3. **Blocked on William or an expert:** switch to `status: blocked` and comment with exactly what's needed and where (for example "Add TURNSTILE_SECRET in Cloudflare > creators > Settings > Variables"). Tell William in the thread too.
4. **Found new work along the way:** open an issue for it with no status (Later) rather than growing the current PR.
5. **Done without a PR** (a review that came back clean, a setting changed): close the issue as completed with a one-line comment.
6. **Dropping something:** close as *not planned* with the reason.
7. **Picking the next thing:** take the highest-priority card in Next; if Next is empty, promote from Later and say so.

The coordinator reviews the board when planning: keep Now to what's actually being built, and Next to roughly the next week.

## When the site updates

`/roadmap/` is rebuilt on every deploy of `main`, which happens on every merge. To also rebuild when an issue changes between merges, add a Cloudflare Deploy Hook:

1. Cloudflare dashboard > Workers & Pages > **creators** > Settings > Builds > **Deploy Hooks** > name it `roadmap`, branch `main` > Create, and copy the URL.
2. GitHub > the repo > Settings > Secrets and variables > Actions > **New repository secret**, name `CLOUDFLARE_DEPLOY_HOOK`, paste the URL.

`.github/workflows/roadmap.yml` then rebuilds about two minutes after issue edits settle.

GitHub allows 60 unauthenticated API requests an hour per IP, and Cloudflare's build machines are shared, so the build can get rate limited. When that happens it uses the committed snapshot in `src/data/roadmap-snapshot.json` and logs a warning. To avoid it, add a build variable `GITHUB_TOKEN` in Cloudflare (Settings > Builds > Variables) set to a fine-grained GitHub token with **public repositories, read-only** access. Refresh the snapshot now and then with `npm run roadmap:snapshot`.

## A GitHub Projects board (optional)

If William wants a drag-and-drop board inside GitHub too: GitHub > shifulaboratories > Projects > New project > **Board**, name it "Select Creators roadmap", then in the project's ⋯ menu > Workflows turn on **Auto-add to project** (repo `creators`, filter `is:issue`) and **Item closed → Done**. The Projects "Status" field is separate from our labels, so treat labels as the source of truth (the site reads labels) and use the project as a view. Our Claude tools can't edit Projects fields, which is why the labels carry the status.
