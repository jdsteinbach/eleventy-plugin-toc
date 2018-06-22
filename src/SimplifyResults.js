const SimplifyResults = (tag, tags, $) => {
  const results = []

  $(`${tag}[id]`).each((i, el) => {
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

module.exports = SimplifyResults
