import { mutation } from "./_generated/server";

// Delete old courses that have URL-based icons (not emojis) and no proper slug
export const deleteOldCourses = mutation({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db.query("courses").collect();
    
    let deleted = 0;
    for (const course of courses) {
      // Old courses have URL icons (start with http) or no slug
      const hasUrlIcon = course.icon?.startsWith("http");
      const hasNoSlug = !course.slug;
      
      if (hasUrlIcon || hasNoSlug) {
        // Delete associated modules and lessons first
        const modules = await ctx.db
          .query("modules")
          .withIndex("by_course", (q) => q.eq("courseId", course._id))
          .collect();
        
        for (const module of modules) {
          // Delete lessons
          const lessons = await ctx.db
            .query("lessons")
            .withIndex("by_module", (q) => q.eq("moduleId", module._id))
            .collect();
          
          for (const lesson of lessons) {
            await ctx.db.delete(lesson._id);
          }
          
          await ctx.db.delete(module._id);
        }
        
        // Delete enrollments for this course
        const enrollments = await ctx.db
          .query("enrollments")
          .collect();
        
        for (const enrollment of enrollments) {
          if (enrollment.courseId === course._id) {
            await ctx.db.delete(enrollment._id);
          }
        }
        
        // Delete the course
        await ctx.db.delete(course._id);
        deleted++;
      }
    }
    
    return { deleted };
  },
});
