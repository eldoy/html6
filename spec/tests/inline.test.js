var inline = require('../../lib/inline.js')

test('with templates', async ({ t }) => {
  var page = [
    '<div class="main">',
    '  <h1>Hello World</h1>',
    '</div>',
    '',
    '<p>Some other content here.</p>',
    '',
    '<template is="card">',
    '  <div class="card">A simple card</div>',
    '</template>',
    '',
    '<template is="user-profile">',
    '  <div class="profile">',
    '    <span>user</span>',
    '  </div>',
    '</template>'
  ].join('\n')

  var expectedSource = [
    '<div class="main">',
    '  <h1>Hello World</h1>',
    '</div>',
    '',
    '<p>Some other content here.</p>'
  ].join('\n')

  var expectedComponent1 = [
    '<template is="card">',
    '  <div class="card">A simple card</div>',
    '</template>'
  ].join('\n')

  var expectedComponent2 = [
    '<template is="user-profile">',
    '  <div class="profile">',
    '    <span>user</span>',
    '  </div>',
    '</template>'
  ].join('\n')

  var [source, components] = inline(page)

  t.equal(source, expectedSource)
  t.equal(components.length, 2)
  t.equal(components[0], expectedComponent1)
  t.equal(components[1], expectedComponent2)
})

test('without templates', async ({ t }) => {
  var page = [
    '<div>',
    '    <p>This is a page with no templates.</p>',
    '</div>'
  ].join('\n')

  var [source, components] = inline(page)

  t.equal(source, page)
  t.equal(components.length, 0)
})
