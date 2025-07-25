var parser = require('./parser.js')

function slot(node) {
  var slotName = 'default'
  var slotContent = 'slots.' + slotName

  var hasFallback = node.children && node.children.length > 0
  if (hasFallback) {
    var fallbackContent = parser.stringify(node.children)
    slotContent += ' || `' + fallbackContent + '`'
  }

  return slotContent
}

module.exports = slot
