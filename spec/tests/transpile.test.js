var parser = require('../../lib/parser.js')
var transpile = require('../../lib/transpile.js')

test('simple', async ({ t }) => {
  var page = '<div>hello</div>'

  var tree = parser.parse(page)
  var fn = transpile(tree)

  t.ok(typeof fn == 'function')
})
