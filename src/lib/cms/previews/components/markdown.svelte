<script lang="ts">
	import Markdown from './markdown.svelte';

	import type { Nodes, Properties } from 'hast';

	interface MarkdownPreviewProps {
		hast: Nodes | null | undefined;
		/** Resolves an entry image path to a URL the preview iframe can load. */
		assetUrl: (path: string) => string;
	}
	let { hast, assetUrl }: MarkdownPreviewProps = $props();

	function str(val: Properties[string]): string | undefined {
		return typeof val === 'string' ? val : undefined;
	}
</script>

<!--
	The preview counterpart of `$lib/components/markdown.svelte`. It renders the same hast, but
	resolves images through the CMS instead of `$lib/components/image.svelte`: the responsive srcsets
	that component builds point at the sharp endpoint, which only knows about images that are already
	committed, so a freshly uploaded image would stay broken until the entry is saved. Resizing and
	responsive images do not matter in the preview pane, so a plain `<img>` is enough.
-->
{#if hast && (hast.type === 'element' || hast.type === 'root')}
	{#each hast.children as child (child)}
		{#if child.type === 'element'}
			{#if child.tagName === 'img' && child.properties.src}
				<img
					class="markdown-preview"
					src={assetUrl(str(child.properties.src) ?? '')}
					alt={str(child.properties.alt)}
				/>
			{:else if child.tagName === 'a'}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={str(child.properties.href)}><Markdown hast={child} {assetUrl} /></a>
			{:else if child.tagName === 'br'}
				<br />
			{:else}
				<svelte:element this={child.tagName}><Markdown hast={child} {assetUrl} /></svelte:element>
			{/if}
		{:else if child.type === 'text'}
			{child.value}
		{/if}
	{/each}
{/if}
