var bool = require('../../lib/bool.js')

test('set', async ({ t }) => {
  var result = bool.has('disabled')
  var expected = true
  t.equal(result, expected)
})
