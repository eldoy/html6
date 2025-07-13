var tag = require('./tag.js')

module.exports = function map(node) {
  var atts = node.attributes || []
  var attr = atts.find(function (a) {
    return a.key == 'map'
  })
  if (!attr) return

  var [vars, list] = attr.value.split('of').map((x) => x.trim())
  var [item, index] = vars.split(',').map((x) => x.trim())

  var params = index ? `${item}, ${index}` : item

  node.attributes = atts.filter(function (a) {
    return a.key != 'map' && a.key != 'if'
  })

  var content = tag(node)

  var ifattr = atts.find(function (a) {
    return a.key == 'if'
  })

  var inner = ifattr
    ? [
        `    if (${ifattr.value}) {`,
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
