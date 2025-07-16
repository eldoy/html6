var pretty = require('pretty')
var parser = require('./parser.js')
var prepare = require('./prepare.js')
var transpile = require('./transpile.js')
var toposort = require('./toposort.js')

function compile(source = '', opt = {}) {
  var templateMap = prepare(opt.templates)
  opt.templates = templateMap

  // TODO: Cleanup
  var sortedTemplates = toposort(templateMap)

  for (var template of sortedTemplates) {
    if (!opt.compiledFns) {
      opt.compiledFns = {}
    }
    var fn = transpile(template.tree, opt)
    opt.compiledFns[template.name] = fn
    templateMap[template.name].fn = fn
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
