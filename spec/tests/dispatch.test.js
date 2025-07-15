var parser = require('../../lib/parser.js')
var dispatch = require('../../lib/dispatch.js')

test('node', async ({ t }) => {
  var source = '<div>hello</div>'
  var node = parser.parse(source)[0]

  dispatch(node)

  t.equal(node.compiled, '<div>hello</div>')
})

test('text', async ({ t }) => {
  var source = 'hello'
  var node = parser.parse(source)[0]

  dispatch(node)

  t.equal(node.compiled, 'hello')
})

test('if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }]
  }

  dispatch(node)

  var expected = [
    '${(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    "  return ''",
    '})()}'
  ].join('\n')

  t.equal(node.compiled, expected)
})

test('elsif', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'elsif', value: 'hello' }]
  }

  dispatch(node)
  t.equal(node.compiled, '')
})

test('else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'else', value: '' }]
  }

  dispatch(node)
  t.equal(node.compiled, '')
})

test('map', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: 'item' }]
  }

  dispatch(node)

  var expected = [
    '${(function () {',
    '  return projects.map(function(project) {',
    '    return `<li>item</li>`',
    `  }).join('')`,
    '})()}'
  ].join('\n')

  t.equal(node.compiled, expected)
})

test('map if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [
      { key: 'map', value: 'project of projects' },
      { key: 'if', value: 'project.active' }
    ],
    children: [{ type: 'text', content: 'item' }]
  }

  dispatch(node)

  var expected = [
    '${(function () {',
    '  return projects.map(function(project) {',
    '    if (project.active) {',
    '      return `<li>item</li>`',
    '    }',
    "    return ''",
    "  }).join('')",
    '})()}'
  ].join('\n')

  t.equal(node.compiled, expected)
})
