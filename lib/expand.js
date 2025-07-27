var parser = require('./parser.js')
var expression = require('./expression.js')

function expand(node, component) {
  var atts = node.attributes || []
  var children = node.children || []
  var fn = component.fn ? component.fn.toString() : ''

  var props = '{}'
  if (atts.length > 0) {
    var propsString = ''
    for (var i = 0; i < atts.length; i++) {
      var a = atts[i]
      var val = a.value

      var direct = val[0] == '{' && val[val.length - 1] == '}'
      val = expression(val, (expr) => '${' + expr + '}')
      val = '`' + val + '`'

      if (direct) val = val.slice(3, -2)

      propsString += (i > 0 ? ', ' : '') + a.key + ': ' + val
    }
    props = '{' + propsString + '}'
  }

  var slots = '{}'
  if (children.length > 0) {
    var slotContent = parser.stringify(children)
    slots = '{default: `' + slotContent + '`}'
  }

  return '(' + fn + ')(' + props + ', ' + slots + ', _)'
}

module.exports = expand
