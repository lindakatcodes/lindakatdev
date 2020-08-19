---
title: 'Next Level Vue'
blurb: Notes on Vue Mastery's Next Level Vue course, second in the series
tags:
  - Vue
  - Vue Mastery
---

## Axios Interceptors

We want to add a progress bar to our app, so a user knows stuff is going on if events don't load right away.

One way to do this is by attaching interceptors to our axios calls

```js
apiClient.interceptors.request.use((config) => {
	NProgress.start();
	return config;
});

apiClient.interceptors.response.use((response) => {
	NProgress.done();
	return response;
});
```

We can attach the interceptors to the request and response methods, and use that to start and finish our progress bar

This won't work well if there's multiple API calls - will want to use vuex and make some methods to watch & count the number of requests, and time it that way

Also, some of our templates will show before the data arrives, so this still isn't perfect for this app

Good times to use interceptors:

- on request to set authorization tokens
- on response to format or filter data
- on response to catch 401 or other errors

## In component route guards

Vue gives us some component lifecycle method hooks by default; but when we use vue router, we get 3 more hooks, called route navigation guards!

```js
beforeRouteEnter(routeTo, routeFrom, next);
beforeRouteUpdate(routeTo, routeFrom, next);
beforeRouteLeave(routeTo, routeFrom, next);
```

`routeTo` is the route we're navigating to, `routeFrom` is our current route, and `next` is a function to call that must be resolved

`Enter` is called before the component is created, so does **NOT** have access to `this`. (Since the component hasn't been made yet)

`Update` and `Leave` will have access to `this`, and are called when the route changes (but still uses the same component), and when the component is navigated away from, respectively.

Any actions that would go in your router link directive can go in `next` - it confirms the navigation
Examples would be:

```js
next(false); // cancel navigation
next('/'); // redirect to a path
next({ name: 'event-list' }); //redirect to named path
```

## Global routing guards

There are also 2 routing guards that exist on vue router itself, globally - `beforeEach` and `afterEach`

These run whenever navigation is triggered. We do have to define our router in a `const`, as they run on the router object. We use `beforeEach` to run before navigating to a component, and `afterEach` to run before a component is created (so navigation is complete, but the component hasn't been created yet).

```js
const router = new Router({...})
router.beforeEach((routeTo, routeFrom, next) => {
  next()
})

router.afterEach((routeTo, routeFrom) => {
  ...
})
```

Note that `afterEach` does not have `next`

These & the component specific guards / lifecycle hooks are called in this order:

- beforeEach
- beforeRouteEnter
- afterEach
- beforeCreate
- created

There are also per-route guards - useful if you need to make an API call while the route is in progress
These are hooks added from a route's configuration object, that can run before routing the component

`beforeEnter` will run after `beforeEach` and before `beforeRouteEnter`

## Mixins

Often, you might have two different components that are very similar. You might want to combine them, but it might cause more issues than it solves.

So Vue has mixins - can have small pieces of reusable functionality that can then be used in multiple components

Mixin code runs before the component code - keep in mind
So if our mixin was:

```js
export const exampleMixin = {
	created() {
		console.log('Hello from the mixin');
	},
};
```

And our component code was:

```js
import { exampleMixin } from '../mixins/exampleMixin.js';
export default {
	mixins: [exampleMixin],
	created() {
		console.log('Hey from the component');
	},
};
```

Then we'll get the log from our mixin first, then the log from the component.

If you have conflicting data, the component data takes priority. Same with conflicting object properties.

## Filters

If you need to format some data before it's displayed, we can do that with filters.

In this example, it's taking the data `comment` and running it through the `shout` filter to make all the letters uppercase:

```html
<template>
	<p>{{ comment | shout }}</p>
</template>
```

```js
<script>
  export default {
    data() {
      return { comment: 'no one cares' }
    },
    filters: {
      shout(value) {
        return value.toUpperCase()
      }
    }
  }
</script>
```

Can pipe multiple filters if desired, with a `|` in between.

They can also take in values. Remember that order matters!
`<p>{{ comment | replay('bro') | shout | exclaim }}</p>`

Methods or computed properties are often a better choice than a filter. Also, pipe syntax works differently than a JS pipe proposal. Things to bear in mind!
