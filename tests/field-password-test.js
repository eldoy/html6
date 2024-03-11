var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/field-password.html')

var result = html6(markup)

var want = `\${$.app.form.password` +
  `($, { ` +
  `name: 'hello'` +
  ` })}`

assert.equal(result, want)
