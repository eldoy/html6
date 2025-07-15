var tag = require('../../lib/tag.js')

var plain = function (props, slot) {
  with (props) {
    return `<div>title</div>`
  }
}

var slot = function (props, slot) {
  with (props) {
    return `${JSON.parse(slot)}`
  }
}

test('simple', async ({ t }) => {
  var opt = {
    templates: {
      card: { fn: plain }
    }
  }

  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: []
  }

  var result = tag(node, opt)

  var expected = [
    '${(function (props, slot) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    `})({}, '""')}`
  ].join('\n')

  t.equal(result, expected)
})

test('attributes', async ({ t }) => {
  var opt = {
    templates: {
      card: { fn: plain }
    }
  }

  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ project: 'item' }],
    children: []
  }

  var result = tag(node, opt)

  var expected = [
    '${(function (props, slot) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    `})({project: item}, '""')}`
  ].join('\n')

  t.equal(result, expected)
})

test('slot', async ({ t }) => {
  var opt = {
    templates: {
      card: { fn: slot }
    }
  }

  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [],
    children: [{ type: 'text', content: 'hello' }]
  }

  var result = tag(node, opt)

  var expected = [
    '${(function (props, slot) {',
    '  with (props) {',
    '    return `${JSON.parse(slot)}`',
    '  }',
    `})({}, '"hello"')}`
  ].join('\n')

  t.equal(result, expected)
})
