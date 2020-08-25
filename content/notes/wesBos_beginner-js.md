---
title: Beginner JavaScript
blurb: Notes and Reminders while going through Wes Bos' Beginner JS course
tags:
  - JavaScript
  - Wes Bos
---

## Types

7 different types in JS:

- String
- Number
- Boolean
- Null
- Undefined
- Symbol
- Object

### Strings

Can use '', "", or ``

Single & double quotes are interchangeable - mostly used when we need to escape out apostrophes

To do multi-line strings - will need to add back slashes or line breaks - or use back ticks, and can do multiple lines without extra syntax

Back ticks also let you do some nice concatenation with separate strings and variables (interpolation) - ``Hello my name is ${name}, nice to meet you``

### Numbers

can subtract, multiply, and divide with numbers or strings - but addition is only possible for numbers.

**If you're getting weird issues with numbers not coming out right, check and make sure you're not mixing numbers and strings!**

Modulo! `%` - Returns remainder of a division operation

Be careful when adding floats (decimal numbers) - can be inaccurate and give weird results. JS only really works with integers, so it's best to work with whole numbers when you can (or be sure to round or truncate if needing decimals).

Power - `**`

### Objects

Everything in JS is an object - used for collections of things

### Symbol

Way to do unique properties

### Null & Undefined

Both express "nothingness"

`undefined` - properties that don't exist, or variables set up without a value - trying to access something that isn't there.
a variable that hasn't had a value set to it yet

`null` - a value that is directly set to nothing/null. something that is explicitly set to mean nothing

### Booleans and Equality

True/false values - often used as flags

`=` - assigns something, like a value to a variable
`==` - checks equality between two values, checks value but **not** type
`===` - checks equality between two values, exact comparison of value **and** type

## Functions

Functions are groupings of statements that are related to each other - can often take arguments or parameters, and sometimes return something to you.

Functions are defined (when you create & define what it does) and called (when you actually run it).

```js
function calculateBill() {
  console.log('Running Calculate Bill!!');
  const total = 100 * 1.13;
  return total;
}
```

If you pass the function name into console w/o the `()`, can see the function description - might be handy! Easiest to see in Chrome/Edge

To actually call the function, you use parenthesis

```js
calculateBill();
```

Variables defined **inside** a function are only available in the function - can't access them outside the function unless you return the value and store it in a new variable!

Once a function is done running, any variables declared inside are garbage collected, and cleaned out. So if you want that value stored somewhere, you need to save it somewhere **outside** of the function.

### Parameters and Arguments

Params - we use these in our function declarations like placeholders for the data we want to use inside the function.

Arguments - the actual value we use in our function, the real data the function will use.

Can pass values into function as direct values, variable names, or expressions - all a function cares about is that it gets a value, doesn't really care how you pass it the value.

Can also set default values for params, so if you call the function without the argument it has a fallback value.

```js
function yell(name = 'Silly Goose') {
  console.log(`HEY ${name.toUpperCase()}`)
}

yell();
```

Functions only fallback to the default if it's undefined - so if you want to pass some arguments but use default for some, pass it undefined where you want the default

```js
function calculateBill(billAmount, taxRate = 0.13, tipRate = 0.15) {
  console.log('Running Calculate Bill!!');
  const total = billAmount + billAmount * taxRate + billAmount * tipRate;
  return total;
}

const myBill = calculateBill(100, undefined, 0.2);
```

