var parser = require('./parser.js')
var keys = new Set(['map', 'if', 'elsif', 'else'])

module.exports = function map(node) {
  // Create a shallow clone to avoid mutating the original node.
  var nodeCopy = { ...node }
  nodeCopy.attributes = [...node.attributes] // Also clone attributes array

  var atts = nodeCopy.attributes || []
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

  // If there's no 'map' attribute, this handler shouldn't do anything.
  // The original stringify will happen in dispatch.
  if (!attr) return

  var [vars, list] = attr.value.split('of').map((x) => x.trim())
  var [item, index] = vars.split(',').map((x) => x.trim())

  var iterators = index ? `${item}, ${index}` : item

  // --- All mutations now happen on the copy ---
  nodeCopy.attributes = otherAtts

  var content = parser.stringify(nodeCopy)

  var inner = ifAttr
    ? [
        `    if (${ifAttr.value}) {`,
        `      return \`${content}\``,
        '    }',
        "    return ''"
      ]
    : [`    return \`${content}\``]

  // The handler's only job is to return the final JS string.
  // Let the dispatcher handle putting it into the tree.
  var resultCode = [
    '${(function (' + list + ') {',
    `  return ${list}.map(function(${iterators}) {`,
    ...inner,
    `  }).join('')`,
    '})(' + list + ')}'
  ].join('\n')

  return resultCode
}
