var callRegex = /(^|[^.\]\w$])\b\w+\s*\(/
var splitRegex = /\s+\|\s+/

function piper(str) {
  var split = str.split(splitRegex)
  var result = split[0].trim()

  if (callRegex.test(result)) return ''

  for (var i = 1; i < split.length; i++) {
    var s = split[i]
    var j = s.indexOf(' ')
    var pipe = j == -1 ? s : s.slice(0, j)
    var args = j == -1 ? '' : s.slice(j + 1).trim()

    if (args) {
      if (callRegex.test(args)) return ''
      try {
        new Function('with(this){return(' + args + ')}')
      } catch {
        return ''
      }
    }

    result = '_.'.concat(pipe, '(', result, args ? ',' + args : '', ')')
  }

  return result
}

module.exports = piper
