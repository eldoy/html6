var pipes = require('../../lib/pipes.js')

test('esc', async function ({ t }) {
  var result = pipes.esc('<div>hello</div>')
  t.equal(result, '&lt;div&gt;hello&lt;/div&gt;')
})
