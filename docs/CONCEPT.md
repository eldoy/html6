# HTML6 Concept

The generated functions are based on Javascript template strings.

This page:
```html
<card greeting="${greeting}"></card>
 ```

 with these components:
 ```html
<template id="card">
  <heading greeting="${greeting}"></heading>
</template>

<template id="heading">
  <div>${greeting}</div>
</template>
```

become this Javascript function:

```js
function anonymous(props, _) {
  with (props) {
    return `${(function anonymous(props, slots, _) {
      with (props) {
        return `${(function anonymous(props, slots, _) {
          with (props) {
            return `<div>${_.esc(greeting)}</div>`
          }
        })({ greeting: `${greeting}` }, {}, _)}`
      }
    })({ greeting: `${greeting}` }, {}, _)}`
  }
}
```
