var parser = require('./parser.js')
var remove = new Set(['map', 'if', 'elsif', 'else'])

module.exports = function map(node) {
  var atts = node.attributes || []
  var attr = atts.find((a) => a.key == 'map')

  if (!attr) return

  var [vars, list] = attr.value.split('of').map((x) => x.trim())
  var [item, index] = vars.split(',').map((x) => x.trim())

  var iterators = index ? `${item}, ${index}` : item

  node.attributes = atts.filter((a) => !remove.has(a.key))

  var content = parser.stringify(node)

  var ifAttr = atts.find((a) => a.key == 'if')

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
