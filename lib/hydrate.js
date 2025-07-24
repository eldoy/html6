function hydrate(replaced, expressions) {
  if (expressions.size == 0) {
    return replaced
  }

  var pattern = Array.from(expressions.keys()).join('|')
  var regex = new RegExp(pattern, 'g')

  return replaced.replace(regex, function (placeholder) {
    return expressions.get(placeholder)
  })
}

module.exports = hydrate
