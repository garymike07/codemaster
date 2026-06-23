export const APP_NAME = 'CodeMaster';

export const TOAST_DURATION_MS = 4000;
export const AUTOSAVE_DELAY_MS = 3000;
export const DELETE_CONFIRM_TIMEOUT_MS = 5000;

export const SUPPORTED_EXECUTION_LANGUAGES = ['javascript', 'python'] as const;

export type CourseTrack = 'javascript' | 'python' | 'ai';

export type CourseCatalogEntry = {
  slug: string;
  title: string;
  track: CourseTrack;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  icon: string;
  description: string;
};

/** Mirrors convex/seed/courses.ts — used for landing & marketing copy */
export const COURSE_CATALOG: CourseCatalogEntry[] = [
  {
    slug: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    track: 'javascript',
    level: 'Beginner',
    lessons: 56,
    icon: '🟨',
    description: 'Variables, functions, DOM, async, and OOP from scratch.',
  },
  {
    slug: 'modern-javascript',
    title: 'Modern JavaScript (ES6+)',
    track: 'javascript',
    level: 'Intermediate',
    lessons: 32,
    icon: '⚡',
    description: 'Modules, destructuring, classes, and modern tooling.',
  },
  {
    slug: 'react-frontend',
    title: 'Frontend with React',
    track: 'javascript',
    level: 'Intermediate',
    lessons: 32,
    icon: '⚛️',
    description: 'Components, hooks, routing, and data fetching.',
  },
  {
    slug: 'nodejs-apis',
    title: 'Node.js & APIs',
    track: 'javascript',
    level: 'Intermediate',
    lessons: 32,
    icon: '🟢',
    description: 'Express, REST APIs, middleware, and deployment.',
  },
  {
    slug: 'python-fundamentals',
    title: 'Python Fundamentals',
    track: 'python',
    level: 'Beginner',
    lessons: 32,
    icon: '🐍',
    description: 'Syntax, data structures, functions, and OOP.',
  },
  {
    slug: 'python-data-automation',
    title: 'Python for Data & Automation',
    track: 'python',
    level: 'Intermediate',
    lessons: 32,
    icon: '📊',
    description: 'pandas, APIs, visualization, and scripting.',
  },
  {
    slug: 'python-web-apis',
    title: 'Python Web & APIs',
    track: 'python',
    level: 'Intermediate',
    lessons: 32,
    icon: '🌐',
    description: 'FastAPI, validation, databases, and deployment.',
  },
  {
    slug: 'react-fundamentals',
    title: 'React Fundamentals',
    track: 'javascript',
    level: 'Beginner',
    lessons: 32,
    icon: '🔥',
    description: 'Components, hooks, forms, patterns, and building real apps.',
  },
  {
    slug: 'ai-foundations',
    title: 'AI Foundations for Developers',
    track: 'ai',
    level: 'Beginner',
    lessons: 32,
    icon: '🧠',
    description: 'LLMs, tokens, ethics, and how AI fits in software.',
  },
  {
    slug: 'build-with-ai-apis',
    title: 'Build with AI APIs',
    track: 'ai',
    level: 'Intermediate',
    lessons: 32,
    icon: '🤖',
    description: 'Prompts, embeddings, RAG, and production AI features.',
  },
  {
    slug: 'ai-assisted-development',
    title: 'AI-Assisted Development',
    track: 'ai',
    level: 'Beginner',
    lessons: 24,
    icon: '✨',
    description: 'Use AI tools effectively for coding and debugging.',
  },
];

export const TRACKS: { id: CourseTrack; label: string; color: string }[] = [
  { id: 'javascript', label: 'JavaScript', color: 'text-yellow-500' },
  { id: 'python', label: 'Python', color: 'text-blue-500' },
  { id: 'ai', label: 'AI', color: 'text-purple-500' },
];

export function coursePath(slug: string) {
  return `/course/${slug}`;
}
