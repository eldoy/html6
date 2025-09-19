var expression = require('../../lib/expression.js')

test('empty expression', async function ({ t }) {
  var result = expression('{{}}', (expr) => expr)
  t.equal(result, '')
})

test('replace single expression', async function ({ t }) {
  var result = expression('Hello {{name}}', (expr) => `[${expr}]`)
  t.equal(result, 'Hello [name]')
})

test('replace multiple expressions', async function ({ t }) {
  var result = expression('{{a}} + {{b}} = {{c}}', (expr) => `<${expr}>`)
  t.equal(result, '<a> + <b> = <c>')
})

test('call global function', async function ({ t }) {
  var result = expression('Value: {{x()}}', (expr) => `<${expr}>`)
  t.equal(result, 'Value: <x()>')
})

test('ignore invalid expression (disallowed object)', async function ({ t }) {
  var result = expression('Map: {{ "k": 1 }}', (expr) => `<${expr}>`)
  t.equal(result, 'Map: ')
})

test('escaped literal is unescaped', async function ({ t }) {
  var result = expression('Hello \\{{name}}', (expr) => `[${expr}]`)
  t.equal(result, 'Hello {{name}}')
})

test('nested braces allowed in expression', async function ({ t }) {
  var result = expression('Value: {{a + {b: 1}.b}}', (expr) => `[${expr}]`)
  t.equal(result, 'Value: [a + {b: 1}.b]')
})

test('expression with string and escaped quote', async function ({ t }) {
  var result = expression('Len: {{ "a\\"b".length }}', (expr) => `(${expr})`)
  t.equal(result, 'Len: ("a\\"b".length)')
})

test('expression at start and end', async function ({ t }) {
  var result = expression('{{x}} is {{y}}', (expr) => expr.toUpperCase())
  t.equal(result, 'X is Y')
})

test('no expression returns original string', async function ({ t }) {
  var result = expression('static text', (expr) => `[${expr}]`)
  t.equal(result, 'static text')
})

test('unterminated expression is left as-is', async function ({ t }) {
  var result = expression('Hello {{name', (expr) => `[${expr}]`)
  t.equal(result, 'Hello {{name')
})

test('dollar expression must be left alone', async function ({ t }) {
  var result = expression('${hello}', (expr) => `[${expr}]`)
  t.equal(result, '${hello}')
})

test('replace on double braces', async function ({ t }) {
  var result = expression('{{hello}}', (expr) => `[${expr}]`)
  t.equal(result, '[hello]')
})

test('replace on triple braces', async function ({ t }) {
  var result = expression('{{{hello}}}', (expr) => `[${expr}]`)
  t.equal(result, '{[hello]}')
})

test('expression with pipe', async function ({ t }) {
  var result = expression('{{hello |> truncate}}', (expr) => expr)
  t.equal(result, '_.truncate(hello)')
})

test('expression with pipe variable', async function ({ t }) {
  var result = expression('{{hello |> truncate 5}}', (expr) => expr)
  t.equal(result, '_.truncate(hello,5)')
})

test('expression with function', async function ({ t }) {
  var result = expression("{{(function(){ return 'hello' }()}}", (expr) => expr)
  t.equal(result, '')
})

only('expression opt', async function ({ t }) {
  var opt = {}
  var result = expression('{{hello}}', (expr, opt) => (opt.hello = 1), opt)
  t.equal(result, (opt.hello = 1))
})
