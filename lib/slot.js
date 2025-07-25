var parser = require('./parser.js')
var escape = require('./escape.js')

function slot(node) {
  var slotName = 'default'
  var slotContent = 'slots.' + slotName

  var hasFallback = node.children && node.children.length > 0
  if (hasFallback) {
    var fallbackContent = escape(parser.stringify(node.children))
    slotContent += ' || `' + fallbackContent + '`'
  }

  return slotContent
}

module.exports = slot
