import type { EnhancedLessonValues } from "../utils";

export const course = "javascript-fundamentals";

export const enhancements: Record<string, Partial<EnhancedLessonValues>> = {
  "What is JS": {
    xpReward: 10,
    hints: ["Think about what makes JavaScript unique as a web language"],
    notes: {
      summary: "JavaScript is the programming language of the web, created in 1995 by Brendan Eich. It runs in every modern browser and powers interactive web experiences.",
      detailedContent: "JavaScript was created in just 10 days. Despite its name, it has no relation to Java. It is standardized as ECMAScript and has evolved through many versions. Today it runs not only in browsers but also on servers via Node.js, in desktop apps via Electron, and on mobile via React Native.",
      prerequisites: ["Basic computer literacy", "Familiarity with using a web browser"],
      learningObjectives: [
        "Understand what JavaScript is and its role in web development",
        "Identify the key capabilities of JavaScript",
        "Write and run your first JavaScript code"
      ],
      resources: [
        { title: "MDN: What is JavaScript?", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript", type: "docs" as const },
        { title: "JavaScript History", url: "https://en.wikipedia.org/wiki/JavaScript", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Hello World",
        description: "The simplest JavaScript program that prints to the console",
        code: 'console.log("Hello, World!");',
        explanation: "console.log() is a function that prints output to the browser's developer console. It's the most common way to debug JavaScript code.",
        output: "Hello, World!",
        difficulty: "beginner",
        concepts: ["console.log", "output", "strings"]
      },
      {
        title: "Interactive Alert",
        description: "Using JavaScript to show an alert dialog in the browser",
        code: 'alert("Welcome to JavaScript!");',
        explanation: "alert() displays a modal dialog with a message. While useful for quick demos, it blocks execution until dismissed.",
        output: "A browser dialog with 'Welcome to JavaScript!'",
        difficulty: "beginner",
        concepts: ["alert", "browser APIs", "user interaction"]
      }
    ],
    keyTakeaways: [
      "JavaScript is the programming language of the web",
      "It was created in 1995 by Brendan Eich",
      "JavaScript can change HTML, respond to events, fetch data, and build full applications",
      "Modern JavaScript runs in browsers, servers, and desktop apps"
    ],
    commonMistakes: [
      { mistake: "Confusing JavaScript with Java", explanation: "Despite similar names, JavaScript and Java are completely different languages with different syntax, use cases, and runtimes.", howToAvoid: "Remember: JavaScript is for the web, Java is for cross-platform applications. The name was a marketing decision." },
      { mistake: "Thinking JavaScript only works in browsers", explanation: "JavaScript now runs on servers (Node.js), desktops (Electron), and mobile devices (React Native).", howToAvoid: "Explore Node.js after mastering browser JavaScript." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What's the difference between JavaScript and Java?",
        "What can I build with JavaScript?",
        "How do I run JavaScript code?"
      ]
    }
  },
  "How JS Runs": {
    xpReward: 10,
    notes: {
      summary: "JavaScript is an interpreted/JIT-compiled language that runs in a runtime environment consisting of an engine, Web APIs, and the event loop.",
      detailedContent: "JavaScript engines (V8, SpiderMonkey, JavaScriptCore) parse source code into an AST, then use Just-In-Time compilation to convert it to machine code for performance. The runtime environment includes the engine, Web APIs (DOM, fetch, timers), and the event loop that coordinates async execution.",
      prerequisites: ["What is JS lesson"],
      learningObjectives: [
        "Understand how JavaScript engines parse and execute code",
        "Differentiate between client-side and server-side JavaScript",
        "Explain the components of a JavaScript runtime"
      ],
      resources: [
        { title: "V8 Engine", url: "https://v8.dev/", type: "docs" as const },
        { title: "JavaScript Event Loop", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Engine Detection",
        description: "Checking which JavaScript engine features are available",
        code: "// V8 specific (Chrome/Node.js)\nconsole.log(typeof Intl);\n// SpiderMonkey specific (Firefox)\nconsole.log(typeof uneval);",
        explanation: "Different engines implement different non-standard features. Always stick to ECMAScript standard features for cross-platform compatibility.",
        difficulty: "beginner",
        concepts: ["engines", "cross-platform", "standards"]
      }
    ],
    keyTakeaways: [
      "JavaScript engines parse source to AST, JIT-compile to machine code, then execute",
      "Memory is managed automatically via garbage collection",
      "Browser JS has DOM access; Node.js has filesystem and OS access",
      "The runtime includes the engine, Web APIs, and the event loop"
    ],
    commonMistakes: [
      { mistake: "Assuming all browsers support the same JS features", explanation: "Older browsers may not support modern ES6+ features. Use transpilers like Babel for compatibility.", howToAvoid: "Check feature support on caniuse.com before using cutting-edge features in production." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What is JIT compilation?",
        "How does garbage collection work in JavaScript?",
        "What's the difference between client-side and server-side JS?"
      ]
    }
  },
  "Variables & Data Types": {
    xpReward: 15,
    notes: {
      summary: "JavaScript has three ways to declare variables (let, const, var) and seven primitive data types plus objects.",
      detailedContent: "Variables are containers for storing data values. Use `let` for reassignable variables, `const` for constants (must be initialized), and avoid `var` in modern code. JavaScript is dynamically typed, meaning you don't need to declare the type of a variable.",
      prerequisites: ["What is JS"],
      learningObjectives: [
        "Declare variables using let, const, and var",
        "Identify all 7 primitive data types",
        "Use typeof to check variable types"
      ],
      resources: [
        { title: "MDN: JavaScript Data Types", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures", type: "docs" as const },
        { title: "MDN: let statement", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Variable Declaration",
        description: "Using let, const, and var",
        code: 'let name = "Alice";\nconst birthYear = 1990;\nvar oldWay = "avoid";\n\nname = "Bob"; // OK\n// birthYear = 1991; // Error: Assignment to constant variable',
        explanation: "let allows reassignment but not redeclaration in the same scope. const prevents reassignment entirely. var is function-scoped and can cause subtle bugs.",
        difficulty: "beginner",
        concepts: ["let", "const", "var", "variable declaration"]
      },
      {
        title: "Type Checking with typeof",
        description: "Using typeof to determine variable types",
        code: 'console.log(typeof "hello"); // "string"\nconsole.log(typeof 42); // "number"\nconsole.log(typeof true); // "boolean"\nconsole.log(typeof undefined); // "undefined"\nconsole.log(typeof null); // "object" (known bug!)\nconsole.log(typeof Symbol()); // "symbol"\nconsole.log(typeof 1n); // "bigint"',
        explanation: "typeof returns a string indicating the type. Note that typeof null returns 'object' - this is a long-standing bug in JavaScript that can't be fixed for backward compatibility.",
        difficulty: "beginner",
        concepts: ["typeof", "type checking", "null bug"]
      }
    ],
    keyTakeaways: [
      "Use let for variables that need reassignment",
      "Use const by default for variables that won't be reassigned",
      "Avoid var in modern JavaScript",
      "JavaScript has 7 primitive types: string, number, boolean, null, undefined, symbol, bigint",
      "typeof null returns 'object' - this is a known bug"
    ],
    commonMistakes: [
      { mistake: "Using var and getting unexpected scoping", explanation: "var is function-scoped, not block-scoped, which can lead to bugs in loops and conditionals.", howToAvoid: "Always use let or const instead of var." },
      { mistake: "Treating null and undefined the same", explanation: "null is an intentional absence of value; undefined means a variable hasn't been assigned.", howToAvoid: "Use null when you want to explicitly clear a value; let JavaScript use undefined for unassigned variables." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When should I use const vs let?",
        "What's the difference between null and undefined?",
        "Why does typeof null return 'object'?"
      ]
    }
  },
  "Setting Up Environment": {
    xpReward: 10,
    notes: {
      summary: "Set up VS Code with useful extensions, learn browser DevTools, and install Node.js to run JavaScript anywhere.",
      detailedContent: "A good development environment includes VS Code with ESLint and Prettier extensions for code quality, browser DevTools (F12) for debugging, and Node.js for running JavaScript outside the browser.",
      prerequisites: ["Variables & Data Types"],
      learningObjectives: [
        "Install and configure VS Code with essential extensions",
        "Use browser Developer Tools effectively",
        "Install Node.js and run JavaScript files from the terminal"
      ],
      resources: [
        { title: "VS Code Download", url: "https://code.visualstudio.com/", type: "docs" as const },
        { title: "Node.js Download", url: "https://nodejs.org/", type: "docs" as const },
        { title: "Chrome DevTools Overview", url: "https://developer.chrome.com/docs/devtools/overview/", type: "tutorial" as const },
      ]
    },
    keyTakeaways: [
      "VS Code with ESLint and Prettier is the standard JS editor setup",
      "Browser DevTools (F12) let you debug, inspect, and profile code",
      "Node.js lets you run JavaScript outside the browser"
    ],
    commonMistakes: [
      { mistake: "Skipping ESLint setup", explanation: "Without a linter, you might miss subtle bugs that ESLint catches automatically.", howToAvoid: "Install ESLint extension and create a basic .eslintrc config." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What VS Code extensions do I need for JavaScript?",
        "How do I open Chrome DevTools?",
        "What is Node.js used for?"
      ]
    }
  },
  "Hello JS Practice": {
    xpReward: 25,
    hints: ["Use the + operator to join strings", "Template literals with backticks are another option: `Hello ${name}!`"],
    notes: {
      summary: "Practice writing a JavaScript function that takes a name and returns a greeting string.",
      detailedContent: "In this exercise, you'll create a greet() function that demonstrates string concatenation and return values. This is a fundamental pattern you'll use throughout your JavaScript journey.",
      prerequisites: ["Variables & Data Types"],
      learningObjectives: [
        "Write a function that accepts parameters",
        "Use string concatenation to build dynamic strings",
        "Return values from functions"
      ],
      resources: [
        { title: "MDN: Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions", type: "docs" as const },
        { title: "MDN: Template Literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Various Greeting Styles",
        description: "Different ways to build the same greeting",
        code: 'function greet1(name) { return "Hello, " + name + "!"; }\nfunction greet2(name) { return `Hello, ${name}!`; }\nfunction greet3(name) { return ["Hello,", name, "!"].join(" "); }\nconsole.log(greet1("World"));\nconsole.log(greet2("World"));\nconsole.log(greet3("World"));',
        explanation: "All three approaches produce the same output. Template literals (greet2) are the most modern and readable approach.",
        output: "Hello, World!\nHello, World!\nHello, World!",
        difficulty: "beginner",
        concepts: ["string concatenation", "template literals", "functions"]
      }
    ],
    playground: {
      enabled: true,
      starterCode: 'function greet(name) {\n  // Your code here\n  return "";\n}\n\nconsole.log(greet("World"));',
      language: "javascript",
      hints: ["Remember to use the + operator or template literals"],
      solution: 'function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));'
    },
    keyTakeaways: [
      "Functions are reusable blocks of code",
      "Parameters let functions accept input",
      "The return statement sends a value back to the caller",
      "Template literals (`) make string building cleaner"
    ],
    commonMistakes: [
      { mistake: "Forgetting the return statement", explanation: "Without return, the function returns undefined instead of the greeting.", howToAvoid: "Always explicitly return values from functions that should produce output." },
      { mistake: "Using wrong quotes", explanation: "Single quotes '' and double quotes \"\" don't support interpolation. Only backticks `` do.", howToAvoid: "Use backtick template literals when you need to embed variables in strings." }
    ],
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "Why is my function returning undefined?",
        "What's the difference between concatenation and template literals?",
        "How do I test my function with different inputs?"
      ]
    }
  },
  "Operators": {
    xpReward: 15,
    notes: {
      summary: "JavaScript operators let you perform arithmetic, comparisons, logical operations, and assignments on values.",
      detailedContent: "Operators are the building blocks of expressions in JavaScript. There are arithmetic operators (+, -, *, /, %, **), comparison operators (===, !==, >, <, >=, <=), logical operators (&&, ||, !), and assignment operators (=, +=, -=, etc.). Always prefer strict equality (===) over loose equality (==).",
      prerequisites: ["Variables & Data Types"],
      learningObjectives: [
        "Use arithmetic operators for basic math operations",
        "Compare values using strict and loose equality",
        "Combine conditions with logical operators",
        "Use assignment operators for concise updates"
      ],
      resources: [
        { title: "MDN: Expressions and Operators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators", type: "docs" as const },
        { title: "JavaScript == vs ===", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Operator Precedence",
        description: "Understanding how JavaScript evaluates complex expressions",
        code: "console.log(2 + 3 * 4);  // 14 (multiplication first)\nconsole.log((2 + 3) * 4);  // 20 (parentheses override)\nconsole.log(2 ** 3 ** 2);  // 512 (right-to-left)",
        explanation: "Operator precedence determines the order of evaluation. Use parentheses to make your intent clear.",
        difficulty: "beginner",
        concepts: ["precedence", "associativity", "grouping"]
      },
      {
        title: "Truthiness and Short-Circuit Evaluation",
        description: "How JavaScript evaluates logical expressions",
        code: 'console.log(true && "hello");  // "hello"\nconsole.log(false || "world");  // "world"\nconsole.log(0 || "default");  // "default"\nconsole.log("" && "never");  // ""',
        explanation: "&& returns the first falsy value or the last truthy value. || returns the first truthy value or the last falsy value. This enables concise default values and conditional execution.",
        difficulty: "intermediate",
        concepts: ["short-circuit", "truthy", "falsy", "logical operators"]
      }
    ],
    keyTakeaways: [
      "Always use === and !== instead of == and !=",
      "Use ** for exponentiation, % for remainder",
      "&& and || use short-circuit evaluation",
      "Parentheses override operator precedence"
    ],
    commonMistakes: [
      { mistake: "Using = instead of == or ===", explanation: "A single = is assignment, not comparison. This is a common source of bugs.", howToAvoid: "Always use === for comparison. Enable ESLint's eqeqeq rule to catch this." },
      { mistake: "Forgetting operator precedence", explanation: "3 + 4 * 5 is 23, not 35. Without parentheses, multiplication happens first.", howToAvoid: "Use parentheses liberally when combining different operators." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the difference between == and ===?",
        "How does short-circuit evaluation work?",
        "What are truthy and falsy values in JavaScript?"
      ]
    }
  },
  "Type Conversion": {
    xpReward: 12,
    notes: {
      summary: "JavaScript can convert between types both implicitly (coercion) and explicitly. Understanding this is crucial for avoiding bugs.",
      detailedContent: "JavaScript is dynamically typed, which means variables can change type. Implicit coercion happens when operators are applied to different types (e.g., '5' - 3 = 2). Explicit conversion uses functions like Number(), String(), Boolean().",
      prerequisites: ["Operators"],
      learningObjectives: [
        "Identify when JavaScript performs implicit type coercion",
        "Use explicit conversion functions: Number(), String(), Boolean()",
        "Avoid common pitfalls with loose equality and coercion"
      ],
      resources: [
        { title: "MDN: Type Conversions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number", type: "docs" as const },
        { title: "JavaScript Type Coercion Explained", url: "https://www.freecodecamp.org/news/js-type-coercion-explained/", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Implicit Coercion Examples",
        description: "JavaScript automatically converts types in certain contexts",
        code: 'console.log("5" - 3);    // 2\nconsole.log("5" + 3);    // "53"\nconsole.log(+"5");        // 5\nconsole.log(!"hello");    // false\nconsole.log(!!"hello");   // true',
        explanation: "The - operator converts strings to numbers. The + operator concatenates strings. Unary + converts to number. ! coerces to boolean and negates.",
        difficulty: "beginner",
        concepts: ["coercion", "unary operators", "type conversion"]
      },
      {
        title: "Explicit Conversion",
        description: "Using built-in functions for intentional type conversion",
        code: 'const str = "42";\nconsole.log(Number(str));     // 42\nconsole.log(parseInt(str));   // 42\nconsole.log(String(42));      // "42"\nconsole.log(Boolean(0));      // false\nconsole.log(Boolean(1));      // true',
        explanation: "Use explicit conversion when you want to be clear about your intent. parseInt is useful for strings like '42px'.",
        difficulty: "beginner",
        concepts: ["Number()", "String()", "Boolean()", "parseInt"]
      }
    ],
    keyTakeaways: [
      "Implicit coercion happens when operators encounter mixed types",
      "Use explicit conversion (Number, String, Boolean) for clarity",
      "The + operator favors string concatenation; - favors numeric conversion",
      "Always use === to avoid unexpected coercion in comparisons"
    ],
    commonMistakes: [
      { mistake: "Relying on coercion for comparisons", explanation: "'5' == 5 returns true due to coercion, but they are different types.", howToAvoid: "Always use === instead of == to avoid coercion in comparisons." },
      { mistake: "Adding numbers and strings unexpectedly", explanation: "console.log(1 + 2 + '3') returns '33' not 6.", howToAvoid: "Explicitly convert values with Number() or String() before concatenation." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "When does JavaScript coerce types?",
        "How do I convert a string to a number?",
        "Why is 1 + 2 + '3' = '33'?"
      ]
    }
  },
  "Conditionals": {
    xpReward: 15,
    notes: {
      summary: "Conditionals let you execute different code based on boolean conditions using if/else if/else and switch statements.",
      detailedContent: "The if statement executes a block if a condition is truthy. if/else provides an alternative. else if chains multiple conditions. switch compares a value against multiple case labels. Ternary operator (condition ? a : b) provides concise inline conditionals.",
      prerequisites: ["Operators"],
      learningObjectives: [
        "Write if/else if/else conditional statements",
        "Use switch statements for multiple discrete comparisons",
        "Use the ternary operator for concise conditionals"
      ],
      resources: [
        { title: "MDN: if...else", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else", type: "docs" as const },
        { title: "MDN: switch", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "if/else if/else Pattern",
        description: "Classic conditional branching",
        code: 'const score = 85;\nlet grade;\nif (score >= 90) {\n  grade = "A";\n} else if (score >= 80) {\n  grade = "B";\n} else if (score >= 70) {\n  grade = "C";\n} else {\n  grade = "F";\n}\nconsole.log(grade); // "B"',
        explanation: "Conditions are evaluated top-down. The first truthy condition executes its block and skips the rest. The else block is a fallback.",
        difficulty: "beginner",
        concepts: ["if/else", "control flow", "comparison"]
      },
      {
        title: "Ternary Operator",
        description: "Concise inline conditionals",
        code: 'const age = 20;\nconst status = age >= 18 ? "adult" : "minor";\nconsole.log(status); // "adult"\n\n// Nested ternary (use sparingly)\nconst type = age > 65 ? "senior" : age >= 18 ? "adult" : "minor";',
        explanation: "The ternary operator is perfect for simple if/else assignments. Avoid nesting ternaries - they become hard to read.",
        difficulty: "intermediate",
        concepts: ["ternary", "inline conditional", "expression"]
      }
    ],
    keyTakeaways: [
      "if/else if/else evaluates conditions top-down",
      "switch is best for comparing a single value against many options",
      "The ternary operator (condition ? a : b) is an expression, not a statement",
      "Keep conditionals simple; extract complex logic into named functions"
    ],
    commonMistakes: [
      { mistake: "Assignment in condition: if (x = 5)", explanation: "Single = assigns, it doesn't compare. The condition always evaluates to the assigned value.", howToAvoid: "Always use === in conditions. Enable ESLint's no-cond-assign rule." },
      { mistake: "Forgetting break in switch", explanation: "Without break, execution 'falls through' to the next case, causing bugs.", howToAvoid: "Always add break or return in each case. Use a linter to enforce this." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When should I use switch instead of if/else?",
        "How do I use the ternary operator?",
        "What happens if I forget break in a switch?"
      ]
    }
  },
  "Loops": {
    xpReward: 15,
    notes: {
      summary: "Loops let you repeat code execution: for loops with counters, while loops with conditions, and for...of for iterables.",
      detailedContent: "JavaScript provides several loop constructs. The for loop runs a block a specific number of times. while loops run as long as a condition is true. do...while runs at least once. for...of iterates over iterable values. for...in iterates over object keys.",
      prerequisites: ["Conditionals"],
      learningObjectives: [
        "Use for loops with counter variables",
        "Use while and do...while loops for condition-based repetition",
        "Use for...of to iterate over arrays",
        "Control loop execution with break and continue"
      ],
      resources: [
        { title: "MDN: Loops and Iteration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration", type: "docs" as const },
        { title: "MDN: for...of", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Loop Variants",
        description: "Different loop styles for different scenarios",
        code: '// for loop\nfor (let i = 0; i < 3; i++) {\n  console.log(i); // 0, 1, 2\n}\n\n// while loop\nlet count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}\n\n// for...of loop\nconst items = ["a", "b", "c"];\nfor (const item of items) {\n  console.log(item); // a, b, c\n}',
        explanation: "for loops are best when you know the number of iterations. while loops are best for condition-based repetition. for...of is the cleanest way to iterate array elements.",
        difficulty: "beginner",
        concepts: ["for", "while", "for...of", "iteration"]
      },
      {
        title: "break and continue",
        description: "Controlling loop execution flow",
        code: 'for (let i = 0; i < 10; i++) {\n  if (i === 3) continue; // skip 3\n  if (i === 7) break;    // stop at 7\n  console.log(i); // 0, 1, 2, 4, 5, 6\n}',
        explanation: "continue skips the rest of the current iteration and moves to the next. break exits the loop entirely. Use them sparingly for cleaner logic.",
        difficulty: "intermediate",
        concepts: ["break", "continue", "loop control"]
      }
    ],
    keyTakeaways: [
      "Use for loops when you know the iteration count",
      "Use while loops for condition-based repetition",
      "Use for...of for iterating array elements",
      "break exits a loop; continue skips to the next iteration"
    ],
    commonMistakes: [
      { mistake: "Infinite loops", explanation: "If the loop condition never becomes false, the loop runs forever and crashes the browser.", howToAvoid: "Ensure your loop variable updates toward the exit condition. Use a counter limit for safety." },
      { mistake: "Off-by-one errors", explanation: "Using <= instead of < in a for loop can cause one extra iteration.", howToAvoid: "Use < for zero-based indexing and <= only when you specifically need inclusive bounds." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the difference between for and while?",
        "When should I use for...of?",
        "How do I avoid infinite loops?"
      ]
    }
  },
  "FizzBuzz": {
    xpReward: 30,
    hints: ["Use modulo operator % to check divisibility", "Check divisibility by 15 first (since 15 is divisible by both 3 and 5)", "Build the output string incrementally"],
    notes: {
      summary: "FizzBuzz is a classic programming challenge that tests your understanding of loops, conditionals, and the modulo operator.",
      detailedContent: "FizzBuzz is a common interview question that requires printing numbers 1 to n, replacing multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both with 'FizzBuzz'.",
      prerequisites: ["Loops", "Conditionals"],
      learningObjectives: [
        "Combine loops and conditionals to solve a problem",
        "Use the modulo operator (%) for divisibility checks",
        "Handle multiple conditions with proper order"
      ],
      resources: [
        { title: "FizzBuzz on CodingBat", url: "https://codingbat.com/prob/p153748", type: "tutorial" as const },
        { title: "MDN: Remainder (%)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Classic FizzBuzz",
        description: "The standard implementation",
        code: 'function fizzBuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) console.log("FizzBuzz");\n    else if (i % 3 === 0) console.log("Fizz");\n    else if (i % 5 === 0) console.log("Buzz");\n    else console.log(i);\n  }\n}\nfizzBuzz(15);',
        explanation: "Check divisibility by 15 FIRST because any number divisible by 15 is also divisible by 3 and 5. The order of conditions matters.",
        output: "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz",
        difficulty: "beginner",
        concepts: ["modulo", "conditionals", "loops"],
        variations: [
          { name: "String Builder", code: 'function fizzBuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    let out = "";\n    if (i % 3 === 0) out += "Fizz";\n    if (i % 5 === 0) out += "Buzz";\n    console.log(out || i);\n  }\n}', description: "Builds the string incrementally, avoiding the need for a separate 15 check." },
          { name: "Switch Version", code: 'function fizzBuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    switch (true) {\n      case i % 15 === 0: console.log("FizzBuzz"); break;\n      case i % 3 === 0: console.log("Fizz"); break;\n      case i % 5 === 0: console.log("Buzz"); break;\n      default: console.log(i);\n    }\n  }\n}', description: "Uses switch with boolean conditions for a different syntax." }
        ]
      }
    ],
    playground: {
      enabled: true,
      starterCode: 'function fizzBuzz(n) {\n  // Your code here\n  for (let i = 1; i <= n; i++) {\n  }\n}\n\nfizzBuzz(20);',
      language: "javascript",
      hints: ["Check i % 15 === 0 first", "Use else if chains"],
      solution: 'function fizzBuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) console.log("FizzBuzz");\n    else if (i % 3 === 0) console.log("Fizz");\n    else if (i % 5 === 0) console.log("Buzz");\n    else console.log(i);\n  }\n}'
    },
    keyTakeaways: [
      "Check the most specific condition first (divisible by 15)",
      "The modulo operator (%) gives the remainder of division",
      "FizzBuzz tests basic control flow understanding",
      "There are multiple valid approaches (if/else, string builder, switch)"
    ],
    commonMistakes: [
      { mistake: "Checking divisibility by 3 or 5 before 15", explanation: "If you check i % 3 === 0 first, it will catch numbers divisible by 15 too, and you'll never print FizzBuzz.", howToAvoid: "Always check the combined condition (15) first, or use the string builder pattern." },
      { mistake: "Using else instead of else if", explanation: "Without else if, multiple conditions can fire for the same number.", howToAvoid: "Use else if to ensure only one branch executes." }
    ],
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "Why does my code print Fizz instead of FizzBuzz for 15?",
        "How does the modulo operator work?",
        "Can you show me the string builder approach?"
      ]
    }
  },
  "Defining Functions": {
    xpReward: 15,
    notes: {
      summary: "Functions are reusable blocks of code that can accept parameters and return values. They are fundamental to JavaScript programming.",
      detailedContent: "Functions can be defined using function declarations (hoisted), function expressions (not hoisted), or arrow functions (lexical this). Parameters can have defaults, and functions can return any value or undefined if no return statement.",
      prerequisites: ["Operators & Control Flow"],
      learningObjectives: [
        "Define functions using declarations, expressions, and arrow syntax",
        "Understand parameter passing and default values",
        "Use return values effectively"
      ],
      resources: [
        { title: "MDN: Functions Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions", type: "docs" as const },
        { title: "MDN: Arrow Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Function Declaration vs Expression vs Arrow",
        description: "Three ways to define the same function",
        code: '// Declaration (hoisted)\nfunction add1(a, b) { return a + b; }\n\n// Expression (not hoisted)\nconst add2 = function(a, b) { return a + b; };\n\n// Arrow (lexical this)\nconst add3 = (a, b) => a + b;\n\nconsole.log(add1(1, 2), add2(3, 4), add3(5, 6));',
        explanation: "Declarations are hoisted (usable before definition). Expressions follow normal variable scoping. Arrow functions are concise and inherit this from the surrounding scope.",
        difficulty: "beginner",
        concepts: ["function declaration", "function expression", "arrow function"]
      }
    ],
    keyTakeaways: [
      "Function declarations are hoisted; expressions are not",
      "Arrow functions are concise but don't bind their own this",
      "Default parameters make functions more robust",
      "Always return a value explicitly or the function returns undefined"
    ],
    commonMistakes: [
      { mistake: "Forgetting parentheses when calling a function", explanation: "Using myFunction without () references the function itself, not its return value.", howToAvoid: "Use () to invoke a function. Pass the function reference without () when using as a callback." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What is hoisting?", "When should I use arrow functions?", "What happens if I don't use return?"] }
  },
  "Scope/Hoisting/Closure": {
    xpReward: 20,
    notes: {
      summary: "Scope determines where variables are accessible. Hoisting moves declarations to the top. Closures let functions remember their lexical environment.",
      detailedContent: "JavaScript has global, function, and block scope. var is function-scoped; let/const are block-scoped. Closures are created when a function retains access to its outer scope even after the outer function returns. This enables data privacy and factory functions.",
      prerequisites: ["Defining Functions"],
      learningObjectives: ["Understand global, function, and block scope", "Explain hoisting behavior", "Create and use closures effectively"],
      resources: [
        { title: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", type: "docs" as const },
        { title: "MDN: Scope", url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Closure Example",
        description: "A function that remembers its creation scope",
        code: 'function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2',
        explanation: "The inner function closes over the count variable, preserving access to it even after createCounter finishes. This is the foundation of data privacy in JavaScript.",
        difficulty: "intermediate",
        concepts: ["closure", "lexical scope", "data privacy"]
      }
    ],
    keyTakeaways: ["Scope determines variable visibility", "Hoisting moves declarations (not initializations) to the top", "Closures enable data privacy and function factories", "let/const are block-scoped; var is function-scoped"],
    commonMistakes: [
      { mistake: "Confusing hoisting of declarations vs initializations", explanation: "var x; is hoisted, but var x = 5; - only the declaration is hoisted, not the assignment.", howToAvoid: "Declare variables at the top of their scope for clarity." },
      { mistake: "Closure in loops with var", explanation: "Using var in a loop creates one shared variable, not one per iteration.", howToAvoid: "Use let in for loops to get a new binding per iteration." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["How do closures work?", "What is hoisting?", "Why does let fix the loop closure bug?"] }
  },
  "Callbacks & Higher-Order": {
    xpReward: 20,
    notes: {
      summary: "Higher-order functions take other functions as arguments or return them. Callbacks are functions passed to be called later.",
      detailedContent: "JavaScript treats functions as first-class citizens, meaning they can be passed around like any other value. Higher-order functions like forEach, map, filter, and reduce accept callbacks to operate on arrays. This is a fundamental pattern in JavaScript.",
      prerequisites: ["Defining Functions"],
      learningObjectives: ["Pass functions as arguments to other functions", "Use built-in array methods: forEach, map, filter, reduce", "Create your own higher-order functions"],
      resources: [
        { title: "MDN: Array Methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", type: "docs" as const },
        { title: "Eloquent JS: Higher-Order Functions", url: "https://eloquentjavascript.net/05_higher_order.html", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Array Methods",
        description: "Using map, filter, and reduce for data transformation",
        code: 'const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconst evens = nums.filter(n => n % 2 === 0);\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\nconsole.log(evens);   // [2, 4]\nconsole.log(sum);     // 15',
        explanation: "map transforms each element, filter selects elements, reduce accumulates values. These compose well for clean data pipelines.",
        difficulty: "intermediate",
        concepts: ["map", "filter", "reduce", "functional programming"],
        variations: [
          { name: "Chaining", code: 'const result = nums\n  .filter(n => n > 2)\n  .map(n => n * 10)\n  .reduce((a, b) => a + b, 0);\nconsole.log(result); // 30 + 40 + 50 = 120', description: "Methods can be chained for readable data pipelines." }
        ]
      }
    ],
    keyTakeaways: ["Functions are first-class citizens in JavaScript", "Callbacks are functions passed to be executed later", "map, filter, and reduce replace explicit for loops", "Higher-order functions enable composition and reusability"],
    commonMistakes: [
      { mistake: "Mutating arrays inside map/filter/reduce", explanation: "These methods should be pure - don't modify the original array.", howToAvoid: "Create new values rather than mutating existing ones inside callbacks." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What is a higher-order function?", "When should I use map vs forEach?", "How does reduce work?"] }
  },
  "IIFE & Patterns": {
    xpReward: 15,
    notes: {
      summary: "Immediately Invoked Function Expressions (IIFE) run as soon as they are defined, creating private scopes before ES6 modules.",
      detailedContent: "IIFEs were traditionally used to create private scope and avoid polluting the global namespace. While ES6 modules have largely replaced them, understanding IIFEs is important for working with legacy code and understanding JavaScript's evolution.",
      prerequisites: ["Scope/Hoisting/Closure"],
      learningObjectives: ["Create and use IIFEs", "Understand the module pattern", "Recognize IIFEs in legacy code"],
      resources: [
        { title: "MDN: IIFE", url: "https://developer.mozilla.org/en-US/docs/Glossary/IIFE", type: "docs" as const },
        { title: "JavaScript Module Pattern", url: "https://www.patterns.dev/vanilla/module-pattern/", type: "article" as const },
      ]
    },
    keyTakeaways: ["IIFEs execute immediately after definition", "They create private scopes in pre-ES6 JavaScript", "Modern code uses ES6 modules instead of IIFEs", "Understanding IIFEs helps maintain legacy code"],
    commonMistakes: [
      { mistake: "Forgetting the wrapping parentheses", explanation: "(function(){...})() requires outer parens or the parser treats function as a declaration.", howToAvoid: "Always wrap the function expression in parentheses before invoking with ()." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["What is an IIFE?", "Why were IIFEs used?", "Are IIFEs still relevant today?"] }
  },
  "Practice": {
    xpReward: 30,
    hints: ["Break down the problem into smaller functions", "Test each function independently", "Use array methods for cleaner code"],
    notes: {
      summary: "Apply your learning by solving practice problems involving functions, closures, and array methods.",
      learningObjectives: ["Solve problems independently", "Combine multiple JavaScript concepts", "Write clean, well-structured code"],
      resources: [
        { title: "Codewars", url: "https://www.codewars.com/", type: "tutorial" as const },
        { title: "LeetCode", url: "https://leetcode.com/", type: "tutorial" as const },
      ]
    },
    playground: { enabled: true, language: "javascript" },
    keyTakeaways: ["Practice is essential for mastering concepts", "Break problems into smaller pieces", "Test edge cases in your solutions"],
    commonMistakes: [
      { mistake: "Trying to solve everything in one function", explanation: "Complex problems become harder to debug in monolithic functions.", howToAvoid: "Break down problems into small, testable helper functions." }
    ],
    aiConfig: { tutorMode: "debug", suggestedQuestions: ["How can I make my code cleaner?", "What edge cases am I missing?", "Can you review my solution?"] }
  },
  "Arrays Basics": {
    xpReward: 15,
    notes: {
      summary: "Arrays are ordered collections of values. They are zero-indexed, dynamically sized, and can hold mixed types.",
      detailedContent: "Arrays are created with [] or new Array(). They store elements at numeric indices starting from 0. The length property automatically updates. Arrays can contain any type, including other arrays (for multi-dimensional data).",
      prerequisites: ["Variables & Data Types"],
      learningObjectives: ["Create and access array elements", "Use the length property", "Add and remove elements with push, pop, shift, unshift"],
      resources: [
        { title: "MDN: Arrays", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", type: "docs" as const },
        { title: "JavaScript Array Explorer", url: "https://arrayexplorer.netlify.app/", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Array Operations",
        description: "Common array manipulation techniques",
        code: 'const arr = [1, 2, 3];\narr.push(4);        // [1, 2, 3, 4]\narr.pop();          // [1, 2, 3]\narr.unshift(0);     // [0, 1, 2, 3]\narr.shift();        // [1, 2, 3]\nconsole.log(arr[0]); // 1\nconsole.log(arr.length); // 3',
        explanation: "push/pop work on the end; unshift/shift work on the beginning. shift/unshift are slower because they re-index all elements.",
        difficulty: "beginner",
        concepts: ["push", "pop", "shift", "unshift", "indexing"]
      }
    ],
    keyTakeaways: ["Arrays are zero-indexed", "push/pop are O(1); shift/unshift are O(n)", "Arrays can hold mixed types", "The length property is automatically maintained"],
    commonMistakes: [
      { mistake: "Using non-numeric keys on arrays", explanation: "Adding string keys to an array doesn't affect length.", howToAvoid: "Use objects for key-value data; use arrays only for numerically indexed collections." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What's the difference between push and unshift?", "How do I check if something is an array?", "Why is shift slower than pop?"] }
  },
  "Array Methods": {
    xpReward: 20,
    notes: {
      summary: "JavaScript arrays have powerful built-in methods for iteration, transformation, and searching.",
      detailedContent: "Key array methods include forEach (iterate), map (transform), filter (select), reduce (accumulate), find (search), some/every (test), sort (arrange), and splice/slice (modify/copy).",
      prerequisites: ["Arrays Basics"],
      learningObjectives: ["Use forEach, map, filter, and reduce", "Search arrays with find, indexOf, includes", "Copy and modify arrays with slice and splice"],
      resources: [
        { title: "MDN: Array Methods Cheatsheet", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", type: "docs" as const },
        { title: "10 JavaScript Array Methods", url: "https://www.freecodecamp.org/news/javascript-array-methods-cheatsheet/", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Array Method Showcase",
        description: "Comparing forEach, map, filter, and reduce",
        code: 'const nums = [1, 2, 3, 4, 5];\n\n// forEach - execute for each\nnums.forEach(n => console.log(n));\n\n// map - transform each\nconst doubled = nums.map(n => n * 2);\n\n// filter - keep matches\nconst evens = nums.filter(n => n % 2 === 0);\n\n// find - first match\nconst firstEven = nums.find(n => n % 2 === 0); // 2\n\n// some/every - test\nconst hasEven = nums.some(n => n % 2 === 0); // true\nconst allEven = nums.every(n => n % 2 === 0); // false\n\n// reduce - accumulate\nconst sum = nums.reduce((acc, n) => acc + n, 0); // 15',
        explanation: "Each method serves a specific purpose. Chaining them creates readable data processing pipelines.",
        difficulty: "intermediate",
        concepts: ["forEach", "map", "filter", "reduce", "find", "some", "every"]
      }
    ],
    keyTakeaways: ["forEach iterates, map transforms, filter selects, reduce accumulates", "find returns the first match; some/every test conditions", "Methods can be chained for data pipelines", "These methods don't mutate the original array (except sort and splice)"],
    commonMistakes: [
      { mistake: "Mutating the original array inside map/filter/reduce", explanation: "These methods should be pure to avoid side effects.", howToAvoid: "Create new values in callbacks rather than modifying existing ones." },
      { mistake: "Forgetting to return in map/filter/reduce callbacks", explanation: "Without a return value, map produces undefined-filled arrays.", howToAvoid: "Always use explicit return or arrow function expression syntax." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What's the difference between map and forEach?", "How do I choose between filter and find?", "Can you explain reduce step by step?"] }
  },
  "Objects": {
    xpReward: 15,
    notes: {
      summary: "Objects are collections of key-value pairs used to store structured data. Keys are strings (or Symbols), values can be any type.",
      detailedContent: "Objects are created with {} literal syntax. Properties can be accessed with dot notation (obj.key) or bracket notation (obj['key']). Bracket notation is required for dynamic or non-identifier keys.",
      prerequisites: ["Variables & Data Types"],
      learningObjectives: ["Create and access object properties", "Use dot and bracket notation", "Add, update, and delete properties", "Iterate over object properties"],
      resources: [
        { title: "MDN: Objects", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects", type: "docs" as const },
        { title: "MDN: Property Accessors", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Object Manipulation",
        description: "Creating, reading, updating, and deleting properties",
        code: 'const user = {\n  name: "Alice",\n  age: 30,\n  "full name": "Alice Smith"\n};\n\n// Dot notation\nconsole.log(user.name); // "Alice"\n\n// Bracket notation (required for special keys)\nconsole.log(user["full name"]);\n\n// Dynamic key lookup\nconst key = "age";\nconsole.log(user[key]); // 30\n\n// Add/update\nuser.email = "alice@example.com";\n\n// Delete\ndelete user.age;\n\n// Check existence\nconsole.log("name" in user); // true',
        explanation: "Dot notation is cleaner for known, valid-identifier keys. Bracket notation is required for dynamic keys, computed keys, or keys with spaces/special characters.",
        difficulty: "beginner",
        concepts: ["dot notation", "bracket notation", "property access", "delete", "in operator"]
      }
    ],
    keyTakeaways: ["Objects store key-value pairs", "Use dot notation for known keys; bracket notation for dynamic keys", "Properties can be added, updated, and deleted after creation", "Use the in operator or hasOwnProperty to check for properties"],
    commonMistakes: [
      { mistake: "Using dot notation with dynamic keys", explanation: "user[key] with a variable requires bracket notation. user.key looks for a property literally named 'key'.", howToAvoid: "Use bracket notation when the key is stored in a variable or contains special characters." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["When do I use bracket vs dot notation?", "How do I copy an object?", "What's the difference between null and undefined properties?"] }
  },
  "Object Methods & Destructuring": {
    xpReward: 20,
    notes: {
      summary: "Objects can contain methods, and destructuring provides a concise syntax for extracting properties into variables.",
      detailedContent: "Methods can be defined with shorthand syntax. Object.keys/values/entries provide iteration. Destructuring extracts properties into variables with matching names. Spread (...) copies and merges objects.",
      prerequisites: ["Objects"],
      learningObjectives: ["Define methods on objects", "Iterate over objects with Object.keys/values/entries", "Use destructuring to extract properties", "Use spread to copy and merge objects"],
      resources: [
        { title: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", type: "docs" as const },
        { title: "MDN: Spread Syntax", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Object Destructuring",
        description: "Extracting properties with clean syntax",
        code: 'const user = { name: "Alice", age: 30, city: "NYC" };\n\n// Destructuring\nconst { name, age } = user;\nconsole.log(name, age); // Alice 30\n\n// Renaming\nconst { name: fullName } = user;\nconsole.log(fullName); // Alice\n\n// Defaults\nconst { role = "guest" } = user;\nconsole.log(role); // guest\n\n// Spread\nconst withEmail = { ...user, email: "a@b.com" };\nconsole.log(withEmail);\n// { name: "Alice", age: 30, city: "NYC", email: "a@b.com" }',
        explanation: "Destructuring is especially useful for function parameters and API responses. Spread creates shallow copies.",
        difficulty: "intermediate",
        concepts: ["destructuring", "spread", "default values", "renaming"]
      }
    ],
    keyTakeaways: ["Destructuring extracts object properties into variables", "Use spread (...) for shallow copying and merging", "Object.keys/values/entries iterate over objects", "Method shorthand allows cleaner object definitions"],
    commonMistakes: [
      { mistake: "Deep copying with spread", explanation: "Spread only does shallow copies - nested objects are still referenced.", howToAvoid: "Use structuredClone() or a library like lodash for deep cloning." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What is destructuring?", "How do I set default values in destructuring?", "What's the difference between shallow and deep copy?"] }
  },
  "String Methods": {
    xpReward: 15,
    notes: {
      summary: "JavaScript strings have built-in methods for manipulation, searching, and transformation.",
      detailedContent: "Strings are immutable - methods return new strings rather than modifying the original. Key methods include toLowerCase/toUpperCase, trim, split/join, slice/substring, indexOf/includes/startsWith/endsWith, replace/replaceAll, padStart/padEnd, and repeat.",
      prerequisites: ["Variables & Data Types"],
      learningObjectives: ["Use string methods for common manipulations", "Search within strings", "Transform string case and formatting", "Split and join strings"],
      resources: [
        { title: "MDN: String Methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String", type: "docs" as const },
        { title: "MDN: Template Literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Common String Operations",
        description: "Everyday string manipulation patterns",
        code: 'const str = "  Hello, World!  ";\n\nconsole.log(str.trim());           // "Hello, World!"\nconsole.log(str.toLowerCase());    // "  hello, world!  "\nconsole.log(str.includes("World")); // true\nconsole.log(str.startsWith("  He")); // true\nconsole.log(str.split(", "));       // ["  Hello", "World!  "]\nconsole.log("a-b-c".split("-"));    // ["a", "b", "c"]\nconsole.log(["a", "b"].join("-"));  // "a-b"\nconsole.log("Hello".replace("l", "z")); // "Hezlo"\nconsole.log("Hello".replaceAll("l", "z")); // "Hezzo"',
        explanation: "String methods are chainable since they return new strings. split/join is the most common pair for array-to-string conversion.",
        difficulty: "beginner",
        concepts: ["trim", "split", "join", "replace", "includes", "case conversion"]
      }
    ],
    keyTakeaways: ["Strings are immutable - methods return new strings", "split/join converts between strings and arrays", "use replaceAll for replacing all occurrences", "trim() removes whitespace from both ends"],
    commonMistakes: [
      { mistake: "Trying to modify a string in place", explanation: "str[0] = 'X' doesn't work - strings are immutable.", howToAvoid: "Create a new string with the desired changes using methods like replace or slice." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What's the difference between slice and substring?", "How do I check if a string contains a substring?", "How do I remove all spaces from a string?"] }
  },
  "Regex": {
    xpReward: 20,
    notes: {
      summary: "Regular expressions (regex) are patterns used to match character combinations in strings.",
      detailedContent: "Regex is created with /pattern/flags or new RegExp(). Key patterns include character classes (\\d, \\w, \\s), quantifiers (+, *, ?, {n,m}), anchors (^, $), groups (...), and alternation (|). Flags include g (global), i (case-insensitive), m (multiline).",
      prerequisites: ["String Methods"],
      learningObjectives: ["Write basic regex patterns", "Use regex with test, exec, match, replace, and search", "Use character classes and quantifiers"],
      resources: [
        { title: "MDN: Regular Expressions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions", type: "docs" as const },
        { title: "Regex101", url: "https://regex101.com/", type: "tutorial" as const },
        { title: "RegexOne", url: "https://regexone.com/", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Regex Patterns",
        description: "Common regex use cases",
        code: 'const email = "user@example.com";\nconst phone = "555-123-4567";\n\n// Test if email is valid\nconsole.log(/^\\S+@\\S+\\.\\S+$/.test(email)); // true\n\n// Extract digits\nconsole.log(phone.match(/\\d+/g)); // ["555", "123", "4567"]\n\n// Replace\nconsole.log(phone.replace(/\\d{3}/g, "***")); // "***-***-****"\n\n// Case-insensitive search\nconsole.log("Hello".match(/hello/i)); // ["Hello"]\n\n// Word boundary\nconsole.log("cat category".match(/\\bcat\\b/)); // ["cat"]',
        explanation: "Regex provides powerful pattern matching. Use test() for boolean checks, match() for extracting results, and replace() for substitutions.",
        difficulty: "intermediate",
        concepts: ["character classes", "quantifiers", "anchors", "flags", "groups"],
        variations: [
          { name: "Named Groups", code: 'const match = "2024-01-15".match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);\nconsole.log(match.groups.year); // "2024"', description: "ES2018 added named capture groups for clearer extraction." }
        ]
      }
    ],
    keyTakeaways: ["Regex patterns use /pattern/flags syntax", "test() checks existence; match() extracts results", "Character classes: \\d (digit), \\w (word), \\s (whitespace)", "The g flag finds all matches; i flag ignores case"],
    commonMistakes: [
      { mistake: "Not escaping special characters", explanation: "Characters like . * + ? have special meaning in regex.", howToAvoid: "Escape literal special chars with backslash: \\. matches a literal dot." },
      { mistake: "Overusing regex for simple operations", explanation: "includes(), startsWith(), replaceAll() are simpler for basic string checks.", howToAvoid: "Use string methods for simple operations; use regex only when pattern matching is needed." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["How do I write a regex for email validation?", "What does the g flag do?", "How do I extract parts of a string with regex?"] }
  },
  "Understanding DOM": {
    xpReward: 15,
    notes: {
      summary: "The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree of nodes.",
      detailedContent: "The DOM represents an HTML document as a tree of objects. Each element, attribute, and piece of text is a node. JavaScript can access and modify the DOM through the document object, enabling dynamic page updates.",
      prerequisites: ["Basic HTML knowledge"],
      learningObjectives: ["Understand the DOM tree structure", "Access the document object", "Navigate the DOM tree with parent/child/sibling relationships"],
      resources: [
        { title: "MDN: DOM Introduction", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction", type: "docs" as const },
        { title: "JavaScript DOM Tutorial", url: "https://javascript.info/dom-nodes", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "DOM Tree Navigation",
        description: "Moving through the DOM hierarchy",
        code: '// document is the entry point\nconsole.log(document.body);\nconsole.log(document.documentElement); // <html>\n\n// Navigation properties\nconst body = document.body;\nconsole.log(body.children);  // HTMLCollection\nconsole.log(body.firstChild);\nconsole.log(body.lastChild);\nconsole.log(body.parentNode);\n\n// Check node type\nconsole.log(document.body.nodeType); // 1 (ELEMENT_NODE)',
        explanation: "The DOM tree starts at document, then documentElement (<html>), then body. Each node has properties for navigation: parentNode, childNodes, firstChild, lastChild, nextSibling, previousSibling.",
        difficulty: "beginner",
        concepts: ["DOM tree", "document", "nodes", "navigation"]
      }
    ],
    keyTakeaways: ["The DOM is a tree representation of HTML", "document is the root access point", "Nodes have parent/child/sibling relationships", "nodeType identifies what kind of node it is"],
    commonMistakes: [
      { mistake: "Running DOM code before the page loads", explanation: "Scripts run as soon as they're encountered. If the DOM hasn't loaded, elements don't exist yet.", howToAvoid: "Place scripts at the end of <body> or use DOMContentLoaded/defer." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["What is the DOM?", "How is the DOM tree structured?", "Why can't my script find an element?"] }
  },
  "Selecting/Creating": {
    xpReward: 15,
    notes: {
      summary: "Select existing DOM elements or create new ones using methods like querySelector, createElement, and appendChild.",
      detailedContent: "Select elements with getElementById, querySelector (returns first match), querySelectorAll (returns NodeList). Create elements with createElement, set content with textContent/innerHTML, and insert with appendChild/insertBefore.",
      prerequisites: ["Understanding DOM"],
      learningObjectives: ["Select elements using various methods", "Create new DOM elements", "Insert and remove elements from the DOM"],
      resources: [
        { title: "MDN: Locating DOM Elements", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors", type: "docs" as const },
        { title: "MDN: Creating DOM Elements", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "DOM Selection and Creation",
        description: "Finding elements and adding new ones",
        code: '// Selection\nconst header = document.getElementById("header");\nconst firstBtn = document.querySelector(".btn");\nconst allItems = document.querySelectorAll(".item");\n\n// Creation\nconst div = document.createElement("div");\ndiv.textContent = "Hello";\ndiv.className = "greeting";\n\n// Insertion\ndocument.body.appendChild(div);\n\n// Removing\nheader.remove(); // or parent.removeChild(child)',
        explanation: "querySelector uses CSS selector syntax, making it the most flexible. createElement creates a detached element that must be inserted into the DOM.",
        difficulty: "beginner",
        concepts: ["querySelector", "createElement", "appendChild", "remove"]
      }
    ],
    keyTakeaways: ["querySelector/All use CSS selector syntax", "createElement creates detached elements", "appendChild/insertBefore add elements to the DOM", "Use remove() or removeChild to delete elements"],
    commonMistakes: [
      { mistake: "Using innerHTML with user input", explanation: "innerHTML can execute scripts and is a security risk (XSS).", howToAvoid: "Use textContent for text and createElement for complex structures. Sanitize any user input." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What's the difference between querySelector and getElementById?", "Why is innerHTML dangerous?", "How do I create and insert multiple elements?"] }
  },
  "Styles & Attributes": {
    xpReward: 15,
    notes: {
      summary: "Modify element appearance and behavior through inline styles, CSS classes, and HTML attributes.",
      detailedContent: "Use element.style to set inline styles (camelCase property names), classList to manage CSS classes (add/remove/toggle/contains), and setAttribute/getAttribute for HTML attributes.",
      prerequisites: ["Selecting/Creating"],
      learningObjectives: ["Set and read inline styles", "Add, remove, and toggle CSS classes", "Get and set HTML attributes"],
      resources: [
        { title: "MDN: classList", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList", type: "docs" as const },
        { title: "MDN: Style Property", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Styling Elements",
        description: "Different ways to modify element appearance",
        code: 'const el = document.querySelector(".my-element");\n\n// Inline style\nel.style.backgroundColor = "red";\nel.style.fontSize = "16px";\n\n// CSS classes\nel.classList.add("highlight");\nel.classList.remove("inactive");\nel.classList.toggle("visible");\nconsole.log(el.classList.contains("highlight")); // true\n\n// Attributes\nel.setAttribute("data-id", "123");\nconsole.log(el.getAttribute("data-id")); // "123"\nel.removeAttribute("data-id");',
        explanation: "classList is the cleanest way to manage appearance. Inline styles via style property should be used sparingly. data-* attributes store custom data in elements.",
        difficulty: "beginner",
        concepts: ["style", "classList", "setAttribute", "data attributes"]
      }
    ],
    keyTakeaways: ["Use classList.add/remove/toggle for CSS class management", "Inline styles should be minimal - prefer CSS classes", "data-* attributes store custom data accessible via dataset", "setAttribute/getAttribute work with any HTML attribute"],
    commonMistakes: [
      { mistake: "Using hyphenated CSS property names in style", explanation: "JavaScript uses camelCase: backgroundColor not background-color.", howToAvoid: "Convert CSS properties to camelCase (background-color → backgroundColor, font-size → fontSize)." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["When should I use inline styles vs CSS classes?", "How do I toggle a class?", "What are data attributes used for?"] }
  },
  "Event Listeners": {
    xpReward: 15,
    notes: {
      summary: "Event listeners let you run code in response to user interactions like clicks, key presses, and form submissions.",
      detailedContent: "Use addEventListener(event, handler) to attach listeners. Common events include click, submit, keydown/keyup, mouseenter/mouseleave, input/change, scroll, and load. The event object provides details about the event.",
      prerequisites: ["DOM Manipulation"],
      learningObjectives: ["Add event listeners to elements", "Use the event object", "Handle common events: click, submit, keydown, input"],
      resources: [
        { title: "MDN: Event Reference", url: "https://developer.mozilla.org/en-US/docs/Web/Events", type: "docs" as const },
        { title: "MDN: addEventListener", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Event Listener Patterns",
        description: "Common event handling patterns",
        code: 'const btn = document.querySelector("#myBtn");\nconst input = document.querySelector("#myInput");\n\n// Click event\nbtn.addEventListener("click", (e) => {\n  console.log("Button clicked!");\n  console.log(e.target); // the element that was clicked\n});\n\n// Input event (fires on every change)\ninput.addEventListener("input", (e) => {\n  console.log(e.target.value); // current input value\n});\n\n// Keyboard event\ndocument.addEventListener("keydown", (e) => {\n  console.log(`Key pressed: ${e.key}`);\n  if (e.key === "Enter") {\n    console.log("Enter was pressed");\n  }\n});\n\n// Form submit\nform.addEventListener("submit", (e) => {\n  e.preventDefault(); // stop page reload\n  console.log("Form submitted");\n});',
        explanation: "The event object (e) contains target, currentTarget, type, preventDefault(), stopPropagation(), and more. Always preventDefault on form submits to avoid page reloads.",
        difficulty: "beginner",
        concepts: ["addEventListener", "event object", "preventDefault", "event types"]
      }
    ],
    keyTakeaways: ["addEventListener attaches event handlers", "The event object provides context about the event", "preventDefault() stops default browser behavior", "Remove listeners with removeEventListener for cleanup"],
    commonMistakes: [
      { mistake: "Using inline onclick instead of addEventListener", explanation: "onclick = handler overwrites previous handlers. addEventListener supports multiple handlers.", howToAvoid: "Always use addEventListener for attaching events." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What's the difference between event.target and event.currentTarget?", "How do I remove an event listener?", "What does preventDefault do?"] }
  },
  "Propagation & Delegation": {
    xpReward: 20,
    notes: {
      summary: "Event propagation describes how events travel through the DOM. Event delegation leverages this to handle events efficiently.",
      detailedContent: "Events propagate in three phases: capturing (document → target), target, and bubbling (target → document). Bubbling is most commonly used. Event delegation attaches a single listener to a parent to handle events from multiple children, including dynamically added ones.",
      prerequisites: ["Event Listeners"],
      learningObjectives: ["Understand event capturing and bubbling", "Use stopPropagation to control event flow", "Implement event delegation for dynamic elements"],
      resources: [
        { title: "MDN: Event Bubbling", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling", type: "docs" as const },
        { title: "JavaScript Event Delegation", url: "https://davidwalsh.name/event-delegate", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Event Delegation Pattern",
        description: "Handling clicks on a dynamic list",
        code: '// Instead of adding listeners to each item:\nconst list = document.querySelector("#itemList");\n\n// Add ONE listener to the parent\nlist.addEventListener("click", (e) => {\n  const item = e.target.closest("li");\n  if (!item) return; // not a list item\n  console.log(`Clicked: ${item.textContent}`);\n});\n\n// New items work automatically\nconst newItem = document.createElement("li");\nnewItem.textContent = "Dynamic item";\nlist.appendChild(newItem);\n// Clicking "Dynamic item" still works!',
        explanation: "Event delegation uses bubbling to catch events on a parent. The closest() method finds the nearest ancestor matching a selector. This approach is memory-efficient and handles dynamically added elements.",
        difficulty: "intermediate",
        concepts: ["delegation", "bubbling", "closest", "dynamic elements"]
      }
    ],
    keyTakeaways: ["Events bubble up from target to document by default", "stopPropagation() stops bubbling", "Event delegation attaches one listener to a parent for all children", "Delegation works with dynamically added elements"],
    commonMistakes: [
      { mistake: "Calling stopPropagation unnecessarily", explanation: "Stopping propagation can break other event handlers, especially in complex UIs.", howToAvoid: "Only stopPropagation when you have a specific reason. Let events bubble naturally." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["What is event bubbling?", "How does event delegation work?", "When should I use stopPropagation?"] }
  },
  "Forms & Validation": {
    xpReward: 20,
    notes: {
      summary: "Handle form submission, validate input, and provide user feedback with JavaScript form handling patterns.",
      detailedContent: "Form handling involves preventing default submission, collecting form data (FormData API or individual values), validating input (required fields, format checks, custom rules), and displaying error messages. HTML5 validation attributes (required, minLength, pattern) provide basic validation, while JavaScript enables custom logic.",
      prerequisites: ["Event Listeners"],
      learningObjectives: ["Handle form submission with JavaScript", "Validate form data with custom rules", "Display user-friendly error messages", "Use the FormData API"],
      resources: [
        { title: "MDN: Form Validation", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", type: "docs" as const },
        { title: "MDN: FormData", url: "https://developer.mozilla.org/en-US/docs/Web/API/FormData", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Form Validation",
        description: "Client-side form validation with feedback",
        code: 'const form = document.querySelector("#signup");\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  \n  const data = new FormData(form);\n  const email = data.get("email");\n  const password = data.get("password");\n  \n  const errors = [];\n  \n  if (!email.includes("@")) {\n    errors.push("Valid email required");\n  }\n  if (password.length < 8) {\n    errors.push("Password must be 8+ characters");\n  }\n  \n  if (errors.length > 0) {\n    showErrors(errors);\n  } else {\n    submitForm(data);\n  }\n});\n\nfunction showErrors(errors) {\n  const container = document.querySelector("#errors");\n  container.innerHTML = errors.map(e => `<p>${e}</p>`).join("");\n}',
        explanation: "Always preventDefault on form submits. FormData collects all form fields. Validate all fields and show clear error messages near the relevant inputs.",
        difficulty: "intermediate",
        concepts: ["FormData", "validation", "error handling", "form submission"]
      }
    ],
    keyTakeaways: ["Always call preventDefault on form submit", "FormData provides a clean way to collect form values", "Validate on the client for UX, on the server for security", "Show clear, specific error messages near the relevant fields"],
    commonMistakes: [
      { mistake: "Only using client-side validation", explanation: "Client validation is for UX; server validation is for security. Malicious users can bypass client code.", howToAvoid: "Always validate on the server too. Client validation is just a convenience layer." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["How do I collect form data with JavaScript?", "What validation should I do on the client vs server?", "How do I show error messages next to inputs?"] }
  },
  "let/const/Scoping": {
    xpReward: 15,
    notes: {
      summary: "ES6 introduced let and const for block-scoped variable declarations, replacing var's function scoping.",
      detailedContent: "let and const are block-scoped (within {}), unlike var which is function-scoped. const prevents reassignment (not immutability). The temporal dead zone prevents access before declaration. let and const also create their own scope in for loops.",
      prerequisites: ["Variables & Data Types"],
      learningObjectives: ["Use let and const appropriately", "Understand block scoping vs function scoping", "Explain the temporal dead zone"],
      resources: [
        { title: "MDN: let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let", type: "docs" as const },
        { title: "MDN: const", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Block Scoping in Action",
        description: "How let/const differ from var",
        code: '// Block scope example\n{\n  var a = 1;\n  let b = 2;\n  const c = 3;\n}\nconsole.log(a); // 1 (var escapes the block)\n// console.log(b); // ReferenceError: b is not defined\n// console.log(c); // ReferenceError: c is not defined\n\n// Loop scoping\nfor (var i = 0; i < 3; i++) {}\nconsole.log(i); // 3 (var leaks!)\n\nfor (let j = 0; j < 3; j++) {}\n// console.log(j); // ReferenceError',
        explanation: "var ignores block scope (except functions). let and const are block-scoped, preventing accidental leaks. const is preferred for values that shouldn't be reassigned.",
        difficulty: "beginner",
        concepts: ["block scope", "let", "const", "var", "temporal dead zone"]
      }
    ],
    keyTakeaways: ["let and const are block-scoped; var is function-scoped", "Use const by default; use let when you need to reassign", "The temporal dead zone catches accidental early access", "let in for loops creates a new binding per iteration"],
    commonMistakes: [
      { mistake: "Thinking const means immutable", explanation: "const prevents reassignment, but objects and arrays declared with const can still have their contents modified.", howToAvoid: "Use Object.freeze() for shallow immutability. Remember: const reference ≠ const value." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What is the temporal dead zone?", "When should I use let vs const?", "Why did JavaScript need let and const?"] }
  },
  "Destructuring & Spread": {
    xpReward: 20,
    notes: {
      summary: "Destructuring extracts values from arrays/objects into variables. Spread expands iterables into individual elements.",
      detailedContent: "Array destructuring: const [first, second] = arr. Object destructuring: const { name, age } = obj. Both support defaults and rest patterns. Spread (...) expands arrays into function arguments, combines arrays/objects, and creates shallow copies.",
      prerequisites: ["Arrays & Objects"],
      learningObjectives: ["Destructure arrays and objects", "Use spread to copy and merge data", "Apply destructuring in function parameters"],
      resources: [
        { title: "MDN: Destructuring Assignment", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", type: "docs" as const },
        { title: "MDN: Spread Syntax", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax", type: "docs" as const },
      ]
    },
    keyTakeaways: ["Destructuring extracts values into variables", "Spread copies and merges arrays/objects", "Both support defaults and rest patterns", "Destructuring is especially useful in function parameters"],
    commonMistakes: [
      { mistake: "Confusing spread with rest", explanation: "Spread expands values; rest collects them. Both use ... but in different contexts.", howToAvoid: "Spread is used in assignment/function calls. Rest is used in destructuring and function parameters." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["How does array destructuring work?", "What's the difference between spread and rest?", "How do I use destructuring in function parameters?"] }
  },
  "Optional Chaining/Modules": {
    xpReward: 20,
    notes: {
      summary: "Optional chaining (?.) safely accesses nested properties. ES6 modules organize code into importable files with explicit dependencies.",
      detailedContent: "Optional chaining (?.) short-circuits to undefined if a reference is null/undefined, preventing TypeError. Nullish coalescing (??) returns the right side only for null/undefined (not other falsy values like 0 or ''). ES6 modules use export/import for explicit dependency management.",
      prerequisites: ["Destructuring & Spread"],
      learningObjectives: ["Use optional chaining for safe nested access", "Use nullish coalescing for default values", "Export and import using ES6 module syntax"],
      resources: [
        { title: "MDN: Optional Chaining", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining", type: "docs" as const },
        { title: "MDN: ES6 Modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Optional Chaining and Nullish Coalescing",
        description: "Safe property access and default values",
        code: 'const user = { profile: { name: "Alice" } };\n\n// Without optional chaining\nconst city = user && user.address && user.address.city;\n\n// With optional chaining\nconst city2 = user?.address?.city; // undefined, no error\n\n// Nullish coalescing\nconst name = user?.profile?.name ?? "Guest";\nconst age = user?.age ?? 0; // 0 (not "Guest")\n\n// Optional function call\nconst result = user.save?.(); // undefined if save doesn\'t exist',
        explanation: "?. stops evaluation if the left side is null/undefined. ?? returns the right side only for null/undefined. Together they provide clean, safe data access.",
        difficulty: "intermediate",
        concepts: ["optional chaining", "nullish coalescing", "safe access"],
        variations: [
          { name: "Dynamic Property Access", code: 'const key = "name";\nconst val = obj?.[key]; // safe dynamic access', description: "Optional chaining also works with bracket notation." }
        ]
      }
    ],
    keyTakeaways: ["?. prevents TypeError from accessing null/undefined", "?? distinguishes between null/undefined and other falsy values", "ES6 modules use named and default exports", "Modules are in strict mode and have their own scope"],
    commonMistakes: [
      { mistake: "Using || instead of ?? for defaults", explanation: "|| treats all falsy values (0, '', false) as needing replacement. ?? only replaces null/undefined.", howToAvoid: "Use ?? when 0 or '' are valid values. Use || when you want to replace all falsy values." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["What's the difference between || and ??", "How does optional chaining work with function calls?", "What are ES6 modules?"] }
  },
  "Sync vs Async": {
    xpReward: 12,
    notes: {
      summary: "Synchronous code runs line by line, blocking until each operation completes. Asynchronous code lets other operations run while waiting.",
      detailedContent: "JavaScript is single-threaded but non-blocking via the event loop. setTimeout, fetch, and file I/O are async operations. The event loop continuously checks the call stack and task queues, moving callbacks from the task queue to the call stack when it's empty.",
      prerequisites: ["Functions", "Modern JS ES6+"],
      learningObjectives: ["Differentiate synchronous and asynchronous code", "Understand the event loop conceptually", "Identify common asynchronous operations"],
      resources: [
        { title: "MDN: Event Loop", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop", type: "docs" as const },
        { title: "What the heck is the event loop?", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", type: "video" as const },
      ]
    },
    examples: [
      {
        title: "Sync vs Async Demo",
        description: "Observing asynchronous behavior",
        code: 'console.log("Start");\n\nsetTimeout(() => {\n  console.log("Async callback");\n}, 0);\n\nconsole.log("End");\n\n// Output:\n// Start\n// End\n// Async callback',
        explanation: "Even with 0ms delay, setTimeout's callback runs after the current execution context finishes. This demonstrates the event loop deferring work.",
        difficulty: "beginner",
        concepts: ["event loop", "async", "setTimeout", "call stack"]
      }
    ],
    keyTakeaways: ["Synchronous code blocks execution; async code does not", "JavaScript uses an event loop for async operations", "setTimeout(fn, 0) doesn't run immediately - it's deferred", "Async patterns evolved: callbacks → Promises → async/await"],
    commonMistakes: [
      { mistake: "Expecting setTimeout(fn, 0) to run immediately", explanation: "0ms delay just means the minimum delay. The callback still waits for the call stack to clear.", howToAvoid: "Understand that setTimeout adds to the task queue; it runs after current execution completes." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["How does the event loop work?", "What is the call stack?", "Why does setTimeout(fn, 0) not run immediately?"] }
  },
  "Callbacks to Promises": {
    xpReward: 20,
    notes: {
      summary: "Promises represent asynchronous operations that will complete in the future, providing a cleaner alternative to callbacks.",
      detailedContent: "A Promise is in one of three states: pending, fulfilled, or rejected. Create with new Promise((resolve, reject) => {...}). Chain with .then() for fulfillment, .catch() for rejection, and .finally() for cleanup. Promise.all() waits for all promises; Promise.race() resolves on the first.",
      prerequisites: ["Sync vs Async"],
      learningObjectives: ["Create and use Promises", "Chain .then/.catch/.finally handlers", "Use Promise.all and Promise.race for coordination"],
      resources: [
        { title: "MDN: Using Promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises", type: "docs" as const },
        { title: "JavaScript Promises: An Introduction", url: "https://developers.google.com/web/fundamentals/primers/promises", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Promise Chain",
        description: "Building and consuming a Promise",
        code: 'function fetchUser(id) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (id > 0) {\n        resolve({ id, name: "Alice" });\n      } else {\n        reject(new Error("Invalid ID"));\n      }\n    }, 1000);\n  });\n}\n\nfetchUser(1)\n  .then(user => {\n    console.log(user.name); // "Alice"\n    return fetchUser(2);\n  })\n  .then(user2 => console.log(user2.name))\n  .catch(err => console.error(err))\n  .finally(() => console.log("Done"));',
        explanation: "resolve transitions to fulfilled state; reject transitions to rejected. .then receives the resolved value. .catch handles errors. .finally runs regardless of outcome.",
        difficulty: "intermediate",
        concepts: ["Promise", "resolve", "reject", ".then", ".catch", ".finally"],
        variations: [
          { name: "Promise.all", code: 'const [user, posts] = await Promise.all([\n  fetchUser(1),\n  fetchPosts(1)\n]);', description: "Run multiple promises in parallel and wait for all to complete." }
        ]
      }
    ],
    keyTakeaways: ["Promises have three states: pending, fulfilled, rejected", ".then chains transform values; .catch handles errors", "Promise.all runs promises in parallel", "Always handle promise rejections with .catch()"],
    commonMistakes: [
      { mistake: "Forgetting to return a promise in a .then chain", explanation: "Without return, the next .then receives undefined instead of the promise result.", howToAvoid: "Always return the promise you want to chain to in a .then callback." },
      { mistake: "Not catching promise rejections", explanation: "Unhandled rejections can crash Node processes or cause silent failures.", howToAvoid: "Always add a .catch() at the end of promise chains, or use try/catch with async/await." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What are the states of a Promise?", "How does Promise.all work?", "What happens if I don't catch a rejected Promise?"] }
  },
  "Async/Await": {
    xpReward: 20,
    notes: {
      summary: "Async/await is syntactic sugar over Promises, making async code read like synchronous code.",
      detailedContent: "Declare an async function with async keyword. Use await to pause execution until a Promise resolves. Error handling uses try/catch blocks. Async functions always return a Promise. Await can only be used inside async functions (except top-level await in modules).",
      prerequisites: ["Callbacks to Promises"],
      learningObjectives: ["Write async functions", "Use await to consume promises", "Handle errors with try/catch in async code"],
      resources: [
        { title: "MDN: async function", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function", type: "docs" as const },
        { title: "MDN: await", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Async/Await Pattern",
        description: "Clean asynchronous code with async/await",
        code: 'async function loadUserData(userId) {\n  try {\n    const user = await fetchUser(userId);\n    const posts = await fetchPosts(user.id);\n    return { user, posts };\n  } catch (error) {\n    console.error("Failed to load data:", error);\n    throw error;\n  }\n}\n\n// Parallel execution with async/await\nasync function loadMultiple() {\n  const [user, settings] = await Promise.all([\n    fetchUser(1),\n    fetchSettings()\n  ]);\n  return { ...user, ...settings };\n}',
        explanation: "try/catch replaces .catch(). await unwraps the promise value. Use Promise.all with await for parallel operations.",
        difficulty: "intermediate",
        concepts: ["async", "await", "try/catch", "parallel execution"]
      }
    ],
    keyTakeaways: ["async functions always return a Promise", "await pauses execution until the Promise settles", "Use try/catch for error handling with async/await", "Use Promise.all with await for parallel operations"],
    commonMistakes: [
      { mistake: "Forgetting try/catch in async functions", explanation: "Rejected promises in async functions will cause unhandled rejections if not caught.", howToAvoid: "Always wrap await calls in try/catch, or attach a .catch() to the returned promise." },
      { mistake: "Awaiting in series when parallel is possible", explanation: "await a; await b; runs a then b sequentially, even if they're independent.", howToAvoid: "Use const [a, b] = await Promise.all([promiseA, promiseB]) for independent operations." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What does the async keyword do?", "How do I handle errors with async/await?", "How do I run promises in parallel with async/await?"] }
  },
  "Fetch API": {
    xpReward: 20,
    notes: {
      summary: "The Fetch API provides a modern, promise-based interface for making HTTP requests from the browser.",
      detailedContent: "fetch(url, options) returns a Promise that resolves to a Response object. Parse the body with .json(), .text(), .blob(), etc. Options include method, headers, body. Handle HTTP errors manually - fetch only rejects on network failure, not on 4xx/5xx status codes.",
      prerequisites: ["Async/Await"],
      learningObjectives: ["Make GET and POST requests with fetch", "Handle JSON responses", "Handle HTTP errors properly"],
      resources: [
        { title: "MDN: Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API", type: "docs" as const },
        { title: "MDN: Using Fetch", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Fetch Patterns",
        description: "Common fetch usage patterns",
        code: '// GET request\nasync function getUsers() {\n  const response = await fetch("https://api.example.com/users");\n  if (!response.ok) {\n    throw new Error(`HTTP ${response.status}`);\n  }\n  return response.json();\n}\n\n// POST request\nasync function createUser(data) {\n  const response = await fetch("https://api.example.com/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(data)\n  });\n  if (!response.ok) throw new Error("Request failed");\n  return response.json();\n}\n\n// Error handling\nasync function safeFetch(url) {\n  try {\n    const data = await getUsers();\n    return data;\n  } catch (err) {\n    console.error("Fetch failed:", err);\n    return [];\n  }\n}',
        explanation: "Always check response.ok (status 200-299). fetch only rejects on network errors, not HTTP errors. Always await response.json() to parse the body.",
        difficulty: "intermediate",
        concepts: ["fetch", "GET", "POST", "JSON", "HTTP errors"]
      }
    ],
    keyTakeaways: ["fetch returns a Promise of a Response object", "Check response.ok for HTTP success", "Parse response body with .json(), .text(), etc.", "fetch only rejects on network failure, not HTTP errors"],
    commonMistakes: [
      { mistake: "Not checking response.ok", explanation: "A 404 or 500 response doesn't cause fetch to reject - it resolves successfully but with ok: false.", howToAvoid: "Always check response.ok and throw on non-2xx status codes." },
      { mistake: "Forgetting to await JSON parsing", explanation: "response.json() itself returns a Promise that must be awaited.", howToAvoid: "Always await response.json() or chain with .then(res => res.json())." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["How do I make a POST request with fetch?", "How do I handle fetch errors?", "What does response.ok mean?"] }
  },
  "Constructors & Prototypes": {
    xpReward: 20,
    notes: {
      summary: "Constructor functions and prototypes are the traditional way to create objects with shared methods in JavaScript.",
      detailedContent: "Constructor functions (Capitalized) create objects with new. Methods are added to the prototype to share across instances. Every function has a .prototype property, and every object has a .__proto__ accessor (or Object.getPrototypeOf). Property lookup traverses the prototype chain.",
      prerequisites: ["Functions", "Objects"],
      learningObjectives: ["Create constructor functions", "Add methods to prototypes", "Understand the prototype chain"],
      resources: [
        { title: "MDN: Object Prototypes", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes", type: "docs" as const },
        { title: "MDN: Inheritance and the Prototype Chain", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Constructor and Prototype",
        description: "Creating objects with shared methods",
        code: 'function User(name, age) {\n  this.name = name;\n  this.age = age;\n}\n\n// Shared method on prototype\nUser.prototype.greet = function() {\n  return `Hello, I\'m ${this.name}`;\n};\n\nconst user1 = new User("Alice", 30);\nconst user2 = new User("Bob", 25);\nconsole.log(user1.greet()); // "Hello, I\'m Alice"\nconsole.log(user1.greet === user2.greet); // true (shared)',
        explanation: "Methods on the prototype are shared across all instances, saving memory. The new keyword creates a new object, sets its prototype, and binds this.",
        difficulty: "intermediate",
        concepts: ["constructor", "prototype", "new keyword", "shared methods"]
      }
    ],
    keyTakeaways: ["Constructor functions use the new keyword", "Add shared methods to the prototype, not the constructor", "All objects have a prototype chain for property lookup", "Use instanceof to check an object's constructor"],
    commonMistakes: [
      { mistake: "Forgetting new when calling a constructor", explanation: "Without new, this refers to the global object (or undefined in strict mode), and no new object is created.", howToAvoid: "Use class syntax (ES6) which enforces proper construction. Or add a check: if (!new.target) return new User(name);" }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["How does the prototype chain work?", "What does the new keyword do?", "Why are prototype methods more efficient?"] }
  },
  "ES6 Classes": {
    xpReward: 15,
    notes: {
      summary: "ES6 class syntax provides a cleaner, more familiar way to create constructor functions and prototypes.",
      detailedContent: "Classes are syntactic sugar over prototypes. Define with class keyword, constructor method, and instance methods. Class syntax supports getters/setters, static methods, and private fields (#). Unlike function constructors, class declarations are not hoisted.",
      prerequisites: ["Constructors & Prototypes"],
      learningObjectives: ["Define classes with the class keyword", "Add methods, getters, and static methods", "Use private fields with # syntax"],
      resources: [
        { title: "MDN: Classes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes", type: "docs" as const },
        { title: "JavaScript Classes Tutorial", url: "https://javascript.info/class", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "ES6 Class Syntax",
        description: "Modern class definition with various features",
        code: 'class User {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  // Instance method\n  greet() {\n    return `Hi, I\'m ${this.name}`;\n  }\n  \n  // Getter\n  get isAdult() {\n    return this.age >= 18;\n  }\n  \n  // Static method\n  static createAnonymous() {\n    return new User("Anonymous", 0);\n  }\n}\n\nconst alice = new User("Alice", 30);\nconsole.log(alice.greet());\nconsole.log(alice.isAdult);\nconst anon = User.createAnonymous();',
        explanation: "Classes make OOP more intuitive. The constructor runs on instantiation. Methods are automatically on the prototype. Static methods belong to the class itself.",
        difficulty: "intermediate",
        concepts: ["class", "constructor", "getter", "static", "instance"]
      }
    ],
    keyTakeaways: ["Classes are syntactic sugar over prototypes", "Use constructor for initialization", "Static methods belong to the class, not instances", "Class declarations are not hoisted"],
    commonMistakes: [
      { mistake: "Forgetting this in class methods", explanation: "this refers to the instance. Without it, you access undefined or global variables.", howToAvoid: "Always use this.propertyName to access instance properties in class methods." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["Why use classes instead of constructor functions?", "What are static methods?", "What does a getter do?"] }
  },
  "Inheritance": {
    xpReward: 20,
    notes: {
      summary: "Inheritance lets a class extend another, reusing and extending behavior using the extends keyword and super.",
      detailedContent: "Use extends to create a subclass. Call super() in the constructor before accessing this. Override methods by redefining them in the subclass. Use super.methodName() to call the parent's method. JavaScript supports single inheritance (one parent class).",
      prerequisites: ["ES6 Classes"],
      learningObjectives: ["Create subclasses with extends", "Call parent constructors and methods with super", "Override methods in subclasses"],
      resources: [
        { title: "MDN: Inheritance", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends", type: "docs" as const },
        { title: "MDN: super", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Class Inheritance",
        description: "Extending a base class",
        code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n  \n  speak() {\n    return `${this.name} barks!`;\n  }\n  \n  static classify() {\n    return "Mammal";\n  }\n}\n\nconst rex = new Dog("Rex", "Husky");\nconsole.log(rex.speak()); // "Rex barks!"\nconsole.log(rex instanceof Dog); // true\nconsole.log(rex instanceof Animal); // true',
        explanation: "extends connects the prototype chain. super() calls the parent constructor. Override methods by redefining them. The subclass inherits all parent methods and can add new ones.",
        difficulty: "intermediate",
        concepts: ["extends", "super", "method overriding", "instanceof"]
      }
    ],
    keyTakeaways: ["extends creates a subclass with inherited behavior", "super() must be called before accessing this in a subclass constructor", "Methods can be overridden in subclasses", "instanceof checks whether an object is an instance of a class"],
    commonMistakes: [
      { mistake: "Forgetting to call super() in the subclass constructor", explanation: "JavaScript throws ReferenceError if you don't call super() before accessing this.", howToAvoid: "Always call super(requiredArgs) as the first line in the subclass constructor." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["Why do I need to call super()?", "How does method overriding work?", "What does instanceof do?"] }
  },
  "Try/Catch": {
    xpReward: 15,
    notes: {
      summary: "try/catch/finally blocks handle runtime errors gracefully without crashing the application.",
      detailedContent: "The try block contains code that might throw. The catch block handles the error. The finally block always runs, regardless of success or failure. Throw custom errors with throw new Error('message'). Catch specific error types using instanceof.",
      prerequisites: ["Functions", "Control Flow"],
      learningObjectives: ["Use try/catch/finally for error handling", "Throw custom errors", "Handle different error types"],
      resources: [
        { title: "MDN: try...catch", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch", type: "docs" as const },
        { title: "MDN: Error", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Error Handling Patterns",
        description: "Robust error handling with try/catch",
        code: 'function parseJSON(str) {\n  try {\n    const data = JSON.parse(str);\n    return { success: true, data };\n  } catch (error) {\n    if (error instanceof SyntaxError) {\n      return { success: false, error: "Invalid JSON format" };\n    }\n    throw error; // rethrow unknown errors\n  } finally {\n    console.log("Parse attempt completed");\n  }\n}\n\nconsole.log(parseJSON(\'{"name":"Alice"}\'));\nconsole.log(parseJSON("invalid"));',
        explanation: "catch receives the error object. Use instanceof to handle different error types. The finally block is for cleanup that must run (closing files, hiding loaders).",
        difficulty: "intermediate",
        concepts: ["try", "catch", "finally", "throw", "error types"]
      }
    ],
    keyTakeaways: ["try/catch prevents crashes from runtime errors", "finally always runs (for cleanup)", "throw custom errors with descriptive messages", "Catch specific error types with instanceof"],
    commonMistakes: [
      { mistake: "Catching without handling", explanation: "Empty catch blocks silently swallow errors, making debugging very difficult.", howToAvoid: "Always log or handle caught errors. If you can't handle it, rethrow it." },
      { mistake: "Not rethrowing errors you can't handle", explanation: "If a function can't recover from an error, it should let the caller handle it.", howToAvoid: "Only catch errors you can meaningfully handle. Rethrow others with throw error." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["When should I use try/catch?", "What happens in the finally block?", "How do I create custom error types?"] }
  },
  "Custom Errors": {
    xpReward: 15,
    notes: {
      summary: "Create custom error classes by extending the built-in Error class for more specific error handling.",
      detailedContent: "Custom errors extend Error, set the name property, and can include additional data fields. This allows callers to catch specific error types and handle them appropriately.",
      prerequisites: ["Try/Catch"],
      learningObjectives: ["Create custom error classes", "Add contextual data to errors", "Catch specific custom error types"],
      resources: [
        { title: "MDN: Error", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error", type: "docs" as const },
        { title: "Custom Errors in JavaScript", url: "https://javascript.info/custom-errors", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Custom Error Classes",
        description: "Domain-specific error types",
        code: 'class ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = "ValidationError";\n    this.field = field;\n  }\n}\n\nclass AuthError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "AuthError";\n  }\n}\n\nfunction validateUser(user) {\n  if (!user.email) {\n    throw new ValidationError("Email is required", "email");\n  }\n  if (!user.name) {\n    throw new ValidationError("Name is required", "name");\n  }\n}\n\ntry {\n  validateUser({});\n} catch (error) {\n  if (error instanceof ValidationError) {\n    console.log(`Field ${error.field}: ${error.message}`);\n  } else if (error instanceof AuthError) {\n    console.log("Auth:", error.message);\n  } else {\n    throw error;\n  }\n}',
        explanation: "Custom errors extend Error to preserve stack traces. The name property identifies the error type. Additional properties carry context for the error handler.",
        difficulty: "intermediate",
        concepts: ["custom errors", "Error inheritance", "type checking", "error context"]
      }
    ],
    keyTakeaways: ["Extend Error to create custom error types", "Set the name property for type identification", "Add contextual properties for better error handling", "Use instanceof to catch specific custom errors"],
    commonMistakes: [
      { mistake: "Not extending Error properly", explanation: "Just returning an object with a message property doesn't preserve the stack trace.", howToAvoid: "Always extend the Error class using class syntax to maintain proper stack traces." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["Why create custom errors?", "How do I preserve stack traces in custom errors?", "How do I add extra data to custom errors?"] }
  },
  "DevTools Debugging": {
    xpReward: 15,
    notes: {
      summary: "Browser Developer Tools provide powerful debugging features including breakpoints, watches, and the console.",
      detailedContent: "Modern DevTools include: Sources tab for breakpoints (line, conditional, DOM change, XHR/fetch), Console for logging and REPL, Watch panel for tracking variables, Scope panel for local/closure/global variables, Call Stack for execution tracing, and Performance/Network tabs for profiling.",
      prerequisites: ["Setting Up Environment"],
      learningObjectives: ["Set breakpoints and step through code", "Use console methods effectively", "Inspect variables and the call stack", "Analyze network requests"],
      resources: [
        { title: "Chrome DevTools Docs", url: "https://developer.chrome.com/docs/devtools/", type: "docs" as const },
        { title: "Console API Reference", url: "https://developer.chrome.com/docs/devtools/console/api/", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Console Methods",
        description: "Advanced console usage beyond console.log",
        code: 'console.log("Basic log");\nconsole.error("Error message");\nconsole.warn("Warning");\nconsole.info("Info");\n\n// Grouping\nconsole.group("User Data");\nconsole.log("Name: Alice");\nconsole.log("Age: 30");\nconsole.groupEnd();\n\n// Table\nconsole.table([\n  { name: "Alice", age: 30 },\n  { name: "Bob", age: 25 }\n]);\n\n// Timing\nconsole.time("operation");\n// ... some code\nconsole.timeEnd("operation");\n\n// Trace\nfunction inner() {\n  console.trace("Call stack trace");\n}\ninner();',
        explanation: "DevTools console offers structured output: console.table for arrays of objects, console.time for performance, console.trace for call stacks. Use appropriate levels (log/error/warn/info) for filtering.",
        difficulty: "beginner",
        concepts: ["console methods", "debugging", "breakpoints", "call stack"]
      }
    ],
    keyTakeaways: ["Use console.table for structured data", "Set breakpoints in the Sources tab for line-by-line debugging", "The Scope panel shows all current variables", "The Call Stack shows the execution path"],
    commonMistakes: [
      { mistake: "Using alert() for debugging", explanation: "alert() blocks the thread and doesn't work for complex data inspection.", howToAvoid: "Use console.log() or breakpoints instead of alert() for debugging." },
      { mistake: "Leaving console.log in production", explanation: "Excessive logging clutters the console and can impact performance.", howToAvoid: "Clean up console.logs before commit, or use a proper logging library with levels." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["How do I set a breakpoint?", "What console methods should I use?", "How do I inspect network requests?"] }
  },
  "'this' keyword": {
    xpReward: 20,
    notes: {
      summary: "The 'this' keyword refers to the execution context. Its value depends on how a function is called, not where it's defined.",
      detailedContent: "this is determined by call site: 1) Global context → global object/window, 2) Method call → the object before the dot, 3) Constructor (new) → new instance, 4) Arrow function → lexical this (outer scope), 5) call/apply/bind → explicitly set. Arrow functions don't bind their own this.",
      prerequisites: ["Functions Deep Dive"],
      learningObjectives: ["Determine what 'this' refers to in different contexts", "Use bind, call, and apply to control 'this'", "Understand arrow function this behavior"],
      resources: [
        { title: "MDN: this", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this", type: "docs" as const },
        { title: "You Don't Know JS: this", url: "https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/this-object-prototypes/README.md", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "'this' Binding Rules",
        description: "How this is determined in different contexts",
        code: '// 1. Global context\nconsole.log(this); // window (browser)\n\n// 2. Method call\nconst obj = {\n  name: "Alice",\n  greet() { return this.name; }\n};\nconsole.log(obj.greet()); // "Alice"\n\n// 3. Arrow function (lexical this)\nconst obj2 = {\n  name: "Bob",\n  greet: () => this.name // this from outer scope\n};\n\n// 4. Explicit binding\nfunction greet() { return this.name; }\nconst user = { name: "Charlie" };\nconsole.log(greet.call(user)); // "Charlie"\n\n// 5. bind\nconst boundGreet = greet.bind(user);\nconsole.log(boundGreet()); // "Charlie"',
        explanation: "this is determined at call time. Arrow functions inherit this from the enclosing scope. Use bind/call/apply to explicitly set this.",
        difficulty: "advanced",
        concepts: ["this binding", "method call", "arrow function", "bind", "call", "apply"]
      }
    ],
    keyTakeaways: ["this depends on how a function is called, not where it's defined", "Arrow functions inherit this from the enclosing lexical scope", "Use bind() to permanently set a function's this", "call() and apply() set this and immediately invoke"],
    commonMistakes: [
      { mistake: "Losing this in callbacks", explanation: "Passing obj.method as a callback loses the obj context - this becomes undefined (strict) or global.", howToAvoid: "Use arrow functions, bind(), or store a reference: const self = this." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["How is this determined in arrow functions?", "What's the difference between call and apply?", "Why do I lose this in setTimeout callbacks?"] }
  },
  "Closures": {
    xpReward: 20,
    notes: {
      summary: "A closure is created when a function retains access to its outer (enclosing) scope even after the outer function has returned.",
      detailedContent: "Closures are a fundamental JavaScript concept. Every function in JavaScript forms a closure. Practical uses include data privacy (module pattern), function factories, partial application, and maintaining state in callbacks.",
      prerequisites: ["Scope/Hoisting/Closure"],
      learningObjectives: ["Identify closures in code", "Use closures for data privacy", "Create function factories with closures"],
      resources: [
        { title: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", type: "docs" as const },
        { title: "Closures in JavaScript", url: "https://javascript.info/closure", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Practical Closure Patterns",
        description: "Real-world closure examples",
        code: '// 1. Data Privacy\nfunction createCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\nconsole.log(counter.decrement()); // 1\n// No direct access to count!\n\n// 2. Function Factory\nfunction multiply(factor) {\n  return (number) => number * factor;\n}\n\nconst double = multiply(2);\nconst triple = multiply(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15\n\n// 3. Memoization\nfunction memoize(fn) {\n  const cache = {};\n  return function(arg) {\n    if (arg in cache) return cache[arg];\n    const result = fn(arg);\n    cache[arg] = result;\n    return result;\n  };\n}',
        explanation: "Closures 'close over' variables from their outer scope. The counter variable persists between calls because the inner functions reference it. This enables powerful patterns like memoization.",
        difficulty: "advanced",
        concepts: ["closure", "data privacy", "factory functions", "memoization"]
      }
    ],
    keyTakeaways: ["A closure is a function with access to its outer scope", "Closures enable data privacy (hidden state)", "Function factories use closures to customize behavior", "Closures power many advanced patterns (memoization, currying)"],
    commonMistakes: [
      { mistake: "Closures in loops with var", explanation: "var i in for loops creates one shared variable; all closures reference the final value.", howToAvoid: "Use let (block-scoped) or an IIFE to capture the current value per iteration." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What is a closure?", "How do closures enable data privacy?", "What's the loop closure bug and how to fix it?"] }
  },
  "Currying/Debouncing": {
    xpReward: 25,
    notes: {
      summary: "Currying transforms a multi-argument function into a sequence of single-argument functions. Debouncing limits how often a function can fire.",
      detailedContent: "Currying: const add = a => b => a + b. Enables partial application and function composition. Debouncing: delays execution until a pause in calls (used for search inputs). Throttling: limits execution to once per interval (used for scrolling).",
      prerequisites: ["Closures"],
      learningObjectives: ["Create and use curried functions", "Implement debounce for input handling", "Implement throttle for scroll/resize events"],
      resources: [
        { title: "MDN: Debounce Pattern", url: "https://developer.mozilla.org/en-US/docs/Glossary/Debounce", type: "docs" as const },
        { title: "JavaScript Debounce Tutorial", url: "https://www.freecodecamp.org/news/javascript-debounce-example/", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Debounce Implementation",
        description: "Limiting rapid function calls",
        code: 'function debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}\n\n// Usage: search input\nconst searchInput = document.querySelector("#search");\nconst handleSearch = debounce((e) => {\n  console.log("Searching:", e.target.value);\n  // API call here\n}, 300);\n\nsearchInput.addEventListener("input", handleSearch);\n\n// Throttle for scroll\nfunction throttle(fn, interval) {\n  let lastTime = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastTime >= interval) {\n      lastTime = now;\n      fn.apply(this, args);\n    }\n  };\n}',
        explanation: "debounce groups rapid calls into one after a pause. throttle ensures at most one call per interval. Both use closures to maintain timing state.",
        difficulty: "advanced",
        concepts: ["debounce", "throttle", "performance", "event optimization"]
      }
    ],
    keyTakeaways: ["Debouncing delays a function until after a pause in calls", "Throttling limits a function to once per time interval", "Both use closures to persist timing state", "Debounce is for search/auto-save; throttle is for scroll/resize"],
    commonMistakes: [
      { mistake: "Debouncing when you need throttling", explanation: "Debouncing delays indefinitely if calls never pause. Throttling guarantees regular execution.", howToAvoid: "Use debounce for 'after typing stops' scenarios. Use throttle for 'while scrolling' scenarios." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["What's the difference between debounce and throttle?", "When should I use debounce?", "How does the closure in debounce work?"] }
  },
  "localStorage": {
    xpReward: 15,
    notes: {
      summary: "localStorage and sessionStorage provide key-value storage in the browser that persists across page reloads.",
      detailedContent: "localStorage persists until explicitly cleared. sessionStorage clears when the tab closes. Both store strings only - use JSON.stringify/parse for objects. Each origin has 5-10MB of storage space. Storage is synchronous and blocks the main thread.",
      prerequisites: ["DOM Manipulation"],
      learningObjectives: ["Store and retrieve data with localStorage", "Use JSON to store complex data", "Handle storage limits and errors"],
      resources: [
        { title: "MDN: Web Storage API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API", type: "docs" as const },
        { title: "MDN: localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "localStorage Patterns",
        description: "Common localStorage usage patterns",
        code: '// Store primitive\nlocalStorage.setItem("theme", "dark");\n\n// Store object (must stringify)\nconst user = { name: "Alice", age: 30 };\nlocalStorage.setItem("user", JSON.stringify(user));\n\n// Retrieve\nconst theme = localStorage.getItem("theme");\nconst savedUser = JSON.parse(localStorage.getItem("user"));\n\n// Remove\nlocalStorage.removeItem("theme");\n\n// Clear all\nlocalStorage.clear();\n\n// Check existence\nif (localStorage.getItem("key") !== null) {\n  // exists\n}\n\n// Storage event (other tabs)\nwindow.addEventListener("storage", (e) => {\n  console.log(`${e.key} changed:`, e.newValue);\n});',
        explanation: "Always parse JSON when retrieving objects. Wrap in try/catch since storage is quota-limited and throws on overflow. The storage event syncs data across tabs.",
        difficulty: "intermediate",
        concepts: ["localStorage", "JSON", "persistence", "storage event"]
      }
    ],
    keyTakeaways: ["localStorage persists until cleared; sessionStorage clears on tab close", "Store only strings - use JSON.stringify/parse for objects", "Wrap storage operations in try/catch for quota errors", "The storage event syncs changes across tabs"],
    commonMistakes: [
      { mistake: "Storing objects without JSON.stringify", explanation: "localStorage.setItem('key', obj) stores '[object Object]' instead of the object data.", howToAvoid: "Always use JSON.stringify() when storing objects and JSON.parse() when reading them." },
      { mistake: "Not handling quota errors", explanation: "localStorage throws an error when storage is full (typically 5-10MB).", howToAvoid: "Wrap storage writes in try/catch and handle QuotaExceededError gracefully." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["What's the difference between localStorage and sessionStorage?", "How do I store objects in localStorage?", "How much data can I store?"] }
  },
  "Browser APIs": {
    xpReward: 20,
    notes: {
      summary: "Modern browsers provide powerful APIs for geolocation, notifications, clipboard access, and more.",
      detailedContent: "Key browser APIs: Geolocation API (getCurrentPosition, watchPosition), Notification API (requestPermission, show), Clipboard API (readText, writeText), History API (pushState, replaceState), and Web Workers for background threads.",
      prerequisites: ["DOM Manipulation"],
      learningObjectives: ["Use the Geolocation API", "Send browser notifications", "Use the Clipboard API", "Understand Web Workers concept"],
      resources: [
        { title: "MDN: Web APIs", url: "https://developer.mozilla.org/en-US/docs/Web/API", type: "docs" as const },
        { title: "MDN: Geolocation API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Browser API Examples",
        description: "Using various browser APIs",
        code: '// Geolocation\nnavigator.geolocation.getCurrentPosition(\n  (pos) => {\n    console.log("Lat:", pos.coords.latitude);\n    console.log("Lng:", pos.coords.longitude);\n  },\n  (err) => console.error(err.message)\n);\n\n// Notifications\nif ("Notification" in window) {\n  Notification.requestPermission().then((permission) => {\n    if (permission === "granted") {\n      new Notification("Hello!", { body: "This is a notification" });\n    }\n  });\n}\n\n// Clipboard\nnavigator.clipboard.writeText("Text to copy")\n  .then(() => console.log("Copied!"))\n  .catch(() => console.log("Failed to copy"));\n\n// Navigate (History API)\nhistory.pushState({ page: 1 }, "", "/page1");',
        explanation: "Most browser APIs require user permission (geolocation, notifications) or secure context (HTTPS). Always check for API support before using and handle permission denials.",
        difficulty: "intermediate",
        concepts: ["Geolocation", "Notifications", "Clipboard", "History API"]
      }
    ],
    keyTakeaways: ["Check API support before using (if ('API' in window))", "Some APIs require user permission", "Secure contexts (HTTPS/localhost) are required for many APIs", "Always handle errors and permission denials"],
    commonMistakes: [
      { mistake: "Not checking for API availability", explanation: "Calling an unsupported API throws a ReferenceError.", howToAvoid: "Always check if the API exists with 'API' in window or typeof API !== 'undefined'." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["How do I get the user's location?", "How do I send browser notifications?", "What APIs require user permission?"] }
  },
  "Project Planning": {
    xpReward: 20,
    notes: {
      summary: "Plan a JavaScript project by defining requirements, choosing tools, structuring files, and following best practices.",
      detailedContent: "A good project plan includes: 1) Define the problem and MVP features, 2) Choose tools (vanilla JS vs framework, build tools, testing), 3) Structure files by feature, 4) Plan data flow, 5) Set up version control, 6) Write tests, 7) Build iteratively.",
      prerequisites: ["All modules above"],
      learningObjectives: ["Plan a JavaScript project from scratch", "Choose appropriate tools and structure", "Follow project best practices"],
      resources: [
        { title: "Project Planning Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools", type: "tutorial" as const },
        { title: "JavaScript Project Architecture", url: "https://www.patterns.dev/posts/classic-design-patterns/", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Todo App Architecture",
        description: "Planning a simple todo application",
        code: '// Project Structure\n// ├── index.html\n// ├── css/\n// │   └── style.css\n// ├── js/\n// │   ├── app.js        // Entry point\n// │   ├── store.js      // Data management\n// │   ├── todo.js       // Todo model\n// │   └── ui.js         // Rendering\n// └── tests/\n//     └── todo.test.js\n\n// Store pattern (simple state management)\nconst Store = {\n  todos: [],\n  addTodo(text) {\n    this.todos.push({ id: Date.now(), text, completed: false });\n    this.save();\n  },\n  removeTodo(id) {\n    this.todos = this.todos.filter(t => t.id !== id);\n    this.save();\n  },\n  toggleTodo(id) {\n    const todo = this.todos.find(t => t.id === id);\n    if (todo) todo.completed = !todo.completed;\n    this.save();\n  },\n  save() {\n    localStorage.setItem("todos", JSON.stringify(this.todos));\n  },\n  load() {\n    this.todos = JSON.parse(localStorage.getItem("todos") || "[]");\n  }\n};',
        explanation: "Separate concerns: data (Store), logic (todo model), and rendering (UI). This makes the app maintainable and testable. Start with the simplest structure and refactor as needed.",
        difficulty: "advanced",
        concepts: ["project structure", "separation of concerns", "state management", "localStorage"]
      }
    ],
    keyTakeaways: ["Start with a clear problem definition and MVP", "Separate concerns: data, logic, rendering", "Structure files by feature for maintainability", "Use version control from day one", "Build iteratively: ship small, improve often"],
    commonMistakes: [
      { mistake: "Over-engineering from the start", explanation: "Adding too many abstractions before they're needed slows down development.", howToAvoid: "Start simple, then refactor as patterns emerge. YAGNI: You Ain't Gonna Need It." }
    ],
    aiConfig: { tutorMode: "socratic", suggestedQuestions: ["How do I structure a JavaScript project?", "What's the best folder structure?", "How do I plan features for an MVP?"] }
  },
  "Next Steps": {
    xpReward: 10,
    notes: {
      summary: "After mastering JavaScript fundamentals, explore modern frameworks, testing, backend development, and TypeScript.",
      detailedContent: "Recommended learning path: 1) Modern JavaScript (ES6+) course on CodeMaster, 2) React for frontend development, 3) Node.js for backend APIs, 4) Testing with Jest/Vitest, 5) TypeScript for type safety, 6) Build and deploy a full-stack project.",
      prerequisites: ["All JavaScript Fundamentals modules"],
      learningObjectives: ["Plan your continued learning path", "Choose next courses based on your goals"],
      resources: [
        { title: "React Course on CodeMaster", url: "/course/react-frontend", type: "tutorial" as const },
        { title: "Node.js Course on CodeMaster", url: "/course/nodejs-apis", type: "tutorial" as const },
        { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", type: "docs" as const },
      ]
    },
    keyTakeaways: [
      "You've built a strong JavaScript foundation",
      "Next: Modern JS, React, Node.js, TypeScript",
      "Build projects to solidify your learning",
      "Join developer communities and contribute to open source"
    ],
    commonMistakes: [
      { mistake: "Trying to learn everything at once", explanation: "Jumping between React, Vue, Node, and TypeScript simultaneously leads to shallow understanding.", howToAvoid: "Focus on one technology at a time. Master it before moving to the next." }
    ],
    aiConfig: { tutorMode: "explain", suggestedQuestions: ["What should I learn after JavaScript?", "Which framework should I learn first?", "Do I need TypeScript?"] }
  },
};
