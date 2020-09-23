---
title: How I Built This - Snake
blurb: I re-created a version of the classic phone game! Lessons and thoughts from my experience.
tags:
  - JavaScript
  - Games
  - How I Built This
type: draft
featured: false
---

TL;DR - I made my own version of Snake! [You can play the game here!](https://snake-mini.netlify.app/)

While going through Wes Bos' [Beginner JavaScript](https://beginnerjavascript.com) course, the first big project we did was creating an Etch a Sketch! It was so much fun, and gave me an idea - I could create the Snake game in a similar way!

So I did just that. :) Using the HTML `canvas` tag and some JavaScript, you're able to control the snake, eat food, and grow bigger until you hit the sides or your own body! The snake also changes colors when you eat a piece of food. While it's not exactly like the original game (you don't move automatically, mostly), it was super fun to make and also fun and relaxing to play!

I hadn't used the `canvas` element much before this, so I learned a decent amount building this. I also ran into a few JavaScript things that threw me for a bit of a loop. So I wanted to touch on a few of the things I learned while I built this, and the process I went through.

----

## lineCap

Setting up and tracking the food logic was the easiest part for me. It's just a little square that moves whenever the snake head crosses it's coordinates, and then it moves.

I set my `lineWidth` and `fillStyle` for the food, made a little random number function to get a random x and y, and put in the code that (I thought) would show a little square of food on the canvas. Saved and...nothing! This had worked in the Etch a Sketch project - why wasn't it working now?

Turns out, you need to adjust the `lineCap` to be something other than the default for a single small square to show. If you're drawing a full line it will work without the `lineCap` adjustment, but for this single square I had to set it to square, and then it showed up.

##
