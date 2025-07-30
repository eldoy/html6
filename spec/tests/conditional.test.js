var conditional = require('../../lib/conditional.js')

var { ifBlock, elsifBlock, elseBlock } = conditional

test('if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }]
  }

  var result = ifBlock(node)

  var expected = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    "  return ''",
    '})()'
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

  var result = ifBlock(node)

  var expected = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(hello)', '!(bye)']
  var result = elsifBlock(node.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(hello)) {',
    '    if (bye) {',
    '      return `<div>bye</div>`',
    '    }',
    '  }',
    "  return ''",
    '})()'
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

  var result = ifBlock(node)

  var expected = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(hello)']
  var result = elseBlock(node.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(hello)) {',
    '    return `<div>bye</div>`',
    '  }',
    "  return ''",
    '})()'
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

  var result = ifBlock(node)

  var expected = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(hello)', '!(bye)']
  var result = elsifBlock(node.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(hello)) {',
    '    if (bye) {',
    '      return `<div>bye</div>`',
    '    }',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(hello)', '!(bye)']
  var result = elseBlock(node.nextElement.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(hello) && !(bye)) {',
    '    return `<div>other</div>`',
    '  }',
    "  return ''",
    '})()'
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

  var result = ifBlock(node)

  var expected = [
    '(function () {',
    '  if (a) {',
    '    return `<div>A</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(a)', '!(b)']
  var result = elsifBlock(node.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(a)) {',
    '    if (b) {',
    '      return `<div>B</div>`',
    '    }',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(a)', '!(b)', '!(c)']
  var result = elsifBlock(node.nextElement.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(a) && !(b)) {',
    '    if (c) {',
    '      return `<div>C</div>`',
    '    }',
    '  }',
    "  return ''",
    '})()'
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

  var result = ifBlock(node)

  var expected = [
    '(function () {',
    '  if (a) {',
    '    return `<div>A</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(a)', '!(b)']
  var result = elsifBlock(node.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(a)) {',
    '    if (b) {',
    '      return `<div>B</div>`',
    '    }',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(a)', '!(b)', '!(c)']
  var result = elsifBlock(node.nextElement.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(a) && !(b)) {',
    '    if (c) {',
    '      return `<div>C</div>`',
    '    }',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)

  var ifChain = ['!(a)', '!(b)', '!(c)']
  var result = elseBlock(node.nextElement.nextElement.nextElement, ifChain)

  var expected = [
    '(function () {',
    '  if (!(a) && !(b) && !(c)) {',
    '    return `<div>D</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)
})
