var furu = require('furu')
var html6 = require('./index.js')

var { addHook } = require('pirates')
var removeHook = addHook(
  function (content, path) {
    var name = path.split('/').reverse()[0].split('.')[0]
    console.log(content, path, name)

    var data = ''
    var html = ''

    var matches = content.match(/^-{3}(.+?)-{3}/s)
    if (matches) {
      console.log(matches)
      data = matches[1]
      html = content.replace(matches[0], '')
    }

    console.log(data)
    console.log(html)

    html = html6(html)

    console.log(html)

    return `module.exports = async function ${name}(req, res) {
      ${data}
      return \`${html}\`
    }`
  },
  {
    exts: ['.html6']
  }
)

var layout = require('./app/layouts/main.html6')
var homePage = require('./app/pages/home.html6')

console.log(homePage.toString())

removeHook()

console.log({ homePage })

var routes = {
  'get#/': homePage
}

async function handleRequest(req, res) {
  if (req.route) {
    console.log({ route: req.route })
    var content = await req.route(req, res)
    return layout({ content, title: 'Homepage' })
  }
}

var options = { port: 9095, dir: 'app/assets', routes }

furu(options, handleRequest)
