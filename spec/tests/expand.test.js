var expand = require('../../lib/expand.js')

var plain = function (props, slots) {
  with (props) {
    return `<div>title</div>`
  }
}

var slot = function (props, slots) {
  with (props) {
    return slots.default
  }
}

test('simple', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: plain } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({}, {}, _)}'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('attributes - string', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: 'item' }],
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: plain } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `item`}, {}, _)}'
  ].join('\n')

  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('attributes - string backticks', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: '`item' }],
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: plain } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `\\`item`}, {}, _)}'
  ].join('\n')

  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('attributes - string dollar', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: '${item}' }],
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: plain } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `\\${item}`}, {}, _)}'
  ].join('\n')

  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('attributes - string backslashes', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: '\\{text}' }],
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: plain } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `\\\\{text}`}, {}, _)}'
  ].join('\n')

  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('attributes - value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: '{{item}}' }],
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: plain } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: item}, {}, _)}'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('attributes - value empty', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: '{{}}' }],
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: plain } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    "})({project: ''}, {}, _)}"
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('slot', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: [{ type: 'text', content: 'hello' }]
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: slot } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return slots.default',
    '  }',
    '})({}, {default: `hello`}, _)}'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('slot - backticks', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: [{ type: 'text', content: '`hello' }]
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: slot } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return slots.default',
    '  }',
    '})({}, {default: `\\`hello`}, _)}'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('slot - dollar', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: [{ type: 'text', content: '${hello}' }]
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: slot } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return slots.default',
    '  }',
    '})({}, {default: `\\${hello}`}, _)}'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('slot - backslashes', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: [{ type: 'text', content: '\\{hello}' }]
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: slot } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return slots.default',
    '  }',
    '})({}, {default: `\\\\{hello}`}, _)}'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('slot - value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: [{ type: 'text', content: '{{item}}' }]
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: slot } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return slots.default',
    '  }',
    '})({}, {default: item}, _)}'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('slot - empty value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: [{ type: 'text', content: '{{}}' }]
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: slot } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return slots.default',
    '  }',
    "})({}, {default: ''}, _)}"
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})

test('attributes - if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [
      { key: 'if', value: 'item' },
      { key: 'project', value: 'empty' }
    ],
    children: []
  }

  var opt = {
    store: new Map(),
    components: { card: { fn: plain } }
  }

  expand(node, opt)

  var content = node.content
  var value = opt.store.get(content).replace(/\r/g, '')

  var expectedVal = [
    '${(function () {',
    '  if (item) {',
    '    return `${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `empty`}, {}, _)}`',
    '  }',
    "  return ''",
    '})()}'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_expand_0_::__'
  t.equal(content, expectedContent)
})
