const assert = require('hevd')
var { read } = require('extras')

var html6 = require('../index.js')

var markup = read('tests/data/map.html')

var result = html6(markup)

// <div class="product" map="product of products">
//   <span>${product.name}</span>
// </div>

var want = [
  `\${products.map(function(product) {`,
  `\`<div class='product'>`,
  `  <span>\${product.name}</span>`,
  `</div>\``,
  `}).join('\n')}\n`
].join('\n')

assert.equal(result, want)


