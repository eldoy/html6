var { parse, stringify } = require('persille')

function toPascalCase(str = '') {
  return str.replace(/(^\w|-\w)/g, function (str) {
    return str.replace(/-/, '').toUpperCase()
  })
}

function parameterize(attributes = []) {
  return attributes.map((att) => `${att.key}: '${att.value}'`).join(', ')
}

function getAttribute(node, key) {
  return (node.attributes || []).find((x) => x.key == key) || {}
}

function getChild(node, key) {
  return (node.children || [])[0] || {}
}

function getOptions(node) {
  var options = []
  node.children
    .filter((x) => x.type == 'element')
    .forEach(function (child) {
      var value = getAttribute(child, 'value').value || ''
      var text = getChild(child).content || ''
      options.push(`{ ${value}: '${text}' }`)
    })
  return options.length ? `[${options.join(', ')}]` : ''
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

  var signature = `${nameAttribute.value}(${withAttribute.value || ''})`

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

  node.children = []
  node.content =
    '<script>\n' +
    `\${(function ${signature} {\n` +
    `  return \`${block}\`\n` +
    '})()}\n' +
    '</script>'
  node.type = 'text'
}

tags.field = function (node) {
  var typeAttribute = getAttribute(node, 'type')
  if (!Object.keys(typeAttribute).length) {
    typeAttribute = { key: 'type', value: 'text' }
  }

  node.attributes = (node.attributes || []).filter((x) => x.key != 'type')

  var attributes = parameterize(node.attributes)

  var options = getOptions(node)

  node.content =
    `\${$.app.form.${typeAttribute.value}` +
    `($, { ` +
    attributes +
    (options.length ? `, options: ${options}` : '') +
    ` })}`
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
