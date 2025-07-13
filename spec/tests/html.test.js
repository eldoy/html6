var parser = require('himalaya')
var html = require('../../index.js')

test('if elsif', async ({ t }) => {
  var source = /* HTML */ `
    <div if="hello">hello</div>
    <div elsif="bye">bye</div>
  `

  var render = html().compile(source)
  var result = render({ hello: true, bye: false })

  var root = parser.parse(result)

  // Uncomment for testing
  // console.log(result)
  // console.log(JSON.stringify(root, null, 2))

  var elements = root.filter((x) => x.type == 'element')

  // console.log(elements)

  t.equal(elements.length, 1)
})

test('if else', async ({ t }) => {
  var source = /* HTML */ `
    <div if="hello">
      <span>child</span>
    </div>
    <div else>
      <span> Else </span>
    </div>
  `

  var render = html().compile(source)
  var result = render({ hello: true })

  var root = parser.parse(result)

  // Uncomment for testing
  // console.log(result)
  // console.log(JSON.stringify(root, null, 2))

  var elements = root.filter((x) => x.type == 'element')

  t.equal(elements.length, 1)
})
