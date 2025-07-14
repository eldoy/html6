var map = require('./map.js')
var flow = require('./flow.js')
var parser = require('./parser.js')

var keys = ['map', 'if', 'elsif', 'else']

function visit(node, opt = {}) {
  var atts = node.attributes || []

  var content = null

  if (atts.length && node.type == 'element') {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]

      for (var j = 0; j < atts.length; j++) {
        var attr = atts[j]

        if (attr.key == key) {
          if (key == 'map') {
            node.compiled = map(node)
            return
          }
          if (key == 'if') {
            node.compiled = flow(node)
            return
          }
          if (key == 'elsif' || key == 'else') {
            node.compiled = ''
            return
          }
        }
      }
    }
  }

  node.compiled = parser.stringify(node)
}

module.exports = visit
