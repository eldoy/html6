var { parse, stringify } = require('persille')

function toPascalCase(str = '') {
  return str.replace(/(^\w|-\w)/g, function (str) {
    return str.replace(/-/, '').toUpperCase()
  })
}

function getAttribute(node, key) {
  return node.attributes.find((x) => x.key == key) || {}
}

function walk(nodes, transform) {
  for (var node of nodes) {
    transform(node)
    if (node.children) {
      walk(node.children, transform)
    }
  }
}

var atts = {}

atts.map = function (node, value) {
  var [name, type, ref] = value.split(' ')
  node.content = [
    `\${${ref}.map(function(${name}) {`,
    `return \`${stringify([node])}\``,
    `}).join('\\n')}`
  ].join('\n')
  node.type = 'text'
}

atts.if = function (node, value) {
  node.content = [
    `\${(function () {`,
    `  if (${value}) {`,
    `    return \`${stringify([node])}\``,
    `  }`,
    `  return ''`,
    `})()}`
  ].join('\n')
  node.type = 'text'
}

var tags = {}

tags.render = function (node) {
  var nameAttribute = getAttribute(node, 'name')
  var withAttribute = getAttribute(node, 'with')

  var signature = [
    'render',
    toPascalCase(nameAttribute.value),
    `(${withAttribute.value || ''})`
  ].join('')

  node.content = `\${await ${signature}}`
  node.type = 'text'
}

tags.template = function (node) {
  var nameAttribute = getAttribute(node, 'name')
  var withAttribute = getAttribute(node, 'with')

  var signature = [
    'render',
    toPascalCase(nameAttribute.value),
    `(${withAttribute.value || ''})`
  ].join('')

  var block = html6(stringify(node.children).trim())

  node.content =
    '<script>\n' +
    `\${(function ${signature} {\n` +
    `  return \`${block}\`\n` +
    '})()}\n' +
    '</script>'
  node.type = 'text'
}

function html6(html, opt = {}) {
  var dom = parse(html)

  // Walk all nodes and update them
  walk(dom, function (node) {
    if (node.type == 'element') {
      if (typeof opt.ontransform == 'function') {
        opt.ontransform(node)
      }
      var tag = node.tagName
      if (tags[tag]) {
        tags[tag](node)
      }
      var attributes = node.attributes
      node.attributes = attributes.filter((x) => !atts[x.key])
      attributes.forEach(function (a, i) {
        var { key, value } = a
        if (atts[key]) {
          atts[key](node, value)
        }
      })
    }
  })

  return stringify(dom)
}

module.exports = html6
