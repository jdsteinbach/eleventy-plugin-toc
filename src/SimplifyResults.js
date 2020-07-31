const SimplifyResults = (tag, tags, $) => {
  const results = []

  $(`${tag}[id]`).each((i, el) => {
    const tag = el.name
    const id = $(el).attr('id')
    const text = $(el).text().replace(' #', '')
    const hierarchy = tags.indexOf(tag)
    const parent =
      hierarchy > 0 &&
      $(el)
        .prevAll(tags[hierarchy - 1])
        .attr('id')

    results.push({
      order: i,
      tag,
      id,
      text,
      parent,
      children: [],
    })
  })

  return results
}

module.exports = SimplifyResults
