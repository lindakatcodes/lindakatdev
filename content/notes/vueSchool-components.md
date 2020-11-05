---
title: 'Vue Components Fundamentals'
blurb: Notes on Vue School's Vue Components course
tags:
  - Vue
  - Vue-School
---

## Components are reusable instances with a name

So, similar to a full Vue instance, but able to be used multiple times wherever

- Same options object as a Vue instance
- Won't have an element to bind to - meant to be re-usable
- Will have a template that's a single string
- Data has to be a function that returns an object - so each instance of it uses fresh data

```js
Vue.component('click-counter', {
  template: `<button @click="count++">{{ count }}</button>`,
  data () {
    return {
      count: 0
    }
  }
})
```

----

There are a few different ways to work with templates - one is called **XTemplate**

Basically - can make a script tag in your HTML with the type set to `text/x-template` and an id to reference, then can write the HTML like normal.

In the component, instead of the string for the template, can use CSS selector to reference your HTML template.

```html
<script type="text/x-template" id="click-counter-template">
  <button @click="count++">{{ count }}</button>
</script>
```

```js
Vue.component('click-counter', {
  template: '#click-counter-template',
  data () {
    return {
      count: 0
    }
  }
})
```

Main drawback here is that you don't get the whole picture when reading the component code, & will need to reference another file. For now, it's ok.

### **Component templates should contain exactly one root element**

So if more complex templating is needed, make sure there's only 1 root element

----

## Props

Custom attributes you can register on a component

Will be used often to pass values between your component & HTML files

Can pass as an array, like so:

```js
Vue.component('plan', {
  template: '#plan-template',
  props: ['name']
})
```

Can then access the prop in the template this way:

```html
<script type="text/x-template" id="plan-template">
  <div class="plan">
    <span class="title">
      {{ name }}
    </span>
  </div>
</script>
```

Then, in our HTML, instead of having to write the same code over & over for each plan, we only need one line for each:

```html
<div class="plans">
  <plan name="The Single"></plan>
</div>
```

Can also pass the names dynamically in our Vue instance, instead of hard coding in markup:

```js
new Vue({
  el: '#app',
  data: {
    plans: ['The Single', 'The Curious', 'The Addict']
  }
})
```

Then in our HTML, can use `v-for` and binding to make it even simpler:

```html
<plan v-for="plan in plans" :name="plan"></plan>
```

### Another way to use props in components is as an object - more control

Key will be the name of the prop, value will be the type

```js
props: {
  name: String
}
```

Will throw warnings in console if prop type is invalid, which can help

Can also name the value of the prop an object, which allows even more customization - like defaults, making it required, and custom validation rules

```js
props: {
  name: {
    type: String,
    required: true
  }
}
```

----

## Can nest components, & use inside other templates

```html
<script type="text/x-template" id="plan-picker-template">
  <div class="plans">
    <plan v-for="plan in plans" :name="plan"></plan>
  </div>
</script>
```

Then in Vue, instead of having an array of names in the instance, we can put it in our new component, so when the `plans` component needs the data, it's passed from the `plan-picker` component:

```js
Vue.component('plan-picker', {
  template: '#plan-picker-template',
  data () {
    return {
      plans: ['Single', 'Curious', 'Addict']
    }
  }
})
```

----

## Global vs. Local Component Registration

So far, these have all been registered globally - available to entire project

But, this can make the size of our JS file for customers bigger than needed, since most components won't be needed globally

To make it a local component, define it as a variable with an object, then we can call it when we need it.

So instead of:

```js
Vue.component('plan', {
  template: '#plan-template',
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
```

We'll modify it like so:

```js
let planComponent = {
  template: '#plan-template',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
```

Then, in our `plan-picker` component, we'll register it:

```js
Vue.component('plan-picker', {
  template: '#plan-picker-template',
  components: {
    plan: planComponent
  },
  data () {
    return {
      plans: ['Single', 'Curious', 'Addict']
    }
  }
})
```

Key is the name of the component, value is the options object (our variable)

This components object can also be used in our main Vue instance the same way

----

## Custom Events

Passing props only works from parent down to child - but what if we need to pass data up from our child to a parent? Enter custom events!

If we want to allow one of the plans from previous examples to be selected, we should add a data field to our `plan` component to show it's current state (true or false), then add a method that will set the state to true when it's selected.

Will then add the `v-on` option to the plan root element to call that method when it's clicked. Can also add a class binding to stylistically show when one has been selected.

