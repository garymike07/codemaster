import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const TRIAL_DURATION_DAYS = 30;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const giveTrialToExistingUsers = mutation({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const now = Date.now();
    const trialEndsAt = now + (TRIAL_DURATION_DAYS * MS_PER_DAY);
    
    let updated = 0;
    for (const user of users) {
      if (!user.trialStartedAt && user.subscriptionStatus !== "active") {
        await ctx.db.patch(user._id, {
          trialStartedAt: now,
          trialEndsAt,
          subscriptionStatus: "trial",
        });
        updated++;
      }
    }
    
    return { updated, total: users.length };
  },
});

export const giveTrialToCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    if (user.subscriptionStatus === "active") {
      return { success: false, message: "Already has active subscription" };
    }

    const now = Date.now();
    const trialEndsAt = now + (TRIAL_DURATION_DAYS * MS_PER_DAY);

    await ctx.db.patch(user._id, {
      trialStartedAt: now,
      trialEndsAt,
      subscriptionStatus: "trial",
    });

    return { success: true, trialEndsAt, daysRemaining: TRIAL_DURATION_DAYS };
  },
});

export const getSubscriptionStatus = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    const now = Date.now();
    const trialEndsAt = user.trialEndsAt;
    const status = user.subscriptionStatus;

    // Calculate days remaining for trial
    let daysRemaining = 0;
    let isTrialActive = false;

    if (status === "trial" && trialEndsAt) {
      daysRemaining = Math.max(0, Math.ceil((trialEndsAt - now) / MS_PER_DAY));
      isTrialActive = daysRemaining > 0;
    }

    // Check if trial has expired
    const isExpired = status === "trial" && trialEndsAt && now > trialEndsAt;
    const hasActiveSubscription = status === "active";
    const hasAccess = isTrialActive || hasActiveSubscription;

    return {
      status: isExpired ? "expired" : status,
      plan: user.subscriptionPlan,
      trialStartedAt: user.trialStartedAt,
      trialEndsAt: user.trialEndsAt,
      daysRemaining,
      isTrialActive,
      hasAccess,
      isExpired,
    };
  },
});

export const startTrial = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    // Don't start a new trial if user already has one or has active subscription
    if (user.subscriptionStatus === "active") {
      return { success: false, message: "User already has active subscription" };
    }
    if (user.trialStartedAt) {
      return { success: false, message: "User has already used their trial" };
    }

    const now = Date.now();
    const trialEndsAt = now + (TRIAL_DURATION_DAYS * MS_PER_DAY);

    await ctx.db.patch(args.userId, {
      trialStartedAt: now,
      trialEndsAt,
      subscriptionStatus: "trial",
    });

    return {
      success: true,
      trialEndsAt,
      daysRemaining: TRIAL_DURATION_DAYS,
    };
  },
});

export const checkAccess = query({
  args: {
    feature: v.optional(v.string()),
  },
  handler: async (ctx, _args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { hasAccess: false, reason: "not_authenticated" };

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return { hasAccess: false, reason: "user_not_found" };

    const now = Date.now();
    const status = user.subscriptionStatus;
    const trialEndsAt = user.trialEndsAt;

    // Active subscription always has access
    if (status === "active") {
      return { hasAccess: true, reason: "active_subscription" };
    }

    // Check trial validity
    if (status === "trial" && trialEndsAt && now <= trialEndsAt) {
      return { hasAccess: true, reason: "trial_active" };
    }

    // Trial expired or no subscription
    return {
      hasAccess: false,
      reason: status === "trial" ? "trial_expired" : "no_subscription",
    };
  },
});

export const upgradeSubscription = mutation({
  args: {
    plan: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      subscriptionStatus: "active",
      subscriptionPlan: args.plan,
    });

    return { success: true };
  },
});

export const cancelSubscription = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      subscriptionStatus: "cancelled",
    });

    return { success: true };
  },
});
