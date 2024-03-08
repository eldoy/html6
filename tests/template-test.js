var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/template.html')

var result = html6(markup)

var want = '<script>\n' +
  '${(function renderHello() {\n' +
  '  return `<div>Hello</div>`\n' +
  '})()}\n' +
  '</script>\n'

assert.equal(result, want)
