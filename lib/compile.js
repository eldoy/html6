var pretty = require('pretty')
var parser = require('./parser.js')
var build = require('./build.js')
var dispatch = require('./dispatch.js')
var prepare = require('./prepare.js')

function compile(source = '', opt = {}) {
  opt.templates = prepare(opt.templates)

  for (var name in opt.templates) {
    var template = opt.templates[name]
    var tree = template.tree

    build(tree, dispatch, opt)

    var code = ''
    for (var i = 0; i < tree.length; i++) {
      code += tree[i].compiled
    }

    template.fn = new Function(
      'props',
      'slots',
      `with (props) { return \`${code}\` }`
    )
  }

  var tree = parser.parse(source)

  build(tree, dispatch, opt)

  var code = ''
  for (var i = 0; i < tree.length; i++) {
    code += tree[i].compiled
  }

  var fn = new Function('props', 'slots', `with (props) { return \`${code}\` }`)

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
