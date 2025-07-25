var parser = require('./parser.js')

var keys = { map: 1, if: 1, elsif: 1, else: 1 }

module.exports = function map(node) {
  var atts = node.attributes || []
  var attr
  var ifAttr
  var otherAtts

  for (var i = 0; i < atts.length; i++) {
    var a = atts[i]
    if (a.key == 'map') {
      attr = a
    } else if (a.key == 'if') {
      ifAttr = a
    } else if (!keys[a.key]) {
      if (!otherAtts) otherAtts = []
      otherAtts.push(a)
    }
  }

  if (!attr) return

  var [vars, list] = attr.value.split('of').map((x) => x.trim())
  var [item, index] = vars.split(',').map((x) => x.trim())

  var iterators = index ? `${item}, ${index}` : item

  var clone = {
    type: node.type,
    tagName: node.tagName,
    attributes: otherAtts || [],
    children: node.children || []
  }

  var content = parser.stringify(clone)

  var inner = ifAttr
    ? [
        `    if (${ifAttr.value}) {`,
        `      return \`${content}\``,
        '    }',
        "    return ''"
      ]
    : [`    return \`${content}\``]

  var code = [
    '(function (' + list + ') {',
    `  return ${list}.map(function(${iterators}) {`,
    ...inner,
    `  }).join('')`,
    '})(' + list + ')'
  ].join('\n')

  return code
}
