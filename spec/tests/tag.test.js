var tag = require('../../lib/tag.js')
var parser = require('../../lib/parser.js')

test('element', async ({ t }) => {
  var source = '<div>hello</div>'
  var node = parser.parse(source)
  var result = tag(node)
  t.equal(result, source)
})

test('void', async ({ t }) => {
  var source = '<input></input>'
  var node = parser.parse(source)
  var result = tag(node)
  t.equal(result, '<input>')
})

test('text', async ({ t }) => {
  var source = 'hello'
  var node = parser.parse(source)
  var result = tag(node)
  t.equal(result, source)
})
