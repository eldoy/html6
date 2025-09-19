var piper = require('../../lib/piper.js')

test('no pipes', async function ({ t }) {
  var result = piper('title')
  t.equal(result, 'title')
})

test('single pipe', async function ({ t }) {
  var result = piper('title |> upper')
  t.equal(result, '_.upper(title)')
})

test('multiple pipes', async function ({ t }) {
  var result = piper('title |> upper |> trim')
  t.equal(result, '_.trim(_.upper(title))')
})

test('pipe with numeric arg', async function ({ t }) {
  var result = piper('title |> truncate 10')
  t.equal(result, '_.truncate(title,10)')
})

test('pipe with string arg', async function ({ t }) {
  var result = piper('title |> wrap "\\""')
  t.equal(result, '_.wrap(title,"\\"")')
})

test('pipe with boolean arg', async function ({ t }) {
  var result = piper('title |> show true')
  t.equal(result, '_.show(title,true)')
})

test('pipe with identifier arg', async function ({ t }) {
  var result = piper('title |> show visible')
  t.equal(result, '_.show(title,visible)')
})

test('pipe with array arg', async function ({ t }) {
  var result = piper('title |> join ["a", "b", 3]')
  t.equal(result, '_.join(title,["a", "b", 3])')
})

test('pipe with object arg', async function ({ t }) {
  var result = piper('title |> options {a:1,b:2}')
  t.equal(result, '_.options(title,{a:1,b:2})')
})

test('pipe with binary expression', async function ({ t }) {
  var result = piper('title |> pad (2 + 3)')
  t.equal(result, '_.pad(title,(2 + 3))')
})

test('function call as base', async function ({ t }) {
  var result = piper('call() |> upper')
  t.equal(result, '_.upper(call())')
})

test('function call in argument', async function ({ t }) {
  var result = piper('title |> wrap esc("hello")')
  t.equal(result, '_.wrap(title,esc("hello"))')
})

test('function call in expression', async function ({ t }) {
  var result = piper('title |> truncate getLimit()')
  t.equal(result, '_.truncate(title,getLimit())')
})

test('complex valid non-call arg', async function ({ t }) {
  var result = piper('title |> wrap "[" + suffix + "]"')
  t.equal(result, '_.wrap(title,"[" + suffix + "]")')
})

test('piper error', async function ({ t }) {
  var opt = { mode: 'development' }
  try {
    piper('title |> 3 = x', opt)
  } catch (e) {
    var result = e.message
  }
  t.equal(result, "Unexpected token '='")
})
