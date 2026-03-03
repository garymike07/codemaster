import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { TRIAL_DURATION_DAYS, MS_PER_DAY } from "./constants";

export const getOrCreate = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const existing = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
        .unique();

      if (existing) {
        // Bug #10: Only patch avatarUrl if it is actually provided
        const updateData: { name: string; avatarUrl?: string } = { name: args.name };
        if (args.avatarUrl !== undefined) {
          updateData.avatarUrl = args.avatarUrl;
        }
        await ctx.db.patch(existing._id, updateData);
        return existing._id;
      }

      const now = Date.now();

      const userId = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        name: args.name,
        avatarUrl: args.avatarUrl,
        role: "student",
        createdAt: now,
        // Auto-start 30-day trial for new users
        trialStartedAt: now,
        trialEndsAt: now + TRIAL_DURATION_DAYS * MS_PER_DAY,
        subscriptionStatus: "trial",
      });

      return userId;
    } catch (error) {
      console.error("Error in getOrCreate:", error);
      throw new Error(
        `Failed to create or update user: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    return user;
  },
});

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const updateRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("student"), v.literal("teacher")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Only allow admins (teachers) to change roles
    const caller = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!caller || caller.role !== "teacher") {
      throw new Error("Forbidden: only teachers can update roles");
    }

    await ctx.db.patch(args.userId, { role: args.role });

    // Bug #2: Return the updated user so the caller can confirm the change
    const updatedUser = await ctx.db.get(args.userId);
    return { success: true, newRole: updatedUser?.role };
  },
});

export const switchRole = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const newRole = user.role === "student" ? "teacher" : "student";
    await ctx.db.patch(user._id, { role: newRole });
    return newRole;
  },
});
