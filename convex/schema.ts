import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { text } from "stream/consumers";

export default defineSchema({
  ...authTables,
  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    userId: v.id("users"),
    fileId: v.id("_storage"),
  }).index("by_userId", ["userId"]),
  chats: defineTable({
    documentId: v.id("documents"),
    userId: v.id("users"),
    text: v.string(),
    isHuman: v.boolean(),
  }).index("by_documentId_userId", ["documentId", "userId"]),
});
