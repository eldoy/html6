var parser = require('../../lib/parser.js')
var transpile = require('../../lib/transpile.js')

test('simple', async ({ t }) => {
  var page = '<div>hello</div>'

  var tree = parser.parse(page)
  var fn = transpile(tree)

  t.ok(typeof fn == 'function')
})

// test('literal mask is hydrated', async ({ t }) => {
//   var page = '<div>{ "hello" }</div>'
//   var tree = parser.parse(page)
//   var fn = transpile(tree)
//   var out = fn({})
//   t.equal(out, '<div>hello</div>')
// })

// test('if mask is hydrated', async ({ t }) => {
//   var page = '<div if={ show }>ok</div>'
//   var tree = parser.parse(page)
//   var fn = transpile(tree)
//   var out = fn({ show: true })
//   t.equal(out, '<div>ok</div>')
// })

// test('map mask is hydrated', async ({ t }) => {
//   var page = '<ul>{ items.map(x => `<li>${x}</li>`) }</ul>'
//   var tree = parser.parse(page)
//   var fn = transpile(tree)
//   var out = fn({ items: ['a', 'b'] })
//   t.equal(out, '<ul><li>a</li><li>b</li></ul>')
// })

// test('slot mask is hydrated', async ({ t }) => {
//   var page = '<div><slot></slot></div>'
//   var tree = parser.parse(page)
//   var fn = transpile(tree, {}, { slot: true })
//   var out = fn({}, { default: () => 'ok' })
//   t.equal(out, '<div>ok</div>')
// })
