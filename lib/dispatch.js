var expand = require('./expand.js')
var flow = require('./flow.js')
var literal = require('./literal.js')
var map = require('./map.js')
var parser = require('./parser.js')
var slot = require('./slot.js')
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

  var component = opt.components && opt.components[node.tagName]
  if (component) {
    return text(node, expand(node, component))
  }

  if (node.type == 'text') {
    return (node.content = node.content.replace(m, function (_, x) {
      return '${' + literal(x) + '}'
    }))
  }

  if (!atts || !atts.length || node.type != 'element') {
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
