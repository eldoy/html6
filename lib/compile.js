var parser = require('himalaya')
var pretty = require('pretty')

var walk = require('./walk.js')
var visit = require('./visit.js')

function compile(source = '', opt = {}) {
  var tree = parser.parse(source)

  // Uncomment for testing
  // console.log(JSON.stringify(tree, null, 2))

  walk(tree, visit, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].compiled
  }

  // Uncomment for testing
  // console.log(code)

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
