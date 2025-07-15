var parser = require('./parser.js')
var attrib = require('./attrib.js')

function tag(node, template) {
  var atts = node.attributes || []

  var props = attrib(atts)
  var slot = JSON.stringify(parser.stringify(node.children))

  var body = template.fn.toString()

  return '${(' + body + ')({' + props + "}, '" + slot + "')}"
}

module.exports = tag
