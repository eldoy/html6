var escape = require('../../lib/escape.js')
var compile = require('../../lib/compile.js')

test('function', async ({ t }) => {
  var input = '`backtick`, ${dollar}, and \\backslash\\'
  var result = escape(input)
  var expected = '\\`backtick\\`, \\${dollar}, and \\\\backslash\\\\'
  t.equal(result, expected)
})

test('text', async ({ t }) => {
  var page = '<div>`backtick`, ${dollar}, and \\backslash\\</div>'
  var expected = '<div>`backtick`, ${dollar}, and \\backslash\\</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('attribute - backtick', async ({ t }) => {
  var page = '<div class="hel`oo"></div>'
  var expected = '<div class="hel`oo"></div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('attribute - dollar', async ({ t }) => {
  var page = '<div class="${5}"></div>'
  var expected = '<div class="${5}"></div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('literal', async ({ t }) => {
  var page = '<div>{`hello`}</div>'
  var expected = '<div>hello</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('if', async ({ t }) => {
  var page = '<div if="msg">`hello ${5} \\{msg} {msg}</div>'
  var expected = '<div>`hello ${5} {msg} Hello</div>'
  var renderer = compile(page)
  var result = renderer.render({ msg: 'Hello' })
  t.equal(result, expected)
})

test('map', async ({ t }) => {
  var page = '<li map="item of items">`hello ${5} \\{item} {item}</li>'
  var expected = '<li>`hello ${5} {item} Hello</li>'
  var renderer = compile(page)
  var result = renderer.render({ items: ['Hello'] })
  t.equal(result, expected)
})

test('if/map', async ({ t }) => {
  var page =
    '<li if="items.length" map="item of items">`hello ${5} \\{item} {item}</li>'
  var expected = '<li>`hello ${5} {item} Hello</li>'
  var renderer = compile(page)
  var result = renderer.render({ items: ['Hello'] })
  t.equal(result, expected)
})

test('slot', async ({ t }) => {
  var page = '<card><div>`hello ${5} \\{msg} {msg}</div></card>'
  var components = ['<template is="card"><slot></slot></template>']

  var renderer = compile(page, { components })
  var result = renderer.render({ msg: 'Hello' })
  t.equal(result, '<div>`hello ${5} {msg} Hello</div>')
})

test('slot with default', async ({ t }) => {
  var page = '<card></card>'
  var components = [
    '<template is="card"><slot>`hello ${5} \\{msg} {msg}</slot></template>'
  ]

  var renderer = compile(page, { components })
  var result = renderer.render({ msg: 'Hello' })
  t.equal(result, '`hello ${5} {msg} Hello')
})

test('component simple', async ({ t }) => {
  var page = '<card></card>'
  var components = [
    '<template is="card"><div>`hello ${5} \\{msg} {msg}</div></template>'
  ]

  var renderer = compile(page, { components })
  var result = renderer.render({ msg: 'Hello' })
  t.equal(result, '<div>`hello ${5} {msg} Hello</div>')
})

test('component string', async ({ t }) => {
  var page = '<card msg="msg"></card>'
  var components = [
    '<template is="card"><div>`hello ${5} \\{msg} {msg}</div></template>'
  ]

  var renderer = compile(page, { components })
  var result = renderer.render({ msg: 'Hello' })
  t.equal(result, '<div>`hello ${5} {msg} msg</div>')
})

test('component value', async ({ t }) => {
  var page = '<card msg="{msg}"></card>'
  var components = [
    '<template is="card"><div>`hello ${5} \\{msg} {msg}</div></template>'
  ]

  var renderer = compile(page, { components })
  var result = renderer.render({ msg: 'Hello' })
  t.equal(result, '<div>`hello ${5} {msg} Hello</div>')
})
