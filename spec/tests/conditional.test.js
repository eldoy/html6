var conditional = require('../../lib/conditional.js')

test('if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if - backticks', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: '`hello' }]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>\\`hello</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if - dollar', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: '${hello}' }]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>\\${hello}</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if - backslashes', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: '\\{{hello}}' }]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>{{hello}}</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if - value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: '{{hello}}' }]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    `    return \`<div>${maskLiteral}</div>\``,
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_1_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskLiteral)
  t.equal(value, 'hello')
})

test('if - empty value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: '{{}}' }]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div></div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if - everything', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [
      { type: 'text', content: '`hello ${hello} \\{{hello}} {{hello}}' }
    ]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var maskLiteral = '__::MASK_literal_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>\\`hello \\${hello} {{hello}} ' + maskLiteral + '</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_1_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskLiteral)
  t.equal(value, 'hello')
})

test('if elsif', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'bye' }],
      children: [{ type: 'text', content: 'bye' }]
    }
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    '  else if (bye) {',
    '    return `<div>bye</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'else' }],
      children: [{ type: 'text', content: 'bye' }]
    }
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    '  else {',
    '    return `<div>bye</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if elsif else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [{ type: 'text', content: 'hello' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'bye' }],
      children: [{ type: 'text', content: 'bye' }],
      nextElement: {
        type: 'element',
        tagName: 'div',
        attributes: [{ key: 'else' }],
        children: [{ type: 'text', content: 'other' }]
      }
    }
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    '    return `<div>hello</div>`',
    '  }',
    '  else if (bye) {',
    '    return `<div>bye</div>`',
    '  }',
    '  else {',
    '    return `<div>other</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if elsif elsif', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'a' }],
    children: [{ type: 'text', content: 'A' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'b' }],
      children: [{ type: 'text', content: 'B' }],
      nextElement: {
        type: 'element',
        tagName: 'div',
        attributes: [{ key: 'elsif', value: 'c' }],
        children: [{ type: 'text', content: 'C' }]
      }
    }
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (a) {',
    '    return `<div>A</div>`',
    '  }',
    '  else if (b) {',
    '    return `<div>B</div>`',
    '  }',
    '  else if (c) {',
    '    return `<div>C</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if elsif elsif else', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'a' }],
    children: [{ type: 'text', content: 'A' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'b' }],
      children: [{ type: 'text', content: 'B' }],
      nextElement: {
        type: 'element',
        tagName: 'div',
        attributes: [{ key: 'elsif', value: 'c' }],
        children: [{ type: 'text', content: 'C' }],
        nextElement: {
          type: 'element',
          tagName: 'div',
          attributes: [{ key: 'else' }],
          children: [{ type: 'text', content: 'D' }]
        }
      }
    }
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (a) {',
    '    return `<div>A</div>`',
    '  }',
    '  else if (b) {',
    '    return `<div>B</div>`',
    '  }',
    '  else if (c) {',
    '    return `<div>C</div>`',
    '  }',
    '  else {',
    '    return `<div>D</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_0_::__'
  t.equal(content, expectedContent)
})

