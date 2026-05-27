import { authRouter } from "./auth-router";
import { todoRouter } from "./todo-router";
import { contactRouter } from "./contact-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  todo: todoRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
