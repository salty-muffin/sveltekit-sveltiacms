import { registerPreviewStyle, registerPreviewTemplate } from '@sveltia/cms';

import { sveltePreviewTemplate } from '$lib/cms/svelte-preview.svelte';
import PostPreview from './post.svelte';
import previewStyles from './preview.scss?inline';

/** Read a field off the Immutable entry as a string. */
const field = (entry: { getIn: (path: string[]) => unknown }, name: string): string => {
	const value = entry.getIn(['data', name]);

	return typeof value === 'string' ? value : '';
};

/** Register every custom preview template and stylesheet. Call this before `CMS.init()`. */
export const registerPreviews = () => {
	registerPreviewStyle(previewStyles, { raw: true });

	registerPreviewTemplate(
		'posts',
		sveltePreviewTemplate(PostPreview, ({ entry, getAsset }) => {
			const image = field(entry, 'image');

			return {
				title: field(entry, 'title'),
				description: field(entry, 'description'),
				optional: field(entry, 'optional'),
				// unsaved uploads only exist as a blob, so the asset has to be resolved by the CMS
				image: image ? (getAsset(image)?.url ?? '') : '',
				body: field(entry, 'body')
			};
		})
	);
};
