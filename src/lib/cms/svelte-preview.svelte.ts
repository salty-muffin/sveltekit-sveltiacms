import { mount, unmount, type Component } from 'svelte';

import type { CustomPreviewTemplate, CustomPreviewTemplateProps } from '@sveltia/cms';

/**
 * Wrap a Svelte component so it can be handed to `CMS.registerPreviewTemplate()`, which only
 * accepts React components.
 *
 * `@sveltia/cms` bundles React and exposes `createClass` (`create-react-class`) and `h`
 * (`React.createElement`) on `window` as soon as the module is evaluated, so no React dependency
 * of our own is needed — but this may only be called after `@sveltia/cms` has been imported.
 *
 * The returned React component renders an empty container, mounts the Svelte component into it
 * and then keeps feeding it fresh data: `data` lives on a `$state` object that is passed as the
 * props of the mounted component, so every edit in the entry editor updates the existing
 * component instead of remounting it.
 *
 * @param Preview Svelte component rendering the preview.
 * @param getData Maps the props React hands us — an Immutable entry plus a few helpers — onto the
 * plain, typed data the Svelte component wants. It has to return the same set of keys every time,
 * because updates are merged into the existing data (see `componentDidUpdate`).
 */
export const sveltePreviewTemplate = <Data extends object>(
	Preview: Component<{ data: Data }>,
	getData: (props: CustomPreviewTemplateProps) => Data
): CustomPreviewTemplate => {
	const { createClass, h } = window;

	if (!createClass || !h) {
		throw new Error('`@sveltia/cms` has to be imported before a preview template is created');
	}

	interface Instance {
		props: CustomPreviewTemplateProps;
		container: HTMLElement | null;
		store: { data: Data } | null;
		component: Record<string, unknown> | null;
		setContainer: (element: HTMLElement | null) => void;
	}

	return createClass({
		setContainer(this: Instance, element: HTMLElement | null) {
			this.container = element;
		},

		componentDidMount(this: Instance) {
			if (!this.container) return;

			const store = $state({ data: getData(this.props) });

			this.store = store;
			this.component = mount(Preview, { target: this.container, props: store });
		},

		componentDidUpdate(this: Instance) {
			// the entry editor sends an update on every keystroke, in any field. merging key by key
			// instead of replacing `data` means unchanged keys keep their value, and a `$derived` in
			// the preview component only recomputes when the key it actually reads has changed
			if (this.store) Object.assign(this.store.data, getData(this.props));
		},

		componentWillUnmount(this: Instance) {
			if (this.component) unmount(this.component);

			this.component = null;
			this.store = null;
		},

		render(this: Instance) {
			return h('div', { ref: this.setContainer });
		}
	});
};
