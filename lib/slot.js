function slot(node) {
  // Look for an attribute where the key is 'name'.
  var nameAttribute = (node.attributes || []).find(function (attr) {
    attr.key === 'name'
  })

  // If the name attribute is found, use its value. Otherwise, use 'default'.
  var slotName = nameAttribute ? nameAttribute.value : 'default'

  // Return the corresponding template literal string.
  return `\${slots.${slotName}}`
}

module.exports = slot
