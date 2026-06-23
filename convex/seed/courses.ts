import type { SeedContext } from "./utils";
import { upsertCourseBySlug } from "./utils";

const COURSE_CATALOG = [
  {
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description:
      "Master JavaScript from scratch — variables, functions, DOM, async programming, and modern patterns.",
    icon: "🟨",
    language: "javascript",
    difficulty: "beginner" as const,
    estimatedHours: 80,
    totalLessons: 56,
  },
  {
    slug: "modern-javascript",
    title: "Modern JavaScript (ES6+)",
    description:
      "Deep dive into ES6+ — modules, destructuring, async/await, classes, and modern tooling.",
    icon: "⚡",
    language: "javascript",
    difficulty: "intermediate" as const,
    estimatedHours: 40,
    totalLessons: 32,
  },
  {
    slug: "react-frontend",
    title: "Frontend with React",
    description:
      "Build interactive UIs with React — components, hooks, routing, forms, and data fetching.",
    icon: "⚛️",
    language: "javascript",
    difficulty: "intermediate" as const,
    estimatedHours: 50,
    totalLessons: 32,
  },
  {
    slug: "nodejs-apis",
    title: "Node.js & APIs",
    description:
      "Server-side JavaScript with Node.js and Express — REST APIs, middleware, and auth basics.",
    icon: "🟢",
    language: "javascript",
    difficulty: "intermediate" as const,
    estimatedHours: 45,
    totalLessons: 32,
  },
  {
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    description:
      "Learn Python from the ground up — syntax, data structures, functions, OOP, and files.",
    icon: "🐍",
    language: "python",
    difficulty: "beginner" as const,
    estimatedHours: 70,
    totalLessons: 32,
  },
  {
    slug: "python-data-automation",
    title: "Python for Data & Automation",
    description:
      "Work with data using pandas, automate tasks, call APIs, and visualize results.",
    icon: "📊",
    language: "python",
    difficulty: "intermediate" as const,
    estimatedHours: 40,
    totalLessons: 32,
  },
  {
    slug: "python-web-apis",
    title: "Python Web & APIs",
    description:
      "Build HTTP APIs with FastAPI — routes, validation, databases, and deployment.",
    icon: "🌐",
    language: "python",
    difficulty: "intermediate" as const,
    estimatedHours: 40,
    totalLessons: 32,
  },
  {
    slug: "ai-foundations",
    title: "AI Foundations for Developers",
    description:
      "Understand LLMs, tokens, embeddings, limitations, ethics, and how AI fits in software.",
    icon: "🧠",
    language: "javascript",
    difficulty: "beginner" as const,
    estimatedHours: 35,
    totalLessons: 32,
  },
  {
    slug: "build-with-ai-apis",
    title: "Build with AI APIs",
    description:
      "Integrate LLM APIs, design prompts, build RAG pipelines, and ship AI-powered features.",
    icon: "🤖",
    language: "javascript",
    difficulty: "intermediate" as const,
    estimatedHours: 45,
    totalLessons: 32,
  },
  {
    slug: "react-fundamentals",
    title: "React Fundamentals",
    description:
      "Learn React from the ground up — components, JSX, hooks, forms, patterns, and building real apps.",
    icon: "🔥",
    language: "javascript",
    difficulty: "beginner" as const,
    estimatedHours: 60,
    totalLessons: 32,
  },
  {
    slug: "ai-assisted-development",
    title: "AI-Assisted Development",
    description:
      "Use AI tools effectively for coding, debugging, testing, and reviewing — with guardrails.",
    icon: "✨",
    language: "javascript",
    difficulty: "beginner" as const,
    estimatedHours: 25,
    totalLessons: 24,
  },
];

export async function seedCourses(ctx: SeedContext) {
  return await Promise.all(
    COURSE_CATALOG.map((course) =>
      upsertCourseBySlug(ctx, course.slug, {
        title: course.title,
        description: course.description,
        icon: course.icon,
        language: course.language,
        difficulty: course.difficulty,
        estimatedHours: course.estimatedHours,
        totalLessons: course.totalLessons,
        isPublished: true,
      })
    )
  );
}

export { COURSE_CATALOG };
