var internal = require('../../lib/internal.js')

test('prop - normal', async ({ t }) => {
  var props = { hello: 'world' }
  var result = internal.prop(props)

  t.equal(Object.keys(result).length, 1)
  t.equal(result.hello, 'world')
})

test('prop - normal', async ({ t }) => {
  var props = {
    props: { hello: 'world' },
  }
  var result = internal.prop(props)

  t.equal(Object.keys(result).length, 1)
  t.equal(result.hello, 'world')
})

test('prop - merge', async ({ t }) => {
  var props = {
    props: { hello: 'world' },
    hello: 'other',
  }
  var result = internal.prop(props)

  t.equal(Object.keys(result).length, 1)
  t.equal(result.hello, 'other')
})
