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
// PYTHON FUNDAMENTALS - 20 MODULES
// ==========================================
async function seedPythonCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    description: "Master Python from basics to advanced concepts. Learn variables, data structures, functions, OOP, decorators, async programming, and build real projects.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    language: "python",
    difficulty: "beginner",
    totalLessons: 100,
    estimatedHours: 80,
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

  // ==========================================
  // PYTHON ADVANCED MODULES 11-20
  // ==========================================

  // Module 11: Decorators
  await createModule(ctx, courseId, { title: "Decorators", order: 11, summary: "Function and class decorators for code enhancement" }, [
    { title: "What are Decorators?", type: "theory", content: "# Decorators\n\nDecorators modify function behavior without changing the function itself.\n\n```python\ndef decorator(func):\n    def wrapper(*args, **kwargs):\n        print('Before')\n        result = func(*args, **kwargs)\n        print('After')\n        return result\n    return wrapper\n\n@decorator\ndef greet():\n    print('Hello!')\n```", order: 1, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "functools.wraps", type: "theory", content: "# Preserving Metadata\n\n```python\nfrom functools import wraps\n\ndef decorator(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n```\n\nPreserves function name and docstring.", order: 2, xpReward: 20, estimatedMinutes: 10, language: "python" },
    { title: "Timer Decorator", type: "practice", content: "# Create Timer Decorator\n\nCreate a decorator that prints execution time.", codeTemplate: "import time\n\ndef timer(func):\n    # Create decorator\n    pass\n\n@timer\ndef slow_function():\n    time.sleep(0.1)\n    return 'done'\n\nprint(slow_function())", solution: "import time\nfrom functools import wraps\n\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f'Time: {time.time() - start:.2f}s')\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    time.sleep(0.1)\n    return 'done'\n\nprint(slow_function())", testCases: [{ input: "", expectedOutput: "done", points: 40 }], order: 3, xpReward: 45, estimatedMinutes: 15, language: "python" },
    { title: "Decorator with Arguments", type: "theory", content: "# Decorators with Arguments\n\n```python\ndef repeat(times):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef say_hello():\n    print('Hello!')\n```", order: 4, xpReward: 25, estimatedMinutes: 12, language: "python" },
    { title: "Class Decorators", type: "challenge", content: "# Singleton Decorator\n\nCreate a decorator that makes a class a singleton.", codeTemplate: "def singleton(cls):\n    # Create singleton decorator\n    pass\n\n@singleton\nclass Database:\n    def __init__(self):\n        print('Creating instance')\n\ndb1 = Database()\ndb2 = Database()\nprint(db1 is db2)", solution: "def singleton(cls):\n    instances = {}\n    def get_instance(*args, **kwargs):\n        if cls not in instances:\n            instances[cls] = cls(*args, **kwargs)\n        return instances[cls]\n    return get_instance\n\n@singleton\nclass Database:\n    def __init__(self):\n        print('Creating instance')\n\ndb1 = Database()\ndb2 = Database()\nprint(db1 is db2)", testCases: [{ input: "", expectedOutput: "True", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "python" },
  ]);

  // Module 12: Generators & Iterators
  await createModule(ctx, courseId, { title: "Generators & Iterators", order: 12, summary: "Memory-efficient iteration with yield" }, [
    { title: "Iterators", type: "theory", content: "# Iterators\n\n```python\nclass Counter:\n    def __init__(self, max):\n        self.max = max\n        self.n = 0\n    \n    def __iter__(self):\n        return self\n    \n    def __next__(self):\n        if self.n < self.max:\n            self.n += 1\n            return self.n\n        raise StopIteration\n```", order: 1, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Generator Functions", type: "theory", content: "# Generators with yield\n\n```python\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor num in countdown(5):\n    print(num)  # 5, 4, 3, 2, 1\n```\n\nGenerators are memory efficient!", order: 2, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Fibonacci Generator", type: "practice", content: "# Create Fibonacci Generator\n\nYield first n Fibonacci numbers.", codeTemplate: "def fibonacci(n):\n    # yield Fibonacci numbers\n    pass\n\nprint(list(fibonacci(7)))", solution: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fibonacci(7)))", testCases: [{ input: "", expectedOutput: "[0, 1, 1, 2, 3, 5, 8]", points: 40 }], order: 3, xpReward: 45, estimatedMinutes: 15, language: "python" },
    { title: "Generator Expressions", type: "theory", content: "# Generator Expressions\n\n```python\n# List comprehension (creates list)\nsquares = [x**2 for x in range(1000000)]\n\n# Generator expression (lazy evaluation)\nsquares_gen = (x**2 for x in range(1000000))\n```\n\nGenerators use O(1) memory!", order: 4, xpReward: 20, estimatedMinutes: 10, language: "python" },
    { title: "Itertools", type: "challenge", content: "# Use itertools\n\nGet all 2-combinations of [1,2,3].", codeTemplate: "from itertools import combinations\n\nnums = [1, 2, 3]\n# Print all 2-combinations\n", solution: "from itertools import combinations\n\nnums = [1, 2, 3]\nprint(list(combinations(nums, 2)))", testCases: [{ input: "", expectedOutput: "[(1, 2), (1, 3), (2, 3)]", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "python" },
  ]);

  // Module 13: Context Managers
  await createModule(ctx, courseId, { title: "Context Managers", order: 13, summary: "Resource management with with statement" }, [
    { title: "The with Statement", type: "theory", content: "# Context Managers\n\nAuto-manage resources (files, connections, locks).\n\n```python\nwith open('file.txt', 'r') as f:\n    content = f.read()\n# File automatically closed!\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Custom Context Manager", type: "theory", content: "# __enter__ and __exit__\n\n```python\nclass ManagedFile:\n    def __init__(self, filename):\n        self.filename = filename\n    \n    def __enter__(self):\n        self.file = open(self.filename, 'r')\n        return self.file\n    \n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.file.close()\n        return False  # Don't suppress exceptions\n```", order: 2, xpReward: 25, estimatedMinutes: 15, language: "python" },
    { title: "Timer Context Manager", type: "practice", content: "# Create Timer Context Manager\n\nPrint elapsed time when block completes.", codeTemplate: "import time\n\nclass Timer:\n    # Implement __enter__ and __exit__\n    pass\n\nwith Timer():\n    time.sleep(0.1)\nprint('Done')", solution: "import time\n\nclass Timer:\n    def __enter__(self):\n        self.start = time.time()\n        return self\n    \n    def __exit__(self, *args):\n        elapsed = time.time() - self.start\n        print(f'Elapsed: {elapsed:.2f}s')\n        return False\n\nwith Timer():\n    time.sleep(0.1)\nprint('Done')", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 3, xpReward: 45, estimatedMinutes: 15, language: "python" },
    { title: "contextlib Module", type: "theory", content: "# contextlib.contextmanager\n\n```python\nfrom contextlib import contextmanager\n\n@contextmanager\ndef managed_resource():\n    print('Setup')\n    yield 'resource'\n    print('Cleanup')\n\nwith managed_resource() as r:\n    print(f'Using {r}')\n```", order: 4, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Database Connection", type: "challenge", content: "# DB Connection Manager\n\nCreate a context manager that simulates DB connect/disconnect.", codeTemplate: "class DatabaseConnection:\n    # Implement context manager\n    pass\n\nwith DatabaseConnection('mydb') as conn:\n    print(f'Connected to {conn}')", solution: "class DatabaseConnection:\n    def __init__(self, db_name):\n        self.db_name = db_name\n    \n    def __enter__(self):\n        print(f'Connecting to {self.db_name}')\n        return self.db_name\n    \n    def __exit__(self, *args):\n        print('Disconnecting')\n        return False\n\nwith DatabaseConnection('mydb') as conn:\n    print(f'Connected to {conn}')", testCases: [{ input: "", expectedOutput: "Connected to mydb", points: 45 }], order: 5, xpReward: 55, estimatedMinutes: 18, language: "python" },
  ]);

  // Module 14: Advanced OOP
  await createModule(ctx, courseId, { title: "Advanced OOP", order: 14, summary: "Abstract classes, multiple inheritance, mixins" }, [
    { title: "Abstract Base Classes", type: "theory", content: "# Abstract Base Classes\n\n```python\nfrom abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    \n    def area(self):\n        return 3.14 * self.r ** 2\n```", order: 1, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Multiple Inheritance", type: "theory", content: "# Multiple Inheritance\n\n```python\nclass Flyable:\n    def fly(self): return 'Flying'\n\nclass Swimmable:\n    def swim(self): return 'Swimming'\n\nclass Duck(Flyable, Swimmable):\n    pass\n\nduck = Duck()\nprint(duck.fly())   # Flying\nprint(duck.swim())  # Swimming\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Shape Hierarchy", type: "practice", content: "# Create Shape ABC\n\nCreate Rectangle and Circle inheriting from Shape.", codeTemplate: "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\n# Create Rectangle class\n\nr = Rectangle(5, 3)\nprint(r.area())", solution: "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nr = Rectangle(5, 3)\nprint(r.area())", testCases: [{ input: "", expectedOutput: "15", points: 40 }], order: 3, xpReward: 45, estimatedMinutes: 15, language: "python" },
    { title: "Mixins", type: "theory", content: "# Mixin Classes\n\n```python\nclass LoggingMixin:\n    def log(self, msg):\n        print(f'[LOG] {msg}')\n\nclass Service(LoggingMixin):\n    def process(self):\n        self.log('Processing...')\n```\n\nMixins add functionality without inheritance hierarchy.", order: 4, xpReward: 20, estimatedMinutes: 10, language: "python" },
    { title: "Descriptors", type: "challenge", content: "# Property Validation\n\nCreate a descriptor that validates positive numbers.", codeTemplate: "class Positive:\n    # Implement __get__ and __set__\n    pass\n\nclass Product:\n    price = Positive()\n    def __init__(self, price):\n        self.price = price\n\np = Product(100)\nprint(p.price)", solution: "class Positive:\n    def __set_name__(self, owner, name):\n        self.name = name\n    \n    def __get__(self, obj, type=None):\n        return obj.__dict__.get(self.name)\n    \n    def __set__(self, obj, value):\n        if value <= 0:\n            raise ValueError('Must be positive')\n        obj.__dict__[self.name] = value\n\nclass Product:\n    price = Positive()\n    def __init__(self, price):\n        self.price = price\n\np = Product(100)\nprint(p.price)", testCases: [{ input: "", expectedOutput: "100", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "python" },
  ]);

  // Module 15: Metaclasses
  await createModule(ctx, courseId, { title: "Metaclasses", order: 15, summary: "Classes of classes - advanced Python magic" }, [
    { title: "What are Metaclasses?", type: "theory", content: "# Metaclasses\n\nMetaclasses are classes that create classes.\n\n```python\nclass Meta(type):\n    def __new__(mcs, name, bases, attrs):\n        print(f'Creating class: {name}')\n        return super().__new__(mcs, name, bases, attrs)\n\nclass MyClass(metaclass=Meta):\n    pass\n```", order: 1, xpReward: 25, estimatedMinutes: 15, language: "python" },
    { title: "type() Function", type: "theory", content: "# type() as Metaclass\n\n```python\n# These are equivalent:\nclass MyClass:\n    x = 5\n\nMyClass = type('MyClass', (), {'x': 5})\n\nprint(type(MyClass))  # <class 'type'>\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Registry Metaclass", type: "practice", content: "# Auto-register Classes\n\nCreate metaclass that registers all subclasses.", codeTemplate: "class Registry(type):\n    classes = []\n    # Override __new__\n\nclass Base(metaclass=Registry):\n    pass\n\nclass Child1(Base): pass\nclass Child2(Base): pass\n\nprint(Registry.classes)", solution: "class Registry(type):\n    classes = []\n    def __new__(mcs, name, bases, attrs):\n        cls = super().__new__(mcs, name, bases, attrs)\n        if name != 'Base':\n            mcs.classes.append(name)\n        return cls\n\nclass Base(metaclass=Registry):\n    pass\n\nclass Child1(Base): pass\nclass Child2(Base): pass\n\nprint(Registry.classes)", testCases: [{ input: "", expectedOutput: "['Child1', 'Child2']", points: 45 }], order: 3, xpReward: 50, estimatedMinutes: 18, language: "python" },
    { title: "__init_subclass__", type: "theory", content: "# Simpler Alternative\n\n```python\nclass Plugin:\n    plugins = []\n    \n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)\n        cls.plugins.append(cls)\n\nclass MyPlugin(Plugin):\n    pass\n```\n\nPython 3.6+ alternative to metaclasses.", order: 4, xpReward: 20, estimatedMinutes: 10, language: "python" },
    { title: "Singleton Metaclass", type: "challenge", content: "# Singleton via Metaclass\n\nCreate metaclass ensuring only one instance.", codeTemplate: "class SingletonMeta(type):\n    # Implement singleton logic\n    pass\n\nclass Database(metaclass=SingletonMeta):\n    pass\n\ndb1 = Database()\ndb2 = Database()\nprint(db1 is db2)", solution: "class SingletonMeta(type):\n    _instances = {}\n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]\n\nclass Database(metaclass=SingletonMeta):\n    pass\n\ndb1 = Database()\ndb2 = Database()\nprint(db1 is db2)", testCases: [{ input: "", expectedOutput: "True", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "python" },
  ]);

  // Module 16: Async Programming
  await createModule(ctx, courseId, { title: "Async Programming", order: 16, summary: "Asynchronous programming with asyncio" }, [
    { title: "Async/Await Basics", type: "theory", content: "# Async/Await\n\n```python\nimport asyncio\n\nasync def fetch_data():\n    print('Fetching...')\n    await asyncio.sleep(1)  # Non-blocking\n    return 'Data'\n\nasync def main():\n    result = await fetch_data()\n    print(result)\n\nasyncio.run(main())\n```", order: 1, xpReward: 25, estimatedMinutes: 15, language: "python" },
    { title: "Coroutines", type: "theory", content: "# Coroutines\n\n```python\nasync def greet(name):\n    await asyncio.sleep(0.1)\n    return f'Hello, {name}!'\n\n# Coroutines must be awaited\nresult = await greet('Alice')\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Concurrent Tasks", type: "practice", content: "# Run Tasks Concurrently\n\nFetch multiple URLs concurrently.", codeTemplate: "import asyncio\n\nasync def fetch(url, delay):\n    await asyncio.sleep(delay)\n    return f'Data from {url}'\n\nasync def main():\n    # Run concurrently with gather\n    pass\n\nprint(asyncio.run(main()))", solution: "import asyncio\n\nasync def fetch(url, delay):\n    await asyncio.sleep(delay)\n    return f'Data from {url}'\n\nasync def main():\n    results = await asyncio.gather(\n        fetch('url1', 0.1),\n        fetch('url2', 0.1),\n        fetch('url3', 0.1)\n    )\n    return results\n\nprint(asyncio.run(main()))", testCases: [{ input: "", expectedOutput: "Data from url1", points: 40 }], order: 3, xpReward: 50, estimatedMinutes: 18, language: "python" },
    { title: "Event Loop", type: "theory", content: "# Event Loop\n\n```python\nloop = asyncio.get_event_loop()\n\n# Create tasks\ntask1 = asyncio.create_task(coroutine1())\ntask2 = asyncio.create_task(coroutine2())\n\n# Wait for completion\nawait asyncio.gather(task1, task2)\n```", order: 4, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Async Context Manager", type: "challenge", content: "# Async Resource Manager\n\nCreate async context manager.", codeTemplate: "import asyncio\n\nclass AsyncDB:\n    async def __aenter__(self):\n        # Setup\n        pass\n    async def __aexit__(self, *args):\n        # Cleanup\n        pass\n\nasync def main():\n    async with AsyncDB() as db:\n        print('Using DB')\n\nasyncio.run(main())", solution: "import asyncio\n\nclass AsyncDB:\n    async def __aenter__(self):\n        print('Connecting...')\n        await asyncio.sleep(0.1)\n        return self\n    \n    async def __aexit__(self, *args):\n        print('Disconnecting...')\n        await asyncio.sleep(0.1)\n\nasync def main():\n    async with AsyncDB() as db:\n        print('Using DB')\n\nasyncio.run(main())", testCases: [{ input: "", expectedOutput: "Using DB", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "python" },
  ]);

  // Module 17: Testing
  await createModule(ctx, courseId, { title: "Testing with pytest", order: 17, summary: "Write tests and practice TDD" }, [
    { title: "Why Testing?", type: "theory", content: "# Testing\n\n- Catch bugs early\n- Document behavior\n- Enable refactoring\n- Build confidence\n\n```python\n# Install: pip install pytest\n# Run: pytest test_file.py\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "pytest Basics", type: "theory", content: "# Writing Tests\n\n```python\ndef add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0\n    assert add(0, 0) == 0\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Test Calculator", type: "practice", content: "# Write Tests\n\nWrite tests for multiply function.", codeTemplate: "def multiply(a, b):\n    return a * b\n\ndef test_multiply():\n    # Write at least 3 assertions\n    pass\n\ntest_multiply()\nprint('Tests passed!')", solution: "def multiply(a, b):\n    return a * b\n\ndef test_multiply():\n    assert multiply(2, 3) == 6\n    assert multiply(-1, 5) == -5\n    assert multiply(0, 100) == 0\n    assert multiply(2.5, 4) == 10.0\n\ntest_multiply()\nprint('Tests passed!')", testCases: [{ input: "", expectedOutput: "Tests passed!", points: 40 }], order: 3, xpReward: 45, estimatedMinutes: 15, language: "python" },
    { title: "Fixtures & Mocking", type: "theory", content: "# Fixtures\n\n```python\nimport pytest\n\n@pytest.fixture\ndef sample_data():\n    return [1, 2, 3, 4, 5]\n\ndef test_sum(sample_data):\n    assert sum(sample_data) == 15\n```\n\n# Mocking\n```python\nfrom unittest.mock import Mock, patch\n```", order: 4, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "TDD Challenge", type: "challenge", content: "# Test-Driven Development\n\nWrite tests first, then implement is_palindrome.", codeTemplate: "def is_palindrome(s):\n    # Implement after writing tests\n    pass\n\ndef test_is_palindrome():\n    # Write tests first!\n    pass\n\ntest_is_palindrome()\nprint('TDD Success!')", solution: "def is_palindrome(s):\n    s = s.lower().replace(' ', '')\n    return s == s[::-1]\n\ndef test_is_palindrome():\n    assert is_palindrome('radar') == True\n    assert is_palindrome('hello') == False\n    assert is_palindrome('A man a plan a canal Panama') == True\n    assert is_palindrome('') == True\n\ntest_is_palindrome()\nprint('TDD Success!')", testCases: [{ input: "", expectedOutput: "TDD Success!", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "python" },
  ]);

  // Module 18: Packaging & Distribution
  await createModule(ctx, courseId, { title: "Packaging & Distribution", order: 18, summary: "Create and distribute Python packages" }, [
    { title: "Virtual Environments", type: "theory", content: "# Virtual Environments\n\n```bash\n# Create\npython -m venv myenv\n\n# Activate (Windows)\nmyenv\\Scripts\\activate\n\n# Activate (Unix)\nsource myenv/bin/activate\n\n# Install packages\npip install requests\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Project Structure", type: "theory", content: "# Package Structure\n\n```\nmy_package/\n├── src/\n│   └── my_package/\n│       ├── __init__.py\n│       └── module.py\n├── tests/\n├── pyproject.toml\n└── README.md\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "pyproject.toml", type: "practice", content: "# Create Basic Config\n\nCreate a simple package definition.", codeTemplate: "# pyproject.toml structure\nconfig = '''\n[project]\nname = \"mypackage\"\nversion = \"0.1.0\"\n# Add more fields\n'''\nprint(config)", solution: "config = '''\n[project]\nname = \"mypackage\"\nversion = \"0.1.0\"\ndescription = \"My awesome package\"\nauthors = [{name = \"Your Name\", email = \"you@example.com\"}]\nrequires-python = \">=3.8\"\n\n[build-system]\nrequires = [\"setuptools>=61.0\"]\nbuild-backend = \"setuptools.build_meta\"\n'''\nprint(config)", testCases: [{ input: "", expectedOutput: "mypackage", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "python" },
    { title: "Dependencies", type: "theory", content: "# Managing Dependencies\n\n```bash\n# requirements.txt\npip freeze > requirements.txt\npip install -r requirements.txt\n\n# Poetry\npoetry add requests\npoetry install\n```", order: 4, xpReward: 15, estimatedMinutes: 10, language: "python" },
    { title: "Build & Publish", type: "theory", content: "# Build Package\n\n```bash\npip install build twine\npython -m build\ntwine upload dist/*\n```\n\nUploads to PyPI!", order: 5, xpReward: 20, estimatedMinutes: 10, language: "python" },
  ]);

  // Module 19: Performance Optimization
  await createModule(ctx, courseId, { title: "Performance Optimization", order: 19, summary: "Profile and optimize Python code" }, [
    { title: "Why Optimize?", type: "theory", content: "# Performance Matters\n\n- Faster response times\n- Lower resource usage\n- Better scalability\n\n**Golden Rule**: Measure first, optimize second!", order: 1, xpReward: 15, estimatedMinutes: 8, language: "python" },
    { title: "Profiling with cProfile", type: "theory", content: "# Profiling\n\n```python\nimport cProfile\n\ndef slow_func():\n    return sum(range(1000000))\n\ncProfile.run('slow_func()')\n```\n\nOr: `python -m cProfile script.py`", order: 2, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Optimize Code", type: "practice", content: "# Optimize This Function\n\nMake it faster.", codeTemplate: "def slow_sum(n):\n    total = 0\n    for i in range(n):\n        total += i\n    return total\n\n# Optimize and print result\nprint(slow_sum(1000))", solution: "def fast_sum(n):\n    return n * (n - 1) // 2  # Math formula!\n\nprint(fast_sum(1000))", testCases: [{ input: "", expectedOutput: "499500", points: 40 }], order: 3, xpReward: 45, estimatedMinutes: 15, language: "python" },
    { title: "Memory Profiling", type: "theory", content: "# Memory Usage\n\n```python\nimport sys\n\nlist1 = [i for i in range(1000)]\ngen1 = (i for i in range(1000))\n\nprint(sys.getsizeof(list1))  # ~8856 bytes\nprint(sys.getsizeof(gen1))   # ~112 bytes\n```\n\nGenerators save memory!", order: 4, xpReward: 20, estimatedMinutes: 10, language: "python" },
    { title: "Caching", type: "challenge", content: "# Add Memoization\n\nUse lru_cache to speed up fibonacci.", codeTemplate: "from functools import lru_cache\n\n# Add caching decorator\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(30))", solution: "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(30))", testCases: [{ input: "", expectedOutput: "832040", points: 45 }], order: 5, xpReward: 55, estimatedMinutes: 15, language: "python" },
  ]);

  // Module 20: Web Frameworks Intro
  await createModule(ctx, courseId, { title: "Web Frameworks Introduction", order: 20, summary: "Build web apps with Flask and FastAPI" }, [
    { title: "Flask Basics", type: "theory", content: "# Flask\n\n```python\nfrom flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Hello, Flask!'\n\nif __name__ == '__main__':\n    app.run(debug=True)\n```", order: 1, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "Flask Routes", type: "theory", content: "# Routing\n\n```python\n@app.route('/user/<name>')\ndef user(name):\n    return f'Hello, {name}!'\n\n@app.route('/api/data', methods=['POST'])\ndef create_data():\n    return {'status': 'created'}\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "FastAPI Basics", type: "theory", content: "# FastAPI\n\n```python\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\nasync def home():\n    return {'message': 'Hello, FastAPI!'}\n\n@app.get('/items/{item_id}')\nasync def get_item(item_id: int):\n    return {'item_id': item_id}\n```\n\nAuto-generates API docs!", order: 3, xpReward: 25, estimatedMinutes: 15, language: "python" },
    { title: "Pydantic Models", type: "theory", content: "# Data Validation\n\n```python\nfrom pydantic import BaseModel\n\nclass User(BaseModel):\n    name: str\n    age: int\n    email: str | None = None\n\nuser = User(name='Alice', age=25)\n```", order: 4, xpReward: 20, estimatedMinutes: 12, language: "python" },
    { title: "API Design", type: "challenge", content: "# Design REST API\n\nDefine a Todo API structure.", codeTemplate: "# Define API endpoints for Todo app\nendpoints = {\n    # Add your endpoints\n}\nprint(endpoints)", solution: "endpoints = {\n    'GET /todos': 'List all todos',\n    'POST /todos': 'Create new todo',\n    'GET /todos/{id}': 'Get single todo',\n    'PUT /todos/{id}': 'Update todo',\n    'DELETE /todos/{id}': 'Delete todo'\n}\nprint(endpoints)", testCases: [{ input: "", expectedOutput: "GET /todos", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "python" },
  ]);

  return courseId;
}

// ==========================================
// JAVASCRIPT MASTERY - 20 MODULES
// ==========================================
async function seedJavaScriptCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "javascript-mastery",
    title: "JavaScript Mastery",
    description: "Master JavaScript from fundamentals to advanced concepts. Learn ES6+, DOM manipulation, async programming, Web APIs, and build interactive applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    language: "javascript",
    difficulty: "beginner",
    totalLessons: 100,
    estimatedHours: 90,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Modules 1-10: Fundamentals (existing content)
  const jsBasicModules = [
    { title: "JavaScript Basics", order: 1, summary: "Variables, data types, and basic syntax" },
    { title: "Operators & Control Flow", order: 2, summary: "Operators, conditionals, and switches" },
    { title: "Functions", order: 3, summary: "Function declarations, expressions, and arrow functions" },
    { title: "Arrays & Objects", order: 4, summary: "Work with arrays, array methods, and objects" },
    { title: "Strings & String Methods", order: 5, summary: "String manipulation and template literals" },
    { title: "DOM Manipulation", order: 6, summary: "Select and modify HTML elements" },
    { title: "Asynchronous JavaScript", order: 7, summary: "Callbacks, Promises, and async/await" },
    { title: "ES6+ Features", order: 8, summary: "Modern JavaScript features" },
    { title: "Error Handling & Debugging", order: 9, summary: "Handle errors and debug code" },
    { title: "JavaScript Projects", order: 10, summary: "Build practical applications" },
  ];

  for (const mod of jsBasicModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nJavaScript powers the interactive web.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in JavaScript.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "// Your code\nconsole.log('JavaScript');", solution: "console.log('JavaScript');", testCases: [{ input: "", expectedOutput: "JavaScript", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "javascript" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "javascript" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve the challenge\n", solution: "console.log('Done!');", testCases: [{ input: "", expectedOutput: "Done!", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "javascript" },
    ]);
  }

  // Modules 11-20: Advanced JavaScript
  
  // Module 11: Web Storage
  await createModule(ctx, courseId, { title: "Web Storage APIs", order: 11, summary: "localStorage, sessionStorage, and IndexedDB" }, [
    { title: "localStorage", type: "theory", content: "# localStorage\n\nPersistent browser storage (survives browser close).\n\n```javascript\nlocalStorage.setItem('user', 'Alice');\nconst user = localStorage.getItem('user');\nlocalStorage.removeItem('user');\nlocalStorage.clear();\n```", order: 1, xpReward: 20, estimatedMinutes: 10, language: "javascript" },
    { title: "sessionStorage", type: "theory", content: "# sessionStorage\n\nTemporary storage (cleared when tab closes).\n\n```javascript\nsessionStorage.setItem('token', 'abc123');\nconst token = sessionStorage.getItem('token');\n```\n\nSame API as localStorage!", order: 2, xpReward: 15, estimatedMinutes: 8, language: "javascript" },
    { title: "Store Objects", type: "practice", content: "# Store User Object\n\nStore and retrieve user object from localStorage.", codeTemplate: "const user = { name: 'Alice', age: 25 };\n// Store and retrieve\n", solution: "const user = { name: 'Alice', age: 25 };\nlocalStorage.setItem('user', JSON.stringify(user));\nconst retrieved = JSON.parse(localStorage.getItem('user'));\nconsole.log(retrieved.name);", testCases: [{ input: "", expectedOutput: "Alice", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 12, language: "javascript" },
    { title: "Storage Events", type: "theory", content: "# Storage Events\n\n```javascript\nwindow.addEventListener('storage', (e) => {\n  console.log('Key:', e.key);\n  console.log('New value:', e.newValue);\n});\n```\n\nListen for changes across tabs!", order: 4, xpReward: 15, estimatedMinutes: 10, language: "javascript" },
    { title: "IndexedDB Intro", type: "theory", content: "# IndexedDB\n\nLarge-scale structured data storage.\n\n```javascript\nconst request = indexedDB.open('MyDB', 1);\nrequest.onsuccess = (e) => {\n  const db = e.target.result;\n};\n```", order: 5, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
  ]);

  // Module 12: Service Workers
  await createModule(ctx, courseId, { title: "Service Workers & PWA", order: 12, summary: "Offline functionality and Progressive Web Apps" }, [
    { title: "What are Service Workers?", type: "theory", content: "# Service Workers\n\nBackground scripts that enable:\n- Offline functionality\n- Push notifications\n- Background sync\n\n```javascript\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js');\n}\n```", order: 1, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Caching Strategies", type: "theory", content: "# Caching\n\n```javascript\n// sw.js\nself.addEventListener('install', (e) => {\n  e.waitUntil(\n    caches.open('v1').then(cache => {\n      return cache.addAll(['/', '/app.js']);\n    })\n  );\n});\n```", order: 2, xpReward: 25, estimatedMinutes: 15, language: "javascript" },
    { title: "Fetch Interception", type: "theory", content: "# Intercept Requests\n\n```javascript\nself.addEventListener('fetch', (e) => {\n  e.respondWith(\n    caches.match(e.request)\n      .then(r => r || fetch(e.request))\n  );\n});\n```", order: 3, xpReward: 25, estimatedMinutes: 15, language: "javascript" },
    { title: "PWA Manifest", type: "theory", content: "# Web App Manifest\n\n```json\n{\n  \"name\": \"My PWA\",\n  \"short_name\": \"PWA\",\n  \"start_url\": \"/\",\n  \"display\": \"standalone\",\n  \"icons\": [...]\n}\n```", order: 4, xpReward: 20, estimatedMinutes: 10, language: "javascript" },
    { title: "Offline Detection", type: "practice", content: "# Online/Offline Status\n\nShow online/offline status.", codeTemplate: "// Detect online status\nfunction getStatus() {\n  // Return 'online' or 'offline'\n}\nconsole.log(getStatus());", solution: "function getStatus() {\n  return navigator.onLine ? 'online' : 'offline';\n}\nconsole.log(getStatus());", testCases: [{ input: "", expectedOutput: "online", points: 35 }], order: 5, xpReward: 40, estimatedMinutes: 12, language: "javascript" },
  ]);

  // Module 13: Advanced Async Patterns
  await createModule(ctx, courseId, { title: "Advanced Async Patterns", order: 13, summary: "Promise.all, Promise.race, and error handling" }, [
    { title: "Promise.all", type: "theory", content: "# Promise.all\n\nRun promises concurrently, wait for all.\n\n```javascript\nconst results = await Promise.all([\n  fetch('/api/users'),\n  fetch('/api/posts'),\n  fetch('/api/comments')\n]);\n```\n\nFails if any promise rejects!", order: 1, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Promise.race & allSettled", type: "theory", content: "# Promise Methods\n\n```javascript\n// First to complete\nawait Promise.race([p1, p2, p3]);\n\n// All results (fulfilled or rejected)\nawait Promise.allSettled([p1, p2, p3]);\n\n// First to fulfill\nawait Promise.any([p1, p2, p3]);\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Concurrent Fetches", type: "practice", content: "# Fetch Multiple URLs\n\nFetch 3 URLs concurrently.", codeTemplate: "async function fetchAll(urls) {\n  // Return array of results\n}\nconst urls = ['a', 'b', 'c'];\nfetchAll(urls).then(r => console.log(r.length));", solution: "async function fetchAll(urls) {\n  return Promise.all(urls.map(url => Promise.resolve(url)));\n}\nconst urls = ['a', 'b', 'c'];\nfetchAll(urls).then(r => console.log(r.length));", testCases: [{ input: "", expectedOutput: "3", points: 40 }], order: 3, xpReward: 45, estimatedMinutes: 15, language: "javascript" },
    { title: "Error Handling", type: "theory", content: "# Async Error Handling\n\n```javascript\nasync function safeFetch(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error('Failed');\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n    return null;\n  }\n}\n```", order: 4, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Retry Logic", type: "challenge", content: "# Retry Failed Requests\n\nCreate retry function with max attempts.", codeTemplate: "async function retry(fn, attempts = 3) {\n  // Implement retry logic\n}\nretry(() => Promise.resolve('success')).then(console.log);", solution: "async function retry(fn, attempts = 3) {\n  for (let i = 0; i < attempts; i++) {\n    try {\n      return await fn();\n    } catch (err) {\n      if (i === attempts - 1) throw err;\n    }\n  }\n}\nretry(() => Promise.resolve('success')).then(console.log);", testCases: [{ input: "", expectedOutput: "success", points: 50 }], order: 5, xpReward: 55, estimatedMinutes: 18, language: "javascript" },
  ]);

  // Module 14: Design Patterns
  await createModule(ctx, courseId, { title: "JavaScript Design Patterns", order: 14, summary: "Module, Singleton, Factory, Observer patterns" }, [
    { title: "Module Pattern", type: "theory", content: "# Module Pattern\n\n```javascript\nconst Counter = (() => {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    getCount: () => count\n  };\n})();\n\nCounter.increment();\nconsole.log(Counter.getCount()); // 1\n```", order: 1, xpReward: 25, estimatedMinutes: 12, language: "javascript" },
    { title: "Singleton Pattern", type: "theory", content: "# Singleton\n\n```javascript\nclass Database {\n  static instance;\n  static getInstance() {\n    if (!this.instance) {\n      this.instance = new Database();\n    }\n    return this.instance;\n  }\n}\n```", order: 2, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
    { title: "Factory Pattern", type: "practice", content: "# Create Factory\n\nFactory that creates different user types.", codeTemplate: "function createUser(type) {\n  // Return different objects based on type\n}\nconst admin = createUser('admin');\nconsole.log(admin.role);", solution: "function createUser(type) {\n  const users = {\n    admin: { role: 'admin', permissions: ['all'] },\n    user: { role: 'user', permissions: ['read'] }\n  };\n  return users[type] || users.user;\n}\nconst admin = createUser('admin');\nconsole.log(admin.role);", testCases: [{ input: "", expectedOutput: "admin", points: 40 }], order: 3, xpReward: 45, estimatedMinutes: 15, language: "javascript" },
    { title: "Observer Pattern", type: "theory", content: "# Observer/PubSub\n\n```javascript\nclass EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, fn) {\n    (this.events[event] ||= []).push(fn);\n  }\n  emit(event, data) {\n    this.events[event]?.forEach(fn => fn(data));\n  }\n}\n```", order: 4, xpReward: 25, estimatedMinutes: 15, language: "javascript" },
    { title: "Event Emitter", type: "challenge", content: "# Build Event Emitter\n\nCreate with on, off, and emit methods.", codeTemplate: "class EventEmitter {\n  // Implement methods\n}\nconst ee = new EventEmitter();\nee.on('test', () => console.log('fired'));\nee.emit('test');", solution: "class EventEmitter {\n  constructor() { this.events = {}; }\n  on(e, fn) { (this.events[e] ||= []).push(fn); }\n  off(e, fn) { this.events[e] = this.events[e]?.filter(f => f !== fn); }\n  emit(e, ...args) { this.events[e]?.forEach(fn => fn(...args)); }\n}\nconst ee = new EventEmitter();\nee.on('test', () => console.log('fired'));\nee.emit('test');", testCases: [{ input: "", expectedOutput: "fired", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "javascript" },
  ]);

  // Module 15-20: Continue with Performance, WebSockets, Testing, Build Tools, Security, Projects
  const jsAdvancedModules = [
    { title: "Performance Optimization", order: 15, summary: "Memory leaks, profiling, optimization techniques" },
    { title: "WebSockets & Real-time", order: 16, summary: "Real-time communication with WebSockets" },
    { title: "Testing JavaScript", order: 17, summary: "Jest, testing patterns, TDD" },
    { title: "Build Tools & Bundlers", order: 18, summary: "Webpack, module bundling" },
    { title: "Security Best Practices", order: 19, summary: "XSS, CSRF, secure coding" },
    { title: "Advanced Projects", order: 20, summary: "Build full-stack applications" },
  ];

  for (const mod of jsAdvancedModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nAdvanced JavaScript skills.`, order: 1, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
      { title: `${mod.title} - Core Concepts`, type: "theory", content: `# Core Concepts\n\nDeep dive into ${mod.title.toLowerCase()}.`, order: 2, xpReward: 20, estimatedMinutes: 12, language: "javascript" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "// Your code\nconsole.log('Advanced JS');", solution: "console.log('Advanced JS');", testCases: [{ input: "", expectedOutput: "Advanced JS", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "javascript" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced Topics\n\nMastering ${mod.title.toLowerCase()}.`, order: 4, xpReward: 25, estimatedMinutes: 15, language: "javascript" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Final Challenge\n\nTest all ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\n", solution: "console.log('Mastered!');", testCases: [{ input: "", expectedOutput: "Mastered!", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "javascript" },
    ]);
  }

  return courseId;
}

// ==========================================
// TYPESCRIPT - 20 MODULES
// ==========================================
async function seedTypeScriptCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "typescript-development",
    title: "TypeScript Development",
    description: "Master TypeScript for type-safe JavaScript development. Learn types, interfaces, generics, advanced type manipulation, and build robust applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    language: "typescript",
    difficulty: "intermediate",
    totalLessons: 100,
    estimatedHours: 75,
    isPublished: true,
    createdAt: Date.now(),
  });

  const tsModules = [
    // Basic modules 1-10
    { title: "Introduction & Setup", order: 1, summary: "What is TypeScript and setup" },
    { title: "Type System Basics", order: 2, summary: "Primitive types and annotations" },
    { title: "Arrays, Tuples & Enums", order: 3, summary: "Complex data structures" },
    { title: "Interfaces", order: 4, summary: "Define object shapes" },
    { title: "Type Aliases & Unions", order: 5, summary: "Combine and alias types" },
    { title: "Functions in TypeScript", order: 6, summary: "Typed functions" },
    { title: "Classes & OOP", order: 7, summary: "Object-oriented TypeScript" },
    { title: "Generics Basics", order: 8, summary: "Reusable type-safe code" },
    { title: "Type Guards", order: 9, summary: "Narrowing types at runtime" },
    { title: "Modules & Namespaces", order: 10, summary: "Organizing code" },
    // Advanced modules 11-20
    { title: "Conditional Types", order: 11, summary: "Types based on conditions" },
    { title: "Mapped Types", order: 12, summary: "Transform types programmatically" },
    { title: "Template Literal Types", order: 13, summary: "String manipulation at type level" },
    { title: "Utility Types Deep Dive", order: 14, summary: "Pick, Omit, Partial, Required" },
    { title: "Decorators", order: 15, summary: "Metaprogramming with decorators" },
    { title: "Declaration Merging", order: 16, summary: "Interface and module augmentation" },
    { title: "Advanced Generics", order: 17, summary: "Constraints, variance, inference" },
    { title: "Type-Level Programming", order: 18, summary: "Recursive types and computations" },
    { title: "TypeScript Configuration", order: 19, summary: "tsconfig deep dive" },
    { title: "Real-World Patterns", order: 20, summary: "Enterprise TypeScript" },
  ];

  for (const mod of tsModules) {
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
// REACT - 20 MODULES
// ==========================================
async function seedReactCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "react-development",
    title: "React Development",
    description: "Build modern UIs with React. Learn components, hooks, state management, testing, performance optimization, and build complete applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    language: "javascript",
    difficulty: "intermediate",
    totalLessons: 100,
    estimatedHours: 85,
    isPublished: true,
    createdAt: Date.now(),
  });

  const reactModules = [
    // Basic modules 1-10
    { title: "React Fundamentals", order: 1, summary: "JSX, components, and Virtual DOM" },
    { title: "Components & Props", order: 2, summary: "Building reusable components" },
    { title: "State & useState", order: 3, summary: "Managing component state" },
    { title: "useEffect & Lifecycle", order: 4, summary: "Side effects and lifecycle" },
    { title: "Event Handling", order: 5, summary: "Handle user interactions" },
    { title: "Lists & Conditional Rendering", order: 6, summary: "Rendering dynamic content" },
    { title: "Forms & Controlled Components", order: 7, summary: "Form handling patterns" },
    { title: "React Router", order: 8, summary: "Client-side routing" },
    { title: "Context API", order: 9, summary: "Prop drilling solution" },
    { title: "useReducer & Custom Hooks", order: 10, summary: "Complex state logic" },
    // Advanced modules 11-20
    { title: "Advanced Hooks", order: 11, summary: "useLayoutEffect, useImperativeHandle" },
    { title: "Render Patterns", order: 12, summary: "Render props, compound components" },
    { title: "Redux & State Management", order: 13, summary: "Redux Toolkit, selectors" },
    { title: "Testing React Apps", order: 14, summary: "React Testing Library, Jest" },
    { title: "Performance Optimization", order: 15, summary: "Memoization, code splitting" },
    { title: "Advanced Forms", order: 16, summary: "React Hook Form, validation" },
    { title: "Error Boundaries", order: 17, summary: "Error handling in React" },
    { title: "Refs & Portals", order: 18, summary: "DOM access and portals" },
    { title: "Server Components", order: 19, summary: "RSC concepts" },
    { title: "Full-Stack React", order: 20, summary: "Complete applications" },
  ];

  for (const mod of reactModules) {
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
// NODE.JS - 20 MODULES
// ==========================================
async function seedNodeCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "nodejs-backend",
    title: "Node.js & Express",
    description: "Build backend APIs with Node.js and Express. Learn REST APIs, databases, authentication, streaming, clustering, and microservices.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    language: "javascript",
    difficulty: "intermediate",
    totalLessons: 100,
    estimatedHours: 80,
    isPublished: true,
    createdAt: Date.now(),
  });

  const nodeModules = [
    // Basic modules 1-10
    { title: "Node.js Fundamentals", order: 1, summary: "Event loop, modules, and npm" },
    { title: "Core Modules", order: 2, summary: "fs, path, http, events" },
    { title: "NPM & Packages", order: 3, summary: "Package management" },
    { title: "Express Basics", order: 4, summary: "Server setup and routing" },
    { title: "RESTful API Design", order: 5, summary: "HTTP methods and REST" },
    { title: "Middleware", order: 6, summary: "Request processing pipeline" },
    { title: "MongoDB Integration", order: 7, summary: "Database operations" },
    { title: "Authentication", order: 8, summary: "JWT and security" },
    { title: "Error Handling", order: 9, summary: "Centralized error handling" },
    { title: "Deployment Basics", order: 10, summary: "Deploy your API" },
    // Advanced modules 11-20
    { title: "Streams", order: 11, summary: "Readable, Writable, Transform" },
    { title: "Child Processes", order: 12, summary: "spawn, exec, fork" },
    { title: "Clustering", order: 13, summary: "Multi-process, load balancing" },
    { title: "Worker Threads", order: 14, summary: "CPU-intensive tasks" },
    { title: "GraphQL", order: 15, summary: "Apollo Server, schema design" },
    { title: "WebSockets", order: 16, summary: "Socket.io, real-time" },
    { title: "Caching with Redis", order: 17, summary: "Redis integration" },
    { title: "Logging & Monitoring", order: 18, summary: "Winston, health checks" },
    { title: "Security", order: 19, summary: "Rate limiting, helmet, CORS" },
    { title: "Microservices", order: 20, summary: "Service patterns, API gateways" },
  ];

  for (const mod of nodeModules) {
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
// SQL - 20 MODULES
// ==========================================
async function seedSQLCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "sql-databases",
    title: "SQL & Databases",
    description: "Master SQL for database management. Learn queries, joins, window functions, CTEs, stored procedures, and query optimization.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    language: "sql",
    difficulty: "beginner",
    totalLessons: 100,
    estimatedHours: 65,
    isPublished: true,
    createdAt: Date.now(),
  });

  const sqlModules = [
    // Basic modules 1-10
    { title: "Database Fundamentals", order: 1, summary: "RDBMS and SQL basics" },
    { title: "Creating Tables", order: 2, summary: "DDL and data types" },
    { title: "Basic Queries", order: 3, summary: "SELECT, WHERE, ORDER BY" },
    { title: "Filtering & Operators", order: 4, summary: "AND, OR, IN, BETWEEN" },
    { title: "Aggregate Functions", order: 5, summary: "COUNT, SUM, AVG, GROUP BY" },
    { title: "Joins", order: 6, summary: "INNER, LEFT, RIGHT joins" },
    { title: "Subqueries", order: 7, summary: "Nested queries" },
    { title: "Data Manipulation", order: 8, summary: "INSERT, UPDATE, DELETE" },
    { title: "Indexes", order: 9, summary: "Performance with indexes" },
    { title: "Transactions", order: 10, summary: "ACID properties" },
    // Advanced modules 11-20
    { title: "Window Functions", order: 11, summary: "ROW_NUMBER, RANK, PARTITION BY" },
    { title: "Common Table Expressions", order: 12, summary: "CTEs and recursive queries" },
    { title: "Advanced Joins", order: 13, summary: "Self joins, CROSS APPLY" },
    { title: "Pivoting Data", order: 14, summary: "PIVOT and UNPIVOT" },
    { title: "Full-Text Search", order: 15, summary: "Text indexes and search" },
    { title: "JSON in SQL", order: 16, summary: "JSON functions and queries" },
    { title: "Stored Procedures", order: 17, summary: "Procedures and functions" },
    { title: "SQL Security", order: 18, summary: "Injection prevention" },
    { title: "Backup & Replication", order: 19, summary: "Data protection" },
    { title: "Query Optimization", order: 20, summary: "Execution plans, tuning" },
  ];

  for (const mod of sqlModules) {
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
// DSA - 20 MODULES
// ==========================================
async function seedDSACourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "data-structures-algorithms",
    title: "Data Structures & Algorithms",
    description: "Master DSA for coding interviews. Learn arrays, trees, graphs, advanced trees, heaps, tries, and dynamic programming.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    language: "python",
    difficulty: "intermediate",
    totalLessons: 100,
    estimatedHours: 100,
    isPublished: true,
    createdAt: Date.now(),
  });

  const dsaModules = [
    // Basic modules 1-10
    { title: "Complexity Analysis", order: 1, summary: "Big O notation" },
    { title: "Arrays & Strings", order: 2, summary: "Array operations and techniques" },
    { title: "Searching Algorithms", order: 3, summary: "Linear and binary search" },
    { title: "Sorting Algorithms", order: 4, summary: "Bubble, merge, quick sort" },
    { title: "Linked Lists", order: 5, summary: "Singly and doubly linked lists" },
    { title: "Stacks & Queues", order: 6, summary: "LIFO and FIFO structures" },
    { title: "Hash Tables", order: 7, summary: "Hashing and collision handling" },
    { title: "Binary Trees", order: 8, summary: "Tree traversals" },
    { title: "Binary Search Trees", order: 9, summary: "BST operations" },
    { title: "Basic Graphs", order: 10, summary: "BFS and DFS" },
    // Advanced modules 11-20
    { title: "AVL Trees", order: 11, summary: "Self-balancing, rotations" },
    { title: "Red-Black Trees", order: 12, summary: "Balanced tree properties" },
    { title: "Heaps & Priority Queues", order: 13, summary: "Heap operations" },
    { title: "Tries", order: 14, summary: "Prefix trees, autocomplete" },
    { title: "Disjoint Sets", order: 15, summary: "Union-Find, path compression" },
    { title: "Advanced Graph Algorithms", order: 16, summary: "Topological sort, SCCs" },
    { title: "String Algorithms", order: 17, summary: "KMP, Rabin-Karp" },
    { title: "Greedy Algorithms", order: 18, summary: "Activity selection, Huffman" },
    { title: "Backtracking", order: 19, summary: "N-Queens, Sudoku solver" },
    { title: "Advanced Dynamic Programming", order: 20, summary: "State optimization, bitmask DP" },
  ];

  for (const mod of dsaModules) {
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
// GIT - 20 MODULES
// ==========================================
async function seedGitCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "git-version-control",
    title: "Git & Version Control",
    description: "Master Git for version control. Learn branching, merging, GitHub workflows, submodules, hooks, and CI/CD integration.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    language: "bash",
    difficulty: "beginner",
    totalLessons: 100,
    estimatedHours: 50,
    isPublished: true,
    createdAt: Date.now(),
  });

  const gitModules = [
    // Basic modules 1-10
    { title: "Introduction to Git", order: 1, summary: "VCS and Git basics" },
    { title: "Basic Commands", order: 2, summary: "init, add, commit, status" },
    { title: "Working with Repos", order: 3, summary: "clone, remote, push, pull" },
    { title: "Branching", order: 4, summary: "Create and manage branches" },
    { title: "Merging", order: 5, summary: "Merge strategies" },
    { title: "Rebasing", order: 6, summary: "Rebase vs merge" },
    { title: "Undoing Changes", order: 7, summary: "reset, revert, stash" },
    { title: "GitHub Basics", order: 8, summary: "PRs and code reviews" },
    { title: "Conflict Resolution", order: 9, summary: "Resolve merge conflicts" },
    { title: "Git Workflows", order: 10, summary: "Gitflow, trunk-based" },
    // Advanced modules 11-20
    { title: "Advanced Branching", order: 11, summary: "Feature flags, release branches" },
    { title: "Git Submodules", order: 12, summary: "Managing dependencies" },
    { title: "Git Hooks", order: 13, summary: "Pre-commit, automation" },
    { title: "Git Internals", order: 14, summary: "Objects, refs, pack files" },
    { title: "Git LFS", order: 15, summary: "Large file storage" },
    { title: "Git Bisect", order: 16, summary: "Binary search for bugs" },
    { title: "Git Reflog", order: 17, summary: "Recovery, undo operations" },
    { title: "Git Worktrees", order: 18, summary: "Multiple working directories" },
    { title: "Git Aliases", order: 19, summary: "Custom commands" },
    { title: "CI/CD Integration", order: 20, summary: "GitHub Actions, GitLab CI" },
  ];

  for (const mod of gitModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nGit tracks changes in your code.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "bash" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()}.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "bash" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "# Git commands\necho 'Git'", solution: "echo 'Git'", testCases: [{ input: "", expectedOutput: "Git", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "bash" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "bash" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nGit challenge for ${mod.title.toLowerCase()}!`, codeTemplate: "# Solve\n", solution: "echo 'Done'", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "bash" },
    ]);
  }

  return courseId;
}

// ==========================================
// DOCKER - 20 MODULES
// ==========================================
async function seedDockerCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "docker-containers",
    title: "Docker & Containers",
    description: "Master containerization with Docker. Learn images, volumes, networking, Docker Compose, multi-stage builds, and container orchestration.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    language: "bash",
    difficulty: "intermediate",
    totalLessons: 100,
    estimatedHours: 70,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: Introduction to Docker & Containers
  await createModule(ctx, courseId, { title: "Introduction to Docker & Containers", order: 1, summary: "Understanding containers and Docker basics" }, [
    { title: "What are Containers?", type: "theory", content: "# Containers\n\nContainers are lightweight, isolated environments that package applications with their dependencies.\n\n## Benefits\n- Consistent environments\n- Fast startup\n- Resource efficient\n- Portable across platforms", order: 1, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Docker Architecture", type: "theory", content: "# Docker Architecture\n\n- **Docker Engine**: Runtime that runs containers\n- **Docker CLI**: Command line interface\n- **Docker Hub**: Registry for images\n- **Images**: Templates for containers\n- **Containers**: Running instances", order: 2, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Containers vs VMs", type: "theory", content: "# Containers vs VMs\n\n| Feature | Container | VM |\n|---------|-----------|----|\n| Boot | Seconds | Minutes |\n| Size | MBs | GBs |\n| Isolation | Process | Hardware |\n| Overhead | Minimal | Full OS |", order: 3, xpReward: 15, estimatedMinutes: 8, language: "bash" },
    { title: "Docker Hello World", type: "practice", content: "# Run Your First Container\n\nRun hello-world container.", codeTemplate: "# Run hello-world\necho 'docker run hello-world'", solution: "echo 'docker run hello-world'", testCases: [{ input: "", expectedOutput: "docker run hello-world", points: 30 }], order: 4, xpReward: 25, estimatedMinutes: 10, language: "bash" },
    { title: "Docker Components Quiz", type: "challenge", content: "# Docker Components\n\nIdentify the component that stores image templates.", codeTemplate: "# Answer: registry, engine, or cli?\necho 'registry'", solution: "echo 'registry'", testCases: [{ input: "", expectedOutput: "registry", points: 40 }], order: 5, xpReward: 35, estimatedMinutes: 10, language: "bash" },
  ]);

  // Module 2: Installing Docker & CLI Basics
  await createModule(ctx, courseId, { title: "Installing Docker & CLI Basics", order: 2, summary: "Setup Docker and learn essential commands" }, [
    { title: "Installing Docker", type: "theory", content: "# Install Docker\n\n**Linux:**\n```bash\ncurl -fsSL https://get.docker.com | sh\nsudo usermod -aG docker $USER\n```\n\n**Mac/Windows:** Download Docker Desktop", order: 1, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Docker CLI Overview", type: "theory", content: "# Essential Commands\n\n```bash\ndocker version     # Version info\ndocker info        # System info\ndocker --help      # Command help\ndocker ps          # List containers\ndocker images      # List images\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Running Containers", type: "theory", content: "# docker run\n\n```bash\ndocker run nginx              # Run nginx\ndocker run -d nginx           # Detached mode\ndocker run -it ubuntu bash    # Interactive\ndocker run --name web nginx   # Named container\n```", order: 3, xpReward: 20, estimatedMinutes: 12, language: "bash" },
    { title: "Container Commands", type: "practice", content: "# Container Operations\n\nWrite command to stop all running containers.", codeTemplate: "# Stop all containers\necho 'docker stop $(docker ps -q)'", solution: "echo 'docker stop $(docker ps -q)'", testCases: [{ input: "", expectedOutput: "docker stop $(docker ps -q)", points: 35 }], order: 4, xpReward: 30, estimatedMinutes: 12, language: "bash" },
    { title: "CLI Challenge", type: "challenge", content: "# Remove All Stopped Containers\n\nWrite the prune command.", codeTemplate: "# Prune containers\necho 'docker container prune'", solution: "echo 'docker container prune'", testCases: [{ input: "", expectedOutput: "docker container prune", points: 40 }], order: 5, xpReward: 40, estimatedMinutes: 12, language: "bash" },
  ]);

  // Module 3: Docker Images & Registries
  await createModule(ctx, courseId, { title: "Docker Images & Registries", order: 3, summary: "Work with images and Docker Hub" }, [
    { title: "Understanding Images", type: "theory", content: "# Docker Images\n\nImages are read-only templates with layered filesystems.\n\n```bash\ndocker pull nginx:latest\ndocker images\ndocker image inspect nginx\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Image Tags", type: "theory", content: "# Image Tags\n\n```bash\nnginx:latest      # Latest version\nnginx:1.21        # Specific version\nnginx:alpine      # Alpine-based\nmyapp:v1.0.0      # Semantic versioning\n```\n\nAlways use specific tags in production!", order: 2, xpReward: 15, estimatedMinutes: 8, language: "bash" },
    { title: "Docker Hub", type: "theory", content: "# Docker Hub\n\n```bash\ndocker login\ndocker pull username/image\ndocker push username/image:tag\ndocker search nginx\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Pull and Tag", type: "practice", content: "# Tag an Image\n\nTag nginx as myregistry/nginx:v1.", codeTemplate: "# Tag image\necho 'docker tag nginx myregistry/nginx:v1'", solution: "echo 'docker tag nginx myregistry/nginx:v1'", testCases: [{ input: "", expectedOutput: "docker tag nginx myregistry/nginx:v1", points: 35 }], order: 4, xpReward: 30, estimatedMinutes: 10, language: "bash" },
    { title: "Image Layers", type: "challenge", content: "# View Image History\n\nCommand to see image layers.", codeTemplate: "# Image history\necho 'docker history nginx'", solution: "echo 'docker history nginx'", testCases: [{ input: "", expectedOutput: "docker history nginx", points: 40 }], order: 5, xpReward: 40, estimatedMinutes: 10, language: "bash" },
  ]);

  // Module 4: Dockerfile Fundamentals
  await createModule(ctx, courseId, { title: "Dockerfile Fundamentals", order: 4, summary: "Build custom images with Dockerfile" }, [
    { title: "Dockerfile Basics", type: "theory", content: "# Dockerfile\n\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\n```", order: 1, xpReward: 20, estimatedMinutes: 12, language: "bash" },
    { title: "Dockerfile Instructions", type: "theory", content: "# Key Instructions\n\n- `FROM`: Base image\n- `WORKDIR`: Set working directory\n- `COPY/ADD`: Copy files\n- `RUN`: Execute commands\n- `ENV`: Set environment variables\n- `EXPOSE`: Document ports\n- `CMD/ENTRYPOINT`: Default command", order: 2, xpReward: 20, estimatedMinutes: 12, language: "bash" },
    { title: "Build Images", type: "theory", content: "# Building Images\n\n```bash\ndocker build -t myapp:v1 .\ndocker build -t myapp:v1 -f Dockerfile.prod .\ndocker build --no-cache -t myapp:v1 .\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Write Dockerfile", type: "practice", content: "# Python Dockerfile\n\nWrite FROM and WORKDIR for Python app.", codeTemplate: "# Python Dockerfile start\necho 'FROM python:3.11-slim'", solution: "echo 'FROM python:3.11-slim'", testCases: [{ input: "", expectedOutput: "FROM python:3.11-slim", points: 35 }], order: 4, xpReward: 35, estimatedMinutes: 12, language: "bash" },
    { title: "Optimize Dockerfile", type: "challenge", content: "# Layer Caching\n\nWhat should be copied first for better caching?", codeTemplate: "# Answer: requirements or app code?\necho 'requirements'", solution: "echo 'requirements'", testCases: [{ input: "", expectedOutput: "requirements", points: 45 }], order: 5, xpReward: 45, estimatedMinutes: 12, language: "bash" },
  ]);

  // Module 5: Container Lifecycle Management
  await createModule(ctx, courseId, { title: "Container Lifecycle Management", order: 5, summary: "Manage container states and resources" }, [
    { title: "Container States", type: "theory", content: "# Container Lifecycle\n\n- Created → Running → Paused → Stopped → Removed\n\n```bash\ndocker start container_id\ndocker stop container_id\ndocker pause container_id\ndocker rm container_id\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Container Logs", type: "theory", content: "# Viewing Logs\n\n```bash\ndocker logs container_id\ndocker logs -f container_id    # Follow\ndocker logs --tail 100 myapp   # Last 100 lines\ndocker logs --since 1h myapp   # Last hour\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Exec into Containers", type: "theory", content: "# Execute Commands\n\n```bash\ndocker exec -it container_id bash\ndocker exec container_id ls /app\ndocker exec -u root container_id apt update\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "bash" },
    { title: "Resource Limits", type: "practice", content: "# Limit Memory\n\nRun container with 512MB memory limit.", codeTemplate: "# Memory limit\necho 'docker run -m 512m nginx'", solution: "echo 'docker run -m 512m nginx'", testCases: [{ input: "", expectedOutput: "docker run -m 512m nginx", points: 35 }], order: 4, xpReward: 35, estimatedMinutes: 12, language: "bash" },
    { title: "Stats and Top", type: "challenge", content: "# Monitor Resources\n\nCommand to see live resource usage.", codeTemplate: "# Live stats\necho 'docker stats'", solution: "echo 'docker stats'", testCases: [{ input: "", expectedOutput: "docker stats", points: 40 }], order: 5, xpReward: 40, estimatedMinutes: 10, language: "bash" },
  ]);

  // Module 6-10: Docker fundamentals continued
  const dockerBasicModules = [
    { title: "Docker Volumes & Data Persistence", order: 6, summary: "Persist data with volumes and bind mounts" },
    { title: "Docker Networking Basics", order: 7, summary: "Bridge, host, and overlay networks" },
    { title: "Port Mapping & Container Communication", order: 8, summary: "Expose and map container ports" },
    { title: "Environment Variables & Configuration", order: 9, summary: "Configure containers with env vars" },
    { title: "Docker Compose Introduction", order: 10, summary: "Multi-container applications" },
  ];

  for (const mod of dockerBasicModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nDocker enables containerized applications.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "bash" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in Docker.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "bash" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "# Docker command\necho 'Docker'", solution: "echo 'Docker'", testCases: [{ input: "", expectedOutput: "Docker", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "bash" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "bash" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "# Solve\necho 'Done'", solution: "echo 'Done'", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "bash" },
    ]);
  }

  // Module 11-20: Advanced Docker
  const dockerAdvancedModules = [
    { title: "Multi-Stage Builds", order: 11, summary: "Optimize images with multi-stage builds" },
    { title: "Docker Compose Advanced", order: 12, summary: "Services, networks, volumes in Compose" },
    { title: "Docker Security Best Practices", order: 13, summary: "Secure containers and images" },
    { title: "Container Orchestration Concepts", order: 14, summary: "Introduction to orchestration" },
    { title: "Docker Swarm Basics", order: 15, summary: "Native Docker clustering" },
    { title: "Container Logging & Monitoring", order: 16, summary: "Centralized logging, health checks" },
    { title: "Docker Registry & Image Management", order: 17, summary: "Private registries, image scanning" },
    { title: "CI/CD with Docker", order: 18, summary: "Docker in CI/CD pipelines" },
    { title: "Kubernetes Introduction", order: 19, summary: "K8s pods, deployments, services" },
    { title: "Production Deployment Patterns", order: 20, summary: "Best practices for production" },
  ];

  for (const mod of dockerAdvancedModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nAdvanced Docker concepts.`, order: 1, xpReward: 20, estimatedMinutes: 12, language: "bash" },
      { title: `${mod.title} - Core Concepts`, type: "theory", content: `# Core Concepts\n\nDeep dive into ${mod.title.toLowerCase()}.`, order: 2, xpReward: 20, estimatedMinutes: 12, language: "bash" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "# Your command\necho 'Advanced Docker'", solution: "echo 'Advanced Docker'", testCases: [{ input: "", expectedOutput: "Advanced Docker", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "bash" },
      { title: `${mod.title} - Advanced Topics`, type: "theory", content: `# Advanced Topics\n\nMastering ${mod.title.toLowerCase()}.`, order: 4, xpReward: 25, estimatedMinutes: 15, language: "bash" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Final Challenge\n\nTest all ${mod.title.toLowerCase()} skills!`, codeTemplate: "# Solve\necho 'Mastered'", solution: "echo 'Mastered'", testCases: [{ input: "", expectedOutput: "Mastered", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "bash" },
    ]);
  }

  return courseId;
}

// ==========================================
// FLUTTER - 20 MODULES
// ==========================================
async function seedFlutterCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "flutter-development",
    title: "Flutter & Dart",
    description: "Build cross-platform mobile apps with Flutter. Learn Dart, widgets, state management, Firebase integration, and deploy to iOS and Android.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    language: "dart",
    difficulty: "intermediate",
    totalLessons: 100,
    estimatedHours: 85,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: Introduction to Flutter & Dart
  await createModule(ctx, courseId, { title: "Introduction to Flutter & Dart", order: 1, summary: "Getting started with Flutter and Dart" }, [
    { title: "What is Flutter?", type: "theory", content: "# Flutter\n\nFlutter is Google's UI toolkit for building natively compiled apps for mobile, web, and desktop from a single codebase.\n\n## Benefits\n- Single codebase\n- Hot reload\n- Beautiful UIs\n- Native performance", order: 1, xpReward: 15, estimatedMinutes: 10, language: "dart" },
    { title: "Flutter Architecture", type: "theory", content: "# Flutter Architecture\n\n- **Widgets**: Building blocks of UI\n- **Element Tree**: Widget instances\n- **Render Tree**: Layout and painting\n- **Skia**: Graphics engine", order: 2, xpReward: 15, estimatedMinutes: 10, language: "dart" },
    { title: "Setup Development", type: "theory", content: "# Setup\n\n```bash\n# Install Flutter SDK\nflutter doctor\nflutter create my_app\ncd my_app\nflutter run\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "dart" },
    { title: "Hello Flutter", type: "practice", content: "# First Flutter App\n\nPrint 'Hello Flutter' using Dart.", codeTemplate: "void main() {\n  // Print hello\n}", solution: "void main() {\n  print('Hello Flutter');\n}", testCases: [{ input: "", expectedOutput: "Hello Flutter", points: 30 }], order: 4, xpReward: 25, estimatedMinutes: 10, language: "dart" },
    { title: "Widget Types", type: "challenge", content: "# Widget Types\n\nWhat are the two main types of widgets?", codeTemplate: "// Answer\nprint('Stateless and Stateful');", solution: "print('Stateless and Stateful');", testCases: [{ input: "", expectedOutput: "Stateless and Stateful", points: 35 }], order: 5, xpReward: 35, estimatedMinutes: 10, language: "dart" },
  ]);

  // Module 2: Dart Language Fundamentals
  await createModule(ctx, courseId, { title: "Dart Language Fundamentals", order: 2, summary: "Learn Dart programming basics" }, [
    { title: "Variables & Types", type: "theory", content: "# Dart Variables\n\n```dart\nString name = 'Alice';\nint age = 25;\ndouble height = 5.9;\nbool isStudent = true;\nvar inferred = 'auto type';\nfinal constant = 'immutable';\n```", order: 1, xpReward: 15, estimatedMinutes: 10, language: "dart" },
    { title: "Functions", type: "theory", content: "# Dart Functions\n\n```dart\nint add(int a, int b) => a + b;\n\nvoid greet({required String name}) {\n  print('Hello, $name!');\n}\n\nvar multiply = (int a, int b) => a * b;\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "dart" },
    { title: "Classes", type: "theory", content: "# Dart Classes\n\n```dart\nclass Person {\n  final String name;\n  int age;\n  \n  Person(this.name, this.age);\n  \n  void greet() => print('Hi, I\\'m $name');\n}\n```", order: 3, xpReward: 20, estimatedMinutes: 12, language: "dart" },
    { title: "Calculator Function", type: "practice", content: "# Create Calculator\n\nCreate add function that returns sum.", codeTemplate: "int add(int a, int b) {\n  // Return sum\n}\nprint(add(5, 3));", solution: "int add(int a, int b) {\n  return a + b;\n}\nprint(add(5, 3));", testCases: [{ input: "", expectedOutput: "8", points: 35 }], order: 4, xpReward: 35, estimatedMinutes: 12, language: "dart" },
    { title: "Null Safety", type: "challenge", content: "# Null Safety\n\nDeclare nullable string and use null-aware operator.", codeTemplate: "String? name;\nprint(name ?? 'Unknown');", solution: "String? name;\nprint(name ?? 'Unknown');", testCases: [{ input: "", expectedOutput: "Unknown", points: 40 }], order: 5, xpReward: 45, estimatedMinutes: 12, language: "dart" },
  ]);

  // Module 3-10: Flutter fundamentals
  const flutterBasicModules = [
    { title: "Flutter Project Structure", order: 3, summary: "Understanding Flutter project layout" },
    { title: "Widgets Fundamentals", order: 4, summary: "Core widget concepts and composition" },
    { title: "StatelessWidget vs StatefulWidget", order: 5, summary: "Choosing the right widget type" },
    { title: "Basic Layouts", order: 6, summary: "Row, Column, Stack, Container" },
    { title: "Input Widgets & Forms", order: 7, summary: "TextField, buttons, form validation" },
    { title: "Navigation & Routing", order: 8, summary: "Navigate between screens" },
    { title: "Assets & Images", order: 9, summary: "Load and display assets" },
    { title: "Styling & Themes", order: 10, summary: "ThemeData, custom styles" },
  ];

  for (const mod of flutterBasicModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nFlutter makes beautiful apps easy.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "dart" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in Flutter.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "dart" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "void main() {\n  print('Flutter');\n}", solution: "void main() {\n  print('Flutter');\n}", testCases: [{ input: "", expectedOutput: "Flutter", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "dart" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "dart" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\nprint('Done');", solution: "print('Done');", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "dart" },
    ]);
  }

  // Module 11-20: Advanced Flutter
  const flutterAdvancedModules = [
    { title: "State Management - Provider", order: 11, summary: "Provider package for state" },
    { title: "State Management - Riverpod/Bloc", order: 12, summary: "Advanced state solutions" },
    { title: "HTTP Requests & APIs", order: 13, summary: "Fetch and post data" },
    { title: "Local Storage & SQLite", order: 14, summary: "Persist data locally" },
    { title: "Firebase Integration", order: 15, summary: "Auth, Firestore, Storage" },
    { title: "Animations & Transitions", order: 16, summary: "Implicit and explicit animations" },
    { title: "Custom Widgets & Painting", order: 17, summary: "CustomPaint, create widgets" },
    { title: "Platform Channels", order: 18, summary: "Native code integration" },
    { title: "Testing Flutter Apps", order: 19, summary: "Unit, widget, integration tests" },
    { title: "App Deployment", order: 20, summary: "Deploy to iOS & Android" },
  ];

  for (const mod of flutterAdvancedModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nAdvanced Flutter development.`, order: 1, xpReward: 20, estimatedMinutes: 12, language: "dart" },
      { title: `${mod.title} - Core Concepts`, type: "theory", content: `# Core Concepts\n\nDeep dive into ${mod.title.toLowerCase()}.`, order: 2, xpReward: 20, estimatedMinutes: 12, language: "dart" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "void main() {\n  print('Advanced Flutter');\n}", solution: "void main() {\n  print('Advanced Flutter');\n}", testCases: [{ input: "", expectedOutput: "Advanced Flutter", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "dart" },
      { title: `${mod.title} - Advanced Topics`, type: "theory", content: `# Advanced Topics\n\nMastering ${mod.title.toLowerCase()}.`, order: 4, xpReward: 25, estimatedMinutes: 15, language: "dart" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Final Challenge\n\nTest all ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\nprint('Mastered');", solution: "print('Mastered');", testCases: [{ input: "", expectedOutput: "Mastered", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "dart" },
    ]);
  }

  return courseId;
}

// ==========================================
// RUST - 20 MODULES
// ==========================================
async function seedRustCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "rust-programming",
    title: "Rust Programming",
    description: "Master Rust for systems programming. Learn ownership, borrowing, lifetimes, traits, async programming, and build safe, fast applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    language: "rust",
    difficulty: "intermediate",
    totalLessons: 100,
    estimatedHours: 90,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: Introduction to Rust
  await createModule(ctx, courseId, { title: "Introduction to Rust", order: 1, summary: "Getting started with Rust" }, [
    { title: "What is Rust?", type: "theory", content: "# Rust\n\nRust is a systems programming language focused on safety, speed, and concurrency.\n\n## Benefits\n- Memory safety without GC\n- Zero-cost abstractions\n- Thread safety\n- Modern tooling (cargo)", order: 1, xpReward: 15, estimatedMinutes: 10, language: "rust" },
    { title: "Setup Rust", type: "theory", content: "# Install Rust\n\n```bash\ncurl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh\nrustc --version\ncargo --version\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "rust" },
    { title: "Hello Rust", type: "theory", content: "# Hello World\n\n```rust\nfn main() {\n    println!(\"Hello, Rust!\");\n}\n```\n\n`println!` is a macro (note the `!`).", order: 3, xpReward: 15, estimatedMinutes: 8, language: "rust" },
    { title: "First Program", type: "practice", content: "# Print Hello\n\nPrint 'Hello, Rust!' to console.", codeTemplate: "fn main() {\n    // Print hello\n}", solution: "fn main() {\n    println!(\"Hello, Rust!\");\n}", testCases: [{ input: "", expectedOutput: "Hello, Rust!", points: 30 }], order: 4, xpReward: 25, estimatedMinutes: 10, language: "rust" },
    { title: "Cargo Basics", type: "challenge", content: "# Cargo Commands\n\nWhat command creates a new Rust project?", codeTemplate: "// Command: cargo ???\nprintln!(\"cargo new\");", solution: "println!(\"cargo new\");", testCases: [{ input: "", expectedOutput: "cargo new", points: 35 }], order: 5, xpReward: 35, estimatedMinutes: 10, language: "rust" },
  ]);

  // Module 2: Variables & Data Types
  await createModule(ctx, courseId, { title: "Variables & Data Types", order: 2, summary: "Rust variables, mutability, and types" }, [
    { title: "Variables", type: "theory", content: "# Variables\n\n```rust\nlet x = 5;           // Immutable\nlet mut y = 10;      // Mutable\ny = 20;              // OK\nconst MAX: u32 = 100; // Constant\n```\n\nVariables are immutable by default!", order: 1, xpReward: 15, estimatedMinutes: 10, language: "rust" },
    { title: "Data Types", type: "theory", content: "# Scalar Types\n\n```rust\nlet i: i32 = -42;    // Signed integer\nlet u: u64 = 42;     // Unsigned\nlet f: f64 = 3.14;   // Float\nlet b: bool = true;  // Boolean\nlet c: char = 'A';   // Character\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "rust" },
    { title: "Compound Types", type: "theory", content: "# Tuples & Arrays\n\n```rust\nlet tup: (i32, f64, u8) = (500, 6.4, 1);\nlet (x, y, z) = tup;  // Destructuring\n\nlet arr: [i32; 5] = [1, 2, 3, 4, 5];\nlet first = arr[0];\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "rust" },
    { title: "Type Practice", type: "practice", content: "# Create Variables\n\nCreate mutable integer, add 5, print.", codeTemplate: "fn main() {\n    // Create mut x = 10, add 5, print\n}", solution: "fn main() {\n    let mut x = 10;\n    x += 5;\n    println!(\"{}\", x);\n}", testCases: [{ input: "", expectedOutput: "15", points: 35 }], order: 4, xpReward: 35, estimatedMinutes: 12, language: "rust" },
    { title: "Shadowing", type: "challenge", content: "# Variable Shadowing\n\nShadow x from 5 to its string form.", codeTemplate: "fn main() {\n    let x = 5;\n    let x = x.to_string();\n    println!(\"{}\", x);\n}", solution: "fn main() {\n    let x = 5;\n    let x = x.to_string();\n    println!(\"{}\", x);\n}", testCases: [{ input: "", expectedOutput: "5", points: 40 }], order: 5, xpReward: 45, estimatedMinutes: 12, language: "rust" },
  ]);

  // Module 3-10: Rust fundamentals
  const rustBasicModules = [
    { title: "Functions & Control Flow", order: 3, summary: "Functions, if/else, loops" },
    { title: "Ownership Fundamentals", order: 4, summary: "Rust's ownership system" },
    { title: "Borrowing & References", order: 5, summary: "References and borrowing rules" },
    { title: "Structs & Enums", order: 6, summary: "Custom data types" },
    { title: "Pattern Matching", order: 7, summary: "match expressions, if let" },
    { title: "Collections", order: 8, summary: "Vec, String, HashMap" },
    { title: "Error Handling", order: 9, summary: "Result, Option, panic" },
    { title: "Modules & Packages", order: 10, summary: "Code organization, crates" },
  ];

  for (const mod of rustBasicModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nRust guarantees memory safety.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "rust" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in Rust.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "rust" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "fn main() {\n    println!(\"Rust\");\n}", solution: "fn main() {\n    println!(\"Rust\");\n}", testCases: [{ input: "", expectedOutput: "Rust", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "rust" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "rust" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "fn main() {\n    // Solve\n}", solution: "fn main() {\n    println!(\"Done\");\n}", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "rust" },
    ]);
  }

  // Module 11-20: Advanced Rust
  const rustAdvancedModules = [
    { title: "Lifetimes", order: 11, summary: "Reference lifetimes and annotations" },
    { title: "Traits & Generics", order: 12, summary: "Generic programming, trait bounds" },
    { title: "Closures & Iterators", order: 13, summary: "Functional programming in Rust" },
    { title: "Smart Pointers", order: 14, summary: "Box, Rc, RefCell, Arc" },
    { title: "Concurrency with Threads", order: 15, summary: "Threads, message passing, mutex" },
    { title: "Async Programming", order: 16, summary: "async/await, tokio, futures" },
    { title: "Unsafe Rust", order: 17, summary: "Raw pointers, unsafe blocks" },
    { title: "Macros", order: 18, summary: "Declarative and procedural macros" },
    { title: "Testing in Rust", order: 19, summary: "Unit tests, integration tests" },
    { title: "Building CLI Applications", order: 20, summary: "CLI tools with clap, structopt" },
  ];

  for (const mod of rustAdvancedModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nAdvanced Rust programming.`, order: 1, xpReward: 20, estimatedMinutes: 12, language: "rust" },
      { title: `${mod.title} - Core Concepts`, type: "theory", content: `# Core Concepts\n\nDeep dive into ${mod.title.toLowerCase()}.`, order: 2, xpReward: 20, estimatedMinutes: 12, language: "rust" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "fn main() {\n    println!(\"Advanced Rust\");\n}", solution: "fn main() {\n    println!(\"Advanced Rust\");\n}", testCases: [{ input: "", expectedOutput: "Advanced Rust", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "rust" },
      { title: `${mod.title} - Advanced Topics`, type: "theory", content: `# Advanced Topics\n\nMastering ${mod.title.toLowerCase()}.`, order: 4, xpReward: 25, estimatedMinutes: 15, language: "rust" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Final Challenge\n\nTest all ${mod.title.toLowerCase()} skills!`, codeTemplate: "fn main() {\n    // Solve\n}", solution: "fn main() {\n    println!(\"Mastered\");\n}", testCases: [{ input: "", expectedOutput: "Mastered", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "rust" },
    ]);
  }

  return courseId;
}

// ==========================================
// JAVA - 20 MODULES
// ==========================================
async function seedJavaCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "java-programming",
    title: "Java Programming",
    description: "Master Java from fundamentals to enterprise development. Learn OOP, collections, streams, multithreading, and Spring Boot basics.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    language: "java",
    difficulty: "beginner",
    totalLessons: 100,
    estimatedHours: 85,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: Introduction to Java & JVM
  await createModule(ctx, courseId, { title: "Introduction to Java & JVM", order: 1, summary: "Getting started with Java" }, [
    { title: "What is Java?", type: "theory", content: "# Java\n\nJava is a class-based, object-oriented language designed for portability.\n\n## Key Features\n- Write Once, Run Anywhere (WORA)\n- Strongly typed\n- Automatic memory management\n- Rich standard library", order: 1, xpReward: 15, estimatedMinutes: 10, language: "java" },
    { title: "JVM & JDK", type: "theory", content: "# Java Platform\n\n- **JVM**: Java Virtual Machine (executes bytecode)\n- **JRE**: JVM + core libraries\n- **JDK**: JRE + development tools\n\n```bash\njava -version\njavac HelloWorld.java\njava HelloWorld\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "java" },
    { title: "Hello World", type: "theory", content: "# Hello World\n\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "java" },
    { title: "First Program", type: "practice", content: "# Print Hello\n\nPrint 'Hello, Java!' to console.", codeTemplate: "public class Main {\n    public static void main(String[] args) {\n        // Print hello\n    }\n}", solution: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}", testCases: [{ input: "", expectedOutput: "Hello, Java!", points: 30 }], order: 4, xpReward: 25, estimatedMinutes: 10, language: "java" },
    { title: "JVM Components", type: "challenge", content: "# JVM Memory\n\nWhere are objects stored in JVM?", codeTemplate: "// Answer: stack or heap?\nSystem.out.println(\"heap\");", solution: "System.out.println(\"heap\");", testCases: [{ input: "", expectedOutput: "heap", points: 35 }], order: 5, xpReward: 35, estimatedMinutes: 10, language: "java" },
  ]);

  // Module 2-10: Java fundamentals
  const javaBasicModules = [
    { title: "Variables & Data Types", order: 2, summary: "Primitive types and variables" },
    { title: "Operators & Control Flow", order: 3, summary: "Operators, if/else, switch" },
    { title: "Methods & Scope", order: 4, summary: "Method declaration and parameters" },
    { title: "Arrays & Strings", order: 5, summary: "Arrays and String manipulation" },
    { title: "Object-Oriented Programming Basics", order: 6, summary: "Classes and objects intro" },
    { title: "Classes & Objects", order: 7, summary: "Constructors, fields, methods" },
    { title: "Inheritance & Polymorphism", order: 8, summary: "Extends, overriding, super" },
    { title: "Interfaces & Abstract Classes", order: 9, summary: "Abstraction in Java" },
    { title: "Exception Handling", order: 10, summary: "try-catch, throws, custom exceptions" },
  ];

  for (const mod of javaBasicModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nJava is used by millions of developers.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "java" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in Java.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "java" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java\");\n    }\n}", solution: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java\");\n    }\n}", testCases: [{ input: "", expectedOutput: "Java", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "java" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "java" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\n", solution: "System.out.println(\"Done\");", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "java" },
    ]);
  }

  // Module 11-20: Advanced Java
  const javaAdvancedModules = [
    { title: "Collections Framework", order: 11, summary: "List, Set, Map, Queue" },
    { title: "Generics", order: 12, summary: "Type parameters, bounds" },
    { title: "Lambda Expressions", order: 13, summary: "Functional interfaces, lambdas" },
    { title: "Streams API", order: 14, summary: "Stream operations, collectors" },
    { title: "File I/O & NIO", order: 15, summary: "File operations, NIO.2" },
    { title: "Multithreading Basics", order: 16, summary: "Threads, Runnable, synchronization" },
    { title: "Concurrency Utilities", order: 17, summary: "ExecutorService, concurrent collections" },
    { title: "JDBC & Database Access", order: 18, summary: "Connect to databases" },
    { title: "Maven & Build Tools", order: 19, summary: "Project management, dependencies" },
    { title: "Spring Boot Introduction", order: 20, summary: "REST APIs with Spring Boot" },
  ];

  for (const mod of javaAdvancedModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nAdvanced Java programming.`, order: 1, xpReward: 20, estimatedMinutes: 12, language: "java" },
      { title: `${mod.title} - Core Concepts`, type: "theory", content: `# Core Concepts\n\nDeep dive into ${mod.title.toLowerCase()}.`, order: 2, xpReward: 20, estimatedMinutes: 12, language: "java" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Advanced Java\");\n    }\n}", solution: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Advanced Java\");\n    }\n}", testCases: [{ input: "", expectedOutput: "Advanced Java", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "java" },
      { title: `${mod.title} - Advanced Topics`, type: "theory", content: `# Advanced Topics\n\nMastering ${mod.title.toLowerCase()}.`, order: 4, xpReward: 25, estimatedMinutes: 15, language: "java" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Final Challenge\n\nTest all ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\n", solution: "System.out.println(\"Mastered\");", testCases: [{ input: "", expectedOutput: "Mastered", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "java" },
    ]);
  }

  return courseId;
}

// ==========================================
// C# - 20 MODULES
// ==========================================
async function seedCSharpCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "csharp-programming",
    title: "C# Programming",
    description: "Master C# and .NET development. Learn OOP, LINQ, async programming, Entity Framework Core, and ASP.NET Core basics.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    language: "csharp",
    difficulty: "beginner",
    totalLessons: 100,
    estimatedHours: 80,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: Introduction to C# & .NET
  await createModule(ctx, courseId, { title: "Introduction to C# & .NET", order: 1, summary: "Getting started with C# and .NET" }, [
    { title: "What is C#?", type: "theory", content: "# C#\n\nC# is a modern, object-oriented language developed by Microsoft for the .NET platform.\n\n## Features\n- Type-safe\n- Component-oriented\n- Cross-platform (.NET Core/5+)\n- Modern language features", order: 1, xpReward: 15, estimatedMinutes: 10, language: "csharp" },
    { title: ".NET Platform", type: "theory", content: "# .NET Platform\n\n- **.NET Framework**: Windows-only (legacy)\n- **.NET Core/5+**: Cross-platform, modern\n- **CLR**: Common Language Runtime\n- **BCL**: Base Class Library\n\n```bash\ndotnet --version\ndotnet new console\ndotnet run\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "csharp" },
    { title: "Hello World", type: "theory", content: "# Hello World\n\n```csharp\nusing System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine(\"Hello, C#!\");\n    }\n}\n```\n\n.NET 6+ top-level statements:\n```csharp\nConsole.WriteLine(\"Hello!\");\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "csharp" },
    { title: "First Program", type: "practice", content: "# Print Hello\n\nPrint 'Hello, C#!' to console.", codeTemplate: "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        // Print hello\n    }\n}", solution: "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine(\"Hello, C#!\");\n    }\n}", testCases: [{ input: "", expectedOutput: "Hello, C#!", points: 30 }], order: 4, xpReward: 25, estimatedMinutes: 10, language: "csharp" },
    { title: ".NET Components", type: "challenge", content: "# CLR Purpose\n\nWhat does CLR stand for?", codeTemplate: "// Answer\nConsole.WriteLine(\"Common Language Runtime\");", solution: "Console.WriteLine(\"Common Language Runtime\");", testCases: [{ input: "", expectedOutput: "Common Language Runtime", points: 35 }], order: 5, xpReward: 35, estimatedMinutes: 10, language: "csharp" },
  ]);

  // Module 2-10: C# fundamentals
  const csharpBasicModules = [
    { title: "Variables & Data Types", order: 2, summary: "Value types, reference types" },
    { title: "Operators & Control Flow", order: 3, summary: "Operators, if/else, switch expressions" },
    { title: "Methods & Parameters", order: 4, summary: "Methods, ref, out, params" },
    { title: "Arrays & Collections", order: 5, summary: "Arrays, List<T>, Dictionary" },
    { title: "Object-Oriented Programming", order: 6, summary: "Classes, objects, properties" },
    { title: "Inheritance & Polymorphism", order: 7, summary: "Inheritance, virtual, override" },
    { title: "Interfaces & Abstract Classes", order: 8, summary: "Abstraction patterns" },
    { title: "Exception Handling", order: 9, summary: "try-catch, custom exceptions" },
    { title: "File I/O", order: 10, summary: "File and stream operations" },
  ];

  for (const mod of csharpBasicModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nC# powers enterprise applications.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "csharp" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in C#.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "csharp" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine(\"C#\");\n    }\n}", solution: "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine(\"C#\");\n    }\n}", testCases: [{ input: "", expectedOutput: "C#", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "csharp" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "csharp" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\n", solution: "Console.WriteLine(\"Done\");", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "csharp" },
    ]);
  }

  // Module 11-20: Advanced C#
  const csharpAdvancedModules = [
    { title: "LINQ Fundamentals", order: 11, summary: "Query syntax, method syntax" },
    { title: "Delegates & Events", order: 12, summary: "Delegates, events, Action, Func" },
    { title: "Async/Await Programming", order: 13, summary: "Task, async, await patterns" },
    { title: "Generics", order: 14, summary: "Generic types, constraints" },
    { title: "Reflection & Attributes", order: 15, summary: "Runtime type inspection" },
    { title: "Entity Framework Core", order: 16, summary: "ORM, migrations, LINQ to Entities" },
    { title: "ASP.NET Core Basics", order: 17, summary: "Web apps and middleware" },
    { title: "Web API Development", order: 18, summary: "REST APIs with ASP.NET" },
    { title: "Dependency Injection", order: 19, summary: "DI container, services" },
    { title: "Unit Testing with xUnit", order: 20, summary: "Testing patterns in .NET" },
  ];

  for (const mod of csharpAdvancedModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nAdvanced C# development.`, order: 1, xpReward: 20, estimatedMinutes: 12, language: "csharp" },
      { title: `${mod.title} - Core Concepts`, type: "theory", content: `# Core Concepts\n\nDeep dive into ${mod.title.toLowerCase()}.`, order: 2, xpReward: 20, estimatedMinutes: 12, language: "csharp" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine(\"Advanced C#\");\n    }\n}", solution: "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine(\"Advanced C#\");\n    }\n}", testCases: [{ input: "", expectedOutput: "Advanced C#", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "csharp" },
      { title: `${mod.title} - Advanced Topics`, type: "theory", content: `# Advanced Topics\n\nMastering ${mod.title.toLowerCase()}.`, order: 4, xpReward: 25, estimatedMinutes: 15, language: "csharp" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Final Challenge\n\nTest all ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\n", solution: "Console.WriteLine(\"Mastered\");", testCases: [{ input: "", expectedOutput: "Mastered", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "csharp" },
    ]);
  }

  return courseId;
}

// ==========================================
// GO - 20 MODULES
// ==========================================
async function seedGoCourse(ctx: any) {
  const courseId = await ctx.db.insert("courses", {
    slug: "go-programming",
    title: "Go Programming",
    description: "Master Go for backend development. Learn goroutines, channels, interfaces, concurrency patterns, and build scalable web services.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    language: "go",
    difficulty: "intermediate",
    totalLessons: 100,
    estimatedHours: 75,
    isPublished: true,
    createdAt: Date.now(),
  });

  // Module 1: Introduction to Go
  await createModule(ctx, courseId, { title: "Introduction to Go", order: 1, summary: "Getting started with Go" }, [
    { title: "What is Go?", type: "theory", content: "# Go (Golang)\n\nGo is a statically typed, compiled language designed at Google for simplicity and efficiency.\n\n## Key Features\n- Fast compilation\n- Built-in concurrency\n- Garbage collected\n- Simple syntax", order: 1, xpReward: 15, estimatedMinutes: 10, language: "go" },
    { title: "Install Go", type: "theory", content: "# Setup\n\n```bash\n# Install from golang.org\ngo version\ngo env\n\n# Create module\ngo mod init myproject\n```", order: 2, xpReward: 15, estimatedMinutes: 10, language: "go" },
    { title: "Hello World", type: "theory", content: "# Hello World\n\n```go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n}\n```\n\n```bash\ngo run main.go\ngo build\n```", order: 3, xpReward: 15, estimatedMinutes: 10, language: "go" },
    { title: "First Program", type: "practice", content: "# Print Hello\n\nPrint 'Hello, Go!' to console.", codeTemplate: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Print hello\n}", solution: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n}", testCases: [{ input: "", expectedOutput: "Hello, Go!", points: 30 }], order: 4, xpReward: 25, estimatedMinutes: 10, language: "go" },
    { title: "Go Commands", type: "challenge", content: "# Build Command\n\nCommand to compile Go program?", codeTemplate: "// Answer\nfmt.Println(\"go build\")", solution: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"go build\")\n}", testCases: [{ input: "", expectedOutput: "go build", points: 35 }], order: 5, xpReward: 35, estimatedMinutes: 10, language: "go" },
  ]);

  // Module 2-10: Go fundamentals
  const goBasicModules = [
    { title: "Variables & Data Types", order: 2, summary: "Basic types, short declaration" },
    { title: "Functions & Control Flow", order: 3, summary: "Functions, if/else, for loops" },
    { title: "Arrays & Slices", order: 4, summary: "Fixed arrays, dynamic slices" },
    { title: "Maps & Structs", order: 5, summary: "Key-value maps, struct types" },
    { title: "Pointers", order: 6, summary: "Pointers and memory addresses" },
    { title: "Methods & Interfaces", order: 7, summary: "Methods on types, interfaces" },
    { title: "Packages & Modules", order: 8, summary: "Code organization, go.mod" },
    { title: "Error Handling", order: 9, summary: "Error type, error wrapping" },
    { title: "File I/O", order: 10, summary: "File operations, os package" },
  ];

  for (const mod of goBasicModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nGo is designed for simplicity.`, order: 1, xpReward: 15, estimatedMinutes: 10, language: "go" },
      { title: `${mod.title} - Concepts`, type: "theory", content: `# Key Concepts\n\nLearning ${mod.title.toLowerCase()} in Go.`, order: 2, xpReward: 15, estimatedMinutes: 10, language: "go" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Go\")\n}", solution: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Go\")\n}", testCases: [{ input: "", expectedOutput: "Go", points: 30 }], order: 3, xpReward: 30, estimatedMinutes: 12, language: "go" },
      { title: `${mod.title} - Advanced`, type: "theory", content: `# Advanced ${mod.title}\n\nDeeper concepts.`, order: 4, xpReward: 20, estimatedMinutes: 10, language: "go" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Challenge\n\nTest your ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\n", solution: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Done\")\n}", testCases: [{ input: "", expectedOutput: "Done", points: 40 }], order: 5, xpReward: 50, estimatedMinutes: 15, language: "go" },
    ]);
  }

  // Module 11-20: Advanced Go
  const goAdvancedModules = [
    { title: "Goroutines", order: 11, summary: "Lightweight threads in Go" },
    { title: "Channels", order: 12, summary: "Communication between goroutines" },
    { title: "Select Statement", order: 13, summary: "Multiplexing channels" },
    { title: "Sync Package", order: 14, summary: "Mutex, WaitGroup, Once" },
    { title: "Context Package", order: 15, summary: "Request-scoped data, cancellation" },
    { title: "HTTP Servers", order: 16, summary: "net/http, handlers, routing" },
    { title: "JSON & Web APIs", order: 17, summary: "JSON encoding, REST APIs" },
    { title: "Database Access", order: 18, summary: "database/sql, connection pooling" },
    { title: "Testing in Go", order: 19, summary: "Testing package, benchmarks" },
    { title: "Building CLI Tools", order: 20, summary: "CLI applications, flags" },
  ];

  for (const mod of goAdvancedModules) {
    await createModule(ctx, courseId, mod, [
      { title: `${mod.title} - Introduction`, type: "theory", content: `# ${mod.title}\n\n${mod.summary}\n\nAdvanced Go programming.`, order: 1, xpReward: 20, estimatedMinutes: 12, language: "go" },
      { title: `${mod.title} - Core Concepts`, type: "theory", content: `# Core Concepts\n\nDeep dive into ${mod.title.toLowerCase()}.`, order: 2, xpReward: 20, estimatedMinutes: 12, language: "go" },
      { title: `${mod.title} - Practice`, type: "practice", content: `# Practice\n\nApply ${mod.title.toLowerCase()}.`, codeTemplate: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Advanced Go\")\n}", solution: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Advanced Go\")\n}", testCases: [{ input: "", expectedOutput: "Advanced Go", points: 35 }], order: 3, xpReward: 40, estimatedMinutes: 15, language: "go" },
      { title: `${mod.title} - Advanced Topics`, type: "theory", content: `# Advanced Topics\n\nMastering ${mod.title.toLowerCase()}.`, order: 4, xpReward: 25, estimatedMinutes: 15, language: "go" },
      { title: `${mod.title} - Challenge`, type: "challenge", content: `# Final Challenge\n\nTest all ${mod.title.toLowerCase()} skills!`, codeTemplate: "// Solve\n", solution: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Mastered\")\n}", testCases: [{ input: "", expectedOutput: "Mastered", points: 50 }], order: 5, xpReward: 60, estimatedMinutes: 20, language: "go" },
    ]);
  }

  return courseId;
}

// ==========================================
// MAIN SEED FUNCTION
// ==========================================
export const seedAllCourses20Modules = mutation({
  args: {},
  handler: async (ctx) => {
    const results: Record<string, boolean> = {};

    // Delete existing courses, modules, lessons for clean slate
    const lessons = await ctx.db.query("lessons").collect();
    for (const lesson of lessons) await ctx.db.delete(lesson._id);
    
    const modules = await ctx.db.query("modules").collect();
    for (const mod of modules) await ctx.db.delete(mod._id);
    
    const existingCourses = await ctx.db.query("courses").collect();
    for (const course of existingCourses) await ctx.db.delete(course._id);

    // Seed all 8 courses with 20 modules each
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

    // Seed 6 new courses
    await seedDockerCourse(ctx);
    results.docker = true;
    
    await seedFlutterCourse(ctx);
    results.flutter = true;
    
    await seedRustCourse(ctx);
    results.rust = true;
    
    await seedJavaCourse(ctx);
    results.java = true;
    
    await seedCSharpCourse(ctx);
    results.csharp = true;
    
    await seedGoCourse(ctx);
    results.go = true;

    // Seed badges
    const badges = [
      { name: "First Steps", icon: "🌟", description: "Complete your first lesson", criteria: "lessons_completed >= 1", xpReward: 50, category: "completion" as const },
      { name: "Dedicated Learner", icon: "📚", description: "Complete 50 lessons", criteria: "lessons_completed >= 50", xpReward: 250, category: "completion" as const },
      { name: "Century Club", icon: "💯", description: "Complete 100 lessons", criteria: "lessons_completed >= 100", xpReward: 500, category: "completion" as const },
      { name: "Week Warrior", icon: "🔥", description: "7-day streak", criteria: "streak >= 7", xpReward: 150, category: "streak" as const },
      { name: "Month Master", icon: "📅", description: "30-day streak", criteria: "streak >= 30", xpReward: 500, category: "streak" as const },
      { name: "Python Pioneer", icon: "🐍", description: "Complete Python course", criteria: "course_python", xpReward: 1000, category: "completion" as const },
      { name: "JavaScript Ninja", icon: "⚔️", description: "Complete JavaScript course", criteria: "course_javascript", xpReward: 1000, category: "completion" as const },
      { name: "TypeScript Pro", icon: "📘", description: "Complete TypeScript course", criteria: "course_typescript", xpReward: 1000, category: "completion" as const },
      { name: "React Ranger", icon: "⚛️", description: "Complete React course", criteria: "course_react", xpReward: 1000, category: "completion" as const },
      { name: "Node Master", icon: "🟢", description: "Complete Node.js course", criteria: "course_nodejs", xpReward: 1000, category: "completion" as const },
      { name: "SQL Expert", icon: "🗄️", description: "Complete SQL course", criteria: "course_sql", xpReward: 1000, category: "completion" as const },
      { name: "Algorithm Ace", icon: "🧮", description: "Complete DSA course", criteria: "course_dsa", xpReward: 1000, category: "completion" as const },
      { name: "Git Guru", icon: "📦", description: "Complete Git course", criteria: "course_git", xpReward: 1000, category: "completion" as const },
      { name: "Docker Captain", icon: "🐳", description: "Complete Docker course", criteria: "course_docker", xpReward: 1000, category: "completion" as const },
      { name: "Flutter Flyer", icon: "🦋", description: "Complete Flutter course", criteria: "course_flutter", xpReward: 1000, category: "completion" as const },
      { name: "Rust Crusader", icon: "🦀", description: "Complete Rust course", criteria: "course_rust", xpReward: 1000, category: "completion" as const },
      { name: "Java Jedi", icon: "☕", description: "Complete Java course", criteria: "course_java", xpReward: 1000, category: "completion" as const },
      { name: "C# Champion", icon: "💜", description: "Complete C# course", criteria: "course_csharp", xpReward: 1000, category: "completion" as const },
      { name: "Go Gopher", icon: "🐹", description: "Complete Go course", criteria: "course_go", xpReward: 1000, category: "completion" as const },
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
