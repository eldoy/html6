var parser = require('./parser.js')

function expand(node, component) {
  var atts = node.attributes || []
  var props = atts.map((a) => `${a.key}: \`${a.value}\``).join(', ')

  var groupedChildren = (node.children || []).reduce((acc, child) => {
    var slotName = 'default'
    var cleanedChild = { ...child }

    if (child.type === 'element') {
      var slotAttribute = (child.attributes || []).find(
        (attr) => attr.key === 'slot'
      )

      if (slotAttribute) {
        slotName = slotAttribute.value
        cleanedChild.attributes = child.attributes.filter(
          (attr) => attr.key !== 'slot'
        )
      }
    }

    if (!acc[slotName]) {
      acc[slotName] = []
    }

    acc[slotName].push(cleanedChild)
    return acc
  }, {})

  var slotEntries = Object.entries(groupedChildren)
    .map(([name, childrenArray]) => {
      var content = parser.stringify(childrenArray)
      return `${name}: \`${content}\``
    })
    .join(', ')

  var slot = `{${slotEntries}}`
  var body = component.fn?.toString() || ''

  return '${(' + body + ')({' + props + '}, ' + slot + ', _)}'
}

module.exports = expand
