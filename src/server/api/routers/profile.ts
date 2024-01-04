import { Prisma } from "@prisma/client";

import { defaultEventSelect } from "~/server/api/routers/event";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const defaultProfileSelect = Prisma.validator<Prisma.ProfileSelect>()({
	id: true,
	isAdmin: true,
	eventsHosting: {
		select: defaultEventSelect,
	},
	eventsAttending: {
		select: defaultEventSelect,
	},
	clerkId: true,
	avatarUrl: true,
	username: true,
});

export const profileRouter = createTRPCRouter({
	getMine: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.profile.findUnique({
			where: {
				clerkId: ctx.auth.userId,
			},
			select: defaultProfileSelect,
		});
	}),
});
