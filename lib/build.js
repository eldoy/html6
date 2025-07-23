function build(tree, dispatch = () => {}, opt = {}) {
  // Assign nextElement for top-level siblings in document order
  let next = null
  for (let i = tree.length - 1; i >= 0; i--) {
    const node = tree[i]
    if (node.type === 'element') {
      node.nextElement = next
      next = node
    }
  }

  const stack = []
  for (let i = tree.length - 1; i >= 0; i--) {
    stack.push({ node: tree[i] })
  }

  while (stack.length) {
    const top = stack[stack.length - 1]
    const node = top.node

    if (top.ready) {
      stack.pop()
      dispatch(node, opt)
    } else {
      const children = node.children || []
      let next = null
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        if (child.type === 'element') {
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
