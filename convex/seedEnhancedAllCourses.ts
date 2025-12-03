import { mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

type LessonType = "theory" | "practice" | "challenge" | "project" | "quiz";

interface Example {
    title: string;
    description: string;
    code: string;
    explanation: string;
    output?: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
}

interface CommonMistake {
    mistake: string;
    explanation: string;
    howToAvoid: string;
}

interface LessonData {
    title: string;
    type: LessonType;
    content: string;
    order: number;
    xpReward: number;
    estimatedMinutes: number;
    language?: string;
    codeTemplate?: string;
    solution?: string;
    testCases?: Array<{
        input: string;
        expectedOutput: string;
        isHidden?: boolean;
        description?: string;
        points?: number;
    }>;
    examples?: Example[];
    keyTakeaways?: string[];
    commonMistakes?: CommonMistake[];
    hints?: string[];
}

type SeedCtx = MutationCtx;

// Helper to create lessons with enhanced fields
async function createEnhancedLessons(
    ctx: SeedCtx,
    moduleId: Id<"modules">,
    courseId: Id<"courses">,
    lessons: LessonData[]
) {
    for (const lesson of lessons) {
        await ctx.db.insert("lessons", {
            moduleId,
            courseId,
            title: lesson.title,
            type: lesson.type,
            content: lesson.content,
            order: lesson.order,
            xpReward: lesson.xpReward,
            estimatedMinutes: lesson.estimatedMinutes,
            language: lesson.language || "python",
            ...(lesson.codeTemplate && { codeTemplate: lesson.codeTemplate }),
            ...(lesson.solution && { solution: lesson.solution }),
            ...(lesson.testCases && { testCases: lesson.testCases }),
            ...(lesson.examples && { examples: lesson.examples }),
            ...(lesson.keyTakeaways && { keyTakeaways: lesson.keyTakeaways }),
            ...(lesson.commonMistakes && { commonMistakes: lesson.commonMistakes }),
            ...(lesson.hints && { hints: lesson.hints }),
        });
    }
}

export const seedEnhancedAllCourses = mutation({
    args: {},
    handler: async (ctx) => {
        // 1. Python Fundamentals
        await seedEnhancedPython(ctx);

        // 2. JavaScript Mastery
        await seedEnhancedJavaScript(ctx);

        // 3. React Development
        await seedEnhancedReact(ctx);

        // 4. TypeScript Development
        await seedEnhancedTypeScript(ctx);

        return "All enhanced courses seeded successfully!";
    },
});

async function seedEnhancedPython(ctx: SeedCtx) {
    // Delete existing if needed (optional, or just create new)
    const existing = await ctx.db
        .query("courses")
        .filter((q) => q.eq(q.field("slug"), "python-fundamentals-enhanced"))
        .first();

    if (existing) {
        const modules = await ctx.db.query("modules").filter((q) => q.eq(q.field("courseId"), existing._id)).collect();
        for (const module of modules) {
            const lessons = await ctx.db.query("lessons").filter((q) => q.eq(q.field("moduleId"), module._id)).collect();
            for (const lesson of lessons) await ctx.db.delete(lesson._id);
            await ctx.db.delete(module._id);
        }
        await ctx.db.delete(existing._id);
    }

    const courseId = await ctx.db.insert("courses", {
        slug: "python-fundamentals-enhanced",
        title: "Python Fundamentals (Enhanced)",
        description: "Master Python with comprehensive notes, interactive examples, and AI assistance. Learn variables, functions, OOP, and more.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        language: "python",
        difficulty: "beginner",
        totalLessons: 50,
        estimatedHours: 45,
        isPublished: true,
        createdAt: Date.now(),
    });

    // Module 1: Getting Started
    const m1 = await ctx.db.insert("modules", {
        courseId,
        title: "Getting Started with Python",
        order: 1,
        summary: "Introduction to Python programming and setting up your environment",
    });

    await createEnhancedLessons(ctx, m1, courseId, [
        {
            title: "What is Python?",
            type: "theory",
            content: `# What is Python?

## 📚 What You'll Learn
- What Python is and why it's so popular
- Where Python is used in the real world
- The philosophy behind Python code

## 📖 Simple Explanation
Imagine you want to tell a computer what to do. Some languages require you to speak in complex, machine-like code. Python is different - it's designed to read almost like English!

It's like the difference between:
- **Other languages**: "System.out.println('Hello');" (Formal, strict)
- **Python**: "print('Hello')" (Simple, direct)

## 🎯 Why This Matters
Python is the **#1 programming language** for beginners and experts alike. It's used by:
- **NASA** to analyze space data
- **Netflix** to recommend movies
- **Instagram** to run their backend
- **Google** for search and AI

## 💡 Key Features
1. **Readable**: Clean syntax, no curly braces {} everywhere
2. **Versatile**: Web apps, AI, Data Science, Automation
3. **Batteries Included**: Comes with tons of built-in tools

## 🔍 Real-World Analogy
Think of Python as a **Swiss Army Knife**. It has a tool for everything!
- Need to build a website? Use the web tool (Django/Flask).
- Need to analyze data? Use the data tool (Pandas).
- Need to automate clicks? Use the automation tool (Selenium).`,
            order: 1,
            xpReward: 10,
            estimatedMinutes: 5,
            language: "python",
            keyTakeaways: [
                "Python is a high-level, interpreted language known for readability",
                "It uses indentation instead of braces for code blocks",
                "It's widely used in Web Dev, Data Science, AI, and Automation",
                "The 'Zen of Python' emphasizes simplicity and clarity"
            ],
            examples: [
                {
                    title: "Simplicity of Python",
                    description: "Comparing Python to other languages",
                    code: `# Python is simple and readable

# In other languages (like Java/C++), you write a lot of boilerplate
# In Python, you just write what you mean:

print("Hello, World!")

name = "Alice"
if len(name) > 3:
    print(f"{name} has a long name")`,
                    explanation: "Notice how there are no semicolons (;), no curly braces {}, and no complex setup code. It just reads like English instructions.",
                    output: "Hello, World!\nAlice has a long name",
                    difficulty: "beginner"
                }
            ]
        },
        {
            title: "Your First Python Program",
            type: "practice",
            content: `# Your First Python Program

## 📚 What You'll Learn
- How to use the \`print()\` function
- How to run Python code
- How to handle text (strings)

## 📖 Simple Explanation
The \`print()\` function is your way of making the computer "speak". Whatever you put inside the parentheses \`( )\`, Python will show on the screen.

Think of it like sending a text message. You type the message inside the quotes, hit send (run), and it appears!

## 💡 Syntax Rules
1. **Function Name**: \`print\` (must be lowercase)
2. **Parentheses**: \`( )\` surround what you want to print
3. **Quotes**: \`" "\` or \`' '\` surround text

## ⚠️ Common Pitfalls
- Forgetting the quotes: \`print(Hello)\` ❌ (Python thinks Hello is a variable)
- Capitalizing Print: \`Print("Hello")\` ❌ (Python is case-sensitive)
- Missing parentheses: \`print "Hello"\` ❌ (This was okay in old Python 2, but not anymore!)`,
            order: 2,
            xpReward: 20,
            estimatedMinutes: 5,
            language: "python",
            codeTemplate: `# Write your first Python program
# Print "Hello, World!" to the console

`,
            solution: `print("Hello, World!")`,
            testCases: [
                { input: "", expectedOutput: "Hello, World!", description: "Should print Hello, World!", points: 10 }
            ],
            examples: [
                {
                    title: "Printing Text",
                    description: "Basic usage of print()",
                    code: `print("Hello, World!")
print('Python is fun')
print("I can use double quotes")
print('Or single quotes')`,
                    explanation: "You can use either single ('') or double (\"\") quotes for text. Just make sure to match them!",
                    output: "Hello, World!\nPython is fun\nI can use double quotes\nOr single quotes",
                    difficulty: "beginner"
                },
                {
                    title: "Printing Numbers",
                    description: "Printing numbers doesn't require quotes",
                    code: `print(42)
print(3.14)
print(10 + 5)`,
                    explanation: "Numbers don't need quotes. If you put quotes around a math problem like \"10 + 5\", it will print the text \"10 + 5\" instead of the answer 15.",
                    output: "42\n3.14\n15",
                    difficulty: "beginner"
                }
            ],
            keyTakeaways: [
                "Use print() to display output",
                "Text must be inside quotes",
                "Python is case-sensitive (print, not Print)",
                "Code executes from top to bottom"
            ],
            commonMistakes: [
                {
                    mistake: "Missing quotes around text",
                    explanation: "print(Hello) causes a NameError because Python looks for a variable named Hello",
                    howToAvoid: "Always wrap text in \"double\" or 'single' quotes"
                },
                {
                    mistake: "Mismatched quotes",
                    explanation: "print(\"Hello') causes a SyntaxError",
                    howToAvoid: "If you start with double quotes, end with double quotes"
                }
            ]
        },
        {
            title: "Variables and Data Types",
            type: "theory",
            content: `# Variables and Data Types

## 📚 What You'll Learn
- How to store data in variables
- The basic data types: String, Integer, Float, Boolean
- Naming rules for variables

## 📖 Simple Explanation
A **variable** is like a labeled box where you can store things.
- **Label**: The variable name (e.g., \`age\`)
- **Contents**: The value (e.g., \`25\`)

You can put something in the box, take it out, or replace it with something else.

## 🧱 Basic Data Types
1. **String (str)**: Text. "Hello", 'Python'
2. **Integer (int)**: Whole numbers. 42, -5, 0
3. **Float (float)**: Decimal numbers. 3.14, 9.99
4. **Boolean (bool)**: True or False

## 📝 Naming Rules
- ✅ \`user_name\` (Snake case - recommended)
- ✅ \`age2\` (Numbers okay at end)
- ❌ \`2age\` (Cannot start with number)
- ❌ \`user-name\` (No hyphens allowed)
- ❌ \`class\` (Cannot use Python keywords)

## 💡 Dynamic Typing
Python is "dynamically typed", which means you don't have to tell it what type of data you're storing. It figures it out!
\`x = 5\` (Python knows it's an int)
\`x = "Hello"\` (Now x is a string)`,
            order: 3,
            xpReward: 15,
            estimatedMinutes: 8,
            language: "python",
            examples: [
                {
                    title: "Creating Variables",
                    description: "Declaring and assigning variables",
                    code: `# Strings
name = "Alice"
message = 'Hello'

# Numbers
age = 25            # int
height = 1.75       # float

# Booleans
is_student = True
has_license = False

print(name)
print(age)
print(is_student)`,
                    explanation: "We create variables by giving them a name, using the = sign, and giving them a value.",
                    output: "Alice\n25\nTrue",
                    difficulty: "beginner"
                },
                {
                    title: "Checking Types",
                    description: "Using type() to see what data type a variable is",
                    code: `x = 10
y = 3.14
z = "Python"

print(type(x))
print(type(y))
print(type(z))`,
                    explanation: "The type() function tells you what kind of data is stored in a variable.",
                    output: "<class 'int'>\n<class 'float'>\n<class 'str'>",
                    difficulty: "intermediate"
                }
            ],
            keyTakeaways: [
                "Variables store data values",
                "Use = to assign a value to a variable",
                "Common types: str (text), int (whole #), float (decimal), bool (T/F)",
                "Variable names should be descriptive and use snake_case"
            ],
            commonMistakes: [
                {
                    mistake: "Using undefined variables",
                    explanation: "Trying to print(x) before creating x = 10",
                    howToAvoid: "Always assign a value to a variable before using it"
                },
                {
                    mistake: "Case sensitivity errors",
                    explanation: "Defining 'Age' but trying to print 'age'",
                    howToAvoid: "Be consistent with capitalization. Python treats 'age' and 'Age' as different variables"
                }
            ]
        }
    ]);

    // Module 2: Control Flow
    const m2 = await ctx.db.insert("modules", {
        courseId,
        title: "Control Flow",
        order: 2,
        summary: "Learn how to control the flow of your programs with conditions and loops",
    });

    await createEnhancedLessons(ctx, m2, courseId, [
        {
            title: "Conditional Statements",
            type: "theory",
            content: `# Conditional Statements

## 📚 What You'll Learn
- How to make decisions in code using \`if\`, \`elif\`, and \`else\`
- Comparison operators (\`==\`, \`<\`, \`>\`)
- Logical operators (\`and\`, \`or\`, \`not\`)

## 📖 Simple Explanation
Code usually runs from top to bottom, like reading a book. But sometimes you want to skip parts or choose different paths.

Think of it like a fork in the road:
- **If** it's raining, take the umbrella.
- **Else** (otherwise), leave it at home.

## 🚦 The Structure
\`\`\`python
if condition:
    # Do this if true
elif other_condition:
    # Do this if first was false but this is true
else:
    # Do this if nothing else was true
\`\`\`

## ⚠️ Indentation Matters!
In Python, the code inside the \`if\` block MUST be indented (usually 4 spaces). This is how Python knows what code belongs to the \`if\` statement.`,
            order: 1,
            xpReward: 15,
            estimatedMinutes: 10,
            language: "python",
            examples: [
                {
                    title: "Simple If-Else",
                    description: "Basic decision making",
                    code: `age = 16

if age >= 18:
    print("You can vote!")
else:
    print("You are too young to vote.")`,
                    explanation: "Checks if age is greater than or equal to 18. Since 16 is not >= 18, it runs the else block.",
                    output: "You are too young to vote.",
                    difficulty: "beginner"
                },
                {
                    title: "Multiple Conditions (Elif)",
                    description: "Checking multiple possibilities",
                    code: `score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")`,
                    explanation: "Python checks conditions one by one. As soon as it finds one that is True (score >= 80), it runs that block and skips the rest.",
                    output: "Grade: B",
                    difficulty: "intermediate"
                }
            ],
            keyTakeaways: [
                "Use if/elif/else to make decisions",
                "Indentation is required for code blocks",
                "== checks equality, = assigns value",
                "elif stands for 'else if'"
            ],
            commonMistakes: [
                {
                    mistake: "Using = instead of ==",
                    explanation: "if x = 5 is an assignment (error), if x == 5 is a comparison",
                    howToAvoid: "Remember: One = sets value, Two == compares values"
                },
                {
                    mistake: "Forgetting the colon :",
                    explanation: "if x > 5 needs a colon at the end",
                    howToAvoid: "Always end if/elif/else lines with :"
                }
            ]
        },
        {
            title: "Loops in Python",
            type: "theory",
            content: `# Loops in Python

## 📚 What You'll Learn
- How to repeat code with \`for\` loops
- How to use \`while\` loops
- The \`range()\` function

## 📖 Simple Explanation
Imagine you need to print "Hello" 100 times. You could write \`print("Hello")\` 100 times... or you could use a loop!

A **loop** repeats a block of code.
- **For Loop**: "Do this for every item in this list" (Counted loop)
- **While Loop**: "Keep doing this while this condition is true" (Conditional loop)

## 🔄 The For Loop
Best for when you know how many times to loop.
\`\`\`python
for i in range(5):
    print(i)
\`\`\`

## 🔄 The While Loop
Best for when you don't know when to stop (like waiting for user input).
\`\`\`python
while battery > 0:
    print("Phone is on")
\`\`\``,
            order: 2,
            xpReward: 15,
            estimatedMinutes: 10,
            language: "python",
            examples: [
                {
                    title: "Looping with range()",
                    description: "Repeating code a specific number of times",
                    code: `# Print numbers 0 to 4
for i in range(5):
    print(f"Count: {i}")

# Print numbers 1 to 5
for i in range(1, 6):
    print(f"Number: {i}")`,
                    explanation: "range(5) gives numbers 0,1,2,3,4. range(1, 6) gives 1,2,3,4,5 (stops before 6).",
                    output: "Count: 0\nCount: 1...\nNumber: 1\nNumber: 2...",
                    difficulty: "beginner"
                },
                {
                    title: "Looping over a List",
                    description: "Processing items in a collection",
                    code: `fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}")`,
                    explanation: "The loop variable 'fruit' takes the value of each item in the list, one by one.",
                    output: "I like apple\nI like banana\nI like cherry",
                    difficulty: "beginner"
                },
                {
                    title: "While Loop",
                    description: "Looping until a condition changes",
                    code: `countdown = 3

while countdown > 0:
    print(countdown)
    countdown = countdown - 1

print("Blast off!")`,
                    explanation: "The loop continues as long as countdown > 0. We must decrease countdown inside the loop, otherwise it runs forever!",
                    output: "3\n2\n1\nBlast off!",
                    difficulty: "intermediate"
                }
            ],
            keyTakeaways: [
                "Loops repeat code blocks",
                "for loops are for sequences (lists, ranges)",
                "while loops are for conditions",
                "range(n) goes from 0 to n-1"
            ],
            commonMistakes: [
                {
                    mistake: "Infinite loops",
                    explanation: "A while loop that never becomes false runs forever",
                    howToAvoid: "Ensure the loop condition eventually changes (e.g., increment counter)"
                },
                {
                    mistake: "Off-by-one errors",
                    explanation: "range(5) stops at 4, not 5",
                    howToAvoid: "Remember range is exclusive of the end number"
                }
            ]
        }
    ]);
}

async function seedEnhancedJavaScript(ctx: SeedCtx) {
    const existing = await ctx.db
        .query("courses")
        .filter((q) => q.eq(q.field("slug"), "javascript-mastery-enhanced"))
        .first();

    if (existing) {
        const modules = await ctx.db.query("modules").filter((q) => q.eq(q.field("courseId"), existing._id)).collect();
        for (const module of modules) {
            const lessons = await ctx.db.query("lessons").filter((q) => q.eq(q.field("moduleId"), module._id)).collect();
            for (const lesson of lessons) await ctx.db.delete(lesson._id);
            await ctx.db.delete(module._id);
        }
        await ctx.db.delete(existing._id);
    }

    const courseId = await ctx.db.insert("courses", {
        slug: "javascript-mastery-enhanced",
        title: "JavaScript Mastery (Enhanced)",
        description: "Master modern JavaScript with interactive examples. Learn ES6+, DOM manipulation, async programming, and more.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        language: "javascript",
        difficulty: "beginner",
        totalLessons: 40,
        estimatedHours: 50,
        isPublished: true,
        createdAt: Date.now(),
    });

    // Module 1: JavaScript Fundamentals
    const m1 = await ctx.db.insert("modules", {
        courseId,
        title: "JavaScript Fundamentals",
        order: 1,
        summary: "Learn the building blocks of JavaScript programming",
    });

    await createEnhancedLessons(ctx, m1, courseId, [
        {
            title: "Introduction to JavaScript",
            type: "theory",
            content: `# Introduction to JavaScript

## 📚 What You'll Learn
- What JavaScript is and where it runs
- The difference between Java and JavaScript
- How JavaScript makes websites interactive

## 📖 Simple Explanation
Imagine a house:
- **HTML** is the structure (walls, doors).
- **CSS** is the decoration (paint, carpet).
- **JavaScript** is the electricity and plumbing (lights turning on, water running).

Without JavaScript, a website is just a static poster. With JavaScript, it becomes an interactive application that can respond to your clicks, fetch data, and change what you see.

## 🎯 Why This Matters
JavaScript is the **only** programming language that runs natively in web browsers. If you want to build websites, you *must* learn JavaScript. It's also used for:
- **Servers** (Node.js)
- **Mobile Apps** (React Native)
- **Desktop Apps** (Electron)

## 💡 Key Concepts
1. **Interactivity**: Responding to user actions (clicks, typing)
2. **Dynamic Content**: Changing text/images without reloading
3. **Asynchronous**: Doing things in the background (like fetching data)

## 🔍 Java vs JavaScript
They are as related as **Car** and **Carpet**.
- **Java**: Strict, compiled language often used for big enterprise backends.
- **JavaScript**: Flexible, interpreted language built for the web.`,
            order: 1,
            xpReward: 10,
            estimatedMinutes: 5,
            language: "javascript",
            keyTakeaways: [
                "JavaScript makes websites interactive",
                "It runs in the browser (frontend) and on servers (Node.js)",
                "It is NOT related to Java",
                "It can change HTML and CSS dynamically"
            ],
            examples: [
                {
                    title: "Hello World",
                    description: "The classic first program",
                    code: `// Printing to the console
console.log("Hello, World!");

// Variables
let name = "JavaScript";
console.log("I am learning " + name);`,
                    explanation: "console.log() is how we print messages to the developer console. It's the most common way to debug code.",
                    output: "Hello, World!\nI am learning JavaScript",
                    difficulty: "beginner"
                }
            ]
        },
        {
            title: "Variables: let, const, var",
            type: "theory",
            content: `# Variables: let, const, var

## 📚 What You'll Learn
- The three ways to declare variables
- Why \`const\` is your best friend
- When to use \`let\`
- Why to avoid \`var\`

## 📖 Simple Explanation
A variable is a box with a name.
- **const**: A box you seal shut. You can't replace what's inside. (Use this 95% of the time!)
- **let**: A box you keep open. You can take things out and put new things in. (Use for counters, changing values)
- **var**: An old, leaky box from the 90s. Don't use it.

## 💡 Best Practices
1. **Default to \`const\`**: It prevents bugs by ensuring values don't change unexpectedly.
2. **Use \`let\` only when needed**: If you know a value *needs* to change (like a score in a game).
3. **Forget \`var\`**: It has confusing scoping rules that cause headaches.

## 🔍 Examples
\`\`\`javascript
const pi = 3.14;   // Can't change pi
let score = 0;     // Score changes
score = 10;        // OK
// pi = 3.15;      // Error!
\`\`\``,
            order: 2,
            xpReward: 15,
            estimatedMinutes: 8,
            language: "javascript",
            examples: [
                {
                    title: "const vs let",
                    description: "Demonstrating reassignment rules",
                    code: `// const cannot be reassigned
const name = "Alice";
console.log(name);
// name = "Bob"; // This would cause an error!

// let can be reassigned
let age = 25;
console.log(age);
age = 26; // This is fine
console.log(age);`,
                    explanation: "Try to uncomment the 'name = Bob' line and run it. You'll see a TypeError because you cannot assign to a constant variable.",
                    output: "Alice\n25\n26",
                    difficulty: "beginner"
                },
                {
                    title: "Scope Differences",
                    description: "Block scope of let/const vs function scope of var",
                    code: `if (true) {
  let blockScoped = "I stay inside";
  var functionScoped = "I leak out";
}

// console.log(blockScoped); // Error: blockScoped is not defined
console.log(functionScoped); // Works! (But this is bad)`,
                    explanation: "Variables declared with let/const only exist inside the curly braces {} where they were made. var ignores curly braces (except in functions), which can lead to bugs.",
                    output: "I leak out",
                    difficulty: "intermediate"
                }
            ],
            keyTakeaways: [
                "Use const by default for values that shouldn't change",
                "Use let for values that will change (loops, counters)",
                "Avoid var because of hoisting and scoping issues",
                "Variables are case-sensitive"
            ],
            commonMistakes: [
                {
                    mistake: "Using const for loop counters",
                    explanation: "for (const i = 0; ...) fails because i needs to change",
                    howToAvoid: "Use let i = 0 for loops"
                },
                {
                    mistake: "Redeclaring variables",
                    explanation: "let x = 1; let x = 2; causes an error",
                    howToAvoid: "Declare once, then just assign: x = 2"
                }
            ]
        },
        {
            title: "Working with Variables",
            type: "practice",
            content: `# Working with Variables Practice

## 📚 What You'll Learn
- How to declare and assign variables
- String concatenation (joining text)
- Basic arithmetic with variables

## 🎯 The Challenge
You need to create a simple profile display script.
1. Create a constant for a name
2. Create a variable for a counter
3. Update the counter
4. Create an object for a person
5. Print a formatted message

## 💡 Hint
Use template literals (backticks \`\`) to make joining strings easier:
\`const message = \`Hello \${name}!\`;\``,
            order: 3,
            xpReward: 25,
            estimatedMinutes: 10,
            language: "javascript",
            codeTemplate: `// 1. Create constant greeting = "Hello"


// 2. Create variable count = 0


// 3. Increment count by 1


// 4. Create person object with name "Alice" and age 25


// 5. Log: "Hello, Alice!" and "Count: 1"
`,
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
            examples: [
                {
                    title: "Template Literals",
                    description: "The modern way to join strings",
                    code: `const item = "Coffee";
const price = 4.99;

// Old way (messy)
console.log("The " + item + " costs $" + price);

// New way (clean)
console.log(\`The \${item} costs \$\${price}\`);`,
                    explanation: "Backticks (`) allow you to put variables directly inside the string using ${variable}. This is called interpolation.",
                    output: "The Coffee costs $4.99\nThe Coffee costs $4.99",
                    difficulty: "beginner"
                }
            ],
            keyTakeaways: [
                "Template literals (`) are better than string concatenation (+)",
                "Objects group related data (name, age)",
                "Incrementing means adding 1 (count++)"
            ],
            commonMistakes: [
                {
                    mistake: "Using single quotes for template literals",
                    explanation: "'${name}' prints literally ${name}",
                    howToAvoid: "Must use backticks ` (key above Tab)"
                }
            ]
        }
    ]);

    // Module 2: Arrays and Objects
    const m2 = await ctx.db.insert("modules", {
        courseId,
        title: "Arrays and Objects",
        order: 2,
        summary: "Master JavaScript's powerful data structures",
    });

    await createEnhancedLessons(ctx, m2, courseId, [
        {
            title: "Array Methods",
            type: "theory",
            content: `# Array Methods

## 📚 What You'll Learn
- How to transform arrays with \`map\`
- How to filter arrays with \`filter\`
- How to loop with \`forEach\`

## 📖 Simple Explanation
Arrays are lists. Methods are tools to work with those lists.

- **map()**: Takes a list, changes every item, returns a new list. (Like a factory assembly line)
- **filter()**: Takes a list, keeps only items that pass a test. (Like a security guard)
- **forEach()**: Takes a list, does something with each item. (Like reading a roll call)

## 💡 Functional Programming
These methods are preferred over old \`for\` loops because they are cleaner and express *intent*.
- Instead of "Loop i from 0 to length", you say "Filter evens".

## 🔍 Examples
\`\`\`javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // [2, 4, 6]
const big = nums.filter(n => n > 1);  // [2, 3]
\`\`\``,
            order: 1,
            xpReward: 20,
            estimatedMinutes: 12,
            language: "javascript",
            examples: [
                {
                    title: "Map, Filter, Reduce",
                    description: "The holy trinity of array methods",
                    code: `const prices = [10, 20, 30, 40];

// 1. Filter: Keep prices over 15
const expensive = prices.filter(p => p > 15);
console.log("Expensive:", expensive);

// 2. Map: Add 10% tax
const withTax = expensive.map(p => p * 1.1);
console.log("With Tax:", withTax);

// 3. Reduce: Calculate total
const total = withTax.reduce((sum, p) => sum + p, 0);
console.log("Total:", total);`,
                    explanation: "We chained these operations logically: Filter -> Map -> Reduce. This is a very common pattern in data processing.",
                    output: "Expensive: [ 20, 30, 40 ]\nWith Tax: [ 22, 33, 44 ]\nTotal: 99",
                    difficulty: "intermediate"
                }
            ],
            keyTakeaways: [
                "map() transforms elements (1:1 ratio)",
                "filter() selects elements (subset)",
                "reduce() combines elements (many to one)",
                "These methods do not change the original array (immutability)"
            ],
            commonMistakes: [
                {
                    mistake: "Forgetting return in map/filter",
                    explanation: "If using curly braces {}, you must type return",
                    howToAvoid: "Use implicit return for one-liners: .map(x => x * 2)"
                },
                {
                    mistake: "Using map instead of forEach",
                    explanation: "Don't use map if you aren't using the result array",
                    howToAvoid: "Use forEach for side effects (like printing)"
                }
            ]
        },
        {
            title: "Array Methods Practice",
            type: "practice",
            content: `# Array Methods Practice

## 📚 What You'll Learn
- Chaining array methods
- Working with numbers
- Arrow functions

## 🎯 The Challenge
You have a list of numbers. You need to:
1. Keep only the even numbers
2. Double them
3. Sum them up

## 💡 Hint
You can chain methods together:
\`array.filter(...).map(...).reduce(...)\``,
            order: 2,
            xpReward: 40,
            estimatedMinutes: 12,
            language: "javascript",
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
            examples: [
                {
                    title: "Chaining Methods",
                    description: "Writing concise data pipelines",
                    code: `const words = ["apple", "banana", "avocado", "cherry"];

// Find length of all words starting with 'a'
const lengths = words
  .filter(w => w.startsWith('a'))
  .map(w => w.length);

console.log(lengths);`,
                    explanation: "We filter first to get ['apple', 'avocado'], then map to get their lengths [5, 7].",
                    output: "[ 5, 7 ]",
                    difficulty: "intermediate"
                }
            ],
            keyTakeaways: [
                "Chaining methods creates readable data pipelines",
                "Arrow functions make callbacks concise",
                "reduce needs an initial value (usually 0 for sums)"
            ],
            commonMistakes: [
                {
                    mistake: "Modifying the original array",
                    explanation: "Methods like sort() change the original, but map/filter don't",
                    howToAvoid: "Assign the result to a new variable"
                }
            ]
        }
    ]);
}

async function seedEnhancedReact(ctx: SeedCtx) {
    const existing = await ctx.db
        .query("courses")
        .filter((q) => q.eq(q.field("slug"), "react-development-enhanced"))
        .first();

    if (existing) {
        const modules = await ctx.db.query("modules").filter((q) => q.eq(q.field("courseId"), existing._id)).collect();
        for (const module of modules) {
            const lessons = await ctx.db.query("lessons").filter((q) => q.eq(q.field("moduleId"), module._id)).collect();
            for (const lesson of lessons) await ctx.db.delete(lesson._id);
            await ctx.db.delete(module._id);
        }
        await ctx.db.delete(existing._id);
    }

    const courseId = await ctx.db.insert("courses", {
        slug: "react-development-enhanced",
        title: "React Development (Enhanced)",
        description: "Build modern, interactive UIs with React. Master Components, Hooks, State, and Props with real-world examples.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        language: "javascript",
        difficulty: "intermediate",
        totalLessons: 30,
        estimatedHours: 45,
        isPublished: true,
        createdAt: Date.now(),
    });

    // Module 1: React Fundamentals
    const m1 = await ctx.db.insert("modules", {
        courseId,
        title: "React Fundamentals",
        order: 1,
        summary: "Understanding React's core concepts and component model",
    });

    await createEnhancedLessons(ctx, m1, courseId, [
        {
            title: "What is React?",
            type: "theory",
            content: `# What is React?

## 📚 What You'll Learn
- Why React changed web development
- The concept of Components
- Virtual DOM vs Real DOM

## 📖 Simple Explanation
Before React, building websites was like painting a wall. If you wanted to change one small spot, you often had to repaint the whole section.

React is like building with **LEGOs**.
- You build small, independent pieces called **Components**.
- You snap them together to make a house (website).
- If you need to change a window, you just swap that one LEGO brick. You don't touch the rest of the house.

## 🎯 Why This Matters
- **Reusable**: Build a "Button" component once, use it everywhere.
- **Fast**: React only updates what changed (using Virtual DOM).
- **Popular**: Used by Facebook, Instagram, Netflix, Airbnb.

## 💡 Key Concepts
1. **Components**: Custom HTML elements (e.g., \`<NavBar />\`, \`<LikeButton />\`)
2. **JSX**: Writing HTML inside JavaScript
3. **Props**: Passing data down to components (like arguments to a function)
4. **State**: Data that changes over time (like a score counter)

## 🔍 JSX Example
\`\`\`jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
\`\`\`
It looks like HTML, but it's actually JavaScript!`,
            order: 1,
            xpReward: 10,
            estimatedMinutes: 5,
            language: "javascript",
            keyTakeaways: [
                "React is a library for building UIs using Components",
                "Components are reusable, independent pieces of code",
                "JSX allows writing HTML-like syntax in JavaScript",
                "React is declarative: you say 'what' you want, not 'how' to do it"
            ],
            examples: [
                {
                    title: "Simple Component",
                    description: "A basic React functional component",
                    code: `import React from 'react';

// A simple component
function Greeting(props) {
  return (
    <div className="greeting">
      <h1>Hello, {props.name}!</h1>
      <p>Welcome to React.</p>
    </div>
  );
}

// Using the component
// <Greeting name="Alice" />`,
                    explanation: "This is a Functional Component. It accepts 'props' (properties) and returns JSX (what to show on screen). Notice {props.name} - curly braces let us put JavaScript variables into the HTML.",
                    output: "Hello, Alice!\nWelcome to React.",
                    difficulty: "beginner"
                }
            ]
        },
        {
            title: "Your First Component",
            type: "practice",
            content: `# Your First Component

## 📚 What You'll Learn
- How to define a Functional Component
- How to return JSX
- How to export a component

## 🎯 The Challenge
Create a \`Profile\` component that displays a user's info.
1. Define a function named \`Profile\`
2. Return a \`div\` containing an \`h2\` for name and \`p\` for bio
3. Export the component

## 💡 JSX Rules
- You must return **one** parent element (wrap everything in a \`div\` or \`<>\`)
- Close all tags (even \`<br />\`)
- Use \`className\` instead of \`class\``,
            order: 2,
            xpReward: 20,
            estimatedMinutes: 10,
            language: "javascript",
            codeTemplate: `import React from 'react';

// Define your Profile component here
function Profile() {
  // Return JSX
}

export default Profile;`,
            solution: `import React from 'react';

function Profile() {
  return (
    <div className="profile">
      <h2>John Doe</h2>
      <p>Software Developer</p>
    </div>
  );
}

export default Profile;`,
            testCases: [
                { input: "", expectedOutput: "", description: "Component renders without crashing", points: 50 },
                { input: "", expectedOutput: "", description: "Contains h2 and p tags", points: 50 }
            ],
            examples: [
                {
                    title: "Nested Components",
                    description: "Building components from other components",
                    code: `function Avatar() {
  return <img src="user.jpg" alt="User" />;
}

function UserInfo() {
  return (
    <div className="user-info">
      <Avatar />
      <h3>UserName</h3>
    </div>
  );
}`,
                    explanation: "Components can use other components! Here UserInfo contains an Avatar component. This is how we build complex UIs from simple blocks.",
                    output: "(Renders image and name)",
                    difficulty: "beginner"
                }
            ],
            keyTakeaways: [
                "Component names must start with a Capital Letter",
                "Components must return JSX",
                "Export components to use them in other files"
            ],
            commonMistakes: [
                {
                    mistake: "Lowercase component name",
                    explanation: "function profile() {} is treated as a regular HTML tag by React",
                    howToAvoid: "Always capitalize: function Profile() {}"
                },
                {
                    mistake: "Returning multiple elements",
                    explanation: "return <h1>Hi</h1><p>Bye</p> fails",
                    howToAvoid: "Wrap in a parent: return <div><h1>Hi</h1><p>Bye</p></div>"
                }
            ]
        },
        {
            title: "State with useState",
            type: "theory",
            content: `# State with useState

## 📚 What You'll Learn
- What "State" is in React
- How to use the \`useState\` hook
- How to update state

## 📖 Simple Explanation
**Props** are like arguments passed to a function - they don't change.
**State** is like a component's personal memory - it CAN change.

Imagine a counter:
- The number starts at 0.
- When you click "Add", it becomes 1.
- That number is **State**.

## 🔄 The useState Hook
\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`
This line does three things:
1. Creates a variable \`count\` (initial value 0)
2. Creates a function \`setCount\` to update it
3. Tells React: "When this changes, re-draw the component!"

## ⚠️ Never Modify State Directly
❌ \`count = 5\` (React won't know it changed)
✅ \`setCount(5)\` (React knows to update)`,
            order: 3,
            xpReward: 20,
            estimatedMinutes: 12,
            language: "javascript",
            examples: [
                {
                    title: "Counter Component",
                    description: "The classic state example",
                    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
                    explanation: "Every time you click the button, setCount updates the state. React sees the state change and re-runs the Counter function to update the HTML.",
                    output: "You clicked 0 times [Button]",
                    difficulty: "beginner"
                },
                {
                    title: "Toggle Switch",
                    description: "Boolean state",
                    code: `function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}`,
                    explanation: "State can be anything: numbers, strings, booleans, objects. Here we toggle a boolean between true/false.",
                    output: "[OFF] -> click -> [ON]",
                    difficulty: "beginner"
                }
            ],
            keyTakeaways: [
                "Import useState from 'react'",
                "const [value, setValue] = useState(initial)",
                "Always use the set function to update state",
                "State updates trigger a re-render"
            ],
            commonMistakes: [
                {
                    mistake: "Modifying state directly",
                    explanation: "count++ won't trigger a re-render",
                    howToAvoid: "Use setCount(count + 1)"
                },
                {
                    mistake: "Putting hooks inside loops/ifs",
                    explanation: "Hooks must be at the top level of the component",
                    howToAvoid: "Never put useState inside an if statement"
                }
            ]
        }
    ]);
}

async function seedEnhancedTypeScript(ctx: SeedCtx) {
    const existing = await ctx.db
        .query("courses")
        .filter((q) => q.eq(q.field("slug"), "typescript-development-enhanced"))
        .first();

    if (existing) {
        const modules = await ctx.db.query("modules").filter((q) => q.eq(q.field("courseId"), existing._id)).collect();
        for (const module of modules) {
            const lessons = await ctx.db.query("lessons").filter((q) => q.eq(q.field("moduleId"), module._id)).collect();
            for (const lesson of lessons) await ctx.db.delete(lesson._id);
            await ctx.db.delete(module._id);
        }
        await ctx.db.delete(existing._id);
    }

    const courseId = await ctx.db.insert("courses", {
        slug: "typescript-development-enhanced",
        title: "TypeScript Development (Enhanced)",
        description: "Master TypeScript's type system. Learn interfaces, generics, utility types, and how to write safer code.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        language: "typescript",
        difficulty: "intermediate",
        totalLessons: 45,
        estimatedHours: 40,
        isPublished: true,
        createdAt: Date.now(),
    });

    // Module 1: Introduction & Setup
    const m1 = await ctx.db.insert("modules", {
        courseId,
        title: "Introduction & Setup",
        order: 1,
        summary: "What is TypeScript and why use it?",
    });

    await createEnhancedLessons(ctx, m1, courseId, [
        {
            title: "What is TypeScript?",
            type: "theory",
            content: `# What is TypeScript?

## 📚 What You'll Learn
- What "Superset of JavaScript" means
- Static vs Dynamic typing
- Why big companies love TypeScript

## 📖 Simple Explanation
JavaScript is like writing a letter in pen. If you make a mistake, you don't know until someone reads it (runs the code).

TypeScript is like writing in Word with **Spell Check**. It underlines mistakes *while you type*, before you even save the file.

TypeScript = JavaScript + Types.
All valid JavaScript is valid TypeScript.

## 🎯 Why This Matters
- **Catch Errors Early**: Fix bugs before they crash your app.
- **Better Autocomplete**: Your editor knows exactly what properties an object has.
- **Easier Refactoring**: Change a function name, and TS updates it everywhere.

## 🔍 JS vs TS
\`\`\`javascript
// JavaScript
function add(a, b) {
  return a + b;
}
add("5", 10); // Returns "510" (Oops!)
\`\`\`

\`\`\`typescript
// TypeScript
function add(a: number, b: number) {
  return a + b;
}
add("5", 10); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
\`\`\``,
            order: 1,
            xpReward: 10,
            estimatedMinutes: 8,
            language: "typescript",
            keyTakeaways: [
                "TypeScript is a superset of JavaScript (JS + Types)",
                "It catches errors at compile time (before running)",
                "It provides better developer experience (autocomplete, docs)",
                "Browsers can't run TS directly; it compiles to JS"
            ],
            examples: [
                {
                    title: "Type Safety",
                    description: "Preventing common bugs",
                    code: `interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice"
};

// user.age = 25; // Error: Property 'age' does not exist on type 'User'
// user.name = 123; // Error: Type 'number' is not assignable to type 'string'`,
                    explanation: "By defining the 'User' interface, we tell TypeScript exactly what a user object looks like. If we try to add extra properties or use the wrong types, TypeScript stops us immediately.",
                    output: "(Compile Error)",
                    difficulty: "beginner"
                }
            ]
        },
        {
            title: "Basic Types",
            type: "theory",
            content: `# Basic Types

## 📚 What You'll Learn
- The core types: string, number, boolean
- Arrays and Tuples
- The \`any\` type (and why to avoid it)

## 📖 Simple Explanation
In TypeScript, you label your variables so the computer knows what they are.
- \`name: string\` ("This box only holds text")
- \`age: number\` ("This box only holds numbers")
- \`isActive: boolean\` ("This box is a switch, True/False")

## 🧱 The Types
\`\`\`typescript
let name: string = "Alice";
let count: number = 42;
let isDone: boolean = false;
let list: number[] = [1, 2, 3];
\`\`\`

## ⚠️ The 'any' Type
\`let x: any\` means "I don't care, let it be anything."
Use this **sparingly**. It turns off the spell checker!`,
            order: 2,
            xpReward: 15,
            estimatedMinutes: 10,
            language: "typescript",
            examples: [
                {
                    title: "Type Inference",
                    description: "TypeScript is smart!",
                    code: `// You don't always need to write the type
let message = "Hello"; // TS knows this is a string

// message = 10; // Error! TS remembers it's a string

let count = 0; // TS knows this is a number`,
                    explanation: "TypeScript has 'Type Inference'. If you assign a string to a variable, TS assumes it should always be a string. You don't have to type ': string' every time.",
                    output: "Hello",
                    difficulty: "beginner"
                },
                {
                    title: "Arrays and Tuples",
                    description: "Lists of things",
                    code: `// Array of numbers
const scores: number[] = [90, 85, 95];

// Tuple: Fixed length and types
const coordinate: [number, number] = [10, 20];

// coordinate[0] = "North"; // Error!`,
                    explanation: "Arrays hold many of the same thing. Tuples hold a specific set of things in a specific order (like coordinates x, y).",
                    output: "[90, 85, 95]",
                    difficulty: "intermediate"
                }
            ],
            keyTakeaways: [
                "Use : type to annotate variables",
                "TS infers types automatically most of the time",
                "Arrays are typed like number[] or string[]",
                "Avoid 'any' whenever possible"
            ],
            commonMistakes: [
                {
                    mistake: "Using 'any' lazily",
                    explanation: "Using any disables type checking, defeating the purpose of TS",
                    howToAvoid: "Take the time to define the correct type or interface"
                },
                {
                    mistake: "Confusing object and Object",
                    explanation: "Don't use the 'Object' type, it's too vague",
                    howToAvoid: "Use specific interfaces or 'object' (lowercase) for non-primitives"
                }
            ]
        },
        {
            title: "First TypeScript Program",
            type: "practice",
            content: `# First TypeScript Program

## 📚 What You'll Learn
- How to write a typed function
- How to fix type errors

## 🎯 The Challenge
Write a function \`greet\` that takes a name (string) and an age (number) and returns a formatted string.

## 💡 Hint
Function arguments need types too!
\`function name(arg: type): returnType { ... }\``,
            order: 3,
            xpReward: 25,
            estimatedMinutes: 8,
            language: "typescript",
            codeTemplate: `// Create a function 'greet'
// Arguments: name (string), age (number)
// Return: string "Hello name, you are age years old"

function greet(name, age) {
  return \`Hello \${name}, you are \${age} years old\`;
}

console.log(greet("Alice", 25));`,
            solution: `function greet(name: string, age: number): string {
  return \`Hello \${name}, you are \${age} years old\`;
}

console.log(greet("Alice", 25));`,
            testCases: [
                { input: "", expectedOutput: "Hello Alice, you are 25 years old", description: "Correct output", points: 100 }
            ],
            examples: [
                {
                    title: "Typed Functions",
                    description: "Adding types to inputs and outputs",
                    code: `function add(x: number, y: number): number {
  return x + y;
}

const result = add(5, 10); // result is guaranteed to be a number`,
                    explanation: "We specify that x and y must be numbers, and the function must return a number. If we tried to return a string, TS would yell at us.",
                    output: "15",
                    difficulty: "beginner"
                }
            ],
            keyTakeaways: [
                "Annotate function parameters",
                "Annotate return types (optional but good practice)",
                "TS ensures you pass the correct arguments"
            ],
            commonMistakes: [
                {
                    mistake: "Forgetting parameter types",
                    explanation: "Implicit 'any' is dangerous",
                    howToAvoid: "Always type your function parameters"
                }
            ]
        }
    ]);
}
