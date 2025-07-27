var html = require('../index.js')
var mustache = require('mustache')
var fs = require('fs')

var mustacheFile = fs.readFileSync('./test/page.mustache', 'utf8')
var htmlFile = fs.readFileSync('./test/page.html', 'utf8')

var items = []
for (var i = 1; i <= 100000; i++) {
  items.push({
    id: i,
    name: 'Item ' + i,
    value: 'Value ' + i * 10,
    description: 'Description for item ' + i
  })
}

var data = {
  pageTitle: 'Large Dataset Page',
  header: 'Data Overview',
  items: items
}

// Render mustache
console.time('load :: mustache :: total')
var output = mustache.render(mustacheFile, data)
console.timeEnd('load :: mustache :: total')

// Output result
// console.log(output)

// Render HTML6
console.time('load :: html6 :: total')
console.time('load :: html6 :: compile')
var renderer = html.compile(htmlFile)
console.timeEnd('load :: html6 :: compile')
console.time('load :: html6 :: render')
var output = renderer.render(data)

// console.log(output)

console.timeEnd('load :: html6 :: render')
console.timeEnd('load :: html6 :: total')
