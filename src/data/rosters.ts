/**
 * "Who reps who": creator signings that were REPORTED in the press, plus the
 * software agencies name in their own public job postings.
 *
 * Rules (see /team/rosters/):
 * - Every row links the article or posting it came from, with its date.
 * - A row says what was reported on that date. Representation changes, so we
 *   never claim it is current.
 * - Public figures only. No staff names, no minors, no family channels built
 *   around children, no private data. No LinkedIn or scraping against a site's terms.
 * - Removal or correction: support@creators.select.
 */

export type AgencyId =
	| 'caa'
	| 'wme'
	| 'uta'
	| 'a3'
	| 'abrams'
	| 'dba'
	| 'night'
	| 'select'
	| 'fixated'
	| 'whalar'
	| 'palette';

export interface Agency {
	name: string;
	kind: 'Talent agency' | 'Management' | 'Network' | 'Brand-side' | 'Marketplace';
	tint: string;
	note?: string;
}

export const agencies: Record<AgencyId, Agency> = {
	caa: { name: 'CAA', kind: 'Talent agency', tint: 'is-champagne' },
	wme: { name: 'WME', kind: 'Talent agency', tint: 'is-champagne' },
	uta: { name: 'UTA', kind: 'Talent agency', tint: 'is-champagne', note: 'Owns Digital Brand Architects since 2019' },
	a3: { name: 'A3 Artists Agency', kind: 'Talent agency', tint: 'is-champagne' },
	abrams: { name: 'Abrams Artists Agency', kind: 'Talent agency', tint: 'is-champagne' },
	dba: { name: 'Digital Brand Architects', kind: 'Management', tint: 'is-ion', note: 'Part of UTA' },
	night: { name: 'Night', kind: 'Management', tint: 'is-ion' },
	select: { name: 'Select Management Group', kind: 'Management', tint: 'is-ion' },
	fixated: { name: 'Fixated / Studio71', kind: 'Network', tint: 'is-amethyst', note: 'Fixated bought Studio71’s North American network in 2026' },
	whalar: { name: 'Whalar', kind: 'Brand-side', tint: 'is-rose', note: 'Works for brands. Part of Accenture Song' },
	palette: { name: 'Palette Media', kind: 'Management', tint: 'is-ion' },
};

/** signed: reported signing. roster: named as a client in reporting. left: reported departure. */
export type Event = 'signed' | 'roster' | 'left';

/** [creator(s), agency, event, date YYYY-MM-DD, source URL] */
type Row = [string, AgencyId, Event, string, string];

