import { v } from "convex/values";
import { action } from "./_generated/server";
import { embed } from "./notes";
import { auth } from "./auth";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const searchAction = action({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }

    const embedding = await embed(args.search);

    const results = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq("userId", userId),
    });

    const records: (
      | { type: "notes"; record: Doc<"notes"> }
      | { type: "documents"; record: Doc<"documents"> }
    )[] = [];

    await Promise.all(
      results.map(async (result) => {
        const note = await ctx.runQuery(api.notes.getNote, {
          noteId: result._id,
        });
        if (!note) return;

        records.push({ record: note, type: "notes" });
      })
    );
    return records;
  },
});
