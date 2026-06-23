import type { Id } from "../../_generated/dataModel";
import type { SeedContext, SeedCourseId } from "../utils";
import { seedCourseFromModules, theory, practice, type ModuleSpec } from "../contentFactory";
import { applyEnhancementsToCourse } from "../enhancements";

const MODULES: ModuleSpec[] = [
  {
    title: "AI Coding Tools Landscape",
    description: "Overview of assistants and agents for developers",
    lessons: [
      theory("Categories of Tools", 15, [
        { heading: "IDE assistants", body: "Cursor, GitHub Copilot, Cody — inline completion and chat in editor." },
        { heading: "Agents", body: "Tools that plan multi-step changes across files — require more oversight." },
      ]),
      theory("When AI Helps Most", 15, [
        { heading: "Boilerplate, tests, docs", body: "Repetitive code, regex, format conversions, explaining unfamiliar code." },
      ]),
      theory("When to Be Careful", 15, [
        { heading: "Security & logic", body: "Auth, crypto, payments, concurrency — always review carefully." },
      ]),
      theory("Your Workflow", 12, [
        { heading: "Integrate deliberately", body: "Pick one primary tool; learn its shortcuts and context features." },
      ]),
    ],
  },
  {
    title: "Effective Prompting for Code",
    description: "Get useful code from AI assistants",
    lessons: [
      theory("Context is King", 15, [
        { heading: "Include files, errors, stack traces", body: "More relevant context → better suggestions. Use @file references in Cursor." },
      ]),
      theory("Specify Constraints", 15, [
        { heading: "Stack, style, tests", body: "'Use existing Button component, TypeScript, no new dependencies.'" },
      ]),
      theory("Iterative Refinement", 12, [
        { heading: "Small steps", body: "Generate skeleton → add tests → refactor — don't one-shot huge features." },
      ]),
      practice("Prompt Template", 20, "**Task:** `codePrompt(feature)` returns multi-line prompt with feature name.", [], {
        language: "javascript",
        codeTemplate: `function codePrompt(feature) {
  return \`Implement \${feature}. Follow project conventions. Add tests.\`;
}
const fs = require("fs");
console.log(codePrompt(fs.readFileSync(0,"utf8").trim()));`,
        solution: `function codePrompt(feature) {
  return \`Implement \${feature}. Follow project conventions. Add tests.\`;
}
const fs = require("fs");
console.log(codePrompt(fs.readFileSync(0,"utf8").trim()));`,
        testCases: [{ input: "login form", expectedOutput: "Implement login form. Follow project conventions. Add tests.", isHidden: false }],
      }),
    ],
  },
  {
    title: "Debugging with AI",
    description: "Resolve bugs faster with assistance",
    lessons: [
      theory("Describe Symptoms", 15, [
        { heading: "Expected vs actual", body: "Paste error message, reproduction steps, what you already tried." },
      ]),
      theory("Verify Suggestions", 15, [
        { heading: "Don't apply blindly", body: "Understand the fix; run tests; check edge cases." },
      ]),
      theory("Rubber Duck++", 12, [
        { heading: "Explain the bug", body: "Asking AI to explain often reveals your own misunderstanding." },
      ]),
      theory("Logging Strategy", 12, [
        { heading: "Ask for diagnostics", body: "AI can suggest strategic console.log or breakpoints." },
      ]),
    ],
  },
  {
    title: "Testing & Documentation",
    description: "AI for quality and maintainability",
    lessons: [
      theory("Generate Tests", 15, [
        { heading: "Unit test scaffolds", body: "Provide function + examples → AI drafts test cases. You add edge cases." },
      ]),
      theory("Docstrings & README", 15, [
        { heading: "Document after API stable", body: "AI drafts docs from code — verify accuracy." },
      ]),
      theory("Refactoring", 15, [
        { heading: "Safe steps", body: "Tests first, small commits, run CI after each AI-assisted refactor." },
      ]),
      theory("Code Review with AI", 12, [
        { heading: "Pre-review", body: "Ask AI to review your diff before human review — catch obvious issues." },
      ]),
    ],
  },
  {
    title: "Security & Verification",
    description: "Stay safe when using AI-generated code",
    lessons: [
      theory("Dependency Risks", 15, [
        { heading: "Hallucinated packages", body: "AI may suggest non-existent npm packages (typosquatting risk). Verify on npm before install." },
      ]),
      theory("Secrets Scanning", 15, [
        { heading: "Never paste keys", body: "Use env vars; scan commits for accidental leaks." },
      ]),
      theory("License Awareness", 12, [
        { heading: "Copied code", body: "Ensure generated code doesn't violate licenses if copied from training data." },
      ]),
      practice("Sanitize Input", 20, "**Task:** `stripTags(html)` removes `<...>` tags with regex.", [], {
        language: "javascript",
        codeTemplate: `function stripTags(html) {
  return html.replace(/<[^>]*>/g, "");
}
const fs = require("fs");
console.log(stripTags(fs.readFileSync(0,"utf8").trim()));`,
        solution: `function stripTags(html) {
  return html.replace(/<[^>]*>/g, "");
}
const fs = require("fs");
console.log(stripTags(fs.readFileSync(0,"utf8").trim()));`,
        testCases: [{ input: "<b>hi</b>", expectedOutput: "hi", isHidden: false }],
      }),
    ],
  },
  {
    title: "Team & Career",
    description: "Best practices for professional development",
    lessons: [
      theory("Team Guidelines", 15, [
        { heading: "Policy", body: "When AI use is allowed, disclosure in PRs, banned for certain files." },
      ]),
      theory("Interview & Learning", 12, [
        { heading: "Fundamentals still matter", body: "Understand code you ship — AI augments, doesn't replace core skills." },
      ]),
      theory("Staying Current", 12, [
        { heading: "Rapid change", body: "New models and tools monthly — experiment continuously." },
      ]),
      theory("Course Recap", 12, [
        { heading: "Habits", body: "Verify, test, small prompts, secure keys, human review for critical paths." },
      ]),
    ],
  },
];

export async function seedAiAssistedDevelopment(
  ctx: SeedContext,
  courseId: SeedCourseId
): Promise<Id<"lessons">[]> {
  const lessonIds = await seedCourseFromModules(ctx, courseId, MODULES, "javascript");
  await applyEnhancementsToCourse(ctx, "ai-assisted-development");
  return lessonIds;
}
