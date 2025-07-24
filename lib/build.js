var link = require('./link.js')

function build(tree, dispatch = () => {}, opt = {}) {
  link(tree)

  var stack = []
  for (var i = tree.length - 1; i >= 0; i--) {
    stack.push({ node: tree[i] })
  }

  while (stack.length) {
    var top = stack[stack.length - 1]
    var node = top.node

    if (top.ready) {
      stack.pop()
      dispatch(node, opt)
    } else {
      var children = node.children || []
      link(children)
      for (var i = children.length - 1; i >= 0; i--) {
        stack.push({ node: children[i] })
      }
      top.ready = true
    }
  }
}

module.exports = build
