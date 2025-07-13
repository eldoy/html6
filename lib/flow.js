var tag = require('./tag.js')

module.exports = function flow(node) {
  var atts = node.attributes || []
  var attr = atts.find(function (a) {
    return a.key == 'if'
  })
  if (!attr) return

  var out = ''
  out += '${(function () {\n'

  var current = node

  while (current) {
    atts = current.attributes || []
    attr = atts.find(function (a) {
      return a.key == 'if' || a.key == 'elsif' || a.key == 'else'
    })

    if (!attr) break
    current.skip = true

    var content = tag(current)

    if (attr.key == 'if') {
      out += `  if (${attr.value}) {\n`
      out += `    return \`${content}\`\n`
      out += '  }\n'
    } else if (attr.key == 'elsif') {
      out += `  else if (${attr.value}) {\n`
      out += `    return \`${content}\`\n`
      out += '  }\n'
    } else {
      out += '  else {\n'
      out += `    return \`${content}\`\n`
      out += '  }\n'
    }

    current = current.nextElement
  }

  out += '  ' + "return ''\n"
  out += '})()}'

  return out
}
