// Brand settings in one place. To rename the site, change SITE_NAME here and
// run `grep -rl "Select Creators" src/content` to update page copy.
export const SITE_NAME = 'Select Creators';
export const SITE_DESCRIPTION =
	'The free, open-source handbook for the creator economy, written by people who do the work.';
export const REPO_URL = 'https://github.com/shifulaboratories/creators';

// Newsletter signup (src/components/NewsletterSignup.astro), self-hosted on Listmonk
// sending through Amazon SES. Setup: docs/newsletter.md. Until `action` is set,
// the signup shows a "launching soon" card that points to Instagram.
export const NEWSLETTER = {
	name: 'The Select Weekly',
	// Listmonk's public form endpoint, e.g. 'https://news.creators.select/subscription/form'
	action: '',
	// UUID of the public "The Select Weekly" list in Listmonk (Lists > list > UUID).
	listUuid: '',
};
