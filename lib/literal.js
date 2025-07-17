module.exports = literal

function literal(str) {
  var [value, ...parts] = str.split(/\s+\|\s+/)

  var result = '_.esc(' + value + ')'
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i].trim()
    var [pipe, args] = part.trim().split(/\s+(.+)/)
    if (pipe == 'raw') {
      var raw = true
    } else {
      result = `_.${pipe}(${result}${args ? ',' + args : ''})`
    }
  }

  if (raw) {
    result = result.replace(/_\.esc\(([^()]+)\)/g, '$1')
  }

  return result
}
