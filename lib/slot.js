function slot(node) {
  delete node.children
  delete node.attributes
  delete node.tagName
  node.type = 'text'
  node.content = '${slots.default}'

  return node.content
}

module.exports = slot
