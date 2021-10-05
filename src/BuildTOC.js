const cheerio = require('cheerio')
const debug = require('debug')('EleventyPluginTOC')

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

const BuildTOC = (text, opts) => {
  if (!text) {
    debug(
      'Error: ',
      "TOC can't be generated: no text was provided to the plugin."
    )
    return
  }

  const {tags, wrapper, wrapperClass, wrapperLabel, ul, flat} = ParseOptions(
    opts,
    defaults
  )

  const $ = cheerio.load(text)

  if (!$) {
    debug('Error: ', "TOC can't be generated: text was not valid HTML.")
    return
  }

  const headings = NestHeadings(tags, $)

  if (headings.length === 0) {
    debug(
      'Error: ',
      "TOC can't be generated: HTML contained no headings with IDs."
    )
    return
  }

  const label = wrapperLabel ? `aria-label="${wrapperLabel}"` : ''

  return wrapper
    ? `<${wrapper} class="${wrapperClass}" ${label}>
        ${BuildList(headings, ul, flat)}
      </${wrapper}>`
    : BuildList(headings, ul, flat)
}

module.exports = BuildTOC
