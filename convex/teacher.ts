import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get teacher's students
export const getMyStudents = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") return [];

    const teacherStudents = await ctx.db
      .query("teacherStudents")
      .withIndex("by_teacher", (q) => q.eq("teacherId", teacher._id))
      .collect();

    const students = await Promise.all(
      teacherStudents.map(async (ts) => {
        const student = await ctx.db.get(ts.studentId);
        if (!student) return null;

        // Get student's enrollments and progress
        const enrollments = await ctx.db
          .query("enrollments")
          .withIndex("by_user", (q) => q.eq("userId", ts.studentId))
          .collect();

        const stats = await ctx.db
          .query("userStats")
          .withIndex("by_user", (q) => q.eq("userId", ts.studentId))
          .unique();

        // Get courses info
        const coursesWithProgress = await Promise.all(
          enrollments.map(async (enrollment) => {
            const course = await ctx.db.get(enrollment.courseId);
            const progress = await ctx.db
              .query("progress")
              .withIndex("by_user_course", (q) =>
                q.eq("userId", ts.studentId).eq("courseId", enrollment.courseId)
              )
              .collect();

            const totalLessons = course?.totalLessons || 0;
            const completedLessons = progress.length;
            const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

            return {
              courseId: enrollment.courseId,
              title: course?.title || "Unknown",
              icon: course?.icon || "📚",
              percentage,
              completedLessons,
              totalLessons,
            };
          })
        );

        return {
          _id: student._id,
          name: student.name,
          email: student.email,
          avatarUrl: student.avatarUrl,
          enrolledAt: ts.enrolledAt,
          notes: ts.notes,
          stats: {
            totalXp: stats?.totalXp || 0,
            level: stats?.level || 1,
            lessonsCompleted: stats?.lessonsCompleted || 0,
          },
          courses: coursesWithProgress,
          lastActive: enrollments[0]?.lastAccessedAt || ts.enrolledAt,
        };
      })
    );

    return students.filter((s) => s !== null);
  },
});

// Add student to teacher's class
export const addStudent = mutation({
  args: {
    studentEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") {
      throw new Error("Only teachers can add students");
    }

    // Find student by email
    const student = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.studentEmail))
      .unique();

    if (!student) {
      throw new Error("Student not found");
    }

    if (student.role !== "student") {
      throw new Error("User is not a student");
    }

    // Check if already added
    const existing = await ctx.db
      .query("teacherStudents")
      .withIndex("by_teacher_student", (q) =>
        q.eq("teacherId", teacher._id).eq("studentId", student._id)
      )
      .unique();

    if (existing) {
      throw new Error("Student already added");
    }

    // Add relationship
    await ctx.db.insert("teacherStudents", {
      teacherId: teacher._id,
      studentId: student._id,
      enrolledAt: Date.now(),
    });

    return { success: true, studentName: student.name };
  },
});

// Remove student from teacher's class
export const removeStudent = mutation({
  args: {
    studentId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") {
      throw new Error("Only teachers can remove students");
    }

    const relationship = await ctx.db
      .query("teacherStudents")
      .withIndex("by_teacher_student", (q) =>
        q.eq("teacherId", teacher._id).eq("studentId", args.studentId)
      )
      .unique();

    if (relationship) {
      await ctx.db.delete(relationship._id);
    }

    return { success: true };
  },
});

