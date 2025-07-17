var pretty = require('pretty')
var parser = require('./parser.js')
var prepare = require('./prepare.js')
var transpile = require('./transpile.js')
var toposort = require('./toposort.js')

function compile(source = '', opt = {}) {
  if (opt.templates) {
    opt.templates = prepare(opt.templates)

    var sort = toposort(opt.templates)

    for (var template of sort) {
      var fn = transpile(template.tree, opt, { slot: true })
      opt.templates[template.name].fn = fn
    }
  } else {
    opt.templates = {}
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
