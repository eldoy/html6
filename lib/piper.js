function piper(str) {
  var split = str.split(/\s+\|\s+/)
  var result = split[0].trim()

  // Disallow function calls in base expression
  if (/(^|[^.\]\w$])\b\w+\s*\(/.test(result)) return ''

  for (var i = 1; i < split.length; i++) {
    var s = split[i]
    var j = s.indexOf(' ')
    var pipe = j == -1 ? s : s.slice(0, j)
    var args = j == -1 ? '' : s.slice(j + 1).trim()

    if (args) {
      // Disallow function calls in args
      if (/(^|[^.\]\w$])\b\w+\s*\(/.test(args)) return ''
      // Validate syntax
      try {
        new Function(`with(this){ return (${args}) }`)
      } catch {
        return ''
      }
    }

    result = '_.'.concat(pipe, '(', result, args ? ',' + args : '', ')')
  }

  return result
}

module.exports = piper
