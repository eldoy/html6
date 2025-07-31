var expression = require('./expression.js')
var implode = require('./implode.js')
var literal = require('./literal.js')
var escape = require('./escape.js')
var mask = require('./mask.js')

function text(node, opt) {
  var content = node.content
  if (!content) return

  if (literal(content)) {
    content = expression(content, function (expr) {
      return mask('${' + expr + '}', 'literal', opt.store)
    })
  }

  content = escape(content)

  content = mask(content, 'text', opt.store)
  implode(node, content)
}

module.exports = text
