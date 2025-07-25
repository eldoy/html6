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

var renderer = html6.compile(<h1>Hello</h1>)
var result = renderer.render() // "<h1>Hello</h1>"
```

### Data interpolation

HTML6 allows dynamic data injection using placeholders wrapped in `{}` or `{{}}`.

- `{}` escapes HTML by default, preventing unsafe code from being rendered.
- `{{}}` outputs unescaped HTML, allowing raw HTML content to be inserted.

```js
var html6 = require('html6')

var safeRenderer = html6.compile('<h1>{title}</h1>')
var safeResult = safeRenderer.render({ title: '<b>Hello</b>' })
// "<h1>&lt;b&gt;Hello&lt;/b&gt;</h1>"

var rawRenderer = html6.compile('<h1>{{title}}</h1>')
var rawResult = rawRenderer.render({ title: '<b>Hello</b>' })
// "<h1><b>Hello</b></h1>"
```

### Pipes functions

HTML6 supports pipe functions to transform data directly within templates. Pipes are defined as functions in the pipes option and are applied using the | symbol.

- Arguments on pipes are allowed as well, (e.g., truncate n=20) to control their behavior before rendering the final output.

```js
var html6 = require('html6')

var pipes = {
  capitalize: () => {
    /* ... */
    return capitalizedText
  }
}

var renderer = html6.compile('<h1>{ title | capitalize }</h1>', { pipes })
var result = renderer.render({ title: 'awesome page' })
// "<h1>Awesome page</h1>"

var pipes = {
  truncate: ({ n }) => {
    /* ... */
    return truncatedText
  }
}

// prettier-ignore
var renderer = html6.compile('<h3>{ title | truncate n=10 }</h3>', { pipes })
var result = renderer.render({ title: 'This is an awesome page' })
// "<h3>This is an...</h3>"
```

### Conditional flow

HTML6 supports conditional rendering through attributes like `if`, `elsif`, and `else`. These attributes determine which elements are included in the output based on the data passed to the `render` function.

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

```html
<ul>
  <li map="item of items">{ item.name }</li>
  <li map="item, index of items">{ index }: { item.name }</li>
</ul>
```

```js
var html6 = require('html6')
var fs = require('fs')

var itemsPage = fs.readFileSync('items.html', 'utf8')

var renderer = html6.compile(itemsPage)
var result = renderer.render({ items: [{ name: 'John' }] })
```

```html
<!-- Output -->
<ul>
  <li>John</li>
  <li>1: John</li>
</ul>
```

### Components

HTML6 supports reusable components defined with the `<template is="name">` tag. These components can be used as custom elements in other templates, with data passed in as props like `items="{items}"`.

```html
<!-- templates/items.html -->
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
var itemsTemplate = fs.readFileSync('templates/items.html', 'utf8')

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

HTML6 provides slot functionality to inject custom content into components. Named slots `(e.g., slot="header")` replace specific `<slot name="...">` placeholders, while an unnamed `<slot>` serves as the default content area.

```html
<!-- templates/layout.html -->
<template is="layout">
  <body>
    <slot name="header"><p>Default header slot</p></slot>
    <slot name="main"><p>Default main slot</p></slot>
    <slot><p>Default unnamed slot</p></slot>
  </body>
</template>
```

```html
<!-- home.html -->
<layout>
  <header slot="header">Custom header</header>
  <span>Custom span 1</span>
  <span>Custom span 2</span>
</layout>
```

```js
var html6 = require('html6')
var fs = require('fs')

var homePage = fs.readFileSync('home.html', 'utf8')
var layoutTemplate = fs.readFileSync('templates/layout.html', 'utf8')

var renderer = html6.compile(homePage, { components: [layoutTemplate] })
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

## License

MIT Licensed. Enjoy!
