---
title: TIL - Text-decoration Shorthand!
blurb: What is (and isn't) included in the text-decoration shorthand declaration.
createdAt: 2020-08-03
tags:
  - TIL
  - CSS
type: live
featured: true
---

While I was testing my new dev site on different browsers today, I noticed that some of my links didn't have their text decoration showing. This was odd to me, since text decoration has been a thing for a long time. So I did a little investigating, and learned a bit about the `text-decoration` shorthand.

It combines a few different properties:

- text-decoration-line
- text-decoration-color
- text-decoration-style

And a new property: text-decoration-thickness! However, the thickness property is only supported in Firefox right now - it's part of CSS4, so not officially, fully available yet. So it doesn't work in Chrome or ~~Safari~~ yet. (Actually, thickness is available for Safari right now too - just not as part of the shorthand. It has to be declared separately.) Just happens to be my luck that Firefox is my current browser of choice. :)

So in my code, what I had was

```css
text-decoration: 2px solid underline var(--lightBasic)
```

But the `2px` part is the thickness property, so wasn't showing properly. Removed that, and all three browsers looked the same!

That's my interesting tidbit for the day. 😎 Happy coding, friends!
