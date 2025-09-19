var splitRegex = /\s+\|>\s+/

function piper(str, opt = {}) {
  var split = str.split(splitRegex)
  var result = split[0].trim()

  for (var i = 1; i < split.length; i++) {
    var s = split[i]
    var j = s.indexOf(' ')
    var pipe = j === -1 ? s : s.slice(0, j)
    var args = j === -1 ? '' : s.slice(j + 1).trim()

    if (args) {
      try {
        new Function('with(this){return(' + args + ')}')
      } catch (e) {
        if (opt.mode === 'development') {
          throw e
        }
        return ''
      }
    }

    result = '_.'.concat(pipe, '(', result, args ? ',' + args : '', ')')
  }

  return result
}

module.exports = piper
