import { mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

type LessonSeed = {
  title: string;
  type: "theory" | "practice" | "challenge" | "project" | "quiz";
  content: string;
  order: number;
  xpReward?: number;
  estimatedMinutes?: number;
  language?: string;
  codeTemplate?: string;
  solution?: string;
  testCases?: Array<{
    id?: string;
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
    description?: string;
    points?: number;
  }>;
  hints?: string[];
};

type SeedCtx = MutationCtx;

async function createLessons(
  ctx: SeedCtx,
  moduleId: Id<"modules">,
  courseId: Id<"courses">,
  lessons: LessonSeed[]
) {
  for (const lesson of lessons) {
    await ctx.db.insert("lessons", {
      moduleId,
      courseId,
      ...lesson,
    });
  }
}

// ==========================================
// PYTHON FUNDAMENTALS - 10 MODULES
// ==========================================
async function seedPythonCourse(ctx: SeedCtx) {
  const courseId = await ctx.db.insert("courses", {
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    description: "Master Python from basics to advanced concepts. Learn variables, data structures, functions, OOP, file handling, and build real projects.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    language: "python",
    difficulty: "beginner",
    totalLessons: 50,
    estimatedHours: 45,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: Getting Started
  const pyMod1 = await ctx.db.insert("modules", {
    courseId,
    title: "Getting Started with Python",
    order: 1,
    summary: "Introduction to Python programming and setting up your environment",
  });

  await createLessons(ctx, pyMod1, courseId, [
    {
      title: "What is Python?",
      type: "theory",
      content: `# What is Python?

Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, Python has become one of the most popular languages in the world.

## Why Learn Python?

- **Easy to Read**: Python's syntax is clean and resembles English
- **Versatile**: Used in web development, data science, AI, automation, and more
- **Large Community**: Extensive libraries and helpful community
- **In-Demand**: One of the most sought-after skills in tech

## Python's Philosophy

Python follows the principle that code should be readable and simple. The Zen of Python states:
- Beautiful is better than ugly
- Explicit is better than implicit
- Simple is better than complex
- Readability counts

## Where Python is Used

1. **Web Development** - Django, Flask, FastAPI
2. **Data Science** - Pandas, NumPy, Matplotlib
3. **Machine Learning** - TensorFlow, PyTorch, scikit-learn
4. **Automation** - Scripts, bots, task automation
5. **Game Development** - Pygame`,
      order: 1,
      xpReward: 10,
      estimatedMinutes: 5,
      language: "python",
    },
    {
      title: "Your First Python Program",
      type: "practice",
      content: `# Your First Python Program

Let's write your first Python program - the classic "Hello, World!"

## The print() Function

The \`print()\` function displays output to the console.

\`\`\`python
print("Hello, World!")
\`\`\`

## Task
Use the \`print()\` function to display "Hello, World!"`,
      codeTemplate: `# Write your first Python program
# Print "Hello, World!" to the console

`,
      solution: `print("Hello, World!")`,
      testCases: [
        { input: "", expectedOutput: "Hello, World!", description: "Should print Hello, World!", points: 10 }
      ],
      hints: ["Use the print() function", "Put your text inside quotation marks"],
      order: 2,
      xpReward: 20,
      estimatedMinutes: 5,
      language: "python",
    },
    {
      title: "Python Syntax & Comments",
      type: "theory",
      content: `# Python Syntax & Comments

## Indentation
Python uses indentation (whitespace) to define code blocks:

\`\`\`python
if True:
    print("Indented code")  # 4 spaces
\`\`\`

## Comments
Comments explain your code and are ignored by Python:

\`\`\`python
# This is a single-line comment

"""
This is a 
multi-line comment
(docstring)
"""
\`\`\`

## Statements
Each line is typically a statement:
\`\`\`python
x = 5
y = 10
print(x + y)
\`\`\``,
      order: 3,
      xpReward: 10,
      estimatedMinutes: 5,
      language: "python",
    },
    {
      title: "Print Multiple Lines",
      type: "practice",
      content: `# Print Multiple Lines

Practice using print() to display multiple lines of text.

## Task
Print the following three lines:
1. "Welcome to Python!"
2. "Learning is fun."
3. "Let's code together!"`,
      codeTemplate: `# Print three lines of text


`,
      solution: `print("Welcome to Python!")
print("Learning is fun.")
print("Let's code together!")`,
      testCases: [
        { input: "", expectedOutput: "Welcome to Python!", description: "First line", points: 10 },
        { input: "", expectedOutput: "Learning is fun.", description: "Second line", points: 10 },
        { input: "", expectedOutput: "Let's code together!", description: "Third line", points: 10 }
      ],
      hints: ["Use one print() statement per line"],
      order: 4,
      xpReward: 25,
      estimatedMinutes: 5,
      language: "python",
    },
  ]);

  // Module 2: Variables & Data Types
  const pyMod2 = await ctx.db.insert("modules", {
    courseId,
    title: "Variables & Data Types",
    order: 2,
    summary: "Learn about variables, numbers, strings, and boolean values",
  });

  await createLessons(ctx, pyMod2, courseId, [
    {
      title: "Variables in Python",
      type: "theory",
      content: `# Variables in Python

Variables are containers for storing data values.

## Creating Variables
\`\`\`python
name = "Alice"      # String
age = 25            # Integer
height = 5.9        # Float
is_student = True   # Boolean
\`\`\`

## Variable Naming Rules
- Must start with a letter or underscore
- Can contain letters, numbers, underscores
- Case-sensitive (age and Age are different)
- Cannot use Python keywords (if, for, while, etc.)

## Good Variable Names
\`\`\`python
user_name = "John"    # snake_case (recommended)
totalPrice = 99.99    # camelCase (works but not preferred)
MAX_SIZE = 100        # UPPERCASE for constants
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 8,
      language: "python",
    },
    {
      title: "Numbers in Python",
      type: "theory",
      content: `# Numbers in Python

Python has three numeric types:

## Integers (int)
Whole numbers without decimals:
\`\`\`python
x = 10
y = -5
z = 0
\`\`\`

## Floats (float)
Numbers with decimals:
\`\`\`python
pi = 3.14159
price = 19.99
temperature = -2.5
\`\`\`

## Arithmetic Operations
\`\`\`python
a + b    # Addition
a - b    # Subtraction
a * b    # Multiplication
a / b    # Division (float result)
a // b   # Floor division (int result)
a % b    # Modulus (remainder)
a ** b   # Exponentiation
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 8,
      language: "python",
    },
    {
      title: "Basic Calculator",
      type: "practice",
      content: `# Basic Calculator

Create a simple calculator using arithmetic operations.

## Task
Given variables a = 15 and b = 4, calculate and print:
- Sum: (result of a + b)
- Product: (result of a * b)
- Quotient: (result of a / b)`,
      codeTemplate: `a = 15
b = 4

# Calculate and print sum, product, and quotient

`,
      solution: `a = 15
b = 4

print(f"Sum: {a + b}")
print(f"Product: {a * b}")
print(f"Quotient: {a / b}")`,
      testCases: [
        { input: "", expectedOutput: "Sum: 19", description: "Correct sum", points: 15 },
        { input: "", expectedOutput: "Product: 60", description: "Correct product", points: 15 },
        { input: "", expectedOutput: "Quotient: 3.75", description: "Correct quotient", points: 15 }
      ],
      hints: ["Use f-strings for formatting: f\"text {expression}\""],
      order: 3,
      xpReward: 30,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Strings in Python",
      type: "theory",
      content: `# Strings in Python

Strings are sequences of characters enclosed in quotes.

## Creating Strings
\`\`\`python
single = 'Hello'
double = "World"
multi = """This is a
multi-line string"""
\`\`\`

## String Operations
\`\`\`python
name = "Python"
print(len(name))        # 6 (length)
print(name.upper())     # PYTHON
print(name.lower())     # python
print(name[0])          # P (first char)
print(name[-1])         # n (last char)
print(name[0:3])        # Pyt (slicing)
\`\`\`

## String Concatenation
\`\`\`python
first = "Hello"
second = "World"
combined = first + " " + second  # "Hello World"
\`\`\`

## F-Strings (Formatted Strings)
\`\`\`python
name = "Alice"
age = 25
print(f"My name is {name} and I am {age}")
\`\`\``,
      order: 4,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "String Manipulation",
      type: "practice",
      content: `# String Manipulation

Practice working with strings.

## Task
Given the string "hello world":
1. Convert it to uppercase and print
2. Convert it to title case and print
3. Print the length of the string`,
      codeTemplate: `text = "hello world"

# 1. Print uppercase version

# 2. Print title case version

# 3. Print length

`,
      solution: `text = "hello world"

print(text.upper())
print(text.title())
print(len(text))`,
      testCases: [
        { input: "", expectedOutput: "HELLO WORLD", description: "Uppercase", points: 15 },
        { input: "", expectedOutput: "Hello World", description: "Title case", points: 15 },
        { input: "", expectedOutput: "11", description: "Length", points: 15 }
      ],
      hints: ["Use .upper() for uppercase", "Use .title() for title case", "Use len() for length"],
      order: 5,
      xpReward: 35,
      estimatedMinutes: 10,
      language: "python",
    },
  ]);

  // Module 3: Operators & Control Flow
  const pyMod3 = await ctx.db.insert("modules", {
    courseId,
    title: "Operators & Control Flow",
    order: 3,
    summary: "Learn about operators and conditional statements",
  });

  await createLessons(ctx, pyMod3, courseId, [
    {
      title: "Comparison & Logical Operators",
      type: "theory",
      content: `# Comparison & Logical Operators

## Comparison Operators
| Operator | Meaning |
|----------|---------|
| == | Equal to |
| != | Not equal to |
| > | Greater than |
| < | Less than |
| >= | Greater than or equal |
| <= | Less than or equal |

\`\`\`python
x = 10
print(x == 10)  # True
print(x > 5)    # True
print(x < 5)    # False
\`\`\`

## Logical Operators
\`\`\`python
# and - Both must be True
print(True and True)   # True
print(True and False)  # False

# or - At least one must be True
print(True or False)   # True
print(False or False)  # False

# not - Reverses the value
print(not True)        # False
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 8,
      language: "python",
    },
    {
      title: "If-Else Statements",
      type: "theory",
      content: `# If-Else Statements

Control the flow of your program based on conditions.

## if Statement
\`\`\`python
age = 18
if age >= 18:
    print("You are an adult")
\`\`\`

## if-else Statement
\`\`\`python
temperature = 25
if temperature > 30:
    print("It's hot!")
else:
    print("It's comfortable")
\`\`\`

## if-elif-else Statement
\`\`\`python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"Grade: {grade}")
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Grade Calculator",
      type: "practice",
      content: `# Grade Calculator

Create a program that assigns a letter grade based on score.

## Grading Scale
- 90-100: A
- 80-89: B
- 70-79: C
- 60-69: D
- Below 60: F

## Task
Given score = 75, print the grade.`,
      codeTemplate: `score = 75

# Write your if-elif-else statement
# Print: "Grade: X"

`,
      solution: `score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Grade: {grade}")`,
      testCases: [
        { input: "", expectedOutput: "Grade: C", description: "Score 75 = Grade C", points: 30 }
      ],
      hints: ["Start with the highest grade first", "Use elif for middle conditions"],
      order: 3,
      xpReward: 35,
      estimatedMinutes: 12,
      language: "python",
    },
    {
      title: "Number Classifier Challenge",
      type: "challenge",
      content: `# Number Classifier Challenge

Write a program that classifies a number.

## Requirements
Given a number n = -7, determine and print:
1. If it's positive, negative, or zero
2. If it's even or odd (for non-zero numbers)

## Expected Output
For n = -7:
\`\`\`
-7 is negative
-7 is odd
\`\`\``,
      codeTemplate: `n = -7

# Classify the number
# Print if positive/negative/zero
# Print if even/odd (if not zero)

`,
      solution: `n = -7

if n > 0:
    print(f"{n} is positive")
elif n < 0:
    print(f"{n} is negative")
else:
    print(f"{n} is zero")

if n != 0:
    if n % 2 == 0:
        print(f"{n} is even")
    else:
        print(f"{n} is odd")`,
      testCases: [
        { input: "", expectedOutput: "-7 is negative", description: "Identifies negative", points: 25 },
        { input: "", expectedOutput: "-7 is odd", description: "Identifies odd", points: 25 }
      ],
      hints: ["Use % 2 to check even/odd", "Check if number is zero before even/odd check"],
      order: 4,
      xpReward: 50,
      estimatedMinutes: 15,
      language: "python",
    },
  ]);

  // Module 4: Loops & Iterations
  const pyMod4 = await ctx.db.insert("modules", {
    courseId,
    title: "Loops & Iterations",
    order: 4,
    summary: "Master for loops, while loops, and loop control statements",
  });

  await createLessons(ctx, pyMod4, courseId, [
    {
      title: "For Loops",
      type: "theory",
      content: `# For Loops

For loops iterate over a sequence.

## Using range()
\`\`\`python
# Print 0 to 4
for i in range(5):
    print(i)

# Print 1 to 5
for i in range(1, 6):
    print(i)

# Print even numbers 0-10
for i in range(0, 11, 2):
    print(i)
\`\`\`

## Iterating Over Lists
\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## Iterating Over Strings
\`\`\`python
for char in "Python":
    print(char)
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "While Loops",
      type: "theory",
      content: `# While Loops

While loops repeat as long as a condition is True.

## Basic While Loop
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Loop Control Statements

### break - Exit the loop
\`\`\`python
for i in range(10):
    if i == 5:
        break
    print(i)  # Prints 0-4
\`\`\`

### continue - Skip current iteration
\`\`\`python
for i in range(5):
    if i == 2:
        continue
    print(i)  # Prints 0,1,3,4
\`\`\`

### pass - Do nothing (placeholder)
\`\`\`python
for i in range(5):
    pass  # TODO: implement later
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Sum Calculator",
      type: "practice",
      content: `# Sum Calculator

Calculate the sum of numbers from 1 to n using a loop.

## Task
Calculate and print the sum of numbers from 1 to 10.
(1 + 2 + 3 + ... + 10 = 55)`,
      codeTemplate: `# Calculate sum of 1 to 10
total = 0

# Write your loop here

print(f"Sum: {total}")`,
      solution: `total = 0

for i in range(1, 11):
    total += i

print(f"Sum: {total}")`,
      testCases: [
        { input: "", expectedOutput: "Sum: 55", description: "Correct sum", points: 30 }
      ],
      hints: ["Use range(1, 11) to get numbers 1-10", "Add each number to total"],
      order: 3,
      xpReward: 30,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Multiplication Table",
      type: "practice",
      content: `# Multiplication Table

Print the multiplication table for a number.

## Task
Print the multiplication table for 7 (from 1 to 10):
\`\`\`
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70
\`\`\``,
      codeTemplate: `n = 7

# Print multiplication table for n

`,
      solution: `n = 7

for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")`,
      testCases: [
        { input: "", expectedOutput: "7 x 1 = 7", description: "First row", points: 10 },
        { input: "", expectedOutput: "7 x 5 = 35", description: "Fifth row", points: 10 },
        { input: "", expectedOutput: "7 x 10 = 70", description: "Last row", points: 10 }
      ],
      hints: ["Use range(1, 11) for 1 to 10", "Use f-string for formatting"],
      order: 4,
      xpReward: 35,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "FizzBuzz Challenge",
      type: "challenge",
      content: `# FizzBuzz Challenge

The classic programming challenge!

## Rules
For numbers 1 to 15:
- Print "FizzBuzz" if divisible by both 3 and 5
- Print "Fizz" if divisible by 3
- Print "Buzz" if divisible by 5
- Otherwise print the number`,
      codeTemplate: `# FizzBuzz for numbers 1-15

`,
      solution: `for i in range(1, 16):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
      testCases: [
        { input: "", expectedOutput: "1", description: "Prints 1", points: 10 },
        { input: "", expectedOutput: "Fizz", description: "Prints Fizz for 3", points: 15 },
        { input: "", expectedOutput: "Buzz", description: "Prints Buzz for 5", points: 15 },
        { input: "", expectedOutput: "FizzBuzz", description: "Prints FizzBuzz for 15", points: 20 }
      ],
      hints: ["Check divisible by both 3 and 5 first", "Use % operator to check divisibility"],
      order: 5,
      xpReward: 60,
      estimatedMinutes: 20,
      language: "python",
    },
  ]);

  // Module 5: Data Structures I - Lists & Tuples
  const pyMod5 = await ctx.db.insert("modules", {
    courseId,
    title: "Data Structures I: Lists & Tuples",
    order: 5,
    summary: "Learn about lists, list methods, and tuples",
  });

  await createLessons(ctx, pyMod5, courseId, [
    {
      title: "Introduction to Lists",
      type: "theory",
      content: `# Introduction to Lists

Lists are ordered, mutable collections.

## Creating Lists
\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []
\`\`\`

## Accessing Elements
\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])    # apple (first)
print(fruits[-1])   # cherry (last)
print(fruits[1:3])  # ['banana', 'cherry'] (slicing)
\`\`\`

## List Properties
- Ordered: Items have a defined order
- Mutable: Can be changed after creation
- Allow duplicates: Can have same value twice
- Indexed: Access by position (0-based)`,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "List Methods",
      type: "theory",
      content: `# List Methods

## Adding Elements
\`\`\`python
fruits = ["apple"]
fruits.append("banana")      # Add to end
fruits.insert(0, "mango")    # Insert at index
fruits.extend(["kiwi"])      # Add multiple
\`\`\`

## Removing Elements
\`\`\`python
fruits.remove("apple")  # Remove by value
fruits.pop()           # Remove last
fruits.pop(0)          # Remove by index
fruits.clear()         # Remove all
\`\`\`

## Other Useful Methods
\`\`\`python
numbers = [3, 1, 4, 1, 5]
numbers.sort()          # Sort in place
numbers.reverse()       # Reverse in place
print(numbers.count(1)) # Count occurrences
print(numbers.index(4)) # Find index
print(len(numbers))     # Length
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "List Operations",
      type: "practice",
      content: `# List Operations

Practice common list operations.

## Task
Start with: numbers = [5, 2, 8, 1, 9]
1. Sort the list
2. Add 10 to the end
3. Print the final list`,
      codeTemplate: `numbers = [5, 2, 8, 1, 9]

# Sort the list

# Add 10 to the end

# Print the result

`,
      solution: `numbers = [5, 2, 8, 1, 9]

numbers.sort()
numbers.append(10)
print(numbers)`,
      testCases: [
        { input: "", expectedOutput: "[1, 2, 5, 8, 9, 10]", description: "Sorted with 10 added", points: 30 }
      ],
      hints: ["Use .sort() to sort in place", "Use .append() to add to end"],
      order: 3,
      xpReward: 30,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "List Comprehensions",
      type: "theory",
      content: `# List Comprehensions

A concise way to create lists.

## Basic Syntax
\`\`\`python
# Traditional way
squares = []
for x in range(5):
    squares.append(x ** 2)

# List comprehension
squares = [x ** 2 for x in range(5)]
# Result: [0, 1, 4, 9, 16]
\`\`\`

## With Condition
\`\`\`python
# Only even numbers
evens = [x for x in range(10) if x % 2 == 0]
# Result: [0, 2, 4, 6, 8]
\`\`\`

## With String
\`\`\`python
word = "hello"
upper = [c.upper() for c in word]
# Result: ['H', 'E', 'L', 'L', 'O']
\`\`\``,
      order: 4,
      xpReward: 20,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Tuples",
      type: "theory",
      content: `# Tuples

Tuples are ordered, immutable collections.

## Creating Tuples
\`\`\`python
point = (3, 4)
colors = ("red", "green", "blue")
single = (42,)  # Note the comma for single item
\`\`\`

## Accessing Elements
\`\`\`python
colors = ("red", "green", "blue")
print(colors[0])   # red
print(colors[-1])  # blue
\`\`\`

## Tuple Unpacking
\`\`\`python
point = (3, 4)
x, y = point
print(x)  # 3
print(y)  # 4
\`\`\`

## When to Use Tuples
- Data that shouldn't change
- Dictionary keys (lists can't be keys)
- Returning multiple values from functions`,
      order: 5,
      xpReward: 15,
      estimatedMinutes: 8,
      language: "python",
    },
  ]);

  // Module 6: Data Structures II - Dictionaries & Sets
  const pyMod6 = await ctx.db.insert("modules", {
    courseId,
    title: "Data Structures II: Dictionaries & Sets",
    order: 6,
    summary: "Master dictionaries, sets, and nested data structures",
  });

  await createLessons(ctx, pyMod6, courseId, [
    {
      title: "Dictionaries",
      type: "theory",
      content: `# Dictionaries

Dictionaries store key-value pairs.

## Creating Dictionaries
\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "NYC"
}

# Alternative
person = dict(name="Alice", age=25)
\`\`\`

## Accessing Values
\`\`\`python
print(person["name"])      # Alice
print(person.get("age"))   # 25
print(person.get("job", "N/A"))  # N/A (default)
\`\`\`

## Modifying Dictionaries
\`\`\`python
person["email"] = "alice@email.com"  # Add
person["age"] = 26                    # Update
del person["city"]                    # Delete
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Dictionary Methods",
      type: "theory",
      content: `# Dictionary Methods

## Common Methods
\`\`\`python
person = {"name": "Alice", "age": 25}

# Get all keys, values, items
print(person.keys())    # dict_keys(['name', 'age'])
print(person.values())  # dict_values(['Alice', 25])
print(person.items())   # dict_items([('name', 'Alice'), ('age', 25)])

# Other methods
person.update({"city": "NYC"})  # Add/update multiple
person.pop("age")               # Remove and return
person.clear()                  # Remove all
\`\`\`

## Iterating
\`\`\`python
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(f"{key}: {value}")
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Student Grades",
      type: "practice",
      content: `# Student Grades

Create a dictionary to store student grades and calculate the average.

## Task
Given this data:
- Alice: 85
- Bob: 92
- Charlie: 78

Create a dictionary, then calculate and print the average grade.`,
      codeTemplate: `# Create dictionary with student grades


# Calculate average


# Print: "Average: X"
`,
      solution: `grades = {
    "Alice": 85,
    "Bob": 92,
    "Charlie": 78
}

average = sum(grades.values()) / len(grades)
print(f"Average: {average}")`,
      testCases: [
        { input: "", expectedOutput: "Average: 85.0", description: "Correct average", points: 30 }
      ],
      hints: ["Use sum() on grades.values()", "Divide by len(grades)"],
      order: 3,
      xpReward: 35,
      estimatedMinutes: 12,
      language: "python",
    },
    {
      title: "Sets",
      type: "theory",
      content: `# Sets

Sets are unordered collections of unique elements.

## Creating Sets
\`\`\`python
colors = {"red", "green", "blue"}
numbers = set([1, 2, 2, 3])  # {1, 2, 3}
\`\`\`

## Set Operations
\`\`\`python
a = {1, 2, 3}
b = {2, 3, 4}

print(a | b)  # Union: {1, 2, 3, 4}
print(a & b)  # Intersection: {2, 3}
print(a - b)  # Difference: {1}
\`\`\`

## Set Methods
\`\`\`python
colors = {"red", "green"}
colors.add("blue")
colors.remove("red")
colors.discard("yellow")  # No error if missing
\`\`\`

## Use Cases
- Removing duplicates
- Membership testing (very fast)
- Mathematical set operations`,
      order: 4,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Remove Duplicates",
      type: "practice",
      content: `# Remove Duplicates

Use a set to remove duplicates from a list.

## Task
Given: numbers = [1, 2, 2, 3, 4, 4, 5, 5, 5]
Remove duplicates and print as a sorted list.`,
      codeTemplate: `numbers = [1, 2, 2, 3, 4, 4, 5, 5, 5]

# Remove duplicates and create sorted list


# Print the result
`,
      solution: `numbers = [1, 2, 2, 3, 4, 4, 5, 5, 5]

unique = sorted(set(numbers))
print(unique)`,
      testCases: [
        { input: "", expectedOutput: "[1, 2, 3, 4, 5]", description: "Unique sorted list", points: 30 }
      ],
      hints: ["Convert to set to remove duplicates", "Use sorted() to get a sorted list"],
      order: 5,
      xpReward: 30,
      estimatedMinutes: 10,
      language: "python",
    },
  ]);

  // Module 7: Functions
  const pyMod7 = await ctx.db.insert("modules", {
    courseId,
    title: "Functions",
    order: 7,
    summary: "Create reusable code with functions, parameters, and return values",
  });

  await createLessons(ctx, pyMod7, courseId, [
    {
      title: "Defining Functions",
      type: "theory",
      content: `# Defining Functions

Functions are reusable blocks of code.

## Basic Function
\`\`\`python
def greet():
    print("Hello!")

greet()  # Call the function
\`\`\`

## Parameters
\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
\`\`\`

## Return Values
\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8
\`\`\`

## Default Parameters
\`\`\`python
def greet(name="World"):
    print(f"Hello, {name}!")

greet()         # Hello, World!
greet("Alice")  # Hello, Alice!
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Function Arguments",
      type: "theory",
      content: `# Function Arguments

## Positional vs Keyword Arguments
\`\`\`python
def describe(name, age, city):
    print(f"{name}, {age}, from {city}")

# Positional
describe("Alice", 25, "NYC")

# Keyword
describe(age=25, city="NYC", name="Alice")
\`\`\`

## *args (Variable Positional)
\`\`\`python
def add_all(*numbers):
    return sum(numbers)

print(add_all(1, 2, 3, 4))  # 10
\`\`\`

## **kwargs (Variable Keyword)
\`\`\`python
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25)
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Create a Calculator Function",
      type: "practice",
      content: `# Calculator Function

Create a function that performs basic math operations.

## Task
Create a function \`calculate(a, b, operation)\` that:
- Returns a + b if operation is "add"
- Returns a - b if operation is "subtract"
- Returns a * b if operation is "multiply"
- Returns a / b if operation is "divide"

Test with: calculate(10, 5, "multiply")`,
      codeTemplate: `def calculate(a, b, operation):
    # Your code here
    pass

# Test
result = calculate(10, 5, "multiply")
print(result)`,
      solution: `def calculate(a, b, operation):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        return a / b

result = calculate(10, 5, "multiply")
print(result)`,
      testCases: [
        { input: "", expectedOutput: "50", description: "10 * 5 = 50", points: 30 }
      ],
      hints: ["Use if-elif statements to check operation", "Return the calculated value"],
      order: 3,
      xpReward: 40,
      estimatedMinutes: 15,
      language: "python",
    },
    {
      title: "Lambda Functions",
      type: "theory",
      content: `# Lambda Functions

Lambda functions are small anonymous functions.

## Syntax
\`\`\`python
# Regular function
def square(x):
    return x ** 2

# Lambda equivalent
square = lambda x: x ** 2
\`\`\`

## Common Uses

### With map()
\`\`\`python
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x ** 2, numbers))
# [1, 4, 9, 16]
\`\`\`

### With filter()
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [2, 4, 6]
\`\`\`

### With sorted()
\`\`\`python
students = [("Alice", 85), ("Bob", 92)]
sorted_students = sorted(students, key=lambda x: x[1])
\`\`\``,
      order: 4,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Recursive Functions",
      type: "challenge",
      content: `# Recursive Functions

Write a recursive function to calculate factorial.

## Task
Create a function \`factorial(n)\` that calculates n!
- factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
- factorial(0) = 1 (base case)

Print factorial(5)`,
      codeTemplate: `def factorial(n):
    # Base case: factorial(0) = 1
    # Recursive case: n * factorial(n-1)
    pass

print(factorial(5))`,
      solution: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
      testCases: [
        { input: "", expectedOutput: "120", description: "5! = 120", points: 40 }
      ],
      hints: ["Base case: return 1 when n is 0", "Recursive case: return n * factorial(n-1)"],
      order: 5,
      xpReward: 50,
      estimatedMinutes: 15,
      language: "python",
    },
  ]);

  // Module 8: Object-Oriented Programming
  const pyMod8 = await ctx.db.insert("modules", {
    courseId,
    title: "Object-Oriented Programming",
    order: 8,
    summary: "Learn classes, objects, inheritance, and OOP principles",
  });

  await createLessons(ctx, pyMod8, courseId, [
    {
      title: "Classes and Objects",
      type: "theory",
      content: `# Classes and Objects

Classes are blueprints for creating objects.

## Defining a Class
\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        print(f"{self.name} says Woof!")

# Creating an object
my_dog = Dog("Buddy", 3)
print(my_dog.name)  # Buddy
my_dog.bark()       # Buddy says Woof!
\`\`\`

## Key Concepts
- **Class**: Blueprint/template
- **Object**: Instance of a class
- **__init__**: Constructor method
- **self**: Reference to the current instance
- **Attributes**: Data stored in object
- **Methods**: Functions defined in class`,
      order: 1,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "python",
    },
    {
      title: "Create a Person Class",
      type: "practice",
      content: `# Create a Person Class

Create a Person class with name and age attributes.

## Requirements
- Constructor with name and age parameters
- Method \`introduce()\` that prints "Hi, I'm [name] and I'm [age] years old."

Test: Create person "Alice", 25 and call introduce()`,
      codeTemplate: `class Person:
    # Define __init__ and introduce methods
    pass

# Create person and call introduce
`,
      solution: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"Hi, I'm {self.name} and I'm {self.age} years old.")

person = Person("Alice", 25)
person.introduce()`,
      testCases: [
        { input: "", expectedOutput: "Hi, I'm Alice and I'm 25 years old.", description: "Correct introduction", points: 35 }
      ],
      hints: ["Use self.name and self.age in __init__", "Use f-string in introduce()"],
      order: 2,
      xpReward: 40,
      estimatedMinutes: 15,
      language: "python",
    },
    {
      title: "Inheritance",
      type: "theory",
      content: `# Inheritance

Inheritance allows a class to inherit from another class.

## Basic Inheritance
\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

dog = Dog("Buddy")
print(dog.speak())  # Buddy says Woof!
\`\`\`

## Using super()
\`\`\`python
class Student(Person):
    def __init__(self, name, age, grade):
        super().__init__(name, age)
        self.grade = grade
\`\`\``,
      order: 3,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "python",
    },
    {
      title: "Encapsulation",
      type: "theory",
      content: `# Encapsulation

Encapsulation hides internal data and provides controlled access.

## Private Attributes
\`\`\`python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private (__)
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def get_balance(self):
        return self.__balance

account = BankAccount(100)
# account.__balance  # Error!
print(account.get_balance())  # 100
\`\`\`

## Property Decorator
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value > 0:
            self._radius = value
\`\`\``,
      order: 4,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "python",
    },
    {
      title: "Bank Account Class",
      type: "challenge",
      content: `# Bank Account Challenge

Create a BankAccount class with deposit and withdraw methods.

## Requirements
- Constructor takes initial balance
- deposit(amount): Add to balance
- withdraw(amount): Subtract if sufficient funds
- get_balance(): Return current balance

Test: Create account with 100, deposit 50, withdraw 30, print balance`,
      codeTemplate: `class BankAccount:
    pass

# Test
account = BankAccount(100)
account.deposit(50)
account.withdraw(30)
print(account.get_balance())`,
      solution: `class BankAccount:
    def __init__(self, balance):
        self.__balance = balance
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
    
    def get_balance(self):
        return self.__balance

account = BankAccount(100)
account.deposit(50)
account.withdraw(30)
print(account.get_balance())`,
      testCases: [
        { input: "", expectedOutput: "120", description: "100 + 50 - 30 = 120", points: 50 }
      ],
      hints: ["Use self.__balance for private attribute", "Check if withdrawal amount is valid"],
      order: 5,
      xpReward: 60,
      estimatedMinutes: 20,
      language: "python",
    },
  ]);

  // Module 9: File Handling & Modules
  const pyMod9 = await ctx.db.insert("modules", {
    courseId,
    title: "File Handling & Modules",
    order: 9,
    summary: "Work with files, JSON data, and Python modules",
  });

  await createLessons(ctx, pyMod9, courseId, [
    {
      title: "Reading Files",
      type: "theory",
      content: `# Reading Files

Python can read and write files easily.

## Opening Files
\`\`\`python
# Basic file reading
file = open("data.txt", "r")
content = file.read()
file.close()

# Better: Using with (auto-closes)
with open("data.txt", "r") as file:
    content = file.read()
\`\`\`

## Reading Methods
\`\`\`python
# Read entire file
content = file.read()

# Read line by line
line = file.readline()

# Read all lines as list
lines = file.readlines()

# Iterate over lines
for line in file:
    print(line.strip())
\`\`\`

## File Modes
- "r" - Read (default)
- "w" - Write (overwrites)
- "a" - Append
- "r+" - Read and write`,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Writing Files",
      type: "theory",
      content: `# Writing Files

## Writing to a File
\`\`\`python
with open("output.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("Second line")
\`\`\`

## Appending to a File
\`\`\`python
with open("log.txt", "a") as file:
    file.write("New log entry\\n")
\`\`\`

## Writing Multiple Lines
\`\`\`python
lines = ["Line 1", "Line 2", "Line 3"]
with open("data.txt", "w") as file:
    file.writelines(line + "\\n" for line in lines)
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Working with JSON",
      type: "theory",
      content: `# Working with JSON

JSON is a popular data format.

## Reading JSON
\`\`\`python
import json

with open("data.json", "r") as file:
    data = json.load(file)
\`\`\`

## Writing JSON
\`\`\`python
import json

data = {"name": "Alice", "age": 25}
with open("output.json", "w") as file:
    json.dump(data, file, indent=2)
\`\`\`

## JSON String Conversion
\`\`\`python
# Dict to JSON string
json_str = json.dumps({"name": "Alice"})

# JSON string to dict
data = json.loads('{"name": "Alice"}')
\`\`\``,
      order: 3,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Python Modules",
      type: "theory",
      content: `# Python Modules

Modules help organize and reuse code.

## Importing Modules
\`\`\`python
# Import entire module
import math
print(math.sqrt(16))  # 4.0

# Import specific functions
from math import sqrt, pi
print(sqrt(16))

# Import with alias
import numpy as np
\`\`\`

## Common Built-in Modules
\`\`\`python
import os       # Operating system
import sys      # System-specific
import datetime # Date and time
import random   # Random numbers
import re       # Regular expressions
\`\`\`

## Installing Packages
\`\`\`bash
pip install package_name
\`\`\``,
      order: 4,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Random Module Practice",
      type: "practice",
      content: `# Random Module

Use the random module to generate random data.

## Task
1. Import random module
2. Generate and print a random integer between 1 and 100
3. Create a list [1,2,3,4,5] and print a random choice from it

Note: Use random.seed(42) at the start for consistent output.`,
      codeTemplate: `import random
random.seed(42)

# Generate random integer 1-100

# Pick random from list [1,2,3,4,5]

`,
      solution: `import random
random.seed(42)

print(random.randint(1, 100))
print(random.choice([1, 2, 3, 4, 5]))`,
      testCases: [
        { input: "", expectedOutput: "82", description: "Random int with seed 42", points: 20 },
        { input: "", expectedOutput: "1", description: "Random choice with seed 42", points: 20 }
      ],
      hints: ["Use random.randint(1, 100)", "Use random.choice(list)"],
      order: 5,
      xpReward: 35,
      estimatedMinutes: 10,
      language: "python",
    },
  ]);

  // Module 10: Error Handling & Best Practices
  const pyMod10 = await ctx.db.insert("modules", {
    courseId,
    title: "Error Handling & Best Practices",
    order: 10,
    summary: "Handle exceptions and write clean, maintainable Python code",
  });

  await createLessons(ctx, pyMod10, courseId, [
    {
      title: "Exception Handling",
      type: "theory",
      content: `# Exception Handling

Handle errors gracefully with try-except.

## Basic Try-Except
\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
\`\`\`

## Multiple Exceptions
\`\`\`python
try:
    value = int("abc")
except ValueError:
    print("Invalid number!")
except TypeError:
    print("Type error!")
\`\`\`

## Try-Except-Else-Finally
\`\`\`python
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Error!")
else:
    print(f"Result: {result}")  # Runs if no error
finally:
    print("Done!")  # Always runs
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Raising Exceptions",
      type: "theory",
      content: `# Raising Exceptions

You can raise your own exceptions.

## Raise Statement
\`\`\`python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age
\`\`\`

## Custom Exceptions
\`\`\`python
class InsufficientFundsError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError("Not enough money!")
    return balance - amount
\`\`\`

## Assert Statement
\`\`\`python
def divide(a, b):
    assert b != 0, "Divisor cannot be zero"
    return a / b
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Safe Division",
      type: "practice",
      content: `# Safe Division

Create a function that safely divides two numbers.

## Task
Create \`safe_divide(a, b)\` that:
- Returns a / b if b is not zero
- Returns "Error: Division by zero" if b is zero

Test with safe_divide(10, 0)`,
      codeTemplate: `def safe_divide(a, b):
    # Use try-except to handle ZeroDivisionError
    pass

print(safe_divide(10, 0))`,
      solution: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Division by zero"

print(safe_divide(10, 0))`,
      testCases: [
        { input: "", expectedOutput: "Error: Division by zero", description: "Handles division by zero", points: 30 }
      ],
      hints: ["Wrap division in try block", "Return error message in except block"],
      order: 3,
      xpReward: 35,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Python Best Practices",
      type: "theory",
      content: `# Python Best Practices

## PEP 8 Style Guide
- Use 4 spaces for indentation
- Max line length: 79 characters
- Use snake_case for variables/functions
- Use PascalCase for classes
- Add docstrings to functions

## Code Quality
\`\`\`python
def calculate_area(radius):
    """Calculate the area of a circle.
    
    Args:
        radius: The radius of the circle
        
    Returns:
        The area of the circle
    """
    import math
    return math.pi * radius ** 2
\`\`\`

## Tips
- Keep functions small and focused
- Use meaningful variable names
- Don't repeat yourself (DRY)
- Handle errors appropriately
- Write tests for your code`,
      order: 4,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "python",
    },
    {
      title: "Final Python Challenge",
      type: "challenge",
      content: `# Final Python Challenge

Create a Student Grade Manager.

## Requirements
Create a function \`process_grades(grades_dict)\` that:
1. Takes a dictionary of student names and grades
2. Returns dictionary with:
   - "average": average of all grades
   - "highest": (name, grade) of highest
   - "lowest": (name, grade) of lowest

Test with: {"Alice": 85, "Bob": 92, "Charlie": 78}`,
      codeTemplate: `def process_grades(grades_dict):
    # Your code here
    pass

grades = {"Alice": 85, "Bob": 92, "Charlie": 78}
result = process_grades(grades)
print(f"Average: {result['average']}")
print(f"Highest: {result['highest']}")
print(f"Lowest: {result['lowest']}")`,
      solution: `def process_grades(grades_dict):
    avg = sum(grades_dict.values()) / len(grades_dict)
    highest = max(grades_dict.items(), key=lambda x: x[1])
    lowest = min(grades_dict.items(), key=lambda x: x[1])
    return {
        "average": avg,
        "highest": highest,
        "lowest": lowest
    }

grades = {"Alice": 85, "Bob": 92, "Charlie": 78}
result = process_grades(grades)
print(f"Average: {result['average']}")
print(f"Highest: {result['highest']}")
print(f"Lowest: {result['lowest']}")`,
      testCases: [
        { input: "", expectedOutput: "Average: 85.0", description: "Correct average", points: 20 },
        { input: "", expectedOutput: "Highest: ('Bob', 92)", description: "Correct highest", points: 20 },
        { input: "", expectedOutput: "Lowest: ('Charlie', 78)", description: "Correct lowest", points: 20 }
      ],
      hints: ["Use sum()/len() for average", "Use max() and min() with key parameter"],
      order: 5,
      xpReward: 75,
      estimatedMinutes: 25,
      language: "python",
    },
  ]);

  return courseId;
}

// ==========================================
// JAVASCRIPT MASTERY - 10 MODULES  
// ==========================================
async function seedJavaScriptCourse(ctx: SeedCtx) {
  const courseId = await ctx.db.insert("courses", {
    slug: "javascript-mastery",
    title: "JavaScript Mastery",
    description: "Master JavaScript from fundamentals to advanced concepts. Learn ES6+, DOM manipulation, async programming, and build interactive web applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    language: "javascript",
    difficulty: "beginner",
    totalLessons: 50,
    estimatedHours: 50,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: JavaScript Basics
  const jsMod1 = await ctx.db.insert("modules", {
    courseId,
    title: "JavaScript Basics",
    order: 1,
    summary: "Introduction to JavaScript, variables, and data types",
  });

  await createLessons(ctx, jsMod1, courseId, [
    {
      title: "What is JavaScript?",
      type: "theory",
      content: `# What is JavaScript?

JavaScript is the programming language of the web. It makes websites interactive and dynamic.

## Why JavaScript?
- **Universal**: Runs in every browser
- **Full-Stack**: Frontend and backend (Node.js)
- **Huge Ecosystem**: NPM, frameworks, libraries
- **In-Demand**: Most popular programming language

## What Can JavaScript Do?
- Change HTML content and styles
- React to user events (clicks, input)
- Validate form data
- Create animations
- Fetch data from servers
- Build complete web applications

## Where JavaScript Runs
\`\`\`javascript
// In the browser
console.log("Hello from browser!");

// In Node.js (server)
console.log("Hello from server!");
\`\`\``,
      order: 1,
      xpReward: 10,
      estimatedMinutes: 5,
      language: "javascript",
    },
    {
      title: "Variables: let, const, var",
      type: "theory",
      content: `# Variables in JavaScript

Variables store data values.

## Declaring Variables
\`\`\`javascript
let name = "Alice";    // Can be reassigned
const PI = 3.14159;    // Cannot be reassigned
var age = 25;          // Old way (avoid)
\`\`\`

## let vs const vs var
| | let | const | var |
|---|-----|-------|-----|
| Reassign | Yes | No | Yes |
| Block Scope | Yes | Yes | No |
| Hoisting | No | No | Yes |

## Best Practice
- Use \`const\` by default
- Use \`let\` when you need to reassign
- Avoid \`var\`

\`\`\`javascript
const MAX_SIZE = 100;  // Constant
let count = 0;         // Will change
count = count + 1;     // OK
// MAX_SIZE = 200;     // Error!
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 8,
      language: "javascript",
    },
    {
      title: "Data Types",
      type: "theory",
      content: `# JavaScript Data Types

## Primitive Types
\`\`\`javascript
// String
const name = "Alice";

// Number (integers and floats)
const age = 25;
const price = 19.99;

// Boolean
const isActive = true;

// Undefined
let x;  // undefined

// Null
const empty = null;

// Symbol (ES6)
const id = Symbol("id");

// BigInt (large integers)
const big = 9007199254740991n;
\`\`\`

## Checking Types
\`\`\`javascript
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (quirk)
typeof []         // "object"
typeof {}         // "object"
\`\`\``,
      order: 3,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Hello JavaScript",
      type: "practice",
      content: `# Hello JavaScript

Write your first JavaScript program!

## Task
1. Create a variable \`message\` with value "Hello, JavaScript!"
2. Print it using console.log()`,
      codeTemplate: `// Create your variable and print it

`,
      solution: `const message = "Hello, JavaScript!";
console.log(message);`,
      testCases: [
        { input: "", expectedOutput: "Hello, JavaScript!", description: "Prints message", points: 20 }
      ],
      hints: ["Use const for the variable", "Use console.log() to print"],
      order: 4,
      xpReward: 20,
      estimatedMinutes: 5,
      language: "javascript",
    },
    {
      title: "Type Conversion",
      type: "practice",
      content: `# Type Conversion

Convert between different data types.

## Task
Given \`str = "42"\` and \`num = 3.14159\`:
1. Convert str to a number and print
2. Convert num to an integer and print
3. Convert num to a string and print its type`,
      codeTemplate: `const str = "42";
const num = 3.14159;

// Convert str to number

// Convert num to integer

// Convert num to string and print typeof

`,
      solution: `const str = "42";
const num = 3.14159;

console.log(Number(str));
console.log(Math.floor(num));
console.log(typeof String(num));`,
      testCases: [
        { input: "", expectedOutput: "42", description: "String to number", points: 15 },
        { input: "", expectedOutput: "3", description: "Float to integer", points: 15 },
        { input: "", expectedOutput: "string", description: "Number to string type", points: 15 }
      ],
      hints: ["Use Number() to convert to number", "Use Math.floor() for integer", "Use String() and typeof"],
      order: 5,
      xpReward: 30,
      estimatedMinutes: 10,
      language: "javascript",
    },
  ]);

  // Module 2: Operators & Control Flow
  const jsMod2 = await ctx.db.insert("modules", {
    courseId,
    title: "Operators & Control Flow",
    order: 2,
    summary: "Learn operators, conditionals, and control flow statements",
  });

  await createLessons(ctx, jsMod2, courseId, [
    {
      title: "Operators",
      type: "theory",
      content: `# JavaScript Operators

## Arithmetic Operators
\`\`\`javascript
5 + 3   // 8 (addition)
5 - 3   // 2 (subtraction)
5 * 3   // 15 (multiplication)
5 / 3   // 1.666... (division)
5 % 3   // 2 (remainder)
5 ** 3  // 125 (exponentiation)
\`\`\`

## Comparison Operators
\`\`\`javascript
5 == "5"   // true (loose equality)
5 === "5"  // false (strict equality)
5 != "5"   // false
5 !== "5"  // true
5 > 3      // true
5 >= 5     // true
\`\`\`

## Logical Operators
\`\`\`javascript
true && false  // false (AND)
true || false  // true (OR)
!true          // false (NOT)
\`\`\`

## Nullish Coalescing (??)
\`\`\`javascript
null ?? "default"      // "default"
undefined ?? "default" // "default"
0 ?? "default"         // 0
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Conditional Statements",
      type: "theory",
      content: `# Conditional Statements

## if-else
\`\`\`javascript
const age = 18;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
\`\`\`

## if-else if-else
\`\`\`javascript
const score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C or below");
}
\`\`\`

## Ternary Operator
\`\`\`javascript
const status = age >= 18 ? "Adult" : "Minor";
\`\`\`

## Switch Statement
\`\`\`javascript
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  default:
    console.log("Regular day");
}
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Grade Calculator",
      type: "practice",
      content: `# Grade Calculator

Convert a numerical score to a letter grade.

## Grading Scale
- 90+: A
- 80-89: B
- 70-79: C
- 60-69: D
- Below 60: F

## Task
Given score = 85, print the letter grade.`,
      codeTemplate: `const score = 85;

// Write your conditional logic


`,
      solution: `const score = 85;

let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}
console.log(grade);`,
      testCases: [
        { input: "", expectedOutput: "B", description: "Score 85 = B", points: 30 }
      ],
      hints: ["Start with highest grade", "Use else if for ranges"],
      order: 3,
      xpReward: 30,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Truthy and Falsy",
      type: "theory",
      content: `# Truthy and Falsy Values

In JavaScript, values have inherent "truthiness".

## Falsy Values (evaluate to false)
\`\`\`javascript
false
0
-0
""  // empty string
null
undefined
NaN
\`\`\`

## Truthy Values (everything else)
\`\`\`javascript
true
42
"hello"
[]  // empty array
{}  // empty object
function() {}
\`\`\`

## Practical Use
\`\`\`javascript
const name = "";

if (name) {
  console.log("Name exists");
} else {
  console.log("Name is empty");
}

// Short-circuit evaluation
const displayName = name || "Anonymous";
\`\`\``,
      order: 4,
      xpReward: 15,
      estimatedMinutes: 8,
      language: "javascript",
    },
  ]);

  // Module 3: Functions
  const jsMod3 = await ctx.db.insert("modules", {
    courseId,
    title: "Functions",
    order: 3,
    summary: "Function declarations, expressions, arrow functions, and scope",
  });

  await createLessons(ctx, jsMod3, courseId, [
    {
      title: "Function Basics",
      type: "theory",
      content: `# Function Basics

Functions are reusable blocks of code.

## Function Declaration
\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice")); // Hello, Alice!
\`\`\`

## Function Expression
\`\`\`javascript
const greet = function(name) {
  return "Hello, " + name + "!";
};
\`\`\`

## Arrow Functions (ES6)
\`\`\`javascript
// Standard arrow function
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Concise (single expression)
const greet = name => "Hello, " + name + "!";

// Multiple parameters
const add = (a, b) => a + b;
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Parameters and Arguments",
      type: "theory",
      content: `# Parameters and Arguments

## Default Parameters
\`\`\`javascript
function greet(name = "World") {
  return "Hello, " + name + "!";
}

greet();        // Hello, World!
greet("Alice"); // Hello, Alice!
\`\`\`

## Rest Parameters
\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10
\`\`\`

## Destructuring Parameters
\`\`\`javascript
function printUser({ name, age }) {
  console.log(name + " is " + age);
}

printUser({ name: "Alice", age: 25 });
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Create a Calculator",
      type: "practice",
      content: `# Calculator Function

Create an arrow function calculator.

## Task
Create \`calculate(a, b, op)\` that:
- Returns a + b if op is "add"
- Returns a - b if op is "subtract"
- Returns a * b if op is "multiply"
- Returns a / b if op is "divide"

Test: calculate(10, 5, "multiply")`,
      codeTemplate: `const calculate = (a, b, op) => {
  // Your code here
};

console.log(calculate(10, 5, "multiply"));`,
      solution: `const calculate = (a, b, op) => {
  switch (op) {
    case "add": return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide": return a / b;
    default: return NaN;
  }
};

console.log(calculate(10, 5, "multiply"));`,
      testCases: [
        { input: "", expectedOutput: "50", description: "10 * 5 = 50", points: 30 }
      ],
      hints: ["Use switch statement or if-else", "Return the result of the operation"],
      order: 3,
      xpReward: 35,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Scope and Closures",
      type: "theory",
      content: `# Scope and Closures

## Scope Types
\`\`\`javascript
// Global scope
const global = "I'm global";

function outer() {
  // Function scope
  const outer = "I'm in outer";
  
  if (true) {
    // Block scope
    const block = "I'm in block";
  }
}
\`\`\`

## Closures
A closure is a function that remembers its outer scope.

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
\`\`\``,
      order: 4,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Higher-Order Functions",
      type: "practice",
      content: `# Higher-Order Functions

Functions that take or return functions.

## Task
Create a function \`multiplier(factor)\` that returns a function which multiplies its argument by factor.

Test: 
\`\`\`javascript
const double = multiplier(2);
console.log(double(5)); // Should print 10
\`\`\``,
      codeTemplate: `const multiplier = (factor) => {
  // Return a function
};

const double = multiplier(2);
console.log(double(5));`,
      solution: `const multiplier = (factor) => {
  return (num) => num * factor;
};

const double = multiplier(2);
console.log(double(5));`,
      testCases: [
        { input: "", expectedOutput: "10", description: "double(5) = 10", points: 35 }
      ],
      hints: ["Return a function from multiplier", "The inner function uses factor from outer scope"],
      order: 5,
      xpReward: 40,
      estimatedMinutes: 15,
      language: "javascript",
    },
  ]);

  // Module 4: Arrays & Objects
  const jsMod4 = await ctx.db.insert("modules", {
    courseId,
    title: "Arrays & Objects",
    order: 4,
    summary: "Work with arrays, array methods, and objects",
  });

  await createLessons(ctx, jsMod4, courseId, [
    {
      title: "Arrays",
      type: "theory",
      content: `# JavaScript Arrays

Arrays store multiple values in a single variable.

## Creating Arrays
\`\`\`javascript
const fruits = ["apple", "banana", "cherry"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null];
\`\`\`

## Accessing Elements
\`\`\`javascript
const fruits = ["apple", "banana", "cherry"];

fruits[0];      // "apple"
fruits[2];      // "cherry"
fruits.at(-1);  // "cherry" (last element)
fruits.length;  // 3
\`\`\`

## Modifying Arrays
\`\`\`javascript
fruits.push("date");     // Add to end
fruits.pop();            // Remove from end
fruits.unshift("mango"); // Add to start
fruits.shift();          // Remove from start
fruits.splice(1, 1);     // Remove at index
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Array Methods",
      type: "theory",
      content: `# Array Methods

## Iteration Methods
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// forEach - iterate
numbers.forEach(n => console.log(n));

// map - transform
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - select
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce - accumulate
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// find - first match
const found = numbers.find(n => n > 3);
// 4
\`\`\`

## Other Useful Methods
\`\`\`javascript
numbers.includes(3);      // true
numbers.indexOf(3);       // 2
numbers.some(n => n > 4); // true
numbers.every(n => n > 0);// true
numbers.sort();           // sorts in place
numbers.reverse();        // reverses
\`\`\``,
      order: 2,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Array Transformations",
      type: "practice",
      content: `# Array Transformations

Use array methods to transform data.

## Task
Given: numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
1. Filter to keep only even numbers
2. Double each number
3. Print the result`,
      codeTemplate: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter evens, then double them
const result = numbers
  // chain your methods here

console.log(result);`,
      solution: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

console.log(result);`,
      testCases: [
        { input: "", expectedOutput: "[ 4, 8, 12, 16, 20 ]", description: "Even numbers doubled", points: 35 }
      ],
      hints: ["Use .filter() first to get evens", "Chain .map() to double"],
      order: 3,
      xpReward: 40,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Objects",
      type: "theory",
      content: `# JavaScript Objects

Objects store key-value pairs.

## Creating Objects
\`\`\`javascript
const person = {
  name: "Alice",
  age: 25,
  isStudent: true,
  greet() {
    return "Hello!";
  }
};
\`\`\`

## Accessing Properties
\`\`\`javascript
person.name;        // "Alice"
person["age"];      // 25
person.greet();     // "Hello!"
\`\`\`

## Modifying Objects
\`\`\`javascript
person.email = "alice@mail.com"; // Add
person.age = 26;                  // Update
delete person.isStudent;          // Delete
\`\`\`

## Object Methods
\`\`\`javascript
Object.keys(person);   // ["name", "age", ...]
Object.values(person); // ["Alice", 25, ...]
Object.entries(person);// [["name","Alice"],...]
\`\`\``,
      order: 4,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Destructuring",
      type: "theory",
      content: `# Destructuring

Extract values from arrays and objects.

## Array Destructuring
\`\`\`javascript
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;

// Skip elements
const [, , last] = colors;

// Rest pattern
const [head, ...tail] = colors;
\`\`\`

## Object Destructuring
\`\`\`javascript
const person = { name: "Alice", age: 25 };

const { name, age } = person;

// With alias
const { name: userName } = person;

// With default
const { city = "Unknown" } = person;
\`\`\`

## In Function Parameters
\`\`\`javascript
function greet({ name, age }) {
  console.log(name + " is " + age);
}
\`\`\``,
      order: 5,
      xpReward: 20,
      estimatedMinutes: 10,
      language: "javascript",
    },
  ]);

  // Continue with remaining modules...
  // Module 5-10 would follow the same pattern
  
  // For brevity, I'll create shorter versions of the remaining modules
  
  // Module 5: Strings & String Methods
  const jsMod5 = await ctx.db.insert("modules", {
    courseId,
    title: "Strings & String Methods",
    order: 5,
    summary: "Work with strings, template literals, and string manipulation",
  });

  await createLessons(ctx, jsMod5, courseId, [
    {
      title: "String Basics",
      type: "theory",
      content: `# String Basics

## Creating Strings
\`\`\`javascript
const single = 'Hello';
const double = "World";
const template = \`Hello, \${name}\`;
\`\`\`

## Template Literals
\`\`\`javascript
const name = "Alice";
const age = 25;

// Old way
const msg1 = "Name: " + name + ", Age: " + age;

// Template literal
const msg2 = \`Name: \${name}, Age: \${age}\`;

// Multi-line
const html = \`
  <div>
    <h1>\${name}</h1>
  </div>
\`;
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 8,
      language: "javascript",
    },
    {
      title: "String Methods",
      type: "theory",
      content: `# String Methods

\`\`\`javascript
const str = "Hello, World!";

// Case
str.toUpperCase();    // "HELLO, WORLD!"
str.toLowerCase();    // "hello, world!"

// Search
str.indexOf("World"); // 7
str.includes("Hello");// true
str.startsWith("He"); // true
str.endsWith("!");    // true

// Extract
str.slice(0, 5);      // "Hello"
str.substring(7, 12); // "World"
str.split(", ");      // ["Hello", "World!"]

// Modify
str.replace("World", "JS"); // "Hello, JS!"
str.trim();           // removes whitespace
str.repeat(2);        // "Hello, World!Hello, World!"
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "String Manipulation",
      type: "practice",
      content: `# String Manipulation

## Task
Given: str = "  hello world  "
1. Trim whitespace
2. Capitalize first letter of each word (title case)
3. Print result`,
      codeTemplate: `const str = "  hello world  ";

// Trim and convert to title case

`,
      solution: `const str = "  hello world  ";

const result = str
  .trim()
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

console.log(result);`,
      testCases: [
        { input: "", expectedOutput: "Hello World", description: "Title case result", points: 35 }
      ],
      hints: ["Use .trim() first", "Split into words, capitalize each, join back"],
      order: 3,
      xpReward: 40,
      estimatedMinutes: 12,
      language: "javascript",
    },
  ]);

  // Module 6: DOM Manipulation
  const jsMod6 = await ctx.db.insert("modules", {
    courseId,
    title: "DOM Manipulation",
    order: 6,
    summary: "Select, modify, and create HTML elements with JavaScript",
  });

  await createLessons(ctx, jsMod6, courseId, [
    {
      title: "Selecting Elements",
      type: "theory",
      content: `# Selecting DOM Elements

## Query Selectors
\`\`\`javascript
// Single element
document.getElementById("myId");
document.querySelector(".myClass");
document.querySelector("#myId");

// Multiple elements
document.getElementsByClassName("myClass");
document.getElementsByTagName("div");
document.querySelectorAll(".myClass");
\`\`\`

## Examples
\`\`\`javascript
const button = document.querySelector("#submit-btn");
const items = document.querySelectorAll(".list-item");
const firstPara = document.querySelector("p");
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Modifying Elements",
      type: "theory",
      content: `# Modifying DOM Elements

## Content
\`\`\`javascript
element.textContent = "New text";
element.innerHTML = "<strong>Bold</strong>";
\`\`\`

## Attributes
\`\`\`javascript
element.setAttribute("class", "active");
element.getAttribute("href");
element.removeAttribute("disabled");

// Shorthand
element.id = "newId";
element.className = "new-class";
\`\`\`

## Styles
\`\`\`javascript
element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.display = "none";
\`\`\`

## Classes
\`\`\`javascript
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("visible");
element.classList.contains("active");
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Event Listeners",
      type: "theory",
      content: `# Event Listeners

## Adding Event Listeners
\`\`\`javascript
const button = document.querySelector("#myBtn");

button.addEventListener("click", function(event) {
  console.log("Clicked!");
});

// Arrow function
button.addEventListener("click", (e) => {
  console.log(e.target);
});
\`\`\`

## Common Events
\`\`\`javascript
// Mouse events
"click", "dblclick", "mouseenter", "mouseleave"

// Keyboard events
"keydown", "keyup", "keypress"

// Form events
"submit", "change", "input", "focus", "blur"

// Window events
"load", "resize", "scroll"
\`\`\`

## Event Object
\`\`\`javascript
button.addEventListener("click", (e) => {
  e.preventDefault();  // Prevent default
  e.stopPropagation(); // Stop bubbling
  e.target;            // Element clicked
});
\`\`\``,
      order: 3,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
  ]);

  // Module 7: Asynchronous JavaScript
  const jsMod7 = await ctx.db.insert("modules", {
    courseId,
    title: "Asynchronous JavaScript",
    order: 7,
    summary: "Callbacks, Promises, async/await, and fetching data",
  });

  await createLessons(ctx, jsMod7, courseId, [
    {
      title: "Callbacks",
      type: "theory",
      content: `# Callbacks

A callback is a function passed to another function.

## Basic Callback
\`\`\`javascript
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

greet("Alice", function() {
  console.log("Callback executed!");
});
\`\`\`

## Asynchronous Callbacks
\`\`\`javascript
console.log("Start");

setTimeout(() => {
  console.log("Delayed message");
}, 2000);

console.log("End");

// Output: Start, End, Delayed message
\`\`\`

## Callback Hell
\`\`\`javascript
// Nested callbacks become hard to read
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      // "Pyramid of doom"
    });
  });
});
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Promises",
      type: "theory",
      content: `# Promises

Promises represent eventual completion or failure.

## Creating Promises
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve("Operation successful!");
  } else {
    reject("Operation failed!");
  }
});
\`\`\`

## Using Promises
\`\`\`javascript
promise
  .then(result => console.log(result))
  .catch(error => console.log(error))
  .finally(() => console.log("Done"));
\`\`\`

## Promise Methods
\`\`\`javascript
// Wait for all
Promise.all([p1, p2, p3])
  .then(results => console.log(results));

// First to complete
Promise.race([p1, p2, p3])
  .then(result => console.log(result));
\`\`\``,
      order: 2,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Async/Await",
      type: "theory",
      content: `# Async/Await

Cleaner syntax for working with promises.

## Basic Syntax
\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
\`\`\`

## Arrow Function
\`\`\`javascript
const fetchData = async () => {
  const data = await fetch(url);
  return data.json();
};
\`\`\`

## Multiple Awaits
\`\`\`javascript
async function getAll() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  return { user, posts };
}

// Parallel execution
async function getAll() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return { user, posts };
}
\`\`\``,
      order: 3,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Fetch API",
      type: "practice",
      content: `# Fetch API Practice

Simulate fetching data with async/await.

## Task
Create an async function \`getData()\` that:
1. Returns a resolved promise with { id: 1, name: "Test" }
2. Logs the result

Note: We'll simulate since we can't make real HTTP requests.`,
      codeTemplate: `const getData = async () => {
  // Simulate API call with Promise.resolve
  
};

getData();`,
      solution: `const getData = async () => {
  const data = await Promise.resolve({ id: 1, name: "Test" });
  console.log(data);
  return data;
};

getData();`,
      testCases: [
        { input: "", expectedOutput: "{ id: 1, name: 'Test' }", description: "Returns mock data", points: 35 }
      ],
      hints: ["Use Promise.resolve() to simulate async data", "Use await and console.log"],
      order: 4,
      xpReward: 40,
      estimatedMinutes: 12,
      language: "javascript",
    },
  ]);

  // Module 8: ES6+ Features
  const jsMod8 = await ctx.db.insert("modules", {
    courseId,
    title: "ES6+ Features",
    order: 8,
    summary: "Modern JavaScript features: spread, rest, modules, classes",
  });

  await createLessons(ctx, jsMod8, courseId, [
    {
      title: "Spread and Rest",
      type: "theory",
      content: `# Spread and Rest Operators

## Spread Operator (...)
Expands an iterable into individual elements.

\`\`\`javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a:1,b:2,c:3}

// Function calls
Math.max(...[1, 5, 3]); // 5
\`\`\`

## Rest Parameters (...)
Collects remaining arguments into an array.

\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Classes",
      type: "theory",
      content: `# JavaScript Classes

ES6 introduced class syntax.

## Basic Class
\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}

const alice = new Person("Alice", 25);
console.log(alice.greet());
\`\`\`

## Inheritance
\`\`\`javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    return \`\${this.name} is studying\`;
  }
}
\`\`\`

## Static Methods
\`\`\`javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

MathHelper.add(2, 3); // 5
\`\`\``,
      order: 2,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Create a Class",
      type: "practice",
      content: `# Create a Rectangle Class

## Task
Create a Rectangle class with:
- Constructor taking width and height
- Method \`area()\` returning width * height
- Method \`perimeter()\` returning 2 * (width + height)

Test with Rectangle(5, 3)`,
      codeTemplate: `class Rectangle {
  // Your code here
}

const rect = new Rectangle(5, 3);
console.log(rect.area());
console.log(rect.perimeter());`,
      solution: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
  
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 3);
console.log(rect.area());
console.log(rect.perimeter());`,
      testCases: [
        { input: "", expectedOutput: "15", description: "Area = 15", points: 20 },
        { input: "", expectedOutput: "16", description: "Perimeter = 16", points: 20 }
      ],
      hints: ["Store width and height in constructor", "Use this.width and this.height in methods"],
      order: 3,
      xpReward: 40,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Modules",
      type: "theory",
      content: `# JavaScript Modules

## Exporting
\`\`\`javascript
// Named exports (utils.js)
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// Default export
export default class Calculator {
  // ...
}
\`\`\`

## Importing
\`\`\`javascript
// Named imports
import { PI, add } from './utils.js';

// Default import
import Calculator from './utils.js';

// All imports
import * as Utils from './utils.js';
Utils.PI;
Utils.add(1, 2);

// Rename import
import { add as sum } from './utils.js';
\`\`\``,
      order: 4,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
  ]);

  // Module 9: Error Handling & Debugging
  const jsMod9 = await ctx.db.insert("modules", {
    courseId,
    title: "Error Handling & Debugging",
    order: 9,
    summary: "Handle errors gracefully and debug effectively",
  });

  await createLessons(ctx, jsMod9, courseId, [
    {
      title: "Try-Catch",
      type: "theory",
      content: `# Error Handling

## Try-Catch
\`\`\`javascript
try {
  // Code that might throw
  const data = JSON.parse(invalidJson);
} catch (error) {
  console.error("Error:", error.message);
} finally {
  console.log("Always runs");
}
\`\`\`

## Throwing Errors
\`\`\`javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
\`\`\`

## Error Types
\`\`\`javascript
new Error("Generic error");
new TypeError("Type error");
new RangeError("Range error");
new SyntaxError("Syntax error");
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Safe Division",
      type: "practice",
      content: `# Safe Division Function

## Task
Create \`safeDivide(a, b)\` that:
- Returns a / b if b is not 0
- Returns "Error: Division by zero" if b is 0

Use try-catch.`,
      codeTemplate: `function safeDivide(a, b) {
  // Your code here
}

console.log(safeDivide(10, 0));`,
      solution: `function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return a / b;
  } catch (error) {
    return "Error: " + error.message;
  }
}

console.log(safeDivide(10, 0));`,
      testCases: [
        { input: "", expectedOutput: "Error: Division by zero", description: "Handles division by zero", points: 35 }
      ],
      hints: ["Throw error when b is 0", "Catch and return error message"],
      order: 2,
      xpReward: 35,
      estimatedMinutes: 10,
      language: "javascript",
    },
  ]);

  // Module 10: JavaScript Projects
  const jsMod10 = await ctx.db.insert("modules", {
    courseId,
    title: "JavaScript Projects",
    order: 10,
    summary: "Build practical projects to solidify your JavaScript skills",
  });

  await createLessons(ctx, jsMod10, courseId, [
    {
      title: "Project: Todo List Logic",
      type: "challenge",
      content: `# Todo List Logic

Create the logic for a todo list manager.

## Task
Create an object with:
- \`todos\` array
- \`add(task)\` method - adds task object {id, task, done: false}
- \`complete(id)\` method - marks task as done
- \`getAll()\` method - returns all todos

Test: Add "Learn JS", complete it, print all`,
      codeTemplate: `const todoManager = {
  todos: [],
  nextId: 1,
  
  add(task) {
    // Add task with id, task, done
  },
  
  complete(id) {
    // Mark task as done
  },
  
  getAll() {
    // Return all todos
  }
};

todoManager.add("Learn JavaScript");
todoManager.complete(1);
console.log(todoManager.getAll());`,
      solution: `const todoManager = {
  todos: [],
  nextId: 1,
  
  add(task) {
    this.todos.push({
      id: this.nextId++,
      task: task,
      done: false
    });
  },
  
  complete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.done = true;
  },
  
  getAll() {
    return this.todos;
  }
};

todoManager.add("Learn JavaScript");
todoManager.complete(1);
console.log(todoManager.getAll());`,
      testCases: [
        { input: "", expectedOutput: "id: 1", description: "Has task with id 1", points: 20 },
        { input: "", expectedOutput: "done: true", description: "Task is marked done", points: 30 }
      ],
      hints: ["Use this.todos to access the array", "Use find() to locate task by id"],
      order: 1,
      xpReward: 75,
      estimatedMinutes: 25,
      language: "javascript",
    },
  ]);

  return courseId;
}