![Function definition diagram provided by Wes](https://github.com/wesbos/beginner-javascript/blob/master/function-definition.jpg)

### Different ways to declare functions

```js
// first way, we've seen before
function doctorize(firstName) {
  return `Dr. ${firstName}`;
}

// function w/o a name is an anonymous function
function (firstName) {
  return `Dr. ${firstName}`;
}

// function expression
const doctorize = function(firstName) {
  return `Dr. ${firstName}`;
}

// arrow functions

// explicit return - having keyword typed
// implicit return - returns w/o needing return keyword

// when there's only one parameter, you won't need () around parameters
const inchToCM = inches => inches * 2.54;

// example with multiple parameters
const add = (a, b = 3) => a + b;

// arrow => returning an object
// something like this is typically easier to read as a more standard function, but just to show an example
const makeABaby = (first, last) => ({ name: `${first} ${last}`, age: 0 });

// IIFE - immediately invoked function expression
// putting a function in () and then calling right away will immediately call the function & run it
(function() {
  console.log('Running anon function')
  return 'You are cool';
})();

// Methods
// function that lives in an object
const linda = {
  name: 'LindaKat',
  // standard method
  sayHi: function() {
    console.log('Hey Linda');
  },
  // shorthand method
  yellHi() {
    console.log('HEY LINDA')
  },
  // arrow method
  whisperHi: () => {
    console.log('hi linda')
  }
}

// callback functions
// happens when something is done
const button = document.querySelector('.clickMe');

// can create function outside and pass it
function handleClick() {
  console.log('Great clicking');
}
button.addEventListener('click', handleClick);

// or can pass anon function
button.addEventListener('click', function() {console.log('Nice job')})

// timer callback
setTimeout(() => console.log('Done!'), 1000);
```

## Debugging Tools

### Console methods

.log is the most common - writes something to the console
.info - similar to log, but adds a little i icon to side, provides information
.error - colors text so it has a small x icon and red highlighted text, chrome provides stack trace
.warn - similar to error but uses ! icon and yellow highlighted text, chrome provides stack trace
.table - formats data into table
.count - can count every time something runs, can pass variables
.group - will group multiple logs together, end with .groupEnd and pass same string as initial .group call; .groupCollapsed starts the groups collapsed

### Call stack / stack trace

Gives information on what is causing the error and where it originated. When it says anonymous at the end, often means it's because it was called from the console. Will list the function call, the file it was in, and what line it was on. First item occurred most recently, then goes backwards.

### Inspecting Elements

Can access elements from the console by highlighting them in elements tab, then going to console and typing `$0`. The 0 means last element clicked, so will update. Can then increase number to get second last element, and so on.

`$` & `$$` - shorthand selector for `document.querySelector` and `document.querySelectorAll` directly in the console.

### Breakpoints

Can put `debugger;` in your code, and if the console is open in your browser, will pause all JS from running. Sets a breakpoint, and loads into source in console.

### Network Requests

Shows everything loaded when the page loads; can see timing, headers, etc.

### Break on Attribute

In console, can right click on element and select break on and attribute modifications - will start debugger where affected JS was called. Can also go into sources tab and pick a break point on event listener or xhr/fetch.

## Scope

'Where are my variables available to me?' Scope answers this!

### Global Scope

Variables declared in the base of the file are available anywhere in your code.

> `Var` and named functions are attached to the global `window` object in the browser. `Const` and `let` are NOT.

### Function Scope

Variables declared inside a function are only available inside said function, unless we return it.

If variables aren't found in the function, JS will go up a level higher and search there, and continue until it can't go higher. So global variables can be used inside functions.

Can scope functions inside functions as well - inner function will only be available to it's parent.

### Block Scope

`{}` create blocks. Anything created inside them won't be available outside the block. Will often see this as loops (if, for, etc).

> This particularly applies to `const` and `let` variables, as they are specifically block scoped. `Var` is actually function scoped, so does not obey the block scope rule and can be accessed outside of the block.

### Scope Lookup

JS is a lexically / statically scoped language. This means variable/scope lookup happens where the function is *defined*, not where it's run.

```js
// globally defined dog version
  const dog = 'Snickers';

  function logDog() {
    // since this is defined here without a dog variable, it will look up to the global scope, and log Snickers.
    console.log(dog);
  }

  function go() {
    // function scoped dog version
    const dog = 'Sunny';
    // here's where we actually call the logDog function - but it won't look at the dog variable here!
    logDog();
  }

  go();
```

**Try not to create global variables - often leads to confusion or weirdness, can accidentally cause issues. When working with modules, becomes very difficult to do unless you create one specifically on the window object.**

## Hoisting

Accessing functions and variables *before* they've been created. This is possible because of how JS works! It takes all declarations of functions and variables and puts them at the top of the file, so technically you can call them before they've actually been declared.

One use case for this: Can arrange your files to have calls first, showing what the file does; then declarations after, showing how the file does it. Not super common, but it is possible.

For variables, it will hoist the variable declaration, but not the value! So you can't log the variable before a value is added. But you can declare the variable early, then add a value later on. 
