function literal(str) {
  var open = str.indexOf('{')
  if (open === -1 || open === str.length - 1) return false

  var bs = 0
  for (var i = open - 1; i >= 0 && str[i] === '\\'; i--) bs++
  if (bs % 2 === 1) return false

  var close = str.indexOf('}', open + 1)
  return close !== -1
}

module.exports = literal
