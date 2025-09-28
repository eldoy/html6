# TODO

- [ ] Instead of with, we do props directly.
- [ ] If props.props, then
  if (props.props) {
    var p = props.props
    delete props.props
    props = Object.assign({}, p, props)
  }
- [ ] Default props

```html
<template is="field" hello="string">
  {{props.hello}}
</template>

<field props="{hello: 'world'}">
<field hello="world">
```