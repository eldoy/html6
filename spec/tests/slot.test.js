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

test('named', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [{ key: 'name', value: 'header' }],
    children: []
  }

  var result = slot(node)
  var expected = '${slots.header}'

  t.equal(result, expected)
})

test('named - attributes', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [
      { key: 'class', value: 'title' },
      { key: 'name', value: 'content' }
    ],
    children: []
  }

  var result = slot(node)
  var expected = '${slots.content}'

  t.equal(result, expected)
})
