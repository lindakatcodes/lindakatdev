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
