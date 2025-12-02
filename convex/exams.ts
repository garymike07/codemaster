import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const exams = await ctx.db
      .query("exams")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    const examsWithCourses = await Promise.all(
      exams.map(async (exam) => {
        const courseId = exam.courseId as Id<"courses">;
        const course = typeof exam.courseId === "string" && !exam.courseId.startsWith("k")
          ? null
          : await ctx.db.get(courseId);
        return { ...exam, course };
      })
    );

    return examsWithCourses;
  },
});

export const getById = query({
  args: { examId: v.id("exams") },
  handler: async (ctx, args) => {
    const exam = await ctx.db.get(args.examId);
    if (!exam) return null;

    const courseId = exam.courseId as Id<"courses">;
    const course = typeof exam.courseId === "string" && !exam.courseId.startsWith("k")
      ? null
      : await ctx.db.get(courseId);
    return { ...exam, course };
  },
});

export const getByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("exams")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
  },
});

export const submitExam = mutation({
  args: {
    examId: v.id("exams"),
    answers: v.array(
      v.object({
        questionId: v.string(),
        answer: v.string(),
      })
    ),
    startedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const exam = await ctx.db.get(args.examId);
    if (!exam) throw new Error("Exam not found");

    let totalScore = 0;
    const gradedAnswers = args.answers.map((answer) => {
      const question = exam.questions.find((q) => q.id === answer.questionId);
      if (!question) {
        return { ...answer, isCorrect: false, pointsEarned: 0 };
      }

      let isCorrect = false;
      if (question.type === "multiple_choice") {
        isCorrect = answer.answer === question.correctAnswer;
      } else if (question.type === "short_answer") {
        isCorrect =
          answer.answer.toLowerCase().trim() ===
          question.correctAnswer?.toLowerCase().trim();
      }

      const pointsEarned = isCorrect ? question.points : 0;
      totalScore += pointsEarned;

      return { ...answer, isCorrect, pointsEarned };
    });

    const examTotalPoints = exam.totalPoints ?? 0;
    const percentageScore =
      examTotalPoints > 0
        ? Math.round((totalScore / examTotalPoints) * 100)
        : 0;
    const passed = percentageScore >= exam.passingScore;

    const submissionId = await ctx.db.insert("examSubmissions", {
      examId: args.examId,
      userId: user._id,
      answers: gradedAnswers,
      score: totalScore,
      percentageScore,
      passed,
      startedAt: args.startedAt,
      submittedAt: Date.now(),
      timeSpentSeconds: Math.floor((Date.now() - args.startedAt) / 1000),
    });

    return {
      submissionId,
      score: totalScore,
      percentageScore,
      passed,
      totalPoints: examTotalPoints,
    };
  },
});

export const getMySubmissions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const submissions = await ctx.db
      .query("examSubmissions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const submissionsWithExams = await Promise.all(
      submissions.map(async (submission) => {
        const exam = await ctx.db.get(submission.examId);
        let course: Awaited<ReturnType<typeof ctx.db.get>> | null = null;
        if (exam) {
          const courseId = exam.courseId as Id<"courses">;
          if (typeof exam.courseId !== "string" || exam.courseId.startsWith("k")) {
            course = await ctx.db.get(courseId);
          }
        }
        return { ...submission, exam, course };
      })
    );

    return submissionsWithExams;
  },
});

export const getSubmission = query({
  args: { submissionId: v.id("examSubmissions") },
  handler: async (ctx, args) => {
    const submission = await ctx.db.get(args.submissionId);
    if (!submission) return null;

    const exam = await ctx.db.get(submission.examId);
    let course: Awaited<ReturnType<typeof ctx.db.get>> | null = null;
    if (exam) {
      const courseId = exam.courseId as Id<"courses">;
      if (typeof exam.courseId !== "string" || exam.courseId.startsWith("k")) {
        course = await ctx.db.get(courseId);
      }
    }

    return { ...submission, exam, course };
  },
});

export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    durationMinutes: v.number(),
    passingScore: v.number(),
    questions: v.array(
      v.object({
        id: v.string(),
        type: v.union(
          v.literal("multiple_choice"),
          v.literal("coding"),
          v.literal("short_answer")
        ),
        question: v.string(),
        options: v.optional(v.array(v.string())),
        correctAnswer: v.optional(v.string()),
        codeTemplate: v.optional(v.string()),
        testCases: v.optional(
          v.array(
            v.object({
              input: v.string(),
              expectedOutput: v.string(),
            })
          )
        ),
        points: v.number(),
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
    if (user.role !== "teacher") throw new Error("Not authorized");

    const totalPoints = args.questions.reduce((sum, q) => sum + q.points, 0);

    const examId = await ctx.db.insert("exams", {
      ...args,
      totalPoints,
      createdBy: user._id,
      isPublished: false,
    });

    return examId;
  },
});

export const deleteExam = mutation({
  args: {
    examId: v.id("exams"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const exam = await ctx.db.get(args.examId);
    if (!exam) throw new Error("Exam not found");

    // Only allow deletion if:
    // 1. It's an AI practice exam (courseId === "AI_PRACTICE")
    // 2. The current user is the creator
    if (exam.courseId !== "AI_PRACTICE" || exam.createdBy !== user._id) {
      throw new Error("Not authorized to delete this exam");
    }

    await ctx.db.delete(args.examId);

    // Clean up submissions associated with this exam
    const submissions = await ctx.db
      .query("examSubmissions")
      .withIndex("by_exam", (q) => q.eq("examId", args.examId))
      .collect();

    for (const submission of submissions) {
      await ctx.db.delete(submission._id);
    }
  },
});

export const createPracticeExam = mutation({
  args: {
    questions: v.array(
      v.object({
        id: v.string(),
        type: v.literal("code"),
        question: v.string(),
        codeTemplate: v.string(),
        testCases: v.array(
          v.object({
            input: v.string(),
            expectedOutput: v.string(),
            isHidden: v.optional(v.boolean()),
          })
        ),
        solution: v.string(),
        points: v.number(),
        hints: v.optional(v.array(v.string())),
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

    const totalPoints = args.questions.reduce((sum, q) => sum + q.points, 0);
    const durationMinutes = 30 * args.questions.length; // 30 mins per question default

    // Transform questions to match schema structure (schema uses v.any() for questions array in some places, but let's be consistent)
    // The schema for exams table says: questions: v.array(v.any())
    
    const examId = await ctx.db.insert("exams", {
      courseId: "AI_PRACTICE",
      title: `AI Challenge: ${new Date().toLocaleDateString()}`,
      description: "Personalized AI-generated coding challenge",
      durationMinutes,
      passingScore: 60, // 60% to pass
      questions: args.questions,
      totalPoints,
      createdBy: user._id,
      isPublished: true,
      publishedAt: Date.now(),
    });

    return examId;
  },
});
