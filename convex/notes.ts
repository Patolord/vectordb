import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
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

export const getNotes = query({
  async handler(ctx) {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return notes;
  },
});

export const getNote = query({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const note = await ctx.db.get(args.noteId);
    if (!note) {
      return null;
    }

    if (note.userId !== userId) {
      throw new ConvexError("Not authorized");
    }

    return note;
  },
});
