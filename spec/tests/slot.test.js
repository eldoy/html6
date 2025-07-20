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

test('default - fallback', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: [{ type: 'text', content: 'This is the default fallback text.' }]
  }

  var result = slot(node)
  var expected = '${slots.default || `This is the default fallback text.`}'

  t.equal(result, expected)
})

test('named - fallback', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [{ key: 'name', value: 'footer' }],
    children: [
      {
        type: 'element',
        tagName: 'i',
        attributes: [],
        children: [{ type: 'text', content: 'Default footer text.' }]
      }
    ]
  }

  var result = slot(node)
  var expected = '${slots.footer || `<i>Default footer text.</i>`}'

  t.equal(result, expected)
})
