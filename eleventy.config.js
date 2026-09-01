import { minify } from "html-minifier-terser";
import Image from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import { full as markdownItEmoji } from "markdown-it-emoji";
import pluginRss from "@11ty/eleventy-plugin-rss";
import { RenderPlugin } from "@11ty/eleventy";

const removeTrailingSlash = (url) => {
  if (typeof url !== 'string') {
    throw new Error(`${removeTrailingSlash.name}: expected argument of type string but instead got ${url} (${typeof url})`);
  }
  return url.replace(/\/$/, '');
}

async function imageShortcode(src, cls, alt, sizes) {
  return Image(src, {
    widths: [600, 900, 1500],
    formats: ["webp"],
    outputDir: "./public/img/",
    returnType: "html",
    htmlOptions: {
      imgAttributes: {
        class: cls,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      },
    },
  });
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(RenderPlugin);

  eleventyConfig.addFilter('removeTrailingSlash', removeTrailingSlash);

  eleventyConfig.addWatchTarget('./src/_includes/css/');

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true
    }).use(markdownItAttrs).use(markdownItEmoji)
  )

  eleventyConfig.addShortcode("image", imageShortcode);

  eleventyConfig.addPassthroughCopy({ './src/static/': '/' });
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': '/js/alpine.js',
  })

  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
      data: './_data',
      includes: './_includes',
      layouts: './_layouts'
    },
    templateFormats: [
      'md',
      'njk',
      '11ty.js'
    ],
    htmlTemplateEngine: 'njk'
  };
};
