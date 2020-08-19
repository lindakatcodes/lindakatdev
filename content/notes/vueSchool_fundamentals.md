---
title: 'Vue Fundamentals'
blurb: Notes on Vue School's Vue Fundamentals course
tags:
  - Vue
  - Vue School
---

## Template Syntax

In template syntax, can use ternary option (this ? a : b), but not regular if statements or multiple expressions

## Lists

v-for directive

```html
<ul>
  <li v-for="item in items">{{ item }}</li>
</ul>
```

```js
new Vue({
  el: '#shopping-list',
  data: {
    items: [
      '10 party hats',
      '2 board games',
      '20 cups'
    ]
  }
});
```

## User Inputs

v-model - two way data binding - changes to either HTML or Vue instance for the bound item will appear on both instances

```html
<input v-model="newItem">
```

## User Events

v-on (@ shorthand) - captures events

in templates, Vue knows which instance we're referencing, so can call JS directly

if testing in the console, can use `$vm0` to access our Vue instance

```html
<button @click="items.push(newItem)">Save Item</button>
```

## Methods

specific functionality for Vue instance - functions we can call in our templates and instance to keep things cleaner

methods won't know which instance we mean, so need to use `this` keyword to specify

```html
<input v-model="newItem" type="text" placeholder="Add an item" @keyup.enter="saveItem">
```

```js
new Vue({
  el: '#shopping-list',
  data: {
    newItem: '',
    items: [
      ...
    ]
  },
    methods: {
      saveItem: function() {
        this.items.push(this.newItem);
        this.newItem = '';
      }
    }
});
```

## Conditional Rendering

v-if / v-else / v-else-if

logically decides if an item shows on the page or not - does not render element if statement is false

can also use `state` tag in Vue instance, to directly manage state of app

```html
<div class="header">
  <button v-if="state === 'default'" @click="changeState('edit')">Add Item</button>
  <button v-else @click="changeState('default')">Cancel</button>
</div>
```

```js
new Vue({
  data: {
    state: 'default',
    ...
  },
  methods: {
    changeState: function(newState) {
      this.state = newState;
      this.newItem = '';
    }
  }
})
```

## Attribute Binding

v-bind (:shorthand) directly binds HTML attribute to data

can be used for dynamic links, images

also good for disabling buttons when desired or ensuring minimum character requirements

```html
<button :disabled="newItem.length === 0" @click="items.push(newItem)">Save Item</button>
```

## Dynamic Classes

can apply CSS classes based on logic - can be object or array syntax

Object:
`:class="{strikeout: item.purchased}"`

property - class name to toggle
value - conditional logic

Array:
`:class="[item.purchased ? 'strikeout' : '']"`

more verbose, but more flexibility

bindings can keep track of multiple conditionals

```html
<li v-for="item in items" :class="{strikeout: item.purchased}" @click="togglePurchased(item)">{{ item.label }}</li>
```

```js
new Vue({
  data: {
    items: [
      {
        label: '2 board games',
        purchased: false
      }
    ]
  },
  methods: {
    togglePurchased: function(item) {
      item.purchased = !item.purchased
    }
  }
})
```

## Computed Properties

transformations or calculations performed on data, stays synced on data it references

needs to return a value - otherwise Vue doesn't know what to do

### If you need to change the actual data, use a method. To change the presentation of existing data, use a computed property
