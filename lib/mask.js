function mask(content, type, store, prefix = 'MASK') {
  var id = store.size
  var key = `__::${prefix}_${type}_${id}_::__`
  store.set(key, content)
  return key
}

module.exports = mask
