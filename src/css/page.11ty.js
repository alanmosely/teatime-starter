import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default class {
  async data() {
    const cssDir = path.join(import.meta.dirname, '..', '_includes', 'css');
    const rawFilepath = path.join(cssDir, '_page.css');

    return {
      eleventyExcludeFromCollections: true,
      permalink: `css/page.css`,
      rawFilepath,
      rawCss: fs.readFileSync(rawFilepath, 'utf8'),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      tailwindcss({ optimize: { minify: true } })
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
}
