var expression = require('../../lib/expression.js')

test('replace single expression', async function ({ t }) {
  var result = expression('Hello {name}', (expr) => `[${expr}]`)
  t.equal(result, 'Hello [name]')
})

test('replace multiple expressions', async function ({ t }) {
  var result = expression('{a} + {b} = {c}', (expr) => `<${expr}>`)
  t.equal(result, '<a> + <b> = <c>')
})

test('ignore invalid expression (disallowed function)', async function ({ t }) {
  var result = expression('Value: {x()}', (expr) => `<${expr}>`)
  t.equal(result, 'Value: {x()}')
})

test('ignore invalid expression (disallowed object)', async function ({ t }) {
  var result = expression('Map: { "k": 1 }', (expr) => `<${expr}>`)
  t.equal(result, 'Map: { "k": 1 }')
})

test('escaped literal is not replaced', async function ({ t }) {
  var result = expression('Hello \\{name}', (expr) => `[${expr}]`)
  t.equal(result, 'Hello \\{name}')
})

test('nested braces allowed in expression', async function ({ t }) {
  var result = expression('Value: {a + {b: 1}.b}', (expr) => `[${expr}]`)
  t.equal(result, 'Value: [a + {b: 1}.b]')
})

test('expression with string and escaped quote', async function ({ t }) {
  var result = expression('Len: { "a\\"b".length }', (expr) => `(${expr})`)
  t.equal(result, 'Len: ("a\\"b".length)')
})

test('expression at start and end', async function ({ t }) {
  var result = expression('{x} is {y}', (expr) => expr.toUpperCase())
  t.equal(result, 'X is Y')
})

test('no expression returns original string', async function ({ t }) {
  var result = expression('static text', (expr) => `[${expr}]`)
  t.equal(result, 'static text')
})

test('unterminated expression is left as-is', async function ({ t }) {
  var result = expression('Hello {name', (expr) => `[${expr}]`)
  t.equal(result, 'Hello {name')
})

test('dollar expression must be left alone', async function ({ t }) {
  var result = expression('${hello}', (expr) => `[${expr}]`)
  t.equal(result, '${hello}')
})
