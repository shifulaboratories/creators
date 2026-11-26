// Brand settings in one place. To rename the site, change SITE_NAME here and
// run `grep -rl "Select Creators" src/content` to update page copy.
export const SITE_NAME = 'Select Creators';
export const SITE_DESCRIPTION =
	'The free, open-source handbook for the creator economy, written by people who do the work.';
export const REPO_URL = 'https://github.com/shifulaboratories/creators';

// Newsletter signup (src/components/NewsletterSignup.astro). Until `action` is set,
// the signup shows a "launching soon" card that points to Instagram.
// Kit:     action 'https://app.kit.com/forms/<FORM_ID>/subscriptions', emailField 'email_address', method 'post'
// beehiiv: action 'https://<publication>.beehiiv.com/subscribe', emailField 'email', method 'get'
export const NEWSLETTER = {
	name: 'The Select Weekly',
	provider: '',
	action: '',
	emailField: 'email',
	method: 'post',
};
