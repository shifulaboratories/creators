/** Plain-text versions of the Earn and Deals widgets, for "Copy as Markdown" and llms.txt. */
import { bands, marketAverage, fees, paths, clauses, redlines, scripts, sources } from './money-data';

const usd = (n: number | null) => (n === null ? 'and up' : '$' + n.toLocaleString('en-US'));
const fmtFollowers = (n: number | null) => (n === null ? '+' : n >= 1e6 ? n / 1e6 + 'M' : n / 1e3 + 'K');

export const moneyWidgetText: Record<string, string> = {
	RateCalculator:
		'Published brand-deal rate ranges (USD per deliverable):\n\n| Platform | Format | Source | Tier | Followers | Range |\n| --- | --- | --- | --- | --- | --- |\n' +
		Object.entries(bands)
			.flatMap(([p, fs]) =>
				Object.entries(fs).flatMap(([f, list]) =>
					(list ?? []).map((b) => `| ${p} | ${f} | ${sources[b.src].publisher} (${sources[b.src].date}) | ${b.label} | ${fmtFollowers(b.min)}–${fmtFollowers(b.max)} | ${usd(b.lo)}–${usd(b.hi)} |`),
				),
			)
			.join('\n') +
		`\n\nAverage deal paid on Collabstr (2025, all sizes): YouTube $${marketAverage.youtube}, Instagram $${marketAverage.instagram}, TikTok $${marketAverage.tiktok}.\nAdd-ons (Later 2026): usage rights +30–50%, paid ads/whitelisting +30–50%. Peak season +20–30% (Collabstr). Exclusivity: no published benchmark.`,
	KeepCalculator: fees.map((f) => `- **${f.name}:** ${f.note} Source: ${sources[f.src].url}`).join('\n'),
	IncomePaths: paths.map((p) => `- **${p.name}.** Who pays: ${p.who} What you keep: ${p.keep} Starts: ${p.starts} Watch out: ${p.watch}`).join('\n'),
	ClauseLibrary: clauses
		.map((c) => `### ${c.name}\n${c.plain}\n- Normal: ${c.normal}\n- Red flag: ${c.flag}\n- Watch for: "${c.bad}"\n- Ask for: "${c.fix}"\n- Ask the brand: "${c.ask}"`)
		.join('\n\n'),
	RedlineWalkthrough: redlines.map((r) => `- **${r.title}** (${r.pass}): change "${r.cut}" to "${r.add}". Why: ${r.why}`).join('\n'),
	ScriptCards: scripts.map((s) => `### ${s.when}: ${s.title}\n\n\`\`\`\n${s.body}\n\`\`\``).join('\n\n'),
};
