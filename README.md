# Table of Contents (nesting) Eleventy Plugin

This Eleventy plugin will generate a (property nested) TOC from page content using an Eleventy filter.

HTML:
```html
<h1>Hello, World</h1>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi assumenda consequuntur debitis ea eligendi eos hic necessitatibus, odio recusandae rem similique, totam unde. Asperiores cumque facere nisi quibusdam vitae.

<h2 id="greetings-from-mars">Greetings from Mars</h2>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam at blanditiis dolorem ea, eius impedit maxime non omnis quia repudiandae sit, suscipit vel veniam voluptas. Dignissimos eos porro sit.

<h3 id="the-red-planet">The red planet</h3>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur dicta doloremque est iure minima placeat recusandae sit. Dolorum quis quod sequi! Commodi cupiditate debitis, dolore error excepturi nulla optio.

<h2 id="greetings-from-pluto">Greetings from Pluto</h2>

```

Generated TOC:
* [Greetings from Mars](#greetings-from-mars)
  * [The red planet](#the-red-planet)
* [Greetings from Pluto](#greetings-from-pluto)
```html
<nav class="toc">
<ol>
    <li><a href="#greetings-from-mars">Greetings from Mars</a></li>
    <ol>
        <li><a href="#the-red-planet">The red planet</a></li>
    </ol>
    <li><a href="#greetings-from-pluto">Greetings from Pluto</a></li>
</ol>
</nav>

```

<hr>

# This Readme

* [Options](#options)
* [Install](#install)
  * [Adding it to Eleventy](#adding-it-to-the-eleventy-engine)
  * [Using the filter](#using-the-provided-filter)
  * [Configuring](#configuring)
* [Gotchyas](#gotchyas)


## Options

```javascript
const defaults = {
  tags: ['h2', 'h3', 'h4'], // which heading tags are selected (headings must each have an ID attribute)
  wrapper: 'nav',           // element to put around the root `ol`
  wrapperClass: 'toc'       // class for the element around the root `ol`
}
```

## Install

```sh
npm i --save JordanShurmer/elevent-plugin-toc
```

## Usage

### Adding it to the Eleventy Engine

Note: Your heading tags will need to have `id`s on them, so that the TOC can provide proper anchor links to them. Eleventy does not do this for you ootb. You can use a plugin like [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor) to add those `id`s to the headings automagically

```diff
// .eleventy.js
module.exports = function (eleventyConfig) {
  //...
+ const pluginTOC = require('eleventy-plugin-nesting-toc');
+ eleventyConfig.addPlugin(pluginTOC);

  // Example Markdown configuration (to add IDs to the headers)
  const markdownIt = require('markdown-it');
  const markdownItAnchor = require('markdown-it-anchor');
  eleventyConfig.setLibrary("md",
      markdownIt({
          html: true,
          linkify: true,
          typographer: true,
      }).use(markdownItAnchor, {})
  );
  //...
}
```

### Using the provided filter

```nunjucks
<aside>
  {{ content | toc | safe }}
</article>
<article>
  {{ content }}
</article>
```

### Configuring

You can override any of the [options](#options) at the time that you call it, or when you add it to the eleventy engine. All the options will be merged together, with the precedence being `when invoking the filter > .eleventy.js > defaults`.

Override the defaults for your whole site:

```diff
module.exports = function (eleventyConfig) {
  //...
+ const pluginTOC = require('eleventy-plugin-nesting-toc');
+ eleventyConfig.addPlugin(pluginTOC, {tags: ['h2']});
  //...
}
```

And override those just for one template, as it's being invoked

```nunjucks
<aside>
  {{ content | toc(tags=['h2', 'h3'], wrapperClass='fixed toc') | safe }}
</aside>
```


## Gotchyas

A few things must be in place for this to work properly, and provide the proper nested structure

* The first matched heading on the page should be the topmost. _Don't put an h3 before an h2_.
* you can only use actual heading tags. _Don't use `tags=['section']`, etc._
