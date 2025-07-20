var build = require('./build.js')
var dispatch = require('./dispatch.js')

var util = require('node:util')

function transpile(tree, opt = {}, flags = {}) {
  build(tree, dispatch, opt)

  // Uncomment to inspect
  // console.log(util.inspect(tree, { depth: null, colors: true, circular: true }))

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].content
  }

  // Uncomment to inspect
  // console.log({ code })

  var args = flags.slot ? ['props', 'slots', '_'] : ['props', '_']

  var body = `with (props) { return \`${code}\` }`

  return new Function(...args, body)
}

module.exports = transpile
