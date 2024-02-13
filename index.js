var { parse, stringify } = require('himalaya')

function walk(nodes, callback) {
  for (var node of nodes) {
    callback(node)
    if (node.children) {
      walk(node.children, callback)
    }
  }
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
      var a = node.attributes
      for (var i = 0; i < a.length; i++) {
        if (a[i].key == 'if') {
          var value = a[i].value
          delete a[i]
          node.content = [
            `\${(function () {`,
            `  if (${value}) {`,
            `    return \`${stringify([node])}\``,
            `  }`,
            `  return ''`,
            `})()}`
          ].join('\n')
          node.type = 'text'
        } else if (a[i].key == 'map') {
          var value = a[i].value
          delete a[i]
          var [name, type, ref] = value.split(' ')
          node.content = [
            `\${${ref}.map(function(${name}) {`,
            `\`${stringify([node])}\``,
            `}).join('\n')}`
          ].join('\n')
          node.type = 'text'
        }
      }
    }
  })

  var html = stringify(dom)
  console.timeEnd('parse')

  return html
}
