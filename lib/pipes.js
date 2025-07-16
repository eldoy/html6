var esc = function (str) {
  if (typeof str != 'string') return str
  return str.replace(
    /[&<>'"]/g,
    (m) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
        '&': '&amp;'
      }[m] || m)
  )
}

module.exports = { esc }
