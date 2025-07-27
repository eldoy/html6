var piper = require('./piper.js')

var isQuotedKey = /^["'`][^]*?:/
var isUnquotedKey = /^[\w$]+\s*:/
var hasFunctionCall = /\b\w+\s*\(/

function expression(str, callback) {
  if (typeof callback !== 'function') return str

  var len = str.length
  var out = ''
  var i = 0

  while (i < len) {
    var start = str.indexOf('{', i)
    if (start < 0 || start === len - 1) {
      out += str.slice(i)
      break
    }

    var bs = 0
    for (var j = start - 1; j >= 0 && str[j] === '\\'; j--) bs++

    if (bs & 1) {
      out += str.slice(i, start - 1) + '{'
      i = start + 1
      continue
    }

    if (start > 0 && str[start - 1] === '$') {
      out += str.slice(i, start + 1)
      i = start + 1
      continue
    }

    out += str.slice(i, start)
    i = start + 1

    var depth = 1
    var end = i
    var c
    var quote = ''
    var inString = false
    var escaped = false

    while (end < len) {
      c = str[end]

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
        if (--depth === 0) break
      }

      end++
    }

    if (depth !== 0) {
      out += str.slice(start)
      break
    }

    var expr = str.slice(i, end).trim()

    if (
      isQuotedKey.test(expr) ||
      isUnquotedKey.test(expr) ||
      hasFunctionCall.test(expr)
    ) {
      i = end + 1
      continue
    }

    try {
      new Function(`with(this){ return (${expr}) }`)
      out += callback(piper(expr))
    } catch {}

    i = end + 1
  }

  return out
}

module.exports = expression
