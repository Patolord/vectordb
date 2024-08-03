import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { auth } from "./auth";

export const createNote = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const note = await ctx.db.insert("notes", {
      text: args.text,
      userId,
    });

    return note;
  },
});
