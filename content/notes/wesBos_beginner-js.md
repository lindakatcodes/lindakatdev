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

#### Null and Undefined

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

#### Call stack and stack trace

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

### Traversing and Removing Nodes

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
      console.log('Window click detected');
      // can add the below line to prevent further events from firing
      // event.stopPropagation();
    },
    { capture: true});
```

### Prevent Default and Form Events

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

```js
const signupForm = document.querySelector('[name="signup"]')
```

Inside our callback handler, can access form values either directly from `currentTarget` or like above w/ a query selector.

Other events you might see in forms:

- `keyup` - after a key is pressed, when it's released
- `keydown` - when a key is pressed down
- `focus` - when an input item is highlighted, focused on
- `blur` - when an input loses focus

### Accessibility Gotchas and Keyboard Codes

Common concerns with accessibility:

**Buttons** are used to perform actions when clicked. **Links** are used to change the page.

Watch your event listeners! If you're going to do an event on a mouse item, make sure that can also be handled without a mouse.

Example: say we have a photo that we want to enlarge when someone clicks on it. The best option would be to make a button and put the image inside it. But if we didn't do that, we should give our image a `tabindex` of 0, so it will show up in the tab flow. And also we should make a second event listener for `keyup` (will want to check `event.key` for the enter key) so that it triggers the same event as the click when we interact with it.

## Serious Practice Exercises

### Etch a Sketch

Building an Etch-a-Sketch in the browser! A few random notes:

- This project uses the `canvas` tag in HTML, to allow us to draw. The tag itself has a set width and height in the code, and then in the CSS for the page we set the width and height to half that size. This is so, on higher resolution screens, things should come out nice and crisp looking.
- canvas will have a `context` setting, which is what we'll need to grab to actually draw on the canvas. Canvas is the element - we draw on the context.
- Default action for arrow keys is to move the page.
- `hsl` has a hue value that's between 0 and 359. Browsers will automatically handle the re-setting of the hue value if it goes over 359, and wrap back around for us!
- In the third part of an event listener call, we can pass `once: true` to unbind the event listener after it's done, so it won't keep adding the same listener multiple times.

### Click Outside Modal

- One way to hide a modal window before you need it: set `opacity` to 0 and set `pointer-events` to none. Will still be on the screen (just not visibly since no opacity), but will not capture any pointer events, so can click things that might be under it. Then, when you want it to be visible, change the `opacity` and set `pointer-events` to all.
- If you've got an individual piece of a larger group, and want to grab that specific group it's in, can use `.closest`. Similar to query selector, but goes up instead of down.

```js
const button = event.currentTarget;
const card = button.closest('.card');
```

### Scroll Events and Intersection Observer

Can use scroll event to track how far from the top and the height of the item that's scrolling, but will likely be easier to use intersection observer.

Will make a new instance, which takes a callback and set of options if needed. Then you tell that instance to observe the element you want to watch.

```js
function obCallback(payload) {
  if (payload[0].intersectionRatio === 1) {
    // actions here
    ...
    ob.unobserve(terms.lastElementChild);
  }
}

const ob = new IntersectionObserver(obCallback, {
  root: terms,
  threshold: 1
});

ob.observe(terms.lastElementChild);
```

### Tabs

- In most cases, if a property is listed with a - in HTML, you can use it in JS with camelCase. However, for aria and custom properties, you'll want to use `setAttribute` to have the property update.

```js
tab.setAttribute('aria-selected', false);
```

- When possible, you can style things by aria-labels and properties - so instead of having to keep track of classes and labels, you can simply have the accessible labels/properties. Less to update or code!

## Logic and Flow Control

### BEDMAS

 Order of operations!

- **B**rackets (also Parenthesis)
- **E**xponents
- **D**ivision
- **M**ultiplication
- **A**ddition
- **S**ubtraction

### Flow Control with If Statements, Function Returns, Truthy, Falsy

**If Statements** - will evaluate a condition to see if it's true or false; if true, will run the code in the provided block. Important to note that it runs top down, so the first if condition that evaluates to true ends the chain (so any other `else if` blocks won't be seen).

**Return** - if you return inside a function, it will stop the rest of the function from running (will often see it instead of an `else` call inside a function).

```js
function slugify(sentence, lowercase) {
  let slug = sentence.replace(/\s/g, '-');
  if (lowercase) {
    return slug.toLowerCase();
  }
  // will only be reachable if the if statement is false
  return slug;
}
```

Can use methods or functions inside `if` statements if they return a boolean.

**Truthy & falsy** - in `if` statements, JS will try to coerce an expression into a boolean. However, some values are not actually true or false, but will evaluate that way in expressions. Often used to check if something exists.

Truthy Values:

- Any number (positive or negative)
- Any string with a value (even an empty space ' ')
- Empty array
- Empty object

Falsy Values:

- 0
- undefined
- null
- NaN
- empty string ''

### Coercion, Ternaries and Conditional Abuse

**Coercion** - Force something of a different type to be a real boolean - often with `!`. Will be able to check the truthy/falsy-ness of a value and if it exists or not. A single bang (`!`) is the opposite of the truthy/falsy-ness of a variable.

```js
const name = "wes";
// !name = false
// !!name = true
```

**Ternary** - Shorthand if statement, needs 3 things: a condition, if true, & if false

```js
const count = 2;
const word = count === 1 ? 'item' : 'items';

