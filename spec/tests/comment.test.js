var comment = require('../../lib/comment.js')

test('simple content', async ({ t }) => {
  var node = {
    type: 'comment',
    content: 'hello'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var value = opt.store.get(node.content)

  t.equal(content, '__::MASK_comment_0_::__')
  t.equal(value, '<!--hello-->')
})

test('content backticks', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '`hello'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var value = opt.store.get(node.content)

  var content = node.content
  var value = opt.store.get(node.content)

  t.equal(content, '__::MASK_comment_0_::__')
  t.equal(value, '<!--\\`hello-->')
})

test('content dollar', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '${hello}'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var value = opt.store.get(node.content)

  t.equal(content, '__::MASK_comment_0_::__')
  t.equal(value, '<!--\\${hello}-->')
})

test('content backslashes', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '\\{{hello}}'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var value = opt.store.get(node.content)

  t.equal(content, '__::MASK_comment_0_::__')
  t.equal(value, '<!--{{hello}}-->')
})

test('content value', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '{{item}}'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_comment_1_::__')
  t.equal(value, `<!--${maskLiteral}-->`)

  var value = opt.store.get(maskLiteral)

  t.equal(value, 'item')
})

test('content empty value', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '{{}}'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var value = opt.store.get(node.content)

  t.equal(content, '__::MASK_comment_0_::__')
  t.equal(value, '<!---->')
})

test('content everything', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '`hello ${hello} \\{{hello}} {{hello}}'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  t.equal(content, '__::MASK_comment_1_::__')
  t.equal(
    value,
    '<!--' + '\\`hello \\${hello} {{hello}} ' + maskLiteral + '-->'
  )

  var value = opt.store.get(maskLiteral)

  t.equal(value, 'hello')
})
