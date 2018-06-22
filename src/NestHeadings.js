const simplifyResults = (tag, tags, $) => {
  const results = []

  $(tag).each((i, el) => {
    let tag = el.name
    let id = $(el).attr('id')
    let text = $(el).text().replace(' #', '')
    let hierarchy = tags.indexOf(tag)
    let parent = ( hierarchy > 0 )
      ? $(el).prevAll(tags[hierarchy - 1]).attr('id')
      : false

    results.push({
      order: i,
      tag,
      id,
      text,
      parent,
      children: []
    })
  })

  return results
}


const NestHeadings = (tags, $) => {
  let temp = {}

  tags
    .forEach((t, i) => {
      temp[t] = simplifyResults(t, tags, $)
    })

  let headings = []

  Object.keys(temp)
    .reverse()
    .filter(t => temp[t].length > 0)
    .map((k) => {
      let index = tags.indexOf(k)

      temp[k].map(h => {
        let parent = headings

        if ( index > 0 ) {
          let potentialParent = temp[tags[index - 1]].find(p => {
            return p.id == h.parent
          })

          if ( potentialParent && 'children' in potentialParent ) {
            parent = potentialParent.children
          }
        }

        parent.push(h)
      })
    })

  return headings
}

module.exports = NestHeadings