const TF = 'https://www.tubefilter.com/';
const rows: Row[] = [
	// CAA
	['Justin Watkins (ThinkNoodles)', 'caa', 'signed', '2024-06-12', TF + '2024/06/12/caa-signs-justin-watkins-think-noodles-roblox-gamer/'],
	['Lilypichu', 'caa', 'signed', '2024-06-20', TF + '2024/06/20/talent-agency-caa-signs-streamer-lilypichu-exclusive/'],
	['Jaiden Animations', 'caa', 'signed', '2022-11-11', TF + '2022/11/11/jaiden-animation-signs-caa-representation-creative-artists-agency/'],
	['Ninja', 'caa', 'signed', '2020-10-13', TF + '2020/10/13/following-return-to-twitch-ninja-signs-with-caa/'],
	['Lele Pons', 'caa', 'signed', '2020-09-11', TF + '2020/09/11/lele-pons-signs-with-caa/'],
	['Jesse Cox', 'caa', 'signed', '2020-03-23', TF + '2020/03/23/caa-signs-jesse-cox-bruce-greene/'],
	['Bruce Greene', 'caa', 'signed', '2020-03-23', TF + '2020/03/23/caa-signs-jesse-cox-bruce-greene/'],
	['Patricia Bright', 'caa', 'signed', '2017-09-29', TF + '2017/09/29/caa-signs-lifestyle-creator-patricia-bright/'],
	['Gabbie Hanna', 'caa', 'signed', '2017-07-27', TF + '2017/07/27/caa-the-gabbie-show-hanna/'],
	['Coyote Peterson', 'caa', 'signed', '2017-03-20', TF + '2017/03/20/tanner-braungardt-coyote-peterson-caa/'],
	['Logan Paul', 'caa', 'signed', '2015-12-01', TF + '2015/12/01/logan-paul-signs-with-caa/'],
	['Yousef Erakat (FouseyTUBE)', 'caa', 'signed', '2015-10-06', TF + '2015/10/06/yousef-erakat-fousey-tube-caa/'],
	['Bart Baker', 'caa', 'signed', '2015-06-30', TF + '2015/06/30/bart-baker-talent-agency-caa/'],
	['Jenna Marbles', 'caa', 'signed', '2015-04-28', TF + '2015/04/28/jenna-marbles-mourey-caa-creative-artists-agency/'],
	['Swoozie', 'caa', 'signed', '2015-04-06', TF + '2015/04/06/adande-swoozie-thorne-is-latest-youtube-star-to-join-caa/'],
	['Kian Lawley', 'caa', 'signed', '2015-03-16', TF + '2015/03/16/kian-lawley-jc-caylen-creative-artists-agency/'],
	['JC Caylen', 'caa', 'signed', '2015-03-16', TF + '2015/03/16/kian-lawley-jc-caylen-creative-artists-agency/'],
	['Timothy DeLaGhetto', 'caa', 'signed', '2015-03-09', TF + '2015/03/09/timothy-delaghetto-signs-with-creative-artists-agency/'],
	// WME
	['Doug DeMuro', 'wme', 'signed', '2023-11-16', TF + '2023/11/16/wme-signs-doug-demuro-cars-and-bids-talent-agency/'],
	['Chef Reactions', 'wme', 'signed', '2023-04-06', TF + '2023/04/06/chef-reactions-signs-with-wme/'],
	['Leo Gonzalez', 'wme', 'signed', '2023-03-22', TF + '2023/03/22/wme-signs-tiktok-star-leo-gonzalez/'],
	['Party Shirt', 'wme', 'signed', '2022-11-22', TF + '2022/11/22/party-shirt-signs-talent-agency-wme-representation-exclusive/'],
	['Lynja', 'wme', 'signed', '2022-08-24', TF + '2022/08/24/internet-cooking-grandma-lynja-signs-with-wme/'],
	['The Deal Guy (Matt Granite)', 'wme', 'signed', '2022-05-20', TF + '2022/05/20/the-deal-guy-matt-granite-wme-agency-sign-deal/'],
	['Tinx', 'wme', 'signed', '2022-01-13', TF + '2022/01/13/tiktok-star-tinx-signs-with-wme/'],
	['Logan Paul', 'wme', 'signed', '2021-07-29', TF + '2021/07/29/logan-paul-signs-with-wme-leaving-caa/'],
	['Logan Paul', 'caa', 'left', '2021-07-29', TF + '2021/07/29/logan-paul-signs-with-wme-leaving-caa/'],
	['Sarah Cooper', 'wme', 'signed', '2020-06-11', TF + '2020/06/11/viral-tiktok-satirist-sarah-cooper-wme/'],
	['Addison Rae', 'wme', 'signed', '2020-01-21', TF + '2020/01/21/wme-signs-tiktok-star-addison-rae/'],
	['Estée Lalonde', 'wme', 'signed', '2018-01-26', TF + '2018/01/26/wme-signs-estee-lalonde/'],
	['Lele Pons', 'wme', 'signed', '2017-12-13', TF + '2017/12/13/lele-pons-signs-with-wme/'],
	['Donut Media', 'wme', 'signed', '2017-07-10', TF + '2017/07/10/wme-signs-car-focused-online-video-startup-donut-media/'],
	['iJustine', 'wme', 'signed', '2017-07-20', TF + '2017/07/20/ijustine-wme-talent-agency/'],
	['Nadeshot', 'wme', 'signed', '2017-05-17', TF + '2017/05/17/wme-signs-matthew-nadeshot-haag/'],
	['Jake Paul', 'wme', 'signed', '2017-04-13', TF + '2017/04/13/jake-paul-signs-with-wme/'],
	['Meg DeAngelis', 'wme', 'signed', '2016-12-12', TF + '2016/12/12/meg-deangelis-wme/'],
	['Markiplier', 'wme', 'signed', '2016-11-16', TF + '2016/11/16/mark-markiplier-fischbach-signs-with-wme/'],
	['Jon Cozart', 'wme', 'signed', '2016-04-28', TF + '2016/04/28/wme-signs-jon-cozart-andrea-russett-eh-bee-family/'],
	['Andrea Russett', 'wme', 'signed', '2016-04-28', TF + '2016/04/28/wme-signs-jon-cozart-andrea-russett-eh-bee-family/'],
	['Amanda Steele', 'wme', 'signed', '2016-03-01', TF + '2016/03/01/amanda-steele-makeupbymandy24-beauty-fashion-signs-with-wme-img-models/'],
	['melodysheep', 'wme', 'signed', '2015-11-24', TF + '2015/11/24/john-boswell-melodysheep-wme/'],
	['Casey Neistat', 'wme', 'signed', '2015-08-19', TF + '2015/08/19/youtube-stars-caspar-lee-elise-strachan-casey-neistat-sign-with-wme/'],
	['Caspar Lee', 'wme', 'signed', '2015-08-19', TF + '2015/08/19/youtube-stars-caspar-lee-elise-strachan-casey-neistat-sign-with-wme/'],
	['Elise Strachan', 'wme', 'signed', '2015-08-19', TF + '2015/08/19/youtube-stars-caspar-lee-elise-strachan-casey-neistat-sign-with-wme/'],
	['The Fine Brothers', 'wme', 'signed', '2013-11-18', TF + '2013/11/18/the-fine-bros-wme-talent-agency/'],
	// UTA
	['Airrack', 'uta', 'signed', '2023-09-28', TF + '2023/09/28/airrack-eric-decker-signs-uta-talent-agency-representation/'],
	['Alix Earle', 'uta', 'signed', '2023-03-15', TF + '2023/03/15/uta-signs-the-alix-earle-effect-tiktok-it-girl/'],
	['Zhong', 'uta', 'signed', '2022-11-09', TF + '2022/11/09/youtube-shorts-zhong-signs-uta-agency-representation/'],
	['Shxtou', 'uta', 'signed', '2022-08-17', TF + '2022/08/17/uta-signs-vtubers-shxtou-baoo-sykkuno/'],
	['Sykkuno', 'uta', 'signed', '2022-08-17', TF + '2022/08/17/uta-signs-vtubers-shxtou-baoo-sykkuno/'],
	['Kirsten Titus', 'uta', 'signed', '2022-06-09', TF + '2022/06/09/kirsten-titus-tiktok-food-hawaii-uta-agency/'],
	['ImperialHal', 'uta', 'signed', '2022-04-28', TF + '2022/04/28/uta-talent-agency-esports-gaming-imperial-hal-apex-legends/'],
	['Marcel Floruss', 'uta', 'signed', '2021-10-14', TF + '2021/10/14/uta-signs-marcel-floruss/'],
	['Devon Rodriguez', 'uta', 'signed', '2021-08-12', TF + '2021/08/12/devon-rodriguez-signs-with-uta/'],
	['Scump', 'uta', 'signed', '2019-09-24', TF + '2019/09/24/uta-signs-call-of-duty-star-scump/'],
	['Lucie Fink', 'uta', 'signed', '2019-01-29', TF + '2019/01/29/uta-signs-refinery29-star-lucie-fink/'],
	['Grace Helbig', 'uta', 'signed', '2018-05-02', TF + '2018/05/02/youtube-star-grace-helbig-signs-with-talent-agency-uta/'],
	['Miles McKenna', 'uta', 'signed', '2017-08-29', TF + '2017/08/29/miles-mckenna-talent-agency-uta/'],
	['Toby Turner', 'uta', 'signed', '2015-10-26', TF + '2015/10/26/toby-turner-signs-with-uta/'],
	['Eleventhgorgeous', 'uta', 'signed', '2015-10-06', TF + '2015/10/06/uta-signs-eleventhgorgeous/'],
	['Joey Graceffa', 'uta', 'signed', '2014-05-09', TF + '2014/05/09/joey-graceffa-united-talent-agency-uta/'],
	['Shane Dawson', 'uta', 'signed', '2013-07-23', TF + '2013/07/23/shane-dawson-united-talent-agency-uta/'],
	['iJustine', 'uta', 'signed', '2013-04-16', TF + '2013/04/16/ijustine-united-talent-agency/'],
	// Other agencies
	['Daryl-Ann Denner', 'a3', 'signed', '2023-06-02', TF + '2023/06/02/daryl-ann-denner-nuuds-signs-a3-artists-agency/'],
	['Chloe Morello', 'abrams', 'signed', '2018-10-05', TF + '2018/10/05/abrams-artists-agency-chloe-morello-luke-korns-jordyn-jones/'],
	['Luke Korns', 'abrams', 'signed', '2018-10-05', TF + '2018/10/05/abrams-artists-agency-chloe-morello-luke-korns-jordyn-jones/'],
	// Night
	['Kai Cenat', 'night', 'roster', '2023-08-25', TF + '2023/08/25/night-acquires-lfm-management/'],
	['Vanwives', 'night', 'signed', '2023-02-02', TF + '2023/02/02/vanwives-youtube-sign-with-night/'],
	['MrBeast', 'night', 'roster', '2022-09-13', TF + '2022/09/13/night-media-capital-investment-firm-100-million-the-chernin-group/'],
	['MrBeast', 'night', 'left', '2024-05-01', 'https://en.wikipedia.org/wiki/Night_(company)'],
	['Courtreezy', 'night', 'signed', '2022-08-31', TF + '2022/08/31/commentary-queen-courtreezy-signs-with-night-media-exclusive/'],
	['Aphmau', 'night', 'signed', '2021-06-24', TF + '2021/06/24/night-media-signs-top-minecraft-youtuber-aphmau-exclusive/'],
	['Mrwhosetheboss', 'night', 'signed', '2021-05-12', TF + '2021/05/12/night-media-mrwhosetheboss-arun-maini/'],
	['Guga', 'night', 'signed', '2021-04-09', TF + '2021/04/09/night-media-guga-foods-youtube-product-launch/'],
	['Moriah Elizabeth', 'night', 'signed', '2020-09-02', TF + '2020/09/02/night-media-youtube-artist-moriah-elizabeth/'],
	['AzzyLand', 'night', 'signed', '2020-06-10', TF + '2020/06/10/youtube-azzyland-night-media-exclusive/'],
	['Neeko', 'night', 'signed', '2020-04-27', TF + '2020/04/27/night-media-ok-boomer-tiktok-twitch-neeko/'],
	['ZHC', 'night', 'signed', '2020-04-14', TF + '2020/04/14/night-media-zhc-mrbeast-michael-gordon/'],
	// Digital Brand Architects
	['Jackie Aina', 'dba', 'signed', '2023-04-13', TF + '2023/04/13/jackie-aina-signs-talent-management-beauty-digital-brand-architects/'],
	['Mariam Daud', 'dba', 'signed', '2022-08-18', TF + '2022/08/18/tiktok-food-star-mariam-daxud-headlines-six-new-signings-for-digital-brand-architects/'],
	['Amanda Stanton', 'dba', 'signed', '2022-08-18', TF + '2022/08/18/tiktok-food-star-mariam-daxud-headlines-six-new-signings-for-digital-brand-architects/'],
	['Lauren Singer', 'dba', 'signed', '2022-08-18', TF + '2022/08/18/tiktok-food-star-mariam-daxud-headlines-six-new-signings-for-digital-brand-architects/'],
	['Mikayla Nogueira', 'dba', 'signed', '2021-06-11', TF + '2021/06/11/digital-brand-architects-antonio-garza-mikayla-nogueira/'],
	['Antonio Garza', 'dba', 'signed', '2021-06-11', TF + '2021/06/11/digital-brand-architects-antonio-garza-mikayla-nogueira/'],
	['Natalie Noel', 'dba', 'signed', '2020-07-21', TF + '2020/07/21/digital-brand-architects-natalie-noel-blair-imani/'],
	['Blair Imani', 'dba', 'signed', '2020-07-21', TF + '2020/07/21/digital-brand-architects-natalie-noel-blair-imani/'],
	['Giada De Laurentiis', 'dba', 'signed', '2019-07-30', TF + '2019/07/30/digital-brand-architects-food-giada/'],
	['The Defined Dish', 'dba', 'signed', '2019-07-30', TF + '2019/07/30/digital-brand-architects-food-giada/'],
	['Arnell Armon', 'dba', 'signed', '2019-06-13', TF + '2019/06/13/digital-brand-architects-arnell-armon/'],
	['Donal Skehan', 'dba', 'signed', '2019-03-11', TF + '2019/03/11/digital-brand-architects-signings/'],
	['Ronke Raji', 'dba', 'signed', '2019-03-11', TF + '2019/03/11/digital-brand-architects-signings/'],
	['Manny MUA', 'dba', 'signed', '2018-03-19', TF + '2018/03/19/digital-brand-architects-christina-jones-vp-talent/'],
	['Laura Lee', 'dba', 'signed', '2018-03-19', TF + '2018/03/19/digital-brand-architects-christina-jones-vp-talent/'],
	['Hunter McGrady', 'dba', 'roster', '2018-08-06', TF + '2018/08/06/digital-brand-architects-kirstin-enlow/'],
	['Andi Dorfman', 'dba', 'signed', '2017-05-16', TF + '2017/05/16/digital-brand-architects-signs-andi-dorfman-damsel-in-dior/'],
	['Greyson Chance', 'dba', 'signed', '2017-04-06', TF + '2017/04/06/greyson-chance-signs-with-digital-brand-architects/'],
	// Select Management Group
	['Nick & Sienna', 'select', 'signed', '2020-10-28', TF + '2020/10/28/select-management-signs-nick-sienna-ben-de-almeida/'],
	['Ben De Almeida', 'select', 'signed', '2020-10-28', TF + '2020/10/28/select-management-signs-nick-sienna-ben-de-almeida/'],
	['Miki Rai', 'select', 'signed', '2020-10-28', TF + '2020/10/28/select-management-signs-nick-sienna-ben-de-almeida/'],
	['Ally Hills', 'select', 'signed', '2020-10-28', TF + '2020/10/28/select-management-signs-nick-sienna-ben-de-almeida/'],
	['Gigi Gorgeous', 'select', 'roster', '2020-10-28', TF + '2020/10/28/select-management-signs-nick-sienna-ben-de-almeida/'],
	['Tyler Oakley', 'select', 'roster', '2020-10-28', TF + '2020/10/28/select-management-signs-nick-sienna-ben-de-almeida/'],
	['Amanda Steele', 'select', 'roster', '2020-10-28', TF + '2020/10/28/select-management-signs-nick-sienna-ben-de-almeida/'],
	['Eva Gutowski', 'select', 'roster', '2020-10-28', TF + '2020/10/28/select-management-signs-nick-sienna-ben-de-almeida/'],
	['Kelsey Darragh', 'select', 'signed', '2020-06-22', TF + '2020/06/22/select-management-signs-kelsey-darragh-aaron-burriss-hey-its-fei/'],
	['Hey It’s Fei', 'select', 'signed', '2020-06-22', TF + '2020/06/22/select-management-signs-kelsey-darragh-aaron-burriss-hey-its-fei/'],
	['Andrea Russett', 'select', 'signed', '2019-08-27', TF + '2019/08/27/select-management-andrea-russett-sky-brown-pose-johnny-sibilly/'],
	['Nikita Dragun', 'select', 'roster', '2017-09-29', TF + '2017/09/29/select-management-jake-webb-wolfieraps-nikita-dragun/'],
	['Loey Lane', 'select', 'roster', '2017-09-29', TF + '2017/09/29/select-management-jake-webb-wolfieraps-nikita-dragun/'],
	// Fixated / Studio71
	['Dhar Mann', 'fixated', 'roster', '2026-04-21', TF + '2026/04/21/fixated-acquires-studio71-north-american-creator-network/'],
	['Joey Graceffa', 'fixated', 'roster', '2026-04-21', TF + '2026/04/21/fixated-acquires-studio71-north-american-creator-network/'],
	['Unspeakable', 'fixated', 'roster', '2026-04-21', TF + '2026/04/21/fixated-acquires-studio71-north-american-creator-network/'],
	['Sketch', 'fixated', 'roster', '2026-04-21', TF + '2026/04/21/fixated-acquires-studio71-north-american-creator-network/'],
	['Botez Sisters', 'fixated', 'roster', '2026-04-21', TF + '2026/04/21/fixated-acquires-studio71-north-american-creator-network/'],
];

