import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
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
 * Curated "goldmine" resources in src/data/resources/. Each says why it is worth
 * someone's time; affiliate links must be flagged like tools.
 */
const resources = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/data/resources' }),
	schema: z.object({
		name: z.string(),
		// A full URL, or a path starting with / for our own guides.
		url: z.string().refine((u) => u.startsWith('/') || URL.canParse(u), 'Must be a URL or a /path'),
		kind: z.enum(['official', 'playbook', 'hiring', 'code', 'tool', 'learning']),
		tint: z.string().default('goldmines'),
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
		note: z.string().optional(),
		gear: z.object({
			camera: z.array(z.string()).default([]),
			lens: z.array(z.string()).default([]),
			audio: z.array(z.string()).default([]),
			lighting: z.array(z.string()).default([]),
			editing: z.array(z.string()).default([]),
			support: z.array(z.string()).default([]),
		}),
	}),
});

export const collections = { docs, tools, resources, videos, setups };
