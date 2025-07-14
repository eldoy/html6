var parser = require('./parser.js')
var keys = new Set(['if', 'elsif', 'else'])

module.exports = function flow(node) {
  var c = '${(function () {\n'

  while (node) {
    var atts = node.attributes || []
    var attr = atts.find((a) => keys.has(a.key))

    if (!attr) break

    node.attributes = atts.filter((a) => !keys.has(a.key))

    var content = parser.stringify(node)

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

    node = node.nextElement
  }

  c += '  ' + "return ''\n"
  c += '})()}'

  return c
}
