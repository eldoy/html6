var pretty = require('pretty')
var parser = require('./parser.js')
var prepare = require('./prepare.js')
var transpile = require('./transpile.js')

function compile(source = '', opt = {}) {
  opt.templates = prepare(opt.templates)

  for (var name in opt.templates) {
    var template = opt.templates[name]
    template.fn = transpile(template.tree, opt)
  }

  var tree = parser.parse(source)
  var fn = transpile(tree, opt)

  function render(props = {}) {
    var result = fn(props)
    if (opt.pretty) {
      result = pretty(result)
    }
    return result
  }

  return { render }
}

module.exports = compile
