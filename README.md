# HTML6

HTML6 is a fast, modern templating language designed to extend static HTML5 with dynamic logic, without sacrificing performance or compatibility.

It compiles HTML templates into native JavaScript template literal functions—ideal for server-rendered apps and frameworks where you want full control over output and performance.

---

## Features

- Compiles to native JavaScript template literal functions
- Native-level performance, minimal overhead
- Server-side by design, works in browsers too
- Integrates with Web Components, HTMX, and all libraries
- Use valid `.html` files directly, no build required
- Fully supports Prettier, linters, and standard tooling
- Extendable via custom components and tag replacement
- Control logic via attributes: `if`, `elsif`, `else`, `map`
- Expressions via `{{...}}`
- Pipes with `|>` operator for safe expression transformation
- Works with Node.js, Bun, Deno
- Tiny footprint, nearly zero dependencies

---

## Install

```bash
npm i html6
````

---

## Basic Usage

```js
var html6 = require('html6')

var renderer = html6.compile('<h1>Hello</h1>')
var result = renderer.render({})
// Outputs: <h1>Hello</h1>
```

---

## Expressions

Use `{{...}}` to output scoped data.

```html
<h1>{{title}}</h1>
<p>{{project.name}}</p>
```

Escape literal brackets:

```html
\{{not evaluated}}
```

Function calls inside `{{...}}` are disabled for security. Use pipes instead.

---

## Pipes

Use `|>` to transform values.

Built-in:

```html
{{value |> esc}}
```

Custom pipes:

```js
var pipes = {
  truncate: function (x, len) {
    return String(x).slice(0, len)
  },
  upper: function (x) {
    return String(x).toUpperCase()
  }
}

var renderer = html6.compile('<p>{{title |> upper}}</p>', { pipes: pipes })
```

### Pipe Examples

```html
{{value |> esc |> truncate 2}}
{{name |> upper}}
{{msg |> truncate 10}}
{{price |> formatCurrency}}
{{number |> toFixed 2}}
{{date |> formatDate 'YYYY-MM-DD'}}
{{user.name |> upper |> truncate 5}}
{{list.length |> esc}}
{{value |> round 1 |> multiply 10}}
{{filename |> split '.' |> last}}
```

---

## Components

Define components with `<template is="...">`:

```html
<template is="card">
  <div class="card">
    <slot></slot>
  </div>
</template>
```

Use them like native tags:

```html
<card>
  <p>Hello from slot</p>
</card>
```

---

## Component Slots

Use `<slot></slot>` inside a component:

```html
<template is="box">
  <div class="box">
    <slot></slot>
  </div>
</template>
```

```html
<box><div>content</div></box>
```

---

## Component Props

Pass static, interpolated, or dynamic props:

```html
<template is="card">${title}</template>
```

Examples:

```html
<card title="hello"></card>
<card title="{{value}}"></card>
<card title="Hi {{user.name}}"></card>
<card title="{{42}}"></card>
<card title="{{true}}"></card>
<card title="{{price + ' USD'}}"></card>
<card title="Total: {{count * unitPrice}}"></card>
```

---

## Conditionals

Use control attributes on elements:

```html
<div if="loggedIn">Welcome back</div>
<div elsif="pending">Pending...</div>
<div else>Please log in</div>
```

Each condition must be a valid JavaScript expression.

---

## Map

Use `map` to loop arrays. Syntax: `map="item of items"` or `map="item, i of items"`

```html
<ul>
  <li map="item of items">{{item.name}}</li>
</ul>
```

With index:

```html
<ul>
  <li map="item, i of items">{{i}}: {{item.name}}</li>
</ul>
```

With condition:

```html
<ul>
  <li map="p of projects" if="p.title.length > 0">{{p.title}}</li>
</ul>
```

Nested maps:

```html
<div map="group of groups">
  <h2>{{group.name}}</h2>
  <ul>
    <li map="item of group.items">{{item}}</li>
  </ul>
</div>
```

---

## Comparison

| Feature              | HTML6 | EJS | Pug | Handlebars | JSX |
| -------------------- | ----- | --- | --- | ---------- | --- |
| Valid `.html`        | ✅     | ❌   | ❌   | ❌          | ❌   |
| Native JS output     | ✅     | ✅   | ✅   | ❌          | ✅   |
| Fastest execution    | ✅     | ❌   | ❌   | ❌          | ❌   |
| Components + Slots   | ✅     | ❌   | ❌   | ❌          | ✅   |
| Pipe support         | ✅     | ❌   | ❌   | ❌          | ❌   |
| No build step needed | ✅     | ✅   | ❌   | ✅          | ❌   |
| Tooling-compatible   | ✅     | ✅   | ❌   | ❌          | ✅   |

---

## License

ISC
