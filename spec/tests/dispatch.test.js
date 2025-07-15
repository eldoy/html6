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

  dispatch(node, { templates: [] })

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

  dispatch(node, { templates: [] })
  t.equal(node.compiled, '')
})

test('else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'else', value: '' }]
  }

  dispatch(node, { templates: [] })
  t.equal(node.compiled, '')
})

test('map', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: 'item' }]
  }

  dispatch(node, { templates: [] })

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

  dispatch(node, { templates: [] })

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

var slot = function (props, slot) {
  with (props) {
    return `${JSON.parse(slot)}`
  }
}

test('template', async ({ t }) => {
  var opt = {
    templates: {
      card: { fn: slot }
    }
  }

  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'title', value: 'hello' }],
    children: [{ type: 'text', content: 'item' }]
  }

  dispatch(node, opt)

  var expected = [
    '${(function (props, slot) {',
    '  with (props) {',
    '    return `${JSON.parse(slot)}`',
    '  }',
    `})({title: hello}, '"item"')}`
  ].join('\n')

  t.equal(node.compiled, expected)
})
