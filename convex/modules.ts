import { v } from 'convex/values';
import { query } from './_generated/server';

export const getByCourse = query({
  args: { courseId: v.id('courses') },
  handler: async (ctx, args) => {
    const modules = await ctx.db
      .query('modules')
      .withIndex('by_course', (q) => q.eq('courseId', args.courseId))
      .collect();

    return modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

export const getById = query({
  args: { moduleId: v.id('modules') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.moduleId);
  },
});
