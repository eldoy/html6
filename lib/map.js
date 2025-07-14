var parser = require('./parser.js')

module.exports = function map(node) {
  var atts = node.attributes || []
  var attr = atts.find(function (a) {
    return a.key == 'map'
  })
  if (!attr) return

  var [vars, list] = attr.value.split('of').map((x) => x.trim())
  var [item, index] = vars.split(',').map((x) => x.trim())

  var iteration = index ? `${item}, ${index}` : item

  node.attributes = atts.filter(function (a) {
    return a.key != 'map' && a.key != 'if'
  })

  var content = parser.stringify(node)

  var ifAttr = atts.find(function (a) {
    return a.key == 'if'
  })

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
    `  return ${list}.map(function(${iteration}) {`,
    ...inner,
    `  }).join('')`,
    '})()}'
  ].join('\n')
}