function showAdminBar() {}
const isAdmin = true;
// if you want to do nothing, can use null
isAdmin ? showAdminBar() : null;
// && trick - since JS will short circuit when it reaches false conditions, can use this to avoid using the null setting
isAdmin && showAdminBar();
```

### Case Switch and Animating a Turtle with CSS Variables

**Switch statement** - Block with a number of cases where the values are specific - can't do `> 20` or something similar. Will them react on whichever case it matches.

```js
switch (event.key) {
  case 'ArrowUp':
    y = y - 1;
    break;
  case 'ArrowDown':
    y = y + 1;
    break;
  default:
    console.log('Not a valid move');
    break;
}
```

Also - if you need to set a CSS variable in your JS, can use `setAttribute` to access it.

```js
const turtle = document.querySelector('.');
turtle.setAttribute('style', `--x: ${x * speed}px;`)
```

### Intervals and Timers

To run code once after a certain set of time, you'll use a timer - to run it multiple times after a certain set of time, you'll want an interval.

```js
setTimeout(function() {
  // do some code here - this is your callback function, then you'll pass the time to run it after
}, 500);

// can also pass in defined functions
// does not run right away - the first run will start after the first timer amount
setInterval(buzzer, 100);

// You can pass functions as parameters too! So if you wanted something to run immediately, and then at intervals, can make your own function like this:
function setImmediateInterval(funcToRun, ms) {
  // by calling the function parameter here, it will call the function you pass in
  funcToRun();
  //
  return setInterval(funcToRun, ms);
}

setImmediateInterval(buzzer, 2000);

// If we save the reference to the timer, we can then clear it to stop it from running - works with timers and intervals
const bombTimer = setTimeout(destroy, 5000);

window.addEventListener('click', () => {
  console.log('You saved the world');
  clearTimeout(bombTimer); // for intervals - clearInterval(IntToClear);
})
```

## Data Types

### Objects

Groups of properties/keys and values. Most used where the order of the properties doesn't matter. Values can be any type.

```js
const age = 100;
const person = {
  name: 'wes',
  // if you have a variable and key with the same name, can just pass the name
  age,
  // can use dashes or spaces if needed, wrap in quotes
  'really-cool': true,
  // nested properties
  clothing: {
    shirts: 10,
    pants: 2,
  }
  // if you have a function in an object, it's called a method - the this keyword will be bound to the object
  // can also use shorthand of sayHello(greeting = 'Hey') {}
  sayHello: function(greeting = 'Hey') {
    return `${greeting} ${this.name}`;
  }
};
// can also add properties after creation
person.job = 'web developer';
// and can update properties
person.age = 50;
// another way to access properties - can use strings stored in variables, or for property names with dashes or spaces
person['really-cool'];
// to remove a property
delete person.job;
// to clear a variable, can set to undefined or null
```

Even though our object is declared with a `const`, you can update the properties - properties can change, but the actual named object can't be overwritten completely. If you need to freeze the values of an object, call `Object.freeze(person)` - won't affect the initial object, but will create a version that is frozen.

### Object References vs Values

With variables, if you set one value equal to another, it will copy that value into the new variable. If you update the original value, the copy will *not* update.

```js
let name1 = 'wes';
let name2 = 'scott';

