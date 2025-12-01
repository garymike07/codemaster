import { mutation } from "./_generated/server";

// Helper function to create lessons for a module
async function createLessons(ctx: any, moduleId: any, courseId: any, lessons: any[]) {
  for (const lesson of lessons) {
    await ctx.db.insert("lessons", {
      moduleId,
      courseId,
      ...lesson,
    });
  }
}

// ==========================================
// TYPESCRIPT DEVELOPMENT - 10 MODULES
// ==========================================
async function seedTypeScriptCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "typescript-development",
    title: "TypeScript Development",
    description: "Master TypeScript from basics to advanced. Learn type safety, generics, interfaces, and build robust applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    language: "typescript",
    difficulty: "intermediate",
    totalLessons: 45,
    estimatedHours: 40,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: Introduction & Setup
  const tsMod1 = await ctx.db.insert("modules", {
    courseId,
    title: "Introduction & Setup",
    order: 1,
    summary: "What is TypeScript, installation, and configuration",
  });

  await createLessons(ctx, tsMod1, courseId, [
    {
      title: "What is TypeScript?",
      type: "theory",
      content: `# What is TypeScript?

TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript.

## Why TypeScript?
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete, refactoring
- **Documentation**: Types serve as docs
- **Scalability**: Easier to maintain large codebases

## TypeScript vs JavaScript
\`\`\`typescript
// JavaScript - no type checking
function add(a, b) {
  return a + b;
}
add("5", 3); // "53" (string concatenation!)

// TypeScript - type checked
function add(a: number, b: number): number {
  return a + b;
}
// add("5", 3); // Error! Argument of type 'string'...
\`\`\``,
      order: 1,
      xpReward: 10,
      estimatedMinutes: 8,
      language: "typescript",
    },
    {
      title: "Setting Up TypeScript",
      type: "theory",
      content: `# Setting Up TypeScript

## Installation
\`\`\`bash
# Global installation
npm install -g typescript

# Project installation
npm install --save-dev typescript
\`\`\`

## Compiling TypeScript
\`\`\`bash
# Compile a file
tsc app.ts

# Watch mode
tsc app.ts --watch

# Initialize tsconfig.json
tsc --init
\`\`\`

## tsconfig.json
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "First TypeScript Program",
      type: "practice",
      content: `# First TypeScript Program

Write a type-safe greeting function.

## Task
Create a function \`greet\` that:
- Takes a name parameter (string)
- Returns a greeting string
- Has explicit type annotations`,
      codeTemplate: `// Create a typed greeting function

function greet(name) {
  // Add types and return greeting
}

console.log(greet("World"));`,
      solution: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
      testCases: [
        { input: "", expectedOutput: "Hello, World!", description: "Returns greeting", points: 25 }
      ],
      hints: ["Add : string after parameter", "Add : string after parentheses for return type"],
      order: 3,
      xpReward: 25,
      estimatedMinutes: 8,
      language: "typescript",
    },
  ]);

  // Module 2: Type System Basics
  const tsMod2 = await ctx.db.insert("modules", {
    courseId,
    title: "Type System Basics",
    order: 2,
    summary: "Primitive types, type annotations, and type inference",
  });

  await createLessons(ctx, tsMod2, courseId, [
    {
      title: "Primitive Types",
      type: "theory",
      content: `# Primitive Types

## Basic Types
\`\`\`typescript
// String
let name: string = "Alice";

// Number
let age: number = 25;
let price: number = 19.99;

// Boolean
let isActive: boolean = true;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;
\`\`\`

## Type Inference
\`\`\`typescript
// TypeScript infers the type
let message = "Hello"; // inferred as string
let count = 42;        // inferred as number

// message = 123; // Error! Type 'number' is not assignable to type 'string'
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Special Types",
      type: "theory",
      content: `# Special Types

## any
\`\`\`typescript
let anything: any = "hello";
anything = 42;      // OK
anything = true;    // OK
// Avoid using any - defeats type safety!
\`\`\`

## unknown
\`\`\`typescript
let value: unknown = "hello";
// Must narrow type before using
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
\`\`\`

## void
\`\`\`typescript
function logMessage(msg: string): void {
  console.log(msg);
  // No return value
}
\`\`\`

## never
\`\`\`typescript
function throwError(msg: string): never {
  throw new Error(msg);
  // Never returns
}
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Type Annotations",
      type: "practice",
      content: `# Type Annotations Practice

Add proper type annotations to variables.

## Task
Declare variables with correct types:
1. \`username\` - string "Alice"
2. \`userAge\` - number 25  
3. \`isAdmin\` - boolean false

Print all three.`,
      codeTemplate: `// Add type annotations to each variable

let username = "Alice";
let userAge = 25;
let isAdmin = false;

console.log(username, userAge, isAdmin);`,
      solution: `let username: string = "Alice";
let userAge: number = 25;
let isAdmin: boolean = false;

console.log(username, userAge, isAdmin);`,
      testCases: [
        { input: "", expectedOutput: "Alice 25 false", description: "Prints all values", points: 25 }
      ],
      hints: ["Use : type after variable name", "string, number, boolean are the basic types"],
      order: 3,
      xpReward: 25,
      estimatedMinutes: 8,
      language: "typescript",
    },
  ]);

  // Module 3: Arrays, Tuples & Enums
  const tsMod3 = await ctx.db.insert("modules", {
    courseId,
    title: "Arrays, Tuples & Enums",
    order: 3,
    summary: "Typed arrays, tuples, and enumerated types",
  });

  await createLessons(ctx, tsMod3, courseId, [
    {
      title: "Typed Arrays",
      type: "theory",
      content: `# Typed Arrays

## Array Syntax
\`\`\`typescript
// Type[]
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];

// Array<Type> (generic)
let values: Array<number> = [1, 2, 3];

// Mixed types (union)
let mixed: (string | number)[] = [1, "hello", 2];
\`\`\`

## Array Operations
\`\`\`typescript
const nums: number[] = [1, 2, 3];

nums.push(4);           // OK
// nums.push("hello");  // Error!

const doubled = nums.map(n => n * 2); // number[]
const filtered = nums.filter(n => n > 1); // number[]
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Tuples",
      type: "theory",
      content: `# Tuples

Tuples are fixed-length arrays with specific types at each position.

\`\`\`typescript
// Tuple type
let person: [string, number] = ["Alice", 25];

// Accessing elements
const name = person[0];  // string
const age = person[1];   // number

// Named tuples (TS 4.0+)
type Point = [x: number, y: number];
const point: Point = [10, 20];

// Optional elements
type Response = [number, string?];
const success: Response = [200];
const error: Response = [404, "Not Found"];
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Enums",
      type: "theory",
      content: `# Enums

Enums define a set of named constants.

## Numeric Enums
\`\`\`typescript
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right   // 3
}

let dir: Direction = Direction.Up;
\`\`\`

## String Enums
\`\`\`typescript
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING"
}

let status: Status = Status.Active;
\`\`\`

## Const Enums
\`\`\`typescript
const enum Color {
  Red,
  Green,
  Blue
}
// More efficient - inlined at compile time
\`\`\``,
      order: 3,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Working with Arrays",
      type: "practice",
      content: `# Array Practice

Create a typed array and perform operations.

## Task
1. Create a typed array of numbers: [10, 20, 30, 40, 50]
2. Filter numbers greater than 25
3. Double each remaining number
4. Print the result`,
      codeTemplate: `// Create typed array and transform

const numbers: number[] = [10, 20, 30, 40, 50];

// Filter and double

`,
      solution: `const numbers: number[] = [10, 20, 30, 40, 50];

const result = numbers
  .filter(n => n > 25)
  .map(n => n * 2);

console.log(result);`,
      testCases: [
        { input: "", expectedOutput: "[ 60, 80, 100 ]", description: "Filtered and doubled", points: 30 }
      ],
      hints: ["Chain .filter() and .map()", "Filter keeps n > 25, map doubles"],
      order: 4,
      xpReward: 35,
      estimatedMinutes: 10,
      language: "typescript",
    },
  ]);

  // Module 4: Interfaces & Type Aliases
  const tsMod4 = await ctx.db.insert("modules", {
    courseId,
    title: "Interfaces & Type Aliases",
    order: 4,
    summary: "Define object shapes with interfaces and type aliases",
  });

  await createLessons(ctx, tsMod4, courseId, [
    {
      title: "Interfaces",
      type: "theory",
      content: `# Interfaces

Interfaces define the shape of objects.

## Basic Interface
\`\`\`typescript
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Alice",
  age: 25,
  email: "alice@mail.com"
};
\`\`\`

## Optional Properties
\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string;  // optional
}
\`\`\`

## Readonly Properties
\`\`\`typescript
interface Config {
  readonly apiKey: string;
  timeout: number;
}
\`\`\`

## Extending Interfaces
\`\`\`typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
\`\`\``,
      order: 1,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "typescript",
    },
    {
      title: "Type Aliases",
      type: "theory",
      content: `# Type Aliases

Create custom type names.

## Basic Type Alias
\`\`\`typescript
type ID = string | number;

let userId: ID = "abc123";
userId = 123;  // also valid
\`\`\`

## Object Type Alias
\`\`\`typescript
type Point = {
  x: number;
  y: number;
};

const origin: Point = { x: 0, y: 0 };
\`\`\`

## Interface vs Type
\`\`\`typescript
// Interface - can be extended/merged
interface User {
  name: string;
}
interface User {  // declaration merging
  age: number;
}

// Type - more flexible
type Response = string | Error;
type Callback = (data: string) => void;
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Create a User Interface",
      type: "practice",
      content: `# User Interface Practice

Create an interface for a user object.

## Task
Create interface \`User\` with:
- id: number
- name: string
- email: string
- isActive: boolean (optional)

Create a user object and print name.`,
      codeTemplate: `// Create User interface


// Create user object


// Print user name
`,
      solution: `interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@mail.com"
};

console.log(user.name);`,
      testCases: [
        { input: "", expectedOutput: "Alice", description: "Prints user name", points: 30 }
      ],
      hints: ["Use ? for optional properties", "Implement all required properties"],
      order: 3,
      xpReward: 35,
      estimatedMinutes: 10,
      language: "typescript",
    },
  ]);

  // Module 5: Union & Intersection Types
  const tsMod5 = await ctx.db.insert("modules", {
    courseId,
    title: "Union & Intersection Types",
    order: 5,
    summary: "Combine types with unions and intersections",
  });

  await createLessons(ctx, tsMod5, courseId, [
    {
      title: "Union Types",
      type: "theory",
      content: `# Union Types

A value can be one of several types.

## Basic Union
\`\`\`typescript
type ID = string | number;

let id: ID = "abc";
id = 123;  // also valid
\`\`\`

## Union with Objects
\`\`\`typescript
type Result = 
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data);
  } else {
    console.log(result.message);
  }
}
\`\`\`

## Literal Types
\`\`\`typescript
type Direction = "north" | "south" | "east" | "west";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Intersection Types",
      type: "theory",
      content: `# Intersection Types

Combine multiple types into one.

\`\`\`typescript
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type Staff = Person & Employee;

const staff: Staff = {
  name: "Alice",
  age: 25,
  employeeId: 123,
  department: "Engineering"
};
\`\`\`

## With Interfaces
\`\`\`typescript
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

type Document = Printable & Loggable;
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Type Narrowing",
      type: "practice",
      content: `# Type Narrowing

Handle union types safely.

## Task
Create function \`formatValue\` that:
- Takes value: string | number
- Returns string with "String: " or "Number: " prefix`,
      codeTemplate: `function formatValue(value: string | number): string {
  // Use typeof to narrow the type
}

console.log(formatValue("hello"));
console.log(formatValue(42));`,
      solution: `function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return \`String: \${value}\`;
  }
  return \`Number: \${value}\`;
}

console.log(formatValue("hello"));
console.log(formatValue(42));`,
      testCases: [
        { input: "", expectedOutput: "String: hello", description: "Handles string", points: 15 },
        { input: "", expectedOutput: "Number: 42", description: "Handles number", points: 15 }
      ],
      hints: ["Use typeof to check type", "TypeScript narrows type in if block"],
      order: 3,
      xpReward: 30,
      estimatedMinutes: 10,
      language: "typescript",
    },
  ]);

  // Module 6: Functions in TypeScript
  const tsMod6 = await ctx.db.insert("modules", {
    courseId,
    title: "Functions in TypeScript",
    order: 6,
    summary: "Typed functions, overloads, and generics basics",
  });

  await createLessons(ctx, tsMod6, courseId, [
    {
      title: "Function Types",
      type: "theory",
      content: `# Function Types

## Parameter and Return Types
\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;
\`\`\`

## Optional and Default Parameters
\`\`\`typescript
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"}, \${name}!\`;
}

function greetDefault(name: string, greeting = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}
\`\`\`

## Function Types
\`\`\`typescript
type MathOp = (a: number, b: number) => number;

const add: MathOp = (a, b) => a + b;
const sub: MathOp = (a, b) => a - b;
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Function Overloads",
      type: "theory",
      content: `# Function Overloads

Multiple function signatures for different inputs.

\`\`\`typescript
// Overload signatures
function reverse(str: string): string;
function reverse(arr: number[]): number[];

// Implementation
function reverse(input: string | number[]): string | number[] {
  if (typeof input === "string") {
    return input.split("").reverse().join("");
  }
  return input.reverse();
}

reverse("hello");  // string
reverse([1, 2, 3]); // number[]
\`\`\``,
      order: 2,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "typescript",
    },
    {
      title: "Typed Callback",
      type: "practice",
      content: `# Typed Callback Function

Create a function that accepts a typed callback.

## Task
Create \`processArray\` that:
- Takes numbers: number[]
- Takes callback: (n: number) => number
- Returns transformed array`,
      codeTemplate: `function processArray(
  numbers: number[],
  callback: (n: number) => number
): number[] {
  // Use map with callback
}

console.log(processArray([1, 2, 3], n => n * 2));`,
      solution: `function processArray(
  numbers: number[],
  callback: (n: number) => number
): number[] {
  return numbers.map(callback);
}

console.log(processArray([1, 2, 3], n => n * 2));`,
      testCases: [
        { input: "", expectedOutput: "[ 2, 4, 6 ]", description: "Doubles each number", points: 30 }
      ],
      hints: ["Use numbers.map(callback)", "Callback type is (n: number) => number"],
      order: 3,
      xpReward: 35,
      estimatedMinutes: 10,
      language: "typescript",
    },
  ]);

  // Module 7: Classes & OOP
  const tsMod7 = await ctx.db.insert("modules", {
    courseId,
    title: "Classes & OOP",
    order: 7,
    summary: "TypeScript classes, access modifiers, and inheritance",
  });

  await createLessons(ctx, tsMod7, courseId, [
    {
      title: "TypeScript Classes",
      type: "theory",
      content: `# TypeScript Classes

## Basic Class
\`\`\`typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}

const person = new Person("Alice", 25);
\`\`\`

## Shorthand Constructor
\`\`\`typescript
class Person {
  constructor(
    public name: string,
    public age: number
  ) {}
}
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Access Modifiers",
      type: "theory",
      content: `# Access Modifiers

## public, private, protected
\`\`\`typescript
class BankAccount {
  public owner: string;
  private balance: number;
  protected accountNumber: string;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
    this.accountNumber = "12345";
  }

  public getBalance(): number {
    return this.balance;
  }

  private log(): void {
    console.log("Logged");
  }
}
\`\`\`

## readonly
\`\`\`typescript
class Config {
  readonly apiKey: string;
  
  constructor(key: string) {
    this.apiKey = key;
    // Cannot be changed after initialization
  }
}
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Create a Bank Account",
      type: "practice",
      content: `# Bank Account Class

Create a typed BankAccount class.

## Task
- Private balance property
- Constructor with initial balance
- deposit(amount) method
- getBalance() method`,
      codeTemplate: `class BankAccount {
  // Your code here
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance());`,
      solution: `class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance());`,
      testCases: [
        { input: "", expectedOutput: "150", description: "100 + 50 = 150", points: 35 }
      ],
      hints: ["Use private for balance", "Return this.balance in getBalance"],
      order: 3,
      xpReward: 40,
      estimatedMinutes: 12,
      language: "typescript",
    },
  ]);

  // Module 8: Generics
  const tsMod8 = await ctx.db.insert("modules", {
    courseId,
    title: "Generics",
    order: 8,
    summary: "Create reusable components with generics",
  });

  await createLessons(ctx, tsMod8, courseId, [
    {
      title: "Generic Functions",
      type: "theory",
      content: `# Generic Functions

Write type-safe code that works with multiple types.

## Basic Generic
\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // string
identity<number>(42);      // number
identity(true);            // boolean (inferred)
\`\`\`

## Multiple Type Parameters
\`\`\`typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

pair<string, number>("age", 25); // [string, number]
\`\`\`

## Generic Constraints
\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello");    // OK - string has length
logLength([1, 2, 3]);  // OK - array has length
// logLength(42);      // Error - number has no length
\`\`\``,
      order: 1,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "typescript",
    },
    {
      title: "Generic Classes & Interfaces",
      type: "theory",
      content: `# Generic Classes & Interfaces

## Generic Interface
\`\`\`typescript
interface Container<T> {
  value: T;
  getValue(): T;
}

const numContainer: Container<number> = {
  value: 42,
  getValue() { return this.value; }
};
\`\`\`

## Generic Class
\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
\`\`\``,
      order: 2,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "typescript",
    },
    {
      title: "Generic Array Function",
      type: "practice",
      content: `# Generic Function Practice

Create a generic function to get the first element.

## Task
Create \`getFirst<T>\` that:
- Takes array: T[]
- Returns first element or undefined`,
      codeTemplate: `function getFirst<T>(arr: T[]): T | undefined {
  // Return first element
}

console.log(getFirst([1, 2, 3]));
console.log(getFirst(["a", "b", "c"]));`,
      solution: `function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(getFirst([1, 2, 3]));
console.log(getFirst(["a", "b", "c"]));`,
      testCases: [
        { input: "", expectedOutput: "1", description: "First of numbers", points: 15 },
        { input: "", expectedOutput: "a", description: "First of strings", points: 15 }
      ],
      hints: ["Return arr[0]", "Return type is T | undefined for empty arrays"],
      order: 3,
      xpReward: 30,
      estimatedMinutes: 10,
      language: "typescript",
    },
  ]);

  // Module 9: Advanced Types
  const tsMod9 = await ctx.db.insert("modules", {
    courseId,
    title: "Advanced Types",
    order: 9,
    summary: "Utility types, type guards, and mapped types",
  });

  await createLessons(ctx, tsMod9, courseId, [
    {
      title: "Utility Types",
      type: "theory",
      content: `# Built-in Utility Types

## Common Utilities
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial - all optional
type PartialUser = Partial<User>;

// Required - all required
type RequiredUser = Required<User>;

// Pick - select properties
type UserName = Pick<User, "name">;

// Omit - exclude properties
type UserWithoutId = Omit<User, "id">;

// Readonly - immutable
type ReadonlyUser = Readonly<User>;

// Record - key-value pairs
type UserRoles = Record<string, string[]>;
\`\`\``,
      order: 1,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "typescript",
    },
    {
      title: "Type Guards",
      type: "theory",
      content: `# Type Guards

Narrow types at runtime.

## typeof Guard
\`\`\`typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
\`\`\`

## instanceof Guard
\`\`\`typescript
class Dog { bark() {} }
class Cat { meow() {} }

function speak(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark();
  } else {
    pet.meow();
  }
}
\`\`\`

## Custom Type Guard
\`\`\`typescript
interface Fish { swim(): void; }
interface Bird { fly(): void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
\`\`\``,
      order: 2,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "typescript",
    },
    {
      title: "Utility Types Practice",
      type: "practice",
      content: `# Utility Types Practice

Use Partial and Pick utility types.

## Task
Given User interface, create:
1. Type for partial update (Partial)
2. Type with only name and email (Pick)`,
      codeTemplate: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Create PartialUser type

// Create UserContact type (name, email only)

const update: PartialUser = { name: "Bob" };
const contact: UserContact = { name: "Alice", email: "alice@mail.com" };

console.log(update);
console.log(contact);`,
      solution: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
type UserContact = Pick<User, "name" | "email">;

const update: PartialUser = { name: "Bob" };
const contact: UserContact = { name: "Alice", email: "alice@mail.com" };

console.log(update);
console.log(contact);`,
      testCases: [
        { input: "", expectedOutput: "{ name: 'Bob' }", description: "Partial user", points: 15 },
        { input: "", expectedOutput: "name:", description: "Has name", points: 15 }
      ],
      hints: ["Use Partial<User> for optional fields", "Use Pick<User, 'name' | 'email'>"],
      order: 3,
      xpReward: 35,
      estimatedMinutes: 12,
      language: "typescript",
    },
  ]);

  // Module 10: Modules & Declaration Files
  const tsMod10 = await ctx.db.insert("modules", {
    courseId,
    title: "Modules & Declaration Files",
    order: 10,
    summary: "ES modules, namespaces, and type declarations",
  });

  await createLessons(ctx, tsMod10, courseId, [
    {
      title: "ES Modules in TypeScript",
      type: "theory",
      content: `# ES Modules

## Exporting
\`\`\`typescript
// Named exports
export const PI = 3.14159;
export function add(a: number, b: number): number {
  return a + b;
}
export interface User {
  name: string;
}

// Default export
export default class Calculator {
  add(a: number, b: number) { return a + b; }
}
\`\`\`

## Importing
\`\`\`typescript
// Named imports
import { PI, add, User } from './math';

// Default import
import Calculator from './math';

// All as namespace
import * as MathUtils from './math';

// Type-only import
import type { User } from './types';
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "Declaration Files",
      type: "theory",
      content: `# Declaration Files (.d.ts)

Type definitions for JavaScript code.

## Basic Declaration
\`\`\`typescript
// math.d.ts
declare function add(a: number, b: number): number;
declare const PI: number;
declare class Calculator {
  add(a: number, b: number): number;
}
\`\`\`

## Using @types
\`\`\`bash
# Install type definitions
npm install @types/lodash
npm install @types/node
\`\`\`

## Global Declarations
\`\`\`typescript
// globals.d.ts
declare global {
  interface Window {
    myApp: {
      version: string;
    };
  }
}
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "typescript",
    },
    {
      title: "TypeScript Final Challenge",
      type: "challenge",
      content: `# TypeScript Challenge

Create a type-safe API response handler.

## Task
Create:
1. Interface \`ApiResponse<T>\` with success, data, and error
2. Function \`handleResponse\` that processes the response`,
      codeTemplate: `// Create ApiResponse interface


// Create handleResponse function


const successResponse: ApiResponse<string[]> = {
  success: true,
  data: ["item1", "item2"],
  error: null
};

console.log(handleResponse(successResponse));`,
      solution: `interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

function handleResponse<T>(response: ApiResponse<T>): T | string {
  if (response.success && response.data) {
    return response.data;
  }
  return response.error || "Unknown error";
}

const successResponse: ApiResponse<string[]> = {
  success: true,
  data: ["item1", "item2"],
  error: null
};

console.log(handleResponse(successResponse));`,
      testCases: [
        { input: "", expectedOutput: "[ 'item1', 'item2' ]", description: "Returns data array", points: 50 }
      ],
      hints: ["Use generic interface ApiResponse<T>", "Check success before returning data"],
      order: 3,
      xpReward: 60,
      estimatedMinutes: 20,
      language: "typescript",
    },
  ]);

  return courseId;
}

