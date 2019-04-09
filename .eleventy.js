const buildTOC = require('./src/BuildTOC')
const parseOptions = require('./src/ParseOptions')

const defaults = {
  tags: ['h2', 'h3', 'h4'],
  wrapper: 'nav',
  wrapperClass: 'toc'
}

module.exports = {
  initArguments: {},
  configFunction: function(eleventyConfig, options = {}) {
    eleventyConfig.addFilter('toc', (content, opts) => {
      const usageOpts = parseOptions(opts, {...defaults, ...options});
      buildTOC(content, usageOpts);
    })
  }
}
