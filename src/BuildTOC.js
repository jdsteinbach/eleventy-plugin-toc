const cheerio = require('cheerio')

const ParseOptions = require('./ParseOptions')
const NestHeadings = require('./NestHeadings')
const BuildList = require('./BuildList')

const defaults = {
  tags: ['h2', 'h3', 'h4'],
  wrapper: 'nav',
  wrapperClass: 'toc',
  wrapperLabel: undefined,
  ul: false,
  flat: false,
}

function BuildTOC(text, opts) {
  const {tags, wrapper, wrapperClass, wrapperLabel, ul, flat} = ParseOptions(
    opts,
    defaults
  )

  const $ = cheerio.load(text)

  const headings = NestHeadings(tags, $)

  if (headings.length === 0) {
    return undefined
  }

  const label = wrapperLabel ? `aria-label="${wrapperLabel}"` : ''

  const content = BuildList(headings, ul, flat);
  return (
      typeof wrapper === 'function' ? wrapper.call(this, text, opts)
    : wrapper ? `<${wrapper} class="${wrapperClass}" ${label}>${content}</${wrapper}>`
    : content
  );
}

module.exports = BuildTOC
