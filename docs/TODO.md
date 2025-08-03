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
- [ ] Force prop values?
  - with strict: true option it can throw
- [ ] Default prop values?
  - works well with strict: true
  - limits ? usage