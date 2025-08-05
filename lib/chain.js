var empty = require('./empty.js')

function skip(node) {
  var next = node.nextElement || {}
  var atts = next.attributes || []
  var nextHasConditional = atts.some((x) => x.key == 'elsif' || x.key == 'else')
  return !!nextHasConditional
}

function start(node) {
  var current = node
  while (current) {
    var atts = current.attributes || []
    if (atts.some((x) => x.key == 'if')) {
      return current
    }
    current = current.previousElement
  }
  return null
}

function stomp(node) {
  if (!node) return
  var current = node.nextElement
  while (current) {
    var atts = current.attributes || []
    if (atts.some((x) => x.key == 'elsif' || x.key == 'else')) {
      empty(current)
    } else {
      return
    }
    current = current.nextElement
  }
}

module.exports = { skip, start, stomp }
