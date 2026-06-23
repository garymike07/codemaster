import { mutation } from "./_generated/server";
import { seedAllCourses } from "./ensureSeeded";

export const seedPopulateAll = mutation({
  args: {},
  handler: async (ctx) => {
    const { errors } = await seedAllCourses(ctx);

    if (errors.length > 0) {
      return { message: `Seeded with ${errors.length} error(s): ${errors.join("; ")}` };
    }

    return { message: "Seed complete." };
  },
});
