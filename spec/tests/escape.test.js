var escape = require('../../lib/escape.js')
var compile = require('../../lib/compile.js')

test('function', async ({ t }) => {
  var input = 'value with `backtick`, ${dollar}, and \\backslash\\'
  var result = escape(input)
  var expected = 'value with \\`backtick\\`, \\${dollar}, and \\\\backslash\\\\'
  t.equal(result, expected)
})

test('Backtick in plain text content', async ({ t }) => {
  var page = '<div>Here is a literal backtick: `</div>'
  var expected = '<div>Here is a literal backtick: `</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Backslash in plain text content', async ({ t }) => {
  var page = '<div>This is a single backslash: \\</div>'
  var expected = '<div>This is a single backslash: \\</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

// TODO: Should be passing
x('${ in plain text content', async ({ t }) => {
  var page = '<div>This is an expression: \\${hello}</div>'
  var expected = '<div>This is an expression: \\${hello}</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Backtick in a static attribute', async ({ t }) => {
  var page = '<div title="This attribute\\`s value has a backtick"></div>'
  var expected = '<div title="This attribute\\`s value has a backtick"></div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Multiple backslashes in a static attribute', async ({ t }) => {
  var page = '<div data-path="C:\\Users\\Default\\"></div>'
  var expected = '<div data-path="C:\\Users\\Default\\"></div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Backtick inside a JS string in a dynamic attribute', async ({ t }) => {
  var page = '<div class="${`css-class-with-backtick-\\``}"></div>'
  var expected = '<div class="css-class-with-backtick-`"></div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Backtick in a ternary expression in a dynamic attribute', async ({
  t
}) => {
  var page =
    '<div data-value="${true ? `value with a \\` backtick` : `else`}"></div>'
  var expected = '<div data-value="value with a ` backtick"></div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Backslash in a JS string in a dynamic attribute', async ({ t }) => {
  // Note: In a JS template literal, 'C:\\\\Users' becomes 'C:\\Users' upon evaluation.
  var page = '<div data-path="${`C:\\\\Users\\\\Test`}"></div>'
  var expected = '<div data-path="C:\\Users\\Test"></div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Full ${} sequence inside a JS string in a dynamic attribute', async ({
  t
}) => {
  var page = '<div data-text="${`This is a fake \\${expression}`}"></div>'
  var expected = '<div data-text="This is a fake ${expression}"></div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

// TODO: Should be passing
x(
  'All characters mixed in static content and dynamic JS string',
  async ({ t }) => {
    var page =
      '<div>Static ` backtick and \\ slash and ${ not dynamic. Then dynamic: ${`JS ` backtick and \\\\ slash and fake ${expr}`}</div>'
    var expected =
      '<div>Static ` backtick and \\ slash and ${ not dynamic. Then dynamic: ${`JS ` backtick and \\\\ slash and fake ${expr}`}</div>'
    var renderer = compile(page)
    var result = renderer.render({})
    t.equal(result, expected)
  }
)

// TODO: Should be passing
x('Backtick in pipe parameters', async ({ t }) => {
  var page = '<div>${ "ignored" | echo { text: "hello ` world" } }</div>'
  var expected = '<div>hello ` world</div>'
  // This test assumes a pipe 'echo' that just returns a parameter.
  var pipes = {
    echo: function (val, params) {
      console.log(params)
      return params.text || ''
    }
  }
  var renderer = compile(page, { pipes })
  var result = renderer.render({})
  t.equal(result, expected)
})

// TODO: Should be passing
x('Backslash and ${ in pipe parameters', async ({ t }) => {
  var page =
    '<div>${ "ignored" | echo { text: "path is C:\\ and value is ${val}" } }</div>'
  var expected = '<div>path is C:\\ and value is ${val}</div>'
  var pipes = {
    echo: (val, params) => params.text || ''
  }
  var renderer = compile(page, { pipes })
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Pass string with backtick as prop to nested component', async ({ t }) => {
  var page = '<card dataInfo="${message}"></card>'
  var components = ['<template is="card"><div>${dataInfo}</div></template>']

  var props = {
    message: 'Here`s the info.'
  }
  var expected = '<div>Here`s the info.</div>'
  var renderer = compile(page, { components })
  var result = renderer.render(props)
  t.equal(result, expected)
})

test('Pass string with all special chars as prop to nested component', async ({
  t
}) => {
  var page = '<card dataInfo="${message}"></card>'
  var components = [
    '<template is="card"><div title="${dataInfo}">${dataInfo}</div></template>'
  ]
  var props = {
    message: 'A backtick `, a backslash \\, and a fake expr ${...}'
  }
  var expected =
    '<div title="A backtick `, a backslash \\, and a fake expr ${...}">A backtick `, a backslash \\, and a fake expr ${...}</div>'
  var renderer = compile(page, { components })
  var result = renderer.render(props)
  t.equal(result, expected)
})

// TODO: Should be passing
x('<script> tag content must be preserved exactly', async ({ t }) => {
  // The content of the script tag is valid JS, including a backtick in a comment
  // and a regex. Your parser must not touch any of it.
  var page = `<script>
  var greeting = 'hello'; // A comment with a \` backtick
  if (greeting.match(/h/)) {
    console.log(\`template literal \${greeting}\`);
  }
</script>`
  var renderer = compile(page)
  // The output should be identical to the input page.
  var result = renderer.render({})
  t.equal(result, page)
})

test('<style> tag content must be preserved exactly', async ({ t }) => {
  // CSS content can contain characters that might confuse a naive parser.
  var page = `<style>
  body::before {
    content: 'A \\\` backtick'; /* This was corrected */
    background: url('data:image/svg+xml;utf8,<svg ...></svg>');
  }
</style>`
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, page)
})

// TODO: Should be passing
x('HTML comments should be ignored', async ({ t }) => {
  // Problematic characters inside a comment should not break the compiler
  // or appear in the output.
  var page = '<div>Hello<!-- comment with ` and ${...} and \\ --></div>'
  var expected = '<div>Hello</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

// TODO: Should be passing
x(
  'Unrendered "if" block with problematic chars must compile',
  async ({ t }) => {
    // The 'else' branch contains a backtick. Even though it won't be rendered,
    // it exists in the generated JS function and must be escaped correctly.
    var page =
      '<div if="false">OK</div><div else>Not OK, here is a ` backtick</div>'
    var expected = '<div>Not OK, here is a ` backtick</div>'
    var renderer = compile(page)
    var result = renderer.render()
    t.equal(result, expected)
  }
)

// TODO: Should be passing
x('Data with problematic chars in a "map" loop', async ({ t }) => {
  // The data being passed in the props contains the backticks and backslashes.
  var page = '<ul><li map="item in items">${item}</li></ul>'
  var props = {
    items: [
      'Item with a ` backtick',
      'Item with a \\ backslash',
      'Item with a fake ${expr}'
    ]
  }
  var expected =
    '<ul><li>Item with a ` backtick</li><li>Item with a \\ backslash</li><li>Item with a fake ${expr}</li></ul>'
  var renderer = compile(page)
  var result = renderer.render(props)
  t.equal(result, expected)
})

// TODO: Should be passing
x('Default slot content with problematic chars', async ({ t }) => {
  // The <card> component is rendered without providing a slot, so the default
  // content of the slot (with the backtick) should be rendered.
  var page = '<card></card>'
  var components = [
    '<template is="card"><div><slot>Default with ` backtick</slot></div></template>'
  ]
  var expected = '<div><div>Default with ` backtick</div></div>'
  var renderer = compile(page, { components })
  var result = renderer.render({})
  t.equal(result, expected)
})

test('Regex literal inside a dynamic expression', async ({ t }) => {
  // The /\\`/ is a valid regex. The parser must not add extra escaping to the backslash.
  var page = '<div>Does it match? ${ /\\`/g.test("`") }</div>'
  var expected = '<div>Does it match? true</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

// TODO: Should be passing?
x('Complex nested template literal in dynamic expression', async ({ t }) => {
  var page = '<div>${`a ${true ? `b ` c` : "d"} e`}</div>'
  var expected = '<div>a b ` c e</div>'
  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})

// TODO: Should be passing?
x('CDATA section content must be preserved exactly', async ({ t }) => {
  // The content inside the CDATA block should be treated as completely raw text.
  // The parser must not look for expressions or escape any characters within it.
  var page =
    '<div><![CDATA[This content has a ` backtick, a \\ slash, and a fake ${expr} that should NOT be processed.]]></div>'

  // The expected result is the inner content of the CDATA block, verbatim.
  var expected =
    '<div>This content has a ` backtick, a \\ slash, and a fake ${expr} that should NOT be processed.</div>'

  var renderer = compile(page)
  var result = renderer.render({})
  t.equal(result, expected)
})
