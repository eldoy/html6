var parser = require('./parser.js')

var keys = { if: 1, elsif: 1, else: 1 }

function generate(node, ifChain, mode) {
  var out = '(function () {\n'
  var current = node

  // while (current) {
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

  // if (!attr) break

  var clone = {
    type: current.type,
    tagName: current.tagName,
    attributes: otherAtts || [],
    children: current.children || []
  }

  var body = parser.stringify(clone)

  if (mode === 'if') {
    out += '  if (' + attr.value + ') {\n'
    out += '    return `' + body + '`\n'
    out += '  }\n'
  }

  if (mode === 'elsif') {
    var elsifValue = ifChain.slice(0, -1).join(' && ')
    out += '  if (' + elsifValue + ') {\n'
    out += '    if (' + attr.value + ') {\n'
    out += '      return `' + body + '`\n'
    out += '    }\n'
    out += '  }\n'
  }

  if (mode === 'else') {
    var elseValue = ifChain.join(' && ')
    out += '  if (' + elseValue + ') {\n'
    out += '    return `' + body + '`\n'
    out += '  }\n'
  }

  // console.log('out', out)
  // current = current.nextElement
  // }

  out += "  return ''\n"
  out += '})()'

  return out
}

module.exports = {
  ifBlock: function (node) {
    return generate(node, null, 'if')
  },
  elsifBlock: function (node, ifChain) {
    return generate(node, ifChain, 'elsif')
  },
  elseBlock: function (node, ifChain) {
    return generate(node, ifChain, 'else')
  }
}
