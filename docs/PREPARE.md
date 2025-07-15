Goal:

We need to scan everything first, to prepare it for build.

- Parse all templates
- Replace

<cards></cards>

<template id="card">
  <card><slot></slot></card>
</template>

<template id="cards">
  <card></card>
</template>

```js
// cards
function cards(props, slot) {
  with (props) {
    return `${(function(){
      return `${JSON.parse(slot)}`
    })({}, '')}`
  }
}
```

Prepare all templates with a top down pass.

1. I see cards
2. I build a node structure

To be able to use this, I need to end up with a template string like this:

`${cards()}`

function cards(props, slot) {
  return `${card()}`
}

So if all templates were global, it would work?


To parse templates, we need to do 2 passes:

1. We add all templates to a template map:

{ card: { data: {} } }

The data is the parsed content without the template tags.

2. We walk through each template data, and if we find another template used in their, we wrap it in a function.


--------------

To avoid passing JSON, you need to build a unique function during compile for each of the structural functions.

If the content is the same, then it's the same function.

Each of the uses of templates must be md5'd and built, uniquely. If we say that all functions are global:

1. We go to

You've pinpointed the most crucial part of the process, and your intuition is correct. You don't "scan ahead" in a separate pass. Instead, the process is more like a classic compiler:

Discovery Pass: First, you gather all the definitions.

Compilation Pass: Then, you process each definition, and when you encounter a custom tag, you look it up in the definitions you've already gathered.

This avoids complex "scan-ahead" logic. You're not looking into the future; you're looking up a definition in a directory you've already built.

Let's refine the mental model. It's not about replacing <card> with ${card()} before you know what card() does. It's about generating the full text of the cards() function, and as part of that generation, creating calls to card().

The Correct Order of Operations

You are correct that the order matters immensely. Here is the clean, robust way to structure your compiler's logic:

Phase 1: Discovery (Build the Directory)

This is the very first thing you do. Before any processing, you perform a single, simple pass over the entire input to find every <template id="...">. You extract the id and the innerHTML and store them in a Map.

Generated javascript
// This is the ONLY "scan ahead" you do.
// It's just to learn what components exist.

const templateDefinitions = new Map();

// Simplified example of finding templates:
findAllTemplateTags().forEach(template => {
  const id = template.getAttribute('id');
  const innerHTML = template.innerHTML;
  templateDefinitions.set(id, innerHTML);
});

// Now, templateDefinitions contains:
// "card"  => '<div class="card"><slot></slot></div>'
// "cards" => '<div class="container"><card>...</card></div>'


At the end of this phase, you have a complete "directory" of all available components.

Phase 2: Compilation (Process Each Definition)

Now, you iterate through the templateDefinitions map. For each (id, innerHTML) pair, you generate its corresponding JavaScript function string.

Let's trace the compilation of the <cards> template:

Start the function string: You begin building the string for cards: `function cards(slots = {}) { return ``

Parse its innerHTML: You begin walking through the HTML of the cards template: <div class="container"><card>...</card>...</div>

Encounter <card>: Your parser sees the <card> tag. This is the key moment.

You ask a simple question: "Is the tag name 'card' a key in my templateDefinitions map?"

The answer is yes. This confirms it's a component call, not regular HTML.

Therefore, you know you need to generate a function call: ${card(...)}.

You extract the content of the <card> tag (its innerHTML) to use as the slot's content.

You use JSON.stringify to safely embed this content as the argument: ${card({ default: JSON.stringify("Content with 'quotes'") })}.

Continue Parsing: You move to the next <card> tag and repeat the process.

Finish the function string: Once you've processed the entire innerHTML of the cards template, you close the function string: \; }`

Why This Works Without "Scanning Ahead"

You don't need to scan ahead because when you are compiling the cards function, you are not worried about the body of the card function. You are only concerned with generating a syntactically correct call to it.

Think of it like writing C++ code:

Generated cpp
// You can write this code without needing to see the source code for printf.
// You just need to know that a function named "printf" exists and what arguments it takes.
int main() {
    printf("Hello, World!");
    return 0;
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
C++
IGNORE_WHEN_COPYING_END

Your template compiler works the same way. When compiling cards, it just needs to know that a component named card exists (which it does, in your map). It can then confidently generate a call to a JavaScript function card(), assuming that function will exist in the final, assembled script. Since you process every template in the map, that assumption will be correct.

The final assembled script is where everything comes together:

Generated javascript
(function() {
    // Both function definitions are placed in the same scope.
    // The compiler generated this function by processing the "card" template.
    function card(slots = {}) { /* ... returns card HTML ... */ }

    // The compiler generated this function by processing the "cards" template.
    // It contains CALLS to card().
    function cards(slots = {}) { /* ... returns container with calls to card() ... */ }

    // Because 'card' is defined above, the calls inside 'cards' work perfectly.
    return cards();
})();
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END




(function() {
    // Both function definitions are placed in the same scope.
    // The compiler generated this function by processing the "card" template.
    function card(slots = {}) { /* ... returns card HTML ... */ }

    // The compiler generated this function by processing the "cards" template.
    // It contains CALLS to card().
    function cards(slots = {}) { /* ... returns container with calls to card() ... */ }

    // Because 'card' is defined above, the calls inside 'cards' work perfectly.
    return cards();
})();

















// Your initial string: <cards><card>Some <b>bold</b> text</card></cards>

// After your initial parsing, you might generate something like this for new Function:
`
return (function() {
  function card(slots) {
    // The card template has a placeholder for the default slot's content.
    return `<div class="card">${slots.default}</div>`;
  }

  function cards() {
    // The content for each card is passed as an object to the card function.
    return `
      ${card({ default: 'Some <b>bold</b> text' })}
      ${card({ default: 'Another card with different content' })}
    `;
  }

  return cards();
})()