export interface Signing {
	creator: string;
	agency: AgencyId;
	event: Event;
	date: string;
	url: string;
	publisher: string;
}

const publisherOf = (url: string) =>
	url.includes('tubefilter.com') ? 'Tubefilter' : url.includes('wikipedia.org') ? 'Wikipedia' : new URL(url).hostname;

export const signings: Signing[] = rows
	.map(([creator, agency, event, date, url]) => ({ creator, agency, event, date, url, publisher: publisherOf(url) }))
	.sort((a, b) => b.date.localeCompare(a.date));

/** Software named in an agency's own public job postings. */
export interface ToolSighting {
	agency: AgencyId;
	tools: { name: string; how: string }[];
	posting: string;
	url: string;
	seen: string;
}

export const toolSightings: ToolSighting[] = [
	{
		agency: 'dba',
		posting: 'Talent Coordinator (Influencer Management)',
		url: 'https://recruiting.paylocity.com/Recruiting/Jobs/Details/4250436',
		seen: '2026-11-27',
		tools: [
			{ name: 'CreatorIQ', how: 'Traffic analysis' },
			{ name: 'Social Rank', how: 'Traffic analysis' },
			{ name: 'QuickBase', how: 'Preferred' },
			{ name: 'Google Analytics', how: 'Preferred' },
			{ name: 'Microsoft Office', how: 'Working knowledge' },
			{ name: 'Google Workspace', how: 'Working knowledge' },
			{ name: 'Box', how: 'Working knowledge' },
			{ name: 'Slack', how: 'Working knowledge' },
			{ name: 'Zoom', how: 'Working knowledge' },
			{ name: 'Adobe', how: 'Working knowledge' },
		],
	},
	{
		agency: 'dba',
		posting: 'Talent Coordinator (Influencer Management), NYC',
		url: 'https://www.netinfluencer.com/jobs/talent-coordinator-influencer-management-at-digital-brand-architects-new-york-city-2/',
		seen: '2026-11-27',
		tools: [
			{ name: 'Asana', how: 'Project management' },
			{ name: 'Trello', how: 'Project management' },
			{ name: 'Airtable', how: 'Project management' },
			{ name: 'Canva', how: 'Working knowledge' },
		],
	},
	{
		agency: 'whalar',
		posting: 'Client Business Lead, London',
		url: 'https://job-boards.greenhouse.io/whalarinc/jobs/6110533004',
		seen: '2026-11-27',
		tools: [{ name: 'Traackr', how: 'Measurement partner' }],
	},
	{
		agency: 'whalar',
		posting: 'Associate Director, Client Services',
		url: 'https://job-boards.greenhouse.io/whalarinc/jobs/6185470004',
		seen: '2026-11-27',
		tools: [{ name: 'Echo', how: 'Project workflow' }],
	},
	{
		agency: 'palette',
		posting: 'Influencer Talent Coordinator',
		url: 'https://www.builtinaustin.com/job/influencer-talent-coordinator/10425490',
		seen: '2026-11-27',
		tools: [
			{ name: 'Google Workspace', how: 'Working knowledge' },
			{ name: 'HubSpot', how: 'A plus' },
			{ name: 'Canva', how: 'A plus' },
			{ name: 'Slack', how: 'Team chat' },
			{ name: 'WhatsApp', how: 'Team chat' },
		],
	},
];
