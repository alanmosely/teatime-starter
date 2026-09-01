# Agent guide

Static site: Eleventy 3 (ESM) + Tailwind CSS 4 + Alpine.js. Node.js >= 22.
Source lives in `src/`; `public/` is generated output — never edit it.

## Commands

- `npm install` — install (lockfile is committed)
- `npm run build` — clean build with dev URLs (~2s); the quickest way to verify a change compiles
- `npm run build:prod` — production build with real URLs (what Netlify runs)
- `npm start` — dev server with live reload at http://localhost:8080
- `npm run clean` — delete `public/`

There are no tests; a successful build catches template and config errors.

## Conventions that differ from docs/defaults

- **Tailwind v4 is configured in CSS, not JS.** Theme values (custom colours, hero
  background images) live in the `@theme` block in `src/_includes/css/_page.css`.
  There is no `tailwind.config.js` — do not create one, and do not use `@tailwind`
  directives (v3 syntax).
- Utility classes must appear literally in source files — Tailwind scans `src/` as
  plain text, so never build class names dynamically.
- `src/_includes/css/custom.css` is plain CSS imported with
  `@import "./custom.css" layer(components);` — keep it in that layer so utility
  classes win specificity ties.
- **The image shortcode takes the CSS class as its second argument:**
  `{% image src, class, alt, sizes %}` — this differs from the `(src, alt, ...)`
  convention in the 11ty docs.
- The whole project is ESM (`"type": "module"`): no `require()`/`module.exports`.
- CSS is compiled by `src/css/page.11ty.js` (an Eleventy JS template running
  PostCSS + `@tailwindcss/postcss`) into `/css/page.css`; there is no separate
  CSS build step or watcher.
- `ELEVENTY_ENV=dev` switches `src/_data/env.js` to localhost URLs; when unset,
  builds use the production URL placeholder (`https://MY-DOMAIN.com`).
- Markdown renders through Liquid preprocessing (Eleventy's default);
  `index.njk` embeds `src/_includes/content/about.md` via `{% renderFile %}`.
- Config is `eleventy.config.js`; layouts in `src/_layouts`, includes in
  `src/_includes`, global data in `src/_data`.