To send a custom event, we use `$emit` method. Will take two arguments - the name of the event we want to emit (can be anything we want), and any data to pass along with the event (sometimes called the payload).

In the `plan-picker` HTML template, we can then add a `v-on` option to notify when one of the plans has been selected. Then, we'll perform an action in the `plan-picker` component.

Sounds complicated, I know. But basically, both components are talking to each other & trading data between themselves. Let's break it down:

When a plan is clicked, we emit a custom event called select that passes the name of the plan as the payload. The parent then listens for the select event, & when it hears it, it calls the selectPlan method. This method gets the plan name from the payload, sets it to the data in our `plan-picker` component, then it passes it as a prop to the `plan` component. From there, we check it with a computed property to see if it's selected or not. Finally, we use a class binding to apply the right style whenever one of the plans is selected.

(HTML attributes are case insensitive, so all attributes are written in kebab-case)

```html
<script type="text/x-template" id="plan-picker-template">
  <div class="plans">
    <plan v-for="plan in plans" :name="plan" @select="selectPlan" :selected-plan="selectedPlan"></plan>
  </div>
</script>

<script type="text/x-template" id="plan-template">
  <div @click="select" class="plan" :class="{'active-plan': isSelected}">
    <div class="description">
      <span class="title">
        {{ name }}
      </span>
    </div>
  </div>
</script>
```

```js
let planComponent = {
  template: '#plan-template',
  props: {
    name: {
      type: String,
      required: true
    },
    selectedPlan: {
      type: String
    }
  },
  computed: {
    isSelected() {
      return this.name === this.selectedPlan
    }
  },
  methods: {
    select() {
      this.$emit('select', this.name)
    }
  }
}

let planPickerComponent = {
  template: '#plan-picker-template',
  components: {
    plan: planComponent
  },
  data() {
    return {
      plans: ['The Single', 'The Curious', 'The Addict'],
      selectedPlan: null
    }
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan
    }
  }
}

new Vue({
  el: '#app',
  components: {
    'plan-picker': planPickerComponent
  }
})
```

----

## Component Naming Best Practices

- Names should always be multi-word, expect for root App components
- Base components the apply app-specific styling or convention should all being with a specific prefix
- Components that only have a single instance active should begin with The (to show it's the only one - like a sidebar, something only used once per page)
- Child components that only make sense in the context of their parent should include the parent component name as a prefix
- Names should start with the highest level (most general) words first, and end with the most descriptive word (ex. SearchButtonRun instead of RunSearchButton)
- Names should prefer full words over abbreviations

----

Small note on lifecycle hooks - can use a handful of keywords as functions, that will then happen at that stage of the lifecycle

- beforeCreate (doesn't have access to data & props yet)
- created (good time for API calls, gives time to load before visible to users)
- beforeMount
- mounted (similar to ready in jQuery, has access to $el)
- beforeUpdate
- updated
- beforeDestroy (best place to turn off event listeners)
- destroyed

----

## Slots

Instead of passing item to component with props, can use directly in the HTML with slots.

Use component name in HTML with data inside, then use slot attribute in template for where the data will go

The slot element is replaced with our HTML info, so applying styles or other things directly to it won't work. Instead, wrap the slot in another element (span or like) then apply the styles/whatever to that wrapper.

Slots have a name attribute, to use different slots at once. Info automatically goes to the default slot, so to use a named slot you need a `template v-slot:name` attribute in the HTML.

Shorthand for `v-slot` is `#`.

Can provide text in the `slot` element to use as a default - so if there isn't any text in the markup, it will show the default info passed.

As a rule of thumb:

- Use slots to pass markup to a component
- Use props to pass data to a component

Can use both on the same component, does not need to be exclusive

```html
<div id="app">
  <todo-item>
    Buy Bananas
    <template #description>
      <p>Bananas are good.</p>
    </template>

    <template #button-text>Make it Rain</template>
  </todo-item>

    <todo-item>
    Eat Bananas
    <template #description>
      <p>Bananas are good.</p>
    </template>
  </todo-item>
</div>

<script type="text/x-template" id="todo-item-template">
  <div>
    <input type="checkbox" v-model="completed">
    <span :class="{ done: completed }">
      <slot></slot>
    </span>
    <slot name="description"></slot>
    <button>
      <slot name="button-text">Highlight</slot>
    </button>
  </div>
</script>
```

```js
Vue.component('todo-item', {
  template: '#todo-item-template',
  data () {
    return {
      completed: false
    }
  }
})
```
