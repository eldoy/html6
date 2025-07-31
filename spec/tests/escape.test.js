var escape = require('../../lib/escape.js')

test('function', async ({ t }) => {
  var input = '`backtick`, ${dollar}, and \\backslash\\'
  var result = escape(input)
  var expected = '\\`backtick\\`, \\${dollar}, and \\\\backslash\\\\'
  t.equal(result, expected)
})
