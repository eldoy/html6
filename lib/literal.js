function literal(str) {
  if (typeof str !== 'string') return false
  var start = str.indexOf('{{')
  if (start !== -1) {
    var end = str.indexOf('}}', start + 2)
    return end !== -1
  }
  return false
}

module.exports = literal
