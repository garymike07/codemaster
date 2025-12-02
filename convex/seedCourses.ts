import { mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";

type SeedCtx = MutationCtx;

export const seedAllCourses = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if courses already exist
    const existingCourses = await ctx.db.query("courses").collect();
    const hasPython = existingCourses.some(c => c.slug === "python-fundamentals");
    const hasJS = existingCourses.some(c => c.slug === "javascript-mastery");
    const hasReact = existingCourses.some(c => c.slug === "react-development");

    const results = { python: false, javascript: false, react: false };

    if (!hasPython) {
      await seedPythonCourse(ctx);
      results.python = true;
    } else {
      // Update Python course if it exists
      const pythonCourse = existingCourses.find(c => c.slug === "python-fundamentals");
      if (pythonCourse) {
         await ctx.db.patch(pythonCourse._id, {
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
         });
         results.python = true;
      }
    }
    if (!hasJS) {
      await seedJavaScriptCourse(ctx);
      results.javascript = true;
    } else {
       // Update JS course if it exists
       const jsCourse = existingCourses.find(c => c.slug === "javascript-mastery");
       if (jsCourse) {
          await ctx.db.patch(jsCourse._id, {
             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
          });
          results.javascript = true;
       }
    }
    if (!hasReact) {
      await seedReactCourse(ctx);
      results.react = true;
    } else {
       // Update React course if it exists
       const reactCourse = existingCourses.find(c => c.slug === "react-development");
       if (reactCourse) {
          await ctx.db.patch(reactCourse._id, {
             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          });
          results.react = true;
       }
    }

    // Seed badges if not exist
    const existingBadges = await ctx.db.query("badges").collect();
    if (existingBadges.length === 0) {
      await seedBadges(ctx);
    }

    return results;
  },
});

async function seedBadges(ctx: SeedCtx) {
  const badges = [
    { name: "First Steps", icon: "🌟", description: "Complete your first lesson", criteria: "lessons_completed >= 1", xpReward: 50, category: "completion" as const },
    { name: "Getting Started", icon: "🚀", description: "Complete 10 lessons", criteria: "lessons_completed >= 10", xpReward: 100, category: "completion" as const },
    { name: "Dedicated Learner", icon: "📚", description: "Complete 50 lessons", criteria: "lessons_completed >= 50", xpReward: 250, category: "completion" as const },
    { name: "Week Warrior", icon: "🔥", description: "Maintain a 7-day streak", criteria: "streak >= 7", xpReward: 150, category: "streak" as const },
    { name: "Month Master", icon: "💪", description: "Maintain a 30-day streak", criteria: "streak >= 30", xpReward: 500, category: "streak" as const },
    { name: "Speed Demon", icon: "⚡", description: "Complete a lesson in under 5 minutes", criteria: "fast_completion", xpReward: 75, category: "speed" as const },
    { name: "Perfect Score", icon: "🎯", description: "Get 100% on an exam", criteria: "perfect_exam", xpReward: 200, category: "skill" as const },
    { name: "Bug Crusher", icon: "🐛", description: "Fix 25 code errors", criteria: "errors_fixed >= 25", xpReward: 150, category: "skill" as const },
    { name: "Python Pioneer", icon: "🐍", description: "Complete the Python course", criteria: "course_python", xpReward: 500, category: "completion" as const },
    { name: "JavaScript Ninja", icon: "⚔️", description: "Complete the JavaScript course", criteria: "course_javascript", xpReward: 500, category: "completion" as const },
    { name: "React Ranger", icon: "⚛️", description: "Complete the React course", criteria: "course_react", xpReward: 500, category: "completion" as const },
    { name: "Challenge Champion", icon: "🏆", description: "Complete 20 coding challenges", criteria: "challenges_completed >= 20", xpReward: 300, category: "skill" as const },
  ];

  for (const badge of badges) {
    await ctx.db.insert("badges", badge);
  }
}