test('if elsif elsif else - everything', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'a' }],
    children: [{ type: 'text', content: '`A ${A} \\{{A}} {{A}}' }],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'b' }],
      children: [{ type: 'text', content: '`B ${B} \\{{B}} {{B}}' }],
      nextElement: {
        type: 'element',
        tagName: 'div',
        attributes: [{ key: 'elsif', value: 'c' }],
        children: [{ type: 'text', content: '`C ${C} \\{{C}} {{C}}' }],
        nextElement: {
          type: 'element',
          tagName: 'div',
          attributes: [{ key: 'else' }],
          children: [{ type: 'text', content: '`D ${D} \\{{D}} {{D}}' }]
        }
      }
    }
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var maskLiteralA = '__::MASK_literal_0_::__'
  var maskLiteralB = '__::MASK_literal_1_::__'
  var maskLiteralC = '__::MASK_literal_2_::__'
  var maskLiteralD = '__::MASK_literal_3_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (a) {',
    '    return `<div>\\`A \\${A} {{A}} ' + maskLiteralA + '</div>`',
    '  }',
    '  else if (b) {',
    '    return `<div>\\`B \\${B} {{B}} ' + maskLiteralB + '</div>`',
    '  }',
    '  else if (c) {',
    '    return `<div>\\`C \\${C} {{C}} ' + maskLiteralC + '</div>`',
    '  }',
    '  else {',
    '    return `<div>\\`D \\${D} {{D}} ' + maskLiteralD + '</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_4_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskLiteralA)
  t.equal(value, 'A')

  var value = opt.store.get(maskLiteralB)
  t.equal(value, 'B')

  var value = opt.store.get(maskLiteralC)
  t.equal(value, 'C')

  var value = opt.store.get(maskLiteralD)
  t.equal(value, 'D')
})

test('nested if', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [
      {
        type: 'element',
        tagName: 'span',
        attributes: [{ key: 'if', value: 'bye' }],
        children: [{ type: 'text', content: 'bye' }]
      }
    ]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var maskInnerConditional = '__::MASK_if_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    `    return \`<div>${maskInnerConditional}</div>\``,
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_1_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskInnerConditional)
  var expectedVal = [
    '(function () {',
    '  if (bye) {',
    '    return `<span>bye</span>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(value, expectedVal)
})

test('nested if elsif', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [
      {
        type: 'element',
        tagName: 'span',
        attributes: [{ key: 'if', value: 'bye' }],
        children: [{ type: 'text', content: 'bye' }],
        nextElement: {
          type: 'element',
          tagName: 'div',
          attributes: [{ key: 'elsif', value: 'hi' }],
          children: [{ type: 'text', content: 'hi' }]
        }
      }
    ]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var maskInnerConditional = '__::MASK_if_0_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    `    return \`<div>${maskInnerConditional}</div>\``,
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_1_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskInnerConditional)
  var expectedVal = [
    '(function () {',
    '  if (bye) {',
    '    return `<span>bye</span>`',
    '  }',
    '  else if (hi) {',
    '    return `<div>hi</div>`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(value, expectedVal)
})

test('nested if elsif - value', async ({ t }) => {
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'hello' }],
    children: [
      {
        type: 'element',
        tagName: 'span',
        attributes: [{ key: 'if', value: 'bye' }],
        children: [{ type: 'text', content: '{{bye}}' }],
        nextElement: {
          type: 'element',
          tagName: 'div',
          attributes: [{ key: 'elsif', value: 'hi' }],
          children: [{ type: 'text', content: '{{hi}}' }]
        }
      }
    ]
  }

  var opt = { store: new Map() }

  conditional(node, opt)

  var maskLiteral1 = '__::MASK_literal_0_::__'
  var maskLiteral2 = '__::MASK_literal_1_::__'
  var maskInnerConditional = '__::MASK_if_2_::__'

  var content = node.content
  var value = opt.store.get(content)

  var expectedVal = [
    '(function () {',
    '  if (hello) {',
    `    return \`<div>${maskInnerConditional}</div>\``,
    '  }',
    "  return ''",
    '})()'
  ].join('\n')
  t.equal(value, expectedVal)

  var expectedContent = '__::MASK_if_3_::__'
  t.equal(content, expectedContent)

  var value = opt.store.get(maskInnerConditional)
  var expectedVal = [
    '(function () {',
    '  if (bye) {',
    `    return \`<span>${maskLiteral1}</span>\``,
    '  }',
    '  else if (hi) {',
    `    return \`<div>${maskLiteral2}</div>\``,
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(value, expectedVal)

  var value = opt.store.get(maskLiteral1)
  t.equal(value, 'bye')

  var value = opt.store.get(maskLiteral2)
  t.equal(value, 'hi')
})
