var parser = require('./parser.js')
var mask = require('./mask.js')
var implode = require('./implode.js')
var escape = require('./escape.js')
var expression = require('./expression.js')

function slot(node, opt) {
  var slotName = 'default'
  var slotContent = 'slots.' + slotName

  var hasFallback = node.children && node.children.length > 0
  if (hasFallback) {
    var fallbackContent = escape(parser.stringify(node.children))
    fallbackContent = expression(fallbackContent, (expr) => '${' + expr + '}')
    slotContent += ' || `' + fallbackContent + '`'
  }

  var key = mask(slotContent, 'slot', opt.store)
  implode(node, key)
}

module.exports = slot
