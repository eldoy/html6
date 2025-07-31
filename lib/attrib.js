var expression = require('./expression.js')
var implode = require('./implode.js')
var literal = require('./literal.js')
var escape = require('./escape.js')
var mask = require('./mask.js')

function attrib(atts, opt) {
  var value = atts.value
  if (!value) return

  if (literal(value)) {
    value = expression(value, function (expr) {
      return mask(expr, 'literal', opt.store)
    })
  }

  value = escape(value)

  value = mask(value, 'attrib', opt.store)
  atts.value = value
}

module.exports = attrib
