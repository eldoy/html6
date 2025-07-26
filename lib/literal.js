function literal(str) {
  // Iterate over each character in the string
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== '{') continue // Skip until we find an opening brace

    // '{' at the very end cannot form a valid expression
    if (i === str.length - 1) continue

    // Check if there is a closing brace after this opening brace
    var close = str.indexOf('}', i + 1)
    if (close !== -1) return true // Found a valid { ... } pair
  }

  // No valid brace pairs found
  return false
}

module.exports = literal
