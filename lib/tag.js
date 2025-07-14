var parser = require('himalaya')
var config = {
  ...parser.parseDefaults,
  preferDoubleQuoteAttributes: true
}

function tag(node) {
  if (!Array.isArray(node)) {
    node = [node]
  }
  return parser.stringify(node, config)
}

module.exports = tag
