---
title: Beginner JavaScript
blurb: Notes and Reminders while going through Wes Bos' Beginner JS course
tags:
  - JavaScript
  - Wes Bos
---

## The Basics

### Types

7 different types in JS:

- String
- Number
- Boolean
- Null
- Undefined
- Symbol
- Object

#### Strings

Can use '', "", or ``

Single & double quotes are interchangeable - mostly used when we need to escape out apostrophes

To do multi-line strings - will need to add back slashes or line breaks - or use back ticks, and can do multiple lines without extra syntax

Back ticks also let you do some nice concatenation with separate strings and variables (interpolation) - ``Hello my name is ${name}, nice to meet you``

#### Numbers

can subtract, multiply, and divide with numbers or strings - but addition is only possible for numbers.

> If you're getting weird issues with numbers not coming out right, check and make sure you're not mixing numbers and strings!

Modulo! `%` - Returns remainder of a division operation

Be careful when adding floats (decimal numbers) - can be inaccurate and give weird results. JS only really works with integers, so it's best to work with whole numbers when you can (or be sure to round or truncate if needing decimals).

Power - `**`

#### Objects

Everything in JS is an object - used for collections of things

#### Symbol

Way to do unique properties

#### Null & Undefined

Both express "nothingness"

`undefined` - properties that don't exist, or variables set up without a value - trying to access something that isn't there.
a variable that hasn't had a value set to it yet

`null` - a value that is directly set to nothing/null. something that is explicitly set to mean nothing

#### Booleans and Equality

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

### Debugging Tools

#### Console methods

.log is the most common - writes something to the console
.info - similar to log, but adds a little i icon to side, provides information
.error - colors text so it has a small x icon and red highlighted text, chrome provides stack trace
.warn - similar to error but uses ! icon and yellow highlighted text, chrome provides stack trace
.table - formats data into table
.count - can count every time something runs, can pass variables
.group - will group multiple logs together, end with .groupEnd and pass same string as initial .group call; .groupCollapsed starts the groups collapsed

#### Call stack / stack trace

Gives information on what is causing the error and where it originated. When it says anonymous at the end, often means it's because it was called from the console. Will list the function call, the file it was in, and what line it was on. First item occurred most recently, then goes backwards.

#### Inspecting Elements

Can access elements from the console by highlighting them in elements tab, then going to console and typing `$0`. The 0 means last element clicked, so will update. Can then increase number to get second last element, and so on.

`$` & `$$` - shorthand selector for `document.querySelector` and `document.querySelectorAll` directly in the console.

#### Breakpoints

Can put `debugger;` in your code, and if the console is open in your browser, will pause all JS from running. Sets a breakpoint, and loads into source in console.

#### Network Requests

Shows everything loaded when the page loads; can see timing, headers, etc.

#### Break on Attribute

In console, can right click on element and select break on and attribute modifications - will start debugger where affected JS was called. Can also go into sources tab and pick a break point on event listener or xhr/fetch.

## The Tricky Bits

### Scope

'Where are my variables available to me?' Scope answers this!

#### Global Scope

Variables declared in the base of the file are available anywhere in your code.

> `Var` and named functions are attached to the global `window` object in the browser. `Const` and `let` are NOT.

#### Function Scope

Variables declared inside a function are only available inside said function, unless we return it.

If variables aren't found in the function, JS will go up a level higher and search there, and continue until it can't go higher. So global variables can be used inside functions.

Can scope functions inside functions as well - inner function will only be available to it's parent.

#### Block Scope

`{}` create blocks. Anything created inside them won't be available outside the block. Will often see this as loops (if, for, etc).

> This particularly applies to `const` and `let` variables, as they are specifically block scoped. `Var` is actually function scoped, so does not obey the block scope rule and can be accessed outside of the block.

#### Scope Lookup

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

> Try not to create global variables - often leads to confusion or weirdness, can accidentally cause issues. When working with modules, becomes very difficult to do unless you create one specifically on the window object.

### Hoisting

Accessing functions and variables *before* they've been created. This is possible because of how JS works! It takes all declarations of functions and variables and puts them at the top of the file, so technically you can call them before they've actually been declared.

One use case for this: Can arrange your files to have calls first, showing what the file does; then declarations after, showing how the file does it. Not super common, but it is possible.

For variables, it will hoist the variable declaration, but not the value! So you can't log the variable before a value is added. But you can declare the variable early, then add a value later on.

### Closures

The ability to access a parent level scope from a child scope, even after the parent has been terminated.

