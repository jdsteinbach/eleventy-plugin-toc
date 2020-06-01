const cheerio = require('cheerio')
const debug = require("debug")("plugin-toc")

const ParseOptions = require('./ParseOptions')
const NestHeadings = require('./NestHeadings')
const BuildList = require('./BuildList')

const defaults = {
  tags: ['h2', 'h3', 'h4'],
  wrapper: 'nav',
  wrapperClass: 'toc',
  ul: false
}

const BuildTOC = (text, opts) => {
  const { tags, wrapper, wrapperClass, ul } = ParseOptions(opts, defaults)

  const $ = cheerio.load(text)

  const headings = NestHeadings(tags, $)

  return (headings.length > 0)
    ? `<${wrapper} class="${wrapperClass}">${BuildList(headings)}</${wrapper}>`
    : undefined
}

module.exports = BuildTOC
