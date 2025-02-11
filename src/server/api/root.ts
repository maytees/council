import { postRouter } from "@/server/api/routers/post";
import { profileRouter } from "@/server/api/routers/profile";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { companyRouter } from "./routers/company";
import { jobsRouter } from "./routers/jobs";
import { schoolRouter } from "./routers/school";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  profile: profileRouter,
  school: schoolRouter,
  jobs: jobsRouter,
  company: companyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
