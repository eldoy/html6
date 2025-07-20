var parser = require('./parser.js')

function slot(node) {
  var nameAttr = (node.attributes || []).find(function (attr) {
    return attr.key == 'name'
  })
  var slotName = nameAttr ? nameAttr.value : 'default'

  var hasFallback = node.children && node.children.length > 0

  if (hasFallback) {
    var fallbackContent = parser.stringify(node.children)

    return `\${slots.${slotName} || \`${fallbackContent}\`}`
  } else {
    return `\${slots.${slotName}}`
  }
}

module.exports = slot
