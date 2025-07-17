var parser = require('./parser.js')
var expand = require('./expand.js')
var map = require('./map.js')
var flow = require('./flow.js')
var slot = require('./slot.js')
var literal = require('./literal.js')

var m = /\$\{([^}]+)\}/g

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
    node.compiled = expand(node, template)
    return
  }

  if (!atts || !atts.length || node.type != 'element') {
    if (node.content) {
      node.content = node.content.replace(m, (_, x) => '${' + literal(x) + '}')
    }
    node.compiled = parser.stringify(node)
    return
  }

  var tagKeys = new Set()
  for (var attr of atts) {
    if (handlers[attr.key]) {
      tagKeys.add(attr.key)
    }
  }

  if (tagKeys.size == 0) {
    node.compiled = parser.stringify(node)
    return
  }

  for (var key of PRESEDENCE) {
    if (tagKeys.has(key)) {
      var handler = handlers[key]
      node.compiled = handler(node)
      return
    }
  }
}

module.exports = dispatch
