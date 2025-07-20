var escape = require('../../lib/escape.js')

test('all values', async ({ t }) => {
  var input = 'value with `backtick`, ${dollar}, and \\backslash\\'
  var result = escape(input)
  var expected = 'value with \\`backtick\\`, \\${dollar}, and \\\\backslash\\\\'
  t.equal(result, expected)
})
