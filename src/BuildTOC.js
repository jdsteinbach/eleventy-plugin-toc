const cheerio = require('cheerio')
const BuildList = require('./BuildList')

const BuildTOC = (text, opts) => {
  const { tags, wrapper, wrapperClass } = Object.assign({}, opts, {
    tags: ['h2', 'h3'],
    wrapper: 'nav',
    wrapperClass: 'toc'
  })
  const $ = cheerio.load(text)

  let headings = []

  $(tags.join()).each((i, el) => {
    let tag = el.name
    let id = $(el).attr('id')
    let text = $(el).text().replace(' #', '')
    let hierarchy = tags.indexOf(tag)
    let parent = (hierarchy > 0)
      ? $(el).prevAll(tags[hierarchy - 1]).attr('id')
      : false

    let holder = headings
    if ( parent ) {
      let parentHeading = headings.find(h => (h.id === parent)).children
      if ( parentHeading ) {
        holder = parentHeading
      }
    }

    holder.push({
      tag,
      id,
      text,
      children: []
    })
  })

  return ( headings.length > 0 )
    ? `<${wrapper} class="${wrapperClass}">${BuildList(headings)}</${wrapper}>`
    : ''
}

module.exports = BuildTOC
