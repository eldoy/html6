var parser = require('../../lib/parser.js')
var slot = require('../../lib/slot.js')

test('default empty', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: []
  }

  var opt = { store: new Map() }

  slot(node, opt)

  var content = node.content
  var store = opt.store.get(content)

  t.equal(content, '__::MASK_slot_0_::__')
  t.equal(store, 'slots.default')
})

test('default - fallback', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: [{ type: 'text', content: 'This is the default fallback text.' }]
  }

  var opt = { store: new Map() }

  slot(node, opt)

  var content = node.content
  var store = opt.store.get(content)

  t.equal(content, '__::MASK_slot_0_::__')
  t.equal(store, 'slots.default || `This is the default fallback text.`')
})

test('default - fallback with backticks', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: [{ type: 'text', content: '`text.' }]
  }

  var opt = { store: new Map() }

  slot(node, opt)

  var content = node.content
  var store = opt.store.get(content)

  t.equal(content, '__::MASK_slot_0_::__')
  t.equal(store, 'slots.default || ``text.`')
})

test('default - fallback with dollar', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: [{ type: 'text', content: '${text}.' }]
  }

  var opt = { store: new Map() }

  slot(node, opt)

  var content = node.content
  var store = opt.store.get(content)

  t.equal(content, '__::MASK_slot_0_::__')
  t.equal(store, 'slots.default || `${text}.`')
})

test('default - fallback with backslashes', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: [{ type: 'text', content: '\\{text}.' }]
  }

  var opt = { store: new Map() }

  slot(node, opt)

  var content = node.content
  var store = opt.store.get(content)

  t.equal(content, '__::MASK_slot_0_::__')
  t.equal(store, 'slots.default || `\\{text}.`')
})

test('default - fallback with expression', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: [{ type: 'text', content: 'Some {{text}}.' }]
  }

  var opt = { store: new Map() }

  slot(node, opt)

  var content = node.content
  var store = opt.store.get(content)

  t.equal(content, '__::MASK_slot_0_::__')
  t.equal(store, 'slots.default || `Some {{text}}.`')
})
