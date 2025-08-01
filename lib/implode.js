function implode(node, content = '') {
  if (!node) return
  delete node.children
  delete node.attributes
  delete node.tagName

  node.type = 'text'
  node.content = content
}

module.exports = implode
