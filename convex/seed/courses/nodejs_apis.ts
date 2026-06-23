import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const MODULES: ModuleSpec[] = [
  {
    title: "Node.js Fundamentals",
    description: "Run JavaScript on the server",
    lessons: [
      theory("What is Node.js?", 15, [
        { heading: "V8 on the server", body: "Node.js runs JavaScript outside the browser with access to filesystem, networking, and OS APIs." },
        { heading: "Event-driven", body: "Non-blocking I/O suits APIs and real-time apps." },
      ], { language: "javascript", code: "console.log(process.version);" }),
      theory("REPL and Running Scripts", 12, [
        { heading: "node file.js", body: "Execute scripts from the terminal. Use `node` alone for interactive REPL." },
      ]),
      theory("CommonJS vs ESM", 15, [
        { heading: "module systems", body: "`require()` / `module.exports` (CJS) vs `import` / `export` (ESM). Prefer ESM in new projects with `\"type\": \"module\"` in package.json." },
      ]),
      theory("npm Basics", 12, [
        { heading: "package.json", body: "Lists dependencies and scripts. `npm init`, `npm install express`." },
      ]),
    ],
  },
  {
    title: "Core Modules",
    description: "Built-in Node APIs",
    lessons: [
      theory("fs and path", 15, [
        { heading: "Filesystem", body: "`fs.readFile`, `fs.writeFile` (async) or sync variants for scripts." },
        { heading: "path", body: "`path.join(__dirname, 'data.json')` — cross-platform paths." },
      ]),
      theory("process and env", 12, [
        { heading: "Environment variables", body: "`process.env.PORT` — load secrets from `.env` with dotenv package." },
      ]),
      theory("http module", 15, [
        { heading: "Raw HTTP server", body: "Low-level `http.createServer` — Express builds on this." },
      ], { language: "javascript", code: "const http = require('http');\nhttp.createServer((req,res)=>{res.end('ok');}).listen(3000);" }),
      practice("Parse Port", 20, "**Task:** `getPort(env)` returns env.PORT as number or 3000 default.", [], {
        language: "javascript",
        codeTemplate: `function getPort(env) {
  return Number(env.PORT) || 3000;
}
console.log(getPort({}));`,
        solution: `function getPort(env) {
  return Number(env.PORT) || 3000;
}
console.log(getPort({}));`,
        testCases: [{ input: "", expectedOutput: "3000", isHidden: false }],
      }),
    ],
  },
  {
    title: "Express Basics",
    description: "Build HTTP APIs with Express",
    lessons: [
      theory("Express Setup", 15, [
        { heading: "Minimal app", body: "`const app = express(); app.get('/', (req,res)=>res.send('hi')); app.listen(3000);`" },
      ]),
      theory("Routing", 15, [
        { heading: "HTTP verbs", body: "app.get, app.post, app.put, app.delete map to REST operations." },
      ]),
      theory("JSON Middleware", 12, [
        { heading: "express.json()", body: "Parses JSON bodies into `req.body` for POST/PUT requests." },
      ]),
      practice("Route Handler", 20, "**Task:** `handleHealth(req)` returns `{ status: 'ok' }` as JSON string.", [], {
        language: "javascript",
        codeTemplate: `function handleHealth() {
  return JSON.stringify({ status: "ok" });
}
console.log(handleHealth());`,
        solution: `function handleHealth() {
  return JSON.stringify({ status: "ok" });
}
console.log(handleHealth());`,
        testCases: [{ input: "", expectedOutput: '{"status":"ok"}', isHidden: false }],
      }),
    ],
  },
  {
    title: "REST API Design",
    description: "Design clear, predictable APIs",
    lessons: [
      theory("REST Principles", 15, [
        { heading: "Resources and URLs", body: "Use nouns: `/users`, `/users/:id`. HTTP methods express actions." },
        { heading: "Status codes", body: "200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error." },
      ]),
      theory("Request Validation", 15, [
        { heading: "Validate early", body: "Reject bad input before business logic. Return clear error messages." },
      ]),
      theory("Pagination & Filtering", 12, [
        { heading: "Query params", body: "`?page=2&limit=20&sort=-createdAt`" },
      ]),
      theory("API Versioning", 12, [
        { heading: "Strategies", body: "URL prefix `/v1/`, header versioning, or query param — pick one and document it." },
      ]),
    ],
  },
  {
    title: "Middleware & Security",
    description: "Cross-cutting concerns",
    lessons: [
      theory("Middleware Chain", 15, [
        { heading: "next()", body: "Middleware functions run in order: logging, auth, parsing, routes, error handler." },
      ]),
      theory("CORS", 12, [
        { heading: "Cross-origin", body: "Browsers block cross-origin requests unless server sends proper CORS headers." },
      ]),
      theory("Authentication Overview", 15, [
        { heading: "JWT", body: "Stateless tokens signed by server; client sends `Authorization: Bearer <token>`." },
        { heading: "Never store passwords plain", body: "Hash with bcrypt or argon2." },
      ]),
      theory("Rate Limiting", 12, [
        { heading: "Protect APIs", body: "Limit requests per IP to prevent abuse." },
      ]),
    ],
  },
  {
    title: "Data Persistence",
    description: "Store and retrieve application data",
    lessons: [
      theory("SQL vs NoSQL", 15, [
        { heading: "Choose wisely", body: "PostgreSQL for relational data; MongoDB for flexible documents." },
      ]),
      theory("In-Memory Store Pattern", 15, [
        { heading: "Prototyping", body: "Use Map or array before adding a database — understand CRUD flow first." },
      ]),
      theory("ORM / Query Builders", 12, [
        { heading: "Prisma, Drizzle", body: "Type-safe database access in Node/TypeScript projects." },
      ]),
      practice("CRUD Map", 20, "**Task:** `createStore()` returns object with `set(key,val)` and `get(key)`.", [], {
        language: "javascript",
        codeTemplate: `function createStore() {
  const map = new Map();
  return {
    set(k, v) { map.set(k, v); },
    get(k) { return map.get(k); }
  };
}
const s = createStore();
s.set("a", 1);
console.log(s.get("a"));`,
        solution: `function createStore() {
  const map = new Map();
  return {
    set(k, v) { map.set(k, v); },
    get(k) { return map.get(k); }
  };
}
const s = createStore();
s.set("a", 1);
console.log(s.get("a"));`,
        testCases: [{ input: "", expectedOutput: "1", isHidden: false }],
      }),
    ],
  },
  {
    title: "Error Handling & Testing",
    description: "Reliable production APIs",
    lessons: [
      theory("Central Error Handler", 15, [
        { heading: "Express error middleware", body: "Four-argument `(err, req, res, next)` handler catches thrown errors." },
      ]),
      theory("Async Errors", 12, [
        { heading: "wrap async routes", body: "Use try/catch or wrapper so rejected promises reach error middleware." },
      ]),
      theory("API Testing", 15, [
        { heading: "Supertest / Vitest", body: "HTTP integration tests without starting server manually." },
      ]),
      theory("Logging", 12, [
        { heading: "Structured logs", body: "Use pino or winston; include request IDs for tracing." },
      ]),
    ],
  },
  {
    title: "Deployment",
    description: "Ship Node APIs to production",
    lessons: [
      theory("12-Factor App", 15, [
        { heading: "Config in env", body: "Store config in environment; treat processes as disposable." },
      ]),
      theory("Hosting Options", 12, [
        { heading: "Railway, Render, Fly.io", body: "Deploy Node apps with minimal config; use Docker for control." },
      ]),
      theory("Health Checks", 12, [
        { heading: "/health endpoint", body: "Load balancers ping health routes to verify service is up." },
      ]),
      theory("Capstone: API Project", 15, [
        { heading: "Build a notes API", body: "CRUD for notes with Express, in-memory or SQLite store, validation, and tests." },
      ]),
    ],
  },
];

export async function seedNodejsApis(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "javascript");
  await applyEnhancementsToCourse(ctx, "nodejs-apis");
  return lessonIds;
}
