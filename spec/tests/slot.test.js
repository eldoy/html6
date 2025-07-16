var slot = require('../../lib/slot.js')

test('empty', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: []
  }

  var result = slot(node)

  var expected = '${s.default}'

  t.equal(result, expected)
})
