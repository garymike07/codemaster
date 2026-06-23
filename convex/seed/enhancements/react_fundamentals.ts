import type { EnhancedLessonValues } from "../utils";

export const course = "react-fundamentals";

export const enhancements: Record<string, Partial<EnhancedLessonValues>> = {
  "What is React?": {
    xpReward: 10,
    hints: ["Think about how React differs from vanilla JavaScript DOM manipulation", "React is a library, not a framework"],
    notes: {
      summary: "React is a JavaScript library for building user interfaces from reusable components. It uses a virtual DOM for efficient updates.",
      detailedContent: "React was created by Jordan Walke at Facebook and released as open-source in 2013. Its core innovation is the virtual DOM — a lightweight JavaScript representation of the real DOM that enables efficient updates. React follows a declarative paradigm where you describe what the UI should look like, and React handles the DOM manipulation. Components are the building blocks of React applications.",
      prerequisites: ["Basic HTML/CSS", "JavaScript fundamentals"],
      learningObjectives: [
        "Understand what React is and why it was created",
        "Explain the virtual DOM concept",
        "Identify the benefits of component-based architecture"
      ],
      resources: [
        { title: "React Official Docs", url: "https://react.dev/", type: "docs" as const },
        { title: "React Philosophy", url: "https://react.dev/learn/thinking-in-react", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "React vs Vanilla JS",
        description: "Comparing approaches",
        code: '// Vanilla JS\nconst app = document.getElementById("app");\nconst h1 = document.createElement("h1");\nh1.textContent = "Hello!";\napp.appendChild(h1);\n\n// React\nfunction App() {\n  return <h1>Hello!</h1>;\n}',
        explanation: "Vanilla JS requires imperative DOM commands. React lets you declare what you want.",
        difficulty: "beginner",
        concepts: ["declarative", "virtual DOM", "components"]
      }
    ],
    keyTakeaways: [
      "React is a declarative, component-based UI library",
      "The virtual DOM minimizes expensive real DOM operations",
      "Components are reusable building blocks",
      "React is focused on the view layer"
    ],
    commonMistakes: [
      { mistake: "Calling React a framework", explanation: "React is a library focused on the view layer.", howToAvoid: "Add React Router for routing, TanStack Query for data fetching." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How is React different from plain JavaScript?",
        "What is the virtual DOM?",
        "What problems does React solve?"
      ]
    }
  },
  "Your First Component": {
    xpReward: 10,
    hints: ["Function components are plain JavaScript functions returning JSX", "Use PascalCase for component names"],
    notes: {
      summary: "Function components are the simplest way to define a React component. They are JavaScript functions that accept props and return JSX.",
      detailedContent: "A React component is a reusable piece of UI. Function components are plain JavaScript functions that return JSX elements. They receive a single 'props' argument (an object) and return React elements describing what should appear on the screen. Component names must start with a capital letter to distinguish them from HTML elements.",
      prerequisites: ["What is React?"],
      learningObjectives: [
        "Create a function component that returns JSX",
        "Render a component to the DOM",
        "Follow naming conventions for components"
      ],
      resources: [
        { title: "React: Your First Component", url: "https://react.dev/learn/your-first-component", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Simple Component",
        description: "A basic greeting component",
        code: 'function Welcome() {\n  return <h1>Hello, React!</h1>;\n}\n\n// Render it\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<Welcome />);',
        explanation: "The component is a function returning JSX. ReactDOM renders it into the DOM.",
        difficulty: "beginner",
        concepts: ["function component", "rendering", "JSX"]
      }
    ],
    keyTakeaways: [
      "Components are functions that return JSX",
      "Use PascalCase for component names",
      "Components can be reused multiple times",
      "ReactDOM.createRoot renders your app"
    ],
    commonMistakes: [
      { mistake: "Lowercase component names", explanation: "React treats lowercase tags as HTML elements.", howToAvoid: "Always start component names with a capital letter." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What is a React component?",
        "How do I render a component?",
        "Why use PascalCase for component names?"
      ]
    }
  },
  "JSX Syntax": {
    xpReward: 10,
    hints: ["JSX compiles to React.createElement calls", "Use camelCase for HTML attributes", "Wrap multiple elements in a fragment"],
    notes: {
      summary: "JSX is a syntax extension that looks like HTML but compiles to JavaScript function calls. It lets you write UI structure alongside logic.",
      detailedContent: "JSX stands for JavaScript XML. It is not a template language — it compiles to React.createElement calls. You can embed any JavaScript expression in curly braces {}. Attributes use camelCase (className, onClick). Use fragments (<>...</>) to return multiple elements without extra DOM nodes.",
      prerequisites: ["Your First Component"],
      learningObjectives: [
        "Write JSX syntax with proper attribute naming",
        "Embed JavaScript expressions using {}",
        "Use fragments for grouping elements"
      ],
      resources: [
        { title: "React: JSX In Depth", url: "https://react.dev/learn/writing-markup-with-jsx", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "JSX Features",
        description: "Expressions, attributes, and fragments",
        code: 'const name = "Alice";\nfunction Greeting() {\n  return (\n    <>\n      <h1 className="title">Hello {name}</h1>\n      <p>{name.length > 0 ? "Welcome!" : "Please log in"}</p>\n    </>\n  );\n}',
        explanation: "{} embeds JavaScript expressions. className replaces class. <>...</> is a fragment with no DOM node.",
        difficulty: "beginner",
        concepts: ["JSX", "expressions", "fragments", "camelCase attributes"]
      }
    ],
    keyTakeaways: [
      "JSX is syntax sugar for React.createElement",
      "Use {} for JavaScript expressions",
      "Attributes use camelCase (className, onClick)",
      "Fragments avoid extra wrapper divs"
    ],
    commonMistakes: [
      { mistake: "Using class instead of className", explanation: "class is a reserved word in JavaScript.", howToAvoid: "Always use className in JSX." },
      { mistake: "Using if statements inside JSX", explanation: "JSX only accepts expressions, not statements.", howToAvoid: "Use ternary or && instead of if." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Why does JSX use className instead of class?",
        "What is a Fragment and when do I use it?",
        "What expressions can I embed in JSX?"
      ]
    }
  },
  "Props and Rendering": {
    xpReward: 10,
    hints: ["Props are read-only inputs to components", "Data flows one-way: parent to child", "Any JavaScript value can be a prop"],
    notes: {
      summary: "Props are how data flows from parent components to child components. They are read-only and enable component reusability.",
      detailedContent: "Props (properties) are to components what arguments are to functions. They configure and customize components. Props flow one-way (parent to child). To pass data upward, pass a callback function as a prop. Props can be strings, numbers, booleans, objects, arrays, functions, or React elements.",
      prerequisites: ["Your First Component"],
      learningObjectives: [
        "Pass different types of data as props",
        "Understand one-way data flow",
        "Use props to make components reusable"
      ],
      resources: [
        { title: "React: Passing Props", url: "https://react.dev/learn/passing-props-to-a-component", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Props in Action",
        description: "Passing and using props",
        code: 'function UserCard({ name, age, isActive }) {\n  return (\n    <div>\n      <h2>{name}</h2>\n      <p>Age: {age}</p>\n      <p>Status: {isActive ? "Active" : "Inactive"}</p>\n    </div>\n  );\n}\n\n<UserCard name="Alice" age={30} isActive={true} />',
        explanation: "Destructuring props makes code cleaner. Strings use quotes, other values use {}.",
        difficulty: "beginner",
        concepts: ["props", "destructuring", "one-way flow"]
      }
    ],
    keyTakeaways: [
      "Props flow one-way: parent to child",
      "Props are read-only — never mutate them",
      "Any JavaScript value can be a prop",
      "Destructure props for cleaner code"
    ],
    commonMistakes: [
      { mistake: "Mutating props inside a component", explanation: "Props are immutable. Changes don't propagate.", howToAvoid: "Use state for mutable data. Use callback props for child-to-parent communication." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I pass data from child to parent?",
        "What can I pass as props?",
        "Why can't I modify props?"
      ]
    }
  },
  "Function Components": {
    xpReward: 10,
    hints: ["Function components are the modern standard", "They accept props and return JSX", "No this, no render method needed"],
    notes: {
      summary: "Function components are the modern way to write React components. They are simpler, easier to test, and less verbose than class components.",
      detailedContent: "With the introduction of Hooks in React 16.8, function components became the standard. They don't need a render method or 'this' keyword. A function component takes a props argument and returns React elements. They can use Hooks like useState and useEffect to add state and side effects.",
      prerequisites: ["Props and Rendering"],
      learningObjectives: [
        "Define function components that return JSX",
        "Accept and destructure props",
        "Understand why function components are preferred"
      ],
      resources: [
        { title: "React: Components", url: "https://react.dev/learn/your-first-component", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Component Comparison",
        description: "Function vs class component",
        code: '// Function component (modern)\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n// Class component (legacy)\nclass Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}!</h1>;\n  }\n}',
        explanation: "Function components are shorter, have no 'this', and are easier to read and test.",
        difficulty: "beginner",
        concepts: ["function component", "class component", "comparison"]
      }
    ],
    keyTakeaways: [
      "Function components are the modern standard",
      "They accept props and return JSX",
      "No 'this', no render method, less boilerplate",
      "Hooks add state and effects to function components"
    ],
    commonMistakes: [
      { mistake: "Using lowercase names", explanation: "React treats lowercase tags as HTML elements.", howToAvoid: "Always use PascalCase for component names." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the difference between function and class components?",
        "Why are function components preferred?",
        "How do I add state to function components?"
      ]
    }
  },
  "Children and Composition": {
    xpReward: 10,
    hints: ["props.children contains nested content", "Composition means combining components", "Use children for flexible layouts"],
    notes: {
      summary: "The children prop allows components to receive and render nested content, enabling powerful composition patterns like layouts and wrappers.",
      detailedContent: "Every React component receives props.children — the content between its opening and closing tags. This enables composition where parent components control the structure and children provide the content. Children can be a string, a single element, an array of elements, or a function.",
      prerequisites: ["Function Components"],
      learningObjectives: [
        "Use props.children to compose components",
        "Create wrapper and layout components",
        "Understand composition over inheritance"
      ],
      resources: [
        { title: "React: Composition vs Inheritance", url: "https://react.dev/learn/composition-vs-inheritance", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Layout Component",
        description: "A reusable card using children",
        code: 'function Card({ title, children }) {\n  return (\n    <div className="card">\n      {title && <h2>{title}</h2>}\n      <div className="body">{children}</div>\n    </div>\n  );\n}\n\n<Card title="Welcome">\n  <p>This is the card content</p>\n  <button>Click me</button>\n</Card>',
        explanation: "Card defines the structure. Users provide content as children. Conditional rendering handles optional title.",
        difficulty: "beginner",
        concepts: ["children", "composition", "layout component"]
      }
    ],
    keyTakeaways: [
      "props.children captures content between tags",
      "Composition enables flexible, reusable components",
      "React favors composition over inheritance",
      "Children can be strings, elements, or arrays"
    ],
    commonMistakes: [
      { mistake: "Forgetting to render children", explanation: "If a component doesn't include {children}, nested content is ignored.", howToAvoid: "Always include {children} in your JSX if you expect nested content." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What is the children prop?",
        "How do I create a layout component?",
        "What is composition in React?"
      ]
    }
  },
  "Conditional Rendering": {
    xpReward: 10,
    hints: ["Use ternary (condition ? A : B) for if/else", "Use && for 'render if true'", "Return null to render nothing"],
    notes: {
      summary: "Conditional rendering in React uses standard JavaScript operators like ternary and && to conditionally include JSX elements.",
      detailedContent: "React doesn't have special syntax for conditions. Use if/else outside JSX, or ternary/&& inside JSX. Logical && renders the right side only if the left side is truthy. Ternary handles if/else. Early returns exit the component before the main return.",
      prerequisites: ["Children and Composition"],
      learningObjectives: [
        "Use ternary and && for inline conditions",
        "Use early returns for loading/error states",
        "Understand when to use each pattern"
      ],
      resources: [
        { title: "React: Conditional Rendering", url: "https://react.dev/learn/conditional-rendering", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Conditional Patterns",
        description: "Different ways to conditionally render",
        code: 'function UserGreeting({ user }) {\n  if (!user) return <p>Please log in</p>;\n  return (\n    <div>\n      <h1>Welcome back, {user.name}!</h1>\n      {user.badge && <span className="badge">{user.badge}</span>}\n      <p>{user.notifications.length} unread</p>\n    </div>\n  );\n}',
        explanation: "Early return handles the null/loading case. && conditionally shows the badge. Ternary could also be used for the main content.",
        difficulty: "beginner",
        concepts: ["conditional rendering", "early return", "&&", "ternary"]
      }
    ],
    keyTakeaways: [
      "Use ternary for if/else, && for if-true-only",
      "Early returns simplify component logic",
      "Return null to render nothing",
      "Extract complex conditions into variables"
    ],
    commonMistakes: [
      { mistake: "Using && with falsy values like 0", explanation: "0 && <Component /> renders 0, not nothing.", howToAvoid: "Ensure the left side is a boolean: {count > 0 && <Component />}" }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the difference between && and ternary?",
        "How do I conditionally render with early returns?",
        "Why does 0 && <Component /> render 0?"
      ]
    }
  },
  "Lists and Keys": {
    xpReward: 10,
    hints: ["Use Array.map() to transform data into JSX", "Every mapped element needs a unique key prop", "Use stable IDs, not array indices"],
    notes: {
      summary: "Lists in React are rendered using Array.map() to transform data into JSX elements, with unique keys for efficient updates.",
      detailedContent: "React uses keys to identify which items changed, were added, or removed. Keys should be stable, unique, and predictable. Prefer database IDs or UUIDs over array indices. Without proper keys, React may incorrectly reuse component state or re-render unnecessarily.",
      prerequisites: ["Conditional Rendering"],
      learningObjectives: [
        "Render lists using map()",
        "Understand the purpose of keys",
        "Choose appropriate key values"
      ],
      resources: [
        { title: "React: Rendering Lists", url: "https://react.dev/learn/rendering-lists", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "List Rendering",
        description: "Mapping data to JSX elements",
        code: 'function TodoList({ items }) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={item.id}>\n          <span>{item.text}</span>\n          {item.done ? " ✅" : " ⏳"}\n        </li>\n      ))}\n    </ul>\n  );\n}',
        explanation: "map() transforms each item into JSX. The key prop helps React track each item. Use item.id from your data.",
        difficulty: "beginner",
        concepts: ["map", "key prop", "list rendering"]
      }
    ],
    keyTakeaways: [
      "map() transforms data arrays into JSX arrays",
      "Every mapped element needs a unique key",
      "Use stable IDs over array indices",
      "Keys must be unique among siblings only"
    ],
    commonMistakes: [
      { mistake: "Using index as key with dynamic lists", explanation: "Index keys cause issues with sorting, filtering, and inserting.", howToAvoid: "Use unique IDs. Only use index for static, non-reorderable lists." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Why do I need a key prop?",
        "When is it safe to use index as a key?",
        "What happens without proper keys?"
      ]
    }
  },
  "useState Hook": {
    xpReward: 15,
    hints: ["useState returns an array: [value, setValue]", "Calling setValue triggers a re-render", "Use the functional update form when deriving from previous state"],
    notes: {
      summary: "useState is the primary way to add state to function components. It returns a stateful value and a setter function.",
      detailedContent: "useState is a Hook that lets you add React state to function components. Call it with the initial state value (or a function returning it). It returns a pair: the current state value and a function to update it. The setter can accept a new value directly or a function that receives the previous state. State updates are batched in React 18+.",
      prerequisites: ["Lists and Keys"],
      learningObjectives: [
        "Use useState to add state to function components",
        "Understand state updates trigger re-renders",
        "Use functional updates for derived state"
      ],
      resources: [
        { title: "React: useState", url: "https://react.dev/reference/react/useState", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Counter",
        description: "Basic counter with useState",
        code: 'function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(count - 1)}>-</button>\n    </div>\n  );\n}',
        explanation: "useState(0) initializes count to 0. Clicking buttons calls setCount with a new value, triggering re-render.",
        difficulty: "beginner",
        concepts: ["useState", "state", "re-render"]
      },
      {
        title: "Functional Update",
        description: "Using the functional form for correct updates",
        code: 'function SafeCounter() {\n  const [count, setCount] = useState(0);\n  const incrementBy3 = () => {\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n  };\n  return <button onClick={incrementBy3}>+3</button>;\n}',
        explanation: "Functional updates always use the latest state, even with batching. Each call receives the correctly updated previous state.",
        difficulty: "intermediate",
        concepts: ["functional update", "batching"]
      }
    ],
    keyTakeaways: [
      "useState returns [value, setValue]",
      "Call setValue to trigger a re-render",
      "Use functional updates when new state depends on previous",
      "State updates are batched for performance"
    ],
    commonMistakes: [
      { mistake: "Mutating state directly", explanation: "React doesn't detect mutations. Always use the setter.", howToAvoid: "Treat state as immutable. Create new objects/arrays instead of mutating." },
      { mistake: "Stale closures with count + 1", explanation: "count in a closure may be stale. Use functional update.", howToAvoid: "Use setCount(prev => prev + 1) instead of setCount(count + 1) when reading previous state." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How does useState work?",
        "What is a functional update?",
        "When should I use functional updates?"
      ]
    }
  },
  "Handling Events": {
    xpReward: 12,
    hints: ["Event handlers receive synthetic event objects", "Pass a function reference, not a function call", "Use event.target.value for input values"],
    notes: {
      summary: "React events are named with camelCase (onClick, onChange) and use synthetic events for cross-browser consistency.",
      detailedContent: "React normalizes events so they work consistently across browsers. Event handlers receive a SyntheticEvent object that wraps the native event. To pass arguments to event handlers, use an arrow function or .bind(). Prevent default with e.preventDefault() — returning false doesn't work in React.",
      prerequisites: ["useState Hook"],
      learningObjectives: [
        "Attach event handlers with camelCase props",
        "Pass arguments to event handlers properly",
        "Prevent default browser behavior"
      ],
      resources: [
        { title: "React: Event Handling", url: "https://react.dev/learn/responding-to-events", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Event Patterns",
        description: "Different ways to handle events",
        code: 'function EventDemo() {\n  const [value, setValue] = useState("");\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    alert(`Submitted: ${value}`);\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={value} onChange={e => setValue(e.target.value)} />\n      <button onClick={() => console.log("clicked")}>Submit</button>\n    </form>\n  );\n}',
        explanation: "onSubmit receives the event. onChange uses e.target.value. onClick passes an arrow function to log the event.",
        difficulty: "beginner",
        concepts: ["synthetic events", "event handlers", "preventDefault"]
      }
    ],
    keyTakeaways: [
      "Use camelCase for event props (onClick, onSubmit)",
      "Pass function references, not calls",
      "Use e.preventDefault() to stop default behavior",
      "SyntheticEvents are pooled for performance"
    ],
    commonMistakes: [
      { mistake: "Calling the handler instead of passing it", explanation: "onClick={handleClick()} calls on render, not on click.", howToAvoid: "Pass the function reference: onClick={handleClick}." },
      { mistake: "Using return false to prevent default", explanation: "React doesn't support return false. It must be explicit.", howToAvoid: "Always use e.preventDefault() explicitly." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I pass arguments to event handlers?",
        "What is a SyntheticEvent?",
        "How do I prevent form submission?"
      ]
    }
  },
  "Controlled Inputs": {
    xpReward: 15,
    hints: ["React controls input value through state", "Always provide both value and onChange", "Checkboxes use checked instead of value"],
    notes: {
      summary: "Controlled inputs store their value in React state, making React the single source of truth for the input value.",
      detailedContent: "A controlled input's value is driven by state, and changes flow through onChange. This makes form state predictable and testable. Different input types vary slightly: text inputs use value, checkboxes and radios use checked, select uses value on the select element itself. For files, use uncontrolled via useRef.",
      prerequisites: ["Handling Events"],
      learningObjectives: [
        "Control text inputs with value + onChange",
        "Handle checkboxes, radios, and select elements",
        "Understand why controlled inputs are preferred"
      ],
      resources: [
        { title: "React: Forms", url: "https://react.dev/reference/react-dom/components/input", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Various Inputs",
        description: "Controlling different input types",
        code: 'function Form() {\n  const [name, setName] = useState("");\n  const [agree, setAgree] = useState(false);\n  return (\n    <form>\n      <input value={name} onChange={e => setName(e.target.value)} />\n      <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />\n      <select value={role} onChange={e => setRole(e.target.value)}>\n        <option value="admin">Admin</option>\n        <option value="user">User</option>\n      </select>\n    </form>\n  );\n}',
        explanation: "Text uses value. Checkbox uses checked. Select uses value on the wrapping element.",
        difficulty: "beginner",
        concepts: ["controlled inputs", "form state", "value", "onChange"]
      }
    ],
    keyTakeaways: [
      "React state is the single source of truth",
      "Text inputs: value + onChange",
      "Checkboxes: checked + onChange (e.target.checked)",
      "Select: value on <select> element"
    ],
    commonMistakes: [
      { mistake: "Omitting onChange on controlled inputs", explanation: "Without onChange, you can't type in the input because React resets it.", howToAvoid: "Always pair value with onChange for controlled inputs." },
      { mistake: "Using value on checkboxes", explanation: "Checkboxes use checked, not value, to determine visual state.", howToAvoid: "Use checked={booleanValue} for checkboxes." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What is a controlled input?",
        "How do I handle checkboxes in React?",
        "Why do inputs need both value and onChange?"
      ]
    }
  },
  "State Updates and Batching": {
    xpReward: 20,
    hints: ["React batches state updates since React 18", "Functional updates always get the latest state", "Multiple setState calls in an event handler batch into one re-render"],
    notes: {
      summary: "React batches multiple state updates into a single re-render. Use functional updates to ensure correct state each time.",
      detailedContent: "Batching means React groups multiple state updates together, triggering only one re-render. In React 18, batching happens everywhere (timeouts, promises, native events). Without functional updates, all batched calls see the same state value, causing the common counter-3 bug. Functional updates receive the pending state and guarantee correctness.",
      prerequisites: ["Controlled Inputs"],
      learningObjectives: [
        "Explain how React batches state updates",
        "Use functional updates for accurate state transitions",
        "Understand React 18's automatic batching"
      ],
      resources: [
        { title: "React: Queueing Updates", url: "https://react.dev/learn/queueing-a-series-of-state-updates", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Batching Demo",
        description: "Regular vs functional updates",
        code: 'function BatchDemo() {\n  const [count, setCount] = useState(0);\n  const wrong = () => {\n    setCount(count + 1);\n    setCount(count + 1);\n    setCount(count + 1);\n  };\n  const correct = () => {\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n  };\n  return (\n    <>\n      <p>{count}</p>\n      <button onClick={wrong}>Wrong (adds 1)</button>\n      <button onClick={correct}>Correct (adds 3)</button>\n    </>\n  );\n}',
        explanation: "Wrong: all three setCount(count + 1) use the same initial count. Correct: functional updates receive the pending state.",
        difficulty: "intermediate",
        concepts: ["batching", "functional update", "stale closure"]
      }
    ],
    keyTakeaways: [
      "React batches updates for performance (one re-render)",
      "React 18 batches updates in all contexts",
      "Use functional updates for sequential state changes",
      "Functional updates receive the most recent pending state"
    ],
    commonMistakes: [
      { mistake: "Expecting multiple setState calls to cause multiple re-renders", explanation: "React batches them into one re-render.", howToAvoid: "Don't rely on re-render count. Use functional updates for sequential logic." },
      { mistake: "Reading state immediately after setting it", explanation: "State updates are not applied synchronously.", howToAvoid: "Use useEffect to react to state changes, or use functional updates for derived state." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What is state batching?",
        "How do functional updates work?",
        "Why does setCount(count + 1) only add 1?"
      ]
    }
  },
  "useEffect Hook": {
    xpReward: 15,
    hints: ["useEffect runs after the browser paints", "Return a cleanup function to prevent memory leaks", "The dependency array controls when the effect re-runs"],
    notes: {
      summary: "useEffect lets you perform side effects in function components: API calls, subscriptions, timers, and DOM manipulation.",
      detailedContent: "useEffect takes a callback (the 'effect') and an optional dependency array. The callback runs after the component renders to the screen. If the callback returns a function, React runs it on unmount or before re-running the effect (cleanup). Common uses: fetching data, setting up event listeners, starting intervals, updating document.title.",
      prerequisites: ["State Updates and Batching"],
      learningObjectives: [
        "Use useEffect for side effects",
        "Understand the component lifecycle through effects",
        "Return cleanup functions to prevent leaks"
      ],
      resources: [
        { title: "React: useEffect", url: "https://react.dev/reference/react/useEffect", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Document Title",
        description: "Sync document title with state",
        code: 'function TitleUpdater() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}',
        explanation: "The effect runs after render when count changes. It updates the document title to reflect the new count.",
        difficulty: "beginner",
        concepts: ["useEffect", "side effects", "dependency array"]
      },
      {
        title: "Interval with Cleanup",
        description: "Setting and clearing an interval",
        code: 'function Timer() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => {\n      setSeconds(prev => prev + 1);\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <p>{seconds}s</p>;\n}',
        explanation: "Empty dependency array means run once on mount. Cleanup clears the interval on unmount, preventing memory leaks.",
        difficulty: "intermediate",
        concepts: ["cleanup", "interval", "mount/unmount"]
      }
    ],
    keyTakeaways: [
      "useEffect runs after render, not during",
      "Return a cleanup function for subscriptions/timers",
      "Dependency array controls when the effect re-runs",
      "Empty [] runs once on mount (and cleans up on unmount)"
    ],
    commonMistakes: [
      { mistake: "Not including dependencies", explanation: "Missing deps cause stale closures and bugs.", howToAvoid: "Use the exhaustive-deps ESLint plugin. Include all reactive values used in the effect." },
      { mistake: "Forgetting cleanup", explanation: "Intervals and subscriptions leak without cleanup.", howToAvoid: "Always return cleanup for intervals, event listeners, and subscriptions." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "When does useEffect run?",
        "What is a cleanup function?",
        "What should I put in the dependency array?"
      ]
    }
  },
  "Fetching Data": {
    xpReward: 15,
    hints: ["Use useState for data, loading, and error state", "Fetch inside useEffect, usually with empty deps", "Handle race conditions with cleanup"],
    notes: {
      summary: "Fetch data in useEffect using the fetch API or libraries like TanStack Query. Handle loading, error, and race conditions.",
      detailedContent: "The standard pattern: useState for data/loading/error, useEffect to fetch, handle loading state, catch errors, and use cleanup to avoid setting state after unmount (race conditions). Libraries like TanStack Query handle caching, refetching, and background updates automatically, but understanding the raw pattern is essential.",
      prerequisites: ["useEffect Hook"],
      learningObjectives: [
        "Implement the data fetching pattern with useEffect",
        "Handle loading and error states",
        "Prevent race conditions with cleanup"
      ],
      resources: [
        { title: "React: Fetching Data", url: "https://react.dev/learn/synchronizing-with-effects#fetching-data", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Fetch Pattern",
        description: "Basic data fetching with race condition protection",
        code: 'function User({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    let ignore = false;\n    setLoading(true);\n    fetch(`/api/users/${userId}`)\n      .then(r => r.json())\n      .then(data => { if (!ignore) setUser(data); })\n      .finally(() => { if (!ignore) setLoading(false); });\n    return () => { ignore = true; };\n  }, [userId]);\n  if (loading) return <p>Loading...</p>;\n  return <h1>{user.name}</h1>;\n}',
        explanation: "The ignore flag prevents setting state after unmount or after a new fetch started. Loading state shows a spinner.",
        difficulty: "intermediate",
        concepts: ["data fetching", "race condition", "loading state", "cleanup"]
      }
    ],
    keyTakeaways: [
      "Use ignore flag or AbortController for race conditions",
      "Always handle loading and error states",
      "Include fetch-triggering values in dependency array",
      "Consider TanStack Query for production apps"
    ],
    commonMistakes: [
      { mistake: "Not handling race conditions", explanation: "Fast userId changes can cause stale data to appear.", howToAvoid: "Use an ignore flag or AbortController in the cleanup." },
      { mistake: "Making fetch async in the effect callback directly", explanation: "useEffect doesn't accept async callbacks directly.", howToAvoid: "Define an async function inside the effect and call it." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I prevent race conditions in data fetching?",
        "How should I handle loading states?",
        "Should I use useEffect or a library for data fetching?"
      ]
    }
  },
  "Dependency Arrays": {
    xpReward: 12,
    hints: ["Every reactive value used inside useEffect must be in deps", "Empty [] means 'run once on mount'", "Stale closure happens when deps are missing"],
    notes: {
      summary: "Dependency arrays tell React when to re-run effects. Every reactive value used inside an effect must be listed as a dependency.",
      detailedContent: "A 'reactive value' includes props, state, and derived values from them. Omitting a dependency causes a stale closure — the effect captures an old value and never updates. The exhaustive-deps ESLint plugin (part of eslint-plugin-react-hooks) catches missing deps automatically. To express intent to not include a dep, use a ref or restructure the code.",
      prerequisites: ["useEffect Hook"],
      learningObjectives: [
        "List all reactive values in the dependency array",
        "Identify stale closures",
        "Use ESLint rules to catch missing dependencies"
      ],
      resources: [
        { title: "React: Dependency Arrays", url: "https://react.dev/reference/react/useEffect#specifying-reactive-dependencies", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Stale Closure",
        description: "Missing dependency causes stale values",
        code: 'function IntervalLogger() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => {\n      console.log(count); // Always logs initial 0!\n    }, 1000);\n    return () => clearInterval(id);\n  }, []); // Missing count!\n  return <button onClick={() => setCount(c => c + 1)}>+</button>;\n}',
        explanation: "count is inside the effect but not in deps. The interval captures count=0 permanently. Add [count] to fix.",
        difficulty: "intermediate",
        concepts: ["stale closure", "dependency array", "closure"]
      },
      {
        title: "Correct Dependencies",
        description: "Properly listing all dependencies",
        code: 'function IntervalLoggerFixed() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => {\n      console.log(count);\n    }, 1000);\n    return () => clearInterval(id);\n  }, [count]); // Include count\n  return <button onClick={() => setCount(c => c + 1)}>+</button>;\n}',
        explanation: "count is in deps so the interval resets each time count changes, logging the current value.",
        difficulty: "intermediate",
        concepts: ["dependencies", "reactive values"]
      }
    ],
    keyTakeaways: [
      "Include all reactive values used in the effect",
      "Missing deps cause stale closures",
      "Use exhaustive-deps ESLint plugin",
      "Empty [] means 'run once on mount' only"
    ],
    commonMistakes: [
      { mistake: "Omitting functions from deps", explanation: "Functions defined in the component are reactive.", howToAvoid: "Wrap functions in useCallback or define them inside the effect." },
      { mistake: "Using objects/arrays in deps", explanation: "They create new references on every render.", howToAvoid: "Use specific values instead of entire objects." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What is a stale closure?",
        "What counts as a reactive value?",
        "How do I handle functions as dependencies?"
      ]
    }
  },
  "Cleaning Up Effects": {
    xpReward: 12,
    hints: ["Return a function from useEffect to clean up", "Cleanup runs on unmount and before re-running the effect", "Always clean up subscriptions, intervals, and event listeners"],
    notes: {
      summary: "Cleanup functions prevent memory leaks and unwanted side effects when components unmount or dependencies change.",
      detailedContent: "The cleanup function runs: 1) when the component unmounts, 2) before re-running the effect on dependency changes. Typical cleanups: clearInterval, clearTimeout, removeEventListener, abort fetch requests, unsubscribe from WebSockets. Cleanup should reverse what the effect set up.",
      prerequisites: ["Dependency Arrays"],
      learningObjectives: [
        "Return cleanup functions from useEffect",
        "Identify when cleanup runs in the lifecycle",
        "Clean up subscriptions, timers, and event listeners"
      ],
      resources: [
        { title: "React: Cleanup Effects", url: "https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Event Listener Cleanup",
        description: "Adding and removing an event listener",
        code: 'function MouseTracker() {\n  const [position, setPosition] = useState({ x: 0, y: 0 });\n  useEffect(() => {\n    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });\n    window.addEventListener("mousemove", handleMove);\n    return () => window.removeEventListener("mousemove", handleMove);\n  }, []);\n  return <p>{position.x}, {position.y}</p>;\n}',
        explanation: "Event listener added on mount, removed on unmount. Without cleanup, every mount adds a new listener.",
        difficulty: "intermediate",
        concepts: ["cleanup", "event listener", "memory leak"]
      }
    ],
    keyTakeaways: [
      "Cleanup runs on unmount and before re-run",
      "Always clean up: intervals, listeners, subscriptions",
      "Cleanup should reverse the setup",
      "Use AbortController for fetch requests"
    ],
    commonMistakes: [
      { mistake: "Not cleaning up event listeners", explanation: "Multiple mounts create multiple listeners, causing bugs and leaks.", howToAvoid: "Always remove event listeners in cleanup." },
      { mistake: "Cleaning up in the wrong place", explanation: "Running cleanup logic outside of the return function.", howToAvoid: "Return a function from the effect callback." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When does the cleanup function run?",
        "What needs cleanup in useEffect?",
        "How do I clean up fetch requests?"
      ]
    }
  },
  "Lifting State Up": {
    xpReward: 15,
    hints: ["Move shared state to the closest common ancestor", "Pass state and setters down as props", "Children communicate upward via callback props"],
    notes: {
      summary: "Lifting state up means moving shared state to the nearest common ancestor so multiple components can access and update it.",
      detailedContent: "When two sibling components need to share state, remove state from both and store it in their parent. Pass state down as props and provide callback functions (like onToggle, onChange) for children to update the state. This follows the principle of single source of truth and keeps data flow predictable.",
      prerequisites: ["Controlled Inputs"],
      learningObjectives: [
        "Identify when state needs to be lifted",
        "Implement lifting state up pattern",
        "Use callback props for child-to-parent communication"
      ],
      resources: [
        { title: "React: Lifting State Up", url: "https://react.dev/learn/sharing-state-between-components", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Lifting State",
        description: "Two sibling components sharing state through parent",
        code: 'function TemperatureConverter() {\n  const [celsius, setCelsius] = useState(0);\n  const fahrenheit = (celsius * 9/5) + 32;\n  return (\n    <>\n      <CelsiusInput value={celsius} onChange={setCelsius} />\n      <FahrenheitDisplay value={fahrenheit} />\n    </>\n  );\n}\nfunction CelsiusInput({ value, onChange }) {\n  return <input value={value} onChange={e => onChange(+e.target.value)} />;\n}\nfunction FahrenheitDisplay({ value }) {\n  return <p>{value}°F</p>;\n}',
        explanation: "State lives in TemperatureConverter. CelsiusInput receives value + onChange. FahrenheitDisplay receives derived value.",
        difficulty: "intermediate",
        concepts: ["lifting state", "shared state", "callback props"]
      }
    ],
    keyTakeaways: [
      "Lift state to the closest common ancestor",
      "Pass state down, callbacks up",
      "Derived values don't need their own state",
      "Keeps data flow predictable and debuggable"
    ],
    commonMistakes: [
      { mistake: "Keeping duplicate state in siblings", explanation: "Multiple components track the same value separately.", howToAvoid: "Lift the state to their common parent instead." },
      { mistake: "Passing state setters too deep", explanation: "Deep prop drilling makes refactoring hard.", howToAvoid: "Consider React Context or component composition." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When should I lift state up?",
        "How do children update parent state?",
        "What is the alternative to lifting state?"
      ]
    }
  },
  "Custom Hooks": {
    xpReward: 20,
    hints: ["Custom hooks are functions starting with 'use'", "They can call other hooks", "Each component using a custom hook gets isolated state"],
    notes: {
      summary: "Custom hooks extract reusable component logic into functions. They let you share stateful logic without changing component hierarchy.",
      detailedContent: "A custom hook is a JavaScript function named with 'use' prefix that calls other hooks. Each call to a custom hook gets fully isolated state. Custom hooks can return values, functions, or nothing. They compose — call other custom hooks inside them. Common examples: useLocalStorage, useDebounce, useWindowSize, useOnlineStatus.",
      prerequisites: ["Lifting State Up", "useEffect Hook"],
      learningObjectives: [
        "Extract component logic into custom hooks",
        "Understand hook naming conventions",
        "Compose multiple hooks together"
      ],
      resources: [
        { title: "React: Custom Hooks", url: "https://react.dev/learn/reusing-logic-with-custom-hooks", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Custom Hook",
        description: "useOnlineStatus hook that tracks connectivity",
        code: 'function useOnlineStatus() {\n  const [isOnline, setIsOnline] = useState(navigator.onLine);\n  useEffect(() => {\n    const handleOnline = () => setIsOnline(true);\n    const handleOffline = () => setIsOnline(false);\n    window.addEventListener("online", handleOnline);\n    window.addEventListener("offline", handleOffline);\n    return () => {\n      window.removeEventListener("online", handleOnline);\n      window.removeEventListener("offline", handleOffline);\n    };\n  }, []);\n  return isOnline;\n}\nfunction StatusBar() {\n  const isOnline = useOnlineStatus();\n  return <div>{isOnline ? "Online" : "Offline"}</div>;\n}',
        explanation: "useOnlineStatus encapsulates all connectivity logic. It returns a boolean. Any component can use it.",
        difficulty: "intermediate",
        concepts: ["custom hooks", "reusable logic", "abstraction"]
      }
    ],
    keyTakeaways: [
      "Custom hooks must start with 'use'",
      "Each call gets isolated state",
      "They can call other hooks (composition)",
      "Extract logic that appears in multiple components"
    ],
    commonMistakes: [
      { mistake: "Calling hooks conditionally inside custom hooks", explanation: "Hooks must always be called in the same order.", howToAvoid: "Don't wrap hook calls in if statements or loops." },
      { mistake: "Not using the 'use' prefix", explanation: "Without 'use', React can't check hooks rules.", howToAvoid: "Always name custom hooks starting with 'use'." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What are custom hooks?",
        "How do I create a custom hook?",
        "Can custom hooks call other hooks?"
      ]
    }
  },
  "Composition vs Inheritance": {
    xpReward: 12,
    hints: ["React favors composition over inheritance", "Use props.children for generic wrappers", "Use named slot props for multiple insertion points"],
    notes: {
      summary: "React uses composition (combining smaller components) rather than inheritance (extending base classes). Composition is more flexible.",
      detailedContent: "Inheritance creates tight coupling and deep hierarchies that are hard to change. Composition combines simple components to build complex UIs. Patterns: children prop for wrapper/container components, named slot props (header={<Header />}) for multiple insertion points, and component-as-prop for polymorphic behavior.",
      prerequisites: ["Children and Composition"],
      learningObjectives: [
        "Explain why React prefers composition",
        "Use slot props for multiple content areas",
        "Compare composition vs inheritance approaches"
      ],
      resources: [
        { title: "React: Composition vs Inheritance", url: "https://react.dev/learn/composition-vs-inheritance", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Named Slots",
        description: "Composition with multiple content areas",
        code: 'function Layout({ header, sidebar, children }) {\n  return (\n    <div className="layout">\n      <header>{header}</header>\n      <aside>{sidebar}</aside>\n      <main>{children}</main>\n    </div>\n  );\n}\n<Layout\n  header={<h1>My App</h1>}\n  sidebar={<nav>Links</nav>}\n>\n  <p>Main content</p>\n</Layout>',
        explanation: "Layout receives header, sidebar as props and content as children. Users provide the pieces.",
        difficulty: "intermediate",
        concepts: ["composition", "slot props", "children"]
      }
    ],
    keyTakeaways: [
      "Favor composition over inheritance",
      "Use children and slot props for flexibility",
      "Composition is more maintainable than deep hierarchies",
      "React has no built-in inheritance mechanism"
    ],
    commonMistakes: [
      { mistake: "Trying to create class hierarchies in React", explanation: "React components don't benefit from deep inheritance trees.", howToAvoid: "Use composition patterns: containers, slots, and higher-order components." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Why does React prefer composition?",
        "What is the slot prop pattern?",
        "How is composition more flexible than inheritance?"
      ]
    }
  },
  "React Patterns Quiz": {
    xpReward: 15,
    hints: ["Think about the problem each pattern solves", "Patterns are not mutually exclusive", "Choose the simplest solution first"],
    notes: {
      summary: "Review of key React patterns: lifting state, custom hooks, and composition — when and why to use each.",
      detailedContent: "This quiz consolidates knowledge of core React patterns. Lifting state solves sibling sharing. Custom hooks extract logic reuse. Composition solves flexible layouts. Each pattern has a specific use case and understanding the trade-offs helps you choose the right one.",
      prerequisites: ["Composition vs Inheritance", "Custom Hooks", "Lifting State Up"],
      learningObjectives: [
        "Identify which pattern to use for different scenarios",
        "Understand the trade-offs of each pattern",
        "Apply multiple patterns together"
      ],
      resources: [
        { title: "React: Patterns", url: "https://react.dev/learn/thinking-in-react", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Pattern Selection",
        description: "Matching problems to patterns",
        code: '// Problem: Two siblings need the same data\n// Pattern: Lifting state up\n\n// Problem: Complex logic used in 5+ components\n// Pattern: Custom hook\n\n// Problem: Flexible reusable layout\n// Pattern: Composition with children/slots',
        explanation: "Choose the simplest pattern first. Start with lifting state, then custom hooks, then composition.",
        difficulty: "intermediate",
        concepts: ["pattern selection", "lifting state", "custom hooks", "composition"]
      }
    ],
    keyTakeaways: [
      "Lifting state: siblings share data through parent",
      "Custom hooks: extract and reuse stateful logic",
      "Composition: flexible component structure",
      "Patterns combine well together"
    ],
    commonMistakes: [
      { mistake: "Using Context too early", explanation: "Context is for global state, not just avoiding prop drilling one level.", howToAvoid: "Start with lifting state. Use composition. Only use Context when many unrelated components need the same data." }
    ],
    aiConfig: {
      tutorMode: "quiz",
      suggestedQuestions: [
        "When should I lift state vs use Context?",
        "Can I use composition and custom hooks together?",
        "What pattern handles form state best?"
      ]
    }
  },
  "Form State": {
    xpReward: 15,
    hints: ["Use a single object state for form fields", "Use computed property names for dynamic updates", "Keep initial values in a constant for easy reset"],
    notes: {
      summary: "Manage form state with a single useState object. Use computed property names and handle each input type appropriately.",
      detailedContent: "A common approach: store form fields as an object with useState. Use the input's name attribute and computed property names for a generic onChange handler. Keep initialValues constant for reset. For large forms, consider useReducer or form libraries like React Hook Form for better performance.",
      prerequisites: ["Controlled Inputs"],
      learningObjectives: [
        "Manage multiple form fields with a state object",
        "Create a generic onChange handler",
        "Implement form reset functionality"
      ],
      resources: [
        { title: "React: Forms Overview", url: "https://react.dev/reference/react-dom/components/input", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Form State Management",
        description: "Multi-field form with generic handler",
        code: 'const INITIAL_VALUES = { name: "", email: "", role: "user" };\nfunction SignupForm() {\n  const [values, setValues] = useState(INITIAL_VALUES);\n  const handleChange = (e) => {\n    const { name, value, type, checked } = e.target;\n    setValues(prev => ({\n      ...prev,\n      [name]: type === "checkbox" ? checked : value\n    }));\n  };\n  const handleReset = () => setValues(INITIAL_VALUES);\n  return (\n    <form>\n      <input name="name" value={values.name} onChange={handleChange} />\n      <input name="email" value={values.email} onChange={handleChange} />\n      <input type="checkbox" name="agree" checked={values.agree} onChange={handleChange} />\n      <button type="button" onClick={handleReset}>Reset</button>\n    </form>\n  );\n}',
        explanation: "name attribute + computed property [name] makes onChange generic. INITIAL_VALUES constant enables easy reset.",
        difficulty: "intermediate",
        concepts: ["form state", "computed property", "generic handler", "reset"]
      }
    ],
    keyTakeaways: [
      "Use a single object for form state",
      "Use name attribute + computed property for generic onChange",
      "Handle checkbox with type === 'checkbox' ? checked : value",
      "Keep initialValues constant for reset"
    ],
    commonMistakes: [
      { mistake: "Using separate useState for each field", explanation: "Scales poorly for forms with many fields.", howToAvoid: "Use a single state object with computed property names." },
      { mistake: "Mutating the state object directly", explanation: "Must spread existing state before updating.", howToAvoid: "Always spread prev and then override: {...prev, [name]: value}." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How do I manage form state efficiently?",
        "How do I create a generic onChange handler?",
        "How do I reset a form?"
      ]
    }
  },
  "Form Validation": {
    xpReward: 15,
    hints: ["Create a validate function returning error objects", "Track touched fields to show errors at the right time", "Validate on blur and submit"],
    notes: {
      summary: "Form validation in React uses a validate function that returns errors. Show errors after touch or submit for good UX.",
      detailedContent: "The validation pattern: a validate(values) function returns an object where keys are field names and values are error messages (empty object = valid). Track touched fields with a separate state object. Show errors only for touched fields or after submit attempt. Validate on blur (onBlur handler marks field as touched) and on submit.",
      prerequisites: ["Form State"],
      learningObjectives: [
        "Build a validate function returning error messages",
        "Track touched fields for UX",
        "Validate on blur and submit events"
      ],
      resources: [
        { title: "React: Form Validation", url: "https://react.dev/learn/managing-state#avoid-redundant-state", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Validation Pattern",
        description: "Validate function with touched tracking",
        code: 'function validate(values) {\n  const errors = {};\n  if (!values.email.includes("@")) errors.email = "Invalid email";\n  if (values.password.length < 6) errors.password = "Too short";\n  return errors;\n}\nfunction LoginForm() {\n  const [values, setValues] = useState({ email: "", password: "" });\n  const [touched, setTouched] = useState({});\n  const errors = validate(values);\n  const handleBlur = (e) => {\n    setTouched(prev => ({ ...prev, [e.target.name]: true }));\n  };\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    setTouched({ email: true, password: true });\n    if (Object.keys(errors).length === 0) submitData(values);\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />\n      {touched.email && errors.email && <span>{errors.email}</span>}\n      <button type="submit">Submit</button>\n    </form>\n  );\n}',
        explanation: "validate returns errors for all fields. touched tracks which fields were blurred. Only show errors for touched fields.",
        difficulty: "intermediate",
        concepts: ["validation", "touched state", "blur", "submit"]
      }
    ],
    keyTakeaways: [
      "validate function returns error object (empty = valid)",
      "Track touched fields to avoid showing errors prematurely",
      "Validate on blur (onBlur) and on submit",
      "Show errors only for touched fields"
    ],
    commonMistakes: [
      { mistake: "Validating only on submit", explanation: "Users don't see errors until they submit.", howToAvoid: "Also validate on blur and show inline errors." },
      { mistake: "Storing error messages in state", explanation: "Errors are derived from values, not independent.", howToAvoid: "Derive errors from values in render: const errors = validate(values)." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When should I show validation errors?",
        "How do I track touched fields?",
        "Why should errors be derived, not stored?"
      ]
    }
  },
  "Submit Handlers": {
    xpReward: 12,
    hints: ["Always call e.preventDefault() in form submit", "Track submitting state for UX", "Use async/await inside submit handler"],
    notes: {
      summary: "Form submit handlers must prevent default, handle async submission, track submitting state, and manage success/error feedback.",
      detailedContent: "The form onSubmit handler receives a React SyntheticEvent. Always call e.preventDefault() to prevent page reload. For async submission: set submitting state, try/catch the operation, show success/error feedback, and set submitting to false. Disable the submit button while submitting to prevent double-submission.",
      prerequisites: ["Form Validation"],
      learningObjectives: [
        "Prevent default form submission behavior",
        "Handle async form submission",
        "Manage submitting state and button disabling"
      ],
      resources: [
        { title: "React: Forms Submit", url: "https://react.dev/reference/react-dom/components/form", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Submit Handler",
        description: "Complete async form submission pattern",
        code: 'function SubmitForm() {\n  const [values, setValues] = useState({ name: "" });\n  const [submitting, setSubmitting] = useState(false);\n  const [message, setMessage] = useState(null);\n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    setSubmitting(true);\n    setMessage(null);\n    try {\n      await api.createUser(values);\n      setMessage({ type: "success", text: "User created!" });\n    } catch (err) {\n      setMessage({ type: "error", text: err.message });\n    } finally {\n      setSubmitting(false);\n    }\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={values.name} onChange={...} />\n      <button type="submit" disabled={submitting}>\n        {submitting ? "Saving..." : "Save"}\n      </button>\n      {message && <p className={message.type}>{message.text}</p>}\n    </form>\n  );\n}',
        explanation: "e.preventDefault() stops reload. submitting state disables button and shows spinner. try/catch handles success and error.",
        difficulty: "intermediate",
        concepts: ["submit", "preventDefault", "async", "submitting state"]
      }
    ],
    keyTakeaways: [
      "Always call e.preventDefault() in onSubmit",
      "Track submitting state for loading UX",
      "Disable submit button while submitting",
      "Show success/error feedback after submission"
    ],
    commonMistakes: [
      { mistake: "Forgetting e.preventDefault()", explanation: "The page reloads and state is lost.", howToAvoid: "Always call e.preventDefault() first in submit handler." },
      { mistake: "Not disabling the button during submission", explanation: "Users can double-click and submit twice.", howToAvoid: "Set a submitting flag and disable the button." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Why do I need preventDefault?",
        "How do I handle async form submission?",
        "How do I prevent double submissions?"
      ]
    }
  },
  "useRef": {
    xpReward: 12,
    hints: ["useRef returns a mutable object that persists across renders", "Use it to access DOM elements directly", "Changing .current doesn't trigger re-renders"],
    notes: {
      summary: "useRef provides a mutable reference that persists across renders. It's useful for DOM access, storing mutable values, and implementing uncontrolled inputs.",
      detailedContent: "useRef returns { current: initialValue }. Unlike state, changing .current does NOT cause a re-render. Common uses: 1) DOM access (focus, measure), 2) storing previous values, 3) interval IDs, 4) instance variables that persist without causing re-renders. For DOM refs, pass the ref object to an element's ref prop.",
      prerequisites: ["Submit Handlers"],
      learningObjectives: [
        "Use useRef to access DOM elements",
        "Store mutable values that persist across renders",
        "Understand the difference between refs and state"
      ],
      resources: [
        { title: "React: useRef", url: "https://react.dev/reference/react/useRef", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Auto Focus",
        description: "Focus an input on mount with useRef",
        code: 'function AutoFocusInput() {\n  const inputRef = useRef(null);\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n  return <input ref={inputRef} />;\n}',
        explanation: "inputRef stores the DOM node. useEffect runs after mount and calls focus() on the input element.",
        difficulty: "beginner",
        concepts: ["useRef", "DOM access", "focus"]
      },
      {
        title: "Previous Value",
        description: "Track previous state value",
        code: 'function usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => { ref.current = value; }, [value]);\n  return ref.current;\n}',
        explanation: "The ref stores the value after render, so it always holds the previous render's value.",
        difficulty: "intermediate",
        concepts: ["previous value", "ref"]
      }
    ],
    keyTakeaways: [
      "useRef persists across renders without causing re-renders",
      "Use DOM refs for focus, measurement, and media elements",
      "Stores mutable values like interval IDs",
      "Refs are a way to 'remember' values without triggering updates"
    ],
    commonMistakes: [
      { mistake: "Using refs instead of state for rendered values", explanation: "Ref changes don't trigger re-renders, so UI won't update.", howToAvoid: "Use state for values that affect the UI. Use refs for imperative DOM access." },
      { mistake: "Reading ref.current in render", explanation: "Reading during render may show stale values.", howToAvoid: "Access .current in event handlers or effects." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What is the difference between ref and state?",
        "When should I use useRef?",
        "How do I access DOM elements in React?"
      ]
    }
  },
  "useContext": {
    xpReward: 15,
    hints: ["Context provides values to an entire subtree", "Use createContext + Provider + useContext", "Avoid overusing context — it makes components harder to reuse"],
    notes: {
      summary: "React Context lets you provide data to a component tree without passing props manually at every level, solving prop drilling.",
      detailedContent: "Three steps: 1) createContext(defaultValue) creates a context object, 2) <Context.Provider value={...}> wraps the tree and provides the value, 3) useContext(Context) reads the value in any descendant. Context re-renders all consumers when the value changes. Use multiple small contexts for independent concerns to minimize re-renders.",
      prerequisites: ["useRef"],
      learningObjectives: [
        "Create a context with createContext",
        "Provide values using Context.Provider",
        "Consume context values with useContext"
      ],
      resources: [
        { title: "React: useContext", url: "https://react.dev/reference/react/useContext", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Theme Provider",
        description: "Context for theme data",
        code: 'const ThemeContext = createContext("light");\nfunction App() {\n  const [theme, setTheme] = useState("light");\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <Layout />\n    </ThemeContext.Provider>\n  );\n}\nfunction ThemedButton() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  return (\n    <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>\n      Current: {theme}\n    </button>\n  );\n}',
        explanation: "ThemeContext provides theme and setTheme. Any descendant can use them without prop drilling.",
        difficulty: "intermediate",
        concepts: ["useContext", "createContext", "Provider", "prop drilling"]
      }
    ],
    keyTakeaways: [
      "Context solves prop drilling through deep component trees",
      "createContext -> Provider -> useContext",
      "All consumers re-render when context value changes",
      "Use multiple small contexts for independent data"
    ],
    commonMistakes: [
      { mistake: "Using context for everything", explanation: "Context makes components harder to reuse and test.", howToAvoid: "Start with prop drilling. Use context only for widely-shared data (theme, auth, locale)." },
      { mistake: "Not providing a default value", explanation: "Consumers outside a Provider get undefined.", howToAvoid: "Always provide a sensible default to createContext." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What problem does Context solve?",
        "When should I use Context?",
        "How do I avoid excessive re-renders with Context?"
      ]
    }
  },
  "useReducer": {
    xpReward: 20,
    hints: ["useReducer is great for complex state logic", "Dispatch action objects to the reducer", "Reducers are pure — no side effects, no mutations"],
    notes: {
      summary: "useReducer manages complex state logic with a reducer function. It's like useState but with a Redux-inspired pattern: state, action, dispatch.",
      detailedContent: "useReducer takes a reducer function and initial state. The reducer receives (state, action) and returns new state. Actions are typically objects with a type and payload. Benefits: predictable state transitions, easier testing (pure function), and centralizing complex update logic. Use cases: shopping cart, form state with many fields, todo lists with various operations.",
      prerequisites: ["useContext"],
      learningObjectives: [
        "Define a reducer function",
        "Dispatch actions to update state",
        "Compare useState vs useReducer use cases"
      ],
      resources: [
        { title: "React: useReducer", url: "https://react.dev/reference/react/useReducer", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Todo Reducer",
        description: "Todo list with useReducer",
        code: 'function todoReducer(state, action) {\n  switch (action.type) {\n    case "add":\n      return [...state, { id: Date.now(), text: action.payload, done: false }];\n    case "toggle":\n      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);\n    case "delete":\n      return state.filter(t => t.id !== action.id);\n    default:\n      return state;\n  }\n}\nfunction TodoApp() {\n  const [todos, dispatch] = useReducer(todoReducer, []);\n  return (\n    <button onClick={() => dispatch({ type: "add", payload: "New task" })}>\n      Add\n    </button>\n  );\n}',
        explanation: "reducer is a pure function. Each action type handles a specific state transition. Dispatch sends actions.",
        difficulty: "intermediate",
        concepts: ["useReducer", "reducer", "dispatch", "action"]
      }
    ],
    keyTakeaways: [
      "useReducer is for complex state with multiple transitions",
      "Reducer: (state, action) => newState (must be pure)",
      "Dispatch sends action objects to the reducer",
      "Easier to test than scattered setState calls"
    ],
    commonMistakes: [
      { mistake: "Mutating state in the reducer", explanation: "Reducers must return new objects, not mutate the old one.", howToAvoid: "Use spread operators, .map, .filter to create new state." },
      { mistake: "Putting side effects in reducers", explanation: "Reducers must be pure — no API calls, no Math.random().", howToAvoid: "Keep reducers pure. Do side effects in event handlers or effects, then dispatch the result." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "When should I use useReducer instead of useState?",
        "What is a reducer?",
        "How do I test a reducer?"
      ]
    }
  },
  "useMemo and useCallback": {
    xpReward: 15,
    hints: ["useMemo caches computed values", "useCallback caches function references", "Only use when profiling shows a bottleneck"],
    notes: {
      summary: "useMemo and useCallback optimize performance by caching values and function references between re-renders.",
      detailedContent: "useMemo memoizes expensive computations (e.g., sorting a large array, filtering data). useCallback memoizes functions so they don't change on every render unless their dependencies change. Both take a dependency array. Important: don't add them preemptively — they have overhead. Profile first, then optimize. React.memo wraps components to skip re-rendering when props haven't changed (works with useCallback).",
      prerequisites: ["useReducer"],
      learningObjectives: [
        "Use useMemo to cache expensive computations",
        "Use useCallback to stabilize function references",
        "Understand when memoization is beneficial"
      ],
      resources: [
        { title: "React: useMemo", url: "https://react.dev/reference/react/useMemo", type: "docs" as const },
        { title: "React: useCallback", url: "https://react.dev/reference/react/useCallback", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "useMemo Example",
        description: "Memoize expensive filtered list",
        code: 'function SearchResults({ items, query }) {\n  const filtered = useMemo(() => {\n    return items.filter(item =>\n      item.name.toLowerCase().includes(query.toLowerCase())\n    );\n  }, [items, query]);\n  return <ul>{filtered.map(item => <li key={item.id}>{item.name}</li>)}</ul>;\n}',
        explanation: "filtered only recomputes when items or query change. Without useMemo, it runs on every render.",
        difficulty: "intermediate",
        concepts: ["useMemo", "memoization", "performance"]
      },
      {
        title: "useCallback Example",
        description: "Stable function reference for child memo",
        code: 'function Parent() {\n  const [count, setCount] = useState(0);\n  const handleClick = useCallback(() => {\n    setCount(prev => prev + 1);\n  }, []);\n  return <ExpensiveButton onClick={handleClick} />;\n}\nconst ExpensiveButton = React.memo(({ onClick }) => {\n  return <button onClick={onClick}>Click</button>;\n});',
        explanation: "useCallback keeps handleClick stable. React.memo skips re-render of ExpensiveButton since onClick hasn't changed.",
        difficulty: "intermediate",
        concepts: ["useCallback", "React.memo", "referential equality"]
      }
    ],
    keyTakeaways: [
      "useMemo caches computation results",
      "useCallback caches function references",
      "Combine useCallback with React.memo for child re-render prevention",
      "Profile first, then optimize — don't add prematurely"
    ],
    commonMistakes: [
      { mistake: "Using useMemo/useCallback everywhere", explanation: "They have overhead. Unnecessary use makes things slower.", howToAvoid: "Only use when profiling shows a performance problem." },
      { mistake: "Empty dependency array when values are used inside", explanation: "Causes stale closures and incorrect cache behavior.", howToAvoid: "Always include all reactive values in the dependency array." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the difference between useMemo and useCallback?",
        "When should I use React.memo?",
        "Why shouldn't I add useMemo everywhere?"
      ]
    }
  },
  "Performance Optimization": {
    xpReward: 12,
    hints: ["Profile before optimizing with React DevTools", "React.memo prevents unnecessary re-renders", "Key strategies: memo, virtualization, lazy loading"],
    notes: {
      summary: "React performance optimization strategies include React.memo, code splitting, virtualization, and profiler-guided improvements.",
      detailedContent: "React.memo wraps a component to skip re-renders when props haven't changed (shallow comparison). Code splitting with React.lazy + Suspense loads components on demand. Virtualization (react-window, react-virtuoso) renders only visible items in large lists. The React DevTools Profiler identifies components that re-render too often. Always measure before optimizing.",
      prerequisites: ["useMemo and useCallback"],
      learningObjectives: [
        "Use React.memo to prevent unnecessary re-renders",
        "Implement code splitting with React.lazy",
        "Use the Profiler to find bottlenecks"
      ],
      resources: [
        { title: "React: Performance", url: "https://react.dev/reference/react/memo", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Code Splitting",
        description: "Lazy load a heavy component",
        code: 'const HeavyComponent = React.lazy(() => import("./HeavyComponent"));\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <HeavyComponent />\n    </Suspense>\n  );\n}',
        explanation: "React.lazy + dynamic import loads HeavyComponent only when rendered. Suspense shows a spinner while loading.",
        difficulty: "intermediate",
        concepts: ["React.lazy", "Suspense", "code splitting", "lazy loading"]
      }
    ],
    keyTakeaways: [
      "Profile with React DevTools before optimizing",
      "React.memo prevents unnecessary re-renders",
      "React.lazy + Suspense for code splitting",
      "Virtualize large lists (react-window)"
    ],
    commonMistakes: [
      { mistake: "Premature optimization without profiling", explanation: "Time wasted on non-bottlenecks.", howToAvoid: "Always profile first. Fix actual performance issues." },
      { mistake: "Overusing React.memo everywhere", explanation: "Most components re-render cheaply. Memo adds comparison overhead.", howToAvoid: "Only memoize components that re-render often with unchanged props." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I profile a React app?",
        "When should I use React.memo?",
        "What is code splitting and when is it useful?"
      ]
    }
  },
  "Thinking in React": {
    xpReward: 15,
    hints: ["Start with the UI mock, then build a component hierarchy", "Identify minimal state — don't duplicate derived data", "Add data flow last"],
    notes: {
      summary: "Thinking in React is a process: break UI into components, build a static version, find state, add data flow. It creates predictable, maintainable apps.",
      detailedContent: "The five-step process: 1) Break the UI into a component hierarchy (single-responsibility principle), 2) Build a static version in React (no interactivity yet), 3) Identify the minimal representation of UI state (DRY, avoid derived state), 4) Identify where state should live (lift state up to the right component), 5) Add inverse data flow (callback props). This approach produces apps that are easy to reason about and refactor.",
      prerequisites: ["Performance Optimization"],
      learningObjectives: [
        "Apply the five-step Thinking in React process",
        "Identify minimal, complete state",
        "Design component hierarchies from mockups"
      ],
      resources: [
        { title: "React: Thinking in React", url: "https://react.dev/learn/thinking-in-react", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "State Identification",
        description: "Determining what is and isn't state",
        code: '// From a mock: product search page\n// State candidates:\n// - Search text (IS state — changes over time, can\'t derive)\n// - Products list from API (IS state — fetched data)\n// - Filtered products (NOT state — derived from search + products)\n// - API endpoint URL (NOT state — constant)\n\nfunction ProductPage() {\n  const [search, setSearch] = useState("");\n  const [products, setProducts] = useState([]);\n  const filtered = useMemo(() =>\n    products.filter(p => p.name.includes(search)),\n    [products, search]\n  );\n  return <ProductList items={filtered} />;\n}',
        explanation: "search and products are state (change over time, can't derive). filtered is derived (computed from state).",
        difficulty: "advanced",
        concepts: ["state identification", "derived state", "thinking in React"]
      }
    ],
    keyTakeaways: [
      "Start with a mock, break into components",
      "Build a static version first",
      "Identify minimal, complete state (ask: can I derive this?)",
      "Add data flow: state in parent, callbacks up"
    ],
    commonMistakes: [
      { mistake: "Storing derived values in state", explanation: "Leads to sync bugs and redundant state.", howToAvoid: "Derive values during render using variables or useMemo." },
      { mistake: "Adding state too early", explanation: "Overcomplicates the first iteration.", howToAvoid: "Start with a static version, then add state only when needed." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I identify what should be state?",
        "What is derived state?",
        "How do I structure a component hierarchy?"
      ]
    }
  },
  "Project Structure": {
    xpReward: 10,
    hints: ["Group by features, not file types", "Keep one component per file", "Use index files for clean imports"],
    notes: {
      summary: "A well-organized React project groups files by feature or domain, with clear conventions for naming and imports.",
      detailedContent: "Feature-based structure: users/, products/, cart/ — each with components, hooks, utils, and tests. Shared code goes in components/, hooks/, utils/ at the root. One component per file, index.ts exports for clean imports. PascalCase for component files, camelCase for hooks and utilities. Keep the Flat Store pattern — avoid excessive nesting.",
      prerequisites: ["Thinking in React"],
      learningObjectives: [
        "Organize React projects by feature",
        "Follow naming conventions",
        "Use barrel exports for clean imports"
      ],
      resources: [
        { title: "React: Project Structure", url: "https://react.dev/learn/start-a-new-react-project", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Feature Structure",
        description: "Feature-based folder organization",
        code: 'src/\n  features/\n    auth/\n      components/\n        LoginForm.tsx\n        SignupForm.tsx\n      hooks/\n        useAuth.ts\n      api.ts\n      types.ts\n  components/\n    Button.tsx\n    Modal.tsx\n  hooks/\n    useDebounce.ts\n  utils/\n    formatDate.ts',
        explanation: "Each feature is self-contained. Shared UI and utilities live at the root level.",
        difficulty: "beginner",
        concepts: ["project structure", "feature-based", "organization"]
      }
    ],
    keyTakeaways: [
      "Group files by feature, not by type",
      "One component per file",
      "PascalCase for component files, camelCase for utilities",
      "Shared code in root-level directories"
    ],
    commonMistakes: [
      { mistake: "Deeply nested folder hierarchies", explanation: "Makes imports long and refactoring painful.", howToAvoid: "Flatten structure. Max 2-3 levels deep." },
      { mistake: "Mixing concerns in one file", explanation: "Multiple components or utilities in one file reduce readability.", howToAvoid: "One component per file with consistent naming." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Should I group by features or file types?",
        "How should I name my component files?",
        "What goes in the shared directories?"
      ]
    }
  },
  "Styling in React": {
    xpReward: 10,
    hints: ["React doesn't enforce a styling approach", "CSS Modules scope styles per component", "Tailwind CSS is popular for utility-first styling"],
    notes: {
      summary: "React supports multiple styling approaches: CSS Modules, Tailwind CSS, styled-components, inline styles, and plain CSS.",
      detailedContent: "CSS Modules (.module.css) scope styles to a component automatically. Tailwind CSS uses utility classes for rapid development. styled-components uses tagged template literals for CSS-in-JS. Inline styles are useful for dynamic values but avoid for everything else. CSS-in-JS libraries offer dynamic styling at the cost of runtime overhead.",
      prerequisites: ["Project Structure"],
      learningObjectives: [
        "Compare different React styling approaches",
        "Use CSS Modules for component-scoped styles",
        "Understand the trade-offs of each approach"
      ],
      resources: [
        { title: "React: Styling", url: "https://react.dev/learn#adding-styles", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "CSS Modules",
        description: "Scoped styles with CSS Modules",
        code: '/* Button.module.css */\n.button { background: blue; color: white; }\n\n// Button.tsx\nimport styles from "./Button.module.css";\nfunction Button({ children }) {\n  return <button className={styles.button}>{children}</button>;\n}',
        explanation: "CSS Modules generate unique class names, preventing style conflicts. Import styles as an object and use dot notation.",
        difficulty: "beginner",
        concepts: ["CSS Modules", "scoped styles", "styling"]
      }
    ],
    keyTakeaways: [
      "CSS Modules: auto-scoped, no conflicts",
      "Tailwind: utility-first, rapid prototyping",
      "CSS-in-JS: dynamic styles at runtime cost",
      "Inline styles: use sparingly for dynamic values"
    ],
    commonMistakes: [
      { mistake: "Using inline styles for everything", explanation: "Harder to maintain, no pseudo-classes, no media queries.", howToAvoid: "Use CSS Modules or Tailwind for most styles. Use inline only for dynamic values." },
      { mistake: "Not scoping styles", explanation: "Plain CSS files can conflict with each other.", howToAvoid: "Use CSS Modules, CSS-in-JS, or a naming convention like BEM." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the best way to style React apps?",
        "How do CSS Modules work?",
        "Should I use Tailwind CSS?"
      ]
    }
  },
  "Next Steps": {
    xpReward: 10,
    hints: ["React Router adds client-side routing", "TanStack Query handles server state", "Next.js is the most popular React framework"],
    notes: {
      summary: "After mastering React fundamentals, learn React Router for navigation, TanStack Query for data, and Next.js for full-stack apps.",
      detailedContent: "React Router adds client-side routing with dynamic URLs and nested layouts. TanStack Query (formerly React Query) handles caching, refetching, and background updates for server state. Next.js adds server-side rendering, static generation, and file-based routing. For testing: React Testing Library and Vitest. For state management: Zustand (simple) or Redux Toolkit (large apps). For mobile: React Native / Expo.",
      prerequisites: ["Styling in React"],
      learningObjectives: [
        "Identify next topics to learn (routing, data, testing)",
        "Understand when to use a React framework vs plain React",
        "Know the modern React ecosystem"
      ],
      resources: [
        { title: "React: Ecosystem Overview", url: "https://react.dev/learn/start-a-new-react-project", type: "docs" as const },
        { title: "Next.js Docs", url: "https://nextjs.org/docs", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Ecosystem Map",
        description: "Key tools for different concerns",
        code: '// Routing: React Router, TanStack Router\n// Data fetching: TanStack Query, SWR\n// State: Zustand, Redux Toolkit, Jotai\n// Testing: Vitest, React Testing Library, Playwright\n// Forms: React Hook Form, Formik\n// Styling: Tailwind CSS, CSS Modules, Panda CSS\n// Framework: Next.js, Remix, Astro\n// Mobile: React Native, Expo',
        explanation: "Each category has multiple options. Start with the most popular choices and evaluate based on your needs.",
        difficulty: "beginner",
        concepts: ["ecosystem", "routing", "state management", "testing"]
      }
    ],
    keyTakeaways: [
      "React Router for navigation and routing",
      "TanStack Query for server state management",
      "Next.js is the recommended full-stack React framework",
      "Test with React Testing Library + Vitest"
    ],
    commonMistakes: [
      { mistake: "Learning too many tools at once", explanation: "Overwhelming and counterproductive.", howToAvoid: "Master fundamentals first, then add tools one at a time as needed." },
      { mistake: "Skipping testing", explanation: "Testing is essential for production apps.", howToAvoid: "Start with React Testing Library for component tests and Playwright for e2e." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What should I learn after React basics?",
        "What is the best React framework?",
        "How do I test React applications?"
      ]
    }
  },
};
