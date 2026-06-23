import type { SeedContext, SeedCourseId } from "../utils";
import { upsertModuleByTitle, upsertLessonByTitle } from "../utils";
import type { Id } from "../../_generated/dataModel";
import { applyEnhancementsToCourse } from "../enhancements";

// ---------------------------------------------------------------------------
// JavaScript Fundamentals — 14 modules, 56 lessons total
// ---------------------------------------------------------------------------

export async function seedJavaScriptFundamentals(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds: Id<"lessons">[] = [];

  // -----------------------------------------------------------------------
  // Module 1: Introduction to JavaScript
  // -----------------------------------------------------------------------
  const mod1 = await upsertModuleByTitle(ctx, courseId, "Introduction to JavaScript", {
    description: "Get started with the language of the web",
    order: 1,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod1, courseId, "What is JS", {
      type: "theory",
      order: 1,
      estimatedMinutes: 10,
      content: `# What is JavaScript?

JavaScript is the programming language of the web. It runs in every modern browser and powers the interactive behavior you see on websites.

## A Brief History

JavaScript was created in 1995 by Brendan Eich in just 10 days. Despite its name, JavaScript has almost nothing to do with Java.

## What can JavaScript do?

- **Change HTML content**: Dynamically update text, images, and other elements
- **Respond to events**: React to clicks, keyboard input, and mouse movements
- **Fetch data**: Communicate with servers without reloading the page
- **Build full applications**: With Node.js, JavaScript runs on servers too

## Your first JavaScript

\`\`\`javascript
console.log("Hello, JavaScript!");
\`\`\`

This prints a message to the browser's developer console. Open your browser DevTools (F12) and try it yourself!`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod1, courseId, "How JS Runs", {
      type: "theory",
      order: 2,
      estimatedMinutes: 12,
      content: `# How JavaScript Runs

JavaScript is an interpreted (or JIT-compiled) language. Understanding how it executes helps you write better code.

## JavaScript Engines

Every browser has a built-in JavaScript engine that reads and executes your code:

| Browser | Engine |
|---------|--------|
| Chrome / Edge | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore (Nitro) |
| Node.js | V8 |

## The Execution Process

1. **Parsing**: The engine reads your source code and builds an Abstract Syntax Tree (AST)
2. **Compilation**: Modern engines use Just-In-Time (JIT) compilation to convert JavaScript to machine code
3. **Execution**: The compiled code runs, and the engine manages memory and optimizations
4. **Garbage Collection**: Unused memory is automatically freed

## Client-Side vs Server-Side

\`\`\`javascript
console.log(typeof window); // "object" (in browser)
\`\`\`

On the client side, JavaScript has access to the DOM, events, and browser APIs. On the server side (Node.js), it has access to the file system, networking, and operating system APIs.

## The Runtime Environment

A JavaScript runtime includes:
- The **engine** (executes code)
- **Web APIs** / **Node APIs** (extra functionality: DOM, fetch, setTimeout)
- The **event loop** (coordinates execution of code, events, and async callbacks)`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod1, courseId, "Variables & Data Types", {
      type: "theory",
      order: 3,
      estimatedMinutes: 15,
      content: `# Variables and Data Types

Variables store values so you can use them later. JavaScript has three ways to declare a variable.

## Declaring Variables

\`\`\`javascript
let message = "Hello";   // Can be reassigned
const PI = 3.14;         // Cannot be reassigned (constant)
var old = "avoid this";  // Old style — avoid in modern JS
\`\`\`

- \`let\`: Use by default. Block-scoped, can be updated.
- \`const\`: Use for values that shouldn't change. Must be initialized.
- \`var\`: Function-scoped, can cause bugs. Avoid in modern code.

## Primitive Data Types

JavaScript has 7 primitive types:

| Type | Example | Description |
|------|---------|-------------|
| \`string\` | \`"hello"\` | Text |
| \`number\` | \`42\`, \`3.14\` | Numbers |
| \`boolean\` | \`true\`, \`false\` | Logical values |
| \`null\` | \`null\` | Intentional absence of value |
| \`undefined\` | \`undefined\` | Value not yet assigned |
| \`symbol\` | \`Symbol("id")\` | Unique identifier |
| \`bigint\` | \`9007199254740991n\` | Large integers |

## Type Checking

\`\`\`javascript
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof null       // "object" — this is a known bug!
typeof undefined  // "undefined"
typeof Symbol()   // "symbol"
typeof 1n         // "bigint"
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod1, courseId, "Setting Up Environment", {
      type: "theory",
      order: 4,
      estimatedMinutes: 12,
      content: `# Setting Up Your Environment

Before writing JavaScript, set up your development environment.

## 1. A Code Editor — VS Code

Visual Studio Code is the most popular editor for JavaScript.

- Download from code.visualstudio.com
- Useful extensions: ESLint (catch errors), Prettier (auto-format), Live Server (live reload)

## 2. Browser Developer Tools

- **Open with**: F12 or Ctrl+Shift+I (Windows)
- **Console tab**: Run JavaScript interactively
- **Sources tab**: Debug with breakpoints
- **Network tab**: Inspect API requests

\`\`\`javascript
console.log("Hello from DevTools!");
\`\`\`

## 3. Node.js

Lets you run JavaScript outside the browser.

\`\`\`bash
node --version
npm --version
\`\`\`

## 4. Your First JS File

\`\`\`javascript
// index.js
console.log("JavaScript is running!");
\`\`\`

\`\`\`bash
node index.js
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod1, courseId, "Hello JS Practice", {
      type: "practice",
      order: 5,
      estimatedMinutes: 15,
      codeTemplate: `// Write a function that returns a greeting message.
// It should take a name as a parameter and return "Hello, <name>!"

function greet(name) {
  // Your code here
}

// Test it
console.log(greet("World"));`,
      solution: `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World")); // Hello, World!`,
      testCases: [
        { input: "World", expectedOutput: "Hello, World!", isHidden: false },
        { input: "JavaScript", expectedOutput: "Hello, JavaScript!", isHidden: false },
        { input: "Alice", expectedOutput: "Hello, Alice!", isHidden: true },
        { input: "CodeMaster", expectedOutput: "Hello, CodeMaster!", isHidden: true },
      ],
      content: `# Hello JavaScript Practice

Write and run your first JavaScript function.

**Task:** Implement the \`greet\` function so it takes a name and returns a greeting.

**Expected output:**
\`\`\`
Hello, World!
\`\`\`

**Hint:** Use string concatenation with the \`+\` operator, or template literals: \`\`Hello, \\\${name}!\`\``,
    })
  );

  // -----------------------------------------------------------------------
  // Module 2: Operators & Control Flow
  // -----------------------------------------------------------------------
  const mod2 = await upsertModuleByTitle(ctx, courseId, "Operators & Control Flow", {
    description: "Learn to control program flow with operators and conditionals",
    order: 2,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod2, courseId, "Operators", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# JavaScript Operators

Operators perform actions on values. JavaScript has several categories.

## Arithmetic Operators

\`\`\`javascript
let a = 10, b = 3;
console.log(a + b);  // 13  (addition)
console.log(a - b);  // 7   (subtraction)
console.log(a * b);  // 30  (multiplication)
console.log(a / b);  // 3.333...  (division)
console.log(a % b);  // 1   (modulus / remainder)
console.log(a ** b); // 1000  (exponentiation)
\`\`\`

## Comparison Operators

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`===\` | Strict equal | \`5 === "5"\` | \`false\` |
| \`==\` | Loose equal | \`5 == "5"\` | \`true\` |
| \`!==\` | Strict not equal | \`5 !== "5"\` | \`true\` |
| \`>\` | Greater than | \`10 > 5\` | \`true\` |
| \`<\` | Less than | \`10 < 5\` | \`false\` |

**Always prefer \`===\` over \`==\`.**

## Logical Operators

\`\`\`javascript
console.log(true && false); // false (AND)
console.log(true || false); // true  (OR)
console.log(!true);         // false (NOT)
\`\`\`

## Assignment Operators

\`\`\`javascript
let x = 10;
x += 5;   // x = 15
x -= 3;   // x = 12
x *= 2;   // x = 24
x **= 3;  // x = 8
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod2, courseId, "Type Conversion", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# Type Conversion & Coercion

JavaScript automatically converts types (coercion) and lets you explicitly convert them.

## Implicit Coercion

\`\`\`javascript
console.log("5" - 2);    // 3  (string coerced to number)
console.log("5" + 2);    // "52"  (number coerced to string)
console.log(true + 1);   // 2  (true becomes 1)
\`\`\`

## Explicit Conversion

\`\`\`javascript
String(123)          // "123"
Number("42")         // 42
parseInt("42px")     // 42
Boolean(0)           // false
!!"hello"            // true (double NOT)
\`\`\`

## Truthy and Falsy Values

Falsy values: \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`

Everything else is truthy.

## NaN

\`\`\`javascript
console.log(Number("hello"));  // NaN
console.log(NaN === NaN);      // false! (NaN is never equal to itself)
console.log(Number.isNaN(NaN)); // true
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod2, courseId, "Conditionals", {
      type: "theory",
      order: 3,
      estimatedMinutes: 15,
      content: `# Conditional Statements

Conditionals let your program make decisions.

## If / Else If / Else

\`\`\`javascript
let temperature = 25;
if (temperature > 30) {
  console.log("It's hot!");
} else if (temperature > 20) {
  console.log("It's warm.");
} else {
  console.log("It's cool.");
}
\`\`\`

## Switch Statement

\`\`\`javascript
let day = 3;
let dayName;
switch (day) {
  case 1: dayName = "Monday"; break;
  case 2: dayName = "Tuesday"; break;
  case 3: dayName = "Wednesday"; break;
  default: dayName = "Weekend";
}
console.log(dayName); // "Wednesday"
\`\`\`

## Ternary Operator

\`\`\`javascript
let status = age >= 18 ? "Adult" : "Minor";
\`\`\`

## Short-Circuit Evaluation

\`\`\`javascript
console.log("" || "default");     // "default"
console.log(null ?? "default");   // "default" (nullish coalescing)
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod2, courseId, "Loops", {
      type: "theory",
      order: 4,
      estimatedMinutes: 15,
      content: `# Loops & Iteration

Loops repeat a block of code multiple times.

## For Loop

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
\`\`\`

## While Loop

\`\`\`javascript
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}
// 0, 1, 2
\`\`\`

## Do...While

\`\`\`javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 0);
// 0 (runs at least once)
\`\`\`

## For...Of / For...In

\`\`\`javascript
// for...of — iterates values
for (const fruit of ["apple", "banana"]) {
  console.log(fruit);
}

// for...in — iterates keys
for (const key in { a: 1, b: 2 }) {
  console.log(key); // "a", "b"
}
\`\`\`

## Break and Continue

\`\`\`javascript
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 7) break;    // stop at 7
  console.log(i); // 0, 1, 2, 4, 5, 6
}
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod2, courseId, "FizzBuzz", {
      type: "practice",
      order: 5,
      estimatedMinutes: 15,
      codeTemplate: `// Classic FizzBuzz: print numbers 1 to n
// - If divisible by 3, print "Fizz"
// - If divisible by 5, print "Buzz"
// - If divisible by both, print "FizzBuzz"
// - Otherwise print the number
// Return as array of strings

function fizzBuzz(n) {
  const result = [];
  // Your code here
  return result;
}

console.log(fizzBuzz(15));`,
      solution: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(String(i));
  }
  return result;
}`,
      testCases: [
        { input: "5", expectedOutput: '["1","2","Fizz","4","Buzz"]', isHidden: false },
        { input: "15", expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', isHidden: false },
        { input: "3", expectedOutput: '["1","2","Fizz"]', isHidden: true },
      ],
      content: `# FizzBuzz Challenge

The classic programming challenge. Implement \`fizzBuzz(n)\` that returns an array of strings for numbers 1 through n.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 3: Functions Deep Dive
  // -----------------------------------------------------------------------
  const mod3 = await upsertModuleByTitle(ctx, courseId, "Functions Deep Dive", {
    description: "Master functions, scope, closures, and higher-order patterns",
    order: 3,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod3, courseId, "Defining Functions", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# Defining Functions

Functions are reusable blocks of code. They are the building blocks of JavaScript programs.

## Function Declaration

\`\`\`javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
\`\`\`

Function declarations are hoisted — callable before they appear in code.

## Function Expression

\`\`\`javascript
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 5)); // 20
\`\`\`

## Arrow Functions

\`\`\`javascript
const double = x => x * 2; // implicit return
const add = (a, b) => a + b;
\`\`\`

## Parameters

\`\`\`javascript
// Default parameters
function greet(name = "World") {
  return \`Hello, \\\${name}!\`;
}

// Rest parameters
function sumAll(...numbers) {
  return numbers.reduce((t, n) => t + n, 0);
}
\`\`\`

## First-Class Functions

Functions can be stored in variables, passed as arguments, and returned:

\`\`\`javascript
[1, 2, 3].map(x => x * 2); // [2, 4, 6]

function createMultiplier(factor) {
  return n => n * factor;
}
const double2 = createMultiplier(2);
console.log(double2(5)); // 10
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod3, courseId, "Scope/Hoisting/Closure", {
      type: "theory",
      order: 2,
      estimatedMinutes: 20,
      content: `# Scope, Hoisting & Closure

Understanding where variables live is key to writing correct code.

## Types of Scope

\`\`\`javascript
// Global — visible everywhere
const globalVar = "I'm global";

function myFn() {
  // Function scope — visible only inside
  const fnVar = "I'm function-scoped";

  if (true) {
    // Block scope (let/const) — only in this block
    let blockVar = "I'm block-scoped";
    var old = "I'm still function-scoped"; // ignores blocks
  }
}
\`\`\`

## Hoisting

\`\`\`javascript
sayHello(); // Works! Function declarations are hoisted
function sayHello() { console.log("Hello!"); }

console.log(myVar); // undefined (var hoisted but not initialized)
var myVar = 5;

// let/const — Temporal Dead Zone
// console.log(myLet); // ReferenceError!
let myLet = 10;
\`\`\`

## Closures

A function that remembers its outer variables after the outer function has returned:

\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

The inner function "closes over" \`count\`, keeping it alive.`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod3, courseId, "Callbacks & Higher-Order", {
      type: "theory",
      order: 3,
      estimatedMinutes: 20,
      content: `# Callbacks & Higher-Order Functions

Higher-order functions accept or return other functions. Callbacks are functions passed as arguments.

## Callback Example

\`\`\`javascript
function processUserInput(callback) {
  const name = "Alice";
  callback(name);
}

processUserInput(function(name) {
  console.log(\`Hello, \\\${name}!\`);
});
\`\`\`

## Array Methods

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// map — transform each element
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter — keep matching elements
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce — combine into a single value
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// find — first matching element
const first = numbers.find(n => n > 3); // 4
\`\`\`

## Method Chaining

\`\`\`javascript
const result = [1, 2, 3, 4, 5]
  .filter(n => n % 2 !== 0)   // [1, 3, 5]
  .map(n => n * n)            // [1, 9, 25]
  .reduce((a, b) => a + b, 0); // 35
\`\`\`

## every / some

\`\`\`javascript
[1, 2, 3].every(n => n > 0);  // true
[1, 2, 3].some(n => n > 5);   // false
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod3, courseId, "IIFE & Patterns", {
      type: "theory",
      order: 4,
      estimatedMinutes: 15,
      content: `# IIFE & Function Patterns

Common function patterns used in real-world JavaScript.

## IIFE — Immediately Invoked Function Expression

\`\`\`javascript
(function() {
  const privateVar = "This is private";
  console.log("IIFE running!");
})();

// Private state pattern
const counter = (function() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
})();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
\`\`\`

## Recursion

\`\`\`javascript
function factorial(n) {
  if (n <= 1) return 1; // base case
  return n * factorial(n - 1); // recursive case
}
console.log(factorial(5)); // 120
\`\`\`

## Pure Functions

\`\`\`javascript
// Pure — same input always same output, no side effects
function pureAdd(a, b) { return a + b; }

// Impure — modifies external state
let total = 0;
function impureAdd(v) { total += v; return total; }
\`\`\`

## Memoization

\`\`\`javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod3, courseId, "Practice", {
      type: "practice",
      order: 5,
      estimatedMinutes: 20,
      codeTemplate: `// Write a function that takes an array of numbers and returns
// the sum of their squares (each number multiplied by itself).
// Use array methods (map, reduce) rather than a for loop.

function sumOfSquares(numbers) {
  // Your code here
}

console.log(sumOfSquares([1, 2, 3]));   // 14
console.log(sumOfSquares([2, 4]));       // 20`,
      solution: `function sumOfSquares(numbers) {
  return numbers
    .map(n => n * n)
    .reduce((sum, n) => sum + n, 0);
}`,
      testCases: [
        { input: "[1, 2, 3]", expectedOutput: "14", isHidden: false },
        { input: "[2, 4]", expectedOutput: "20", isHidden: false },
        { input: "[0, 5, 10]", expectedOutput: "125", isHidden: false },
        { input: "[1, 1, 1, 1, 1]", expectedOutput: "5", isHidden: true },
      ],
      content: `# Sum of Squares Practice

Implement \`sumOfSquares(numbers)\` using \`map\` and \`reduce\`. No for-loops allowed!`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 4: Arrays & Objects
  // -----------------------------------------------------------------------
  const mod4 = await upsertModuleByTitle(ctx, courseId, "Arrays & Objects", {
    description: "Work with collections of data using arrays and objects",
    order: 4,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod4, courseId, "Arrays Basics", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# Arrays: Creation & Basics

Arrays store ordered collections of values.

## Creating Arrays

\`\`\`javascript
const fruits = ["apple", "banana", "cherry"]; // literal
const fromString = Array.from("hello"); // ["h","e","l","l","o"]
const ofExample = Array.of(1, 2, 3); // [1, 2, 3]
\`\`\`

## Accessing and Modifying

\`\`\`javascript
const colors = ["red", "green", "blue"];
console.log(colors[0]);       // "red"
console.log(colors.at(-1));   // "blue" (negative index)

colors.push("purple");  // add to end
colors.pop();           // remove from end
colors.unshift("orange"); // add to front
colors.shift();           // remove from front
\`\`\`

## The length Property

\`\`\`javascript
const arr = [1, 2, 3, 4];
console.log(arr.length); // 4
arr.length = 0;          // empty the array
console.log(arr);        // []
\`\`\`

## Checking for Arrays

\`\`\`javascript
Array.isArray([1, 2, 3]); // true
Array.isArray("hello");   // false
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod4, courseId, "Array Methods", {
      type: "theory",
      order: 2,
      estimatedMinutes: 20,
      content: `# Array Methods: Slice, Splice & More

Powerful methods for manipulating arrays.

## slice — Extract (Non-Mutating)

\`\`\`javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 3));  // [2, 3]
console.log(arr.slice(-2));    // [4, 5] (last two)
console.log(arr);              // [1, 2, 3, 4, 5] (unchanged)
\`\`\`

## splice — Add/Remove (Mutating)

\`\`\`javascript
const arr1 = [1, 2, 3, 4, 5];
arr1.splice(1, 2);           // remove 2 from index 1
console.log(arr1);            // [1, 4, 5]

arr1.splice(1, 0, 2, 3);     // insert without removing
console.log(arr1);            // [1, 2, 3, 4, 5]
\`\`\`

## concat and join

\`\`\`javascript
[1, 2].concat([3, 4]);          // [1, 2, 3, 4]
["a", "b", "c"].join(", ");     // "a, b, c"
\`\`\`

## Searching

\`\`\`javascript
["apple", "banana"].indexOf("banana"); // 1
["apple", "banana"].includes("apple"); // true
\`\`\`

## reverse, sort, fill, flat

\`\`\`javascript
[3, 1, 4].reverse();             // [4, 1, 3]
[3, 1, 4].sort((a, b) => a - b); // [1, 3, 4]
new Array(3).fill(0);            // [0, 0, 0]
[1, [2, [3]]].flat(2);          // [1, 2, 3]
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod4, courseId, "Objects", {
      type: "theory",
      order: 3,
      estimatedMinutes: 20,
      content: `# Objects: Properties & Methods

Objects store key-value pairs and are fundamental to JavaScript.

## Object Literals

\`\`\`javascript
const user = { name: "Alice", age: 30, isAdmin: false };
\`\`\`

## Accessing Properties

\`\`\`javascript
console.log(user.name);     // dot notation
const key = "age";
console.log(user[key]);     // bracket notation (dynamic)

// Computed property names
const prop = "status";
const obj = { [prop]: "active" };
\`\`\`

## Adding / Modifying / Deleting

\`\`\`javascript
user.email = "alice@example.com"; // add
user.age = 31;                    // modify
delete user.isAdmin;              // remove
console.log("name" in user);      // true (check existence)
\`\`\`

## Property Shorthand

\`\`\`javascript
const name = "Bob", age = 25;
const person = { name, age }; // { name: "Bob", age: 25 }
\`\`\`

## Object Methods

\`\`\`javascript
const calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this; // chaining
  },
  subtract(n) {
    this.value -= n;
    return this;
  }
};
calculator.add(10).subtract(3);
console.log(calculator.value); // 7
\`\`\`

## Object References

Objects are compared by reference, not value:

\`\`\`javascript
const a = { x: 1 };
const b = a;    // same reference
b.x = 2;
console.log(a.x); // 2 (changed!)

const c = { x: 1 };
console.log(a === c); // false (different references)
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod4, courseId, "Object Methods & Destructuring", {
      type: "theory",
      order: 4,
      estimatedMinutes: 15,
      content: `# Object Methods & Destructuring

Built-in methods for working with objects and the destructuring syntax.

## Object.keys, Object.values, Object.entries

\`\`\`javascript
const user = { name: "Alice", age: 30, city: "Paris" };
console.log(Object.keys(user));   // ["name", "age", "city"]
console.log(Object.values(user)); // ["Alice", 30, "Paris"]
console.log(Object.entries(user)); // [["name","Alice"],...]
\`\`\`

## Object.assign and Spread

\`\`\`javascript
const merged = { ...{ a: 1 }, ...{ b: 2 } }; // { a: 1, b: 2 }
const frozen = Object.freeze({ api: "https://example.com" });
\`\`\`

## Array Destructuring

\`\`\`javascript
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first);  // "red"

const [a, , c] = colors; // skip
const [head, ...tail] = colors; // rest pattern
const [x = 0] = [5]; // default value
\`\`\`

## Object Destructuring

\`\`\`javascript
const person = { name: "Alice", age: 30 };
const { name, age } = person;
const { name: personName } = person; // rename
const { city = "Unknown" } = person; // default

// Nested destructuring
const data = { user: { id: 1 } };
const { user: { id } } = data;
console.log(id); // 1
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod4, courseId, "Practice", {
      type: "practice",
      order: 5,
      estimatedMinutes: 20,
      codeTemplate: `// Write a function that takes an array of numbers and returns
// a new array with only unique values (no duplicates),
// sorted in ascending order.

function uniqueSorted(numbers) {
  // Your code here
}

console.log(uniqueSorted([3, 1, 2, 3, 4, 1, 5])); // [1, 2, 3, 4, 5]`,
      solution: `function uniqueSorted(numbers) {
  return [...new Set(numbers)].sort((a, b) => a - b);
}`,
      testCases: [
        { input: "[3, 1, 2, 3, 4, 1, 5]", expectedOutput: "[1,2,3,4,5]", isHidden: false },
        { input: "[7, 7, 7, 7]", expectedOutput: "[7]", isHidden: false },
        { input: "[5, 4, 3, 2, 1]", expectedOutput: "[1,2,3,4,5]", isHidden: false },
        { input: "[1, 2, 3, 4, 5, 1, 2, 3, 4, 5]", expectedOutput: "[1,2,3,4,5]", isHidden: true },
      ],
      content: `# Map, Set & Data Practice

Use \`Set\` to remove duplicates, then sort. Implement \`uniqueSorted(numbers)\`.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 5: Strings & Template Literals
  // -----------------------------------------------------------------------
  const mod5 = await upsertModuleByTitle(ctx, courseId, "Strings & Template Literals", {
    description: "Master string manipulation and regular expressions",
    order: 5,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod5, courseId, "String Methods", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# String Methods & Properties

Strings represent text. They come with many built-in methods.

## Properties and Access

\`\`\`javascript
const msg = "Hello, World!";
console.log(msg.length);   // 13
console.log(msg[0]);       // "H"
console.log(msg.at(-1));   // "!" (negative indexing)
\`\`\`

## Checking Content

\`\`\`javascript
const str = "JavaScript is awesome";
console.log(str.includes("Script"));   // true
console.log(str.startsWith("Java"));   // true
console.log(str.endsWith("awesome"));  // true
console.log(str.indexOf("is"));        // 11
\`\`\`

## Extracting Parts

\`\`\`javascript
const text = "The quick brown fox";
console.log(text.slice(4, 9));   // "quick"
console.log(text.slice(-3));     // "fox"
\`\`\`

## Transforming

\`\`\`javascript
console.log("  Hello  ".trim());          // "Hello"
console.log("hello".toUpperCase());       // "HELLO"
console.log("I love cats".replace("cats", "dogs")); // "I love dogs"
console.log("apple,banana".split(","));   // ["apple", "banana"]
\`\`\`

## Padding

\`\`\`javascript
console.log("5".padStart(3, "0")); // "005"
console.log("5".padEnd(3, "0"));   // "500"
\`\`\`

## Template Literals

\`\`\`javascript
const name = "Alice", age = 30;
console.log(\`Hello, \\\${name}! You are \\\${age}.\`);
\`\`\`

Template literals support interpolation (\`\\\\\${}\`) and multi-line strings.`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod5, courseId, "Regex", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# Regular Expressions Basics

Regular expressions (regex) are patterns for matching text.

## Creating a Regex

\`\`\`javascript
const pattern1 = /hello/gi;     // literal (g=global, i=case-insensitive)
const pattern2 = new RegExp("hello", "gi"); // constructor
\`\`\`

## Testing and Matching

\`\`\`javascript
const text = "Hello, World!";
console.log(/hello/i.test(text));          // true
console.log(text.match(/[a-z]+/gi));       // ["Hello", "World"]
console.log(text.search(/world/i));        // 7
\`\`\`

## Character Sets and Quantifiers

\`\`\`javascript
console.log(/[cbr]at/.test("cat"));   // true (c, b, or r followed by "at")
console.log(/\^[A-Z]/.test("Hi"));    // true (starts with uppercase)
console.log(/\\\\d{3}/.test("123"));   // true (exactly 3 digits)
console.log(/colou?r/.test("color")); // true ("u" is optional)
\`\`\`

## Common Patterns

| Pattern | Matches |
|---------|---------|
| \`\\\\d\` | Any digit |
| \`\\\\w\` | Word character (letter, digit, underscore) |
| \`\\\\s\` | Whitespace |
| \`.\` | Any character except newline |
| \`^\` | Start of string |
| \`\\\$\` | End of string |

\`\`\`javascript
const email = "user@example.com";
console.log(/^\\\\S+@\\\\S+\\\\.\\\\S+$/.test(email)); // true

// Replace using regex
console.log("cat hat".replace(/[ch]at/g, "dog")); // "dog dog"
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod5, courseId, "Practice", {
      type: "practice",
      order: 3,
      estimatedMinutes: 15,
      codeTemplate: `// Write a function that checks if a string is a palindrome.
// A palindrome reads the same forwards and backwards.
// Ignore case, spaces, and punctuation.
// Example: "A man, a plan, a canal: Panama" => true

function isPalindrome(str) {
  // Your code here
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false`,
      solution: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}`,
      testCases: [
        { input: "racecar", expectedOutput: "true", isHidden: false },
        { input: "hello", expectedOutput: "false", isHidden: false },
        { input: "A man, a plan, a canal: Panama", expectedOutput: "true", isHidden: false },
        { input: "Was it a car or a cat I saw", expectedOutput: "true", isHidden: true },
        { input: "not a palindrome", expectedOutput: "false", isHidden: true },
      ],
      content: `# String Manipulation Practice

Implement \`isPalindrome(str)\` that checks if a string reads the same forwards and backwards. Use string methods and regex.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 6: DOM Manipulation
  // -----------------------------------------------------------------------
  const mod6 = await upsertModuleByTitle(ctx, courseId, "DOM Manipulation", {
    description: "Interact with and modify the HTML document using JavaScript",
    order: 6,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod6, courseId, "Understanding DOM", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# Understanding the DOM

The Document Object Model (DOM) is JavaScript's representation of an HTML page.

## What is the DOM?

When the browser loads HTML, it creates a tree of nodes that JavaScript can access and manipulate.

## The document Object

\`\`\`javascript
console.log(document);              // The entire document
console.log(document.title);        // The page title
console.log(document.body);         // The <body> element
console.log(document.head);         // The <head> element
\`\`\`

## Node Types

| Type | Example |
|------|---------|
| Element node | \`<div>\`, \`<p>\` |
| Text node | Text inside elements |
| Comment node | \`<!-- comment -->\` |

## innerHTML vs textContent

\`\`\`javascript
div.textContent = "<b>Hello</b>"; // Shows literal text (safe)
div.innerHTML = "<b>Hello</b>";   // Renders HTML (use with caution!)
\`\`\`

**Security:** Never use \`innerHTML\` with user-provided data (XSS risk).`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod6, courseId, "Selecting/Creating", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# Selecting & Creating Elements

## Selecting Elements

\`\`\`javascript
// Single element
const header = document.querySelector("h1");
const byId = document.getElementById("main");

// Multiple elements
const allParas = document.querySelectorAll("p");
const buttons = document.getElementsByClassName("btn");
\`\`\`

## Creating Elements

\`\`\`javascript
const div = document.createElement("div");
const img = document.createElement("img");
const text = document.createTextNode("Hello!");

div.textContent = "New div";
img.src = "photo.jpg";
\`\`\`

## Inserting and Removing

\`\`\`javascript
const container = document.querySelector("#container");
container.appendChild(div);          // add as last child
container.prepend(div);              // add as first child
container.insertBefore(div, ref);    // add before reference
el.remove();                         // remove element
\`\`\`

## Traversing

\`\`\`javascript
el.parentElement;         // parent
el.children;              // child elements
el.firstElementChild;     // first child
el.nextElementSibling;    // next sibling
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod6, courseId, "Styles & Attributes", {
      type: "theory",
      order: 3,
      estimatedMinutes: 15,
      content: `# Modifying Styles & Attributes

## Working with classList

\`\`\`javascript
const el = document.querySelector(".box");
el.classList.add("active");         // add
el.classList.remove("hidden");      // remove
el.classList.toggle("visible");     // toggle
el.classList.contains("active");    // check (boolean)
\`\`\`

## Inline Styles

\`\`\`javascript
el.style.color = "red";
el.style.backgroundColor = "#333"; // camelCase
el.style.fontSize = "16px";
const styles = getComputedStyle(el); // read computed styles
\`\`\`

## Attributes

\`\`\`javascript
img.getAttribute("src");           // get
img.setAttribute("src", "new.jpg"); // set
img.hasAttribute("alt");           // check
img.removeAttribute("disabled");   // remove
\`\`\`

## Dataset

\`\`\`javascript
// HTML: <div data-user-id="42">
div.dataset.userId; // "42" (camelCase from kebab-case)
\`\`\`

## getBoundingClientRect

\`\`\`javascript
const rect = el.getBoundingClientRect();
// { top, right, bottom, left, width, height }
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod6, courseId, "Practice", {
      type: "practice",
      order: 4,
      estimatedMinutes: 20,
      codeTemplate: `// Write a function that creates a dynamic list from an array of strings.
// Create a <ul> element, add each string as an <li>,
// and append the list to the element with id "app".

function createList(items) {
  // Your code here
}

createList(["Apple", "Banana", "Cherry"]);`,
      solution: `function createList(items) {
  const ul = document.createElement("ul");
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  document.getElementById("app").appendChild(ul);
}`,
      testCases: [
        { input: '["Apple", "Banana", "Cherry"]', expectedOutput: "<ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>", isHidden: false },
        { input: '["One"]', expectedOutput: "<ul><li>One</li></ul>", isHidden: true },
      ],
      content: `# Building a Dynamic UI Practice

Use DOM manipulation methods to build a list. Implement \`createList(items)\` that generates a \`<ul>\` and appends it to \`#app\`.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 7: Events & User Interaction
  // -----------------------------------------------------------------------
  const mod7 = await upsertModuleByTitle(ctx, courseId, "Events & User Interaction", {
    description: "Make pages interactive with event listeners and handlers",
    order: 7,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod7, courseId, "Event Listeners", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# Event Listeners & Handlers

Events are actions in the browser — clicks, keypresses, mouse movements.

## addEventListener

\`\`\`javascript
const button = document.querySelector("button");
button.addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log(event); // The event object
});
\`\`\`

## The Event Object

\`\`\`javascript
element.addEventListener("click", (e) => {
  console.log(e.target);       // Element that triggered the event
  console.log(e.clientX);      // Mouse X position
  console.log(e.clientY);      // Mouse Y position
});
\`\`\`

## Mouse Events

\`\`\`javascript
element.addEventListener("dblclick", handler);
element.addEventListener("mouseenter", handler);
element.addEventListener("mouseleave", handler);
element.addEventListener("mousemove", handler);
\`\`\`

## Keyboard Events

\`\`\`javascript
document.addEventListener("keydown", (e) => {
  console.log(e.key);      // "Enter", "a", "ArrowUp"
  console.log(e.ctrlKey);  // true if Ctrl held
});
\`\`\`

## Focus and Window Events

\`\`\`javascript
input.addEventListener("focus", () => { /* ... */ });
input.addEventListener("blur", () => { /* ... */ });
window.addEventListener("resize", () => { /* ... */ });
window.addEventListener("scroll", () => { /* ... */ });
\`\`\`

## Removing Listeners

\`\`\`javascript
function handler() { console.log("Clicked"); }
element.addEventListener("click", handler);
element.removeEventListener("click", handler); // same reference needed
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod7, courseId, "Propagation & Delegation", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# Event Propagation & Delegation

## Event Phases

When an event fires, it travels through the DOM in three phases:

1. **Capture** — from \`document\` down to the target
2. **Target** — reaches the element that triggered it
3. **Bubble** — from the target back up to \`document\`

\`\`\`javascript
// Listen during capture phase
parent.addEventListener("click", () => {}, { capture: true });

// Default: listens during bubble phase
parent.addEventListener("click", () => {});
\`\`\`

## stopPropagation

\`\`\`javascript
child.addEventListener("click", (e) => {
  e.stopPropagation(); // parent won't hear this click
});
\`\`\`

## Event Delegation

Attach one listener to a parent instead of many to children:

\`\`\`javascript
// Instead of attaching to each <li>:
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Item:", e.target.textContent);
  }
});
\`\`\`

Benefits: works for dynamically added elements, uses less memory.

## preventDefault

\`\`\`javascript
document.querySelector("a").addEventListener("click", (e) => {
  e.preventDefault(); // Don't follow the link
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Handle with JS instead
});
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod7, courseId, "Forms & Validation", {
      type: "theory",
      order: 3,
      estimatedMinutes: 15,
      content: `# Form Events & Validation

## Form Events

\`\`\`javascript
const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
});

input.addEventListener("input", (e) => {
  console.log(e.target.value); // fires on every change
});

input.addEventListener("change", (e) => {
  console.log("Committed:", e.target.value); // fires on blur/enter
});

input.addEventListener("focus", () => { /* ... */ });
input.addEventListener("blur", () => { /* ... */ });
\`\`\`

## HTML5 Validation

\`\`\`html
<input type="email" required minlength="3" />
\`\`\`

\`\`\`javascript
input.addEventListener("blur", () => {
  console.log(input.validity.valid);     // boolean
  console.log(input.validationMessage);  // error message
});
\`\`\`

## Custom Validation

\`\`\`javascript
emailInput.addEventListener("input", () => {
  if (!emailInput.value.includes("@")) {
    emailInput.setCustomValidity("Enter a valid email");
  } else {
    emailInput.setCustomValidity(""); // clear error
  }
});
\`\`\`

## Debounce Pattern

\`\`\`javascript
function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

searchInput.addEventListener("input", debounce((e) => {
  // API call here — runs 300ms after last keystroke
}, 500));
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod7, courseId, "Practice", {
      type: "practice",
      order: 4,
      estimatedMinutes: 20,
      codeTemplate: `// Write a function that adds a click counter to a button.
// Each click increments the count displayed inside the button.
// The function takes a selector string for the button element.

function setupCounter(selector) {
  // Your code here
}

setupCounter("#counter-btn");`,
      solution: `function setupCounter(selector) {
  const button = document.querySelector(selector);
  let count = 0;
  button.textContent = "Count: 0";
  button.addEventListener("click", () => {
    count++;
    button.textContent = "Count: " + count;
  });
}`,
      testCases: [
        { input: "#counter-btn", expectedOutput: "Count: 0", isHidden: false },
        { input: "#counter-btn", expectedOutput: "Count: 1", isHidden: true },
      ],
      content: `# Interactive Components Practice

Create a click counter using DOM events. Implement \`setupCounter(selector)\` that initializes and handles click events.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 8: Modern JavaScript ES6+
  // -----------------------------------------------------------------------
  const mod8 = await upsertModuleByTitle(ctx, courseId, "Modern JS ES6+", {
    description: "Explore modern syntax and features from ES6 through ES2023",
    order: 8,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod8, courseId, "let/const/Scoping", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# let, const & Block Scoping

ES6 introduced \`let\` and \`const\` as improvements over \`var\`.

## var vs let vs const

\`\`\`javascript
// var — function-scoped, leaks out of blocks
if (true) { var x = 10; }
console.log(x); // 10 (leaks!)

// let — block-scoped
if (true) { let y = 10; }
// console.log(y); // ReferenceError

// const — block-scoped, cannot be reassigned
const z = 10;
// z = 20; // TypeError
\`\`\`

## Key Differences

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | TDZ | TDZ |
| Reassign | Yes | Yes | No |
| Redeclare | Yes | No | No |

## When to Use

\`\`\`javascript
// const by default
const maxRetries = 3;
// let when you need to reassign
let currentAttempt = 0;
// var — avoid in modern code
\`\`\`

## Closure Trick with let

\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // 0, 1, 2
}
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod8, courseId, "Destructuring & Spread", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# Destructuring & Spread

Destructuring unpacks values into variables. Spread expands iterables.

## Array Destructuring

\`\`\`javascript
const rgb = [255, 128, 64];
const [red, green, blue] = rgb;
console.log(red); // 255

// Skip, rest, defaults, swap
const [first, , third] = rgb;
const [head, ...tail] = [1, 2, 3, 4];
const [x = 0] = [];
let a = 1, b = 2; [a, b] = [b, a]; // swap
\`\`\`

## Object Destructuring

\`\`\`javascript
const user = { id: 1, name: "Alice", age: 30 };
const { name, age } = user;
const { name: userName } = user;       // rename
const { city = "Unknown" } = user;     // default

// Nested
const response = { data: { items: [1, 2, 3] } };
const { data: { items } } = response;

// Function parameters
function greet({ name, age }) {
  console.log(\`\\\${name} is \\\${age}\`);
}
\`\`\`

## Spread Syntax

\`\`\`javascript
const merged = [...[1, 2], ...[3, 4]];  // [1, 2, 3, 4]
const copy = [...arr];                   // shallow copy
const obj = { ...defaults, ...overrides }; // object spread
Math.max(...[3, 1, 4]);                 // 4 (pass array as args)
\`\`\`

## Rest Parameters

\`\`\`javascript
function sum(...args) {
  return args.reduce((t, n) => t + n, 0);
}
console.log(sum(1, 2, 3)); // 6
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod8, courseId, "Optional Chaining/Modules", {
      type: "theory",
      order: 3,
      estimatedMinutes: 20,
      content: `# Optional Chaining, Modules & Modern Features

## Optional Chaining (?.)

\`\`\`javascript
const user = {}; // address not defined
console.log(user.address?.city); // undefined (no error!)
console.log(user.sayHello?.());  // undefined (method missing)
\`\`\`

## Nullish Coalescing (??)

\`\`\`javascript
const value = null;
console.log(value ?? "default");  // "default"
console.log(0 ?? 10);             // 0 (not null/undefined)
console.log(0 || 10);             // 10 (0 is falsy)
\`\`\`

## Logical Assignment

\`\`\`javascript
let a = "";  a ||= "default";  // "default"
let b = 42;  b &&= 0;           // 0
let c = null; c ??= "value";    // "value"
\`\`\`

## ES Modules

\`\`\`javascript
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calc {}

// app.js
import Calc, { PI, add } from "./math.js";
import * as Utils from "./math.js";
\`\`\`

## ES2017–ES2023 Highlights

| Year | Features |
|------|----------|
| ES2017 | async/await, Object.values/entries |
| ES2018 | Rest/spread for objects, Promise.finally |
| ES2019 | Array.flat, Array.flatMap |
| ES2020 | ?. (optional chaining), ?? (nullish coalescing) |
| ES2021 | Logical assignment (||=, &&=, ??=) |
| ES2022 | .at(), Object.hasOwn, class fields |
| ES2023 | findLast, toSorted (non-mutating) |

\`\`\`javascript
// ES2023
[3, 1, 4].findLast(n => n > 2);    // 4
[3, 1, 4].toSorted();               // [1, 3, 4] (new array)
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod8, courseId, "Practice", {
      type: "practice",
      order: 4,
      estimatedMinutes: 20,
      codeTemplate: `// Write a function that takes a user object and returns
// a formatted string. Use destructuring, optional chaining,
// and template literals.
//
// The user may have: name, age, address (with city),
// preferences (with theme). Provide defaults for missing data.

function formatUser(user) {
  // Your code here
}

console.log(formatUser({
  name: "Alice",
  age: 30,
  address: { city: "London" },
  preferences: { theme: "dark" }
}));`,
      solution: `function formatUser(user) {
  const {
    name = "Unknown",
    age = "?",
    address: { city } = {},
    preferences: { theme = "light" } = {}
  } = user ?? {};

  return \`\\\${name} (\\\${age}) lives in \\\${city ?? "Unknown"} — Theme: \\\${theme}\`;
}`,
      testCases: [
        { input: '{name:"Alice",age:30,address:{city:"London"},preferences:{theme:"dark"}}', expectedOutput: "Alice (30) lives in London — Theme: dark", isHidden: false },
        { input: '{}', expectedOutput: "Unknown (?) lives in Unknown — Theme: light", isHidden: false },
        { input: '{name:"Bob",address:{city:"Paris"}}', expectedOutput: "Bob (?) lives in Paris — Theme: light", isHidden: true },
      ],
      content: `# Modern JavaScript Practice

Use destructuring, optional chaining, and template literals. Implement \`formatUser(user)\` with safe defaults.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 9: Asynchronous JavaScript
  // -----------------------------------------------------------------------
  const mod9 = await upsertModuleByTitle(ctx, courseId, "Asynchronous JavaScript", {
    description: "Master async programming with promises and async/await",
    order: 9,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod9, courseId, "Sync vs Async", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# Synchronous vs Asynchronous

JavaScript runs on a single thread but handles async operations through the event loop.

## Synchronous Code

\`\`\`javascript
console.log("First");
console.log("Second");
console.log("Third");
// First, Second, Third
\`\`\`

## The Problem: Blocking

\`\`\`javascript
const start = Date.now();
while (Date.now() - start < 3000) {
  // Blocks everything for 3 seconds!
}
console.log("After 3 seconds");
\`\`\`

## The Event Loop

1. **Call stack** — functions execute here (LIFO)
2. **Web APIs** — browser APIs (setTimeout, fetch, DOM events)
3. **Task queue** — callbacks ready to execute
4. **Microtask queue** — higher priority (Promise.then)

\`\`\`javascript
console.log("1"); // call stack

setTimeout(() => {
  console.log("2"); // task queue
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // microtask queue
});

console.log("4"); // call stack

// Output: 1, 4, 3, 2
\`\`\`

## Event Loop Cycle

1. Execute call stack
2. Process all microtasks
3. Take one task from task queue
4. Repeat`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod9, courseId, "Callbacks to Promises", {
      type: "theory",
      order: 2,
      estimatedMinutes: 20,
      content: `# Callbacks to Promises

Async JavaScript evolved from callbacks to promises.

## Callback Pattern

\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((result) => console.log(result));
\`\`\`

## Callback Hell

\`\`\`javascript
getUser(id, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      // Callback hell!
    });
  });
});
\`\`\`

## Creating a Promise

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Done!");
  else reject(new Error("Failed"));
});
\`\`\`

## Consuming a Promise

\`\`\`javascript
promise
  .then((result) => {
    console.log(result);
    return "Next step";
  })
  .then(console.log)
  .catch((error) => console.error(error))
  .finally(() => console.log("Always runs"));
\`\`\`

## Promise Static Methods

\`\`\`javascript
// All must resolve
Promise.all([fetchA(), fetchB()])
  .then(([a, b]) => console.log(a, b));

// First to settle wins
Promise.race([fetchA(), fetchB()]);

// All settle (resolve or reject)
Promise.allSettled([fetchA(), fetchB()]);

// First to fulfill
Promise.any([fetchA(), fetchB()]);
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod9, courseId, "Async/Await", {
      type: "theory",
      order: 3,
      estimatedMinutes: 15,
      content: `# Async/Await

Async/await makes asynchronous code look synchronous.

## Async Functions

\`\`\`javascript
async function greet() {
  return "Hello!";
}
greet().then(console.log); // "Hello!"
\`\`\`

## Await

\`\`\`javascript
async function getUser(id) {
  const response = await fetch(\`/api/users/\\\${id}\`);
  const user = await response.json();
  return user;
}
\`\`\`

## Error Handling with try/catch

\`\`\`javascript
async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\\\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \\\${res.status}\`);
    return await res.json();
  } catch (error) {
    console.error("Failed:", error);
    return null;
  } finally {
    console.log("Attempt completed");
  }
}
\`\`\`

## Sequential vs Parallel

\`\`\`javascript
// Sequential (slower)
async function seq() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  return { user, posts };
}

// Parallel (faster)
async function par() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return { user, posts };
}
\`\`\`

## Top-Level Await (ES2022)

\`\`\`javascript
// In modules only
const data = await fetch("/api/data").then(r => r.json());
export default data;
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod9, courseId, "Fetch API", {
      type: "theory",
      order: 4,
      estimatedMinutes: 20,
      content: `# Fetch API & Working with APIs

The Fetch API is the modern way to make HTTP requests.

## Basic GET

\`\`\`javascript
fetch("https://api.example.com/users")
  .then(res => {
    if (!res.ok) throw new Error(\`HTTP \\\${res.status}\`);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
\`\`\`

## POST Request

\`\`\`javascript
async function createUser(data) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(\`HTTP \\\${res.status}\`);
  return await res.json();
}
\`\`\`

## Response Methods

\`\`\`javascript
const res = await fetch(url);
const json = await res.json();   // parse JSON
const text = await res.text();   // raw text
const blob = await res.blob();   // binary
\`\`\`

## Headers

\`\`\`javascript
fetch(url, {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token-here"
  }
});

console.log(res.headers.get("content-type"));
\`\`\`

## Error Handling with Retry

\`\`\`javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 1; i <= retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(\`HTTP \\\${res.status}\`);
      return await res.json();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, 1000 * i));
    }
  }
}
\`\`\`

## AbortController — Timeout

\`\`\`javascript
function fetchWithTimeout(url, ms = 5000) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal })
    .finally(() => clearTimeout(timeout));
}

try {
  const data = await fetchWithTimeout("/api/data");
} catch (err) {
  if (err.name === "AbortError") console.log("Timed out");
}
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod9, courseId, "Practice", {
      type: "practice",
      order: 5,
      estimatedMinutes: 20,
      codeTemplate: `// Simulate fetching user data with a promise-based delay.
// Write an async function that fetches a user object after
// a given delay in milliseconds, then returns it.

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUser(id) {
  // Simulate network delay of 500ms
  // Return: { id, name: "User " + id }
}

fetchUser(1).then(console.log);
// After ~500ms: { id: 1, name: "User 1" }`,
      solution: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUser(id) {
  await delay(500);
  return { id, name: "User " + id };
}`,
      testCases: [
        { input: "1", expectedOutput: '{id:1,name:"User 1"}', isHidden: false },
        { input: "99", expectedOutput: '{id:99,name:"User 99"}', isHidden: false },
        { input: "42", expectedOutput: '{id:42,name:"User 42"}', isHidden: true },
      ],
      content: `# Async Practice

Create an async function that simulates an API call. Implement \`fetchUser(id)\` with a 500ms delay.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 10: Object-Oriented Programming
  // -----------------------------------------------------------------------
  const mod10 = await upsertModuleByTitle(ctx, courseId, "OOP", {
    description: "Learn OOP with constructors, classes, and inheritance",
    order: 10,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod10, courseId, "Constructors & Prototypes", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# Constructor Functions & Prototypes

Before ES6 classes, JavaScript used constructor functions and prototypes.

## Constructor Functions

\`\`\`javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

const alice = new User("Alice", 30);
console.log(alice.name); // "Alice"
console.log(alice instanceof User); // true
\`\`\`

The \`new\` keyword: creates an empty object, sets \`this\`, links prototype, returns the object.

## The Prototype Chain

\`\`\`javascript
User.prototype.sayHello = function() {
  return \`Hello, I'm \\\${this.name}\`;
};

const bob = new User("Bob", 25);
console.log(bob.sayHello()); // "Hello, I'm Bob"

// Chain: bob → User.prototype → Object.prototype → null
console.log(bob.__proto__ === User.prototype); // true
\`\`\`

## Prototypal Inheritance

\`\`\`javascript
function Admin(name, age, role) {
  User.call(this, name, age);
  this.role = role;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

const admin = new Admin("Carol", 35, "superadmin");
console.log(admin.sayHello()); // inherited!
\`\`\`

## Object.create

\`\`\`javascript
const animal = {
  speak() { console.log(\`\\\${this.name} speaks\`); }
};
const dog = Object.create(animal);
dog.name = "Rex";
dog.speak(); // "Rex speaks"
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod10, courseId, "ES6 Classes", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# ES6 Classes

ES6 introduced cleaner syntax for creating objects and handling inheritance.

## Class Syntax

\`\`\`javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    return \`Hello, I'm \\\${this.name}\`;
  }

  get isAdult() {
    return this.age >= 18;
  }

  set birthYear(year) {
    this.age = new Date().getFullYear() - year;
  }
}

const alice = new User("Alice", 30);
console.log(alice.sayHello()); // "Hello, I'm Alice"
console.log(alice.isAdult);    // true
\`\`\`

## Static Members

\`\`\`javascript
class MathUtils {
  static PI = 3.14159;
  static add(a, b) { return a + b; }
}
console.log(MathUtils.PI);    // 3.14159
console.log(MathUtils.add(2, 3)); // 5
\`\`\`

## Private Fields (#)

\`\`\`javascript
class BankAccount {
  #balance = 0; // private

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  get balance() { return this.#balance; }
}

const acc = new BankAccount();
acc.deposit(1000);
console.log(acc.balance); // 1000
// console.log(acc.#balance); // SyntaxError!
\`\`\`

Classes are syntactic sugar over prototypes — the prototype chain still powers inheritance.`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod10, courseId, "Inheritance", {
      type: "theory",
      order: 3,
      estimatedMinutes: 15,
      content: `# Inheritance & extends

Inheritance lets you create a class based on an existing one.

## The extends Keyword

\`\`\`javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() { return \`Hello, I'm \\\${this.name}\`; }
}

class Admin extends User {
  constructor(name, age, role, permissions) {
    super(name, age); // must call super before using this
    this.role = role;
    this.permissions = permissions;
  }

  // Override method
  sayHello() {
    return \`\\\${super.sayHello()} (admin: \\\${this.role})\`;
  }

  hasPermission(perm) {
    return this.permissions.includes(perm);
  }
}

const admin = new Admin("Carol", 35, "admin", ["read", "write"]);
console.log(admin.sayHello()); // "Hello, I'm Carol (admin: admin)"
console.log(admin.hasPermission("write")); // true
\`\`\`

## Method Overriding and super

\`\`\`javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\\\${this.name} makes a sound\`; }
}

class Dog extends Animal {
  speak() {
    return \`\\\${super.speak()}. \\\${this.name} barks!\`;
  }
}

const rex = new Dog("Rex");
console.log(rex.speak()); // "Rex makes a sound. Rex barks!"
\`\`\`

## Composition over Inheritance

Prefer composing behavior over deep hierarchies:

\`\`\`javascript
function canFly(obj) {
  return {
    ...obj,
    fly() { return \`\\\${obj.name} is flying!\`; }
  };
}
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod10, courseId, "Practice", {
      type: "practice",
      order: 4,
      estimatedMinutes: 20,
      codeTemplate: `// Create a Library class that manages a collection of books.
// Each book has a title, author, and isAvailable status.
// Methods: addBook, borrowBook, returnBook, listAvailableBooks

class Book {
  constructor(title, author) {
    // Your code here
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author) { /* ... */ }
  borrowBook(title) { /* ... */ }
  returnBook(title) { /* ... */ }
  listAvailableBooks() { /* ... */ }
}

// Test
const lib = new Library();
lib.addBook("1984", "Orwell");
lib.addBook("Brave New World", "Huxley");
lib.borrowBook("1984");
console.log(lib.listAvailableBooks()); // ["Brave New World"]`,
      solution: `class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }
}

class Library {
  constructor() { this.books = []; }

  addBook(title, author) {
    this.books.push(new Book(title, author));
  }

  borrowBook(title) {
    const book = this.books.find(b => b.title === title);
    if (book && book.isAvailable) book.isAvailable = false;
  }

  returnBook(title) {
    const book = this.books.find(b => b.title === title);
    if (book) book.isAvailable = true;
  }

  listAvailableBooks() {
    return this.books.filter(b => b.isAvailable).map(b => b.title);
  }
}`,
      testCases: [
        { input: "add:1984,Orwell|add:Brave New World,Huxley|borrow:1984|available", expectedOutput: '["Brave New World"]', isHidden: false },
        { input: "add:A,B|add:C,D|available", expectedOutput: '["A","C"]', isHidden: true },
      ],
      content: `# OOP Practice

Build a \`Library\` class using OOP. Implement add, borrow, return, and listAvailable methods.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 11: Error Handling & Debugging
  // -----------------------------------------------------------------------
  const mod11 = await upsertModuleByTitle(ctx, courseId, "Error Handling & Debugging", {
    description: "Handle errors gracefully and debug your code effectively",
    order: 11,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod11, courseId, "Try/Catch", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# Try/Catch/Finally

Error handling prevents crashes when something goes wrong.

## Basic Try/Catch

\`\`\`javascript
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("Something went wrong:", error.message);
}
\`\`\`

## The Error Object

\`\`\`javascript
try {
  undefinedVar.name = "test";
} catch (err) {
  console.log(err.name);    // "TypeError"
  console.log(err.message); // description
  console.log(err.stack);   // stack trace
}
\`\`\`

## Finally Block

\`\`\`javascript
function processFile(path) {
  const file = openFile(path);
  try {
    return readFile(file);
  } catch (error) {
    console.error("Failed:", error);
    return null;
  } finally {
    closeFile(file); // always runs (cleanup)
  }
}
\`\`\`

## Throwing Errors

\`\`\`javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  if (typeof a !== "number") {
    throw new TypeError("Must be a number");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (err) {
  console.error(err.message); // "Division by zero"
}
\`\`\`

## Rethrowing

\`\`\`javascript
try {
  someFunction();
} catch (err) {
  // Log and rethrow
  console.error("Logged:", err);
  throw err; // let caller handle it
}
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod11, courseId, "Custom Errors", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# Custom Errors & Error Types

JavaScript provides built-in error types and lets you create custom ones.

## Built-in Error Types

| Type | When it occurs |
|------|---------------|
| \`Error\` | Generic error |
| \`TypeError\` | Wrong type (calling non-function, accessing null) |
| \`ReferenceError\` | Accessing undefined variable |
| \`SyntaxError\` | Invalid syntax |
| \`RangeError\` | Value out of range |
| \`URIError\` | Invalid URI function usage |

\`\`\`javascript
try {
  JSON.parse("{invalid}");
} catch (err) {
  console.log(err instanceof SyntaxError); // true
  console.log(err.message);
}
\`\`\`

## Custom Error Classes

\`\`\`javascript
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(statusCode, url) {
    super(\`Request to \\\${url} failed with \\\${statusCode}\`);
    this.name = "NetworkError";
    this.statusCode = statusCode;
    this.url = url;
  }
}

// Usage
try {
  const user = validateUser(input);
  if (!user.name) {
    throw new ValidationError("name", "Name is required");
  }
  await saveUser(user);
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(\`Validation: \\\${err.field} — \\\${err.message}\`);
  } else if (err instanceof NetworkError) {
    console.error(\`Network: \\\${err.statusCode}\`);
  } else {
    console.error("Unknown error:", err);
  }
}
\`\`\`

## Best Practices

- Always throw Error objects, not strings/numbers
- Use specific error types for different scenarios
- Include context (field names, status codes) in custom errors
- Handle errors at the appropriate level of your application`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod11, courseId, "DevTools Debugging", {
      type: "theory",
      order: 3,
      estimatedMinutes: 12,
      content: `# Debugging with DevTools

Browser DevTools are powerful debugging tools for JavaScript.

## Console Methods

\`\`\`javascript
console.log("Basic log");
console.error("Error message");   // red
console.warn("Warning");           // yellow
console.info("Info");              // blue icon

console.table([{name:"Alice"},{name:"Bob"}]); // table format
console.group("Group");
console.log("Inside group");
console.groupEnd();

console.time("timer");
// ... code ...
console.timeEnd("timer"); // elapsed time

console.trace(); // print stack trace
\`\`\`

## Breakpoints

In the Sources tab you can:
- Click a line number to set a breakpoint
- Right-click → "Add conditional breakpoint"
- Use \`debugger;\` in code to pause

\`\`\`javascript
function complexFn(x) {
  debugger; // pauses here when DevTools is open
  return x * 2;
}
\`\`\`

## Watch Expressions

Add expressions to the Watch panel:
- \`variableName\`
- \`typeof x === "string"\`
- \`document.querySelector("h1")\`

## Source Maps

Source maps let you debug original source code instead of bundled/transpiled code. The browser automatically maps the compiled code back to your source files.

## Performance Tab

- Record performance to analyze runtime behavior
- Identify long tasks, layout thrashing, memory leaks
- Check the Network tab for slow API requests`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 12: Advanced Concepts
  // -----------------------------------------------------------------------
  const mod12 = await upsertModuleByTitle(ctx, courseId, "Advanced Concepts", {
    description: "Deep dive into closures, this binding, and performance patterns",
    order: 12,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod12, courseId, "'this' keyword", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# The 'this' Keyword

The value of \`this\` depends on how a function is called.

## Default Binding

\`\`\`javascript
function showThis() {
  console.log(this); // global (window in browser, global in Node)
}
showThis();
\`\`\`

In strict mode, \`this\` is \`undefined\`.

## Implicit Binding

\`\`\`javascript
const user = {
  name: "Alice",
  greet() {
    console.log(\`Hello, \\\${this.name}\`);
  }
};
user.greet(); // "Hello, Alice" (this = user)
\`\`\`

## Explicit Binding: call, apply, bind

\`\`\`javascript
function greet(greeting) {
  console.log(\`\\\${greeting}, \\\${this.name}\`);
}

const user = { name: "Bob" };

greet.call(user, "Hi");     // "Hi, Bob" (args listed)
greet.apply(user, ["Hey"]); // "Hey, Bob" (args as array)

const boundGreet = greet.bind(user); // returns new function
boundGreet("Hello");         // "Hello, Bob"
\`\`\`

## Arrow Functions

Arrow functions don't have their own \`this\` — they inherit it from the surrounding scope:

\`\`\`javascript
const user = {
  name: "Alice",
  greet() {
    const inner = () => {
      console.log(\`Hello, \\\${this.name}\`);
    };
    inner(); // "Hello, Alice" (inherits from greet)
  }
};

// Regular function would lose this:
const user2 = {
  name: "Bob",
  greet() {
    const inner = function() {
      console.log(\`Hello, \\\${this.name}\`);
    };
    inner(); // "Hello, undefined" (this = global)
  }
};
\`\`\`

## this in Event Handlers

\`\`\`javascript
button.addEventListener("click", function() {
  console.log(this); // the button element
});

button.addEventListener("click", () => {
  console.log(this); // surrounding scope (not the button!)
});
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod12, courseId, "Closures", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# Closures in Practice

Closures are functions that remember their lexical scope even when executed outside it.

## Module Pattern (Data Privacy)

\`\`\`javascript
function createCounter() {
  let count = 0; // private variable

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
// console.log(counter.count); // undefined!
\`\`\`

## Factory Functions

\`\`\`javascript
function createLogger(prefix) {
  return function(message) {
    console.log(\`[\\\${prefix}] \\\${message}\`);
  };
}

const infoLog = createLogger("INFO");
const errorLog = createLogger("ERROR");

infoLog("Server started");  // [INFO] Server started
errorLog("Disk full");      // [ERROR] Disk full
\`\`\`

## Memoization with Closures

\`\`\`javascript
function memoize(fn) {
  const cache = {};
  return function(arg) {
    if (cache[arg] !== undefined) {
      console.log("Cache hit!");
      return cache[arg];
    }
    console.log("Computing...");
    cache[arg] = fn(arg);
    return cache[arg];
  };
}

const square = memoize(n => n * n);
console.log(square(5)); // Computing... 25
console.log(square(5)); // Cache hit! 25
\`\`\`

## Closures in Loops

\`\`\`javascript
// Problem with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

// Fix with closure
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 100); // 0, 1, 2
  })(i);
}

// Modern fix: use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}
\`\`\``,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod12, courseId, "Currying/Debouncing", {
      type: "theory",
      order: 3,
      estimatedMinutes: 20,
      content: `# Currying, Debouncing & Throttling

Advanced function patterns for real-world applications.

## Currying

Transforms a function with multiple arguments into a chain of functions each taking one argument:

\`\`\`javascript
// Normal function
function add(a, b, c) { return a + b + c; }

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function currying
const add2 = a => b => c => a + b + c;
console.log(add2(1)(2)(3)); // 6

// Partial application
const addFive = curriedAdd(5);
const addFiveAndThree = addFive(3);
console.log(addFiveAndThree(2)); // 10
\`\`\`

## Debouncing

Limits how often a function runs — waits for a pause before executing:

\`\`\`javascript
function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Use: search input (wait until user stops typing)
const handleSearch = debounce((query) => {
  fetch(\`/api/search?q=\\\${query}\`);
}, 500);

searchInput.addEventListener("input", (e) => {
  handleSearch(e.target.value);
});
\`\`\`

## Throttling

Limits how often a function runs — at most once every N milliseconds:

\`\`\`javascript
function throttle(fn, limit = 100) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

// Use: scroll/resize handlers
const handleScroll = throttle(() => {
  console.log(\`Scrolled: \\\${window.scrollY}\`);
}, 200);

window.addEventListener("scroll", handleScroll);
\`\`\`

## Debounce vs Throttle

| Pattern | Behavior | Use Case |
|---------|----------|----------|
| Debounce | Runs after a pause | Search input, form validation |
| Throttle | Runs at intervals | Scroll, resize, drag events |`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod12, courseId, "Practice", {
      type: "practice",
      order: 4,
      estimatedMinutes: 20,
      codeTemplate: `// Write a debounce function that delays calling the callback
// until after a specified delay has passed since the last call.
// Then use it to create a logger that only logs after 300ms
// of inactivity.

function debounce(fn, delay) {
  // Your code here
}

// Create a debounced logger
const log = debounce((message) => {
  console.log(message);
}, 300);

// Test: rapid calls should only log once after 300ms
log("First");
log("Second");
log("Third");
// Expected: only "Third" is logged after 300ms`,
      solution: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const log = debounce((message) => {
  console.log(message);
}, 300);

log("First");
log("Second");
log("Third");`,
      testCases: [
        { input: "rapid three calls", expectedOutput: "Third", isHidden: false },
        { input: "single call", expectedOutput: "Single", isHidden: true },
      ],
      content: `# Advanced Practice

Implement a \`debounce\` function. Repeated calls within the delay should reset the timer — only the last call executes.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 13: Browser APIs & Storage
  // -----------------------------------------------------------------------
  const mod13 = await upsertModuleByTitle(ctx, courseId, "Browser APIs & Storage", {
    description: "Use browser storage and built-in APIs in your applications",
    order: 13,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod13, courseId, "localStorage", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# localStorage & SessionStorage

Web Storage provides key-value data storage in the browser.

## localStorage

Persists even after the browser is closed:

\`\`\`javascript
// Save
localStorage.setItem("theme", "dark");
localStorage.setItem("user", JSON.stringify({ id: 1, name: "Alice" }));

// Read
const theme = localStorage.getItem("theme"); // "dark"
const user = JSON.parse(localStorage.getItem("user")); // { id: 1, name: "Alice" }

// Remove
localStorage.removeItem("theme");

// Clear all
localStorage.clear();

// Get count of items
console.log(localStorage.length);
\`\`\`

## SessionStorage

Cleared when the tab/browser is closed:

\`\`\`javascript
// Same API as localStorage
sessionStorage.setItem("sessionData", "value");
const data = sessionStorage.getItem("sessionData");
sessionStorage.removeItem("sessionData");
sessionStorage.clear();
\`\`\`

## Difference Table

| Feature | localStorage | sessionStorage |
|---------|-------------|----------------|
| Persists after closing | Yes | No |
| Scoped to origin | Yes | Yes |
| Scoped to tab | No | Yes |
| Size limit | ~5-10MB | ~5-10MB |
| Survives page reloads | Yes | Yes |

## Storage Events

Listen for changes across tabs:

\`\`\`javascript
window.addEventListener("storage", (e) => {
  console.log(\`\\\${e.key} changed from \\\${e.oldValue} to \\\${e.newValue}\`);
  console.log("Origin:", e.url);
});

// Note: only fires in other tabs, not the one making the change
\`\`\`

## Best Practices

- Always use \`JSON.stringify\` / \`JSON.parse\` for objects
- Check for storage availability (private browsing may block it)
- Never store sensitive data (passwords, tokens)
- Handle quota exceeded errors with try/catch`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod13, courseId, "Browser APIs", {
      type: "theory",
      order: 2,
      estimatedMinutes: 15,
      content: `# Browser APIs Overview

Browsers provide many built-in APIs beyond the DOM.

## Geolocation API

\`\`\`javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Lat:", position.coords.latitude);
    console.log("Lng:", position.coords.longitude);
    console.log("Accuracy:", position.coords.accuracy);
  },
  (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied location");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location unavailable");
        break;
      case error.TIMEOUT:
        console.log("Request timed out");
        break;
    }
  },
  { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
);

// Watch position changes
const watchId = navigator.geolocation.watchPosition(console.log);
navigator.geolocation.clearWatch(watchId); // Stop watching
\`\`\`

## Canvas API

\`\`\`javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Draw a red rectangle
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 50);

// Draw a circle
ctx.beginPath();
ctx.arc(150, 100, 40, 0, Math.PI * 2);
ctx.fillStyle = "blue";
ctx.fill();

// Draw text
ctx.font = "20px Arial";
ctx.fillStyle = "black";
ctx.fillText("Hello Canvas", 10, 200);
\`\`\`

## Timers

\`\`\`javascript
// setTimeout — run once after delay
const timeout = setTimeout(() => {
  console.log("One second later");
}, 1000);
clearTimeout(timeout); // cancel

// setInterval — run repeatedly
const interval = setInterval(() => {
  console.log("Every second");
}, 1000);
clearInterval(interval); // stop

// requestAnimationFrame — sync with display refresh
function animate() {
  // Update animation state
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
\`\`\`

## Other Useful APIs

- \`navigator.clipboard\` — read/write clipboard
- \`navigator.mediaDevices\` — camera/microphone access
- \`Notification API\` — desktop notifications
- \`IntersectionObserver\` — detect element visibility
- \`ResizeObserver\` — detect element size changes`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod13, courseId, "Practice", {
      type: "practice",
      order: 3,
      estimatedMinutes: 20,
      codeTemplate: `// Write a function that saves a JSON-serializable value
// to localStorage with a given key. Then write a function
// that reads and parses it back. Handle invalid JSON.

function saveToStorage(key, value) {
  // Your code here
}

function loadFromStorage(key, defaultValue = null) {
  // Your code here
}

// Test
saveToStorage("user", { name: "Alice", age: 30 });
console.log(loadFromStorage("user"));
console.log(loadFromStorage("nonexistent", "fallback"));`,
      solution: `function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Save failed:", e);
  }
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error("Load failed:", e);
    return defaultValue;
  }
}`,
      testCases: [
        { input: "user,{name:'Alice',age:30}", expectedOutput: '{"name":"Alice","age":30}', isHidden: false },
        { input: "missing,null", expectedOutput: "null", isHidden: true },
      ],
      content: `# Browser API Practice

Implement storage helper functions. \`saveToStorage(key, value)\` serializes and saves. \`loadFromStorage(key, default)\` loads and parses.`,
    })
  );

  // -----------------------------------------------------------------------
  // Module 14: Capstone & Next Steps
  // -----------------------------------------------------------------------
  const mod14 = await upsertModuleByTitle(ctx, courseId, "Capstone & Next Steps", {
    description: "Plan a project and explore what to learn next",
    order: 14,
  });

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod14, courseId, "Project Planning", {
      type: "theory",
      order: 1,
      estimatedMinutes: 15,
      content: `# Planning a JavaScript Project

Before writing code, plan your project to avoid common pitfalls.

## 1. Define Your Goal

Ask yourself:
- What problem does this project solve?
- Who is the target user?
- What are the core features (MVP)?

## 2. Choose Your Tools

- **Vanilla JS**: Simple pages, learning projects
- **React / Vue / Svelte**: Complex UIs with dynamic data
- **Node.js**: Server-side applications
- **TypeScript**: Type safety for larger projects

## 3. Plan Your Architecture

\`\`\`javascript
// Example: Todo App structure
// Features:
// - Add, edit, delete todos
// - Mark as complete
// - Filter (all, active, completed)
// - Save to localStorage

const todoApp = {
  state: {
    todos: [],
    filter: "all"
  },

  init() {
    this.loadState();
    this.render();
    this.bindEvents();
  },

  addTodo(text) { /* ... */ },
  toggleTodo(id) { /* ... */ },
  deleteTodo(id) { /* ... */ },
  render() { /* ... */ },
  saveState() { /* ... */ },
  loadState() { /* ... */ },
  bindEvents() { /* ... */ }
};

todoApp.init();
\`\`\`

## 4. Break Into Tasks

1. Set up project structure (HTML, CSS, JS files)
2. Implement data model and state management
3. Build the rendering logic
4. Add user interactions (events)
5. Add persistence (localStorage)
6. Polish UI and handle edge cases

## 5. Project Ideas

| Level | Project | Concepts |
|-------|---------|----------|
| Beginner | Todo App | DOM, events, localStorage |
| Intermediate | Weather Dashboard | Fetch API, async/await, APIs |
| Intermediate | Quiz App | State management, timers |
| Advanced | Real-time Chat | WebSockets, auth, databases |
| Advanced | Kanban Board | Drag and drop, complex state |

## 6. Development Workflow

1. **Plan** — outline features and architecture
2. **Build incrementally** — one feature at a time
3. **Test** — manually test each feature
4. **Refactor** — clean up code after it works
5. **Deploy** — share with the world (GitHub Pages, Netlify, Vercel)`,
    })
  );

  lessonIds.push(
    await upsertLessonByTitle(ctx, mod14, courseId, "Next Steps", {
      type: "theory",
      order: 2,
      estimatedMinutes: 12,
      content: `# Next Steps: TypeScript, React, Node.js

You've learned JavaScript fundamentals. Here's where to go next.

## TypeScript

TypeScript adds static types to JavaScript. It catches errors at compile time.

\`\`\`typescript
// JavaScript
function add(a, b) { return a + b; }
add("5", 3); // "53" — no error!

// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
// add("5", 3); // Type error at compile time!
\`\`\`

Benefits: better tooling, self-documenting code, fewer runtime errors.

## React

React is the most popular frontend library for building user interfaces.

\`\`\`jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

Core concepts: components, props, state, hooks.

## Node.js

Node.js lets you run JavaScript on the server side.

\`\`\`javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from Node!" }));
});

server.listen(3000);
\`\`\`

## Learning Roadmap

\`\`\`
1. JavaScript Fundamentals   ← You are here
2. TypeScript                ← Type safety
3. React or Vue              ← Frontend frameworks
4. Node.js + Express         ← Backend development
5. Databases (SQL / MongoDB) ← Data persistence
6. Full-Stack Projects       ← Build complete apps
\`\`\`

## Recommended Resources

- **MDN Web Docs** — The definitive JavaScript reference
- **JavaScript.info** — Comprehensive tutorials
- **Node.js Documentation** — Official Node docs
- **React Documentation** — Official React docs (great tutorials)
- **TypeScript Handbook** — Learn TypeScript from scratch

## Final Challenge

Build something! The best way to learn is by building projects. Start small, finish it, then start something bigger.

**Congratulations on completing JavaScript Fundamentals!**`,
    })
  );

  await applyEnhancementsToCourse(ctx, "javascript-fundamentals");
  return lessonIds;
}


