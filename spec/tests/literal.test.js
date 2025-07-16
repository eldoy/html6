var literal = require('../../lib/literal.js')

test('empty', async function ({ t }) {
  var result = literal('')
  t.equal(result, '')
})
