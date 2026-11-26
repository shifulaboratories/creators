/**
 * Data behind the Money basics pages (US federal rules, tax year 2026).
 * Every figure comes from a source in `sources`, read on the date in CHECKED.
 * To update for a new tax year: change the numbers here, change CHECKED and TAX_YEAR,
 * and list what changed in the pull request. Nothing here is tax advice.
 */

export const CHECKED = 'Nov 26, 2026';
export const TAX_YEAR = 2026;

export type Source = { id: string; name: string; publisher: string; date: string; url: string };

export const sources: Record<string, Source> = {
	rp2532: {
		id: 'rp2532',
		name: 'Rev. Proc. 2025-32: 2026 tax brackets, standard deduction and QBI thresholds',
		publisher: 'IRS',
		date: 'Oct 2025',
		url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf',
	},
	se: {
		id: 'se',
		name: 'Self-employment tax (Social Security and Medicare taxes)',
		publisher: 'IRS',
		date: 'Updated Oct 30, 2026',
		url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes',
	},
	schse: {
		id: 'schse',
		name: 'Schedule SE (Form 1040) 2026',
		publisher: 'IRS',
		date: 'Apr 2026',
		url: 'https://www.irs.gov/pub/irs-pdf/f1040sse.pdf',
	},
	ssa: {
		id: 'ssa',
		name: 'Contribution and benefit base',
		publisher: 'Social Security Administration',
		date: 'Checked Nov 26, 2026',
		url: 'https://www.ssa.gov/oact/COLA/cbb.html',
	},
	es: {
		id: 'es',
		name: 'Form 1040-ES (2026): Estimated tax for individuals',
		publisher: 'IRS',
		date: 'Feb 12, 2026',
		url: 'https://www.irs.gov/pub/irs-pdf/f1040es.pdf',
	},
	estimated: {
		id: 'estimated',
		name: 'Estimated taxes',
		publisher: 'IRS',
		date: 'Updated Nov 23, 2026',
		url: 'https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes',
	},
	k1099: {
		id: 'k1099',
		name: 'Form 1099-K FAQs: General information',
		publisher: 'IRS',
		date: 'Updated Nov 24, 2026',
		url: 'https://www.irs.gov/newsroom/form-1099-k-faqs-general-information',
	},
	gig: {
		id: 'gig',
		name: 'The Working Families Tax Cuts: What gig economy workers should know (FS-2026-07)',
		publisher: 'IRS',
		date: 'Mar 2026',
		url: 'https://www.irs.gov/newsroom/the-working-families-tax-cuts-what-gig-economy-workers-should-know',
	},
	p1099: {
		id: 'p1099',
		name: 'Publication 1099 (2026): General instructions for information returns',
		publisher: 'IRS',
		date: 'Mar 19, 2026',
		url: 'https://www.irs.gov/pub/irs-pdf/p1099.pdf',
	},
	barter: {
		id: 'barter',
		name: 'Topic no. 420, Bartering income',
		publisher: 'IRS',
		date: 'Updated Oct 8, 2026',
		url: 'https://www.irs.gov/taxtopics/tc420',
	},
	homeoffice: {
		id: 'homeoffice',
		name: 'Simplified option for home office deduction',
		publisher: 'IRS',
		date: 'Updated Mar 2, 2026',
		url: 'https://www.irs.gov/businesses/small-businesses-self-employed/simplified-option-for-home-office-deduction',
	},
	mileage: {
		id: 'mileage',
		name: 'IRS sets 2026 business standard mileage rate at 72.5 cents per mile (IR-2025-128)',
		publisher: 'IRS',
		date: 'Dec 29, 2025',
		url: 'https://www.irs.gov/newsroom/irs-sets-2026-business-standard-mileage-rate-at-725-cents-per-mile-up-25-cents',
	},
	p334: {
		id: 'p334',
		name: 'Publication 334 (2025): Tax guide for small business (for individuals who use Schedule C)',
		publisher: 'IRS',
		date: 'For 2025 returns',
		url: 'https://www.irs.gov/publications/p334',
	},
	p463: {
		id: 'p463',
		name: 'Publication 463 (2025): Travel, gift, and car expenses',
		publisher: 'IRS',
		date: 'For 2025 returns',
		url: 'https://www.irs.gov/publications/p463',
	},
	soleprop: {
		id: 'soleprop',
		name: 'Sole proprietorships',
		publisher: 'IRS',
		date: 'Updated Jun 28, 2026',
		url: 'https://www.irs.gov/businesses/small-businesses-self-employed/sole-proprietorships',
	},
	records: {
		id: 'records',
		name: 'How long should I keep records?',
		publisher: 'IRS',
		date: 'Updated Jun 30, 2026',
		url: 'https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records',
	},
	smllc: {
		id: 'smllc',
		name: 'Single member limited liability companies',
		publisher: 'IRS',
		date: 'Updated Jul 27, 2026',
		url: 'https://www.irs.gov/businesses/small-businesses-self-employed/single-member-limited-liability-companies',
	},
	scorp: {
		id: 'scorp',
		name: 'S corporation compensation and medical insurance issues',
		publisher: 'IRS',
		date: 'Updated Mar 3, 2026',
		url: 'https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues',
	},
	f2553: {
		id: 'f2553',
		name: 'Instructions for Form 2553 (electing S corporation status)',
		publisher: 'IRS',
		date: 'Rev. Dec 2020, checked Nov 26, 2026',
		url: 'https://www.irs.gov/instructions/i2553',
	},
	ein: {
		id: 'ein',
		name: 'Get an employer identification number',
		publisher: 'IRS',
		date: 'Updated Oct 16, 2026',
		url: 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number',
	},
	caftb: {
		id: 'caftb',
		name: 'Limited liability company (LLC)',
		publisher: 'California Franchise Tax Board',
		date: 'Updated Mar 5, 2026',
		url: 'https://www.ftb.ca.gov/file/business/types/limited-liability-company/index.html',
	},
	retire: {
		id: 'retire',
		name: '401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500 (IR-2025-111)',
		publisher: 'IRS',
		date: 'Nov 13, 2025',
		url: 'https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500',
	},
	solo401k: {
		id: 'solo401k',
		name: 'One-participant 401(k) plans',
		publisher: 'IRS',
		date: 'Updated Apr 9, 2026',
		url: 'https://www.irs.gov/retirement-plans/one-participant-401k-plans',
	},
	n2567: {
		id: 'n2567',
		name: 'Notice 2025-67: 2026 retirement plan limits',
		publisher: 'IRS',
		date: 'Nov 2025',
		url: 'https://www.irs.gov/pub/irs-drop/n-25-67.pdf',
	},
	ytTax: {
		id: 'ytTax',
		name: 'U.S. tax requirements for YouTube earnings',
		publisher: 'YouTube Help',
		date: 'Checked Nov 26, 2026',
		url: 'https://support.google.com/youtube/answer/10391362',
	},
	synapse: {
		id: 'synapse',
		name: '“I have no money”: Thousands of Americans see their savings vanish in Synapse fintech crisis',
		publisher: 'NBC News',
		date: '2024',
		url: 'https://www.nbcnews.com/business/consumer/-no-money-thousands-americans-see-savings-vanish-synapse-fintech-crisi-rcna181419',
	},
};

