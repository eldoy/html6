var parser = require('./parser.js')
var mask = require('./mask.js')
var text = require('./text.js')

function slot(node, opt) {
  var slotName = 'default'
  var slotContent = 'slots.' + slotName

  var hasFallback = node.children && node.children.length > 0
  if (hasFallback) {
    var fallbackContent = parser.stringify(node.children)
    slotContent += ' || `' + fallbackContent + '`'
  }

  var key = mask(slotContent, 'slot', opt.store)
  text(node, key)
}

module.exports = slot
