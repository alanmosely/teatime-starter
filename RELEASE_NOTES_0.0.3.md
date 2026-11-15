# TEAtime Starter 0.0.3

Production builds require a valid origin from SITE_URL or Netlify URL and reject
placeholder, local or malformed values. Sitemap output excludes robots, 404 and
utility files. The mobile menu now exposes expanded state, visible keyboard
focus, Escape/focus restoration and resize cleanup. Dependencies are refreshed
and real generated-output CI runs on Node 22 and 24.

## Upgrade

1. Back up your custom templates, styles and site data. Merge the starter changes
   or apply them selectively, keeping the navbar markup and script together.
2. Use Node 22 or 24 and run `npm ci`.
3. For Firebase/custom hosting, set your actual public origin, for example
   `npx cross-env SITE_URL=https://your-project.web.app npm run build:prod`.
   Firebase's project ID alone does not provide it. Netlify supplies URL; SITE_URL
   overrides it. Use only an HTTP(S) origin without credentials, path, query or
   fragment. Production builds now fail if it is missing or a placeholder.
4. Run `npm test`, build for your domain, inspect sitemap/robots and redeploy.
   If deploying the site ZIP, extract its contents into the hosting web root.

## Artifacts

The built site ZIP targets the project's demo origin
`https://teatime-starter.netlify.app`. Rebuild with your own origin before hosting
elsewhere. The source ZIP contains the matching Git revision; BUILD.json records
the revision, Node version and origin. SHA256SUMS.txt covers the downloads.

Build checks cover invalid origins and actual development, Firebase, Netlify and
override output. Mobile/desktop menu checks passed in installed Edge. This is a
static starter release; no hosting credentials are included.
