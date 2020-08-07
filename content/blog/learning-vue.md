---
title: Introductory Thoughts on Vue
blurb:
  A personal cheat sheet to help solidify my understanding of some Vue basics.
createdAt: 2020-03-07
tags:
  - vue
type: live
---

I've been wanting to learn a framework for a little while now, & it was recently advised to me that it would be smart to do job-wise. So I've finally decided to buckle down & choose one, & decided on Vue!

My reasoning - it's open source based; people I respect in the field rave about it & work on it; it's growing quickly; & it seemed to be a bit of a middle ground between React & Angular. Plus, I'm using a framework based on it for my personal blog already!

So I'm using this post as a basic, beginner's cheat sheet for examples of how to do things in Vue. This will be pretty simplified, and may not use the most accurate terminology - it will be more how my brain sees & thinks of it. I'm basing this off of the extremely well done Vue Mastery [Intro to Vue](https://www.vuemastery.com/courses/intro-to-vue-js) course - it's free and has videos, text, and challenges! Basically everything I write here is simply a retelling of it to help solidify my understanding - if anything doesn't make sense here, I highly recommend you check out their course, as it's explained way better than I can do!

So let's begin!

----

## The Vue Instance

Any time you'd like Vue to control a part of the DOM in a project, you'll create a new instance of Vue. Basically, this is a structured grouping of information needed for a piece of your site.

You declare the instance in your JS file, which will look something like this:

```js
var app = new Vue({
 el: '#app',  
 data: {
  product: 'Socks',
  description: 'A pair of warm, fuzzy socks'
 }
})
```

Anytime you're starting a new instance, you use the keyword new. Think of the Vue instance as a big object container, with lots of pieces of data (since that's essentially what you're doing - Vue holds a big options object, with all sorts of things). Here, we've got an "el", which stands for element - this is the ID you're trying to target in your HTML, the element this instance is going to be able to interact with. Then you can add some data, with whatever you'd like inside it. For these examples, it's building out a website to sell socks, so we've got a product & description listed.

Then in your HTML file, you can access the data from your Vue instance with double braces around the key word. This is a JS expression used in HTML - it's pretty neat! And since this is a JS expression, you can also use this to tie different pieces of data together & create new values.

```html
<div id="app">
 <div class="product-info">
  <h1>{{ product }}</h1>
  <p>{{ "Description: " + description }}</p>
 </div>
</div>
```

----

### Two quick side notes:

First - It's really easy to start using Vue - you can plug it into your projects with a script tag, like you would your style sheet or your regular JS files! (There's also a CLI tool to use it, but I haven't dug into that yet.)

Second - Vue is a reactive framework, which means that when you change a value in your Vue instance, anywhere it's referenced in your HTML will be updated automatically. This is almost like real magic, honestly. It's so cool.

----

## Data / Attribute Binding

We can also directly bind data to an attribute in Vue. Unlike the expressions we just talked about (which can be used on any sort of attribute we want, within our element attached to the Vue instance), this will be a piece of data that's directly tied to a specific HTML attribute.

Say this is our updated JS file:

```js
var app = new Vue({
 el: '#app',
 data: {
  product: 'Socks',
  image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
  link: 'http://www.vuemastery.com'
 }
})
```

We've added two new keys to our data object - an image & a link.

To bind this to a specific attribute, it will look like this in our HTML:

```html
<div class="product-image">
 <img v-bind:src="image" />
</div>
```

You'll use the `v-bind:` to show Vue you want to bind some data here, then you list which attribute you're binding to - in this case, the `src` attribute. Then, where you'd otherwise write in the source link, you write the key from your data object instead.

This doesn't just have to be for links - you can use it with text as well, or really any attribute where you want the data to be able to automatically stay updated.

Since this is a pretty common thing, there's also a short hand way to write this, which is just the colon:

```html
<div class="product-info">
 <h1>{{ product }}</h1>
 <a :href="link">Intro to Vue Course</a>
</div>
```

So it almost looks just like it normally would, only the href has a `:` in front of it, and instead of a url inside the quotes, we have the key from our data object.

----

One of the big reasons to use JS on your website is the ability to perform different actions based on logic. Typically, these work out as conditional logic (if/else) and looping over data (for loops especially). Good news - Vue makes this really easy!

----

## Conditional Rendering

Say we add a data field to our instance, to check if our socks are in stock or not. We can do that pretty easily!

In our JS file, we'll add an inStock key to our data section:

```js
var app = new Vue({
 el: '#app',
 data: {
  product: 'Socks',
  image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
  link: 'http://www.vuemastery.com',
  inStock: true
 }
})
```

Then, in our HTML, we can write two different options - one we want to show if they are available, and one to show when they're sold out.

```html
<p v-if="inStock">In Stock</p>
<p v-else>Out of Stock</p>
```

Pretty simple, right? It works on expressions too, not just truthy values, and there's even an `else if` option if we need more complex logic:

```html
<p v-if="inventory > 10">Available</p>
<p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
<p v-else>Out of Stock</p>
```

This works great for things that will be displayed conditionally whenever the page loads, or if something needs to update once or twice - but if you've got something that will need to toggle frequently, there's another option that's more performant - v-show.

The if/else option actually inserts and/or removes the elements, which could be problematic if something is changing regularly without a fresh page load. With show, the element is always present in the DOM - it just toggles a `display: none` property. This will work much better for something that needs to change multiple times.

```html
<p v-show="inStock">In Stock</p>
```

----

## Looping

Ok, let's say we have some details about our product that we want to be able to list out easily. For loop to the rescue!

In our data object of our Vue instance, we'll have this details array:

```js
var app = new Vue({
 el: '#app',
 data: {
  product: 'Socks',
  image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
  link: 'http://www.vuemastery.com',
  inStock: true,
  details: ["80% cotton", "20% polyester", "machine washable"]
 }
})
```

We can make that into a list in our HTML like so:

```html
<ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>
```

This basically works like a `for of` or `for in` loop, where we say "we want each piece in this collection". The name we pick for the piece doesn't really matter - it's an alias for what we want to call each piece of the thing we're looping over. The collection name will matter - that needs to line up with the name of your collection in your data object. Then, in the curly braces, we list what information we want from each piece.

This can work for arrays of objects as well! Say we have two different color variations of our socks - we can make elements that show this as well.

In our data, we'll have a variants array:

```js
var app = new Vue({
 el: '#app',
 data: {
  product: 'Socks',
  image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
  link: 'http://www.vuemastery.com',
  inStock: true,
  details: ["80% cotton", "20% polyester", "machine washable"],
  variants: [
    {
      variantId: 2234,
      variantColor: "green"
    },
    {
      variantId: 2235,
      variantColor: "blue"
    }
  ]
 }
})
```

In our HTML, we can then loop through each variant, and access the color field.

```html
<div v-for="variant in variants" :key="variant.variantId">
  <p>{{ variant.variantColor }}</p>
</div>
```

You'll see I have a key attribute listed as well - this is recommended with more complex nodes like this, so Vue has an easier time keeping track of each node. Here, it's using the id of each variant, though you could use any unique piece of an object.

----

There's so much more Vue can do - but this post is long enough as it is. If I'm able, I'll do another post for the other sections of the course, but for now, I have more learning to do!

Again, check out the Vue Mastery [Intro to Vue](https://www.vuemastery.com/courses/intro-to-vue-js) course if you have a chance! I've also got a [CodePen Collection of my challenge pens here](https://codepen.io/collection/XqVKjY) if you'd like to see the code at work.

Happy learning!
