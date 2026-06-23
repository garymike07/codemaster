import type { EnhancedLessonValues } from "../utils";

export const course = "react-frontend";

export const enhancements: Record<string, Partial<EnhancedLessonValues>> = {
  "What is React?": {
    xpReward: 10,
    hints: ["Think about how React differs from vanilla JavaScript DOM manipulation", "React is a library, not a framework — it focuses on the view layer"],
    notes: {
      summary: "React is a JavaScript library for building user interfaces from reusable components. It uses a virtual DOM for efficient updates and follows a declarative paradigm.",
      detailedContent: "React was created by Jordan Walke at Facebook and first deployed on Facebook's newsfeed in 2011. It became open-source in 2013. React's core idea is component-based architecture: every piece of UI is a self-contained component that manages its own state and composes to form complex interfaces. React uses a virtual DOM (a lightweight JavaScript representation of the real DOM) to batch updates and minimize direct DOM manipulation, resulting in better performance. Unlike frameworks like Angular, React is unopinionated about routing, state management, and data fetching — developers choose their own tools.",
      prerequisites: ["Basic HTML and CSS knowledge", "Familiarity with JavaScript functions and objects"],
      learningObjectives: [
        "Understand what React is and its role in modern web development",
        "Explain the concept of the virtual DOM",
        "Identify the benefits of component-based architecture"
      ],
      resources: [
        { title: "React Official Documentation", url: "https://react.dev/", type: "docs" as const },
        { title: "React History and Philosophy", url: "https://react.dev/blog/2023/03/16/introducing-react-dev", type: "article" as const },
        { title: "Virtual DOM Explained", url: "https://react.dev/learn/render-and-commit", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "React vs Vanilla JS",
        description: "Comparing DOM manipulation approaches",
        code: '// Vanilla JS\nconst app = document.getElementById("app");\nconst heading = document.createElement("h1");\nheading.textContent = "Hello, World!";\napp.appendChild(heading);\n\n// React\nfunction App() {\n  return <h1>Hello, World!</h1>;\n}\n// ReactDOM.createRoot(document.getElementById("root")).render(<App />);',
        explanation: "Vanilla JS uses imperative commands (create, set, append). React describes what the UI should look like declaratively — React handles the DOM updates.",
        output: "Both produce an h1 element on the page",
        difficulty: "beginner",
        concepts: ["declarative", "imperative", "virtual DOM", "components"]
      },
      {
        title: "Component Composition",
        description: "Building complex UI from small components",
        code: 'function Header() { return <header><h1>My App</h1></header>; }\nfunction Footer() { return <footer>&copy; 2024</footer>; }\nfunction Page() {\n  return (\n    <div>\n      <Header />\n      <main>Content here</main>\n      <Footer />\n    </div>\n  );\n}',
        explanation: "Components compose like HTML elements. Each component is reusable, testable, and independent. This is the foundation of React architecture.",
        difficulty: "beginner",
        concepts: ["composition", "reusability", "component tree"]
      }
    ],
    keyTakeaways: [
      "React is a declarative, component-based UI library",
      "The virtual DOM minimizes expensive real DOM operations",
      "Components are the building blocks of React applications",
      "React is unopinionated — choose your own tools for routing, state, etc."
    ],
    commonMistakes: [
      { mistake: "Calling React a framework", explanation: "React is a library focused on the view layer. It does not include routing, HTTP clients, or form validation out of the box.", howToAvoid: "Think of React as 'the V in MVC'. Add libraries like React Router, TanStack Query, or React Hook Form as needed." },
      { mistake: "Confusing React with ReactDOM or React Native", explanation: "React core is platform-agnostic. ReactDOM renders to web browsers; React Native renders to mobile platforms.", howToAvoid: "Use react-dom for web apps, react-native for mobile apps. The core react package is shared between them." }
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
  "JSX Syntax": {
    xpReward: 10,
    hints: ["JSX is syntactic sugar for React.createElement()", "Every JSX element must have a single parent or use a fragment <>...</>"],
    notes: {
      summary: "JSX is a syntax extension that looks like HTML but compiles to React.createElement calls. It allows you to write UI structure alongside JavaScript logic.",
      detailedContent: "JSX stands for JavaScript XML. It is not a template language — it compiles down to regular JavaScript function calls. Each JSX element becomes a React.createElement(type, props, ...children) call. You can embed any JavaScript expression inside curly braces {}. JSX uses camelCase for attribute names (className, onClick, htmlFor) because JSX properties map to the DOM API, not HTML attributes. Conditional rendering uses ternary operators or logical &&. Fragments (<>...</> or <React.Fragment>) let you return multiple elements without adding extra DOM nodes.",
      prerequisites: ["What is React?"],
      learningObjectives: [
        "Write JSX syntax with proper attribute naming",
        "Embed JavaScript expressions using curly braces",
        "Use fragments to return multiple elements"
      ],
      resources: [
        { title: "React: JSX In Depth", url: "https://react.dev/learn/writing-markup-with-jsx", type: "docs" as const },
        { title: "JSX Specification", url: "https://facebook.github.io/jsx/", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "JSX vs createElement",
        description: "What JSX compiles to",
        code: '// JSX — what you write\nconst element = <h1 className="title">Hello, {name}!</h1>;\n\n// Compiled — what JavaScript sees\nconst element = React.createElement(\n  "h1",\n  { className: "title" },\n  "Hello, ",\n  name,\n  "!"\n);',
        explanation: "JSX is purely syntactic sugar. The compiler (Babel or TypeScript) transforms JSX into createElement calls. You don't need to write createElement by hand.",
        difficulty: "beginner",
        concepts: ["JSX", "createElement", "compilation", "syntax sugar"]
      },
      {
        title: "Embedding Expressions",
        description: "Using JavaScript in JSX",
        code: 'const user = { firstName: "Ada", lastName: "Lovelace" };\nconst isLoggedIn = true;\n\nfunction Greeting() {\n  return (\n    <div>\n      <h1>Welcome, {user.firstName} {user.lastName}</h1>\n      <p>Status: {isLoggedIn ? "Online" : "Offline"}</p>\n      <p>Score: {Math.random() * 100}</p>\n    </div>\n  );\n}',
        explanation: "Anything inside {} is a JavaScript expression: variables, function calls, ternary operators, math. Statements (if, for) are not allowed inside {} — use ternary or extract logic.",
        difficulty: "beginner",
        concepts: ["expressions", "interpolation", "conditional rendering", "ternary"]
      }
    ],
    keyTakeaways: [
      "JSX is syntax sugar for React.createElement",
      "Use {} to embed any JavaScript expression",
      "Attributes use camelCase (className, onClick, htmlFor)",
      "Fragments (<>...</>) avoid extra wrapper divs"
    ],
    commonMistakes: [
      { mistake: "Using class instead of className", explanation: "JSX maps to the DOM API where attribute is className, not class (which is a reserved word in JavaScript).", howToAvoid: "Always use className in JSX. The React compiler will warn you if you use class." },
      { mistake: "Using if statements inside JSX", explanation: "JSX only accepts expressions, not statements. If you write {if (x) ...} it will throw a syntax error.", howToAvoid: "Use ternary expressions, logical &&, or extract the conditional logic into a variable or function." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Why does JSX use className instead of class?",
        "What expressions can I embed in JSX?",
        "What is a Fragment and when do I use it?"
      ]
    }
  },
  "Setting Up a React Project": {
    xpReward: 10,
    hints: ["Vite is the recommended tool for new React projects", "`npm create vite@latest` scaffolds a project in seconds"],
    notes: {
      summary: "Modern React projects use Vite as the build tool for fast development with Hot Module Replacement and optimized production builds.",
      detailedContent: "While Create React App (CRA) was once the standard, Vite has become the recommended tool for new React projects. Vite provides near-instant server start with native ES module serving, fast Hot Module Replacement (HMR), and optimized builds using Rollup. To create a project: `npm create vite@latest my-app -- --template react-ts` for TypeScript or `--template react` for JavaScript. The project structure includes index.html as the entry point, src/ for source code, and vite.config.ts for configuration.",
      prerequisites: ["Basic terminal/command line knowledge", "Node.js installed (v18+ recommended)"],
      learningObjectives: [
        "Scaffold a new React project using Vite",
        "Understand the project structure",
        "Run the development server"
      ],
      resources: [
        { title: "Vite Official Guide", url: "https://vitejs.dev/guide/", type: "docs" as const },
        { title: "React: Start a New Project", url: "https://react.dev/learn/start-a-new-react-project", type: "docs" as const },
        { title: "Vite vs CRA Comparison", url: "https://vitejs.dev/guide/comparisons.html", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Project Scaffolding",
        description: "Creating a new Vite + React project",
        code: '# Create project\nnpm create vite@latest my-react-app -- --template react\n\n# Navigate and install\ncd my-react-app\nnpm install\n\n# Start dev server\nnpm run dev\n\n# Build for production\nnpm run build',
        explanation: "Vite scaffolds a minimal but complete project. npm install downloads dependencies listed in package.json. npm run dev starts the development server with HMR. npm run build creates an optimized production bundle in the dist/ folder.",
        difficulty: "beginner",
        concepts: ["Vite", "scaffolding", "dev server", "HMR", "build"]
      },
      {
        title: "Project Structure",
        description: "What a Vite + React project looks like",
        code: 'my-react-app/\n??? index.html          # Entry HTML file\n??? package.json        # Dependencies and scripts\n??? vite.config.js      # Vite configuration\n??? src/\n?   ??? main.jsx        # App entry point\n?   ??? App.jsx         # Root component\n?   ??? App.css         # Component styles\n?   ??? index.css       # Global styles\n??? public/             # Static assets',
        explanation: "index.html is the entry point — the browser loads this, which loads main.jsx. src/ contains all your React code. public/ holds static files served as-is.",
        difficulty: "beginner",
        concepts: ["project structure", "entry point", "source directory"]
      }
    ],
    keyTakeaways: [
      "Vite is the recommended build tool for new React projects",
      "npm create vite@latest my-app -- --template react scaffolds a project",
      "npm run dev starts the dev server with HMR",
      "npm run build creates an optimized production bundle"
    ],
    commonMistakes: [
      { mistake: "Still using Create React App for new projects", explanation: "CRA is deprecated and no longer recommended. Vite offers significantly better performance.", howToAvoid: "Always use Vite for new React projects. Migrate existing CRA projects to Vite when possible." },
      { mistake: "Editing node_modules or public/index.html thinking it's the app", explanation: "node_modules is managed by npm — never edit it directly. The HTML entry point is index.html at the project root, not public/index.html.", howToAvoid: "Edit src/ files for your app. Use index.html at the root for meta tags and global scripts." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "Why is Vite better than Create React App?",
        "What does the project structure mean?",
        "How do I add TypeScript to my React project?"
      ]
    }
  },
  "Rendering to the DOM": {
    xpReward: 10,
    hints: ["React 18+ uses createRoot from react-dom/client", "The render method replaces the contents of the target element"],
    notes: {
      summary: "ReactDOM.createRoot() mounts a React application into a DOM element. Starting from React 18, createRoot replaces the older ReactDOM.render() API.",
      detailedContent: "ReactDOM is the bridge between React and the browser DOM. createRoot(container) creates a React root at the given DOM element. root.render(<App />) displays the React component tree inside that container. React 18's createRoot enables concurrent features like automatic batching, Suspense, and transitions. The older ReactDOM.render() (React 17 and below) is deprecated but still works with a warning.",
      prerequisites: ["Setting Up a React Project"],
      learningObjectives: [
        "Use createRoot to mount a React application",
        "Understand the difference between React 18 and legacy rendering",
        "Render multiple roots on the same page"
      ],
      resources: [
        { title: "React: createRoot API", url: "https://react.dev/reference/react-dom/client/createRoot", type: "docs" as const },
        { title: "React 18 Upgrade Guide", url: "https://react.dev/blog/2022/03/08/react-18-upgrade-guide", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "React 18 Rendering",
        description: "The standard way to render a React app",
        code: 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\n\nconst rootElement = document.getElementById("root");\nconst root = ReactDOM.createRoot(rootElement);\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);',
        explanation: "createRoot creates a React root tied to the DOM element. StrictMode enables extra dev-mode checks (no visual impact). The root can be rendered, unmounted, or re-rendered later.",
        difficulty: "beginner",
        concepts: ["createRoot", "StrictMode", "mounting", "entry point"]
      },
      {
        title: "Multiple Roots",
        description: "Rendering independent React widgets on a page",
        code: '// Mount multiple independent React apps\nconst headerRoot = ReactDOM.createRoot(\n  document.getElementById("header")\n);\nheaderRoot.render(<HeaderWidget />);\n\nconst mainRoot = ReactDOM.createRoot(\n  document.getElementById("main")\n);\nmainRoot.render(<MainApp />);',
        explanation: "You can mount multiple React roots on the same page. This is useful for progressively adopting React in existing server-rendered applications or building widget-based UIs.",
        difficulty: "intermediate",
        concepts: ["multiple roots", "progressive adoption", "widgets"]
      }
    ],
    keyTakeaways: [
      "React 18 uses createRoot() instead of ReactDOM.render()",
      "StrictMode activates development warnings for common mistakes",
      "The root element in index.html is the mounting point",
      "Multiple roots can coexist on the same page"
    ],
    commonMistakes: [
      { mistake: "Using deprecated ReactDOM.render() in React 18", explanation: "ReactDOM.render() still works but shows a deprecation warning and doesn't enable concurrent features.", howToAvoid: "Always use createRoot() in React 18+. The migration is straightforward: replace render with createRoot." },
      { mistake: "Trying to render into a non-existent DOM element", explanation: "If document.getElementById('root') returns null, createRoot throws an error. This happens when the script runs before the DOM is ready.", howToAvoid: "Ensure the script tag is at the bottom of body or use defer attribute. Make sure the target element exists in index.html." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What does createRoot do?",
        "What is StrictMode for?",
        "Can I have multiple React apps on one page?"
      ]
    }
  },
  "Function Components": {
    xpReward: 10,
    hints: ["Function components are plain JavaScript functions that return JSX", "Props are passed as the first argument (an object)"],
    notes: {
      summary: "Function components are the modern way to define React components. They are plain JavaScript functions that accept props and return JSX.",
      detailedContent: "Before React 16.8, class components were the only way to use state and lifecycle methods. With the introduction of Hooks, function components became the standard. They are simpler (no this, no render method), easier to test, and less verbose. A function component takes a single props argument (an object) and returns React elements (JSX). Component names must be PascalCase to distinguish them from HTML elements.",
      prerequisites: ["JSX Syntax", "Rendering to the DOM"],
      learningObjectives: [
        "Define function components that return JSX",
        "Accept and use props in components",
        "Follow naming conventions for components"
      ],
      resources: [
        { title: "React: Your First Component", url: "https://react.dev/learn/your-first-component", type: "docs" as const },
        { title: "React: Passing Props", url: "https://react.dev/learn/passing-props-to-a-component", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Simple Function Component",
        description: "A basic component that renders a greeting",
        code: 'function Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\n// Usage\n<Welcome name="Alice" />\n// Renders: <h1>Hello, Alice!</h1>',
        explanation: "The component receives props as an object. Access values via props.propertyName. JSX expressions {} embed the prop value. Components are reusable with different props.",
        difficulty: "beginner",
        concepts: ["function component", "props", "JSX return"]
      },
      {
        title: "Destructuring Props",
        description: "Cleaner props access with destructuring",
        code: 'function Card({ title, description, author }) {\n  return (\n    <div className="card">\n      <h2>{title}</h2>\n      <p>{description}</p>\n      <small>By {author}</small>\n    </div>\n  );\n}\n\n<Card\n  title="React Basics"\n  description="Learn the fundamentals"\n  author="Alice"\n/>',
        explanation: "Destructuring props directly in the parameter list makes the code cleaner. Each prop becomes its own variable. Default values can be set: function Card({ title = 'Untitled', ... })",
        difficulty: "beginner",
        concepts: ["destructuring", "props", "default values"]
      }
    ],
    keyTakeaways: [
      "Function components are plain functions returning JSX",
      "Props are passed as an object — destructure them for cleaner code",
      "Component names must be PascalCase",
      "Function components are the modern standard (with Hooks)"
    ],
    commonMistakes: [
      { mistake: "Using lowercase component names", explanation: "React treats lowercase tags as HTML elements. <welcome /> would render an HTML welcome element, not your component.", howToAvoid: "Always start component names with a capital letter: <Welcome />." },
      { mistake: "Mutating props inside the component", explanation: "Props are read-only. Mutating props causes unpredictable behavior and makes components harder to debug.", howToAvoid: "Never reassign props or mutate objects/arrays passed as props. Use state for mutable data." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What's the difference between a function component and a class component?",
        "How do I add default values to props?",
        "Why can't I modify props?"
      ]
    }
  },
  "Props": {
    xpReward: 10,
    hints: ["Props flow one-way: parent to child", "Props are read-only — never mutate them", "Any JavaScript value can be a prop: strings, numbers, booleans, objects, functions"],
    notes: {
      summary: "Props are the mechanism for passing data from parent components to child components. They are read-only and enable component reusability.",
      detailedContent: "Props (short for 'properties') are to components what arguments are to functions. They allow you to configure and customize components. Props can be strings, numbers, booleans, objects, arrays, functions, or even React elements. The data flow is unidirectional (parent to child). To pass data upward, you pass a callback function as a prop that the child calls. Spread syntax (...props) can forward multiple props at once.",
      prerequisites: ["Function Components"],
      learningObjectives: [
        "Pass different types of data as props",
        "Use spread syntax to forward props",
        "Understand one-way data flow"
      ],
      resources: [
        { title: "React: Passing Props", url: "https://react.dev/learn/passing-props-to-a-component", type: "docs" as const },
        { title: "React: Children Prop", url: "https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Different Prop Types",
        description: "Passing various data types as props",
        code: 'function UserProfile({ name, age, isActive, hobbies, onUpdate, style }) {\n  return (\n    <div style={style}>\n      <h2>{name}</h2>\n      <p>Age: {age}</p>\n      <p>Status: {isActive ? "Active" : "Inactive"}</p>\n      <p>Hobbies: {hobbies.join(", ")}</p>\n      <button onClick={onUpdate}>Update</button>\n    </div>\n  );\n}\n\n// Usage\n<UserProfile\n  name="Alice"\n  age={30}\n  isActive={true}\n  hobbies={["Reading", "Coding"]}\n  onUpdate={() => console.log("Updated")}\n  style={{ backgroundColor: "#f0f0f0" }}\n/>',
        explanation: "Strings use quotes, everything else uses {}. Functions are passed as props for event handling or callbacks. Objects like style are passed with double braces.",
        difficulty: "beginner",
        concepts: ["prop types", "callback props", "one-way flow", "inline styles"]
      },
      {
        title: "Forwarding Props with Spread",
        description: "Passing many props without repetition",
        code: 'function UserCard(props) {\n  return (\n    <div className="card">\n      <Avatar {...props} />\n      <UserInfo {...props} />\n    </div>\n  );\n}\n\n// Equivalent to:\nfunction UserCardExplicit({ avatar, name, email, role }) {\n  return (\n    <div className="card">\n      <Avatar avatar={avatar} />\n      <UserInfo name={name} email={email} role={role} />\n    </div>\n  );\n}',
        explanation: "Spread syntax {...props} is convenient but can pass unexpected props. Use it intentionally for wrapper/HOC patterns. For most cases, explicit props are clearer.",
        difficulty: "intermediate",
        concepts: ["spread props", "forwarding", "explicit vs implicit"]
      }
    ],
    keyTakeaways: [
      "Props flow one-way: parent into child",
      "Props are read-only — treat them as immutable",
      "Any JavaScript value can be a prop, including functions",
      "Spread syntax forwards multiple props concisely"
    ],
    commonMistakes: [
      { mistake: "Trying to modify props inside the child", explanation: "Props are immutable. Changing props directly has no effect and causes bugs. Only the parent should update data.", howToAvoid: "Use state (useState) for mutable data. Use callback props so the parent can update values." },
      { mistake: "Passing too many props (prop drilling)", explanation: "Passing props through many intermediate components makes code hard to maintain.", howToAvoid: "Use composition, Context, or state management libraries when props need to travel deep through the component tree." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I pass data from child to parent?",
        "What is prop drilling and how do I avoid it?",
        "Can I pass React components as props?"
      ]
    }
  },
  "Children Prop": {
    xpReward: 10,
    hints: ["props.children contains whatever is between the opening and closing tags", "Children can be strings, JSX, or even functions"],
    notes: {
      summary: "The children prop allows components to receive and render nested content, enabling powerful composition patterns like layouts, wrappers, and slots.",
      detailedContent: "Every React component can receive props.children — the content between its opening and closing tags. This enables the composition model where parent components control the structure and children provide the content. Children can be a string, a single React element, an array of elements, or even a function (render props pattern). Fragment components can use children implicitly without adding DOM nodes.",
      prerequisites: ["Props"],
      learningObjectives: [
        "Use props.children to compose components",
        "Create wrapper and layout components with children",
        "Pass multiple children to a component"
      ],
      resources: [
        { title: "React: Passing JSX as Children", url: "https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children", type: "docs" as const },
        { title: "React: Composition vs Inheritance", url: "https://react.dev/learn/composition-vs-inheritance", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Layout Component",
        description: "A reusable card layout using children",
        code: 'function Card({ children, title }) {\n  return (\n    <div className="card">\n      {title && <h2 className="card-title">{title}</h2>}\n      <div className="card-body">{children}</div>\n    </div>\n  );\n}\n\n// Usage\n<Card title="Welcome">\n  <p>This content is passed as children.</p>\n  <button>Click me</button>\n</Card>\n\n<Card>\n  <p>Card without a title</p>\n</Card>',
        explanation: "The Card component defines the structure (card wrapper, optional title, body). Users provide the inner content as children. Conditional rendering checks if title exists.",
        difficulty: "beginner",
        concepts: ["children", "layout component", "composition", "conditional rendering"]
      },
      {
        title: "Multiple Slots Pattern",
        description: "Using named props for distinct content areas",
        code: 'function PageLayout({ header, sidebar, children, footer }) {\n  return (\n    <div className="page">\n      <header>{header}</header>\n      <div className="content">\n        <aside>{sidebar}</aside>\n        <main>{children}</main>\n      </div>\n      <footer>{footer}</footer>\n    </div>\n  );\n}\n\n// Usage\n<PageLayout\n  header={<Header />}\n  sidebar={<SideNav />}\n  footer={<Footer />}\n>\n  <MainContent />\n</PageLayout>',
        explanation: "By passing JSX as named props, you get 'slots' for different content areas. Children fills the default slot. This pattern keeps layout logic clean and reusable.",
        difficulty: "intermediate",
        concepts: ["slots", "named children", "layout composition"]
      }
    ],
    keyTakeaways: [
      "props.children captures content between opening and closing tags",
      "Children enable flexible composition patterns",
      "Use the 'slots' pattern (named props) for multi-area layouts",
      "Children can be strings, elements, arrays, or functions"
    ],
    commonMistakes: [
      { mistake: "Expecting children to always be an array", explanation: "A single child is a single element, not an array. Multiple children form an array. Always handle both cases or use React.Children utilities.", howToAvoid: "Use React.Children.toArray(children) or React.Children.count(children) for type-safe child manipulation." },
      { mistake: "Forgetting to render children", explanation: "If a component receives children but doesn't use {children} in its JSX, the children are silently ignored.", howToAvoid: "Always include {children} in your component's JSX if you intend to render nested content." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What is the children prop?",
        "How do I create a layout component?",
        "What is the slots pattern?"
      ]
    }
  },
  "Props Card Builder": {
    xpReward: 25,
    hints: ["The function should return a formatted string like `[title] body`", "Destructure the props: { title, body }", "Use string concatenation or template literals"],
    notes: {
      summary: "Practice building a Card component simulation using a plain JavaScript function that accepts props and returns a formatted string.",
      detailedContent: "This exercise simulates React's props pattern in plain JavaScript. The Card function takes a props object with title and body properties and formats them into a string `[title] body`. This pattern reinforces understanding of destructuring, template literals, and the concept of components as functions that transform input (props) into output (rendered result).",
      prerequisites: ["Props", "Children Prop"],
      learningObjectives: [
        "Write a function that accepts a props object",
        "Use destructuring for cleaner prop access",
        "Format output using template literals"
      ],
      resources: [
        { title: "MDN: Destructuring Assignment", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", type: "docs" as const },
        { title: "MDN: Template Literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Card Function Implementation",
        description: "Multiple ways to structure the Card function",
        code: '// Basic version\nfunction Card(props) {\n  return `[${props.title}] ${props.body}`;\n}\n\n// With destructuring\nfunction Card({ title, body }) {\n  return `[${title}] ${body}`;\n}\n\n// With default values\nfunction Card({ title = "Untitled", body = "No content" }) {\n  return `[${title}] ${body}`;\n}\n\nconsole.log(Card({ title: "Hello", body: "World" }));\n// Output: [Hello] World',
        explanation: "All three versions produce the same output. Destructuring is the most readable. Default values make the component robust to missing props.",
        difficulty: "beginner",
        concepts: ["props destructuring", "template literals", "default props"]
      }
    ],
    keyTakeaways: [
      "Components transform props into output (UI or formatted data)",
      "Destructuring props makes code cleaner and safer",
      "Template literals create readable formatted strings",
      "Default prop values improve component robustness"
    ],
    commonMistakes: [
      { mistake: "Forgetting to wrap the formatted string in backticks", explanation: "String concatenation with + also works but template literals with backticks are cleaner for formatted output.", howToAvoid: "Use template literals (`) for multi-value string formatting." },
      { mistake: "Accessing props incorrectly (e.g., props[title] instead of props.title)", explanation: "props[title] looks up the property using the value of a variable called title, not the 'title' key.", howToAvoid: "Use dot notation (props.title) or destructure ({ title })." }
    ],
    playground: {
      enabled: true,
      starterCode: 'function Card({ title, body }) {\n  // Your code here\n}\n\nconsole.log(Card({ title: "Hi", body: "World" }));',
      language: "javascript",
      hints: ["Return a template literal like `[${title}] ${body}`"],
      solution: 'function Card({ title, body }) {\n  return `[${title}] ${body}`;\n}\n\nconsole.log(Card({ title: "Hi", body: "World" }));'
    },
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "Why is my function returning undefined?",
        "How do I add default values to props?",
        "What's the difference between dot and bracket notation?"
      ]
    }
  },
  "useState Hook": {
    xpReward: 15,
    hints: ["useState returns an array with two elements: current state and setter function", "State updates trigger re-renders", "Call hooks only at the top level of a component"],
    notes: {
      summary: "useState is a React Hook that adds state to function components. It returns a pair [value, setValue] that persists across re-renders.",
      detailedContent: "useState is the most fundamental React Hook. It accepts an initial value and returns an array with two elements: the current state value and a setter function. Calling the setter with a new value triggers a re-render of the component. State is preserved between re-renders — React remembers the current value for each useState call. The initial value is only used on the first render. For expensive initial values, pass a function: useState(() => expensiveComputation()).",
      prerequisites: ["Function Components"],
      learningObjectives: [
        "Declare state variables with useState",
        "Update state using the setter function",
        "Understand that state updates trigger re-renders"
      ],
      resources: [
        { title: "React: useState", url: "https://react.dev/reference/react/useState", type: "docs" as const },
        { title: "React: State: A Component's Memory", url: "https://react.dev/learn/state-a-components-memory", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Counter with useState",
        description: "The classic useState example",
        code: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(count - 1)}>-</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}',
        explanation: "useState(0) initializes count to 0. setCount updates the value and triggers re-render. Each click creates a new onClick handler that calls setCount with the updated value.",
        difficulty: "beginner",
        concepts: ["useState", "state initialization", "setter function", "re-render"]
      },
      {
        title: "Functional Updates",
        description: "Using a function to update state based on previous value",
        code: 'function Counter() {\n  const [count, setCount] = useState(0);\n\n  // Safe: uses previous state value\n  function handleIncrement() {\n    setCount(prev => prev + 1);\n  }\n\n  // Also safe for multiple updates\n  function handleTriple() {\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n  }\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={handleIncrement}>+1</button>\n      <button onClick={handleTriple}>+3 (batched)</button>\n    </div>\n  );\n}',
        explanation: "Functional updates pass a function (prev => prev + 1) instead of a value. React queues these and applies them sequentially, making multiple updates in one render cycle safe.",
        difficulty: "intermediate",
        concepts: ["functional update", "batching", "previous state", "queueing"]
      }
    ],
    keyTakeaways: [
      "useState returns [value, setValue] — the pair is stable across renders",
      "Calling setValue triggers a re-render of the component",
      "Use functional updates (prev => newValue) when relying on previous state",
      "Call hooks at the top level — never inside conditions or loops"
    ],
    commonMistakes: [
      { mistake: "Mutating state directly instead of using the setter", explanation: "Changing state directly (count = 5) doesn't trigger a re-render. Only setCount causes React to re-render.", howToAvoid: "Always use the setter function returned by useState. For objects/arrays, create a new copy instead of mutating." },
      { mistake: "Assuming setState works synchronously", explanation: "setCount(newValue) doesn't immediately update count. The new value is available on the next render.", howToAvoid: "If you need to read the updated value immediately, use useEffect or store the value in a local variable as well." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How does useState work under the hood?",
        "What happens when I call setCount with the same value?",
        "What is the difference between useState and useReducer?"
      ]
    }
  },
  "Event Handlers": {
    xpReward: 10,
    hints: ["Event handlers receive a synthetic event object", "Name handlers with handle prefix (handleClick, handleChange)", "Pass the function reference, not the result of calling it"],
    notes: {
      summary: "React normalizes events using a synthetic event system. Event handlers are passed as props (onClick, onChange, onSubmit) with camelCase names.",
      detailedContent: "React's synthetic events wrap native browser events for cross-browser compatibility. They have the same interface as native events (preventDefault, stopPropagation) but are pooled for performance. Common event props: onClick, onChange, onSubmit, onMouseEnter, onFocus, onBlur, onKeyDown. Event handler functions receive the event as the first argument. To pass additional data, wrap in an arrow function: onClick={() => handleDelete(id)}.",
      prerequisites: ["useState Hook"],
      learningObjectives: [
        "Attach event handlers to JSX elements",
        "Access event properties and methods",
        "Pass custom arguments to event handlers"
      ],
      resources: [
        { title: "React: Handling Events", url: "https://react.dev/learn/responding-to-events", type: "docs" as const },
        { title: "React: SyntheticEvent", url: "https://react.dev/reference/react-dom/components/common#react-event-object", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Common Event Handlers",
        description: "Click, change, and submit event patterns",
        code: 'function FormExample() {\n  const [value, setValue] = useState("");\n  const [submitted, setSubmitted] = useState("");\n\n  function handleChange(e) {\n    setValue(e.target.value);\n  }\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    setSubmitted(value);\n    setValue("");\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={value} onChange={handleChange} />\n      <button type="submit">Submit</button>\n      {submitted && <p>Submitted: {submitted}</p>}\n    </form>\n  );\n}',
        explanation: "handleChange reads e.target.value — the input's current text. handleSubmit calls e.preventDefault() to avoid full page reload. The form value is reset after submission.",
        difficulty: "beginner",
        concepts: ["onChange", "onSubmit", "preventDefault", "synthetic event", "controlled input"]
      },
      {
        title: "Passing Custom Arguments",
        description: "Adding extra data to event handlers",
        code: 'function ItemList({ items, onDelete }) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={item.id}>\n          {item.name}\n          <button onClick={() => onDelete(item.id)}>\n            Delete\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}\n\n// Parent\nfunction App() {\n  const [items, setItems] = useState([\n    { id: 1, name: "Apple" },\n    { id: 2, name: "Banana" },\n  ]);\n\n  function handleDelete(id) {\n    setItems(items.filter(item => item.id !== id));\n  }\n\n  return <ItemList items={items} onDelete={handleDelete} />;\n}',
        explanation: "The arrow function () => onDelete(item.id) captures the current item's id in a closure. This passes the id along with the synthetic event to the handler.",
        difficulty: "intermediate",
        concepts: ["closure in handlers", "custom arguments", "callback props", "delete pattern"]
      }
    ],
    keyTakeaways: [
      "React uses camelCase event props (onClick, onChange, onSubmit)",
      "Event handlers receive synthetic events with native-like interface",
      "Call e.preventDefault() to stop default browser behavior",
      "Use arrow functions to pass additional arguments to handlers"
    ],
    commonMistakes: [
      { mistake: "Calling the function instead of passing a reference", explanation: "onClick={handleClick()} calls handleClick immediately during render, not on click. The return value (likely undefined) becomes the handler.", howToAvoid: "Pass the function reference: onClick={handleClick} not onClick={handleClick()}." },
      { mistake: "Using e.persist() unnecessarily in React 17+", explanation: "In React 17+, synthetic events are no longer pooled. You can access event properties asynchronously without calling e.persist().", howToAvoid: "Just use the event synchronously. If you need it in an async callback, store the needed value first (const value = e.target.value)." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What is a synthetic event?",
        "How do I pass extra data to an event handler?",
        "Why do I need preventDefault in forms?"
      ]
    }
  },
  "Controlled Inputs": {
    xpReward: 12,
    hints: ["A controlled input has its value tied to state and updates via onChange", "The input value is the single source of truth", "Textarea and select follow the same pattern"],
    notes: {
      summary: "Controlled inputs have their value managed by React state. The input's displayed value always matches the state, making the React state the single source of truth.",
      detailedContent: "An input is 'controlled' when its value prop is set to a state variable and its onChange handler updates that state. This means React controls the input's value at all times — the input cannot change independently. This pattern extends to textarea (<textarea value={state} onChange={...} />), select (<select value={state} onChange={...}>), and checkbox/radio (<input type='checkbox' checked={state} onChange={...} />). Controlled inputs make form state predictable and enable instant validation, formatting, and conditional UI.",
      prerequisites: ["useState Hook", "Event Handlers"],
      learningObjectives: [
        "Create controlled inputs with value and onChange",
        "Handle different input types (text, checkbox, select, textarea)",
        "Understand why controlled inputs are preferred"
      ],
      resources: [
        { title: "React: Controlled Components", url: "https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable", type: "docs" as const },
        { title: "React Forms Guide", url: "https://react.dev/reference/react-dom/components#form-components", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Multiple Input Types",
        description: "Controlling different input elements",
        code: 'function SignupForm() {\n  const [form, setForm] = useState({\n    name: "",\n    email: "",\n    role: "user",\n    agreed: false,\n  });\n\n  function handleChange(e) {\n    const { name, value, type, checked } = e.target;\n    setForm({\n      ...form,\n      [name]: type === "checkbox" ? checked : value,\n    });\n  }\n\n  return (\n    <form>\n      <input name="name" value={form.name} onChange={handleChange} />\n      <input name="email" value={form.email} onChange={handleChange} />\n      <select name="role" value={form.role} onChange={handleChange}>\n        <option value="user">User</option>\n        <option value="admin">Admin</option>\n      </select>\n      <input type="checkbox" name="agreed" checked={form.agreed}\n             onChange={handleChange} />\n    </form>\n  );\n}',
        explanation: "One handler manages all inputs using the input's name attribute. For checkboxes, use checked (not value) and read e.target.checked. Computed property syntax [name] dynamically sets the correct state key.",
        difficulty: "intermediate",
        concepts: ["controlled inputs", "checkbox", "select", "computed property", "single handler"]
      }
    ],
    keyTakeaways: [
      "Controlled inputs have value driven by state and update via onChange",
      "React state is the single source of truth for the input value",
      "Checkbox uses checked prop, text/textarea/select use value",
      "One change handler can manage multiple inputs using the name attribute"
    ],
    commonMistakes: [
      { mistake: "Forgetting to update state in onChange", explanation: "If onChange doesn't update state, the input appears to not respond to typing because value never changes.", howToAvoid: "Always call the state setter in onChange. The handler must update state for the input to reflect changes." },
      { mistake: "Setting initial state to undefined instead of empty string", explanation: "React warns about uncontrolled-to-controlled transitions. If state starts as undefined, React treats the input as uncontrolled until state is set.", howToAvoid: "Initialize state with appropriate defaults: useState('') for text, useState(false) for checkbox." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What is the difference between controlled and uncontrolled inputs?",
        "How do I handle checkbox inputs in React?",
        "Why is my input not updating when I type?"
      ]
    }
  },
  "Counter Logic": {
    xpReward: 25,
    hints: ["Create a function that returns an object with value and increment", "Use a closure to preserve the count variable", "The value should be accessed as a getter property"],
    notes: {
      summary: "Practice implementing a counter using closures to simulate React state patterns in plain JavaScript.",
      detailedContent: "This exercise builds a createCounter() factory function that returns an object with a getter property (value) and an increment method. The count variable is closed over, creating private state. This pattern mirrors how React's useState works internally — state is preserved via closure, and updates trigger behavior (in React, re-renders; here, returning the new value).",
      prerequisites: ["useState Hook"],
      learningObjectives: [
        "Use closures to preserve state across function calls",
        "Implement getter properties for computed values",
        "Create factory functions that return objects with methods"
      ],
      resources: [
        { title: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", type: "docs" as const },
        { title: "MDN: getter", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Counter Implementation",
        description: "Closure-based counter factory",
        code: 'function createCounter() {\n  let value = 0;\n  return {\n    get value() { return value; },\n    increment() {\n      value++;\n      return value;\n    },\n    reset() {\n      value = 0;\n      return value;\n    },\n    set(newValue) {\n      value = newValue;\n      return value;\n    },\n  };\n}\n\nconst c = createCounter();\nconsole.log(c.value);      // 0\nc.increment();\nconsole.log(c.value);      // 1\nc.increment();\nc.increment();\nconsole.log(c.value);      // 3\nc.reset();\nconsole.log(c.value);      // 0',
        explanation: "The count variable is private — it can only be modified through the returned methods. The getter (get value()) allows reading without parentheses. This closure pattern is the foundation of React's state management.",
        difficulty: "beginner",
        concepts: ["closure", "getter", "factory function", "encapsulation"]
      }
    ],
    keyTakeaways: [
      "Closures preserve state between function calls",
      "Getter properties provide clean read access without ()",
      "Factory functions encapsulate private state and expose methods",
      "This closure pattern is similar to React's useState internals"
    ],
    commonMistakes: [
      { mistake: "Forgetting the get keyword before value", explanation: "Without the get keyword, value is a method that must be called: c.value(). With get, it's accessed as a property: c.value.", howToAvoid: "Use get value() { ... } for property-style access. Use regular methods when you need to pass arguments." },
      { mistake: "Returning the value directly instead of using a closure variable", explanation: "If you store value on the returned object (return { value: 0 }), it's public and can be modified directly, breaking encapsulation.", howToAvoid: "Declare value as a local variable in the factory function. Expose only methods that control how value is modified." }
    ],
    playground: {
      enabled: true,
      starterCode: 'function createCounter() {\n  // Your code here\n  return {\n    get value() { },\n    increment() { }\n  };\n}\n\nconst c = createCounter();\nc.increment();\nconsole.log(c.value);',
      language: "javascript",
      hints: ["Use let value = 0 inside createCounter", "The getter returns the current value", "increment() should increase value and return it"],
      solution: 'function createCounter() {\n  let value = 0;\n  return {\n    get value() { return value; },\n    increment() { value++; return value; }\n  };\n}\nconst c = createCounter();\nc.increment();\nconsole.log(c.value);'
    },
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "Why is my getter not working?",
        "How does the closure preserve the count variable?",
        "What's the difference between a getter and a regular method?"
      ]
    }
  },
  "useEffect Basics": {
    xpReward: 15,
    hints: ["useEffect runs after the browser paints the screen", "The first argument is a function (the effect)", "The second argument is the dependency array"],
    notes: {
      summary: "useEffect lets you synchronize a component with an external system: API calls, subscriptions, DOM manipulation, timers, and analytics.",
      detailedContent: "useEffect runs after every render by default (including the first render). It accepts a callback function and an optional dependency array. The effect runs when dependencies change. Effects can return a cleanup function that runs before the next effect run and when the component unmounts. Common use cases: data fetching, setting up subscriptions, timers, manual DOM mutations, and logging. In React 18, useEffect runs synchronously before browser paint in layout effects (useLayoutEffect) and after paint for regular effects (useEffect).",
      prerequisites: ["useState Hook"],
      learningObjectives: [
        "Write useEffect to run code after render",
        "Understand when effects run (mount, update, unmount)",
        "Return a cleanup function to prevent memory leaks"
      ],
      resources: [
        { title: "React: useEffect", url: "https://react.dev/reference/react/useEffect", type: "docs" as const },
        { title: "React: Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Effect Lifecycle",
        description: "Mount, update, and cleanup with useEffect",
        code: 'import { useState, useEffect } from "react";\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    // Runs on mount and every time the component renders\n    console.log("Effect ran (mount or update)");\n\n    const interval = setInterval(() => {\n      setSeconds(prev => prev + 1);\n    }, 1000);\n\n    // Cleanup function — runs before next effect and on unmount\n    return () => {\n      console.log("Cleanup (unmount or before next effect)");\n      clearInterval(interval);\n    };\n  }, []); // Empty array = run only on mount and unmount\n\n  return <div>Timer: {seconds}s</div>;\n}',
        explanation: "The effect sets up an interval on mount. The cleanup function clears the interval on unmount. The empty dependency array means it only runs once (mount). Without the cleanup, intervals would leak if the component unmounts.",
        difficulty: "beginner",
        concepts: ["useEffect", "mount", "unmount", "cleanup", "interval"]
      }
    ],
    keyTakeaways: [
      "useEffect runs after render — perfect for side effects",
      "The dependency array controls when the effect re-runs",
      "Return a cleanup function to prevent memory leaks",
      "Empty [] means run once on mount, cleanup on unmount"
    ],
    commonMistakes: [
      { mistake: "Not providing a dependency array when needed", explanation: "Without any array, the effect runs after EVERY render, potentially causing infinite loops if it updates state.", howToAvoid: "Always specify dependencies. Use [] for mount-only effects. Include all reactive values the effect uses." },
      { mistake: "Forgetting cleanup for subscriptions or timers", explanation: "Setting up intervals, subscriptions, or event listeners without cleanup causes memory leaks and bugs when the component unmounts.", howToAvoid: "Always return a cleanup function that removes subscriptions, clears timers, or removes event listeners." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "When does useEffect run?",
        "What is the cleanup function for?",
        "How do I run an effect only once?"
      ]
    }
  },
  "Fetching Data": {
    xpReward: 15,
    hints: ["Use useEffect + fetch to load data on mount", "Track loading and error states alongside the data", "Don't use async directly in useEffect — define an async function inside"],
    notes: {
      summary: "Data fetching in React uses useEffect to call fetch (or a library) when the component mounts, managing loading, success, and error states.",
      detailedContent: "The standard pattern for fetching data in React: useState for data, loading, and error states; useEffect with an empty dependency array to fetch on mount. Inside the effect, define and call an async function because useEffect's callback cannot be async directly. Handle race conditions with a cleanup flag. For production apps, consider libraries like TanStack Query, SWR, or RTK Query that handle caching, deduplication, and revalidation automatically.",
      prerequisites: ["useEffect Basics"],
      learningObjectives: [
        "Fetch data from an API in useEffect",
        "Track loading and error states",
        "Prevent race conditions with cleanup"
      ],
      resources: [
        { title: "React: Fetching Data with Effects", url: "https://react.dev/learn/synchronizing-with-effects#fetching-data", type: "docs" as const },
        { title: "MDN: fetch()", url: "https://developer.mozilla.org/en-US/docs/Web/API/fetch", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Data Fetching Pattern",
        description: "Fetching data with loading and error states",
        code: 'function UserList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n\n    async function fetchUsers() {\n      try {\n        setLoading(true);\n        const response = await fetch("https://api.example.com/users");\n        if (!response.ok) throw new Error("Failed to fetch");\n        const data = await response.json();\n        if (!cancelled) {\n          setUsers(data);\n          setError(null);\n        }\n      } catch (err) {\n        if (!cancelled) {\n          setError(err.message);\n          setUsers([]);\n        }\n      } finally {\n        if (!cancelled) setLoading(false);\n      }\n    }\n\n    fetchUsers();\n\n    return () => { cancelled = true; };\n  }, []);\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error}</div>;\n  return (\n    <ul>\n      {users.map(user => <li key={user.id}>{user.name}</li>)}\n    </ul>\n  );\n}',
        explanation: "The cancelled flag prevents setting state after unmount (race condition). Loading state shows a spinner. Error state catches network failures. The cleanup sets cancelled = true when component unmounts or deps change.",
        difficulty: "intermediate",
        concepts: ["data fetching", "async/await", "race condition", "loading state", "error handling"]
      }
    ],
    keyTakeaways: [
      "Fetch inside useEffect with a cleanup flag to prevent race conditions",
      "Always handle loading, success, and error states in the UI",
      "Define async functions inside the effect (don't make the effect callback async)",
      "Consider caching libraries (TanStack Query, SWR) for production apps"
    ],
    commonMistakes: [
      { mistake: "Making the useEffect callback async directly", explanation: "useEffect expects a cleanup function or nothing. An async function returns a Promise, which React may interpret as a cleanup function.", howToAvoid: "Define async functions inside the effect and call them. Never add async directly to the useEffect callback." },
      { mistake: "Not handling race conditions (setting state after unmount)", explanation: "If the component unmounts or the effect re-runs before fetch completes, setState is called on an unmounted component, causing a React warning.", howToAvoid: "Use a cancelled boolean flag in effect cleanup, or use an AbortController with the fetch API." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I prevent setting state on unmounted components?",
        "Should I use useEffect for all data fetching?",
        "What are the alternatives to fetching with useEffect?"
      ]
    }
  },
  "Dependency Array": {
    xpReward: 12,
    hints: ["The dependency array tells React when to re-run the effect", "Include all reactive values that the effect uses", "Empty [] means run once; no array means run on every render"],
    notes: {
      summary: "The dependency array controls when useEffect re-runs. It should include every reactive value (props, state, derived values) used inside the effect.",
      detailedContent: "React compares dependency values using Object.is. If any dependency changed since the last render, the effect re-runs (after first running the cleanup). The linter (eslint-plugin-react-hooks/exhaustive-deps) warns when dependencies are missing. Common pitfalls: omitting dependencies (stale closures), including objects/arrays that change every render (infinite loops), or including unnecessary dependencies. For stable function references, use useCallback. For objects, use useMemo or restructure data to primitives.",
      prerequisites: ["useEffect Basics"],
      learningObjectives: [
        "List the dependencies of an effect correctly",
        "Avoid stale closures by including all reactive values",
        "Use the exhaustive-deps lint rule to guide dependency choices"
      ],
      resources: [
        { title: "React: useEffect Dependencies", url: "https://react.dev/reference/react/useEffect#specifying-reactive-dependencies", type: "docs" as const },
        { title: "React: Removal of Effect Dependencies", url: "https://react.dev/learn/removing-effect-dependencies", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Dependency Patterns",
        description: "How different dependency arrays affect behavior",
        code: 'function SearchResults({ query }) {\n  const [results, setResults] = useState([]);\n\n  // Runs on every render — usually a bug\n  useEffect(() => {\n    console.log("Runs after every render");\n  });\n\n  // Runs once on mount\n  useEffect(() => {\n    console.log("Runs once on mount");\n  }, []);\n\n  // Runs on mount and whenever query changes\n  useEffect(() => {\n    async function search() {\n      const res = await fetch(`/api/search?q=${query}`);\n      const data = await res.json();\n      setResults(data);\n    }\n    search();\n  }, [query]);\n\n  // Multiple dependencies\n  useEffect(() => {\n    console.log("Runs when query or page changes");\n  }, [query, page]);\n\n  return <div>{/* render results */}</div>;\n}',
        explanation: "The dependency array tells React: 're-run this effect when these values change'. Missing dependencies cause stale closures. Unnecessary dependencies cause extra re-runs.",
        difficulty: "intermediate",
        concepts: ["dependency array", "stale closure", "reactive values", "effect lifecycle"]
      }
    ],
    keyTakeaways: [
      "Include every reactive value from the effect in the dependency array",
      "Empty [] = runs once on mount, cleans up on unmount",
      "Missing dependencies cause stale closures (outdated values)",
      "Use the eslint exhaustive-deps rule to catch missing dependencies"
    ],
    commonMistakes: [
      { mistake: "Omitting the dependency array entirely", explanation: "Without a dependency array, the effect runs after EVERY render. This often causes infinite loops if the effect sets state.", howToAvoid: "Always provide a dependency array. Use [] for mount-only effects, or list all reactive dependencies." },
      { mistake: "Lying about dependencies (listing fewer than used)", explanation: "If the effect uses query but only lists [], the effect captures the initial query value and never updates — a stale closure.", howToAvoid: "Always include all reactive values used in the effect. If you truly need to omit one, restructure the code or use a ref." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What happens if I don't provide a dependency array?",
        "How do I know what to put in the dependency array?",
        "Why is my effect using a stale value?"
      ]
    }
  },
  "Loading & Error UI": {
    xpReward: 10,
    hints: ["Always show visual feedback during loading", "Error messages should be user-friendly, not technical", "Consider different UI states: loading, empty, error, success"],
    notes: {
      summary: "Good UX means handling all states: loading (spinners/skeletons), empty (helpful messages), error (retry options), and success (data display).",
      detailedContent: "Users should never see a blank screen or confusing state. The four states to handle: loading (initial fetch or after user action), empty (no data found), error (network failure, server error, permission denied), and success (display data). For loading: use skeleton components that match the content shape (preferred over spinners for content-heavy pages). For errors: show a clear message with actionable options (retry button, contact support). For empty: provide guidance on what to do next.",
      prerequisites: ["Fetching Data"],
      learningObjectives: [
        "Implement loading skeletons and spinners",
        "Display user-friendly error messages with retry options",
        "Handle empty states with helpful guidance"
      ],
      resources: [
        { title: "React: Error Boundaries", url: "https://react.dev/reference/react/Component#catch", type: "docs" as const },
        { title: "UI Pattern: Loading States", url: "https://www.patterns.dev/patterns/loading-state/", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Complete State Management",
        description: "Handling all UI states",
        code: 'function Dashboard({ userId }) {\n  const [state, setState] = useState({\n    data: null,\n    loading: true,\n    error: null,\n  });\n\n  async function loadData() {\n    setState({ data: null, loading: true, error: null });\n    try {\n      const response = await fetch(`/api/user/${userId}`);\n      if (!response.ok) throw new Error("User not found");\n      const data = await response.json();\n      setState({ data, loading: false, error: null });\n    } catch (err) {\n      setState({ data: null, loading: false, error: err.message });\n    }\n  }\n\n  useEffect(() => { loadData(); }, [userId]);\n\n  if (state.loading) return <Skeleton />;\n  if (state.error) return (\n    <ErrorPanel\n      message={state.error}\n      onRetry={loadData}\n    />\n  );\n  if (!state.data) return <EmptyState message="No user data" />;\n  return <UserProfile user={state.data} />;\n}\n\nfunction Skeleton() {\n  return <div className="skeleton"><div className="shimmer" /></div>;\n}\n\nfunction ErrorPanel({ message, onRetry }) {\n  return (\n    <div className="error">\n      <h3>Something went wrong</h3>\n      <p>{message}</p>\n      <button onClick={onRetry}>Try Again</button>\n    </div>\n  );\n}',
        explanation: "Early return pattern keeps the main render clean. Skeleton components provide visual feedback during loading. The error panel includes a retry button (calling loadData again). Empty state shows a clear message.",
        difficulty: "intermediate",
        concepts: ["state machine", "loading skeleton", "error boundary", "retry pattern", "empty state"]
      }
    ],
    keyTakeaways: [
      "Always handle four states: loading, error, empty, success",
      "Use skeleton loaders for better perceived performance",
      "Show clear error messages with retry actions",
      "Empty states should guide users on what to do next"
    ],
    commonMistakes: [
      { mistake: "Showing a generic spinner for all loading states", explanation: "Skeleton loaders that match content layout feel faster and prepare users for the content structure.", howToAvoid: "Use skeleton components that mimic the actual layout. For cards, show card-shaped skeletons. For lists, show repeated line skeletons." },
      { mistake: "Showing raw error objects or stack traces to users", explanation: "Technical error messages confuse users and expose internal implementation details.", howToAvoid: "Always present user-friendly error messages. Log the technical details to the console or an error reporting service." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What UI states should I handle?",
        "How do I create a skeleton loading component?",
        "What's the best way to handle errors in React?"
      ]
    }
  },
  "map() in JSX": {
    xpReward: 10,
    hints: ["Array.map() transforms data into JSX elements", "Always provide a unique key prop when mapping to JSX", "The map callback returns JSX directly"],
    notes: {
      summary: "Array.map() is the primary way to render lists in React. Each element in the resulting array must have a unique key prop for efficient reconciliation.",
      detailedContent: "In React, you almost never write explicit for loops. Instead, you use array methods — especially map() — to transform data into JSX elements. The map callback runs on every render, so expensive transformations should be memoized with useMemo. The key prop helps React identify which items changed, were added, or removed. Keys should be stable, unique, and predictable — prefer database IDs over array indices.",
      prerequisites: ["JSX Syntax"],
      learningObjectives: [
        "Use map() to render arrays of data as JSX",
        "Understand why keys are required",
        "Combine map() with conditional rendering"
      ],
      resources: [
        { title: "React: Rendering Lists", url: "https://react.dev/learn/rendering-lists", type: "docs" as const },
        { title: "MDN: Array.prototype.map()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Basic List Rendering",
        description: "Transforming an array into JSX elements",
        code: 'function FruitList() {\n  const fruits = ["Apple", "Banana", "Cherry", "Date"];\n\n  return (\n    <ul>\n      {fruits.map((fruit, index) => (\n        <li key={index}>{fruit}</li>\n      ))}\n    </ul>\n  );\n}\n\n// Better: using stable IDs\nfunction UserList({ users }) {\n  return (\n    <ul>\n      {users.map(user => (\n        <li key={user.id}>\n          <span>{user.name}</span>\n          <span>{user.email}</span>\n        </li>\n      ))}\n    </ul>\n  );\n}',
        explanation: "The map callback returns JSX elements directly. The key prop is required for each element. Use stable IDs (user.id) instead of array index when items can be reordered or filtered.",
        difficulty: "beginner",
        concepts: ["map", "list rendering", "key prop", "JSX in callbacks"]
      },
      {
        title: "Conditional Content in Lists",
        description: "Filtering and transforming in the render",
        code: 'function ProductList({ products }) {\n  return (\n    <div className="grid">\n      {products\n        .filter(p => p.inStock)\n        .map(product => (\n          <ProductCard\n            key={product.id}\n            product={product}\n            onAddToCart={() => handleAdd(product)}\n          />\n        ))}\n    </div>\n  );\n}\n\n// Or separate filter and map for readability\nfunction ActiveUsers({ users }) {\n  const activeUsers = users.filter(u => u.active);\n  return (\n    <ul>\n      {activeUsers.map(user => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}',
        explanation: "Chain array methods for data transformation pipelines: filter first, then map. For complex logic, store intermediate results in variables for readability. The key always goes on the outermost element of the map callback.",
        difficulty: "intermediate",
        concepts: ["chaining", "filter + map", "intermediate variables", "conditional lists"]
      }
    ],
    keyTakeaways: [
      "map() transforms data arrays into JSX element arrays",
      "Every mapped element needs a unique key prop",
      "Prefer stable IDs over array indices for keys",
      "Chain filter and map for data processing pipelines"
    ],
    commonMistakes: [
      { mistake: "Forgetting the key prop on mapped elements", explanation: "Missing keys cause React warnings and can lead to incorrect rendering when lists are reordered.", howToAvoid: "Always add key={item.id} to the outermost JSX element in the map callback." },
      { mistake: "Using array index as key when items can reorder", explanation: "Index keys cause issues with sorting, filtering, and inserting — React may reuse wrong elements.", howToAvoid: "Use unique database IDs, UUIDs, or any stable identifier. Only use index for static, non-reorderable lists." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Why do I need a key prop when mapping?",
        "When is it safe to use index as a key?",
        "How do I render nested lists with map?"
      ]
    }
  },
  "Keys": {
    xpReward: 10,
    hints: ["Keys help React identify which items changed, were added, or removed", "Keys must be unique among siblings", "Avoid using array index as key if the list can change"],
    notes: {
      summary: "Keys are unique identifiers that React uses to match elements between renders, enabling efficient updates and preserving component state.",
      detailedContent: "When rendering lists, React uses keys to determine which items were added, removed, or reordered. If keys are stable and unique, React can update the DOM efficiently. Without proper keys, React may unnecessarily re-render or incorrectly reuse component state (e.g., input values persisting after reorder). The best key is a unique and immutable ID from your data. Use index only as a last resort for static, non-filterable lists.",
      prerequisites: ["map() in JSX"],
      learningObjectives: [
        "Explain the purpose of keys in React",
        "Choose appropriate key values for your data",
        "Understand the consequences of missing or unstable keys"
      ],
      resources: [
        { title: "React: Why Keys Matter", url: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key", type: "docs" as const },
        { title: "React: Key Attribute", url: "https://react.dev/reference/react/memo#key", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Key Behavior Demo",
        description: "Showing the impact of keys on component state",
        code: 'function TaskList() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React" },\n    { id: 2, text: "Build a project" },\n  ]);\n\n  function reverse() {\n    setTasks([...tasks].reverse());\n  }\n\n  return (\n    <div>\n      <button onClick={reverse}>Reverse</button>\n      {tasks.map(task => (\n        // BAD: using index — input value stays with wrong item\n        // <TaskItem key={index} task={task} />\n\n        // GOOD: using id — input value stays with correct item\n        <TaskItem key={task.id} task={task} />\n      ))}\n    </div>\n  );\n}\n\nfunction TaskItem({ task }) {\n  const [value, setValue] = useState(task.text);\n  return <input value={value} onChange={e => setValue(e.target.value)} />;\n}',
        explanation: "With key={task.id}, each TaskItem's state is tied to the task's identity. Reversing the list correctly preserves each input's value. With key={index}, values swap because index 0 always maps to the first item.",
        difficulty: "intermediate",
        concepts: ["key identity", "state preservation", "reconciliation", "stable keys"]
      }
    ],
    keyTakeaways: [
      "Keys uniquely identify list items for React's reconciliation",
      "Stable keys preserve component state across re-renders",
      "Prefer data IDs over array indices",
      "Keys must be unique only among siblings, not globally"
    ],
    commonMistakes: [
      { mistake: "Using Math.random() or Date.now() as keys", explanation: "Random keys change on every render, forcing React to destroy and recreate all elements — terrible for performance and loses state.", howToAvoid: "Always use stable, deterministic keys from your data (IDs, slugs, combination of fields)." },
      { mistake: "Not using keys at all (React warns but still works)", explanation: "Without keys, React uses index implicitly, which causes incorrect behavior when items are reordered, added, or removed.", howToAvoid: "Always provide explicit keys. If your data has no natural ID, generate one with a library like uuid or nanoid." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What happens if I don't provide a key?",
        "Can I use key outside of lists?",
        "Should keys be globally unique?"
      ]
    }
  },
  "Filtering": {
    xpReward: 10,
    hints: ["Filter is a derived computation — compute it during render or use useMemo", "Don't store filtered data in state — derive it from the source", "Combine filter with other array methods for data pipelines"],
    notes: {
      summary: "Filtered lists in React should use computed/derived state — filter the data during render rather than storing filtered results in state.",
      detailedContent: "A common mistake is storing filtered data in a separate state variable. Instead, compute filtered results during render using useMemo for expensive operations. This keeps a single source of truth and avoids synchronization bugs. Combine filter with sort, map, and search for rich data transformations. For real-time filtering (search inputs), the filter function runs on every keystroke — use useMemo or debounce for performance.",
      prerequisites: ["map() in JSX", "Keys"],
      learningObjectives: [
        "Filter data during render instead of storing filtered state",
        "Use useMemo to optimize expensive filter operations",
        "Build search/filter UIs with controlled inputs"
      ],
      resources: [
        { title: "React: Derived State", url: "https://react.dev/learn/choosing-the-state-structure#principles-for-structuring-state", type: "docs" as const },
        { title: "React: useMemo", url: "https://react.dev/reference/react/useMemo", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Search and Filter Pattern",
        description: "Filtering data based on user input",
        code: 'function ProductCatalog({ products }) {\n  const [search, setSearch] = useState("");\n  const [category, setCategory] = useState("all");\n\n  const filteredProducts = useMemo(() => {\n    return products.filter(product => {\n      const matchesSearch = product.name\n        .toLowerCase()\n        .includes(search.toLowerCase());\n      const matchesCategory =\n        category === "all" || product.category === category;\n      return matchesSearch && matchesCategory;\n    });\n  }, [products, search, category]);\n\n  return (\n    <div>\n      <input\n        placeholder="Search products..."\n        value={search}\n        onChange={e => setSearch(e.target.value)}\n      />\n      <select value={category} onChange={e => setCategory(e.target.value)}>\n        <option value="all">All</option>\n        <option value="electronics">Electronics</option>\n        <option value="clothing">Clothing</option>\n      </select>\n\n      {filteredProducts.length === 0 ? (\n        <p>No products found</p>\n      ) : (\n        <ul>\n          {filteredProducts.map(product => (\n            <li key={product.id}>{product.name}</li>\n          ))}\n        </ul>\n      )}\n    </div>\n  );\n}',
        explanation: "filteredProducts is derived from products, search, and category. useMemo recalculates only when those dependencies change. The empty state shows a helpful message. The source data (products) is never mutated.",
        difficulty: "intermediate",
        concepts: ["derived state", "useMemo", "controlled filter", "empty state", "search"]
      }
    ],
    keyTakeaways: [
      "Derive filtered data during render — don't store it in state",
      "Use useMemo for expensive filtering operations",
      "Combine multiple filter criteria with logical AND/OR",
      "Always handle the empty results state"
    ],
    commonMistakes: [
      { mistake: "Storing filtered results in a separate state variable", explanation: "This creates two sources of truth that can get out of sync. If the source data changes but filter doesn't re-run, the displayed data is wrong.", howToAvoid: "Compute filtered data during render (or useMemo). Never setFilteredList() as a separate state." },
      { mistake: "Filtering without debouncing for API calls", explanation: "If filtering triggers an API request on every keystroke, it overwhelms the server.", howToAvoid: "Debounce the search input (wait 300ms after last keystroke) or use a search-on-submit pattern." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "Why shouldn't I store filtered data in state?",
        "When should I use useMemo for filtering?",
        "How do I implement a search with debounce?"
      ]
    }
  },
  "Filter Active Users": {
    xpReward: 25,
    hints: ["Use Array.filter() to select active users", "Use Array.map() to extract names", "Use Array.join() to create comma-separated string"],
    notes: {
      summary: "Practice chaining array methods to filter active users and return a comma-separated list of their names.",
      detailedContent: "This exercise combines filter (select active users), map (extract names), and join (format as comma-separated string). The one-liner filter().map().join() is a classic data pipeline in JavaScript/React. This pattern is used constantly in React for transforming data before rendering.",
      prerequisites: ["Filtering", "map() in JSX"],
      learningObjectives: [
        "Chain array methods for data transformation",
        "Use filter, map, and join together",
        "Write clean, functional data pipelines"
      ],
      resources: [
        { title: "MDN: Array.filter()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter", type: "docs" as const },
        { title: "MDN: Array.join()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Active Users Pipeline",
        description: "Different ways to implement the same logic",
        code: 'function activeNames(users) {\n  return users\n    .filter(u => u.active)\n    .map(u => u.name)\n    .join(",");\n}\n\n// Step by step version\nfunction activeNamesVerbose(users) {\n  const activeUsers = users.filter(u => u.active);\n  const names = activeUsers.map(u => u.name);\n  return names.join(",");\n}\n\n// More robust (handles empty)\nfunction activeNamesSafe(users) {\n  if (!users || users.length === 0) return "";\n  return users.filter(u => u.active).map(u => u.name).join(",");\n}\n\nconst users = [\n  { name: "A", active: true },\n  { name: "B", active: false },\n  { name: "C", active: true },\n];\nconsole.log(activeNames(users)); // "A,C"',
        explanation: "The chain reads like a sentence: filter active users, get their names, join with commas. The verbose version is easier to debug (inspect intermediate values). The safe version handles edge cases.",
        difficulty: "beginner",
        concepts: ["method chaining", "filter", "map", "join", "data pipeline"]
      }
    ],
    keyTakeaways: [
      "Chain array methods for readable data transformations",
      "filter -> map -> join is a common React pattern",
      "Break long chains into steps for easier debugging",
      "Always consider edge cases: null, empty arrays"
    ],
    commonMistakes: [
      { mistake: "Forgetting to return the result of the chain", explanation: "Without return, the function returns undefined. The chain builds the value but doesn't pass it back.", howToAvoid: "Use arrow function implicit return or explicit return statement." },
      { mistake: "Not handling empty or null input", explanation: "Calling .filter() on null or undefined throws a TypeError.", howToAvoid: "Add a guard: if (!users) return '' or use optional chaining: users?.filter(...)." }
    ],
    playground: {
      enabled: true,
      starterCode: 'function activeNames(users) {\n  // Your code here\n}\n\nconst users = [\n  { name: "A", active: true },\n  { name: "B", active: false },\n  { name: "C", active: true },\n];\nconsole.log(activeNames(users));',
      language: "javascript",
      hints: ["Use users.filter() to get active users", "Chain .map() to extract names", "Use .join(',') for the final string"],
      solution: 'function activeNames(users) {\n  return users.filter(u => u.active).map(u => u.name).join(",");\n}\n\nconst users = [\n  { name: "A", active: true },\n  { name: "B", active: false },\n  { name: "C", active: true },\n];\nconsole.log(activeNames(users));'
    },
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "What does join() do?",
        "How do I handle an empty array?",
        "Can I chain more methods like sort or reduce?"
      ]
    }
  },
  "Form State": {
    xpReward: 12,
    hints: ["Store form fields in a single state object", "Use one change handler for all fields with the name attribute", "Reset form by setting state back to initial values"],
    notes: {
      summary: "Form state in React is managed with useState, typically using a single object for all fields with a shared change handler pattern.",
      detailedContent: "For small forms, a single useState object with all fields is manageable. For larger forms, consider useReducer or libraries like React Hook Form and Formik. The key pattern: each input has a name attribute matching the state key, and a single handleChange uses e.target.name with computed property syntax to update the correct field. Form initialization can use useEffect with async data. Form reset restores the initial state object.",
      prerequisites: ["Controlled Inputs"],
      learningObjectives: [
        "Manage form state with a single state object",
        "Use computed property names for dynamic field updates",
        "Reset form fields to initial values"
      ],
      resources: [
        { title: "React: Choosing State Structure", url: "https://react.dev/learn/choosing-the-state-structure", type: "docs" as const },
        { title: "React Hook Form", url: "https://react-hook-form.com/", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Form State Management",
        description: "Managing a registration form with useState",
        code: 'const INITIAL_FORM = { username: "", email: "", password: "", role: "user" };\n\nfunction RegisterForm() {\n  const [form, setForm] = useState(INITIAL_FORM);\n  const [errors, setErrors] = useState({});\n\n  function handleChange(e) {\n    const { name, value } = e.target;\n    setForm(prev => ({ ...prev, [name]: value }));\n    if (errors[name]) {\n      setErrors(prev => ({ ...prev, [name]: "" }));\n    }\n  }\n\n  function handleSubmit(e) {\n    e.preventDefault();\n  }\n\n  function handleReset() {\n    setForm(INITIAL_FORM);\n    setErrors({});\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="username" value={form.username} onChange={handleChange} />\n      <input name="email" type="email" value={form.email} onChange={handleChange} />\n      <input name="password" type="password" value={form.password} onChange={handleChange} />\n      <select name="role" value={form.role} onChange={handleChange}>\n        <option value="user">User</option>\n        <option value="admin">Admin</option>\n      </select>\n      <button type="submit">Register</button>\n      <button type="button" onClick={handleReset}>Reset</button>\n    </form>\n  );\n}',
        explanation: "INITIAL_FORM constant enables easy reset. Computed property [name] dynamically selects the field to update. Spread keeps other fields intact. Errors are cleared per-field when the user starts typing.",
        difficulty: "intermediate",
        concepts: ["form state object", "computed properties", "form reset", "error clearing"]
      }
    ],
    keyTakeaways: [
      "Use a single state object for related form fields",
      "Use computed property syntax [name] in the setter for dynamic updates",
      "Store initial values in a constant for easy reset",
      "For complex forms, consider useReducer or Form libraries"
    ],
    commonMistakes: [
      { mistake: "Using separate useState calls for each field", explanation: "Ten fields means ten useState calls and ten setters, making the code verbose and hard to manage.", howToAvoid: "Use a single state object. For very large forms, use useReducer or a form library." },
      { mistake: "Mutating the state object directly", explanation: "setForm(prev => { prev[name] = value; return prev; }) mutates state — React won't detect the change.", howToAvoid: "Always create a new object: setForm(prev => ({ ...prev, [name]: value }))." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How do I manage complex form state?",
        "What's the best way to reset a form?",
        "When should I use React Hook Form?"
      ]
    }
  },
  "Validation": {
    xpReward: 12,
    hints: ["Validate before submission and show inline errors", "Use a validate function that returns an errors object", "Validate on blur (touched) for better UX"],
    notes: {
      summary: "Form validation in React involves checking field values against rules and displaying error messages, both on submit and in real-time.",
      detailedContent: "Validation strategies: submit-time (validate all fields when form is submitted), blur-time (validate individual fields when user leaves them), and change-time (validate as user types). Best UX combines blur for initial feedback and submit for final check. A validate function returns an object mapping field names to error messages (empty string or null means valid). Common validations: required, email format, min/max length, password strength, password confirmation match.",
      prerequisites: ["Form State"],
      learningObjectives: [
        "Write a validation function that checks multiple rules",
        "Display inline error messages next to fields",
        "Implement validation on blur and submit"
      ],
      resources: [
        { title: "React: Form Validation Patterns", url: "https://react.dev/reference/react-dom/components/input#providing-a-label-for-an-input", type: "docs" as const },
        { title: "MDN: Constraint Validation API", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Validation Pattern",
        description: "Validate on blur and submit with inline errors",
        code: 'function validate(values) {\n  const errors = {};\n\n  if (!values.username.trim()) {\n    errors.username = "Username is required";\n  } else if (values.username.length < 3) {\n    errors.username = "Username must be at least 3 characters";\n  }\n\n  if (!values.email) {\n    errors.email = "Email is required";\n  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)) {\n    errors.email = "Invalid email format";\n  }\n\n  if (!values.password) {\n    errors.password = "Password is required";\n  } else if (values.password.length < 6) {\n    errors.password = "Password must be at least 6 characters";\n  }\n\n  if (values.password !== values.confirmPassword) {\n    errors.confirmPassword = "Passwords do not match";\n  }\n\n  return errors;\n}\n\nfunction SignupForm() {\n  const [form, setForm] = useState(INITIAL);\n  const [errors, setErrors] = useState({});\n  const [touched, setTouched] = useState({});\n\n  function handleBlur(e) {\n    const { name } = e.target;\n    setTouched(prev => ({ ...prev, [name]: true }));\n    const fieldErrors = validate(form);\n    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] || "" }));\n  }\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    const validationErrors = validate(form);\n    setErrors(validationErrors);\n    setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));\n    if (Object.values(validationErrors).every(e => !e)) {\n      // Submit form...\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <div>\n        <input name="username" value={form.username} onChange={handleChange} onBlur={handleBlur}\n          className={errors.username && touched.username ? "error" : ""} />\n        {touched.username && errors.username && <span className="error-msg">{errors.username}</span>}\n      </div>\n      <button type="submit">Sign Up</button>\n    </form>\n  );\n}',
        explanation: "The validate() function is pure — it takes values, returns errors. touched tracks which fields the user has interacted with. Errors only show after touch or submit. CSS class toggles for error styling.",
        difficulty: "intermediate",
        concepts: ["validation", "touched state", "inline errors", "blur validation", "submit validation"]
      }
    ],
    keyTakeaways: [
      "Keep validation logic in a pure function separate from the component",
      "Use a touched state to show errors only after user interaction",
      "Validate on blur for immediate feedback, on submit for final check",
      "Error messages should be specific and actionable"
    ],
    commonMistakes: [
      { mistake: "Showing all errors immediately when the form loads", explanation: "Users see a wall of red text before they've even touched a field — overwhelming and confusing.", howToAvoid: "Only show errors for fields the user has touched or after they've tried to submit." },
      { mistake: "Using alert() for form errors", explanation: "Alerts block the UX and don't point to the specific field with the error.", howToAvoid: "Display inline error messages next to the relevant field with clear visual indicators." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "When should I validate: on change, blur, or submit?",
        "How do I create reusable validation rules?",
        "What's the best way to display error messages?"
      ]
    }
  },
  "Submit Handlers": {
    xpReward: 10,
    hints: ["Always call e.preventDefault() in form onSubmit", "Consider async submission with loading state", "Disable the submit button while submitting"],
    notes: {
      summary: "Form submission in React uses the onSubmit handler on the form element (not onClick on the button) with preventDefault to avoid page reloads.",
      detailedContent: "Attach onSubmit to the <form> element — this handles both button clicks and Enter key presses. Always call e.preventDefault() first. For async submissions (API calls), track a submitting state to show progress and disable the button. Handle success (reset form, show toast, redirect) and failure (show error, keep form values). Consider optimistic UI for a faster feel.",
      prerequisites: ["Form State", "Validation"],
      learningObjectives: [
        "Handle form submission with onSubmit",
        "Prevent default browser form behavior",
        "Implement async submission with loading states"
      ],
      resources: [
        { title: "React: Form onSubmit", url: "https://react.dev/reference/react-dom/components/form#on-submit", type: "docs" as const },
        { title: "HTML: Form Submission", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Async Form Submission",
        description: "Full submission flow with loading and error states",
        code: 'function ContactForm() {\n  const [form, setForm] = useState({ name: "", message: "" });\n  const [submitting, setSubmitting] = useState(false);\n  const [result, setResult] = useState(null);\n\n  async function handleSubmit(e) {\n    e.preventDefault();\n    setSubmitting(true);\n    setResult(null);\n    try {\n      const response = await fetch("/api/contact", {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify(form),\n      });\n      if (!response.ok) throw new Error("Submission failed");\n      setResult({ type: "success", message: "Message sent!" });\n      setForm({ name: "", message: "" });\n    } catch (error) {\n      setResult({ type: "error", message: error.message });\n    } finally {\n      setSubmitting(false);\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="name" value={form.name} onChange={handleChange} disabled={submitting} required />\n      <textarea name="message" value={form.message} onChange={handleChange} disabled={submitting} required />\n      <button type="submit" disabled={submitting}>\n        {submitting ? "Sending..." : "Send Message"}\n      </button>\n      {result && <div className={result.type}>{result.message}</div>}\n    </form>\n  );\n}',
        explanation: "preventDefault stops page reload. disabled={submitting} prevents double submission. The button text changes to show progress. The form resets on success. Error message shows on failure.",
        difficulty: "intermediate",
        concepts: ["async submit", "preventDefault", "loading state", "disabled button", "form reset", "feedback message"]
      }
    ],
    keyTakeaways: [
      "Attach onSubmit to the <form> element, not onClick to the button",
      "Always call e.preventDefault() to stop page reload",
      "Track submitting state to disable inputs and show progress",
      "Handle both success and error states after submission"
    ],
    commonMistakes: [
      { mistake: "Using onClick on the submit button instead of onSubmit on the form", explanation: "Button onClick doesn't handle Enter key submissions or accessibility (screen reader form submission).", howToAvoid: "Always use onSubmit on the <form> element. A type='submit' button inside will trigger it." },
      { mistake: "Not disabling the button during submission", explanation: "Users can click multiple times, sending duplicate submissions.", howToAvoid: "Set disabled={submitting} on the button and all inputs during submission to prevent double-send." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "Why do I need preventDefault()?",
        "How do I prevent double form submission?",
        "What should I do after successful submission?"
      ]
    }
  },
  "Accessibility": {
    xpReward: 12,
    hints: ["Use semantic HTML elements (button, nav, main, aside)", "Every input needs a label", "Use aria attributes when HTML semantics aren't enough"],
    notes: {
      summary: "Accessibility (a11y) ensures your React app works for all users, including those using screen readers, keyboard navigation, or assistive technologies.",
      detailedContent: "React produces HTML, so standard accessibility rules apply. Key practices: use semantic HTML (<button> not <div onClick>), associate labels with inputs (htmlFor/id), use heading hierarchy (h1-h6), provide alt text on images, ensure color contrast, support keyboard navigation (tabIndex, onKeyDown), and use ARIA attributes when HTML semantics are insufficient. React's fragment (<>...</>) doesn't create DOM nodes, preserving accessibility semantics. Test with a screen reader (NVDA, VoiceOver) and keyboard-only navigation.",
      prerequisites: ["Submit Handlers"],
      learningObjectives: [
        "Use semantic HTML elements in JSX",
        "Associate labels with inputs using htmlFor",
        "Implement keyboard-accessible components"
      ],
      resources: [
        { title: "React: Accessibility", url: "https://react.dev/reference/react-dom/components#accessibility", type: "docs" as const },
        { title: "MDN: ARIA Guide", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA", type: "docs" as const },
        { title: "Web Content Accessibility Guidelines (WCAG)", url: "https://www.w3.org/WAI/standards-guidelines/wcag/", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Accessible Form",
        description: "Form with proper labels, ARIA attributes, and keyboard support",
        code: 'function AccessibleForm() {\n  const [form, setForm] = useState({ email: "" });\n  const [error, setError] = useState("");\n  const errorId = "email-error";\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    if (!form.email) {\n      setError("Please enter your email address");\n      return;\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <label htmlFor="email-input">Email address</label>\n      <input\n        id="email-input"\n        name="email"\n        type="email"\n        value={form.email}\n        onChange={e => { setForm({ email: e.target.value }); setError(""); }}\n        aria-invalid={!!error}\n        aria-describedby={error ? errorId : undefined}\n        required\n      />\n      {error && <p id={errorId} role="alert">{error}</p>}\n      <button type="submit">Subscribe</button>\n    </form>\n  );\n}\n\nfunction IconButton({ label, icon, onClick }) {\n  return (\n    <button onClick={onClick} aria-label={label} title={label}>\n      {icon}\n    </button>\n  );\n}',
        explanation: "htmlFor/id connects label to input. aria-invalid tells screen readers the field has an error. aria-describedby links error text to input. role='alert' announces errors. aria-label provides text for icon-only buttons.",
        difficulty: "intermediate",
        concepts: ["label", "htmlFor", "aria-invalid", "aria-describedby", "aria-label", "role alert"]
      },
      {
        title: "Keyboard Navigation",
        description: "Custom menu component with keyboard support",
        code: 'function Menu({ items }) {\n  const [focusIndex, setFocusIndex] = useState(0);\n\n  function handleKeyDown(e) {\n    switch (e.key) {\n      case "ArrowDown":\n        e.preventDefault();\n        setFocusIndex(prev => (prev + 1) % items.length);\n        break;\n      case "ArrowUp":\n        e.preventDefault();\n        setFocusIndex(prev => (prev - 1 + items.length) % items.length);\n        break;\n      case "Enter":\n      case " ":\n        e.preventDefault();\n        items[focusIndex].onAction();\n        break;\n    }\n  }\n\n  return (\n    <ul role="menu" onKeyDown={handleKeyDown}>\n      {items.map((item, index) => (\n        <li key={item.id} role="menuitem" tabIndex={index === focusIndex ? 0 : -1}\n            onClick={item.onAction} ref={el => index === focusIndex && el?.focus()}>\n          {item.label}\n        </li>\n      ))}\n    </ul>\n  );\n}',
        explanation: "ARIA roles (menu, menuitem) communicate component purpose to screen readers. tabIndex manages focusable elements. Keyboard handlers enable Arrow navigation. Focus tracking highlights the active item.",
        difficulty: "advanced",
        concepts: ["keyboard navigation", "ARIA roles", "tabIndex", "focus management", "roving tabindex"]
      }
    ],
    keyTakeaways: [
      "Use semantic HTML elements before ARIA",
      "Every input needs a visible label via htmlFor/id",
      "Test with keyboard-only navigation (Tab, Enter, Escape)",
      "Use aria-invalid, aria-describedby, and role='alert' for form errors"
    ],
    commonMistakes: [
      { mistake: "Using <div onClick={...}> instead of <button>", explanation: "Divs are not keyboard-focusable and don't communicate 'interactive' to screen readers.", howToAvoid: "Always use <button> for clickable actions. Style the button with CSS if needed." },
      { mistake: "Forgetting to hide decorative icons from screen readers", explanation: "Icons used purely for decoration should be hidden with aria-hidden='true' so screen readers don't announce them.", howToAvoid: "Add aria-hidden='true' to decorative SVG or icon elements. Only icon buttons with aria-label need the icon visible." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What are the most important accessibility rules in React?",
        "How do I make a custom component keyboard-accessible?",
        "How do I test accessibility in my React app?"
      ]
    }
  },
  "React Router": {
    xpReward: 15,
    hints: ["React Router provides client-side navigation without page reloads", "BrowserRouter wraps the app, Routes define paths, Link navigates", "Install with: npm install react-router-dom"],
    notes: {
      summary: "React Router is the most popular routing library for React. It enables client-side navigation with dynamic URL patterns, nested routes, and parameter handling.",
      detailedContent: "React Router v6+ uses a declarative routing model. BrowserRouter listens to URL changes and renders matching Route components. Routes wraps Route components and renders the first matching path. Link and NavLink handle navigation without page reload. Key hooks: useParams (URL params), useNavigate (programmatic navigation), useLocation (current URL), useSearchParams (query strings). Route paths can be static ('/about'), dynamic ('/users/:id'), or wildcard ('*' for 404).",
      prerequisites: ["Project Structure"],
      learningObjectives: [
        "Set up React Router with BrowserRouter, Routes, and Route",
        "Create navigation links with Link and NavLink",
        "Understand client-side vs server-side routing"
      ],
      resources: [
        { title: "React Router Documentation", url: "https://reactrouter.com/en/main", type: "docs" as const },
        { title: "React Router Tutorial", url: "https://reactrouter.com/en/main/start/tutorial", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Basic Routing Setup",
        description: "Setting up React Router for a multi-page app",
        code: 'import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";\n\nfunction Home() { return <h1>Home</h1>; }\nfunction About() { return <h1>About</h1>; }\nfunction Contact() { return <h1>Contact</h1>; }\nfunction NotFound() { return <h1>404 -- Page Not Found</h1>; }\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to="/">Home</Link>\n        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>\n        <Link to="/contact">Contact</Link>\n      </nav>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/about" element={<About />} />\n        <Route path="/contact" element={<Contact />} />\n        <Route path="*" element={<NotFound />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}',
        explanation: "BrowserRouter provides the routing context. Routes matches the current URL against Route paths. Link navigates without reload. NavLink adds active class styling. The wildcard '*' catches undefined routes for 404 pages.",
        difficulty: "beginner",
        concepts: ["BrowserRouter", "Routes", "Route", "Link", "NavLink", "404 route"]
      }
    ],
    keyTakeaways: [
      "BrowserRouter wraps your app and listens to URL changes",
      "Routes matches the first Route whose path matches the URL",
      "Link navigates without full page reload",
      "NavLink provides isActive/isPending props for styling",
      "Use path='*' for 404/not-found routes"
    ],
    commonMistakes: [
      { mistake: "Forgetting to wrap the app in BrowserRouter", explanation: "Without BrowserRouter, Link and useParams throw an error because there's no routing context.", howToAvoid: "Wrap your root component with BrowserRouter at the top level." },
      { mistake: "Using <a href> instead of <Link>", explanation: "Regular anchor tags cause full page reloads, losing React state and causing a flash.", howToAvoid: "Always use Link or NavLink from react-router-dom for internal navigation. Only use <a> for external links." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How is client-side routing different from server-side?",
        "What's the difference between Link and NavLink?",
        "How do I create a 404 page?"
      ]
    }
  },
  "Nested Routes": {
    xpReward: 12,
    hints: ["Nested routes use <Outlet /> to render child route content", "Parent layout persists while child routes change", "Use relative paths for simpler route definitions"],
    notes: {
      summary: "Nested routes allow shared layouts where the parent component wraps child routes using Outlet, enabling persistent UI (sidebars, headers) while switching child content.",
      detailedContent: "React Router v6 supports nested routes naturally. The parent route defines a layout component with an <Outlet /> where child routes render. Route paths can be relative (no leading /) for cleaner nesting. Use index routes for the default child when the parent path matches exactly. Nested routes reduce URL repetition and keep layout logic centralized.",
      prerequisites: ["React Router"],
      learningObjectives: [
        "Create nested routes with parent/child relationships",
        "Use Outlet to render child route content",
        "Create index routes for default child content"
      ],
      resources: [
        { title: "React Router: Nested Routes", url: "https://reactrouter.com/en/main/start/overview#nested-routes", type: "docs" as const },
        { title: "React Router: Layout Routes", url: "https://reactrouter.com/en/main/route/route#layout-routes", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Dashboard Layout",
        description: "Nested routes with persistent sidebar and Outlet",
        code: 'function DashboardLayout() {\n  return (\n    <div className="dashboard">\n      <aside>\n        <nav>\n          <Link to="profile">Profile</Link>\n          <Link to="settings">Settings</Link>\n          <Link to="analytics">Analytics</Link>\n        </nav>\n      </aside>\n      <main>\n        <Outlet />\n      </main>\n    </div>\n  );\n}\n\n// Route definition\n<Route path="dashboard" element={<DashboardLayout />}>\n  <Route index element={<DashboardHome />} />\n  <Route path="profile" element={<Profile />} />\n  <Route path="settings" element={<Settings />} />\n  <Route path="analytics" element={<Analytics />} />\n</Route>',
        explanation: "DashboardLayout renders once and persists (sidebar doesn't remount). The Outlet swaps child content. index route provides content when path exactly matches '/dashboard'. Relative paths like 'profile' resolve to '/dashboard/profile'.",
        difficulty: "intermediate",
        concepts: ["Outlet", "nested routes", "index route", "layout persistence", "relative paths"]
      }
    ],
    keyTakeaways: [
      "Parent layout renders Outlet where children appear",
      "The parent layout persists across child route changes",
      "Index routes provide default content for exact parent path",
      "Use relative paths in child routes for cleaner definitions"
    ],
    commonMistakes: [
      { mistake: "Forgetting to add <Outlet /> in the layout component", explanation: "Without Outlet, child routes are defined but never render.", howToAvoid: "Always include <Outlet /> in your layout component's JSX where you want children to appear." },
      { mistake: "Using absolute paths for nested routes unnecessarily", explanation: "path='/dashboard/profile' makes the route definition less portable.", howToAvoid: "Use relative paths (path='profile') for nested routes." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What is the Outlet component for?",
        "How do index routes work?",
        "Can I nest routes more than two levels deep?"
      ]
    }
  },
  "URL Parameters": {
    xpReward: 10,
    hints: ["Define dynamic segments with colon syntax: path='/users/:id'", "Read params with useParams hook", "Use params to fetch or display data for specific items"],
    notes: {
      summary: "URL parameters let you create dynamic routes where segments of the URL are captured as variables, accessible via the useParams hook.",
      detailedContent: "URL parameters are defined with a colon prefix in the path: path='/products/:productId'. The useParams hook returns an object with all matched params. Multiple params are supported: path='/categories/:catId/products/:prodId'. Optional params can be simulated with path='/:param?' or by adding parent routes. Use params to fetch specific data based on the URL, enable bookmarkable pages, and support browser back/forward navigation.",
      prerequisites: ["React Router", "Nested Routes"],
      learningObjectives: [
        "Define routes with URL parameters",
        "Access params with useParams hook",
        "Use params for data fetching and conditional rendering"
      ],
      resources: [
        { title: "React Router: useParams", url: "https://reactrouter.com/en/main/hooks/use-params", type: "docs" as const },
        { title: "React Router: Route Parameters", url: "https://reactrouter.com/en/main/route/route#dynamic-segments", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "URL Params in Action",
        description: "Product detail page using URL params",
        code: 'import { useParams, Link } from "react-router-dom";\n\nfunction ProductPage() {\n  const { productId } = useParams();\n  const [product, setProduct] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    async function loadProduct() {\n      setLoading(true);\n      const res = await fetch(`/api/products/${productId}`);\n      const data = await res.json();\n      setProduct(data);\n      setLoading(false);\n    }\n    loadProduct();\n  }, [productId]);\n\n  if (loading) return <div>Loading...</div>;\n  if (!product) return <div>Product not found</div>;\n\n  return (\n    <div>\n      <Link to="/products">Back to Products</Link>\n      <h1>{product.name}</h1>\n      <p>Price: ${product.price}</p>\n      <p>{product.description}</p>\n    </div>\n  );\n}',
        explanation: "useParams extracts productId from the URL. The effect depends on productId — changing the URL re-fetches data. Back button automatically reloads the correct product.",
        difficulty: "intermediate",
        concepts: ["useParams", "dynamic routes", "param-based fetching", "back button", "useNavigate"]
      }
    ],
    keyTakeaways: [
      "Define dynamic segments with :paramName in the route path",
      "Read params with useParams() — it returns an object of all param values",
      "Include params in the useEffect dependency array for re-fetching",
      "URL parameters enable deep linking and bookmarkable pages"
    ],
    commonMistakes: [
      { mistake: "Forgetting to include params in the dependency array", explanation: "If useEffect doesn't list productId, changing the URL doesn't re-fetch — the old data persists.", howToAvoid: "Always include URL params in the useEffect dependency array: [productId]." },
      { mistake: "Assuming params are strings (they are always strings)", explanation: "useParams always returns strings, even for numeric IDs. Performing math directly concatenates instead of adding.", howToAvoid: "Convert to number when needed: const id = Number(useParams().id)." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "How do I get URL parameters in React Router?",
        "Can I have optional URL parameters?",
        "How do I navigate programmatically with params?"
      ]
    }
  },
  "Project Structure": {
    xpReward: 10,
    hints: ["Organize files by features or by technical roles", "Colocate related files (component + styles + tests)", "Avoid deeply nested folder structures"],
    notes: {
      summary: "A well-organized React project balances feature-based grouping with shared utilities. Colocate related files and establish clear conventions early.",
      detailedContent: "Two common approaches: feature-based (group by domain: users/, products/, cart/) and technical-role-based (components/, hooks/, utils/, pages/). Most projects use a hybrid: features in one folder, shared UI in components/, and utilities in lib/. Key conventions: one component per file, index files for clean exports, consistent naming (components in PascalCase, utilities in camelCase), and a clear separation between pages (route-level) and reusable components.",
      prerequisites: ["React Router"],
      learningObjectives: [
        "Organize React project files logically",
        "Choose between feature-based and role-based structure",
        "Establish naming conventions for components and files"
      ],
      resources: [
        { title: "React: Project Structure", url: "https://react.dev/learn/start-a-new-react-project#project-structure", type: "docs" as const },
        { title: "Bulletproof React Project Structure", url: "https://github.com/alan2207/bulletproof-react", type: "article" as const },
      ]
    },
    examples: [
      {
        title: "Recommended Structure",
        description: "A scalable React project folder layout",
        code: 'src/\n??? features/          # Feature-based modules\n?   ??? auth/          # Login, signup, password reset\n?   ?   ??? components/\n?   ?   ??? hooks/\n?   ?   ??? pages/\n?   ?   ??? utils/\n?   ??? products/      # Product listing, detail, search\n?   ??? cart/          # Cart, checkout\n??? components/        # Shared UI components\n?   ??? ui/            # Button, Input, Card, Modal\n?   ??? layout/        # Header, Footer, Sidebar\n?   ??? common/        # ErrorBoundary, LoadingSpinner\n??? hooks/             # Shared custom hooks\n??? lib/               # Utilities, API client, constants\n??? pages/             # Top-level route components\n??? styles/            # Global styles, theme\n??? types/             # TypeScript type definitions\n??? test/              # Test setup, mocks, utilities',
        explanation: "Features are self-contained (components, hooks, pages specific to that domain). Shared UI lives in components/ui/. Global hooks and utilities are centralized. Pages connect routes to features.",
        difficulty: "beginner",
        concepts: ["feature-based", "colocation", "separation of concerns", "scalability"]
      }
    ],
    keyTakeaways: [
      "Colocate files that change together (component, styles, tests)",
      "Feature folders encapsulate domain-specific code",
      "Shared components, hooks, and utilities live in global folders",
      "Establish naming and structure conventions early"
    ],
    commonMistakes: [
      { mistake: "Over-nesting folders", explanation: "Deep nesting makes imports long and files harder to find.", howToAvoid: "Limit folders to 2-3 levels. Use feature folders for domain logic." },
      { mistake: "Putting everything in a single components/ folder", explanation: "A flat components/ folder with hundreds of files becomes impossible to navigate.", howToAvoid: "Group into sub-folders (ui/, layout/, forms/) and feature folders early." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What's the best React project structure?",
        "Should I group by feature or by file type?",
        "How do I organize a large React application?"
      ]
    }
  },
  "useContext": {
    xpReward: 15,
    hints: ["Context provides a way to pass data through the tree without prop drilling", "Use createContext to create the context, Provider to provide value, useContext to consume", "Don't overuse context — it makes component reuse harder"],
    notes: {
      summary: "Context lets you share values (theme, auth, locale) across the component tree without explicitly passing props through every level.",
      detailedContent: "Context is designed for values that are global or needed by many components at different nesting levels. createContext(defaultValue) creates a context object. The Provider component wraps a subtree and provides a value. useContext(context) in any descendant reads the current value. When the provider value changes, all consumers re-render. Context is not a state management replacement — it's a dependency injection mechanism. For frequent updates, consider context splitting or useReducer/Redux.",
      prerequisites: ["Custom Hooks"],
      learningObjectives: [
        "Create and provide context using createContext and Provider",
        "Consume context values with useContext",
        "Understand when to use (and not use) context"
      ],
      resources: [
        { title: "React: useContext", url: "https://react.dev/reference/react/useContext", type: "docs" as const },
        { title: "React: Passing Data Deeply with Context", url: "https://react.dev/learn/passing-data-deeply-with-context", type: "tutorial" as const },
      ]
    },
    examples: [
      {
        title: "Theme Context",
        description: "A complete theme system using Context",
        code: 'import { createContext, useContext, useState } from "react";\n\nconst ThemeContext = createContext();\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState("light");\n  const toggleTheme = () => {\n    setTheme(prev => prev === "light" ? "dark" : "light");\n  };\n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nfunction useTheme() {\n  const context = useContext(ThemeContext);\n  if (!context) {\n    throw new Error("useTheme must be used within ThemeProvider");\n  }\n  return context;\n}\n\nfunction ThemedButton() {\n  const { theme, toggleTheme } = useTheme();\n  return (\n    <button onClick={toggleTheme}\n      style={{ background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff" }}>\n      Current: {theme} -- Toggle\n    </button>\n  );\n}\n\nfunction App() {\n  return (\n    <ThemeProvider>\n      <ThemedButton />\n    </ThemeProvider>\n  );\n}',
        explanation: "ThemeProvider wraps all components that need theme access. The custom hook useTheme encapsulates context consumption and adds error checking. Any descendant can use useTheme() without prop drilling.",
        difficulty: "intermediate",
        concepts: ["createContext", "Provider", "useContext", "custom hook", "prop drilling", "theme pattern"]
      }
    ],
    keyTakeaways: [
      "Context passes data through the tree without prop drilling",
      "createContext defines the context, Provider supplies the value, useContext reads it",
      "Wrap context consumption in a custom hook for safety and DX",
      "Don't use context for everything — it makes components less reusable"
    ],
    commonMistakes: [
      { mistake: "Using context instead of component composition", explanation: "Sometimes passing JSX as children (component composition) is simpler than creating a context.", howToAvoid: "Consider if prop drilling can be avoided by lifting content up and passing it as children instead." },
      { mistake: "Putting frequently changing values in context", explanation: "Every context change re-renders ALL consumers, even if they only read unrelated parts of the value.", howToAvoid: "Split contexts for independent concerns (ThemeContext, AuthContext separate). Use useMemo for the context value." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "How is context different from prop drilling?",
        "When should I use context vs Redux or Zustand?",
        "How do I avoid unnecessary re-renders with context?"
      ]
    }
  },
  "Custom Hooks": {
    xpReward: 15,
    hints: ["Custom hooks are JavaScript functions that use other hooks", "Name them with use prefix", "They let you extract component logic into reusable functions"],
    notes: {
      summary: "Custom hooks let you extract component logic (stateful or effectful) into reusable functions. They are JavaScript functions that call other hooks.",
      detailedContent: "A custom hook is a function whose name starts with 'use' and that calls other hooks (useState, useEffect, useContext, etc.). Custom hooks share stateful logic, not state itself — each component using a hook gets its own isolated state. Common custom hooks: useLocalStorage, useDebounce, useWindowSize, useFetch, useForm, useAuth, useMediaQuery. Custom hooks replace patterns like higher-order components (HOCs) and render props with simpler, composable functions.",
      prerequisites: ["useState Hook", "useEffect Basics"],
      learningObjectives: [
        "Extract repeated component logic into custom hooks",
        "Understand that each hook call has isolated state",
        "Write reusable hooks for data fetching, local storage, and browser APIs"
      ],
      resources: [
        { title: "React: Custom Hooks", url: "https://react.dev/learn/reusing-logic-with-custom-hooks", type: "docs" as const },
        { title: "React: Hooks FAQ", url: "https://react.dev/reference/react/hooks#custom-hooks", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Reusable Data Fetching Hook",
        description: "Custom hook for API calls with loading/error states",
        code: 'function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    async function fetchData() {\n      setLoading(true);\n      setError(null);\n      try {\n        const response = await fetch(url);\n        if (!response.ok) throw new Error(`HTTP ${response.status}`);\n        const result = await response.json();\n        if (!cancelled) setData(result);\n      } catch (err) {\n        if (!cancelled) setError(err.message);\n      } finally {\n        if (!cancelled) setLoading(false);\n      }\n    }\n    fetchData();\n    return () => { cancelled = true; };\n  }, [url]);\n\n  return { data, loading, error };\n}\n\nfunction UserProfile({ userId }) {\n  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error}</div>;\n  return <div>{user.name}</div>;\n}',
        explanation: "useFetch encapsulates all data fetching logic. Each component using useFetch gets its own state (no sharing). The url dependency ensures re-fetch when URL changes. The hook returns a consistent interface.",
        difficulty: "intermediate",
        concepts: ["custom hook", "reusability", "encapsulation", "hook composition", "useFetch"]
      },
      {
        title: "Browser API Hook",
        description: "Tracking window size with a custom hook",
        code: 'function useWindowSize() {\n  const [size, setSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight,\n  });\n  useEffect(() => {\n    function handleResize() {\n      setSize({ width: window.innerWidth, height: window.innerHeight });\n    }\n    window.addEventListener("resize", handleResize);\n    return () => window.removeEventListener("resize", handleResize);\n  }, []);\n  return size;\n}\n\nfunction useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    try {\n      const item = localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch { return initialValue; }\n  });\n  useEffect(() => {\n    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error(e); }\n  }, [key, value]);\n  return [value, setValue];\n}\n\nfunction ResponsiveComponent() {\n  const { width } = useWindowSize();\n  const [prefs, setPrefs] = useLocalStorage("prefs", {});\n  return <div>{width < 768 ? <MobileView /> : <DesktopView />}</div>;\n}',
        explanation: "useWindowSize adds/removes event listeners with proper cleanup. useLocalStorage syncs React state with localStorage. Both hooks hide complexity behind a simple API.",
        difficulty: "intermediate",
        concepts: ["event listener hook", "localStorage hook", "lazy initialization", "cleanup", "encapsulation"]
      }
    ],
    keyTakeaways: [
      "Custom hooks extract and reuse stateful logic",
      "Name hooks with use prefix — this enables the lint rules",
      "Each hook call has independent state (no sharing)",
      "Custom hooks can call other hooks (including other custom hooks)"
    ],
    commonMistakes: [
      { mistake: "Sharing state between components via a custom hook", explanation: "Each component calling useFetch gets its own state. If you want shared state, use context or a state management library.", howToAvoid: "Custom hooks encapsulate logic, not state. Use context + custom hook for shared state access." },
      { mistake: "Not following the use prefix naming convention", explanation: "Without the use prefix, React doesn't enforce the Rules of Hooks.", howToAvoid: "Always start custom hook names with 'use'." }
    ],
    aiConfig: {
      tutorMode: "socratic",
      suggestedQuestions: [
        "What are custom hooks used for?",
        "How do custom hooks share state between components?",
        "What naming conventions apply to custom hooks?"
      ]
    }
  },
  "useMemo / useCallback": {
    xpReward: 12,
    hints: ["useMemo memoizes a computed value, useCallback memoizes a function", "Only use them when profiling shows a performance problem", "Premature optimization is the root of all evil"],
    notes: {
      summary: "useMemo and useCallback are React performance hooks that memoize values and functions respectively, preventing unnecessary re-computation and re-renders.",
      detailedContent: "useMemo(() => expensiveComputation(a, b), [a, b]) caches the result and only re-computes when dependencies change. useCallback(() => { ... }, [deps]) caches a function reference. Important: these hooks do NOT guarantee memoization — React may discard cached values to free memory. Never use them as semantic guarantees. Measure first, optimize second. Most apps don't need them in most places.",
      prerequisites: ["Custom Hooks"],
      learningObjectives: [
        "Use useMemo to cache expensive computations",
        "Use useCallback to stabilize function references",
        "Identify when memoization is actually beneficial"
      ],
      resources: [
        { title: "React: useMemo", url: "https://react.dev/reference/react/useMemo", type: "docs" as const },
        { title: "React: useCallback", url: "https://react.dev/reference/react/useCallback", type: "docs" as const },
        { title: "React: When to useMemo and useCallback", url: "https://react.dev/reference/react/useMemo#troubleshooting", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "useMemo for Expensive Computation",
        description: "Memoizing filtered and sorted data",
        code: 'function ProductList({ products, search, sortBy }) {\n  const visibleProducts = useMemo(() => {\n    console.log("Computing visible products...");\n    return products\n      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))\n      .sort((a, b) => {\n        if (sortBy === "price") return a.price - b.price;\n        if (sortBy === "name") return a.name.localeCompare(b.name);\n        return 0;\n      });\n  }, [products, search, sortBy]);\n\n  return (\n    <ul>\n      {visibleProducts.map(p => <ProductCard key={p.id} product={p} />)}\n    </ul>\n  );\n}',
        explanation: "Without useMemo, filter+sort runs on every render. With useMemo, it only runs when products, search, or sortBy change.",
        difficulty: "intermediate",
        concepts: ["useMemo", "memoization", "computation caching", "dependency array"]
      },
      {
        title: "useCallback for Stable References",
        description: "Preventing unnecessary child re-renders",
        code: 'function SearchPage() {\n  const [query, setQuery] = useState("");\n\n  const handleSearch = useCallback(async (q) => {\n    const res = await fetch(`/api/search?q=${q}`);\n    return res.json();\n  }, []);\n\n  const handleResultClick = useCallback((result) => {\n    console.log("Clicked:", result.id);\n  }, []);\n\n  return (\n    <div>\n      <SearchInput onSearch={handleSearch} />\n      <SearchResults onResultClick={handleResultClick} />\n    </div>\n  );\n}',
        explanation: "useCallback keeps the same function reference between renders. Without it, handleSearch is a new function every render, causing child components using React.memo to always re-render.",
        difficulty: "intermediate",
        concepts: ["useCallback", "function reference", "React.memo", "unnecessary re-renders"]
      }
    ],
    keyTakeaways: [
      "useMemo caches computed values; useCallback caches function references",
      "Only memoize when profiling shows a real performance problem",
      "Include all reactive values in the dependency array",
      "React may discard cached values — don't rely on memoization for correctness"
    ],
    commonMistakes: [
      { mistake: "Wrapping everything in useMemo/useCallback", explanation: "Over-memoization adds complexity and memory overhead. Most computations are fast enough without memoization.", howToAvoid: "Measure performance first. Use React DevTools profiler to identify slow re-renders before adding useMemo/useCallback." },
      { mistake: "Using useCallback without React.memo on the child", explanation: "useCallback prevents re-creating the function, but the child still re-renders unless it's wrapped in React.memo.", howToAvoid: "Pair useCallback with React.memo on the child component for maximum benefit." }
    ],
    aiConfig: {
      tutorMode: "explain",
      suggestedQuestions: [
        "What's the difference between useMemo and useCallback?",
        "When should I actually use these hooks?",
        "Does useMemo prevent re-renders?"
      ]
    }
  },
  "Capstone: Todo App Plan": {
    xpReward: 30,
    hints: ["The todo app combines state, effects, components, and local storage", "Start by sketching the component tree", "Implement features incrementally: list, add, toggle, filter, persist"],
    notes: {
      summary: "The capstone todo app project brings together all React concepts: components, props, state, effects, lists, keys, forms, and custom hooks into a single practical application.",
      detailedContent: "This capstone project is the culmination of the React Fundamentals course. Build a complete todo application with the following features: display a list of todos with their completion status, add new todos via a form, toggle completion status by clicking, filter todos (all/active/completed), persist todos to localStorage, and optionally add editing and deletion. This exercises every major concept from the course: component composition, useState for todos and filter state, useEffect for localStorage sync, controlled inputs for the add form, list rendering with keys, and derived state for filtering.",
      prerequisites: ["All previous modules"],
      learningObjectives: [
        "Plan and build a complete React application from scratch",
        "Combine multiple React concepts in one project",
        "Implement data persistence with localStorage",
        "Structure code into reusable components"
      ],
      resources: [
        { title: "React: Thinking in React", url: "https://react.dev/learn/thinking-in-react", type: "tutorial" as const },
        { title: "MDN: localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage", type: "docs" as const },
      ]
    },
    examples: [
      {
        title: "Todo App Architecture",
        description: "Planning the component tree and data flow",
        code: '// Component Tree\n// App\n//   TodoHeader (title, todo count)\n//   TodoForm (controlled input, add handler)\n//   TodoFilters (all/active/completed)\n//   TodoList\n//     TodoItem (checkbox, text, delete button)\n\n// Data Model\n// const [todos, setTodos] = useState([\n//   { id: 1, text: "Learn React", completed: false },\n//   { id: 2, text: "Build a project", completed: true },\n// ]);\n// const [filter, setFilter] = useState("all");\n\n// Derived state\n// const filteredTodos = useMemo(() => {\n//   if (filter === "active") return todos.filter(t => !t.completed);\n//   if (filter === "completed") return todos.filter(t => t.completed);\n//   return todos;\n// }, [todos, filter]);\n\n// Persistence with useLocalStorage hook\n// const [todos, setTodos] = useLocalStorage("todos", []);',
        explanation: "Plan the component hierarchy first. Data flows from App downward via props. TodoForm receives onAdd callback. TodoList receives filtered todos. Each TodoItem receives a todo object and onToggle/onDelete callbacks. Filter state is derived, not stored separately.",
        difficulty: "advanced",
        concepts: ["architecture", "component tree", "derived state", "data flow", "custom hook"]
      },
      {
        title: "LocalStorage Persistence Hook",
        description: "Reusable hook for persisting state to localStorage",
        code: 'function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    try {\n      const item = localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch { return initialValue; }\n  });\n\n  useEffect(() => {\n    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}\n  }, [key, value]);\n\n  return [value, setValue];\n}\n\n// Usage in App\nfunction App() {\n  const [todos, setTodos] = useLocalStorage("todos", []);\n  const [filter, setFilter] = useState("all");\n\n  function addTodo(text) {\n    setTodos(prev => [\n      ...prev,\n      { id: Date.now(), text, completed: false },\n    ]);\n  }\n\n  function toggleTodo(id) {\n    setTodos(prev => prev.map(t =>\n      t.id === id ? { ...t, completed: !t.completed } : t\n    ));\n  }\n\n  function deleteTodo(id) {\n    setTodos(prev => prev.filter(t => t.id !== id));\n  }\n\n  const filteredTodos = useMemo(() => {\n    if (filter === "active") return todos.filter(t => !t.completed);\n    if (filter === "completed") return todos.filter(t => t.completed);\n    return todos;\n  }, [todos, filter]);\n\n  return (\n    <div className="app">\n      <h1>Todo App ({todos.filter(t => !t.completed).length} remaining)</h1>\n      <TodoForm onAdd={addTodo} />\n      <TodoFilters filter={filter} onFilterChange={setFilter} />\n      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />\n    </div>\n  );\n}',
        explanation: "The useLocalStorage hook handles serialization/deserialization automatically. The App component orchestrates state and passes down handlers. State updates use functional updates and immutable patterns. Filtered todos are derived with useMemo.",
        difficulty: "advanced",
        concepts: ["localStorage persistence", "immutable updates", "functional state", "handler callbacks", "component communication"]
      }
    ],
    keyTakeaways: [
      "Plan the component hierarchy and data flow before coding",
      "Use custom hooks to encapsulate cross-cutting concerns like persistence",
      "Derive filtered/sorted data during render instead of storing it",
      "Pass state setters as callbacks (onAdd, onToggle, onDelete) to children",
      "Always use immutable update patterns (map, filter, spread)"
    ],
    commonMistakes: [
      { mistake: "Putting all logic in one giant component", explanation: "A single App component with all JSX becomes unreadable and hard to maintain.", howToAvoid: "Split into small components: TodoForm, TodoList, TodoItem, TodoFilters. Each has a single responsibility." },
      { mistake: "Forgetting to handle localStorage errors", explanation: "localStorage can throw (quota exceeded, private browsing in Safari) — unhandled errors crash the app.", howToAvoid: "Always wrap localStorage operations in try/catch blocks, especially in the initial read." }
    ],
    playground: {
      enabled: true,
      starterCode: '// Plan your todo app structure here\n// 1. Create the useLocalStorage custom hook\n// 2. Create TodoForm component\n// 3. Create TodoList and TodoItem components\n// 4. Create TodoFilters component\n// 5. Combine everything in App',
      language: "javascript",
      hints: ["Start with the data model: { id, text, completed }", "Use useLocalStorage for persistence", "Derive filtered todos with useMemo", "Pass callbacks down to child components"]
    },
    aiConfig: {
      tutorMode: "debug",
      suggestedQuestions: [
        "How should I structure the todo app components?",
        "How do I persist todos to localStorage?",
        "How do I filter the todo list?"
      ]
    }
  },
};
