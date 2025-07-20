var fs = require('node:fs')

// var code =
//   '${(function anonymous(props,slots,_\n' +
//   ') {\n' +
//   'with (props) { return `${slots.default}` }\n' +
//   '})({}, {default: "<ul>${(function (projects) {\\n  return projects.map(function(p) {\\n    return `<li>${_.esc(p.name)}</li>`\\n  }).join(\'\')\\n})(projects)}</ul>"}, _)}'

// var code = `${(function anonymous(props, slots, _) {
//   with (props) {
//     return `${slots.default}`
//   }
// })(
//   {},
//   {
//     default: `<ul>${(function (projects) {
//       return projects
//         .map(function (p) {
//           return `<li>${_.esc(p.name)}</li>`
//         })
//         .join('')
//     })(projects)}</ul>`
//   },
//   _
// )}`

// var data = { projects: [{ name: 'a' }, { name: 'b' }] }

// console.log(code)

// // fs.writeFileSync('./result.txt', code)

// var body = `with (props) { return \`${code}\` }`

// var fn = new Function('props', 'slots', '_', body)

// var result = fn(data)

// console.log(result)

// <div><card></card></div>
// <div><card greeting="hello"></card></div>

// Page template, this is what we want

// String:
// <card greeting="hello"></card>
function page(props, pipes, opt) {
  with (props) {
    return /* HTML */ `
      ${(function card(props) {
        with (props) {
          return `${greeting}: ${title}`
        }
      })({ greeting: `hello` })}
    `
  }
}

// Number:
// <card greeting="${5}"></card>
function page(props, pipes, opt) {
  with (props) {
    return /* HTML */ `
      ${(function card(props) {
        with (props) {
          return `${greeting}: ${title}`
        }
      })({ greeting: 5 })}
    `
  }
}

// Boolean:
// <card greeting="${true}"></card>
function page(props, pipes, opt) {
  with (props) {
    return /* HTML */ `
      ${(function card(props) {
        with (props) {
          return `${greeting}: ${title}`
        }
      })({ greeting: true })}
    `
  }
}

// Value:
// <card greeting="${greeting}"></card>
function page(props, pipes, opt) {
  with (props) {
    return /* HTML */ `
      ${(function card(props) {
        with (props) {
          return `${greeting}: ${title}`
        }
      })({ greeting: greeting })}
    `
  }
}

// Complicated string:
// <card greeting="hello: ${title}"></card>
function page(props, pipes, opt) {
  with (props) {
    return /* HTML */ `
      ${(function card(props) {
        with (props) {
          return `${greeting}: ${title}`
        }
      })({ greeting: `hello: ${title}` })}
    `
  }
}

// So here's the system:
// If it's exactly ="${}", then take the content
// If it's anything else, then take the entire thing and put it in backticks
// In both cases, escapeTemplateString it

var props = { title: 'Title' }

var pipes = {}
var opt = {}

var result = page(props, pipes, opt)

console.log(result)
