# HTML6

HTML6 is a minimal, high-performance templating language designed to extend native HTML5 while compiling down to insanely fast JavaScript template literal functions.

It enhances static HTML with logic, components, and dynamic expressions—without introducing runtime overhead or sacrificing control.

Ideal for server-rendered applications, HTML6 works equally well in the browser and plays nicely with Web Components, HTMX, and low-dependency libraries.

**License**: ISC

## Key Features

- Compiles to native JavaScript template literal functions for maximum performance
- Expression interpolation with `{{...}}` syntax
- Built-in support for pipes (like `| esc`) and custom pipes
- Component architecture using `<template is="name">` and `<slot>`
- Supports props, slots, conditionals, and map/looping
- Valid `.html` files, works with formatters like Prettier
- Server-side and client-side compatible (Node.js, Bun, Deno)
- Compatible with HTMX, AlpineJS, Web Components, or no JS at all
- Designed for native-first rendering, no runtime templating required

---

## Install

```sh
npm i html6
```

---

## Basic Usage

```js
var html6 = require('html6')

var renderer = html6.compile('<h1>Hello</h1>')
var result = renderer.render({})
// result: <h1>Hello</h1>
```

---

## Expressions

Use `{...}` to interpolate data into the template.

```html
<h1>{{title}}</h1>
<p>{{project.name}}</p>
```

Escape literal braces with backslash:

```html
<p>\{{notEvaluated}}</p>
```

---

## Pipes

Use pipes to transform values without invoking functions directly in template expressions.

Built-in pipe:

```html
<p>{{value | esc}}</p>
```

Custom pipes:

```js
var pipes = {
  truncate: function (value, length) {
    return value.slice(0, length)
  },
  upper: function (value) {
    return value.toUpperCase()
  },
  lower: function (value) {
    return value.toLowerCase()
  },
  prefix: function (value, pre) {
    return pre + value
  },
  suffix: function (value, suf) {
    return value + suf
  },
  json: function (value) {
    return JSON.stringify(value)
  },
  round: function (value) {
    return Math.round(value)
  },
  currency: function (value) {
    return '$' + parseFloat(value).toFixed(2)
  },
  limit: function (value, count) {
    return value.split(' ').slice(0, count).join(' ')
  },
  date: function (value) {
    return new Date(value).toDateString()
  }
}

var renderer = html6.compile('<div>{{text | upper | prefix "Hello: "}}</div>', { pipes })
```

---

## Components

Define components using `<template is="name">`.

```html
<template is="card">
  <div class="card">
    <h2>{{title}}</h2>
    <slot></slot>
  </div>
</template>
```

Use them like native tags:

```html
<card title="Welcome">
  <p>Inner content here.</p>
</card>
```

---

## Slots

Slots are rendered in the place where `<slot>` is declared.

```html
<template is="card">
  <div class="box"><slot></slot></div>
</template>

<card>
  <p>Slot content</p>
</card>
```

---

## Props

Pass props as attributes. Supports string, number, boolean, expressions.

```html
<template is="card">
  <h3>{{title}}</h3>
  <p>Views: {{views}}</p>
  <p>Visible: {{visible}}</p>
</template>

<card title="Hello" views="123" visible="{{true}}"></card>
<card title="Hi {{username}}" views="{{count}}" visible="{{user.active}}"></card>
```

---

## Conditionals

Use `if`, `elsif`, and `else` attributes.

```html
<div if="user.loggedIn">Welcome, {{user.name}}</div>
<div elsif="user.guest">Welcome, guest</div>
<div else>Please sign in</div>
```

---

## Map

Loop through arrays using the `map` attribute. Optional `index`.

```html
<ul>
  <li map="item of items">{{item.name}}</li>
</ul>

<ul>
  <li map="item, i of items">{{i}}: {{item.name}}</li>
</ul>

<ul>
  <li map="p of projects" if="p.title.length > 0">{{p.title}}</li>
</ul>
```

---

## Pros Compared to Other Templating Languages

* ✅ Native performance: compiles to JS template literals, zero runtime
* ✅ No virtual DOM, no diffing, no hydration
* ✅ Syntax stays 100% valid HTML — works with editors, linters, formatters
* ✅ Safer expressions: no arbitrary execution, use pipes for logic
* ✅ Seamless integration with HTMX, Web Components, or no JS
* ✅ No DSL or invented syntax: it's HTML + expressions + tags
* ✅ Tiny footprint, no heavy dependencies
* ✅ Full control over markup output, no abstraction leakage
* ✅ Components without runtime, state, or overhead
* ✅ Ideal for server-rendered HTML and progressive enhancement

---

## License

ISC
