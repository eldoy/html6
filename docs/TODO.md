### Templates

- [ ] Implement

- [ ] Need to convert a template to a data structure:

var opt = {
  templates: {
    card: {
      fn
    }
  }
}

Possible issue: What if the string we're passing contains ''

### Slots

- [ ] Implement

During parsing of templates we need to convert:

```
<slot></slot> to ${slot}
```

and (possibly)

```
<slot>Default content</slot> to ${slot || 'Default content'}
```

Only templates can have slots. They are defined like this:

```html
<template id="card-item">

</template>
```

and use like this:

```html
<card-item></card-item>
```

They can have end-tags or not.

You pass props to the like this:

```html
<card-item item="item"></card-item>
```

Other attributes doesn't have any effect, all attributes will be called like props.

**Strategy**

Templates are passed in through the opt.templates option as a string array.

For each template, we need to parse them into a function that can be used.

When we use a tag that matches a template, we call the function:

```html
<card-list></card-list>
```

becomes:

```html
${(function({ item: item }) {
  var slot = `<div>hello</div>`
  return opt.templates['card-list']({ item: item }, slot)
})()}
```

so `opt.templates['card-list']` function is:

```js
function(props, slot) {
  if (typeof slot == 'undefined') {
    slot = ``
  }
  with(props) {
    return `<div>${item.name}<div>${slot}</div>`
  }
}
```

The function above is the compiled version of the template. The <slot> tag is just replace with ${slot} and then the default is added on top:

```html
<template id="card-item">
  <slot>Hello</slot>
</template>
```

becomes:

```js
function(props, slot) {
  if (typeof slot == 'undefined') {
    slot = `Hello`
  }
  with(props) {
    return `<div>${item.name}<div>${slot}</div>`
  }
}
```




```html
<card-list item="item"></card-list>
```

becomes:

```html
${opt.templates['card-list']({ item: item })}
```
