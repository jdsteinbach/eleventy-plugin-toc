const buildTOC = require('./src/BuildTOC')
const parseOptions = require('./src/ParseOptions')

module.exports = (eleventyConfig, globalOpts = {}) => {
  eleventyConfig.addFilter('toc', (content, localOpts) => {
    return buildTOC(content, parseOptions(localOpts, globalOpts))
  })
}
