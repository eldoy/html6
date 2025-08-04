var parser = require('./parser.js')

function prepare(components = []) {
  var componentData = {}

  for (var component of components) {
    var tree = parser.parse(component.trim())

    for (var node of tree) {
      if (node?.tagName != 'template') continue

      var atts = node.attributes || []

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
      var html = parser.stringify(node.children || [])

      componentData[name] = { name, html, tree: parser.parse(html) }
    }
  }

  return componentData
}

module.exports = prepare
