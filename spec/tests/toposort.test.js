var toposort = require('../../lib/toposort.js')

test('basic', async ({ t }) => {
  var components = {
    card: {
      name: 'card',
      html: '<heading greeting="${greeting}"></heading>',
      tree: [
        {
          type: 'element',
          tagName: 'heading',
          attributes: [{ key: 'greeting', value: '${greeting}' }],
          children: []
        }
      ]
    },
    heading: {
      name: 'heading',
      html: '<div>${greeting}</div>',
      tree: [
        {
          type: 'element',
          tagName: 'div',
          attributes: [],
          children: [{ type: 'text', content: '${greeting}' }]
        }
      ]
    }
  }

  var result = toposort(components).map((c) => c.name)
  t.equal(result.join(','), 'heading,card')
})
