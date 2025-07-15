function attributor(atts) {
  if (!atts || !atts.length) return ''
  var entries = Object.entries(atts[0]).map(([k, v]) => `${k}: ${v}`)
  return ` ${entries.join(', ')} `
}

module.exports = attributor
