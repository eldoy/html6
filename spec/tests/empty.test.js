var empty = require('../../lib/empty.js')

test('empty', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    children: [{ type: 'text', content: 'hello' }],
    attributes: []
  }

  empty(node)

  t.equal(node.type, 'text')
  t.equal(node.content, '')
})
