import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const MODULES: ModuleSpec[] = [
  {
    title: "Introduction to React",
    description: "What React is and how it fits in modern frontends",
    lessons: [
      theory("What is React?", 15, [
        { heading: "Component-based UI", body: "React is a library for building user interfaces from reusable components. It uses a virtual DOM for efficient updates." },
        { heading: "Declarative", body: "Describe what the UI should look like for a given state; React handles DOM updates." },
      ], { language: "javascript", code: "// React apps compose components\nfunction App() {\n  return React.createElement('h1', null, 'Hello');\n}" }),
      theory("JSX Syntax", 15, [
        { heading: "HTML in JavaScript", body: "JSX looks like HTML but compiles to `React.createElement` calls. Use one parent element or fragments `<>...</>`." },
        { heading: "Expressions", body: "Embed JS with `{expression}` inside JSX." },
      ], { language: "javascript", code: "const name = 'React';\n// <h1>Hello {name}</h1>" }),
      theory("Setting Up a React Project", 12, [
        { heading: "Vite + React", body: "`npm create vite@latest my-app -- --template react` — fast dev server and HMR." },
      ]),
      theory("Rendering to the DOM", 12, [
        { heading: "createRoot", body: "React 18+ uses `createRoot(document.getElementById('root')).render(<App />)`." },
      ]),
    ],
  },
  {
    title: "Components & Props",
    description: "Build reusable UI pieces",
    lessons: [
      theory("Function Components", 15, [
        { heading: "Components are functions", body: "Name components with PascalCase. They return JSX describing UI." },
      ], { language: "javascript", code: "function Welcome({ name }) {\n  return <p>Hello, {name}</p>;\n}" }),
      theory("Props", 15, [
        { heading: "Read-only inputs", body: "Props flow parent → child. Never mutate props inside a child." },
      ]),
      theory("Children Prop", 12, [
        { heading: "Composition", body: "`<Card>content</Card>` passes nested JSX as `props.children`." },
      ]),
      practice("Props Card Builder", 20, "**Task:** Simulate a `Card(title, body)` component as a function returning a formatted string.", [
        { heading: "Pattern", body: "Return `[title] body` for testing without React runtime." },
      ], {
        language: "javascript",
        codeTemplate: `function Card({ title, body }) {
  return \`[\${title}] \${body}\`;
}
console.log(Card({ title: "Hi", body: "World" }));`,
        solution: `function Card({ title, body }) {
  return \`[\${title}] \${body}\`;
}
console.log(Card({ title: "Hi", body: "World" }));`,
        testCases: [{ input: "", expectedOutput: "[Hi] World", isHidden: false }],
      }),
    ],
  },
  {
    title: "State & Events",
    description: "Interactive components with useState",
    lessons: [
      theory("useState Hook", 15, [
        { heading: "Local state", body: "`const [count, setCount] = useState(0)` — state changes trigger re-renders." },
      ], { language: "javascript", code: "// const [value, setValue] = useState(initial);" }),
      theory("Event Handlers", 15, [
        { heading: "onClick, onChange", body: "Pass functions to JSX event props. Use synthetic events in React." },
      ]),
      theory("Controlled Inputs", 15, [
        { heading: "value + onChange", body: "Input value tied to state: single source of truth for form fields." },
      ]),
      practice("Counter Logic", 20, "**Task:** `createCounter()` returns object with `value` and `increment()` method.", [], {
        language: "javascript",
        codeTemplate: `function createCounter() {
  let value = 0;
  return {
    get value() { return value; },
    increment() { value++; return value; }
  };
}
const c = createCounter();
c.increment();
console.log(c.value);`,
        solution: `function createCounter() {
  let value = 0;
  return {
    get value() { return value; },
    increment() { value++; return value; }
  };
}
const c = createCounter();
c.increment();
console.log(c.value);`,
        testCases: [{ input: "", expectedOutput: "1", isHidden: false }],
      }),
    ],
  },
  {
    title: "Effects & Data Fetching",
    description: "Side effects with useEffect",
    lessons: [
      theory("useEffect Basics", 15, [
        { heading: "Run after render", body: "`useEffect(() => { ... }, [deps])` — sync with external systems, fetch data, subscriptions." },
        { heading: "Cleanup", body: "Return a function from useEffect to clean up timers or listeners." },
      ]),
      theory("Fetching Data", 15, [
        { heading: "fetch in useEffect", body: "Load remote JSON on mount; handle loading and error states in UI." },
      ]),
      theory("Dependency Array", 15, [
        { heading: "When to re-run", body: "Empty `[]` runs once on mount. Include values that the effect depends on." },
      ]),
      theory("Loading & Error UI", 12, [
        { heading: "UX patterns", body: "Show spinners while loading, friendly messages on failure." },
      ]),
    ],
  },
  {
    title: "Lists & Keys",
    description: "Render collections efficiently",
    lessons: [
      theory("map() in JSX", 15, [
        { heading: "Render lists", body: "`items.map(item => <li key={item.id}>{item.name}</li>)`" },
      ]),
      theory("Keys", 15, [
        { heading: "Stable identity", body: "Keys help React reconcile lists. Use unique IDs, not array index when items reorder." },
      ]),
      theory("Filtering", 12, [
        { heading: "Derived data", body: "Filter or sort in render or useMemo before mapping to JSX." },
      ]),
      practice("Filter Active Users", 20, "**Task:** `activeNames(users)` returns comma-separated names where `active` is true.", [], {
        language: "javascript",
        codeTemplate: `function activeNames(users) {
  return users.filter(u => u.active).map(u => u.name).join(",");
}
const users = [{name:"A",active:true},{name:"B",active:false},{name:"C",active:true}];
console.log(activeNames(users));`,
        solution: `function activeNames(users) {
  return users.filter(u => u.active).map(u => u.name).join(",");
}
const users = [{name:"A",active:true},{name:"B",active:false},{name:"C",active:true}];
console.log(activeNames(users));`,
        testCases: [{ input: "", expectedOutput: "A,C", isHidden: false }],
      }),
    ],
  },
  {
    title: "Forms & Validation",
    description: "Collect and validate user input",
    lessons: [
      theory("Form State", 15, [
        { heading: "Object state", body: "Store form fields in one state object or use libraries like React Hook Form for large forms." },
      ]),
      theory("Validation", 15, [
        { heading: "Client-side checks", body: "Validate before submit — required fields, email format, password strength." },
      ]),
      theory("Submit Handlers", 12, [
        { heading: "preventDefault", body: "`onSubmit={e => { e.preventDefault(); ... }}` stops full page reload." },
      ]),
      theory("Accessibility", 12, [
        { heading: "labels and aria", body: "Associate labels with inputs; announce errors to screen readers." },
      ]),
    ],
  },
  {
    title: "Routing & Structure",
    description: "Multi-page feel with React Router",
    lessons: [
      theory("React Router", 15, [
        { heading: "SPA navigation", body: "`<BrowserRouter>`, `<Routes>`, `<Route path element>` — client-side routing without full reloads." },
      ]),
      theory("Nested Routes", 12, [
        { heading: "Layouts", body: "Outlet components render child routes inside parent layouts." },
      ]),
      theory("URL Parameters", 12, [
        { heading: "useParams", body: "Read dynamic segments like `/course/:id`." },
      ]),
      theory("Project Structure", 12, [
        { heading: "Folders by feature", body: "Colocate components, hooks, and styles per feature for maintainability." },
      ]),
    ],
  },
  {
    title: "Context & Advanced Hooks",
    description: "Share state and extract logic",
    lessons: [
      theory("useContext", 15, [
        { heading: "Avoid prop drilling", body: "Provider wraps tree; consumers read shared theme, auth, or locale." },
      ]),
      theory("Custom Hooks", 15, [
        { heading: "Reuse logic", body: "`function useWindowWidth() { ... }` — extract stateful logic from components." },
      ]),
      theory("useMemo / useCallback", 15, [
        { heading: "Performance", body: "Memoize expensive calculations and stable callbacks when profiling shows need." },
      ]),
      theory("Capstone: Todo App Plan", 15, [
        { heading: "Project", body: "Build a todo app: list, add, toggle complete, filter, persist to localStorage. Combines state, effects, and components." },
      ]),
    ],
  },
];

export async function seedReactFrontend(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "javascript");
  await applyEnhancementsToCourse(ctx, "react-frontend");
  return lessonIds;
}
