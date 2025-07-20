var replacer = /\\|`|\$\{/g

function escape(str) {
  return str.replace(replacer, (m) => '\\' + m)
}

module.exports = escape
