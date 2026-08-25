<script lang="ts">
	const { children } = $props();
</script>

<div class="preview__wrapper">
	<span>This preview is not 100% representative for the finished page.</span>
	<div class="preview__frame">
		{@render children()}
	</div>
</div>
