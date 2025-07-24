var piper = require('./piper.js')

function expression(str, callback) {
  if (typeof callback !== 'function') return

  var len = str.length
  var out = ''
  var i = 0

  while (i < len) {
    var start = str.indexOf('{', i)
    if (start === -1 || start === len - 1) {
      out += str.slice(i)
      break
    }

    // Check for escaped brace
    var bs = 0
    for (var j = start - 1; j >= 0 && str[j] === '\\'; j--) bs++
    if (bs % 2 === 1) {
      out += str.slice(i, start + 1)
      i = start + 1
      continue
    }

    out += str.slice(i, start)
    i = start + 1

    var depth = 1
    var inString = false
    var quote = ''
    var escaped = false
    var end = i

    while (end < len) {
      var c = str[end]

      if (escaped) {
        escaped = false
        end++
        continue
      }

      if (c === '\\') {
        escaped = true
        end++
        continue
      }

      if (inString) {
        if (c === quote) inString = false
        end++
        continue
      }

      if (c === '"' || c === "'" || c === '`') {
        inString = true
        quote = c
        end++
        continue
      }

      if (c === '{') {
        depth++
      } else if (c === '}') {
        depth--
        if (depth === 0) break
      }

      end++
    }

    if (depth !== 0) {
      out += str.slice(start)
      break
    }

    var expr = str.slice(i, end).trim()

    if (
      /^["'`][^]*?:/.test(expr) ||
      /^[\w$]+\s*:/.test(expr) ||
      /\b\w+\s*\(/.test(expr)
    ) {
      out += str.slice(start, end + 1)
    } else {
      try {
        new Function(`with(this){ return (${expr}) }`)
        var piped = piper(expr)
        out += callback(piped)
      } catch {
        out += str.slice(start, end + 1)
      }
    }

    i = end + 1
  }

  return out
}

module.exports = expression
