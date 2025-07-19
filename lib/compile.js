var pretty = require('pretty')
var parser = require('./parser.js')
var prepare = require('./prepare.js')
var transpile = require('./transpile.js')
var toposort = require('./toposort.js')
var pipes = require('./pipes.js')

function compile(source = '', opt = {}) {
  if (opt.components) {
    opt.components = prepare(opt.components)

    var sort = toposort(opt.components)

    for (var component of sort) {
      var fn = transpile(component.tree, opt, { slot: true })
      opt.components[component.name].fn = fn
    }
  } else {
    opt.components = {}
  }

  opt.pipes = { ...pipes, ...opt.pipes }

  var tree = parser.parse(source)

  var fn = transpile(tree, opt)

  function render(props = {}) {
    var result = fn(props, opt.pipes)
    if (opt.pretty) {
      result = pretty(result)
    }
    return result
  }

  return { render }
}

module.exports = compile
