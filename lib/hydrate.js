function hydrate(template, store, callback) {
  var result = ''
  var i = 0
  var len = template.length

  while (i < len) {
    var start = template.indexOf('__::MASK_', i)
    if (start === -1) {
      result += template.slice(i)
      break
    }

    result += template.slice(i, start)
    var mid = template.indexOf('_', start + 9)
    var end = template.indexOf('_::__', mid + 1)
    if (mid === -1 || end === -1) {
      result += template.slice(start)
      break
    }

    var type = template.slice(start + 9, mid)
    var key = template.slice(start, end + 5)
    var value = store.get(key)
    result += callback(value, type)

    i = end + 5
  }

  return result
}

module.exports = hydrate
