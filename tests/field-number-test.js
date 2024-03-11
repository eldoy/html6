var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/field-number.html')

var result = html6(markup)

var want = `\${$.app.form.number` +
  `($, { ` +
  `name: 'hello'` +
  ` })}`

assert.equal(result, want)
