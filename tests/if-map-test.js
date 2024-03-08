var assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/templates/if-map.html')

var result = html6(markup)

var want = '${(function () {\n' +
  '  if (products.length) {\n' +
  '    return `${products.map(function(product) {\n' +
  'return `<div class="product">\n' +
  '  <span>${product.name}</span>\n' +
  '</div>`\n' +
  "}).join('\\n" +
  "')}`\n" +
  '  }\n' +
  "  return ''\n" +
  '})()}\n'

assert.equal(result, want)
