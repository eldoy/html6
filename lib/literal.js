var escregexp = /_\.esc\(([^()]+)\)/g

module.exports = literal

function literal(str) {
  var split = str.split(/\s+\|\s+/)
  var value = split[0]
  var result = '_.esc(' + value + ')'
  var raw = false

  for (var i = 1; i < split.length; i++) {
    var s = split[i]
    var j = s.indexOf(' ')
    var pipe = j == -1 ? s : s.slice(0, j)
    var args = j == -1 ? '' : s.slice(j + 1)

    if (pipe == 'raw') {
      raw = true
    } else {
      result = '_.'.concat(pipe, '(', result, args ? ',' + args : '', ')')
    }
  }

  if (raw) {
    result = result.replace(escregexp, '$1')
  }

  return result
}
