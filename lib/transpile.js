var build = require('./build.js')
var dispatch = require('./dispatch.js')

function transpile(tree, opt = {}, flags = {}) {
  build(tree, dispatch, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].content
  }

  var args = flags.slot ? ['props', 'slots', '_'] : ['props', '_']

  var body = `with (props) { return \`${code}\` }`

  return new Function(...args, body)
}

module.exports = transpile
