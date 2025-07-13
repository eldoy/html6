var voids = require('./voids.js')

function tag(node) {
  if (node.type == 'text') {
    return node.content
  }

  var children = (node.children || []).map(tag).join('')

  var name = node.tagName
  if (voids[name]) {
    return '<' + name + '>'
  }
  return '<' + name + '>' + children + '</' + name + '>'
}

module.exports = tag
