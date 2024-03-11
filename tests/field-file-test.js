var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/field-file.html')

var result = html6(markup)

var want = `\${$.app.form.file` +
  `($, { ` +
  `name: 'hello'` +
  ` })}`

assert.equal(result, want)
