const SimplifyResults = require('./SimplifyResults')

const NestHeadings = (tags, $) => {
  const temp = {}

  tags.forEach(t => {
    temp[t] = SimplifyResults(t, tags, $)
  })

  const headings = []

  Object.keys(temp)
    .reverse()
    .filter(t => temp[t].length > 0)
    .map(k => {
      const index = tags.indexOf(k)

      temp[k].map(h => {
        let parent = headings

        if (index > 0) {
          const potentialParent = temp[tags[index - 1]].find(p => {
            return p.id === h.parent
          })

          if (potentialParent && 'children' in potentialParent) {
            parent = potentialParent.children
          }
        }

        parent.push(h)
      })
    })

  return headings
}

module.exports = NestHeadings
