var tag = require('./tag.js')

module.exports = function map(node) {
  var atts = node.attributes || []
  var attr = atts.find(function (a) {
    return a.key == 'map'
  })
  if (!attr) return

  var m = attr.value.match(/^(\w+)(?:\s*,\s*(\w+))?\s+of\s+(.+)$/)
  if (!m) return ''

  var item = m[1]
  var index = m[2]
  var list = m[3]

  var params = index ? `${item}, ${index}` : item
  var content = tag(node)

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
    `  return ${list}.map(function(${params}) {`,
    ...inner,
    `  }).join('')`,
    '})()}'
  ].join('\n')
}
