var comment = require('../../lib/comment.js')

test('simple content', async ({ t }) => {
  var node = {
    type: 'comment',
    content: 'hello'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var size = opt.store.size

  t.equal(content, '<!--hello-->')
  t.equal(size, 0)
})

test('content backticks', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '`hello'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var size = opt.store.size

  t.equal(content, '<!--\\`hello-->')
  t.equal(size, 0)
})

test('content dollar', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '${hello}'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var size = opt.store.size

  t.equal(content, '<!--\\${hello}-->')
  t.equal(size, 0)
})

test('content backslashes', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '\\{{hello}}'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var content = node.content
  var size = opt.store.size

  t.equal(content, '<!--{{hello}}-->')
  t.equal(size, 0)
})

test('content value', async ({ t }) => {
  var node = {
    type: 'comment',
    content: '{{item}}'
  }

  var opt = { store: new Map() }

  comment(node, opt)

  var mask = '__::MASK_literal_0_::__'

  var content = node.content
  var value = opt.store.get(mask)

  t.equal(content, `<!--${mask}-->`)
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
  var size = opt.store.size

  t.equal(content, '<!---->')
  t.equal(size, 0)
})
