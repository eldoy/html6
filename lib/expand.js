var parser = require('./parser.js')

function expand(node, component) {
  var atts = node.attributes || []
  var children = node.children || []
  var fn = component.fn ? component.fn.toString() : ''

  var props = ''
  if (atts.length > 0) {
    var propsString = ''
    for (var i = 0; i < atts.length; i++) {
      var a = atts[i]
      propsString += (i > 0 ? ', ' : '') + a.key + ': `' + a.value + '`'
    }
    props = '{' + propsString + '}'
  } else {
    props = '{}'
  }

  var slots = '{}'
  if (children.length > 0) {
    slots = '{default: `' + parser.stringify(children) + '`}'
  }

  return '${(' + fn + ')(' + props + ', ' + slots + ', _)}'
}

module.exports = expand
