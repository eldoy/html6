var build = require('./build.js')
var dispatch = require('./dispatch.js')
var escape = require('./escape.js')
var hydrate = require('./hydrate.js')

function transpile(tree, opt = {}, flags = {}) {
  opt.store = new Map()

  build(tree, dispatch, opt)

  // Uncomment to inspect
  // console.log(
  //   require('node:util').inspect(tree, {
  //     depth: null,
  //     colors: true,
  //     circular: true
  //   })
  // )

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].content
  }

  code = escape(code)

  code = hydrate(code, opt.store, function (value) {
    console.log({ value })
    return '${' + escape(value) + '}'
  })

  // Uncomment to inspect
  // console.log({ executable })

  var args = flags.slot ? ['props', 'slots', '_'] : ['props', '_']

  var body = `with (props) { return \`${code}\` }`

  var fn = new Function(...args, body)

  // Uncomment to inspect
  // console.log(fn.toString())

  return fn
}

module.exports = transpile
