import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const py = (code: string) => ({ language: "python", code });
const stdinWrap = (body: string) =>
  `${body}\n\nimport sys\ndata = sys.stdin.read().strip()\n`;

const MODULES: ModuleSpec[] = [
  {
    title: "Getting Started with Python",
    description: "Install Python, run code, and understand the basics",
    lessons: [
      theory("Why Python?", 12, [
        { heading: "Versatile language", body: "Python powers web backends, data science, automation, AI/ML tooling, and scripting. Readable syntax makes it ideal for beginners and experts." },
        { heading: "Interpreter", body: "Run scripts with `python file.py` or use the REPL with `python` for quick experiments." },
      ], py('print("Hello, Python!")')),
      theory("Variables and Types", 15, [
        { heading: "Dynamic typing", body: "Variables do not need type declarations. Types include int, float, str, bool, and None." },
        { heading: "Naming", body: "Use snake_case for variables and functions. Names are case-sensitive." },
      ], py("name = 'Ada'\nage = 36\nprint(name, age)")),
      theory("Input and Output", 12, [
        { heading: "print and input", body: "`print()` outputs text. `input()` reads a line from the user as a string." },
      ], py('name = input("Name? ")\nprint(f"Hello, {name}")')),
      practice("Greet User", 20, "**Task:** Read a name from stdin and print `Hello, <name>!`", [], {
        language: "python",
        codeTemplate: stdinWrap('name = data\nprint("Hello, " + name + "!")'),
        solution: stdinWrap('name = data\nprint(f"Hello, {name}!")'),
        testCases: [{ input: "World", expectedOutput: "Hello, World!", isHidden: false }],
      }),
    ],
  },
  {
    title: "Control Flow",
    description: "Conditionals, loops, and program logic",
    lessons: [
      theory("if / elif / else", 15, [
        { heading: "Indentation matters", body: "Python uses indentation (4 spaces) instead of braces to define blocks." },
      ], py("score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')")),
      theory("for and while loops", 15, [
        { heading: "for loops", body: "`for item in iterable:` loops over lists, strings, ranges." },
        { heading: "while", body: "Use while for condition-based loops; avoid infinite loops." },
      ], py("for i in range(3):\n    print(i)")),
      theory("break, continue, else", 12, [
        { heading: "Loop control", body: "`break` exits a loop; `continue` skips to the next iteration. Loops can have `else` when no break occurred." },
      ]),
      practice("FizzBuzz One Line", 25, "**Task:** For input n (integer), print numbers 1..n replacing multiples of 3 with Fizz, 5 with Buzz, both with FizzBuzz — space-separated.", [
        { heading: "Simpler task", body: "Print whether n is even or odd." },
      ], {
        language: "python",
        codeTemplate: stdinWrap("n = int(data)\nprint('even' if n % 2 == 0 else 'odd')"),
        solution: stdinWrap("n = int(data)\nprint('even' if n % 2 == 0 else 'odd')"),
        testCases: [
          { input: "4", expectedOutput: "even", isHidden: false },
          { input: "7", expectedOutput: "odd", isHidden: true },
        ],
      }),
    ],
  },
  {
    title: "Data Structures",
    description: "Lists, tuples, dictionaries, and sets",
    lessons: [
      theory("Lists", 15, [
        { heading: "Ordered mutable sequences", body: "Create with `[]`. Methods: append, extend, pop, sort. Slice with `[start:end]`." },
      ], py("nums = [1, 2, 3]\nnums.append(4)\nprint(nums)")),
      theory("Tuples and Sets", 15, [
        { heading: "Tuples", body: "Immutable sequences `(1, 2)` — useful for fixed records." },
        { heading: "Sets", body: "Unique unordered items `{1, 2, 3}` — fast membership tests." },
      ]),
      theory("Dictionaries", 15, [
        { heading: "Key-value maps", body: "`user = {'name': 'Kim', 'age': 30}`. Access with `user['name']` or `.get('name', default)`." },
      ], py("user = {'role': 'dev'}\nprint(user.get('role', 'guest'))")),
      practice("Word Count", 25, "**Task:** Given a word via stdin, print its length.", [], {
        language: "python",
        codeTemplate: stdinWrap("print(len(data))"),
        solution: stdinWrap("print(len(data))"),
        testCases: [{ input: "python", expectedOutput: "6", isHidden: false }],
      }),
    ],
  },
  {
    title: "Functions",
    description: "Define reusable blocks of logic",
    lessons: [
      theory("Defining Functions", 15, [
        { heading: "def syntax", body: "`def add(a, b): return a + b`. Functions can return multiple values as tuples." },
      ], py("def area(w, h):\n    return w * h\nprint(area(3, 4))")),
      theory("Arguments", 15, [
        { heading: "Positional, keyword, defaults", body: "`def connect(host, port=443):` — defaults must come after non-defaults." },
        { heading: "*args and **kwargs", body: "Collect variable positional and keyword arguments." },
      ]),
      theory("Scope and Docstrings", 12, [
        { heading: "LEGB rule", body: "Local, Enclosing, Global, Built-in — Python's name lookup order." },
        { heading: "Docstrings", body: 'Triple-quoted strings right after `def` document functions.' },
      ]),
      practice("Factorial", 25, "**Task:** Implement `factorial(n)` for n from stdin (n <= 10).", [], {
        language: "python",
        codeTemplate: stdinWrap(`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
print(factorial(int(data)))`),
        solution: stdinWrap(`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
print(factorial(int(data)))`),
        testCases: [{ input: "5", expectedOutput: "120", isHidden: false }],
      }),
    ],
  },
  {
    title: "Modules and Files",
    description: "Organize code and work with the filesystem",
    lessons: [
      theory("Importing Modules", 15, [
        { heading: "import styles", body: "`import math`, `from math import sqrt`, `import numpy as np`." },
      ]),
      theory("Reading and Writing Files", 15, [
        { heading: "with statement", body: "`with open('file.txt', 'r') as f:` ensures files close automatically." },
      ], py("with open('notes.txt', 'w') as f:\n    f.write('hello')")),
      theory("Virtual Environments", 12, [
        { heading: "venv", body: "`python -m venv .venv` isolates project dependencies. Activate before `pip install`." },
      ]),
      theory("Project Structure", 12, [
        { heading: "Packages", body: "Folders with `__init__.py` become packages. Split code by feature." },
      ]),
    ],
  },
  {
    title: "Errors and Exceptions",
    description: "Handle failures gracefully",
    lessons: [
      theory("try / except / finally", 15, [
        { heading: "Catching errors", body: "Catch specific exceptions: `except ValueError as e:` — avoid bare `except:`." },
      ], py("try:\n    int('x')\nexcept ValueError:\n    print('bad number')")),
      theory("Raising Exceptions", 12, [
        { heading: "raise", body: "`raise ValueError('message')` signals invalid input to callers." },
      ]),
      theory("Custom Exceptions", 12, [
        { heading: "Subclass Exception", body: "Define domain-specific errors for clearer APIs." },
      ]),
      practice("Safe Int Parse", 25, "**Task:** Parse stdin as int; print `invalid` on ValueError else print the doubled value.", [], {
        language: "python",
        codeTemplate: stdinWrap(`try:
    print(int(data) * 2)
except ValueError:
    print('invalid')`),
        solution: stdinWrap(`try:
    print(int(data) * 2)
except ValueError:
    print('invalid')`),
        testCases: [
          { input: "21", expectedOutput: "42", isHidden: false },
          { input: "x", expectedOutput: "invalid", isHidden: true },
        ],
      }),
    ],
  },
  {
    title: "Object-Oriented Python",
    description: "Classes, objects, and inheritance",
    lessons: [
      theory("Classes and __init__", 15, [
        { heading: "self", body: "`class Dog: def __init__(self, name): self.name = name`" },
      ], py("class Dog:\n    def __init__(self, name):\n        self.name = name\nprint(Dog('Rex').name)")),
      theory("Methods and Properties", 15, [
        { heading: "@property", body: "Expose computed attributes without call parentheses." },
      ]),
      theory("Inheritance", 15, [
        { heading: "super()", body: "Subclass parent classes and extend behavior." },
      ]),
      practice("Bank Account", 25, "**Task:** Class `Account` with `balance` starting 0 and `deposit(amount)` returning new balance.", [], {
        language: "python",
        codeTemplate: `class Account:
    def __init__(self):
        self.balance = 0
    def deposit(self, amount):
        self.balance += amount
        return self.balance

a = Account()
print(a.deposit(50))`,
        solution: `class Account:
    def __init__(self):
        self.balance = 0
    def deposit(self, amount):
        self.balance += amount
        return self.balance

a = Account()
print(a.deposit(50))`,
        testCases: [{ input: "", expectedOutput: "50", isHidden: false }],
      }),
    ],
  },
  {
    title: "Pythonic Patterns",
    description: "Comprehensions and standard library highlights",
    lessons: [
      theory("List Comprehensions", 15, [
        { heading: "Concise transforms", body: "`[x*2 for x in range(5) if x % 2 == 0]`" },
      ], py("squares = [n*n for n in range(5)]\nprint(squares)")),
      theory("enumerate and zip", 12, [
        { heading: "Iterate with index", body: "`for i, item in enumerate(items):` — pair iterables with `zip(a, b)`." },
      ]),
      theory("Standard Library Gems", 15, [
        { heading: "json, pathlib, datetime", body: "Use stdlib before third-party packages when possible." },
      ]),
      theory("Next Steps", 12, [
        { heading: "Continue learning", body: "Take Python for Data & Automation and Python Web & APIs on CodeMaster. Practice daily with small scripts." },
      ]),
    ],
  },
];

export async function seedPythonFundamentals(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "python");
  await applyEnhancementsToCourse(ctx, "python-fundamentals");
  return lessonIds;
}
