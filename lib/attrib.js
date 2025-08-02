var expression = require('./expression.js')
var implode = require('./implode.js')
var literal = require('./literal.js')
var escape = require('./escape.js')
var mask = require('./mask.js')
var bool = require('./bool.js')

function attrib(atts, opt) {
  for (var i = 0; i < atts.length; i++) {
    var value = atts[i].value
    if (!value) continue

    if (literal(value)) {
      var key = atts[i].key
      var pure = bool.has(key) && value.startsWith('{{') && value.endsWith('}}')
      var prefix = 'MASK'
      var type = 'literal'
      if (pure) {
        prefix = 'BOOL'
        type = key
      }
      value = expression(value, function (expr) {
        var content = pure ? expr : '${' + expr + '}'
        return mask(content, type, opt.store, prefix)
      })
    }

    value = escape(value)

    value = mask(value, 'attrib', opt.store)
    atts[i].value = value
  }
}

module.exports = attrib
