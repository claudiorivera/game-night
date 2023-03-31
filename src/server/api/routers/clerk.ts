import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const clerkRouter = createTRPCRouter({
	clerkUserById: protectedProcedure
		.input(z.object({ clerkId: z.string() }))
		.query(({ input }) => {
			return clerkClient.users.getUser(input.clerkId);
		}),
});
