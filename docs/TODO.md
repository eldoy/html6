# TODO

### Current

- [x] Use <template is=""> instead of <template id="">
- [x] Replace @nodedk/spec with spekk
- [x] Remove .npmrc
- [x] Inline templates
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

- [ ] Default prop values?
- [ ] Force prop values?

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