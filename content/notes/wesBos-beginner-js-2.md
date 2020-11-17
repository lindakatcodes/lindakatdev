---
title: Beginner JavaScript part 2
blurb: Notes and Reminders while going through Wes Bos' Beginner JS course
tags:
  - JavaScript
  - Wes-Bos
---

## Gettin' Loopy

### forEach

`.forEach` will run once for each item in the Array. Does NOT actually return anything - just does whatever work you pass i

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
   : console.log('getting next topping');
};

toppings.forEach(logTopping);
```

### Mapping

Side effects happen when you're reaching something outside of your function and modifying it (like adding an event listener or putting something on the page). Sometimes, though, you want to simply access your data, modify it, and return that changed data - not reaching outside the function. JS has a few functions that handle this use case.

`.map` works sort of like a machine - it takes data in, does something to it, and returns it. It will always return the same number of values that it takes in - there's no way to return less items. Can chain multiple maps together, since it will always return an array.

```js
const fullNames = ['wes', 'kait', 'poppy'].map(name => `${name} bos`);
// can also do multiple things in a chain
function bosify(name) {
  return `${name} Bos`;
};

function capitalize(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
};

const fullNames = ['wes', 'kait', 'poppy']
  .map(capitalize)
  .map(bosify);

  // A few fun bonus things - .repeat & .fill
  // using .repeat will add a repeat of whatever it's attached to, x number of times
  'x'.repeat(3); // returns 'xxx'
  Array(3).fill('x'); // returns ['x', 'x', 'x']

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
    // 1000 ms in s *60 s in m* 60 m in h *24 h in d* 365 d in y
    const age = Math.floor((now - birthday) / 31536000000);
    return {
      age,
      name: `${person.names.first} ${person.names.last}`,
    };
  });

```

### Filter, Find, and Higher Order Functions

```js
// using the cleanPeople object from last section
// filter will find every item in the array that matches our condition
const over40 = cleanPeople.filter(person => person.age > 40);
// .filter returns an array, so if we wanted to do a check on this we use length - it will be an empty array if there's no data
if (over40.length) {
  console.log('Yep, some older folks')
};

// find only finds one item in an array - returns a single item
const student = students.find(student => student.id === '565a');

// using higher order functions, we can make this really flexible - can pass in both the property we want, as well as the value
function findByProp(prop, propWeAreLookingFor) {
  return function isStudent(student) {
    return student[prop] === propWeAreLookingFor;
  }
};
const student2 = students.find(findByProp('first_name', 'Micki'));
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
};
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
];

function inventoryReducer(totals, item) {
  // need to see if our prop exists yet - if so, add one to it, otherwise initialize it - can do this two short ways
  // if this isn't true it becomes falsy, so will fall back to the || value
  totals[item.type] = totals[item.type] + 1 || 1;
  // or can use a ternary
  // totals[item.type] ? totals[item.type] + 1 : totals[item.type] = 1;
};

const inventoryCounts = inventory.reduce(inventoryReducer, {});
// will return { shirt: 2, pants: 3, socks: 2 }

// if we're doing simple math, can do this in a one liner
const totalInventoryPrice = inventory.reduce((acc, item) => acc + item.price, 0);
```

Here's a more detailed example using lots of stuff we just covered - grab all the text in a random webpage, get every letter and number in that text, and count how many instances of each value we found. Upper and lower case letters should count for the same (A = a). As a bonus, we'll also sort it so we can see which value is the most popular!

```js
const text = '...'; // this would be your whole text value
// We'll make a few helper functions to perform the actual work
function isValidChar(char) {
  // regular expression to grab anything that's a letter or number - the i makes it case insensitive
  return char.match(/[a-z0-9]/i)
};

const lowercase = char => char.toLowerCase();

function instanceCounter(counts, char) {
  counts[char]
    ? counts[char] = counts[char] + 1
    : counts[char] = 1;
  // make sure to return the new counts here - otherwise it will be undefined on the next loop through
  return counts;
};

function sortByValue(a, b) {
  return b[1] - a[1];
};

