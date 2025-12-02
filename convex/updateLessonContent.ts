import { mutation } from "./_generated/server";

export const updateContent = mutation({
  args: {},
  handler: async (ctx) => {
    const updates = [
      // PYTHON UPDATES
      {
        courseSlug: "python-fundamentals",
        lessonTitle: "What is Python?",
        content: `# What is Python?

Python is a high-level, interpreted programming language known for its simplicity and readability. It was created by Guido van Rossum and first released in 1991.

## Why Python?

Python's design philosophy emphasizes code readability with its use of significant indentation. Its language constructs as well as its object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.

### Key Features:
- **Easy to Learn**: Python has a simple syntax similar to the English language.
- **Interpreted**: Python is processed at runtime by the interpreter. You do not need to compile your program before executing it.
- **Interactive**: You can sit at a Python prompt and interact with the interpreter directly to write your programs.
- **Object-Oriented**: Python supports Object-Oriented style or technique of programming that encapsulates code within objects.
- **Extensible**: You can add low-level modules to the Python interpreter. These modules enable programmers to add to or customize their tools to be more efficient.
- **Databases**: Python provides interfaces to all major commercial databases.
- **GUI Programming**: Python supports GUI applications that can be created and ported to many system calls, libraries, and windows systems, such as Windows MFC, Macintosh, and the X Window system of Unix.
- **Scalable**: Python provides a better structure and support for large programs than shell scripting.

## The Zen of Python

Python has a philosophy, often called "The Zen of Python", which includes axioms such as:
- Beautiful is better than ugly.
- Explicit is better than implicit.
- Simple is better than complex.
- Complex is better than complicated.
- Readability counts.

## Where is Python Used?

1. **Web Development**: Frameworks like Django and Flask allow for rapid development of secure and maintainable websites.
2. **Data Science & Visualization**: Libraries like Pandas, NumPy, and Matplotlib make Python the go-to language for data analysis.
3. **Machine Learning & AI**: TensorFlow, PyTorch, and Scikit-learn are standard tools for building intelligent systems.
4. **Automation & Scripting**: Python is perfect for automating repetitive tasks, file manipulation, and system administration.
5. **Game Development**: Libraries like Pygame allow for the creation of 2D games.

## Running Python

Python code is stored in text files with the \`.py\` extension. 

\`\`\`python
print("Hello, World!")
\`\`\`

When you run this code, the Python interpreter reads the file and executes the instructions line by line.`
      },
      {
        courseSlug: "python-fundamentals",
        lessonTitle: "Variables",
        content: `# Variables and Data Types

## Variables

A variable is a name that refers to a value. You can think of a variable as a labeled box where you store data.

To create a variable, you just assign it a value using the \`=\` operator.

\`\`\`python
message = "And now for something completely different"
n = 17
pi = 3.141592653589793
\`\`\`

This example creates three variables:
- \`message\` holds a string.
- \`n\` holds an integer.
- \`pi\` holds a floating-point number.

### Variable Names

Variable names can be arbitrarily long. They can contain both letters and numbers, but they have to begin with a letter. It is legal to use uppercase letters, but it is good practice to begin variable names with a lowercase letter.

The underscore character \`_\` can appear in a name. It is often used in names with multiple words, such as \`my_name\` or \`airspeed_of_unladen_swallow\`.

If you give a variable an illegal name, you get a syntax error:

\`\`\`python
76trombones = "big parade"  # SyntaxError: invalid syntax (starts with number)
more@ = 1000000             # SyntaxError: invalid syntax (illegal character @)
class = "Advanced Theoretical Zymurgy" # SyntaxError: invalid syntax (keyword)
\`\`\`

## Data Types

Python has several standard data types:

### 1. Numbers
- **Integer (\`int\`)**: Whole numbers without a decimal point. Example: \`42\`, \`-10\`.
- **Float (\`float\`)**: Numbers with a decimal point. Example: \`3.14\`, \`2.0\`.

### 2. Strings (\`str\`)
Strings are sequences of characters enclosed in quotes.
\`\`\`python
name = 'Alice'
greeting = "Hello"
\`\`\`
You can use single or double quotes.

### 3. Booleans (\`bool\`)
Represents truth values: \`True\` or \`False\`.
\`\`\`python
is_raining = False
is_sunny = True
\`\`\`

### Type Checking
You can check the type of a variable using the \`type()\` function.

\`\`\`python
print(type(17))      # <class 'int'>
print(type(3.14))    # <class 'float'>
print(type("Hello")) # <class 'str'>
\`\`\`

### Type Conversion
You can convert between types using built-in functions:
- \`int(3.14)\` -> \`3\`
- \`float(42)\` -> \`42.0\`
- \`str(100)\` -> \`"100"\`
`
      },
      {
        courseSlug: "python-fundamentals",
        lessonTitle: "If-Else Statements",
        content: `# Conditional Statements

Programs get interesting when we can test conditions and change the program's behavior depending on the outcome.

## Boolean Expressions

A **Boolean expression** is an expression that evaluates to either \`True\` or \`False\`.

The \`==\` operator compares two values:
\`\`\`python
print(5 == 5)  # True
print(5 == 6)  # False
\`\`\`

### Comparison Operators
| Operator | Meaning |
|----------|---------|
| \`x == y\` | x is equal to y |
| \`x != y\` | x is not equal to y |
| \`x > y\` | x is greater than y |
| \`x < y\` | x is less than y |
| \`x >= y\` | x is greater than or equal to y |
| \`x <= y\` | x is less than or equal to y |

## Logical Operators

There are three logical operators: \`and\`, \`or\`, and \`not\`.

- \`x > 0 and x < 10\` is true only if x is greater than 0 **and** less than 10.
- \`n % 2 == 0 or n % 3 == 0\` is true if n is divisible by 2 **or** by 3.
- \`not (x > y)\` is true if \`x > y\` is false.

## Conditional Execution (\`if\`)

The simplest form of selection is the \`if\` statement:

\`\`\`python
if x > 0:
    print("x is positive")
\`\`\`

The indented statements after the \`if\` are executed only if the condition is true.

## Alternative Execution (\`else\`)

To do one thing if a condition is true and another if it's false:

\`\`\`python
if x % 2 == 0:
    print("x is even")
else:
    print("x is odd")
\`\`\`

## Chained Conditionals (\`elif\`)

When there are more than two possibilities:

\`\`\`python
if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
else:
    print("x and y are equal")
\`\`\`

\`elif\` is an abbreviation of "else if". There is no limit on the number of \`elif\` statements.

## Nested Conditionals

You can nest conditionals within other conditionals:

\`\`\`python
if x == y:
    print("x and y are equal")
else:
    if x < y:
        print("x is less than y")
    else:
        print("x is greater than y")
\`\`\`
Nested conditionals can become hard to read, so use them sparingly.`
      },
      {
        courseSlug: "python-fundamentals",
        lessonTitle: "Defining Functions",
        content: `# Introduction to Functions

A **function** is a named sequence of statements that performs a computation. When you define a function, you specify the name and the sequence of statements. Later, you can "call" the function by name.

## Function Definition

\`\`\`python
def print_lyrics():
    print("I'm a lumberjack, and I'm okay.")
    print("I sleep all night and I work all day.")
\`\`\`

- **def**: A keyword that indicates a function definition.
- **print_lyrics**: The name of the function.
- **()**: Parentheses enclose parameters (empty here).
- **:**: The colon ends the header.
- **Indentation**: The body of the function must be indented (standard is 4 spaces).

## Calling a Function

Once defined, you can use (call) the function:

\`\`\`python
print_lyrics()
\`\`\`

## Parameters and Arguments

Some functions require arguments. For example, \`math.sin\` takes a number. Inside the function, the arguments are assigned to variables called **parameters**.

\`\`\`python
def print_twice(bruce):
    print(bruce)
    print(bruce)
\`\`\`

When you call this:
\`\`\`python
print_twice('Spam')
\`\`\`
The argument \`'Spam'\` is assigned to the parameter \`bruce\`.

## Return Values

Functions can return values. These are called **fruitful functions**.

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8
\`\`\`

Functions that don't return a value (like \`print_twice\`) are called **void functions**. In Python, they actually return a special value called \`None\`.

## Local Variables

Variables created inside a function are **local**. They only exist inside the function.

\`\`\`python
def cat_twice(part1, part2):
    cat = part1 + part2
    print_twice(cat)
\`\`\`

Here, \`cat\` is local to \`cat_twice\`. If you try to use it outside, you'll get an error.

## Why Use Functions?

1. **Organization**: Functions allow you to group statements into logical chunks.
2. **Reuse**: You can write code once and reuse it many times.
3. **Testing**: You can test and debug functions individually.
4. **Clarification**: Naming a block of code makes it easier to read (e.g., \`calculate_area\` vs a math formula).`
      },
      // JAVASCRIPT UPDATES
      {
        courseSlug: "javascript-mastery",
        lessonTitle: "JavaScript Basics - Introduction",
        content: `# Introduction to JavaScript

JavaScript (JS) is the programming language of the web. It powers interactive behavior on websites, web applications, and increasingly server-side applications (Node.js).

## Code Structure

Statements in JavaScript are commands to be executed.

\`\`\`javascript
alert('Hello'); alert('World');
\`\`\`

Statements are delimited with a semicolon \`;\`.
Usually, a line-break is also treated as a delimiter, so this also works:

\`\`\`javascript
alert('Hello')
alert('World')
\`\`\`

This is called **Automatic Semicolon Insertion (ASI)**. However, it's considered best practice to explicitly add semicolons to avoid subtle bugs.

## "use strict"

Modern JavaScript introduced a new mode called "strict mode" to opt into a cleaner, safer version of the language.

\`\`\`javascript
"use strict";

// Your code here...
\`\`\`

This directive should be at the top of your script. It changes previously accepted "bad syntax" into real errors, helping you write better code.

## Interaction

We often interact with users in the browser:

1. **alert(message)**: Shows a modal window with a message.
   \`\`\`javascript
   alert("Hello");
   \`\`\`

2. **prompt(question, default)**: Asks a question and returns the user's input.
   \`\`\`javascript
   let age = prompt('How old are you?', 100);
   alert(\`You are \${age} years old!\`); // You are 100 years old!
   \`\`\`

3. **confirm(question)**: Shows a modal with OK/Cancel buttons. Returns \`true\` or \`false\`.
   \`\`\`javascript
   let isBoss = confirm("Are you the boss?");
   alert( isBoss ); // true if OK is pressed
   \`\`\`
`
      },
      {
        courseSlug: "javascript-mastery",
        lessonTitle: "JavaScript Basics - Concepts",
        content: `# Variables: let, const, var

Variables are used to store this information.

## Variable Declaration

In modern JavaScript, there are two main ways to declare variables:

1. **let**: For variables that can change.
   \`\`\`javascript
   let message = "Hello";
   message = "World"; // OK
   \`\`\`

2. **const**: For constants (variables that cannot be reassigned).
   \`\`\`javascript
   const birthday = "18.04.1982";
   // birthday = "01.01.2000"; // Error!
   \`\`\`

### The old "var"

You might see \`var\` in older scripts.
\`\`\`javascript
var name = "John";
\`\`\`
It is similar to \`let\` but has some differences in scoping (function-scope vs block-scope) and hoisting. **Avoid using \`var\` in modern code.**

## Variable Naming Rules

1. The name must contain only letters, digits, or the symbols \`$\` and \`_\`.
2. The first character must not be a digit.
3. Case matters: \`apple\` and \`AppLE\` are different variables.

## Data Types

JavaScript is **dynamically typed**. A variable can hold any data type.

\`\`\`javascript
let message = "hello";
message = 123456;
\`\`\`

Major data types:
- **Number**: Integers and floats (\`123\`, \`12.34\`).
- **BigInt**: For integers of arbitrary length.
- **String**: Text, surrounded by quotes (\`"..."\`, \`'...'\`, or \`\` \`...\` \`\`).
- **Boolean**: \`true\` or \`false\`.
- **null**: Represents "nothing" or "empty".
- **undefined**: Represents "value is not assigned".
- **Object**: More complex data structures.
`
      },
      {
        courseSlug: "javascript-mastery",
        lessonTitle: "Functions - Introduction",
        content: `# Functions in JavaScript

Functions are the main "building blocks" of the program. They allow the code to be called many times without repetition.

## Function Declaration

\`\`\`javascript
function showMessage() {
  alert( 'Hello everyone!' );
}
\`\`\`

## Parameters

We can pass arbitrary data to functions using parameters.

\`\`\`javascript
function showMessage(from, text) {
  alert(from + ': ' + text);
}

showMessage('Ann', 'Hello!'); // Ann: Hello!
\`\`\`

## Local Variables

A variable declared inside a function is only visible inside that function.

\`\`\`javascript
function showMessage() {
  let message = "Hello, I'm JavaScript!"; // local variable
  alert( message );
}

showMessage(); // Hello, I'm JavaScript!
// alert( message ); // Error! The variable is local to the function
\`\`\`

## Outer Variables

A function can access an outer variable as well.

\`\`\`javascript
let userName = 'John';

function showMessage() {
  let message = 'Hello, ' + userName;
  alert(message);
}

showMessage(); // Hello, John
\`\`\`

The function can also modify outer variables.

## Default Values

We can specify a default value for a parameter using \`=\`.

\`\`\`javascript
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
\`\`\`

## Returning a Value

A function can return a value back into the calling code.

\`\`\`javascript
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3
\`\`\`

If a function does not return a value, it returns \`undefined\`.
`
      }
    ];

    for (const update of updates) {
      // Find the course
      const course = await ctx.db
        .query("courses")
        .withIndex("by_slug", (q) => q.eq("slug", update.courseSlug))
        .unique();

      if (course) {
        // Find the lesson by title
        // Note: We can't query by title directly with index easily unless we added one, 
        // so we'll filter in memory or use a custom query if needed.
        // But 'lessons' has index by_course.
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_course", (q) => q.eq("courseId", course._id))
          .collect();
        
        const lesson = lessons.find(l => l.title === update.lessonTitle);

        if (lesson) {
          await ctx.db.patch(lesson._id, {
            content: update.content
          });
          console.log(`Updated lesson: ${update.lessonTitle} in ${update.courseSlug}`);
        } else {
           console.log(`Lesson not found: ${update.lessonTitle} in ${update.courseSlug}`);
        }
      } else {
         console.log(`Course not found: ${update.courseSlug}`);
      }
    }
    
    return "Content updates completed.";
  },
});
