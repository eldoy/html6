var parser = require('./parser.js')
var keys = new Set(['map', 'if', 'elsif', 'else'])

module.exports = function map(node) {
  var atts = node.attributes || []
  var attr
  var ifAttr
  var otherAtts = []

  for (var i = 0; i < atts.length; i++) {
    var a = atts[i]
    if (a.key == 'map') {
      attr = a
    } else if (a.key == 'if') {
      ifAttr = a
    } else if (!keys.has(a.key)) {
      otherAtts.push(a)
    }
  }

  if (!attr) return

  var [vars, list] = attr.value.split('of').map((x) => x.trim())
  var [item, index] = vars.split(',').map((x) => x.trim())

  var iterators = index ? `${item}, ${index}` : item

  node.attributes = otherAtts

  var content = parser.stringify(node)

  var inner = ifAttr
    ? [
        `    if (${ifAttr.value}) {`,
        `      return \`${content}\``,
        '    }',
        "    return ''"
      ]
    : [`    return \`${content}\``]

  return [
    '${(function () {',
    `  return ${list}.map(function(${iterators}) {`,
    ...inner,
    `  }).join('')`,
    '})()}'
  ].join('\n')
}
