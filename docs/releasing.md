# Versions and release notes

The site has a version number (in `package.json`), a changelog ([`CHANGELOG.md`](../CHANGELOG.md), shown at [creators.select/changelog](https://creators.select/changelog/)) and a [GitHub Release](https://github.com/shifulaboratories/creators/releases) for each version. This is how they stay in step.

## The version number

`MAJOR.MINOR.PATCH`, [semantic versioning](https://semver.org) adapted for a website, where "breaking" means breaking for readers.

| Bump | When | Examples |
| --- | --- | --- |
| **PATCH** `0.7.0 → 0.7.1` | Fixes and small edits. Nothing new to find. | A wrong number corrected, a typo, a broken link, a faster page, new sources on an existing guide |
| **MINOR** `0.7.1 → 0.8.0` | Something new to read or use, or a big rewrite. | A new section, guide, tool or language; a redesigned page; a guide rewritten top to bottom |
| **MAJOR** `0.x → 1.0.0` | The site changes what it is, or links people saved stop working. | **1.0.0 is the public launch**: guides published with bylines, CPA and lawyer reviews done. After that, a restructure that moves URLs |

While we're on `0.x`, keep shipping MINORs freely; going to `1.0.0` is William's call.

## Every pull request: add a note

If a reader would notice the change, add one file in [`changes/`](../changes/README.md):

```md
---
type: added
bump: minor
---
**Who reps who.** Search talent agencies by the creators they represent. (#48)
```

- `type`: `added` (shows as "New"), `changed` ("Improved"), `fixed`, `removed`.
- `bump`: what this change alone deserves, from the table above.
- The line: **bold name of the thing.** Then what a creator can now do, in plain words. End with the PR number if you know it. No file names, no "refactor", no internal jargon.

No note for changes readers can't see (CI, docs in `docs/`, refactors). Say "No reader-facing change" in the PR template instead.

Don't edit `CHANGELOG.md` directly in a feature PR: notes in `changes/` never conflict, edits to one file do.

### Writing good notes

| Instead of | Write |
| --- | --- |
| Add AgencyRoster component and search index | **Who reps who.** Search talent agencies by the creators they represent. |
| Fix tax-data.ts 2026 brackets | **Set-aside calculator** uses the 2026 tax brackets. |
| Refactor nav, update CSS | **Menu** is shorter: four groups, and search is always one tap away. |

Lead with the benefit. One line. If it needs a paragraph, the guide itself should explain it.

## Cutting a release

Whoever is coordinating (the coordinator or the standing audit thread) cuts a release when `changes/` has notes, about once a day or after a big feature lands.

1. Branch from the latest `main`.
2. Preview: `npm run release -- --title "Agency rosters" --dry`
3. Run it: `npm run release -- --title "Agency rosters" --summary "One sentence on what this update means for creators."`
   - It picks the biggest `bump` among the notes (override with `--bump minor`), writes the new section at the top of `CHANGELOG.md`, bumps `package.json` and `package-lock.json`, and deletes the notes.
4. Commit as `Release 0.8.0`, open a PR, merge it.
5. On merge, [`.github/workflows/release.yml`](../.github/workflows/release.yml) tags `v0.8.0` and publishes the GitHub Release with the same notes. The site's `/changelog/` updates with the deploy.

Titles are a few words a reader would care about ("Spanish, Portuguese and free tools"), not "Misc updates".

## Fixing a release

- **A note was wrong:** edit the section in `CHANGELOG.md` in a normal PR, then edit the GitHub Release text to match. Don't change version numbers that are already out.
- **Forgot a note:** add it to `changes/`; it goes out with the next release.
- **The Release didn't publish:** run the Release workflow by hand (Actions > Release > Run workflow). It only creates a release for a version that has no tag yet.
