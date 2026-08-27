import { registerPreviewStyle, registerPreviewTemplate } from '@sveltia/cms';

import { sveltePreviewTemplate } from '$lib/cms/svelte-preview.svelte';
import PostPreview from './post.svelte';
import previewStyles from './styles/preview.scss?inline';
import zoomStyles from './styles/zoom.scss?inline';

/** Read a field off the Immutable entry as a string. */
const field = (entry: { getIn: (path: string[]) => unknown }, name: string): string => {
	const value = entry.getIn(['data', name]);

	return typeof value === 'string' ? value : '';
};

/** Register every custom preview template and stylesheet. Call this before `CMS.init()`. */
export const registerPreviews = () => {
	registerPreviewStyle(previewStyles, { raw: true });
	registerPreviewStyle(zoomStyles, { raw: true });

	registerPreviewTemplate(
		'posts',
		sveltePreviewTemplate(PostPreview, ({ entry, getAsset }) => ({
			title: field(entry, 'title'),
			description: field(entry, 'description'),
			optional: field(entry, 'optional'),
			image: field(entry, 'image'),
			body: field(entry, 'body'),
			// an image that has been uploaded but not committed yet only exists as a blob, so the CMS
			// has to resolve it. an image the CMS does not know falls back to its path, which the
			// `/images/` endpoint serves
			assetUrl: (path: string) => getAsset(path)?.url ?? path
		}))
	);
};
