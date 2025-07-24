var link = require('../../lib/link.js')

test('assigns nextElement correctly', function ({ t }) {
  var list = [
    { type: 'element', tagName: 'a' },
    { type: 'text', content: 'b' },
    { type: 'element', tagName: 'c' },
    { type: 'element', tagName: 'd' }
  ]

  link(list)

  t.strictEqual(list[0].nextElement, list[2])
  t.strictEqual(list[2].nextElement, list[3])
  t.strictEqual(list[3].nextElement, null)
  t.ok(!('nextElement' in list[1]))
})

test('handles empty list', function ({ t }) {
  var list = []
  link(list)
  t.ok(true)
})

test('handles list with no elements', function ({ t }) {
  var list = [
    { type: 'text', content: 'a' },
    { type: 'text', content: 'b' }
  ]

  link(list)

  t.ok(!('nextElement' in list[0]))
  t.ok(!('nextElement' in list[1]))
})
