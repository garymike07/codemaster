import { mutation, query } from "./_generated/server";
import type { Id, Doc } from "./_generated/dataModel";
import type { MutationCtx } from "./_generated/server";
import { seedBadges } from "./seed/badges";
import { seedCourses, COURSE_CATALOG } from "./seed/courses";
import { seedExams } from "./seed/exams";

import { seedJavaScriptFundamentals } from "./seed/courses/javascript_fundamentals";
import { seedModernJavaScript } from "./seed/courses/modern_javascript";
import { seedReactFrontend } from "./seed/courses/react_frontend";
import { seedNodejsApis } from "./seed/courses/nodejs_apis";
import { seedPythonFundamentals } from "./seed/courses/python_fundamentals";
import { seedPythonDataAutomation } from "./seed/courses/python_data_automation";
import { seedPythonWebApis } from "./seed/courses/python_web_apis";
import { seedAiFoundations } from "./seed/courses/ai_foundations";
import { seedBuildWithAiApis } from "./seed/courses/build_with_ai_apis";
import { seedAiAssistedDevelopment } from "./seed/courses/ai_assisted_development";
import { seedReactFundamentals } from "./seed/courses/react_fundamentals";

type SeedFn = (
  ctx: MutationCtx,
  courseId: Id<"courses">
) => Promise<Id<"lessons">[]>;

const SEEDERS: Record<string, SeedFn> = {
  "javascript-fundamentals": seedJavaScriptFundamentals,
  "modern-javascript": seedModernJavaScript,
  "react-frontend": seedReactFrontend,
  "nodejs-apis": seedNodejsApis,
  "python-fundamentals": seedPythonFundamentals,
  "python-data-automation": seedPythonDataAutomation,
  "python-web-apis": seedPythonWebApis,
  "ai-foundations": seedAiFoundations,
  "build-with-ai-apis": seedBuildWithAiApis,
  "ai-assisted-development": seedAiAssistedDevelopment,
  "react-fundamentals": seedReactFundamentals,
};

async function seedOneCourse(
  ctx: MutationCtx,
  course: Doc<"courses">,
  seeder: SeedFn
): Promise<boolean> {
  const existing = await ctx.db
    .query("modules")
    .withIndex("by_course", (q) => q.eq("courseId", course._id))
    .collect();
  if (existing.length > 0) {
    for (const mod of existing) {
      const lessons = await ctx.db
        .query("lessons")
        .withIndex("by_module", (q) => q.eq("moduleId", mod._id))
        .collect();
      for (const lesson of lessons) {
        await ctx.db.delete(lesson._id);
      }
      await ctx.db.delete(mod._id);
    }
  }

  const lessonIds = await seeder(ctx, course._id);
  if (lessonIds.length > 0) {
    await ctx.db.patch(course._id, { totalLessons: lessonIds.length });
  }
  return true;
}

export async function seedAllCourses(ctx: MutationCtx) {
  await seedCourses(ctx);

  const errors: string[] = [];

  for (const entry of COURSE_CATALOG) {
    try {
      const seeder = SEEDERS[entry.slug];
      if (!seeder) continue;

      const course = await ctx.db
        .query("courses")
        .withIndex("by_slug", (q) => q.eq("slug", entry.slug))
        .unique();
      if (!course) continue;

      await seedOneCourse(ctx, course, seeder);
    } catch (e) {
      errors.push(`${entry.slug}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  await seedBadges(ctx);
  await seedExams(ctx);

  return { errors };
}

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    const { errors } = await seedAllCourses(ctx);

    if (errors.length > 0) {
      return {
        seeded: true,
        message: `Seeded with ${errors.length} error(s): ${errors.join("; ")}`,
      };
    }

    return { seeded: true, message: "Seed/repair complete." };
  },
});

export const diagnose = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db.query("courses").collect();
    const allModules = await ctx.db.query("modules").collect();
    const allLessons = await ctx.db.query("lessons").collect();

    const courseInfo = courses.map((c) => {
      const mods = allModules.filter((m) => m.courseId === c._id);
      const lessonCount = allLessons.filter((l) => l.courseId === c._id).length;
      const missingSeeder = COURSE_CATALOG.some((cat) => cat.slug === c.slug) && !SEEDERS[c.slug ?? ""];
      return {
        slug: c.slug ?? "?",
        title: c.title,
        modules: mods.length,
        lessons: lessonCount,
        totalLessons: c.totalLessons ?? 0,
        missingSeeder,
        inCatalog: COURSE_CATALOG.some((cat) => cat.slug === c.slug),
      };
    });

    return {
      courses: courseInfo,
      totalCourses: courses.length,
      totalModules: allModules.length,
      totalLessons: allLessons.length,
    };
  },
});
