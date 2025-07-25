var expand = require('../../lib/expand.js')

var plain = function (props, slots) {
  with (props) {
    return `<div>title</div>`
  }
}

var slot = function (props, slots) {
  with (props) {
    return slots.default
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
    '(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({}, {}, _)'
  ].join('\n')

  t.equal(result, expected)
})

test('attributes - string', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: 'item' }],
    children: []
  }

  var result = expand(node, { fn: plain })

  var expected = [
    '(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `item`}, {}, _)'
  ].join('\n')

  t.equal(result, expected)
})

test('attributes - value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: '{item}' }],
    children: []
  }

  var result = expand(node, { fn: plain })

  var expected = [
    '(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `${_.esc(item)}`}, {}, _)'
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
    '(function (props, slots) {',
    '  with (props) {',
    '    return slots.default',
    '  }',
    '})({}, {default: `hello`}, _)'
  ].join('\n')

  t.equal(result, expected)
})
