var build = require('./build.js')
var dispatch = require('./dispatch.js')
var escape = require('./escape.js')
var hydrate = require('./hydrate.js')

function transpile(tree, opt = {}, flags = {}) {
  opt.store = new Map()

  build(tree, dispatch, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].content
  }

  code = escape(code)

  // function unmask(v, type) {
  //   return type === 'literal' ? '${' + escape(v) + '}' : '${' + v + '}'
  // }

  // for (var [key, value] of opt.store) {
  //   while (/__::MASK_[a-z]+_\d+_::__/.test(value)) {
  //     value = hydrate(value, opt.store, unmask)
  //   }
  //   opt.store.set(key, value)
  // }

  // code = hydrate(code, opt.store, unmask)

  var args = flags.slot ? ['props', 'slots', '_'] : ['props', '_']
  var body = `with (props) { return \`${code}\` }`

  return new Function(...args, body)
}

module.exports = transpile
