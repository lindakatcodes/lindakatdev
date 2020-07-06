---
title: Hosting an App with Heroku and Netlify (if you've never done it before)
blurb: The steps I took to post my Udacity final project online
tags: 
- tutorial
- netlify
- heroku
---

Over the past 7 months, I've been hard at work on the Google / Udacity Mobile Web Specialist scholarship program. It's been an intense, and rewarding, experience, and I learned a ton of interesting things!

All 3 of the projects we had were centered on creating a Restaurant Review app. We were given the starter code and a local server, and gradually made the project more accessible, more responsive, and allowed it to work offline. We dealt with service workers, local cache, and IndexedDB. A user needed to be able to mark a restaurant as a favorite and post new reviews of restaurants, either online or offline, and have those offline edits post to the server when re-connected.

Naturally, having done all of this and graduated from the program, I wanted to be able to share this hard work with others on my portfolio. I've got to be able to show that I got this to work with a working prototype, right?  This site has a client facing section, and a server section (though we never connected to a database - simply had a db file that our server code could access and store information on).

Now I've never hosted an 'app' before - any site that's had a back-end server to deal with. I had no idea where to start.

After seeing a similar question in my classes' slack group, it seemed like using Heroku for the back-end and Netlify for the front-end was a pretty common solution. I currently use Netlify to host my portfolio site, so that seemed like a good solution. But I've never used Heroku before.

I was first given [this site](https://sailsjs.com/documentation/concepts/deployment/hosting), on how to deploy a Sails app (which is what the server repository we were given is made with) to Heroku...

....but to be honest, it didn't seem to make a lot of sense to me. It's straight forward, but definitely geared more towards people who might already have some experience working with hosting or production sites.

So I did some Googling, and found these two posts:
[Deploying JavaScript Apps Part 1](https://auth0.com/blog/the-complete-guide-to-deploying-javascript-applications-part-1)
[Deploying JavaScript Apps Part 2](https://auth0.com/blog/deploying-javascript-apps-part-2)

These posts had a TON more information than what my project required, but it gave me what I needed to get running. All of the images I'm linking here are from those blog posts, so all image credit to them!

I figured that others might be in the same position as me - a newb to hosting an app on more than one site, and connecting them to each other. So here's my walk-through, in beginner's terms, for how to set up a simple connection between a Heroku back-end site and a Netlify front-end site!

### 1. Create a Heroku Account

First things first - go to [Heroku's site](https://www.heroku.com) and make an account, if you don't already have one.

### 2. Grab your Back-End Code from GitHub

I didn't have my server code hosted under my own name, so I made a fork of the final project server to have a repository under my name. This way, I know the repo won't suddenly disappear or change without my knowledge.

### 3. Hook Up your Repository with Heroku

Alright, this was a tricky part for me. These images should help!

a. Once you're logged into your account, you'll click New in the upper right corner and click Create new app.
![Create New App Screen] (<https://cdn2.auth0.com/blog/ultimateguide/create_new_app.png>)

b. You'll give your server a name, and click Create app at the bottom.
![Name and Create Screen] (<https://cdn.auth0.com/blog/jsdeploy/herokunewname.png>)

c. This will take you to a page with some options. Because we're hosting a simple site with one contributor, you don't have to worry about pipelines for now (that's how you'd work with a project that's regularly maintained by multiple people, so you can push things through a staging process and do testing and all that goodness).

What you'll want to do next is connect this to your GitHub account, so we can access the back-end code.
![Connect to GitHub screen] (<https://cdn.auth0.com/blog/jsdeploy/connectogithub.png>)

d. Once you're connected, you can search for the name of your server repository, and click connect so it, as you might guess, connects to that repo.
![Connect screen] (<https://cdn.auth0.com/blog/jsdeploy/clickonconnect.png>)

e. The last thing here is to set up deployment. You'll pick the branch you want it to use (for my case, the master branch is what I wanted), and you'll want to click on Enable Automatic Deploys. (You won't need the 'wait for CI' link checked that shows in this image, unless you have tests set up that you want to run before your code updates.)
![Automatic Deploys screen] (<https://cdn.auth0.com/blog/jsdeploy/enableautomaticdeploy.png>)

f. Then, the part I missed at first: you'll want to run a manual deploy by clicking Deploy Branch, to get your site up and running! Once this completes, there will be a button at the bottom to view your site. Congrats - your server is now up and running!
![Deploy and view screen] (<https://cdn.auth0.com/blog/jsdeploy/deployprocess.png>)

### 4. Test your New Site!

Now, you'll probably want to test this and make sure it's connecting properly. So I'd go to one of the end points you have set up for getting information, and make sure that it shows you the data you expect. For my project, I grabbed the restaurants endpoint and made sure that I could see the list of restaurants. (This will look something like my-server-name.herokuapp.com/restaurants.)

### 5. Update Front-End Code with the New URL

Okay, halfway done! Now you'll go to the GitHub repository that hosts your front-end code. Anywhere that you linked to the localhost version of your server, you'll update with the Heroku link that now hosts your server. (Remember when we clicked view up above? The link that takes you to is your new endpoint.)

Do a search on any page that you think linked to your localhost - I missed a few spots the first time around!

### 6. Create Netlify Account

Okay, so now we'll set up an [account on Netlify] (<https://www.netlify.com>).

### 7. Launch your Netlify Site

Another multi-part step here - this one is easier, though!

a. Once your account is created, you'll click New Site from Git in the upper right corner.
![Create Site screen] (<https://cdn.auth0.com/blog/jsdeploy/ncreatesitefromgit.png>)

b. From here, you'll again choose to deploy from GitHub and connect your account.
![Connect GitHub screen] (<https://cdn.auth0.com/blog/jsdeploy/nchoosegithub.png>)

c. Then, you'll pick your front-end repository....
![Pick repo screen] (<https://cdn.auth0.com/blog/jsdeploy/nselectrepo.png>)

d. ...And choose your settings. I again used my master branch as the main branch for Netlify to read from.

You'll also set up two other things:
If you have a build step (I used gulp in my project, to compile my CSS and JS files), then you'll enter in the task that builds your project.

And you'll also set (or create) a folder that Netlify will use as your main / root folder. To my understanding, this is the only folder that Netlify will be able to see, so you'll need all of your files here - HTML, CSS, JS, images, service worker files, manifest.json....anything your front-end site uses to work, you'll want in this folder. I called mine dist like the image does, but you could name it whatever you want.
![Build commands screen] (<https://cdn.auth0.com/blog/jsdeploy/netliftyputbuildcommands.png>)

e. Then click Deploy Site at the bottom and let the process begin!

### 8. Rename Your Project

Netlify, by default, picks a random name for your site. You can click Site Settings on your dashboard page (pictured below) and change it if you'd like.
![Deployed screen] (<https://cdn.auth0.com/blog/jsdeploy/sitedeployinprogress.png>)

### 9. Congrats - the Main Steps are Done!!

Take a peek at your Netlify site, and see if your site shows up as you expect! Now the troubleshooting begins. :)

## Final Notes

My biggest issue was realizing that I needed to adjust my build step to include all the files I needed. At first, I'd only had my compiled files in there - so when I visited the Netlify link, nothing was showing up. So I had to add both of my HTML files, and my images and random other files that had been in my root folder. So I modified my gulp build task to do a copy of those files whenever I made changes. This was the step that held me back the most - so make sure you add all of the files your front-end needs to your dist folder (or whatever you named it) so that everything displays correctly!

I also missed a few of the localhost calls I'd been making, so had to go back and replace my new Heroku URL a few times as well. So make sure you check all the functionality your site uses and confirm that they work. :)

The nice thing about hosting with Netlify is that any time you push changes to GitHub, it automatically runs a new build and updates your site, so it's super easy to see your new changes. :) The same goes for using Heroku - I barely had to do anything once I realized I had to do a manual deploy to get it started, and the few small changes I made (mostly minor changes to the database I'd made locally and forgot about) were automatically pushed and updated as well!

I made some minor tweaks to my layout as well - since I had it hosted online now, I tested it on my phone and realized that some things didn't quite display right. Gotta get those styles looking good!

I hope this all makes sense! Please feel free to ask me any questions you have, and I'll do my best to help. Also feel free to give me any pointers for improving my work flow the next time I have a project to host.

## Happy building!

(And if you'd like to check out my project, it's [hosted here!] (<https://mws-reviews-app-lt.netlify.com/>))
