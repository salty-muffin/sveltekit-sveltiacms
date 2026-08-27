<script lang="ts">
	const { children } = $props();

	import Zoom from './zoom.svelte';
</script>

<Zoom>
	{@render children()}
</Zoom>
