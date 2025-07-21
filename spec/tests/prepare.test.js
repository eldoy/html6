var parser = require('../../lib/parser.js')
var prepare = require('../../lib/prepare.js')

test('simple', async ({ t }) => {
  var components = [
    '<template id="cards"><card></card></template>',
    '<template id="card"><div>hello</div></template>'
  ]

  var result = prepare(components)

  t.equal(result.cards.name, 'cards')
  t.equal(result.cards.html, '<card></card>')
  t.equal(result.cards.tree.length, 1)
  t.equal(result.cards.tree[0].type, 'element')
  t.equal(result.cards.tree[0].tagName, 'card')

  t.equal(result.card.name, 'card')
  t.equal(result.card.html, '<div>hello</div>')
  t.equal(result.card.tree.length, 1)

  t.equal(result.card.tree[0].type, 'element')
  t.equal(result.card.tree[0].tagName, 'div')
  t.equal(result.card.tree[0].children.length, 1)
  t.equal(result.card.tree[0].children[0].type, 'text')
  t.equal(result.card.tree[0].children[0].content, 'hello')
})

test('inline', async ({ t }) => {
  var components = [
    '<template id="cards"><card></card></template>',
    '<template id="card"><div>hello</div></template>',
    '<template id="card"><div>inline</div></template>'
  ]

  var result = prepare(components)

  t.equal(result.cards.name, 'cards')
  t.equal(result.cards.html, '<card></card>')
  t.equal(result.cards.tree.length, 1)
  t.equal(result.cards.tree[0].type, 'element')
  t.equal(result.cards.tree[0].tagName, 'card')

  t.equal(result.card.name, 'card')
  t.equal(result.card.html, '<div>inline</div>')
  t.equal(result.card.tree.length, 1)

  t.equal(result.card.tree[0].type, 'element')
  t.equal(result.card.tree[0].tagName, 'div')
  t.equal(result.card.tree[0].children.length, 1)
  t.equal(result.card.tree[0].children[0].type, 'text')
  t.equal(result.card.tree[0].children[0].content, 'inline')
})
