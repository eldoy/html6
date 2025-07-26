function literal(str) {
  // Iterate over each character in the string
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== '{') continue // Skip until we find an opening brace

    // '{' at the very end cannot form a valid expression
    if (i === str.length - 1) continue

    // Disallow template literal syntax: ${...}
    if (i > 0 && str[i - 1] === '$') continue

    // Count the number of backslashes immediately before '{'
    var bs = 0
    for (var j = i - 1; j >= 0 && str[j] === '\\'; j--) bs++

    // Odd number of backslashes means '{' is escaped, so skip it
    if (bs % 2 === 1) continue

    // Check if there is a closing brace after this opening brace
    var close = str.indexOf('}', i + 1)
    if (close !== -1) return true // Found a valid { ... } pair
  }

  // No valid brace pairs found
  return false
}

module.exports = literal