async function seedPythonCourse(ctx: SeedCtx) {
  const courseId = await ctx.db.insert("courses", {
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    description: "Master Python from basics to advanced concepts. Learn variables, data structures, functions, OOP, and build real projects.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    language: "python",
    difficulty: "beginner",
    totalLessons: 35,
    estimatedHours: 40,
    isPublished: true,
  });

  // Module 1: Getting Started
  const mod1 = await ctx.db.insert("modules", {
    courseId,
    title: "Getting Started with Python",
    order: 1,
    summary: "Introduction to Python programming and setting up your environment",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
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
5. **Game Development** - Pygame

Let's start your Python journey!`,
    order: 1,
    xpReward: 10,
    estimatedMinutes: 5,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Your First Python Program",
    type: "practice",
    content: `# Your First Python Program

Let's write your first Python program - the classic "Hello, World!"

## The print() Function

The \`print()\` function displays output to the console. It's one of the most commonly used functions in Python.

\`\`\`python
print("Hello, World!")
\`\`\`

## Instructions

1. Use the \`print()\` function to display "Hello, World!"
2. Make sure to include the quotation marks around the text
3. Click "Run" to see your output`,
    codeTemplate: `# Write your first Python program
# Print "Hello, World!" to the console

`,
    solution: `print("Hello, World!")`,
    testCases: [
      { input: "", expectedOutput: "Hello, World!", description: "Should print Hello, World!", points: 10 }
    ],
    hints: [
      "Use the print() function",
      "Put your text inside quotation marks",
      "The correct syntax is: print(\"Hello, World!\")"
    ],
    order: 2,
    xpReward: 20,
    estimatedMinutes: 5,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Variables and Data Types",
    type: "theory",
    content: `# Variables and Data Types

Variables are containers for storing data values. Python has several built-in data types.

## Creating Variables

\`\`\`python
name = "Alice"      # String
age = 25            # Integer
height = 5.9        # Float
is_student = True   # Boolean
\`\`\`

## Data Types

| Type | Example | Description |
|------|---------|-------------|
| str | "Hello" | Text/strings |
| int | 42 | Whole numbers |
| float | 3.14 | Decimal numbers |
| bool | True/False | Boolean values |
| list | [1, 2, 3] | Ordered collection |
| dict | {"a": 1} | Key-value pairs |

## Type Checking

\`\`\`python
x = 10
print(type(x))  # <class 'int'>
\`\`\`

## Variable Naming Rules

- Must start with a letter or underscore
- Can contain letters, numbers, underscores
- Case-sensitive (age and Age are different)
- Cannot use Python keywords`,
    order: 3,
    xpReward: 15,
    estimatedMinutes: 8,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Working with Variables",
    type: "practice",
    content: `# Working with Variables

Practice creating and using variables in Python.

## Task

Create variables to store:
1. Your name (string)
2. Your age (integer)  
3. Your height in meters (float)

Then print a sentence using these variables.

## Expected Output
The output should be in this format:
\`My name is [name], I am [age] years old and [height]m tall.\``,
    codeTemplate: `# Create your variables below
name = ""  # Your name as a string
age = 0    # Your age as an integer
height = 0.0  # Your height as a float

# Print the formatted sentence
# Use an f-string: f"text {variable} more text"
`,
    solution: `name = "Alice"
age = 25
height = 1.75
print(f"My name is {name}, I am {age} years old and {height}m tall.")`,
    testCases: [
      { input: "", expectedOutput: "My name is", description: "Should include 'My name is'", isHidden: false, points: 5 },
      { input: "", expectedOutput: "years old", description: "Should include 'years old'", isHidden: false, points: 5 },
      { input: "", expectedOutput: "m tall", description: "Should include height", isHidden: true, points: 5 }
    ],
    hints: [
      "Use f-strings for formatted output: f\"text {variable}\"",
      "Make sure name is in quotes, age is a number, height is a decimal",
      "The print statement should combine all three variables in one sentence"
    ],
    order: 4,
    xpReward: 25,
    estimatedMinutes: 10,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Basic Operations Challenge",
    type: "challenge",
    content: `# Challenge: Basic Calculator

Create a simple calculator that performs basic arithmetic operations.

## Requirements

1. Create two variables \`a\` and \`b\` with values 15 and 4
2. Calculate and print:
   - Sum (a + b)
   - Difference (a - b)
   - Product (a * b)
   - Quotient (a / b)
   - Integer division (a // b)
   - Remainder (a % b)

## Expected Output Format
\`\`\`
Sum: 19
Difference: 11
Product: 60
Quotient: 3.75
Integer Division: 3
Remainder: 3
\`\`\``,
    codeTemplate: `# Basic Calculator Challenge
a = 15
b = 4

# Calculate and print each operation
# Format: print(f"Operation: {result}")

`,
    solution: `a = 15
b = 4

print(f"Sum: {a + b}")
print(f"Difference: {a - b}")
print(f"Product: {a * b}")
print(f"Quotient: {a / b}")
print(f"Integer Division: {a // b}")
print(f"Remainder: {a % b}")`,
    testCases: [
      { input: "", expectedOutput: "Sum: 19", description: "Correct sum", points: 15 },
      { input: "", expectedOutput: "Difference: 11", description: "Correct difference", points: 15 },
      { input: "", expectedOutput: "Product: 60", description: "Correct product", points: 15 },
      { input: "", expectedOutput: "Quotient: 3.75", description: "Correct quotient", points: 15 },
      { input: "", expectedOutput: "Integer Division: 3", description: "Correct integer division", isHidden: true, points: 20 },
      { input: "", expectedOutput: "Remainder: 3", description: "Correct remainder", isHidden: true, points: 20 }
    ],
    hints: [
      "Use + for addition, - for subtraction",
      "Use * for multiplication, / for division",
      "Use // for integer division and % for remainder (modulo)"
    ],
    order: 5,
    xpReward: 50,
    estimatedMinutes: 15,
    language: "python",
  });

  // Module 2: Control Flow
  const mod2 = await ctx.db.insert("modules", {
    courseId,
    title: "Control Flow",
    order: 2,
    summary: "Learn how to control the flow of your programs with conditions and loops",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod2,
    courseId,
    title: "Conditional Statements",
    type: "theory",
    content: `# Conditional Statements

Conditional statements allow your program to make decisions based on conditions.

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
print(f"Your grade: {grade}")
\`\`\`

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| == | Equal to |
| != | Not equal to |
| > | Greater than |
| < | Less than |
| >= | Greater than or equal |
| <= | Less than or equal |

## Logical Operators

- \`and\` - Both conditions must be True
- \`or\` - At least one condition must be True
- \`not\` - Reverses the boolean value`,
    order: 1,
    xpReward: 15,
    estimatedMinutes: 10,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod2,
    courseId,
    title: "Grade Calculator",
    type: "practice",
    content: `# Grade Calculator

Create a program that converts a numerical score to a letter grade.

## Grading Scale
- 90-100: A
- 80-89: B
- 70-79: C
- 60-69: D
- Below 60: F

## Task
Given a score variable, print the corresponding letter grade.`,
    codeTemplate: `score = 85

# Write your if-elif-else statement here
# Print the grade in format: "Grade: X"

`,
    solution: `score = 85

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
      { input: "", expectedOutput: "Grade: B", description: "Score 85 should be B", points: 25 }
    ],
    hints: [
      "Start with the highest grade condition first",
      "Use elif for additional conditions",
      "Use else for the final catch-all case"
    ],
    order: 2,
    xpReward: 30,
    estimatedMinutes: 12,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod2,
    courseId,
    title: "Loops in Python",
    type: "theory",
    content: `# Loops in Python

Loops allow you to repeat code multiple times.

## for Loop

Used to iterate over a sequence (list, string, range, etc.)

\`\`\`python
# Loop through a range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## while Loop

Repeats as long as a condition is True

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Loop Control

- \`break\` - Exit the loop early
- \`continue\` - Skip to next iteration
- \`pass\` - Do nothing (placeholder)

\`\`\`python
for i in range(10):
    if i == 3:
        continue  # Skip 3
    if i == 7:
        break     # Stop at 7
    print(i)
\`\`\`

## range() Function

\`\`\`python
range(5)        # 0, 1, 2, 3, 4
range(2, 8)     # 2, 3, 4, 5, 6, 7
range(0, 10, 2) # 0, 2, 4, 6, 8
\`\`\``,
    order: 3,
    xpReward: 15,
    estimatedMinutes: 10,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod2,
    courseId,
    title: "FizzBuzz Challenge",
    type: "challenge",
    content: `# FizzBuzz Challenge

FizzBuzz is a classic programming challenge!

## Rules
For numbers 1 to 20:
- If divisible by 3, print "Fizz"
- If divisible by 5, print "Buzz"
- If divisible by both 3 and 5, print "FizzBuzz"
- Otherwise, print the number

## Expected Output (first 15 lines)
\`\`\`
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
\`\`\``,
    codeTemplate: `# FizzBuzz Challenge
# Loop through numbers 1 to 20

`,
    solution: `for i in range(1, 21):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
    testCases: [
      { input: "", expectedOutput: "FizzBuzz", description: "Should print FizzBuzz for 15", points: 25 },
      { input: "", expectedOutput: "Fizz", description: "Should print Fizz for multiples of 3", points: 25 },
      { input: "", expectedOutput: "Buzz", description: "Should print Buzz for multiples of 5", points: 25 },
      { input: "", expectedOutput: "1", description: "Should print 1", isHidden: true, points: 25 }
    ],
    hints: [
      "Check for divisibility by both 3 AND 5 first",
      "Use the modulo operator % to check divisibility",
      "Remember: range(1, 21) gives you 1 through 20"
    ],
    order: 4,
    xpReward: 75,
    estimatedMinutes: 20,
    language: "python",
  });

  // Module 3: Functions
  const mod3 = await ctx.db.insert("modules", {
    courseId,
    title: "Functions",
    order: 3,
    summary: "Learn to write reusable code with functions",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod3,
    courseId,
    title: "Introduction to Functions",
    type: "theory",
    content: `# Introduction to Functions

Functions are reusable blocks of code that perform specific tasks.

## Defining a Function

\`\`\`python
def greet():
    print("Hello!")

greet()  # Call the function
\`\`\`

## Functions with Parameters

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
greet("Python") # Hello, Python!
\`\`\`

## Multiple Return Values

\`\`\`python
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

minimum, maximum, total = get_stats([1, 2, 3, 4, 5])
\`\`\`

## Why Use Functions?

1. **Reusability** - Write once, use many times
2. **Organization** - Break code into logical pieces
3. **Testing** - Easier to test individual functions
4. **Readability** - Self-documenting code`,
    order: 1,
    xpReward: 15,
    estimatedMinutes: 10,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod3,
    courseId,
    title: "Create a Calculator Function",
    type: "practice",
    content: `# Create a Calculator Function

Write a function that performs basic math operations.

## Task

Create a function called \`calculate\` that:
1. Takes three parameters: \`a\`, \`b\`, and \`operation\`
2. Returns the result based on the operation:
   - "add" → a + b
   - "subtract" → a - b
   - "multiply" → a * b
   - "divide" → a / b

## Example Usage
\`\`\`python
print(calculate(10, 5, "add"))      # 15
print(calculate(10, 5, "subtract")) # 5
print(calculate(10, 5, "multiply")) # 50
print(calculate(10, 5, "divide"))   # 2.0
\`\`\``,
    codeTemplate: `def calculate(a, b, operation):
    # Your code here
    pass

# Test your function
print(calculate(10, 5, "add"))
print(calculate(10, 5, "subtract"))
print(calculate(10, 5, "multiply"))
print(calculate(10, 5, "divide"))`,
    solution: `def calculate(a, b, operation):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        return a / b

print(calculate(10, 5, "add"))
print(calculate(10, 5, "subtract"))
print(calculate(10, 5, "multiply"))
print(calculate(10, 5, "divide"))`,
    testCases: [
      { input: "", expectedOutput: "15", description: "10 + 5 = 15", points: 25 },
      { input: "", expectedOutput: "5", description: "10 - 5 = 5", points: 25 },
      { input: "", expectedOutput: "50", description: "10 * 5 = 50", points: 25 },
      { input: "", expectedOutput: "2.0", description: "10 / 5 = 2.0", points: 25 }
    ],
    hints: [
      "Use if-elif statements to check the operation",
      "Make sure to return the result, not print it",
      "String comparison uses == just like numbers"
    ],
    order: 2,
    xpReward: 35,
    estimatedMinutes: 15,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod3,
    courseId,
    title: "Recursive Functions",
    type: "challenge",
    content: `# Challenge: Factorial with Recursion

Write a recursive function to calculate factorial.

## What is Factorial?

n! = n × (n-1) × (n-2) × ... × 1

Examples:
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- 3! = 3 × 2 × 1 = 6
- 0! = 1 (by definition)

## What is Recursion?

A function that calls itself to solve smaller subproblems.

\`\`\`python
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)
\`\`\`

## Task

Implement the factorial function and test it with values 0, 1, 5, and 7.`,
    codeTemplate: `def factorial(n):
    # Implement the factorial function recursively
    pass

# Test cases
print(factorial(0))  # Expected: 1
print(factorial(1))  # Expected: 1
print(factorial(5))  # Expected: 120
print(factorial(7))  # Expected: 5040`,
    solution: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(0))
print(factorial(1))
print(factorial(5))
print(factorial(7))`,
    testCases: [
      { input: "", expectedOutput: "1", description: "factorial(0) = 1", points: 20 },
      { input: "", expectedOutput: "120", description: "factorial(5) = 120", points: 30 },
      { input: "", expectedOutput: "5040", description: "factorial(7) = 5040", isHidden: true, points: 50 }
    ],
    hints: [
      "Base case: factorial of 0 or 1 is 1",
      "Recursive case: n! = n × (n-1)!",
      "The function calls itself with a smaller value"
    ],
    order: 3,
    xpReward: 60,
    estimatedMinutes: 20,
    language: "python",
  });

  // Module 4: Data Structures
  const mod4 = await ctx.db.insert("modules", {
    courseId,
    title: "Data Structures",
    order: 4,
    summary: "Master Python's built-in data structures: lists, dictionaries, tuples, and sets",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod4,
    courseId,
    title: "Lists in Python",
    type: "theory",
    content: `# Lists in Python

Lists are ordered, mutable collections that can hold any type of data.

## Creating Lists

\`\`\`python
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]
empty = []
\`\`\`

## Accessing Elements

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])   # "apple" (first)
print(fruits[-1])  # "cherry" (last)
print(fruits[1:3]) # ["banana", "cherry"] (slice)
\`\`\`

## List Methods

| Method | Description |
|--------|-------------|
| append(x) | Add item to end |
| insert(i, x) | Insert at index |
| remove(x) | Remove first occurrence |
| pop(i) | Remove and return item |
| sort() | Sort in place |
| reverse() | Reverse in place |
| len(list) | Get length |

## List Comprehension

\`\`\`python
# Create a list of squares
squares = [x**2 for x in range(1, 6)]
# [1, 4, 9, 16, 25]

# Filter even numbers
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]
\`\`\``,
    order: 1,
    xpReward: 15,
    estimatedMinutes: 10,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod4,
    courseId,
    title: "List Operations Practice",
    type: "practice",
    content: `# List Operations Practice

Practice common list operations.

## Task

Given a list of numbers:
1. Add 6 to the end of the list
2. Insert 0 at the beginning
3. Remove the number 3
4. Sort the list
5. Print the final list

Starting list: [1, 5, 3, 2, 4]
Expected output: [0, 1, 2, 4, 5, 6]`,
    codeTemplate: `numbers = [1, 5, 3, 2, 4]

# 1. Add 6 to the end

# 2. Insert 0 at the beginning

# 3. Remove the number 3

# 4. Sort the list

# 5. Print the final list
print(numbers)`,
    solution: `numbers = [1, 5, 3, 2, 4]

numbers.append(6)
numbers.insert(0, 0)
numbers.remove(3)
numbers.sort()

print(numbers)`,
    testCases: [
      { input: "", expectedOutput: "[0, 1, 2, 4, 5, 6]", description: "Correct final list", points: 100 }
    ],
    hints: [
      "Use append() to add to the end",
      "Use insert(index, value) to insert at a specific position",
      "Use remove(value) to remove by value, sort() to sort"
    ],
    order: 2,
    xpReward: 30,
    estimatedMinutes: 10,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod4,
    courseId,
    title: "Dictionaries",
    type: "theory",
    content: `# Dictionaries in Python

Dictionaries store data in key-value pairs.

## Creating Dictionaries

\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Or using dict()
person = dict(name="Alice", age=25, city="New York")
\`\`\`

## Accessing Values

\`\`\`python
person = {"name": "Alice", "age": 25}

print(person["name"])      # "Alice"
print(person.get("age"))   # 25
print(person.get("job", "Unknown"))  # "Unknown" (default)
\`\`\`

## Dictionary Methods

\`\`\`python
# Add or update
person["email"] = "alice@email.com"

# Remove
del person["age"]
email = person.pop("email")

# Loop through
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

## Dictionary Comprehension

\`\`\`python
squares = {x: x**2 for x in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
\`\`\``,
    order: 3,
    xpReward: 15,
    estimatedMinutes: 10,
    language: "python",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod4,
    courseId,
    title: "Student Records Challenge",
    type: "challenge",
    content: `# Challenge: Student Records

Create a program to manage student records using dictionaries.

## Requirements

1. Create a dictionary for a student with: name, age, grades (list), and city
2. Calculate the average grade
3. Add a new grade of 95 to the grades list
4. Print the student's name and their average grade

## Expected Output Format
\`\`\`
Student: [name]
Average Grade: [average]
\`\`\``,
    codeTemplate: `# Create student dictionary
student = {
    # Add: name, age, grades (list of numbers), city
}

# Calculate average grade

# Add new grade of 95

# Print results`,
    solution: `student = {
    "name": "Alice",
    "age": 20,
    "grades": [85, 90, 78, 92],
    "city": "Boston"
}

student["grades"].append(95)
average = sum(student["grades"]) / len(student["grades"])

print(f"Student: {student['name']}")
print(f"Average Grade: {average}")`,
    testCases: [
      { input: "", expectedOutput: "Student:", description: "Should print student name", points: 30 },
      { input: "", expectedOutput: "Average Grade:", description: "Should print average", points: 30 },
      { input: "", expectedOutput: "95", description: "Should include grade 95", isHidden: true, points: 40 }
    ],
    hints: [
      "Use a list for grades: 'grades': [85, 90, 78]",
      "Calculate average: sum(grades) / len(grades)",
      "Append to grades list: student['grades'].append(95)"
    ],
    order: 4,
    xpReward: 60,
    estimatedMinutes: 20,
    language: "python",
  });
}

