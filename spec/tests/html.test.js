var parser = require('../../lib/parser.js')
var html = require('../../index.js')

test('simple template', async ({ t }) => {
  var source = '<card></card>'
  var templates = ['<template id="card"><div>hello</div></template>']
  var opt = { templates }

  var renderer = html.compile(source, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('nested template', async ({ t }) => {
  var source = '<cards></cards>'
  var templates = [
    '<template id="card"><div>hello</div></template>',
    '<template id="cards"><card></card></template>'
  ]
  var opt = { templates }

  var renderer = html.compile(source, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('slot template', async ({ t }) => {
  var source = '<card><div>hello</div></card>'
  var templates = ['<template id="card"><slot></slot></template>']
  var opt = { templates }

  var renderer = html.compile(source, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('simple props', async ({ t }) => {
  var source = '<div>${hello}</div>'
  var renderer = html.compile(source)

  var result = renderer.render({ hello: 'world' })

  t.equal(result, '<div>world</div>')
})

test('deep props', async ({ t }) => {
  var source = '<div>${project.title}</div>'
  var renderer = html.compile(source)

  var result = renderer.render({ project: { title: 'world' } })

  t.equal(result, '<div>world</div>')
})

test('template props', async ({ t }) => {
  var source = '<card greeting="greeting"></card>'
  var templates = ['<template id="card"><div>${greeting}</div></template>']
  var opt = { templates }

  var renderer = html.compile(source, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})

test('deep template props', async ({ t }) => {
  var source = '<card greeting="greeting"></card>'
  var templates = [
    '<template id="card"><heading greeting="greeting"></heading></template>',
    '<template id="heading"><div>${greeting}</div></template>'
  ]
  var opt = { templates }

  var renderer = html.compile(source, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})
