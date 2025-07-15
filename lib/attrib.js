function attrib(atts) {
  if (!atts || !atts.length) return ''
  return atts.map((a) => `${a.key}: ${a.value}`).join(', ')
}

module.exports = attrib
