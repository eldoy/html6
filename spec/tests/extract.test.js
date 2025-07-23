var extract = require('../../lib/extract.js')

test('should extract a simple expression', async function ({ t }) {
  var input = 'Hello ${name}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${name}'])
})

test('should extract an expression with arithmetic', async function ({ t }) {
  var input = '1 + ${2 + 3}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${2 + 3}'])
})

test('should handle nested braces in expressions', async function ({ t }) {
  var input = '${a + {b: c}}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${a + {b: c}}'])
})

test('should handle nested template literals in expressions', async function ({
  t
}) {
  var input = '${a + `template ${nested}`}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${a + `template ${nested}`}'])
})

test('should ignore escaped expressions', async function ({ t }) {
  var input = 'ignore \\${notExpr}, keep ${real}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${real}'])
})

test('should handle braces inside strings within expressions', async function ({
  t
}) {
  var input = '${"string with } inside"}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${"string with } inside"}'])
})

test('should handle complex arrow functions with nested templates', async function ({
  t
}) {
  var input = '${fn(() => { return `${nested}` })}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${fn(() => { return `${nested}` })}'])
})

test('should handle mixed quotes and templates', async function ({ t }) {
  var input = "${a + '{escaped quote}' + `${template}`}"
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ["${a + '{escaped quote}' + `${template}`}"])
})

test('should handle deeply nested template literals', async function ({ t }) {
  var input = '${`${`${`${deep}`}`}`}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${`${`${`${deep}`}`}`}'])
})

test('should extract multiple expressions correctly', async function ({ t }) {
  var input = 'text ${a} and ${b + {c: `${d}`}}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${a}', '${b + {c: `${d}`}}'])
})

test('should return no expressions for an unterminated expression', async function ({
  t
}) {
  var input = 'not ${unterminated'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, [])
})

test('should return no expressions for an empty string', async function ({
  t
}) {
  var input = ''
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, [])
})

test('should handle expressions at the very beginning and end', async function ({
  t
}) {
  var input = '${start} middle ${end}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${start}', '${end}'])
})

test('should handle back-to-back expressions', async function ({ t }) {
  var input = '${a}${b}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${a}', '${b}'])
})

test('should handle an escaped backslash before an expression', async function ({
  t
}) {
  var input = 'C:\\\\${dir}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${dir}'])
})

test('should handle an unterminated quote inside an expression', async function ({
  t
}) {
  var input = 'Hello ${"world}`'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, [])
})

test('should handle lone dollar signs that are not expressions', async function ({
  t
}) {
  var input = 'This costs $5, not ${price}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, ['${price}'])
})

test('should handle whitespace between dollar sign and brace', async function ({
  t
}) {
  var input = 'This is not an expression: $ {a}'
  var result = extract(input)
  var expressions = Array.from(result.expressions.values())
  t.deepEqual(expressions, [])
})
