var inline = require('./inline.js')
var internal = require('./internal.js')
var parser = require('./parser.js')
var pipes = require('./pipes.js')
var prepare = require('./prepare.js')
var transpile = require('./transpile.js')
var toposort = require('./toposort.js')

function compile(page = '', opt = {}) {
  var [source, comps] = inline(page)

  comps = (opt.components || []).concat(comps)
  if (comps.length) {
    opt.components = prepare(comps)
    var sorted = toposort(opt.components)
    for (var c of sorted) {
      var fn = transpile(c.tree, opt, { slot: true })
      opt.components[c.name].fn = fn
    }
  } else {
    opt.components = {}
  }

  opt.pipes = opt.pipes ? Object.assign({}, pipes, opt.pipes) : pipes

  var tree = parser.parse(source)

  var fn = transpile(tree, opt)

  function render(props = {}) {
    var result = fn(props, opt.pipes, internal)
    return opt.formatter ? opt.formatter(result) : result
  }

  return { render }
}

module.exports = compile
