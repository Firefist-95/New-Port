import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactMessages } from "../db/schema";

export const contactRouter = createRouter({
  send: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        message: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(contactMessages).values({
        name: input.name,
        email: input.email,
        message: input.message,
      });
      return { success: true };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    const messages = await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
    return messages;
  }),
});
