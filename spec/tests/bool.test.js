var bool = require('../../lib/bool.js')

test('set', async ({ t }) => {
  var result = bool.has('disabled')
  t.equal(result, true)
})
