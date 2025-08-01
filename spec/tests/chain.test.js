var chain = require('../../lib/chain.js')

test('skip - if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    children: [{ type: 'text', content: 'hello' }],
    attributes: [{ key: 'if', value: 'true' }]
  }

  var result = chain.skip(node)
  t.equal(result, false)
})

test('skip - if elsif', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    children: [{ type: 'text', content: 'hello' }],
    attributes: [{ key: 'if', value: 'false' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      children: [{ type: 'text', content: 'next' }],
      attributes: [{ key: 'elsif', value: 'true' }]
    }
  }

  var result = chain.skip(node)
  t.equal(result, true)
})

test('start', async ({ t }) => {
  var h1 = {
    type: 'element',
    tagName: 'h1',
    children: [],
    attributes: []
  }
  var div = {
    type: 'element',
    tagName: 'div',
    children: [{ type: 'text', content: 'hello' }],
    attributes: [{ key: 'if', value: 'false' }]
  }
  var span = {
    type: 'element',
    tagName: 'span',
    children: [{ type: 'text', content: 'next' }],
    attributes: [{ key: 'elsif', value: 'true' }]
  }
  var a = {
    type: 'element',
    tagName: 'a',
    children: [{ type: 'text', content: 'last' }],
    attributes: [{ key: 'else', value: '' }]
  }

  h1.previousElement = null
  h1.nextElement = div

  div.previousElement = h1
  div.nextElement = span

  span.previousElement = div
  span.nextElement = a

  a.previousElement = span
  a.nextElement = null

  var result = chain.start(h1)
  t.equal(result, null)

  var result = chain.start(div)
  t.equal(result.tagName, 'div')

  var result = chain.start(span)
  t.equal(result.tagName, 'div')

  var result = chain.start(a)
  t.equal(result.tagName, 'div')
})
