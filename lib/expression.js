var piper = require('./piper.js')

function expression(str, callback, opt = {}) {
  var len = str.length
  var out = ''
  var i = 0

  while (i < len) {
    var start = str.indexOf('{', i)
    if (start < 0 || start >= len - 1) {
      out += str.slice(i)
      break
    }

    var bs = 0
    for (var j = start - 1; j >= 0 && str[j] === '\\'; j--) bs++
    if (bs % 2 === 1) {
      out += str.slice(i, start - 1) + '{'
      i = start + 1
      continue
    }

    if (str[start - 1] === '$') {
      out += str.slice(i, start + 1)
      i = start + 1
      continue
    }

    if (str[start + 1] !== '{') {
      out += str.slice(i, start + 1)
      i = start + 1
      continue
    }

    var braceCount = 2
    if (str[start + 2] === '{') braceCount = 3

    out += str.slice(i, start)
    i = start + braceCount

    var depth = 1
    var end = i
    var quote = ''
    var inString = false
    var escaped = false

    while (end < len) {
      var c = str[end]

      if (escaped) {
        escaped = false
      } else if (c === '\\') {
        escaped = true
      } else if (inString) {
        if (c === quote) inString = false
      } else if (c === '"' || c === "'" || c === '`') {
        inString = true
        quote = c
      } else if (c === '{') {
        depth++
      } else if (c === '}') {
        depth--
        if (depth === 0) {
          if (braceCount === 2 && str[end + 1] === '}') break
          if (braceCount === 3 && str[end + 1] === '}' && str[end + 2] === '}')
            break
        }
      }

      end++
    }

    var closeLen = braceCount
    if (
      depth !== 0 ||
      end + closeLen > len ||
      str.slice(end + 1, end + 1 + (braceCount - 1)) !==
        '}'.repeat(braceCount - 1)
    ) {
      out += str.slice(start)
      break
    }

    var raw = str.slice(i, end).trim()
    var expr = piper(raw)

    if (!expr) {
      i = end + braceCount
      continue
    }

    try {
      new Function(`with(this){ return (${expr}) }`)
      var result = callback(expr, opt)
      var wrap = braceCount === 3
      out += wrap ? '{' + result + '}' : result
    } catch (e) {
      if (opt.mode === 'development') {
        throw e
      }
    }

    i = end + braceCount
  }

  return out
}

module.exports = expression
