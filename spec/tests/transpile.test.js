var parser = require('../../lib/parser.js')
var transpile = require('../../lib/transpile.js')

test('simple', async ({ t }) => {
  var source = '<div>hello</div>'

  var tree = parser.parse(source)
  var fn = transpile(tree)

  t.ok(typeof fn == 'function')
})
