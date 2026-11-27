# Release notes waiting for the next version

Every pull request that changes something a reader can see adds one small file here. At release time `npm run release` folds them into `CHANGELOG.md` and deletes them. One file per PR means parallel PRs never conflict.

Name it after your branch or the change, e.g. `changes/agency-roster-search.md`:

```md
---
type: added      # added | changed | fixed | removed
bump: minor      # minor: something new to read or use · patch: fixes and small edits · major: see docs/releasing.md
---
**Who reps who.** Search talent agencies by the creators they represent. (#48)
```

One line, for creators, not developers. Full guide: [docs/releasing.md](../docs/releasing.md).
