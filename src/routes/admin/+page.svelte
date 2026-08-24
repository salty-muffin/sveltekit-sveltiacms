<script lang="ts">
	import { onMount } from 'svelte';

	import { config } from '$lib/cms/config';

	onMount(async () => {
		// `@sveltia/cms` initializes itself when it is loaded from a classic `<script>` tag; as an
		// ES module it does not, but the flag makes that explicit and safe against future changes
		window.CMS_MANUAL_INIT = true;

		// the module touches `window` and `document` while it evaluates, so it can only be imported
		// in the browser — importing it also exposes the React globals the preview bridge needs
		const CMS = (await import('@sveltia/cms')).default;
		const { registerPreviews } = await import('$lib/cms/previews');

		registerPreviews();

		await CMS.init({ config });
	});
</script>

<svelte:head>
	<title>Sveltia CMS</title>
	<meta name="robots" content="noindex" />
</svelte:head>
