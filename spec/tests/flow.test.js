var flow = require('../../lib/flow.js')

test('if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }]
  }

  var result = flow(node)

  var expected = [
    '${(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    "  return ''",
    '})()}'
  ].join('\n')

  t.equal(result, expected)
})

test('if elsif', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'bye' }],
      children: [{ type: 'text', content: 'bye' }]
    }
  }

  var result = flow(node)

  var expected = [
    '${(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    '  else if (bye) {',
    '    return `<div>bye</div>`',
    '  }',
    "  return ''",
    '})()}'
  ].join('\n')

  t.equal(result, expected)
})

test('if else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'else' }],
      children: [{ type: 'text', content: 'bye' }]
    }
  }

  var result = flow(node)

  var expected = [
    '${(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    '  else {',
    '    return `<div>bye</div>`',
    '  }',
    "  return ''",
    '})()}'
  ].join('\n')

  t.equal(result, expected)
})

test('if elsif else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'bye' }],
      children: [{ type: 'text', content: 'bye' }],
      nextElement: {
        type: 'element',
        tagName: 'div',
        attributes: [{ key: 'else' }],
        children: [{ type: 'text', content: 'other' }]
      }
    }
  }

  var result = flow(node)

  var expected = [
    '${(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    '  else if (bye) {',
    '    return `<div>bye</div>`',
    '  }',
    '  else {',
    '    return `<div>other</div>`',
    '  }',
    "  return ''",
    '})()}'
  ].join('\n')

  t.equal(result, expected)
})

test('if elsif elsif', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'a' }],
    children: [{ type: 'text', content: 'A' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'b' }],
      children: [{ type: 'text', content: 'B' }],
      nextElement: {
        type: 'element',
        tagName: 'div',
        attributes: [{ key: 'elsif', value: 'c' }],
        children: [{ type: 'text', content: 'C' }]
      }
    }
  }

  var result = flow(node)

  var expected = [
    '${(function () {',
    '  if (a) {',
    '    return `<div>A</div>`',
    '  }',
    '  else if (b) {',
    '    return `<div>B</div>`',
    '  }',
    '  else if (c) {',
    '    return `<div>C</div>`',
    '  }',
    "  return ''",
    '})()}'
  ].join('\n')

  t.equal(result, expected)
})

test('if elsif elsif else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'a' }],
    children: [{ type: 'text', content: 'A' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'b' }],
      children: [{ type: 'text', content: 'B' }],
      nextElement: {
        type: 'element',
        tagName: 'div',
        attributes: [{ key: 'elsif', value: 'c' }],
        children: [{ type: 'text', content: 'C' }],
        nextElement: {
          type: 'element',
          tagName: 'div',
          attributes: [{ key: 'else' }],
          children: [{ type: 'text', content: 'D' }]
        }
      }
    }
  }

  var result = flow(node)

  var expected = [
    '${(function () {',
    '  if (a) {',
    '    return `<div>A</div>`',
    '  }',
    '  else if (b) {',
    '    return `<div>B</div>`',
    '  }',
    '  else if (c) {',
    '    return `<div>C</div>`',
    '  }',
    '  else {',
    '    return `<div>D</div>`',
    '  }',
    "  return ''",
    '})()}'
  ].join('\n')

  t.equal(result, expected)
})
