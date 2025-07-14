var parser = require('himalaya')
var config = {
  ...parser.parseDefaults,
  preferDoubleQuoteAttributes: true
}

var voids = require('./voids.js')

function tag(node) {
  if (!Array.isArray(node)) {
    node = [node]
  }
  return parser.stringify(node, config)
}

module.exports = tag
