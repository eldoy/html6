var parser = require('./parser.js')
var expression = require('./expression.js')
var escape = require('./escape.js')
var mask = require('./mask.js')
var implode = require('./implode.js')

function expand(node, opt) {
  var component = opt.components[node.tagName]

  var atts = node.attributes || []
  var children = node.children || []
  var fn = component.fn ? component.fn.toString() : ''

  var props = '{}'
  if (atts.length > 0) {
    var propsContent = ''
    for (var i = 0; i < atts.length; i++) {
      var a = atts[i]
      var val = a.value

      var nowrap = val[0] == '{' && val[val.length - 1] == '}'
      if (nowrap) {
        val = expression(val, (expr) => expr) || "''"
      } else {
        val = escape(val)
        val = expression(val, (expr) => '${' + expr + '}')
        val = '`' + val + '`'
      }

      propsContent += (i > 0 ? ', ' : '') + a.key + ': ' + val
    }
    props = '{' + propsContent + '}'
  }

  var slots = '{}'
  if (children.length > 0) {
    var slotContent = parser.stringify(children)

    var nowrap =
      slotContent[0] == '{' && slotContent[slotContent.length - 1] == '}'
    if (nowrap) {
      slotContent = expression(slotContent, (expr) => expr) || "''"
    } else {
      slotContent = escape(slotContent)
      slotContent = expression(slotContent, (expr) => '${' + expr + '}')
      slotContent = '`' + slotContent + '`'
    }

    slots = `{default: ${slotContent}}`
  }

  var content = '(' + fn + ')(' + props + ', ' + slots + ', _)'

  var key = mask(content, 'expand', opt.store)
  implode(node, key)
}

module.exports = expand
