import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save questions to the exam bank
export const saveToBank = mutation({
  args: {
    questions: v.array(
      v.object({
        type: v.union(
          v.literal("multiple_choice"),
          v.literal("code"),
          v.literal("short_answer")
        ),
        question: v.string(),
        options: v.optional(v.array(v.string())),
        correctAnswer: v.optional(v.string()),
        solution: v.optional(v.string()),
        codeTemplate: v.optional(v.string()),
        testCases: v.optional(v.array(v.any())),
        hints: v.optional(v.array(v.string())),
        difficulty: v.union(
          v.literal("beginner"),
          v.literal("intermediate"),
          v.literal("advanced")
        ),
        language: v.optional(v.string()),
        topic: v.optional(v.string()),
        points: v.number(),
        tags: v.optional(v.array(v.string())),
      })
    ),
    courseId: v.optional(v.id("courses")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user || user.role !== "teacher") {
      throw new Error("Only teachers can save to exam bank");
    }

    const savedIds: string[] = [];
    for (const question of args.questions) {
      const id = await ctx.db.insert("examBank", {
        createdBy: user._id,
        courseId: args.courseId,
        type: question.type,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        solution: question.solution,
        codeTemplate: question.codeTemplate,
        testCases: question.testCases,
        hints: question.hints,
        difficulty: question.difficulty,
        language: question.language,
        topic: question.topic,
        points: question.points,
        tags: question.tags,
        usageCount: 0,
        createdAt: Date.now(),
      });
      savedIds.push(id);
    }

    return { savedCount: savedIds.length, ids: savedIds };
  },
});

// Get teacher's banked questions with optional filters
export const getMyQuestions = query({
  args: {
    difficulty: v.optional(
      v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced")
      )
    ),
    type: v.optional(
      v.union(
        v.literal("multiple_choice"),
        v.literal("code"),
        v.literal("short_answer")
      )
    ),
    language: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) return [];

    const allQuestions = await ctx.db
      .query("examBank")
      .withIndex("by_creator", (q) => q.eq("createdBy", user._id))
      .collect();
    
    let questions = [...allQuestions];

    // Apply filters
    if (args.difficulty) {
      questions = questions.filter((q) => q.difficulty === args.difficulty);
    }
    if (args.type) {
      questions = questions.filter((q) => q.type === args.type);
    }
    if (args.language) {
      questions = questions.filter((q) => q.language === args.language);
    }
    if (args.searchQuery) {
      const query = args.searchQuery.toLowerCase();
      questions = questions.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.topic?.toLowerCase().includes(query) ||
          q.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return questions.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Update a banked question
export const updateQuestion = mutation({
  args: {
    questionId: v.id("examBank"),
    updates: v.object({
      question: v.optional(v.string()),
      options: v.optional(v.array(v.string())),
      correctAnswer: v.optional(v.string()),
      solution: v.optional(v.string()),
      codeTemplate: v.optional(v.string()),
      testCases: v.optional(v.array(v.any())),
      hints: v.optional(v.array(v.string())),
      difficulty: v.optional(
        v.union(
          v.literal("beginner"),
          v.literal("intermediate"),
          v.literal("advanced")
        )
      ),
      language: v.optional(v.string()),
      topic: v.optional(v.string()),
      points: v.optional(v.number()),
      tags: v.optional(v.array(v.string())),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const question = await ctx.db.get(args.questionId);
    if (!question) throw new Error("Question not found");
    if (question.createdBy !== user._id) {
      throw new Error("Not authorized to edit this question");
    }

    await ctx.db.patch(args.questionId, args.updates);
    return { success: true };
  },
});

// Delete a banked question
export const deleteQuestion = mutation({
  args: {
    questionId: v.id("examBank"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    const question = await ctx.db.get(args.questionId);
    if (!question) throw new Error("Question not found");
    if (question.createdBy !== user._id) {
      throw new Error("Not authorized to delete this question");
    }

    await ctx.db.delete(args.questionId);
    return { success: true };
  },
});

// Increment usage count when question is used in an exam
export const incrementUsage = mutation({
  args: {
    questionIds: v.array(v.id("examBank")),
  },
  handler: async (ctx, args) => {
    for (const id of args.questionIds) {
      const question = await ctx.db.get(id);
      if (question) {
        await ctx.db.patch(id, {
          usageCount: (question.usageCount || 0) + 1,
        });
      }
    }
    return { success: true };
  },
});

// Get bank statistics for a teacher
export const getBankStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) return null;

    const questions = await ctx.db
      .query("examBank")
      .withIndex("by_creator", (q) => q.eq("createdBy", user._id))
      .collect();

    const byType = {
      code: questions.filter((q) => q.type === "code").length,
      multiple_choice: questions.filter((q) => q.type === "multiple_choice").length,
      short_answer: questions.filter((q) => q.type === "short_answer").length,
    };

    const byDifficulty = {
      beginner: questions.filter((q) => q.difficulty === "beginner").length,
      intermediate: questions.filter((q) => q.difficulty === "intermediate").length,
      advanced: questions.filter((q) => q.difficulty === "advanced").length,
    };

    return {
      totalQuestions: questions.length,
      byType,
      byDifficulty,
      totalUsage: questions.reduce((sum, q) => sum + (q.usageCount || 0), 0),
    };
  },
});
