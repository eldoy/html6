var empty = require('../../lib/empty.js')

test('empty', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    children: [{ type: 'text', content: 'hello' }],
    attributes: []
  }

  var opt = { store: new Map() }

  empty(node, opt)

  t.equal(opt.store.size, 0)
  t.equal(node.type, 'text')
  t.equal(node.content, '')
})
