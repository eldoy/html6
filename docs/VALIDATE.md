```js
function validateExpressions(templateStr) {
  const regex = /\$\{([^}]*)\}/g
  let match
  while ((match = regex.exec(templateStr))) {
    const expr = match[1]
    try {
      new Function('with(this){ return ' + expr + '}')
    } catch (e) {
      return false
    }
  }
  return true
}
```