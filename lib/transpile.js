var build = require('./build.js')
var dispatch = require('./dispatch.js')

function transpile(tree, opt = {}) {
  build(tree, dispatch, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].compiled
  }

  return new Function('p', 's', 'i', `with (p) { return \`${code}\` }`)
}

module.exports = transpile
