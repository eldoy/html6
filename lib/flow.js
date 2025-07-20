var parser = require('./parser.js')
var keys = new Set(['if', 'elsif', 'else'])

module.exports = function flow(node) {
  var c = '${(function () {\n'

  var current = node

  while (current) {
    var nodeCopy = Object.assign({}, current)

    var atts = nodeCopy.attributes || []
    var attr
    var otherAtts = []

    for (var i = 0; i < atts.length; i++) {
      var a = atts[i]
      if (keys.has(a.key)) {
        attr = a
      } else {
        otherAtts.push(a)
      }
    }

    if (!attr) break

    nodeCopy.attributes = otherAtts

    var content = parser.stringify(nodeCopy)

    if (attr.key == 'if') {
      c += `  if (${attr.value}) {\n`
      c += `    return \`${content}\`\n`
      c += '  }\n'
    } else if (attr.key == 'elsif') {
      c += `  else if (${attr.value}) {\n`
      c += `    return \`${content}\`\n`
      c += '  }\n'
    } else {
      c += '  else {\n'
      c += `    return \`${content}\`\n`
      c += '  }\n'
    }

    current = current.nextElement
  }

  c += '  ' + "return ''\n"
  c += '})()}'

  return c
}
