var parser = require('../../lib/parser.js')
var build = require('../../lib/build.js')

test('single root', async ({ t }) => {
  var page = /* HTML */ `
    <section>
      <div>title</div>
      <p>desc</p>
    </section>
  `

  var tree = parser.parse(page)

  var touched = []
  build(tree, function (node) {
    if (node.type === 'element') {
      touched.push(node)
    }
  })

  t.equal(touched.length, 3)
})

test('multi root', async ({ t }) => {
  var page = /* HTML */ `
    <section>
      <div>title</div>
      <p>desc</p>
    </section>
    <section>
      <div>title</div>
      <p>desc</p>
    </section>
  `

  var tree = parser.parse(page)
  var touched = []
  build(tree, function (node) {
    if (node.type === 'element') {
      touched.push(node)
    }
  })

  t.equal(touched.length, 6)
})

test('order', async ({ t }) => {
  var page = /* HTML */ `
    <section>
      <div>
        title
        <p>child1</p>
        <span>child2</span>
        <strong>child3</strong>
      </div>
    </section>
  `

  var tree = parser.parse(page)
  var touched = []
  build(tree, function (node) {
    if (node.type === 'element') {
      touched.push(node)
    }
  })

  t.equal(touched[0].tagName, 'p')
  t.equal(touched[0].nextElement.tagName, 'span')

  t.equal(touched[1].tagName, 'span')
  t.equal(touched[1].nextElement.tagName, 'strong')

  t.equal(touched[2].tagName, 'strong')
  t.equal(touched[2].nextElement, null)

  t.equal(touched[3].tagName, 'div')
  t.equal(touched[4].tagName, 'section')
})

test('if else', async ({ t }) => {
  var page = '<div if="false">YES</div><div else>NO</div>'

  var tree = parser.parse(page)
  var touched = []
  build(tree, function (node) {
    if (node.type === 'element') {
      touched.push(node)
    }
  })

  t.equal(touched[0].tagName, 'div')
  t.equal(touched[0].nextElement.tagName, 'div')

  t.equal(touched[1].tagName, 'div')
  t.equal(touched[1].nextElement, null)
})
