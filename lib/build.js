function build(tree, dispatch = () => {}, opt = {}) {
  var stack = new Array(tree.length)
  for (var i = 0; i < tree.length; i++) {
    stack[i] = { node: tree[i] }
  }

  while (stack.length) {
    var top = stack[stack.length - 1]
    var node = top.node

    if (top.ready) {
      stack.pop()

      dispatch(node, opt)
    } else {
      var children = node.children || []
      var next = null
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i]
        if (child.type == 'element') {
          child.nextElement = next
          next = child
        }
        stack.push({ node: child })
      }
      top.ready = true
    }
  }
}

module.exports = build
