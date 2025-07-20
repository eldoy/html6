var parser = require('../../lib/parser.js')
var html = require('../../index.js')

test('simple map', async ({ t }) => {
  var page = '<ul><li map="p of projects">${p.name}</li></ul>'

  var renderer = html.compile(page)
  var data = { projects: [{ name: 'a' }, { name: 'b' }] }
  var result = renderer.render(data)

  t.equal(result, '<ul><li>a</li><li>b</li></ul>')
})

test('simple component', async ({ t }) => {
  var page = '<card></card>'
  var components = ['<template id="card"><div>hello</div></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('nested component', async ({ t }) => {
  var page = '<cards></cards>'
  var components = [
    '<template id="card"><div>hello</div></template>',
    '<template id="cards"><card></card></template>'
  ]
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('slot component', async ({ t }) => {
  var page = '<card><div>hello</div></card>'
  var components = ['<template id="card"><slot></slot></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('deep slot', async ({ t }) => {
  var page = '<layout><div>hello</div></layout>'
  var components = ['<template id="layout"><p><slot></section></p></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render()

  t.equal(result, '<p><div>hello</div></p>')
})

test('simple props', async ({ t }) => {
  var page = '<div>${hello}</div>'
  var renderer = html.compile(page)

  var result = renderer.render({ hello: 'world' })

  t.equal(result, '<div>world</div>')
})

test('deep props', async ({ t }) => {
  var page = '<div>${project.title}</div>'
  var renderer = html.compile(page)

  var result = renderer.render({ project: { title: 'world' } })

  t.equal(result, '<div>world</div>')
})

test('component props', async ({ t }) => {
  var page = '<card greeting="greeting"></card>'
  var components = ['<template id="card"><div>${greeting}</div></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})

test('deep component props', async ({ t }) => {
  var page = '<card greeting="greeting"></card>'
  var components = [
    '<template id="card"><heading greeting="greeting"></heading></template>',
    '<template id="heading"><div>${greeting}</div></template>'
  ]
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})
