var tag = require('./tag.js')

module.exports = function flow(node) {
  var s = ''
  s += '${(function () {\n'

  while (node) {
    var atts = node.attributes || []
    var attr = atts.find(function (a) {
      return a.key == 'if' || a.key == 'elsif' || a.key == 'else'
    })
    if (!attr) break

    node.attributes = atts.filter(function (a) {
      return a.key != attr.key
    })

    var content = tag(node)

    if (attr.key == 'if') {
      s += `  if (${attr.value}) {\n`
      s += `    return \`${content}\`\n`
      s += '  }\n'
    } else if (attr.key == 'elsif') {
      s += `  else if (${attr.value}) {\n`
      s += `    return \`${content}\`\n`
      s += '  }\n'
    } else {
      s += '  else {\n'
      s += `    return \`${content}\`\n`
      s += '  }\n'
    }

    node = node.nextElement
  }

  s += '  ' + "return ''\n"
  s += '})()}'

  return s
}
