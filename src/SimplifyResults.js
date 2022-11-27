const SimplifyResults = (tag, tags, extractText, $) => {
  const results = []

  $(`${tag}[id]`).each((i, el) => {
    const tag = el.name
    const id = $(el).attr('id')
    let baseText = $(el).text()
    if (typeof extractText === 'function') {
      baseText = extractText($(el))
    }
    let text = baseText.replace(' #', '')
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
