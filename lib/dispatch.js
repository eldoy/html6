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

function dispatch(node, opt = {}) {
  var atts = node.attributes

  if (node.tagName == 'slot') {
    return slot(node, opt)
  }

  var component = opt.components && opt.components[node.tagName]
  if (component) {
    var content = expand(node, component)
    var key = mask(content, 'expand', opt.store)
    return text(node, key)
  }

  if (node.type == 'comment') {
    if (literal(node.content)) {
      var content = expression(node.content, function (expr) {
        return mask(expr, 'literal', opt.store)
      })
      content = escape(content)
      content = '<!--' + content + '-->'
      text(node, content)
    }
    return
  }

  if (node.type == 'text') {
    if (literal(node.content)) {
      var content = expression(node.content, function (expr) {
        return mask(expr, 'literal', opt.store)
      })
      content = escape(content)
      text(node, content)
    }
    return
  }

  if (!atts || !atts.length || node.type != 'element') {
    var content = parser.stringify(node)
    return text(node, content)
  }

  var hasMap = false
  var hasIf = false
  var hasElsif = false
  var hasElse = false

  for (var i = 0; i < atts.length; i++) {
    var attr = atts[i]
    if (attr.key == 'map') {
      hasMap = true
    } else if (attr.key == 'if') {
      hasIf = true
    } else if (attr.key == 'elsif') {
      hasElsif = true
    } else if (attr.key == 'else') {
      hasElse = true
    } else if (literal(attr.value)) {
      attr.value = expression(attr.value, function (expr) {
        return mask(expr, 'literal', opt.store)
      })
    }
    if (attr.value) {
      attr.value = escape(attr.value)
    }
  }

  if (hasMap) {
    var content = map(node)
    if (content.length) {
      var key = mask(content, 'map', opt.store)
      return text(node, key)
    }
    return text(node, content)
  }

  if (hasIf) {
    var content = conditional(node)
    if (content.length) {
      var key = mask(content, 'if', opt.store)
      return text(node, key)
    }
    return text(node, content)
  }

  if (hasElsif) {
    return text(node, '')
  }

  if (hasElse) {
    return text(node, '')
  }

  var content = parser.stringify(node)
  return text(node, content)
}

module.exports = dispatch
