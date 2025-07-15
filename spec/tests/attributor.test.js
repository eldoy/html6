var attributor = require('../../lib/attributor.js')

test('empty', async ({ t }) => {
  var atts = []

  var result = attributor(atts)

  t.equal(result, '')
})

test('simple', async ({ t }) => {
  var atts = [{ project: 'item' }]

  var result = attributor(atts)

  t.equal(result, ` project: item `)
})

test('multi', async ({ t }) => {
  var atts = [{ hello: 'greeting', project: 'item' }]

  var result = attributor(atts)

  t.equal(result, ` hello: greeting, project: item `)
})
