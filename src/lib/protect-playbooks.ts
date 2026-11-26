/**
 * Protect playbooks: what to do, per platform, when an account is hacked,
 * banned, impersonated or hit with a copyright strike.
 *
 * Rules for this file:
 * - Official routes only. Every link goes to the platform's own help center,
 *   form or app screen. Never a third-party "recovery" or "unban" service.
 * - Every playbook lists its sources. If a step isn't in a source, it's labeled
 *   as general practice in the step text.
 * - Menu paths change. When you edit a step, update CHECKED.
 */

export const CHECKED = '2026-11-26';

export type PlatformKey = 'instagram' | 'tiktok' | 'youtube' | 'x';
export type SituationKey = 'hacked' | 'banned' | 'impersonated' | 'copyright';

export interface Step {
	/** Short, imperative. Readable in a panic. */
	t: string;
	/** One or two sentences of detail. */
	d: string;
	href?: string;
	cta?: string;
}
export interface Source {
	label: string;
	href: string;
}
export interface Playbook {
	/** The one thing to do right now. */
	first: string;
	steps: Step[];
	/** Something people get wrong, or a deadline. */
	watch?: string;
	sources: Source[];
}

export const platforms: { key: PlatformKey; name: string; tint: string }[] = [
	{ key: 'instagram', name: 'Instagram', tint: 'instagram' },
	{ key: 'tiktok', name: 'TikTok', tint: 'tiktok' },
	{ key: 'youtube', name: 'YouTube', tint: 'youtube' },
	{ key: 'x', name: 'X', tint: 'x' },
];

export const situations: { key: SituationKey; label: string; emoji: string; short: string; href: string }[] = [
	{ key: 'hacked', label: 'I got hacked', emoji: '🔓', short: 'Someone else is in my account, or I’m locked out', href: '/protect/hacked/' },
	{ key: 'banned', label: 'I got banned', emoji: '⛔', short: 'Suspended, disabled, terminated or restricted', href: '/protect/banned/' },
	{ key: 'impersonated', label: 'Someone’s pretending to be me', emoji: '🎭', short: 'A fake account using my name or face', href: '/protect/impersonation/' },
	{ key: 'copyright', label: 'I got a copyright strike', emoji: '©️', short: 'A claim, strike or takedown on my content', href: '/protect/copyright-strikes/' },
];

const IG_HACKED = 'https://help.instagram.com/149494825257596';
const YT_HACKED = 'https://support.google.com/youtube/answer/76187';
const X_HACKED = 'https://help.x.com/en/safety-and-security/x-account-compromised';
const TT_HACKED = 'https://support.tiktok.com/en/log-in-troubleshoot/log-in/my-account-has-been-hacked';

