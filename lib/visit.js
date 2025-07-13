var map = require('./map.js')
var flow = require('./flow.js')
var tag = require('./tag.js')

function visit(node, opt = {}) {
  node.compiled = tag(node)

  // if (node.skip) return
  // if (node.type == 'element') {
  //   var content = map(node) ?? flow(node)
  //   if (typeof content == 'string') {
  //     node.type = 'text'
  //     node.content = content
  //   }
  // }
  // if (node.type == 'text') {
  //   node.compiled = tag(node)
  // }
}

module.exports = visit
