var entities = {
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
  '&': '&amp;'
}

function esc(str) {
  if (typeof str != 'string') return str
  return str.replace(/[&<>'"]/g, (m) => entities[m] || m)
}

module.exports = { esc }
