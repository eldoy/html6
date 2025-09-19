var expression = require('./expression.js')
var implode = require('./implode.js')
var literal = require('./literal.js')
var parser = require('./parser.js')
var escape = require('./escape.js')
var mask = require('./mask.js')

var keys = { if: 1, elsif: 1, else: 1 }

function conditional(node, opt) {
  var out = '(function () {\n'
  var current = node

  while (current) {
    var atts = current.attributes || []
    var attr = null
    var otherAtts = null

    for (var i = 0; i < atts.length; i++) {
      var a = atts[i]
      if (keys[a.key]) {
        attr = a
      } else {
        if (!otherAtts) otherAtts = []
        otherAtts.push(a)
      }
    }

    if (!attr) break

    var clone = {
      type: current.type,
      tagName: current.tagName,
      attributes: otherAtts || [],
      children: current.children || [],
    }

    var body = parser.stringify(clone)

    if (literal(body)) {
      body = expression(body, function (expr) {
        return mask('${' + expr + '}', 'literal', opt.store)
      })
    }

    body = escape(body)

    if (attr.key === 'if') {
      out += '  if (' + attr.value + ') {\n'
      out += '    return `' + body + '`\n'
      out += '  }\n'
    } else if (attr.key === 'elsif') {
      out += '  else if (' + attr.value + ') {\n'
      out += '    return `' + body + '`\n'
      out += '  }\n'
    } else {
      out += '  else {\n'
      out += '    return `' + body + '`\n'
      out += '  }\n'
    }

    current = current.nextElement

    if (
      current &&
      current.attributes &&
      current.attributes.some((x) => x.key === 'if')
    ) {
      break
    }
  }

  out += "  return ''\n"
  out += '})()'

  out = '${' + out + '}'

  if (out.length) {
    out = mask(out, 'if', opt.store)
  }

  implode(node, out)
}

module.exports = conditional