export type Status = 'single' | 'mfj' | 'hoh';

/** Ordinary income brackets for 2026: [upper bound of taxable income, rate]. Rev. Proc. 2025-32. */
export const brackets: Record<Status, [number, number][]> = {
	single: [
		[12400, 0.1],
		[50400, 0.12],
		[105700, 0.22],
		[201775, 0.24],
		[256225, 0.32],
		[640600, 0.35],
		[Infinity, 0.37],
	],
	mfj: [
		[24800, 0.1],
		[100800, 0.12],
		[211400, 0.22],
		[403550, 0.24],
		[512450, 0.32],
		[768700, 0.35],
		[Infinity, 0.37],
	],
	hoh: [
		[17700, 0.1],
		[67450, 0.12],
		[105700, 0.22],
		[201750, 0.24],
		[256200, 0.32],
		[640600, 0.35],
		[Infinity, 0.37],
	],
};

export const standardDeduction: Record<Status, number> = { single: 16100, mfj: 32200, hoh: 24150 };

/** Self-employment tax pieces (IRS SE tax page; Schedule SE 2026; SSA). */
export const se = {
	netFactor: 0.9235,
	ssRate: 0.124,
	medicareRate: 0.029,
	wageBase: 184500,
	wageBase2027: 192300,
	addlMedicareRate: 0.009,
	addlMedicareThreshold: { single: 200000, mfj: 250000, hoh: 200000 } as Record<Status, number>,
	minimum: 400,
};

