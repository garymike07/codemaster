import { mutation } from "./_generated/server";

export const seedCourses = mutation({
  args: {},
  handler: async (ctx) => {
    const existingCourses = await ctx.db.query("courses").collect();
    
    const courses = [
      {
        slug: "html-css",
        title: "HTML & CSS Fundamentals",
        description:
          "Learn the building blocks of the web. Master HTML structure and CSS styling.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        language: "html",
        difficulty: "beginner" as const,
        estimatedHours: 20,
      },
      {
        slug: "javascript",
        title: "JavaScript Essentials",
        description:
          "Master JavaScript from variables to async programming. Build interactive web apps.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        language: "javascript",
        difficulty: "beginner" as const,
        estimatedHours: 40,
      },
      {
        slug: "python",
        title: "Python Programming",
        description:
          "Learn Python from scratch. Perfect for beginners and data science enthusiasts.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        language: "python",
        difficulty: "beginner" as const,
        estimatedHours: 35,
      },
      {
        slug: "react",
        title: "React Development",
        description:
          "Build modern user interfaces with React. Learn hooks, state management, and more.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        language: "javascript",
        difficulty: "intermediate" as const,
        estimatedHours: 45,
      },
      {
        slug: "typescript",
        title: "TypeScript Mastery",
        description:
          "Add type safety to your JavaScript. Essential for large-scale applications.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        language: "typescript",
        difficulty: "intermediate" as const,
        estimatedHours: 30,
      },
      {
        slug: "go",
        title: "Go Programming",
        description:
          "Learn Go for building fast, reliable backend services and CLI tools.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
        language: "go",
        difficulty: "intermediate" as const,
        estimatedHours: 35,
      },
      {
        slug: "rust",
        title: "Rust Fundamentals",
        description:
          "Master memory-safe systems programming with Rust. Build reliable and efficient software.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
        language: "rust",
        difficulty: "advanced" as const,
        estimatedHours: 50,
      },
      {
        slug: "spring-boot",
        title: "Spring Boot Development",
        description:
          "Build production-ready Java applications with Spring Boot framework.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        language: "java",
        difficulty: "intermediate" as const,
        estimatedHours: 40,
      },
      {
        slug: "dotnet",
        title: ".NET Core Development",
        description:
          "Build cross-platform applications with C# and .NET Core framework.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
        language: "csharp",
        difficulty: "intermediate" as const,
        estimatedHours: 40,
      },
      {
        slug: "api-development",
        title: "API Development",
        description:
          "Design and build RESTful APIs. Learn best practices for API design and security.",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        language: "javascript",
        difficulty: "intermediate" as const,
        estimatedHours: 25,
      },
    ];

    for (const courseData of courses) {
      const existingCourse = existingCourses.find(c => c.slug === courseData.slug);
      
      if (existingCourse) {
        await ctx.db.patch(existingCourse._id, {
          title: courseData.title,
          description: courseData.description,
          icon: courseData.icon,
          language: courseData.language,
          difficulty: courseData.difficulty,
          estimatedHours: courseData.estimatedHours,
        });
        continue;
      }

      const courseId = await ctx.db.insert("courses", {
        ...courseData,
        totalLessons: 0,
        isPublished: true,
      });

      if (courseData.slug === "javascript") {
        const module1Id = await ctx.db.insert("modules", {
          courseId,
          title: "Introduction to JavaScript",
          order: 1,
        });

        const module2Id = await ctx.db.insert("modules", {
          courseId,
          title: "Variables and Data Types",
          order: 2,
        });

        const module3Id = await ctx.db.insert("modules", {
          courseId,
          title: "Arrays and Objects",
          order: 3,
        });

        const lessons = [
          {
            moduleId: module1Id,
            courseId,
            title: "What is JavaScript?",
            type: "theory" as const,
            content: `# What is JavaScript?

JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web. It enables interactive web pages and is an essential part of web applications.

## Key Features

- **Dynamic typing**: Variables can hold any type of data
- **First-class functions**: Functions are treated as values
- **Event-driven**: Responds to user interactions
- **Prototype-based**: Objects can inherit from other objects

## Where JavaScript Runs

1. **Browsers**: Chrome, Firefox, Safari, Edge
2. **Server-side**: Node.js, Deno, Bun
3. **Mobile apps**: React Native, Ionic
4. **Desktop apps**: Electron

JavaScript has evolved significantly since its creation in 1995 and now powers millions of websites and applications worldwide.`,
            order: 1,
          },
          {
            moduleId: module1Id,
            courseId,
            title: "Your First JavaScript Code",
            type: "practice" as const,
            content: `# Your First JavaScript Code

Let's write your first JavaScript program! The \`console.log()\` function outputs a message to the console.

## Instructions

1. Use \`console.log()\` to print "Hello, World!" to the console
2. Click "Run Code" to see the output
3. Click "Submit" when you're done

## Example

\`\`\`javascript
console.log("This is a message");
\`\`\``,
            codeTemplate: `// Write your code below
console.log("Hello, World!");`,
            solution: `console.log("Hello, World!");`,
            testCases: [
              {
                input: "",
                expectedOutput: "Hello, World!",
              },
            ],
            order: 2,
          },
          {
            moduleId: module2Id,
            courseId,
            title: "Variables with let and const",
            type: "theory" as const,
            content: `# Variables with let and const

In modern JavaScript, we use \`let\` and \`const\` to declare variables.

## let - For Changeable Values

\`\`\`javascript
let age = 25;
age = 26; // This is allowed
\`\`\`

## const - For Constants

\`\`\`javascript
const PI = 3.14159;
// PI = 3.14; // This would cause an error!
\`\`\`

## Best Practices

- Use \`const\` by default
- Use \`let\` only when you need to reassign
- Avoid \`var\` (old syntax with scope issues)

## Naming Conventions

- Use camelCase: \`firstName\`, \`totalAmount\`
- Use descriptive names: \`userAge\` not \`x\`
- Constants in UPPER_CASE: \`MAX_SIZE\`, \`API_KEY\``,
            order: 1,
          },
          {
            moduleId: module2Id,
            courseId,
            title: "Working with Variables",
            type: "practice" as const,
            content: `# Working with Variables

Practice declaring and using variables.

## Instructions

1. Declare a \`const\` named \`greeting\` with the value "Hello"
2. Declare a \`let\` named \`name\` with your name (or "Student")
3. Use \`console.log()\` to print the greeting and name together

## Expected Output

Your output should be something like: "Hello, Student!"`,
            codeTemplate: `// Declare your variables below
const greeting = "Hello";
let name = "Student";

// Print the greeting
console.log(greeting + ", " + name + "!");`,
            solution: `const greeting = "Hello";
let name = "Student";
console.log(greeting + ", " + name + "!");`,
            testCases: [
              {
                input: "",
                expectedOutput: "Hello, Student!",
              },
            ],
            order: 2,
          },
          {
            moduleId: module3Id,
            courseId,
            title: "Introduction to Arrays",
            type: "theory" as const,
            content: `# Introduction to Arrays

Arrays are ordered collections of values. They're perfect for storing lists of items.

## Creating Arrays

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "orange"];
const mixed = [1, "hello", true, null];
\`\`\`

## Accessing Elements

Arrays are zero-indexed (first element is at index 0):

\`\`\`javascript
const colors = ["red", "green", "blue"];
console.log(colors[0]); // "red"
console.log(colors[2]); // "blue"
\`\`\`

## Array Length

\`\`\`javascript
const items = [1, 2, 3];
console.log(items.length); // 3
\`\`\`

## Common Array Methods

- \`push()\` - Add to end
- \`pop()\` - Remove from end
- \`shift()\` - Remove from start
- \`unshift()\` - Add to start`,
            order: 1,
          },
          {
            moduleId: module3Id,
            courseId,
            title: "Array Methods: map()",
            type: "practice" as const,
            content: `# Array Methods: map()

The \`map()\` method creates a new array by calling a function on every element.

## How it works

\`\`\`javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
// doubled is [2, 4, 6]
\`\`\`

## Instructions

1. You have an array of numbers: \`[1, 2, 3, 4, 5]\`
2. Use \`map()\` to create a new array where each number is squared
3. Print the result

## Expected Output

\`[1, 4, 9, 16, 25]\``,
            codeTemplate: `const numbers = [1, 2, 3, 4, 5];

// Use map() to square each number
const squared = numbers.map(n => n * n);

console.log(squared);`,
            solution: `const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n * n);
console.log(squared);`,
            testCases: [
              {
                input: "",
                expectedOutput: "[ 1, 4, 9, 16, 25 ]",
              },
            ],
            order: 2,
          },
        ];

        for (const lesson of lessons) {
          await ctx.db.insert("lessons", lesson);
        }

        await ctx.db.patch(courseId, { totalLessons: lessons.length });
      }
    }

    return { message: "Courses seeded successfully" };
  },
});
