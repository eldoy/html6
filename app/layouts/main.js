module.exports = async function ({ content, title }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>
  <header>This is the header</header>
  ${content}
</body>
</html>`
}
