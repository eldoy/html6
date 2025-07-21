var templateRegex = /<template id=".*?">.*?<\/template>\s*/gs

function inline(page) {
  var components = []

  var source = page.replace(templateRegex, (match) => {
    components.push(match.trim())
    return ''
  })

  return [source.trim(), components]
}

module.exports = inline
