var parser = require('../../lib/parser.js')
var html = require('../../index.js')

test('simple map', async ({ t }) => {
  var page = '<ul><li map="p of projects">${p.name}</li></ul>'

  var renderer = html.compile(page)
  var data = { projects: [{ name: 'a' }, { name: 'b' }] }
  var result = renderer.render(data)

  t.equal(result, '<ul><li>a</li><li>b</li></ul>')
})

test('map slot', async ({ t }) => {
  var page = '<card><ul><li map="p of projects">${p.name}</li></ul></card>'

  var components = ['<template is="card"><slot></slot></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)
  var data = { projects: [{ name: 'a' }, { name: 'b' }] }
  var result = renderer.render(data)

  t.equal(result, '<ul><li>a</li><li>b</li></ul>')
})

test('if else slot', async ({ t }) => {
  var page =
    '<card><div if="projects.length">hello</div><div else>p</div></card>'

  var components = ['<template is="card"><slot></slot></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)
  var data = { projects: [{ name: 'a' }, { name: 'b' }] }
  var result = renderer.render(data)

  t.equal(result, '<div>hello</div>')
})

test('simple component', async ({ t }) => {
  var page = '<card></card>'
  var components = ['<template is="card"><div>hello</div></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('nested component', async ({ t }) => {
  var page = '<cards></cards>'
  var components = [
    '<template is="card"><div>hello</div></template>',
    '<template is="cards"><card></card></template>'
  ]
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('slot component', async ({ t }) => {
  var page = '<card><div>hello</div></card>'
  var components = ['<template is="card"><slot></slot></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})

test('deep slot', async ({ t }) => {
  var page = '<layout><div>hello</div></layout>'
  var components = ['<template is="layout"><p><slot></section></p></template>']
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
  var page = '<card greeting="${greeting}"></card>'
  var components = ['<template is="card"><div>${greeting}</div></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})

test('deep component props', async ({ t }) => {
  var page = '<card greeting="${greeting}"></card>'
  var components = [
    '<template is="card"><heading greeting="${greeting}"></heading></template>',
    '<template is="heading"><div>${greeting}</div></template>'
  ]
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})
