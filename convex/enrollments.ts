import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const enroll = mutation({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const existing = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .unique();

    if (existing) return existing._id;

    const enrollmentId = await ctx.db.insert("enrollments", {
      userId: user._id,
      courseId: args.courseId,
      enrolledAt: Date.now(),
      lastAccessedAt: Date.now(),
    });

    return enrollmentId;
  },
});

export const getEnrollment = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    return await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .unique();
  },
});

export const getMyEnrollments = query({
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

    const enrollmentsWithCourses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await ctx.db.get(enrollment.courseId);
        return { ...enrollment, course };
      })
    );

    return enrollmentsWithCourses.filter((e) => e.course);
  },
});

export const updateLastAccessed = mutation({
  args: {
    courseId: v.id("courses"),
    lessonId: v.optional(v.id("lessons")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .unique();

    if (!enrollment) throw new Error("Not enrolled");

    await ctx.db.patch(enrollment._id, {
      lastAccessedAt: Date.now(),
      currentLessonId: args.lessonId ?? enrollment.currentLessonId,
    });
  },
});

export const getContinueLearning = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    if (enrollments.length === 0) return null;

    const sorted = enrollments.sort(
      (a, b) => b.lastAccessedAt - a.lastAccessedAt
    );
    const mostRecent = sorted[0];

    const course = await ctx.db.get(mostRecent.courseId);
    if (!course) return null;

    let currentLesson: Awaited<ReturnType<typeof ctx.db.get>> | null = null;
    if (mostRecent.currentLessonId) {
      currentLesson = await ctx.db.get(mostRecent.currentLessonId);
    }

    if (!currentLesson) {
      const modules = await ctx.db
        .query("modules")
        .withIndex("by_course", (q) => q.eq("courseId", mostRecent.courseId))
        .collect();

      if (modules.length > 0) {
        const firstModule = modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0];
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_module", (q) => q.eq("moduleId", firstModule._id))
          .collect();

        if (lessons.length > 0) {
          currentLesson = lessons.sort((a, b) => a.order - b.order)[0];
        }
      }
    }

    const completedLessons = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", mostRecent.courseId)
      )
      .collect();

    const totalLessons = course.totalLessons ?? 0;
    const percentage =
      totalLessons > 0
        ? Math.round((completedLessons.length / totalLessons) * 100)
        : 0;

    return {
      course,
      enrollment: mostRecent,
      currentLesson,
      percentage,
    };
  },
});
