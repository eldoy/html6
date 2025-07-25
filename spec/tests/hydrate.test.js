var hydrate = require('../../lib/hydrate.js')

test('empty source', async function ({ t }) {
  var store = new Map()
  var result = hydrate('', store, () => '')
  t.equal(result, '')
})

test('single mask - literal', async function ({ t }) {
  var store = new Map()
  store.set('__::MASK_literal_0_::__', '42')
  var result = hydrate(
    'value: __::MASK_literal_0_::__',
    store,
    (val, type) => val
  )
  t.equal(result, 'value: 42')
})

test('multiple masks - mixed types', async function ({ t }) {
  var store = new Map()
  store.set('__::MASK_if_0_::__', 'if(x)')
  store.set('__::MASK_slot_1_::__', '<slot>')
  store.set('__::MASK_map_2_::__', '[1,2,3].map(f)')
  store.set('__::MASK_expand_3_::__', '<Component/>')
  store.set('__::MASK_literal_4_::__', '"text"')

  var input =
    '__::MASK_if_0_::__; __::MASK_slot_1_::__; __::MASK_map_2_::__; __::MASK_expand_3_::__; __::MASK_literal_4_::__'
  var result = hydrate(input, store, (val, type) => `[${type}:${val}]`)

  var expected =
    '[if:if(x)]; [slot:<slot>]; [map:[1,2,3].map(f)]; [expand:<Component/>]; [literal:"text"]'
  t.equal(result, expected)
})

test('repeated masks', async function ({ t }) {
  var store = new Map()
  store.set('__::MASK_literal_0_::__', 'X')
  var input =
    '__::MASK_literal_0_::__ __::MASK_literal_0_::__ __::MASK_literal_0_::__'
  var result = hydrate(input, store, (val, type) => val + val)
  t.equal(result, 'XX XX XX')
})

test('missing mask in store', async function ({ t }) {
  var store = new Map()
  var input = 'before __::MASK_literal_0_::__ after'
  var result = hydrate(input, store, (val, type) => val || 'MISSING')
  t.equal(result, 'before MISSING after')
})

test('type is passed correctly', async function ({ t }) {
  var store = new Map()
  store.set('__::MASK_if_0_::__', 'condition')
  var input = '__::MASK_if_0_::__'
  var result = hydrate(input, store, (val, type) => type)
  t.equal(result, 'if')
})
