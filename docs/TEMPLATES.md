# Inline templates extraction

function splitSource(sourceString) {
  // This leverages the highly optimized, native regex and split implementation.
  return sourceString.trim().split(/(?=<template)/);
}

const sourceString = `
<div>some html</div>

<template id="search-bar">
<div>template html</div>
</template

<template id="search-item">
<div>template html</div>
</template>
`;

const parts = splitSource(sourceString);
console.log(parts);
/*
Output:
[
  '<div>some html</div>',
  '<template id="search-bar">\n<div>template html</div>\n</template',
  '<template id="search-item">\n<div>template html</div>\n</template>\n'
]
*/