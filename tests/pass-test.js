var assert = require('hevd')
var html6 = require('../index.js')
var { read } = require('extras')

var markup = read('tests/data/pass.html')

var result = html6(markup)
assert.equal(result, markup)
