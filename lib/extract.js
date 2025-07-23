// lib/extract.js

function extract(source) {
  var expressions = new Map()
  var parts = []
  var counter = 0
  var lastIndex = 0
  var i = 0

  while (i < source.length) {
    if (source[i] == '\\') {
      i += 2
      continue
    }

    if (source[i] == '$' && source[i + 1] == '{') {
      var start = i
      i += 2
      var depth = 1
      var inQuote = null
      var esc = false

      while (i < source.length && depth > 0) {
        var char = source[i]
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

      if (depth > 0) {
        break
      }

      parts.push(source.slice(lastIndex, start))

      var expression = source.slice(start, end)
      var placeholder = '__EXPR_PLACEHOLDER_' + counter + '__'

      expressions.set(placeholder, expression)
      parts.push(placeholder)

      counter++
      lastIndex = end
    } else {
      i++
    }
  }

  parts.push(source.slice(lastIndex))

  var replaced = parts.join('')

  return { replaced, expressions }
}

module.exports = extract
