var parser = require('himalaya')
var DEFAULT_CONFIG = {
  ...parser.parseDefaults,
  preferDoubleQuoteAttributes: true
}

module.exports = {
  parse: parser.parse,
  stringify: function (tree, config = {}) {
    config = { ...DEFAULT_CONFIG, ...config }
    if (!Array.isArray(tree)) {
      tree = [tree]
    }
    return parser.stringify(tree, config)
  }
}
