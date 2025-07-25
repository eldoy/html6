var text = require('../../lib/text.js')

test('element', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [],
    children: []
  }

  text(node)

  t.equal(node.type, 'text')
  t.equal(node.tagName, null)
  t.equal(node.attributes, null)
  t.equal(node.children, null)
  t.equal(node.content, '')
})