```js
function createGreeting(greeting = '') {
  // say we have a variable here, in our parent scope
  const myGreet = greeting.toUpperCase();
  // then we're returning this inner function, which uses the variable from it's parent scope
  return function (name) {
    return `${myGreet} ${name}`;
  }
}

// we could then assign this function to a few different variables with different arguments passed to it. It will run the whole function, which should clear up all the variables once it's done.
const sayHello = createGreeting('hello');
const sayHey = createGreeting('hey');
// but we can then use the new variables, and still access that variables inside the function. It's called a closure because even though the function run is closed, we can still access the variables inside.
console.log(sayHello('wes'));
console.log(sayHey('wes'));
```

It's a little bit weird wording, but basically it's a way JS allows us to save & use variables from outer scopes, if function calls are nested inside each other. So the scope is preserved for when we need it.

Can also be used to create "private variables" - so can keep multiple, updating instances of a similar variable.

```js
 function createGame(gameName) {
   let score = 0;
   return function win() {
     score++;
     return `Your ${gameName} score is ${score}`;
   }
 }

// because of closure, when we run these functions it will keep a separate, updated score for each one. Since we stored two instances of our createGame function, each one counts as it's own version, and will stay updated.
 const hockeyGame = createGame('Hockey');
 const soccerGame = createGame('Soccer');
```

## The DOM

Document Object Model - processes HTMl so we can interact with it using JS

We have window, which tells us properties about the entire browser window, including the search bar and tabs and such. And we also have the document, which is just concerned with the actual browser page (so not tabs or search etc). There's also a navigator object, which has info about the device you're on (like geolocation, webcam, audio, battery, etc).

### Selecting Elements

Two main ways to select items - `querySelector` and `querySelectorAll` - one gets the first item, one gets all items matching the provided tag. Most often, you'll see them on `document`, but can also use them on a specific variable as well, to search inside that variable.

### Element Properties and Methods

Can see all the properties of an element using `console.dir`, if needed.

`textContent` and `innerText` are very similar - content is newer, and gets all elements including script and style, where inner only shows the human readable elements for that tag and won't show hidden items.

`innerHTML` and `outerHTML` - inner will return all the HTML inside your provided tag, where outer will also include the selected tag.

`insertAdjacentText` (also element & HTML) - takes position and element/text provided and adds to the indicated position. Positions `beforebegin` and `afterend` will go outside the target element; `afterbegin` and `beforeend` will go inside the target element.

```js
const pizzaList = document.querySelector('.pizza');
pizzaList.insertAdjacentText('beforeend', '🍕');
```

### Working with Classes

`className` will give the name of any classes attached to element - however, often you can use `classList` instead and get a few methods as well.

```js
const pic = document.querySelector('img');

// add will add a class to the list
pic.classList.add('open');
// remove takes a class off the list
pic.classList.remove('cool');
// toggle will add or remove the class, depending on if it's already in the list or not
pic.classList.toggle('change');
// contains returns a true/false value to check if the name is in the list
pic.classList.contains('round');
```

### Data Attributes

Can make custom attributes using the `data-` tag! Better way to add your own attributes, should you need them.

To access those attributes, call `.dataset` - will return an object with whatever data properties you've created.

```js
const custom = document.querySelector('.custom');
// if you want the specific property you made, use dot notation
custom.addEventListener('click', () => {
  alert(`Welcome ${custom.dataset.name}!`)
})
```

### Creating HTML

Standard way - `document.createElement('tag');`

Can then add attributes or classes to item - it's a real item stored in memory.

To then add your new element to the DOM, use `.appendChild()` - will add it to the end of whichever element you add it to.

When you modify the DOM, it causes a reflow, so will actively repaint the DOM for each call. So often best to use as rarely as possible - so add multiple items to each other first, then to the DOM once (or as few times as needed).

Can also use `insertAdjacentElement` to attach to the DOM - works like the text version we used, but attaches to elements.

When making multiple items, can also clone nodes -
`const item = prevItem.cloneNode()`

If you pass true, it will go "deep" and add in any children already set up as well (so for making a list, can clone a previous `li` item, passing true will also clone the text).

### HTML from Strings

If you've got a long list of items to add, you can use strings with valid HTML to add everything directly.

```js
const item = document.querySelector('.item');

item.innerHTML = `
<div>
  <h1>Hey How are ya?</h1>
</div>
`
```

If using backticks, will work basically like templating in any other language! So can add variables and such into the strings.

Another way is to turn our HTML string into a fragment (will turn the string into DOM elements before we add them to the page), using a range (a collection of HTML elements). Helpful if you'll need to modify or add things to your string created elements.

```js
const myHTML = `
  <div class="wrapper">
    <h2>Cute ${desc}</h2>
    <img src="${src}" alt="${desc}"/>
  </div>
