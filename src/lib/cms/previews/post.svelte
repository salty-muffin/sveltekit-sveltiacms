<script lang="ts" module>
	export interface PostPreviewData {
		title: string;
		description: string;
		optional: string;
		image: string;
		body: string;
	}
</script>

<script lang="ts">
	import { fromMarkdown } from 'mdast-util-from-markdown';
	import { toHast } from 'mdast-util-to-hast';

	import Markdown from '$lib/components/markdown.svelte';

	import type { ImageOptions } from '$lib/types';

	let { data }: { data: PostPreviewData } = $props();

	// same options as `src/routes/post/[slug]/+page.svelte`, so the preview matches the real page
	const imageOptions: ImageOptions = {
		sizes: [{ width: 400, maxWidth: 400 }, { width: 640 }]
	};

	// the sharp based pipeline in `$lib/markdown` is server only, so the preview parses the
	// markdown in the browser and leaves the image dimensions to the image endpoint
	const body = $derived(toHast(fromMarkdown(data.body)));
</script>

<article>
	<h1>{data.title}</h1>
	<h2>{data.description}</h2>
	{#if data.optional}
		<h3>{data.optional}</h3>
	{/if}

	{#if data.image}
		<img src={data.image} alt="" />
	{/if}

	<Markdown hast={body} {imageOptions} />
</article>
