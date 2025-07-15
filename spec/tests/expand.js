var expand = require('../../lib/expand.js')

var plain = function (props, slots) {
  with (props) {
    return `<div>title</div>`
  }
}

var slot = function (props, slots) {
  with (props) {
    return `${slots.default}`
  }
}

test('simple', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: []
  }

  var result = expand(node, { fn: plain })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    `})({}, {})}`
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

  var result = expand(node, { fn: plain })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    `})({project: item}, {})}`
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

  var result = expand(node, { fn: slot })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `${slots.default}`',
    '  }',
    `})({}, {default: "hello"})}`
  ].join('\n')

  t.equal(result, expected)
})
