# sveltekit-sveltiacms

A base repo for a static site with Sveltia CMS & sharp image optimization.

It includes a component for rendering the markdown to html with a custom image component. the image component gets a range of options (an array of sizes, formats, quality, etc.). each page that uses decapcms for content needs an endpoint in which the markdown is processed.

Look to `src/routes/post/[slug]/+page.server.ts` to see how to set up an endpoint and to `src/routes/post/[slug]/+page.svelte` to see how to set up the corresponding page. Look to `src/lib/types.ts` to get information about the image options.

Sveltia CMS is installed from npm (pinned to an exact version in `package.json`) and initialized
explicitly, instead of being pulled from a CDN by a static `admin/index.html`:

- `src/routes/admin/+page.svelte` imports the CMS in the browser and calls `CMS.init()`.
- `src/lib/cms/config.ts` holds the configuration that used to live in `static/admin/config.yml`.
  It is typed as `CmsConfig`, and `load_config_file: false` keeps the CMS from looking for a
  config file.
- `src/lib/cms/previews/` holds the custom preview templates. `CMS.registerPreviewTemplate()`
  only takes React components, so `src/lib/cms/svelte-preview.svelte.ts` wraps a Svelte component
  in one, which means previews are written in Svelte and can reuse the site's own components.
- `src/lib/cms/previews/markdown.svelte` is the preview counterpart of
  `$lib/components/markdown.svelte`. It renders the same hast, but resolves images with the CMS's
  `getAsset()` rather than through `$lib/components/image.svelte`, so images that have been
  uploaded but not committed yet show up in the preview.
- Preview styles have to be registered with `CMS.registerPreviewStyle()`
  (`src/lib/cms/previews/preview.scss`), because the preview iframe does not load the app's
  stylesheet and Svelte's scoped `<style>` blocks therefore never reach it.

`/admin` is prerendered, so it has to be listed in `prerender.entries` in `vite.config.js`.
