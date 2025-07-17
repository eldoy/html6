var build = require('./build.js')
var dispatch = require('./dispatch.js')

function transpile(tree, opt = {}, flags = {}) {
  build(tree, dispatch, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].compiled
  }

  var args = flags.slot ? ['props', 'slots', '_'] : ['props', '_']

  return new Function(...args, `with (props) { return \`${code}\` }`)
}

module.exports = transpile
