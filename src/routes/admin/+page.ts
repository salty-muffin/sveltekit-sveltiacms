// the CMS is a client side app: prerender an empty shell and let it take over in the browser
export const prerender = true;
export const ssr = false;
// emit `admin/index.html` instead of `admin.html`, so the page is served at `/admin/` everywhere
export const trailingSlash = 'always';