// if we set name1 to be equal to what's in name2
name1 = name2;
// the value in name1 is now the string 'scott' - it copies the value stored in name2 and sets it to be set in name1
// if we then change the value in name2
name2 = 'westopher';
// name1 still equals 'scott', while name2 is now 'westopher'
```

However, if we're comparing objects, they're checked by reference - so if you have two objects that have the same contents but different variable names, they won't be considered equal - because they're pointing to different objects.

```js
// so if we make an object
const person1 = {
  first: 'wes',
  last: 'bos',
}
// then set a new variable to be pointing to person1 - it will be a reference; it won't copy the values into the new variable, it points to the original
const person2 = person1;
// however now, if we update a value in person2 - it will ALSO update the value in person1, since they're both pointing to the same object
person2.first = 'Larry';
// now both person2.first and person1.first are both set to 'Larry'
```

If we want to make a copy of an object (a new version, not a reference to the original), we can use the `spread` operator. It will take an object and *spread* the values into a new object.

```js
const person3 = { ...person1 };
```

A slightly older/original way to do this is:

```js
const person3 = Object.assign({}, person1);
```

Still works well, just not quite as popular anymore since `spread`

> Spread is only one level deep (a shallow copy) - so if we have nested values, updating them in our `person3` object will ALSO update the `person1` object.

If you need a deep copy (all the values copied over), you'll likely need a library that provides a function to do that - will need to recursively go through the object to copy everything over.

With `spread`, order matters - if you have properties in multiple objects that use the same name, the last one you spread in will win.

With strings and single values, if you pass them into a function, the original value is not changed - it passes the value into the function, so only the value inside the function is updated. However, if you pass an object into a function, it **WILL** update the original object as well!

### Maps

Maps are similar to objects, but will have a few differences.

```js
const person1 = {
  name: 'wes',
  age: 200,
}

const myMap = new Map();
// Map has a few nice syntax things
// to add entires to our map, use .set()
myMap.set('name', 'wes');
// one nice thing is we can use any value for our keys, like numbers or objects
myMap.set(100, 'this is a number');
myMap.set(person1, 'Cool person');
// we can use .get() to grab the value stored in our entries
myMap.get(person1) // will return the value 'cool person'
// to delete an entry, use .delete()
myMap.delete('name');
// if you need to know if a key exists in a map, use .has()
myMap.has(100); // will return a boolean
```

You can use dot notation to add a property, but it will be a property on the map, not an entry.

In maps, order is *guaranteed* - the order we put them in will be the order they stay in. Can also use `myMap.size` similar to length, if we need to know how many entries there are.

Use a map if order is important. However there is no literal - we always need to use the `new` keyword to make a map. If you know what data to pass, you can pass in arrays to set the values.

```js
new Map(['name', 'wes'], ['age', 49])
```

Cannot put functions/methods in maps. Maps also don't currently handle JSON, so can't convert your maps with `json.stringify` - will need to convert it to an object first.

### Arrays

Holds a list of items where the position matters. Arrays have no keys - they use indexes instead. It has the `typeof` object.

```js
const names = ['wes', 'kait', 'snickers'];

// we use the index of an item (0 based) in square brackets to access it
console.log(names[0]);

// add items to END of the array
names.push('lux');

// add to FRONT of the array
names.unshift('poppy');

// can use spread method if you want to add in the middle
// if you want to go to the end, can simply only provide a starting index to slice
const bikes = ['bianchi', 'miele', 'panasonic', 'miyata'];
const newBikes = [
  ...bikes.slice(0, 2),
  'benotto',
  ...bikes.slice(2),
];
```

`Mutable` methods perform mutations - they change the original version. `Immutable` return a new version that's changed, leaving the original as is.

```js
// if you need to use a mutable method but DON'T want to change the original, can make a copy of the array to work on
const numbers = [1, 2, 3, 4, 5, 6];
const numbersReversed = [...numbers].reverse();

// Two common ones - slice (immutable) and splice (mutable)
// using slice will leave the original array as is - will grab from the start index up to (but not including) the end index
const slice = numbers.slice(2, 5); // will return 3, 4, 5

// using splice will change the original array - provide the index to start at and number of items to remove (optional items to add in as well)
const splice = numbers.splice(1, 2); // will remove 3, 4 from original array
```

```js
// find and delete example
const comments = [
  { text: 'Cool Beans', id: 123 },
  { text: 'Love this', id: 133 },
  { text: 'Neato', id: 233 },
  { text: 'Good bikes', id: 333 },
  { text: 'So good', id: 433 },
];

