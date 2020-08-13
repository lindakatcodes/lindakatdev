---
title: 'Notes: JavaScript Snippets'
blurb: My own reference sheet for common, basic JS recipes that I use and/or need to look up often
tags:
  - garden
  - JavaScript
type: notes
featured: false
---

### Arrays

```js
// basic reduce - adding all values in an array
arr.reduce( (total, value) => total + value, 0);

// Need to know how many of each item are in an array? Reduce into an object:
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});

// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

### Objects

```js
// Followed the above reduce into an object, but then need to do something with the values?
// Can get all the keys, which will return an array (that you can then loop over)
Object.keys(objectName);
```
