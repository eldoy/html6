var expand = require('./expand.js')
var expression = require('./expression.js')
var flow = require('./flow.js')
var literal = require('./literal.js')
var map = require('./map.js')
var parser = require('./parser.js')
var slot = require('./slot.js')
var text = require('./text.js')
var mask = require('./mask.js')

var m = /\{([^}]+)\}/g

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
    var content = slot(node)
    var key = mask(content, 'slot', opt.store)
    return text(node, key)
  }

  var component = opt.components && opt.components[node.tagName]
  if (component) {
    var content = expand(node, component)
    var key = mask(content, 'component', opt.store)
    return text(node, key)
  }

  if (node.type == 'text') {
    if (literal(node.content)) {
      var content = expression(node.content)
      var key = mask(content, 'lit', opt.store)
      text(node, key)
    }
    return
  }

  // TODO: if (node.type == 'text' || !atts || !atts.length) {
  // TODO: or this if (!atts || !atts.length) {
  if (!atts || !atts.length || node.type != 'element') {
    var content = parser.stringify(node)
    // TODO: swap with this? return (node.content = content)
    return text(node, content)
  }

  var tagKeys = new Set()
  for (var attr of atts) {
    if (handlers[attr.key]) {
      tagKeys.add(attr.key)
    } else {
      // TODO: mask literal
      if (literal(attr.value)) {
        var value = expression(attr.value)
        var key = mask(value, 'lit', opt.store)
        attr.value = key
      }
    }
  }

  if (tagKeys.size == 0) {
    var content = parser.stringify(node)
    return text(node, content)
  }

  for (var key of PRESEDENCE) {
    if (tagKeys.has(key)) {
      var handler = handlers[key]
      var content = handler(node)
      if (content.length) {
        var key = mask(content, key, opt.store)
        return text(node, key)
      }
      return text(node, content)
    }
  }
}

module.exports = dispatch
