var parser = require('./parser.js')

function expand(node, template) {
  var atts = node.attributes || []
  var props = atts.map((a) => `${a.key}: ${a.value}`).join(', ')

  var content = parser.stringify(node.children)
  var slot = content ? `{default: ${JSON.stringify(content)}}` : '{}'

  var body = template.fn.toString()

  return '${(' + body + ')({' + props + '}, ' + slot + ', _)}'
}

module.exports = expand
