var escape = require('../../lib/escape.js')
var compile = require('../../lib/compile.js')

test('function', async ({ t }) => {
  var input = '`backtick`, ${dollar}, and \\backslash\\'
  var result = escape(input)
  var expected = '\\`backtick\\`, \\${dollar}, and \\\\backslash\\\\'
  t.equal(result, expected)
})

test('text', async ({ t }) => {
  var page = '<div>`backtick`, ${dollar}, and \\backslash\\</div>'
  var expected = '<div>`backtick`, ${dollar}, and \\backslash\\</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})
