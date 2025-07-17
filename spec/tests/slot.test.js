var slot = require('../../lib/slot.js')

test('default empty', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: []
  }

  var result = slot(node)

  var expected = '${slots.default}'

  t.equal(result, expected)

  t.equal(node.type, 'text')
  t.equal(node.attributes, null)
  t.equal(node.children, null)
  t.equal(node.content, expected)
})
