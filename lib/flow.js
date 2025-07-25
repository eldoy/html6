var parser = require('./parser.js')
var escape = require('./escape.js')

var keys = { if: 1, elsif: 1, else: 1 }

module.exports = function flow(node) {
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
      children: current.children || []
    }

    var body = escape(parser.stringify(clone))

    if (attr.key == 'if') {
      out += '  if (' + attr.value + ') {\n'
      out += '    return `' + body + '`\n'
      out += '  }\n'
    } else if (attr.key == 'elsif') {
      out += '  else if (' + attr.value + ') {\n'
      out += '    return `' + body + '`\n'
      out += '  }\n'
    } else {
      out += '  else {\n'
      out += '    return `' + body + '`\n'
      out += '  }\n'
    }

    current = current.nextElement
  }

  out += "  return ''\n"
  out += '})()'

  return out
}
