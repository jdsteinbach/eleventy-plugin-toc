const BuildLink = ({id, text, children}) => {
  const nestedList = children.length > 0
    ? BuildList(children)
    : ''

  return ( id && text )
    ? `<li><a href="#${id}">${text}</a>${nestedList}</li>`
    : ''
}

const BuildList = (headings) => {
  const rootLevel = +headings[0].slice(1);

    const navigation = [headings[0]];
    let parent = +navigation[0].slice(1);

     $(`<ol></ol>`).append(headings.map(h => {

    }))
}

module.exports = BuildList
