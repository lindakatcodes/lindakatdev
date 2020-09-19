---
title: Rockin' (Web)Sockets!
blurb: More Node learning - starting a chat app, & Socket.io!
createdAt: 2019-07-31 
tags:
  - Node.js
  - Socket.io
  - Learning
type: live
featured: false
---
I started the last project in my [Node course](https://www.udemy.com/the-complete-nodejs-developer-course-2/) - a chat app! I did the groundwork videos yesterday - getting libraries installed and new files/directories set up.

Tonight, I started getting into the actual code. For this project, the main library we're using is [Socket.io](socket.io), which has been really cool so far! It's got me learning a little bit about web sockets, which is a term I've heard before but haven't really paid attention to.

To my understanding - web sockets are an upgrade to HTTP request/response patterns. They create a connection between a server and a client (or multiple clients!), and keep that connection open so that both sides can send data to each other even faster than you're able to with standard requests. I don't fully understand **HOW** it does this - just that it does.

Socket.io builds on top of this, providing some nice API magic to make it even easier to work with server/client connections. What's really been cool to me is that it's centered around sending (emitting) custom events - so you can name your events anything you want! And then you can send along whatever data you want with it, and just set the other side to listen for that custom event. (It does have a few built ins as well, like connection and disconnect.)

Let me share a simple example we worked on to play around with this. This will show us a basic counter value - then once a button is clicked, it will update the value and show us the new value.

We started with an index.js file (our server file), which is running an Express app. (The io word you see is the variable that's set to our Express server, which socket.io is controlling.) In this file, we set up a variable for a counter, and then when a new client-side connection comes in, we send (emit) a custom named event, and the current value of our count variable.

```js
let count = 0;
```

```js
io.on('connection', (socket) => {   socket.emit('countUpdated', count); })
```

The _socket.emit_ phrase is the key - that's what sends the data off to our client / browser side of things.

On our client, we set up a listener function that listens for the custom event name we just created. When it detects that event being sent, it grabs the data that was sent along with it, and does something with it (in this example, just logs it to the console). (I should note - socket, in this instance, is also a variable defined in our file, which accesses the server we've got running.)

```js
socket.on('countUpdated', (count) => {   console.log('The count has been updated!', count) })
```

So now, when we first connect, our server is calling an event and sending the initial value of count, and our client is picking that event up and logging the value to the console.

Then, if we click a button (which is set up in an html file) on the client side of things, we want to increase the value of count. So we grab the button click event in our client file, and fire off an event to our server, to signify the button was clicked. Again, the name of our event is custom - it could be called whatever! It just has to match on both sides.

```js
document.querySelector('#btnIncrease')  .addEventListener('click', () => {    socket.emit('increment') })
```

Once our server detects this event, we then want to increase the value of count, and send that first event back with the new count value. (This little call takes place inside the `io.on('connection')` call we did earlier.)

```js
socket.on('increment', () => { count++; io.emit('countUpdated', count) })
```

And that's it! Now when we first open the browser to our site, we get a message with the initial count value. And each time we click the button on the page, our client side detects the button click, sends an event to our server, adds 1 to the counter, and the server sends the new value back to the client!

You might have noticed that sometimes I used `socket.emit`, and sometimes `io.emit`. There's 3 basic ideas / use cases that were introduced in the course (so far):

* **socket.emit** - The socket keyword ties to a specific client, so it'll send events only to that particular client.
* **io.emit** - Using the io keyword will send the events to all active, connected clients
* **socket.broadcast.emit** - This isn't in the examples above, but this will send an event to all connected clients **EXCEPT** the specific client you're in (we use this in the course for when a user logs in or out - you want others to see that a new user has joined or left, but you yourself don't need to see when you joined a chat!)

It's been really fun tonight, building out the core functionality for our app. It takes so little code to send and receive information on both ends of the app! It's boggling my mind. 🤯 I'm excited to get back to it, and keep working on this project! I already have ideas for how I'd like to use this information. 😊
