function link(list) {
  var next = null
  for (var i = list.length - 1; i >= 0; i--) {
    if (list[i].type === 'element') {
      list[i].nextElement = next
      next = list[i]
    }
  }
}

module.exports = link
