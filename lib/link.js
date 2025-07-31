function link(list) {
  var next = null
  var prev = null
  for (var i = list.length - 1; i >= 0; i--) {
    var node = list[i]
    if (node.type === 'element') {
      node.nextElement = next
      next = node
    }
  }
  for (var i = 0; i < list.length; i++) {
    var node = list[i]
    if (node.type === 'element') {
      node.previousElement = prev
      prev = node
    }
  }
}

module.exports = link
