var parser = require('./parser.js')
var attrib = require('./attrib.js')

function tag(node, opt = {}) {
  var name = node.tagName
  var template = opt.templates[name]

  if (!template || !template.fn) return ''

  var atts = node.attributes || []

  var props = attrib(atts)
  var slot = JSON.stringify(parser.stringify(node.children))

  var body = template.fn.toString()

  return '${(' + body + ')({' + props + "}, '" + slot + "')}"
}

module.exports = tag
