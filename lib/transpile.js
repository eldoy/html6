var build = require('./build.js')
var dispatch = require('./dispatch.js')
var hydrate = require('./hydrate.js')

function transpile(tree, opt = {}, flags = {}) {
  opt.store = new Map()

  build(tree, dispatch, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].content
  }

  // console.log({ code })

  function unmask(v, type) {
    return '${' + v + '}'
  }

  var store = opt.store
  var entries = Array.from(store.entries())
  for (var i = 0; i < entries.length; i++) {
    var key = entries[i][0]
    var value = entries[i][1]

    if (value.indexOf('__::MASK_') !== -1) {
      do {
        value = hydrate(value, store, unmask)
      } while (value.indexOf('__::MASK_') !== -1)

      store.set(key, value)
    }
  }

  code = hydrate(code, store, unmask)

  // console.log({ code })

  var args = flags.slot ? ['props', 'slots', '_'] : ['props', '_']
  var body = `with (props) { return \`${code}\` }`

  var fn = new Function(...args, body)

  // console.log(fn.toString())

  return fn
}

module.exports = transpile
