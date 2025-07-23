var build = require('./build.js')
var dispatch = require('./dispatch.js')
var escape = require('./escape.js')
var extract = require('./extract.js')
var rebuild = require('./rebuild.js')

function transpile(tree, opt = {}, flags = {}) {
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

  var extracted = extract(code)
  var escaped = escape(extracted.replaced)
  var executable = rebuild(escaped, extracted.expressions)

  // Uncomment to inspect
  // console.log({ executable })

  var args = flags.slot ? ['props', 'slots', '_'] : ['props', '_']

  var body = `with (props) { return \`${executable}\` }`

  var fn = new Function(...args, body)

  // Uncomment to inspect
  // console.log(fn.toString())

  return fn
}

module.exports = transpile
