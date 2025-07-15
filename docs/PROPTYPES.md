It's possible to implement PropTypes:

```html
<template id="card" title="string">
```

This would allow default type and dynamic type checking and conversion.

This is a future feature for now, and types are now optional, and serve only for documentation purposes.

It can be implemented by adding a `props` field to the option template data:

```js
var opt = {
  templates: {
    card: {
      fn,
      props: {
        name: 'string',
        project: 'object'
      }
    }
  }
}
```

The available types with default values are:
- string ('')
- number (0)
- date (null)
- bool (false)
- object ({})
- array ([])
