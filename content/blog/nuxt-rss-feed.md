---
title: Building an RSS Feed in Nuxt with Nuxt/Content
blurb: How I set up my RSS feed so I can cross post my blogs!
createdAt: 2020-08-06
tags:
  - Nuxt
  - RSS
type: live
featured: true
---

I like cross posting my blogs to Dev.to - I've got a little bit of community there already, so being able to have both my own place for my writing and a shared space is nice. Since I just migrated my blog to my new site, I needed to get an RSS feed set up so I could connect it to my Dev account.

It was pretty easy to do with my last blog that was built with Gridsome (another Vue framework), so I figured it shouldn't be too hard to do with Nuxt, which is what I built my current site on. Right? Well, it wasn't the most difficult thing I've done building this site, but it was a little more confusing than I thought! So I figured I'd write out the steps I took to get it to work.

----

## First - Add the Feed Package to your Project

There is already a [Nuxt package for managing RSS feeds](https://github.com/nuxt-community/feed-module), which is awesome! So I added that to my project with `npm install --save @nuxtjs/feed`. That part was easy. :)

----

## Second - Configure the Plugin

This part took a little finagling on my end.

My posts are stored and displayed on my site with the [Nuxt Content](https://content.nuxtjs.org/) module, which has been a really handy way to manage them! I'm using it to manage my project list for the portfolio part of my site as well, and it's worked really nicely.

For a quick rundown - it works with multiple types of files (I'm using Markdown for the blog posts and JSON files for the projects), so I can keep my files on GitHub with my code. Content pulls them in, parses them, and displays them pretty nicely. It's got a MongoDB-like format for fetching the data, and uses it's own Vue components for displaying them.

There's also an [example on their docs for a possible RSS integration setup](https://content.nuxtjs.org/integrations/), which seemed really promising. However, there were a few things that weren't clear to me, but by combining that example with the one on the `feed-module` site, I got it figured out.

I had two main problems:

- I wasn't quite sure *where* to put the code I needed to add, outside of adding the module name.
- I struggled with getting the actual *body* text of my post, to add it to the feed.

----

### Part One: Where to Put it

You can put all of the code you need inside the `nuxt.config.js` file. I'll show you the code I ended up with after I cover how to get the data, so it will all make sense.

You'll need to add the `feed-module` package to the modules list, and then there's a feed option where you can add some functions and variables to get the data you need for each post.

 > Important side note! Make sure you list the `@nuxt/content` module BEFORE you list the `@nuxtjs/feed` module. That way, the feed can access your content.

### Part Two: Getting the Body of Posts

Honestly, the way I went with this may not be the best way. But it works! Which is good enough for me for now. I'll update here if I end up moving it around a bit, to try and keep this relevant.

When you want to display the body of your post on your page, Content provides a component to use - `<nuxt-content>`. You pass that component the document you want, and it parses the JSON the body's been converted to and returns your information, and then you can style that as you see fit.

This is great for displaying the posts - but doesn't work as well for getting the text of the post to your RSS feed!

The only way to access just the text of the document, before it's converted into JSON, is by using a hook: `content:file:beforeInsert`. Inside that hook, you'll have access to an internal property called `text` that has just the plain text of the document. Content uses an example of this hook [in the advanced section of their docs](https://content.nuxtjs.org/advanced/#contentfilebeforeinsert) to show how you could get the reading time of your posts. (I also did this today, because I love seeing the reading time! But that's another story.)

Conveniently, this piece can also go in your `nuxt.config.js` file! I used this hook to access the `document.text` property, and simply created a new field on my posts called `bodyPlainText`, that I can then access anywhere I can access my posts.

----

## Third - Putting it All Together

With these two parts figured out, here's what I ended up with, with comments to add context (hehe):

```js
export default {
  // This is the start of your config file. There's other parts here, like mode, target, head, etc that aren't important for what we're talking about. But you'll find a part called modules, which is where we start:
modules: [
  // content listed before feed!
    '@nuxt/content',
    '@nuxtjs/feed',
  ],
  // This is a new piece you'll need to add, it won't be in the default file.
feed: [
  {
    // this sets up where to find your rss feed - mine will be called feed.xml, and located in the root of my project
    path: '/feed.xml',
    // this function will be what sets the data that goes into feed.xml
    async create(feed) {
      // the main options of what the page is called, desc, and where to find it as a full path
      feed.options = {
        title: 'LindaKat Blogs',
        description: 'Tech Writings from Linda Thompson',
        link: 'https://www.lindakat.com/feed.xml',
      };

      // we're going to require the content module so we have access to $content, then we're going to fetch all of our posts. If you're using eslint in your project, you might need to ignore this line because it's requiring something inside a function. Will work just fine, it might yell at you though. :)

      // eslint-disable-next-line global-require
      const { $content } = require('@nuxt/content');

      // get all the posts we have
      const posts = await $content('blog').fetch();

      // then, we'll loop over each post and grab the data fields we want to show in our feed. The name of your fields might be different than mine - that depends on how your data is set up in your Content settings.
      posts.forEach((post) => {
        // the url of the post is set first
        const url = `https://www.lindakat.com/blog/${post.slug}`;
        // then we do addItem, and give it all the details we want. You'll often see a date field here too - I don't have one because I don't post my dates on my posts.
        feed.addItem({
          title: post.title,
          id: url,
          link: url,
          description: post.blurb,
          // this is what we did in part two! Accessing that plain text
          content: post.bodyPlainText,
        });
      });
    }, // this is the end of the create function

    // cacheTime sets how long the feed is cached - this is what they had in the feed-module example, and I've left it as is for now. Type sets what kind of feed it is - you can do atom or json as well.
    cacheTime: 1000 * 60 * 15,
    type: 'rss2',
  },
], // this is the end of the feed settings

// This is our hook! We check if the document is a markdown file (meaning it's a blog post in this case), and if so we get the reading time and set it to a property on the document, and also set our plain text of the post to a property.
hooks: {
  'content:file:beforeInsert': (document) => {
    if (document.extension === '.md') {
      // ignoring eslint again :) same warning as earlier
      // eslint-disable-next-line global-require
      const { text } = require('reading-time')(document.text);

      document.readingTime = text;
      document.bodyPlainText = document.text;
    }
  },
}, // end of the hook setting
// a few other default options here
} // end of export
  ```

Here's a link to my [full nuxt config file](https://github.com/lindakatcodes/lindakatdev/blob/main/nuxt.config.js) without the comments, if that helps you see it better!

So we set up the RSS feed onto the root of our project, set the data we want to show for each post, and pass it to the feed. And we've got our hook, so we can access the plain text body of our post and get that data to the feed as well. Then, all you should have to do is add the link for your feed to your Dev.to settings, and it will automatically pull in your posts!

It won't carry over any style settings, so Dev saves it as a draft first so you can go in and make any fixes you might need, but it's a lot easier than copy pasting the whole text, or having to re-write it completely!

I think this stuff tends to fall into the land of "most devs know where this goes and how to do this" in examples. As a fairly new person, I try to write about it when I come across these situations, because it's not as clear as someone more experienced might think!

I hope this helps someone! Please feel free to reach out if anything is unclear or you need some help.

Happy coding, friends!
