function literal(str) {
  var open = str.indexOf('{')
  if (open === -1 || open === str.length - 1) return false

  // Disallow ${...}
  if (open > 0 && str[open - 1] === '$') return false

  // Count backslashes before '{'
  var bs = 0
  for (var i = open - 1; i >= 0 && str[i] === '\\'; i--) bs++

  // Odd number of backslashes means brace is escaped
  if (bs % 2 === 1) return false

  var close = str.indexOf('}', open + 1)
  return close !== -1
}

module.exports = literal
