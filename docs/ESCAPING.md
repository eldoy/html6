Strategy for escaping

**Attributes**

Flow:

<div if="hello > 5">
  big
</div>
<div elsif="hello < 10">
  bigger
</div>
<div else>
  biggest
</div>

`${(function(){
  if (hello > 5) {
    return `<div>big</div>`
  } else if (hello < 10) {
    return `<div>big</div>`
  } else {
    return `<div>biggest</div>`
  }
  return ''
})()}`

Map:
<ul if="projects.length"><li map="project of projects">hello</li></ul>

`${(function(){
  if (projects.length) {
    return projects.map(function(project) {
      return `<li>hello</li>`
    })
  }
})()}`


Attribute:
<div class="hello"></div>

<div class="hello{man}"></div>

`<div class="hello${man}"></div>`

<div class="{man}"></div>

`<div class="${man ? `hello` : ''}"></div>`

**Slot**

<slot>Default string</slot>

`${slots.default}`

`${slots.default || `<div>Some content</div>`}`

**Components**

<card></card>
<template is="card"><div>hello</div></template>

```js
`${(function anonymous(props, slots, _) {
  with (props) {
    return `<div>hello</div>`;
  }
})({}, {}, _)}`
```

<card><div>hello</div></card>
<template is="card"><slot></slot></template>

```js
`${(function anonymous(props, slots, _) {
  with (props) {
    return `${slots.default}`;
  }
})({}, { default: `<div>hello</div>` }, _)}`
```

**Text content**

{'hello'}

${'hello'}
