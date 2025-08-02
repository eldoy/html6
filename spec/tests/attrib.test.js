var attrib = require('../../lib/attrib.js')

test('simple content', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: 'hello'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_0_::__')
  t.equal(stored, 'hello')
})

test('content backticks', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: '`hello'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_0_::__')
  t.equal(stored, '\\`hello')
})

test('content dollar', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: '${hello}'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_0_::__')
  t.equal(stored, '\\${hello}')
})

test('content backslashes', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: '\\{{hello}}'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_0_::__')
  t.equal(stored, '{{hello}}')
})

test('content value', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: '{{item}}'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_1_::__')
  t.equal(stored, maskLiteral)

  var stored = opt.store.get(maskLiteral)

  t.equal(stored, '${item}')
})

test('content empty value', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: '{{}}'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_0_::__')
  t.equal(stored, '')
})

test('content everything', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: '`hello ${hello} \\{{hello}} {{hello}}'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_1_::__')
  t.equal(stored, '\\`hello \\${hello} {{hello}} ' + maskLiteral)

  var stored = opt.store.get(maskLiteral)

  t.equal(stored, '${hello}')
})

test('content mixed', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: "card {{ projects.length > 0 ? 'hello' : 'bye' }}"
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_1_::__')
  t.equal(stored, 'card ' + maskLiteral)

  var stored = opt.store.get(maskLiteral)

  t.equal(stored, "${projects.length > 0 ? 'hello' : 'bye'}")
})

test('content mixed backticks', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: "card` {{ projects.length > 0 ? 'hello' : 'bye' }}"
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_1_::__')
  t.equal(stored, 'card\\` ' + maskLiteral)

  var stored = opt.store.get(maskLiteral)

  t.equal(stored, "${projects.length > 0 ? 'hello' : 'bye'}")
})

test('multiple content', async ({ t }) => {
  var atts = [
    {
      key: 'id',
      value: 'card ${item} {{item}}'
    },
    {
      key: 'class',
      value: 'header \\{{hello}} {{hello}}'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var maskLiteral1 = '__::MASK_literal_0_::__'
  var maskLiteral2 = '__::MASK_literal_2_::__'

  var value = atts[0].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_1_::__')
  t.equal(stored, 'card \\${item} ' + maskLiteral1)

  var stored = opt.store.get(maskLiteral1)

  t.equal(stored, '${item}')

  var value = atts[1].value
  var stored = opt.store.get(value)

  t.equal(value, '__::MASK_attrib_3_::__')
  t.equal(stored, 'header {{hello}} ' + maskLiteral2)

  var stored = opt.store.get(maskLiteral2)

  t.equal(stored, '${hello}')
})

test('dynamic mask', async ({ t }) => {
  var atts = [
    {
      key: 'disabled',
      value: '{{true}}'
    }
  ]

  var opt = { store: new Map() }

  attrib(atts, opt)

  var key = atts[0].key
  var value = atts[0].value

  var stored = opt.store.get(key)

  t.equal(key, '__::MASK_literal_0_::__')
  t.equal(value, null)
  t.equal(stored, "${(true) ? 'disabled' : ''}")
})
