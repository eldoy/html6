var { parse, stringify } = require('persille')

function walk(nodes, callback) {
  for (var node of nodes) {
    callback(node)
    if (node.children) {
      walk(node.children, callback)
    }
  }
}

var tags = {}

tags.map = function (node, value) {
  var [name, type, ref] = value.split(' ')
  node.content = [
    `\${${ref}.map(function(${name}) {`,
    `return \`${stringify([node])}\``,
    `}).join('\\n')}`
  ].join('\n')
}

tags.if = function (node, value) {
  node.content = [
    `\${(function () {`,
    `  if (${value}) {`,
    `    return \`${stringify([node])}\``,
    `  }`,
    `  return ''`,
    `})()}`
  ].join('\n')
}

module.exports = function html6(html) {
  var dom = parse(html)

  // Walk all nodes and update them
  walk(dom, function (node) {
    if (node.type == 'element') {
      var atts = node.attributes
      node.attributes = atts.filter((x) => !tags[x.key])
      atts.forEach(function (a, i) {
        var { key, value } = a
        if (tags[key]) {
          tags[key](node, value)
          node.type = 'text'
        }
      })
    }
  })

  return stringify(dom)
}
