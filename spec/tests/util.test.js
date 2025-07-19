var util = require('../../lib/util.js')

test('escapeTemplateString', async ({ t }) => {
  var input = 'value with `backtick`, ${dollar}, and \\backslash\\'
  var result = util.escapeTemplateString(input)
  var expected = 'value with \\`backtick\\`, \\${dollar}, and \\\\backslash\\\\'
  t.equal(result, expected)
})
