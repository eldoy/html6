To make the literals logic free, we can offer a subset of allowed literal content. This can be denied at compile time.

- Only allow object access
- No ternaries or logic
- Pipes only


Grammar:

If, elsif, else only strings with object access and expressions

if="project"
if="project.name"
if="projects.length"
if="projects.length > 0"
if="project.name == 'something'"
if="project.name == \"something\""

This will error:

if="project.name == "something""
if="projects[0].name"
if="projects[0].comments[1].name == 'something'"

This string will be escaped.

Map is like now, strictly "word of word", no special characters allowed or will error.

map="project of projects"

Start strict, allow later.

Dynamic attributes

Allowed:

class="hello {what}"
disabled="false"

Passing props:

<card product="product">
<card product="{product}">
