import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// XP Rewards Configuration
const XP_REWARDS = {
  lesson_complete: { theory: 15, practice: 30, challenge: 50, project: 100, quiz: 25 },
  streak_bonus: { 7: 50, 30: 150, 100: 500 },
  exam_pass: { base: 100, perfect: 200 },
  daily_challenge: 30,
};

// Level thresholds
const LEVEL_THRESHOLDS = [
  0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5200,
  6500, 8000, 10000, 12500, 15500, 19000, 23000, 27500, 32500, 38000,
  44000, 50500, 57500, 65000, 73000, 82000, 92000, 103000, 115000, 128000
];

function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

function getXpForNextLevel(currentXp: number): { current: number; next: number; progress: number } {
  const level = calculateLevel(currentXp);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const progress = ((currentXp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return { current: currentXp - currentThreshold, next: nextThreshold - currentThreshold, progress };
}

// Award XP to user
export const awardXp = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Record XP history
    await ctx.db.insert("xpHistory", {
      userId: user._id,
      amount: args.amount,
      source: args.source,
      sourceId: args.sourceId,
      earnedAt: Date.now(),
    });

    // Update user stats
    let stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (!stats) {
      await ctx.db.insert("userStats", {
        userId: user._id,
        totalXp: args.amount,
        level: calculateLevel(args.amount),
        lessonsCompleted: 0,
        challengesCompleted: 0,
        examsPassed: 0,
        totalCodingTime: 0,
      });
    } else {
      const newTotalXp = stats.totalXp + args.amount;
      await ctx.db.patch(stats._id, {
        totalXp: newTotalXp,
        level: calculateLevel(newTotalXp),
      });
    }

    return { xpAwarded: args.amount };
  },
});

// Get user stats
export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    const stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (!stats) {
      return {
        totalXp: 0,
        level: 1,
        levelProgress: getXpForNextLevel(0),
        lessonsCompleted: 0,
        challengesCompleted: 0,
        examsPassed: 0,
        totalCodingTime: 0,
      };
    }

    return {
      ...stats,
      levelProgress: getXpForNextLevel(stats.totalXp),
    };
  },
});

// Update streak
export const updateStreak = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let streak = await ctx.db
      .query("streaks")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (!streak) {
      await ctx.db.insert("streaks", {
        userId: user._id,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
      });
      return { streak: 1, isNew: true };
    }

    if (streak.lastActiveDate === today) {
      return { streak: streak.currentStreak, isNew: false };
    }

    let newStreak = 1;
    if (streak.lastActiveDate === yesterday) {
      newStreak = streak.currentStreak + 1;
    }

    const newLongest = Math.max(streak.longestStreak, newStreak);

    await ctx.db.patch(streak._id, {
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastActiveDate: today,
    });

    // Check for streak badges and bonus XP
    let bonusXp = 0;
    if (newStreak === 7) bonusXp = XP_REWARDS.streak_bonus[7];
    else if (newStreak === 30) bonusXp = XP_REWARDS.streak_bonus[30];
    else if (newStreak === 100) bonusXp = XP_REWARDS.streak_bonus[100];

    return { streak: newStreak, longestStreak: newLongest, bonusXp, isNew: true };
  },
});

// Get user streak
export const getStreak = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    const streak = await ctx.db
      .query("streaks")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (!streak) {
      return { currentStreak: 0, longestStreak: 0, isActiveToday: false };
    }

    const isActiveToday = streak.lastActiveDate === today;
    const isStreakActive = streak.lastActiveDate === today || streak.lastActiveDate === yesterday;

    return {
      currentStreak: isStreakActive ? streak.currentStreak : 0,
      longestStreak: streak.longestStreak,
      isActiveToday,
    };
  },
});

// Get user badges
export const getUserBadges = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const userBadges = await ctx.db
      .query("userBadges")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const badges = await Promise.all(
      userBadges.map(async (ub) => {
        const badge = await ctx.db.get(ub.badgeId);
        return { ...badge, earnedAt: ub.earnedAt };
      })
    );

    return badges;
  },
});

// Get all available badges
export const getAllBadges = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("badges").collect();
  },
});

// Award badge to user
export const awardBadge = mutation({
  args: {
    badgeId: v.id("badges"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Check if already has badge
    const existing = await ctx.db
      .query("userBadges")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    if (existing.some((ub) => ub.badgeId === args.badgeId)) {
      return { awarded: false, reason: "Already has badge" };
    }

    const badge = await ctx.db.get(args.badgeId);
    if (!badge) throw new Error("Badge not found");

    await ctx.db.insert("userBadges", {
      userId: user._id,
      badgeId: args.badgeId,
      earnedAt: Date.now(),
    });

    return { awarded: true, badge, xpReward: badge.xpReward };
  },
});

// Get XP history
export const getXpHistory = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const history = await ctx.db
      .query("xpHistory")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit ?? 20);

    return history;
  },
});

// Get leaderboard
export const getLeaderboard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const allStats = await ctx.db.query("userStats").collect();
    
    const leaderboard = await Promise.all(
      allStats
        .sort((a, b) => b.totalXp - a.totalXp)
        .slice(0, args.limit ?? 10)
        .map(async (stat, index) => {
          const user = await ctx.db.get(stat.userId);
          return {
            rank: index + 1,
            name: user?.name ?? "Unknown",
            totalXp: stat.totalXp,
            level: stat.level,
            lessonsCompleted: stat.lessonsCompleted,
          };
        })
    );

    return leaderboard;
  },
});

// Record code submission
export const recordSubmission = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.insert("codeSubmissions", {
      userId: user._id,
      lessonId: args.lessonId,
      code: args.code,
      language: args.language,
      status: args.status,
      testsPassed: args.testsPassed,
      totalTests: args.totalTests,
      executionTime: args.executionTime,
      memoryUsed: args.memoryUsed,
      submittedAt: Date.now(),
    });

    return { recorded: true };
  },
});

// Get submission history for a lesson
export const getLessonSubmissions = query({
  args: { lessonId: v.id("lessons") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    return await ctx.db
      .query("codeSubmissions")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .order("desc")
      .take(10);
  },
});

// Update user stats when lesson is completed
export const updateStatsOnLessonComplete = mutation({
  args: {
    lessonType: v.union(
      v.literal("theory"),
      v.literal("practice"),
      v.literal("challenge"),
      v.literal("project"),
      v.literal("quiz")
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

    let stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    const xpReward = XP_REWARDS.lesson_complete[args.lessonType] || 15;

    if (!stats) {
      await ctx.db.insert("userStats", {
        userId: user._id,
        totalXp: xpReward,
        level: 1,
        lessonsCompleted: 1,
        challengesCompleted: args.lessonType === "challenge" ? 1 : 0,
        examsPassed: 0,
        totalCodingTime: 0,
      });
    } else {
      const newXp = stats.totalXp + xpReward;
      await ctx.db.patch(stats._id, {
        totalXp: newXp,
        level: calculateLevel(newXp),
        lessonsCompleted: stats.lessonsCompleted + 1,
        challengesCompleted:
          args.lessonType === "challenge"
            ? stats.challengesCompleted + 1
            : stats.challengesCompleted,
      });
    }

    return { xpAwarded: xpReward };
  },
});
