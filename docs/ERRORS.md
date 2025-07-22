Static analysis—checking for errors before any code is executed—can catch a huge number of common mistakes.

Based on your library's features, here is a comprehensive list of user errors you can validate before the compilation step.

### Pre-Compilation Validation Checklist

#### Component & Template Structure
- [ ] **Missing `is` attribute on `<template>`:** Every component definition must start with `<template is="...">`.
- [ ] **Empty `is` attribute:** The `is` attribute cannot be empty (`is=""`).
- [ ] **Invalid component name in `is`:** Enforce a valid naming convention (e.g., must contain a hyphen, cannot be a single word, no special characters).
- [ ] **Duplicate component definitions:** Two `<template>` tags define the same component name (`is="my-card"`).
- [ ] **Nested component definitions:** A `<template is="...">` tag is found inside another `<template is="...">` block.
- [ ] **Root-level text or elements:** The source for a component definition contains more than one root-level element or contains text outside the single root element. (e.g., `text<template is="..">` or `<template...><template...>` in the same file).

#### Control Flow Logic (`if`/`elsif`/`else` and `map`)
- [ ] **Orphaned `elsif` or `else`:** An element with an `elsif` or `else` attribute is not immediately preceded by an element with `if` or `elsif`.
- [ ] **Invalid `if`/`elsif`/`else` ordering:** An `if` comes after an `elsif` or `else` in the same conditional chain, or an `else` comes before an `elsif`.
- [ ] **Multiple `else` directives:** More than one `else` is chained to the same `if`.
- [ ] **Non-element node between chain links:** There is text (other than whitespace) or a non-element node between two tags in a conditional chain (e.g., `<div if></div> some text <div else></div>`).
- [ ] **Mutually exclusive directives:** The same element has both an `if` (or `elsif`/`else`) and a `map` attribute.
- [ ] **Directives on `<template>` definition:** A `<template is="...">` tag has an `if`, `map`, `elsif`, or `else` attribute. These directives are for component *usage*, not definition.
- [ ] **Malformed `map` expression:** The value of a `map` attribute does not match the expected `item in items` or `(item, index) in items` format.

#### Slot Usage
- [ ] **Directives on `<slot>` tags:** A `<slot>` tag has an `if`, `map`, `elsif`, or `else` attribute.
- [ ] **Duplicate default (unnamed) slots:** A component definition contains more than one `<slot>` tag without a `name` attribute.
- [ ] **Duplicate named slots:** A component definition contains more than one `<slot>` with the same `name`.
- [**Strict**] **Unsupported attributes on `<slot>`:** A `<slot>` tag has any attribute other than `name`.

#### General Syntax & Attribute Validation
- [ ] **Invalid JavaScript in dynamic expressions:** The code inside a `${...}` block is not a valid JavaScript expression (this might be better caught by the `new Function` constructor, but a simple linter could catch common mistakes).
- [ ] **Dynamic tag names:** A tag name itself is dynamic (e.g., `<${tagName}>`). This is a potential security risk and a sign of bad practice, so it's good to disallow it.
- [ ] **Duplicate attributes on a single element:** The same attribute (e.g., `class`) appears more than once on the same tag.
- [ ] **Unclosed tags or mismatched tags:** The basic HTML structure is not well-formed (often handled by the underlying parser, but worth verifying).
- [ ] **Unclosed attribute values:** An attribute value is missing its closing quote (e.g., `<div title="hello>`).

#### Pipe Syntax Validation
- [ ] **Unknown pipe name:** A pipe used in an expression (`${ data | unknownPipe }`) is not in the list of registered built-in or user pipes.
- [ ] **Malformed pipe syntax:** The pipe expression is syntactically incorrect (e.g., missing pipe name, extra characters).
- [ ] **Invalid JavaScript in pipe parameters:** The object literal passed as parameters to a pipe is not valid JavaScript (e.g., `... | myPipe { key: 'val', }`).
