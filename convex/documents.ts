import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const createDocument = mutation({
  args: {
    title: v.string(),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);
    console.log("userId", userId);

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      userId: userId,
    });
  },
});

export const getDocuments = query({
  async handler(ctx) {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});
