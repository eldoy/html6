I feel like we're trying to solve conditional problems in dispatch. Why don't we start over and let each file handle its own problems?

This way we can use LLM to fix the problems for us. Dispatch has too many imports, and the LLM doesn't understand what's going on.


If the escaping, literal expression and masking happens in the conditional.js file, then we don't have to worry about that in dispatch.

Then we do the same for map, slot and expand. After that we can delete most of the escape tests as they have been moved to each file instead. The only escape test we should have in there is the first one, for the function.


This is what the test would look like in conditional.test.js:

```js
test('if elsif - expression', async ({ t }) => {
  // <div if="false"></div><div elsif="true">{hello}</div>
  var node = {
    type: 'element',
    tagName: 'div',
    attributes: [{ key: 'if', value: 'false' }],
    children: [],
    nextElement: {
      type: 'element',
      tagName: 'div',
      attributes: [{ key: 'elsif', value: 'true' }],
      children: [{ type: 'text', content: '{hello}' }]
    }
  }

  var opt = { store: new Map() }

  var result = conditional(node, opt)

  var entry = opt.store.entries().next().value
  var [key, value] = entry

  t.equal(key, '__::MASK_if_0_::__')
  t.equal(value, 'hello')

  var expected = [
    '(function () {',
    '  if (false) {',
    '    return ``',
    '  }',
    '  else if (true) {',
    '    return `__::MASK_if_0_::__`',
    '  }',
    "  return ''",
    '})()'
  ].join('\n')

  t.equal(result, expected)
})
```

This is what dispatch should look like. We don't return anything from the functions there, we just send the nodes to each function, which is a dead end. The node is mutated anyway, so we isolate everything in each function, and also the tests:

```js
function dispatch(node, opt = {}) {
  var atts = node.attributes

  if (node.tagName == 'slot') {
    return slot(node, opt)
  }

  var component = opt.components && opt.components[node.tagName]
  if (component) {
    return expand(node, opt)
  }

  if (node.type == 'comment') {
    return comment(node, opt)
  }

  if (node.type == 'text') {
    return text(node, opt)
  }

  if (atts && atts.length) {
    var hasMap = atts.some((x) => x.key == 'map')
    if (hasMap) {
      return map(node, opt)
    }

    var hasIf = atts.some((x) => x.key == 'if')
    if (hasIf) {
      return conditional(node, opt)
    }

    var hasElse = atts.some((x) => x.key == 'elsif' || x.key == 'else')
    if (hasElse) {
      return empty(node, opt)
    }

    // Escape and mask attribute literals
    attrib(atts, opt)
  }

  return element(node, opt)
}

module.exports = dispatch
```

Move everything into each function. Move dispatch tests into corresponding file.

The only things that should be in the dispatch test is to make sure it's calling the functions, we don't really care about the result in dispatch, that is handled in each function.

This new dispatch has a few new functions:

- comment
- empty
- attrib
- element

And one function that should be rewritten completely:

- text

All existing functions should now receive node + opt, opt is used for masking.

This is basically a rewrite, and I don't think we're going to merge it. I would just do file by file, and not care about the overall green state.

1. Use the feature/double-brace branch, it already has literal and expression rewritten to use double braces.

2. Start from the top with the new dispatch, file by file, include masking and double braces immediately:

- slot
- expand
- comment
- text
- map
- conditional
- empty
- attrib
- element

Then after that remove the escape tests, redo the dispatch test, and then the rest etc.. with double braces and the works.

I think this is the fastest path to finishing this.


Your questions:

1. Yes, all separate files, with their own test file. Each file tests for text, backticks (escaping) and literals (if eligible).

2. The text function will now return a text node, and not be a utility function for converting element nodes to text. You can rename the current "text" function to "content" or "flatten" or something, or just repeat the code everywhere where it's used. This version is not about performance or being DRY, it's about having something solid that works and is easy to work with.
