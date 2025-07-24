var parser = require('../../lib/parser.js')
var dispatch = require('../../lib/dispatch.js')

var slot = function (props, slots) {
  with (props) {
    return slots.default
  }
}

// node
// text
// if
// elsif
// else
// map
// slot
// component
// literal text
// literal attribute
// literal escaped
// literal invalid (not JS expression)

test('node', async ({ t }) => {
  var page = '<div>hello</div>'
  var node = parser.parse(page)[0]

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(opt.store.size, 0)
  t.equal(node.content, '<div>hello</div>')
})

test('text', async ({ t }) => {
  var page = 'hello'
  var node = parser.parse(page)[0]

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(opt.store.size, 0)
  t.equal(node.content, 'hello')
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

  t.equal(opt.store.size, 1)

  var entry = opt.store.entries().next().value
  var [key, value] = entry

  t.equal(key, '__::MASK_if_0_::__')
  t.equal(key, node.content)

  var expected = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(value, expected)
})

test('elsif', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'elsif', value: 'hello' }]
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(opt.store.size, 0)
  t.equal(node.content, '')
})

test('else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'else', value: '' }]
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(opt.store.size, 0)
  t.equal(node.content, '')
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

  t.equal(opt.store.size, 1)

  var entry = opt.store.entries().next().value
  var [key, value] = entry

  t.equal(key, '__::MASK_map_0_::__')
  t.equal(key, node.content)

  var expected = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    return `<li>item</li>`',
    `  }).join('')`,
    '})(projects)'
  ].join('\n')

  t.equal(value, expected)
})

test('component', async ({ t }) => {
  var opt = {
    components: {
      card: { fn: slot }
    },
    store: new Map()
  }

  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'title', value: 'hello' }],
    children: [{ type: 'text', content: 'item' }]
  }

  dispatch(node, opt)

  t.equal(opt.store.size, 1)

  var entry = opt.store.entries().next().value
  var [key, value] = entry

  t.equal(key, '__::MASK_component_0_::__')
  t.equal(key, node.content)

  var expected = [
    '(function (props, slots) {',
    '  with (props) {',
    '    return slots.default',
    '  }',
    '})({title: `hello`}, {default: `item`}, _)'
  ].join('\n')

  t.equal(value, expected)
})

test('slot', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'slot',
    attributes: [],
    children: []
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(opt.store.size, 1)

  var entry = opt.store.entries().next().value
  var [key, value] = entry

  t.equal(key, '__::MASK_slot_0_::__')
  t.equal(key, node.content)

  var expected = 'slots.default'

  t.equal(value, expected)
})

only('literal', async ({ t }) => {
  var node = {
    type: 'text',
    content: '{hello}'
  }

  var opt = { store: new Map() }

  dispatch(node, opt)

  t.equal(opt.store.size, 1)

  var entry = opt.store.entries().next().value
  var [key, value] = entry

  t.equal(key, '__::MASK_literal_0_::__')
  t.equal(key, node.content)

  var expected = '_.esc(hello)'

  t.equal(value, expected)
})
