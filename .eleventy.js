const buildTOC = require('./src/BuildTOC')

module.exports = (function() {
  let _opts = {}
  function TOC(eleventyConfig, pluginNamespace) {
    eleventyConfig.namespace(pluginNamespace, () => {
      eleventyConfig.addFilter('toc', (content, opts) => {
        return buildTOC(content, {..._opts, ...opts})
      });
    });
  }

  TOC.opts = function(opts) {
    _opts = opts
    return this
  }

  return TOC
})()
