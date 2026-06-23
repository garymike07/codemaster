import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import {
  seedCourseFromModules,
  theory,
  practice,
  type ModuleSpec,
} from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const MODULES: ModuleSpec[] = [
  {
    title: "ES6+ Overview",
    description: "Understand how modern JavaScript evolved and why it matters",
    lessons: [
      theory("What Changed in ES6+", 15, [
        {
          heading: "ECMAScript editions",
          body: "JavaScript is standardized as ECMAScript (ES). ES6 (ES2015) was a major release adding modules, classes, arrow functions, and more. Yearly releases since then add smaller features like optional chaining (ES2020).",
        },
        {
          heading: "Why upgrade your skills",
          body: "Modern syntax is shorter, safer, and matches how teams write production code today. Browsers and Node.js support ES modules and async/await natively.",
        },
      ], { language: "javascript", code: 'const version = "ES2024";\nconsole.log(`Running ${version} features`);' }),
      theory("let, const, and Block Scope", 15, [
        {
          heading: "Block scope",
          body: "`let` and `const` are block-scoped (limited to `{}`), unlike `var` which is function-scoped. This prevents accidental overwrites in loops and conditionals.",
        },
        {
          heading: "When to use each",
          body: "Prefer `const` by default. Use `let` when you must reassign. Avoid `var` in new code.",
        },
      ], { language: "javascript", code: "for (let i = 0; i < 3; i++) {\n  const label = `item-${i}`;\n  console.log(label);\n}" }),
      theory("Template Literals & Expressions", 12, [
        {
          heading: "Backtick strings",
          body: "Template literals use backticks and support multiline text without escape characters.",
        },
        {
          heading: "Interpolation",
          body: "Embed expressions with `${expression}` inside template literals for readable string building.",
        },
      ], { language: "javascript", code: 'const name = "Ada";\nconsole.log(`Hello, ${name.toUpperCase()}!`);' }),
      practice(
        "Format a Greeting",
        20,
        "**Task:** Implement `formatGreeting(name)` returning `Hello, <NAME>!` where the name is uppercased.",
        [{ heading: "Hint", body: "Use template literals and `toUpperCase()`." }],
        {
          language: "javascript",
          codeTemplate: `function formatGreeting(name) {
  // your code
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
console.log(formatGreeting(input));`,
          solution: `function formatGreeting(name) {
  return \`Hello, \${name.toUpperCase()}!\`;
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
console.log(formatGreeting(input));`,
          testCases: [
            { input: "ada", expectedOutput: "Hello, ADA!", isHidden: false },
            { input: "bob", expectedOutput: "Hello, BOB!", isHidden: true },
          ],
        }
      ),
    ],
  },
  {
    title: "Destructuring & Spread",
    description: "Unpack values from arrays and objects elegantly",
    lessons: [
      theory("Array Destructuring", 15, [
        { heading: "Basic syntax", body: "Extract values by position: `const [first, second] = arr`. Skip elements with commas, use rest: `const [head, ...tail] = arr`." },
        { heading: "Swapping", body: "`[a, b] = [b, a]` swaps variables without a temporary." },
      ], { language: "javascript", code: "const scores = [95, 87, 72];\nconst [gold, silver] = scores;\nconsole.log(gold, silver);" }),
      theory("Object Destructuring", 15, [
        { heading: "Property extraction", body: "`const { name, age } = user` pulls properties by key. Rename with `const { name: fullName } = user`." },
        { heading: "Defaults", body: "`const { role = 'guest' } = user` applies defaults when properties are undefined." },
      ], { language: "javascript", code: 'const user = { name: "Kim", age: 28 };\nconst { name, age } = user;\nconsole.log(name, age);' }),
      theory("Spread and Rest Operators", 15, [
        { heading: "Spread `...`", body: "Copy or merge arrays/objects: `[...a, ...b]`, `{ ...defaults, ...overrides }`." },
        { heading: "Rest parameters", body: "Collect remaining arguments: `function sum(...nums) { return nums.reduce((a,b)=>a+b,0); }`" },
      ], { language: "javascript", code: "const defaults = { theme: 'dark', lang: 'en' };\nconst prefs = { ...defaults, lang: 'fr' };\nconsole.log(prefs);" }),
      practice(
        "Merge User Profiles",
        20,
        "**Task:** `mergeProfiles(base, extra)` returns a new object with all keys from both; `extra` wins on conflicts.",
        [{ heading: "Use spread", body: "Do not mutate `base`." }],
        {
          language: "javascript",
          codeTemplate: `function mergeProfiles(base, extra) {
  // your code
}

console.log(JSON.stringify(mergeProfiles({ a: 1 }, { b: 2, a: 9 })));`,
          solution: `function mergeProfiles(base, extra) {
  return { ...base, ...extra };
}

console.log(JSON.stringify(mergeProfiles({ a: 1 }, { b: 2, a: 9 })));`,
          testCases: [{ input: "", expectedOutput: '{"a":9,"b":2}', isHidden: false }],
        }
      ),
    ],
  },
  {
    title: "Arrow Functions & this",
    description: "Concise functions and lexical `this` binding",
    lessons: [
      theory("Arrow Function Syntax", 12, [
        { heading: "Forms", body: "`() => expr`, `x => x * 2`, `(a, b) => { return a + b; }`. Parentheses required for zero or multiple params." },
        { heading: "Implicit return", body: "Omit braces to return an expression automatically." },
      ], { language: "javascript", code: "const double = n => n * 2;\nconsole.log(double(21));" }),
      theory("Lexical this", 15, [
        { heading: "No own this", body: "Arrow functions do not bind their own `this`; they inherit from the enclosing scope. Ideal for callbacks in classes and timers." },
        { heading: "When not to use arrows", body: "Avoid arrows for object methods that need dynamic `this`, or constructors." },
      ], { language: "javascript", code: "const counter = {\n  count: 0,\n  inc() { setTimeout(() => { this.count++; }, 0); }\n};" }),
      theory("Default & Rest Parameters", 12, [
        { heading: "Defaults", body: "`function greet(name = 'Guest')` uses defaults when argument is undefined." },
        { heading: "Combining features", body: "Defaults work with destructuring: `function connect({ host = 'localhost', port = 3000 } = {})`." },
      ], { language: "javascript", code: "function multiply(a, b = 1) { return a * b; }\nconsole.log(multiply(5));" }),
      practice(
        "Sum with Rest",
        20,
        "**Task:** `sumAll(...nums)` returns the sum of all numeric arguments.",
        [{ heading: "Edge case", body: "Return 0 when no arguments are passed." }],
        {
          language: "javascript",
          codeTemplate: `function sumAll(...nums) {
  // your code
}

console.log(sumAll(1, 2, 3));`,
          solution: `function sumAll(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

console.log(sumAll(1, 2, 3));`,
          testCases: [{ input: "", expectedOutput: "6", isHidden: false }],
        }
      ),
    ],
  },
  {
    title: "Modules",
    description: "Organize code with import and export",
    lessons: [
      theory("export and import", 15, [
        { heading: "Named exports", body: "`export const PI = 3.14;` and `import { PI } from './math.js'`." },
        { heading: "Default export", body: "One default per module: `export default function() {}` then `import fn from './fn.js'`." },
      ], { language: "javascript", code: "// math.js\nexport const add = (a, b) => a + b;\n// main.js\n// import { add } from './math.js';" }),
      theory("Module scope", 12, [
        { heading: "Private by default", body: "Top-level variables in modules are module-scoped, not global." },
        { heading: "Strict mode", body: "Modules run in strict mode automatically." },
      ]),
      theory("Dynamic import()", 12, [
        { heading: "Lazy loading", body: "`const mod = await import('./heavy.js')` loads modules on demand — useful for code splitting." },
      ]),
      theory("Package ecosystem", 12, [
        { heading: "npm packages", body: "Install dependencies with npm. Import published packages by name after installation." },
        { heading: ".js extension", body: "In Node ESM, include file extensions in relative imports." },
      ]),
    ],
  },
  {
    title: "Promises & Async/Await",
    description: "Master asynchronous patterns in modern JavaScript",
    lessons: [
      theory("Promise States", 15, [
        { heading: "pending, fulfilled, rejected", body: "A Promise represents a future value. Chain with `.then()` / `.catch()` / `.finally()`." },
      ], { language: "javascript", code: "Promise.resolve(42).then(v => console.log(v));" }),
      theory("async and await", 15, [
        { heading: "Readable async code", body: "`async function load() { const data = await fetch(url); return data.json(); }`" },
        { heading: "Error handling", body: "Use try/catch around await, or let errors propagate to callers." },
      ], { language: "javascript", code: "async function wait(ms) {\n  await new Promise(r => setTimeout(r, ms));\n  return 'done';\n}" }),
      theory("Promise.all and race", 15, [
        { heading: "Parallel work", body: "`Promise.all([p1, p2])` waits for all. `Promise.race` resolves when the first settles." },
      ]),
      practice(
        "Delay Promise",
        25,
        "**Task:** Implement `delay(ms)` returning a Promise that resolves to the string `'ready'` after `ms` milliseconds (use in template for sync test).",
        [{ heading: "Note", body: "For automated tests we simulate with immediate resolve and ms value check via function export pattern." }],
        {
          language: "javascript",
          codeTemplate: `function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve("ready"), ms);
  });
}

delay(0).then(v => console.log(v));`,
          solution: `function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve("ready"), ms);
  });
}

delay(0).then(v => console.log(v));`,
          testCases: [{ input: "", expectedOutput: "ready", isHidden: false }],
        }
      ),
    ],
  },
  {
    title: "Classes & OOP",
    description: "Object-oriented patterns with modern class syntax",
    lessons: [
      theory("Class Syntax", 15, [
        { heading: "constructor", body: "`class User { constructor(name) { this.name = name; } greet() { return 'Hi ' + this.name; } }`" },
      ], { language: "javascript", code: "class Point {\n  constructor(x, y) { this.x = x; this.y = y; }\n}\nconsole.log(new Point(1, 2).x);" }),
      theory("Inheritance", 15, [
        { heading: "extends and super", body: "Subclasses call `super()` in constructor and can override methods." },
      ]),
      theory("Static and Private fields", 15, [
        { heading: "static methods", body: "Belong to the class: `class MathUtil { static add(a,b) { return a+b; } }`" },
        { heading: "# private fields", body: "Use `#field` for truly private instance fields (ES2022)." },
      ]),
      practice(
        "Rectangle Class",
        25,
        "**Task:** `Rectangle` class with constructor(width, height) and method `area()` returning width * height.",
        [],
        {
          language: "javascript",
          codeTemplate: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  area() {
    // your code
  }
}

console.log(new Rectangle(4, 5).area());`,
          solution: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}

console.log(new Rectangle(4, 5).area());`,
          testCases: [{ input: "", expectedOutput: "20", isHidden: false }],
        }
      ),
    ],
  },
  {
    title: "Iterators, Maps & Sets",
    description: "Collections beyond plain objects and arrays",
    lessons: [
      theory("Map and Set", 15, [
        { heading: "Map", body: "Key-value store with any key type. `map.set(key, val)`, `map.get(key)`." },
        { heading: "Set", body: "Unique values. `set.add(x)`, `set.has(x)`." },
      ], { language: "javascript", code: "const seen = new Set([1, 2, 2, 3]);\nconsole.log(seen.size);" }),
      theory("Iterators and for...of", 12, [
        { heading: "Iterable protocol", body: "Objects with `[Symbol.iterator]()` work with `for...of`." },
      ]),
      theory("Generators", 15, [
        { heading: "function*", body: "Generators yield multiple values: `function* ids() { let i = 0; while (true) yield i++; }`" },
      ]),
      theory("Optional Chaining & Nullish Coalescing", 12, [
        { heading: "?. and ??", body: "`user?.address?.city` safely accesses nested props. `value ?? 'default'` only replaces null/undefined." },
      ], { language: "javascript", code: "const city = null?.missing ?? 'N/A';\nconsole.log(city);" }),
    ],
  },
  {
    title: "Modern Tooling",
    description: "npm, bundlers, and developer workflow",
    lessons: [
      theory("npm and package.json", 15, [
        { heading: "Scripts", body: "`npm run dev`, `npm test` — define scripts in package.json." },
        { heading: "Dependencies", body: "dependencies vs devDependencies; lockfiles for reproducible installs." },
      ]),
      theory("Linting and Formatting", 12, [
        { heading: "ESLint + Prettier", body: "Catch bugs early and keep consistent style across teams." },
      ]),
      theory("Bundlers Overview", 15, [
        { heading: "Vite / esbuild", body: "Dev servers with HMR and optimized production builds." },
      ]),
      theory("Capstone: Modern JS Checklist", 15, [
        { heading: "Review", body: "Use const/let, modules, async/await, classes when appropriate, Map/Set for collections, optional chaining for safety. Next: React and Node courses on CodeMaster." },
      ]),
    ],
  },
];

export async function seedModernJavaScript(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "javascript");
  await applyEnhancementsToCourse(ctx, "modern-javascript");
  return lessonIds;
}
