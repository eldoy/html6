var compile = require('./lib/compile.js')

module.exports = function (opt = {}) {
  opt.templates ||= {}
  return {
    compile: function (source) {
      return compile(source, opt)
    }
  }
}
