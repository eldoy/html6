var conditional = require('./conditional.js')
var element = require('./element.js')
var comment = require('./comment.js')
var expand = require('./expand.js')
var attrib = require('./attrib.js')
var empty = require('./empty.js')
var chain = require('./chain.js')
var slot = require('./slot.js')
var text = require('./text.js')
var map = require('./map.js')

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

  if (atts && atts.length) {
    var hasMap = atts.some((x) => x.key == 'map')
    if (hasMap) {
      return map(node, opt)
    }

    var hasConditional = atts.some(
      (x) => x.key == 'if' || x.key == 'elsif' || x.key == 'else'
    )

    if (hasConditional) {
      if (chain.skip(node)) return

      var first = chain.start(node)

      conditional(first, opt)

      var hasIf = atts.some((x) => x.key == 'if')
      if (!hasIf) {
        return empty(node, opt)
      }

      return
    }

    attrib(atts, opt)
  }

  return element(node, opt)
}

module.exports = dispatch
