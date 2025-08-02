# TODO

### Options

- [ ] validate - do prepass to check errors

- [ ] filters
  - string or string array: wrap expressions in these
  - function: callback
  - filters: ['esc']

- [ ] transform node
  - callback for node in dispatch
  - return undefined, do nothing
  - return null, continue
  - return node, return

### Features

- [ ] Error handling: See /docs/ERRORS.md

- [ ] disabled="false" or disabled="${false}" removes the attribute

var booleanAttributes = [
  "disabled",
  "checked",
  "readonly",
  "required",
  "multiple",
  "selected",
  "autofocus",
  "hidden",
  "novalidate",
  "formnovalidate",
  "open",
  "controls",
  "loop",
  "muted",
  "default",
  "reversed",
  "scoped",
  "seamless",
  "async",
  "defer",
  "itemscope",
  "nomodule",
  "inert"
]

### Next

- [ ] Default prop values?
- [ ] Force prop values?