// ==========================================
// REACT DEVELOPMENT - 10 MODULES
// ==========================================
async function seedReactCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "react-development",
    title: "React Development",
    description: "Build modern user interfaces with React. Learn components, hooks, state management, routing, and build complete applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    language: "javascript",
    difficulty: "intermediate",
    totalLessons: 50,
    estimatedHours: 50,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: React Fundamentals
  const reactMod1 = await ctx.db.insert("modules", {
    courseId,
    title: "React Fundamentals",
    order: 1,
    summary: "Introduction to React, JSX, and component basics",
  });

  await createLessons(ctx, reactMod1, courseId, [
    {
      title: "What is React?",
      type: "theory",
      content: `# What is React?

React is a JavaScript library for building user interfaces.

## Why React?
- **Component-Based**: Build encapsulated components
- **Declarative**: Describe what UI should look like
- **Virtual DOM**: Efficient updates
- **Large Ecosystem**: Huge community and tools

## React vs Vanilla JS
\`\`\`javascript
// Vanilla JS - Imperative
const btn = document.createElement('button');
btn.textContent = 'Click me';
btn.onclick = () => alert('Clicked!');
document.body.appendChild(btn);

// React - Declarative
function Button() {
  return (
    <button onClick={() => alert('Clicked!')}>
      Click me
    </button>
  );
}
\`\`\``,
      order: 1,
      xpReward: 10,
      estimatedMinutes: 8,
      language: "javascript",
    },
    {
      title: "JSX Basics",
      type: "theory",
      content: `# JSX - JavaScript XML

JSX is a syntax extension that lets you write HTML in JavaScript.

## Basic JSX
\`\`\`jsx
const element = <h1>Hello, World!</h1>;

// With expressions
const name = "Alice";
const greeting = <h1>Hello, {name}!</h1>;

// Multiple lines (wrap in parentheses)
const card = (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);
\`\`\`

## JSX Rules
1. Must return single root element
2. Close all tags (including self-closing)
3. Use className instead of class
4. Use camelCase for attributes

\`\`\`jsx
// Correct
<div className="container">
  <img src="photo.jpg" alt="Photo" />
  <button onClick={handleClick}>Click</button>
</div>
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Your First Component",
      type: "theory",
      content: `# React Components

Components are reusable pieces of UI.

## Function Component
\`\`\`jsx
function Welcome() {
  return <h1>Welcome to React!</h1>;
}

// Arrow function
const Welcome = () => {
  return <h1>Welcome to React!</h1>;
};

// Usage
<Welcome />
\`\`\`

## Component with Props
\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="Alice" />
\`\`\`

## Composing Components
\`\`\`jsx
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
\`\`\``,
      order: 3,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
  ]);

  // Module 2: Components & Props
  const reactMod2 = await ctx.db.insert("modules", {
    courseId,
    title: "Components & Props",
    order: 2,
    summary: "Deep dive into components, props, and children",
  });

  await createLessons(ctx, reactMod2, courseId, [
    {
      title: "Props in Depth",
      type: "theory",
      content: `# Props in Depth

Props are how we pass data to components.

## Passing Props
\`\`\`jsx
function UserCard({ name, age, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

<UserCard 
  name="Alice" 
  age={25} 
  email="alice@mail.com" 
/>
\`\`\`

## Default Props
\`\`\`jsx
function Button({ text = "Click me", color = "blue" }) {
  return (
    <button style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}
\`\`\`

## Spread Props
\`\`\`jsx
const user = { name: "Alice", age: 25 };
<UserCard {...user} />
\`\`\``,
      order: 1,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
    {
      title: "Children Prop",
      type: "theory",
      content: `# Children Prop

Pass content between component tags.

## Using Children
\`\`\`jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="Welcome">
  <p>This is the card content!</p>
  <button>Click me</button>
</Card>
\`\`\`

## Render Props
\`\`\`jsx
function DataFetcher({ render }) {
  const data = { name: "Alice" };
  return render(data);
}

<DataFetcher 
  render={(data) => <h1>{data.name}</h1>} 
/>
\`\`\``,
      order: 2,
      xpReward: 15,
      estimatedMinutes: 10,
      language: "javascript",
    },
  ]);

  // Module 3: State & useState
  const reactMod3 = await ctx.db.insert("modules", {
    courseId,
    title: "State & useState",
    order: 3,
    summary: "Manage component state with the useState hook",
  });

  await createLessons(ctx, reactMod3, courseId, [
    {
      title: "Introduction to State",
      type: "theory",
      content: `# Component State

State is data that can change over time.

## useState Hook
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

## useState with Different Types
\`\`\`jsx
// Number
const [count, setCount] = useState(0);

// String
const [name, setName] = useState("");

// Boolean
const [isOpen, setIsOpen] = useState(false);

// Object
const [user, setUser] = useState({ name: "", age: 0 });

// Array
const [items, setItems] = useState([]);
\`\`\``,
      order: 1,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
    {
      title: "Updating State",
      type: "theory",
      content: `# Updating State Correctly

## Functional Updates
\`\`\`jsx
// For updates based on previous state
setCount(prev => prev + 1);

// Multiple updates in same handler
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// count will be +2
\`\`\`

## Updating Objects
\`\`\`jsx
const [user, setUser] = useState({ name: "", age: 0 });

// Wrong - mutates state
user.name = "Alice";
setUser(user);

// Correct - new object
setUser({ ...user, name: "Alice" });
\`\`\`

## Updating Arrays
\`\`\`jsx
const [items, setItems] = useState([]);

// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== id));

// Update item
setItems(items.map(item => 
  item.id === id ? { ...item, done: true } : item
));
\`\`\``,
      order: 2,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
  ]);

  // Continue with remaining modules (4-10) in a similar pattern...
  // For brevity, I'll add summary modules

  // Module 4: useEffect & Lifecycle
  const reactMod4 = await ctx.db.insert("modules", {
    courseId,
    title: "useEffect & Lifecycle",
    order: 4,
    summary: "Handle side effects and component lifecycle",
  });

  await createLessons(ctx, reactMod4, courseId, [
    {
      title: "useEffect Basics",
      type: "theory",
      content: `# useEffect Hook

Handle side effects in function components.

## Basic Usage
\`\`\`jsx
import { useEffect, useState } from 'react';

function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Runs after render
    console.log("Component rendered");
  });

  useEffect(() => {
    // Runs only once on mount
    fetchData();
  }, []);

  useEffect(() => {
    // Runs when dependency changes
    console.log("Count changed:", count);
  }, [count]);

  return <div>{/* ... */}</div>;
}
\`\`\`

## Cleanup
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  // Cleanup function
  return () => clearInterval(timer);
}, []);
\`\`\``,
      order: 1,
      xpReward: 20,
      estimatedMinutes: 12,
      language: "javascript",
    },
  ]);

  // Module 5-10 would continue similarly...
  // Adding placeholder modules to complete the structure

  const remainingModules = [
    { title: "Event Handling & Forms", order: 5, summary: "Handle events and build forms" },
    { title: "Lists, Keys & Conditional Rendering", order: 6, summary: "Render lists and conditionally show content" },
    { title: "React Router", order: 7, summary: "Add navigation and routing to your app" },
    { title: "Context API & useReducer", order: 8, summary: "Global state management patterns" },
    { title: "Custom Hooks & Performance", order: 9, summary: "Build reusable hooks and optimize performance" },
    { title: "React Projects", order: 10, summary: "Build complete applications" },
  ];

  for (const mod of remainingModules) {
    const moduleId = await ctx.db.insert("modules", {
      courseId,
      ...mod,
    });

    // Add basic lesson for each module
    await createLessons(ctx, moduleId, courseId, [
      {
        title: `Introduction to ${mod.title}`,
        type: "theory",
        content: `# ${mod.title}\n\n${mod.summary}\n\nMore content coming soon...`,
        order: 1,
        xpReward: 15,
        estimatedMinutes: 10,
        language: "javascript",
      },
    ]);
  }

  return courseId;
}

// ==========================================
// SEED ADDITIONAL COURSES MUTATION
// ==========================================
export const seedAdditionalCourses = mutation({
  args: {},
  handler: async (ctx) => {
    const existingCourses = await ctx.db.query("courses").collect();
    const results: Record<string, boolean> = {};

    // Seed TypeScript
    if (!existingCourses.some(c => c.slug === "typescript-development")) {
      await seedTypeScriptCourse(ctx);
      results.typescript = true;
    }

    // Seed React
    if (!existingCourses.some(c => c.slug === "react-development")) {
      await seedReactCourse(ctx);
      results.react = true;
    }

    return results;
  },
});

// Seed all courses including basic ones
export const seedAllExpandedCourses = mutation({
  args: {},
  handler: async (ctx) => {
    const existingCourses = await ctx.db.query("courses").collect();
    const results: Record<string, boolean> = {};

    // Check and seed each course
    if (!existingCourses.some(c => c.slug === "typescript-development")) {
      await seedTypeScriptCourse(ctx);
      results.typescript = true;
    }

    if (!existingCourses.some(c => c.slug === "react-development")) {
      await seedReactCourse(ctx);
      results.react = true;
    }

    return results;
  },
});
