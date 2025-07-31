var map = require('../../lib/map.js')

test('map', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: 'item' }]
  }

  var opt = { store: new Map() }

  map(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    return `<li>item</li>`',
    `  }).join('')`,
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_0_::__'
  t.equal(content, expectedContent)
})

test('map - backticks', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: '`item' }]
  }

  var opt = { store: new Map() }

  map(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    return `<li>\\`item</li>`',
    `  }).join('')`,
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_0_::__'
  t.equal(content, expectedContent)
})

test('map - dollar', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: '${item}' }]
  }

  var opt = { store: new Map() }

  map(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    return `<li>\\${item}</li>`',
    `  }).join('')`,
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_0_::__'
  t.equal(content, expectedContent)
})

test('map - backslashes', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: '\\{{item}}' }]
  }

  var opt = { store: new Map() }

  map(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    return `<li>{{item}}</li>`',
    `  }).join('')`,
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_0_::__'
  t.equal(content, expectedContent)
})

test('map - value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: '{{item}}' }]
  }

  var opt = { store: new Map() }

  map(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    `    return \`<li>${maskLiteral}</li>\``,
    `  }).join('')`,
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_1_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskLiteral)
  t.equal(value, 'item')
})

test('map - empty value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: '{{}}' }]
  }

  var opt = { store: new Map() }

  map(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    return `<li></li>`',
    `  }).join('')`,
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_0_::__'
  t.equal(content, expectedContent)
})

test('map - everything', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [{ key: 'map', value: 'project of projects' }],
    children: [{ type: 'text', content: '`item ${item} \\{{item}} {{item}}' }]
  }

  var opt = { store: new Map() }

  map(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    return `<li>\\`item \\${item} {{item}} ' + maskLiteral + '</li>`',
    `  }).join('')`,
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_1_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskLiteral)
  t.equal(value, 'item')
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

  var opt = { store: new Map() }

  map(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    if (project.active) {',
    '      return `<li>item</li>`',
    '    }',
    "    return ''",
    "  }).join('')",
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_0_::__'
  t.equal(content, expectedContent)
})

test('map if - everything', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'li',
    attributes: [
      { key: 'map', value: 'project of projects' },
      { key: 'if', value: 'project.active' }
    ],
    children: [{ type: 'text', content: '`item ${item} \\{{item}} {{item}}' }]
  }

  var opt = { store: new Map() }

  map(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function (projects) {',
    '  return projects.map(function(project) {',
    '    if (project.active) {',
    '      return `<li>\\`item \\${item} {{item}} ' + maskLiteral + '</li>`',
    '    }',
    "    return ''",
    "  }).join('')",
    '})(projects)'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_map_1_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskLiteral)
  t.equal(value, 'item')
})
