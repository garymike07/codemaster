import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const markLessonComplete = mutation({
  args: {
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const lesson = await ctx.db.get(args.lessonId);
    if (!lesson) throw new Error("Lesson not found");

    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (existing) return existing._id;

    const courseId = lesson.courseId as Id<"courses">;
    const progressId = await ctx.db.insert("progress", {
      userId: user._id,
      lessonId: args.lessonId,
      courseId,
      completedAt: Date.now(),
    });

    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", courseId)
      )
      .unique();

    if (enrollment) {
      await ctx.db.patch(enrollment._id, {
        lastAccessedAt: Date.now(),
        currentLessonId: args.lessonId,
      });
    }

    return progressId;
  },
});

export const getForCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .collect();

    return progress;
  },
});

export const getCourseProgress = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { completed: 0, total: 0, percentage: 0 };

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return { completed: 0, total: 0, percentage: 0 };

    const course = await ctx.db.get(args.courseId);
    if (!course) return { completed: 0, total: 0, percentage: 0 };

    const completedLessons = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .collect();

    const totalLessons = course.totalLessons ?? 0;
    const percentage =
      totalLessons > 0
        ? Math.round((completedLessons.length / totalLessons) * 100)
        : 0;

    return {
      completed: completedLessons.length,
      total: totalLessons,
      percentage,
    };
  },
});

export const getAllProgress = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const progressData = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await ctx.db.get(enrollment.courseId);
        if (!course) return null;

        const completedLessons = await ctx.db
          .query("progress")
          .withIndex("by_user_course", (q) =>
            q.eq("userId", user._id).eq("courseId", enrollment.courseId)
          )
          .collect();

        const courseTotalLessons = course.totalLessons ?? 0;
        const percentage =
          courseTotalLessons > 0
            ? Math.round((completedLessons.length / courseTotalLessons) * 100)
            : 0;

        return {
          course,
          enrollment,
          completed: completedLessons.length,
          total: courseTotalLessons,
          percentage,
        };
      })
    );

    return progressData.filter(Boolean);
  },
});
