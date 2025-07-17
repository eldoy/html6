# TODO

- [ ] Get rid of node.compiled, replace with node content
- [ ] Create a content.js function to convert element to text
  - node.content = content(tag(node))
- [ ] Refactor element to text for flow, map and slot
- [ ] Inline templates
- [ ] Named slots
- [ ] Slot defaults

### New General Concepts

1. Require all pages to be wrapped in <template> tag.
  - Use page name as id.
  - id as attribute is reserved
  - first template is "main" template
  - first template cannot have slot

2. Require all props to be defined with basic types.

3. Get rid of "with", use deconstructor instead.

4. Set defaults for deconstructed values based prop types.

5. Do we need to register all props for template and merge them upwards to have access to parent scope?

6. New syntax for passing props

<card projects="projects">

is a bit weird, it'll just always be this, and cannot pass values.

<card projects="hello"> - string
<card projects=5> - number
<card projects=true> - bool
<card projects=projects> - value

These are all valid HTML.

7. if elsif else map must work on templates

<card if="something" map="project of projects">
<card elsif="somethingElse" map="project of projects" count=5>
<card else map="project of projects" count=2>
