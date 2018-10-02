const cheerio = require('cheerio')
const parseJSON = require('parse-json')

const ParseOptions = require('./ParseOptions')
const NestHeadings = require('./NestHeadings')
const BuildList = require('./BuildList')

const defaults = {
  tags: ['h2', 'h3', 'h4'],
  wrapper: 'nav',
  wrapperClass: 'toc'
}

const BuildTOC = (text, opts) => {
  const { tags, wrapper, wrapperClass } = ParseOptions(opts, defaults)

  const $ = cheerio.load(text)

  const headings = NestHeadings(tags, $)

  return ( headings )
    ? `<${wrapper} class="${wrapperClass}">${BuildList(headings)}</${wrapper}>`
    : false
}

module.exports = BuildTOC
