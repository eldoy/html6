Tried other libraries:

* htmlparser2 - fast but difficult to use
* cheerio - very slow
* jsdom - extremely slow
* xmldom - doesn't support HTML

The reason why we need a parser for all the HTML and then dump the HTML is because of end tags. It is very slow and difficult to find corresponding end tags.

Mustache gets away with this because the only need to replace string and don't have the overhead of searching ahead for end tags. It does in-place replacement and doesn't modify the entire tree.

Mustache is actually not even faster, about the same speed. If it doesn't compile, then it's actually a lot slower since HTML6 will compile.

* The file size for Mustache is 7.3kb / gzipped size: 2.7kb
* HTML6 is 9kb / gzipped 3.3kb

https://www.toptal.com/developers/javascript-minifier
https://dafrok.github.io/gzip-size-online/

Execution time on normal page is 12ms for Mustache, 10ms for HTML6.

Combine this with a function that:

- auto-escapes
- auto-joins arrays
- prints empty strings for undefined

We already have html-view which can handle some of this.