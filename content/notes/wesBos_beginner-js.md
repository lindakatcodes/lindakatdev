---
title: Beginner JavaScript
blurb: Notes and Reminders while going through Wes Bos' Beginner JS course
tags:
  - JavaScript
  - Wes Bos
---

## Types

7 different types in JS:

- String
- Number
- Boolean
- Null
- Undefined
- Symbol
- Object

### Strings

Can use '', "", or ``

Single & double quotes are interchangeable - mostly used when we need to escape out apostrophes

To do multi-line strings - will need to add back slashes or line breaks - or use back ticks, and can do multiple lines without extra syntax

Back ticks also let you do some nice concatenation with separate strings and variables (interpolation) - ``Hello my name is ${name}, nice to meet you``

### Numbers

can subtract, multiply, and divide with numbers or strings - but addition is only possible for numbers.

**If you're getting weird issues with numbers not coming out right, check and make sure you're not mixing numbers and strings!**

Modulo! `%` - Returns remainder of a division operation

Be careful when adding floats (decimal numbers) - can be inaccurate and give weird results. JS only really works with integers, so it's best to work with whole numbers when you can (or be sure to round or truncate if needing decimals).

Power - `**`

### Objects

Everything in JS is an object - used for collections of things

### Symbol

Way to do unique properties

### Null & Undefined

Both express "nothingness"

`undefined` - properties that don't exist, or variables set up without a value - trying to access something that isn't there.
a variable that hasn't had a value set to it yet

`null` - a value that is directly set to nothing/null. something that is explicitly set to mean nothing

### Booleans and Equality

True/false values - often used as flags

`=` - assigns something, like a value to a variable
`==` - checks equality between two values, checks value but **not** type
`===` - checks equality between two values, exact comparison of value **and** type
