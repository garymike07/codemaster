import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save or update user notes for a lesson
export const saveNotes = mutation({
  args: {
    lessonId: v.id("lessons"),
    content: v.string(),
    highlights: v.optional(
      v.array(
        v.object({
          text: v.string(),
          color: v.optional(v.string()),
          note: v.optional(v.string()),
        })
      )
    ),
    bookmarked: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Check if notes exist
    const existingNotes = await ctx.db
      .query("userLessonNotes")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (existingNotes) {
      await ctx.db.patch(existingNotes._id, {
        content: args.content,
        highlights: args.highlights,
        bookmarked: args.bookmarked,
        updatedAt: Date.now(),
      });
      return existingNotes._id;
    } else {
      return await ctx.db.insert("userLessonNotes", {
        userId: user._id,
        lessonId: args.lessonId,
        content: args.content,
        highlights: args.highlights,
        bookmarked: args.bookmarked,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// Get user notes for a lesson
export const getNotes = query({
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
      .query("userLessonNotes")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();
  },
});

// Toggle bookmark for a lesson
export const toggleBookmark = mutation({
  args: { lessonId: v.id("lessons") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const existingNotes = await ctx.db
      .query("userLessonNotes")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (existingNotes) {
      await ctx.db.patch(existingNotes._id, {
        bookmarked: !existingNotes.bookmarked,
        updatedAt: Date.now(),
      });
      return !existingNotes.bookmarked;
    } else {
      // Create new notes entry with bookmark
      await ctx.db.insert("userLessonNotes", {
        userId: user._id,
        lessonId: args.lessonId,
        content: "",
        bookmarked: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return true;
    }
  },
});

// Get all bookmarked lessons
export const getBookmarkedLessons = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const bookmarkedNotes = await ctx.db
      .query("userLessonNotes")
      .withIndex("by_bookmarked", (q) =>
        q.eq("userId", user._id).eq("bookmarked", true)
      )
      .collect();

    // Fetch lesson details
    const lessonsWithNotes = await Promise.all(
      bookmarkedNotes.map(async (note) => {
        const lesson = await ctx.db.get(note.lessonId);
        return { ...note, lesson };
      })
    );

    return lessonsWithNotes.filter((item) => item.lesson !== null);
  },
});

// Get all user notes (for export/backup)
export const getAllNotes = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const notes = await ctx.db
      .query("userLessonNotes")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit ?? 100);

    // Fetch lesson details
    const notesWithLessons = await Promise.all(
      notes.map(async (note) => {
        const lesson = await ctx.db.get(note.lessonId);
        return {
          ...note,
          lesson: lesson
            ? { title: lesson.title, type: lesson.type }
            : null,
        };
      })
    );

    return notesWithLessons;
  },
});

// Add a highlight to notes
export const addHighlight = mutation({
  args: {
    lessonId: v.id("lessons"),
    highlight: v.object({
      text: v.string(),
      color: v.optional(v.string()),
      note: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const existingNotes = await ctx.db
      .query("userLessonNotes")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (existingNotes) {
      const highlights = existingNotes.highlights || [];
      await ctx.db.patch(existingNotes._id, {
        highlights: [...highlights, args.highlight],
        updatedAt: Date.now(),
      });
      return existingNotes._id;
    } else {
      return await ctx.db.insert("userLessonNotes", {
        userId: user._id,
        lessonId: args.lessonId,
        content: "",
        highlights: [args.highlight],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// Delete user notes for a lesson
export const deleteNotes = mutation({
  args: { lessonId: v.id("lessons") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const notes = await ctx.db
      .query("userLessonNotes")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (notes) {
      await ctx.db.delete(notes._id);
      return true;
    }

    return false;
  },
});