function deleteComments(id, comments) {
  // find the index where our comment to remove is - since comment is an object, will use dot notation on the id field
  const commentIndex = comments.findIndex(comment => comment.id === id);
  return [
    ...comments.slice(0, commentIndex),
    ...comments.slice(commentIndex + 1)
  ];
}
```

### Static Methods

Static methods are sort of like utilities - they're used with the keyword `Array` and are not specific to a created array.

```js
// can use .of to create a new array from the values provided
// if an item has a length, can also spread it into an array
Array.of('wes', 'kait'); // ['wes', 'kait']
Array.of(...'wes'); // ['w', 'e', 's']

// can use .for to make an array of a certain length, with a value passed in if desired
function createRange(start, end) {
  // will use anything that has a length to determine how many spaces to make
  const range = Array.from({ length: end - start }, function (item, index) {
    // this will then put this number into the indexed slot
    return index + start;
  });
  return range;
}

// use .isArray to see if it is an array
Array.isArray(myRange);

// A few object static methods that return arrays:
const meats = {
  beyond: 10,
  beef: 5,
  pork: 7,
}

// .entries makes each item it's own array and returns all values
Object.entries(meats); // [['beyond', 10], ['beef', 5], ['pork', 7]]
// .keys makes an array of just the keys
Object.keys(meats); // ['beyond', 'beef', 'pork']
// .values makes an array of just the values
Object.values(meats); // [10, 5, 7]

// short destructuring example:
Object.entries(meats).forEach(([meat, qty]) => {
  // can destructure / "split up" the values either in the parameters, or inside the loop
  // if inside the loop, would pass entry in the parameters, then do:
  // const [meat, qty] = entry;
  console.log(meat, qty);
})
```

### Instance Methods

Instance methods work directly on your specific array (also called prototype methods).

```js
// make a string from your array with .join
const buns = ['egg', 'wonder', 'brioche'];
buns.join(' or '); // 'egg or wonder or brioche'

// string method, can turn a string into an array with .split
const foodString = 'hot dogs, hamburgers, sausages, corn";
foodString.split(','); // ['hot dogs', 'hamburgers', 'sausages', 'corn']

// adding and removing items
const toppings = ['Mushrooms ', 'Tomatoes', 'Eggs', 'Chili', 'Lettuce', 'Avocado', 'Chiles', 'Bacon', 'Pickles', 'Onions', 'Cheese'];

// .pop and .shift will return the item you removed
// .push and .unshift will return the new length of the array

// take last item off array
const lastItem  = toppings.pop();
// add it back to end
toppings.push(lastItem);
// take first item off
const firstItem = toppings.shift();
// add it back to beginning
toppings.unshift(firstItem);

// can also do these in an immutable way
let newToppings = toppings.slice(0, toppings.length - 1);
newToppings = [...newToppings, toppings[toppings.length - 1]];

// making copies with slice and spread
const toppingsCopy = toppings.slice(0);
const toppingsCopy2 = [...toppings];

// remove items with .splice
toppingsCopy.splice(3, 5);

// find index of Avocado with .indexOf / .lastIndexOf
// indexOf will find the FIRST instance; lastIndexOf will find the LAST instance
const avoIndex = toppings.indexOf('Avocado');

// check if item exists in array with .includes
const isInToppings = toppings.includes('Hot Sauce');

// reverse the list
const toppingsReversed = [...toppings].reverse();
```

### Callback Methods and Function Generation

```js
  // Can pass callback functions directly, or store in a variable and pass the variable
  const findBurgRating = (singleFeedback) => singleFeedback.comment.includes('burg');

  const burgRating = feedback.find(findBurgRating);

  // A nice tip - if you have a bunch of helper functions like this, can store them in an object, to keep things organized
  const util = {
    findBurgRating: function (singleFeedback) {
      return singleFeedback.comment.includes('burg');
    }
  }

  // High order functions - functions that return other functions
  // This way, if we want to be able to search for multiple terms, we don't need a function for each word - just the one that will work for all of them
  function findByWord(word) {
    return function(singleFeedback) {
      return singleFeedback.comment.includes(word);
    }
  }

  // If working with an object, remember we can use Object.entries/values/keys to turn it into an array
  const meats = {
    beyond: 10,
    beef: 5,
    pork: 7
  }
  // .some will see if at least one of the values meets our criteria
  const isThereEnoughMeat = Object.values(meats).some(meatValue => meatValue >= 5);

  // .every will make sure all of them meet our criteria
  const isEnoughOfEveryMeat = Object.values(meats).every(meatValue => meatValue >= 3);

  // Sort orders by turning args into strings, then sorts alphabetically
  // But can be given a compareFunction, so you can control how it sorts
  // The function access first value and second value
  // Returning -1 puts first value first (f < s)
  // Returning 0 keeps things in the order they're in
  // Returning 1 puts second value first (s < f)
  const numbers = [1, 2, 100, 3, 200, 400, 155];
  const numbersSorted = numbers.sort(function (firstItem, secondItem) {
    // typically would look like this:
    // if (firstItem > secondItem) {
    //   return 1;
    // } else if (secondItem > firstItem) {
    //   return -1;
    // } else {
    //   return 0;
    // }

    // however since we're sorting numbers, can just directly use the numbers (as long as you're returning a 0, positive num, or negative num, it will work)
    return firstItem - secondItem;
  })

  // Can work with objects too!
  const prices = {
    hotDog: 453,
    corn: 234,
    sausage: 634,
    burger: 765
  }

  const sortedByPrice = Object.entries(prices).sort(function (a, b) {
    // .entries gives us an array of nested arrays, where each line is [key, value]
    const aPrice = a[1];
    const bPrice = b[1];
    return aPrice - bPrice;
  });
  // Then if we wanted that back as an object, can do that
  console.table(Object.fromEntries(sortedByPrice));
