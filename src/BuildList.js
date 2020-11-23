// Replace list copied from https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
const _escText = text => {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const _buildLink = ({id, text, children}, isUl, flat) => {
  let nestedList = ''

  if (children.length > 0 && flat) {
    nestedList = children.map(c => _buildLink(c, isUl, flat))
  } else if (children.length > 0) {
    nestedList = BuildList(children, isUl, flat)
  }

  if (id && text && flat) {
    return `<li><a href="#${id}">${_escText(text)}</a></li>${(
      nestedList || []
    ).join('')}`
  } else if (id && text) {
    return `<li><a href="#${id}">${_escText(text)}</a>${nestedList}</li>`
  } else {
    return nestedList
  }
}

const BuildList = (listItems, isUl, flat) => {
  const listType = isUl ? 'ul' : 'ol'
  const list = listItems
    .sort((a, b) => a.order - b.order)
    .map(li => _buildLink(li, isUl, flat))

  return list.length > 0 ? `<${listType}>${list.join('')}</${listType}>` : ''
}

module.exports = BuildList
