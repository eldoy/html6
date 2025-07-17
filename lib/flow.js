var parser = require('./parser.js')
var keys = new Set(['if', 'elsif', 'else'])

module.exports = function flow(node) {
  var c = '${(function () {\n'

  var current = node

  while (current) {
    var atts = current.attributes || []
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

    current.attributes = otherAtts

    var content = parser.stringify(current)

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

  node.content = c

  return node.content
}
