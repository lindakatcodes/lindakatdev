---
title: 'Real World Vue'
blurb: Notes on Vue Mastery's Real World Vue course, first in the series
tags:

- Vue
- Vue-Mastery
---

## Project Breakdown

public folder - for files not run through webpack (images, etc)

src folder - application specific files

- assets - images, fonts, etc
- components - building blocks of app
- views - files for different pages

app.vue file - root component, nests all of the individual parts
main.js file - renders app and mounts to DOM
also files for router and store/vuex, plus config files

## Router

Three main parts in routes - path, name, component to render

```js
export default new Router({
  routes: [
    {
      path: "/", //the url path
      name: "home", //our name for the route
      component: Home, //component we want to render
    },
  ],
});
```

We'll need to tell Vue to use the router, as well as import the different components we want to use, into our router.js file.

**Components (or pages, basically) that get loaded by the router are typically put in a views folder, while smaller, reusable files (building block type files) are put in a components folder**

`router-link` - component that creates a link to navigate to a route
`router-view` - placeholder that renders the matched component once loaded

Can also have named routes - so instead of directly linking to the route in our files, we link to the name of the route. Then, if we need to change the route later, we only have to change it in our router file.

Need to redirect a route? Easy:

```js
routes: [
  {
    path: "/about-us",
    name: "about",
    component: About,
  },
  {
    path: "/about",
    redirect: { name: "about" }, //could also do "/about-us"
  },
];
```

Can also provide an alias for a path, to solve the same problem

```js
routes: [
  {
    path: "/about-us",
    name: "about",
    component: About,
    alias: "/about",
  },
];
```

## Dynamic Routing

If we want to do something like user pages (where the last part of the route isn't set in stone), we can do that like so:

```js
{
  path: '/user/:username',
  name: 'user',
  component: User
}
```

The `:username` is treated like a property for the component. So in that view file, we can access this parameter:

```html
<div>
  <h1>This is {{ $route.params.username }}'s page</h1>
</div>
```

`$route` is the state of our current route, so on the user page it can access that parameter

There is a more modular way to do this. In our router file, we add the line `props: true` to our route description. This will set `$route.params` to the component props. So then, our view file will look like this:

```js
<template>
  <h1>This is {{ username }}'s page</h1>
</template>

<script>
  export default {
    props: ["username"]
  }
</script>
```

The default URL Vue uses has a # in it, so it doesn't reload the page. However, there's a way we can keep the page from reloading and also have the URL look more like we expect (without the #) - history mode.

This is enabled in our router file:

```js
export default new Router({
  mode: 'history',
  ....
})
```

This uses browser's `history.pushstate` API to change URL without reloading the page

## Global Components

Typically, we'll use components by exporting them from itself, then importing it into the view we need it in. However, some components (like buttons, icons, etc) that will be used often in all sorts of views/components can be registered globally, so you don't have to import it every time.

Vue has a code snippet just for this, so we don't have to do each one individually
(see `main.js` file in real-world-vue-vm project for code)

`require.context` is a Webpack function that searches through our project folders to find all of our base components. It has 3 arguments:

- the directory to search in,
- a boolean for if we want to search subdirectories,
- and a regular expression to match what we're looking for

## Slots

Slots are best used when you want dynamic templating

You can define default text for it - just put the text you want in your slot:
`<slot>default text</slot>`

This will show up if you don't provide text when you use it, or be overwritten if you do provide text

If you've got multiple slots (say, in a media box where you've got a heading and paragraph), you can use named slots so that the new text knows where to go.

```js
<slot name="heading"></slot>
<slot name="paragraph"></slot>

<template>
  <MediaBox>
    <h2 slot="heading">Name here</h2>
    <p slot="paragraph">Words</p>
  </MediaBox>
</template>
```

Can leave one slot without a name if desired - will act as default sl

If you want to insert other base components in the same slot, can use `<template></template>` tag

```js
<template>
  <p>My words.</p>
  <BaseIcon name='book'></BaseIcon>
</template>
```

When it's rendered, will simply show the `p` and `div` from the icon, without an additional wrapper `div`. Keeps code cleaner
