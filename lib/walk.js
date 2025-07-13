function walk(tree, visit) {
  var stack = tree.map(function (node, index) {
    return { node, ready: false, parentNode: null, siblings: tree, index }
  })

  while (stack.length) {
    var top = stack[stack.length - 1]
    var node = top.node

    if (top.ready) {
      stack.pop()
      node.parentNode = top.parentNode
      node.siblings = top.siblings
      node.index = top.index

      if (typeof visit == 'function') {
        visit(node)
      }
    } else {
      var siblings = node.children || []
      for (var i = siblings.length - 1; i >= 0; i--) {
        var child = siblings[i]
        if (child && child.type == 'element') {
          for (var j = i + 1; j < siblings.length; j++) {
            var sibling = siblings[j]
            if (sibling && sibling.type == 'element') {
              child.nextElement = sibling
              break
            }
          }
        }
        stack.push({
          node: child,
          ready: false,
          parentNode: node,
          siblings,
          index: i
        })
      }
      top.ready = true
    }
  }
}

module.exports = walk
