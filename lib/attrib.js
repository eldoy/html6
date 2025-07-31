var expression = require('./expression.js')
var implode = require('./implode.js')
var literal = require('./literal.js')
var escape = require('./escape.js')
var mask = require('./mask.js')

function attrib(atts, opt) {
  for (let i = 0; i < atts.length; i++) {
    var value = atts[i].value
    if (!value) continue

    if (literal(value)) {
      value = expression(value, function (expr) {
        return mask('${' + expr + '}', 'literal', opt.store)
      })
    }

    value = escape(value)

    value = mask(value, 'attrib', opt.store)
    atts[i].value = value
  }
}

module.exports = attrib
