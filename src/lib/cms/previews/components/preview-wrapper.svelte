<script lang="ts">
	const { children } = $props();

	import Zoom from './zoom.svelte';
	import Layout from './layout.svelte';
</script>

<Zoom>
	<Layout>
		{@render children()}
	</Layout>
</Zoom>
