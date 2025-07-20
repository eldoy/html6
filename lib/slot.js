var parser = require('./parser.js')

function slot(node) {
  var nameAttribute = (node.attributes || []).find((attr) => attr.key == 'name')
  var slotName = nameAttribute ? nameAttribute.value : 'default'

  var hasFallback = node.children && node.children.length > 0

  if (hasFallback) {
    var fallbackContent = parser.stringify(node.children)

    return `\${slots.${slotName} || \`${fallbackContent}\`}`
  } else {
    return `\${slots.${slotName}}`
  }
}

module.exports = slot
