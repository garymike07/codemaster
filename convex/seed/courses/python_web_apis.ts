import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const py = (code: string) => ({ language: "python", code });
const stdinWrap = (body: string) => `${body}\n\nimport sys\ndata = sys.stdin.read().strip()\n`;

const MODULES: ModuleSpec[] = [
  {
    title: "HTTP & APIs Recap",
    description: "Foundations for building web services",
    lessons: [
      theory("HTTP Methods", 15, [
        { heading: "REST verbs", body: "GET reads, POST creates, PUT/PATCH updates, DELETE removes resources." },
        { heading: "Headers & body", body: "Content-Type, Authorization, JSON payloads." },
      ]),
      theory("Status Codes", 12, [
        { heading: "Meaningful responses", body: "Return correct codes so clients handle success and errors predictably." },
      ]),
      theory("JSON APIs", 12, [
        { heading: "Lingua franca", body: "Most modern APIs exchange JSON documents." },
      ]),
      theory("API Documentation", 12, [
        { heading: "OpenAPI / Swagger", body: "Describe endpoints for humans and codegen tools." },
      ]),
    ],
  },
  {
    title: "FastAPI Introduction",
    description: "Modern Python web framework",
    lessons: [
      theory("Why FastAPI?", 15, [
        { heading: "Speed and types", body: "Built on Starlette and Pydantic — automatic validation and OpenAPI docs." },
      ], py("from fastapi import FastAPI\napp = FastAPI()\n\n@app.get('/')\ndef root():\n    return {'hello': 'world'}")),
      theory("First Routes", 15, [
        { heading: "Path operations", body: "Decorator `@app.get('/items')` maps URL to Python function return value (auto JSON)." },
      ]),
      theory("Uvicorn Server", 12, [
        { heading: "Run locally", body: "`uvicorn main:app --reload` for development with auto-reload." },
      ]),
      practice("Greet Route Logic", 20, "**Task:** `greet(name)` returns dict `{'message': f'Hello {name}'}`", [], {
        language: "python",
        codeTemplate: stdinWrap("def greet(name):\n    return {'message': f'Hello {name}'}\nimport json\nprint(json.dumps(greet(data)))"),
        solution: stdinWrap("def greet(name):\n    return {'message': f'Hello {name}'}\nimport json\nprint(json.dumps(greet(data)))"),
        testCases: [{ input: "Ada", expectedOutput: '{"message": "Hello Ada"}', isHidden: false }],
      }),
    ],
  },
  {
    title: "Path, Query & Body",
    description: "Accept parameters from clients",
    lessons: [
      theory("Path Parameters", 15, [
        { heading: "/users/{user_id}", body: "Declare typed path params in function signature." },
      ]),
      theory("Query Parameters", 15, [
        { heading: "Optional filters", body: "`?skip=0&limit=10` as function args with defaults." },
      ]),
      theory("Request Bodies", 15, [
        { heading: "Pydantic models", body: "Define `class Item(BaseModel): name: str; price: float` for POST bodies." },
      ]),
      theory("Response Models", 12, [
        { heading: "Filter output", body: "response_model excludes sensitive fields from API responses." },
      ]),
    ],
  },
  {
    title: "Validation & Errors",
    description: "Robust input handling",
    lessons: [
      theory("Pydantic Validation", 15, [
        { heading: "Automatic 422", body: "Invalid types return validation errors with field details." },
      ]),
      theory("HTTPException", 15, [
        { heading: "Raise errors", body: "`raise HTTPException(status_code=404, detail='Not found')`" },
      ]),
      theory("Custom Validators", 12, [
        { heading: "@field_validator", body: "Enforce business rules beyond types." },
      ]),
      practice("Validate Email Domain", 20, "**Task:** `is_allowed_email(email)` returns True if email ends with `@example.com`", [], {
        language: "python",
        codeTemplate: stdinWrap("def is_allowed_email(email):\n    return email.endswith('@example.com')\nprint(str(is_allowed_email(data)).lower())"),
        solution: stdinWrap("def is_allowed_email(email):\n    return email.endswith('@example.com')\nprint(str(is_allowed_email(data)).lower())"),
        testCases: [
          { input: "a@example.com", expectedOutput: "true", isHidden: false },
          { input: "a@test.com", expectedOutput: "false", isHidden: true },
        ],
      }),
    ],
  },
  {
    title: "Databases",
    description: "Persist data behind your API",
    lessons: [
      theory("SQLite with Python", 15, [
        { heading: "stdlib sqlite3", body: "Lightweight file database — great for learning and small apps." },
      ], py("import sqlite3\nconn = sqlite3.connect('app.db')")),
      theory("SQLAlchemy / SQLModel", 15, [
        { heading: "ORM layer", body: "Map Python classes to tables; works well with FastAPI dependency injection." },
      ]),
      theory("CRUD Patterns", 12, [
        { heading: "Repository layer", body: "Separate DB access from route handlers for testability." },
      ]),
      theory("Migrations", 12, [
        { heading: "Alembic", body: "Version schema changes as your models evolve." },
      ]),
    ],
  },
  {
    title: "Auth & Security",
    description: "Protect your endpoints",
    lessons: [
      theory("API Keys", 12, [
        { heading: "Header auth", body: "Simple server-to-server auth with rotated keys." },
      ]),
      theory("OAuth2 & JWT", 15, [
        { heading: "User auth", body: "FastAPI OAuth2 password flow; issue JWT access tokens." },
      ]),
      theory("CORS", 12, [
        { heading: "CORSMiddleware", body: "Allow browser frontends on different origins to call your API." },
      ]),
      theory("HTTPS", 12, [
        { heading: "TLS everywhere", body: "Terminate SSL at reverse proxy in production." },
      ]),
    ],
  },
  {
    title: "Testing & Deployment",
    description: "Ship reliable APIs",
    lessons: [
      theory("TestClient", 15, [
        { heading: "fastapi.testclient", body: "Integration tests without running uvicorn separately." },
      ]),
      theory("Docker", 15, [
        { heading: "Containerize", body: "Dockerfile with uvicorn CMD — reproducible deploys." },
      ]),
      theory("Environment Config", 12, [
        { heading: "pydantic-settings", body: "Load DB URL and secrets from environment." },
      ]),
      theory("Monitoring", 12, [
        { heading: "Health routes", body: "/health and structured logging for ops." },
      ]),
    ],
  },
  {
    title: "Capstone API",
    description: "Build a complete microservice",
    lessons: [
      theory("Bookmarks API Spec", 15, [
        { heading: "Endpoints", body: "CRUD for bookmarks: title, url, tags. SQLite backend." },
      ]),
      theory("Project Structure", 12, [
        { heading: "Routers", body: "Split routes into `routers/bookmarks.py`, include with `app.include_router`." },
      ]),
      theory("Deploy Checklist", 12, [
        { heading: "Go live", body: "Tests pass, env vars set, CORS configured, HTTPS enabled." },
      ]),
      theory("What's Next", 12, [
        { heading: "AI integration", body: "Add summarization endpoint using the Build with AI APIs course." },
      ]),
    ],
  },
];

export async function seedPythonWebApis(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "python");
  await applyEnhancementsToCourse(ctx, "python-web-apis");
  return lessonIds;
}
