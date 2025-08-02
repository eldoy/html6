var parser = require('../../lib/parser.js')

test('parse', async ({ t }) => {
  var result = parser.parse('<div class="hello"></div>')

  t.equal(result[0].type, 'element')
  t.equal(result[0].tagName, 'div')
  t.equal(result[0].attributes[0].key, 'class')
  t.equal(result[0].attributes[0].value, 'hello')
})

test('stringify', async ({ t }) => {
  var tree = [
    {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'class', value: 'hello' }],
      children: []
    }
  ]

  var result = parser.stringify(tree)
  var expected = '<div class="hello"></div>'

  t.equal(result, expected)
})
