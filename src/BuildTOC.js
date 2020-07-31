const cheerio = require('cheerio')

const ParseOptions = require('./ParseOptions')
const NestHeadings = require('./NestHeadings')
const BuildList = require('./BuildList')

const defaults = {
  tags: ['h2', 'h3', 'h4'],
  wrapper: 'nav',
  wrapperClass: 'toc',
  ul: false,
  flat: false,
}

const BuildTOC = (text, opts) => {
  const {tags, wrapper, wrapperClass, ul, flat} = ParseOptions(opts, defaults)

  const $ = cheerio.load(text)

  const headings = NestHeadings(tags, $)

  return headings.length > 0
    ? `<${wrapper} class="${wrapperClass}">
        ${BuildList(headings, ul, flat)}</${wrapper}>`
    : undefined
}

module.exports = BuildTOC
