# Introduction

This library compiles HTML6 templates into Javascript functions.

It it loosely inspired by React (for the components), VueJS (for the logic), and Mustache (for the data loading). You can not create variables inside of the templates, they must be passed into the the template through its render function.

# Compilation

The compile function receives the page, components (tags) and pipes.

The page and component can receive props (data), and pipes. Data is delivered through dependency injection. Components, unlike pages, can also recive slot data through the `<slot>` tag.

Certain tags and attributes trigger a transformation into Javascript functions, such as slots, if, elsif, else, map.

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

# Flow

1. The `compile` function is called, with page and options.
2. The components (if any), are then parsed and transpiled into functions.
3. User pipes are added to the built in ones.
4. The page is then parsed and transpiled.
5. The transpile function calls the build function, which processes the nodes of the parsed object tree bottom up.
6. Each node is passed into dispatch, which is the link to the different transformers working on each node.
7. Each node element, after transformation, is then converted into text nodes.
8. Once we have dispatched all nodes, we glue the root nodes together and create a callable function using new Function, the render function.
9. The render function can then be called, and takes dynamic data which is used to render the HTML.
