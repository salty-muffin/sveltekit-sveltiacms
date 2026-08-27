<script lang="ts">
	const { children } = $props();

	// the whole preview lives inside the CMS's own iframe, whose viewport never changes size. the
	// frame is therefore laid out at `viewport width / zoom` css pixels and drawn scaled back down,
	// which fakes a narrower or wider screen for everything that reads element widths — but not for
	// media queries, which keep matching the iframe's real width. container queries do follow along,
	// because `.preview__frame` is a size container
	const ZOOM_STEPS = [0.25, 0.33, 0.5, 0.67, 0.8, 1, 1.25, 1.5, 2, 3];
	const DEFAULT_STEP = ZOOM_STEPS.indexOf(1);

	let step = $state(DEFAULT_STEP);
	/** Space the frame gets, in real css pixels — only read to label the zoom level. */
	let viewportWidth = $state(0);

	const zoom = $derived(ZOOM_STEPS[step]);
</script>

<div class="zoom__wrapper" bind:clientWidth={viewportWidth}>
	<div class="zoom__header">
		<div class="zoom__controls">
			<button type="button" disabled={step === 0} onclick={() => (step -= 1)}>−</button>
			<button type="button" disabled={step === ZOOM_STEPS.length - 1} onclick={() => (step += 1)}
				>+</button
			>
			<button type="button" disabled={step === DEFAULT_STEP} onclick={() => (step = DEFAULT_STEP)}
				>⟲</button
			>
			<span class="zoom__scale"
				>{Math.round(zoom * 100)}% · Container width: {Math.round(viewportWidth / zoom)}px</span
			>
		</div>
		<span class="zoom__note">This preview is not 100% representative for the final page.</span>
	</div>
	<div class="zoom__frame" style:zoom>
		{@render children()}
	</div>
</div>
