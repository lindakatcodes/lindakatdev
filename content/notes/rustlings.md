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

----

## Intro Commands

Each program in Rust must have a `main` function - it's always the first code run in every program.

```rust
fn main() {

}
```

> Semicolons indicate the end of an expression - most lines of Rust code will end with one.

To compile and run your program in Rust:

```rust
// This will compile the program
rustc filename.rs

// Then this will run the program (can leave the extention off in iOS or Linux)
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
// convention says to name consts in screaming snake case
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
