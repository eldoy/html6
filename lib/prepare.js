var parser = require('./parser.js')

function prepare(components = []) {
  var componentData = {}

  for (var component of components) {
    var tree = parser.parse(component.trim())
    var root = tree[0]

    if (root?.tagName != 'template') continue

    var atts = root.attributes || []

    var props = []
    var isAttr

    for (var a of atts) {
      if (a.key == 'is') {
        isAttr = a
      } else {
        props.push(a)
      }
    }

    if (!isAttr || !isAttr.value) continue

    var name = isAttr.value
    var html = parser.stringify(root.children || [])

    componentData[name] = { name, html, tree: parser.parse(html) }
  }

  return componentData
}

module.exports = prepare
