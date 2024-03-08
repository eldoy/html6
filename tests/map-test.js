var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/map.html')

var result = html6(markup)

var want = '${products.map(function(product) {\n' +
  'return `<div class="product">\n' +
  '  <span>${product.name}</span>\n' +
  '</div>`\n' +
  "}).join('\\n')}\n"

assert.equal(result, want)
