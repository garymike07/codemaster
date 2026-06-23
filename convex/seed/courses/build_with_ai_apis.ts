import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const MODULES: ModuleSpec[] = [
  {
    title: "LLM APIs",
    description: "Call language models from your applications",
    lessons: [
      theory("OpenAI-Compatible APIs", 15, [
        { heading: "Chat completions", body: "POST to `/v1/chat/completions` with model, messages array, and optional temperature." },
        { heading: "Providers", body: "OpenAI, Anthropic, Azure OpenAI, Groq, Together — similar patterns, different SDKs." },
      ], { language: "javascript", code: "const messages = [\n  { role: 'system', content: 'You are helpful.' },\n  { role: 'user', content: 'Hello' }\n];" }),
      theory("API Keys & Security", 15, [
        { heading: "Never in frontend", body: "Call LLM APIs from your backend. Store keys in env vars; rotate on leak." },
      ]),
      theory("Message Roles", 12, [
        { heading: "system, user, assistant", body: "Some APIs add tool/function roles for agentic flows." },
      ]),
      practice("Format Messages", 20, "**Task:** `toUserMessage(text)` returns `{ role: 'user', content: text }` as JSON string.", [], {
        language: "javascript",
        codeTemplate: `function toUserMessage(text) {
  return JSON.stringify({ role: "user", content: text });
}
const fs = require("fs");
console.log(toUserMessage(fs.readFileSync(0,"utf8").trim()));`,
        solution: `function toUserMessage(text) {
  return JSON.stringify({ role: "user", content: text });
}
const fs = require("fs");
console.log(toUserMessage(fs.readFileSync(0,"utf8").trim()));`,
        testCases: [{ input: "Hi", expectedOutput: '{"role":"user","content":"Hi"}', isHidden: false }],
      }),
    ],
  },
  {
    title: "Prompt Engineering",
    description: "Design reliable prompts for production",
    lessons: [
      theory("Structured Instructions", 15, [
        { heading: "Be specific", body: "Define role, task, format, constraints, and examples in system prompt." },
      ]),
      theory("JSON Mode", 15, [
        { heading: "Structured outputs", body: "Request JSON-only responses; validate with schema (Zod, Pydantic) after parsing." },
      ]),
      theory("Chain-of-Thought", 12, [
        { heading: "Reasoning", body: "Ask model to think step-by-step for complex logic — verify steps when critical." },
      ]),
      theory("Prompt Versioning", 12, [
        { heading: "Treat prompts as code", body: "Store in git, version changes, run evals on each update." },
      ]),
    ],
  },
  {
    title: "Embeddings",
    description: "Semantic search with vectors",
    lessons: [
      theory("What Embeddings Do", 15, [
        { heading: "Similarity search", body: "Convert text to vectors; find nearest neighbors with cosine similarity." },
      ]),
      theory("Embedding APIs", 15, [
        { heading: "text-embedding-3-small", body: "Batch documents; cache vectors — they don't change unless text changes." },
      ]),
      theory("Vector Databases", 15, [
        { heading: "Pinecone, pgvector, Chroma", body: "Store and query millions of vectors with metadata filters." },
      ]),
      practice("Cosine Similarity", 25, "**Task:** `dot(a,b)` for two 2D vectors as `a1*b1+a2*b2` from stdin `a1,a2,b1,b2`.", [], {
        language: "javascript",
        codeTemplate: `function dot(a, b) {
  return a[0]*b[0] + a[1]*b[1];
}
const fs = require("fs");
const [a1,a2,b1,b2] = fs.readFileSync(0,"utf8").trim().split(",").map(Number);
console.log(dot([a1,a2],[b1,b2]));`,
        solution: `function dot(a, b) {
  return a[0]*b[0] + a[1]*b[1];
}
const fs = require("fs");
const [a1,a2,b1,b2] = fs.readFileSync(0,"utf8").trim().split(",").map(Number);
console.log(dot([a1,a2],[b1,b2]));`,
        testCases: [{ input: "1,2,3,4", expectedOutput: "11", isHidden: false }],
      }),
    ],
  },
  {
    title: "RAG Pipelines",
    description: "Retrieval-Augmented Generation",
    lessons: [
      theory("RAG Steps", 15, [
        { heading: "Pipeline", body: "1) Chunk documents 2) Embed 3) Store 4) On query, retrieve top-k 5) Inject into prompt 6) Generate answer." },
      ]),
      theory("Chunking Strategies", 15, [
        { heading: "Size & overlap", body: "500–1000 token chunks with 10–20% overlap preserves context across boundaries." },
      ]),
      theory("Citation & Grounding", 12, [
        { heading: "Reduce hallucinations", body: "Ask model to cite chunk IDs; show sources in UI." },
      ]),
      theory("Evaluation", 12, [
        { heading: "RAG metrics", body: "Retrieval precision, answer faithfulness, latency." },
      ]),
    ],
  },
  {
    title: "Streaming & UX",
    description: "Responsive AI interfaces",
    lessons: [
      theory("Streaming Responses", 15, [
        { heading: "SSE / stream: true", body: "Show tokens as they arrive — improves perceived speed." },
      ]),
      theory("Loading States", 12, [
        { heading: "UX", body: "Typing indicators, cancel buttons, retry on failure." },
      ]),
      theory("Token Budget UI", 12, [
        { heading: "Show limits", body: "Warn users approaching context limits." },
      ]),
      theory("Error Messages", 12, [
        { heading: "User-friendly", body: "Map rate limits and outages to actionable messages." },
      ]),
    ],
  },
  {
    title: "Cost & Performance",
    description: "Run AI features economically",
    lessons: [
      theory("Token Economics", 15, [
        { heading: "Input vs output pricing", body: "Output tokens often cost more — keep completions concise." },
      ]),
      theory("Caching", 15, [
        { heading: "Prompt caching", body: "Some providers cache repeated system prompts at lower cost." },
      ]),
      theory("Model Routing", 12, [
        { heading: "Small vs large", body: "Route easy tasks to cheaper models; escalate when needed." },
      ]),
      theory("Batch APIs", 12, [
        { heading: "Async jobs", body: "Batch endpoints for non-real-time workloads at discount." },
      ]),
    ],
  },
  {
    title: "Safety & Guardrails",
    description: "Protect users and your product",
    lessons: [
      theory("Input Moderation", 15, [
        { heading: "Filter abuse", body: "Moderation APIs block harmful prompts before they reach your main model." },
      ]),
      theory("Output Validation", 15, [
        { heading: "Schema enforcement", body: "Reject malformed JSON; retry with fix prompt." },
      ]),
      theory("Tool Use Safely", 12, [
        { heading: "Agents", body: "Limit tool permissions; confirm destructive actions with user." },
      ]),
      theory("Red Teaming", 12, [
        { heading: "Test attacks", body: "Prompt injection, jailbreaks — document mitigations." },
      ]),
    ],
  },
  {
    title: "Capstone: Q&A Bot",
    description: "Ship a document Q&A feature",
    lessons: [
      theory("Architecture", 15, [
        { heading: "Components", body: "Upload → chunk → embed → store → chat UI with retrieval." },
      ]),
      theory("Backend Route", 15, [
        { heading: "POST /ask", body: "Embed question, retrieve chunks, call chat API, return answer + sources." },
      ]),
      theory("Testing", 12, [
        { heading: "Golden questions", body: "Maintain test set with expected citations." },
      ]),
      theory("Launch Checklist", 12, [
        { heading: "Production", body: "Rate limits, logging, cost alerts, privacy policy updated." },
      ]),
    ],
  },
];

export async function seedBuildWithAiApis(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "javascript");
  await applyEnhancementsToCourse(ctx, "build-with-ai-apis");
  return lessonIds;
}
