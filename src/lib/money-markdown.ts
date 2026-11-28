/** Plain-text versions of the Earn and Deals widgets, for "Copy as Markdown" and llms.txt. */
import { bands, marketAverage, fees, paths, clauses, redlines, scripts, sources, cuts } from './money-data';
import { diffs, diffBefore, diffAfter, adTools, payPlans } from './deal-terms-data';

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
	CutCalculator:
		'Who takes a cut of a brand deal:\n\n' +
		cuts.map((c) => `- **${c.name}** (${Math.round(c.min * 100)}–${Math.round(c.max * 100)}%, taken from ${c.side === 'brand' ? 'the brand’s budget' : 'your gross fee'}): ${c.note}`).join('\n') +
		'\n\nExample: on a $10,000 fee, a 20% manager and a 10% agent leave $7,000 before taxes and costs.',
	DealsMap:
		'The six steps of a brand deal: 1. Get found (/deals/pitching-brands/) 2. Price it (/deals/pricing/) 3. Negotiate (/deals/negotiation/) 4. Fix the contract (/deals/redline-a-contract/, /deals/clause-library/) 5. Post it right (/deals/disclosure/) 6. Get paid (/deals/getting-paid/). Team and commissions: /deals/agencies-and-commissions/',
	ClauseDiff: diffs.map((d) => `- **${d.title}** (${d.where}). Theirs: "${diffBefore(d.text)}" Yours: "${diffAfter(d.text)}" Comment: ${d.say} Why: ${d.why}`).join('\n'),
	UsageBuilder:
		'Price rights as separate lines on top of the post fee. Usage on the brand’s own channels: +30–50% (Later 2026). Paid ads from your handle or theirs: +30–50% (Later 2026). Rule of thumb (creator-tested): 30 days at the low end, 90 days mid, 6 months at the top, 12 months as two periods; forever is a buyout quoted separately. Name the channels, the term and the start date, and keep ownership.',
	AdTools: adTools.map((t) => `- **${t.platform}: ${t.name}.** ${t.how} ${t.control} Watch for: ${t.watch}`).join('\n'),
	ExclusivityFloor:
		'Exclusivity fee floor (creator-tested): deals a year you would normally do inside the exclusivity × your average fee × months ÷ 12. Narrow it to named direct competitors and 30–90 days after the campaign (Revision Legal); it should not apply to a UGC-only deal.',
	PaymentTimeline: payPlans.map((p) => `- **${p.label}:** ${p.note}`).join('\n'),
	CommissionTerms:
		'Commission on gross vs net: on a $10,000 deal with $2,500 of costs, 20% on gross is $2,000 and 20% on net is $1,500. Managers usually take commission on gross (Pfeiffer Law); net and excluding deals you found are things to ask for. Sunset clause to ask for (creator-tested, at 20%): 10% for six months after the term, 5% for the next six, then nothing, only on deals they closed.',
	ScriptCards: scripts.map((s) => `### ${s.when}: ${s.title}\n\n\`\`\`\n${s.body}\n\`\`\``).join('\n\n'),
};