`;

const myFragment = document.createRange().createContextualFragment(myHTML);
```

Can then use `append` to add it to the DOM.

> **IMPORTANT NOTE:** XSS (cross site scripting) is a thing to consider with this - make sure you sanitize your text inputs, so folks can't put HTML into your page!

### Traversing & Removing Nodes

Difference between node and element - if you select `.children` from an item, you'll get any tags that are listed inside it - these are elements. Everything counts as a node, however, so if you get `.childNodes` from an item, you'll get tags and any text inside.

Other ways to grab **elements** (these are chainable, if needed):

- firstElementChild
- lastElementChild
- previousElementSibling (if you have multiple items with the same tag or class, will grab the previous sibling if available)
- nextElementSibling
- parentElement

Other ways to grab **nodes** (also chainable):

- firstChild
- lastChild
- previousSibling
- nextSibling
- parentNode

Nodes will grab text items as well!

If you need to remove something, fairly easy - `.remove()`

Will still have access to item if created in JS as it stays in memory - will be removed from the page, but can still access it programmatically.

## Events

### Event Listener

Go get something, listen for something, do something - essentially how an event listener works ;)

```js
button.addEventListener('click', function() {
  console.log('Callback!');
});
```

Can pass a named function for the callback as well - does not need the `()` at the end, since you're not actively calling it when describing it.

Can also use `.removeEventListener`! Pass in event you want to stop listening for and function to stop running. Will work best if you're passing in a named function, since remove needs to know what function it's removing.

To listen on multiple items:

```js
const buyButtons = document.querySelectorAll('button.buy');

function buyItem() {
  console.log('Buying item');
}

buyButtons.forEach(function(buyButton) {
  buyButton.addEventListener('click', buyItem);
})
```

### Targets, Bubbling, Propagation, Capture

In our callbacks, we get access to one parameter - the event that occurred. This gives us tons of information we can use in the callback.

A common one is `event.target` - the specific item the event happened on. Can then access other dataset info or other specific items for that target.

`event.currentTarget` is very similar, but gives the inner element that fired the event - so if you had a strong tag inside your button, `target` would be the button itself, while `currentTarget` would be the strong tag (if that's what you clicked to fire the event).

**Propagation** - events will bubble up, from the item triggered all the way up each item above it to the window, browser, even OS. Sometimes this can be helpful (if your trigger is on a button but you clicked an inner item, for instance), but sometimes you don't want it to bubble all the way up to the window. Can use `.stopPropagation()` to prevent further bubbling.

Can also trigger event listeners to work going down first, instead of up. This chart shows an example of the directions:

![Flow chart from W3C of event flow](https://www.w3.org/TR/uievents/images/eventflow.svg)

So we can have a listener on the window, and pass in `capture` to the listener to have it trigger before our button triggers, and can even use `.stopPropagation()` to stop the button trigger from even happening.

```js
  window.addEventListener(
    'click',
    function(event) {
      console.log('Window click detected`);
      // can add the below line to prevent further events from firing
      // event.stopPropagation();
    },
    { capture: true});
```

### Prevent Default & Form Events

`event.preventDefault()` will stop items that have default actions from performing their default actions.

```js
  const link = document.querySelector('.link');

  link.addEventListener('click', function(e) {
    // Bonus! confirm gives a popup with a ok & cancel button
    const shouldChangePage = confirm('Do you wish to navigate away from this page?');
    if (!shouldChangePage) {
      e.preventDefault();
    }
  });
```

Another common default happens on forms - `submit`.

Can grab the form by the name attribute - anytime we want to find an item by it's name in our HTML, can do that like this:

`const signupForm = document.querySelector('[name="signup"]')`

Inside our callback handler, can access form values either directly from `currentTarget` or like above w/ a query selector.

Other events you might see in forms:

- `keyup` - after a key is pressed, when it's released
- `keydown` - when a key is pressed down
- `focus` - when an input item is highlighted, focused on
- `blur` - when an input loses focus

### Accessibility Gotchas & Keyboard Codes

Common concerns with accessibility:

**Buttons** are used to perform actions when clicked. **Links** are used to change the page.

Watch your event listeners! If you're going to do an event on a mouse item, make sure that can also be handled without a mouse.

Example: say we have a photo that we want to enlarge when someone clicks on it. The best option would be to make a button and put the image inside it. But if we didn't do that, we should give our image a `tabindex` of 0, so it will show up in the tab flow. And also we should make a second event listener for `keyup` (will want to check `event.key` for the enter key) so that it triggers the same event as the click when we interact with it.
