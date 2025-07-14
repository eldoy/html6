var visit = require('../../lib/visit.js')
var parser = require('himalaya')

test('node', async ({ t }) => {
  var source = '<div>hello</div>'
  var node = parser.parse(source)

  visit(node)

  t.equal(node.compiled, '<div>hello</div>')
})

test('text', async ({ t }) => {
  var source = 'hello'
  var node = parser.parse(source)

  visit(node)

  t.equal(node.compiled, 'hello')
})

// test('if', async ({ t }) => {
//   var source = /* HTML */ ` <div if="hello">hello</div> `
//   var node = parser.parse(source)

//   visit(node)

//   t.equal(node.compiled, '<div>hello</div>')
// })
