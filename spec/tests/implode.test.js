var implode = require('../../lib/implode.js')

test('empty', async ({ t }) => {
  var node = null
  var result = implode(node)
  t.equal(result, null)
})

test('element', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [],
    children: []
  }

  implode(node)

  t.equal(node.type, 'text')
  t.equal(node.tagName, null)
  t.equal(node.attributes, null)
  t.equal(node.children, null)
  t.equal(node.content, '')
})
