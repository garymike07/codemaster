import { mutation } from "./_generated/server";

// Course definitions with comprehensive curriculum
const COURSES = {
  // ============ TIER 1: PROGRAMMING LANGUAGES ============
  languages: [
    {
      slug: "python-fundamentals",
      title: "Python Fundamentals",
      description: "Master Python from basics to advanced concepts. Learn variables, data types, control flow, functions, OOP, and file handling.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      language: "python",
      difficulty: "beginner" as const,
      estimatedHours: 40,
      modules: [
        {
          title: "Getting Started with Python",
          lessons: [
            { title: "Introduction to Python", type: "theory" as const, xp: 15 },
            { title: "Setting Up Your Environment", type: "theory" as const, xp: 15 },
            { title: "Your First Python Program", type: "practice" as const, xp: 30 },
            { title: "Variables and Data Types", type: "theory" as const, xp: 15 },
            { title: "Working with Numbers", type: "practice" as const, xp: 30 },
            { title: "String Operations", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Control Flow",
          lessons: [
            { title: "If Statements", type: "theory" as const, xp: 15 },
            { title: "Comparison Operators", type: "practice" as const, xp: 30 },
            { title: "Logical Operators", type: "practice" as const, xp: 30 },
            { title: "For Loops", type: "theory" as const, xp: 15 },
            { title: "While Loops", type: "practice" as const, xp: 30 },
            { title: "FizzBuzz Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Functions",
          lessons: [
            { title: "Defining Functions", type: "theory" as const, xp: 15 },
            { title: "Parameters and Arguments", type: "practice" as const, xp: 30 },
            { title: "Return Values", type: "practice" as const, xp: 30 },
            { title: "Lambda Functions", type: "theory" as const, xp: 15 },
            { title: "Calculator Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Data Structures",
          lessons: [
            { title: "Lists", type: "theory" as const, xp: 15 },
            { title: "List Methods", type: "practice" as const, xp: 30 },
            { title: "Tuples", type: "theory" as const, xp: 15 },
            { title: "Dictionaries", type: "practice" as const, xp: 30 },
            { title: "Sets", type: "practice" as const, xp: 30 },
            { title: "Data Structure Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Object-Oriented Programming",
          lessons: [
            { title: "Classes and Objects", type: "theory" as const, xp: 15 },
            { title: "Creating Your First Class", type: "practice" as const, xp: 30 },
            { title: "Inheritance", type: "theory" as const, xp: 15 },
            { title: "Polymorphism", type: "practice" as const, xp: 30 },
            { title: "Encapsulation", type: "practice" as const, xp: 30 },
            { title: "Build a Bank Account Class", type: "project" as const, xp: 100 },
          ],
        },
        {
          title: "File Handling",
          lessons: [
            { title: "Reading Files", type: "theory" as const, xp: 15 },
            { title: "Writing Files", type: "practice" as const, xp: 30 },
            { title: "Working with JSON", type: "practice" as const, xp: 30 },
            { title: "CSV Processing", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Error Handling",
          lessons: [
            { title: "Try-Except Blocks", type: "theory" as const, xp: 15 },
            { title: "Handling Exceptions", type: "practice" as const, xp: 30 },
            { title: "Custom Exceptions", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Final Project",
          lessons: [
            { title: "Project Requirements", type: "theory" as const, xp: 15 },
            { title: "Build a Todo App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "javascript-mastery",
      title: "JavaScript Mastery",
      description: "Complete JavaScript course covering ES6+, DOM manipulation, async programming, and modern JS patterns.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      language: "javascript",
      difficulty: "beginner" as const,
      estimatedHours: 45,
      modules: [
        {
          title: "JavaScript Basics",
          lessons: [
            { title: "Introduction to JavaScript", type: "theory" as const, xp: 15 },
            { title: "Variables: let, const, var", type: "theory" as const, xp: 15 },
            { title: "Data Types", type: "practice" as const, xp: 30 },
            { title: "Operators", type: "practice" as const, xp: 30 },
            { title: "Type Coercion Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Control Structures",
          lessons: [
            { title: "Conditionals", type: "theory" as const, xp: 15 },
            { title: "Switch Statements", type: "practice" as const, xp: 30 },
            { title: "Loops", type: "practice" as const, xp: 30 },
            { title: "Loop Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Functions Deep Dive",
          lessons: [
            { title: "Function Declarations", type: "theory" as const, xp: 15 },
            { title: "Arrow Functions", type: "practice" as const, xp: 30 },
            { title: "Closures", type: "theory" as const, xp: 15 },
            { title: "Higher-Order Functions", type: "practice" as const, xp: 30 },
            { title: "Callback Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Arrays and Objects",
          lessons: [
            { title: "Array Methods", type: "theory" as const, xp: 15 },
            { title: "Map, Filter, Reduce", type: "practice" as const, xp: 30 },
            { title: "Object Manipulation", type: "practice" as const, xp: 30 },
            { title: "Destructuring", type: "practice" as const, xp: 30 },
            { title: "Spread Operator", type: "practice" as const, xp: 30 },
            { title: "Array Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "DOM Manipulation",
          lessons: [
            { title: "Selecting Elements", type: "theory" as const, xp: 15 },
            { title: "Modifying Elements", type: "practice" as const, xp: 30 },
            { title: "Event Listeners", type: "practice" as const, xp: 30 },
            { title: "Build Interactive UI", type: "project" as const, xp: 100 },
          ],
        },
        {
          title: "Asynchronous JavaScript",
          lessons: [
            { title: "Callbacks", type: "theory" as const, xp: 15 },
            { title: "Promises", type: "practice" as const, xp: 30 },
            { title: "Async/Await", type: "practice" as const, xp: 30 },
            { title: "Fetch API", type: "practice" as const, xp: 30 },
            { title: "API Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "ES6+ Features",
          lessons: [
            { title: "Template Literals", type: "theory" as const, xp: 15 },
            { title: "Classes", type: "practice" as const, xp: 30 },
            { title: "Modules", type: "practice" as const, xp: 30 },
            { title: "Modern JS Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Final Project",
          lessons: [
            { title: "Build a Weather App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "typescript-essentials",
      title: "TypeScript Essentials",
      description: "Learn TypeScript from scratch. Master types, interfaces, generics, and advanced type patterns.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      language: "typescript",
      difficulty: "intermediate" as const,
      estimatedHours: 30,
      modules: [
        {
          title: "TypeScript Basics",
          lessons: [
            { title: "Why TypeScript?", type: "theory" as const, xp: 15 },
            { title: "Basic Types", type: "practice" as const, xp: 30 },
            { title: "Type Annotations", type: "practice" as const, xp: 30 },
            { title: "Type Inference", type: "theory" as const, xp: 15 },
          ],
        },
        {
          title: "Interfaces and Types",
          lessons: [
            { title: "Interfaces", type: "theory" as const, xp: 15 },
            { title: "Type Aliases", type: "practice" as const, xp: 30 },
            { title: "Union Types", type: "practice" as const, xp: 30 },
            { title: "Intersection Types", type: "practice" as const, xp: 30 },
            { title: "Type Guards", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Generics",
          lessons: [
            { title: "Generic Functions", type: "theory" as const, xp: 15 },
            { title: "Generic Interfaces", type: "practice" as const, xp: 30 },
            { title: "Generic Classes", type: "practice" as const, xp: 30 },
            { title: "Generic Constraints", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Advanced Types",
          lessons: [
            { title: "Utility Types", type: "theory" as const, xp: 15 },
            { title: "Mapped Types", type: "practice" as const, xp: 30 },
            { title: "Conditional Types", type: "practice" as const, xp: 30 },
            { title: "Template Literal Types", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "TypeScript with React",
          lessons: [
            { title: "Typing Components", type: "theory" as const, xp: 15 },
            { title: "Typing Props", type: "practice" as const, xp: 30 },
            { title: "Typing Hooks", type: "practice" as const, xp: 30 },
            { title: "Build Typed Component", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "java-programming",
      title: "Java Programming",
      description: "Comprehensive Java course covering OOP, collections, streams, and enterprise patterns.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      language: "java",
      difficulty: "intermediate" as const,
      estimatedHours: 50,
      modules: [
        {
          title: "Java Fundamentals",
          lessons: [
            { title: "Java Ecosystem", type: "theory" as const, xp: 15 },
            { title: "Hello World", type: "practice" as const, xp: 30 },
            { title: "Variables and Types", type: "practice" as const, xp: 30 },
            { title: "Operators", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "OOP in Java",
          lessons: [
            { title: "Classes and Objects", type: "theory" as const, xp: 15 },
            { title: "Constructors", type: "practice" as const, xp: 30 },
            { title: "Inheritance", type: "practice" as const, xp: 30 },
            { title: "Interfaces", type: "practice" as const, xp: 30 },
            { title: "Abstract Classes", type: "practice" as const, xp: 30 },
            { title: "OOP Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Collections Framework",
          lessons: [
            { title: "ArrayList", type: "theory" as const, xp: 15 },
            { title: "LinkedList", type: "practice" as const, xp: 30 },
            { title: "HashMap", type: "practice" as const, xp: 30 },
            { title: "HashSet", type: "practice" as const, xp: 30 },
            { title: "Collections Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Streams API",
          lessons: [
            { title: "Introduction to Streams", type: "theory" as const, xp: 15 },
            { title: "Stream Operations", type: "practice" as const, xp: 30 },
            { title: "Collectors", type: "practice" as const, xp: 30 },
            { title: "Parallel Streams", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Exception Handling",
          lessons: [
            { title: "Try-Catch", type: "theory" as const, xp: 15 },
            { title: "Custom Exceptions", type: "practice" as const, xp: 30 },
            { title: "Best Practices", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Final Project",
          lessons: [
            { title: "Build a Library System", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "csharp-dotnet",
      title: "C# and .NET",
      description: "Master C# programming with .NET. Learn LINQ, async programming, and modern C# features.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      language: "csharp",
      difficulty: "intermediate" as const,
      estimatedHours: 45,
      modules: [
        {
          title: "C# Basics",
          lessons: [
            { title: "Introduction to C#", type: "theory" as const, xp: 15 },
            { title: "Data Types", type: "practice" as const, xp: 30 },
            { title: "Control Flow", type: "practice" as const, xp: 30 },
            { title: "Methods", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "OOP in C#",
          lessons: [
            { title: "Classes", type: "theory" as const, xp: 15 },
            { title: "Properties", type: "practice" as const, xp: 30 },
            { title: "Inheritance", type: "practice" as const, xp: 30 },
            { title: "Interfaces", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "LINQ",
          lessons: [
            { title: "Introduction to LINQ", type: "theory" as const, xp: 15 },
            { title: "Query Syntax", type: "practice" as const, xp: 30 },
            { title: "Method Syntax", type: "practice" as const, xp: 30 },
            { title: "LINQ Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Async Programming",
          lessons: [
            { title: "Async/Await", type: "theory" as const, xp: 15 },
            { title: "Tasks", type: "practice" as const, xp: 30 },
            { title: "Async Patterns", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "cpp-programming",
      title: "C++ Programming",
      description: "Learn C++ from basics to advanced. Master memory management, STL, and templates.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      language: "cpp",
      difficulty: "advanced" as const,
      estimatedHours: 50,
      modules: [
        {
          title: "C++ Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "Variables and Types", type: "practice" as const, xp: 30 },
            { title: "Pointers", type: "theory" as const, xp: 15 },
            { title: "References", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Memory Management",
          lessons: [
            { title: "Stack vs Heap", type: "theory" as const, xp: 15 },
            { title: "new and delete", type: "practice" as const, xp: 30 },
            { title: "Smart Pointers", type: "practice" as const, xp: 30 },
            { title: "Memory Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "STL",
          lessons: [
            { title: "Vectors", type: "theory" as const, xp: 15 },
            { title: "Maps", type: "practice" as const, xp: 30 },
            { title: "Algorithms", type: "practice" as const, xp: 30 },
            { title: "STL Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Templates",
          lessons: [
            { title: "Function Templates", type: "theory" as const, xp: 15 },
            { title: "Class Templates", type: "practice" as const, xp: 30 },
            { title: "Template Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "go-programming",
      title: "Go Programming",
      description: "Learn Go language. Master goroutines, channels, and build concurrent applications.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
      language: "go",
      difficulty: "intermediate" as const,
      estimatedHours: 35,
      modules: [
        {
          title: "Go Basics",
          lessons: [
            { title: "Introduction to Go", type: "theory" as const, xp: 15 },
            { title: "Variables and Types", type: "practice" as const, xp: 30 },
            { title: "Functions", type: "practice" as const, xp: 30 },
            { title: "Packages", type: "theory" as const, xp: 15 },
          ],
        },
        {
          title: "Data Structures",
          lessons: [
            { title: "Slices", type: "theory" as const, xp: 15 },
            { title: "Maps", type: "practice" as const, xp: 30 },
            { title: "Structs", type: "practice" as const, xp: 30 },
            { title: "Data Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Concurrency",
          lessons: [
            { title: "Goroutines", type: "theory" as const, xp: 15 },
            { title: "Channels", type: "practice" as const, xp: 30 },
            { title: "Select Statement", type: "practice" as const, xp: 30 },
            { title: "Concurrency Patterns", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Web Development",
          lessons: [
            { title: "HTTP Server", type: "theory" as const, xp: 15 },
            { title: "REST API", type: "practice" as const, xp: 30 },
            { title: "Build API Server", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "rust-programming",
      title: "Rust Programming",
      description: "Master Rust's ownership system. Learn memory safety without garbage collection.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
      language: "rust",
      difficulty: "advanced" as const,
      estimatedHours: 40,
      modules: [
        {
          title: "Rust Basics",
          lessons: [
            { title: "Introduction to Rust", type: "theory" as const, xp: 15 },
            { title: "Variables and Mutability", type: "practice" as const, xp: 30 },
            { title: "Data Types", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Ownership",
          lessons: [
            { title: "Understanding Ownership", type: "theory" as const, xp: 15 },
            { title: "References and Borrowing", type: "practice" as const, xp: 30 },
            { title: "Slices", type: "practice" as const, xp: 30 },
            { title: "Ownership Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Structs and Enums",
          lessons: [
            { title: "Structs", type: "theory" as const, xp: 15 },
            { title: "Methods", type: "practice" as const, xp: 30 },
            { title: "Enums", type: "practice" as const, xp: 30 },
            { title: "Pattern Matching", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Error Handling",
          lessons: [
            { title: "Result and Option", type: "theory" as const, xp: 15 },
            { title: "Error Propagation", type: "practice" as const, xp: 30 },
            { title: "Custom Errors", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "sql-databases",
      title: "SQL & Databases",
      description: "Master SQL queries, database design, and optimization techniques.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      language: "sql",
      difficulty: "beginner" as const,
      estimatedHours: 30,
      modules: [
        {
          title: "SQL Basics",
          lessons: [
            { title: "Introduction to Databases", type: "theory" as const, xp: 15 },
            { title: "SELECT Queries", type: "practice" as const, xp: 30 },
            { title: "WHERE Clause", type: "practice" as const, xp: 30 },
            { title: "ORDER BY", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Data Manipulation",
          lessons: [
            { title: "INSERT", type: "theory" as const, xp: 15 },
            { title: "UPDATE", type: "practice" as const, xp: 30 },
            { title: "DELETE", type: "practice" as const, xp: 30 },
            { title: "DML Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Joins",
          lessons: [
            { title: "INNER JOIN", type: "theory" as const, xp: 15 },
            { title: "LEFT/RIGHT JOIN", type: "practice" as const, xp: 30 },
            { title: "Multiple Joins", type: "practice" as const, xp: 30 },
            { title: "Join Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Advanced SQL",
          lessons: [
            { title: "Subqueries", type: "theory" as const, xp: 15 },
            { title: "Aggregations", type: "practice" as const, xp: 30 },
            { title: "Window Functions", type: "practice" as const, xp: 30 },
            { title: "Database Design Project", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "html-css-fundamentals",
      title: "HTML & CSS Fundamentals",
      description: "Build beautiful, responsive websites. Master semantic HTML and modern CSS.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      language: "html",
      difficulty: "beginner" as const,
      estimatedHours: 25,
      modules: [
        {
          title: "HTML Basics",
          lessons: [
            { title: "HTML Structure", type: "theory" as const, xp: 15 },
            { title: "Text Elements", type: "practice" as const, xp: 30 },
            { title: "Links and Images", type: "practice" as const, xp: 30 },
            { title: "Forms", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "CSS Basics",
          lessons: [
            { title: "Selectors", type: "theory" as const, xp: 15 },
            { title: "Box Model", type: "practice" as const, xp: 30 },
            { title: "Colors and Typography", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Flexbox",
          lessons: [
            { title: "Flex Container", type: "theory" as const, xp: 15 },
            { title: "Flex Items", type: "practice" as const, xp: 30 },
            { title: "Flexbox Layout", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "CSS Grid",
          lessons: [
            { title: "Grid Basics", type: "theory" as const, xp: 15 },
            { title: "Grid Template", type: "practice" as const, xp: 30 },
            { title: "Build Responsive Layout", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "kotlin-android",
      title: "Kotlin for Android",
      description: "Learn Kotlin programming and Android app development fundamentals.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      language: "kotlin",
      difficulty: "intermediate" as const,
      estimatedHours: 40,
      modules: [
        {
          title: "Kotlin Basics",
          lessons: [
            { title: "Kotlin Introduction", type: "theory" as const, xp: 15 },
            { title: "Variables and Types", type: "practice" as const, xp: 30 },
            { title: "Functions", type: "practice" as const, xp: 30 },
            { title: "Null Safety", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "OOP in Kotlin",
          lessons: [
            { title: "Classes", type: "theory" as const, xp: 15 },
            { title: "Data Classes", type: "practice" as const, xp: 30 },
            { title: "Sealed Classes", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Coroutines",
          lessons: [
            { title: "Introduction to Coroutines", type: "theory" as const, xp: 15 },
            { title: "Suspend Functions", type: "practice" as const, xp: 30 },
            { title: "Flows", type: "practice" as const, xp: 30 },
            { title: "Coroutine Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "swift-ios",
      title: "Swift for iOS",
      description: "Master Swift programming and build iOS apps with SwiftUI.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
      language: "swift",
      difficulty: "intermediate" as const,
      estimatedHours: 40,
      modules: [
        {
          title: "Swift Basics",
          lessons: [
            { title: "Introduction to Swift", type: "theory" as const, xp: 15 },
            { title: "Variables and Constants", type: "practice" as const, xp: 30 },
            { title: "Optionals", type: "practice" as const, xp: 30 },
            { title: "Collections", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Swift OOP",
          lessons: [
            { title: "Classes and Structs", type: "theory" as const, xp: 15 },
            { title: "Protocols", type: "practice" as const, xp: 30 },
            { title: "Extensions", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "SwiftUI Basics",
          lessons: [
            { title: "Views", type: "theory" as const, xp: 15 },
            { title: "State Management", type: "practice" as const, xp: 30 },
            { title: "Build Simple App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "ruby-programming",
      title: "Ruby Programming",
      description: "Learn Ruby programming language and its elegant syntax.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
      language: "ruby",
      difficulty: "beginner" as const,
      estimatedHours: 30,
      modules: [
        {
          title: "Ruby Basics",
          lessons: [
            { title: "Introduction to Ruby", type: "theory" as const, xp: 15 },
            { title: "Variables and Types", type: "practice" as const, xp: 30 },
            { title: "Methods", type: "practice" as const, xp: 30 },
            { title: "Blocks", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "OOP in Ruby",
          lessons: [
            { title: "Classes", type: "theory" as const, xp: 15 },
            { title: "Modules", type: "practice" as const, xp: 30 },
            { title: "Metaprogramming Basics", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "php-programming",
      title: "PHP Programming",
      description: "Learn PHP for web development. Master the language behind WordPress and Laravel.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      language: "php",
      difficulty: "beginner" as const,
      estimatedHours: 30,
      modules: [
        {
          title: "PHP Basics",
          lessons: [
            { title: "Introduction to PHP", type: "theory" as const, xp: 15 },
            { title: "Variables and Types", type: "practice" as const, xp: 30 },
            { title: "Control Structures", type: "practice" as const, xp: 30 },
            { title: "Functions", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "PHP OOP",
          lessons: [
            { title: "Classes", type: "theory" as const, xp: 15 },
            { title: "Namespaces", type: "practice" as const, xp: 30 },
            { title: "Traits", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Web Development",
          lessons: [
            { title: "Forms Processing", type: "theory" as const, xp: 15 },
            { title: "Database Connections", type: "practice" as const, xp: 30 },
            { title: "Build Contact Form", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
  ],

  // ============ TIER 2: FRAMEWORKS ============
  frameworks: [
    {
      slug: "react-development",
      title: "React Development",
      description: "Build modern web applications with React. Master hooks, state management, and component patterns.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      language: "javascript",
      difficulty: "intermediate" as const,
      estimatedHours: 45,
      modules: [
        {
          title: "React Fundamentals",
          lessons: [
            { title: "Introduction to React", type: "theory" as const, xp: 15 },
            { title: "JSX", type: "practice" as const, xp: 30 },
            { title: "Components", type: "practice" as const, xp: 30 },
            { title: "Props", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Hooks",
          lessons: [
            { title: "useState", type: "theory" as const, xp: 15 },
            { title: "useEffect", type: "practice" as const, xp: 30 },
            { title: "useContext", type: "practice" as const, xp: 30 },
            { title: "Custom Hooks", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "State Management",
          lessons: [
            { title: "Lifting State", type: "theory" as const, xp: 15 },
            { title: "Context API", type: "practice" as const, xp: 30 },
            { title: "useReducer", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Final Project",
          lessons: [
            { title: "Build Task Manager", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "vue-js",
      title: "Vue.js Development",
      description: "Learn Vue.js framework. Build reactive interfaces with the progressive framework.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      language: "javascript",
      difficulty: "intermediate" as const,
      estimatedHours: 35,
      modules: [
        {
          title: "Vue Basics",
          lessons: [
            { title: "Introduction to Vue", type: "theory" as const, xp: 15 },
            { title: "Template Syntax", type: "practice" as const, xp: 30 },
            { title: "Directives", type: "practice" as const, xp: 30 },
            { title: "Components", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Composition API",
          lessons: [
            { title: "setup() Function", type: "theory" as const, xp: 15 },
            { title: "ref and reactive", type: "practice" as const, xp: 30 },
            { title: "Computed Properties", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Vue Router",
          lessons: [
            { title: "Routing Basics", type: "theory" as const, xp: 15 },
            { title: "Dynamic Routes", type: "practice" as const, xp: 30 },
            { title: "Navigation Guards", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "angular-framework",
      title: "Angular Framework",
      description: "Master Angular for enterprise applications. Learn TypeScript, RxJS, and NgModules.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      language: "typescript",
      difficulty: "advanced" as const,
      estimatedHours: 50,
      modules: [
        {
          title: "Angular Basics",
          lessons: [
            { title: "Introduction to Angular", type: "theory" as const, xp: 15 },
            { title: "Components", type: "practice" as const, xp: 30 },
            { title: "Templates", type: "practice" as const, xp: 30 },
            { title: "Data Binding", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Services and DI",
          lessons: [
            { title: "Services", type: "theory" as const, xp: 15 },
            { title: "Dependency Injection", type: "practice" as const, xp: 30 },
            { title: "HTTP Client", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "RxJS",
          lessons: [
            { title: "Observables", type: "theory" as const, xp: 15 },
            { title: "Operators", type: "practice" as const, xp: 30 },
            { title: "RxJS Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "nextjs-development",
      title: "Next.js Development",
      description: "Build full-stack React applications with Next.js. Master SSR, SSG, and API routes.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      language: "typescript",
      difficulty: "intermediate" as const,
      estimatedHours: 35,
      modules: [
        {
          title: "Next.js Basics",
          lessons: [
            { title: "Introduction to Next.js", type: "theory" as const, xp: 15 },
            { title: "Pages and Routing", type: "practice" as const, xp: 30 },
            { title: "Data Fetching", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Rendering",
          lessons: [
            { title: "SSR vs SSG", type: "theory" as const, xp: 15 },
            { title: "getServerSideProps", type: "practice" as const, xp: 30 },
            { title: "getStaticProps", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "API Routes",
          lessons: [
            { title: "Creating APIs", type: "theory" as const, xp: 15 },
            { title: "Database Integration", type: "practice" as const, xp: 30 },
            { title: "Build Full-Stack App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "nodejs-express",
      title: "Node.js & Express",
      description: "Build server-side applications with Node.js and Express framework.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      language: "javascript",
      difficulty: "intermediate" as const,
      estimatedHours: 40,
      modules: [
        {
          title: "Node.js Basics",
          lessons: [
            { title: "Introduction to Node.js", type: "theory" as const, xp: 15 },
            { title: "Modules", type: "practice" as const, xp: 30 },
            { title: "File System", type: "practice" as const, xp: 30 },
            { title: "Event Loop", type: "theory" as const, xp: 15 },
          ],
        },
        {
          title: "Express Framework",
          lessons: [
            { title: "Express Basics", type: "theory" as const, xp: 15 },
            { title: "Routing", type: "practice" as const, xp: 30 },
            { title: "Middleware", type: "practice" as const, xp: 30 },
            { title: "Error Handling", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "REST API",
          lessons: [
            { title: "RESTful Design", type: "theory" as const, xp: 15 },
            { title: "CRUD Operations", type: "practice" as const, xp: 30 },
            { title: "Authentication", type: "practice" as const, xp: 30 },
            { title: "Build REST API", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "django-python",
      title: "Django Web Framework",
      description: "Build web applications with Django. Master MTV architecture and Django ORM.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      language: "python",
      difficulty: "intermediate" as const,
      estimatedHours: 45,
      modules: [
        {
          title: "Django Basics",
          lessons: [
            { title: "Introduction to Django", type: "theory" as const, xp: 15 },
            { title: "Project Setup", type: "practice" as const, xp: 30 },
            { title: "Views and URLs", type: "practice" as const, xp: 30 },
            { title: "Templates", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Models and ORM",
          lessons: [
            { title: "Django ORM", type: "theory" as const, xp: 15 },
            { title: "Creating Models", type: "practice" as const, xp: 30 },
            { title: "QuerySets", type: "practice" as const, xp: 30 },
            { title: "Relationships", type: "challenge" as const, xp: 50 },
          ],
        },
        {
          title: "Forms and Authentication",
          lessons: [
            { title: "Django Forms", type: "theory" as const, xp: 15 },
            { title: "User Authentication", type: "practice" as const, xp: 30 },
            { title: "Build Blog App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "flask-python",
      title: "Flask Web Framework",
      description: "Build lightweight web applications with Flask microframework.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      language: "python",
      difficulty: "beginner" as const,
      estimatedHours: 25,
      modules: [
        {
          title: "Flask Basics",
          lessons: [
            { title: "Introduction to Flask", type: "theory" as const, xp: 15 },
            { title: "Routes", type: "practice" as const, xp: 30 },
            { title: "Templates", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Flask Extensions",
          lessons: [
            { title: "Flask-SQLAlchemy", type: "theory" as const, xp: 15 },
            { title: "Flask-Login", type: "practice" as const, xp: 30 },
            { title: "Build API", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "fastapi-python",
      title: "FastAPI Development",
      description: "Build high-performance APIs with FastAPI. Master async Python and automatic docs.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      language: "python",
      difficulty: "intermediate" as const,
      estimatedHours: 30,
      modules: [
        {
          title: "FastAPI Basics",
          lessons: [
            { title: "Introduction to FastAPI", type: "theory" as const, xp: 15 },
            { title: "Path Operations", type: "practice" as const, xp: 30 },
            { title: "Request Body", type: "practice" as const, xp: 30 },
            { title: "Validation", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Advanced Features",
          lessons: [
            { title: "Dependency Injection", type: "theory" as const, xp: 15 },
            { title: "Database Integration", type: "practice" as const, xp: 30 },
            { title: "Authentication", type: "practice" as const, xp: 30 },
            { title: "Build Production API", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "react-native",
      title: "React Native Mobile",
      description: "Build cross-platform mobile apps with React Native.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      language: "javascript",
      difficulty: "intermediate" as const,
      estimatedHours: 40,
      modules: [
        {
          title: "React Native Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "Core Components", type: "practice" as const, xp: 30 },
            { title: "Styling", type: "practice" as const, xp: 30 },
            { title: "Navigation", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Advanced Topics",
          lessons: [
            { title: "State Management", type: "theory" as const, xp: 15 },
            { title: "Native Modules", type: "practice" as const, xp: 30 },
            { title: "Build Mobile App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "flutter-development",
      title: "Flutter Development",
      description: "Build beautiful cross-platform apps with Flutter and Dart.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      language: "dart",
      difficulty: "intermediate" as const,
      estimatedHours: 40,
      modules: [
        {
          title: "Flutter Basics",
          lessons: [
            { title: "Introduction to Flutter", type: "theory" as const, xp: 15 },
            { title: "Widgets", type: "practice" as const, xp: 30 },
            { title: "Layouts", type: "practice" as const, xp: 30 },
            { title: "State Management", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Advanced Flutter",
          lessons: [
            { title: "Navigation", type: "theory" as const, xp: 15 },
            { title: "HTTP Requests", type: "practice" as const, xp: 30 },
            { title: "Build Flutter App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "spring-boot",
      title: "Spring Boot",
      description: "Build enterprise Java applications with Spring Boot framework.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      language: "java",
      difficulty: "advanced" as const,
      estimatedHours: 45,
      modules: [
        {
          title: "Spring Boot Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "Project Setup", type: "practice" as const, xp: 30 },
            { title: "Controllers", type: "practice" as const, xp: 30 },
            { title: "Services", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Data Access",
          lessons: [
            { title: "Spring Data JPA", type: "theory" as const, xp: 15 },
            { title: "Repositories", type: "practice" as const, xp: 30 },
            { title: "Transactions", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Security",
          lessons: [
            { title: "Spring Security", type: "theory" as const, xp: 15 },
            { title: "JWT Authentication", type: "practice" as const, xp: 30 },
            { title: "Build Enterprise API", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "tailwind-css",
      title: "Tailwind CSS",
      description: "Master utility-first CSS with Tailwind. Build modern, responsive designs.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      language: "css",
      difficulty: "beginner" as const,
      estimatedHours: 20,
      modules: [
        {
          title: "Tailwind Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "Utility Classes", type: "practice" as const, xp: 30 },
            { title: "Responsive Design", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Components",
          lessons: [
            { title: "Building Components", type: "theory" as const, xp: 15 },
            { title: "Customization", type: "practice" as const, xp: 30 },
            { title: "Build Landing Page", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
  ],

  // ============ TIER 3: TECHNOLOGIES & TOOLS ============
  technologies: [
    {
      slug: "docker-containers",
      title: "Docker & Containers",
      description: "Master containerization with Docker. Build, ship, and run applications anywhere.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      language: "bash",
      difficulty: "intermediate" as const,
      estimatedHours: 30,
      modules: [
        {
          title: "Docker Basics",
          lessons: [
            { title: "What is Docker?", type: "theory" as const, xp: 15 },
            { title: "Docker Images", type: "practice" as const, xp: 30 },
            { title: "Containers", type: "practice" as const, xp: 30 },
            { title: "Dockerfile", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Docker Compose",
          lessons: [
            { title: "Multi-Container Apps", type: "theory" as const, xp: 15 },
            { title: "docker-compose.yml", type: "practice" as const, xp: 30 },
            { title: "Networking", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Production",
          lessons: [
            { title: "Best Practices", type: "theory" as const, xp: 15 },
            { title: "Containerize App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "kubernetes",
      title: "Kubernetes",
      description: "Orchestrate containers at scale with Kubernetes.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      language: "yaml",
      difficulty: "advanced" as const,
      estimatedHours: 40,
      modules: [
        {
          title: "Kubernetes Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "Pods", type: "practice" as const, xp: 30 },
            { title: "Deployments", type: "practice" as const, xp: 30 },
            { title: "Services", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Advanced K8s",
          lessons: [
            { title: "ConfigMaps & Secrets", type: "theory" as const, xp: 15 },
            { title: "Ingress", type: "practice" as const, xp: 30 },
            { title: "Deploy Application", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "git-version-control",
      title: "Git Version Control",
      description: "Master Git for version control. Learn branching, merging, and collaboration.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      language: "bash",
      difficulty: "beginner" as const,
      estimatedHours: 15,
      modules: [
        {
          title: "Git Basics",
          lessons: [
            { title: "Introduction to Git", type: "theory" as const, xp: 15 },
            { title: "Basic Commands", type: "practice" as const, xp: 30 },
            { title: "Branching", type: "practice" as const, xp: 30 },
            { title: "Merging", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Collaboration",
          lessons: [
            { title: "GitHub", type: "theory" as const, xp: 15 },
            { title: "Pull Requests", type: "practice" as const, xp: 30 },
            { title: "Git Workflow Challenge", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "aws-fundamentals",
      title: "AWS Fundamentals",
      description: "Learn Amazon Web Services basics. Master EC2, S3, Lambda, and more.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      language: "bash",
      difficulty: "intermediate" as const,
      estimatedHours: 35,
      modules: [
        {
          title: "AWS Basics",
          lessons: [
            { title: "Introduction to AWS", type: "theory" as const, xp: 15 },
            { title: "IAM", type: "practice" as const, xp: 30 },
            { title: "EC2", type: "practice" as const, xp: 30 },
            { title: "S3", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Serverless",
          lessons: [
            { title: "Lambda", type: "theory" as const, xp: 15 },
            { title: "API Gateway", type: "practice" as const, xp: 30 },
            { title: "Deploy Serverless App", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "mongodb",
      title: "MongoDB",
      description: "Master NoSQL database with MongoDB. Learn CRUD, aggregation, and indexing.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      language: "javascript",
      difficulty: "intermediate" as const,
      estimatedHours: 25,
      modules: [
        {
          title: "MongoDB Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "CRUD Operations", type: "practice" as const, xp: 30 },
            { title: "Queries", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Advanced MongoDB",
          lessons: [
            { title: "Aggregation", type: "theory" as const, xp: 15 },
            { title: "Indexing", type: "practice" as const, xp: 30 },
            { title: "Data Modeling", type: "challenge" as const, xp: 50 },
          ],
        },
      ],
    },
    {
      slug: "graphql-api",
      title: "GraphQL API",
      description: "Build flexible APIs with GraphQL. Master schemas, queries, and mutations.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      language: "javascript",
      difficulty: "intermediate" as const,
      estimatedHours: 25,
      modules: [
        {
          title: "GraphQL Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "Schemas", type: "practice" as const, xp: 30 },
            { title: "Queries", type: "practice" as const, xp: 30 },
            { title: "Mutations", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Advanced GraphQL",
          lessons: [
            { title: "Resolvers", type: "theory" as const, xp: 15 },
            { title: "Apollo Server", type: "practice" as const, xp: 30 },
            { title: "Build GraphQL API", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "redis-caching",
      title: "Redis & Caching",
      description: "Learn Redis for caching and real-time data. Master data structures and pub/sub.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      language: "bash",
      difficulty: "intermediate" as const,
      estimatedHours: 20,
      modules: [
        {
          title: "Redis Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "Data Types", type: "practice" as const, xp: 30 },
            { title: "Caching Strategies", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Advanced Redis",
          lessons: [
            { title: "Pub/Sub", type: "theory" as const, xp: 15 },
            { title: "Sessions", type: "practice" as const, xp: 30 },
            { title: "Implement Caching", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "cicd-github-actions",
      title: "CI/CD with GitHub Actions",
      description: "Automate your workflow with GitHub Actions. Build CI/CD pipelines.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      language: "yaml",
      difficulty: "intermediate" as const,
      estimatedHours: 20,
      modules: [
        {
          title: "GitHub Actions Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "Workflows", type: "practice" as const, xp: 30 },
            { title: "Jobs and Steps", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "CI/CD Pipelines",
          lessons: [
            { title: "Testing Pipeline", type: "theory" as const, xp: 15 },
            { title: "Deployment", type: "practice" as const, xp: 30 },
            { title: "Build CI/CD Pipeline", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "tensorflow-ml",
      title: "TensorFlow & Machine Learning",
      description: "Learn machine learning with TensorFlow. Build neural networks and models.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      language: "python",
      difficulty: "advanced" as const,
      estimatedHours: 50,
      modules: [
        {
          title: "ML Basics",
          lessons: [
            { title: "Introduction to ML", type: "theory" as const, xp: 15 },
            { title: "TensorFlow Setup", type: "practice" as const, xp: 30 },
            { title: "Tensors", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Neural Networks",
          lessons: [
            { title: "Perceptrons", type: "theory" as const, xp: 15 },
            { title: "Dense Layers", type: "practice" as const, xp: 30 },
            { title: "Training Models", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Deep Learning",
          lessons: [
            { title: "CNNs", type: "theory" as const, xp: 15 },
            { title: "Image Classification", type: "practice" as const, xp: 30 },
            { title: "Build ML Model", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
    {
      slug: "pandas-data-analysis",
      title: "Pandas Data Analysis",
      description: "Master data analysis with Pandas. Learn DataFrames, cleaning, and visualization.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      language: "python",
      difficulty: "intermediate" as const,
      estimatedHours: 30,
      modules: [
        {
          title: "Pandas Basics",
          lessons: [
            { title: "Introduction", type: "theory" as const, xp: 15 },
            { title: "DataFrames", type: "practice" as const, xp: 30 },
            { title: "Selection", type: "practice" as const, xp: 30 },
            { title: "Filtering", type: "practice" as const, xp: 30 },
          ],
        },
        {
          title: "Data Manipulation",
          lessons: [
            { title: "Cleaning Data", type: "theory" as const, xp: 15 },
            { title: "Grouping", type: "practice" as const, xp: 30 },
            { title: "Merging", type: "practice" as const, xp: 30 },
            { title: "Data Analysis Project", type: "project" as const, xp: 100 },
          ],
        },
      ],
    },
  ],
};

// Generate content for lessons
function generateLessonContent(
  courseTitle: string,
  moduleTitle: string,
  lessonTitle: string,
  type: string,
  language: string
): { content: string; codeTemplate?: string; solution?: string; testCases?: any[]; hints?: string[] } {
  const baseContent = `# ${lessonTitle}\n\n## Module: ${moduleTitle}\n\nIn this ${type} lesson, you will learn about ${lessonTitle.toLowerCase()} as part of the ${courseTitle} course.\n\n`;

  if (type === "theory") {
    return {
      content: baseContent + `### Key Concepts\n\n- Understand the fundamentals of ${lessonTitle.toLowerCase()}\n- Learn best practices and common patterns\n- See real-world examples and use cases\n\n### Summary\n\nThis lesson covers the essential concepts of ${lessonTitle.toLowerCase()}.`,
    };
  }

  if (type === "practice" || type === "challenge" || type === "project") {
    const templates: Record<string, { code: string; solution: string }> = {
      python: {
        code: `# ${lessonTitle}\n# Write your code below\n\ndef solution():\n    # Your code here\n    pass\n\n# Test your solution\nif __name__ == "__main__":\n    result = solution()\n    print(result)`,
        solution: `# ${lessonTitle} - Solution\n\ndef solution():\n    # Example solution\n    return "Solution implemented"\n\nif __name__ == "__main__":\n    result = solution()\n    print(result)`,
      },
      javascript: {
        code: `// ${lessonTitle}\n// Write your code below\n\nfunction solution() {\n  // Your code here\n}\n\n// Test your solution\nconsole.log(solution());`,
        solution: `// ${lessonTitle} - Solution\n\nfunction solution() {\n  // Example solution\n  return "Solution implemented";\n}\n\nconsole.log(solution());`,
      },
      typescript: {
        code: `// ${lessonTitle}\n// Write your code below\n\nfunction solution(): string {\n  // Your code here\n  return "";\n}\n\n// Test your solution\nconsole.log(solution());`,
        solution: `// ${lessonTitle} - Solution\n\nfunction solution(): string {\n  return "Solution implemented";\n}\n\nconsole.log(solution());`,
      },
      java: {
        code: `// ${lessonTitle}\n// Write your code below\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
        solution: `// ${lessonTitle} - Solution\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("Solution implemented");\n    }\n}`,
      },
    };

    const template = templates[language] || templates.python;

    return {
      content: baseContent + `### Instructions\n\nComplete the function to solve the problem.\n\n### Requirements\n\n1. Read the problem carefully\n2. Write clean, efficient code\n3. Test your solution with the provided test cases`,
      codeTemplate: template.code,
      solution: template.solution,
      testCases: [
        { input: "test1", expectedOutput: "expected1", description: "Test case 1", points: 25 },
        { input: "test2", expectedOutput: "expected2", description: "Test case 2", points: 25 },
        { input: "test3", expectedOutput: "expected3", description: "Test case 3", isHidden: true, points: 50 },
      ],
      hints: [
        `Think about the basic approach for ${lessonTitle.toLowerCase()}`,
        "Consider edge cases",
        "Optimize your solution for efficiency",
      ],
    };
  }

  return { content: baseContent };
}

// Seed all courses
export const seedAllCourses = mutation({
  args: {},
  handler: async (ctx) => {
    const allCourses = [
      ...COURSES.languages,
      ...COURSES.frameworks,
      ...COURSES.technologies,
    ];

    let coursesCreated = 0;
    let modulesCreated = 0;
    let lessonsCreated = 0;

    for (const courseData of allCourses) {
      // Check if course already exists
      const existingCourse = await ctx.db
        .query("courses")
        .withIndex("by_slug", (q) => q.eq("slug", courseData.slug))
        .first();

      if (existingCourse) {
        // Update existing course metadata (especially icons)
        await ctx.db.patch(existingCourse._id, {
          title: courseData.title,
          description: courseData.description,
          icon: courseData.icon,
          language: courseData.language,
          difficulty: courseData.difficulty,
          estimatedHours: courseData.estimatedHours,
          totalLessons: courseData.modules.reduce((sum, m) => sum + m.lessons.length, 0),
        });
        continue;
      }

      // Create course
      const courseId = await ctx.db.insert("courses", {
        slug: courseData.slug,
        title: courseData.title,
        description: courseData.description,
        icon: courseData.icon,
        language: courseData.language,
        difficulty: courseData.difficulty,
        estimatedHours: courseData.estimatedHours,
        totalLessons: courseData.modules.reduce((sum, m) => sum + m.lessons.length, 0),
        isPublished: true,
        createdAt: Date.now(),
      });
      coursesCreated++;

      // Create modules and lessons
      for (let moduleIndex = 0; moduleIndex < courseData.modules.length; moduleIndex++) {
        const moduleData = courseData.modules[moduleIndex];

        const moduleId = await ctx.db.insert("modules", {
          courseId,
          title: moduleData.title,
          order: moduleIndex + 1,
        });
        modulesCreated++;

        // Create lessons
        for (let lessonIndex = 0; lessonIndex < moduleData.lessons.length; lessonIndex++) {
          const lessonData = moduleData.lessons[lessonIndex];
          const lessonContent = generateLessonContent(
            courseData.title,
            moduleData.title,
            lessonData.title,
            lessonData.type,
            courseData.language
          );

          await ctx.db.insert("lessons", {
            moduleId,
            courseId,
            title: lessonData.title,
            type: lessonData.type,
            content: lessonContent.content,
            codeTemplate: lessonContent.codeTemplate,
            solution: lessonContent.solution,
            testCases: lessonContent.testCases,
            hints: lessonContent.hints,
            xpReward: lessonData.xp,
            language: courseData.language,
            order: lessonIndex + 1,
            estimatedMinutes: lessonData.type === "project" ? 60 : lessonData.type === "challenge" ? 30 : 15,
          });
          lessonsCreated++;
        }
      }
    }

    // Seed badges if not exists
    const existingBadges = await ctx.db.query("badges").collect();
    if (existingBadges.length === 0) {
      const badges = [
        { name: "First Steps", icon: "👣", description: "Complete your first lesson", criteria: "complete_1_lesson", xpReward: 50, category: "completion" as const },
        { name: "Quick Learner", icon: "⚡", description: "Complete 10 lessons", criteria: "complete_10_lessons", xpReward: 100, category: "completion" as const },
        { name: "Dedicated Student", icon: "📚", description: "Complete 50 lessons", criteria: "complete_50_lessons", xpReward: 250, category: "completion" as const },
        { name: "Week Warrior", icon: "🔥", description: "7-day streak", criteria: "streak_7", xpReward: 100, category: "streak" as const },
        { name: "Month Master", icon: "🌟", description: "30-day streak", criteria: "streak_30", xpReward: 500, category: "streak" as const },
        { name: "Century Champion", icon: "💯", description: "100-day streak", criteria: "streak_100", xpReward: 1000, category: "streak" as const },
        { name: "Speed Demon", icon: "🏃", description: "Complete 5 lessons in one day", criteria: "daily_5_lessons", xpReward: 75, category: "speed" as const },
        { name: "Perfect Score", icon: "💎", description: "Score 100% on an exam", criteria: "perfect_exam", xpReward: 200, category: "skill" as const },
        { name: "Bug Hunter", icon: "🐛", description: "Complete 10 challenges", criteria: "complete_10_challenges", xpReward: 150, category: "skill" as const },
        { name: "Python Pro", icon: "🐍", description: "Complete Python course", criteria: "complete_python", xpReward: 300, category: "completion" as const },
        { name: "JS Ninja", icon: "💛", description: "Complete JavaScript course", criteria: "complete_javascript", xpReward: 300, category: "completion" as const },
        { name: "React Master", icon: "⚛️", description: "Complete React course", criteria: "complete_react", xpReward: 300, category: "completion" as const },
      ];

      for (const badge of badges) {
        await ctx.db.insert("badges", badge);
      }
    }

    return {
      success: true,
      coursesCreated,
      modulesCreated,
      lessonsCreated,
      totalCourses: allCourses.length,
    };
  },
});

// Get seeding stats
export const getSeedingStats = mutation({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db.query("courses").collect();
    const modules = await ctx.db.query("modules").collect();
    const lessons = await ctx.db.query("lessons").collect();
    const badges = await ctx.db.query("badges").collect();

    return {
      courses: courses.length,
      modules: modules.length,
      lessons: lessons.length,
      badges: badges.length,
    };
  },
});
