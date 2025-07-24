function expression(str) {
  var len = str.length
  var start = -1
  var depth = 0
  var inString = false
  var quote = ''
  var escaped = false

  for (var i = 0; i < len; i++) {
    var c = str[i]

    if (escaped) {
      escaped = false
      continue
    }

    if (c == '\\') {
      escaped = true
      continue
    }

    if (inString) {
      if (c == quote) inString = false
      continue
    }

    if (c == '"' || c == "'" || c == '`') {
      inString = true
      quote = c
      continue
    }

    if (c == '{') {
      if (i > 0 && str[i - 1] == '\\') continue
      if (start == -1) start = i
      depth++
    } else if (c == '}') {
      if (depth > 0) depth--
      if (depth == 0 && start !== -1) {
        var expr = str.slice(start + 1, i).trim()

        // Disallow object literal fragments
        if (/^["'`][^]*?:/.test(expr) || /^[\w$]+\s*:/.test(expr)) return ''

        // Disallow all function calls: any identifier followed by (
        if (/\b\w+\s*\(/.test(expr)) return ''

        try {
          new Function(`with(this){ return (${expr}) }`)
          return expr
        } catch {
          return ''
        }
      }
    }
  }

  return ''
}

module.exports = expression
