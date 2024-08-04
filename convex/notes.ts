import { ConvexError, v } from "convex/values";
import {
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { auth } from "./auth";
import OpenAI from "openai";
import { internal } from "./_generated/api";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function embed(text: string) {
  const embeding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  return embeding.data[0].embedding;
}

export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.number()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.noteId, { embedding: args.embedding });
  },
});

export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const embedding = await embed(args.text);

    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding,
    });
  },
});

export const createNote = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const noteId = await ctx.db.insert("notes", {
      text: args.text,
      userId,
    });

    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      noteId: noteId,
      text: args.text,
    });
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

export const deleteNote = mutation({
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

    await ctx.db.delete(args.noteId);
  },
});
