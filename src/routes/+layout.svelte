<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	// global styles
	import '$lib/styles/global.scss';

	const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
