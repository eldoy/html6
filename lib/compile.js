var parser = require('himalaya')
var pretty = require('pretty')

var walk = require('./walk.js')
var visit = require('./visit.js')

function compile(source = '', opt = {}) {
  var tree = parser.parse(source)

  // Uncomment for testing
  // console.log(JSON.stringify(tree, null, 2))

  walk(tree, visit)

  var result = tree.map((n) => n.compiled || '').join('')
  var code = '`' + result + '`'

  // Uncomment for testing
  // console.log(code)

  var render = new Function('props', `with (props) { return ${code} }`)

  if (opt.pretty) {
    return function (props) {
      var result = render(props)
      return pretty(result)
    }
  }

  return render
}

module.exports = compile
