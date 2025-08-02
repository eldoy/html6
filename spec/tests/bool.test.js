var parser = require('../../lib/parser.js')
var html = require('../../index.js')

test('plain', async ({ t }) => {
  var page = '<button disabled>hello</button>'

  var renderer = html.compile(page)
  var data = {}
  var result = renderer.render(data)

  t.equal(result, '<button disabled>hello</button>')
})

test('string', async ({ t }) => {
  var page = '<button disabled="true">hello</button>'

  var renderer = html.compile(page)
  var data = {}
  var result = renderer.render(data)

  t.equal(result, '<button disabled="true">hello</button>')
})

// TODO: Move this to stringify-test and make it pass
// test('expression - true', async ({ t }) => {
//   var page = '<button disabled="{{true}}">hello</button>'

//   var renderer = html.compile(page)
//   var data = {}
//   var result = renderer.render(data)

//   t.equal(result, '<button>hello</button>')
// })

// TODO: Move this to stringify-test and make it pass
// test('expression - false', async ({ t }) => {
//   var page = '<button disabled="{{false}}">hello</button>'

//   var renderer = html.compile(page)
//   var data = {}
//   var result = renderer.render(data)

//   t.equal(result, '<button disabled>hello</button>')
// })
