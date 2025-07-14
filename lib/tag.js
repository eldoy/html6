var parser = require('./parser.js')
function tag(node) {
  if (!Array.isArray(node)) {
    node = [node]
  }
  return parser.stringify(node)
}

module.exports = tag
