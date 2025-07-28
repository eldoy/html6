# HTML6

HTML6 is a next-generation template language that compiles extended HTML syntax into optimized JavaScript functions for fast content rendering.

## How is it different?

It combines the familiarity of HTML with powerful features inspired by modern frameworks like `React (components)`, `VueJS (logic handling)`, and `Mustache (data binding)`, without requiring any client-side library.

## Why choose it?

It lets you write clean, maintainable templates that include control flow, data injection, and reusable components. These templates compile into efficient JavaScript functions designed for high-performance rendering.

## Features

- **Extended HTML**: Add logic with simple attributes, e.g., `if`, `elsif`, `else`, `map`.
- **Pipe Functions**: Transform data inline using custom pipes, e.g., `{ title | capitalize }`.
- **Components**: Build reusable custom tags with `props` and `slots`.
- **Data Injection**: Pass all data via the `render` function.

## Install

```
npm i html6
```

## Usage

### Basic HTML

You pass raw HTML into the `.compile` method, which returns an object containing a `.render` function that produces the final HTML output.

_The HTML6 compiler supports any valid HTML and compiles it into a renderer that outputs the processed HTML._

```js
var html6 = require('html6')

var renderer = html6.compile('<h1>Hello</h1>')
var result = renderer.render() // "<h1>Hello</h1>"
```

### Data interpolation

HTML6 allows dynamic data injection using placeholders wrapped in `{ ... }`.

- By default, content inside `{ ... }` is **not escaped**, meaning raw HTML will be rendered as-is.

  To ensure safety, data should manually be escaped with a `pipe function`.

```js
var html6 = require('html6')

var renderer = html6.compile('<h1>{title}</h1>')
var result = renderer.render({ title: '<b>Hello</b>' })
// "<h1><b>Hello</b></h1>"
```

### Pipe functions

HTML6 supports pipe functions to transform data directly within templates. Pipes are defined as functions in the pipes option and are applied using the `|` symbol.

- Pipe arguments are defined after the pipe name and can be **any valid JavaScript expression** (except function calls), which makes them very flexible.

  For example `{ hello | pipe {a: 1} | next [1, 2, 3] | litera 5 | withvar tile }`.

```js
var html6 = require('html6')

var pipes = {
  esc: () => {
    /* ... */
    return escapedText
  }
}

var renderer = html6.compile('<h1>{ title | esc }</h1>', { pipes })
var result = renderer.render({ title: '<em>awesome page</em>' })
// "&lt;b&gt;awesome page&lt;/b&gt;"

var pipes = {
  truncate: ({ n }) => {
    /* ... */
    return truncatedText
  }
}

var renderer = html6.compile('<h3>{ title | truncate {n: 10} }</h3>', { pipes })
var result = renderer.render({ title: 'This is an awesome page' })
// "<h3>This is an...</h3>"
```

### Conditional flow

HTML6 supports conditional rendering through attributes like `if`, `elsif`, and `else`. These attributes determine which elements are included in the output based on the data passed to the `render` function.

- The conditional arguments must be literal strings, not wrapped between `{...}`.

```html
<div if="user.loggedIn">Welcome</div>
<div elsif="user.isGuest">Guest</div>
<div else>Please log in</div>
```

```js
var html6 = require('html6')
var fs = require('fs')

var homePage = fs.readFileSync('home.html', 'utf8')

var renderer = html6.compile(homePage)
var result = renderer.render({ user: null })
// "<div>Please log in</div>"
```

### Loop flow

HTML6 provides a `map` attribute that loops through arrays, exposing each element as `item`. An optional `index` can be added after the coma like `map="item, index of items"`.

- Tags with `map` attributes can use `if` attributes at the same time.

```html
<ul>
  <li map="item, index of items">{ index }: { item.name }</li>
  <li map="p of projects" if="p.title.length > 0">{ p.title }</li>
</ul>
```

```js
var html6 = require('html6')
var fs = require('fs')

var itemsPage = fs.readFileSync('items.html', 'utf8')

var renderer = html6.compile(itemsPage)
var result = renderer.render({
  items: [{ name: 'John' }],
  projects: [{ title: 'Project A' }, { title: '' }]
})
```

```html
<!-- Output -->
<ul>
  <li>1: John</li>
  <li>Project A</li>
</ul>
```

### Components

HTML6 supports reusable components defined with the `<template is="name">` tag. These components can be used as custom elements in other templates, with data passed in as props like `items="{items}"`.

- The props passed to components must be between `{...}` to be taken as variable, otherwise it will interpreted as a string `(e.g. items="items")`.

```html
<!-- components/items.html -->
<template is="itemList">
  <ul>
    <li map="item of items">{item}</li>
  </ul>
</template>
```

```html
<!-- products.html -->
<div>
  <p>Items listed:</p>
  <itemList items="{items}"></itemList>
</div>
```

```js
var html6 = require('html6')
var fs = require('fs')

var productsPage = fs.readFileSync('products.html', 'utf8')
var itemsTemplate = fs.readFileSync('components/items.html', 'utf8')

var renderer = html6.compile(productsPage, { components: [itemsTemplate] })
var result = renderer.render({ items: [{ name: 'John' }] })
```

```html
<!-- Output -->
<div>
  <p>Items listed:</p>
  <ul>
    <li>John</li>
  </ul>
</div>
```

### Components with slots

HTML6 provides slot functionality to inject custom HTML content into components.

Slot tags can have default content within them that will be renderer if the slot is not called when using the component.

```html
<!-- components/layout.html -->
<template is="layout">
  <body>
    <main>
      <slot>Slot fallback content</slot>
    </main>
  </body>
</template>
```

```html
<!-- home.html -->
<layout>
  <div>Main content</div>
</layout>
```

```js
var html6 = require('html6')
var fs = require('fs')

var homePage = fs.readFileSync('home.html', 'utf8')
var layoutComponent = fs.readFileSync('components/layout.html', 'utf8')

var renderer = html6.compile(homePage, { components: [layoutComponent] })
var result = renderer.render()
```

```html
<!-- Output -->
<body>
  <header>Custom header</header>
  <p>Default main slot</p>
  <span>Custom span 1</span>
  <span>Custom span 2</span>
</body>
```

## Scope Rules

There is no "named scope" in HTML6. All variables are shared across the template, and components or loops do not create their own variable contexts. This design simplifies data access but requires avoiding overlapping variable names.

## License

MIT Licensed. Enjoy!
