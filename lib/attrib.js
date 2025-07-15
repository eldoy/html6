function attrib(atts) {
  if (!atts || !atts.length) return ''
  return Object.entries(atts[0])
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ')
}

module.exports = attrib
