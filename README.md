# eleventy-plugin-toc

This Eleventy plugin will generate a TOC from page content using an Eleventy filter.

## Usage

### 1. Install the plugin

```sh
npm i --save eleventy-plugin-toc
```

### 2. Add the plugin to Eleventy config

Note: you'll need to make sure you're adding `id`s to heading elements before this plugin will return anything. The simplified example below uses `markdown-it-anchor` to add those `id`s to the headings.

```js
// .eleventy.js
const pluginTOC = require('eleventy-plugin-toc')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginTOC)

  /* Markdown */
  let markdownIt = require('markdown-it')
  let markdownItAnchor = require('markdown-it-anchor')

  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAnchor))

  return {
    templateFormats: ['md'],
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  }
}
```

### 3. Use the filter in your template

```liquid
<article>
  {{ content }}
</article>
<aside>
  {{ content | toc }}
</article>
```
