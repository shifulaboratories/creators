/** Which pages get Save and Mark as done: real guides, not section fronts or About pages. */
export const isGuideId = (id: string) => id.includes('/') && !id.endsWith('/index') && !id.startsWith('about/') && id !== '404';
