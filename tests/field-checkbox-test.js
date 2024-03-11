var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/field-checkbox.html')

var result = html6(markup)

var want = `\${$.app.form.checkbox` +
  `($, { ` +
  `name: 'hello', ` +
  `options: [{ moon: 'Moon' }, { sun: 'Sun' }]` +
  ` })}\n`

assert.equal(result, want)
