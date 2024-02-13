var { parse, stringify } = require('himalaya')

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
    `\`${stringify([node])}\``,
    `}).join('\n')}`
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

// {"type":"text","content":"hello"}
// {
//   "type": "element",
//   "tagName": "div",
//   "attributes":[{"key":"class","value":"title"}],
//   "children":[]
// }
module.exports = function html6(html) {
  console.time('parse')
  var dom = parse(html)
  // console.log(dom)

  // Walk all nodes and update them
  walk(dom, function (node) {
    // console.log(JSON.stringify(node))
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

  var html = stringify(dom)
  console.timeEnd('parse')

  return html
}
