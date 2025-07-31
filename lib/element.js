var expression = require('./expression.js')
var implode = require('./implode.js')
var literal = require('./literal.js')
var escape = require('./escape.js')
var mask = require('./mask.js')
var parser = require('./parser.js')

function element(node, opt) {
  var content = parser.stringify(node)
  if (!content) return ''

  if (literal(content)) {
    content = expression(content, function (expr) {
      return mask(expr, 'literal', opt.store)
    })
  }

  implode(node, content)
}

module.exports = element
