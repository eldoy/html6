function skip(node) {
  var atts = node.attributes || []
  var next = node.nextElement || {}
  var nextHasConditional = next.attributes?.some(
    (x) => x.key == 'elsif' || x.key == 'else'
  )
  return !!nextHasConditional
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

module.exports = { skip, start }
