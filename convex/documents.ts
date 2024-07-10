import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      userId: userId,
      fileId: args.fileId,
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

export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }

    const doc = await ctx.db.get(args.documentId);
    if (!doc || doc.userId !== userId) {
      return null;
    }

    return {
      ...doc,
      documentUrl: await ctx.storage.getUrl(doc.fileId),
    };
  },
});
