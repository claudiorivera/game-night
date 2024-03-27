import { Prisma } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const defaultEventSelect = Prisma.validator<Prisma.EventSelect>()({
	id: true,
	game: true,
	host: true,
	guests: true,
	dateTime: true,
});

export const userRouter = createTRPCRouter({
	getCurrentUser: protectedProcedure.query(({ ctx }) => {
		return ctx.db.user.findUnique({
			where: {
				id: ctx.session.user.id,
			},
			select: {
				id: true,
				name: true,
				isAdmin: true,
				eventsHosting: {
					select: defaultEventSelect,
				},
				eventsAttending: {
					select: defaultEventSelect,
				},
			},
		});
	}),
});
