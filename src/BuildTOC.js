const cheerio = require('cheerio')
const parseJSON = require('parse-json')

const ParseOptions = require('./ParseOptions')
const NestHeadings = require('./NestHeadings')
const BuildList = require('./BuildList')


const BuildTOC = (text, opts) => {
  const { tags, wrapper, wrapperClass } = opts;

  const $ = cheerio.load(text)


  //Get all the headings
  const selectors = tags.join(',');
  const headings =$(selectors).filter('[id]');

  return ( headings )
    ? `<${wrapper} class="${wrapperClass}">${BuildList(headings, rootLevel)}</${wrapper}>`
    : false
}

module.exports = BuildTOC
