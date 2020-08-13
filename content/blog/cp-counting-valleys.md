---
title: Coding Practice - Counting Valleys (Hacker Rank)
blurb: Solving the Counting Valleys problem on Hacker Rank on the first try!
tags:
  - practice
  - JavaScript
type: live
featured: false
---

## Counting Valleys Problem

This is an easy rated problem on Hacker Rank, but I solved it on my first try so I'm fairly excited! All those years of doing [Advent of Code](https://adventofcode.com) has paid off! :)

So here's the breakdown of this problem, and my solution.

### The Setup

We're supplied with the number of steps someone takes on their hike, and an array that lists if each step is up or down. Their hike always starts and ends at sea level, and we're tasked with figuring out how many valleys (how many times they go down below sea level, and then come back up to sea level) they encounter during the hike.

### My solution

To me, the main part is tracking what the person's sea level value is. Then, we just need to count the number of times the sea level value goes from -1 to 0! This is the only time they're coming out of a valley and back to equal. So we can basically read through the array and update the sea level value for each step, and then when it goes from -1 to 0 (which will only happen on an up step), we increase the valley count! Then return the valley count when we finish going through the hike array.

```js
/* we have a few provided values:
  n - total number of steps
  s - the array of directional steps
  U - an up step
  D - a down step */
function countingValleys(n, s) {
    let seaLevel = 0;
    let valleys = 0;

    for (let i = 0; i < n; i++) {
        if (s[i] === 'U') {
            seaLevel++;
            if (seaLevel === 0) {
                valleys++;
            }
        } else if (s[i] === 'D') {
            seaLevel--;
        }
    }

    return valleys;
}
```

Pretty amazed this worked on the first try, in all honesty! lol Let me know if anything doesn't make sense, I'd be happy to walk through this with you!

Happy coding, friends!