export const playbooks: Record<SituationKey, Record<PlatformKey, Playbook>> = {
	hacked: {
		instagram: {
			first: 'Search your inbox for an email from security@mail.instagram.com and use its “revert this change” link.',
			steps: [
				{
					t: 'Undo the email change',
					d: 'When a login email changes, Instagram emails the old address. That message lets you reverse it. Only trust links from security@mail.instagram.com, and check the sender before you tap.',
				},
				{
					t: 'Start official recovery',
					d: 'Go to instagram.com/hacked, or tap “Get help signing in” on the login screen, then “Need more help?”. Instagram may send a code to your email or phone, or ask for a video selfie if your account has photos of you.',
					href: 'https://www.instagram.com/hacked/',
					cta: 'instagram.com/hacked',
				},
				{
					t: 'Kick them out',
					d: 'Once you’re in: change the password, then open Accounts Center → Password and security → Where you’re logged in, and log out every device you don’t know.',
				},
				{
					t: 'Lock it',
					d: 'Turn on two-factor authentication with an authenticator app, and check the email and phone on the account are yours.',
					href: '/protect/account-security/',
					cta: 'Security checklist',
				},
				{
					t: 'Warn your audience',
					d: 'Post from another account or platform: “If my account DMs you a link or a giveaway, it isn’t me.” Hijacked creator accounts are often used for crypto and giveaway scams.',
				},
			],
			watch: 'Never pay someone who DMs offering to “recover” your account. Instagram’s recovery is free and only happens through Instagram.',
			sources: [
				{ label: 'Instagram Help: Hacked Instagram profiles', href: IG_HACKED },
				{ label: 'TechCrunch: Instagram launches hub for hacked accounts (Dec 15, 2022)', href: 'https://techcrunch.com/2022/12/15/instagram-launches-hub-help-users-resolve-account-access-issues' },
			],
		},
		tiktok: {
			first: 'If you can still log in, change your password now: Profile → ☰ → Settings and privacy → Account → Password.',
			steps: [
				{
					t: 'Reset the password',
					d: 'Profile → ☰ → Settings and privacy → Account → Password. Locked out? Tap “Forgot password” on the login screen and reset by phone or email.',
				},
				{
					t: 'Put your phone back on',
					d: 'Profile → ☰ → Settings and privacy → Account → User information → Phone number. Make sure the number is yours.',
				},
				{
					t: 'Remove their devices',
					d: 'Profile → ☰ → Settings and privacy → Security → Manage devices. Remove anything you don’t recognize.',
				},
				{
					t: 'Undo the damage',
					d: 'TikTok lists the signs: a changed username, deleted videos, posts or messages you didn’t send. Fix your profile, delete what they posted, and screenshot it all first.',
				},
				{
					t: 'Still locked out? Contact TikTok',
					d: 'Use the support route on TikTok’s hacked-account page, from the email address tied to the account if you can, with your username and when you last had access.',
					href: TT_HACKED,
					cta: 'TikTok hacked-account help',
				},
			],
			watch: 'Add a passkey once you’re back in. TikTok supports them on recent iPhones and Androids.',
			sources: [
				{ label: 'TikTok Support: My account has been hacked', href: TT_HACKED },
				{ label: 'TikTok Support: Log in with a passkey', href: 'https://support.tiktok.com/en/log-in-troubleshoot/log-in/log-in-with-a-passkey' },
			],
		},
		youtube: {
			first: 'Recover the Google Account first. The channel comes back with it.',
			steps: [
				{
					t: 'Recover your Google Account',
					d: 'Can still sign in? Change the password and run the Security Checkup. Can’t? Use Google’s account recovery flow.',
					href: 'https://accounts.google.com/signin/recovery',
					cta: 'Google account recovery',
				},
				{
					t: 'Use the hacked channel assistant',
					d: 'YouTube’s help page has an AI assistant that walks you through securing the login and undoing changes. It works in English, Spanish and Portuguese.',
					href: YT_HACKED,
					cta: 'YouTube hacked channel help',
				},
				{
					t: 'Clean up fast',
					d: 'In YouTube Studio, run the hacked-channel cleanup review. Or do it by hand: delete their uploads, remove unknown users, restore your name, handle, picture and banner. Fast cleanup helps avoid strikes for what they posted.',
					href: 'https://support.google.com/youtube/answer/14849770',
					cta: 'Clean up a hacked channel',
				},
				{
					t: 'Check the money',
					d: 'YouTube’s cleanup guide says to check AdSense and Content Manager settings too, not just videos.',
				},
				{
					t: 'Channel terminated during the hack?',
					d: 'Once the Google Account is back under your control, appeal the termination. YouTube says the appeal may fail if recovery isn’t complete.',
					href: 'https://support.google.com/youtube?p=google_acct_appeal',
					cta: 'Appeal form',
				},
			],
			watch: 'YouTube only supports hacked-channel incidents from the past 9 months, because of how long it keeps data. Don’t wait.',
			sources: [
				{ label: 'YouTube Help: Recover a hacked YouTube channel', href: YT_HACKED },
				{ label: 'YouTube Help: Clean up a hacked YouTube channel', href: 'https://support.google.com/youtube/answer/14849770' },
				{ label: 'Engadget: AI support chatbot for hacked YouTube channels (Aug 21, 2024)', href: 'https://www.engadget.com/entertainment/youtube/a-new-ai-support-chatbot-is-available-for-hacked-youtube-channels-222800979.html' },
			],
		},
		x: {
			first: 'Change your password in Settings → Password, or use “Forgot password” if you’re logged out.',
			steps: [
				{ t: 'Change the password', d: 'Settings → Password. Logged out? Use “Forgot password” on the login page.' },
				{ t: 'Secure your email', d: 'Make sure the email on the account is yours and that the email account itself is safe. Change it from Account settings if needed.' },
				{
					t: 'Revoke strange apps',
					d: 'Settings → Apps. Revoke any third-party app you don’t recognize. Then update your new password in the apps you do trust.',
				},
				{
					t: 'Still locked out? File a support request',
					d: 'Send it from the email address on the account, with your username and the date you last had access.',
					href: X_HACKED,
					cta: 'X compromised-account help',
				},
				{ t: 'Turn on two-factor', d: 'Use an authenticator app or security key. Since March 2023, text-message 2FA on X is only for paid subscribers.' },
			],
			sources: [
				{ label: 'X Help: Help with my compromised account', href: X_HACKED },
				{ label: 'X (Twitter) blog: An update on two-factor authentication using SMS (Feb 2023)', href: 'https://blog.twitter.com/en_us/topics/product/2023/an-update-on-two-factor-authentication-using-sms-on-twitter' },
			],
		},
	},

	banned: {
		instagram: {
			first: 'Open the app and read the notice. If it offers “Disagree with decision” or a review, start it now: the clock is running.',
			steps: [
				{
					t: 'Read the notice',
					d: 'A disabled or suspended account shows a notice when you log in. It says what happened and, if you can, how to ask for a review.',
					href: 'https://help.instagram.com/366993040048856',
					cta: 'About disabled accounts',
				},
				{
					t: 'Appeal from that screen',
					d: 'Follow the in-app review prompts. Instagram may ask you to confirm your identity. Keep the reason short, factual and calm.',
				},
				{
					t: 'Check Account Status',
					d: 'If you can still log in, Settings → Account Status shows removed content and whether your account is at risk. Appeal individual removals there before they add up.',
				},
				{
					t: 'Copyright-based removal?',
					d: 'That’s a different route: appeal or file a DMCA counter-notification.',
					href: '/protect/copyright-strikes/',
					cta: 'Copyright playbook',
				},
				{
					t: 'Tell people where you are',
					d: 'Point your audience to your other channels. Don’t make a new account to dodge the ban: that usually breaks the rules too.',
				},
			],
			watch: 'Anyone DMing you an “unban service” is a scam or a rule-breaker. Read our reporting on how ban and unban services work.',
			sources: [
				{ label: 'Instagram Help: About disabled Instagram accounts', href: 'https://help.instagram.com/366993040048856' },
				{ label: 'Our Underground report: Ban and unban services', href: '/underground/ban-and-unban-services/' },
			],
		},
		tiktok: {
			first: 'Open your Inbox: the ban or removal notice has an appeal option. Use it in the app.',
			steps: [
				{
					t: 'Find the notice',
					d: 'TikTok sends violation and ban notices to your Inbox. Each one says which rule and usually offers an appeal.',
				},
				{
					t: 'Appeal in the app',
					d: 'Tap the notice → Submit an appeal. Say plainly why the content or account doesn’t break the rule named.',
					href: 'https://www.tiktok.com/en/safety-hc/account-and-user-safety/content-violations-and-bans',
					cta: 'TikTok: violations and bans',
				},
				{
					t: 'Check Account status',
					d: 'TikTok’s Account status screen (in Settings and privacy) shows your strikes and what you can appeal.',
				},
				{
					t: 'Know how strikes work',
					d: 'TikTok says strikes expire from your record after 90 days. Enough strikes in that window, or one severe violation, can mean a permanent ban.',
					href: 'https://newsroom.tiktok.com/supporting-creators-with-an-updated-account-enforcement-system?lang=en',
					cta: 'TikTok strike system',
				},
			],
			watch: 'Mass-reporting can trigger automated removals. Appeal each one: wrongly removed content shouldn’t count against you once reinstated.',
			sources: [
				{ label: 'TikTok Help: Content violations and bans', href: 'https://www.tiktok.com/en/safety-hc/account-and-user-safety/content-violations-and-bans' },
				{ label: 'TikTok Newsroom: Updated account enforcement system (Feb 2, 2023)', href: 'https://newsroom.tiktok.com/supporting-creators-with-an-updated-account-enforcement-system?lang=en' },
			],
		},
		youtube: {
			first: 'You have 1 year and 2 tries to appeal a termination. Make the first one count.',
			steps: [
				{
					t: 'Appeal in YouTube Studio',
					d: 'Sign in to Studio and start the channel appeal: Begin review → Start appeal → add a contact email and your reason → Submit.',
					href: 'https://studio.youtube.com/channel-appeal?appealForm=1&hca=1',
					cta: 'Studio channel appeal',
				},
				{
					t: 'Can’t reach Studio?',
					d: 'Use Google’s suspended-account form for YouTube instead.',
					href: 'https://support.google.com/accounts/contact/suspended?p=youtube',
					cta: 'Fallback appeal form',
				},
				{
					t: 'Terminated for copyright?',
					d: 'An appeal won’t fix it. The route is a counter notification on the strikes, or a retraction from the claimant.',
					href: '/protect/copyright-strikes/',
					cta: 'Copyright playbook',
				},
				{
					t: 'Strike, not termination?',
					d: 'Community Guidelines strikes expire after 90 days. Three in 90 days ends the channel. You can appeal each strike you think is wrong.',
					href: 'https://support.google.com/youtube/answer/2802032',
					cta: 'Strike basics',
				},
			],
			watch: 'Terminated because you were hacked? Recover the Google Account first, then appeal. Use the hacked playbook.',
			sources: [
				{ label: 'YouTube Help: Channel or account terminations', href: 'https://support.google.com/youtube/answer/2802168' },
				{ label: 'YouTube Help: Community Guidelines strike basics', href: 'https://support.google.com/youtube/answer/2802032' },
			],
		},
		x: {
			first: 'Log in and read the notice. A “locked” account can often be unlocked on the spot; a “suspended” one needs an appeal.',
			steps: [
				{
					t: 'Locked or suspended?',
					d: 'Locked accounts usually ask you to verify a phone number or finish a challenge, then come back. Suspended accounts show a notice saying why.',
					href: 'https://help.x.com/en/rules-and-policies/notices-on-x',
					cta: 'Notices on X explained',
				},
				{
					t: 'Appeal',
					d: 'Use X’s appeal form for locked or suspended accounts. Explain briefly why it was a mistake.',
					href: 'https://help.x.com/en/forms/account-access/appeals',
					cta: 'X appeal form',
				},
				{
					t: 'Suspended as an impersonator by mistake?',
					d: 'X says it may ask for government ID to reinstate an account caught by its impersonation policy.',
					href: 'https://help.x.com/en/rules-and-policies/x-impersonation-and-deceptive-identities-policy',
					cta: 'Impersonation policy',
				},
			],
			sources: [
				{ label: 'X Help: Notices on X and what they mean', href: 'https://help.x.com/en/rules-and-policies/notices-on-x' },
				{ label: 'X Help: Misleading and deceptive identities policy', href: 'https://help.x.com/en/rules-and-policies/x-impersonation-and-deceptive-identities-policy' },
			],
		},
	},

	impersonated: {
		instagram: {
			first: 'Screenshot the fake profile and its DMs, then file Instagram’s impersonation form yourself. Only you (or your rep) can.',
			steps: [
				{ t: 'Collect evidence', d: 'Screenshot the profile, the username, its posts, and any DMs it sent your followers. Save the profile URL.' },
				{
					t: 'File the impersonation form',
					d: 'Instagram only acts on reports from the person being impersonated or their authorized representative. You’ll attach a photo of yourself holding your ID; Instagram says it deletes the ID within 30 days.',
					href: 'https://help.instagram.com/contact/636276399721841',
					cta: 'Instagram impersonation form',
				},
				{ t: 'One account per report', d: 'The form takes one fake account at a time. Ten fakes means ten reports.' },
				{
					t: 'Ask fans to report in the app',
					d: 'From the fake profile: ••• → Report. Fan reports help flag it, even though only your report carries your ID.',
				},
				{ t: 'Pin a warning', d: 'Story highlight or pinned post: your only handle, and “I will never DM you about giveaways, investments or payments.”' },
			],
			sources: [{ label: 'Instagram Help: Report an impersonation account', href: 'https://help.instagram.com/contact/636276399721841' }],
		},
		tiktok: {
			first: 'Report the account from its profile in the app, choosing “Pretending to be someone”, then “Me”.',
			steps: [
				{ t: 'Collect evidence', d: 'Screenshot the profile, handle, videos and any DMs. Save the profile link.' },
				{
					t: 'Report in the app',
					d: 'On the fake profile, tap the share arrow or ••• → Report → Report account → Pretending to be someone. Choose that it’s you.',
				},
				{
					t: 'Or use TikTok’s form',
					d: 'TikTok’s impersonation help page links a web form. Expect to be asked to prove who you are.',
					href: 'https://support.tiktok.com/en/safety-hc/report-a-problem/report-an-impersonation-account',
					cta: 'TikTok impersonation help',
				},
				{ t: 'Warn your audience', d: 'Pin a video naming your only handle and what you’ll never DM people about.' },
			],
			sources: [
				{ label: 'TikTok Support: Report an impersonation account', href: 'https://support.tiktok.com/en/safety-hc/report-a-problem/report-an-impersonation-account' },
				{ label: 'TikTok Creator Academy: Report and appeal impersonation', href: 'https://www.tiktok.com/creator-academy/article/report-appeal-impersonation' },
			],
		},
		youtube: {
			first: 'Report the channel for impersonation from its channel page, and save screenshots first.',
			steps: [
				{ t: 'Collect evidence', d: 'Screenshot the channel name, handle, avatar, banner, and any comments or livestreams using your name.' },
				{
					t: 'Report the channel',
					d: 'On the fake channel, open the About section → Report user → Impersonation. YouTube’s impersonation policy covers copying your name, image or channel look.',
					href: 'https://support.google.com/youtube/answer/2801947',
					cta: 'YouTube impersonation policy',
				},
				{
					t: 'Watch your comments',
					d: 'Fakes often reply to your fans with “DM me on WhatsApp, you’ve won.” Hold comments with links for review and block lookalike names in Studio’s comment settings.',
				},
				{ t: 'Pin a warning', d: 'Pin a comment or community post: “I’ll never ask you to message me to claim a prize.”' },
			],
			sources: [{ label: 'YouTube Help: Impersonation policy', href: 'https://support.google.com/youtube/answer/2801947' }],
		},
		x: {
			first: 'File X’s “I am being impersonated” form. Fans can report as bystanders from the profile.',
			steps: [
				{ t: 'Collect evidence', d: 'Screenshot the profile and posts. Note the @handle, since display names can change.' },
				{
					t: 'File the impersonation form',
					d: 'X’s rule: an account breaks policy when it uses at least two elements of your identity, like your name and photo, to mislead.',
					href: 'https://help.x.com/en/forms/authenticity/impersonation/me-or-someone-i-represent/i-am-being-impersonated',
					cta: 'X impersonation form',
				},
				{ t: 'Ask fans to report', d: 'Bystanders can report straight from the fake account’s profile.' },
				{ t: 'Parody is allowed', d: 'Clearly labeled parody, commentary and fan accounts are allowed on X. Report the ones that try to pass as you.' },
			],
			sources: [{ label: 'X Help: Misleading and deceptive identities policy', href: 'https://help.x.com/en/rules-and-policies/x-impersonation-and-deceptive-identities-policy' }],
		},
	},

	copyright: {
		instagram: {
			first: 'Check the notice inside the Instagram app (Account Status), not in an email or DM. Fake copyright notices are a common scam.',
			steps: [
				{
					t: 'Confirm it’s real',
					d: 'Real notices show up in the app. A DM or email with an “appeal” link asking you to log in is phishing.',
					href: '/protect/scams/',
					cta: 'Scam patterns',
				},
				{
					t: 'Appeal or counter-notify',
					d: 'If you own the content or have the rights, Instagram lets you appeal or file a DMCA counter-notification.',
					href: 'https://help.instagram.com/1417735471763678',
					cta: 'Instagram copyright appeals',
				},
				{
					t: 'Don’t pay anyone to withdraw a claim',
					d: 'In 2026 scammers filed fake claims, got accounts suspended, then demanded crypto on Telegram to withdraw them. Paying marked victims for more.',
				},
				{ t: 'Keep receipts', d: 'Save your original files, licenses, and music or footage agreements. They’re your proof.' },
			],
			watch: 'A counter-notification is a legal statement under penalty of perjury. Only file it if you’re sure.',
			sources: [
				{ label: 'Instagram Help: Appeal a copyright removal', href: 'https://help.instagram.com/1417735471763678' },
				{ label: 'Malwarebytes: Copyright scammers get Instagram accounts suspended (Sept 10, 2026)', href: 'https://www.malwarebytes.com/blog/scams/2026/09/copyright-scammers-get-instagram-accounts-suspended-and-demand-payment' },
			],
		},
		tiktok: {
			first: 'Open the notice in your TikTok Inbox and use the in-app appeal if you have the rights.',
			steps: [
				{ t: 'Read the notice', d: 'TikTok tells you which video was removed and who reported it.' },
				{
					t: 'Appeal or counter-notify',
					d: 'Appeal from the notice. For a formal DMCA counter-notification, follow TikTok’s Intellectual Property Policy.',
					href: 'https://www.tiktok.com/legal/page/global/copyright-policy/en',
					cta: 'TikTok IP policy',
				},
				{ t: 'Use licensed sounds', d: 'Sounds from TikTok’s library are cleared for use on TikTok. Music added in an outside editor often isn’t.' },
				{ t: 'Watch the repeat count', d: 'TikTok’s policy says repeat infringers can lose their account. Clear old risky uploads.' },
			],
			sources: [{ label: 'TikTok: Intellectual Property Policy', href: 'https://www.tiktok.com/legal/page/global/copyright-policy/en' }],
		},
		youtube: {
			first: 'Check Studio → Content → Copyright to see if it’s a claim (money) or a strike (your channel). They’re handled differently.',
			steps: [
				{
					t: 'Claim or strike?',
					d: 'A Content ID claim usually just moves the money or blocks the video. A strike counts toward termination: 3 in 90 days and the channel can be terminated.',
					href: 'https://support.google.com/youtube/answer/2814000',
					cta: 'Copyright strike basics',
				},
				{
					t: 'Option 1: wait it out',
					d: 'Complete Copyright School and the strike expires in 90 days. Your first strike also pauses live streaming for 7 days.',
				},
				{ t: 'Option 2: ask for a retraction', d: 'Contact the claimant and ask them to withdraw. Best when it’s a mistake or a licensed use.' },
				{
					t: 'Option 3: counter notification',
					d: 'Studio → Content → Copyright filter → the “Removed” video → See details → Take action. The claimant has 10 US business days to show they’ve taken legal action, or the video comes back.',
					href: 'https://support.google.com/youtube/answer/2807684',
					cta: 'Counter notification',
				},
			],
			watch: 'Disputing a Content ID claim without a valid reason can turn it into a takedown, and a takedown means a strike.',
			sources: [
				{ label: 'YouTube Help: Understand copyright strikes', href: 'https://support.google.com/youtube/answer/2814000' },
				{ label: 'YouTube Help: Submit a copyright counter notification', href: 'https://support.google.com/youtube/answer/2807684' },
				{ label: 'YouTube Help: Appeal a copyright claim', href: 'https://support.google.com/youtube/answer/12104471' },
			],
		},
		x: {
			first: 'Find the email X sent about the takedown. The counter-notice instructions are in it.',
			steps: [
				{ t: 'Check the email on your account', d: 'X sends the notice and how to file a counter-notice to the email tied to your account.' },
				{ t: 'Deleting the post doesn’t fix it', d: 'X says removing the reported material won’t resolve the complaint.' },
				{
					t: 'File a counter-notice if you have the rights',
					d: 'X follows the US DMCA, so a counter-notice is a legal statement. Use it when the takedown was a mistake.',
					href: 'https://help.x.com/en/rules-and-policies/copyright-policy',
					cta: 'X copyright policy',
				},
			],
			sources: [{ label: 'X Help: Copyright policy', href: 'https://help.x.com/en/rules-and-policies/copyright-policy' }],
		},
	},
};