```

## Gettin' Loopy

### forEach

`.forEach` will run once for each item in the Array. Does NOT actually return anything - just does whatever work you pass it.

```js
// .forEach gives us access to the item, it's index, and the full array in our callback
function logTopping(topping, index, origArray) {
  console.log(topping);
  // next topping
  const nextTopping = origArray[index + 1];
  nextTopping ? console.log(nextTopping) : null;
  // prev topping
  const prevTopping = origArray[index - 1];
  prevTopping ? console.log(prevTopping) : null;
  // if last item, say goodbye
  index === origArray.length - 1
   ? console.log('goodbye')
   : console.log('getting next topping')
}

toppings.forEach(logTopping);
```

### Mapping

Side effects happen when you're reaching something outside of your function and modifying it (like adding an event listener or putting something on the page). Sometimes, though, you want to simply access your data, modify it, and return that changed data - not reaching outside the function. JS has a few functions that handle this use case.

`.map` works sort of like a machine - it takes data in, does something to it, and returns it. It will always return the same number of values that it takes in - there's no way to return less items. Can chain multiple maps together, since it will always return an array.

```js
const fullNames = ['wes', 'kait', 'poppy'].map(name => `${name} bos`)
// can also do multiple things in a chain
function bosify(name) {
  return `${name} Bos`;
}

