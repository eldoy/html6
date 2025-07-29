var parser = require('../../lib/parser.js')
var html = require('../../index.js')

test('simple map', async ({ t }) => {
  var page = '<ul><li map="p of projects">{p.name}</li></ul>'

  var renderer = html.compile(page)
  var data = { projects: [{ name: 'a' }, { name: 'b' }] }
  var result = renderer.render(data)

  t.equal(result, '<ul><li>a</li><li>b</li></ul>')
})

test('map slot', async ({ t }) => {
  var page = '<card><ul><li map="p of projects">{p.name}</li></ul></card>'

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
  var page = '<div>{hello}</div>'
  var renderer = html.compile(page)

  var result = renderer.render({ hello: 'world' })

  t.equal(result, '<div>world</div>')
})

test('deep props', async ({ t }) => {
  var page = '<div>{project.title}</div>'
  var renderer = html.compile(page)

  var result = renderer.render({ project: { title: 'world' } })

  t.equal(result, '<div>world</div>')
})

test('component props', async ({ t }) => {
  var page = '<card greeting="{greeting}"></card>'
  var components = ['<template is="card"><div>{greeting}</div></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})

test('component html props', async ({ t }) => {
  var page = '<card item="<div>{greeting}</div>">></card>'
  var components = ['<template is="card">{item}</template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})

test('component template props', async ({ t }) => {
  var page = '<card item="{`<div>${5}</div>`}"></card>'
  var components = ['<template is="card">{item}</template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>5</div>')
})

test('component function props', async ({ t }) => {
  var page = '<card item="{(function(){ return \'hello\' }()}"></card>'
  var components = ['<template is="card">{item}</template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '')
})

test('deep component props', async ({ t }) => {
  var page = '<card greeting="{greeting}"></card>'
  var components = [
    '<template is="card"><heading greeting="{greeting}"></heading></template>',
    '<template is="heading"><div>{greeting}</div></template>'
  ]
  var opt = { components }

  var renderer = html.compile(page, opt)

  var result = renderer.render({ greeting: 'hello' })

  t.equal(result, '<div>hello</div>')
})

test('map component props', async ({ t }) => {
  var page = '<ul><li map="p of projects"><card project="{p}"></card></li></ul>'
  var components = ['<template is="card"><a>{project.name}</a></template>']
  var opt = { components }

  var renderer = html.compile(page, opt)

  var data = { projects: [{ name: '1' }, { name: '2' }] }

  var result = renderer.render(data)

  t.equal(result, '<ul><li><a>1</a></li><li><a>2</a></li></ul>')
})

test('double and triple braces', async ({ t }) => {
  var page = '<div>{{msg}} {{{msg}}}</div>'
  var expected = '<div>{Hello} {{Hello}}</div>'
  var renderer = html.compile(page)
  var result = renderer.render({ msg: 'Hello' })
  t.equal(result, expected)
})

test('pipe on attr', async ({ t }) => {
  var page = '<div data-test="{msg1 | truncate 2}"></div>'
  var expected = '<div data-test="He"></div>'

  var pipes = {
    truncate: (a, b) => (a.length > b ? a.slice(0, b) : a)
  }

  var renderer = html.compile(page, { pipes })
  var result = renderer.render({ msg1: 'Hello' })
  t.equal(result, expected)
})

test('pipe with args', async ({ t }) => {
  var page =
    '<div>{msg | pipe1 0 | pipe2 "0" | pipe3 true | pipe4 {n: "0"} | pipe5 ["0"] | pipe6 value}</div>'

  var pipes = {
    pipe1: (_, arg) => {
      t.strictEqual(arg, 0)
      return 'h'
    },
    pipe2: (text, arg) => {
      t.strictEqual(arg, '0')
      return text + 'e'
    },
    pipe3: (text, arg) => {
      t.strictEqual(arg, true)
      return text + 'l'
    },
    pipe4: (text, arg) => {
      t.strictEqual(arg.n, '0')
      return text + 'l'
    },
    pipe5: (text, arg) => {
      t.strictEqual(arg[0], '0')
      console.log('text', text)
      return text + 'o'
    },
    pipe6: (text, arg) => {
      t.strictEqual(arg, 5)
      return text + '!'
    }
  }

  var renderer = html.compile(page, { pipes })
  var result = renderer.render({ msg: '', value: 5 })
  t.equal(result, '<div>hello!</div>')
})

test('pipe with disallowed args', async ({ t }) => {
  var page = '<div>{msg1 | fallback x()}</div>'
  var expected = '<div></div>'

  var pipes = {
    fallback: (a, b) => a || b
  }

  var renderer = html.compile(page, { pipes })
  var result = renderer.render({ msg1: 'Hello', x: () => {} })
  t.equal(result, expected)
})
