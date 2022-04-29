# 🍵 The TEAtime Starter Project

> [This Medium story](https://medium.com/geekculture/build-and-host-the-low-code-website-you-always-wanted-734f43c25874) is a complete guide on how to build and host the low-code website you’ve always wanted, for free, in a day

## Demo

https://teatime-starter.netlify.app

[![Netlify Status](https://api.netlify.com/api/v1/badges/816074af-e902-4e3b-80d6-c52cfe65e8e4/deploy-status)](https://app.netlify.com/sites/teatime-starter/deploys)

## Deploy your own

If you have a [Netlify](https://netlify.com) account and are logged in, you can deploy this site in under a minute:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/alanmosely/teatime-starter"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Ingredients

- [**T**ailwind CSS](https://tailwindcss.com), including configuration and optimisation ('vanilla' CSS is also demonstrated)
- [**E**leventy](https://www.11ty.dev), including plugins, filters and shortcodes
- [**A**lpine.js](https://alpinejs.dev), including basic animation with CSS ('vanilla' JS is also demonstrated)
- [Nunjucks](https://mozilla.github.io/nunjucks) templates
- [Markdown](https://www.markdownguide.org), including custom attributes
- Custom 404 'Page not found' page
- Basic SEO:
  - HTML tags with [Front Matter](https://www.11ty.dev/docs/data-frontmatter)
  - [Google Analytics](https://analytics.google.com) and [Facebook Pixel](https://www.facebook.com/business/learn/facebook-ads-pixel) integration
  - Performance optimisation with [postcss](https://postcss.org), [cssnano](https://cssnano.co) and [html-minifier](https://www.npmjs.com/package/html-minifier)
  - Image optimisation with the [Eleventy Image Plugin](https://www.11ty.dev/docs/plugins/image)
  - Dynamic sitemap.xml and robots.txt

## Getting started

### Install Node.js

Use `nvm` or `nvm-windows` to install the latest version of `Node.js, npm and npx`: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Clone the repository

```
git clone https://github.com/alanmosely/teatime-starter.git
```

### Install the dependencies

```
npm i
```

### Optionally customise the site

Configure your domain name, website name, social media links, facebook pixel and more in the `env.js` and `site.json` files in the `src/_data` directory

### Run the website locally

```
npm run start
```

### Browse the local website

Open http://localhost:8080 in a browser of your choice
