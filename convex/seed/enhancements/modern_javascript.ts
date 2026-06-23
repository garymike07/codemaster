import type { EnhancedLessonValues } from "../utils";

export const course = "modern-javascript";

export const enhancements: Record<string, Partial<EnhancedLessonValues>> = {
  "What Changed in ES6+": {
    xpReward: 10,
    hints: ["Focus on understanding why ES6 was a turning point for JavaScript"],
    notes: {
      summary: "ES6 (ES2015) was the largest update to JavaScript, introducing modules, classes, arrow functions, promises, template literals, destructuring, and more. Since then, yearly releases have steadily added features.",
      detailedContent: "Before ES6, JavaScript relied on function-scoped var, clumsy prototype-based inheritance, callback-heavy async patterns, and lacked native module support. ES6 transformed the language with block-scoped let/const, arrow functions, classes, template literals, destructuring, spread/rest, Promises, Maps, Sets, and the module system. Subsequent yearly releases added async/await (ES2017), rest/spread for objects (ES2018), Promise.allSettled (ES2019), optional chaining and nullish coalescing (ES2020), logical assignment operators and Promise.any (ES2021), class fields and top-level await (ES2022), array find-from-last and hashbang grammar (ES2023), and more. The language has moved from a 'toy' to a first-class development platform.",
      prerequisites: ["Basic JavaScript knowledge", "Familiarity with ES5 syntax"],
      learningObjectives: [
        "Understand the evolution of JavaScript from ES5 to the modern era",
        "Identify the major features introduced in ES6 and subsequent yearly releases",
        "Recognize why modern JavaScript is safer, more readable, and more powerful"
      ],
      resources: [
        { title: "ES6 Overview", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources", type: "docs" },
        { title: "ECMAScript Versions", url: "https://www.w3schools.com/js/js_versions.asp", type: "article" },
        { title: "JavaScript ES6+ Features Guide", url: "https://devtoolbox.dedyn.io/blog/javascript-es6-features-guide", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "ES5 vs ES6 Comparison",
        description: "Side-by-side comparison showing how ES6 simplifies common patterns",
        code: '// ES5 way\nvar name = "Alice";\nvar greeting = "Hello, " + name + "!";\n\n// ES6+ way\nconst name = "Alice";\nconst greeting = Hello, !;\n\nconsole.log(greeting);',
        explanation: "The ES6 version uses const (block-scoped) and template literals (backtick strings with interpolation). It is shorter, safer, and more readable.",
        output: "Hello, Alice!",
        difficulty: "beginner",
        concepts: ["template literals", "const", "ES6 features"]
      },
      {
        title: "Yearly Release Timeline",
        description: "Key features added in each ECMAScript release",
        code: "// ES2015 (ES6): const, let, arrow functions, classes, modules, promises\n// ES2016 (ES7): Array.includes, exponentiation operator (**)\n// ES2017 (ES8): async/await, Object.values/entries\n// ES2018 (ES9): rest/spread for objects, Promise.finally\n// ES2019 (ES10): Array.flat, Object.fromEntries\n// ES2020 (ES11): optional chaining, nullish coalescing, Promise.allSettled\n// ES2021 (ES12): Promise.any, logical assignment (&&=, ||=, ??=)\n// ES2022 (ES13): class fields, top-level await, .at()\n// ES2023 (ES14): array find-from-last, hashbang\n\nconsole.log('JavaScript evolves every year!');",
        explanation: "JavaScript receives incremental updates every June. Understanding which features belong to which year helps with compatibility decisions.",
        difficulty: "beginner",
        concepts: ["ECMAScript", "version history", "yearly releases"]
      }
    ],
    keyTakeaways: [
      "ES6 (2015) was the biggest update in JavaScript history",
      "Yearly releases since ES6 add smaller, focused features",
      "Modern JavaScript is safer, more expressive, and easier to debug",
      "All modern browsers support ES6+ natively"
    ],
    commonMistakes: [
      { mistake: "Thinking ES6 is a separate language from JavaScript", explanation: "Despite similar names, JavaScript and Java are completely different languages with different syntax, use cases, and runtimes.", howToAvoid: "Remember: JavaScript is for the web, Java is for cross-platform applications. The name was a marketing decision." },
      { mistake: "Assuming all new features are ES6", explanation: "Features like optional chaining (ES2020), class fields (ES2022), and array.at() (ES2022) came in later years. Not everything modern is ES6.", howToAvoid: "Check the ECMAScript year for specific features using MDN or caniuse.com." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What was JavaScript like before ES6?",
        "Which ES6 features should I learn first?",
        "How is ECMAScript different from JavaScript?"
      ]
    }
  },
  "let, const, and Block Scope": {
    xpReward: 12,
    hints: ["Understand how block scoping differs from function scoping", "Remember that const prevents reassignment, not mutation"],
    notes: {
      summary: "let and const are block-scoped variable declarations introduced in ES6. They replace var by providing safer scoping rules and eliminating common bugs.",
      detailedContent: "var is function-scoped and hoisted to the top of its function. let and const are block-scoped (limited to {} blocks). const must be initialized at declaration and cannot be reassigned, but object properties can still be modified. let allows reassignment. Both let and const have a temporal dead zone (TDZ) - accessing them before declaration throws a ReferenceError.",
      prerequisites: ["What Changed in ES6+"],
      learningObjectives: [
        "Declare variables with let and const",
        "Explain the difference between block scope and function scope",
        "Understand the temporal dead zone",
        "Choose between let and const appropriately"
      ],
      resources: [
        { title: "MDN: let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let", type: "docs" },
        { title: "MDN: const", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const", type: "docs" },
        { title: "JavaScript let vs var", url: "https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/", type: "article" }
      ]
    },
    examples: [
      {
        title: "Block Scoping in Loops",
        description: "How let fixes the classic loop closure bug",
        code: '// var in loop - bug\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0); // 3, 3, 3\n}\n\n// let in loop - correct\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 0); // 0, 1, 2\n}',
        explanation: "var declares one i shared across all iterations. let creates a new binding for each iteration, preserving the value for the closure.",
        output: "3, 3, 3\n0, 1, 2",
        difficulty: "beginner",
        concepts: ["let", "const", "block scope", "temporal dead zone"]
      },
      {
        title: "Temporal Dead Zone",
        description: "TDZ prevents access before declaration",
        code: '// console.log(x); // ReferenceError: Cannot access before initialization\nconst x = 42;\n\n// var is hoisted and accessible (as undefined)\nconsole.log(y); // undefined\nvar y = 10;',
        explanation: "let and const are hoisted but not initialized. Accessing them before the declaration line throws a ReferenceError. This is the temporal dead zone.",
        difficulty: "beginner",
        concepts: ["TDZ", "hoisting", "initialization"]
      }
    ],
    keyTakeaways: [
      "Use const by default, let when you need reassignment",
      "let and const are block-scoped; var is function-scoped",
      "The temporal dead zone prevents accessing variables before declaration",
      "const does not make objects immutable - only prevents reassignment"
    ],
    commonMistakes: [
      { mistake: "Trying to reassign a const variable", explanation: "const prevents any reassignment of the variable binding. Attempting to reassign throws a TypeError.", howToAvoid: "Use let when you need to reassign the variable. Reserve const for values that should never be reassigned." },
      { mistake: "Assuming const means immutable", explanation: "const only prevents reassignment of the variable. Properties of const objects and elements of const arrays can still be modified.", howToAvoid: "Use Object.freeze() for shallow immutability or TypeScript's readonly modifier." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When should I use let vs const?",
        "What is the temporal dead zone?",
        "Why did JavaScript need block scoping?"
      ]
    }
  },
  "Template Literals & Expressions": {
    xpReward: 12,
    hints: ["Template literals use backticks (`) not quotes", "Embed any JavaScript expression with ${}"],
    notes: {
      summary: "Template literals are string literals with embedded expressions, multiline support, and tagged template capabilities introduced in ES6.",
      detailedContent: "Template literals are delimited with backticks (`) instead of quotes. They support string interpolation with ${expression} syntax, multiline strings without escape characters, and tagged templates for custom string processing. Template literals accept any JavaScript expression inside ${}, including function calls, ternary operators, and nested template literals.",
      prerequisites: ["let, const, and Block Scope"],
      learningObjectives: [
        "Create strings using template literals",
        "Embed expressions with ${} interpolation",
        "Write multiline strings without escape characters"
      ],
      resources: [
        { title: "MDN: Template Literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals", type: "docs" },
        { title: "Tagged Templates Guide", url: "https://wesbos.com/tagged-template-literals", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Interpolation and Multiline",
        description: "Key template literal features",
        code: 'const name = "Alice";\nconst age = 30;\n\n// Interpolation\nconsole.log(`Name: ${name}, Age: ${age}`);\n\n// Expressions\nconsole.log(`Next year: ${age + 1}`);\n\n// Multiline\nconst html = `\n  <div>\n    <h1>${name}</h1>\n  </div>\n`;\n\n// Tagged template\nfunction highlight(strings, ...values) {\n  return strings.reduce((result, str, i) =>\n    `${result}${str}<strong>${values[i] || ""}</strong>`, "");\n}\nconsole.log(highlight`Hello ${name}, age ${age}`);',
        explanation: "Backtick strings handle interpolation, expressions, and multiline naturally. Tagged templates let you process template literals with a custom function.",
        output: "Name: Alice, Age: 30\nNext year: 31\n  <div>\n    <h1>Alice</h1>\n  </div>\nHello <strong>Alice</strong>, age <strong>30</strong>",
        difficulty: "beginner",
        concepts: ["interpolation", "multiline strings", "tagged templates"]
      }
    ],
    keyTakeaways: [
      "Template literals use backticks (`) for delimiters",
      "Use ${expression} for inline interpolation",
      "Multiline strings work naturally with template literals",
      "Tagged templates enable custom string processing"
    ],
    commonMistakes: [
      { mistake: "Using single or double quotes and expecting interpolation", explanation: "Only backtick template literals support ${} interpolation. Single and double quotes treat ${} as literal text.", howToAvoid: "Always use backticks when you need interpolation or multiline strings." },
      { mistake: "Forgetting that ${} only accepts expressions, not statements", explanation: "You cannot use if, for, or other statements inside ${}. You can use ternary expressions though.", howToAvoid: "Use ternary (condition ? a : b) inside ${}. Move complex logic to a separate function." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How do I embed a variable in a template literal?",
        "Can I use template literals for multiline strings?",
        "What are tagged templates?"
      ]
    }
  },
  "Format a Greeting": {
    xpReward: 20,
    hints: ["Use template literals with backticks", "Call toUpperCase() on the name parameter", "Return the formatted string, don't just log it"],
    notes: {
      summary: "Practice using template literals and string methods to format a greeting string with an uppercased name.",
      detailedContent: "In this exercise, you'll combine template literals for string building with the toUpperCase() string method. This is a common pattern: taking raw input and transforming it into a formatted output. Template literals make the code cleaner than string concatenation with +.",
      prerequisites: ["Template Literals & Expressions"],
      learningObjectives: [
        "Use template literals to build formatted strings",
        "Apply string methods like toUpperCase()",
        "Write a complete function with a return value"
      ],
      resources: [
        { title: "MDN: String.prototype.toUpperCase()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase", type: "docs" },
        { title: "MDN: Template Literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Formatting Variations",
        description: "Different approaches to the same greeting problem",
        code: 'function formatGreeting(name) {\n  return `Hello, ${name.toUpperCase()}!`;\n}\n\n// Alternative approach\nfunction formatGreetingAlt(name) {\n  return "Hello, " + name.toUpperCase() + "!";\n}\n\nconsole.log(formatGreeting("ada"));\nconsole.log(formatGreeting("bob"));',
        explanation: "The template literal version is cleaner and more readable. Both versions produce identical output. Always uppercase the name parameter before inserting it into the string.",
        output: "Hello, ADA!\nHello, BOB!",
        difficulty: "beginner",
        concepts: ["template literals", "toUpperCase", "string formatting"]
      }
    ],
    keyTakeaways: [
      "Template literals make string formatting cleaner than concatenation",
      "String methods can be chained inside ${} interpolation",
      "Always test your function with multiple inputs",
      "Practice: return values from functions, don't just log them"
    ],
    commonMistakes: [
      { mistake: "Forgetting to call toUpperCase() (missing parentheses)", explanation: "name.toUpperCase without () returns the function itself, not the uppercased string.", howToAvoid: "Always use parentheses to call methods: name.toUpperCase()." },
      { mistake: "Logging instead of returning", explanation: "console.log displays output but returns undefined. The test expects a return value.", howToAvoid: "Always use return to send a value back from your function." }
    ],
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "Why is my function returning undefined?",
        "How do I test my function with different inputs?",
        "What's the difference between return and console.log?"
      ]
    }
  },
  "Array Destructuring": {
    xpReward: 12,
    hints: ["Use [] on the left side of assignment", "Commas skip elements: const [a, , b] = arr", "Rest pattern collects remaining: const [head, ...tail] = arr"],
    notes: {
      summary: "Array destructuring unpacks values from arrays into distinct variables using a concise syntax based on positional matching.",
      detailedContent: "Array destructuring uses the pattern syntax on the left side of assignment to extract values by position. You can skip elements with empty commas, use rest (...) to collect remaining elements, set default values, and swap variables without a temporary. Destructuring works with any iterable, not just arrays.",
      prerequisites: ["Template Literals & Expressions"],
      learningObjectives: [
        "Destructure arrays to extract values by position",
        "Skip unwanted elements with placeholder commas",
        "Use rest pattern to collect remaining elements",
        "Set default values in destructuring patterns"
      ],
      resources: [
        { title: "MDN: Destructuring Assignment", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", type: "docs" },
        { title: "ES6 Destructuring Guide", url: "https://wesbos.com/destructuring-objects", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Array Destructuring Patterns",
        description: "Various array destructuring techniques",
        code: '// Basic destructuring\nconst scores = [95, 87, 72];\nconst [gold, silver, bronze] = scores;\nconsole.log(gold, silver, bronze); // 95, 87, 72\n\n// Skipping elements\nconst [first, , third] = [10, 20, 30];\nconsole.log(first, third); // 10, 30\n\n// Rest pattern\nconst [head, ...tail] = [1, 2, 3, 4];\nconsole.log(head, tail); // 1, [2, 3, 4]\n\n// Default values\nconst [a = 0, b = 0] = [5];\nconsole.log(a, b); // 5, 0\n\n// Variable swapping\nlet x = 1, y = 2;\n[x, y] = [y, x];\nconsole.log(x, y); // 2, 1\n\n// Nested destructuring\nconst nested = [1, [2, 3]];\nconst [one, [two, three]] = nested;\nconsole.log(one, two, three); // 1, 2, 3',
        explanation: "Array destructuring matches by position. Use commas to skip, ... to collect rest, and = for defaults. Swapping variables with destructuring eliminates the temp variable pattern.",
        difficulty: "beginner",
        concepts: ["destructuring", "rest pattern", "default values", "swapping"]
      }
    ],
    keyTakeaways: [
      "Array destructuring extracts values by position",
      "Use commas to skip elements: const [a, , b] = arr",
      "Rest (...) collects remaining elements into a new array",
      "Defaults (= value) apply when the element is undefined"
    ],
    commonMistakes: [
      { mistake: "Trying to destructure null or undefined", explanation: "Destructuring null or undefined throws a TypeError because you can't access indices on those values.", howToAvoid: "Always ensure the value is an array (or iterable) before destructuring, or provide a fallback: const [a] = arr || [];" },
      { mistake: "Confusing array and object destructuring syntax", explanation: "Array destructuring uses [] on the left; object destructuring uses {}. They look like the literal syntax but appear on the left of assignment.", howToAvoid: "Remember: [] for arrays (positional), {} for objects (by key name)." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I skip elements in array destructuring?",
        "How does the rest pattern work?",
        "Can I set default values in destructuring?"
      ]
    }
  },
  "Object Destructuring": {
    xpReward: 12,
    hints: ["Use {} on the left side matching property names", "Rename with colon: const { name: userName } = obj", "Defaults work the same as arrays"],
    notes: {
      summary: "Object destructuring extracts properties into variables by matching property names, with support for renaming, defaults, and nested extraction.",
      detailedContent: "Object destructuring matches by property name rather than position. You can extract properties into variables with the same name, rename them with colon syntax, provide defaults for missing properties, destructure nested objects, and use rest (...) for remaining properties. Object destructuring is widely used in function parameters, API response handling, and imports.",
      prerequisites: ["Array Destructuring"],
      learningObjectives: [
        "Destructure objects to extract properties by name",
        "Rename variables during destructuring",
        "Set default values for missing properties",
        "Use nested object destructuring"
      ],
      resources: [
        { title: "MDN: Destructuring Assignment", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", type: "docs" },
        { title: "Object Destructuring Patterns", url: "https://javascript.info/destructuring-assignment#object-destructuring", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Object Destructuring Patterns",
        description: "Extracting object properties with destructuring",
        code: 'const user = { name: "Kim", age: 28, city: "Seoul" };\n\n// Basic - variable names match property names\nconst { name, age } = user;\nconsole.log(name, age); // Kim 28\n\n// Renaming\nconst { name: userName, city: userCity } = user;\nconsole.log(userName, userCity); // Kim Seoul\n\n// Defaults\nconst { role = "guest" } = user;\nconsole.log(role); // guest\n\n// Nested destructuring\nconst profile = { id: 1, details: { title: "Dev", dept: "Engineering" } };\nconst { details: { title, dept } } = profile;\nconsole.log(title, dept); // Dev Engineering\n\n// Rest in objects\nconst { name: n, ...rest } = user;\nconsole.log(n, rest); // Kim { age: 28, city: "Seoul" }',
        explanation: "Object destructuring matches by key name. The colon separates the source property from the destination variable name. Defaults apply when the source property is undefined.",
        difficulty: "beginner",
        concepts: ["object destructuring", "renaming", "defaults", "nested destructuring"]
      }
    ],
    keyTakeaways: [
      "Object destructuring matches by property name, not position",
      "Use colon to rename: { originalName: newVar } = obj",
      "Defaults work like arrays: { prop = default } = obj",
      "Rest (...) collects remaining properties into a new object"
    ],
    commonMistakes: [
      { mistake: "Using array destructuring syntax on objects", explanation: "Object destructuring requires {}. Using [] on an object won't extract properties by position.", howToAvoid: "Use {} for objects (match by key) and [] for arrays (match by position)." },
      { mistake: "Forgetting the variable name when renaming", explanation: "const { name } = user works, but const { name: } = user is invalid. The syntax is source: target.", howToAvoid: "Remember: { originalName: newVariableName } = object." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I rename a variable in object destructuring?",
        "How does nested object destructuring work?",
        "What happens when a property doesn't exist?"
      ]
    }
  },
  "Spread and Rest Operators": {
    xpReward: 12,
    hints: ["... spreads an iterable into individual elements", "... rest collects remaining elements into an array", "Spread creates shallow copies only"],
    notes: {
      summary: "The spread (...) operator expands iterables into individual elements, while rest parameters collect multiple elements into an array. Both use the same syntax but serve opposite purposes.",
      detailedContent: "Spread (...) can expand arrays into function arguments, copy arrays, merge arrays, and (since ES2018) spread own properties of objects. Rest parameters collect remaining function arguments into an array. Rest in destructuring collects remaining elements/properties. Spread creates shallow copies - nested objects are still referenced.",
      prerequisites: ["Object Destructuring"],
      learningObjectives: [
        "Use spread to copy and merge arrays and objects",
        "Use rest parameters in function definitions",
        "Use rest patterns in destructuring",
        "Understand shallow vs deep copying"
      ],
      resources: [
        { title: "MDN: Spread Syntax", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax", type: "docs" },
        { title: "MDN: Rest Parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Spread and Rest in Action",
        description: "Common use cases for both operators",
        code: '// Spread arrays\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst merged = [...arr1, ...arr2];\nconsole.log(merged); // [1, 2, 3, 4, 5, 6]\n\n// Spread objects (ES2018)\nconst defaults = { theme: "dark", lang: "en" };\nconst prefs = { ...defaults, lang: "fr" };\nconsole.log(prefs); // { theme: "dark", lang: "fr" }\n\n// Rest parameters\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nconsole.log(sum(1, 2, 3, 4)); // 10\n\n// Rest in destructuring\nconst [first, ...rest] = [10, 20, 30, 40];\nconsole.log(first, rest); // 10 [20, 30, 40]\n\n// Spread as function arguments\nconst numbers = [5, 10, 15];\nconsole.log(Math.max(...numbers)); // 15',
        explanation: "Spread expands elements (used in arrays, objects, function calls). Rest collects elements (used in function params and destructuring). Both use the same ... token but in different contexts.",
        difficulty: "beginner",
        concepts: ["spread", "rest", "copy", "merge", "function arguments"]
      }
    ],
    keyTakeaways: [
      "Spread (...) expands iterables into individual elements",
      "Rest (...) collects multiple items into an array",
      "Spread creates shallow copies - nested objects are shared",
      "Object spread was added in ES2018"
    ],
    commonMistakes: [
      { mistake: "Confusing spread with rest", explanation: "Spread expands (used in array/object literals and function calls). Rest collects (used in function definitions and destructuring).", howToAvoid: "Spread is on the 'using' side; rest is on the 'defining' side. If you're creating a new array/object or calling a function, it's spread. If you're collecting parameters, it's rest." },
      { mistake: "Assuming spread does deep copying", explanation: "Spread only copies one level deep. Nested objects are still referenced, not cloned.", howToAvoid: "Use structuredClone() or a library like lodash's cloneDeep for deep cloning." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What's the difference between spread and rest?",
        "Does spread create a deep copy?",
        "How do I use rest parameters in arrow functions?"
      ]
    }
  },
  "Merge User Profiles": {
    xpReward: 20,
    hints: ["Use object spread to merge without mutation", "Order matters: later properties override earlier ones", "Do not modify the original base object"],
    notes: {
      summary: "Practice merging objects using the spread operator to create a new combined object without mutating the originals.",
      detailedContent: "Object merging is a common task in JavaScript applications, especially when handling user preferences, configuration defaults, API response normalization, and state management. The spread operator provides a clean, immutable way to merge objects where later properties override earlier ones.",
      prerequisites: ["Spread and Rest Operators"],
      learningObjectives: [
        "Merge objects immutably using spread",
        "Understand property override order",
        "Create pure functions that don't mutate inputs"
      ],
      resources: [
        { title: "MDN: Spread in Object Literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals", type: "docs" },
        { title: "Object.assign vs Spread", url: "https://thecodebarbarian.com/object-assign-vs-object-spread.html", type: "article" }
      ]
    },
    examples: [
      {
        title: "Object Merging Patterns",
        description: "Different approaches to merging objects",
        code: 'function mergeProfiles(base, extra) {\n  return { ...base, ...extra };\n}\n\n// With nested merge (shallow merge only)\nconst result = mergeProfiles(\n  { name: "Alice", theme: "light" },\n  { theme: "dark", lang: "en" }\n);\nconsole.log(result);\n// { name: "Alice", theme: "dark", lang: "en" }\n\n// Deep merge utility\nfunction deepMerge(target, source) {\n  const result = { ...target };\n  for (const key of Object.keys(source)) {\n    if (source[key] instanceof Object && target[key] instanceof Object) {\n      result[key] = deepMerge(target[key], source[key]);\n    } else {\n      result[key] = source[key];\n    }\n  }\n  return result;\n}',
        explanation: "Spread merges properties left to right. Later sources override earlier ones. For nested objects, you need a recursive deep merge utility.",
        difficulty: "beginner",
        concepts: ["spread", "merge", "immutability", "pure functions"]
      }
    ],
    keyTakeaways: [
      "Use spread (...base, ...extra) for immutable object merging",
      "Order matters: the last spread wins on conflicts",
      "Spread only does shallow merging - nested objects need special handling",
      "Pure functions (no side effects) are easier to test and reason about"
    ],
    commonMistakes: [
      { mistake: "Mutating the base object instead of creating a new one", explanation: "Object.assign(base, extra) modifies base. This can cause unexpected side effects elsewhere in your code.", howToAvoid: "Always create a new object: { ...base, ...extra } or Object.assign({}, base, extra)." },
      { mistake: "Expecting spread to merge nested objects deeply", explanation: "Nested objects are replaced, not merged. { ...{ a: { x: 1 } }, ...{ a: { y: 2 } } } gives { a: { y: 2 } }", howToAvoid: "Use a dedicated deep merge utility or merge nested properties explicitly." }
    ],
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "How do I prevent mutating the original object?",
        "What's the difference between spread and Object.assign?",
        "How do I handle deeply nested merges?"
      ]
    }
  },
  "Arrow Function Syntax": {
    xpReward: 12,
    hints: ["Arrow functions have implicit return when using expression syntax", "Parentheses required for zero or multiple params", "Braces required when using statements"],
    notes: {
      summary: "Arrow functions provide a concise syntax for writing functions in JavaScript, with shorter syntax and lexical this binding.",
      detailedContent: "Arrow functions were introduced in ES6. They have several forms: () => expression (implicit return), x => x * 2 (single param, no parens needed), (a, b) => { return a + b; } (multiple params with block body). Arrow functions don't have their own this, arguments, super, or new.target, making them ideal for callbacks but unsuitable for methods or constructors.",
      prerequisites: ["Template Literals & Expressions"],
      learningObjectives: [
        "Write arrow functions in various forms",
        "Understand implicit vs explicit return",
        "Know when NOT to use arrow functions"
      ],
      resources: [
        { title: "MDN: Arrow Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions", type: "docs" },
        { title: "Arrow Function Guide", url: "https://javascript.info/arrow-functions-basics", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Arrow Function Forms",
        description: "Different arrow function syntax variations",
        code: `// No parameters
const greet = () => "Hello!";

// Single parameter (parens optional)
const double = x => x * 2;

// Multiple parameters
const add = (a, b) => a + b;

// Block body (explicit return needed)
const sum = (a, b) => {
  const result = a + b;
  return result;
};

// Returning an object literal (wrap in parens)
const makeUser = (name) => ({ name, age: 0 });

console.log(double(21)); // 42
console.log(makeUser("Alice")); // { name: "Alice", age: 0 }`,
        explanation: "Arrow functions omit the function keyword. Expression syntax gives implicit return. For object literals, wrap in () to distinguish from a block body.",
        difficulty: "beginner",
        concepts: ["arrow functions", "implicit return", "concise syntax"]
      }
    ],
    keyTakeaways: [
      "Arrow functions provide concise syntax: () => expression",
      "Implicit return: omit braces to return the expression automatically",
      "Single parameter can omit parentheses",
      "Arrow functions cannot be used as constructors"
    ],
    commonMistakes: [
      { mistake: "Forgetting parentheses around returned object literal", explanation: "const fn = () => { name: 'Alice' } is interpreted as a block with a label, not an object.", howToAvoid: "Wrap object literals in parentheses: () => ({ name: 'Alice' })." },
      { mistake: "Using arrow functions for object methods", explanation: "Arrow functions don't bind their own this, so obj.method = () => this.name won't refer to obj.", howToAvoid: "Use regular function expressions or method shorthand for object methods that need dynamic this." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When do I need parentheses around arrow function parameters?",
        "What is implicit return?",
        "Why can't I use arrow functions as constructors?"
      ]
    }
  },
  "Lexical this": {
    xpReward: 15,
    hints: ["Arrow functions inherit this from the enclosing scope", "Regular functions get this from how they're called", "Use arrow functions for callbacks to preserve context"],
    notes: {
      summary: "Arrow functions don't bind their own this - they inherit it from the surrounding lexical scope. This makes them ideal for callbacks and closures.",
      detailedContent: "Unlike regular functions (where this depends on the call site), arrow functions capture the this value from the enclosing lexical context at definition time. This eliminates the need for const self = this, .bind(this), or other workarounds. However, arrow functions should NOT be used for methods that need dynamic this (like event handlers that need the element) or as constructors.",
      prerequisites: ["Arrow Function Syntax"],
      learningObjectives: [
        "Understand how lexical this works in arrow functions",
        "Use arrow functions to avoid losing context in callbacks",
        "Identify when NOT to use arrow functions based on this behavior"
      ],
      resources: [
        { title: "MDN: Arrow Functions - No separate this", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#no_separate_this", type: "docs" },
        { title: "You Don't Know JS: this & Object Prototypes", url: "https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/this-object-prototypes/README.md", type: "article" }
      ]
    },
    examples: [
      {
        title: "Lexical this in Action",
        description: "How arrow functions preserve this vs regular functions",
        code: 'function Timer() {\n  this.seconds = 0;\n  \n  // Regular function - loses this\n  setInterval(function() {\n    // this.seconds++; // NaN or error - this is global/undefined\n  }, 1000);\n  \n  // Arrow function - inherits this from Timer\n  setInterval(() => {\n    this.seconds++;\n    console.log(this.seconds);\n  }, 1000);\n}\n\nconst timer = new Timer();\n\n// Another example: event handlers\nconst counter = {\n  count: 0,\n  // Method using regular function\n  startRegular() {\n    document.addEventListener("click", function() {\n      // this.count++; // Error: this is document\n    });\n  },\n  // Method using arrow callback\n  startArrow() {\n    document.addEventListener("click", () => {\n      this.count++; // Correct: this is counter\n    });\n  }\n};',
        explanation: "Arrow functions inherit this from where they're defined, not where they're called. This makes them perfect for timers, event listeners, and promise callbacks where you want the outer context's this.",
        difficulty: "intermediate",
        concepts: ["lexical this", "arrow functions", "context binding", "callbacks"]
      }
    ],
    keyTakeaways: [
      "Arrow functions inherit this from the enclosing lexical scope",
      "No need for const self = this or .bind(this) with arrow functions",
      "Avoid arrow functions for methods that need dynamic this (like DOM event handlers needing the element)",
      "Arrow functions cannot be used as constructors (no new keyword)"
    ],
    commonMistakes: [
      { mistake: "Using arrow functions for all methods", explanation: "Object methods and class methods that need dynamic this (like DOM event handlers) should use regular functions or method shorthand.", howToAvoid: "Use method shorthand ({ method() {} }) for object methods. Use arrow functions only for callbacks where you want to preserve the outer this." },
      { mistake: "Expecting arrow functions to have their own arguments object", explanation: "Arrow functions don't have their own arguments object. Using arguments inside an arrow references the outer function's arguments.", howToAvoid: "Use rest parameters (...args) instead of arguments in arrow functions." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How does this work differently in arrow functions?",
        "When should I NOT use arrow functions?",
        "What was the pattern before arrow functions for preserving this?"
      ]
    }
  },
  "Default & Rest Parameters": {
    xpReward: 12,
    hints: ["Default params: function fn(param = defaultVal)", "Defaults only apply when argument is undefined (not null)", "Rest params collect remaining arguments into an array"],
    notes: {
      summary: "Default parameters allow function parameters to have default values when not provided, and rest parameters collect remaining arguments into an array.",
      detailedContent: "Default parameters are evaluated at call time, not definition time. They can reference previous parameters. Rest parameters (...) collect all remaining arguments into a real Array (unlike the array-like arguments object). Rest must be the last parameter. Defaults also work with destructured parameters for robust function signatures.",
      prerequisites: ["Spread and Rest Operators", "Arrow Function Syntax"],
      learningObjectives: [
        "Set default values for function parameters",
        "Use rest parameters to handle variable numbers of arguments",
        "Combine defaults with destructuring in parameters"
      ],
      resources: [
        { title: "MDN: Default Parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters", type: "docs" },
        { title: "MDN: Rest Parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Default and Rest Parameters",
        description: "Flexible function signatures with defaults and rest",
        code: '// Default parameters\nfunction greet(name = "Guest") {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet()); // Hello, Guest!\nconsole.log(greet("Bob")); // Hello, Bob!\n\n// Defaults with previous params\nfunction multiply(a, b = a * 2) {\n  return a * b;\n}\nconsole.log(multiply(3)); // 18 (3 * 6)\n\n// Rest parameters\nfunction sumAll(...nums) {\n  return nums.reduce((total, n) => total + n, 0);\n}\nconsole.log(sumAll(1, 2, 3, 4)); // 10\n\n// Destructured defaults\nfunction connect({ host = "localhost", port = 3000 } = {}) {\n  return `${host}:${port}`;\n}\nconsole.log(connect()); // localhost:3000\nconsole.log.connect({ port: 8080 }); // localhost:8080',
        explanation: "Default parameters use = syntax. Rest parameters collect extras into an array. Combining destructuring with defaults creates robust, self-documenting function signatures.",
        difficulty: "beginner",
        concepts: ["default parameters", "rest parameters", "destructured defaults"]
      }
    ],
    keyTakeaways: [
      "Default parameters: function fn(param = defaultValue)",
      "Defaults only apply when the argument is undefined (null is not replaced)",
      "Rest parameters (...) collect remaining arguments into an Array",
      "Combine destructuring with defaults for config objects"
    ],
    commonMistakes: [
      { mistake: "Putting rest parameter before required params", explanation: "Rest parameters must be the last parameter. function fn(...rest, last) is invalid syntax.", howToAvoid: "Always place rest parameters as the last parameter in the function signature." },
      { mistake: "Using null thinking it triggers defaults", explanation: "f(null) does NOT use the default value - null is explicitly passed. Only undefined triggers defaults.", howToAvoid: "Pass undefined or omit the argument to trigger defaults. Use nullish coalescing (??) inside the function for null handling." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When do default parameters get evaluated?",
        "How are rest parameters different from the arguments object?",
        "Can I use defaults with object destructuring?"
      ]
    }
  },
  "Sum with Rest": {
    xpReward: 20,
    hints: ["Use rest parameters (...nums) to collect all arguments", "Use Array.reduce() to sum the numbers", "Return 0 when no arguments are passed"],
    notes: {
      summary: "Practice using rest parameters and Array.reduce() to write a function that sums any number of numeric arguments.",
      detailedContent: "The standard approach uses rest parameters to collect all arguments into an array, then reduce() to accumulate the sum. The initial value of 0 for reduce() handles the empty case. This pattern is common in utility libraries and demonstrates how rest parameters create cleaner APIs than manually iterating arguments.",
      prerequisites: ["Default & Rest Parameters"],
      learningObjectives: [
        "Use rest parameters to handle variable argument counts",
        "Use reduce() to accumulate values",
        "Handle edge cases like zero arguments"
      ],
      resources: [
        { title: "MDN: Array.prototype.reduce()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce", type: "docs" },
        { title: "MDN: Rest Parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Variadic Sum Implementation",
        description: "Different approaches to summing variable arguments",
        code: '// Using rest + reduce\nfunction sumAll(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\n\n// Using for...of\nfunction sumAllForOf(...nums) {\n  let total = 0;\n  for (const n of nums) total += n;\n  return total;\n}\n\n// Test cases\nconsole.log(sumAll(1, 2, 3)); // 6\nconsole.log(sumAll()); // 0\nconsole.log(sumAll(5)); // 5\nconsole.log(sumAll(1, 2, 3, 4, 5)); // 15',
        explanation: "rest collects all arguments. reduce with initial value 0 ensures empty input returns 0. Both approaches handle any number of arguments.",
        difficulty: "beginner",
        concepts: ["rest parameters", "reduce", "variadic functions", "edge cases"]
      }
    ],
    keyTakeaways: [
      "Rest parameters let functions accept any number of arguments",
      "reduce() with initial value 0 handles empty input gracefully",
      "Test edge cases: zero arguments, one argument, many arguments",
      "Rest creates a real Array, unlike the old arguments object"
    ],
    commonMistakes: [
      { mistake: "Forgetting the initial value in reduce()", explanation: "reduce(callback) without initial value on an empty array throws a TypeError.", howToAvoid: "Always provide the initial value for reduce(): nums.reduce((a, b) => a + b, 0)." },
      { mistake: "Using the old arguments object instead of rest", explanation: "arguments is array-like (not a real array) and lacks array methods like reduce.", howToAvoid: "Use ...rest parameters instead of arguments for cleaner, more capable code." }
    ],
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "What happens if I call sumAll() with no arguments?",
        "How is rest different from the arguments object?",
        "Why does reduce need an initial value?"
      ]
    }
  },
  "export and import": {
    xpReward: 15,
    hints: ["Named exports use export const/function/class", "Default export: export default ...", "Import with matching syntax: import { named } or import default"],
    notes: {
      summary: "ES6 modules provide a standardized way to organize JavaScript code into reusable files with explicit import/export declarations.",
      detailedContent: "ES6 modules use export to expose values to other files and import to consume them. There are named exports (multiple per module, must use exact names) and default exports (one per module, can be imported with any name). Modules are strict by default, have their own scope, and are deferred automatically. The static structure enables tree-shaking and better optimizations.",
      prerequisites: ["Arrow Function Syntax"],
      learningObjectives: [
        "Export values using named and default exports",
        "Import values using corresponding import syntax",
        "Understand when to use named vs default exports"
      ],
      resources: [
        { title: "MDN: JavaScript Modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", type: "docs" },
        { title: "ES6 Modules Overview", url: "https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/", type: "article" }
      ]
    },
    examples: [
      {
        title: "Import and Export Patterns",
        description: "Named and default export/import syntax",
        code: '// --- math.js ---\nexport const PI = 3.14159;\nexport function add(a, b) { return a + b; }\nexport default class Calculator { /* ... */ }\n\n// --- main.js ---\n// Named imports\nimport { PI, add } from "./math.js";\n\n// Default import\nimport Calculator from "./math.js";\n\n// Rename imports\nimport { add as sum } from "./math.js";\n\n// Import all as namespace\nimport * as MathUtils from "./math.js";\nconsole.log(MathUtils.PI);\n\n// Mixed import\nimport Calc, { PI, add } from "./math.js";',
        explanation: "Named exports require matching names on import (or use as). Default exports have no name and can be imported with any name. The module path must include the file extension in Node.js ESM.",
        difficulty: "beginner",
        concepts: ["named export", "default export", "import", "namespace import"]
      }
    ],
    keyTakeaways: [
      "Use export to expose values, import to consume them",
      "Named exports: one module can have many; names must match on import",
      "Default export: one per module; can be imported with any name",
      "import * as namespace imports all exports as an object"
    ],
    commonMistakes: [
      { mistake: "Forgetting file extensions in relative imports", explanation: "In Node.js ESM, import from './math' fails - you need './math.js'. Some bundlers handle this, but the spec requires extensions.", howToAvoid: "Always include the full filename with extension in relative imports." },
      { mistake: "Using export default const", explanation: "export default const x = 5 is invalid. Use export default x = 5 or export const x = 5 (named).", howToAvoid: "Only function and class declarations can be directly default-exported. For variables, declare then export default." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What's the difference between named and default exports?",
        "How do I import everything from a module?",
        "Why do modules need file extensions?"
      ]
    }
  },
  "Module scope": {
    xpReward: 10,
    hints: ["Modules create their own scope - no global leakage", "Module-level this is undefined, not window"],
    notes: {
      summary: "ES6 modules have their own scope. Variables declared at the top level are not accessible globally unless explicitly exported.",
      detailedContent: "Before modules, scripts shared the global scope, leading to naming collisions. In modules, each file has its own top-level scope. Variables, functions, and classes declared in a module are private by default unless exported. Modules also run in strict mode automatically, and top-level this is undefined (not window). Module scripts are deferred by default and execute after HTML parsing.",
      prerequisites: ["export and import"],
      learningObjectives: [
        "Understand that modules create private scopes",
        "Recognize the difference between module scripts and classic scripts",
        "Know that modules run in strict mode automatically"
      ],
      resources: [
        { title: "MDN: Module Scope", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#module_scope", type: "docs" },
        { title: "JavaScript Modules: A Beginner's Guide", url: "https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/", type: "article" }
      ]
    },
    examples: [
      {
        title: "Module vs Script Scope",
        description: "How module scope differs from classic script scope",
        code: '<!-- Script scope (global leakage) -->\n<script>\n  var x = 10;\n</script>\n<script>\n  console.log(x); // 10 (global pollution)\n</script>\n\n<!-- Module scope (isolated) -->\n<script type="module">\n  const y = 20;\n  console.log(this); // undefined (not window)\n</script>\n<script type="module">\n  // console.log(y); // ReferenceError: y is not defined\n</script>',
        explanation: "Module-level variables are isolated. They don't pollute the global scope. Use export to make variables available to other modules. Module scripts are deferred automatically.",
        difficulty: "beginner",
        concepts: ["module scope", "global scope", "strict mode", "script vs module"]
      }
    ],
    keyTakeaways: [
      "Module top-level scope is private - nothing leaks globally",
      "Modules run in strict mode automatically (no 'use strict' needed)",
      "Top-level this in modules is undefined",
      "Module scripts are deferred by default"
    ],
    commonMistakes: [
      { mistake: "Assuming global variables are accessible in modules", explanation: "var at module top level doesn't create a global property. You must explicitly export to share between modules.", howToAvoid: "Use export to share values between modules. Use window intentionally (rarely) for true globals." },
      { mistake: "Expecting this to be window at module top level", explanation: "In modules, top-level this is undefined, not window. This aligns with strict mode behavior.", howToAvoid: "Use globalThis for cross-environment global access instead of relying on this." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What happens to var in a module?",
        "How is module scope different from script scope?",
        "What is the value of this in a module?"
      ]
    }
  },
  "Dynamic import()": {
    xpReward: 12,
    hints: ["dynamic import() returns a Promise", "Use for code splitting and lazy loading", "The module namespace is the resolved value"],
    notes: {
      summary: "Dynamic import() is a function-like expression that loads modules on demand, returning a Promise that resolves to the module namespace object.",
      detailedContent: "Unlike static import which must be at the top level, dynamic import() can be called anywhere, conditionally, or inside functions. It returns a Promise that resolves to the module's namespace object (like import * as). Dynamic imports enable code splitting, lazy loading, and loading modules based on user interaction or runtime conditions. Top-level await (ES2022) allows using dynamic import() at the module top level.",
      prerequisites: ["Module scope"],
      learningObjectives: [
        "Use dynamic import() for on-demand module loading",
        "Understand the difference between static and dynamic imports",
        "Use dynamic imports for code splitting"
      ],
      resources: [
        { title: "MDN: Dynamic Import", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import", type: "docs" },
        { title: "Dynamic Import Guide", url: "https://javascript.info/modules-dynamic-imports", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Dynamic Import Patterns",
        description: "Loading modules conditionally and on demand",
        code: '// Static import (must be at top level)\nimport { helper } from "./utils.js";\n\n// Dynamic import (can be anywhere)\nasync function loadModule() {\n  const module = await import("./heavy-module.js");\n  module.doSomething();\n}\n\n// Conditional loading\nif (userNeedsFeature) {\n  const feature = await import("./feature.js");\n  feature.activate();\n}\n\n// Dynamic module specifier\nconst lang = getUserLanguage();\nconst i18n = await import(`./locales/${lang}.js`);\n\n// Error handling\ntry {\n  const chart = await import("./chart-library.js");\n  chart.render("#container", data);\n} catch (err) {\n  console.error("Failed to load chart module:", err);\n}',
        explanation: "Dynamic import() enables code splitting by loading modules only when needed. The module specifier can be dynamic (template literal). Always handle errors for network failures.",
        difficulty: "intermediate",
        concepts: ["dynamic import", "code splitting", "lazy loading", "conditional loading"]
      }
    ],
    keyTakeaways: [
      "import() is a function that returns a Promise resolving to the module namespace",
      "Dynamic imports enable code splitting and lazy loading",
      "Module specifiers can be dynamic expressions",
      "Always handle errors from dynamic imports (network failures)"
    ],
    commonMistakes: [
      { mistake: "Using dynamic import when static import would work", explanation: "Static imports are optimized better (tree-shaking, bundling). Don't use dynamic import just for stylistic reasons.", howToAvoid: "Use static import by default. Use dynamic import only for code splitting, conditional loading, or dynamic module specifiers." },
      { mistake: "Destructuring the module incorrectly", explanation: "Dynamic import resolves to the namespace object, not individual exports. Use dot notation or destructure after await.", howToAvoid: "const { default: fn, named } = await import('./mod.js') - access exports from the namespace object." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How is dynamic import different from static import?",
        "When should I use dynamic import?",
        "How does dynamic import enable code splitting?"
      ]
    }
  },
  "Package ecosystem": {
    xpReward: 12,
    hints: ["npm is the default package manager for JavaScript", "The registry at npmjs.com hosts millions of packages", "Always check package quality before installing"],
    notes: {
      summary: "The npm ecosystem hosts millions of packages, with conventions for semantic versioning, dependency management, and module resolution.",
      detailedContent: "npm (Node Package Manager) provides access to the world's largest software registry. Packages are installed via npm install and listed in package.json with semver ranges. The node_modules folder contains installed packages. npm scripts automate tasks. Package resolution follows the Node.js algorithm (looking in node_modules, then parent directories). Key considerations: package quality, maintenance status, security vulnerabilities, and bundle size.",
      prerequisites: ["Dynamic import()"],
      learningObjectives: [
        "Install packages using npm",
        "Understand semantic versioning (semver)",
        "Distinguish between dependencies and devDependencies",
        "Evaluate package quality before using"
      ],
      resources: [
        { title: "npm Documentation", url: "https://docs.npmjs.com/", type: "docs" },
        { title: "Semantic Versioning", url: "https://semver.org/", type: "article" }
      ]
    },
    examples: [
      {
        title: "npm Package Management",
        description: "Working with npm packages",
        code: '// package.json\n{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js",\n    "test": "jest"\n  },\n  "dependencies": {\n    "express": "^4.18.0"\n  },\n  "devDependencies": {\n    "jest": "^29.0.0",\n    "eslint": "^8.0.0"\n  }\n}\n\n// npm commands\n// npm install express          # adds to dependencies\n// npm install -D jest          # adds to devDependencies\n// npm update                  # updates within semver ranges\n// npm audit                  # checks for vulnerabilities\n// npx create-react-app my-app  # run package without installing',
        explanation: "dependencies are for runtime (express, react). devDependencies are for development (testing, linting, building). The ^ caret allows minor/patch updates. Always run npm audit to check for vulnerabilities.",
        difficulty: "beginner",
        concepts: ["npm", "package.json", "semver", "dependencies", "node_modules"]
      }
    ],
    keyTakeaways: [
      "npm is the default JavaScript package manager",
      "package.json tracks dependencies, scripts, and metadata",
      "semver: MAJOR.MINOR.PATCH (^ allows minor updates)",
      "distinguish dependencies (runtime) from devDependencies (development tools)"
    ],
    commonMistakes: [
      { mistake: "Committing node_modules to version control", explanation: "node_modules can be massive and is platform-specific. It should be in .gitignore.", howToAvoid: "Add node_modules to .gitignore. Always install from package-lock.json for reproducible builds." },
      { mistake: "Installing everything as a regular dependency", explanation: "Dev tools like linters, test frameworks, and build tools should be devDependencies to avoid bloating production bundles.", howToAvoid: "Use npm install -D or --save-dev for development-only packages. Use npm install --save-prod for runtime dependencies." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What's the difference between dependencies and devDependencies?",
        "How does semantic versioning work?",
        "How do I choose a good npm package?"
      ]
    }
  },
  "Promise States": {
    xpReward: 12,
    hints: ["A Promise is in one of three states: pending, fulfilled, rejected", "Use .then() for fulfillment, .catch() for rejection, .finally() for cleanup"],
    notes: {
      summary: "A Promise represents a future value. It can be in one of three states: pending, fulfilled, or rejected, and transitions irreversibly.",
      detailedContent: "Promises provide a cleaner alternative to callbacks for asynchronous operations. A Promise starts as pending, then settles as either fulfilled (resolved with a value) or rejected (with an error). Once settled, the state is irreversible. Use .then() to handle fulfillment, .catch() for rejection, and .finally() for cleanup. Promises can be chained - each .then() returns a new Promise.",
      prerequisites: ["Package ecosystem"],
      learningObjectives: [
        "Understand the three Promise states",
        "Create a Promise using the Promise constructor",
        "Use .then(), .catch(), and .finally() handlers",
        "Chain Promises for sequential async operations"
      ],
      resources: [
        { title: "MDN: Using Promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises", type: "docs" },
        { title: "JavaScript Promises Explained", url: "https://javascript.info/promise-basics", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Promise Lifecycle",
        description: "Creating and consuming promises through their states",
        code: '// Creating a Promise\nconst myPromise = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve("Operation completed");\n  } else {\n    reject(new Error("Operation failed"));\n  }\n});\n\n// Consuming the Promise\nmyPromise\n  .then(result => {\n    console.log("Fulfilled:", result);\n    return "Next value";\n  })\n  .then(next => {\n    console.log("Chained:", next);\n  })\n  .catch(error => {\n    console.error("Rejected:", error.message);\n  })\n  .finally(() => {\n    console.log("Cleanup: always runs");\n  });\n\n// Promise.resolve() and Promise.reject()\nconst resolved = Promise.resolve(42);\nconst rejected = Promise.reject(new Error("fail"));',
        explanation: "resolve and reject are functions provided by the Promise constructor. Call resolve(value) for success, reject(error) for failure. .then() returns a new Promise, enabling chaining.",
        difficulty: "beginner",
        concepts: ["Promise", "pending", "fulfilled", "rejected", ".then", ".catch", ".finally"]
      }
    ],
    keyTakeaways: [
      "Promises have three states: pending, fulfilled, rejected",
      "State transitions are irreversible (settled once)",
      ".then() handles fulfillment, .catch() handles rejection, .finally() always runs",
      "Promise chaining enables sequential async operations"
    ],
    commonMistakes: [
      { mistake: "Forgetting to return the promise from .then()", explanation: "Without return, the next .then() receives undefined instead of the promise's resolved value.", howToAvoid: "Always return the value or promise you want to pass to the next .then() in the chain." },
      { mistake: "Not catching rejected promises", explanation: "Unhandled promise rejections can crash Node.js processes or cause silent failures in browsers.", howToAvoid: "Always end promise chains with .catch(). Use process.on('unhandledRejection') in Node.js." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What are the three states of a Promise?",
        "How do I create a Promise?",
        "What happens if I don't catch a rejected Promise?"
      ]
    }
  },
  "async and await": {
    xpReward: 15,
    hints: ["async makes a function return a Promise automatically", "await pauses execution until the Promise settles", "try/catch handles errors in async functions"],
    notes: {
      summary: "async/await provides a cleaner syntax for working with Promises, making asynchronous code read like synchronous code.",
      detailedContent: "The async keyword makes a function return a Promise implicitly. The await keyword pauses execution of the async function until the awaited Promise settles, then resumes with the resolved value. Error handling uses try/catch blocks. async/await is built on top of Promises and is compatible with Promise.all() and other Promise utilities. Top-level await (ES2022) allows await at the module top level.",
      prerequisites: ["Promise States"],
      learningObjectives: [
        "Write async functions using the async keyword",
        "Use await to consume Promises",
        "Handle errors with try/catch in async code",
        "Use top-level await in modules"
      ],
      resources: [
        { title: "MDN: async function", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function", type: "docs" },
        { title: "MDN: await", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Async/Await Patterns",
        description: "Clean async code with async/await",
        code: '// Basic async function\nasync function fetchUser(id) {\n  const response = await fetch(`/api/users/${id}`);\n  if (!response.ok) throw new Error("Failed to fetch");\n  return response.json();\n}\n\n// Error handling with try/catch\nasync function loadUser(id) {\n  try {\n    const user = await fetchUser(id);\n    console.log("User:", user.name);\n    return user;\n  } catch (error) {\n    console.error("Error loading user:", error);\n    return null;\n  }\n}\n\n// Sequential vs parallel\nasync function loadAll() {\n  // Sequential (waits for each)\n  const user = await fetchUser(1);\n  const posts = await fetchPosts(user.id);\n  \n  // Parallel (use Promise.all)\n  const [u, p] = await Promise.all([\n    fetchUser(1),\n    fetchPosts(1)\n  ]);\n}\n\n// Top-level await (modules only)\nconst config = await fetch("./config.json").then(r => r.json());',
        explanation: "async functions always return a Promise. await unwraps the Promise value. Use try/catch for error handling. Use Promise.all for parallel operations. Top-level await works in module scripts.",
        difficulty: "intermediate",
        concepts: ["async", "await", "try/catch", "parallel execution", "top-level await"]
      }
    ],
    keyTakeaways: [
      "async makes a function return a Promise",
      "await pauses execution until the Promise resolves",
      "Use try/catch for error handling in async functions",
      "Use Promise.all with await for parallel operations"
    ],
    commonMistakes: [
      { mistake: "Forgetting try/catch in async functions", explanation: "Rejected promises in async functions without try/catch cause unhandled rejections.", howToAvoid: "Always wrap await calls in try/catch, or attach .catch() to the returned promise." },
      { mistake: "Awaiting in series when parallel is possible", explanation: "await a; await b; runs sequentially even when a and b are independent.", howToAvoid: "Use const [a, b] = await Promise.all([promiseA, promiseB]) for independent operations." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I handle errors with async/await?",
        "How do I run promises in parallel with async/await?",
        "What is top-level await?"
      ]
    }
  },
  "Promise.all and race": {
    xpReward: 12,
    hints: ["Promise.all waits for all promises, rejects on first failure", "Promise.race resolves/rejects on the first settled promise", "Promise.allSettled waits for all regardless of outcome"],
    notes: {
      summary: "Promise combinators like Promise.all, Promise.race, Promise.allSettled, and Promise.any enable coordinating multiple asynchronous operations.",
      detailedContent: "Promise.all([...]) waits for all promises to fulfill or any to reject - short-circuits on rejection. Promise.race([...]) resolves/rejects with the first settled promise. Promise.allSettled([...]) waits for all to settle (fulfilled or rejected) and returns results with status. Promise.any([...]) resolves with the first fulfilled promise, rejects if all reject. These combinators are essential for managing parallel async workflows.",
      prerequisites: ["async and await"],
      learningObjectives: [
        "Use Promise.all for parallel execution",
        "Use Promise.race for timeout patterns",
        "Choose the right combinator for different scenarios"
      ],
      resources: [
        { title: "MDN: Promise.all", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all", type: "docs" },
        { title: "MDN: Promise.race", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race", type: "docs" },
        { title: "MDN: Promise.allSettled", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Promise Combinators",
        description: "Comparing Promise.all, race, allSettled, and any",
        code: 'const p1 = Promise.resolve(1);\nconst p2 = new Promise(r => setTimeout(() => r(2), 100));\nconst p3 = Promise.reject(new Error("fail"));\n\n// Promise.all - waits for all, rejects on first failure\nPromise.all([p1, p2])\n  .then(([r1, r2]) => console.log("All:", r1, r2)); // [1, 2]\n\nPromise.all([p1, p3])\n  .catch(e => console.log("All failed:", e.message)); // "fail"\n\n// Promise.race - first settled wins\nPromise.race([p1, p2])\n  .then(r => console.log("Race winner:", r)); // 1\n\n// Promise.allSettled - waits for all, reports status\nPromise.allSettled([p1, p3])\n  .then(results => {\n    results.forEach(r =>\n      console.log(r.status, r.value || r.reason.message));\n  });\n  // "fulfilled 1" / "rejected fail"\n\n// Promise.any - first fulfilled wins (ES2021)\nPromise.any([p3, p2])\n  .then(r => console.log("Any:", r)); // 2\n\n// Timeout pattern with race\nfunction timeout(ms) {\n  return new Promise((_, reject) =>\n    setTimeout(() => reject(new Error("Timeout")), ms));\n}\nPromise.race([fetch("/api/data"), timeout(5000)]);',
        explanation: "Choose based on need: all (all or nothing), race (first past the post), allSettled (all results regardless), any (first success). Use race with timeout for deadline patterns.",
        difficulty: "intermediate",
        concepts: ["Promise.all", "Promise.race", "Promise.allSettled", "Promise.any", "parallel", "timeout"]
      }
    ],
    keyTakeaways: [
      "Promise.all: wait for all to fulfill, short-circuit on reject",
      "Promise.race: first settled promise wins (fulfilled or rejected)",
      "Promise.allSettled: wait for all regardless of outcome",
      "Promise.any: first fulfilled promise wins (ES2021)"
    ],
    commonMistakes: [
      { mistake: "Using Promise.all when you need all results even on failure", explanation: "Promise.all rejects immediately on first failure, losing other results.", howToAvoid: "Use Promise.allSettled when you need results from all promises regardless of individual failures." },
      { mistake: "Expecting Promise.race to resolve with the fastest fulfilled", explanation: "Promise.race settles on the first settled promise - it could be a rejection.", howToAvoid: "Use Promise.any (ES2021) when you want the first successful resolution." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the difference between Promise.all and Promise.allSettled?",
        "How do I implement a timeout with Promise.race?",
        "When would I use Promise.any?"
      ]
    }
  },
  "Delay Promise": {
    xpReward: 25,
    hints: ["Wrap setTimeout in a Promise", "resolve('ready') inside the setTimeout callback", "Use the function signature: function delay(ms) { ... }"],
    notes: {
      summary: "Practice creating a Promise-based delay function that resolves after a specified number of milliseconds.",
      detailedContent: "The delay function demonstrates the fundamental Promise creation pattern: wrapping a callback-based API (setTimeout) in a Promise. This pattern is essential for promisifying other Node.js APIs like fs, crypto, and child_process. The key insight is that resolve/reject are passed to the callback when the async operation completes.",
      prerequisites: ["Promise States"],
      learningObjectives: [
        "Wrap callback-based APIs in Promises",
        "Use setTimeout with Promise resolve",
        "Understand the Promise constructor pattern"
      ],
      resources: [
        { title: "MDN: Promise constructor", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise", type: "docs" },
        { title: "Promisification", url: "https://javascript.info/promisify", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Delay Implementation",
        description: "Creating a Promise-based delay utility",
        code: 'function delay(ms) {\n  return new Promise(resolve => {\n    setTimeout(() => resolve("ready"), ms);\n  });\n}\n\n// Usage with .then()\ndelay(100).then(msg => console.log(msg)); // "ready"\n\n// Usage with async/await\nasync function run() {\n  console.log("Waiting...");\n  const msg = await delay(100);\n  console.log(msg); // "ready"\n}\n\n// Promise.all with delays\nconst [a, b] = await Promise.all([\n  delay(50).then(() => "first"),\n  delay(50).then(() => "second")\n]);\n\n// Utility: delay with value\nfunction delayWithValue(ms, value) {\n  return new Promise(resolve => setTimeout(() => resolve(value), ms));\n}',
        explanation: "The Promise constructor takes a function with resolve. setTimeout's callback calls resolve after ms milliseconds. The resolved value 'ready' is passed to .then() or returned by await.",
        difficulty: "beginner",
        concepts: ["Promise constructor", "setTimeout", "resolve", "promisification"]
      }
    ],
    keyTakeaways: [
      "Use new Promise(resolve => setTimeout(resolve, ms)) for delays",
      "Promisification wraps callback APIs in Promises",
      "Async/await provides cleaner syntax for consuming Promises",
      "Delay utilities are building blocks for sequencing and timing"
    ],
    commonMistakes: [
      { mistake: "Forgetting to call resolve inside setTimeout", explanation: "If resolve is never called, the Promise stays pending forever, causing memory leaks.", howToAvoid: "Always ensure resolve (or reject) is called in every code path. Set a timeout limit for safety." },
      { mistake: "Creating a delay function that doesn't return a Promise", explanation: "Without returning the new Promise, the caller can't await or .then() on the result.", howToAvoid: "Always return new Promise(...) from your delay function." }
    ],
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "How does the Promise constructor work with setTimeout?",
        "Why is my Promise not resolving?",
        "How do I make a delay function that passes a value?"
      ]
    }
  },
  "Class Syntax": {
    xpReward: 12,
    hints: ["Use the class keyword followed by the class name", "Constructor method runs on instantiation: new ClassName()", "Methods are shared via prototype automatically"],
    notes: {
      summary: "ES6 class syntax provides a cleaner, more familiar way to create constructor functions and prototypes in JavaScript.",
      detailedContent: "Classes are syntactic sugar over JavaScript's existing prototype-based inheritance. The class keyword defines a class with a constructor method for initialization and instance methods that are shared via the prototype. Class syntax supports computed method names, getters/setters, static methods, and private fields (#). Unlike function constructors, classes are not hoisted and must be called with new.",
      prerequisites: ["export and import"],
      learningObjectives: [
        "Define classes using the class keyword",
        "Add methods and properties to classes",
        "Understand that classes are syntactic sugar over prototypes"
      ],
      resources: [
        { title: "MDN: Classes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes", type: "docs" },
        { title: "JavaScript Classes Tutorial", url: "https://javascript.info/class", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Class Definition and Usage",
        description: "Creating and using ES6 classes",
        code: 'class Point {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n  \n  distanceTo(other) {\n    const dx = this.x - other.x;\n    const dy = this.y - other.y;\n    return Math.sqrt(dx * dx + dy * dy);\n  }\n  \n  toString() {\n    return `Point(${this.x}, ${this.y})`;\n  }\n  \n  // Getter\n  get magnitude() {\n    return Math.sqrt(this.x ** 2 + this.y ** 2);\n  }\n  \n  // Setter\n  set coordinates([x, y]) {\n    this.x = x;\n    this.y = y;\n  }\n  \n  // Static method\n  static origin() {\n    return new Point(0, 0);\n  }\n}\n\nconst p1 = new Point(3, 4);\nconst p2 = Point.origin();\nconsole.log(p1.toString()); // Point(3, 4)\nconsole.log(p1.magnitude); // 5\nconsole.log(p1.distanceTo(p2)); // 5',
        explanation: "The constructor initializes instances. Methods are on the prototype. Getters/setters act like properties. Static methods belong to the class itself (called with ClassName.method()).",
        difficulty: "beginner",
        concepts: ["class", "constructor", "methods", "getters", "setters", "static"]
      }
    ],
    keyTakeaways: [
      "Classes are syntactic sugar over prototypes",
      "Use constructor for initialization, methods for behavior",
      "Getters/setters provide property-like access",
      "Static methods belong to the class, not instances"
    ],
    commonMistakes: [
      { mistake: "Forgetting the new keyword when instantiating", explanation: "class Point { ... } called without new throws a TypeError. Classes must be constructed with new.", howToAvoid: "Always use new ClassName() to instantiate classes." },
      { mistake: "Adding methods inside the constructor instead of as class methods", explanation: "Defining methods inside the constructor creates a copy per instance, wasting memory.", howToAvoid: "Define methods as class methods (outside constructor). They are automatically added to the prototype." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How are classes different from constructor functions?",
        "What does the static keyword do?",
        "How do getters and setters work in classes?"
      ]
    }
  },
  "Inheritance": {
    xpReward: 12,
    hints: ["Use extends to inherit from another class", "Call super() in the subclass constructor before using this", "Override methods by redefining them in the subclass"],
    notes: {
      summary: "Class inheritance uses the extends keyword to create a subclass that inherits behavior from a parent class, with super to access the parent.",
      detailedContent: "Inheritance in ES6 classes uses extends to create a subclass and super to reference the parent class. super() must be called in the subclass constructor before accessing this. super.method() calls parent methods. JavaScript supports single inheritance (one parent). The prototype chain connects subclass to parent class, and instanceof checks the entire chain.",
      prerequisites: ["Class Syntax"],
      learningObjectives: [
        "Create subclasses using extends",
        "Call parent constructors with super()",
        "Override methods in subclasses",
        "Understand the prototype chain with inheritance"
      ],
      resources: [
        { title: "MDN: extends", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends", type: "docs" },
        { title: "MDN: super", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Class Inheritance Example",
        description: "Building a class hierarchy with extends",
        code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  \n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  \n  move() {\n    return `${this.name} moves`;\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n  \n  // Override\n  speak() {\n    return `${this.name} barks!`;\n  }\n  \n  // New method\n  fetch() {\n    return `${this.name} fetches the ball`;\n  }\n}\n\nclass Cat extends Animal {\n  constructor(name) {\n    super(name);\n  }\n  \n  speak() {\n    return `${this.name} meows`;\n  }\n}\n\nconst rex = new Dog("Rex", "Husky");\nconst whiskers = new Cat("Whiskers");\n\nconsole.log(rex.speak()); // Rex barks!\nconsole.log(whiskers.speak()); // Whiskers meows\nconsole.log(rex.fetch()); // Rex fetches the ball\nconsole.log(rex instanceof Animal); // true\nconsole.log(rex instanceof Dog); // true',
        explanation: "extends connects the subclass to the parent. super() calls the parent constructor. Override methods by defining them with the same name. The prototype chain enables instanceof checks across the hierarchy.",
        difficulty: "intermediate",
        concepts: ["extends", "super", "method overriding", "instanceof", "prototype chain"]
      }
    ],
    keyTakeaways: [
      "extends creates a subclass that inherits from a parent",
      "super() must be called in the constructor before using this",
      "Override methods by redefining them in the subclass",
      "instanceof checks the entire prototype chain"
    ],
    commonMistakes: [
      { mistake: "Forgetting to call super() in the subclass constructor", explanation: "If you define a constructor in a subclass, you MUST call super() before using this. JavaScript throws a ReferenceError otherwise.", howToAvoid: "Always call super() as the first line in a subclass constructor. If the subclass has no constructor, super() is called automatically." },
      { mistake: "Trying to inherit from multiple classes", explanation: "JavaScript only supports single inheritance. class A extends B, C is invalid.", howToAvoid: "Use composition (has-a) instead of multiple inheritance (is-a). Mixins or object composition can achieve similar results." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Why do I need to call super()?",
        "How does method overriding work?",
        "What's the difference between inheritance and composition?"
      ]
    }
  },
  "Static and Private fields": {
    xpReward: 15,
    hints: ["Static members belong to the class, not instances", "Private fields start with # and are truly private", "Static initialization blocks run once when the class is defined"],
    notes: {
      summary: "Static properties/methods belong to the class itself. Private fields (#) provide true encapsulation, enforced by the JavaScript engine.",
      detailedContent: "Static members (static keyword) are accessed on the class, not instances. They're used for utility functions, class-level configuration, and factory methods. Private fields (# prefix, ES2022) are truly private - they cannot be accessed outside the class, even by subclasses. Private methods are also supported. Static initialization blocks (ES2022) run code when the class is defined.",
      prerequisites: ["Inheritance"],
      learningObjectives: [
        "Create static properties and methods",
        "Use private fields with # syntax for encapsulation",
        "Write static initialization blocks"
      ],
      resources: [
        { title: "MDN: static", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static", type: "docs" },
        { title: "MDN: Private class fields", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Static and Private Members",
        description: "Using static and private class features",
        code: 'class Database {\n  // Private fields\n  #connection;\n  #config;\n  \n  // Static private field\n  static #instanceCount = 0;\n  \n  constructor(config) {\n    this.#config = config;\n    this.#connection = null;\n    Database.#instanceCount++;\n  }\n  \n  // Private method\n  #validateConfig() {\n    if (!this.#config.url) {\n      throw new Error("URL required");\n    }\n  }\n  \n  async connect() {\n    this.#validateConfig();\n    this.#connection = await createConnection(this.#config);\n  }\n  \n  // Static method\n  static getInstanceCount() {\n    return Database.#instanceCount;\n  }\n  \n  // Static initialization block\n  static {\n    console.log("Database class loaded");\n    Database.DEFAULT_PORT = 5432;\n  }\n}\n\nconst db = new Database({ url: "postgres://..." });\n// db.#connection; // SyntaxError: private field\nconsole.log(Database.getInstanceCount()); // 1\nconsole.log(Database.DEFAULT_PORT); // 5432',
        explanation: "# makes fields truly private (enforced by the engine). static members belong to the class. Static blocks run once at class definition time for complex initialization.",
        difficulty: "intermediate",
        concepts: ["static", "private fields", "private methods", "static initialization blocks"]
      }
    ],
    keyTakeaways: [
      "Static members are accessed on the class, not instances",
      "Private fields (#) are truly private - enforced by the runtime",
      "Private methods are also supported with # prefix",
      "Static initialization blocks run once when the class is defined"
    ],
    commonMistakes: [
      { mistake: "Trying to access private fields from outside the class", explanation: "# prefixed fields are strictly inaccessible outside the class. Subclasses cannot access parent private fields either.", howToAvoid: "Use protected patterns (like Symbol keys or naming conventions like _private) if you need controlled external access." },
      { mistake: "Confusing static with instance context inside methods", explanation: "Inside a static method, this refers to the class itself. Inside an instance method, this refers to the instance.", howToAvoid: "Use ClassName.staticField instead of this.staticField in static methods for clarity." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What's the difference between static and instance methods?",
        "How are # private fields different from _ convention?",
        "What are static initialization blocks used for?"
      ]
    }
  },
  "Rectangle Class": {
    xpReward: 25,
    hints: ["Use the class keyword with a constructor", "Store width and height as instance properties", "The area() method should return this.width * this.height"],
    notes: {
      summary: "Practice defining a class with a constructor and an instance method to calculate area, demonstrating the fundamental OOP pattern in modern JavaScript.",
      detailedContent: "This exercise reinforces ES6 class syntax: creating a class with a constructor that initializes properties, and an instance method that computes a value from those properties. The Rectangle class is a classic introductory OOP example that demonstrates encapsulation (data + behavior in one unit).",
      prerequisites: ["Class Syntax"],
      learningObjectives: [
        "Define a class with a constructor",
        "Create instance properties from constructor parameters",
        "Write instance methods that use this to access properties"
      ],
      resources: [
        { title: "MDN: Classes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes", type: "docs" },
        { title: "MDN: constructor", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Rectangle Class Variations",
        description: "Multiple ways to implement the Rectangle class",
        code: 'class Rectangle {\n  constructor(width, height) {\n    this.width = width;\n    this.height = height;\n  }\n  \n  area() {\n    return this.width * this.height;\n  }\n  \n  perimeter() {\n    return 2 * (this.width + this.height);\n  }\n  \n  // Getter style\n  get areaValue() {\n    return this.width * this.height;\n  }\n  \n  // Static factory\n  static square(side) {\n    return new Rectangle(side, side);\n  }\n}\n\nconst rect = new Rectangle(5, 3);\nconsole.log(rect.area()); // 15\nconsole.log(rect.perimeter()); // 16\n\nconst square = Rectangle.square(4);\nconsole.log(square.area()); // 16',
        explanation: "The constructor initializes width and height. Instance methods like area() use this to access properties. Getters provide property-like access. Static factories create instances with specific configurations.",
        difficulty: "beginner",
        concepts: ["class", "constructor", "instance method", "getter", "static factory"]
      }
    ],
    keyTakeaways: [
      "Constructor initializes instance properties from arguments",
      "Instance methods operate on instance data via this",
      "Getters provide property-like syntax for computed values",
      "Static factories encapsulate creation logic"
    ],
    commonMistakes: [
      { mistake: "Forgetting the this keyword when accessing properties", explanation: "Inside area(), width refers to a local variable, not the instance property. this.width is required.", howToAvoid: "Always use this.propertyName to access instance properties inside methods." },
      { mistake: "Not using the new keyword when instantiating", explanation: "Rectangle(5, 3) without new will set properties on the global object (or throw in strict mode).", howToAvoid: "Always use new ClassName() to instantiate classes." }
    ],
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "Why is my area() method returning NaN?",
        "What does the this keyword do in a method?",
        "How do I add more methods to my class?"
      ]
    }
  },
  "Map and Set": {
    xpReward: 12,
    hints: ["Map allows any key type (not just strings)", "Set stores unique values", "Both have .size instead of .length"],
    notes: {
      summary: "Map and Set are ES6 collection types. Map stores key-value pairs with any key type, while Set stores unique values of any type.",
      detailedContent: "Map is similar to Object but with significant advantages: any value (including objects, functions) can be a key, it maintains insertion order, has a .size property, and provides built-in iteration. Set stores unique values and provides fast lookup with .has(). Both have clear(), delete(), and keys()/values()/entries() methods. WeakMap and WeakSet allow garbage collection of keys.",
      prerequisites: ["Class Syntax"],
      learningObjectives: [
        "Create and use Map for key-value storage",
        "Create and use Set for unique value collections",
        "Choose between Map and Object appropriately",
        "Understand WeakMap and WeakSet"
      ],
      resources: [
        { title: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", type: "docs" },
        { title: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Map and Set Usage",
        description: "Practical examples of Map and Set",
        code: `// Map with object keys
const userMap = new Map();
const user1 = { name: "Alice" };
const user2 = { name: "Bob" };

userMap.set(user1, { role: "admin" });
userMap.set(user2, { role: "user" });

console.log(userMap.get(user1)); // { role: "admin" }
console.log(userMap.has(user1)); // true
console.log(userMap.size); // 2

// Map iteration
for (const [key, value] of userMap) {
  console.log(key.name, value.role);
}

// Set for unique values
const numbers = [1, 2, 2, 3, 3, 3];
const unique = new Set(numbers);
console.log(unique); // Set { 1, 2, 3 }
console.log(unique.has(2)); // true
console.log(unique.size); // 3

// Converting between Set and Array
const arr = [...unique]; // [1, 2, 3]

// WeakMap - does not prevent garbage collection
const cache = new WeakMap();
// Keys must be objects, values can be anything`,
        explanation: "Map excels when you need non-string keys or frequent add/delete operations. Set provides automatic deduplication. Both are iterable and have predictable performance.",
        difficulty: "beginner",
        concepts: ["Map", "Set", "WeakMap", "iteration", "unique values"]
      }
    ],
    keyTakeaways: [
      "Map allows any key type, maintains insertion order, has .size",
      "Set stores unique values and provides O(1) .has() lookup",
      "Choose Map over Object when keys are dynamic or non-string",
      "WeakMap/WeakSet allow garbage collection of keys"
    ],
    commonMistakes: [
      { mistake: "Using an Object when you need Map features", explanation: "Objects only allow string/Symbol keys, don't have .size, and inherit prototype properties.", howToAvoid: "Use Map when you need non-string keys, frequent add/delete, or .size." },
      { mistake: "Confusing Set.add() with Array.push()", explanation: "Set.add() returns the Set itself (enabling chaining), not the length.", howToAvoid: "Check .size after adding, not the return value of .add()." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When should I use Map instead of Object?",
        "How do I convert a Set to an Array?",
        "What's the difference between Map and WeakMap?"
      ]
    }
  },
  "Iterators and for...of": {
    xpReward: 10,
    hints: ["The iterable protocol requires a [Symbol.iterator]() method", "for...of works with arrays, strings, Maps, Sets, and custom iterables", "The iterator object must have a next() method"],
    notes: {
      summary: "The iterable protocol defines how objects can be iterated using for...of. Arrays, strings, Maps, Sets, and custom objects can be iterable.",
      detailedContent: "An object is iterable if it has a [Symbol.iterator] method that returns an iterator. The iterator is an object with a next() method returning { value, done }. Built-in iterables: Array, String, Map, Set, arguments, NodeList, TypedArray. for...of iterates over values (not keys, unlike for...in). The spread operator (...) and destructuring also work with iterables.",
      prerequisites: ["Map and Set"],
      learningObjectives: [
        "Use for...of to iterate over built-in iterables",
        "Create custom iterable objects",
        "Understand the difference between for...of and for...in"
      ],
      resources: [
        { title: "MDN: Iteration protocols", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols", type: "docs" },
        { title: "MDN: for...of", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Iterables and for...of",
        description: "Working with the iterable protocol",
        code: '// Built-in iterables\nconst array = [10, 20, 30];\nfor (const value of array) {\n  console.log(value); // 10, 20, 30\n}\n\nconst str = "hello";\nfor (const char of str) {\n  console.log(char); // h, e, l, l, o\n}\n\nconst map = new Map([["a", 1], ["b", 2]]);\nfor (const [key, value] of map) {\n  console.log(key, value); // a 1, b 2\n}\n\n// Custom iterable\nclass Range {\n  constructor(start, end) {\n    this.start = start;\n    this.end = end;\n  }\n  \n  [Symbol.iterator]() {\n    let current = this.start;\n    const end = this.end;\n    return {\n      next() {\n        if (current <= end) {\n          return { value: current++, done: false };\n        }\n        return { done: true };\n      }\n    };\n  }\n}\n\nfor (const n of new Range(1, 5)) {\n  console.log(n); // 1, 2, 3, 4, 5\n}\n\n// Spread works with iterables\nconst chars = [..."hello"]; // ["h", "e", "l", "l", "o"]',
        explanation: "for...of iterates over values. The spread operator (...) uses the iterable protocol. Custom iterables implement [Symbol.iterator]() returning an iterator with next().",
        difficulty: "intermediate",
        concepts: ["iterable", "iterator", "Symbol.iterator", "for...of", "custom iteration"]
      }
    ],
    keyTakeaways: [
      "for...of iterates over values (unlike for...in which iterates over keys)",
      "Built-in iterables: Array, String, Map, Set, TypedArray, NodeList",
      "Custom iterables implement [Symbol.iterator]() returning { next() }",
      "Spread (...) and destructuring work with any iterable"
    ],
    commonMistakes: [
      { mistake: "Using for...in on arrays thinking it iterates values", explanation: "for...in iterates enumerable property names (indices as strings), not values. It also includes inherited properties.", howToAvoid: "Use for...of for array values. Use for...in only for object properties (with hasOwnProperty check)." },
      { mistake: "Forgetting that the iterator's next() must return an object with done and value", explanation: "The iterator protocol requires { value, done } objects from next(). Returning just a value is invalid.", howToAvoid: "Always return an object with a done boolean and optional value property." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What's the difference between for...of and for...in?",
        "How do I make my own object iterable?",
        "What does the spread operator have to do with iterables?"
      ]
    }
  },
  "Generators": {
    xpReward: 12,
    hints: ["Generator functions use function* syntax", "yield pauses and returns a value", "Generators can receive values via .next(value)"],
    notes: {
      summary: "Generator functions (function*) can be paused and resumed, yielding multiple values over time. They implement both the iterable and iterator protocols.",
      detailedContent: "Generator functions use function* syntax and the yield keyword. Each call to .next() resumes execution until the next yield, then pauses. Generators are both iterable (have [Symbol.iterator]) and iterator (have next()). They can receive values from callers via .next(value), enabling two-way communication. Generators provide lazy evaluation - values are computed on demand.",
      prerequisites: ["Iterators and for...of"],
      learningObjectives: [
        "Write generator functions using function* and yield",
        "Use generators as custom iterables",
        "Pass values into generators with .next(value)"
      ],
      resources: [
        { title: "MDN: Generators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator", type: "docs" },
        { title: "JavaScript Generators Guide", url: "https://javascript.info/generators", type: "tutorial" }
      ]
    },
    examples: [
      {
        title: "Generator Functions",
        description: "Creating and using generators",
        code: '// Basic generator\nfunction* idGenerator() {\n  let id = 1;\n  while (true) {\n    yield id++;\n  }\n}\n\nconst ids = idGenerator();\nconsole.log(ids.next().value); // 1\nconsole.log(ids.next().value); // 2\nconsole.log(ids.next().value); // 3\n\n// Generator as iterable\nfunction* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield i;\n  }\n}\n\nfor (const n of range(1, 5)) {\n  console.log(n); // 1, 2, 3, 4, 5\n}\n\n// Two-way communication\nfunction* chat() {\n  const name = yield "What is your name?";\n  const age = yield `Hello ${name}, how old are you?`;\n  yield `${name} is ${age} years old`;\n}\n\nconst convo = chat();\nconsole.log(convo.next().value); // What is your name?\nconsole.log(convo.next("Alice").value); // Hello Alice, how old are you?\nconsole.log(convo.next(30).value); // Alice is 30 years old\n\n// Delegating to another generator\nfunction* combined() {\n  yield* range(1, 3);\n  yield* range(10, 12);\n}\nconsole.log([...combined()]); // [1, 2, 3, 10, 11, 12]',
        explanation: "yield pauses execution and produces a value. .next() resumes. .next(value) sends a value back to the generator. yield* delegates to another generator. Generators enable lazy, infinite sequences.",
        difficulty: "intermediate",
        concepts: ["generator", "yield", "function*", "two-way communication", "yield*"]
      }
    ],
    keyTakeaways: [
      "Generator functions (function*) can pause and resume execution",
      "yield produces a value and pauses; .next() resumes",
      "Generators are both iterable and iterator",
      "Use yield* to delegate to another generator"
    ],
    commonMistakes: [
      { mistake: "Calling a generator without ()", explanation: "function* foo() {} creates a generator function. Calling foo() returns a generator object, not the first yield value.", howToAvoid: "Always call foo() to get the generator, then call .next() to start execution." },
      { mistake: "Trying to use => for generators", explanation: "Arrow functions cannot be generators. You must use function* syntax.", howToAvoid: "Use function* name() {} or function*() {} (anonymous) for generator definitions." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How do generators differ from regular functions?",
        "What is the yield keyword for?",
        "Can I pass values into a generator?"
      ]
    }
  },
  "Optional Chaining & Nullish Coalescing": {
    xpReward: 12,
    hints: ["?. short-circuits to undefined if the left side is null/undefined", "?? returns the right side only for null/undefined, not other falsy values", "Use optional chaining for deep property access"],
    notes: {
      summary: "Optional chaining (?.) safely accesses nested properties without throwing errors on null/undefined. Nullish coalescing (??) returns the right operand only for null/undefined.",
      detailedContent: "Optional chaining (?.) checks if the value before ?. is null or undefined before accessing the property. If it is null/undefined, the expression short-circuits and returns undefined. This works with property access (?.), optional function calls (?.), and dynamic access (?.[]). Nullish coalescing (??) distinguishes between null/undefined and other falsy values like 0, '', or false. The logical nullish assignment (??=) assigns only if the target is null/undefined.",
      prerequisites: ["Spread and Rest Operators"],
      learningObjectives: [
        "Use optional chaining for safe nested property access",
        "Use nullish coalescing for precise default values",
        "Combine ?. and ?? for clean data access patterns"
      ],
      resources: [
        { title: "MDN: Optional Chaining", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining", type: "docs" },
        { title: "MDN: Nullish Coalescing", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing", type: "docs" }
      ]
    },
    examples: [
      {
        title: "Optional Chaining and Nullish Coalescing",
        description: "Safe nested access and precise defaults",
        code: 'const user = {\n  profile: {\n    name: "Alice",\n    address: null\n  },\n  getGreeting() {\n    return "Hello";\n  }\n};\n\n// Without optional chaining (verbose)\nconst city = user && user.profile && user.profile.address\n  ? user.profile.address.city : undefined;\n\n// With optional chaining (clean)\nconst city2 = user?.profile?.address?.city;\nconsole.log(city2); // undefined (no error)\n\n// Optional function call\nconst greeting = user.getGreeting?.();\nconsole.log(greeting); // "Hello"\n\n// Nullish coalescing\nconst name = user?.profile?.name ?? "Guest";\nconsole.log(name); // "Alice"\n\n// ?? only replaces null/undefined (not other falsy values)\nconst count = 0;\nconsole.log(count ?? 10); // 0 (0 is not null/undefined)\nconsole.log(count || 10); // 10 (0 is falsy)\n\n// Logical nullish assignment\nlet config = { timeout: null };\nconfig.timeout ??= 5000; // assigns because null\nconsole.log(config.timeout); // 5000',
        explanation: "?. stops evaluation if anything is null/undefined. ?? provides fallback only for null/undefined. Combine them: user?.profile?.name ?? 'Guest'. Use ?? instead of || when 0, '', or false are valid values.",
        difficulty: "intermediate",
        concepts: ["optional chaining", "nullish coalescing", "short-circuit", "nullish assignment"]
      }
    ],
    keyTakeaways: [
      "?. safely accesses nested properties, returning undefined on null/undefined",
      "?? provides defaults only for null/undefined (not other falsy values)",
      "Combine ?. and ?? for clean, safe data access patterns",
      "??= assigns only if the target is null or undefined"
    ],
    commonMistakes: [
      { mistake: "Using || when ?? is appropriate", explanation: "0 || 'default' returns 'default' (because 0 is falsy). 0 ?? 'default' returns 0 (because 0 is not null/undefined).", howToAvoid: "Use ?? when 0, '', or false are valid values. Use || when you want to replace all falsy values." },
      { mistake: "Putting ?. on the left side of assignment", explanation: "user?.name = 'Alice' throws an error - optional chaining is not valid on the left side of assignment.", howToAvoid: "Check for existence first: if (user) user.name = 'Alice', or use a conditional." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the difference between || and ??",
        "How does optional chaining work with function calls?",
        "Can I use optional chaining on the left side of assignment?"
      ]
    }
  },
  "npm and package.json": {
    xpReward: 12,
    hints: ["package.json is the heart of any Node.js project", "npm scripts automate common tasks", "Lockfiles ensure reproducible installations"],
    notes: {
      summary: "npm is the default package manager for Node.js, and package.json is the manifest file that describes your project, its dependencies, and scripts.",
      detailedContent: "The package.json file contains metadata (name, version, description), scripts (dev, build, test, lint), dependencies (runtime), devDependencies (development), and configuration (eslintConfig, browserslist). The package-lock.json ensures reproducible installs across environments. npx runs packages without installing globally. npm workspaces support monorepos.",
      prerequisites: ["Package ecosystem"],
      learningObjectives: [
        "Create and configure a package.json file",
        "Write npm scripts for common tasks",
        "Understand semantic versioning ranges",
        "Use package-lock.json for reproducible builds"
      ],
      resources: [
        { title: "npm Docs: package.json", url: "https://docs.npmjs.com/cli/v9/configuring-npm/package-json/", type: "docs" },
        { title: "Semantic Versioning Explainer", url: "https://semver.org/", type: "article" }
      ]
    },
    examples: [
      {
        title: "package.json Configuration",
        description: "Key fields in a well-configured package.json",
        code: '{\n  "name": "my-awesome-app",\n  "version": "1.0.0",\n  "description": "A modern JavaScript application",\n  "type": "module",\n  "main": "dist/index.js",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "test": "vitest run",\n    "test:watch": "vitest",\n    "lint": "eslint . --fix",\n    "format": "prettier --write .",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  },\n  "devDependencies": {\n    "@vitejs/plugin-react": "^4.0.0",\n    "eslint": "^8.45.0",\n    "prettier": "^3.0.0",\n    "vitest": "^0.34.0"\n  }\n}\n\n// npm commands\n// npm init -y            # Create package.json\n// npm install react      # Install and save to dependencies\n// npm install -D vitest  # Install and save to devDependencies\n// npm run dev            # Run the dev script\n// npx eslint .           # Run without installing globally',
        explanation: "Scripts define commands run with npm run. Version ranges use ^ (caret: allows minor/patch) or ~ (tilde: only patch). The type field (module/commonjs) controls module system. Lockfiles lock exact versions.",
        difficulty: "beginner",
        concepts: ["npm", "package.json", "semver", "scripts", "dependencies", "lockfile"]
      }
    ],
    keyTakeaways: [
      "package.json defines your project, its dependencies, and scripts",
      "npm scripts automate dev, build, test, and lint workflows",
      "^ allows minor updates; ~ allows patch updates; exact version locks",
      "Always commit package-lock.json for deterministic installs"
    ],
    commonMistakes: [
      { mistake: "Forgetting to update package.json when using npx", explanation: "npx runs tools without adding them to package.json. Team members need to know the tool and version.", howToAvoid: "Add commonly used tools as devDependencies and define scripts in package.json." },
      { mistake: "Not including .npmrc or engine requirements", explanation: "Without specifying node version requirements in package.json (engines field), team members might use incompatible versions.", howToAvoid: "Add an engines field: { 'engines': { 'node': '>=18.0.0' } } and consider an .npmrc for project settings." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What fields should every package.json have?",
        "What's the difference between dependencies and devDependencies?",
        "How do npm scripts work?"
      ]
    }
  },
  "Linting and Formatting": {
    xpReward: 10,
    hints: ["ESLint catches bugs and enforces code style", "Prettier auto-formats code consistently", "Use both together for maximum benefit"],
    notes: {
      summary: "ESLint analyzes code for potential errors and style issues while Prettier automatically formats code to a consistent style.",
      detailedContent: "ESLint is a configurable linter that finds problematic patterns, enforces coding standards, and can auto-fix many issues. Rules are configured in .eslintrc or eslint.config.js (flat config). Prettier is an opinionated code formatter that parses code and reprints it with consistent style, ending debates about formatting. They work together: ESLint handles code-quality rules, Prettier handles formatting. Use eslint-config-prettier to disable ESLint rules that conflict with Prettier.",
      prerequisites: ["npm and package.json"],
      learningObjectives: [
        "Set up ESLint with a recommended configuration",
        "Set up Prettier with project-specific settings",
        "Integrate ESLint and Prettier in a development workflow"
      ],
      resources: [
        { title: "ESLint Documentation", url: "https://eslint.org/docs/latest/", type: "docs" },
        { title: "Prettier Documentation", url: "https://prettier.io/docs/en/", type: "docs" }
      ]
    },
    examples: [
      {
        title: "ESLint and Prettier Setup",
        description: "Configuring and running linters and formatters",
        code: '// .eslintrc.json\n{\n  "env": {\n    "browser": true,\n    "es2022": true,\n    "node": true\n  },\n  "extends": [\n    "eslint:recommended",\n    "prettier"\n  ],\n  "rules": {\n    "no-unused-vars": "warn",\n    "no-console": "off",\n    "eqeqeq": ["error", "always"]\n  }\n}\n\n// .prettierrc\n{\n  "semi": true,\n  "singleQuote": false,\n  "tabWidth": 2,\n  "trailingComma": "es5",\n  "printWidth": 80\n}\n\n// npm scripts\n// "lint": "eslint .",\n// "format": "prettier --write .",\n// "check": "prettier --check ."\n\n// VS Code settings.json\n{\n  "editor.formatOnSave": true,\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.codeActionsOnSave": {\n    "source.fixAll.eslint": true\n  }\n}',
        explanation: "ESLint's recommended config provides sensible defaults. Prettier ensures consistent formatting. The VS Code integration auto-formats on save, catching issues before they reach code review.",
        difficulty: "beginner",
        concepts: ["ESLint", "Prettier", "linting", "formatting", "code quality"]
      }
    ],
    keyTakeaways: [
      "ESLint catches bugs and enforces code quality rules",
      "Prettier auto-formats code for consistent style",
      "Use eslint-config-prettier to avoid rule conflicts",
      "Enable format-on-save in your editor for automated consistency"
    ],
    commonMistakes: [
      { mistake: "Using ESLint for formatting rules", explanation: "ESLint's formatting rules (like indent, quotes) can conflict with Prettier. Let ESLint handle code quality, Prettier handle formatting.", howToAvoid: "Use eslint-config-prettier to disable ESLint rules that overlap with Prettier. Run Prettier first, then ESLint." },
      { mistake: "Not committing .eslintrc and .prettierrc to version control", explanation: "Without these config files in the repo, each developer sets up linting/formatting differently, leading to inconsistent code.", howToAvoid: "Commit all tool configuration files (.eslintrc, .prettierrc, .editorconfig) to the repository." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How do I set up ESLint for a new project?",
        "What's the difference between ESLint and Prettier?",
        "How do I integrate ESLint with my editor?"
      ]
    }
  },
  "Bundlers Overview": {
    xpReward: 12,
    hints: ["Bundlers transform and combine source files for production", "Vite is the modern standard for frontend projects", "Bundlers handle JS, CSS, images, and more"],
    notes: {
      summary: "JavaScript bundlers like Vite, esbuild, and webpack transform source code into optimized production bundles, handling modules, transpilation, and assets.",
      detailedContent: "Bundlers serve two roles: dev server with fast Hot Module Replacement (HMR) and production build with optimizations (minification, code splitting, tree shaking). Vite (using esbuild for dev, Rollup for production) is the modern standard. Babel transpiles modern JS for older browsers. Key concepts: entry points, output bundles, loaders/plugins, code splitting, tree shaking, and source maps.",
      prerequisites: ["npm and package.json"],
      learningObjectives: [
        "Understand what bundlers do and why they're needed",
        "Set up a basic Vite project",
        "Enable code splitting and lazy loading"
      ],
      resources: [
        { title: "Vite Documentation", url: "https://vitejs.dev/guide/", type: "docs" },
        { title: "esbuild Documentation", url: "https://esbuild.github.io/", type: "docs" },
        { title: "JavaScript Bundlers Comparison", url: "https://dev.to/underdogio/javascript-bundlers-comparison-2023-1o3h", type: "article" }
      ]
    },
    examples: [
      {
        title: "Vite Configuration",
        description: "Setting up a Vite project with common plugins",
        code: `// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: ["./src/utils"],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

// Project structure
// src/
//   index.html
//   main.js        # Entry point
//   components/     # Lazy-loaded components
//   styles/
// vite.config.js
// package.json

// npm create vite@latest my-app -- --template react
// npm run dev     # Start dev server with HMR
// npm run build   # Production build to dist/`,
        explanation: "Vite uses esbuild for fast dev server startup and Rollup for optimized production builds. Plugins extend functionality (React, Vue, CSS modules). Code splitting reduces initial bundle size.",
        difficulty: "intermediate",
        concepts: ["Vite", "bundler", "HMR", "code splitting", "tree shaking", "esbuild"]
      }
    ],
    keyTakeaways: [
      "Bundlers transform source files into optimized production code",
      "Vite is the modern standard: fast dev server + optimized builds",
      "Code splitting lazy-loads code when needed, reducing initial bundle size",
      "Tree shaking removes unused code from the final bundle"
    ],
    commonMistakes: [
      { mistake: "Not optimizing bundles for production", explanation: "Default development builds lack minification, tree shaking, and code splitting, resulting in large bundles.", howToAvoid: "Always use a bundler's production build command (vite build, webpack --mode production) for deployment." },
      { mistake: "Over-splitting code into too many chunks", explanation: "Too many small chunks means many HTTP requests, which can actually harm performance on HTTP/1.1.", howToAvoid: "Find a balance. Use manualChunks in Rollup or splitChunks in webpack to group related modules. Monitor bundle size with tools like bundle-analyzer." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What does a JavaScript bundler do?",
        "Why is Vite faster than webpack?",
        "How does code splitting improve performance?"
      ]
    }
  },
  "Capstone: Modern JS Checklist": {
    xpReward: 12,
    hints: ["Review all ES6+ features covered in this course", "Apply these patterns in your next project", "Practice by refactoring old code with modern syntax"],
    notes: {
      summary: "A comprehensive review of modern JavaScript best practices, serving as a checklist for writing clean, efficient, and maintainable JavaScript code.",
      detailedContent: "Modern JavaScript best practices checklist: 1) Use const/let over var (block scoping), 2) Template literals over concatenation, 3) Arrow functions for concise callbacks, 4) Destructuring for clean data extraction, 5) Spread/rest for flexible collections, 6) Modules (import/export) over global scripts, 7) Async/await over callback chains, 8) Promises for asynchronous operations, 9) Classes for OOP patterns, 10) Map/Set over plain objects when appropriate, 11) Optional chaining (?.) and nullish coalescing (??) for safe access, 12) Dynamic import() for code splitting.",
      prerequisites: ["All previous modules"],
      learningObjectives: [
        "Review all major modern JavaScript features",
        "Identify opportunities to use modern syntax in existing code",
        "Apply best practices in new projects"
      ],
      resources: [
        { title: "JavaScript ES6+ Features Reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference", type: "docs" },
        { title: "Modern JavaScript Cheatsheet", url: "https://dev.to/rahxuls/modern-javascript-cheatsheet-4648", type: "article" }
      ]
    },
    examples: [
      {
        title: "Before and After: Modern Refactoring",
        description: "Old ES5 code vs modern ES6+ equivalent",
        code: '// ---- ES5 Style ----\nvar users = [\n  { name: "Alice", age: 30 },\n  { name: "Bob", age: 25 }\n];\n\nvar names = [];\nfor (var i = 0; i < users.length; i++) {\n  names.push(users[i].name);\n}\n\nfunction greet(name) {\n  if (name === undefined) {\n    name = "Guest";\n  }\n  return "Hello, " + name + "!";\n}\n\nvar delayed = function(callback) {\n  setTimeout(function() {\n    callback("Done");\n  }, 1000);\n};\n\n// ---- Modern ES6+ Style ----\nconst users = [\n  { name: "Alice", age: 30 },\n  { name: "Bob", age: 25 }\n];\n\nconst names = users.map(u => u.name);\n\nfunction greet(name = "Guest") {\n  return `Hello, ${name}!`;\n}\n\nconst delayed = (callback) => {\n  setTimeout(() => callback("Done"), 1000);\n};',
        explanation: "Modern syntax is shorter, safer, and more readable. Key improvements: const, arrow functions, default params, template literals, array methods (map), and cleaner callback patterns.",
        difficulty: "intermediate",
        concepts: ["refactoring", "best practices", "modern syntax", "code quality"]
      }
    ],
    keyTakeaways: [
      "Use const by default, let when reassignment is needed",
      "Arrow functions, template literals, destructuring, spread/rest are daily tools",
      "Modules organize code; async/await handles asynchronicity",
      "Classes provide clean OOP; Map/Set handle collections better than plain objects",
      "Optional chaining and nullish coalescing prevent runtime errors"
    ],
    commonMistakes: [
      { mistake: "Trying to use every modern feature everywhere", explanation: "Modern syntax is powerful but can be overused. Readability should be the priority.", howToAvoid: "Use modern features that make code clearer. Avoid clever one-liners at the expense of readability. Code is read more often than written." },
      { mistake: "Assuming all users have modern browsers", explanation: "Older browsers (IE11) don't support ES6+ features. Transpile with Babel when targeting broad audience.", howToAvoid: "Check your target audience. Use a bundler with Babel for broad compatibility. Use caniuse.com to check feature support." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What modern JavaScript features should I prioritize learning?",
        "How can I refactor old code to use modern syntax?",
        "What's the minimum browser support I should aim for?"
      ]
    }
  },
};

