import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const MODULES: ModuleSpec[] = [
  {
    title: "AI, ML, and GenAI",
    description: "Clarify terminology and the modern AI landscape",
    lessons: [
      theory("Definitions", 15, [
        { heading: "AI vs ML vs GenAI", body: "AI is broad intelligent behavior. ML learns from data. Generative AI creates new content (text, images, code) from models like LLMs." },
        { heading: "Discriminative vs generative", body: "Classifiers predict labels; generative models produce outputs token-by-token." },
      ]),
      theory("Brief History", 12, [
        { heading: "From rules to transformers", body: "Expert systems → statistical ML → deep learning → transformers (2017) → ChatGPT moment (2022+)." },
      ]),
      theory("Where AI Fits in Software", 15, [
        { heading: "Product features", body: "Search, recommendations, chatbots, code assist, summarization, classification — not every problem needs AI." },
      ]),
      theory("Developer Mindset", 12, [
        { heading: "Probabilistic systems", body: "AI outputs are statistical — design UX for uncertainty and verification." },
      ]),
    ],
  },
  {
    title: "How LLMs Work (Intuition)",
    description: "Understand transformers without heavy math",
    lessons: [
      theory("Neural Networks Intuition", 15, [
        { heading: "Layers of weights", body: "Networks learn patterns from data by adjusting weights via training." },
      ]),
      theory("Transformers & Attention", 15, [
        { heading: "Attention mechanism", body: "Models weigh which input tokens matter when producing each output token — enables long-context reasoning." },
      ]),
      theory("Training vs Inference", 15, [
        { heading: "Two phases", body: "Training is expensive (GPU clusters). Inference is what your app calls via API — pay per token." },
      ]),
      theory("Open vs Closed Models", 12, [
        { heading: "Choices", body: "GPT-4, Claude, Gemini (APIs) vs open weights (Llama, Mistral) you can self-host." },
      ]),
    ],
  },
  {
    title: "Tokens & Context",
    description: "The unit of LLM input and output",
    lessons: [
      theory("What is a Token?", 15, [
        { heading: "Subword units", body: "Text is split into tokens (~4 chars in English). Billing and limits use token counts." },
      ]),
      theory("Context Windows", 15, [
        { heading: "Memory limit", body: "Models remember only recent tokens up to context size (8K–200K+). Long chats need summarization or RAG." },
      ]),
      theory("Embeddings Preview", 15, [
        { heading: "Vectors", body: "Embeddings map text to numbers capturing meaning — similar sentences have similar vectors." },
      ]),
      practice("Estimate Token Count", 20, "**Task:** `approxTokens(text)` returns `Math.ceil(text.length / 4)` as rough estimate.", [], {
        language: "javascript",
        codeTemplate: `function approxTokens(text) {
  return Math.ceil(text.length / 4);
}
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
console.log(approxTokens(input));`,
        solution: `function approxTokens(text) {
  return Math.ceil(text.length / 4);
}
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();
console.log(approxTokens(input));`,
        testCases: [{ input: "hello world", expectedOutput: "3", isHidden: false }],
      }),
    ],
  },
  {
    title: "Capabilities & Limitations",
    description: "What LLMs do well and poorly",
    lessons: [
      theory("Strengths", 15, [
        { heading: "Pattern completion", body: "Great at language, code patterns, brainstorming, explaining concepts, drafting text." },
      ]),
      theory("Hallucinations", 15, [
        { heading: "False confidence", body: "Models may invent facts, APIs, or citations. Always verify critical outputs." },
      ]),
      theory("Knowledge Cutoff", 12, [
        { heading: "Stale training data", body: "Models don't know recent events unless given tools or RAG." },
      ]),
      theory("Bias & Safety", 15, [
        { heading: "Responsible use", body: "Training data reflects society's biases. Add guardrails, human review for sensitive domains." },
      ]),
    ],
  },
  {
    title: "Prompting Basics",
    description: "Communicate effectively with models",
    lessons: [
      theory("System vs User Messages", 15, [
        { heading: "Roles", body: "System sets behavior; user asks; assistant responds. Maintain clear separation in chat APIs." },
      ]),
      theory("Temperature & Top-p", 15, [
        { heading: "Creativity knobs", body: "Low temperature = deterministic. Higher = more creative but less predictable." },
      ]),
      theory("Few-Shot Examples", 15, [
        { heading: "Show don't tell", body: "Include input/output examples in the prompt to steer format and style." },
      ]),
      practice("Build Prompt", 20, "**Task:** `buildPrompt(task)` returns `You are a helpful tutor. Task: ${task}`", [], {
        language: "javascript",
        codeTemplate: `function buildPrompt(task) {
  return \`You are a helpful tutor. Task: \${task}\`;
}
const fs = require("fs");
console.log(buildPrompt(fs.readFileSync(0,"utf8").trim()));`,
        solution: `function buildPrompt(task) {
  return \`You are a helpful tutor. Task: \${task}\`;
}
const fs = require("fs");
console.log(buildPrompt(fs.readFileSync(0,"utf8").trim()));`,
        testCases: [{ input: "Explain loops", expectedOutput: "You are a helpful tutor. Task: Explain loops", isHidden: false }],
      }),
    ],
  },
  {
    title: "Evaluation & Ethics",
    description: "Measure quality and deploy responsibly",
    lessons: [
      theory("Eval Metrics", 15, [
        { heading: "Quality checks", body: "Human rubrics, automated tests on outputs, A/B tests, regression suites for prompts." },
      ]),
      theory("Privacy & Data", 15, [
        { heading: "PII", body: "Don't send secrets or personal data to third-party APIs without agreements and redaction." },
      ]),
      theory("Regulation Awareness", 12, [
        { heading: "EU AI Act etc.", body: "Know obligations for high-risk AI in your jurisdiction." },
      ]),
      theory("Human in the Loop", 12, [
        { heading: "When to require review", body: "Medical, legal, financial advice needs human oversight." },
      ]),
    ],
  },
  {
    title: "AI in Products",
    description: "Architecture patterns for real apps",
    lessons: [
      theory("Feature Design", 15, [
        { heading: "Start small", body: "Summarize, classify, suggest — one clear user job before building 'general AI'." },
      ]),
      theory("Latency & Cost", 15, [
        { heading: "Tradeoffs", body: "Smaller models for speed; cache embeddings; stream responses for UX." },
      ]),
      theory("Fallbacks", 12, [
        { heading: "Graceful degradation", body: "When API fails, show cached answer or manual path." },
      ]),
      theory("Monitoring", 12, [
        { heading: "Log prompts/responses", body: "Redact PII; track quality drift over time." },
      ]),
    ],
  },
  {
    title: "Roadmap Forward",
    description: "Connect foundations to hands-on courses",
    lessons: [
      theory("Review Checklist", 12, [
        { heading: "You should know", body: "Tokens, context, hallucinations, prompting basics, ethics, when NOT to use AI." },
      ]),
      theory("Next: Build with AI APIs", 12, [
        { heading: "Hands-on", body: "Integrate OpenAI-compatible APIs, embeddings, and RAG in the next course." },
      ]),
      theory("Next: AI-Assisted Development", 12, [
        { heading: "Workflow", body: "Use AI tools to write better code faster — with verification habits." },
      ]),
      theory("Keep Learning", 12, [
        { heading: "Stay current", body: "Follow model release notes, provider docs, and ship small experiments weekly." },
      ]),
    ],
  },
];

export async function seedAiFoundations(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "javascript");
  await applyEnhancementsToCourse(ctx, "ai-foundations");
  return lessonIds;
}
