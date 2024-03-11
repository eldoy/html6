var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/field-bool.html')

var result = html6(markup)

var want = `\${$.app.form.bool` +
  `($, { ` +
  `name: 'hello'` +
  ` })}\n`

assert.equal(result, want)
