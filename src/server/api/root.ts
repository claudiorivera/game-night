import { bggRouter } from "~/server/api/routers/bgg";
import { eventRouter } from "~/server/api/routers/event";
import { gameRouter } from "~/server/api/routers/game";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	event: eventRouter,
	game: gameRouter,
	bgg: bggRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
