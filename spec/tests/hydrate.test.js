var hydrate = require('../../lib/hydrate.js')

test('empty source', async function ({ t }) {
  var source = ''
  var result = hydrate(source)
  t.equal(result, '')
})
