var pretty = require('pretty')
var parser = require('./parser.js')
var build = require('./build.js')
var dispatch = require('./dispatch.js')

function compile(source = '', opt = {}) {
  var tree = parser.parse(source)

  build(tree, dispatch, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].compiled
  }

  var fn = new Function('props', `with (props) { return \`${code}\` }`)

  function render(props = {}) {
    var result = fn(props)
    if (opt.pretty) {
      result = pretty(result)
    }
    return result
  }

  return { render, code }
}

module.exports = compile
