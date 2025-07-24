var mask = require('../../lib/mask.js')

test('add', async function ({ t }) {
  var store = new Map()
  var result = mask('hello', 'literal', store)
  t.equal(result, '__::MASK_literal_0_::__')

  var result = mask('hello', 'map', store)
  t.equal(result, '__::MASK_map_1_::__')
})
