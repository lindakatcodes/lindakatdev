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
