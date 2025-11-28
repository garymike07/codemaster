import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Publish an exam to students
export const publishExam = mutation({
  args: {
    examId: v.id("exams"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user || user.role !== "teacher") {
      throw new Error("Only teachers can publish exams");
    }

    const exam = await ctx.db.get(args.examId);
    if (!exam) throw new Error("Exam not found");

    await ctx.db.patch(args.examId, {
      isPublished: true,
      publishedAt: Date.now(),
    });

    return { success: true };
  },
});

// Unpublish an exam
export const unpublishExam = mutation({
  args: {
    examId: v.id("exams"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user || user.role !== "teacher") {
      throw new Error("Only teachers can unpublish exams");
    }

    await ctx.db.patch(args.examId, {
      isPublished: false,
    });

    return { success: true };
  },
});

// Get all published exams for students
export const getPublishedExams = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) return [];

    // Get all published exams
    const exams = await ctx.db
      .query("exams")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    // Get user's submissions to determine status
    const submissions = await ctx.db
      .query("examSubmissions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const submissionMap = new Map(
      submissions.map((s) => [s.examId, s])
    );

    // Fetch course info for each exam
    const examsWithStatus = await Promise.all(
      exams.map(async (exam) => {
        const submission = submissionMap.get(exam._id);
        let courseName = "General";
        
        if (typeof exam.courseId !== "string") {
          const course = await ctx.db.get(exam.courseId);
          if (course && "title" in course) {
            courseName = course.title;
          }
        }

        // Calculate total points
        const totalPoints = exam.questions.reduce(
          (sum: number, q: { points?: number }) => sum + (q.points || 0),
          0
        );

        return {
          ...exam,
          courseName,
          totalPoints,
          status: submission?.submittedAt
            ? "completed"
            : submission
            ? "in_progress"
            : "not_started",
          score: submission?.percentageScore,
          passed: submission?.passed,
        };
      })
    );

    return examsWithStatus.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
  },
});

// Get a single published exam for taking
export const getExamForTaking = query({
  args: {
    examId: v.id("exams"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) return null;

    const exam = await ctx.db.get(args.examId);
    if (!exam || !exam.isPublished) return null;

    // Check for existing submission
    const existingSubmission = await ctx.db
      .query("examSubmissions")
      .withIndex("by_user_exam", (q) =>
        q.eq("userId", user._id).eq("examId", args.examId)
      )
      .first();

    // Get course info
    let courseName = "General";
    if (typeof exam.courseId !== "string") {
      const course = await ctx.db.get(exam.courseId);
      if (course && "title" in course) {
        courseName = course.title;
      }
    }

    // Strip solutions from questions for students (only show after submission)
    const questionsForStudent = exam.questions.map((q: {
      id: string;
      type: string;
      question: string;
      options?: string[];
      codeTemplate?: string;
      testCases?: Array<{ input: string; expectedOutput: string; isHidden?: boolean }>;
      hints?: string[];
      points: number;
      solution?: string;
      correctAnswer?: string;
    }) => ({
      id: q.id,
      type: q.type,
      question: q.question,
      options: q.options,
      codeTemplate: q.codeTemplate,
      // Only show non-hidden test cases
      testCases: q.testCases?.filter((tc) => !tc.isHidden),
      hints: q.hints,
      points: q.points,
      // Don't send solution or correctAnswer to students before submission
    }));

    return {
      ...exam,
      questions: questionsForStudent,
      courseName,
      existingSubmission: existingSubmission
        ? {
            answers: existingSubmission.answers,
            startedAt: existingSubmission.startedAt,
            isCompleted: !!existingSubmission.submittedAt,
          }
        : null,
    };
  },
});

// Save exam progress (auto-save)
export const saveProgress = mutation({
  args: {
    examId: v.id("exams"),
    answers: v.array(
      v.object({
        questionId: v.string(),
        answer: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) throw new Error("User not found");

    // Check for existing submission
    const existingSubmission = await ctx.db
      .query("examSubmissions")
      .withIndex("by_user_exam", (q) =>
        q.eq("userId", user._id).eq("examId", args.examId)
      )
      .first();

    if (existingSubmission) {
      // Don't update if already submitted
      if (existingSubmission.submittedAt) {
        return { success: false, message: "Exam already submitted" };
      }
      // Update existing progress
      await ctx.db.patch(existingSubmission._id, {
        answers: args.answers,
      });
    } else {
      // Create new submission record
      await ctx.db.insert("examSubmissions", {
        examId: args.examId,
        userId: user._id,
        answers: args.answers,
        startedAt: Date.now(),
      });
    }

    return { success: true };
  },
});
