var literal = require('../../lib/literal.js')

test('no braces', async function ({ t }) {
  var result = literal('plain text')
  t.equal(result, false)
})

test('simple expression', async function ({ t }) {
  var result = literal('hello {x}')
  t.equal(result, true)
})

test('empty braces', async function ({ t }) {
  var result = literal('{}')
  t.equal(result, true)
})

test('brace at end only', async function ({ t }) {
  var result = literal('ends with {')
  t.equal(result, false)
})

test('escaped opening brace', async function ({ t }) {
  var result = literal('\\{x}')
  t.equal(result, false)
})

test('only closing brace', async function ({ t }) {
  var result = literal('just } here')
  t.equal(result, false)
})

test('multiple expressions', async function ({ t }) {
  var result = literal('{a} and {b}')
  t.equal(result, true)
})

test('nested braces', async function ({ t }) {
  var result = literal('{a + {b}}')
  t.equal(result, true) // not validated, just exists
})

test('expression in middle', async function ({ t }) {
  var result = literal('before {x} after')
  t.equal(result, true)
})

test('escaped backslash before brace', async function ({ t }) {
  var result = literal('\\\\{x}')
  t.equal(result, true)
})
