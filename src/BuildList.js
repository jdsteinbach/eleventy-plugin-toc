const BuildLink = ({id, text, children}) => {
  const nestedList = children.length > 0
    ? BuildList(children)
    : ''

  return ( id && text )
    ? `<li><a href="#${id}">${text}</a>${nestedList}</li>`
    : ''
}

const BuildList = (listItems) => {
  const list = listItems
    .sort((a, b) => a.order - b.order)
    .map(li => BuildLink(li))

  return ( list.length > 0 )
    ? `<ol>${list.join('')}</ol>`
    : ''
}

module.exports = BuildList