async function seedJavaScriptCourse(ctx: SeedCtx) {
  const courseId = await ctx.db.insert("courses", {
    slug: "javascript-mastery",
    title: "JavaScript Mastery",
    description: "Complete JavaScript course from fundamentals to advanced concepts. Master ES6+, DOM manipulation, async programming, and modern JS patterns.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    language: "javascript",
    difficulty: "beginner",
    totalLessons: 40,
    estimatedHours: 50,
    isPublished: true,
  });

  // Module 1: JavaScript Basics
  const mod1 = await ctx.db.insert("modules", {
    courseId,
    title: "JavaScript Fundamentals",
    order: 1,
    summary: "Learn the building blocks of JavaScript programming",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Introduction to JavaScript",
    type: "theory",
    content: `# Introduction to JavaScript

JavaScript is the programming language of the web. It powers interactive websites, web applications, servers, and even mobile apps.

## What is JavaScript?

- Created by Brendan Eich in 1995 (in just 10 days!)
- Originally designed for web browsers
- Now runs everywhere: browsers, servers (Node.js), mobile apps

## JavaScript Can Do

1. **Manipulate Web Pages** - Change HTML and CSS dynamically
2. **Handle Events** - Respond to clicks, inputs, scrolling
3. **Fetch Data** - Communicate with servers (APIs)
4. **Build Full Applications** - Frontend and backend

## Where JavaScript Runs

\`\`\`javascript
// In the browser
console.log("Hello from the browser!");

// In Node.js (server)
console.log("Hello from the server!");
\`\`\`

## Why Learn JavaScript?

- Most popular programming language
- Essential for web development
- Huge ecosystem of libraries and frameworks
- Great career opportunities`,
    order: 1,
    xpReward: 10,
    estimatedMinutes: 5,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Variables: let, const, var",
    type: "theory",
    content: `# Variables in JavaScript

Variables store data that can be used and modified in your program.

## Declaring Variables

\`\`\`javascript
// const - for values that won't change
const PI = 3.14159;
const name = "Alice";

// let - for values that will change
let score = 0;
score = 10; // OK

// var - old way, avoid using
var oldStyle = "legacy";
\`\`\`

## Best Practices

1. **Use const by default** - Prevents accidental reassignment
2. **Use let when needed** - Only when value will change
3. **Avoid var** - Has scoping issues

## Data Types

\`\`\`javascript
// Primitives
const string = "Hello";
const number = 42;
const decimal = 3.14;
const boolean = true;
const nothing = null;
const notDefined = undefined;

// Objects
const array = [1, 2, 3];
const object = { name: "Alice", age: 25 };
\`\`\`

## typeof Operator

\`\`\`javascript
console.log(typeof "hello");  // "string"
console.log(typeof 42);       // "number"
console.log(typeof true);     // "boolean"
console.log(typeof []);       // "object"
\`\`\``,
    order: 2,
    xpReward: 15,
    estimatedMinutes: 8,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Working with Variables",
    type: "practice",
    content: `# Working with Variables

Practice declaring and using variables in JavaScript.

## Task

1. Create a constant \`greeting\` with value "Hello"
2. Create a variable \`count\` with initial value 0
3. Increment count by 1
4. Create an object \`person\` with name and age
5. Log a message combining greeting and person's name

## Expected Output
\`\`\`
Hello, Alice!
Count: 1
\`\`\``,
    codeTemplate: `// 1. Create constant greeting


// 2. Create variable count


// 3. Increment count


// 4. Create person object


// 5. Log the greeting and count
console.log();
console.log();`,
    solution: `const greeting = "Hello";
let count = 0;
count++;
const person = { name: "Alice", age: 25 };

console.log(\`\${greeting}, \${person.name}!\`);
console.log(\`Count: \${count}\`);`,
    testCases: [
      { input: "", expectedOutput: "Hello, Alice!", description: "Greeting with name", points: 50 },
      { input: "", expectedOutput: "Count: 1", description: "Count incremented", points: 50 }
    ],
    hints: [
      "Use const for values that won't change",
      "Use template literals: `${variable}`",
      "Increment with count++ or count += 1"
    ],
    order: 3,
    xpReward: 25,
    estimatedMinutes: 10,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Functions in JavaScript",
    type: "theory",
    content: `# Functions in JavaScript

Functions are reusable blocks of code.

## Function Declaration

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

## Arrow Functions (ES6+)

\`\`\`javascript
// Arrow function syntax
const greet = (name) => {
    return \`Hello, \${name}!\`;
};

// Short form (implicit return)
const greet = (name) => \`Hello, \${name}!\`;

// Single parameter (no parentheses needed)
const double = n => n * 2;
\`\`\`

## Default Parameters

\`\`\`javascript
const greet = (name = "World") => \`Hello, \${name}!\`;

greet();        // "Hello, World!"
greet("Alice"); // "Hello, Alice!"
\`\`\`

## Rest Parameters

\`\`\`javascript
const sum = (...numbers) => {
    return numbers.reduce((a, b) => a + b, 0);
};

sum(1, 2, 3, 4); // 10
\`\`\`

## Destructuring Parameters

\`\`\`javascript
const printUser = ({ name, age }) => {
    console.log(\`\${name} is \${age} years old\`);
};

printUser({ name: "Alice", age: 25 });
\`\`\``,
    order: 4,
    xpReward: 15,
    estimatedMinutes: 10,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Arrow Functions Challenge",
    type: "challenge",
    content: `# Challenge: Arrow Functions

Convert traditional functions to arrow functions and create new ones.

## Tasks

1. Create an arrow function \`square\` that returns the square of a number
2. Create an arrow function \`isEven\` that returns true if number is even
3. Create an arrow function \`getFullName\` that takes first and last name and returns full name
4. Test all functions and log the results

## Expected Output
\`\`\`
Square of 5: 25
Is 4 even? true
Full name: John Doe
\`\`\``,
    codeTemplate: `// 1. square function


// 2. isEven function


// 3. getFullName function


// Test your functions
console.log(\`Square of 5: \${square(5)}\`);
console.log(\`Is 4 even? \${isEven(4)}\`);
console.log(\`Full name: \${getFullName("John", "Doe")}\`);`,
    solution: `const square = n => n * n;
const isEven = n => n % 2 === 0;
const getFullName = (first, last) => \`\${first} \${last}\`;

console.log(\`Square of 5: \${square(5)}\`);
console.log(\`Is 4 even? \${isEven(4)}\`);
console.log(\`Full name: \${getFullName("John", "Doe")}\`);`,
    testCases: [
      { input: "", expectedOutput: "Square of 5: 25", description: "Square function works", points: 30 },
      { input: "", expectedOutput: "Is 4 even? true", description: "isEven returns true", points: 30 },
      { input: "", expectedOutput: "Full name: John Doe", description: "Full name combined", points: 40 }
    ],
    hints: [
      "For single expressions, you can omit the braces and return",
      "Use modulo % to check even: n % 2 === 0",
      "Template literals make string concatenation easy"
    ],
    order: 5,
    xpReward: 50,
    estimatedMinutes: 15,
    language: "javascript",
  });

  // Module 2: Arrays and Objects
  const mod2 = await ctx.db.insert("modules", {
    courseId,
    title: "Arrays and Objects",
    order: 2,
    summary: "Master JavaScript's powerful data structures",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod2,
    courseId,
    title: "Array Methods",
    type: "theory",
    content: `# Array Methods in JavaScript

JavaScript arrays come with powerful built-in methods.

## Iteration Methods

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce - combine into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// forEach - execute function for each
numbers.forEach(n => console.log(n));

// find - first element that passes test
const found = numbers.find(n => n > 3);
// 4

// some/every - test if some/all pass
const hasEven = numbers.some(n => n % 2 === 0);
// true
\`\`\`

## Modification Methods

\`\`\`javascript
const arr = [1, 2, 3];

arr.push(4);      // Add to end
arr.pop();        // Remove from end
arr.unshift(0);   // Add to start
arr.shift();      // Remove from start
arr.splice(1, 1); // Remove at index
\`\`\`

## Spread Operator

\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]
\`\`\``,
    order: 1,
    xpReward: 20,
    estimatedMinutes: 12,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod2,
    courseId,
    title: "Array Methods Practice",
    type: "practice",
    content: `# Array Methods Practice

Use array methods to transform data.

## Task

Given an array of numbers [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:

1. Filter to get only even numbers
2. Double each of those numbers
3. Calculate the sum of all doubled numbers

## Expected Output
\`\`\`
Even numbers: 2,4,6,8,10
Doubled: 4,8,12,16,20
Sum: 60
\`\`\``,
    codeTemplate: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Filter even numbers
const evens = 

// 2. Double each number
const doubled = 

// 3. Calculate sum
const sum = 

console.log(\`Even numbers: \${evens}\`);
console.log(\`Doubled: \${doubled}\`);
console.log(\`Sum: \${sum}\`);`,
    solution: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const sum = doubled.reduce((acc, n) => acc + n, 0);

console.log(\`Even numbers: \${evens}\`);
console.log(\`Doubled: \${doubled}\`);
console.log(\`Sum: \${sum}\`);`,
    testCases: [
      { input: "", expectedOutput: "Even numbers: 2,4,6,8,10", description: "Filtered correctly", points: 30 },
      { input: "", expectedOutput: "Doubled: 4,8,12,16,20", description: "Doubled correctly", points: 30 },
      { input: "", expectedOutput: "Sum: 60", description: "Sum is correct", points: 40 }
    ],
    hints: [
      "Use filter(n => n % 2 === 0) for even numbers",
      "Use map(n => n * 2) to double",
      "Use reduce((acc, n) => acc + n, 0) to sum"
    ],
    order: 2,
    xpReward: 40,
    estimatedMinutes: 12,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod2,
    courseId,
    title: "Object Destructuring",
    type: "theory",
    content: `# Object Destructuring

Destructuring lets you extract values from objects and arrays.

## Object Destructuring

\`\`\`javascript
const person = {
    name: "Alice",
    age: 25,
    city: "NYC"
};

// Extract properties
const { name, age } = person;
console.log(name); // "Alice"

// Rename while destructuring
const { name: userName } = person;

// Default values
const { country = "USA" } = person;
\`\`\`

## Nested Destructuring

\`\`\`javascript
const user = {
    id: 1,
    info: {
        name: "Alice",
        email: "alice@email.com"
    }
};

const { info: { name, email } } = user;
\`\`\`

## Array Destructuring

\`\`\`javascript
const colors = ["red", "green", "blue"];
const [first, second] = colors;
// first = "red", second = "green"

// Skip elements
const [, , third] = colors;
// third = "blue"

// Rest pattern
const [head, ...tail] = colors;
// head = "red", tail = ["green", "blue"]
\`\`\`

## Function Parameters

\`\`\`javascript
const printUser = ({ name, age }) => {
    console.log(\`\${name}, \${age}\`);
};
\`\`\``,
    order: 3,
    xpReward: 15,
    estimatedMinutes: 10,
    language: "javascript",
  });
}

async function seedReactCourse(ctx: SeedCtx) {
  const courseId = await ctx.db.insert("courses", {
    slug: "react-development",
    title: "React Development",
    description: "Build modern user interfaces with React. Learn components, hooks, state management, and build real-world applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    language: "javascript",
    difficulty: "intermediate",
    totalLessons: 30,
    estimatedHours: 45,
    isPublished: true,
  });

  const mod1 = await ctx.db.insert("modules", {
    courseId,
    title: "React Fundamentals",
    order: 1,
    summary: "Understanding React's core concepts and component model",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "What is React?",
    type: "theory",
    content: `# What is React?

React is a JavaScript library for building user interfaces, created by Facebook.

## Key Concepts

### Component-Based Architecture

React applications are built with components - reusable, self-contained pieces of UI.

\`\`\`jsx
function Welcome({ name }) {
    return <h1>Hello, {name}!</h1>;
}
\`\`\`

### Virtual DOM

React uses a virtual DOM to efficiently update the UI. It compares the virtual DOM with the real DOM and only updates what changed.

### Declarative

You describe WHAT you want, not HOW to do it.

\`\`\`jsx
// Declarative (React)
<Button onClick={handleClick}>Click me</Button>

// Imperative (vanilla JS)
button.addEventListener('click', handleClick);
\`\`\`

## Why React?

1. **Reusable Components** - Write once, use everywhere
2. **Fast Updates** - Virtual DOM optimization
3. **Large Ecosystem** - Huge community and libraries
4. **Industry Standard** - Used by top companies

## React vs Other Frameworks

| Feature | React | Vue | Angular |
|---------|-------|-----|---------|
| Learning Curve | Medium | Easy | Steep |
| Size | Small | Small | Large |
| Flexibility | High | Medium | Low |`,
    order: 1,
    xpReward: 10,
    estimatedMinutes: 8,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Your First Component",
    type: "practice",
    content: `# Your First React Component

Let's create a simple React component.

## Task

Create a \`Greeting\` component that:
1. Accepts a \`name\` prop
2. Returns a heading with "Hello, [name]!"
3. Includes a paragraph with a welcome message

## Expected Output
When called with name="World":
\`\`\`html
<div>
  <h1>Hello, World!</h1>
  <p>Welcome to React!</p>
</div>
\`\`\``,
    codeTemplate: `function Greeting({ name }) {
    // Return JSX here
}

// Test the component
const element = Greeting({ name: "World" });
console.log("Component created:", element.type);`,
    solution: `function Greeting({ name }) {
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Welcome to React!</p>
        </div>
    );
}

const element = Greeting({ name: "World" });
console.log("Component created:", element.type);`,
    testCases: [
      { input: "", expectedOutput: "Component created:", description: "Component returns element", points: 100 }
    ],
    hints: [
      "Use JSX syntax with < > tags",
      "Wrap multiple elements in a parent <div>",
      "Use {name} to insert the prop value"
    ],
    order: 2,
    xpReward: 25,
    estimatedMinutes: 10,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "useState Hook",
    type: "theory",
    content: `# The useState Hook

useState is React's most fundamental hook for managing state.

## Basic Usage

\`\`\`jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
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

## How it Works

1. \`useState(0)\` - Initialize state with value 0
2. Returns array: \`[currentValue, setterFunction]\`
3. \`setCount(newValue)\` - Updates the state

## Rules of Hooks

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Never call hooks inside loops, conditions, or nested functions

## Multiple State Variables

\`\`\`jsx
function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    
    // ...
}
\`\`\`

## State with Objects

\`\`\`jsx
const [user, setUser] = useState({
    name: "",
    email: ""
});

// Update (always spread previous state)
setUser(prev => ({ ...prev, name: "Alice" }));
\`\`\``,
    order: 3,
    xpReward: 20,
    estimatedMinutes: 12,
    language: "javascript",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod1,
    courseId,
    title: "Counter Component Challenge",
    type: "challenge",
    content: `# Challenge: Counter Component

Build a counter component with multiple features.

## Requirements

Create a Counter component with:
1. Display the current count
2. "Increment" button (+1)
3. "Decrement" button (-1)
4. "Reset" button (back to 0)
5. Count should not go below 0

## Bonus
- Show "Zero!" when count is 0
- Show "High!" when count is above 10`,
    codeTemplate: `function Counter() {
    // Add useState hook
    
    // Add increment function
    
    // Add decrement function (don't go below 0)
    
    // Add reset function
    
    return (
        <div>
            {/* Add your JSX here */}
        </div>
    );
}`,
    solution: `function Counter() {
    const [count, setCount] = useState(0);
    
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => Math.max(0, c - 1));
    const reset = () => setCount(0);
    
    return (
        <div>
            <h2>Count: {count}</h2>
            {count === 0 && <p>Zero!</p>}
            {count > 10 && <p>High!</p>}
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}`,
    testCases: [
      { input: "", expectedOutput: "Counter component", description: "Component structure correct", points: 100 }
    ],
    hints: [
      "Use Math.max(0, count - 1) to prevent negative numbers",
      "Use functional update: setCount(c => c + 1)",
      "Use conditional rendering: {condition && <element>}"
    ],
    order: 4,
    xpReward: 60,
    estimatedMinutes: 20,
    language: "javascript",
  });

  // Module 2: Hooks Deep Dive
  const mod2 = await ctx.db.insert("modules", {
    courseId,
    title: "React Hooks",
    order: 2,
    summary: "Master useEffect, useContext, and custom hooks",
  });

  await ctx.db.insert("lessons", {
    moduleId: mod2,
    courseId,
    title: "useEffect Hook",
    type: "theory",
    content: `# The useEffect Hook

useEffect handles side effects in React components.

## What are Side Effects?

- Fetching data from an API
- Subscribing to events
- Manually changing the DOM
- Setting timers

## Basic Usage

\`\`\`jsx
import { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        
        // Cleanup function
        return () => clearInterval(interval);
    }, []); // Empty dependency array
    
    return <p>Seconds: {seconds}</p>;
}
\`\`\`

## Dependency Array

\`\`\`jsx
// Run once on mount
useEffect(() => {}, []);

// Run when 'count' changes
useEffect(() => {}, [count]);

// Run on every render (rare)
useEffect(() => {});
\`\`\`

## Data Fetching Example

\`\`\`jsx
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        fetch(\`/api/users/\${userId}\`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            });
    }, [userId]); // Re-run when userId changes
    
    if (loading) return <p>Loading...</p>;
    return <h1>{user.name}</h1>;
}
\`\`\``,
    order: 1,
    xpReward: 20,
    estimatedMinutes: 12,
    language: "javascript",
  });
}
