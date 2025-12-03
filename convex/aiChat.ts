import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save a message to chat history
export const saveMessage = mutation({
  args: {
    lessonId: v.id("lessons"),
    message: v.object({
      id: v.string(),
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
      timestamp: v.number(),
      metadata: v.optional(
        v.object({
          codeContext: v.optional(v.string()),
          tutorMode: v.optional(v.string()),
        })
      ),
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

    // Check if chat history exists for this lesson
    const existingChat = await ctx.db
      .query("aiChatHistory")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (existingChat) {
      // Add message to existing history
      const updatedMessages = [...existingChat.messages, args.message];
      await ctx.db.patch(existingChat._id, {
        messages: updatedMessages,
        updatedAt: Date.now(),
        totalMessages: updatedMessages.length,
      });
      return existingChat._id;
    } else {
      // Create new chat history
      return await ctx.db.insert("aiChatHistory", {
        userId: user._id,
        lessonId: args.lessonId,
        messages: [args.message],
        updatedAt: Date.now(),
        totalMessages: 1,
      });
    }
  },
});

// Save multiple messages at once (for batch updates)
export const saveMessages = mutation({
  args: {
    lessonId: v.id("lessons"),
    messages: v.array(
      v.object({
        id: v.string(),
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
        timestamp: v.number(),
        metadata: v.optional(
          v.object({
            codeContext: v.optional(v.string()),
            tutorMode: v.optional(v.string()),
          })
        ),
      })
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

    const existingChat = await ctx.db
      .query("aiChatHistory")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (existingChat) {
      const updatedMessages = [...existingChat.messages, ...args.messages];
      await ctx.db.patch(existingChat._id, {
        messages: updatedMessages,
        updatedAt: Date.now(),
        totalMessages: updatedMessages.length,
      });
      return existingChat._id;
    } else {
      return await ctx.db.insert("aiChatHistory", {
        userId: user._id,
        lessonId: args.lessonId,
        messages: args.messages,
        updatedAt: Date.now(),
        totalMessages: args.messages.length,
      });
    }
  },
});

// Get chat history for a lesson
export const getChatHistory = query({
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
      .query("aiChatHistory")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();
  },
});

// Get recent chats across all lessons
export const getRecentChats = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const chats = await ctx.db
      .query("aiChatHistory")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit ?? 10);

    // Fetch lesson details
    const chatsWithLessons = await Promise.all(
      chats.map(async (chat) => {
        const lesson = await ctx.db.get(chat.lessonId);
        return {
          ...chat,
          lesson: lesson
            ? { title: lesson.title, type: lesson.type }
            : null,
        };
      })
    );

    return chatsWithLessons;
  },
});

// Clear chat history for a lesson
export const clearChatHistory = mutation({
  args: { lessonId: v.id("lessons") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const chat = await ctx.db
      .query("aiChatHistory")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (chat) {
      await ctx.db.delete(chat._id);
      return true;
    }

    return false;
  },
});

// Delete specific messages from chat
export const deleteMessages = mutation({
  args: {
    lessonId: v.id("lessons"),
    messageIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const chat = await ctx.db
      .query("aiChatHistory")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();

    if (chat) {
      const filteredMessages = chat.messages.filter(
        (msg) => !args.messageIds.includes(msg.id)
      );
      await ctx.db.patch(chat._id, {
        messages: filteredMessages,
        updatedAt: Date.now(),
        totalMessages: filteredMessages.length,
      });
      return true;
    }

    return false;
  },
});
