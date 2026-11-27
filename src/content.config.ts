import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { people } from './data/people';

/**
 * Every guide records who wrote it, who reviewed it, when it was last checked,
 * and how confident we are in it.
 */
const guideFields = z.object({
	// Ids from src/data/people.ts. Shown as "By" and "Reviewed by" bylines.
	authors: z.array(z.string()).default([]),
	reviewers: z.array(z.string()).default([]),
	lastReviewed: z.coerce.date().optional(),
	confidence: z.enum(['verified', 'practitioner-view', 'speculative']).optional(),
	status: z.enum(['outline', 'draft', 'published']).default('outline'),
	// Underground pages must never carry affiliate links or sponsors.
	noAffiliates: z.boolean().default(false),
	// Optional generated cover: big word and color key (see src/styles/sections.css).
	cover: z.object({ label: z.string().optional(), tint: z.string().optional() }).optional(),
	// "The short version": up to three points shown above the guide (or see src/data/tldr.ts).
	tldr: z.array(z.string().max(160)).max(3).optional(),
	// Set only on platform news update pages (src/pages/news/[platform]/[slug].astro).
	news: z
		.object({
			platform: z.string(),
			announced: z.coerce.date(),
			published: z.coerce.date(),
			updated: z.coerce.date().optional(),
			confirmed: z.enum(['official', 'reported']),
		})
		.optional(),
	// Action-first guides (docs/guide-format.md): what the reader walks away with,
	// shown as the lead, and up to three "Do this today" moves that replace the short version.
	payoff: z.string().max(140).optional(),
	// Free tool pages (src/content/docs/tools/): questions people search for, shown by
	// <Faq /> and published as FAQPage structured data (src/route-data.ts).
	faq: z.array(z.object({ q: z.string().max(120), a: z.string().max(600) })).max(8).optional(),
	moves: z
		.array(z.object({ do: z.string().max(140), why: z.string().max(200), source: z.string().max(60).optional() }))
		.max(3)
		.optional(),
	// Translated pages only (src/content/docs/es/, pt-br/). `source` is the short git
	// commit of the English file this was translated from; `npm run i18n:status`
	// flags translations whose English original changed since. See docs/translating.md.
	translation: z
		.object({
			source: z.string().min(7),
			review: z.enum(['machine', 'native']).default('machine'),
			reviewer: z.string().optional(),
		})
		.optional(),
});

const docs = defineCollection({
	loader: docsLoader(),
	schema: (context) =>
		docsSchema({ extend: guideFields })(context).superRefine((d, ctx) => {
			// Bylines must point at someone in src/data/people.ts.
			for (const key of ['authors', 'reviewers'] as const) {
				for (const id of d[key]) {
					if (!people[id]) ctx.addIssue({ code: 'custom', path: [key], message: `"${id}" is not in src/data/people.ts` });
				}
			}
			// "Fact-checked" is a promise: a named reviewer and a review date. See docs/publishing.md.
			if (d.status === 'published' && (d.reviewers.length === 0 || !d.lastReviewed)) {
				ctx.addIssue({
					code: 'custom',
					path: ['status'],
					message: 'status: published needs reviewers and lastReviewed (see docs/publishing.md)',
				});
			}
		}),
});

/**
 * One YAML file per tool in src/data/tools/. Powers the Stack picker.
 * A tool without a named alternative, or an affiliate tool without its link, fails the build.
 */
const tools = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/data/tools' }),
	schema: z
		.object({
			name: z.string(),
			url: z.url(),
			slot: z.enum([
				'camera',
				'microphone',
				'audio',
				'lighting',
				'editing',
				'design',
				'scheduling',
				'link-in-bio',
				'storefront',
				'paywall',
				'email',
				'analytics',
				'payments',
				'content-protection',
			]),
			platforms: z.array(z.string()).default([]),
			pricing: z.object({
				free: z.boolean(),
				fromUsdPerMonth: z.number().nonnegative().optional(),
				oneTimeUsd: z.number().nonnegative().optional(),
			}),
			bestFor: z.string(),
			alternative: z.string().min(1),
			affiliate: z.boolean().default(false),
			affiliateUrl: z.url().optional(),
			lastVerified: z.coerce.date().optional(),
		})
		.refine((t) => !t.affiliate || t.affiliateUrl, {
			message: 'affiliate: true needs an affiliateUrl',
		}),
});

/**
 * Curated "shortlist" resources in src/data/resources/. Each says why it is worth
 * someone's time; affiliate links must be flagged like tools.
 */
