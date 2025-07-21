# TODO

### Current

- [ ] Use <template is=""> instead of <template is="">
- [ ] Replace @nodedk/spec with spekk
- [ ] Remove .npmrc
- [x] Inline templates
- [ ] Default prop values?
- [ ] Force prop values?
- [ ] Escaping:
  - ./lib/escape.js needs to be added to every single string parsed
  - except manual transformers
    - slot
    - map, if, elsif, else
    - literals
  - this needs EXTENSIVE testing, every single use must be caught
- [ ] Error handling?
  - This slows down compile, but makes it more solid
    - missing template tag and id on components
    - elsif, else on if
    - map, if, elsif, else on component usage
    - map, if, elsif, else on slot tags
    - any attribute on slot tags except name
- [ ] Release as html6

### Next

- [ ] disabled="false" or disabled="${false}" removes the attribute?

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
];