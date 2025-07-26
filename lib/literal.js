function literal(str) {
  var start = str.indexOf('{')
  if (start !== -1) {
    var end = str.indexOf('}', start + 1)
    return end !== -1
  }
  return false
}

module.exports = literal