// ==========================================
// MAIN SEED FUNCTION
// ==========================================
export const seedExpandedCourses = mutation({
  args: {},
  handler: async (ctx) => {
    const existingCourses = await ctx.db.query("courses").collect();
    
    const results: Record<string, boolean> = {};
    
    // Check and seed Python
    if (!existingCourses.some(c => c.slug === "python-fundamentals")) {
      await seedPythonCourse(ctx);
      results.python = true;
    }
    
    // Check and seed JavaScript
    if (!existingCourses.some(c => c.slug === "javascript-mastery")) {
      await seedJavaScriptCourse(ctx);
      results.javascript = true;
    }
    
    // Seed badges if not exist
    const existingBadges = await ctx.db.query("badges").collect();
    if (existingBadges.length === 0) {
      const badges = [
        { name: "First Steps", icon: "🌟", description: "Complete your first lesson", criteria: "lessons_completed >= 1", xpReward: 50, category: "completion" as const },
        { name: "Getting Started", icon: "🚀", description: "Complete 10 lessons", criteria: "lessons_completed >= 10", xpReward: 100, category: "completion" as const },
        { name: "Dedicated Learner", icon: "📚", description: "Complete 50 lessons", criteria: "lessons_completed >= 50", xpReward: 250, category: "completion" as const },
        { name: "Week Warrior", icon: "🔥", description: "Maintain a 7-day streak", criteria: "streak >= 7", xpReward: 150, category: "streak" as const },
        { name: "Month Master", icon: "💪", description: "Maintain a 30-day streak", criteria: "streak >= 30", xpReward: 500, category: "streak" as const },
        { name: "Speed Demon", icon: "⚡", description: "Complete a lesson in under 5 minutes", criteria: "fast_completion", xpReward: 75, category: "speed" as const },
        { name: "Perfect Score", icon: "🎯", description: "Get 100% on an exam", criteria: "perfect_exam", xpReward: 200, category: "skill" as const },
        { name: "Python Pioneer", icon: "🐍", description: "Complete the Python course", criteria: "course_python", xpReward: 500, category: "completion" as const },
        { name: "JavaScript Ninja", icon: "⚔️", description: "Complete the JavaScript course", criteria: "course_javascript", xpReward: 500, category: "completion" as const },
        { name: "TypeScript Pro", icon: "📘", description: "Complete the TypeScript course", criteria: "course_typescript", xpReward: 500, category: "completion" as const },
        { name: "React Ranger", icon: "⚛️", description: "Complete the React course", criteria: "course_react", xpReward: 500, category: "completion" as const },
        { name: "Node Master", icon: "🟢", description: "Complete the Node.js course", criteria: "course_nodejs", xpReward: 500, category: "completion" as const },
        { name: "SQL Expert", icon: "🗄️", description: "Complete the SQL course", criteria: "course_sql", xpReward: 500, category: "completion" as const },
        { name: "Algorithm Ace", icon: "🧮", description: "Complete the DSA course", criteria: "course_dsa", xpReward: 500, category: "completion" as const },
        { name: "Git Guru", icon: "📦", description: "Complete the Git course", criteria: "course_git", xpReward: 500, category: "completion" as const },
      ];
      
      for (const badge of badges) {
        await ctx.db.insert("badges", badge);
      }
      results.badges = true;
    }
    
    return results;
  },
});

// Export for clearing and reseeding
export const clearAndReseed = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete all existing lessons
    const lessons = await ctx.db.query("lessons").collect();
    for (const lesson of lessons) {
      await ctx.db.delete(lesson._id);
    }
    
    // Delete all existing modules
    const modules = await ctx.db.query("modules").collect();
    for (const mod of modules) {
      await ctx.db.delete(mod._id);
    }
    
    // Delete all existing courses
    const courses = await ctx.db.query("courses").collect();
    for (const course of courses) {
      await ctx.db.delete(course._id);
    }
    
    // Now seed fresh
    await seedPythonCourse(ctx);
    await seedJavaScriptCourse(ctx);
    
    return { success: true, message: "Cleared and reseeded courses" };
  },
});
