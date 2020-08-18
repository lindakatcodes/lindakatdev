---
title: Gridsome Troubleshooting & Lessons Learned
blurb: Adventures in Gridsome! Finding an error & learning how to see it.
createdAt: 2019-07-19
tags:
  - Gridsome
  - Learning
type: live
featured: true
---
I've uncovered two new things about Gridsome this week!

First - it's not going to tell you when something's failing on it's own (Vue fails silently).

Second - how to change the first thing.

So - the past two days, I've been struggling to figure out why I couldn't run the development command on my blog code, which is set up using Gridsome. It made no sense to me. The last time I'd used it, it had worked! But now, when I'd run the develop command, it would get about 43% of the way through building everything....and just freeze. Often on a different file name, so it didn't seem to be related to any of the specific files it listed when it froze.

I deleted the .cache folder, as it suggested in the docs, as well as uninstalling and reinstalling the node modules. No change. I tried an older version of Gridsome, in case a new change had caused it. Nothing. I tried it on my desktop (since I'd noticed the problem on my laptop), which is where I'd last run it successfully. Same problem.

Wtf?

So I broke down, found the Gridsome Discord group, and asked my question in the help channel. And blissfully, a user came to my rescue! They had a screenshot of the error message they were getting (which I'd never seen), which showed the file that was causing all the trouble.

When I'd last worked on my blog, I'd mostly commented out a page that wasn't working right (I wanted to keep the code so I could keep working on it, but it wasn't working on it's own). I didn't realize it, but I didn't actually run the develop command after I did that. It built just fine, so I didn't think anything of it. But the way I'd commented it out, I had left the template tag open (commenting out the closing tag), which it apparently hated. I would too! 😝

So I moved the closing comment tag up so that the template tag closed, and learned that a template also has to have at least one element in it. So I moved the comment tags again and just left a (seemingly) blank layout element in it - and miraculously, the develop command worked again!

So. Dang. **Thankful!** I'm decent enough with trouble shooting, but with a framework I'm not familiar with, that uses a JavaScript framework I'm not familiar with, and with no obvious error message....I was so lost. So glad I found the Discord group and got a response!

----

So the next thing was to learn how the heck I get Vue to show me an error message when something goes wrong, so I can have a better shot at fixing it on my own! The Gridsome docs, in the trouble shooting section, mention a line of code to inject to show errors instead of it failing quietly....but no mention about _where_ that codes goes.

Luckily for me, I was able to figure this one out pretty quickly! I did this by starting to click on the Gridsome config pages in my project until I found one that looked promising, then looked up the docs for that page's API. lol 😉 And lo and behold, I found a command that looked awfully familiar!

So, in the gridsome.server.js folder, inside the module.exports function, I wrote this line of code:

``` js
api.chainWebpack(config => { config.mode('development') });
```

After saving and running the develop command again, everything still works! And when I stopped the server, moved one of my comment tags in the problem file from before, and tried to run develop again, I got the error message when it failed to build!

So now, should I have future errors in my files, I'll be able to actually see the error messages, which will help **A LOT** in trouble shooting! 🙌 Hooray for learning new things!
