var empty = require('./empty.js')

function skip(node) {
  var atts = node.attributes || []
  var next = node.nextElement || {}
  var nextAtts = next.attributes || []
  var nextHasElse = nextAtts.some((x) => x.key == 'elsif' || x.key == 'else')
  return !!nextHasElse
}

function start(node) {
  var current = node
  while (current) {
    if (current.attributes.some((x) => x.key == 'if')) {
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
