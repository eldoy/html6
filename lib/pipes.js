var entities = {
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
  '&': '&amp;',
}

var replacer = /[&<>'"]/g

function esc(str) {
  if (typeof str !== 'string') return str
  return str.replace(replacer, (m) => entities[m] || m)
}

module.exports = { esc }
