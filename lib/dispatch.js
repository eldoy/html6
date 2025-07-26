var conditional = require('./conditional.js')
var expand = require('./expand.js')
var escape = require('./escape.js')
var expression = require('./expression.js')
var literal = require('./literal.js')
var map = require('./map.js')
var parser = require('./parser.js')
var slot = require('./slot.js')
var text = require('./text.js')
var mask = require('./mask.js')

var PRESEDENCE = ['map', 'if', 'elsif', 'else']

var handlers = {
  map,
  if: conditional,
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
    var key = mask(content, 'expand', opt.store)
    return text(node, key)
  }

  if (node.type == 'text') {
    if (literal(node.content)) {
      var content = expression(node.content, (expr) =>
        mask(expr, 'literal', opt.store)
      )
      text(node, content)
    }
    if (node.content) {
      node.content = escape(node.content)
    }
    return
  }

  if (!atts || !atts.length || node.type != 'element') {
    var content = parser.stringify(node)
    return text(node, content)
  }

  var tagKeys = new Set()
  for (var attr of atts) {
    if (handlers[attr.key]) {
      tagKeys.add(attr.key)
    } else if (literal(attr.value)) {
      attr.value = expression(attr.value, (expr) =>
        mask(expr, 'literal', opt.store)
      )
    }
    if (attr.value) {
      attr.value = escape(attr.value)
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
