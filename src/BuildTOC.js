const cheerio = require('cheerio')
const NestHeadings = require('./NestHeadings')
const BuildList = require('./BuildList')

const BuildTOC = (text, opts) => {
  const { tags, wrapper, wrapperClass } = Object.assign({}, opts, {
    tags: ['h2', 'h3', 'h4'],
    wrapper: 'nav',
    wrapperClass: 'toc'
  })

  const $ = cheerio.load(text)

  const headings = NestHeadings(tags, $)

  return ( headings )
    ? `<${wrapper} class="${wrapperClass}">${BuildList(headings)}</${wrapper}>`
    : ''
}

module.exports = BuildTOC
