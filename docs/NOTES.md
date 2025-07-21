# Conditionals

When you see an "if" attribute, then you read ahead to find its siblings that also has conditional (elsif, else).

Any such conditional block turns into a function.

To make this work with nested conditionals we either need to do deepest first, or we add a placeholder we can use to replace with the result of the children.

```html
<div if="hello"></div>
```

```js
${(function () {
  if (hello) {
    return `<div></div>`
  }
  return ''
})()}
```

```html
<div if="hello > 5"></div>
<div elsif="hello > 10"></div>
<div else></div>
```

becomes:

```js
${(function () {
  if (hello) {
    return `<div></div>`
  } else if (hello > 10) {
    return `<div></div>`
  } else {
    return `<div></div>`
  }
  return ''
})()}
```

# Loops

```html
<li map="project of projects"></li>
```

becomes:

```js
${(function () {
  return projects.map(function(project){
    return `<li></li>`
  })
})()}
```

```html
<li map="project,index of projects"></li>
```

becomes:

```js
${(function () {
  return projects.map(function(project, index){
    return `<li></li>`
  })
})()}
```

```html
<li map="project of projects" if="project.active"></li>
```

becomes:

```js
${(function () {
  return projects.map(function(project){
    if (project.active) {
      return `<li></li>`
    }
    return ''
  })
})()}
```

# Templates

```html
<template is="hello" projects="array">
  <div>hello</div>
</template>
```

becomes:

```js
function hello({ projects = [] }) {
  return `<div>hello</div>`
}
```

It can be used like this:

```html
<hello></hello>
```

becomes:

```js
${hello()}
```

```html
<hello projects="projects"></hello>
```

becomes:

```js
${hello({ projects })}
```

# Slots

A template can have slots:

```html
<template is="hello">
  <slot>Hello</slot>
</template>
```

```js
function hello({ slots = {} }) {
  slots.default ||= `Hello`
  return `${slots.default}`
}
```

It can be used like this:

```html
<hello>World</hello>
```

becomes:

```js
${hello((function() {
  var slots = {}
  slots.default = `World`
  return { slots }
})()}
```

```html
<hello projects="projects">World</hello>
```

becomes:

```js
${hello((function(){
  var slots = {}
  slots.default = `World`
  return { projects: projects, slots }
})()}
```
