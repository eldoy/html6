var unmask = require('../../lib/unmask.js')

test('empty source', async function ({ t }) {
  var store = new Map()
  var result = unmask('', store)
  t.equal(result, '')
})

test('single mask resolution', async function ({ t }) {
  var store = new Map()
  store.set('__::MASK_text_1_::__', '${value}')
  var result = unmask('Hello __::MASK_text_1_::__!', store)
  t.equal(result, 'Hello ${value}!')
})

test('nested mask resolution', async function ({ t }) {
  var store = new Map()
  store.set('__::MASK_text_1_::__', '__::MASK_text_2_::__')
  store.set('__::MASK_text_2_::__', '${deep}')
  var result = unmask('Value: __::MASK_text_1_::__', store)
  t.equal(result, 'Value: ${deep}')
})

test('multiple masks in code', async function ({ t }) {
  var store = new Map()
  store.set('__::MASK_text_1_::__', '${foo}')
  store.set('__::MASK_text_2_::__', '${bar}')
  var result = unmask('__::MASK_text_1_::__ + __::MASK_text_2_::__', store)
  t.equal(result, '${foo} + ${bar}')
})

test('store gets fully unmasked values', async function ({ t }) {
  var store = new Map()
  store.set('__::MASK_text_1_::__', '__::MASK_text_2_::__')
  store.set('__::MASK_text_2_::__', '${final}')
  unmask('', store)
  t.equal(store.get('__::MASK_text_1_::__'), '${final}')
})
