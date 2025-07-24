var link = require('./link.js')

function build(tree, dispatch = () => {}, opt = {}) {
  link(tree)

  var stack = new Array(tree.length)
  var sp = 0
  for (var i = tree.length - 1; i >= 0; i--) {
    stack[sp++] = { node: tree[i] }
  }

  while (sp) {
    var top = stack[sp - 1]
    var node = top.node

    if (top.ready) {
      sp--
      dispatch(node, opt)
    } else {
      var children = node.children || []
      link(children)
      var len = children.length
      if (sp + len > stack.length) stack.length = sp + len
      for (var i = len - 1; i >= 0; i--) {
        stack[sp++] = { node: children[i] }
      }
      top.ready = true
    }
  }
}

module.exports = build
