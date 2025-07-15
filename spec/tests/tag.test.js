var tag = require('../../lib/tag.js')

var plain = function (props, slots) {
  with (props) {
    return `<div>title</div>`
  }
}

var slot = function (props, slots) {
  with (props) {
    return `${JSON.parse(slots.default)}`
  }
}

test('simple', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: []
  }

  var result = tag(node, { fn: plain })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    `})({}, '""')}`
  ].join('\n')

  t.equal(result, expected)
})

test('attributes', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: 'item' }],
    children: []
  }

  var result = tag(node, { fn: plain })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    `})({project: item}, '""')}`
  ].join('\n')

  t.equal(result, expected)
})

test('slot', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: [{ type: 'text', content: 'hello' }]
  }

  var result = tag(node, { fn: slot })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `${JSON.parse(slots.default)}`',
    '  }',
    `})({}, '"hello"')}`
  ].join('\n')

  t.equal(result, expected)
})
