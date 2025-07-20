var parser = require('./parser.js')

function expand(node, component) {
  var atts = node.attributes || []
  var children = node.children || []

  var props = ''
  if (atts.length > 0) {
    props = atts
      .map(function (a) {
        return a.key + ': `' + a.value + '`'
      })
      .join(', ')
  }

  var grouped = {}
  for (var i = 0; i < children.length; i++) {
    var child = children[i]
    var slot = 'default'
    var clone = child

    if (child.type == 'element') {
      var attrs = child.attributes || []
      for (var j = 0; j < attrs.length; j++) {
        if (attrs[j].key == 'slot') {
          slot = attrs[j].value
          if (!clone.attributes) continue
          var filtered = []
          for (var k = 0; k < attrs.length; k++) {
            if (attrs[k].key != 'slot') filtered.push(attrs[k])
          }
          clone = Object.assign({}, child, { attributes: filtered })
          break
        }
      }
    }

    if (!grouped[slot]) grouped[slot] = []
    grouped[slot].push(clone)
  }

  var slotParts = []
  for (var key in grouped) {
    var val = parser.stringify(grouped[key])
    slotParts.push(key + ': `' + val + '`')
  }

  var slotObj = '{' + slotParts.join(', ') + '}'
  var body = component.fn ? component.fn.toString() : ''

  return '${(' + body + ')({' + props + '}, ' + slotObj + ', _)}'
}

module.exports = expand
