# Vuex

State - data your components depend on & render

State Mgmt can get unwieldy the larger it gets, and all components need to know if something changes

Keeping all of the data in one single source of truth helps make things easier to update & keep track of, which is what vuex does - every component has access to this global state, which is also reactive

Also deals with standardization, so things stay clean when multiple components are updating data

In Vue, our instance looks like this:

```js
const app = new Vue({
  data: {
    // our actual data
  },
  methods: {
    // functions that can change the data
  },
  computed: {
    // properties that can access data
  },
});
```

Vuex is very similar in structure:

```js
const store = new Vuex.Store({
  state: {
    // our data
  },
  mutations: {
    // these commit & track state changes
  },
  actions: {
    // functions that can update the data
  },
  getters: {
    // properties that can access state
  },
});
```

It's best practice to have the actions call mutations, which then call the state, then can roll back state with mutations if we need to revert changes

## State & Getters

can use `mapState` in our scripts to add our state to computed properties

so instead of using `this.$store.state.user.name` to access the properties we want each time, we can call in our state and then access it

```js
computed: mapState({
  userName: (state) => state.user.name,
});
```

Can also simplify this by just calling in the whole object, then in the template using dot notation to get the property we want

```html
<h1>Create an Event, {{ user.name }}</h1>
```

```js
computed: mapState({
  user: "user",
});
```

mapState can be named, or not. can also use these as items in an array if we'd prefer
`mapState(['user', 'categories'])`

If we need other computed properties as well, can use object spread operator before mapState to be able to use it

Can pass other getters into each other, if needed

`mapGetters` is also a possibility

## Mutations

Typically, mutations are written in all caps, which helps differentiate them from actions (though this is optional)

Mutations will cause a change to the state, & are committed in our components.

So we could have a mutation like this:

```js
state: {
  count: 0
},
mutations: {
  INCREMENT_COUNT(state) {
    state.count += 1
  }
}
```

Then, our component might look like this:

```html
<template>
  <button @click="incrementCount">Increment</button>
</template>
```

```js
export default {
  methods: {
    incrementCount() {
      this.$store.commit("INCREMENT_COUNT");
    },
  },
};
```

Can use these dynamically, too! Commit can accept a payload, which is sent to the mutation to be used

```js
mutations: {
  INCREMENT_COUNT(state, value) {
    state.count += value
  }
}
```

```html
<template>
  <input type="number" v-model.number="incrementBy" />
  <button @click="incrementCount">Increment</button>
</template>
```

```js
export default {
  methods: {
    incrementCount() {
      this.$store.commit("INCREMENT_COUNT", this.incrementBy);
    },
  },
};
```

Notice: by adding `.number` to the end of our `v-model`, it will typecast the info to a numb

**Mutations are synchronous; actions are asynchronous**

Actions can wrap business logic around mutations
Always put mutations within actions - future proofs your apps & increases scalability

So to update the example above, we'd wrap our mutation in an action:

```js
state: {
  user: null,
  count: 0
},
mutations: {
  INCREMENT_COUNT(state, value) {
    state.count += value
  }
},
actions: {
  updateCount({ state, commit }, value) {
    if (state.user) {
      commit('INCREMENT_COUNT', value)
    }
  }
}
```

In our action, we're pulling state & commit from the context object.

Then, in our component, we dispatch the action:

```js
methods: {
  incrementCount() {
    this.$store.dispatch('updateCount', this.incrementBy)
  }
}
```

**In actions and mutations, payload can be either a single variable or an object**

## Modules

Will often want to separate your store into different modules, to keep things cleaner & easier to debug

For module files, there's two main ways to do the syntax - can export everything as one object, or can export each part as a variable

One object:

```js
export default {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};
```

Then in the html, you'd access as `import name from '@/store/modules/name.js'`

As variables:

```js
export const state = {};
export const mutations = {};
export const actions = {};
export const getters = {};
```

Then in the html, access as `import * as name from '@/store/modules/name.js'`

The variable way makes it a bit easier to have private methods & vars

Can access other modules inside each other; should you need to do this, you can do it like so:

```js
export const actions = {
  createEvent({ commit, rootState }, event) {
    console.log("User creating event is " + rootState.user.user.name);
    return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },
};
```

`rootState` gives us access to our full state, as `state` is only for local state

When calling values, first word would be the module name, then the object name `user.user.name`

Can call all actions, mutations, & getters from any module - they're registered under the global namespace (our root store). To call them, you don't need the module name - just the name of the function.

You can have multiple actions or mutations with the same name in different modules.
Because of this, there can be naming issues, so we can do module namespacing to help.

```js
export const namespaced = true;
```

Will ensure that anything in that file will go under the module name, instead of global

Best practice - mutations should only be called from actions inside the same module (not other modules)

Along with `mapState`, we can use `mapActions` and `mapGetters` too - can either call with the namespaced format, or in two pieces

```js
methods: mapActions("event", ["fetchEvent"]);
```

Then, when we need to call `fetchEvent`, we can simply call it with that name, instead of needing `this.$state.event.fetchEvent`

Actions can be called from other modules - just need to include module name, a `null` payload, & tell it to look at the root

```js
dispatch("moduleName/actionToCall", null, { root: true });
```
