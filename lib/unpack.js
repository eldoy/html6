function unpack(attr, ifChain) {
  if (!Array.isArray(attr)) return ifChain

  var hasCondition = false

  for (var i = 0; i < attr.length; i++) {
    var current = attr[i]

    if (current.key === 'if') {
      ifChain = [`!(${current.value})`]
      hasCondition = true
    } else if (current.key === 'elsif' && ifChain.length > 0) {
      ifChain.push(`!(${current.value})`)
      hasCondition = true
    } else if (current.key === 'else') {
      hasCondition = true
    }
  }

  return hasCondition ? ifChain : []
}

module.exports = unpack
