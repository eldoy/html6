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
})
