const assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/data/if.html')

var result = html6(markup)

var want = [
  '${(function () {',
  '  if (bobby) {',
  '    return `<div>Bobby is nice</div>`',
  '  }',
  '  return \'\'',
  '})()}'
].join('\n')

assert.equal(result, want)
