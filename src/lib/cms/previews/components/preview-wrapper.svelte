<script lang="ts">
	const { children } = $props();

	// the whole preview lives inside the CMS's own iframe, whose viewport never changes size. the
	// frame is therefore laid out at `viewport width / zoom` css pixels and scaled back down, which
	// fakes a narrower or wider screen for everything that reads element widths — but not for media
	// queries, which keep matching the iframe's real width. container queries do follow along,
	// because `.preview__frame` is a size container
	const ZOOM_STEPS = [0.25, 0.33, 0.5, 0.67, 0.8, 1, 1.25, 1.5, 2, 3];
	const DEFAULT_STEP = ZOOM_STEPS.indexOf(1);

	let step = $state(DEFAULT_STEP);
	/** Width available to the preview, in real css pixels. */
	let viewportWidth = $state(0);
	/** Height of the frame before it is scaled. */
	let frameHeight = $state(0);

	const zoom = $derived(ZOOM_STEPS[step]);
	const frameWidth = $derived(viewportWidth / zoom);
</script>

<div class="preview__wrapper">
	<div class="preview__controls">
		<button disabled={step === 0} onclick={() => (step -= 1)}>−</button>
		<button disabled={step === ZOOM_STEPS.length - 1} onclick={() => (step += 1)}>+</button>
		<button disabled={step === DEFAULT_STEP} onclick={() => (step = DEFAULT_STEP)}>⟲</button>
		<span class="preview__zoom">{Math.round(zoom * 100)}% · {Math.round(frameWidth)}px</span>
	</div>
	<span class="preview__note">This preview is not 100% representative for the finished page.</span>
	<div
		class="preview__viewport"
		bind:clientWidth={viewportWidth}
		style:height="{frameHeight * zoom}px"
	>
		<div
			class="preview__frame"
			bind:clientHeight={frameHeight}
			style:width={viewportWidth ? `${frameWidth}px` : null}
			style:transform="scale({zoom})"
		>
			{@render children()}
		</div>
	</div>
</div>
