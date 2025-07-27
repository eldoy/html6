var hydrate = require('./hydrate.js')

function wrap(v, type) {
  return '${' + v + '}'
}

function unmask(code, store) {
  var entries = Array.from(store.entries())
  for (var i = 0; i < entries.length; i++) {
    var key = entries[i][0]
    var value = entries[i][1]

    if (value.indexOf('__::MASK_') !== -1) {
      do {
        value = hydrate(value, store, wrap)
      } while (value.indexOf('__::MASK_') !== -1)

      store.set(key, value)
    }
  }
  code = hydrate(code, store, wrap)
  return code
}

module.exports = unmask
