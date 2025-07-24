# TODO

- [ ] Multiple literals in attributes and text content?


### Current

- [x] Use <template is=""> instead of <template id="">
- [x] Replace @nodedk/spec with spekk
- [x] Remove .npmrc
- [x] Inline templates
- [ ] Escaping: Run npm run test:watch escape and make them pass

- [ ] Error handling: See /docs/ERRORS.md

- [ ] Write README.md file with full docs
  - all syntax must be shown with examples

- [ ] Release as html6

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