const result = text
  .split('') // split each char into an item of an array
  .filter(isValidChar) // filter so we only get the valid chars
  .map(lowercase) // make them all lowercase
  .reduce(instanceCounter, {}); // then count instances

const sortedResult = Object.entries(result).sort(sortByValue);
```

### For, For In, For Of and While Loops

`For` loops are the most basic variation of this - it takes in an initial expression, a comparison, and an increment expression. Great for looping over something x number of times.

```js
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i])
};
```

`For of` is used for looping over iterables (something with a length). Can use `await` inside here - used often with Promises. Returns the raw value - so if we did `for of` on an array of numbers, we'd get back the value for each number. Don't have access to the index.

```js
for (const num of numbers) {
  console.log(num); // will show 2, 32, 3, 23....
};
```

`For in` is similar, but used most for looping over keys of objects. Specifically will also grab the prototype values for the object (where something like `Object.entries` will only grab properties, not prototype data).

```js
for (const num in numbers) {
  console.log(num); // will show 0, 1, 2, 3.... (indexes)
};
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
};

// layout of a do/while
do {
  console.log('you are cool');
  i++;
  if (i > 100) {
    cool = false;
  }
} while(cool === true);
```

## Harder Practice Exercises

### Face Detection and Censorship

Covers a lot of things we've done before - working with canvas, and reinforcing ideas.

Most interesting thing was how we did the pixelation! You grab an image from the webcam with the `.drawImage` method on the canvas context to get a tiny picture of the face. Then, you take that tiny image and draw it again, but to the full size of the face!

### Sarcastic Text Generator

Silly exercise changing text to different formats.

Main takeaway here is working with methods stored in an object. Since we have three filter options, we can make a method for each one and store them all in a single object. Then when we need one, we can access them with `objectName[filter]`;

### Shopping Form with Custom Events, Delegation and LocalStorage

A to-do list example, learning with events and storage.

First big thing this deals with is state - a way to keep track of the current "state" of our site. An object or array of data, which will always tell us the current data we have to make our site work.

Also covering custom events - we have a `displayItems` function that we will need to call multiple times. Coupling it too tightly with the `handleSubmit` function makes it so we're super likely to have duplicated calls or code, since we also want the list to update when something's removed, and rendered on a reload. So we can make custom events that anything can listen to.

```js
// Can dispatch the event from anywhere we want to trigger the event - here, we're calling it in our submit handler, since we just got new data
function handleSubmit() {
  // ... other code here
  // itemsUpdated can be called anything - that's the name we want for our event
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
// then we can add the listener to whatever we want - so this will call and fire our display function whenever our custom event is dispatched
list.addEventListener('itemsUpdated', displayItems);
```

We're also using localstorage here - basically a mini database that lives in your browser. So anytime a user comes back to the site from the same browser, the data will still be there. Local storage is **text only**, so will need to use `JSON.stringify` on objects to be able to store them.

```js
function mirrorToLocalStorage() {
  // add an item into localstorage
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  // then to get it out, we want to parse it back into an object
  JSON.parse(localStorage.getItem('items'));
}
```

One issue we run into here is that we want to listen for button clicks on our items so we can delete an item, but it re-renders the list each time we add a new item. So if we want to listen to events when they might not exist yet, we can add the listener to a parent item that WILL be there all the time. So instead of adding click events for each `li` item, we add the click event to the `ul`.

### Building a Gallery Exercise

Nice little image gallery, where you can click the images to open them larger in a modal. Main focus was using closures to be able to contain all the gallery logic so it can be reused for multiple galleries.

### Slider

A simple slide deck! More reinforcement of the same topics we used in the gallery exercise.

## Prototypes, This, New, and Inheritance

### The New Keyword

`new` creates a new instance of whatever object we're calling it on. This gives us a bunch of prototype functions that we can run on it. Some, like arrays and objects, have a literal syntax that abstracts away the need to use the `new` keyword (hence why we can make an array like `const names = ['wes', 'kait'];` and we get access to properties like `.pop`). However some don't have a literal syntax, so we need to use `new` in front of it to make a new instance and have access to new properties.

For the functions we define, if we call them with just the function name, we get back whatever that function returns. But if we call it with `new` in front, we get back a new instance of that function. Instead of just getting whatever result is returned from the function, we get our own copy of the function, along with any functions it might contain inside it.

### The This Keyword

`this` refers to the instance of an object that a function is bound to.

One example - if we create some buttons on a page, those are instances of a button element. If we then add an event listener to them, and pass in a function that logs what `this` is equal to, we'll get that button back.

```js
const button1 = document.querySelector('.one');

function tellMeAboutTheButton() {
  console.log(this);
  // this will show <button class="one">Button 1</button>
}
// the addEventListener method will now bind this function to our button, setting the `this` keyword to our button
button1.addEventListener('click', tellMeAboutTheButton);
```

`this` is always scoped to a function. This is why arrow functions act a bit different - they're scoped to whatever was bound before the function, so if they're globally defined `this` is equal to the window (instead of, say, our button we called it on).

This can be useful for nested functions. Since every time we call `this` it makes a new instance of it, if we have regular functions inside others, what `this` is equal to will change. However, since arrow functions keep the binding of whatever parent element they're in, they work excellent for situations like this.

```js
// here, the outside 'this' will be the button, but the inside 'this' will be the window
function tellMeAboutTheButton() {
  console.log('outside', this);
  // to fix this, you'll often see:
  // const that = this;
  setTimeout(function() {
    console.log('inside', this);
    // then this. would become that.
    this.textContent = 'You Clicked Me';
  }, 1000)
}

// but if we do an arrow function inside, both 'this' logs will be the button
function tellMeAboutTheButton() {
  console.log('outside', this);
  setTimeout(() => {
    console.log('inside', this);
    this.textContent = 'You Clicked Me';
  }, 1000)
}
```

You'll also see `this` used often when you're making functions intended to be used to make multiple, new versions of itself.

```js
function Pizza(toppings = [], customer) {
  // these will store a version of these values to each instance
  this.toppings = toppings;
  this.customer = customer;
  // this just returns a random hex value, not guaranteed to be unique but a wide enough range it works for small examples
  this.id = Math.floor(Math.random() * 16777215).toString(16)
}

// then when we make a new instance, we'll have a unique version stored
const pepperoniPizza = new Pizza(['pepperoni'], 'Wes Bos');
```

### Prototypes and Prototypal Inheritance

Prototypes allow us to share functionality between instances.

Say we want to give our Pizza function the ability to eat slices. If we declare the eat function *inside* of our Pizza function, that will make a new instance of that function for every Pizza we create. While this might work fine for small jobs where you only make 1 or 2 instances, it's not maintainable for larger jobs and will slow things down.

Instead, we can define the function once *outside* of the Pizza function and link it to that, so we can use the same function for every instance we create. This is why, if we have two different arrays, they use the same `filter` method - it's defined on the prototype, so it's the same function that can run on any instance of Array. This also allows us to only need to update the function in one place for it to apply to every instance.

![Screenshot of console showing pepperoniPizza instance with eat in the prototype](https://i.imgur.com/28hso6v.png)

Instances will first look inside themselves to see if that property exists. If not, it will go to the parent instance (the prototype) and see if it exists there. If so, it can use it.

Built in instances of methods can be overwritten - it's very rare you'll want to do this, but it is possible. Mostly, it's used for creating polyfills when a browser doesn't support that functionality yet. Can also add new methods to the prototype as well, though again it's not recommended for built ins.

### Bind, Call, and Apply

These functions are used to change the scope of what `this` means in functions.

Typically, `this` is defined by what's to the left of the `.` it's called on. So if we make an object and include a method, using `this.prop` inside that method will be bound to our object. However, if we make a variable storing a reference to that method then call it from the variable, `this` will now be bound to the window, not the object.

```js
const person = {
  name: 'Linda',
  sayHi() {
    // 'this' here is bound to this person object
    return `hey ${this.name}`;
  }
};

// but if we call it from here, 'this' is bound to the window, so we don't have access to the name value
const sayHi = person.sayHi;
```

> Important note: `this` is defined by where the function is being called, **NOT** where it is defined.

We can use `bind` to change where `this` is defined, or what it's bound to. `bind` lives on all functions - so if we wanted to use this same method with different name values, we can simply pass those to `bind` and still have the functionality we want.

```js
// if we re-write our variable with 'bind', it will make 'this' set to whatever we pass into it - so now we'll have access to the person object
const sayHi = person.sayHi.bind(person);

// another example - can use 'bind' to make a shorthand for querySelector
// since QS needs something to look inside of, we have to use 'bind' to store what we want to count as 'this'
const $ = document.querySelector.bind(document);
console.log($('p'));

// With `bind`, can also pass in arguments that apply to the function as well
const bill = {
  total: 1000,
  calculate: function (taxRate) {
    return this.total + (this.total * taxRate);
  }
}

// the first argument to 'bind' is always what you want to use for 'this'; everything else can be arguments to pass to the function in the order they're defined
const calc = bill.calculate.bind({ total: 500 }, 0.0825);
```

`call` and `apply` work very similarly to `bind`. Basically:

- To bind a function and call it later, use `bind` (returns a function)
- To bind a function and call it immediately, use `call` (runs function right away)
- The main difference between `call` and `apply` is that `apply` accepts a single array of arguments

```js
const bill = {
  total: 1000,
  calculate: function (taxRate) {
    return this.total + (this.total * taxRate);
  },
  describe(mealType, drinkType, taxRate) {
    return `Your meal of ${mealType} with a drink of ${drinkType} was ${this.calculate(taxRate)}`;
  }
}

// call will run this function immediately and store it in the variable
const myMeal = bill.describe.call(bill, 'pizza', 'beer', 0.13);
// apply will do the same thing, but takes the arguments as an array
const myMeal2 = bill.describe.apply(bill, ['pizza', 'beer', 0.13]);
```

## Advanced Flow Control

### The Event Loop and Callback Hell

JavaScript is single threaded - only one thing can be running at a time. It runs things asynchronously, so things won't always run in the order you write them.

If you need to chain multiple events together, you end up nesting multiple functions since they depend on each other. This is often called 'callback hell' - your code gets hard to read because it's so nested, and it can be difficult to troubleshoot.

```js
// a simple example of needing multiple nested functions - callback hell
const go = document.querySelector('.go');
// change the text to go when clicked
go.addEventListener('click', function (e) {
  const el = e.currentTarget;
  el.textContent = 'GO!';
  // make it a circle after 2 seconds
  setTimeout(function() {
    el.classList.add('circle');
    // make it red after 0.5s
    setTimeout(function() {
      el.classList.add('red');
      // make it square after 0.25s
      setTimeout(function() {
        el.classList.remove('circle');
        // make it purple after 0.3s
        setTimeout(function() {
          el.classList.remove('red');
          el.classList.add('purple');
          // fade out after 0.5s
          setTimeout(function() {
            el.classList.add('fadeOut');
          }, 500)
        }, 300)
      }, 250)
    }, 500)
  }, 2000)
});
```

### Promises

An IOU for something that will happen in the future. Often when we need to ask for data (a timer, an API request, etc), it takes time to complete that process. However we don't want to completely stop our pages from loading while we wait. With promises, we get a 'promise' back when we send off our requests, so eventually when the call or action is done we get a response back.

```js
// pizza is a great example - we call to place an order and get an order number (a promise of pizza in the future). then the pizza is cooked and eventually, when it's ready, we get the pizza!
function makePizza(toppings = []) {
  // will immediately return the promise we create - a promise gives us access to a resolve case and a reject case
  return new Promise(function (resolve, reject) {
    // pizza's need to cook - so we can set an amount of time based on how many toppings are on it
    const bakeTime = 500 + (toppings.length * 200);
    setTimeout(function () {
      // when it's done, resolve the pizza
      resolve(`Here is your pizza 🍕 with ${toppings.join(' ')} toppings`);
    }, bakeTime);
    // if something went wrong, we handle reject here
  });
}

// when we set it up, we get back a promise
const pepperoniPizza = makePizza(['pepperoni', 'cheese']);

// then to get the data from that promise, we call then on it
pepperoniPizza.then(function (pizza) {
  console.log(`Ahhh, got it! ${pizza}`);

// or, if our oven can only handle one at a time, we can chain promises to make a bunch of pizzas
makePizza(['pepperoni'])
  .then(function (pizza) {
    console.log(pizza);
    return makePizza(['ham', 'cheese'])
  })
  .then(function (pizza) {
    console.log(pizza);
    return makePizza(['peppers', 'onion', 'feta'])
  })
  .then(function (pizza) {
    console.log(pizza);
    return makePizza()
  })
  .then(function (pizza) {
    console.log(pizza);
    return makePizza(['one', 'two', 'three', 'four', 'five', 'six', 'seven'])
  })
  .then(pizza => {
    console.log('Final pizza!');
    console.log(pizza);
  })
});

// we can also run them concurrently, say if we have a huge oven that can make multiple at once
const pizzaPromise1 = makePizza(['ham', 'cheese']);
const pizzaPromise2 = makePizza(['pepperoni', 'pineapple', 'bacon']);
const pizzaPromise3 = makePizza(['cheese']);

// we can use the static method .all to wait until all are done, then return them all at once
const dinnerPromise = Promise.all([hamAndCheese, theBest, cheese]) {
  console.log({ hamAndCheese, theBest, cheese });
}
```

`Promise.all` only resolves when all of the promises passed in are resolved. There's also `Promise.race`, which will return the first promise that resolves from a group.

### Promises - Error Handling

It's also possible for us to handle errors with promises! We catch errors with the `.catch` method. Most promises will always have at least one `.then` to handle the success case, and a `.catch` to handle an error case. In a chain, the catch can go once at the end of the chain. However, note that anything after that error won't be completed.

```js
// our pizza function again, with error handling
function makePizza(toppings = []) {
  return new Promise(function (resolve, reject) {
    // reject if toppings includes olives
    if (toppings.includes('olives')) {
      reject('Seriously? No olives allowed!');
    }
    const bakeTime = 500 + (toppings.length * 200);
    setTimeout(function () {
      // when it's done, resolve the pizza
      resolve(`Here is your pizza 🍕 with ${toppings.join(' ')} toppings`);
    }, bakeTime);
  });
}

makePizza(['ham', 'olives'])
  .then(pizza => {
    console.log(pizza);
  })
  .catch(err => {
    console.log(`Oh no!! ${err}`);
  })

  // if we need to run a few promises and get them all no matter if one failed or not, can use this
  const p1 = makePizza(['pepperoni']);
  const p2 = makePizza(['olives']);

  const dinnerPromise2 = Promise.allSettled([p1, p2]);

  dinnerPromise2.then(results => {
    // this will give us the result of each one - so can grab ones that are fulfilled/resolved, or ones that are rejected
    console.log(results);
  })
```

### Refactoring Callback Hell to Promise Land

Taking our nested `setTimeout` function from earlier and converting it to use promises instead.

```js
function animate(e) {
  const el = e.currentTarget;
  el.textContent = 'GO';
  wait(200)
    .then(() => {
      el.classList.add('circle');
      return wait(500);
    })
    .then(() => {
      el.classList.add('red');
      return wait(250);
    })
    .then(() => {
      el.classList.remove('circle');
      return wait(500);
    })
    .then(() => {
      el.classList.remove('red');
      el.classList.add('purple');
      return wait(500);
    })
    .then(() => {
      el.classList.add('fadeOut');
    })
}
```

### Async Await

With async await, we don't change how our function that makes the promise is written. Our `makePizza` function from earlier stays the same. Async await changes how we call that function and get our results. Await only pauses that particular function - so the rest of your JS will continue running.

```js
function wait(ms = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

// can only use await in an async function - async tells the function there's going to be a call inside that needs to wait for something
async function go() {
  console.log('starting');
  // await pauses this function until the promise is resolved
  await wait(2000);
  console.log('running');
  // can have as many as you need
  await wait(200);
  console.log('ending');
}

go();

// Can mark any type of function as async.

// function declaration
async function fd() {}

// arrow
const arrowFn = async () => {}

// callback
window.addEventListener('click', async function () {})

const person = {
  // method
  sayHi: async function() {},
  // method shorthand
  async sayHello() {},
  // function property
  sayHey: async () => {}
}

async function makeDinner() {
  // to keep things performing well if you have multiple promises, can put await on a .all call
  const pizza1 = makePizza();
  const pizza2 = makePizza();
  const pizzas = await Promise.all(pizza1, pizza2);
  console.log(pizzas);
}

// updated version of the animate function
async function animate2(e) {
  const el = e.currentTarget;
  el.textContent = 'GO';
  await wait(200);
  el.classList.add('circle');
  await wait(500);
  el.classList.add('red');
  await wait(250);
  el.classList.remove('circle');
  await wait(500);
  el.classList.remove('red');
  el.classList.add('purple');
  await wait(500);
  el.classList.add('fadeOut');
}
```

### Async Await Error Handling

Since we don't have `.then` in async await, we can instead use try & catch to catch the errors, if they happen.

> When a function is marked as async, it automatically returns a promise.

```js
async function go() {
  // anything that resolves/fulfills will happen here
  try {
    const pizza = await makePizza(['olives']);
    console.log(pizza);
  // then any errors will be caught here
  } catch (err) {
    console.log(`Ewww! ${err}`);
  }
}

// can also mix and match, and put the catch at the end of the await
async function go() {
  const pizza = await makePizza(['olives']).catch(handleError);
}

// or can handle the error when we call the function - can also catch unrelated errors
go().catch(handleError);

// if your function and error handler will need to be used multiple times, can also write a higher order function, and make a variable with the error handler attached
function makeSafe(fn, errorHandler) {
  return function () {
    fn().catch(errorHandler)
  }
}

const safeGo = makeSafe(go, handleError);
safeGo();
```

### Async Await Projects

Quick note on pure functions - a "pure" function is a function that given the same inputs, will always return the same output. Dates and random numbers do *NOT* fit into this, since they, by nature of time passing / randomization, will always be different when you run them.

If you want a random number generator to be easily testable, you can pass in the random value as an argument. So you can test it with a consistent number, then when you're ready to use it pass in `Math.random`.

```js
function getRandom(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}
```

## Ajax and Fetching Data

### Ajax and APIs

API (application program interface) is a way that sites will store their data which we can call and use in our own sites. Most often they'll return that data in JSON. The API servers will return that data in a string, so we'll need to use `JSON.parse` on it to turn it into an object we can use.

Browsers have a built in way to get data from outside sources and bring them into your file, called `fetch`. Fetch returns a promise, which we can then get the JSON from.

```js
const endpoint = 'https://api.github.com/users/wesbos';

const wesPromise = fetch(endpoint);
wesPromise.then(response => {
  // the response we get can contain different data depending on what we fetched - alot of APIs return JSON, so we need to convert it
  return response.json();
}).then(data => {
  // now we have the data in a format we can use
  console.log(data);
}).catch(handleError)
```

### CORS and Recipes

Often, we can pass variables to API urls - these will go after a `?` in the url. What exactly they'll look like varies by API, but it'll always start with a `?` and if multiple are allowed, they'll be separated by `&`.

CORS (cross origin resource sharing) - by default, you can't share data from one domain name to another; this helps keep sites secure. In order to share data (like when we fetch an API), the server we want to get data from needs to have a CORS policy on their server.

If they don't have a CORS policy, you've got two options - run your own server that handles fetching the data and sending it to your front end (server - server fetching doesn't need CORS, it's more for sending it directly to a browser), or you can use a CORS proxy (someone else's server that processes the data and then sends it to your front end). **DO NOT** use a proxy if you're getting sensitive data!! Will be fine for test APIs that don't contain sensitive information.

If you run into a `regeneratorRuntime` error - probably a Babel issue with trying to compile an async function. To fix, add a 'browserslist' property to your `package.json` file that supports 'last 1 chrome versions'.

```js
const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = `https://cors-anywhere.herokuapp.com/`;

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
  const data = await res.json();
  return data;
}
```
