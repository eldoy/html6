var pretty = require('pretty')
var parser = require('./parser.js')
var prepare = require('./prepare.js')
var transpile = require('./transpile.js')
var toposort = require('./toposort.js')

function compile(source = '', opt = {}) {
  // prepare returns the object map: { "heading": {...}, "card": {...} }
  const templateMap = prepare(opt.templates)
  opt.templates = templateMap // Keep the map in opt for lookups

  // toposort takes the map and returns a sorted ARRAY: [ headingObject, cardObject ]
  const sortedTemplates = toposort(templateMap)

  // Use a `for...of` loop to iterate over the SORTED ARRAY
  for (const template of sortedTemplates) {
    // We already have the object, no need to look it up.
    // The `name` property is on the object itself if needed.
    // e.g., const name = template.name;

    // The transpile function needs access to the map of already compiled functions.
    // We need to build that map as we go.
    if (!opt.compiledFns) {
      opt.compiledFns = {}
    }

    // Pass the map of *already* compiled functions to transpile.
    // This assumes `transpile` knows how to find dependencies in `opt.compiledFns`
    const fn = transpile(template.tree, opt)

    // Store the newly compiled function.
    opt.compiledFns[template.name] = fn

    // It seems you also want to attach it to the original object in the map.
    // This is okay, but the primary lookup should be the separate map.
    templateMap[template.name].fn = fn
  }

  var tree = parser.parse(source)
  // The main transpile call also needs the map of compiled functions.
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
