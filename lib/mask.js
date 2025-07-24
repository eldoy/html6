function mask(content, type, store) {
  var id = store.size
  var key = `__::MASK_${type}_${id}_::__`
  store.set(key, content)
  return key
}

module.exports = mask
