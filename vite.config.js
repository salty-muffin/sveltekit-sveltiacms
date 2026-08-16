import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sveltePreprocess } from 'svelte-preprocess';

export default defineConfig({
	plugins: [
		sveltekit({
			// Consult https://github.com/sveltejs/svelte-preprocess
			// for more information about preprocessors
			preprocess: sveltePreprocess({
				scss: {
					// We can use a path relative to the root because
					// svelte-preprocess automatically adds it to `includePaths`
					// if none is defined.
					prependData: `@use 'src/lib/styles/variables.scss' as *;`
				}
			}),
			adapter: adapter({ fallback: '404.html', strict: false }),
			prerender: {
				entries: ['/']
			},
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
		})
	]
});
