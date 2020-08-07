---
title: TIL - Building an RSS Feed in Nuxt with Nuxt/Content
blurb: How I set up my RSS feed so I can cross post my blogs!
createdAt: 2020-08-06
tags:
  - TIL
  - Nuxt
  - RSS
published: false
---

I like cross posting my blogs to Dev.to - I've got a little bit of community there already, so being able to have both my own place for my writing and a shared space is nice. Since I just migrated my current blog to my new site, I needed to get an RSS feed set up so I could connect it to my Dev account.

It was pretty easy to do with my last blog that was built with Gridsome (another Vue framework), so I figured it shouldn't be too hard to do with Nuxt, which is what I built my current site on. Right? Well, it wasn't the most difficult thing I've done building this site, but it was a little more convoluted than I thought! So I figured I'd write out the steps I took to get it to work.

## First - Add the Feed Package to your Project

There is a [Nuxt package already for managing RSS feeds](https://github.com/nuxt-community/feed-module), which is awesome! So I added that to my project with `npm install --save @nuxtjs/feed`. That part was easy. :)

## Second - Configure the Plugin

This part took a little finagling on my end.

My posts are stored and displayed on my site with the [Nuxt Content](https://content.nuxtjs.org/) module, which has been a really handy way to manage them! I'm using it to manage my project list for the portfolio part of my site as well, and it's worked really nicely. For a quick rundown - it works with all types of files (I'm using Markdown and JSON files), so I can host my full posts on GitHub, and it pulls them in, parses them, and displays them pretty nicely.

There's also an [example on their docs for a possible RSS integration setup](https://content.nuxtjs.org/integrations/), which seemed really promising at first. If I combined this with the example on the feed-module page, this should be pretty quick! (And hopefully for you, after reading this, it will be! lol).

I had two main problems:

- I wasn't quite sure *where* to put the code I needed to add, outside of adding the module name.
- I struggled with getting the actual *body* text of my post, to add it to the feed.

### Part One: Where to Put it

This part I figured out fairly quickly. You can put all of the code you need inside the `nuxt.config.js` file. I'll show you the code I ended up with after I cover the next part, so it will all make sense. You'll need to add the feed-module package there, and there's an option to add the data you'll need to give the feed data as well. It can all go next to each other in the same file.

**Important side note! Make sure you list the `@nuxt/content` module BEFORE you list `@nuxtjs/feed` module. That way, the feed can access your content.**

### Part Two: Getting the Body of Posts

This part took me a bit, and honestly what I figured out may not be the best way. But it works! Which is good enough for me for now. I'll update here if I end up moving it around a bit, to try and keep this relevant.

When you want to display the body of your post on your page, Content provides a component to use - `<nuxt-content>`. You pass that component the document you want, and it parses the JSON it's been converted to and returns your information, and then you can style that as you see fit.

This is great for displaying the posts - but doesn't work as well for getting the text of the post to your RSS feed!

The only way to access just the text of the document, before it's converted into JSON, is by using a hook: `content:file:beforeInsert`. Inside that hook, you'll have access to an internal property called `text` that has just the plain text of the document. Content uses an example of this [on their docs, in the advanced section](https://content.nuxtjs.org/advanced/#contentfilebeforeinsert) to show how you could get the reading time of your posts. (I also did this today, because I love seeing the reading time!)

Conveniently, this piece can also go in your `nuxt.config.js` file! I used this hook to access the `document.text` property, and simply created a new field on my posts called `bodyPlainText`, that I can then access anywhere I can access my posts.

## Putting it All Together

With these two parts figured out, here's what I ended up with, with comments explaining:

```js
export default {
  // ... other parts here, like mode, target, head, etc
modules: [
    '@nuxt/content',
    '@nuxtjs/feed',
  ],
feed: [
  {
    // this sets up the where to find your rss feed - setting a file like you see in path will create that in the root of your project
    path: '/feed.xml',
    async create(feed) {
      feed.options = {
        title: 'LindaKat Blogs',
        description: 'Tech Writings from Linda Thompson',
        link: 'https://www.lindakat.com/feed.xml',
      };

      // ignore the eslint lines - we're going to require the content module so we have access to $content, then we're going to fetch all of our posts.

      // eslint-disable-next-line global-require
      const { $content } = require('@nuxt/content');

      const posts = await $content('blog').fetch();

      // once we've got them, we'll go through each one and set what settings we want to have in our feed - commonly you'll add the date field here too, but I was having issues and don't have my posts showing the dates anyways. You'll see the content listed with the plain text setting we talked about before!
      posts.forEach((post) => {
        const url = `https://www.lindakat.com/blog/${post.slug}`;

        feed.addItem({
          title: post.title,
          id: url,
          link: url,
          description: post.blurb,
          content: post.bodyPlainText,
        });
      });
    },
    // cacheTime sets how long the feed is cached - this is what they had in the feed-module example, and I've just left it for now. type sets what kind of feed it is - you can do atom or json as well.
    cacheTime: 1000 * 60 * 15,
    type: 'rss2',
  },
],

// this is our hook! We see if the document is a markdown file (meaning it's a blog post), and if so we get the reading time in text format and set it to a property on the document, and also set our plain text to a property.
hooks: {
  'content:file:beforeInsert': (document) => {
    if (document.extension === '.md') {
      // eslint-disable-next-line global-require
      const { text } = require('reading-time')(document.text);

      document.readingTime = text;
      document.bodyPlainText = document.text;
    }
  },
},
//... a few other things here, like build, etc
} // end of export
  ```

This way, we set up the RSS feed onto the root of our project, set the data we want for each post, and pass it to the feed. And we've got our hook, so we can access the plain text of our post and get that data to the feed as well.

I hope this helps someone! Please let me know if anything is unclear or you have questions on anything. I couldn't find a whole lot on this - I think this stuff tends to fall into the idea of "most devs know where this goes and how to do this" and as a fairly new person, I try to write about it when I come across those. Because it's not as clear as someone more experienced might think! So let me know if you have trouble, and I'll try to help!

Happy coding, friends!
