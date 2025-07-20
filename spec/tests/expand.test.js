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

var layout = function (props, slots) {
  with (props) {
    return `<header>${slots.header}</header><main>${slots.default}</main><footer>${slots.footer}</footer>`
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
    `})({}, {}, _)}`
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
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `item`}, {}, _)}'
  ].join('\n')

  t.equal(result, expected)
})

test('attributes - value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'card',
    attributes: [{ key: 'project', value: '${item}' }],
    children: []
  }

  var result = expand(node, { fn: plain })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<div>title</div>`',
    '  }',
    '})({project: `${item}`}, {}, _)}'
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
    '})({}, {default: `hello`}, _)}'
  ].join('\n')

  t.equal(result, expected)
})

test('named slot', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'layout-card',
    attributes: [],
    children: [
      {
        type: 'element',
        tagName: 'h1',
        attributes: [{ key: 'slot', value: 'header' }],
        children: [{ type: 'text', content: 'This is the header' }]
      }
    ]
  }

  var result = expand(node, { fn: layout })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<header>${slots.header}</header><main>${slots.default}</main><footer>${slots.footer}</footer>`',
    '  }',
    '})({}, {header: `<h1>This is the header</h1>`}, _)}'
  ].join('\n')

  t.equal(result, expected)
})

test('named default mix', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'layout-card',
    attributes: [],
    children: [
      {
        type: 'element',
        tagName: 'span',
        attributes: [{ key: 'slot', value: 'footer' }],
        children: [{ type: 'text', content: 'The footer content.' }]
      },
      {
        type: 'text',
        content: 'The default content.'
      }
    ]
  }

  var result = expand(node, { fn: layout })

  var expected = [
    '${(function (props, slots) {',
    '  with (props) {',
    '    return `<header>${slots.header}</header><main>${slots.default}</main><footer>${slots.footer}</footer>`',
    '  }',
    '})({}, {footer: `<span>The footer content.</span>`, default: `The default content.`}, _)}'
  ].join('\n')

  t.equal(result, expected)
})
