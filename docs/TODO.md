# TODO

- [ ] Change expressions to {{...}}, not {...}
- [ ] Unused slot returns "Undefined"?
- [ ] Create test for multiple slots in 1 component
- [ ] Spaces in slot should render fallback
- [ ] This fails: <div if="{true}">{title}</div>
  - Unexpected token true
  - Should we support both syntaxes?
  - Stripping {{}} is valid if:
    You treat if="{expr}" as equivalent to if="expr".
    The inner content is a valid JS expression.
    You apply this only in if, map, elsif, etc., not in interpolations.
- [ ] <div elsif="true">{title}</div> returns {title}
- [ ] <div else>{title}</div> returns {title}
- [ ] elsif without if, treat the first one as if
- [ ] else without if or elsif, just ignore the else

### Current

- [ ] Error handling: See /docs/ERRORS.md
- [ ] Write README.md file with full docs
  - all syntax must be shown with examples
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
