var assert = require('hevd')
var html6 = require('../index.js')
var { read } = require('extras')

var markup = read('tests/templates/render-with.html')

var result = html6(markup)

var want = '${await hello(product, products, i)}\n'

assert.equal(result, want)
