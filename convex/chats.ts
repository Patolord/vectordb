import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { auth } from "./auth";

export const getChatsForDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    return await ctx.db
      .query("chats")
      .withIndex("by_documentId_userId", (q) =>
        q.eq("documentId", args.documentId).eq("userId", userId)
      )
      .collect();
  },
});

export const createChatRecord = internalMutation({
  args: {
    documentId: v.id("documents"),
    text: v.string(),
    isHuman: v.boolean(),
    userId: v.id("users"),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("chats", {
      documentId: args.documentId,
      userId: userId,
      text: args.text,
      isHuman: args.isHuman,
    });
  },
});
