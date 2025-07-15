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
