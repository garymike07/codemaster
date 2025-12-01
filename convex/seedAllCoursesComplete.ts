import { mutation } from "./_generated/server";

// Helper function to create lessons
async function createLessons(ctx: any, moduleId: any, courseId: any, lessons: any[]) {
  for (const lesson of lessons) {
    await ctx.db.insert("lessons", {
      moduleId,
      courseId,
      ...lesson,
    });
  }
}

// Helper to create a standard module with lessons
async function createModule(ctx: any, courseId: any, moduleData: any, lessons: any[]) {
  const moduleId = await ctx.db.insert("modules", {
    courseId,
    ...moduleData,
  });
  await createLessons(ctx, moduleId, courseId, lessons);
  return moduleId;
}

// ==========================================
// PYTHON FUNDAMENTALS - 10 MODULES
// ==========================================
async function seedPythonCourse(ctx: any) {
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
  await createModule(ctx, courseId, { title: "Getting Started with Python", order: 1, summary: "Introduction to Python programming" }, [
    { title: "What is Python?", type: "theory", content: "# What is Python?\n\nPython is a high-level, interpreted programming language known for its simplicity.\n\n## Why Python?\n- Easy to read and write\n- Versatile (web, data science, AI)\n- Large community\n- In-demand skill", order: 1, xpReward: 10, estimatedMinutes: 5, language: "python" },
    { title: "Hello World", type: "practice", content: "# Your First Program\n\nPrint 'Hello, World!' to the console.", codeTemplate: "# Print Hello, World!\n", solution: 'print("Hello, World!")', testCases: [{ input: "", expectedOutput: "Hello, World!", points: 20 }], order: 2, xpReward: 20, estimatedMinutes: 5, language: "python" },
    { title: "Python Syntax", type: "theory", content: "# Python Syntax\n\n## Indentation\nPython uses indentation for code blocks.\n\n## Comments\n```python\n# Single line comment\n'''Multi-line comment'''\n```", order: 3, xpReward: 10, estimatedMinutes: 5, language: "python" },
    { title: "Print Practice", type: "practice", content: "# Print Multiple Lines\n\nPrint your name and age on separate lines.", codeTemplate: "# Print name and age\n", solution: 'print("Alice")\nprint(25)', testCases: [{ input: "", expectedOutput: "Alice", points: 15 }], order: 4, xpReward: 20, estimatedMinutes: 5, language: "python" },
  ]);

  // Module 2: Variables & Data Types
  await createModule(ctx, courseId, { title: "Variables & Data Types", order: 2, summary: "Learn about variables, numbers, strings, and booleans" }, [
    { title: "Variables", type: "theory", content: "# Variables\n\nVariables store data values.\n\n```python\nname = 'Alice'\nage = 25\nheight = 5.9\nis_student = True\n```", order: 1, xpReward: 15, estimatedMinutes: 8, language: "python" },
    { title: "Numbers", type: "theory", content: "# Numbers\n\n## Integers and Floats\n```python\nx = 10      # int\ny = 3.14    # float\n```\n\n## Operations\n+, -, *, /, //, %, **", order: 2, xpReward: 15, estimatedMinutes: 8, language: "python" },
    { title: "Calculator", type: "practice", content: "# Basic Calculator\n\nCalculate 15 + 4 and print the result.", codeTemplate: "a = 15\nb = 4\n# Print the sum\n", solution: "a = 15\nb = 4\nprint(a + b)", testCases: [{ input: "", expectedOutput: "19", points: 25 }], order: 3, xpReward: 25, estimatedMinutes: 8, language: "python" },
    { title: "Strings", type: "theory", content: "# Strings\n\n```python\nname = 'Alice'\ngreeting = f'Hello, {name}!'\nprint(greeting.upper())  # HELLO, ALICE!\n```", order: 4, xpReward: 15, estimatedMinutes: 8, language: "python" },
    { title: "String Practice", type: "practice", content: "# String Manipulation\n\nConvert 'hello world' to uppercase.", codeTemplate: "text = 'hello world'\n# Print uppercase\n", solution: "text = 'hello world'\nprint(text.upper())", testCases: [{ input: "", expectedOutput: "HELLO WORLD", points: 25 }], order: 5, xpReward: 25, estimatedMinutes: 8, language: "python" },
  ]);

  // Module 3: Operators & Control Flow
  await createModule(ctx, courseId, { title: "Operators & Control Flow", order: 3, summary: "Learn comparison, logical operators and if-else statements" }, [
    { title: "Comparison Operators", type: "theory", content: "# Comparison Operators\n\n==, !=, >, <, >=, <=\n\n```python\nx = 10\nprint(x > 5)   # True\nprint(x == 10) # True\n```", order: 1, xpReward: 15, estimatedMinutes: 8, language: "python" },
    { title: "If-Else Statements", type: "theory", content: "# If-Else\n\n```python\nage = 18\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Grade Calculator", type: "practice", content: "# Grade Calculator\n\nGiven score=85, print 'B' (80-89=B).", codeTemplate: "score = 85\n# Print the grade\n", solution: "score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')", testCases: [{ input: "", expectedOutput: "B", points: 30 }], order: 3, xpReward: 35, estimatedMinutes: 12, language: "python" },
    { title: "Logical Operators", type: "theory", content: "# Logical Operators\n\nand, or, not\n\n```python\nx = 10\nprint(x > 5 and x < 20)  # True\nprint(not False)          # True\n```", order: 4, xpReward: 15, estimatedMinutes: 8, language: "python" },
    { title: "Number Classifier", type: "challenge", content: "# Number Classifier\n\nPrint if n=-7 is positive/negative and odd/even.", codeTemplate: "n = -7\n# Classify the number\n", solution: "n = -7\nif n > 0:\n    print('positive')\nelse:\n    print('negative')\nif n % 2 == 0:\n    print('even')\nelse:\n    print('odd')", testCases: [{ input: "", expectedOutput: "negative", points: 25 }, { input: "", expectedOutput: "odd", points: 25 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "python" },
  ]);

  // Module 4: Loops
  await createModule(ctx, courseId, { title: "Loops & Iterations", order: 4, summary: "Master for loops, while loops, and loop control" }, [
    { title: "For Loops", type: "theory", content: "# For Loops\n\n```python\nfor i in range(5):\n    print(i)  # 0,1,2,3,4\n\nfor fruit in ['apple', 'banana']:\n    print(fruit)\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "While Loops", type: "theory", content: "# While Loops\n\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Sum Calculator", type: "practice", content: "# Sum 1 to 10\n\nCalculate and print sum of 1 to 10 (55).", codeTemplate: "total = 0\n# Use a loop\n", solution: "total = 0\nfor i in range(1, 11):\n    total += i\nprint(total)", testCases: [{ input: "", expectedOutput: "55", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 10, language: "python" },
    { title: "Loop Control", type: "theory", content: "# break, continue, pass\n\n```python\nfor i in range(10):\n    if i == 5:\n        break  # Exit loop\n    print(i)\n```", order: 4, xpReward: 15, estimatedMinutes: 8, language: "python" },
    { title: "FizzBuzz", type: "challenge", content: "# FizzBuzz\n\nFor 1-15: print FizzBuzz (div 3&5), Fizz (3), Buzz (5), or number.", codeTemplate: "# FizzBuzz 1-15\n", solution: "for i in range(1, 16):\n    if i % 3 == 0 and i % 5 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)", testCases: [{ input: "", expectedOutput: "FizzBuzz", points: 30 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "python" },
  ]);

  // Module 5: Lists & Tuples
  await createModule(ctx, courseId, { title: "Lists & Tuples", order: 5, summary: "Work with ordered collections" }, [
    { title: "Lists Basics", type: "theory", content: "# Lists\n\n```python\nfruits = ['apple', 'banana', 'cherry']\nprint(fruits[0])  # apple\nfruits.append('date')\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "List Methods", type: "theory", content: "# List Methods\n\nappend(), pop(), sort(), reverse(), len()", order: 2, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "List Operations", type: "practice", content: "# Sort and Add\n\nSort [5,2,8,1,9] and append 10.", codeTemplate: "nums = [5, 2, 8, 1, 9]\n# Sort and append 10\n", solution: "nums = [5, 2, 8, 1, 9]\nnums.sort()\nnums.append(10)\nprint(nums)", testCases: [{ input: "", expectedOutput: "[1, 2, 5, 8, 9, 10]", points: 30 }], order: 3, xpReward: 35, estimatedMinutes: 10, language: "python" },
    { title: "List Comprehensions", type: "theory", content: "# List Comprehensions\n\n```python\nsquares = [x**2 for x in range(5)]\n# [0, 1, 4, 9, 16]\n```", order: 4, xpReward: 20, estimatedMinutes: 10, language: "python" },
    { title: "Tuples", type: "theory", content: "# Tuples\n\nImmutable sequences.\n\n```python\npoint = (3, 4)\nx, y = point  # Unpacking\n```", order: 5, xpReward: 15, estimatedMinutes: 8, language: "python" },
  ]);

  // Module 6: Dictionaries & Sets
  await createModule(ctx, courseId, { title: "Dictionaries & Sets", order: 6, summary: "Key-value pairs and unique collections" }, [
    { title: "Dictionaries", type: "theory", content: "# Dictionaries\n\n```python\nperson = {'name': 'Alice', 'age': 25}\nprint(person['name'])  # Alice\nperson['email'] = 'a@b.com'\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Dict Methods", type: "theory", content: "# Dict Methods\n\nkeys(), values(), items(), get(), pop()", order: 2, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Grade Average", type: "practice", content: "# Average Grade\n\nCalculate average of {'Alice':85,'Bob':92,'Charlie':78}.", codeTemplate: "grades = {'Alice': 85, 'Bob': 92, 'Charlie': 78}\n# Print average\n", solution: "grades = {'Alice': 85, 'Bob': 92, 'Charlie': 78}\navg = sum(grades.values()) / len(grades)\nprint(avg)", testCases: [{ input: "", expectedOutput: "85.0", points: 30 }], order: 3, xpReward: 35, estimatedMinutes: 10, language: "python" },
    { title: "Sets", type: "theory", content: "# Sets\n\nUnique elements.\n\n```python\ncolors = {'red', 'green', 'blue'}\ncolors.add('yellow')\n```", order: 4, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Remove Duplicates", type: "practice", content: "# Remove Duplicates\n\nRemove duplicates from [1,2,2,3,3,3].", codeTemplate: "nums = [1, 2, 2, 3, 3, 3]\n# Print unique sorted\n", solution: "nums = [1, 2, 2, 3, 3, 3]\nprint(sorted(set(nums)))", testCases: [{ input: "", expectedOutput: "[1, 2, 3]", points: 30 }], order: 5, xpReward: 30, estimatedMinutes: 10, language: "python" },
  ]);

  // Module 7: Functions
  await createModule(ctx, courseId, { title: "Functions", order: 7, summary: "Create reusable code with functions" }, [
    { title: "Defining Functions", type: "theory", content: "# Functions\n\n```python\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Alice'))\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Parameters", type: "theory", content: "# Parameters\n\n```python\ndef greet(name, greeting='Hello'):\n    return f'{greeting}, {name}!'\n\ndef sum_all(*nums):\n    return sum(nums)\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Calculator Function", type: "practice", content: "# Calculator\n\nCreate calculate(a,b,op) that returns result.", codeTemplate: "def calculate(a, b, op):\n    pass\n\nprint(calculate(10, 5, 'multiply'))", solution: "def calculate(a, b, op):\n    if op == 'add': return a + b\n    if op == 'multiply': return a * b\n    return 0\n\nprint(calculate(10, 5, 'multiply'))", testCases: [{ input: "", expectedOutput: "50", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "python" },
    { title: "Lambda Functions", type: "theory", content: "# Lambda\n\n```python\nsquare = lambda x: x ** 2\nnums = [1, 2, 3]\nsquared = list(map(lambda x: x**2, nums))\n```", order: 4, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Factorial", type: "challenge", content: "# Recursive Factorial\n\nCreate factorial(n) recursively. Print factorial(5).", codeTemplate: "def factorial(n):\n    pass\n\nprint(factorial(5))", solution: "def factorial(n):\n    if n == 0: return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))", testCases: [{ input: "", expectedOutput: "120", points: 50 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "python" },
  ]);

  // Module 8: OOP
  await createModule(ctx, courseId, { title: "Object-Oriented Programming", order: 8, summary: "Classes, objects, and inheritance" }, [
    { title: "Classes & Objects", type: "theory", content: "# Classes\n\n```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(f'{self.name} barks!')\n\ndog = Dog('Buddy')\ndog.bark()\n```", order: 1, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Create Person Class", type: "practice", content: "# Person Class\n\nCreate Person with name, age and introduce() method.", codeTemplate: "class Person:\n    pass\n\np = Person('Alice', 25)\np.introduce()", solution: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    def introduce(self):\n        print(f\"Hi, I'm {self.name}, {self.age} years old.\")\n\np = Person('Alice', 25)\np.introduce()", testCases: [{ input: "", expectedOutput: "Hi, I'm Alice, 25 years old.", points: 35 }], order: 2, xpReward: 40, estimatedMinutes: 15, language: "python" },
    { title: "Inheritance", type: "theory", content: "# Inheritance\n\n```python\nclass Animal:\n    def speak(self): pass\n\nclass Dog(Animal):\n    def speak(self):\n        return 'Woof!'\n```", order: 3, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Encapsulation", type: "theory", content: "# Encapsulation\n\n```python\nclass BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance  # Private\n    def get_balance(self):\n        return self.__balance\n```", order: 4, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Bank Account", type: "challenge", content: "# Bank Account\n\nCreate BankAccount(100), deposit(50), print balance.", codeTemplate: "class BankAccount:\n    pass\n\nacc = BankAccount(100)\nacc.deposit(50)\nprint(acc.get_balance())", solution: "class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance\n    def deposit(self, amt):\n        self.__balance += amt\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount(100)\nacc.deposit(50)\nprint(acc.get_balance())", testCases: [{ input: "", expectedOutput: "150", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "python" },
  ]);

  // Module 9: File Handling & Modules
  await createModule(ctx, courseId, { title: "File Handling & Modules", order: 9, summary: "Work with files and import modules" }, [
    { title: "Reading Files", type: "theory", content: "# Reading Files\n\n```python\nwith open('file.txt', 'r') as f:\n    content = f.read()\n    lines = f.readlines()\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Writing Files", type: "theory", content: "# Writing Files\n\n```python\nwith open('output.txt', 'w') as f:\n    f.write('Hello!')\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "JSON Handling", type: "theory", content: "# JSON\n\n```python\nimport json\ndata = json.loads('{\"name\": \"Alice\"}')\njson_str = json.dumps({'age': 25})\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Modules", type: "theory", content: "# Modules\n\n```python\nimport math\nfrom random import randint\nimport datetime as dt\n```", order: 4, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Random Numbers", type: "practice", content: "# Random\n\nGenerate random int 1-100 with seed(42).", codeTemplate: "import random\nrandom.seed(42)\n# Print random int 1-100\n", solution: "import random\nrandom.seed(42)\nprint(random.randint(1, 100))", testCases: [{ input: "", expectedOutput: "82", points: 30 }], order: 5, xpReward: 35, estimatedMinutes: 10, language: "python" },
  ]);

  // Module 10: Error Handling
  await createModule(ctx, courseId, { title: "Error Handling & Best Practices", order: 10, summary: "Handle exceptions and write clean code" }, [
    { title: "Try-Except", type: "theory", content: "# Try-Except\n\n```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nfinally:\n    print('Done')\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Raising Exceptions", type: "theory", content: "# Raise\n\n```python\ndef set_age(age):\n    if age < 0:\n        raise ValueError('Age cannot be negative')\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Safe Division", type: "practice", content: "# Safe Division\n\nReturn 'Error' if dividing by zero.", codeTemplate: "def safe_divide(a, b):\n    pass\n\nprint(safe_divide(10, 0))", solution: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Error'\n\nprint(safe_divide(10, 0))", testCases: [{ input: "", expectedOutput: "Error", points: 30 }], order: 3, xpReward: 35, estimatedMinutes: 10, language: "python" },
    { title: "Best Practices", type: "theory", content: "# PEP 8\n\n- Use 4 spaces for indentation\n- snake_case for variables\n- PascalCase for classes\n- Add docstrings", order: 4, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Final Challenge", type: "challenge", content: "# Grade Manager\n\nCreate function to return average from grade dict.", codeTemplate: "def get_average(grades):\n    pass\n\ngrades = {'Alice': 85, 'Bob': 92, 'Charlie': 78}\nprint(get_average(grades))", solution: "def get_average(grades):\n    return sum(grades.values()) / len(grades)\n\ngrades = {'Alice': 85, 'Bob': 92, 'Charlie': 78}\nprint(get_average(grades))", testCases: [{ input: "", expectedOutput: "85.0", points: 50 }], order: 5, xpReward: 75, estimatedMinutes: 20, language: "python" },
  ]);

  return courseId;
}

// ==========================================
// JAVASCRIPT MASTERY - 10 MODULES
// ==========================================
async function seedJavaScriptCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "javascript-mastery",
    title: "JavaScript Mastery",
    description: "Master JavaScript from fundamentals to advanced concepts. Learn ES6+, DOM manipulation, async programming, and build interactive applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    language: "javascript",
    difficulty: "beginner",
    totalLessons: 50,
    estimatedHours: 50,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: JavaScript Basics
  await createModule(ctx, courseId, { title: "JavaScript Basics", order: 1, summary: "Variables, data types, and basic syntax" }, [
    { title: "What is JavaScript?", type: "theory", content: "# JavaScript\n\nThe programming language of the web.\n\n- Runs in browsers\n- Full-stack with Node.js\n- Most popular language", order: 1, xpReward: 10, estimatedMinutes: 5, language: "javascript" },
    { title: "Variables", type: "theory", content: "# Variables\n\n```javascript\nlet name = 'Alice';   // Can reassign\nconst PI = 3.14;      // Cannot reassign\nvar old = 'avoid';    // Old way\n```", order: 2, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
    { title: "Data Types", type: "theory", content: "# Data Types\n\nstring, number, boolean, null, undefined, object, array", order: 3, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
    { title: "Hello JavaScript", type: "practice", content: "# First Program\n\nPrint 'Hello, JavaScript!'", codeTemplate: "// Print Hello, JavaScript!\n", solution: "console.log('Hello, JavaScript!');", testCases: [{ input: "", expectedOutput: "Hello, JavaScript!", points: 20 }], order: 4, xpReward: 20, estimatedMinutes: 5, language: "javascript" },
    { title: "Type Conversion", type: "practice", content: "# Convert '42' to number and print.", codeTemplate: "const str = '42';\n// Convert and print\n", solution: "const str = '42';\nconsole.log(Number(str));", testCases: [{ input: "", expectedOutput: "42", points: 25 }], order: 5, xpReward: 25, estimatedMinutes: 8, language: "javascript" },
  ]);

  // Module 2: Operators & Control Flow
  await createModule(ctx, courseId, { title: "Operators & Control Flow", order: 2, summary: "Operators, conditionals, and switches" }, [
    { title: "Operators", type: "theory", content: "# Operators\n\n+, -, *, /, %, **\n==, ===, !=, !==\n&&, ||, !", order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "If-Else", type: "theory", content: "# Conditionals\n\n```javascript\nif (age >= 18) {\n  console.log('Adult');\n} else {\n  console.log('Minor');\n}\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Grade Calculator", type: "practice", content: "# Print grade for score=85 (B for 80-89).", codeTemplate: "const score = 85;\n// Print grade\n", solution: "const score = 85;\nif (score >= 90) console.log('A');\nelse if (score >= 80) console.log('B');\nelse console.log('C');", testCases: [{ input: "", expectedOutput: "B", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 10, language: "javascript" },
    { title: "Ternary Operator", type: "theory", content: "# Ternary\n\n```javascript\nconst status = age >= 18 ? 'Adult' : 'Minor';\n```", order: 4, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
    { title: "Switch Statement", type: "theory", content: "# Switch\n\n```javascript\nswitch (day) {\n  case 'Mon': console.log('Monday'); break;\n  default: console.log('Other');\n}\n```", order: 5, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
  ]);

  // Module 3: Functions
  await createModule(ctx, courseId, { title: "Functions", order: 3, summary: "Function declarations, expressions, and arrow functions" }, [
    { title: "Function Basics", type: "theory", content: "# Functions\n\n```javascript\nfunction add(a, b) {\n  return a + b;\n}\n\nconst multiply = (a, b) => a * b;\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Arrow Functions", type: "theory", content: "# Arrow Functions\n\n```javascript\nconst greet = name => `Hello, ${name}!`;\nconst add = (a, b) => a + b;\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Calculator", type: "practice", content: "# Create calculate(a,b,op) arrow function.", codeTemplate: "const calculate = (a, b, op) => {\n  // return result\n};\nconsole.log(calculate(10, 5, 'multiply'));", solution: "const calculate = (a, b, op) => {\n  if (op === 'multiply') return a * b;\n  if (op === 'add') return a + b;\n  return 0;\n};\nconsole.log(calculate(10, 5, 'multiply'));", testCases: [{ input: "", expectedOutput: "50", points: 35 }], order: 3, xpReward: 35, estimatedMinutes: 12, language: "javascript" },
    { title: "Scope & Closures", type: "theory", content: "# Closures\n\n```javascript\nfunction counter() {\n  let count = 0;\n  return () => ++count;\n}\nconst inc = counter();\n```", order: 4, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Higher-Order Functions", type: "practice", content: "# Create multiplier(factor) returning a function.", codeTemplate: "const multiplier = (factor) => {\n  // return function\n};\nconst double = multiplier(2);\nconsole.log(double(5));", solution: "const multiplier = (factor) => {\n  return (num) => num * factor;\n};\nconst double = multiplier(2);\nconsole.log(double(5));", testCases: [{ input: "", expectedOutput: "10", points: 40 }], order: 5, xpReward: 45, estimatedMinutes: 15, language: "javascript" },
  ]);

  // Module 4: Arrays & Objects
  await createModule(ctx, courseId, { title: "Arrays & Objects", order: 4, summary: "Work with arrays, array methods, and objects" }, [
    { title: "Arrays", type: "theory", content: "# Arrays\n\n```javascript\nconst nums = [1, 2, 3];\nnums.push(4);\nnums.pop();\nconsole.log(nums[0]);\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Array Methods", type: "theory", content: "# Array Methods\n\nmap, filter, reduce, find, forEach, some, every", order: 2, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Filter & Map", type: "practice", content: "# Filter evens from [1-10] and double them.", codeTemplate: "const nums = [1,2,3,4,5,6,7,8,9,10];\nconst result = nums\n  // chain methods\nconsole.log(result);", solution: "const nums = [1,2,3,4,5,6,7,8,9,10];\nconst result = nums.filter(n => n % 2 === 0).map(n => n * 2);\nconsole.log(result);", testCases: [{ input: "", expectedOutput: "[ 4, 8, 12, 16, 20 ]", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 12, language: "javascript" },
    { title: "Objects", type: "theory", content: "# Objects\n\n```javascript\nconst person = {\n  name: 'Alice',\n  age: 25,\n  greet() { return 'Hi!'; }\n};\n```", order: 4, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Destructuring", type: "theory", content: "# Destructuring\n\n```javascript\nconst { name, age } = person;\nconst [first, ...rest] = array;\n```", order: 5, xpReward: 20, estimatedMinutes: 10, language: "javascript" },
  ]);

  // Module 5: Strings
  await createModule(ctx, courseId, { title: "Strings & String Methods", order: 5, summary: "String manipulation and template literals" }, [
    { title: "String Basics", type: "theory", content: "# Strings\n\n```javascript\nconst str = 'Hello';\nconst template = `Hello, ${name}!`;\n```", order: 1, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
    { title: "String Methods", type: "theory", content: "# Methods\n\ntoUpperCase, toLowerCase, slice, split, includes, indexOf", order: 2, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Title Case", type: "practice", content: "# Convert 'hello world' to 'Hello World'.", codeTemplate: "const str = 'hello world';\n// Convert to title case\n", solution: "const str = 'hello world';\nconst result = str.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');\nconsole.log(result);", testCases: [{ input: "", expectedOutput: "Hello World", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 12, language: "javascript" },
    { title: "Template Literals", type: "theory", content: "# Template Literals\n\n```javascript\nconst msg = `Name: ${name}\nAge: ${age}`;\n```", order: 4, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
    { title: "String Challenge", type: "challenge", content: "# Reverse 'JavaScript' and print.", codeTemplate: "const str = 'JavaScript';\n// Reverse and print\n", solution: "const str = 'JavaScript';\nconsole.log(str.split('').reverse().join(''));", testCases: [{ input: "", expectedOutput: "tpircSavaJ", points: 40 }], order: 5, xpReward: 45, estimatedMinutes: 10, language: "javascript" },
  ]);

  // Module 6: DOM Manipulation
  await createModule(ctx, courseId, { title: "DOM Manipulation", order: 6, summary: "Select and modify HTML elements" }, [
    { title: "Selecting Elements", type: "theory", content: "# DOM Selection\n\n```javascript\ndocument.getElementById('id')\ndocument.querySelector('.class')\ndocument.querySelectorAll('div')\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Modifying Elements", type: "theory", content: "# Modifying\n\n```javascript\nel.textContent = 'New text';\nel.innerHTML = '<b>Bold</b>';\nel.style.color = 'red';\nel.classList.add('active');\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Event Listeners", type: "theory", content: "# Events\n\n```javascript\nbtn.addEventListener('click', (e) => {\n  console.log('Clicked!');\n});\n```", order: 3, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Creating Elements", type: "theory", content: "# Create Elements\n\n```javascript\nconst div = document.createElement('div');\ndiv.textContent = 'Hello';\nparent.appendChild(div);\n```", order: 4, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Event Delegation", type: "theory", content: "# Event Delegation\n\nHandle events on parent for dynamic children.", order: 5, xpReward: 20, estimatedMinutes: 10, language: "javascript" },
  ]);

  // Module 7: Async JavaScript
  await createModule(ctx, courseId, { title: "Asynchronous JavaScript", order: 7, summary: "Callbacks, Promises, and async/await" }, [
    { title: "Callbacks", type: "theory", content: "# Callbacks\n\n```javascript\nsetTimeout(() => {\n  console.log('Delayed');\n}, 1000);\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Promises", type: "theory", content: "# Promises\n\n```javascript\nconst promise = new Promise((resolve, reject) => {\n  resolve('Success!');\n});\npromise.then(data => console.log(data));\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Async/Await", type: "theory", content: "# Async/Await\n\n```javascript\nasync function getData() {\n  const data = await fetchData();\n  return data;\n}\n```", order: 3, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Fetch API", type: "theory", content: "# Fetch\n\n```javascript\nconst response = await fetch(url);\nconst data = await response.json();\n```", order: 4, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Async Practice", type: "practice", content: "# Return data using Promise.resolve.", codeTemplate: "const getData = async () => {\n  // Return {id: 1, name: 'Test'}\n};\ngetData().then(d => console.log(d));", solution: "const getData = async () => {\n  return await Promise.resolve({id: 1, name: 'Test'});\n};\ngetData().then(d => console.log(d));", testCases: [{ input: "", expectedOutput: "{ id: 1, name: 'Test' }", points: 40 }], order: 5, xpReward: 45, estimatedMinutes: 15, language: "javascript" },
  ]);

  // Module 8: ES6+ Features
  await createModule(ctx, courseId, { title: "ES6+ Features", order: 8, summary: "Modern JavaScript features" }, [
    { title: "Spread/Rest", type: "theory", content: "# Spread & Rest\n\n```javascript\nconst arr = [...arr1, ...arr2];\nconst obj = {...obj1, key: 'value'};\nfunction sum(...nums) {}\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Classes", type: "theory", content: "# Classes\n\n```javascript\nclass Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() { return `Hi, ${this.name}`; }\n}\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Rectangle Class", type: "practice", content: "# Create Rectangle class with area() method.", codeTemplate: "class Rectangle {\n  // constructor and area()\n}\nconst r = new Rectangle(5, 3);\nconsole.log(r.area());", solution: "class Rectangle {\n  constructor(w, h) {\n    this.w = w;\n    this.h = h;\n  }\n  area() { return this.w * this.h; }\n}\nconst r = new Rectangle(5, 3);\nconsole.log(r.area());", testCases: [{ input: "", expectedOutput: "15", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 12, language: "javascript" },
    { title: "Modules", type: "theory", content: "# Modules\n\n```javascript\nexport const PI = 3.14;\nimport { PI } from './math.js';\n```", order: 4, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Optional Chaining", type: "theory", content: "# Optional Chaining\n\n```javascript\nconst name = user?.profile?.name;\nconst result = func?.();\n```", order: 5, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
  ]);

  // Module 9: Error Handling
  await createModule(ctx, courseId, { title: "Error Handling & Debugging", order: 9, summary: "Handle errors and debug code" }, [
    { title: "Try-Catch", type: "theory", content: "# Try-Catch\n\n```javascript\ntry {\n  throw new Error('Oops!');\n} catch (e) {\n  console.log(e.message);\n} finally {\n  console.log('Done');\n}\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Error Types", type: "theory", content: "# Error Types\n\nError, TypeError, RangeError, SyntaxError", order: 2, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
    { title: "Safe Division", type: "practice", content: "# Return 'Error' for division by zero.", codeTemplate: "function safeDivide(a, b) {\n  // handle error\n}\nconsole.log(safeDivide(10, 0));", solution: "function safeDivide(a, b) {\n  try {\n    if (b === 0) throw new Error();\n    return a / b;\n  } catch {\n    return 'Error';\n  }\n}\nconsole.log(safeDivide(10, 0));", testCases: [{ input: "", expectedOutput: "Error", points: 35 }], order: 3, xpReward: 35, estimatedMinutes: 10, language: "javascript" },
    { title: "Debugging", type: "theory", content: "# Debugging\n\nconsole.log, console.table, debugger, DevTools", order: 4, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "Custom Errors", type: "theory", content: "# Custom Errors\n\n```javascript\nclass ValidationError extends Error {\n  constructor(msg) {\n    super(msg);\n    this.name = 'ValidationError';\n  }\n}\n```", order: 5, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
  ]);

  // Module 10: Projects
  await createModule(ctx, courseId, { title: "JavaScript Projects", order: 10, summary: "Build practical applications" }, [
    { title: "Project Overview", type: "theory", content: "# Building Projects\n\nApply everything you've learned!", order: 1, xpReward: 10, estimatedMinutes: 5, language: "javascript" },
    { title: "Todo Manager", type: "challenge", content: "# Todo Manager\n\nCreate object with todos array and add/complete methods.", codeTemplate: "const todoManager = {\n  todos: [],\n  add(task) {},\n  complete(id) {},\n  getAll() {}\n};\ntodoManager.add('Learn JS');\ntodoManager.complete(0);\nconsole.log(todoManager.getAll());", solution: "const todoManager = {\n  todos: [],\n  add(task) {\n    this.todos.push({id: this.todos.length, task, done: false});\n  },\n  complete(id) {\n    if(this.todos[id]) this.todos[id].done = true;\n  },\n  getAll() { return this.todos; }\n};\ntodoManager.add('Learn JS');\ntodoManager.complete(0);\nconsole.log(todoManager.getAll());", testCases: [{ input: "", expectedOutput: "done: true", points: 50 }], order: 2, xpReward: 75, estimatedMinutes: 25, language: "javascript" },
    { title: "Counter App", type: "challenge", content: "# Counter with closure", codeTemplate: "function createCounter() {\n  // return object with increment, decrement, getValue\n}\nconst counter = createCounter();\ncounter.increment();\ncounter.increment();\nconsole.log(counter.getValue());", solution: "function createCounter() {\n  let count = 0;\n  return {\n    increment() { count++; },\n    decrement() { count--; },\n    getValue() { return count; }\n  };\n}\nconst counter = createCounter();\ncounter.increment();\ncounter.increment();\nconsole.log(counter.getValue());", testCases: [{ input: "", expectedOutput: "2", points: 50 }], order: 3, xpReward: 60, estimatedMinutes: 20, language: "javascript" },
    { title: "Array Utilities", type: "challenge", content: "# Create chunk(arr, size) that splits array.", codeTemplate: "function chunk(arr, size) {\n  // split into chunks\n}\nconsole.log(chunk([1,2,3,4,5], 2));", solution: "function chunk(arr, size) {\n  const result = [];\n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}\nconsole.log(chunk([1,2,3,4,5], 2));", testCases: [{ input: "", expectedOutput: "[ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]", points: 50 }], order: 4, xpReward: 60, estimatedMinutes: 20, language: "javascript" },
    { title: "Final Project", type: "challenge", content: "# Shopping Cart\n\nCreate cart with add, remove, total methods.", codeTemplate: "const cart = {\n  items: [],\n  add(item, price) {},\n  getTotal() {}\n};\ncart.add('Book', 20);\ncart.add('Pen', 5);\nconsole.log(cart.getTotal());", solution: "const cart = {\n  items: [],\n  add(item, price) { this.items.push({item, price}); },\n  getTotal() { return this.items.reduce((sum, i) => sum + i.price, 0); }\n};\ncart.add('Book', 20);\ncart.add('Pen', 5);\nconsole.log(cart.getTotal());", testCases: [{ input: "", expectedOutput: "25", points: 60 }], order: 5, xpReward: 80, estimatedMinutes: 25, language: "javascript" },
  ]);

  return courseId;
}

// ==========================================
// TYPESCRIPT - 10 MODULES
// ==========================================
async function seedTypeScriptCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "typescript-development",
    title: "TypeScript Development",
    description: "Master TypeScript for type-safe JavaScript development. Learn types, interfaces, generics, and build robust applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    language: "typescript",
    difficulty: "intermediate",
    totalLessons: 50,
    estimatedHours: 40,
    isPublished: true,
    createdAt: Date.now(),
  });

  const modules = [
    { title: "Introduction & Setup", order: 1, summary: "What is TypeScript and setup" },
    { title: "Type System Basics", order: 2, summary: "Primitive types and annotations" },
    { title: "Arrays, Tuples & Enums", order: 3, summary: "Complex data structures" },
    { title: "Interfaces & Type Aliases", order: 4, summary: "Define object shapes" },
    { title: "Union & Intersection Types", order: 5, summary: "Combine types" },
    { title: "Functions in TypeScript", order: 6, summary: "Typed functions" },
    { title: "Classes & OOP", order: 7, summary: "Object-oriented TypeScript" },
    { title: "Generics", order: 8, summary: "Reusable type-safe code" },
    { title: "Advanced Types", order: 9, summary: "Utility types and guards" },
    { title: "Modules & Projects", order: 10, summary: "Real-world TypeScript" },
  ];

  for (const mod of modules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nTypeScript adds static typing to JavaScript.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "typescript" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in TypeScript.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "typescript" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "// Your code here\nconsole.log('TypeScript');", solution: "console.log('TypeScript');", testCases: [{ input: "", expectedOutput: "TypeScript", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "typescript" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "typescript" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve the challenge\n", solution: "console.log('Done!');", testCases: [{ input: "", expectedOutput: "Done!", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "typescript" },
    ]);
  }

  return courseId;
}

// ==========================================
// REACT - 10 MODULES
// ==========================================
async function seedReactCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "react-development",
    title: "React Development",
    description: "Build modern UIs with React. Learn components, hooks, state management, routing, and build complete applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    language: "javascript",
    difficulty: "intermediate",
    totalLessons: 50,
    estimatedHours: 50,
    isPublished: true,
    createdAt: Date.now(),
  });

  const modules = [
    { title: "React Fundamentals", order: 1, summary: "JSX, components, and Virtual DOM" },
    { title: "Components & Props", order: 2, summary: "Building reusable components" },
    { title: "State & useState", order: 3, summary: "Managing component state" },
    { title: "useEffect & Lifecycle", order: 4, summary: "Side effects and lifecycle" },
    { title: "Event Handling & Forms", order: 5, summary: "Handle user interactions" },
    { title: "Lists, Keys & Rendering", order: 6, summary: "Rendering dynamic content" },
    { title: "React Router", order: 7, summary: "Client-side routing" },
    { title: "Context API & useReducer", order: 8, summary: "Global state management" },
    { title: "Custom Hooks & Performance", order: 9, summary: "Reusable logic and optimization" },
    { title: "React Projects", order: 10, summary: "Build complete applications" },
  ];

  for (const mod of modules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nReact is a library for building user interfaces.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in React.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "// Your React code\nconsole.log('React');", solution: "console.log('React');", testCases: [{ input: "", expectedOutput: "React", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "javascript" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve the challenge\n", solution: "console.log('Done!');", testCases: [{ input: "", expectedOutput: "Done!", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "javascript" },
    ]);
  }

  return courseId;
}

// ==========================================
// NODE.JS - 10 MODULES
// ==========================================
async function seedNodeCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "nodejs-backend",
    title: "Node.js & Express",
    description: "Build backend APIs with Node.js and Express. Learn REST APIs, databases, authentication, and deployment.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    language: "javascript",
    difficulty: "intermediate",
    totalLessons: 50,
    estimatedHours: 45,
    isPublished: true,
    createdAt: Date.now(),
  });

  const modules = [
    { title: "Node.js Fundamentals", order: 1, summary: "Event loop,modules, and npm" },
    { title: "Core Modules", order: 2, summary: "fs, path, http, events" },
    { title: "NPM & Packages", order: 3, summary: "Package management" },
    { title: "Express Basics", order: 4, summary: "Server setup and routing" },
    { title: "RESTful API Design", order: 5, summary: "HTTP methods and REST" },
    { title: "MongoDB Integration", order: 6, summary: "Database operations" },
    { title: "Authentication", order: 7, summary: "JWT and security" },
    { title: "Error Handling", order: 8, summary: "Middleware and validation" },
    { title: "Security & Best Practices", order: 9, summary: "CORS, helmet, rate limiting" },
    { title: "Deployment & Testing", order: 10, summary: "Deploy your API" },
  ];

  for (const mod of modules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nNode.js enables server-side JavaScript.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()}.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "// Your code\nconsole.log('Node.js');", solution: "console.log('Node.js');", testCases: [{ input: "", expectedOutput: "Node.js", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "javascript" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nBuild something with ${mod.title.toLowerCase()}!`, codeTemplate: "// Solve\n", solution: "console.log('Done!');", testCases: [{ input: "", expectedOutput: "Done!", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "javascript" },
    ]);
  }

  return courseId;
}

// ==========================================
// SQL - 10 MODULES
// ==========================================
async function seedSQLCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "sql-databases",
    title: "SQL & Databases",
    description: "Master SQL for database management. Learn queries, joins, transactions, and database design.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    language: "sql",
    difficulty: "beginner",
    totalLessons: 50,
    estimatedHours: 35,
    isPublished: true,
    createdAt: Date.now(),
  });

  const modules = [
    { title: "Database Fundamentals", order: 1, summary: "RDBMS and SQL basics" },
    { title: "Creating Tables", order: 2, summary: "DDL and data types" },
    { title: "Basic Queries", order: 3, summary: "SELECT, WHERE, ORDER BY" },
    { title: "Filtering & Operators", order: 4, summary: "AND, OR, IN, BETWEEN" },
    { title: "Aggregate Functions", order: 5, summary: "COUNT, SUM, AVG, GROUP BY" },
    { title: "Joins", order: 6, summary: "INNER, LEFT, RIGHT joins" },
    { title: "Subqueries & Views", order: 7, summary: "Nested queries" },
    { title: "Data Manipulation", order: 8, summary: "INSERT, UPDATE, DELETE" },
    { title: "Indexes & Performance", order: 9, summary: "Query optimization" },
    { title: "Advanced SQL", order: 10, summary: "Transactions and procedures" },
  ];

  for (const mod of modules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nSQL is the language for databases.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "sql" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()}.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "sql" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nWrite SQL for ${mod.title.toLowerCase()}.`, codeTemplate: "-- Your SQL here\nSELECT 'SQL';", solution: "SELECT 'SQL';", testCases: [{ input: "", expectedOutput: "SQL", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "sql" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "sql" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nSQL challenge for ${mod.title.toLowerCase()}!`, codeTemplate: "-- Solve\n", solution: "SELECT 'Done';", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "sql" },
    ]);
  }

  return courseId;
}

// ==========================================
// DSA - 10 MODULES
// ==========================================
async function seedDSACourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "data-structures-algorithms",
    title: "Data Structures & Algorithms",
    description: "Master DSA for coding interviews. Learn arrays, trees, graphs, sorting, and dynamic programming.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    language: "python",
    difficulty: "intermediate",
    totalLessons: 50,
    estimatedHours: 60,
    isPublished: true,
    createdAt: Date.now(),
  });

  const modules = [
    { title: "Complexity Analysis", order: 1, summary: "Big O notation" },
    { title: "Arrays & Strings", order: 2, summary: "Array operations and techniques" },
    { title: "Searching Algorithms", order: 3, summary: "Linear and binary search" },
    { title: "Sorting Algorithms", order: 4, summary: "Bubble, merge, quick sort" },
    { title: "Linked Lists", order: 5, summary: "Singly and doubly linked lists" },
    { title: "Stacks & Queues", order: 6, summary: "LIFO and FIFO structures" },
    { title: "Hash Tables", order: 7, summary: "Hashing and collision handling" },
    { title: "Trees", order: 8, summary: "Binary trees and BST" },
    { title: "Graphs", order: 9, summary: "BFS, DFS, shortest path" },
    { title: "Dynamic Programming", order: 10, summary: "Memoization and tabulation" },
  ];

  for (const mod of modules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nDSA is essential for coding interviews.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()}.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "python" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nImplement ${mod.title.toLowerCase()}.`, codeTemplate: "# Your code\nprint('DSA')", solution: "print('DSA')", testCases: [{ input: "", expectedOutput: "DSA", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 15, language: "python" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 12, language: "python" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nSolve a ${mod.title.toLowerCase()} problem!`, codeTemplate: "# Solve\n", solution: "print('Done!')", testCases: [{ input: "", expectedOutput: "Done!", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "python" },
    ]);
  }

  return courseId;
}

// ==========================================
// GIT - 10 MODULES
// ==========================================
async function seedGitCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "git-version-control",
    title: "Git & Version Control",
    description: "Master Git for version control. Learn branching, merging, GitHub workflows, and collaboration.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    language: "bash",
    difficulty: "beginner",
    totalLessons: 45,
    estimatedHours: 25,
    isPublished: true,
    createdAt: Date.now(),
  });

  const modules = [
    { title: "Introduction to Git", order: 1, summary: "VCS and Git basics" },
    { title: "Basic Commands", order: 2, summary: "init, add, commit, status" },
    { title: "Working with Repos", order: 3, summary: "clone, remote, push, pull" },
    { title: "Branching", order: 4, summary: "Create and manage branches" },
    { title: "Merging & Rebasing", order: 5, summary: "Combine branches" },
    { title: "Undoing Changes", order: 6, summary: "reset, revert, stash" },
    { title: "GitHub Workflows", order: 7, summary: "PRs and code reviews" },
    { title: "Git Workflows", order: 8, summary: "Gitflow and trunk-based" },
    { title: "Advanced Git", order: 9, summary: "Cherry-pick, tags, hooks" },
    { title: "Collaboration", order: 10, summary: "Best practices and CI/CD" },
  ];

  for (const mod of modules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nGit tracks changes in your code.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "bash" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()}.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "bash" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "# Git commands\necho 'Git'", solution: "echo 'Git'", testCases: [{ input: "", expectedOutput: "Git", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "bash" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "bash" },
    ]);
  }

  return courseId;
}

// ==========================================
// MAIN SEED FUNCTION
// ==========================================
export const seedAllCoursesComplete = mutation({
  args: {},
  handler: async (ctx) => {
    const existingCourses = await ctx.db.query("courses").collect();
    const results: Record<string, boolean> = {};

    // Delete existing courses, modules, lessons for clean slate
    const lessons = await ctx.db.query("lessons").collect();
    for (const lesson of lessons) await ctx.db.delete(lesson._id);
    
    const modules = await ctx.db.query("modules").collect();
    for (const mod of modules) await ctx.db.delete(mod._id);
    
    for (const course of existingCourses) await ctx.db.delete(course._id);

    // Seed all 8 courses
    await seedPythonCourse(ctx);
    results.python = true;
    
    await seedJavaScriptCourse(ctx);
    results.javascript = true;
    
    await seedTypeScriptCourse(ctx);
    results.typescript = true;
    
    await seedReactCourse(ctx);
    results.react = true;
    
    await seedNodeCourse(ctx);
    results.nodejs = true;
    
    await seedSQLCourse(ctx);
    results.sql = true;
    
    await seedDSACourse(ctx);
    results.dsa = true;
    
    await seedGitCourse(ctx);
    results.git = true;

    // Seed badges
    const badges = [
      { name: "First Steps", icon: "🌟", description: "Complete your first lesson", criteria: "lessons_completed >= 1", xpReward: 50, category: "completion" as const },
      { name: "Dedicated Learner", icon: "📚", description: "Complete 50 lessons", criteria: "lessons_completed >= 50", xpReward: 250, category: "completion" as const },
      { name: "Week Warrior", icon: "🔥", description: "7-day streak", criteria: "streak >= 7", xpReward: 150, category: "streak" as const },
      { name: "Python Pioneer", icon: "🐍", description: "Complete Python course", criteria: "course_python", xpReward: 500, category: "completion" as const },
      { name: "JavaScript Ninja", icon: "⚔️", description: "Complete JavaScript course", criteria: "course_javascript", xpReward: 500, category: "completion" as const },
      { name: "TypeScript Pro", icon: "📘", description: "Complete TypeScript course", criteria: "course_typescript", xpReward: 500, category: "completion" as const },
      { name: "React Ranger", icon: "⚛️", description: "Complete React course", criteria: "course_react", xpReward: 500, category: "completion" as const },
      { name: "Node Master", icon: "🟢", description: "Complete Node.js course", criteria: "course_nodejs", xpReward: 500, category: "completion" as const },
      { name: "SQL Expert", icon: "🗄️", description: "Complete SQL course", criteria: "course_sql", xpReward: 500, category: "completion" as const },
      { name: "Algorithm Ace", icon: "🧮", description: "Complete DSA course", criteria: "course_dsa", xpReward: 500, category: "completion" as const },
      { name: "Git Guru", icon: "📦", description: "Complete Git course", criteria: "course_git", xpReward: 500, category: "completion" as const },
    ];
    
    const existingBadges = await ctx.db.query("badges").collect();
    for (const badge of existingBadges) await ctx.db.delete(badge._id);
    
    for (const badge of badges) {
      await ctx.db.insert("badges", badge);
    }
    results.badges = true;

    return results;
  },
});
