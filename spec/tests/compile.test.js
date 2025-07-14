var parser = require('../../lib/parser.js')
var compile = require('../../lib/compile.js')

test('single root', async ({ t }) => {
  var source = /* HTML */ `<div>hello</div>`

  var renderer = compile(source)
  var result = renderer.render()

  var root = parser.parse(result)

  var elements = root.filter((x) => x.type == 'element')

  t.equal(elements.length, 1)

  var el = elements[0]
  t.equal(el.tagName, 'div')
  t.equal(el.attributes.length, 0)
  t.equal(el.children.length, 1)

  var text = el.children[0]
  t.equal(text.type, 'text')
  t.equal(text.content.trim(), 'hello')
})

test('multi root', async ({ t }) => {
  var source = /* HTML */ `
    <div>hello</div>
    <span>bye</span>
  `

  var renderer = compile(source)
  var result = renderer.render()

  var root = parser.parse(result)

  var elements = root.filter((x) => x.type == 'element')

  t.equal(elements.length, 2)

  var el = elements[0]
  t.equal(el.tagName, 'div')
  t.equal(el.attributes.length, 0)
  t.equal(el.children.length, 1)

  var text = el.children[0]
  t.equal(text.type, 'text')
  t.equal(text.content.trim(), 'hello')

  var el = elements[1]
  t.equal(el.tagName, 'span')
  t.equal(el.attributes.length, 0)
  t.equal(el.children.length, 1)

  var text = el.children[0]
  t.equal(text.type, 'text')
  t.equal(text.content.trim(), 'bye')
})

test('attributes', async ({ t }) => {
  var source = /* HTML */ ` <div class="a" data-type="bool">hello</div> `

  var renderer = compile(source)
  var result = renderer.render()

  var root = parser.parse(result)

  var elements = root.filter((x) => x.type == 'element')

  t.equal(elements.length, 1)

  var el = elements[0]
  t.equal(el.tagName, 'div')
  t.equal(el.attributes.length, 2)
  t.equal(el.attributes[0].key, 'class')
  t.equal(el.attributes[0].value, 'a')
  t.equal(el.attributes[1].key, 'data-type')
  t.equal(el.attributes[1].value, 'bool')

  t.equal(el.children.length, 1)

  var text = el.children[0]
  t.equal(text.type, 'text')
  t.equal(text.content.trim(), 'hello')
})

test('deep', async ({ t }) => {
  var source = /* HTML */ `
    <div>
      hello
      <span> bye <strong> yep </strong></span>
    </div>
  `

  var renderer = compile(source)
  var result = renderer.render()

  var root = parser.parse(result)

  var elements = root.filter((x) => x.type == 'element')

  t.equal(elements.length, 1)

  var el = elements[0]
  t.equal(el.tagName, 'div')
  t.equal(el.attributes.length, 0)
  t.equal(el.children.length, 3)

  var text = el.children[0]
  t.equal(text.type, 'text')
  t.equal(text.content.trim(), 'hello')

  var span = el.children[1]
  t.equal(span.type, 'element')
  t.equal(span.tagName, 'span')
  t.equal(span.children.length, 2)

  var text2 = span.children[0]
  t.equal(text2.type, 'text')
  t.equal(text2.content, ' bye ')

  var strong = span.children[1]
  t.equal(strong.type, 'element')
  t.equal(strong.tagName, 'strong')
  t.equal(strong.children.length, 1)

  var text3 = strong.children[0]
  t.equal(text3.type, 'text')
  t.equal(text3.content, ' yep ')
})
