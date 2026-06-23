import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const MODULES: ModuleSpec[] = [
  {
    title: "React Basics",
    description: "Understand what React is and how it works",
    lessons: [
      theory("What is React?", 15, [
        { heading: "Component-based UI", body: "React is a JavaScript library for building user interfaces from reusable components. It uses a virtual DOM for efficient updates." },
        { heading: "Declarative", body: "Describe what the UI should look like for a given state; React handles DOM updates." },
      ], { language: "javascript", code: "// React apps compose components\nfunction App() {\n  return React.createElement('h1', null, 'Hello');\n}" }),
      theory("Your First Component", 15, [
        { heading: "Function components", body: "Components are plain JavaScript functions that return JSX. Name them with PascalCase." },
        { heading: "Rendering", body: "Use ReactDOM.createRoot to mount your component into the DOM." },
      ], { language: "javascript", code: "function Welcome() {\n  return <h1>Hello, React!</h1>;\n}" }),
      theory("JSX Syntax", 15, [
        { heading: "HTML in JavaScript", body: "JSX looks like HTML but compiles to React.createElement calls. Use one parent element or fragments." },
        { heading: "Expressions", body: "Embed JS with {expression} inside JSX. Use camelCase for attributes." },
      ], { language: "javascript", code: 'const name = "React";\nconst element = <h1 className="greeting">Hello {name}</h1>;' }),
      theory("Props and Rendering", 15, [
        { heading: "Passing data", body: "Props are read-only inputs passed from parent to child. They enable component reusability." },
        { heading: "Rendering", body: "Components receive props and return JSX. React updates the DOM efficiently." },
      ], { language: "javascript", code: "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n<Greeting name=\"Alice\" />" }),
    ],
  },
  {
    title: "Components Deep Dive",
    description: "Master reusable component patterns",
    lessons: [
      theory("Function Components", 15, [
        { heading: "Components as functions", body: "Function components accept a single props argument and return JSX. They are the modern standard." },
        { heading: "Destructuring", body: "Destructure props directly in the parameter list for cleaner code." },
      ], { language: "javascript", code: "function Card({ title, children }) {\n  return <div className=\"card\"><h2>{title}</h2>{children}</div>;\n}" }),
      theory("Children and Composition", 15, [
        { heading: "The children prop", body: "props.children captures content between opening and closing tags, enabling flexible layout components." },
        { heading: "Composition", body: "Compose components together rather than using inheritance. Pass JSX as props for slot patterns." },
      ]),
      theory("Conditional Rendering", 12, [
        { heading: "Ternary and &&", body: "Use ternary (condition ? A : B) or logical && (condition && <Component />) for conditional JSX." },
        { heading: "Early returns", body: "Return null or a loading state early from a component based on conditions." },
      ], { language: "javascript", code: "function Status({ isLoggedIn }) {\n  return isLoggedIn ? <Dashboard /> : <Login />;\n}" }),
      theory("Lists and Keys", 12, [
        { heading: "Rendering lists", body: "Use Array.map() to transform data into JSX elements with a unique key prop." },
        { heading: "Keys", body: "Keys help React identify changed items. Use stable IDs, not array indices." },
      ], { language: "javascript", code: "items.map(item => <li key={item.id}>{item.name}</li>)" }),
    ],
  },
  {
    title: "State and Events",
    description: "Make components interactive",
    lessons: [
      theory("useState Hook", 15, [
        { heading: "Local state", body: "useState adds state to function components. Returns [value, setValue] pair." },
        { heading: "Re-renders", body: "Calling the setter triggers a re-render with the new state value." },
      ], { language: "javascript", code: "const [count, setCount] = useState(0);" }),
      theory("Handling Events", 15, [
        { heading: "Event props", body: "React uses camelCase event props like onClick, onChange. Pass function references, not calls." },
        { heading: "Synthetic events", body: "React wraps native events in a synthetic event object with cross-browser consistency." },
      ]),
      theory("Controlled Inputs", 15, [
        { heading: "value + onChange", body: "Controlled inputs tie their value to state and update via onChange. React is the single source of truth." },
        { heading: "Input types", body: "Checkboxes use checked prop. Select and textarea use value, same as text inputs." },
      ]),
      practice("State Updates and Batching", 20, "**Task:** Create a counter that increments by 3 in a single click using functional updates.", [
        { heading: "Functional updates", body: "Pass a function to setState: setCount(prev => prev + 1). React batches these for performance." },
      ], {
        language: "javascript",
        codeTemplate: "function tripleIncrement(count, setCount) {\n  // Call setCount three times with functional updates\n}",
        solution: "function tripleIncrement(count, setCount) {\n  setCount(prev => prev + 1);\n  setCount(prev => prev + 1);\n  setCount(prev => prev + 1);\n}",
        testCases: [{ input: "0", expectedOutput: "3", isHidden: false }],
      }),
    ],
  },
  {
    title: "Side Effects",
    description: "Work with external systems using useEffect",
    lessons: [
      theory("useEffect Hook", 15, [
        { heading: "After render", body: "useEffect runs after render. Use it for API calls, subscriptions, timers, and DOM manipulation." },
        { heading: "Cleanup", body: "Return a cleanup function to prevent memory leaks from subscriptions or intervals." },
      ]),
      theory("Fetching Data", 15, [
        { heading: "Pattern", body: "Use useState for data/loading/error and useEffect to fetch on mount." },
        { heading: "Race conditions", body: "Use a cleanup flag or AbortController to prevent setting state after unmount." },
      ]),
      theory("Dependency Arrays", 12, [
        { heading: "Control re-runs", body: "Empty [] runs once on mount. Include all reactive values the effect uses." },
        { heading: "Stale closures", body: "Missing dependencies cause stale closures. Use the exhaustive-deps lint rule." },
      ]),
      theory("Cleaning Up Effects", 12, [
        { heading: "Prevent leaks", body: "Clean up intervals, event listeners, and subscriptions in the useEffect return function." },
        { heading: "Pattern", body: "Return a function that reverses what the effect set up." },
      ]),
    ],
  },
  {
    title: "Component Patterns",
    description: "Build well-structured React applications",
    lessons: [
      theory("Lifting State Up", 15, [
        { heading: "Shared state", body: "Move state to the closest common ancestor when multiple components need the same data." },
        { heading: "Callback props", body: "Pass setter functions as props (onClick, onToggle) so children can communicate upward." },
      ]),
      theory("Custom Hooks", 15, [
        { heading: "Reusable logic", body: "Extract component logic into functions starting with 'use'. Each call gets isolated state." },
        { heading: "Composition", body: "Custom hooks can call other hooks, enabling powerful composition patterns." },
      ]),
      theory("Composition vs Inheritance", 12, [
        { heading: "Composition", body: "React favors composition over inheritance. Use children prop and named slots for flexibility." },
        { heading: "When to use", body: "Composition is more flexible and easier to maintain than inheritance hierarchies." },
      ]),
      practice("React Patterns Quiz", 15, "**Task:** Identify the correct pattern for common React scenarios.", [
        { heading: "Review", body: "Test your knowledge of lifting state, custom hooks, and composition patterns." },
      ], {
        language: "javascript",
        codeTemplate: "// Q: Which pattern shares state between siblings?\n// A: Lifting state up to the common parent",
        solution: "// Lifting state up: move state to the nearest common ancestor\n// Custom hooks: extract reusable logic with use prefix\n// Composition: use children and slot props",
        testCases: [{ input: "", expectedOutput: "", isHidden: false }],
      }),
    ],
  },
  {
    title: "Forms",
    description: "Collect and validate user input",
    lessons: [
      theory("Form State", 15, [
        { heading: "Object state", body: "Store form fields in a single useState object. Use computed property names for dynamic updates." },
        { heading: "Reset", body: "Keep initial values in a constant for easy form reset." },
      ]),
      theory("Form Validation", 15, [
        { heading: "Validation patterns", body: "Use a validate function returning error objects. Validate on blur and submit." },
        { heading: "Touched state", body: "Track which fields the user interacted with. Show errors only after touch or submit." },
      ]),
      theory("Submit Handlers", 12, [
        { heading: "preventDefault", body: "Always call e.preventDefault() in form onSubmit to stop page reload." },
        { heading: "Async submission", body: "Track submitting state, disable button during submission, handle success and error." },
      ]),
      theory("useRef", 12, [
        { heading: "DOM access", body: "useRef provides a mutable ref object. Use it to focus inputs, measure elements, or store mutable values." },
        { heading: "Uncontrolled inputs", body: "useRef can read input values without re-rendering, useful for forms with minimal state." },
      ]),
    ],
  },
  {
    title: "Context and Advanced Hooks",
    description: "Share state and optimize performance",
    lessons: [
      theory("useContext", 15, [
        { heading: "Avoid prop drilling", body: "Context provides values to the entire subtree without passing through every level." },
        { heading: "Pattern", body: "Create context with createContext, provide with Provider, consume with useContext." },
      ]),
      theory("useReducer", 15, [
        { heading: "Complex state", body: "useReducer is ideal for state with multiple sub-values or complex update logic." },
        { heading: "Reducer pattern", body: "A reducer takes current state and an action, returns new state. Similar to Redux." },
      ]),
      theory("useMemo and useCallback", 15, [
        { heading: "Memoization", body: "useMemo caches computed values. useCallback caches function references. Use when profiling shows need." },
        { heading: "Dependencies", body: "Both accept a dependency array. Only re-compute when dependencies change." },
      ]),
      theory("Performance Optimization", 12, [
        { heading: "React.memo", body: "Wrap components in React.memo to skip re-renders when props haven't changed." },
        { heading: "Profiling", body: "Use React DevTools Profiler to identify performance bottlenecks before optimizing." },
      ]),
    ],
  },
  {
    title: "Building React Apps",
    description: "Put it all together",
    lessons: [
      theory("Thinking in React", 15, [
        { heading: "Process", body: "Start with a mock, break UI into components, build static version, identify state, add data flow." },
        { heading: "State principles", body: "Keep state minimal, identify where it lives, and ensure one-way data flow." },
      ]),
      theory("Project Structure", 12, [
        { heading: "Organization", body: "Group by features (users/, products/) with shared components/ and hooks/ directories." },
        { heading: "Conventions", body: "One component per file, index exports, PascalCase for components, camelCase for utilities." },
      ]),
      theory("Styling in React", 12, [
        { heading: "Approaches", body: "Inline styles, CSS modules, Tailwind CSS, styled-components. Each has trade-offs." },
        { heading: "Best practice", body: "Component-scoped styles prevent conflicts. Use CSS-in-JS or CSS Modules for maintainable styling." },
      ]),
      theory("Next Steps", 15, [
        { heading: "Beyond basics", body: "Learn React Router for navigation, TanStack Query for data fetching, and testing with React Testing Library." },
        { heading: "Ecosystem", body: "Explore Next.js for full-stack React, Expo for mobile, and state management with Zustand or Redux." },
      ]),
    ],
  },
];

export async function seedReactFundamentals(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "javascript");
  await applyEnhancementsToCourse(ctx, "react-fundamentals");
  return lessonIds;
}
