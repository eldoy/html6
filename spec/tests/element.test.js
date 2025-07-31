var element = require('../../lib/element.js')

test('empty', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    children: [],
    attributes: []
  }

  var opt = { store: new Map() }

  element(node, opt)

  t.equal(opt.store.size, 0)
  t.equal(node.type, 'text')
  t.equal(node.content, '<div></div>')
})

test('children', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    children: [{ type: 'text', content: 'hello' }],
    attributes: []
  }

  var opt = { store: new Map() }

  element(node, opt)

  t.equal(opt.store.size, 0)
  t.equal(node.type, 'text')
  t.equal(node.content, '<div>hello</div>')
})