export interface Scam {
	name: string;
	emoji: string;
	tint: string;
	pitch: string;
	tell: string;
	todo: string;
	src: { label: string; href: string }[];
}
export const scams: Scam[] = [
	{
		name: 'The dream brand deal',
		emoji: '💼',
		tint: 'champagne',
		pitch: '“We love your content. Paid collab for our new app, game or VPN. Download the demo and the contract here.”',
		tell: 'You have to download and run something to “review” the deal: an .exe, .scr, a zipped “contract”, a password-protected file or a Drive link to software.',
		todo: 'Real brands send a brief and a PDF or doc you can preview, and they’re fine with a video call. Never run a file to review a deal. Verify the company on its own website, not from links in the email.',
		src: [{ label: 'Google Threat Analysis Group, Oct 20, 2021', href: 'https://blog.google/threat-analysis-group/phishing-campaign-targets-youtube-creators-cookie-theft-malware/' }],
	},
	{
		name: 'The “copyright violation” link',
		emoji: '©️',
		tint: 'rose',
		pitch: '“We received a complaint about your post. Your account will be removed unless you appeal within 24 hours.” Then an Appeal button.',
		tell: 'The notice arrives by DM or email with a link, often shortened, to a page that asks for your password. Real notices show up in the app.',
		todo: 'Close the message. Open the app yourself and check Account Status or your Studio copyright tab. If there’s nothing there, it was phishing.',
		src: [{ label: 'Sophos Naked Security', href: 'https://www.sophos.com/en-us/blog/instagram-copyright-infringment-scams-dont-get-sucked-in' }],
	},
	{
		name: 'Copyright ransom',
		emoji: '🧾',
		tint: 'ember',
		pitch: 'Your account gets suspended over copyright claims you’ve never heard of. Then someone messages: pay us and we’ll withdraw them.',
		tell: 'They move you to Telegram and want crypto. The claims are fake, filed to get you suspended.',
		todo: 'Don’t pay: one victim paid $50 and was hit again right after. Use Instagram’s official appeal or counter-notification, and keep every screenshot.',
		src: [{ label: 'Malwarebytes, Sept 10, 2026', href: 'https://www.malwarebytes.com/blog/scams/2026/09/copyright-scammers-get-instagram-accounts-suspended-and-demand-payment' }],
	},
	{
		name: 'The private video from “YouTube”',
		emoji: '🎬',
		tint: 'ember',
		pitch: 'A private video shared with you, sometimes with an AI-faked YouTube executive announcing monetization changes. “Confirm the new Partner Program terms” via a link.',
		tell: 'YouTube says it never contacts creators or shares information through a private video.',
		todo: 'Don’t click. Report the video. Real policy updates show up in YouTube Studio and on YouTube’s official blog and channels.',
		src: [
			{ label: 'Google Help: YouTube phishing', href: 'https://support.google.com/faqs/answer/14329556' },
			{ label: 'BleepingComputer, Mar 5, 2025', href: 'https://www.bleepingcomputer.com/news/security/youtube-warns-of-ai-generated-video-of-its-ceo-used-in-phishing-attacks/' },
		],
	},
	{
		name: 'The booby-trapped DM',
		emoji: '💬',
		tint: 'cyan',
		pitch: 'A DM that looks like nothing much. In 2024 a flaw in TikTok let attackers take over accounts, including CNN’s, just by getting someone to open a message.',
		tell: 'There may be no tell. That’s why the other defenses on this page matter.',
		todo: 'Keep your apps updated, use passkeys or app-based 2FA, and have a team member, not your main account, triage DMs from strangers.',
		src: [{ label: 'TechCrunch, June 4, 2024', href: 'https://techcrunch.com/2024/06/04/tiktok-acknowledges-exploit-targeting-high-profile-accounts' }],
	},
	{
		name: 'The SIM swap',
		emoji: '📱',
		tint: 'ion',
		pitch: 'Your phone suddenly says “No service”. Someone convinced your carrier to move your number to their SIM, and now they get your texted codes.',
		tell: 'Lost signal out of nowhere, or a carrier alert about a SIM change you didn’t ask for.',
		todo: 'Call your carrier from another phone right away. Prevent it with a port-out PIN or number lock, and don’t rely on text-message 2FA.',
		src: [{ label: 'FCC, SIM swap rules (2023)', href: 'https://www.fcc.gov/node/262577' }],
	},
	{
		name: 'Paid badges and unbans',
		emoji: '✅',
		tint: 'amethyst',
		pitch: '“I can get you verified.” “I work at Meta, I can restore your account for $500.”',
		tell: 'Any offer to sell you a platform decision. Even when it’s not a straight-up scam, it breaks platform rules and can cost you the account.',
		todo: 'Use the platform’s own verification and appeal routes. Read our reporting on how this market works.',
		src: [
			{ label: 'Underground: Paid verification', href: '/underground/paid-verification/' },
			{ label: 'Underground: Ban and unban services', href: '/underground/ban-and-unban-services/' },
		],
	},
];

