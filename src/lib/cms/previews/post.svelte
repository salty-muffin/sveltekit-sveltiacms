<script lang="ts" module>
	export interface PostPreviewData {
		title: string;
		description: string;
		optional: string;
		image: string;
		body: string;
		/** Resolves an entry image path to a URL the preview iframe can load. */
		assetUrl: (path: string) => string;
	}
</script>

<script lang="ts">
	import { fromMarkdown } from 'mdast-util-from-markdown';
	import { toHast } from 'mdast-util-to-hast';

	import MarkdownPreview from './components/markdown-preview.svelte';

	let { data }: { data: PostPreviewData } = $props();

	// the sharp based pipeline in `$lib/markdown` is server only, so the preview parses the markdown
	// in the browser. only `data.body` is read here, so editing another field does not reparse
	const body = $derived(toHast(fromMarkdown(data.body)));
</script>

<article>
	<h1>{data.title}</h1>
	<h2>{data.description}</h2>
	{#if data.optional}
		<h3>{data.optional}</h3>
	{/if}

	{#if data.image}
		<img src={data.assetUrl(data.image)} alt="" />
	{/if}

	<MarkdownPreview hast={body} assetUrl={data.assetUrl} />
</article>
