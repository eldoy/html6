var parser = require('./parser.js')
var remove = new Set(['if', 'elsif', 'else'])

module.exports = function flow(node) {
  var c = '${(function () {\n'

  while (node) {
    var atts = node.attributes || []
    var attr = atts.find(function (a) {
      return a.key == 'if' || a.key == 'elsif' || a.key == 'else'
    })
    if (!attr) break

    node.attributes = atts.filter((a) => !remove.has(a.key))

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
