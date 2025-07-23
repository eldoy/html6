// lib/extract.js

function extract(innerContent) {
  var expressions = new Map()
  var parts = []
  var placeholderCounter = 0
  var lastIndex = 0
  var i = 0

  while (i < innerContent.length) {
    if (innerContent[i] === '\\') {
      i += 2
      continue
    }

    if (innerContent[i] === '$' && innerContent[i + 1] === '{') {
      var start = i
      i += 2
      var depth = 1
      var inQuote = null
      var esc = false

      while (i < innerContent.length && depth > 0) {
        var char = innerContent[i]
        if (esc) {
          esc = false
        } else if (char === '\\') {
          esc = true
        } else if (inQuote) {
          if (char === inQuote) inQuote = null
        } else if (char === "'" || char === '"' || char === '`') {
          inQuote = char
        } else if (char === '{') {
          depth++
        } else if (char === '}') {
          depth--
        }
        i++
      }
      var end = i

      // --- FIX START ---
      // If the loop finished but the expression is not balanced, it's unterminated.
      // Stop looking for expressions and treat the rest of the string as literal.
      if (depth > 0) {
        break
      }
      // --- FIX END ---

      parts.push(innerContent.slice(lastIndex, start))

      var expression = innerContent.slice(start, end)
      var placeholder = '__EXPR_PLACEHOLDER_' + placeholderCounter + '__'

      expressions.set(placeholder, expression)
      parts.push(placeholder)

      placeholderCounter++
      lastIndex = end
    } else {
      i++
    }
  }

  parts.push(innerContent.slice(lastIndex))

  var replaced = parts.join('')

  return [replaced, expressions]
}

module.exports = extract
