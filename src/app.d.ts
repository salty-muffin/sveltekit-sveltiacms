// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { CustomPreviewTemplate } from '@sveltia/cms';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		/** Set before importing `@sveltia/cms` to keep it from initializing itself. */
		CMS_MANUAL_INIT?: boolean;
		/** `create-react-class`, exposed by `@sveltia/cms` once the module is evaluated. */
		createClass?: (spec: Record<string, unknown>) => CustomPreviewTemplate;
		/** `React.createElement`, exposed by `@sveltia/cms` once the module is evaluated. */
		h?: (type: string, props?: Record<string, unknown> | null, ...children: unknown[]) => unknown;
	}
}

export {};
