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

// Get activity data for heatmap (lessons completed per day)
export const getActivityHeatmap = query({
  args: {
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    // Get all progress records for the user
    const allProgress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id))
      .collect();

    // Calculate date range
    const daysToShow = args.days ?? 365;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - daysToShow);
    const startTimestamp = startDate.getTime();

    // Filter and group by date
    const activityByDate = new Map<string, number>();

    for (const progress of allProgress) {
      if (progress.completedAt >= startTimestamp) {
        const date = new Date(progress.completedAt).toISOString().split("T")[0];
        activityByDate.set(date, (activityByDate.get(date) || 0) + 1);
      }
    }

    // Convert to array format
    return Array.from(activityByDate.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  },
});

// Get recent activity for dashboard
export const getRecentActivity = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    // Get recent progress with lesson details
    const recentProgress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit ?? 10);

    // Fetch lesson and course details
    const activityWithDetails = await Promise.all(
      recentProgress.map(async (progress) => {
        const lesson = await ctx.db.get(progress.lessonId);
        const course = await ctx.db.get(progress.courseId);
        return {
          ...progress,
          lesson: lesson ? { title: lesson.title, type: lesson.type } : null,
          course: course ? { title: course.title, icon: course.icon } : null,
        };
      })
    );

    return activityWithDetails;
  },
});

// Reset progress for a specific course
export const resetCourseProgress = mutation({
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

    // Delete all progress records for this course
    const progressRecords = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .collect();

    for (const record of progressRecords) {
      await ctx.db.delete(record._id);
    }

    // Reset enrollment progress
    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .unique();

    if (enrollment) {
      await ctx.db.patch(enrollment._id, {
        currentLessonId: undefined,
        lastAccessedAt: Date.now(),
      });
    }

    return { deleted: progressRecords.length };
  },
});

// Reset ALL progress for the user
export const resetAllProgress = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Delete all progress records
    const allProgress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id))
      .collect();

    for (const record of allProgress) {
      await ctx.db.delete(record._id);
    }

    // Reset all enrollments
    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    for (const enrollment of enrollments) {
      await ctx.db.patch(enrollment._id, {
        currentLessonId: undefined,
        lastAccessedAt: Date.now(),
      });
    }

    // Clear playground sessions
    const playgroundSessions = await ctx.db
      .query("playgroundSessions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    for (const session of playgroundSessions) {
      await ctx.db.delete(session._id);
    }

    // Clear AI chat history
    const chatHistory = await ctx.db
      .query("aiChatHistory")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    for (const chat of chatHistory) {
      await ctx.db.delete(chat._id);
    }

    // Clear user notes
    const userNotes = await ctx.db
      .query("userLessonNotes")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    for (const note of userNotes) {
      await ctx.db.delete(note._id);
    }

    return {
      progressDeleted: allProgress.length,
      enrollmentsReset: enrollments.length,
      sessionsDeleted: playgroundSessions.length,
      chatsDeleted: chatHistory.length,
      notesDeleted: userNotes.length,
    };
  },
});
