import type { CmsConfig } from '@sveltia/cms';

/**
 * Sveltia CMS configuration. This replaces `static/admin/config.yml`: it is passed to
 * `CMS.init()` in `src/routes/admin/+page.svelte` together with `load_config_file: false`,
 * so the CMS never fetches a config file at runtime and TypeScript checks the options for us.
 */
export const config: CmsConfig = {
	load_config_file: false,

	backend: {
		name: 'github',
		repo: 'salty-muffin/sveltekit-sveltiacms'
	},

	media_folder: 'src/images', // folder where user uploaded files should go
	public_folder: '/images',

	slug: {
		encoding: 'ascii',
		clean_accents: true,
		sanitize_replacement: '-'
	},

	collections: [
		{
			name: 'posts', // used in routes, e.g. /admin/collections/posts
			identifier_field: 'title',
			label: 'Posts', // used in the ui
			label_singular: 'Post',
			folder: 'src/content/posts', // path to the folder where the documents are stored
			create: true, // allow users to create new documents in this collection
			slug: '{{slug}}', // filename template, e.g. YYYY-MM-DD-title.md
			format: 'yaml-frontmatter',
			extension: 'md',
			fields: [
				{ label: 'Title', name: 'title', widget: 'string' },
				{ label: 'Description', name: 'description', widget: 'text' },
				{ label: 'Image', name: 'image', widget: 'image' },
				{ label: 'Draft', name: 'draft', widget: 'boolean', default: true },
				{ label: 'Optional', name: 'optional', widget: 'string', required: false },
				{ label: 'Content', name: 'body', widget: 'richtext' }
			]
		}
	]
};
