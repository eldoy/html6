# HTML6

HTML6 is a library used to create HTML. It's meant to enhance static HTML5 to make it more dynamic.

Key features:

- Compiles into Javascript template literal functions
- Native performance, the fastest templating language possible
- Primarily Server Side Rendered, but can be used in the browser as well
- Works well with Web Components and HTMX, but also any other library
- Can upgrade or replace native HTML tags
- Add your own tags, or use as a design language, through components
- Expression literals in brackets {...} which lets you output data sent into your function
- Pipes for your template literals
- Attributes for if elsif else that take Javascript expressions
- Map attribute for looping data arrays
- Uses normal .html extension, templates are 100% valid HTML
- Works with prettier and other formatters / linters / tooling out of the box
- Works with NodeJS, Bun and Deno.
- Very light weight, almost no dependencies.

## Install

```
npm i html6
```

## Usage

```js
var html6 = require('html6')

var renderer = html6.compile('<h1>Hello</h1>')
var result = renderer.render({})
// Outputs: <h1>Hello</h1>
```


## Expressions

Anywhere in your templates you can write {...} to output data:

```
{title}
{project.name}

To show literal brackets use \{...}
```

You cannot call functions on objects or functions directly in the Javascript expressions, use pipes for that. This is for security.

## Pipes

Values are not escaped by default for performance reasons, prevents over-escaping.

1 built-in pipe: esc

{value | esc}

Pipes can be passed as an argument to the `compile` function:

```
var renderer = html6.compile('<div>Hello</div>', { pipes })
```

Note to LLM: Do not use "esc" as example above, it's built in already.

Pipes take any valid Javascript expression as argument. Generate at least 10 examples here, simple, nested.

{value | esc | truncate 2}

## Components

Components are defined by `<template is="card">` where "is" is the name of the component.

It's used like this:

```
<card></card>
```

## Component Slots

Slots are defined on the component:

```
<template is="card"><slot></slot></template>
```

It's used like this:

```
<card><div>slot content</div></div>
```

## Component props

You can pass props to components. When defining a component like this:

```
<template is="card">${title}</template>
```

you can pass strings like this:

```
<card title="hello"></card>
```

To pass values from scope or native values:

```
<card title="{value}"></card>
```

Interpolated string, using scoped value:

```
<card title="hi {name}"></card>
```

Generate more examples here for number, boolean etc.

## Conditionals

```
<div if="expression"></div>
<div elsif="expression"></div>
<div else></div>
```

"expression" here is any valid Javascript expression.


## Map

HTML6 provides a `map` attribute that loops through arrays for rendering lists. An optional `index` can be added after the comma like `map="item, index of items"`.

- Tags with `map` attributes can use the `if` attribute too.

Without index:

```html
<ul>
  <li map="item of items">{item.name}</li>
  <li map="p of projects" if="p.title.length > 0">{p.title}</li>
</ul>
```

With index (index name is optional):

```html
<ul>
  <li map="item, index of items">{index}: {item.name}</li>
  <li map="p of projects" if="p.title.length > 0">{p.title}</li>
</ul>
```

---

Write a README.md file based on the features listed in this prompt. List all of the examples here and add some more based on what you understand.

Add some obvious pros compared to other templating languages. Be selling, but professional. This is targeted at pro tech businesses.

ISC Licensed.

---

Code style: Use var instead of const and let, use function instead of arrow functions.