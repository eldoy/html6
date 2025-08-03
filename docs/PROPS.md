New syntax for passing props:

<card projects="hello"> - string
<card projects="{{5}}"> - number
<card projects="{{true}}"> - bool
<card projects="{{projects}}"> - value

These are all valid HTML.


It's possible to implement PropTypes:

```html
<template is="card" title="string">
```

This would allow default type and dynamic type checking and conversion.

This is a future feature for now, and types are now optional, and serve only for documentation purposes.

It can be implemented by adding a `props` field to the option component data:

```js
var opt = {
  components: {
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
1. Require all props to be defined with basic types.

2. Set defaults for deconstructed values based prop types.

The available types with default values are:
- string ('')
- number (0)
- date (null)
- bool (false)
- object ({})
- array ([])
