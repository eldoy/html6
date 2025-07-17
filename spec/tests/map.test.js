var parser = require('../../lib/parser.js')
var map = require('../../lib/map.js')

test('map', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: 'item' }]
  }

  var result = map(node)

  var expected = [
    '${(function (projects) {',
    '  return projects.map(function(project) {',
    '    return `<li>item</li>`',
    `  }).join('')`,
    '})(projects)}'
  ].join('\n')

  t.equal(result, expected)
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

  var result = map(node)

  var expected = [
    '${(function (projects) {',
    '  return projects.map(function(project) {',
    '    if (project.active) {',
    '      return `<li>item</li>`',
    '    }',
    "    return ''",
    "  }).join('')",
    '})(projects)}'
  ].join('\n')

  t.equal(result, expected)
})
