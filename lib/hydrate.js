function hydrate(template, store, callback) {
  return template.replace(/__::MASK_([a-z]+)_(\d+)_::__/g, (_, type, id) => {
    var key = `__::MASK_${type}_${id}_::__`
    var value = store.get(key)
    return callback(value, type)
  })
}

module.exports = hydrate
