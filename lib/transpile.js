var build = require('./build.js')
var dispatch = require('./dispatch.js')
var unmask = require('./unmask.js')

function transpile(tree, opt = {}, flags = {}) {
  opt.store = new Map()

  build(tree, dispatch, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].content || ''
  }

  code = unmask(code, opt.store)

  var args = flags.slot ? ['props', 'slots', '_'] : ['props', '_', '__']
  var body = `with (props) { return \`${code}\` }`

  try {
    var fn = new Function(...args, body)
  } catch (e) {
    if (opt.mode === 'development') {
      throw e
    }
    return () => ''
  }

  return fn
}

module.exports = transpile
