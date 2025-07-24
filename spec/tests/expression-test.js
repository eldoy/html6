var expression = require('../../lib/expression.js')

test('simple expression', async function ({ t }) {
  var result = expression('{x}', false)
  t.equal(result, 'x')
})

test('expression with spaces', async function ({ t }) {
  var result = expression(' { x + 1 } ', false)
  t.equal(result, 'x + 1')
})

test('expression in middle of text', async function ({ t }) {
  var result = expression('hello {a.b} world', false)
  t.equal(result, 'a.b')
})

test('nested braces', async function ({ t }) {
  var result = expression('{a + {b: 1}.b}', false)
  t.equal(result, 'a + {b: 1}.b')
})

test('invalid expression', async function ({ t }) {
  var result = expression('{ for ( }', false)
  t.equal(result, '')
})

test('escaped opening brace', async function ({ t }) {
  var result = expression('\\{x}', false)
  t.equal(result, '')
})

test('escaped quote inside string', async function ({ t }) {
  var result = expression('{ "a\\"b".length }', false)
  t.equal(result, '"a\\"b".length')
})

test('quote inside expression (disallowed object literal)', async function ({
  t
}) {
  var result = expression('{ "key": obj["key"] }', false)
  t.equal(result, '')
})

test('multiple expressions, returns first', async function ({ t }) {
  var result = expression('{a} and {b}', false)
  t.equal(result, 'a')
})

test('no expression', async function ({ t }) {
  var result = expression('nothing here', false)
  t.equal(result, '')
})

test('expression with backslashes', async function ({ t }) {
  var result = expression('{ path.replace(/\\\\/g, "/") }', false)
  t.equal(result, '')
})

test('function call (disallowed)', async function ({ t }) {
  var result = expression('{ esc("hello") }', false)
  t.equal(result, '')
})

test('nested function call (disallowed)', async function ({ t }) {
  var result = expression('{ a + esc("x") }', false)
  t.equal(result, '')
})

test('method call on object (disallowed)', async function ({ t }) {
  var result = expression('{ str.trim() }', false)
  t.equal(result, '')
})

test('method call on array access (disallowed)', async function ({ t }) {
  var result = expression('{ arr[0].toUpperCase() }', false)
  t.equal(result, '')
})

test('call after property chain (disallowed)', async function ({ t }) {
  var result = expression('{ a.b().c }', false)
  t.equal(result, '')
})
