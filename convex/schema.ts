import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  documents: defineTable({ title: v.string(), userId: v.id("users") }).index(
    "by_userId",
    ["userId"]
  ),
});
