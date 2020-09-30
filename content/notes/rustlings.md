---
title: Rustlings
blurb: Personal reference sheet of Rust documentation while going through the Rustlings exercises
tags:
  - Rust
---

> Even though compiler errors can be frustrating, they only mean your program isn’t safely doing what you want it to do yet; they do *not* mean that you’re not a good programmer! - The Rust Book

## Jump to a Section

- [Intro Commands](#intro-commands)
- [Variables](#variables)
- [Data Types](#data-types)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Structs](#strucs)
- [Errors](#errors)

----

## Intro Commands

Each program in Rust must have a `main` function - it's always the first code run in every program.

```rust
fn main() {

}
```

> Semicolons indicate the end of a statement - most lines of Rust code will end with one.

To compile and run your program in Rust:

```rust
// This will compile the program
rustc filename.rs

// Then this will run the program (can leave the extension off in iOS or Linux)
./filename.exe
```

Cargo is the Rust package manager and build system, which will give us some easier ways to create, compile, and manage our programs. A few common commands:

```rust
// create a new project - will give us a cargo.toml file for configuration, a src directory with a main.rs file inside, and it initializes a new git repo and .gitignore file
cargo new hello_cargo

// To build our program - creates the .exe in target/debug, and creates a cargo.lock file for our dependencies
cargo build

// To build and run the program, one after the other
cargo run

// To make sure our code compiles, but does not create the .exe file
cargo check

// When ready to send our program to others or put it in production, can add a release flag that will optimize the program so it's faster, and will put it in target/release
cargo build --release
```

Cargo expects your source files to be in a `src` directory, and uses the root folder for README and configuration files.

## Variables

By default in Rust, variables are **immutable** - you can't change the value once they're assigned. Variables are declared with the `let` keyword.

```rust
let x = 5;
```

However, we can allow a variable to be mutable, if we want to. We do this with the `mut` keyword.

```rust
let mut x = 5;
```

### The difference between variables & constants in Rust

In a similar way, constants are values bound to a name and are immutable. However, you can't use `mut` with constants - they're always immutable.

We use the `const` keyword to declare them, and they **always** need their type defined (as opposed to variables, where it's good to define the type but can be inferred).

Constants can be declared in any scope (including globally). And they can only be set to a constant expression, not the result of a function call or anything else that would have to be computed at runtime. We need to know exactly what the value is before the program is compiled, so it always takes up the same amount of space.

```rust
// convention says to name const in screaming snake case
const MAX_POINTS: u32 = 10_000;
```

### Shadowing

Interestingly, there's a concept called shadowing in Rust, where we can re-declare a variable using the same name, to take the initial value and do something new to it (using it in a function or changing the type). The new declaration is what will show when that variable is used.

```rust
let x = 5;
let x = x + 1;
```

Though it seems similar to mutating a variable, this gives us a way to transform the initial value and then have the new value be immutable - so we can change it each time we specifically want to, but then have it be the same anytime we use it like a regular variable.

This also effectively creates a new variable by using `let` again, which is what lets us change the type. If we had a mutable variable and tried to change the type, the compiler would give us an error - but if we shadow it, it counts it as a new variable instead, and allows it like it would any new variable declaration.

## Data Types

Rust is a statically typed language, so it needs to know the type of all variables at compile time. It can infer some of these based on how we use them, but it's often best to declare it.

There are two main types of values in Rust:

### Scalar Types

Represents a single value. There are 4 primary scalar types:

*For numbers, you can use an `_` as a visual separator `1_000`*

- **Integers**
  A whole number. Will be signed (can be negative or positive, so the sign matters) or unsigned (will only ever be positive). You can use 8, 16, 32, 64, or 128 bit numbers. Integers default to `i32`. A program will panic (crash) in debug mode if an integer overflows the size you set (a number is out of range).
  `ex: i8 or u16`
- **Floating-point numbers**
  There are two types for floating point numbers: `f32 and f64`. The default is `f64`. The 32 bit has single precision, while 64 bit has double precision.
- **Booleans**
  `bool`, Can be either true or false. One byte in size.
- **Characters**
  `char`, Four bytes in size, and represents a single Unicode Scalar Value. Can be used for English letters, accented letters, emoji, zero width spaces, and more.

  > `Char` literals are specified with single quotes; `String` literals are specified with double quotes.

### Compound Types

These group multiple values into one type. There's two types - tuples and arrays.

#### Tuples

A general way of grouping together a number of values with various types into one compound type. They have a fixed length: once declared, they can't grow or shrink in size.

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);

// to get individual values, we use destructuring with pattern matching
let (x, y, z) = tup;
// or can use dot notation for the index of the item we want
let one = x.2;
```

#### Arrays

Will also have a fixed length, but each element must have the same type. Will be a single chunk of memory allocated on the stack.

```rust
// type is written as [type; # of elements]
let a: [i32; 5] = [1, 2, 3, 4, 5];
// if we want each value to be the same, can declare by giving the value then the # of elements
let b = [3; 5];
// will access items in the array with [] notation
let first = a[0];
```

If you try to access something outside of the array (like with an index that's too long), Rust will check to see if that index is less than the array length. If not, it will panic and end the program. This helps prevent you from allowing memory access that's invalid.

## Control Flow

### If Statements

Similar to JS, will run a block of code if a condition is met. Expressions are sometimes called `arms`. A few key things to note:

- Conditions in `if` statements **must** be a `bool`.
- Because `if` is an expression, we can use it on the right side of a `let` statement.
- Values that have the potential to be results from each arm of the `if` statement must be the same type.

```rust
  let number = 6;

  if number < 10 {
    println!("Smaller number");
  } else if number == 10 {
    println!("Equal");
  } else {
    println!("Larger number");
  }
```

## Functions

Functions are defined with `fn`, and can be declared either above or below the `main` function.

```rust
  fn another_function(x: i32) {
    .... // some code
  }
```

Can be passed parameters, which will need the type expected to be declared. If multiple parameters, use a `,` to separate them. Parameters do not need to all be the same type.

Function bodies are made up of a series of statements, optionally ending in an expression. There is a distinction between the two words.

**Statements** are instructions that perform some action and do not return a value. **Expressions** evaluate to a resulting value.

Defining a variable and assigning it a value is a statement. Function definitions are also statements. Since they don't return values, you can't assign them to another variable.

Numbers, math operations, calling a function, or calling a macro are all expressions - they all evaluate to something. **Expressions do not include ending semicolons.**

Functions can return values - if they do, we declare the type after an ->. Rust by default will return the final expression in the function, though if you want to return earlier you can call the keyword `return`.

```rust
  fn sum_num(a: i16, b: i16) -> i16 {
    a + b
  }
```

## Ownership

Ownership allows Rust to make memory safety guarantees without needing a garbage collector.

Some languages will collect "garbage", meaning they regularly look for no longer used memory and recycle that as your program runs. Others make you explicitly allocate and free memory yourself. Rust manages memory with ownership, a set of rules checked during compiling.

### The Stack and the Heap

Whether a value is on the stack or the heap makes a difference in how Rust behaves. Both are parts of memory available for your code to use, but are structured in different ways. So a quick rundown of what each are and why they matter:

- **The Stack** stores values in the order it gets them, and removes values from the end first (last in, first out). Like a stack of plates - you put one on top of the previous one, and when you need one you grab the one on top. Adding is called *pushing onto the stack*, and removing is *popping off the stack*. Anything stored on the stack must have a known, fixed size.

- **The Heap** is used by asking for a certain amount of memory space, then receiving a pointer to a location on the heap that has enough space to meet your needs. This is used for data with an unknown size, or where the size might change over time. The process of finding a space for the data and returning a pointer is called *allocating*. Like being seated at a restaurant - you tell the staff how many people are in your party, and they find you a table with enough room. People coming later can ask for your table and be pointed in the right direction.

Since the heap pointer is a known, fixed size you can store that on the stack, but it will eventually have to follow the pointer to find the data.

Pushing to the stack is faster since data always goes on top - we never have to search for where to put something. Allocating to the heap takes a bit more work since we have to find a space, get the pointer, and then update the memory records to prepare for the next allocation.

Accessing heap data is also a bit slower, since we have to follow the pointer to get there (as opposed to just grabbing what's on top of the stack). The more we can work with less memory jumping, the better for our code's performance.

When we call a function, the values passed in and local values are all pushed onto the stack, then popped off once the function is done running.

Ownership helps with keeping track of what's on the heap, minimizing duplicates, and cleaning up unused data so we don't run out of space.

### Ownership Rules

- Each value in Rust has a variable called the *owner*.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

**Scope** is the range in a program where an item is valid. For variables, they're valid from the moment they're declared until the current scope ends.

### The String Type

String literals (like covered earlier) are immutable, and are typically hard coded. Works great in some cases, but sometimes (like taking in user input) we won't know the exact string or the size, and so will want to make a string from the `String` type. This type is allocated on the heap and is an adjustable size.

If we want to make a `String` type from a string literal, we can do that like this:

```rust
let s = String::from("hello");
// to then add to this, we can do something like this:
s.push_str(", world!");
```

Here, we call `String::from`, and this requests the memory we need from the memory allocator at runtime.

We'll also need a way to return this memory once we're done with it. Historically this has been difficult, since we can do this too early, or not at all, or more than once, all of which have their own issues.

> We need to pair exactly one `allocate` with exactly one `free`.

In Rust, the memory is automatically returned once the variable goes out of scope. Rust will call a function called `drop` to clear this up for us.

Example: if we were to do this:

```rust
let x = 5;
let y = x;
```

This works like you might think - we bind `x` to the value 5, then we bind `y` to a copy of the value stored in `x`. Because these are integers and pushed on the stack, it works easily and copies the data directly.

`String` is a little different. They're made up of 3 parts: the pointer to the memory that holds our data; a length; and a capacity. This group of info is stored on the stack when we declare a new `String`.

The length is how much memory, in bytes, the contents currently use. The capacity is the total amount of memory. If we try to copy a `String` to another variable like we did with numbers above, what will copy is actually this group of information - not the data itself.

If we left it like this, we'd get a double free error when the variables go out of scope, because the `drop` function would be called on both and they both access the same point in memory. So when we reassign a value, Rust no longer considers the first one valid, and so won't try to free anything when it goes out of scope.

This is called a *move* - since we're basically moving the first version of our string into the second version. Rust has this as the default, so it's always inexpensive and makes sure we don't cause a double call to free the memory.

Now if we **did** want to have two copies of the same string value, we can use a method called `clone`. This makes it obvious that we're intending to do this, and it might be memory-expensive.

```rust
let s1 = String::from("hello"):
let s2 = s1.clone();
```

Passing a value to a function works in a similar way as assigning it to a variable. It will either move or copy the value, depending on the type of data. Returning values can also transfer ownership.

```rust
fn main() {
  let s = String::from("hello"); // s comes into scope
  takes_ownership(s); // s's value moves to the function, and s is no longer valid

  let x = 5; // x comes into scope
  makes_copy(x); // x moves into function, but is a copy type and so x is still valid
} // x goes out of scope, then s - but since s is already invalid, nothing special happens to it
```

```rust
fn main() {
  let s1 = gives_ownership(); // if this function returns a value, that value will be given to s1
  let s2 = String::from("hi"); // s2 comes into scope
  let s3 = takes_and_returns(s2); // s2 is moved into the function and marked invalid; if this function returns a value it will be given to s3
} // s3 goes out of scope; s2 is checked but already invalid so nothing happens to it; s1 goes out of scope
```

### References and Borrowing

Rust has *references*, where we can refer to a value without taking ownership of it - noted using `&`.

```rust
fn main() {
  let s1 = String::from("hello");
  let len = calculate_length(&s1);
}
fn calculate_length(s: &String) -> usize {
  s.len()
}
```

Since we're passing in a reference, the value it points to will not be dropped when that reference goes out of scope. Since the function has a reference and not the actual value, we also don't have to return the value to give ownership back - we never took it in the first place.

Having references as function parameters is called *borrowing*.

We also can't edit a referenced value - when the reference is passed, it's immutable. If we want to be able to change something with our reference, we need to specifically call it as a mutable reference. Can only have 1 mutable reference to a particular piece of data in a particular scope.

```rust
fn main() {
  let mut s = String::from("hello");

  change(&mut s);
}
fn change(some_strong: &mut String) {
  some_string.push.str(", world");
}
```

You also can't borrow an immutable reference and a mutable reference in the same scope.

A references scope starts from where it's declared and continue through the last time it's used. So if we make an immutable reference, use it, and then make a mutable reference, that will work.

### Dangling References

Rust makes sure that if we still have a pointer to a spot in memory active, it will always point to that data - it's going to give us an error if it tries to clear while a pointer is still active.

### Slices

`Slices` also don't have ownership - they let you reference a contiguous sequences of elements in a collection.

```rust
let s = String::from("hello, world");
// this is a reference to a section of the String, grabbing the range [starting_index..ending_index]
let hello = &s[0..5];
```

In the range we selected, the starting index is where we start, and the ending index is 1 more than the last position we want. Internally, this structure stores the starting position and the length of the slice (ending minus starting).

In the `..` range syntax, if we want to start from the first index (0), we can drop the first number - `[..2]`. This also works if we want to go to the end of the string - `[3..]`.

The type for a string slice is `&str`. This type is an immutable reference - and is the type of a string literal!

The slice and range terms we just used also work on arrays.

```rust
let a = [1, 2, 3];
let slice = &a[0..2];
```

## Strings

```rust
// to create a new empty string we can load data into
let mut s = String::new();
// add initial data to a string
let s = "initial contents".to_string();
let s = String::from("initial contents");
// add data to strings
// push_str takes a string slice (no ownership)
s.push_str("bar");
// push takes a single character
s.push('l');
// concatenate strings - + and format
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
// s1 will be moved here, so no longer valid
let s3 = s1 + &s2;
// or use format for multiple strings - works like println but doesn't print output to screen
let s = format!("{}-{}-{}", s1, s2, s3);
```

Rust strings don't support indexing like s[0]. Since strings are stored in UTF-8, indexing like that doesn't always return what we might expect. Instead, Rust has you use a slice with a range, to specifically grab the characters you want.

```rust
// will grab first 4 bytes of a string - may not always be 4 characters, depending on how the string is encoded (other languages might be more bytes per character)
let s = &hello[0..4];
// other ways to access elements
// to perform operations on individual characters, best to use chars
for c in "test".chars() {
  println!("{}", c);
}
//  if you want bytes, can use .bytes()

```

## Structs

A `struct` is a custom data type that lets us name and package together multiple related values, similar to an object's data attributes. In structs, the keys are called `fields`.

Structs are similar to tuples in that each piece can be a different type. However, in structs each piece is named, making it more flexible than a tuple.

```rust
struct User {
  username: String,
  email: String,
  sign_in_count: u64,
  active: bool,
}
```

To then use a struct, we simply call it and assign values to store in each field. If we make it a mutable instance, we can also change fields with dot notation.

```rust
let mut user1 = User {
  email: String::from("example@test.com"),
  username: String::from("user124"),
  active: true,
  sign_in_count: 1,
};

user1.email = String::from("newemail@text.com");
```

Similar to JS, can use a shorthand syntax if the field name and a parameter name in a function use the same name:

```rust
fn build_user(email: String) -> User {
  User {
    email,
    active: true,
  }
}
```

We can also make new instances based on other instances - so if we want to use most of the same values of an instance, but change a few, we can do that.

```rust
let user2 = User {
  email: String::from("another@example.com"),
  username: String::from("differentuser2"),
  ..user1
}

// if we wanted to do this more long hand, it would look like
// active: user1.active,
```

> Each struct you define is its own type.

### Tuple Structs

If you've got an instance where you want to name a tuple, and it would be verbose to name the fields, we can make a `tuple struct` - will behave like a tuple, but is named and it's own type, separate from any other tuples.

```rust
struct Color(i32, i32, i32);
let black = Color(0, 30, 0);
```

### Unit Structs

????

### Methods

Methods are similar to functions - they both use `fn`, are named, can have parameters and a return value, & contain code to run. But methods are defined in the context of a struct, & their first parameter is always `self` (the instance of the struct it's called on).

```rust
struct Rectangle {
  width: u32,
  height: u32,
}

impl Rectangle {
  fn area(&self) -> u32 {
    self.width * self.height
  }
}

// if we wanted to change the values in self, we would use:
// fn area(&mut self)...

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

> Methods can take ownership of `self`, borrow `self` immutably, or borrow `self` mutably, just as they can with any other parameter.

Can have multiple methods in an `impl` block - helps keep our code easier to read, since any method that can be used on our struct is tied to it and in the same place. (Though you can use multiple `impl` blocks for the same struct if you'd like.)

In `impl` blocks, can also define associated functions, that don't take `self` as a parameter - they won't have an instance of the struct to work with. Often used for constructors that return a new instance of the struct. To call these, we use the `::` syntax (`String::from` is an example of this).

## Errors

```rust
// if we need our program to panic (print a failure message, unwind and clean up stack, then quit):
panic!("error message!");
```
