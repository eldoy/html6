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

    var key = atts[i].key
    var isBool = value.startsWith('{{') && value.endsWith('}}') && bool.has(key)

    if (literal(value)) {
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
