// Replace list copied from https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
const _escText = text => {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const _buildLink = ({id, text, children}) => {
  const nestedList = children.length > 0
    ? BuildList(children)
    : ''

  return ( id && text )
    ? `<li><a href="#${id}">${_escText(text)}</a>${nestedList}</li>`
    : ''
}

const BuildList = (listItems) => {
  const list = listItems
    .sort((a, b) => a.order - b.order)
    .map(li => _buildLink(li))

  return ( list.length > 0 )
    ? `<ol>${list.join('')}</ol>`
    : ''
}

module.exports = BuildList
