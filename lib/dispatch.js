var conditional = require('./conditional.js')
var expand = require('./expand.js')
var escape = require('./escape.js')
var expression = require('./expression.js')
var literal = require('./literal.js')
var map = require('./map.js')
var parser = require('./parser.js')
var slot = require('./slot.js')
var implode = require('./implode.js')
var mask = require('./mask.js')
var text = require('./text.js')

function dispatch(node, opt = {}) {
  var atts = node.attributes

  if (node.tagName == 'slot') {
    return slot(node, opt)
  }

  var component = opt.components && opt.components[node.tagName]
  if (component) {
    return expand(node, opt)
  }

  if (node.type == 'comment') {
    return comment(node, opt)
  }

  if (node.type == 'text') {
    return text(node, opt)
  }

  if (!atts || !atts.length || node.type != 'element') {
    var content = parser.stringify(node)
    return implode(node, content)
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
      return implode(node, key)
    }
    return implode(node, content)
  }

  if (hasIf) {
    var content = conditional(node)
    if (content.length) {
      var key = mask(content, 'if', opt.store)
      return implode(node, key)
    }
    return implode(node, content)
  }

  if (hasElsif) {
    return implode(node, '')
  }

  if (hasElse) {
    return implode(node, '')
  }

  var content = parser.stringify(node)
  return implode(node, content)
}

module.exports = dispatch
