var expression = require('./expression.js')
var literal = require('./literal.js')
var escape = require('./escape.js')
var mask = require('./mask.js')
var bool = require('./bool.js')

function attrib(atts, opt) {
  for (var i = 0; i < atts.length; i++) {
    var value = atts[i].value
    if (!value) continue

    var isBool = false

    if (literal(value)) {
      var key = atts[i].key
      isBool = bool.has(key)

      value = expression(value, function (expr) {
        if (isBool) {
          expr = '(' + expr + ") ? '" + key + "' : ''"
        }
        var content = '${' + expr + '}'
        return mask(content, 'literal', opt.store)
      })
    }

    value = escape(value)

    if (isBool) {
      atts[i].key = value
      atts[i].value = null
    } else {
      value = mask(value, 'attrib', opt.store)
      atts[i].value = value
    }
  }
}

module.exports = attrib
