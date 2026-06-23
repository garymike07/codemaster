import { v } from 'convex/values';
import type { Doc } from './_generated/dataModel';
import { query } from './_generated/server';

export const getByModule = query({
  args: { moduleId: v.id('modules') },
  handler: async (ctx, args) => {
    const lessons = await ctx.db
      .query('lessons')
      .withIndex('by_module', (q) => q.eq('moduleId', args.moduleId))
      .collect();

    return lessons.sort((a, b) => a.order - b.order);
  },
});

export const getById = query({
  args: { lessonId: v.id('lessons') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.lessonId);
  },
});

export const getByCourse = query({
  args: { courseId: v.id('courses') },
  handler: async (ctx, args) => {
    const modules = await ctx.db
      .query('modules')
      .withIndex('by_course', (q) => q.eq('courseId', args.courseId))
      .collect();

    const sortedModules = modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const lessons: Doc<'lessons'>[] = [];

    for (const module of sortedModules) {
      const moduleLessons = await ctx.db
        .query('lessons')
        .withIndex('by_module', (q) => q.eq('moduleId', module._id))
        .collect();

      lessons.push(...moduleLessons.sort((a, b) => a.order - b.order));
    }

    return lessons;
  },
});