// Assign course to student
export const assignCourse = mutation({
  args: {
    studentId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") {
      throw new Error("Only teachers can assign courses");
    }

    // Check student exists and is in teacher's class
    const relationship = await ctx.db
      .query("teacherStudents")
      .withIndex("by_teacher_student", (q) =>
        q.eq("teacherId", teacher._id).eq("studentId", args.studentId)
      )
      .unique();

    if (!relationship) {
      throw new Error("Student not in your class");
    }

    // Check if already enrolled
    const existingEnrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", args.studentId).eq("courseId", args.courseId)
      )
      .unique();

    if (existingEnrollment) {
      throw new Error("Student already enrolled in this course");
    }

    // Enroll student
    await ctx.db.insert("enrollments", {
      userId: args.studentId,
      courseId: args.courseId,
      enrolledAt: Date.now(),
      lastAccessedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get teacher's exams
export const getMyExams = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") return [];

    const exams = await ctx.db
      .query("exams")
      .filter((q) => q.eq(q.field("createdBy"), teacher._id))
      .collect();

    // Get submission stats for each exam
    const examsWithStats = await Promise.all(
      exams.map(async (exam) => {
        const submissions = await ctx.db
          .query("examSubmissions")
          .withIndex("by_exam", (q) => q.eq("examId", exam._id))
          .collect();

        const passedCount = submissions.filter((s) => s.passed).length;
        const avgScore =
          submissions.length > 0
            ? Math.round(
                submissions.reduce((sum, s) => sum + (s.percentageScore || 0), 0) /
                  submissions.length
              )
            : 0;

        const course = typeof exam.courseId === 'string' 
          ? null 
          : await ctx.db.query("courses").filter((q) => q.eq(q.field("_id"), exam.courseId)).first();

        return {
          ...exam,
          courseName: course?.title || "Unknown",
          submissionCount: submissions.length,
          passedCount,
          avgScore,
        };
      })
    );

    return examsWithStats;
  },
});

// Create exam
export const createExam = mutation({
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
          v.literal("code"),
          v.literal("short_answer")
        ),
        question: v.string(),
        options: v.optional(v.array(v.string())),
        correctAnswer: v.optional(v.string()),
        solution: v.optional(v.string()),
        points: v.number(),
        codeTemplate: v.optional(v.string()),
        testCases: v.optional(v.array(v.any())),
        hints: v.optional(v.array(v.string())),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") {
      throw new Error("Only teachers can create exams");
    }

    const totalPoints = args.questions.reduce((sum, q) => sum + q.points, 0);

    const examId = await ctx.db.insert("exams", {
      courseId: args.courseId,
      title: args.title,
      description: args.description,
      durationMinutes: args.durationMinutes,
      passingScore: args.passingScore,
      questions: args.questions,
      totalPoints,
      createdBy: teacher._id,
      isPublished: false,
      publishedAt: undefined,
    });

    // Auto-save questions to exam bank
    for (const question of args.questions) {
      await ctx.db.insert("examBank", {
        createdBy: teacher._id,
        courseId: args.courseId,
        type: question.type,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        solution: question.solution,
        codeTemplate: question.codeTemplate,
        testCases: question.testCases,
        hints: question.hints,
        difficulty: "intermediate",
        language: undefined,
        topic: args.title,
        points: question.points,
        tags: undefined,
        usageCount: 1,
        createdAt: Date.now(),
      });
    }

    return { examId };
  },
});

// Assign exam to students
export const assignExam = mutation({
  args: {
    examId: v.id("exams"),
    studentIds: v.array(v.id("users")),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") {
      throw new Error("Only teachers can assign exams");
    }

    for (const studentId of args.studentIds) {
      // Check if already assigned
      const existing = await ctx.db
        .query("examAssignments")
        .withIndex("by_student", (q) => q.eq("studentId", studentId))
        .filter((q) => q.eq(q.field("examId"), args.examId))
        .first();

      if (!existing) {
        await ctx.db.insert("examAssignments", {
          examId: args.examId,
          studentId,
          teacherId: teacher._id,
          dueDate: args.dueDate,
          assignedAt: Date.now(),
          status: "pending",
        });
      }
    }

    return { success: true, assignedCount: args.studentIds.length };
  },
});

// Get exam assignments for grading
export const getExamAssignments = query({
  args: {
    examId: v.optional(v.id("exams")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") return [];

    let assignments = await ctx.db
      .query("examAssignments")
      .withIndex("by_teacher", (q) => q.eq("teacherId", teacher._id))
      .collect();

    if (args.examId) {
      assignments = assignments.filter((a) => a.examId === args.examId);
    }

    const enrichedAssignments = await Promise.all(
      assignments.map(async (assignment) => {
        const student = await ctx.db.get(assignment.studentId);
        const exam = await ctx.db.get(assignment.examId);

        const submission = await ctx.db
          .query("examSubmissions")
          .withIndex("by_user_exam", (q) =>
            q.eq("userId", assignment.studentId).eq("examId", assignment.examId)
          )
          .first();

        return {
          ...assignment,
          studentName: student?.name || "Unknown",
          studentEmail: student?.email || "",
          examTitle: exam?.title || "Unknown",
          submission: submission
            ? {
                score: submission.percentageScore,
                passed: submission.passed,
                submittedAt: submission.submittedAt,
              }
            : null,
        };
      })
    );

    return enrichedAssignments;
  },
});

// Send message to student
export const sendMessage = mutation({
  args: {
    toUserId: v.id("users"),
    subject: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const sender = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!sender) throw new Error("User not found");

    await ctx.db.insert("messages", {
      fromUserId: sender._id,
      toUserId: args.toUserId,
      subject: args.subject,
      content: args.content,
      isRead: false,
      createdAt: Date.now(),
    });

    return { success: true };
  },
});

