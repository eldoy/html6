function hydrate(template, store, callback) {
  var result = ''
  var i = 0

  while (true) {
    var start = template.indexOf('__::MASK_', i)
    if (start === -1) break

    result += template.slice(i, start)

    var mid = template.indexOf('_', start + 9)
    if (mid === -1) break

    var end = template.indexOf('_::__', mid + 1)
    if (end === -1) break

    var type = template.substring(start + 9, mid)
    var key = template.substring(start, end + 5)
    var value = store.get(key)

    result += callback(value, type)
    i = end + 5
  }

  if (i < template.length) result += template.slice(i)
  return result
}

module.exports = hydrate
