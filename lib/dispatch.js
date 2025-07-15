var parser = require('./parser.js')
var tag = require('./tag.js')
var map = require('./map.js')
var flow = require('./flow.js')
var slot = require('./slot.js')

var PRESEDENCE = ['map', 'if', 'elsif', 'else']

var handlers = {
  map,
  if: flow,
  elsif: () => '',
  else: () => ''
}

function dispatch(node, opt = {}) {
  var atts = node.attributes

  if (node.tagName == 'slot') {
    node.compiled = slot(node)
    return
  }

  var template = opt.templates && opt.templates[node.tagName]
  if (template) {
    node.compiled = tag(node, template)
    return
  }

  if (!atts || !atts.length || node.type != 'element') {
    node.compiled = parser.stringify(node)
    return
  }

  var presedenceKeys = new Set()
  for (var attr of atts) {
    if (handlers[attr.key]) {
      presedenceKeys.add(attr.key)
    }
  }

  if (presedenceKeys.size === 0) {
    node.compiled = parser.stringify(node)
    return
  }

  for (var key of PRESEDENCE) {
    if (presedenceKeys.has(key)) {
      var handler = handlers[key]
      node.compiled = handler(node)
      return
    }
  }
}

module.exports = dispatch
