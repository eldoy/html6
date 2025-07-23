var rebuild = require('../../lib/rebuild.js')
var extract = require('../../lib/extract.js')

test('empty string', async function ({ t }) {
  var source = ''
  var { replaced, expressions } = extract(source)
  var result = rebuild(replaced, expressions)
  t.equal(result, source)
})

test('simple string with one expression', async function ({ t }) {
  var source = 'Hello ${name}!'
  var { replaced, expressions } = extract(source)
  var result = rebuild(replaced, expressions)
  t.equal(result, source)
})

test('string with multiple expressions', async function ({ t }) {
  var source = 'First: ${a}, Second: ${b}, End'
  var { replaced, expressions } = extract(source)
  var result = rebuild(replaced, expressions)
  t.equal(result, source)
})

test('string with complex nested expressions', async function ({ t }) {
  var source = 'Data: ${a + { b: `inner ${c}` }}'
  var { replaced, expressions } = extract(source)
  var result = rebuild(replaced, expressions)
  t.equal(result, source)
})

test('string with only literals', async function ({ t }) {
  var source = 'This is just a string with no expressions.'
  var { replaced, expressions } = extract(source)
  var result = rebuild(replaced, expressions)
  t.equal(result, source)
})

test('string with escaped expressions', async function ({ t }) {
  var source = 'This is \\${not_an_expression} but this is ${an_expression}.'
  var { replaced, expressions } = extract(source)
  var result = rebuild(replaced, expressions)
  t.equal(result, source)
})

test('string with back-to-back expressions', async function ({ t }) {
  var source = 'start${a}${b}end'
  var { replaced, expressions } = extract(source)
  var result = rebuild(replaced, expressions)
  t.equal(result, source)
})

test('string that is only a single complex expression', async function ({ t }) {
  var source = '${fn(a, () => { return { key: `value` }})}'
  var { replaced, expressions } = extract(source)
  var result = rebuild(replaced, expressions)
  t.equal(result, source)
})
