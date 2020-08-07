---
title: Do I Own This? A New Project!
blurb: So I have this idea...and I'm speaking it into existence!
createdAt: 2020-02-19
tags:
  - doIOwnThis
  - thoughts
published: true
---
I have this very first world problem.

You see, I love nail polish. Can't get enough. And so, most times when I'm at the store, I browse through the polish to see if anything is speaking to me.

The problem is, I often see colors that I like - but I have so many at home, that I can't remember the names of them all! And so every time, without fail, I wonder - "Do I own this"?

I do this with shirts, too - I'm a fan of basic, solid colors of shirts, but can never remember which colors I already have when I'm out at the store. I try to remember to take a picture of my closet before I leave, but almost always forget, or eventually lose the photo or don't update it once I buy new things.

So! I want to make an app that can help me quickly & easily check when I'm at the store, and never have to not buy something because I can't remember if I already own it or not.

I have a few ideas on this, but I'm still uncertain on how I want to do things. So this is a bit of a brainstorming session, in the hopes that I either make some decisions and/or can get some advice. 😊

<hr>

## **UI Factors**

For the main page, I want to keep it simple. I'm envisioning a nice, clean grid, that just shows color swatches of each color. Rounded corners, probably, because I love rounded corners and think it looks a bit more polished that way. (HA! What a punny joke. Sorry, I couldn't resist.)

I'll need to have a search/filter bar somewhere, so that I can view just a particular shade or brand if desired. I can't decide if I want this to always be visible, or if it should be behind a little menu option? I'm leaning towards always visible as I think that's both more accessible & faster - but I can't see it in my mind's eye. I want the color grid to be the most obvious, visible thing, but I think a filter bar should be on the top if it's going to be visible all the time. Maybe I can make a little side tray that comes in and out when needed? I don't know. Both would look nice, but I can't see this part in my mind yet.

Then I want a way, when a particular color is clicked, to show it's name, brand, color group, etc. Normally when I'm at the store, I'm looking at a particular brand at a time, so if I can filter my view to just that brand it's often easy to get an idea of if I've got a particular color or not. Then I can click on it to verify before I write it off. Or I can filter by color group, so I can decide if I've already got enough purple shades (I do) or if the shade that's calling to me is missing from my group. I don't think the color's name or brand needs to be visible on the main view, but it needs to be easily accessible for verification purposes. Hmmm...or maybe I can fit the color name underneath each swatch? I don't know, some of these names are weird and long and I don't know that they'll fit nicely.

Lastly, I'll need a way to add new colors, so I can keep my collection updated. This can definitely be stowed away in a menu, or in a small button somewhere. A simple form for filling in the information will work, then it'll need a way to upload a picture. I'll have to think on the pictures, as I'll want them to stay as uniform as possible, but that will really be up to the person taking the pictures (me).

<hr>

## **Back-end Factors**

This is where I'm struggling the most. I'll definitely need a database to store all of this data. But I'm trying to think now about how it might be used in the future - and I think it's possible, if I can get the UI stuff down, that others might want to use this as well. So I want to consider writing this in a way that it can be hosted somewhere, and a database can be kept up. Which is not something I've really had to deal with on any projects I've done so far.

Everything so far has just been for me, so it's been hosted on Heroku or a Github page. And if I've needed a database I've used a MongoDB free cluster and just tinkered around, or I've used a JSON file. Which, I could probably set it up to use a JSON file - I know it's easy and fast to pull the data from, & I'm sure I could work out how to write the data to it so that it stays clean and organized. It would be personal for each person who uses it, which (since I don't intend to add any shared items) would be fine, but then each person would have to store the site somewhere on their own.  

However, it feels like I should use a legit database for this, where each person can just have their own collection stored. Plus, more real world practice for me! But I don't have much real experience with actual databases, in a production sense. I don't have the funds to pay for a lot of data storage (on the off chance this somehow turns out amazing and goes viral), but I don't think there's much that's really free in terms of data storage or server options. So I'm not really sure where to go with this.

It might honestly be worth it to only worry about myself for now, and host it on Heroku with either a JSON file or a MongoDB cluster. For my own data, it'll be free, which is a big concern at the moment. But I would like to consider releasing this for the public in the future, if I can get this really finished. So I want to think about how I can set it up so that, even if I do it just for me for now, it'll be relatively easy to be able to expand the hosting. I don't want to completely rewrite anything if I can help it!

I'm also concerned, if I'm able to push it live to others, about it responsibly using data & phone storage - since mobile will be a main use case. So I'll have to look into that, as well. This, along with collections potentially being large, is a main factor that keeps me from considering something like local storage for the database. Plus, the data will need to persist so someone's collection doesn't just disappear, and I don't think local storage is the best option for that.

<hr>

Alright, so the idea is out there! Now to actually build the dang thing. 😎

If anyone has any suggestions, please reach out & let me know! Especially if you've got thoughts on the back-end part of this, which is what's holding me back the most! It's entirely possible I'm way overthinking this, and should just focus on building for me and getting a working version up before I worry too much about the world at large. But I'd love to hear your thoughts on anything I've mentioned here! I intend to write about my process as I go along, so this is just the beginning. 💅
