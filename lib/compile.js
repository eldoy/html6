var pretty = require('pretty')
var parser = require('./parser.js')
var prepare = require('./prepare.js')
var transpile = require('./transpile.js')
var toposort = require('./toposort.js')

function compile(source = '', opt = {}) {
  opt.templates = prepare(opt.templates)

  var sort = toposort(opt.templates)

  for (var template of sort) {
    opt.templates[template.name].fn = transpile(template.tree, opt)
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
