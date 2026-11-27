/**
 * Sources the glossary cites. Money, tax and paywall sources are shared with
 * those sections (src/lib/*-data.ts) so a fix there fixes the glossary too.
 * Rules: platform help pages, platform research, regulators and named
 * professionals first. No anonymous gurus.
 */
import { sources as money } from '../../lib/money-data';
import { sources as tax } from '../../lib/tax-data';
import { sources as paywall } from '../../lib/paywall-data';

export type Cite = { name: string; publisher: string; url: string };

const pick = (reg: Record<string, { name: string; publisher: string; url: string }>, id: string): Cite => {
	const s = reg[id];
	if (!s) throw new Error(`glossary: unknown source "${id}"`);
	return { name: s.name, publisher: s.publisher, url: s.url };
};
export const M = (id: string) => pick(money, id);
export const T = (id: string) => pick(tax, id);
export const P = (id: string) => pick(paywall, id);

const c = (publisher: string, name: string, url: string): Cite => ({ publisher, name, url });

export const S = {
	ytAdRev: c('YouTube Help', 'Understand ad revenue analytics', 'https://support.google.com/youtube/answer/9314357'),
	ytEarn: c('YouTube Help', 'YouTube partner earnings overview', 'https://support.google.com/youtube/answer/72902'),
	ypp: c('YouTube Help', 'YouTube Partner Program overview and eligibility', 'https://support.google.com/youtube/answer/72851'),
	yppExpanded: c('YouTube Help', 'Overview of the expanded YouTube Partner Program', 'https://support.google.com/youtube/answer/13429240'),
	ytImpr: c('YouTube Help', 'Impressions and click-through rate FAQ', 'https://support.google.com/youtube/answer/7628154'),
	ytRet: c('YouTube Help', 'Measure key moments for audience retention', 'https://support.google.com/youtube/answer/9314415'),
	ytRecSys: c('YouTube Official Blog', 'On YouTube’s recommendation system', 'https://blog.youtube/inside-youtube/on-youtubes-recommendation-system/'),
	ytDnn: c('Google Research', 'Deep Neural Networks for YouTube Recommendations', 'https://research.google/pubs/deep-neural-networks-for-youtube-recommendations/'),
	ytMulti: c('Google Research', 'Recommending What Video to Watch Next: A Multitask Ranking System', 'https://research.google/pubs/recommending-what-video-to-watch-next-a-multitask-ranking-system/'),
	ytAB: c('YouTube Help', 'A/B test titles and thumbnails', 'https://support.google.com/youtube/answer/16391400'),
	ytShorts3: c('YouTube Help', 'Understand three-minute YouTube Shorts', 'https://support.google.com/youtube/answer/15424877'),
	ytStrike: c('YouTube Help', 'Understand copyright strikes', 'https://support.google.com/youtube/answer/2814000'),
	ytCgStrike: c('YouTube Help', 'Community Guidelines strike basics', 'https://support.google.com/youtube/answer/2802032'),
	ytCid: c('YouTube Help', 'How Content ID works', 'https://support.google.com/youtube/answer/2797370'),
	ytCounter: c('YouTube Help', 'Submit a copyright counter notification', 'https://support.google.com/youtube/answer/2807684'),
	ytMcn: c('YouTube Help', 'Multi-Channel Network (MCN) overview for YouTube Creators', 'https://support.google.com/youtube/answer/2737059'),
	ytSecure: c('YouTube Help', 'Secure your YouTube channel', 'https://support.google.com/youtube/answer/9701986'),
	ytImperson: c('YouTube Help', 'Impersonation policy', 'https://support.google.com/youtube/answer/2801947'),
	ytSchedule: c('YouTube Help', 'Upload schedule tips', 'https://support.google.com/youtube/answer/13616979'),
	ttRec: c('TikTok Newsroom', 'How TikTok recommends videos #ForYou', 'https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/'),
	ttRewards: c('TikTok Newsroom', 'Introducing the new Creator Rewards Program', 'https://newsroom.tiktok.com/introducing-the-new-creator-rewards-program'),
	ttSpark: c('TikTok Ads Help', 'About Spark Ads', 'https://ads.tiktok.com/help/article/spark-ads-faq'),
	ttLive: c('TikTok Help', 'TikTok LIVE Gifts', 'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live-gifts'),
	ttSubs: c('TikTok Newsroom', 'Empowering creators with the expanded Subscription feature', 'https://newsroom.tiktok.com/empowering-creators-and-fostering-communities-with-the-expanded-subscription-feature?lang=en'),
	ttEnforce: c('TikTok Newsroom', 'Supporting creators with an updated account enforcement system', 'https://newsroom.tiktok.com/supporting-creators-with-an-updated-account-enforcement-system?lang=en'),
	ttImperson: c('TikTok Help', 'Report an impersonation account', 'https://support.tiktok.com/en/safety-hc/report-a-problem/report-an-impersonation-account'),
	igRank: c('Instagram', 'Instagram Ranking Explained', 'https://about.instagram.com/blog/announcements/instagram-ranking-explained'),
	igRecs: c('Instagram for Creators', 'Helping creators find new audiences', 'https://creators.instagram.com/recommendations-and-originality'),
	igEligibility: c('Instagram for Creators', 'What creators need to know about Instagram recommendations', 'https://creators.instagram.com/blog/instagram-recommendations-eligibility-tips-creators'),
	igStatusTc: c('TechCrunch', 'Instagram’s new transparency tools will tell you if your content is ineligible to be recommended', 'https://techcrunch.com/2022/12/07/instagrams-new-transparency-tools-will-tell-you-if-your-content-is-ineligible-to-be-recommended/'),
	igTrial: c('Instagram for Creators', 'Trial reels: try content with non-followers first', 'https://creators.instagram.com/blog/instagram-trial-reels'),
	igExplore: c('Engineering at Meta', 'Scaling the Instagram Explore recommendations system', 'https://engineering.fb.com/2023/08/09/ml-applications/scaling-instagram-explore-recommendations-system/'),
	igPartnershipAds: c('Meta for Developers', 'Instagram partnership ads', 'https://developers.facebook.com/blog/post/2025/03/25/instagram-partnership-ads/'),
	igSends: c('Uppbeat', 'What’s working on Instagram right now? Carousels and sends (Adam Mosseri interview)', 'https://uppbeat.io/blog/creator-news/whats-working-on-instagram-right-now-carousels-and-sends-says-adam-mosseri'),
	igSubs: c('Instagram for Creators', 'Subscriptions', 'https://creators.instagram.com/earn-money/subscriptions'),
	igMonetize: c('Instagram for Creators', 'Monetize with Instagram', 'https://creators.instagram.com/earn-cash-making-what-you-love'),
	igHacked: c('Instagram Help', 'How to fix and secure hacked Instagram profiles', 'https://help.instagram.com/149494825257596'),
	igAggregators: c('TechCrunch', 'Instagram restricts reach of content aggregators in new crackdown', 'https://techcrunch.com/2026/04/30/instagram-restricts-reach-of-content-aggregators-in-new-crackdown/'),
	fbOriginal: c('Meta Newsroom', 'Rewarding original creators on Facebook', 'https://about.fb.com/news/2026/03/rewarding-original-creators-on-facebook/'),
	fbUnoriginal: c('Facebook for Creators', 'Combating unoriginal content', 'https://creators.facebook.com/blog/combating-unoriginal-content'),
	xAlgo: c('X Engineering', 'Twitter’s recommendation algorithm', 'https://blog.x.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm'),
	xRecap: c('GitHub: twitter/the-algorithm-ml', 'Heavy ranker (recap) README', 'https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md'),
	xRewards: c('X Help', 'Original Content Rewards Program', 'https://help.x.com/en/using-x/original-content-rewards'),
	liFeed: c('LinkedIn News', 'How LinkedIn is improving the feed to show more relevant, authentic professional content', 'https://news.linkedin.com/2026/ImprovingTheFeed'),
	ftcFaq: c('US Federal Trade Commission', 'FTC’s Endorsement Guides: What people are asking', 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking'),
	ftcFake: c('US Federal Trade Commission', 'Final rule banning fake reviews and testimonials', 'https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials'),
	dmca512: c('US Copyright Office', 'Section 512 of Title 17 (DMCA safe harbors)', 'https://www.copyright.gov/512/'),
	fairUse: c('US Copyright Office', 'U.S. Copyright Office Fair Use Index', 'https://www.copyright.gov/fair-use/'),
	ftcReport: c('US Federal Trade Commission', 'Report fraud', 'https://reportfraud.ftc.gov/'),
};
