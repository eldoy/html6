function text(node, content = '') {
  delete node.children
  delete node.attributes
  delete node.tagName

  node.type = 'text'
  node.content = content
}

module.exports = text
