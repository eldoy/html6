function build(tree, dispatch = () => {}, opt = {}) {
  var stack = new Array(tree.length)
  for (var i = 0; i < tree.length; i++) {
    stack[i] = { node: tree[i], siblings: tree }
  }

  while (stack.length) {
    var top = stack[stack.length - 1]
    var node = top.node

    if (top.ready) {
      stack.pop()
      node.parentNode = top.parentNode
      node.siblings = top.siblings

      dispatch(node, opt)
    } else {
      var siblings = node.children || []
      var next = null
      for (var i = siblings.length - 1; i >= 0; i--) {
        var child = siblings[i]
        if (child && child.type == 'element') {
          child.nextElement = next
          next = child
        }
        stack.push({ node: child, ready: false, parentNode: node, siblings })
      }
      top.ready = true
    }
  }
}

module.exports = build
