import type { Id } from "../_generated/dataModel";
import type { SeedContext, SeedCourseId, EnhancedLessonValues } from "./utils";
import { upsertModuleByTitle, upsertLessonByTitle } from "./utils";

export type LessonSection = { heading: string; body: string };

export type LessonResource = {
  title: string;
  url: string;
  type: "video" | "article" | "docs" | "tutorial";
};

export type LessonExampleVariation = {
  name: string;
  code: string;
  description: string;
};

export type LessonExample = {
  title: string;
  description: string;
  code: string;
  explanation: string;
  output?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  concepts?: string[];
  variations?: LessonExampleVariation[];
};

export type LessonCommonMistake = {
  mistake: string;
  explanation: string;
  howToAvoid: string;
};

export type LessonSpec = {
  title: string;
  type: "theory" | "practice" | "quiz" | "challenge" | "project";
  estimatedMinutes: number;
  sections: LessonSection[];
  codeExample?: { language: string; code: string };
  codeTemplate?: string;
  solution?: string;
  testCases?: { input: string; expectedOutput: string; isHidden?: boolean }[];
  taskSummary?: string;
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
  playground?: {
    enabled: boolean;
    starterCode?: string;
    language?: string;
    testCases?: { input: string; expectedOutput: string; description: string; isHidden?: boolean }[];
    hints?: string[];
    solution?: string;
    allowedImports?: string[];
  };
  keyTakeaways?: string[];
  commonMistakes?: LessonCommonMistake[];
  aiConfig?: {
    systemPrompt?: string;
    suggestedQuestions?: string[];
    tutorMode?: "socratic" | "explain" | "debug" | "quiz";
  };
};

export type ModuleSpec = {
  title: string;
  description: string;
  lessons: LessonSpec[];
};

export function formatLessonContent(spec: LessonSpec): string {
  const parts = [`# ${spec.title}`, ""];
  if (spec.taskSummary) {
    parts.push(spec.taskSummary, "");
  }
  for (const section of spec.sections) {
    parts.push(`## ${section.heading}`, "", section.body, "");
  }
  if (spec.codeExample) {
    parts.push(
      "## Example",
      "",
      `\`\`\`${spec.codeExample.language}`,
      spec.codeExample.code,
      "```",
      ""
    );
  }
  return parts.join("\n").trim();
}

export async function seedCourseFromModules(
  ctx: SeedContext,
  courseId: SeedCourseId,
  modules: ModuleSpec[],
  defaultLanguage?: string
): Promise<Id<"lessons">[]> {
  const lessonIds: Id<"lessons">[] = [];

  for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
    const moduleSpec = modules[moduleIndex];
    const moduleId = await upsertModuleByTitle(ctx, courseId, moduleSpec.title, {
      description: moduleSpec.description,
      order: moduleIndex + 1,
    });

    for (let lessonIndex = 0; lessonIndex < moduleSpec.lessons.length; lessonIndex++) {
      const lesson = moduleSpec.lessons[lessonIndex];
      const enhanced: EnhancedLessonValues = {
        type: lesson.type,
        order: lessonIndex + 1,
        estimatedMinutes: lesson.estimatedMinutes,
        content: formatLessonContent(lesson),
        language: defaultLanguage,
        codeTemplate: lesson.codeTemplate,
        solution: lesson.solution,
        testCases: lesson.testCases,
        hints: lesson.hints,
        xpReward: lesson.xpReward,
        notes: lesson.notes,
        examples: lesson.examples,
        playground: lesson.playground,
        keyTakeaways: lesson.keyTakeaways,
        commonMistakes: lesson.commonMistakes,
        aiConfig: lesson.aiConfig,
      };
      const lessonId = await upsertLessonByTitle(ctx, moduleId, courseId, lesson.title, enhanced);
      lessonIds.push(lessonId);
    }
  }

  return lessonIds;
}

/** Shorthand helpers for common lesson patterns */
export function theory(
  title: string,
  minutes: number,
  sections: LessonSection[],
  codeExample?: { language: string; code: string }
): LessonSpec {
  return { title, type: "theory", estimatedMinutes: minutes, sections, codeExample };
}

export function practice(
  title: string,
  minutes: number,
  taskSummary: string,
  sections: LessonSection[],
  opts: {
    language: string;
    codeTemplate: string;
    solution: string;
    testCases: { input: string; expectedOutput: string; isHidden?: boolean }[];
  }
): LessonSpec {
  return {
    title,
    type: "practice",
    estimatedMinutes: minutes,
    taskSummary,
    sections,
    codeTemplate: opts.codeTemplate,
    solution: opts.solution,
    testCases: opts.testCases,
    codeExample: { language: opts.language, code: opts.solution },
  };
}
