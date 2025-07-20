# TODO

- [ ] Replace @nodedk/spec with spekk
- [ ] Remove .npmrc
- [ ] Inline templates
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