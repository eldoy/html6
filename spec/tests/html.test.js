var parser = require('../../lib/parser.js')
var html = require('../../index.js')

test('simple template', async ({ t }) => {
  var source = '<card></card>'
  var template = '<template id="card"><div>hello</div></template>'
  var opt = { templates: [template] }

  var renderer = html.compile(source, opt)

  var result = renderer.render()

  t.equal(result, '<div>hello</div>')
})
