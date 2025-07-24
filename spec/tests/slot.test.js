var parser = require('../../lib/parser.js')
var slot = require('../../lib/slot.js')

test('default empty', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: []
  }

  var result = slot(node)
  var expected = 'slots.default'

  t.equal(result, expected)
})

test('default - fallback', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: [{ type: 'text', content: 'This is the default fallback text.' }]
  }

  var result = slot(node)
  var expected = 'slots.default || `This is the default fallback text.`'
  t.equal(result, expected)
})
