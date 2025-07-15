var parser = require('./parser.js')
var tag = require('./tag.js')
var map = require('./map.js')
var flow = require('./flow.js')
var slot = require('./slot.js')

var PRECEDENCE = ['map', 'if', 'elsif', 'else']

var handlers = {
  map,
  if: flow,
  elsif: () => '',
  else: () => ''
}

function dispatch(node, opt = {}) {
  if (node.tagName == 'slot') {
    node.compiled = slot(node)
    return
  }

  var template = opt.templates && opt.templates[node.tagName]
  if (template) {
    node.compiled = tag(node, template)
    return
  }

  if (node.type !== 'element' || !node.attributes || !node.attributes.length) {
    node.compiled = parser.stringify(node)
    return
  }

  for (var key of PRECEDENCE) {
    if (node.attributes.some((attr) => attr.key == key)) {
      node.compiled = handlers[key](node)
      return
    }
  }

  node.compiled = parser.stringify(node)
}

module.exports = dispatch
