var dispatch = require('../../lib/dispatch.js')

test('slot', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    children: [{ type: 'text', content: 'hello' }]
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(node.type, 'text')
  t.equal(node.children, undefined)
  t.equal(typeof node.content, 'string')
  t.match(node.content, /MASK_slot/)
})

test('expand', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: () => {} } }
  }

  dispatch(node, opt)

  t.equal(node.type, 'text')
  t.equal(node.children, undefined)
  t.equal(typeof node.content, 'string')
  t.match(node.content, /MASK_expand/)
})

test('comment', async ({ t }) => {
  var node = {
    type: 'comment',
    content: 'hello'
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(node.type, 'text')
  t.equal(typeof node.content, 'string')
  t.match(node.content, /MASK_comment/)
})

test('text', async ({ t }) => {
  var node = {
    type: 'text',
    content: 'hello'
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(node.type, 'text')
  t.equal(typeof node.content, 'string')
  t.match(node.content, /MASK_text/)
})

test('map', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: 'item' }]
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(node.type, 'text')
  t.equal(node.children, undefined)
  t.equal(node.attributes, undefined)
  t.equal(typeof node.content, 'string')
  t.match(node.content, /MASK_map/)
})

test('if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }]
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(node.type, 'text')
  t.equal(node.children, undefined)
  t.equal(node.attributes, undefined)
  t.equal(typeof node.content, 'string')
  t.match(node.content, /MASK_if/)
})

test('attrib', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'id', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }]
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(node.type, 'text')
  t.equal(node.children, undefined)
  t.equal(node.attributes, undefined)
  t.equal(typeof node.content, 'string')
  t.match(node.content, /MASK_attrib/)
})
