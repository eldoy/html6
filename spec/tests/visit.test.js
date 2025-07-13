var visit = require('../../lib/visit.js')
var parser = require('himalaya')

test('node', async ({ t }) => {
  var source = '<div>hello</div>'
  var node = parser.parse(source)

  visit(node)

  t.equal(node.compiled, '<div>hello</div>')
})

test('text', async ({ t }) => {
  var source = 'hello'
  var node = parser.parse(source)

  visit(node)

  t.equal(node.compiled, 'hello')
})

test('if', async ({ t }) => {
  var source = /* HTML */ ` <div if="hello">hello</div> `

  var renderer = html().compile(source)
  var result = renderer.render({ hello: true })

  var root = parser.parse(result)

  // Uncomment for testing
  // console.log(result)
  // console.log(JSON.stringify(root, null, 2))

  var elements = root.filter((x) => x.type == 'element')

  t.equal(elements.length, 1)

  var el = elements[0]
  t.equal(el.tagName, 'div')
  t.equal(el.attributes.length, 0)

  t.equal(el.children.length, 1)

  var child = el.children[0]
  t.equal(child.type, 'text')
  t.equal(child.content, 'hello')
})

// test('if elsif', async ({ t }) => {
//   var source = /* HTML */ `
//     <div if="hello">hello</div>
//     <div elsif="bye">bye</div>
//   `

//   var renderer = html().compile(source)
//   var result = renderer.render({ hello: true, bye: false })

//   var root = parser.parse(result)

//   // Uncomment for testing
//   // console.log(result)
//   // console.log(JSON.stringify(root, null, 2))

//   var elements = root.filter((x) => x.type == 'element')

//   console.log(elements)

//   t.equal(elements.length, 1)
// })

// test('if else', async ({ t }) => {
//   var source = /* HTML */ `
//     <div if="hello">
//       <span>child</span>
//     </div>
//     <div else>
//       <span> Else </span>
//     </div>
//   `

//   var renderer = html().compile(source)
//   var result = renderer.render({ hello: true })

//   var root = parser.parse(result)

//   // Uncomment for testing
//   // console.log(result)
//   // console.log(JSON.stringify(root, null, 2))

//   var elements = root.filter((x) => x.type == 'element')

//   t.equal(elements.length, 1)
// })
