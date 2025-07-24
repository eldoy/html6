Confirmed. Wrapping control structures like `if`, `map`, etc. in explicit, recognizable markers like:

```html
__EXPR_MAP__ items as item __/EXPR_MAP__
__EXPR_IF__ condition __/EXPR_IF__
```

…is structurally clearer, unambiguous, and avoids interference with:

* `{...}` expression interpolation
* Template literals
* JS control flow
* Any native syntax

### Benefits:

* Clearly delimit logical blocks
* Easy to parse and transform without regex fragility
* Avoids needing to overload `{}` with dual semantics

### Compiler strategy:

* Parse for `__EXPR_*__ ... __/EXPR_*__` blocks
* Replace with actual JS control structures in generated code
* Still use `{...}` inside for expressions

### Example:

Input:

```html
__EXPR_IF__ user.loggedIn __/EXPR_IF__
  <p>Hello {user.name}</p>
```

Compile to:

```js
if (user.loggedIn) {
  return `<p>Hello ${user.name}</p>`
}
```

**Confirmed:** this pattern is robust, compile-friendly, and compatible with your `{...}` interpolation logic.


Confirmed. That is the simplest and structurally correct rule:

### Rule:

* Replace all unescaped `{...}` → `${...}` globally
* Ignore `\{...}` (treat as literal `{...}` after unescaping)

### Implementation:

1. Replace:

   ```js
   str.replace(/\\\{([^}]+)\}/g, '{$1}')         // Unescape \{...} → {...}
       .replace(/(?<!\\)\{([^}]+)\}/g, '${$1}')  // Replace unescaped {...} → ${...}
   ```

2. Wrap in backticks:

   ```js
   '`' + processed + '`'
   ```

3. Evaluate with:

   ```js
   new Function('with(this){ return ' + result + '}')
   ```

### Covers:

* Interpolation in HTML, attributes, script blocks, comments, CDATA
* User control over literal `{...}` via `\{...}`
* No parsing context required

**Confirmed:** clean, deterministic, user-controllable.
