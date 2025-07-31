var implode = require('./implode.js')
var parser = require('./parser.js')

function element(node, opt) {
  var content = parser.stringify(node)

  implode(node, content)
}

module.exports = element
