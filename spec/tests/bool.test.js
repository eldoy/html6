var bool = require('../../lib/bool.js')

// test('normal', async ({ t }) => {
//   var code = '<button>hello</button>'
//   var result = bool(code)
//   var expected = '<button>hello</button>'
//   t.equal(result, expected)
// })

// test('attribute', async ({ t }) => {
//   var code = '<button class="bye">hello</button>'
//   var result = bool(code)
//   var expected = '<button class="bye">hello</button>'
//   t.equal(result, expected)
// })

// test('plain', async ({ t }) => {
//   var code = '<button disabled>hello</button>'
//   var result = bool(code)
//   var expected = '<button disabled>hello</button>'
//   t.equal(result, expected)
// })

// test('string', async ({ t }) => {
//   var code = '<button disabled="true">hello</button>'
//   var result = bool(code)
//   var expected = '<button disabled="true">hello</button>'
//   t.equal(result, expected)
// })

// test('expression - true', async ({ t }) => {
//   var code = '<button disabled="${true}">hello</button>'
//   var result = bool(code)
//   var expected = "<button${(true) ? ' disabled' : ''}>hello</button>"
//   t.equal(result, expected)
// })

// test('expression - true with atts', async ({ t }) => {
//   var code = '<button class="hello" disabled="${true}" id="a">hello</button>'
//   var result = bool(code)
//   var expected = "<button${(true) ? ' disabled' : ''} id=\"a\">hello</button>"
//   t.equal(result, expected)
// })

// test('expression - string', async ({ t }) => {
//   var code = '<button disabled="hello${true}">hello</button>'
//   var result = bool(code)
//   var expected = '<button disabled="hello${true}">hello</button>'
//   t.equal(result, expected)
// })

// test('expression - non-boolean attribute', async ({ t }) => {
//   var code = '<button class="${true}">hello</button>'
//   var result = bool(code)
//   var expected = '<button class="${true}">hello</button>'
//   t.equal(result, expected)
// })
