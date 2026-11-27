/**
 * Everyone who writes or reviews for Select Creators.
 *
 * A guide credits people by id in its frontmatter:
 *   authors: [william-lee]     -> "By William Lee"
 *   reviewers: [william-lee]   -> "Reviewed by William Lee"
 *
 * Rules for this file: only facts the person has approved, in their words.
 * No numbers they have not given us, and no rounding up.
 */
export interface PersonLink {
	kind: 'github' | 'linkedin' | 'instagram' | 'x' | 'website';
	label: string;
	href: string;
}

export interface Person {
	id: string;
	name: string;
	initials: string;
	/** One line under the name. */
	role: string;
	/** Short paragraphs, plain text. */
	bio: string[];
	links: PersonLink[];
}

export const people: Record<string, Person> = {
	'william-lee': {
		id: 'william-lee',
		name: 'William Lee',
		initials: 'WL',
		role: 'Head of Operations at Producer Labs',
		bio: [
			'William is Head of Operations at Producer Labs, a music marketing agency that works with all the major labels on influencer campaigns and other forms of marketing.',
			'He advises Fanfix and a few talent and creator agencies that represent top creators.',
			'Before that, he was VP of Operations at a talent agency that managed more than 30 creators with over 300 million combined followers, and did deals with many Fortune 500 brands.',
			'He started Select Creators.',
		],
		links: [
			{ kind: 'website', label: 'bywilliaml.com', href: 'https://bywilliaml.com' },
			{ kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bywilliaml' },
			{ kind: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/bywilliaml/' },
			{ kind: 'x', label: 'X', href: 'https://x.com/bywilliaml' },
			{ kind: 'github', label: 'GitHub', href: 'https://github.com/byw1' },
		],
	},
};

export const CONTRIBUTORS_PATH = '/about/contributors/';

export const getPerson = (id: string): Person | undefined => people[id];

/** Name for a byline; unknown ids fall back to the raw string so nothing breaks. */
export const personName = (id: string): string => people[id]?.name ?? id;
