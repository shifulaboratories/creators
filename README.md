# Select Creators

The free, open-source handbook for the creator economy, written by people who do the work.

**Site:** [creators.select](https://creators.select) · **Instagram:** [@selectcreators](https://www.instagram.com/selectcreators/)

Growth, money, deals, contracts, teams, tools and the gray market, covered A to Z. Every guide names its author and reviewer, every tool pick lists a free alternative, and every affiliate link is labeled where it appears.

## What's in here

| Path | What it holds |
| --- | --- |
| `src/content/docs/` | The guides, one Markdown file per page, grouped by section |
| `src/data/tools/` | One YAML file per tool; powers the Stack page and the future Stack picker |
| `src/content.config.ts` | The rules every guide and tool must follow (the build fails if they don't) |
| `src/site.mjs` | Site name, description and repo link in one place |

## Run it locally

Requires Node 22 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
```

## Contributing

Anyone can propose a change. Start with [CONTRIBUTING.md](CONTRIBUTING.md) and the [editorial standards](https://creators.select/about/editorial-standards/).

## How the site makes money

Affiliate links (labeled), clearly marked sponsorships, and the talent agency the team behind it is building. Details: [How we make money](https://creators.select/about/how-we-make-money/).

## License

- Code: [MIT](LICENSE).
- Written content: license to be decided (CC BY 4.0 or CC BY-NC-SA 4.0). Until then, all rights are reserved for the content in `src/content/`.
