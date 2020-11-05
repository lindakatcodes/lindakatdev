---
title: 'Vuex for Everyone'
blurb: Notes on Vue School's Vuex course
tags:
  - Vue
  - Vuex
  - Vue-School
---

## Mutations

Mutations are used to update single pieces of state - should be kept as simple as possible, updating state but nothing more

Mutation calls will pass the state as the first parameter, then a payload for the second parameter - `setProducts(state, products) {...}`

In your components, can access the data from your store with computed properties, that can return the store data - `store.state.products`

You shouldn't update the state directly from your components - you call the mutation you need instead. If you're setting the state, you're running a commit command - `store.commit('mutationName', payload)`

## Getters

Getters are similar to computed properties, great for filtering or calculations.

Will pass state as the first parameter, all existing getters as the second parameter - `availableProducts(state, getters) {...}`

To access these in our components, you'll call - `store.getters.availableProducts`

Getters will track their own dependencies, and will update automatically when they detect a change

## Actions

Actions are similar to methods and can be more complex, and will call a mutation to update the store - don't update the store directly from here

Will be passed the context object as the first parameter, which exposes the same set of methods & properties as the store - so will have access to commit, state, etc - `context.commit` Can also use ES6 destructuring to get just the commit method to call it directly, if desired

Actions are responsible for the logic of when a mutation should be fired

To use in our components, we call the dispatch method - similar to commit, but for actions. Will have the name of the action first, than a payload if any - `store.dispatch('fetchProducts')`

Actions are usually asynchronous, so you'll want a way to know when it's done. Can return a promise from the action that you can then handle in your component.

```js
fetchProducts ({commit}) {
  return new Promise((resolve, reject) => {
    // shop is the name of the fake API holding the product data
    shop.getProducts(products => {
      commit('setProducts', products)
      resolve()
    })
    // can handle reject here if an error occurs
  })
}
```

In our component, can set a data property with a loading property, which will be set to true before we fetch our data, then back to false once the action is resolved. This can show a loading spinner while fetching the data, then the data once we get the result back.

## Global store access

To give all of our parts access to store, we can declare it in our main.js file, importing the store and setting it as an option in Vue.

Then, in our components, we'll have access to the store using `this.$store`. So anywhere we need it, that's how it will be called. (Previous examples are importing the store directly into the file, so can just use `store`)

## Dynamic Getters

Getters don't accept arguments by default, but you pass arguments to getters by returning a function.

```js
productIsInStock() {
  return (product) => {
    return product.inventory > 0
  }
}
```

## Vuex Map Helpers

Helpers generate computed getter functions for us, or map component methods to store dispatch calls. This can save us room in our files and make things a bit easier to read.

First - `mapState` - accepts an array with the state properties to map, or an object. If using an array, the computed properties will have the same name as the state properties. If we need a different name for our computed property, we'll use an object.

```js
computed: mapState({
  allProducts: 'products'
})
```

Can also use functions as values instead of a string - state is passed as the first argument to the function.

If you need to use local data with this, you'll need to be sure to use a normal function instead of an arrow function!

To be able to use `mapState` with other computed properties, we'll need to use the spread operator - this will let us merge the object returned by `mapState` with the rest of our computed properties.

```js
computed: {
  ...mapState({
    products: state => state.products
  }),
  productIsInStock () {
    return this.$store.getters.productIsInStock
  }
}
```

We also can use `mapGetters` in a similar way:

```js
...mapGetters({
  productIsInStock: 'productIsInStock'
})
```

Can often be good practice to pass an object instead of an array (even if the names are the same), since it might happen that your name will need to change in the future

Similar to the others, we can use `mapActions` as well, which will get loaded into our `methods` section, which will map local methods to `store.dispatch`.

```js
methods: {
  fetchProducts: 'fetchProducts'
}
```

So in our templates, we can use `this.fetchProducts`, since it runs `$store.dispatch('fetchProducts')` in the background.

## Vuex Modules

As our project grows, it makes sense to break things down into smaller pieces, to keep things easy to maintain. Each module can contain it's own state, mutations, actions, getters, & nested modules. So all our logic can be tied together.

Modules will export an object with our data, so we'll need to import them in our `index.js` file for the store. Then, in our export for the store, we'll have a modules object that lists out our modules.

```js
export default new Vuex.store({
  modules: {
    cart,
    products
  },
  ...
})
```

Modules will have their state accessible under `store.state.moduleName`. So they'll show up in the devtools as their own objects. However, actions, mutations, & getters don't do this - they'll still be registered under the global namespace.

Important note: in modules, `context.state` (used in our actions, getters, mutations) only exposes the local state. So if we need state outside our local state, we have to reference the global, or root state.

In actions, this is exposed as `rootState`. In getters, it passes `rootState` as the third argument: `cartProducts (state, getters, rootState)`.

## Namespaced Modules

Since actions, getters, and mutations are tied to the global namespace, we can run into issues where multiple modules might have different functions with the same name, and all will run when they're called. To more closely tie our functions to their module, we can namespace them.

```js
export default {
  namespaced: true
}
```

By doing this, we'll see that our actions/getters/mutations now have the name of the module they come from prefixed to them.

Namespaced getters & actions receive local getters, dispatch, & commit. So when you're in that specific module, you won't need to add the prefix.

For getters, like state, it will contain only the local getters, so if you need outside ones, getters will accept a 4th argument called `rootGetters` : `cartProducts (state, getters, rootState, rootGetters)`.

Similarly, in actions we'll have access to `rootGetters` on the context object. `addProductToCart({state, getters, commit, rootState, rootGetters}, product)`.

In our components, if using one of the map properties we can pass in the module name, so that our code stays a bit cleaner:

```js
computed: {
  ...mapGetters('cart', {
    products: 'cartProducts'
  })
}
```

Can actually call `mapGetters` as many times as we want, so can create a call for each module to pass in the name. This also works for `mapState` and `mapActions`.

To dispatch actions or commit mutations starting from the global namespace, you'll need to pass `root: true` to your commit or dispatch.

```js
commit(`products/decrementProductInventory', product, { root: true })
```