/** Estimated tax for 2026 (Form 1040-ES 2026). */
export const estimates = {
	owe: 1000,
	safeHarborCurrent: 0.9,
	safeHarborPrior: 1.0,
	safeHarborPriorHighIncome: 1.1,
	highIncomeAgi: 150000,
	due: [
		{ date: '2026-04-15', label: 'Apr 15, 2026', covers: 'Jan 1 to Mar 31, 2026' },
		{ date: '2026-06-15', label: 'Jun 15, 2026', covers: 'Apr 1 to May 31, 2026' },
		{ date: '2026-09-15', label: 'Sep 15, 2026', covers: 'Jun 1 to Aug 31, 2026' },
		{ date: '2027-01-15', label: 'Jan 15, 2027', covers: 'Sep 1 to Dec 31, 2026' },
	],
};

export const misc = {
	mileageCents: 72.5,
	homeOfficePerSqFt: 5,
	homeOfficeMaxSqFt: 300,
	k1099Threshold: 20000,
	k1099Transactions: 200,
	nec1099Threshold: 2000,
	qbiThreshold: { single: 201750, mfj: 403500, hoh: 201750 } as Record<Status, number>,
	deferral401k: 24500,
	ira: 7500,
	dcLimit: 72000,
	caMinimumTax: 800,
};

/** Federal income tax on taxable income for a filing status. */
export function incomeTax(taxable: number, status: Status): number {
	let tax = 0;
	let floor = 0;
	for (const [cap, rate] of brackets[status]) {
		if (taxable <= floor) break;
		tax += (Math.min(taxable, cap) - floor) * rate;
		floor = cap;
	}
	return tax;
}

/** Self-employment tax on a year's net profit, given W-2 wages already counted toward the wage base. */
export function seTax(profit: number, wages: number, status: Status) {
	const net = Math.max(0, profit) * se.netFactor;
	if (net < se.minimum) return { net, ss: 0, medicare: 0, addl: 0, total: 0 };
	const ss = Math.max(0, Math.min(net, se.wageBase - wages)) * se.ssRate;
	const medicare = net * se.medicareRate;
	const over = Math.max(0, wages + net - se.addlMedicareThreshold[status]) - Math.max(0, wages - se.addlMedicareThreshold[status]);
	const addl = over * se.addlMedicareRate;
	return { net, ss, medicare, addl, total: ss + medicare + addl };
}

/**
 * Federal tax that a year's creator profit adds on top of a day job.
 * Ignores the QBI deduction and credits on purpose, so it leans high (the safe side).
 */
export function setAside(profit: number, wages: number, status: Status, stateRate: number) {
	const s = seTax(profit, wages, status);
	const halfSe = (s.ss + s.medicare) / 2;
	const taxable = (w: number, p: number, h: number) => Math.max(0, w + p - h - standardDeduction[status]);
	const income = incomeTax(taxable(wages, profit, halfSe), status) - incomeTax(taxable(wages, 0, 0), status);
	const state = Math.max(0, profit - halfSe) * stateRate;
	const total = income + s.total + state;
	return { income, se: s.total, state, total, rate: profit > 0 ? total / profit : 0 };
}

/** Rough yearly payroll-tax saving from an S corp election vs. a sole proprietor or default LLC. */
export function scorpCheck(profit: number, salary: number, costs: number, status: Status) {
	const pay = Math.min(salary, profit);
	const soleSe = seTax(profit, 0, status).total;
	// Employer + employee FICA on the salary (both halves are paid by the business you own).
	const ficaSs = Math.min(pay, se.wageBase) * se.ssRate;
	const ficaMed = pay * se.medicareRate + Math.max(0, pay - se.addlMedicareThreshold[status]) * se.addlMedicareRate;
	const payroll = ficaSs + ficaMed;
	return { soleSe, payroll, saved: soleSe - payroll, net: soleSe - payroll - costs, pay };
}

export const fmtUsd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
