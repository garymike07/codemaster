import { v } from 'convex/values';
import type { Id } from './_generated/dataModel';
import { query } from './_generated/server';

export const getMySubmissions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique();

    if (!user) return [];

    const submissions = await ctx.db
      .query('examSubmissions')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .collect();

    return await Promise.all(
      submissions.map(async (submission) => {
        const exam = await ctx.db.get(submission.examId);
        let course: Awaited<ReturnType<typeof ctx.db.get>> | null = null;

        if (exam && typeof exam.courseId !== 'string') {
          course = await ctx.db.get(exam.courseId as Id<'courses'>);
        }

        return { ...submission, exam, course };
      })
    );
  },
});

export const getSubmission = query({
  args: { submissionId: v.id('examSubmissions') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique();

    if (!user) throw new Error('User not found');

    const submission = await ctx.db.get(args.submissionId);
    if (!submission) return null;

    if (submission.userId !== user._id && user.role !== 'teacher') {
      throw new Error('Not authorized to view this submission');
    }

    const exam = await ctx.db.get(submission.examId);
    let course: Awaited<ReturnType<typeof ctx.db.get>> | null = null;

    if (exam && typeof exam.courseId !== 'string') {
      course = await ctx.db.get(exam.courseId as Id<'courses'>);
    }

    return { ...submission, exam, course };
  },
});
