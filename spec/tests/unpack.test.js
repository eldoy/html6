var unpack = require('../../lib/unpack.js')

test('simple if', async ({ t }) => {
  var attrs = [{ key: 'if', value: 'conditionA' }]

  var result = unpack(attrs, [])

  t.deepEqual(result, ['!(conditionA)'])
})

test('if + elsif', async ({ t }) => {
  var attrs1 = [{ key: 'if', value: 'conditionA' }]
  var attrs2 = [{ key: 'elsif', value: 'conditionB' }]

  var result = unpack(attrs1, [])
  var result = unpack(attrs2, result)

  t.deepEqual(result, ['!(conditionA)', '!(conditionB)'])
})

test('if + multiple elsif', async ({ t }) => {
  var attrs1 = [{ key: 'if', value: 'conditionA' }]
  var attrs2 = [{ key: 'elsif', value: 'conditionB' }]
  var attrs3 = [{ key: 'elsif', value: 'conditionC' }]

  var result = unpack(attrs1, [])
  var result = unpack(attrs2, result)
  var result = unpack(attrs3, result)

  t.deepEqual(result, ['!(conditionA)', '!(conditionB)', '!(conditionC)'])
})

test('if + mixed attrs', async ({ t }) => {
  var attrs = [
    { key: 'id', value: 'uuid' },
    { key: 'if', value: 'conditionA' },
    { key: 'class', value: 'header' }
  ]

  var result = unpack(attrs, [])

  t.deepEqual(result, ['!(conditionA)'])
})

test('if + non-logical + if', async ({ t }) => {
  var attrs1 = [{ key: 'if', value: 'conditionA' }]
  var attrs2 = [{ key: 'elsif', value: 'conditionB' }]
  var attrs3 = [{ key: 'class', value: 'header' }]
  var attrs4 = [{ key: 'if', value: 'conditionD' }]
  var attrs5 = [{ key: 'elsif', value: 'conditionE' }]

  var result = unpack(attrs1, [])
  result = unpack(attrs2, result)
  t.deepEqual(result, ['!(conditionA)', '!(conditionB)'])

  result = unpack(attrs3, result)
  t.deepEqual(result, [])

  result = unpack(attrs4, [])
  result = unpack(attrs5, result)
  t.deepEqual(result, ['!(conditionD)', '!(conditionE)'])
})
