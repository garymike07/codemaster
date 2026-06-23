import type { EnhancedLessonValues } from "./utils";

import { enhancements as jsFundamentals } from "./enhancements/javascript_fundamentals";
import { enhancements as modernJs } from "./enhancements/modern_javascript";
import { enhancements as reactFrontend } from "./enhancements/react_frontend";
import { enhancements as nodejsApis } from "./enhancements/nodejs_apis";
import { enhancements as pythonFundamentals } from "./enhancements/python_fundamentals";
import { enhancements as pythonDataAutomation } from "./enhancements/python_data_automation";
import { enhancements as pythonWebApis } from "./enhancements/python_web_apis";
import { enhancements as aiFoundations } from "./enhancements/ai_foundations";
import { enhancements as buildWithAiApis } from "./enhancements/build_with_ai_apis";
import { enhancements as aiAssistedDev } from "./enhancements/ai_assisted_development";
import { enhancements as reactFundamentals } from "./enhancements/react_fundamentals";

type EnhancementMap = Record<string, Record<string, Partial<EnhancedLessonValues>>>;

export const ENHANCEMENTS: EnhancementMap = {
  "javascript-fundamentals": jsFundamentals,
  "modern-javascript": modernJs,
  "react-frontend": reactFrontend,
  "nodejs-apis": nodejsApis,
  "python-fundamentals": pythonFundamentals,
  "python-data-automation": pythonDataAutomation,
  "python-web-apis": pythonWebApis,
  "ai-foundations": aiFoundations,
  "build-with-ai-apis": buildWithAiApis,
  "ai-assisted-development": aiAssistedDev,
  "react-fundamentals": reactFundamentals,
};

export function getEnhancements(
  courseSlug: string,
  lessonTitle: string
): Partial<EnhancedLessonValues> {
  return ENHANCEMENTS[courseSlug]?.[lessonTitle] ?? {};
}

export function applyEnhancements(
  courseSlug: string,
  lessonTitle: string,
  base: Partial<EnhancedLessonValues>
): Partial<EnhancedLessonValues> {
  const enhancements = getEnhancements(courseSlug, lessonTitle);
  return { ...base, ...enhancements };
}

import type { SeedContext, SeedCourseId } from "./utils";

export async function applyEnhancementsToCourse(
  ctx: SeedContext,
  courseSlug: string,
) {
  const enhancements = ENHANCEMENTS[courseSlug];
  if (!enhancements) return;

  const course = await ctx.db
    .query("courses")
    .withIndex("by_slug", (q) => q.eq("slug", courseSlug))
    .unique();
  if (!course) return;

  const modules = await ctx.db
    .query("modules")
    .withIndex("by_course", (q) => q.eq("courseId", course._id))
    .collect();

  for (const module of modules) {
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_module", (q) => q.eq("moduleId", module._id))
      .collect();

    for (const lesson of lessons) {
      const enhancement = enhancements[lesson.title];
      if (enhancement) {
        await ctx.db.patch(lesson._id, enhancement);
      }
    }
  }
}
