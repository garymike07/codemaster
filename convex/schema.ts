import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.optional(v.string()),
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("student"), v.literal("teacher")),
    avatarUrl: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    // Subscription fields
    trialStartedAt: v.optional(v.number()),
    trialEndsAt: v.optional(v.number()),
    subscriptionStatus: v.optional(v.union(
      v.literal("trial"),
      v.literal("active"),
      v.literal("expired"),
      v.literal("cancelled")
    )),
    subscriptionPlan: v.optional(v.string()),
    // Legacy fields
    userId: v.optional(v.string()),
    lastLogin: v.optional(v.number()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  courses: defineTable({
    slug: v.optional(v.string()),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    language: v.optional(v.string()),
    difficulty: v.optional(v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    )),
    totalLessons: v.optional(v.number()),
    estimatedHours: v.optional(v.number()),
    isPublished: v.optional(v.boolean()),
    // Legacy field
    courseId: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  }).index("by_slug", ["slug"]),

  modules: defineTable({
    courseId: v.union(v.id("courses"), v.string()),
    title: v.string(),
    order: v.optional(v.number()),
    // Legacy fields
    moduleIndex: v.optional(v.number()),
    subtopics: v.optional(v.array(v.any())),
    summary: v.optional(v.string()),
    durationMinutes: v.optional(v.number()),
    pitfalls: v.optional(v.array(v.string())),
  }).index("by_course", ["courseId"]),

  lessons: defineTable({
    moduleId: v.id("modules"),
    courseId: v.union(v.id("courses"), v.string()),
    title: v.string(),
    type: v.union(
      v.literal("theory"),
      v.literal("practice"),
      v.literal("challenge"),
      v.literal("project"),
      v.literal("quiz")
    ),
    content: v.string(),
    codeTemplate: v.optional(v.string()),
    solution: v.optional(v.string()),
    testCases: v.optional(
      v.array(
        v.object({
          id: v.optional(v.string()),
          input: v.string(),
          expectedOutput: v.string(),
          isHidden: v.optional(v.boolean()),
          description: v.optional(v.string()),
          points: v.optional(v.number()),
        })
      )
    ),
    hints: v.optional(v.array(v.string())),
    xpReward: v.optional(v.number()),
    estimatedMinutes: v.optional(v.number()),
    language: v.optional(v.string()),
    order: v.number(),

    // ENHANCED: Structured Notes Section
    notes: v.optional(
      v.object({
        summary: v.string(),
        detailedContent: v.optional(v.string()),
        prerequisites: v.optional(v.array(v.string())),
        learningObjectives: v.array(v.string()),
        resources: v.optional(
          v.array(
            v.object({
              title: v.string(),
              url: v.string(),
              type: v.union(
                v.literal("video"),
                v.literal("article"),
                v.literal("docs"),
                v.literal("tutorial")
              ),
            })
          )
        ),
      })
    ),

    // ENHANCED: Multiple Examples with Variations
    examples: v.optional(
      v.array(
        v.object({
          id: v.optional(v.string()),
          title: v.string(),
          description: v.string(),
          code: v.string(),
          explanation: v.string(),
          output: v.optional(v.string()),
          difficulty: v.optional(
            v.union(
              v.literal("beginner"),
              v.literal("intermediate"),
              v.literal("advanced")
            )
          ),
          concepts: v.optional(v.array(v.string())),
          variations: v.optional(
            v.array(
              v.object({
                name: v.string(),
                code: v.string(),
                description: v.string(),
              })
            )
          ),
        })
      )
    ),

    // ENHANCED: Playground Configuration
    playground: v.optional(
      v.object({
        enabled: v.boolean(),
        starterCode: v.optional(v.string()),
        language: v.optional(v.string()),
        testCases: v.optional(
          v.array(
            v.object({
              input: v.string(),
              expectedOutput: v.string(),
              description: v.string(),
              isHidden: v.optional(v.boolean()),
            })
          )
        ),
        hints: v.optional(v.array(v.string())),
        solution: v.optional(v.string()),
        allowedImports: v.optional(v.array(v.string())),
      })
    ),

    // Keep existing fields for backwards compatibility
    keyTakeaways: v.optional(v.array(v.string())),
    commonMistakes: v.optional(
      v.array(
        v.object({
          mistake: v.string(),
          explanation: v.string(),
          howToAvoid: v.string(),
        })
      )
    ),

    // ENHANCED: AI Tutor Configuration per Lesson
    aiConfig: v.optional(
      v.object({
        systemPrompt: v.optional(v.string()),
        suggestedQuestions: v.optional(v.array(v.string())),
        conceptExplanations: v.optional(v.any()),
        tutorMode: v.optional(
          v.union(
            v.literal("socratic"),
            v.literal("explain"),
            v.literal("debug"),
            v.literal("quiz")
          )
        ),
      })
    ),

    // Legacy field - keep for backwards compatibility
    aiPrompts: v.optional(
      v.object({
        explainCode: v.optional(v.string()),
        suggestFix: v.optional(v.string()),
        generateExample: v.optional(v.string()),
        quizStudent: v.optional(v.string()),
      })
    ),
  })
    .index("by_module", ["moduleId"])
    .index("by_course", ["courseId"]),

  progress: defineTable({
    userId: v.id("users"),
    lessonId: v.id("lessons"),
    courseId: v.id("courses"),
    completedAt: v.number(),
  })
    .index("by_user_course", ["userId", "courseId"])
    .index("by_user_lesson", ["userId", "lessonId"]),

  enrollments: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    enrolledAt: v.number(),
    lastAccessedAt: v.number(),
    currentLessonId: v.optional(v.id("lessons")),
  })
    .index("by_user", ["userId"])
    .index("by_user_course", ["userId", "courseId"]),

  exams: defineTable({
    courseId: v.union(v.id("courses"), v.string()),
    title: v.string(),
    description: v.string(),
    durationMinutes: v.number(),
    passingScore: v.number(),
    questions: v.array(v.any()),
    totalPoints: v.optional(v.number()),
    createdBy: v.optional(v.union(v.id("users"), v.string())),
    isPublished: v.optional(v.boolean()),
    publishedAt: v.optional(v.number()),
    // Legacy fields
    isActive: v.optional(v.boolean()),
    moduleIndex: v.optional(v.number()),
    resources: v.optional(v.array(v.any())),
  })
    .index("by_course", ["courseId"])
    .index("by_published", ["isPublished"]),

  examBank: defineTable({
    createdBy: v.id("users"),
    courseId: v.optional(v.id("courses")),
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
    usageCount: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_creator", ["createdBy"])
    .index("by_difficulty", ["difficulty"]),

  examSubmissions: defineTable({
    examId: v.id("exams"),
    userId: v.union(v.id("users"), v.string()),
    answers: v.array(
      v.object({
        questionId: v.string(),
        answer: v.string(),
        isCorrect: v.optional(v.boolean()),
        pointsEarned: v.optional(v.number()),
      })
    ),
    score: v.optional(v.number()),
    percentageScore: v.optional(v.number()),
    passed: v.optional(v.boolean()),
    startedAt: v.number(),
    submittedAt: v.optional(v.number()),
    timeSpentSeconds: v.optional(v.number()),
    // Legacy field
    status: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_exam", ["examId"])
    .index("by_user_exam", ["userId", "examId"]),

  conversations: defineTable({
    participants: v.array(v.id("users")),
    lastMessageAt: v.number(),
    lastMessagePreview: v.optional(v.string()),
  })
    .index("by_lastMessage", ["lastMessageAt"]),

  messages: defineTable({
    conversationId: v.optional(v.id("conversations")),
    fromUserId: v.optional(v.id("users")),
    toUserId: v.optional(v.id("users")),
    subject: v.string(),
    content: v.optional(v.string()),
    isRead: v.optional(v.boolean()),
    createdAt: v.optional(v.number()),
    // Legacy fields
    body: v.optional(v.string()),
    senderId: v.optional(v.string()),
    senderRole: v.optional(v.string()),
    sentAt: v.optional(v.number()),
    readBy: v.optional(v.array(v.any())),
    recipientIds: v.optional(v.array(v.any())),
    replyToMessageId: v.optional(v.string()),
  })
    .index("by_conversation", ["conversationId", "createdAt"])
    .index("by_recipient", ["toUserId", "createdAt"])
    .index("by_sender", ["fromUserId", "createdAt"]),

  // Gamification tables
  streaks: defineTable({
    userId: v.id("users"),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastActiveDate: v.string(), // YYYY-MM-DD format
  }).index("by_user", ["userId"]),

  badges: defineTable({
    name: v.string(),
    icon: v.string(),
    description: v.string(),
    criteria: v.string(),
    xpReward: v.number(),
    category: v.union(
      v.literal("streak"),
      v.literal("completion"),
      v.literal("skill"),
      v.literal("speed"),
      v.literal("special")
    ),
  }),

  userBadges: defineTable({
    userId: v.id("users"),
    badgeId: v.id("badges"),
    earnedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_badge", ["badgeId"]),

  xpHistory: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    source: v.union(
      v.literal("lesson_complete"),
      v.literal("challenge_complete"),
      v.literal("exam_pass"),
      v.literal("streak_bonus"),
      v.literal("badge_earned"),
      v.literal("daily_challenge")
    ),
    sourceId: v.optional(v.string()),
    earnedAt: v.number(),
  }).index("by_user", ["userId"]),

  userStats: defineTable({
    userId: v.id("users"),
    totalXp: v.number(),
    level: v.number(),
    lessonsCompleted: v.number(),
    challengesCompleted: v.number(),
    examsPassed: v.number(),
    totalCodingTime: v.number(), // in seconds
  }).index("by_user", ["userId"]),

  codeSubmissions: defineTable({
    userId: v.id("users"),
    lessonId: v.id("lessons"),
    code: v.string(),
    language: v.string(),
    status: v.union(
      v.literal("accepted"),
      v.literal("wrong_answer"),
      v.literal("runtime_error"),
      v.literal("time_limit"),
      v.literal("compile_error")
    ),
    testsPassed: v.number(),
    totalTests: v.number(),
    executionTime: v.optional(v.number()),
    memoryUsed: v.optional(v.number()),
    submittedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_lesson", ["lessonId"])
    .index("by_user_lesson", ["userId", "lessonId"]),

  dailyChallenges: defineTable({
    userId: v.id("users"),
    lessonId: v.id("lessons"),
    date: v.string(), // YYYY-MM-DD
    completed: v.boolean(),
    completedAt: v.optional(v.number()),
    xpEarned: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_date", ["userId", "date"]),

  certificates: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    issuedAt: v.number(),
    certificateId: v.string(), // unique ID for verification
    score: v.number(),
    grade: v.union(
      v.literal("A"),
      v.literal("B"),
      v.literal("C"),
      v.literal("D"),
      v.literal("F")
    ),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"])
    .index("by_certificate_id", ["certificateId"]),

  // Teacher-Student relationship tables
  teacherStudents: defineTable({
    teacherId: v.id("users"),
    studentId: v.id("users"),
    assignedCourses: v.optional(v.array(v.id("courses"))),
    enrolledAt: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_teacher", ["teacherId"])
    .index("by_student", ["studentId"])
    .index("by_teacher_student", ["teacherId", "studentId"]),

  announcements: defineTable({
    teacherId: v.id("users"),
    title: v.string(),
    content: v.string(),
    targetType: v.union(v.literal("all"), v.literal("specific")),
    targetStudents: v.optional(v.array(v.id("users"))),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_teacher", ["teacherId"])
    .index("by_created", ["createdAt"]),

  examAssignments: defineTable({
    examId: v.id("exams"),
    studentId: v.id("users"),
    teacherId: v.id("users"),
    dueDate: v.optional(v.number()),
    assignedAt: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("submitted"),
      v.literal("graded")
    ),
    grade: v.optional(v.number()),
    feedback: v.optional(v.string()),
  })
    .index("by_student", ["studentId"])
    .index("by_teacher", ["teacherId"])
    .index("by_exam", ["examId"])
    .index("by_student_status", ["studentId", "status"]),

  // NEW: User Playground Sessions - Persist user code per lesson
  playgroundSessions: defineTable({
    userId: v.id("users"),
    lessonId: v.id("lessons"),
    code: v.string(),
    savedAt: v.number(),
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
  })
    .index("by_user", ["userId"])
    .index("by_lesson", ["lessonId"])
    .index("by_user_lesson", ["userId", "lessonId"]),

  // NEW: AI Chat History - Persist chat conversations per lesson
  aiChatHistory: defineTable({
    userId: v.id("users"),
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
    updatedAt: v.number(),
    totalMessages: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_lesson", ["lessonId"])
    .index("by_user_lesson", ["userId", "lessonId"]),

  // NEW: User Personal Notes - User's own notes per lesson
  userLessonNotes: defineTable({
    userId: v.id("users"),
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_lesson", ["lessonId"])
    .index("by_user_lesson", ["userId", "lessonId"])
    .index("by_bookmarked", ["userId", "bookmarked"]),
});
