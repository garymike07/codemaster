import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db
      .query("courses")
      .collect();
    // Return all courses (filter out unpublished only if explicitly set to false)
    return courses.filter((c) => c.isPublished !== false);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const getById = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.courseId);
  },
});

export const getModules = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const modules = await ctx.db
      .query("modules")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();
    return modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

export const getLessons = query({
  args: { moduleId: v.id("modules") },
  handler: async (ctx, args) => {
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_module", (q) => q.eq("moduleId", args.moduleId))
      .collect();
    return lessons.sort((a, b) => a.order - b.order);
  },
});

export const getLesson = query({
  args: { lessonId: v.id("lessons") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.lessonId);
  },
});

export const getCourseWithModulesAndLessons = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const course = await ctx.db.get(args.courseId);
    if (!course) return null;

    const modules = await ctx.db
      .query("modules")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();

    const modulesWithLessons = await Promise.all(
      modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(async (module) => {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_module", (q) => q.eq("moduleId", module._id))
          .collect();
        return {
          ...module,
          lessons: lessons.sort((a, b) => a.order - b.order),
        };
      })
    );

    return {
      ...course,
      modules: modulesWithLessons,
    };
  },
});

export const getCourseLessons = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const modules = await ctx.db
      .query("modules")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();

    const sortedModules = modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const allLessons: Doc<"lessons">[] = [];
    for (const module of sortedModules) {
      const lessons = await ctx.db
        .query("lessons")
        .withIndex("by_module", (q) => q.eq("moduleId", module._id))
        .collect();
      allLessons.push(...lessons.sort((a, b) => a.order - b.order));
    }

    return allLessons;
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    language: v.string(),
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    estimatedHours: v.number(),
  },
  handler: async (ctx, args) => {
    const courseId = await ctx.db.insert("courses", {
      ...args,
      totalLessons: 0,
      isPublished: false,
    });
    return courseId;
  },
});