function capitalize(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

const fullNames = ['wes', 'kait', 'poppy']
  .map(capitalize)
  .map(bosify);

  // A few fun bonus things - .repeat & .fill
  // using .repeat will add a repeat of whatever it's attached to, x number of times
  'x'.repeat(3) // returns 'xxx'
  Array(3).fill('x') // returns ['x', 'x', 'x']

  // Most often, you'll likely need .map when working with objects, to get data into the format you want it
  const people = [
      {
        birthday: 'April 22, 1993',
        names: {
          first: 'Keith',
          last: 'Buckley'
        }
      },
      {
        birthday: 'January 3, 1975',
        names: {
          first: 'Larry',
          last: 'Heep'
        }
      },
      {
        birthday: 'February 12, 1944',
        names: {
          first: 'Linda',
          last: 'Bermeer'
        }
      }
    ];
  
  const cleanPeople = people.map(function (person) {
    // passing a string of a date into new Date turns it into a date
    const birthday = new Date(person.birthday).getTime();
    const now = Date.now();
    // we now have birthday and current time in milliseconds - to figure out age, can subtract those two numbers.
    // Then we'll convert those milliseconds into years (rough guess)
    // 1000 ms in s * 60 s in m * 60 m in h * 24 h in d * 365 d in y
    const age = Math.floor((now - birthday) / 31536000000);
    return {
      age,
      name: `${person.names.first} ${person.names.last}`,
    }
  })
```

### Filter, Find, and Higher Order Functions

```js
// using the cleanPeople object from last section
// filter will find every item in the array that matches our condition
const over40 = cleanPeople.filter(person => person.age > 40);
// .filter returns an array, so if we wanted to do a check on this we use length - it will be an empty array if there's no data
if (over40.length) {
  console.log('Yep, some older folks')
}

// find only finds one item in an array - returns a single item
const student = students.find(student => student.id === '565a')

// using higher order functions, we can make this really flexible - can pass in both the property we want, as well as the value
function findByProp(prop, propWeAreLookingFor) {
  return function isStudent(student) {
    return student[prop] === propWeAreLookingFor;
  }
}
const student2 = students.find(findByProp('first_name', 'Micki'))
```

### Reduce

`Reduce` executes a function on each element in an array, and gives you back a single output - could be a number, an object, etc depending on what the function you pass does.

```js
const orderTotals = [342, 1002, 523, 34, 634, 854, 1644, 2222];
// .reduce takes up to 4 params in it's callback - accumulator, current value, current index, and the source array
// can also take an initial value, so you can start from a certain point (otherwise, accumulator is the first array value on start)
// whatever you return from the function is what the accumulator is set to on the next pass through
function tallyNumbers(tally, currentTotal) {
  return tally + currentTotal;
}
// this will start from 0, and add up each value in our array to get a total sum
const allOrders = orderTotals.reduce(tallyNumbers, 0);

// another example
const inventory = [
  { type: 'shirt', price: 4000 },
  { type: 'pants', price: 4532 },
  { type: 'socks', price: 234 },
  { type: 'shirt', price: 2343 },
  { type: 'pants', price: 2343 },
  { type: 'socks', price: 542 },
  { type: 'pants', price: 123 },
]

function inventoryReducer(totals, item) {
  // need to see if our prop exists yet - if so, add one to it, otherwise initialize it - can do this two short ways
  // if this isn't true it becomes falsy, so will fall back to the || value
  totals[item.type] = totals[item.type] + 1 || 1;
  // or can use a ternary
  // totals[item.type] ? totals[item.type] + 1 : totals[item.type] = 1;
}

const inventoryCounts = inventory.reduce(inventoryReducer, {})
// will return { shirt: 2, pants: 3, socks: 2 }

// if we're doing simple math, can do this in a one liner
const totalInventoryPrice = inventory.reduce((acc, item) => acc + item.price, 0);
```

Here's a more detailed example using lots of stuff we just covered - grab all the text in a random webpage, get every letter and number in that text, and count how many instances of each value we found. Upper and lower case letters should count for the same (A === a). As a bonus, we'll also sort it so we can see which value is the most popular!

```js
const text = '...'; // this would be your whole text value
// We'll make a few helper functions to perform the actual work
function isValidChar(char) {
  // regular expression to grab anything that's a letter or number - the i makes it case insensitive
  return char.match(/[a-z0-9]/i)
}

const lowercase = char => char.toLowerCase();

function instanceCounter(counts, char) {
  counts[char]
    ? counts[char] = counts[char] + 1
    : counts[char] = 1;
  // make sure to return the new counts here - otherwise it will be undefined on the next loop through
  return counts;
}

function sortByValue(a, b) {
  return b[1] - a[1];
}

const result = text
  .split('') // split each char into an item of an array
  .filter(isValidChar) // filter so we only get the valid chars
  .map(lowercase) // make them all lowercase
  .reduce(instanceCounter, {}) // then count instances

const sortedResult = Object.entries(result).sort(sortByValue);
```

### For, For In, For Of and While Loops

`For` loops are the most basic variation of this - it takes in an initial expression, a comparison, and an increment expression. Great for looping over something x number of times.

```js
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i])
}
```

`For of` is used for looping over iterables (something with a length). Can use `await` inside here - used often with Promises. Returns the raw value - so if we did `for of` on an array of numbers, we'd get back the value for each number. Don't have access to the index.

```js
for (const num of numbers) {
  console.log(num); // will show 2, 32, 3, 23....
}
```

`For in` is similar, but used most for looping over keys of objects. Specifically will also grab the prototype values for the object (where something like `Object.entries` will only grab properties, not prototype data).

```js
for (const num in numbers) {
  console.log(num); // will show 0, 1, 2, 3.... (indexes)
}
```

`While` takes a condition and runs infinitely until that condition is false. `Do While` works similarly, except it will always run at least once before it checks the condition.

```js
// ALWAYS make sure that somehow you update your condition so it will eventually end! Otherwise you get an infinite loop and the tab/code will crash
let cool = true;
let i = 1;
while (cool === true) {
  console.log('you are cool');
  i++;
  if (i > 100) {
    cool = false;
  }
}

// layout of a do/while
do {
  console.log('you are cool');
  i++;
  if (i > 100) {
    cool = false;
  }
} while(cool === true)
```
