var attrib = require('../../lib/attrib.js')

test('empty', async ({ t }) => {
  var atts = []
  var result = attrib(atts)
  t.equal(result, '')
})

test('simple', async ({ t }) => {
  var atts = [{ key: 'project', value: 'item' }]
  var result = attrib(atts)
  t.equal(result, `project: item`)
})

test('multi', async ({ t }) => {
  var atts = [
    { key: 'hello', value: 'greeting' },
    { key: 'project', value: 'item' }
  ]
  var result = attrib(atts)
  t.equal(result, `hello: greeting, project: item`)
})
