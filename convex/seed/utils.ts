import type { Id } from "../_generated/dataModel";
import type { MutationCtx } from "../_generated/server";

export type SeedContext = MutationCtx;
export type SeedCourseId = Id<"courses">;
export type SeedModuleId = Id<"modules">;

export async function upsertCourseBySlug(
  ctx: SeedContext,
  slug: string,
  values: Omit<
    {
      title: string;
      description: string;
      icon: string;
      language?: string;
      difficulty?: "beginner" | "intermediate" | "advanced";
      estimatedHours?: number;
      totalLessons?: number;
      isPublished?: boolean;
    },
    never
  >
) {
  const existing = await ctx.db
    .query("courses")
    .withIndex("by_slug", (q) => q.eq("slug", slug))
    .unique();

  if (existing) {
    await ctx.db.patch(existing._id, { ...values, slug });
    return existing._id;
  }

  return await ctx.db.insert("courses", {
    ...values,
    slug,
    totalLessons: values.totalLessons ?? 0,
    isPublished: values.isPublished ?? true,
  });
}

export async function upsertModuleByTitle(
  ctx: SeedContext,
  courseId: SeedCourseId,
  title: string,
  values: { description?: string; order: number }
): Promise<SeedModuleId> {
  const modules = await ctx.db
    .query("modules")
    .withIndex("by_course", (q) => q.eq("courseId", courseId))
    .collect();

  const existing = modules.find((m) => m.title === title);
  if (existing) {
    await ctx.db.patch(existing._id, { ...values });
    return existing._id;
  }

  return await ctx.db.insert("modules", {
    courseId,
    title,
    ...values,
  });
}

type LessonResource = {
  title: string;
  url: string;
  type: "video" | "article" | "docs" | "tutorial";
};

type LessonExampleVariation = {
  name: string;
  code: string;
  description: string;
};

type LessonExample = {
  title: string;
  description: string;
  code: string;
  explanation: string;
  output?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  concepts?: string[];
  variations?: LessonExampleVariation[];
};

type LessonCommonMistake = {
  mistake: string;
  explanation: string;
  howToAvoid: string;
};

type LessonPlayground = {
  enabled: boolean;
  starterCode?: string;
  language?: string;
  testCases?: { input: string; expectedOutput: string; description: string; isHidden?: boolean }[];
  hints?: string[];
  solution?: string;
  allowedImports?: string[];
};

type LessonAiConfig = {
  systemPrompt?: string;
  suggestedQuestions?: string[];
  tutorMode?: "socratic" | "explain" | "debug" | "quiz";
};

export type EnhancedLessonValues = {
  type: "theory" | "practice" | "quiz" | "challenge" | "project";
  content: string;
  order: number;
  codeTemplate?: string;
  solution?: string;
  testCases?: { input: string; expectedOutput: string; isHidden?: boolean }[];
  estimatedMinutes?: number;
  language?: string;
  hints?: string[];
  xpReward?: number;
  notes?: {
    summary: string;
    detailedContent?: string;
    prerequisites?: string[];
    learningObjectives: string[];
    resources?: LessonResource[];
  };
  examples?: LessonExample[];
  playground?: LessonPlayground;
  keyTakeaways?: string[];
  commonMistakes?: LessonCommonMistake[];
  aiConfig?: LessonAiConfig;
};

export async function upsertLessonByTitle(
  ctx: SeedContext,
  moduleId: SeedModuleId,
  courseId: SeedCourseId,
  title: string,
  values: EnhancedLessonValues
): Promise<Id<"lessons">> {
  const lessons = await ctx.db
    .query("lessons")
    .withIndex("by_module", (q) => q.eq("moduleId", moduleId))
    .collect();

  const existing = lessons.find((l) => l.title === title);
  if (existing) {
    await ctx.db.patch(existing._id, values);
    return existing._id;
  }

  return await ctx.db.insert("lessons", {
    moduleId,
    courseId,
    title,
    ...values,
  });
}
