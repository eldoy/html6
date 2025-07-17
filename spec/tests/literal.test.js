var literal = require('../../lib/literal.js')

test('empty', async function ({ t }) {
  var result = literal('')
  t.equal(result, 'esc()')
})

test('value', async function ({ t }) {
  var result = literal('hello')
  t.equal(result, 'esc(hello)')
})

test('single pipe', async function ({ t }) {
  var result = literal('hello | pipe')
  t.equal(result, 'pipe(esc(hello))')
})

test('pipe args - var', async function ({ t }) {
  var result = literal('hello | pipe a')
  t.equal(result, 'pipe(esc(hello),a)')
})

test('pipe args - string', async function ({ t }) {
  var result = literal('hello | pipe "hello"')
  t.equal(result, 'pipe(esc(hello),"hello")')
})

test('pipe args - number', async function ({ t }) {
  var result = literal('hello | pipe 5')
  t.equal(result, 'pipe(esc(hello),5)')
})

test('pipe args - array', async function ({ t }) {
  var result = literal('hello | pipe [1,2,3]')
  t.equal(result, 'pipe(esc(hello),[1,2,3])')
})

test('pipe args - object', async function ({ t }) {
  var result = literal('hello | pipe {hello: greeting }')
  t.equal(result, 'pipe(esc(hello),{hello: greeting })')
})

test('multi pipe', async function ({ t }) {
  var result = literal('hello | pipe | list')
  t.equal(result, 'list(pipe(esc(hello)))')
})

test('multi pipe - args', async function ({ t }) {
  var result = literal('hello | pipe { hello: "world" } | list 5')
  t.equal(result, 'list(pipe(esc(hello),{ hello: "world" }),5)')
})

test('raw', async function ({ t }) {
  var result = literal('hello | raw')
  t.equal(result, 'hello')
})
