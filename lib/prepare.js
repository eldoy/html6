var parser = require('./parser.js')

function prepare(templates) {
  var data = {}

  for (var source of templates) {
    var tree = parser.parse(source.trim())
    var root = tree[0]

    if (root.tagName != 'template') continue

    var atts = root.attributes || []

    var props = []
    var idAttr

    for (var a of atts) {
      if (a.key == 'id') {
        idAttr = a
      } else {
        props.push(a)
      }
    }

    if (!idAttr || !idAttr.value) continue

    var name = idAttr.value
    var children = root.children || []
    var html = parser.stringify(children)

    data[name] = { name, html, tree: children }
  }

  return data
}

module.exports = prepare
