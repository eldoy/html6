function literal(str) {
  var len = str.length
  var depth = 0
  var inString = false
  var escaped = false

  for (var i = 0; i < len; i++) {
    var c = str[i]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (c == '\\') {
        escaped = true
      } else if (c == '"') {
        inString = false
      }
      continue
    }

    if (escaped) {
      escaped = false
      continue
    }

    if (c == '\\') {
      escaped = true
      continue
    }

    if (c == '"') {
      inString = true
    } else if (c == '{') {
      depth++
    } else if (c == '}') {
      if (depth > 0) {
        depth--
        if (depth == 0) return true
      }
    }
  }

  return false
}

module.exports = literal
