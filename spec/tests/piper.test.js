var piper = require('../../lib/piper.js')

test('no pipes', async function ({ t }) {
  var result = piper('title')
  t.equal(result, '_.esc(title)')
})

test('single pipe', async function ({ t }) {
  var result = piper('title | upper')
  t.equal(result, '_.upper(_.esc(title))')
})

test('multiple pipes', async function ({ t }) {
  var result = piper('title | upper | trim')
  t.equal(result, '_.trim(_.upper(_.esc(title)))')
})

test('pipe with numeric arg', async function ({ t }) {
  var result = piper('title | truncate 10')
  t.equal(result, '_.truncate(_.esc(title),10)')
})

test('pipe with string arg', async function ({ t }) {
  var result = piper('title | wrap "\\""')
  t.equal(result, '_.wrap(_.esc(title),"\\"")')
})

test('pipe with boolean arg', async function ({ t }) {
  var result = piper('title | show true')
  t.equal(result, '_.show(_.esc(title),true)')
})

test('pipe with identifier arg', async function ({ t }) {
  var result = piper('title | show visible')
  t.equal(result, '_.show(_.esc(title),visible)')
})

test('pipe with array arg', async function ({ t }) {
  var result = piper('title | join ["a", "b", 3]')
  t.equal(result, '_.join(_.esc(title),["a", "b", 3])')
})

test('pipe with object arg', async function ({ t }) {
  var result = piper('title | options {a:1,b:2}')
  t.equal(result, '_.options(_.esc(title),{a:1,b:2})')
})

test('pipe with binary expression', async function ({ t }) {
  var result = piper('title | pad (2 + 3)')
  t.equal(result, '_.pad(_.esc(title),(2 + 3))')
})

test('raw disables escaping', async function ({ t }) {
  var result = piper('title | raw')
  t.equal(result, 'title')
})

test('raw after other pipes', async function ({ t }) {
  var result = piper('title | trim | raw')
  t.equal(result, '_.trim(title)')
})

test('function call as base (disallowed)', async function ({ t }) {
  var result = piper('call() | upper')
  t.equal(result, '')
})

test('function call in argument (disallowed)', async function ({ t }) {
  var result = piper('title | wrap esc("hello")')
  t.equal(result, '')
})

test('function call in expression (disallowed)', async function ({ t }) {
  var result = piper('title | truncate getLimit()')
  t.equal(result, '')
})

test('complex valid non-call arg', async function ({ t }) {
  var result = piper('title | wrap "[" + suffix + "]"')
  t.equal(result, '_.wrap(_.esc(title),"[" + suffix + "]")')
})
