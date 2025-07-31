var attrib = require('../../lib/attrib.js')

test('simple content', async ({ t }) => {
  var node = {
    key: 'id',
    value: 'hello'
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_0_::__')
  t.equal(value, 'hello')
})

test('content backticks', async ({ t }) => {
  var node = {
    key: 'id',
    value: '`hello'
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var content = node.value
  var value = opt.store.get(content)

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_0_::__')
  t.equal(value, '\\`hello')
})

test('content dollar', async ({ t }) => {
  var node = {
    key: 'id',
    value: '${hello}'
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_0_::__')
  t.equal(value, '\\${hello}')
})

test('content backslashes', async ({ t }) => {
  var node = {
    key: 'id',
    value: '\\{{hello}}'
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_0_::__')
  t.equal(value, '{{hello}}')
})

test('content value', async ({ t }) => {
  var node = {
    key: 'id',
    value: '{{item}}'
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_1_::__')
  t.equal(value, maskLiteral)

  var value = opt.store.get(maskLiteral)

  t.equal(value, 'item')
})

test('content empty value', async ({ t }) => {
  var node = {
    key: 'id',
    value: '{{}}'
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_0_::__')
  t.equal(value, '')
})

test('content everything', async ({ t }) => {
  var node = {
    key: 'id',
    value: '`hello ${hello} \\{{hello}} {{hello}}'
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_1_::__')
  t.equal(value, '\\`hello \\${hello} {{hello}} ' + maskLiteral)

  var value = opt.store.get(maskLiteral)

  t.equal(value, 'hello')
})

test('content mixed', async ({ t }) => {
  var node = {
    key: 'id',
    value: "card {{ projects.length > 0 ? 'hello' : 'bye' }}"
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_1_::__')
  t.equal(value, 'card ' + maskLiteral)

  var value = opt.store.get(maskLiteral)

  t.equal(value, "projects.length > 0 ? 'hello' : 'bye'")
})

test('content mixed backticks', async ({ t }) => {
  var node = {
    key: 'id',
    value: "card` {{ projects.length > 0 ? 'hello' : 'bye' }}"
  }

  var opt = { store: new Map() }

  attrib(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.value
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_attrib_1_::__')
  t.equal(value, 'card\\` ' + maskLiteral)

  var value = opt.store.get(maskLiteral)

  t.equal(value, "projects.length > 0 ? 'hello' : 'bye'")
})
