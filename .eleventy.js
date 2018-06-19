const buildTOC = require('./src/BuildTOC')

module.exports = function(eleventyConfig, pluginNamespace) {
  eleventyConfig.namespace(pluginNamespace, () => {
    eleventyConfig.addFilter('toc', content => buildTOC(content, {}))
  })
}
