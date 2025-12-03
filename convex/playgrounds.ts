import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save or update a playground session
export const saveSession = mutation({
  args: {
    lessonId: v.id("lessons"),
    code: v.string(),
    userNotes: v.optional(v.string()),
    lastRunOutput: v.optional(v.string()),
    testResults: v.optional(
      v.array(
        v.object({
          passed: v.boolean(),
          input: v.string(),
          expected: v.string(),
          actual: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Check if session already exists
    const existingSession = await ctx.db
      .query("playgroundSessions")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (existingSession) {
      // Update existing session
      await ctx.db.patch(existingSession._id, {
        code: args.code,
        savedAt: Date.now(),
        userNotes: args.userNotes,
        lastRunOutput: args.lastRunOutput,
        testResults: args.testResults,
      });
      return existingSession._id;
    } else {
      // Create new session
      return await ctx.db.insert("playgroundSessions", {
        userId: user._id,
        lessonId: args.lessonId,
        code: args.code,
        savedAt: Date.now(),
        userNotes: args.userNotes,
        lastRunOutput: args.lastRunOutput,
        testResults: args.testResults,
      });
    }
  },
});

// Get a playground session for a lesson
export const getSession = query({
  args: { lessonId: v.id("lessons") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    return await ctx.db
      .query("playgroundSessions")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();
  },
});

// Get all playground sessions for a user
export const getUserSessions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const sessions = await ctx.db
      .query("playgroundSessions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit ?? 20);

    // Fetch lesson details for each session
    const sessionsWithLessons = await Promise.all(
      sessions.map(async (session) => {
        const lesson = await ctx.db.get(session.lessonId);
        return { ...session, lesson };
      })
    );

    return sessionsWithLessons;
  },
});

// Reset playground to starter code
export const resetSession = mutation({
  args: { lessonId: v.id("lessons") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Get the lesson to retrieve starter code
    const lesson = await ctx.db.get(args.lessonId);
    if (!lesson) throw new Error("Lesson not found");

    const starterCode =
      lesson.playground?.starterCode || lesson.codeTemplate || "";

    // Check if session exists
    const existingSession = await ctx.db
      .query("playgroundSessions")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (existingSession) {
      await ctx.db.patch(existingSession._id, {
        code: starterCode,
        savedAt: Date.now(),
        lastRunOutput: undefined,
        testResults: undefined,
      });
      return existingSession._id;
    }

    return null;
  },
});

// Delete a playground session
export const deleteSession = mutation({
  args: { lessonId: v.id("lessons") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const session = await ctx.db
      .query("playgroundSessions")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (session) {
      await ctx.db.delete(session._id);
      return true;
    }

    return false;
  },
});
