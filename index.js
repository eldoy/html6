var compile = require('./lib/compile.js')

module.exports = function (opt = {}) {
  return {
    compile: function (source) {
      return compile(source, opt)
    }
  }
}
