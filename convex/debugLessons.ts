import { query } from "./_generated/server";

export const listTitles = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db.query("courses").filter(q => q.eq(q.field("slug"), "python-fundamentals")).collect();
    const results = {};
    
    for (const course of courses) {
      const lessons = await ctx.db
        .query("lessons")
        .withIndex("by_course", (q) => q.eq("courseId", course._id))
        .collect();
      
      results[course.slug] = lessons.map(l => l.title);
    }
    
    return results;
  },
});