// Get messages
export const getMessages = query({
  args: {
    type: v.optional(v.union(v.literal("inbox"), v.literal("sent"))),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const type = args.type || "inbox";

    let messages;
    if (type === "inbox") {
      messages = await ctx.db
        .query("messages")
        .withIndex("by_recipient", (q) => q.eq("toUserId", user._id))
        .order("desc")
        .collect();
    } else {
      messages = await ctx.db
        .query("messages")
        .withIndex("by_sender", (q) => q.eq("fromUserId", user._id))
        .order("desc")
        .collect();
    }

    const enrichedMessages = await Promise.all(
      messages.map(async (msg) => {
        const fromUser = msg.fromUserId 
          ? await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), msg.fromUserId)).first()
          : null;
        const toUser = msg.toUserId 
          ? await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), msg.toUserId)).first()
          : null;

        return {
          ...msg,
          fromName: fromUser?.name || "Unknown",
          toName: toUser?.name || "Unknown",
        };
      })
    );

    return enrichedMessages;
  },
});

// Mark message as read
export const markMessageRead = mutation({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    await ctx.db.patch(args.messageId, { isRead: true });
    return { success: true };
  },
});

// Create announcement
export const createAnnouncement = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    targetType: v.union(v.literal("all"), v.literal("specific")),
    targetStudents: v.optional(v.array(v.id("users"))),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") {
      throw new Error("Only teachers can create announcements");
    }

    await ctx.db.insert("announcements", {
      teacherId: teacher._id,
      title: args.title,
      content: args.content,
      targetType: args.targetType,
      targetStudents: args.targetStudents,
      createdAt: Date.now(),
    });

    return { success: true };
  },
});

// Get announcements (for students)
export const getAnnouncements = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    // If teacher, get their announcements
    if (user.role === "teacher") {
      return await ctx.db
        .query("announcements")
        .withIndex("by_teacher", (q) => q.eq("teacherId", user._id))
        .order("desc")
        .collect();
    }

    // If student, get relevant announcements
    const teacherRelations = await ctx.db
      .query("teacherStudents")
      .withIndex("by_student", (q) => q.eq("studentId", user._id))
      .collect();

    const teacherIds = teacherRelations.map((r) => r.teacherId);

    const announcements = await ctx.db
      .query("announcements")
      .withIndex("by_created")
      .order("desc")
      .collect();

    // Filter announcements from student's teachers
    return announcements.filter(
      (a) =>
        teacherIds.includes(a.teacherId) &&
        (a.targetType === "all" ||
          (a.targetStudents && a.targetStudents.includes(user._id)))
    );
  },
});

// Get teacher dashboard stats
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const teacher = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!teacher || teacher.role !== "teacher") return null;

    const students = await ctx.db
      .query("teacherStudents")
      .withIndex("by_teacher", (q) => q.eq("teacherId", teacher._id))
      .collect();

    const exams = await ctx.db
      .query("exams")
      .filter((q) => q.eq(q.field("createdBy"), teacher._id))
      .collect();

    const unreadMessages = await ctx.db
      .query("messages")
      .withIndex("by_recipient", (q) => q.eq("toUserId", teacher._id))
      .filter((q) => q.eq(q.field("isRead"), false))
      .collect();

    const pendingAssignments = await ctx.db
      .query("examAssignments")
      .withIndex("by_teacher", (q) => q.eq("teacherId", teacher._id))
      .filter((q) => q.eq(q.field("status"), "submitted"))
      .collect();

    return {
      totalStudents: students.length,
      totalExams: exams.length,
      unreadMessages: unreadMessages.length,
      pendingGrading: pendingAssignments.length,
    };
  },
});
