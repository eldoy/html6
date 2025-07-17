var parser = require('./parser.js')
var expand = require('./expand.js')
var map = require('./map.js')
var flow = require('./flow.js')
var slot = require('./slot.js')
var literal = require('./literal.js')
var text = require('./text.js')

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
    return text(node, slot(node))
  }

  var template = opt.templates && opt.templates[node.tagName]
  if (template) {
    return text(node, expand(node, template))
  }

  if (!atts || !atts.length || node.type != 'element') {
    if (node.content) {
      node.content = node.content.replace(m, (_, x) => '${' + literal(x) + '}')
    }
    return text(node, parser.stringify(node))
  }

  var tagKeys = new Set()
  for (var attr of atts) {
    if (handlers[attr.key]) {
      tagKeys.add(attr.key)
    }
  }

  if (tagKeys.size == 0) {
    return text(node, parser.stringify(node))
  }

  for (var key of PRESEDENCE) {
    if (tagKeys.has(key)) {
      var handler = handlers[key]
      return text(node, handler(node))
    }
  }
}

module.exports = dispatch
