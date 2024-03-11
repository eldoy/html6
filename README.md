# HTML6

What HTML should have been. Template language that extends HTML and gives it super powers.

Designed to work with [Waveorb.](https://waveorb.com)

Features:

- Front-end without Javascript
- Supports control flow with `if`` and `map` attributes
- Template support
- The absolute fastest template language
- Compiles to vanilla Javascript templates and functions
- Fast custom loader, not using Babel, no transpilation
- No client side transform function necessary

### Install

HTML6 comes built into [Waveorb.](https://waveorb.com) Just start using it as normal template tags.

To enable it in your Waveorb application, set `transform: true` in your `waveorb.json` file:

```json
{
  "transform": true
}
```

It can be installed via npm separately:

```
npm i html6
```

Then convert your HTML like this:

```js
var html6 = require('html6)
var content = html6(`<div if="project">If statements in HTML!</div>`)
```

### How it works

There are 2 main components to HTML6: The loader, and front end functions.

##### The loader

The loader intercepts the call to require and transforms the custom HTML tags to Javascript template tags. This is done by parsing the template tags in your page, views, layouts and components.

This technique lets us use the variables defined in the function scope, so we don't have to pass any variables to the transform function.

This also means there is no heavy function calls to

##### Front end functions

The generated tags depend on a few Javascript functions to pass data to and from the server. These are included on the front-end and can be overridden.

##### Transforming custom tags

This is how you would write a simple form page with HTML6 in Waveorb:

```js
async function($) {
  var hello = 'Programmer'

  return `
    <form action="/user/create">
      <upload name="image" to="/upload/create">
      <field name="name" value="${hello}">
      <field name="email" type="email">
      <submit>Save</submit>
    </form>
  `
}
```

The above code is translated to this:

```js
async function($) {
  var hello = 'Programmer'

  return `
    <form action="/user/create" onsubmit="window.handleSubmit();return false">
      <p>
        <input type="hidden" name="image">
        <label for="image-upload">
        <input
          id="image-upload"
          type="file"
          onchange="window.handleImageUpload(this)"
        >
        <em class="image-errors"></em>
        <span class="progress"></span>
      </p>
      <p>
        <label for="name-field">Name</label>
        <input type="text" name="name" value="${hello}">
        <em class="image-errors"></em>
      </p>
      <p>
        <label for="email-field">Email</label>
        <input type="email" name="email">
        <em class="email-errors"></em>
      </p>
      <p class="buttons">
        <button>Save</button>
      </p>
    </form>
  `
}
```

This saves a lot of time, is more readable, easier to learn and maintain.


### Template tags

With template tags, instead of writing this:

```js
async function($) {
  var project = db('project').get()

  function renderIntro() {
    if (project) {
      return `<div>We have project!</div>`
    }
    return ''
  }

  return `
    <h1>Hello</h1>
    ${renderIntro()}

    <script>
      window.renderIntro = ${renderIntro}
    </script>
  `
}
```

You can write this:

```js
async function($) {
  var project = db('project').get()

  return `
    <h1>Hello</h1>
    <render name="intro">

    <template name="intro">
      <div if="project">We have project!</div>
    </template>
  `
}
```

In the bottom example, the template is available as a function called `renderIntro` in the browser.