const resources = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/data/resources' }),
	schema: z.object({
		name: z.string(),
		// A full URL, or a path starting with / for our own guides.
		url: z.string().refine((u) => u.startsWith('/') || URL.canParse(u), 'Must be a URL or a /path'),
		kind: z.enum(['official', 'playbook', 'hiring', 'code', 'tool', 'learning']),
		tint: z.string().default('shortlist'),
		coverLabel: z.string().optional(),
		why: z.string().min(20),
		free: z.boolean(),
		featured: z.boolean().default(false),
		affiliate: z.boolean().default(false),
	}),
});

/**
 * Talks worth watching, in src/data/videos/. Only primary sources: people who
 * build the platforms, or practitioners speaking on the record. No reuploads.
 */
const videos = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/data/videos' }),
	schema: z.object({
		youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
		title: z.string(),
		channel: z.string().optional(),
		published: z.coerce.date(),
		speakers: z.string(),
		// insider: works at the platform. practitioner: works with creators on the record.
		tier: z.enum(['insider', 'practitioner']),
		why: z.string().min(20),
		topics: z.array(z.string()).default([]),
	}),
});

/**
 * Creator setups in src/data/setups/: only gear a creator has published
 * themselves, with the page it came from and the date it describes.
 */
const setups = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/data/setups' }),
	schema: z.object({
		creator: z.string(),
		known: z.string(),
		site: z.url(),
		source: z.url(),
		sourceTitle: z.string(),
		asOf: z.string(),
		// What they make, so readers can find someone like them.
		niche: z.enum(['education', 'lifestyle', 'beauty', 'business', 'film', 'music', 'podcast', 'tech', 'gaming', 'short-form']),
		// page: their own gear page. video: their own setup video (youtubeId required).
		from: z.enum(['page', 'video']).default('page'),
		youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/).optional(),
		// A total only when the creator states one, in their words (e.g. "$5,963").
		cost: z.string().optional(),
		note: z.string().optional(),
		gear: z.object({
			camera: z.array(z.string()).default([]),
			lens: z.array(z.string()).default([]),
			audio: z.array(z.string()).default([]),
			lighting: z.array(z.string()).default([]),
			editing: z.array(z.string()).default([]),
			support: z.array(z.string()).default([]),
		}),
	}).refine((s) => s.from !== 'video' || s.youtubeId, { message: 'from: video needs a youtubeId' }),
});

/**
 * Platform news in src/data/news/: one Markdown file per change. The body is
 * "What changed"; frontmatter holds the plain-language takeaways and sources.
 * See docs/news.md for how updates are added (including the daily check).
 */
export const NEWS_PLATFORMS = ['instagram', 'tiktok', 'youtube', 'facebook', 'linkedin', 'x'] as const;
const news = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/data/news' }),
	schema: z
		.object({
			title: z.string().max(90),
			// Shown as the lead and the meta description: 70-160 characters for search.
			summary: z.string().min(70).max(160),
			platform: z.enum(NEWS_PLATFORMS),
			kind: z.enum(['algorithm', 'monetization', 'policy', 'tools', 'business']),
			// When the platform announced it, and when we published it here.
			announced: z.coerce.date(),
			published: z.coerce.date(),
			updated: z.coerce.date().optional(),
			// When it takes effect, in words ("Feb 1, 2027"), if different from announced.
			effective: z.string().optional(),
			// official: the platform's own words. reported: credible reporting, not confirmed by the platform.
			confirmed: z.enum(['official', 'reported']),
			impact: z.enum(['high', 'medium', 'low']).default('medium'),
			whoItAffects: z.string().max(140),
			forYou: z.array(z.string().max(240)).min(1).max(4),
			doThis: z.array(z.string().max(200)).max(3).default([]),
			sources: z
				.array(
					z.object({
						title: z.string(),
						url: z.url(),
						publisher: z.string(),
						date: z.coerce.date().optional(),
						official: z.boolean().default(false),
					}),
				)
				.min(1),
			// Our guide for this platform, if any (defaults to /platforms/<platform>/).
			guide: z.string().optional(),
		})
		.refine((n) => n.confirmed !== 'official' || n.sources.some((s) => s.official), {
			message: 'confirmed: official needs at least one source with official: true',
		}),
});

// Overrides for Starlight's own UI strings per language (src/content/i18n/*.json).
const i18n = defineCollection({ loader: i18nLoader(), schema: i18nSchema() });

export const collections = { docs, i18n, tools, resources, videos, setups, news };
