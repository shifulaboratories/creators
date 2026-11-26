import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * Every guide records who wrote it, who reviewed it, when it was last checked,
 * and how confident we are in it.
 */
const docs = defineCollection({
	loader: docsLoader(),
	schema: docsSchema({
		extend: z.object({
			authors: z.array(z.string()).default([]),
			reviewers: z.array(z.string()).default([]),
			lastReviewed: z.coerce.date().optional(),
			confidence: z.enum(['verified', 'practitioner-view', 'speculative']).optional(),
			status: z.enum(['outline', 'draft', 'published']).default('outline'),
			// Underground pages must never carry affiliate links or sponsors.
			noAffiliates: z.boolean().default(false),
		}),
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

export const collections = { docs, tools };