export interface CheckItem {
	id: string;
	t: string;
	d: string;
	href?: string;
	cta?: string;
	tag: 'platform' | 'practitioner' | 'law';
}
export interface CheckGroup {
	title: string;
	emoji: string;
	items: CheckItem[];
}
export const checklist: CheckGroup[] = [
	{
		title: 'Your email is the master key',
		emoji: '🗝️',
		items: [
			{ id: 'email-2fa', t: 'Lock down the email every account resets to', d: 'Every “forgot password” goes there. Give it a passkey or security key first, before any social account.', tag: 'practitioner' },
			{ id: 'email-private', t: 'Use a login email nobody knows', d: 'Keep a separate, public address for brand deals. If the login email isn’t public, it’s harder to target.', tag: 'practitioner' },
			{ id: 'pw-manager', t: 'Unique passwords from a password manager', d: 'One leaked password shouldn’t open everything. A manager also refuses to autofill on fake login pages.', tag: 'practitioner' },
		],
	},
	{
		title: 'Two-factor that phishing can’t steal',
		emoji: '🔐',
		items: [
			{
				id: 'google-passkey',
				t: 'YouTube: passkey on your Google Account',
				d: 'YouTube’s own channel-security guide recommends 2-Step Verification with a passkey, plus Enhanced Safe Browsing.',
				href: 'https://support.google.com/youtube/answer/9701986',
				cta: 'Secure your channel',
				tag: 'platform',
			},
			{
				id: 'tiktok-passkey',
				t: 'TikTok: set up a passkey',
				d: 'Profile → ☰ → Settings and privacy → Account → Passkey → Set up. Needs Android 9+ with a screen lock, or iOS 16+ with iCloud Keychain.',
				href: 'https://support.tiktok.com/en/log-in-troubleshoot/log-in/log-in-with-a-passkey',
				cta: 'TikTok passkeys',
				tag: 'platform',
			},
			{
				id: 'ig-2fa',
				t: 'Instagram: two-factor with an authenticator app',
				d: 'Accounts Center → Password and security → Two-factor authentication. Choose an authenticator app over text messages. Meta has added passkeys to Facebook and Messenger; check Accounts Center for Instagram.',
				href: 'https://about.fb.com/news/2025/06/introducing-passkeys-facebook-easier-sign-in/',
				cta: 'Meta on passkeys',
				tag: 'platform',
			},
			{
				id: 'x-2fa',
				t: 'X: authenticator app or security key',
				d: 'Text-message 2FA on X has been for paid subscribers only since March 2023, so use an app or a key.',
				href: 'https://blog.twitter.com/en_us/topics/product/2023/an-update-on-two-factor-authentication-using-sms-on-twitter',
				cta: 'X’s 2FA change',
				tag: 'platform',
			},
			{ id: 'backup-codes', t: 'Save backup codes offline', d: 'Print them or keep them in your password manager. Lose your phone without them and recovery gets much harder.', tag: 'practitioner' },
		],
	},
	{
		title: 'Your phone number',
		emoji: '📱',
		items: [
			{
				id: 'sim-lock',
				t: 'Turn on your carrier’s SIM and port-out lock',
				d: 'SIM swapping moves your number to a scammer’s phone so they get your texted codes. Ask your carrier for a port-out PIN or number lock. US carriers must now verify you before a SIM change or port-out and alert you when one is requested.',
				href: 'https://www.fcc.gov/node/262577',
				cta: 'FCC SIM-swap rules',
				tag: 'law',
			},
			{ id: 'sms-last', t: 'Make SMS the last resort, not the main 2FA', d: 'Once passkeys or an authenticator are on, remove the phone as a 2FA method where the platform allows.', tag: 'practitioner' },
		],
	},
	{
		title: 'Your team',
		emoji: '👥',
		items: [
			{
				id: 'yt-perms',
				t: 'YouTube: give roles, not your password',
				d: 'Studio → Settings → Permissions → Invite. Roles go from Owner and Manager down to Editor (Limited) and Viewer. YouTube says it’s safer than sharing your password.',
				href: 'https://support.google.com/youtube/answer/9481328',
				cta: 'Channel permissions',
				tag: 'platform',
			},
			{ id: 'meta-roles', t: 'Instagram: share access through Meta Business Suite', d: 'Professional accounts can give people task access through Meta’s business tools instead of a shared login.', tag: 'practitioner' },
			{ id: 'offboard', t: 'Remove people the day they leave', d: 'Editors, managers, agencies: if they’re done, so is their access. Review the list every quarter.', tag: 'practitioner' },
			{ id: 'apps', t: 'Revoke old third-party apps', d: 'Scheduling tools and giveaway apps you tried once still hold a key. X: Settings → Apps. Google: Security Checkup.', href: 'https://myaccount.google.com/security-checkup', cta: 'Google Security Checkup', tag: 'platform' },
		],
	},
];

