var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/if.html')

var result = html6(markup)

var want = '${(function () {\n' +
  '  if (bobby) {\n' +
  '    return `<div>Bobby is nice</div>`\n' +
  '  }\n' +
  "  return ''\n" +
  '})()}\n'

assert.equal(result, want)