/** Plain-text versions of the Protect widgets, for the Markdown/AI copies of each page. */
export function protectWidgetMarkdown(name: string, tag: string): string | undefined {
	const link = (h: string) => (h.startsWith('/') ? `https://creators.select${h}` : h);
	const steps = (pb: Playbook) =>
		`First: ${pb.first}\n\n` +
		pb.steps.map((s, i) => `${i + 1}. **${s.t}** ${s.d}${s.href ? ` [${s.cta ?? 'Link'}](${link(s.href)})` : ''}`).join('\n') +
		(pb.watch ? `\n\nWatch out: ${pb.watch}` : '') +
		`\n\nSources: ${pb.sources.map((s) => `[${s.label}](${link(s.href)})`).join('; ')}`;
	if (name === 'Playbook') {
		const key = /situation="([a-z]+)"/.exec(tag)?.[1] as SituationKey | undefined;
		if (!key || !playbooks[key]) return undefined;
		return platforms.map((p) => `### ${p.name}\n\n${steps(playbooks[key][p.key])}`).join('\n\n') + `\n\n_Official routes only, checked ${CHECKED}._`;
	}
	if (name === 'ProtectTriage')
		return situations.map((s) => `- **${s.label}** (${s.short}): ${link(s.href)}`).join('\n') + '\n- **I got a sketchy DM or email**: https://creators.select/protect/scams/';
	if (name === 'ScamDeck')
		return scams.map((s) => `### ${s.name}\n\nThe pitch: ${s.pitch}\n\nThe tell: ${s.tell}\n\nDo this: ${s.todo}\n\nSource: ${s.src.map((r) => `[${r.label}](${link(r.href)})`).join('; ')}`).join('\n\n');
	if (name === 'SecurityChecklist')
		return checklist.map((g) => `### ${g.title}\n\n` + g.items.map((i) => `- [ ] **${i.t}** ${i.d}${i.href ? ` [${i.cta}](${link(i.href)})` : ''}`).join('\n')).join('\n\n');
	return undefined;
}
